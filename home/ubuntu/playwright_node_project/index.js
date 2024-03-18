const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Define the list of URLs for the data brokers' opt-out pages
  const dataBrokerUrls = [
    'http://localhost:8000/acxiom_optout.html',
    'http://localhost:8000/peoplefinders_optout.html',
    'http://localhost:8000/instantcheckmate_optout.html',
    'http://localhost:8000/absolutepeoplesearch_optout.html',
    // Additional URLs will be added here
  ];

  // Function to handle the opt-out process for a single data broker
  async function handleDataBrokerOptOut(url) {
    await page.goto(url, { waitUntil: 'networkidle' });
    // Debug: Log the HTML of the page
    console.log(await page.content());
    // Wait for the necessary elements to be ready for interaction
    try {
      await page.waitForSelector('input[devin-id="0"]', { state: 'visible' });
      await page.fill('input[devin-id="0"]', 'mood.coach.job@cloak.id');
      await page.click('button[devin-id="1"]');
      // Log the completion of the opt-out process for the current data broker
      console.log(`Handled opt-out for: ${url}`);
    } catch (error) {
      // Log any errors encountered during the opt-out process
      console.error(`Error handling opt-out for: ${url}`, error);
    }
  }

  // Iterate over the list of data broker URLs and handle each opt-out process
  for (const url of dataBrokerUrls) {
    await handleDataBrokerOptOut(url);
  }

  await browser.close();
})();
