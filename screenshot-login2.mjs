import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:51721');
  await page.waitForTimeout(2000);
  
  // Find the 一键登录 button by text content
  const buttons = await page.$$('button');
  console.log(`Found ${buttons.length} buttons on page`);
  
  for (let i = 0; i < buttons.length; i++) {
    const text = await buttons[i].textContent();
    console.log(`Button ${i}: "${text}"`);
    
    if (text && text.includes('登录')) {
      await buttons[i].click();
      console.log(`Clicked button with text: ${text}`);
      await page.waitForTimeout(3000);
      break;
    }
  }
  
  // Take screenshot
  await page.screenshot({ path: 'yishou-calendar-2.png', fullPage: false });
  console.log('Screenshot saved after clicking login');
  
  // Now find buttons on the main page
  const mainButtons = await page.$$('button');
  console.log(`Found ${mainButtons.length} buttons on main page`);
  
  for (let i = 0; i < mainButtons.length; i++) {
    const rect = await mainButtons[i].boundingBox();
    const text = await mainButtons[i].textContent();
    console.log(`Button ${i}: x=${Math.round(rect?.x)}, y=${Math.round(rect?.y)}, text="${text}"`);
  }
  
  await browser.close();
  console.log('Done!');
})();
