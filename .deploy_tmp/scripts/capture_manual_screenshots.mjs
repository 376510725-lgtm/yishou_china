import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = path.join(__dirname, '..', 'src', 'prototypes', 'yishou-app', 'screenshots');
const BASE_URL = 'http://172.16.21.147:51720/prototypes/yishou-app';
const MOBILE_VIEWPORT = { width: 390, height: 844 };
const TOTAL_STEPS = 24;

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function capturePage(page, name) {
  const filepath = path.join(SCREENSHOT_DIR, `${name}.png`);
  await page.screenshot({ path: filepath, fullPage: false });
  console.log(`  ✅ 已截图: ${name}.png`);
}

// 通用点击 - 尝试多种方式匹配文本
async function clickAny(page, text) {
  const selectors = [
    `button:has-text("${text}")`,
    `button:has-text("${text.replace(/\s/g, '')}")`,
    `[role="button"]:has-text("${text}")`,
    `text="${text}"`,
  ];
  for (const sel of selectors) {
    try {
      const el = page.locator(sel).first();
      await el.waitFor({ state: 'visible', timeout: 2000 });
      await el.click();
      await sleep(1000);
      return true;
    } catch {}
  }
  const chars = text.replace(/\s/g, '');
  if (chars !== text) {
    try {
      const el = page.locator(`button:has-text("${chars.substring(0, 1)}")`).filter({ hasText: chars });
      const count = await el.count();
      if (count > 0) {
        await el.first().click();
        await sleep(1000);
        return true;
      }
    } catch {}
  }
  return false;
}

// 点击任意可见元素（div/span等非button元素）
async function clickAnyElement(page, text) {
  try {
    const el = page.locator(`text="${text}"`).first();
    await el.waitFor({ state: 'visible', timeout: 3000 });
    await el.click();
    await sleep(1000);
    return true;
  } catch {
    return false;
  }
}

async function goBack(page) {
  try {
    const backBtn = page.locator('button').first();
    await backBtn.waitFor({ state: 'visible', timeout: 3000 });
    await backBtn.click();
    await sleep(800);
    return true;
  } catch (e) {
    return false;
  }
}

// 关闭"今日提醒"弹窗
async function dismissWelcomeModal(page) {
  try {
    const knowBtn = page.locator('button:has-text("我知道了")');
    const visible = await knowBtn.isVisible({ timeout: 3000 }).catch(() => false);
    if (visible) {
      await knowBtn.click();
      await sleep(600);
      console.log('  🔔 今日提醒弹窗已关闭');
      return true;
    }
    const overlayLocator = page.locator('div[style*="rgba(0, 0, 0, 0.45)"]').or(page.locator('div[style*="rgba(0,0,0,0.45)"]'));
    const overlayVisible = await overlayLocator.isVisible({ timeout: 2000 }).catch(() => false);
    if (overlayVisible) {
      await overlayLocator.first().click({ position: { x: 10, y: 10 } });
      await sleep(600);
      console.log('  🔔 今日提醒弹窗已通过遮罩关闭');
      return true;
    }
  } catch (e) {
    console.log('  ⚠️ 未检测到今日提醒弹窗，跳过');
  }
  return false;
}

// 切换到益寿Tab
async function ensureYishouTab(page) {
  // 尝试点击益寿Tab
  await clickAny(page, '益寿');
  await sleep(800);
  await dismissWelcomeModal(page);
  await sleep(300);
}

async function main() {
  console.log('📸 开始截取益寿巴渝APP全部功能页面...\n');
  console.log(`目标地址: ${BASE_URL}`);
  console.log(`截图目录: ${SCREENSHOT_DIR}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: MOBILE_VIEWPORT,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  function logStep(num, desc, ok) {
    const icon = ok ? '✅' : '⚠️';
    console.log(`[${num}/${TOTAL_STEPS}] ${icon} ${desc}`);
  }

  try {
    // =============================================
    // 1. 登录页 - 主登录
    // =============================================
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await sleep(2000);
    await capturePage(page, '01-登录页-主登录');
    logStep(1, '登录页-主登录', true);

    // =============================================
    // 2. 手机号登录页
    // =============================================
    await clickAny(page, '手机号登录');
    await capturePage(page, '02-登录页-手机号登录');
    logStep(2, '登录页-手机号登录', true);

    // =============================================
    // 3. 密码登录页
    // =============================================
    await clickAny(page, '密码登录');
    await capturePage(page, '03-登录页-密码登录');
    logStep(3, '登录页-密码登录', true);

    // =============================================
    // 4. 注册页
    // =============================================
    await goBack(page);
    await sleep(500);
    await clickAny(page, '立即注册');
    await capturePage(page, '04-注册页');
    logStep(4, '注册页', true);

    // =============================================
    // 5. 主界面-巴渝（通过登录进入）
    // =============================================
    await goBack(page);
    await sleep(500);
    await clickAny(page, '手机号登录');
    await sleep(500);
    const loginOk = await clickAny(page, '登 录');
    if (!loginOk) {
      await page.locator('button').filter({ hasText: '登' }).filter({ hasText: '录' }).first().click();
    }
    await sleep(2000);
    await capturePage(page, '05-主界面-巴渝');
    logStep(5, '主界面-巴渝', true);

    // =============================================
    // 6. 主界面-益寿（关闭今日提醒弹窗）
    // =============================================
    await ensureYishouTab(page);
    await capturePage(page, '06-主界面-益寿');
    logStep(6, '主界面-益寿', true);

    // =============================================
    // 7. 助餐服务
    // =============================================
    await clickAny(page, '助餐');
    await capturePage(page, '07-助餐服务');
    logStep(7, '助餐服务', true);
    await goBack(page);
    await sleep(500);

    // =============================================
    // 8. 助浴服务
    // =============================================
    await clickAny(page, '助浴');
    await capturePage(page, '08-助浴服务');
    logStep(8, '助浴服务', true);
    await goBack(page);
    await sleep(500);

    // =============================================
    // 9. 助医服务
    // =============================================
    await clickAny(page, '助医');
    await capturePage(page, '09-助医服务');
    logStep(9, '助医服务', true);
    await goBack(page);
    await sleep(500);

    // =============================================
    // 10. 土货拼购
    // =============================================
    await clickAny(page, '土货拼购');
    await capturePage(page, '10-土货拼购');
    logStep(10, '土货拼购', true);
    await goBack(page);
    await sleep(500);

    // =============================================
    // 11. 康养游学
    // =============================================
    await clickAny(page, '康养游学');
    await capturePage(page, '11-康养游学');
    logStep(11, '康养游学', true);
    await goBack(page);
    await sleep(500);

    // =============================================
    // 12. 养老社区
    // =============================================
    await clickAny(page, '养老社区');
    await capturePage(page, '12-养老社区');
    logStep(12, '养老社区', true);
    await goBack(page);
    await sleep(500);

    // =============================================
    // 13. 周边赶场
    // =============================================
    await clickAny(page, '赶场');
    await capturePage(page, '13-周边赶场');
    logStep(13, '周边赶场', true);
    await goBack(page);
    await sleep(500);

    // =============================================
    // 14. 聚会中心
    // =============================================
    await clickAny(page, '聚会');
    await capturePage(page, '14-聚会中心');
    logStep(14, '聚会中心', true);
    await goBack(page);
    await sleep(500);

    // =============================================
    // 15. 大众赛事
    // =============================================
    await clickAny(page, '赛事');
    await capturePage(page, '15-大众赛事');
    logStep(15, '大众赛事', true);
    await goBack(page);
    await sleep(500);

    // =============================================
    // 16. 用药提醒
    // =============================================
    await clickAny(page, '用药提醒');
    await capturePage(page, '16-用药提醒');
    logStep(16, '用药提醒', true);
    await goBack(page);
    await sleep(500);

    // =============================================
    // 17. 养生助手
    // =============================================
    const yangshengOk = await clickAny(page, '养生助手');
    if (yangshengOk) {
      await capturePage(page, '17-养生助手');
      logStep(17, '养生助手', true);
      await goBack(page);
      await sleep(500);
    } else {
      logStep(17, '养生助手（未找到入口，跳过）', false);
    }

    // =============================================
    // 18. 消息页
    // =============================================
    // 先回到巴渝Tab再点消息
    await clickAny(page, '巴渝');
    await sleep(500);
    await clickAny(page, '消息');
    await capturePage(page, '18-消息页');
    logStep(18, '消息页', true);

    // =============================================
    // 19. 我的页面
    // =============================================
    await clickAny(page, '我的');
    await capturePage(page, '19-我的页面');
    logStep(19, '我的页面', true);

    // =============================================
    // 20. 积分商城
    // =============================================
    await clickAny(page, '积分商城');
    await capturePage(page, '20-积分商城');
    logStep(20, '积分商城', true);

    // =============================================
    // 21. 设置页面
    // =============================================
    await clickAny(page, '我的');
    await sleep(500);
    await clickAny(page, '设置');
    await capturePage(page, '21-设置页');
    logStep(21, '设置页', true);
    await goBack(page);
    await sleep(500);

    // =============================================
    // 22. 我的资料
    // =============================================
    await clickAny(page, '我的资料');
    await capturePage(page, '22-我的资料');
    logStep(22, '我的资料', true);
    await goBack(page);
    await sleep(500);

    // =============================================
    // 23. 巴渝-广场
    // =============================================
    await clickAny(page, '巴渝');
    await sleep(500);
    await clickAny(page, '广场');
    await capturePage(page, '23-巴渝-广场');
    logStep(23, '巴渝-广场', true);

    // =============================================
    // 24. 巴渝-圈子
    // =============================================
    await clickAny(page, '圈子');
    await capturePage(page, '24-巴渝-圈子');
    logStep(24, '巴渝-圈子', true);

    console.log(`\n🎉 全部截图完成！共 ${TOTAL_STEPS} 张`);
    console.log(`截图目录: ${SCREENSHOT_DIR}`);

  } catch (error) {
    console.error('\n❌ 截图失败:', error.message);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'error-debug.png') });
  } finally {
    await browser.close();
  }
}

main();
