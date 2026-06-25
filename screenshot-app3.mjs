import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:51721');
  await page.waitForTimeout(3000);
  
  // First login to see the 益寿 page
  // Try to click the login button
  const loginBtn = await page.$('button:has-text("进入")');
  if (loginBtn) {
    await loginBtn.click();
    await page.waitForTimeout(2000);
    console.log('Clicked login button');
  }
  
  // Take screenshot after login
  await page.screenshot({ path: 'yishou-calendar-1.png', fullPage: false });
  console.log('Screenshot 1 saved');
  
  // Now find the calendar button in the orange header
  // The header should have a button with CalendarOutlined
  const allButtons = await page.$$('button');
  console.log(`Found ${allButtons.length} buttons total`);
  
  for (let i = 0; i < allButtons.length; i++) {
    const rect = await allButtons[i].boundingBox();
    console.log(`Button ${i}: x=${Math.round(rect?.x)}, y=${Math.round(rect?.y)}, w=${Math.round(rect?.width)}, h=${Math.round(rect?.height)}`);
    
    // Check if this button has an SVG inside
    const hasSvg = await allButtons[i].$('svg');
    if (hasSvg) {
      // Click this button
      await allButtons[i].click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: 'yishou-calendar-2.png', fullPage: false });
      console.log('Clicked button with SVG, screenshot saved');
      break;
    }
  }
  
  await browser.close();
  console.log('Done!');
})();
