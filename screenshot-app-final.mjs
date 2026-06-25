import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }
  });
  const page = await context.newPage();
  await page.goto('http://localhost:51721');
  await page.waitForTimeout(2000);
  
  // Try to click anywhere that might be the login button
  // The screenshot shows a main interface, maybe the app is already logged in
  // Let's try scrolling or looking for the 益寿 content
  
  // Get page content
  const content = await page.content();
  console.log('Page title or first h1:', await page.title());
  
  // Look for specific text elements
  const allText = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const texts = [];
    for (const el of elements) {
      if (el.children.length === 0 && el.textContent.trim()) {
        texts.push(el.textContent.trim().substring(0, 50));
      }
    }
    return [...new Set(texts)].slice(0, 30);
  });
  console.log('Text elements found:', allText);
  
  // Take screenshot
  await page.screenshot({ path: 'yishou-calendar-3.png', fullPage: false });
  console.log('Screenshot saved');
  
  await browser.close();
})();
