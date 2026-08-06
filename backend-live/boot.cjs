// CommonJS bootstrap for cPanel / LiteSpeed's Node.js Selector.
//
// LiteSpeed starts Node apps through lsnode.js, which loads the startup
// file with require() (CommonJS), not Node's ESM loader. require() cannot
// parse static `import ... from` statements, so pointing the cPanel
// "Application startup file" directly at server.js causes a crash loop
// (SyntaxError: Unexpected identifier) and the app never boots — which is
// why every /api/* request was falling through to LiteSpeed's own 404 page.
//
// This file has NO static import statements (only a dynamic import()
// call, which is a normal function-like expression valid in CommonJS),
// so require() parses it fine. It then loads the real, unmodified ESM
// server.js. No application code changes required.
//
// In cPanel -> Setup Node.js App, set "Application startup file" to:
//   boot.cjs
// (instead of server.js), then restart the app.

import("./server.js").catch((err) => {
  console.error("Failed to start server.js:", err);
  process.exit(1);
});
