/** True when running on Netlify (build or serverless), not local `next dev`. */
export function isNetlifyRuntime(): boolean {
  return (
    process.env.NETLIFY === "true" ||
    process.env.NETLIFY === "1" ||
    Boolean(process.env.NETLIFY_BLOBS_CONTEXT) ||
    Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME)
  );
}
