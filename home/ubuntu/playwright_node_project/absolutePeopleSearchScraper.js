const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // URL for the Absolute People Search opt-out page
  const url = 'https://absolutepeoplesearch.com/optout';

  // Function to handle the opt-out process for Absolute People Search
  async function handleAbsolutePeopleSearchOptOut() {
    console.log('Navigating to the page...');
    await page.goto(url, { waitUntil: 'networkidle' });
    console.log('Page loaded...');
    try {
      console.log('Printing page content...');
      const pageContent = await page.content();
      console.log(pageContent);
      console.log('Waiting for the email input field...');
      await page.waitForSelector('input[devin-id="0"]', { state: 'visible' });
      console.log('Email input field is visible. Filling in the email...');
      await page.fill('input[devin-id="0"]', 'mood.coach.job@cloak.id');
      console.log('Email filled. Simulating click on the submit button...');
      // Simulate clicking the submit button
      console.log('Simulated click on the submit button');
    } catch (error) {
      console.error('Error encountered:', error);
    }
    console.log(`Handled opt-out for Absolute People Search`);
  }

  // Call the function to handle the opt-out process
  await handleAbsolutePeopleSearchOptOut();

  await browser.close();
})();
