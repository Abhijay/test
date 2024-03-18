const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: true });
  const page = await browser.newPage();
  const url = 'http://localhost:8000/peoplefinders_optout.html';

  // Handle the alert that confirms the opt-out process initiation
  page.on('dialog', async dialog => {
    console.log('Alert message:', dialog.message());
    await dialog.dismiss();
    console.log('Alert dismissed.');
  });

  await page.goto(url, { waitUntil: 'networkidle' });
  console.log('Navigated to PeopleFinders opt-out page.');

  // Click the "Next" button to initiate the opt-out process
  await page.click('button[devin-id="nextButton"]');
  console.log('Clicked the "Next" button.');

  // Close the browser
  await browser.close();
  console.log('Browser closed.');
})();
