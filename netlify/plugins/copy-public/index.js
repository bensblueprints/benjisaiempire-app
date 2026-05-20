const fs = require("fs");
const path = require("path");

/** Ensure public/ (images, styles, favicon) land in the Netlify static output. */
module.exports = {
  async onEnd({ utils }) {
    const src = path.join(process.cwd(), "public");
    const dest = path.join(process.cwd(), ".netlify", "static");
    if (!fs.existsSync(src)) {
      utils.status.show({
        title: "copy-public",
        summary: "no public/ folder, skipping",
      });
      return;
    }
    fs.mkdirSync(dest, { recursive: true });
    await utils.copy(src, dest, { overwrite: true });
    utils.status.show({
      title: "copy-public",
      summary: "copied public/ into .netlify/static/",
    });
  },
};
