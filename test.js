const axios = require("axios");

const TELEGRAM_TOKEN = "8772697326:AAEf_LsTltSwSR0ssIaITcqKXUNcTSEunUw";
const CHAT_ID = "6825413426";

axios.post(
  `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
  {
    chat_id: CHAT_ID,
    text: "✅ RCB ticket bot connected! You will get alerts here 🔔"
  }
);