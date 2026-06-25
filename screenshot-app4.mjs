import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:51721');
  await page.waitForTimeout(3000);
  
  // Click the login/enter button if present
  const enterBtn = await page.$('button:has-text("进入")');
  if (enterBtn) {
    await enterBtn.click();
    await page.waitForTimeout(2000);
    console.log('Clicked enter button');
  }
  
  // Now find and click the 益寿 tab
  const tabs = await page.$$('text=益寿');
  console.log(`Found ${tabs.length} elements with 益寿 text`);
  
  if (tabs.length > 0) {
    // Click the tab
    await tabs[0].click();
    await page.waitForTimeout(1500);
    console.log('Clicked 益寿 tab');
    
    // Take screenshot
    await page.screenshot({ path: 'yishou-calendar-1.png', fullPage: false });
    console.log('Screenshot 1 saved: 益寿页面');
    
    // Now find all buttons and look for the calendar icon
    const allButtons = await page.$$('button');
    console.log(`Found ${allButtons.length} buttons`);
    
    for (let i = 0; i < allButtons.length; i++) {
      const rect = await allButtons[i].boundingBox();
      console.log(`Button ${i}: x=${Math.round(rect?.x)}, y=${Math.round(rect?.y)}`);
    }
  }
  
  await browser.close();
})();
