import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }
  });
  const page = await context.newPage();
  
  // Try the runtime URL
  await page.goto('http://localhost:51721/src/prototypes/yishou-app/');
  await page.waitForTimeout(3000);
  
  console.log('Current URL:', page.url());
  
  // Take screenshot
  await page.screenshot({ path: 'yishou-calendar-7.png', fullPage: false });
  console.log('Screenshot saved');
  
  // Get page content
  const content = await page.content();
  if (content.includes('益寿') || content.includes('login')) {
    console.log('Found 益寿 or login content');
  }
  
  // Check all text
  const text = await page.evaluate(() => document.body.innerText.substring(0, 500));
  console.log('Page text:', text);
  
  await browser.close();
})();
