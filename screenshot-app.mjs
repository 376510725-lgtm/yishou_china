import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:51721');
  await page.waitForTimeout(3000);
  
  // Take screenshot of main page
  await page.screenshot({ path: 'yishou-calendar-1.png', fullPage: false });
  console.log('Screenshot 1 saved: yishou-calendar-1.png (益寿页面)');
  
  // Click the calendar icon in the header (looks for button near top)
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const rect = await btn.boundingBox();
    if (rect && rect.y < 150 && rect.y > 50) {
      await btn.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: 'yishou-calendar-2.png', fullPage: false });
      console.log('Screenshot 2 saved: yishou-calendar-2.png (万年历页面)');
      break;
    }
  }
  
  await browser.close();
  console.log('Done!');
})();
