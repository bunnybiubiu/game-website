const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;

console.log("Starting server...");
const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

(function () {
  try {
    app.listen(port, function () {
      console.log("App started on port 3000");
    });
  } catch (err) {
    console.log("ERROR:", err);
  }
})();
