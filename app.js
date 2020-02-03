const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000; // process.env accesses heroku's environment variables

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
