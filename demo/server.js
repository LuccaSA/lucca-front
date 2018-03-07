// require the module as normal
const bs = require("browser-sync").create();

// .init starts the server
bs.init({
  server: {
    baseDir: "./dist",
    index: "index.html"
  }
});