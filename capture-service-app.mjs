import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.setViewportSize({ width: 1920, height: 1080 });

  try {
    // 打开 service-app 原型
    console.log('正在打开 service-app 原型...');
    await page.goto('http://localhost:51724/prototypes/service-app', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // 截图保存
    const screenshotPath = path.join(__dirname, 'service-app-test.png');
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`截图已保存: ${screenshotPath}`);

    // 检查页面内容
    const title = await page.title();
    console.log(`页面标题: ${title}`);

    // 检查是否有登录页元素
    const loginButton = await page.$('text=登录');
    console.log(`登录按钮: ${loginButton ? '找到' : '未找到'}`);

    // 检查Tab栏
    const tabBar = await page.$('text=工作台');
    console.log(`Tab栏(工作台): ${tabBar ? '找到' : '未找到'}`);

  } catch (err) {
    console.error('错误:', err.message);
  } finally {
    await browser.close();
  }
})();
