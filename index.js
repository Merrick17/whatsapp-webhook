const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const VERIFY_TOKEN ="test-token-whatsapp"
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", (req, res) => {
  const body = req.body;

  // Check if the request is coming from Facebook
  if (body.object === "page") {
    body.entry.forEach((entry) => {
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent);
    });

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
