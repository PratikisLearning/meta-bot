const express = require("express");
const axios = require("axios");

const router = express.Router();

const { goalTemplate } = require("./utils/template");

router.post("/send-message", async (req, res) => {
  const response = await axios.post(process.env.DISCORD_WEBHOOK_URL, {
    content: goalTemplate(req.body),
  });

  const checkSuccessfulStatusCode = parseInt(response.status) / 100;

  if (checkSuccessfulStatusCode >= 3) {
    return res.status(500).json({ msg: "Server Error", type: "danger" });
  }

  return res
    .status(201)
    .json({ msg: "Yippie!!, Goal Successfully Added", type: "success" });
});

module.exports = router;
