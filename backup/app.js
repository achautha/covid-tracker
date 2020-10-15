const { App } = require("@slack/bolt");
const { getGlobalSummary, getTop5CountriesByTotalCases } = require("./client");

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: "debug",
});

function getHomeView(casesSummary) {
  return {
    type: "home",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: ":tada: Worldwide cases overview",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: ":white_circle: *New cases*",
          },
          {
            type: "plain_text",
            text: `${casesSummary.NewConfirmed.toLocaleString()}`,
          },
          {
            type: "mrkdwn",
            text: ":white_circle: *Total confirmed*",
          },
          {
            type: "plain_text",
            text: `${casesSummary.TotalConfirmed.toLocaleString()}`,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: ":red_circle: *New deaths*",
          },
          {
            type: "plain_text",
            text: `${casesSummary.NewDeaths.toLocaleString()}`,
          },
          {
            type: "mrkdwn",
            text: ":red_circle: *Total deaths*",
          },
          {
            type: "plain_text",
            text: `${casesSummary.TotalDeaths.toLocaleString()}`,
          },
        ],
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: ":white_check_mark: *New recovered*",
          },
          {
            type: "plain_text",
            text: `${casesSummary.NewRecovered.toLocaleString()}`,
          },
          {
            type: "mrkdwn",
            text: ":white_check_mark: *Total recovered*",
          },
          {
            type: "plain_text",
            text: `${casesSummary.TotalRecovered.toLocaleString()}`,
          },
        ],
      },
      {
        type: "divider",
      },
    ],
  };
}

/**
 * Handle app home event
 */
app.event("app_home_opened", async ({ payload, context }) => {
  const summary = await getGlobalSummary();
  console.log(summary);
  const homeView = getHomeView(summary);
  console.log(JSON.stringify(homeView));
  const userId = payload.user;

  try {
    // Call the views.publish method using the built-in WebClient
    const result = await app.client.views.publish({
      // The token you used to initialize your app is stored in the `context` object
      token: context.botToken,
      user_id: userId,
      view: homeView,
    });
  } catch (error) {
    console.error(error);
  }
});

function getSlashCommandBlocks(top5summary) {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Top 5 countries by total cases",
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:one: *${top5summary[0].Country}*: ${top5summary[0].TotalConfirmed}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:two: *${top5summary[1].Country}*: ${top5summary[1].TotalConfirmed}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:three: *${top5summary[2].Country}*: ${top5summary[2].TotalConfirmed}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:four: *${top5summary[3].Country}*: ${top5summary[3].TotalConfirmed}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:five: *${top5summary[4].Country}*: ${top5summary[4].TotalConfirmed}`,
      },
    },
  ];
}

app.command("/covid", async ({ command, ack, say }) => {
  // Acknowledge command request
  await ack();
  const top5Countries = await getTop5CountriesByTotalCases();
  const responseBlocks = getSlashCommandBlocks(top5Countries);
  await say({ blocks: responseBlocks });
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
