import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:51721');
  await page.waitForTimeout(3000);
  
  // Find and click the calendar button (in the orange header area)
  // Looking for buttons in the top right area
  const buttons = await page.$$('button');
  let clicked = false;
  
  for (const btn of buttons) {
    const rect = await btn.boundingBox();
    // Check if button is in the header area (top right)
    if (rect && rect.y < 180 && rect.y > 80 && rect.x > 280) {
      console.log(`Found button at position: x=${rect.x}, y=${rect.y}, width=${rect.width}, height=${rect.height}`);
      await btn.click();
      clicked = true;
      await page.waitForTimeout(1500);
      break;
    }
  }
  
  if (clicked) {
    await page.screenshot({ path: 'yishou-calendar-2.png', fullPage: false });
    console.log('Screenshot 2 saved: yishou-calendar-2.png (after clicking calendar)');
    
    // Check page content to see if we navigated to calendar
    const content = await page.content();
    const hasCalendar = content.includes('万年历') || content.includes('calendar-perpetual');
    console.log('Contains 万年历 or calendar-perpetual:', hasCalendar);
  } else {
    console.log('Could not find calendar button to click');
  }
  
  await browser.close();
  console.log('Done!');
})();
