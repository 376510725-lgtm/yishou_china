import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:51721');
  await page.waitForTimeout(2000);
  
  // Click 一键登录 button
  const quickLoginBtn = await page.$('text=一键登录');
  if (quickLoginBtn) {
    await quickLoginBtn.click();
    await page.waitForTimeout(2000);
    console.log('Clicked 一键登录');
  }
  
  // Take screenshot after login
  await page.screenshot({ path: 'yishou-calendar-1.png', fullPage: false });
  console.log('Screenshot saved');
  
  // Find all buttons now
  const allButtons = await page.$$('button');
  console.log(`Found ${allButtons.length} buttons after login`);
  
  for (let i = 0; i < allButtons.length; i++) {
    const rect = await allButtons[i].boundingBox();
    if (rect) {
      console.log(`Button ${i}: x=${Math.round(rect.x)}, y=${Math.round(rect.y)}, w=${Math.round(rect.width)}, h=${Math.round(rect.height)}`);
    }
  }
  
  await browser.close();
  console.log('Done!');
})();
