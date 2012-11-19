var App = require("./app");

var app = new App();

var server = app.listen(3000, function (err) {
  console.log("Listening on :3000...");
});
