const { firefox } = require('playwright');

// Function to handle the opt-out process for a single data broker
async function handleOptOut(url) {
  const browser = await firefox.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    console.log(`Navigated to ${url}`);

    await page.waitForSelector('input[devin-id="0"]', { state: 'visible' });
    await page.fill('input[devin-id="0"]', 'example@example.com');

    await page.waitForSelector('button[devin-id="1"]', { state: 'visible' });
    await page.click('button[devin-id="1"]', { force: true });

    page.on('dialog', async dialog => {
      console.log('Alert message:', dialog.message());
      await dialog.dismiss();
    });
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
    console.log('Browser closed for', url);
  }
}

// Main function to run opt-out processes in parallel
(async () => {
  const dataBrokerUrls = [
    'http://localhost:8000/instantcheckmate_optout.html',
    'http://localhost:8000/absolutepeoplesearch_optout.html',
    'http://localhost:8000/acxiom_optout.html',
    'http://localhost:8000/beenverified_optout.html',
    'http://localhost:8000/peoplefinders_optout.html',
    'http://localhost:8000/next_data_broker_optout.html'
  ];

  // Launch opt-out processes in parallel
  await Promise.all(dataBrokerUrls.map(url => handleOptOut(url)));
})();
