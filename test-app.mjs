import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }
  });
  const page = await context.newPage();
  
  // Go to the runtime URL (the actual app)
  await page.goto('http://localhost:51721');
  await page.waitForTimeout(2000);
  
  // Take screenshot
  await page.screenshot({ path: 'yishou-calendar-4.png', fullPage: false });
  console.log('Screenshot saved');
  
  // Find and click 一键登录
  const quickLogin = await page.$('text=一键登录');
  if (quickLogin) {
    await quickLogin.click();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'yishou-calendar-5.png', fullPage: false });
    console.log('Clicked 一键登录 and saved screenshot');
  }
  
  // Now find the calendar button in the orange header area
  const buttons = await page.$$('button');
  console.log(`Found ${buttons.length} buttons`);
  
  for (let i = 0; i < buttons.length; i++) {
    const text = await buttons[i].textContent();
    const rect = await buttons[i].boundingBox();
    console.log(`Button ${i}: text="${text}", x=${Math.round(rect?.x)}, y=${Math.round(rect?.y)}`);
    
    // Check for SVG inside
    const svg = await buttons[i].$('svg');
    if (svg) {
      console.log('  -> Has SVG icon');
    }
  }
  
  // Click the first button that might be the calendar (in header area)
  for (let i = 0; i < buttons.length; i++) {
    const rect = await buttons[i].boundingBox();
    if (rect && rect.y > 50 && rect.y < 150 && rect.x > 250) {
      await buttons[i].click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: 'yishou-calendar-6.png', fullPage: false });
      console.log('Clicked calendar button and saved screenshot');
      break;
    }
  }
  
  await browser.close();
  console.log('Done!');
})();
