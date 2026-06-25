import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }
  });
  const page = await context.newPage();
  
  // Try the direct app URL - based on Axhub Make pattern
  await page.goto('http://localhost:51721/?axhubTab=yishou-app');
  await page.waitForTimeout(3000);
  
  console.log('URL:', page.url());
  await page.screenshot({ path: 'yishou-calendar-11.png', fullPage: false });
  console.log('Screenshot saved');
  
  // Check page content
  const text = await page.evaluate(() => document.body.innerText.substring(0, 500));
  console.log('Page text:', text);
  
  await browser.close();
})();
