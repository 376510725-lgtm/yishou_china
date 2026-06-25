import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 }
  });
  const page = await context.newPage();
  
  // Go to the admin server first
  await page.goto('http://localhost:53817');
  await page.waitForTimeout(3000);
  
  console.log('Current URL:', page.url());
  
  // Take screenshot
  await page.screenshot({ path: 'yishou-calendar-8.png', fullPage: false });
  console.log('Admin page screenshot saved');
  
  // Get page text
  const text = await page.evaluate(() => document.body.innerText.substring(0, 1000));
  console.log('Page text:', text);
  
  await browser.close();
})();
