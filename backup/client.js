const fetch = require("node-fetch");

async function getGlobalSummary() {
  try {
    const resp = await fetch("https://api.covid19api.com/summary", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
      },
    });
    const jsonResp = await resp.json();
    return jsonResp.Global;
  } catch (error) {
    console.error(error);
  }
}

async function getTop5CountriesByTotalCases() {
  const resp = await fetch("https://api.covid19api.com/summary", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
    },
  });
  const jsonResp = await resp.json();

  return jsonResp.Countries.map((c) => {
    return { Country: c.Country, TotalConfirmed: c.TotalConfirmed };
  })
    .sort((c1, c2) => c2.TotalConfirmed - c1.TotalConfirmed)
    .slice(0, 5);
}

module.exports = {
  getTop5CountriesByTotalCases,
  getGlobalSummary,
};
