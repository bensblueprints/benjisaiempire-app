const https = require("https");
const sodium = require("libsodium-wrappers");

const GH_TOKEN = process.env.GH_TOKEN;
const secrets = {
  NETLIFY_AUTH_TOKEN: process.env.NETLIFY_AUTH_TOKEN,
  NETLIFY_SITE_ID: process.env.NETLIFY_SITE_ID,
};

function req(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const r = https.request(
      {
        hostname: "api.github.com",
        path,
        method,
        headers: {
          Authorization: `Bearer ${GH_TOKEN}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "benjisaiempire-deploy",
          ...(data
            ? {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(data),
              }
            : {}),
        },
      },
      (res) => {
        let buf = "";
        res.on("data", (c) => (buf += c));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, json: buf ? JSON.parse(buf) : {} });
          } catch {
            resolve({ status: res.statusCode, json: buf });
          }
        });
      },
    );
    r.on("error", reject);
    if (data) r.write(data);
    r.end();
  });
}

(async () => {
  await sodium.ready;
  const { json: key } = await req(
    "GET",
    "/repos/bensblueprints/benjisaiempire-app/actions/secrets/public-key",
  );
  const keyBytes = Buffer.from(key.key, "base64");
  for (const [name, value] of Object.entries(secrets)) {
    const encryptedBytes = sodium.crypto_box_seal(Buffer.from(value), keyBytes);
    const { status, json } = await req(
      "PUT",
      `/repos/bensblueprints/benjisaiempire-app/actions/secrets/${name}`,
      {
        encrypted_value: Buffer.from(encryptedBytes).toString("base64"),
        key_id: key.key_id,
      },
    );
    console.log(name, status, json.message || "ok");
  }
  const { status, json } = await req(
    "POST",
    "/repos/bensblueprints/benjisaiempire-app/actions/workflows/deploy-netlify.yml/dispatches",
    { ref: "main" },
  );
  console.log("workflow_dispatch", status, json.message || "ok");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
