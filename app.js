const { App } = require("@slack/bolt");
const { getGlobalSummary, getTop5CountriesByTotalCases } = require("./client");

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: "debug",
});

app.command("/covid-tracker-2", async ({ command, ack, say }) => {
  // Acknowledge command request
  await ack();
  await say(`${command.text}`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
