const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: true });
  const page = await browser.newPage();
  const url = 'http://localhost:8000/beenverified_optout.html';

  await page.goto(url, { waitUntil: 'networkidle' });
  console.log('Navigated to BeenVerified opt-out page.');

  // Fill in the first name
  await page.fill('input[devin-id="firstName"]', 'Himanshu');
  console.log('Filled in the first name.');

  // Fill in the last name
  await page.fill('input[devin-id="lastName"]', 'Bhatnagar');
  console.log('Filled in the last name.');

  // Select the state
  await page.selectOption('select[devin-id="state"]', 'MA');
  console.log('Selected the state.');

  // Simulate clicking the submit button
  await page.click('button[devin-id="1"]');
  console.log('Simulated click on the submit button.');

  // Close the browser
  await browser.close();
  console.log('Browser closed.');
})();
