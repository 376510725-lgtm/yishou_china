import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  ImageRun, Header, Footer, AlignmentType, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageBreak, TableOfContents, LevelFormat, PageNumber } from 'docx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = path.join(__dirname, '..', 'src', 'prototypes', 'yishou-app', 'screenshots');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'prototypes', 'yishou-app');

// 读取截图
function loadImage(filename) {
  const filepath = path.join(SCREENSHOT_DIR, filename);
  if (fs.existsSync(filepath)) {
    return fs.readFileSync(filepath);
  }
  console.warn(`  ⚠️ 截图不存在: ${filename}`);
  return null;
}

// 图片宽度 = 页面内容宽度的一半左右（390px 手机截图按 250 DXA 约 2.5 英寸）
const IMG_WIDTH = 3600; // 2.5 inches in DXA

// 样式常量
const PRIMARY_COLOR = 'FF6B35';
const HEADING1_COLOR = '1A1A1A';
const HEADING2_COLOR = '333333';
const TEXT_COLOR = '333333';
const TIP_COLOR = '666666';

// 边框
const border = { style: BorderStyle.SINGLE, size: 1, color: 'DDDDDD' };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

// ========== 辅助函数 ==========

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 200 },
    children: [new TextRun({ text, bold: true, size: 36, font: 'Arial', color: HEADING1_COLOR })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 160 },
    children: [new TextRun({ text, bold: true, size: 28, font: 'Arial', color: HEADING2_COLOR })],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 120 },
    children: [new TextRun({ text, bold: true, size: 24, font: 'Arial', color: '444444' })],
  });
}

function para(text, options = {}) {
  return new Paragraph({
    spacing: { after: 120, line: 360 },
    ...options,
    children: [new TextRun({ text, size: 22, font: 'Arial', color: TEXT_COLOR, ...options.run })]
  });
}

function tip(text) {
  return new Paragraph({
    spacing: { after: 100, line: 340 },
    children: [new TextRun({ text: `💡 ${text}`, size: 20, font: 'Arial', color: TIP_COLOR, italics: true })],
  });
}

function step(num, text) {
  return new Paragraph({
    spacing: { after: 80, line: 360, indent: { left: 360 } },
    children: [
      new TextRun({ text: `${num}. `, size: 22, font: 'Arial', bold: true, color: PRIMARY_COLOR }),
      new TextRun({ text, size: 22, font: 'Arial', color: TEXT_COLOR }),
    ],
  });
}

function screenshot(filename, altText = '') {
  const imgData = loadImage(filename);
  if (!imgData) {
    return para(`[截图: ${filename}]`, { run: { italics: true, color: '999999' } });
  }
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    alignment: AlignmentType.CENTER,
    children: [new ImageRun({
      type: 'png',
      data: imgData,
      transformation: { width: IMG_WIDTH, height: IMG_WIDTH * (844 / 390) },
      altText: { title: altText, description: altText, name: filename },
    })],
  });
}

function caption(text) {
  return new Paragraph({
    spacing: { after: 200 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, size: 18, font: 'Arial', color: '999999', italics: true })],
  });
}

// 简单表格（无边框）
function simpleTable(rows, colWidths) {
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: rows.map(row =>
      new TableRow({
        children: row.map((cell, i) =>
          new TableCell({
            borders: noBorders,
            width: { size: colWidths[i], type: WidthType.DXA },
            margins: { top: 40, bottom: 40, left: 80, right: 80 },
            children: [new Paragraph({
              spacing: { after: 0, line: 300 },
              children: [new TextRun({ text: cell, size: 20, font: 'Arial', color: TEXT_COLOR })],
            })],
          })
        ),
      })
    ),
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { after: 60, line: 320 },
    children: [new TextRun({ text, size: 22, font: 'Arial', color: TEXT_COLOR })],
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// ========== 主函数 ==========
async function main() {
  console.log('📄 生成益寿巴渝APP用户操作手册...\n');

  // 截图文件列表（按最新批次）
  const screens = {
    loginMain: '01-登录页-主登录.png',
    loginSMS: '02-登录页-手机号登录.png',
    loginPassword: '03-登录页-密码登录.png',
    register: '04-注册页.png',
    mainBayu: '05-主界面-巴渝.png',
    mainYishou: '06-主界面-益寿.png',
    zhucan: '07-助餐服务.png',
    pindan: '08-土货拼购.png',
    messages: '09-消息页.png',
    profile: '10-我的页面.png',
    pointsMall: '11-积分商城.png',
    settings: '12-设置页.png',
    myProfile: '13-我的资料.png',
    bayuPlaza: '14-巴渝-广场.png',
    bayuCircles: '15-巴渝-圈子.png',
  };

  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: 'Arial', size: 22 } },
      },
      paragraphStyles: [
        {
          id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 36, bold: true, font: 'Arial', color: HEADING1_COLOR },
          paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 },
        },
        {
          id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 28, bold: true, font: 'Arial', color: HEADING2_COLOR },
          paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 },
        },
        {
          id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 24, bold: true, font: 'Arial', color: '444444' },
          paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 },
        },
      ],
    },
    numbering: {
      config: [
        {
          reference: 'bullets',
          levels: [{
            level: 0, format: LevelFormat.BULLET, text: '\u2022',
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          }],
        },
      ],
    },
    sections: [
      // ====== 封面 ======
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 }, // A4
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children: [
          new Paragraph({ spacing: { before: 3600 } }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new TextRun({ text: '益寿巴渝 APP', size: 56, bold: true, font: 'Arial', color: PRIMARY_COLOR })],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
            children: [new TextRun({ text: '用户操作手册', size: 40, font: 'Arial', color: '333333' })],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new TextRun({ text: '50岁以上中老年生活服务平台', size: 24, font: 'Arial', color: '666666' })],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new TextRun({ text: '记录美好生活 · 陪伴每一天', size: 22, font: 'Arial', color: '999999', italics: true })],
          }),
          new Paragraph({ spacing: { before: 1200 } }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: '文档版本：v1.0  |  2026年6月', size: 20, font: 'Arial', color: '999999' })],
          }),
          pageBreak(),
        ],
      },

      // ====== 目录 ======
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        headers: {
          default: new Header({
            children: [new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ text: '益寿巴渝 APP 用户操作手册', size: 16, font: 'Arial', color: '999999' })],
            })],
          }),
        },
        footers: {
          default: new Footer({
            children: [new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: '- ', size: 16, font: 'Arial', color: '999999' }),
                new TextRun({ children: [PageNumber.CURRENT], size: 16, font: 'Arial', color: '999999' }),
                new TextRun({ text: ' -', size: 16, font: 'Arial', color: '999999' })],
            })],
          }),
        },
        children: [
          h1('目录'),
          new TableOfContents('目录', { hyperlink: true, headingStyleRange: '1-3' }),
          pageBreak(),

          // ====== 第一章 快速入门 ======
          h1('第一章  快速入门'),

          h2('1.1  APP 简介'),
          para('益寿巴渝是一款专为50岁以上中老年用户打造的生活服务平台，整合了便民服务、社交互动、健康管理、积分商城等核心功能，帮助用户轻松享受数字化生活。'),
          bullet('便民服务：助餐、助浴、助洁、助医、助急、助行六大服务，一键预约'),
          bullet('社交广场：看视频、发动态、聊天交友、加入圈子，与同龄人互动'),
          bullet('土货拼购：重庆本地特产拼团购买，实惠又放心'),
          bullet('积分商城：签到、做任务赚积分，兑换生活好物'),
          bullet('健康工具：养生知识、用药提醒、万年历，守护健康'),
          tip('APP 所有功能均针对中老年用户优化，字体清晰、按钮大、操作简单。'),

          h2('1.2  注册与登录'),
          para('首次使用 APP 需要注册账号。您可以通过手机号快速注册，也可以使用验证码或密码登录。'),

          h3('方式一：手机号快速登录'),
          step(1, '打开 APP，进入登录页面，点击「手机号登录」按钮'),
          step(2, '输入手机号，点击「获取验证码」'),
          step(3, '输入收到的短信验证码，点击「登 录」'),
          screenshot(screens.loginMain, '登录主页面'),
          caption('图1-1  登录主页面'),
          screenshot(screens.loginSMS, '手机号登录页面'),
          caption('图1-2  手机号验证码登录'),

          h3('方式二：密码登录'),
          step(1, '在手机号登录页面，点击「密码登录」'),
          step(2, '输入手机号和密码，点击「登 录」'),
          screenshot(screens.loginPassword, '密码登录页面'),
          caption('图1-3  密码登录'),

          h3('方式三：立即注册'),
          step(1, '在登录主页面，点击「立即注册」'),
          step(2, '输入手机号，获取验证码，设置密码，完成注册'),
          screenshot(screens.register, '注册页面'),
          caption('图1-4  注册页面'),
          tip('如果已经注册过，系统会提示您直接登录。'),

          h2('1.3  主界面速览'),
          para('登录成功后进入主界面，底部有四个 Tab，分别对应不同功能区域：'),
          simpleTable([
            ['Tab 名称', '功能说明'],
            ['巴渝', '社交广场，查看关注动态、热门视频、加入圈子'],
            ['益寿', '便民服务、健康工具、活动资讯'],
            ['消息', '聊天对话、通知消息、通讯录'],
            ['我的', '个人资料、积分商城、设置管理'],
          ], [2000, 7000]),

          para(''),
          screenshot(screens.mainBayu, '主界面-巴渝Tab'),
          caption('图1-5  主界面（巴渝 Tab）'),
          screenshot(screens.mainYishou, '主界面-益寿Tab'),
          caption('图1-6  主界面（益寿 Tab）'),
          pageBreak(),

          // ====== 第二章 核心功能 ======
          h1('第二章  核心功能操作指南'),

          h2('2.1  便民服务（六助）'),
          para('在「益寿」Tab 中，您可以找到六大便民服务入口。点击对应按钮即可进入服务详情。'),

          h3('助餐服务'),
          para('助餐服务帮助您找到附近的社区食堂或合作餐厅，支持堂食预订和送餐上门。'),
          step(1, '在益寿页面点击「助餐」按钮'),
          step(2, '浏览附近餐厅列表，查看菜品、评分和距离'),
          step(3, '选择餐厅后，点击「预约」选择用餐时间和送餐地址'),
          step(4, '确认预约信息，提交后等待服务人员电话确认'),
          screenshot(screens.zhucan, '助餐服务页面'),
          caption('图2-1  助餐服务'),
          tip('首次使用需要填写送餐地址，系统会自动保存供下次使用。'),

          h3('其他便民服务'),
          para('除助餐外，还有以下便民服务，操作方式类似：'),
          simpleTable([
            ['服务', '说明'],
            ['助浴', '预约上门助浴服务，专业护理人员协助洗浴'],
            ['助洁', '预约家庭清洁、衣物洗涤等服务'],
            ['助医', '预约陪诊、挂号、取药等医疗服务'],
            ['助急', '紧急求助，一键呼叫社区服务人员'],
            ['助行', '预约出行陪同、代步工具租赁'],
          ], [1500, 7500]),
          para(''),
          para('此外，益寿页面还提供以下社区生活服务：'),
          bullet('康养游学 — 组织健康养生旅游活动'),
          bullet('养老社区 — 查看周边养老社区信息'),
          bullet('周边赶场 — 查看附近集市赶场时间'),
          bullet('聚会中心 — 组织或参加社区聚会活动'),
          bullet('大众赛事 — 参与广场舞、棋牌等比赛'),

          h2('2.2  土货拼购'),
          para('土货拼购是重庆本地特色商品拼团购买功能，您可以和其他用户一起拼单，享受更优惠的价格。'),
          step(1, '在益寿页面点击「土货拼购」'),
          step(2, '浏览拼购活动或商品列表'),
          step(3, '选择心仪商品，点击「立即拼单」'),
          step(4, '确认订单信息（数量、地址），提交订单'),
          step(5, '分享拼单链接给好友，凑满人数即可成团'),
          screenshot(screens.pindan, '土货拼购页面'),
          caption('图2-2  土货拼购'),
          tip('拼单成功后商品会快递到您填写的地址，可在「我的订单」查看物流。'),
          pageBreak(),

          h2('2.3  巴渝社交广场'),
          para('「巴渝」Tab 是 APP 的社交中心，您可以在这里浏览动态、看视频、加入圈子，与同龄人互动。'),

          h3('浏览内容'),
          para('巴渝页面提供四个子频道：'),
          bullet('关注 — 查看您关注的用户发布的动态'),
          bullet('广场 — 浏览所有用户的公开动态'),
          bullet('热门 — 查看当前最热门的视频和帖子'),
          bullet('圈子 — 加入兴趣圈子，和志同道合的朋友交流'),
          screenshot(screens.bayuPlaza, '巴渝-广场'),
          caption('图2-3  巴渝广场'),
          screenshot(screens.bayuCircles, '巴渝-圈子'),
          caption('图2-4  巴渝圈子'),

          h3('发动态与聊天'),
          step(1, '点击底部中间的红色「+」按钮，选择发布图文或视频'),
          step(2, '编辑内容后点击发布'),
          step(3, '在消息页面可以与其他用户聊天交流'),

          h2('2.4  积分商城'),
          para('积分商城让您通过日常使用 APP 赚取积分，兑换实用商品。'),
          step(1, '在「我的」页面点击「积分商城」'),
          step(2, '浏览可兑换的商品，查看所需积分'),
          step(3, '点击商品进入详情页，确认后点击「兑换」'),
          step(4, '在「兑换记录」中查看订单状态'),
          screenshot(screens.pointsMall, '积分商城页面'),
          caption('图2-5  积分商城'),
          tip('每日签到、发布动态、邀请好友等都可以获得积分奖励。'),
          pageBreak(),

          // ====== 第三章 个人管理 ======
          h1('第三章  个人管理与设置'),

          h2('3.1  编辑个人资料'),
          para('您可以在设置页面编辑个人资料，包括头像、昵称、性别、生日等信息。'),
          step(1, '在「我的」页面点击右上角「设置」'),
          step(2, '在设置页面点击「我的资料」'),
          step(3, '点击对应字段进行编辑，修改后自动保存'),
          screenshot(screens.settings, '设置页面'),
          caption('图3-1  设置页面'),
          screenshot(screens.myProfile, '我的资料页面'),
          caption('图3-2  我的资料'),

          h2('3.2  我的钱包与订单'),
          para('在「我的」页面可以查看钱包余额、积分和订单记录。'),
          bullet('我的钱包 — 查看余额、充值、提现'),
          bullet('我的订单 — 查看助餐、拼购等所有订单'),
          bullet('积分商城 — 查看积分余额和兑换记录'),

          h2('3.3  账号安全与隐私'),
          para('在设置页面可以管理账号安全和隐私设置：'),
          bullet('修改密码 — 定期更换密码保护账号安全'),
          bullet('地址管理 — 管理送餐地址和收货地址'),
          bullet('隐私设置 — 控制谁可以看您的动态和个人信息'),
          bullet('通知设置 — 管理消息推送偏好'),
          bullet('账号注销 — 永久删除账号及所有数据'),
          tip('账号注销不可逆，操作前请确认已备份重要数据。'),

          h2('3.4  消息与通知'),
          para('「消息」Tab 是您与朋友沟通的中心：'),
          step(1, '点击底部「消息」Tab 进入消息页面'),
          step(2, '在聊天列表中选择好友开始对话'),
          step(3, '顶部的通知分类可查看：喜欢、评论、收藏、粉丝等通知'),
          step(4, '点击「通讯录」查看和管理好友列表'),
          screenshot(screens.messages, '消息页面'),
          caption('图3-3  消息页面'),
          pageBreak(),

          // ====== 第四章 常见问题 ======
          h1('第四章  常见问题（FAQ）'),

          h2('4.1  账号相关'),
          para('Q：忘记密码怎么办？'),
          para('A：在登录页面选择「密码登录」，点击「忘记密码」，通过手机号验证后即可重置密码。', { run: { color: '555555' } }),
          para('Q：如何更换绑定的手机号？'),
          para('A：在「设置」→「我的资料」→「手机号」中，验证当前手机号后即可更换。', { run: { color: '555555' } }),
          para('Q：账号可以同时在多个手机上登录吗？'),
          para('A：为了账号安全，同一时间只能在一个设备上登录。', { run: { color: '555555' } }),

          h2('4.2  服务相关'),
          para('Q：预约助餐后如何取消？'),
          para('A：在「我的订单」中找到对应订单，点击「取消预约」即可。建议提前2小时取消。', { run: { color: '555555' } }),
          para('Q：土货拼购没拼成怎么办？'),
          para('A：如果在活动时间内未达到拼团人数，订单会自动取消，款项将原路退回。', { run: { color: '555555' } }),
          para('Q：送餐地址可以保存多个吗？'),
          para('A：可以，在「地址管理」中添加多个地址，下单时选择即可。', { run: { color: '555555' } }),

          h2('4.3  积分与支付'),
          para('Q：如何获得积分？'),
          para('A：每日签到、发布动态、邀请好友注册、参与活动等都可以获得积分。', { run: { color: '555555' } }),
          para('Q：积分有有效期吗？'),
          para('A：积分有效期为一年，每年12月31日清零上一年度未使用的积分。', { run: { color: '555555' } }),

          h2('4.4  客服联系'),
          para('如遇到其他问题，可通过以下方式联系我们：'),
          bullet('APP 内客服：在「我的」页面点击「联系客服」'),
          bullet('客服电话：400-XXX-XXXX（工作日 9:00-18:00）'),
          bullet('微信公众号：搜索「益寿巴渝」关注后留言'),
          pageBreak(),

          // ====== 附录 ======
          h1('附录'),

          h2('附录A  重庆方言词汇对照表'),
          para('APP 部分内容使用了重庆方言，以下为常用词汇对照：'),
          simpleTable([
            ['方言词汇', '普通话解释'],
            ['霍圈子', '加入圈子、参与社交活动'],
            ['豁棒', '非常棒、好极了'],
            ['赶场', '赶集、去集市'],
            ['巴适', '舒服、安逸、很好'],
            ['要得', '可以、没问题'],
            ['摆龙门阵', '聊天、闲聊'],
            ['雄起', '加油、振作'],
            ['安逸得板', '非常舒服、爽极了'],
            ['扎起', '支持、撑腰'],
          ], [2500, 6500]),
          para(''),
          tip('如果您在 APP 中看到不认识的方言词汇，可以截图发给客服咨询。'),

          h2('附录B  紧急联系方式'),
          para(''),
          simpleTable([
            ['服务类型', '联系方式'],
            ['紧急求助（助急）', 'APP内一键呼叫'],
            ['客服电话', '400-XXX-XXXX'],
            ['社区服务热线', '请咨询所在社区'],
            ['投诉建议', 'APP内「意见反馈」'],
          ], [3000, 6000]),
          para(''),
          para('— 全文完 —', { alignment: AlignmentType.CENTER, run: { color: '999999', italics: true } }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
  const outputPath = path.join(OUTPUT_DIR, `益寿巴渝APP用户操作手册_v1.0_${timestamp}.docx`);
  fs.writeFileSync(outputPath, buffer);
  console.log(`\n✅ 手册已生成: ${outputPath}`);
  console.log(`文件大小: ${(buffer.length / 1024).toFixed(1)} KB`);
}

main().catch(err => {
  console.error('生成失败:', err);
  process.exit(1);
});
