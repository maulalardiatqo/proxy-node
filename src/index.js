const express = require("express");
const math = require("./math");
const app = express();
const androidData = require("./quizData");
const axios = require("axios");

//create a server object:
app.use(express.json());

app.use("/api/v1/quiz", (req, res) => {
  const topic = req.query.topic;
  const num = req.query.num;
  console.log(topic, num);
  if (topic === "android") {
    res.json({
      status: "success",
      questions: androidData.slice(0, num),
    });
  } else {
    res.status(423);
    res.json({
      status: "error",
      errorMsg: "only android quiz supported for now",
    });
  }
});

app.get("/", async (req, res) => {
  try {
    const response = await axios.post(
      "https://td2969766.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4073&deploy=1&compid=TD2969766&ns-at=AAEJ7tMQbmm1l1mDZyPvMXqT5QZ7Mo3JWnLCfa9kQzx5DvLBxyk",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(
      "Error forwarding webhook:",
      error.response ? error.response.data : error.message
    );
    res.sendStatus(500);
  }
});
app.post("/iseller-webhook", async (req, res) => {
  console.log("Triggered!!", req.body);
  try {
    const response = await axios.post(
      "https://td2969766.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=4073&deploy=1&compid=TD2969766&ns-at=AAEJ7tMQbmm1l1mDZyPvMXqT5QZ7Mo3JWnLCfa9kQzx5DvLBxyk",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(
      "Error forwarding webhook:",
      error.response ? error.response.data : error.message
    );
    res.sendStatus(500);
  }
});

app.use("/api", math);
app.listen(8080, () => {
  console.log("listening on 8080...");
}); //the server object listens on port 8080
