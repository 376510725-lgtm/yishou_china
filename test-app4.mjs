import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 }
  });
  const page = await context.newPage();
  
  // Go to admin server
  await page.goto('http://localhost:53817/?projectId=yishou_china&p=management');
  await page.waitForTimeout(3000);
  
  // Find and click 益寿巴渝APP
  const appLink = await page.$('text=益寿巴渝APP');
  if (appLink) {
    await appLink.click();
    await page.waitForTimeout(2000);
    console.log('Clicked 益寿巴渝APP');
    
    await page.screenshot({ path: 'yishou-calendar-9.png', fullPage: false });
    console.log('App screenshot saved');
    
    // Look for open/preview button
    const openBtn = await page.$('text=打开');
    if (openBtn) {
      await openBtn.click();
      await page.waitForTimeout(3000);
      console.log('Clicked 打开');
      
      await page.screenshot({ path: 'yishou-calendar-10.png', fullPage: false });
      console.log('Preview screenshot saved');
    }
  }
  
  // Get all page text
  const text = await page.evaluate(() => document.body.innerText.substring(0, 1500));
  console.log('Page text:', text);
  
  await browser.close();
})();
