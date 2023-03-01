const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/webhook", (req, res) => {
  console.log(req.body);
  res.status(200).send("OK");
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
