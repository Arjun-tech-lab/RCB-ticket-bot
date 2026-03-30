require("dotenv").config();

const { chromium } = require("playwright");
const axios = require("axios");

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

let alreadyAlerted = false;

async function sendTelegram(message) {
  await axios.post(
    `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
    {
      chat_id: CHAT_ID,
      text: message
    }
  );
}

async function checkTickets() {
  console.log("Checking...", new Date().toLocaleTimeString());

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://shop.royalchallengers.com/ticket", {
    waitUntil: "networkidle"
  });

  // small wait for UI render
  await page.waitForTimeout(2000);

  const body = (await page.innerText("body")).toLowerCase();

  const ticketsUnavailable = body.includes("tickets not available");
  const buyTicketsVisible = body.includes("buy tickets");
  const hasVs = body.includes(" vs ");

  if (!ticketsUnavailable && buyTicketsVisible && hasVs && !alreadyAlerted) {
    alreadyAlerted = true;

    await sendTelegram(
      "🚨 RCB Tickets Released!\nhttps://shop.royalchallengers.com/ticket"
    );
  }

  await browser.close();
}

setInterval(checkTickets, 30000);