import fs from 'fs';
import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, PageNumber, PageBreak, TabStopType, TabStopPosition
} from 'docx';

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

const CONTENT_WIDTH = 9026; // A4 with 1 inch margins
const TABLE_WIDTH = 9026;

// Helper: heading paragraph
function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text, font: "Microsoft YaHei" })] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text, font: "Microsoft YaHei" })] });
}
function h3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text, font: "Microsoft YaHei" })] });
}

// Helper: normal paragraph
function p(text, opts = {}) {
  const runs = [];
  if (typeof text === 'string') {
    runs.push(new TextRun({ text, font: "Microsoft YaHei", size: 22, ...opts }));
  } else if (Array.isArray(text)) {
    text.forEach(t => runs.push(typeof t === 'string' ? new TextRun({ text: t, font: "Microsoft YaHei", size: 22 }) : new TextRun({ font: "Microsoft YaHei", size: 22, ...t })));
  }
  return new Paragraph({ children: runs, spacing: { after: 120, line: 360 } });
}

// Helper: step paragraph (numbered)
function step(num, text) {
  return new Paragraph({
    numbering: { reference: "steps", level: 0 },
    children: [new TextRun({ text: `${num}. ${text}`, font: "Microsoft YaHei", size: 22 })],
    spacing: { after: 80, line: 340 }
  });
}

// Helper: simple bullet paragraph
function bullet(text, opts = {}) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text, font: "Microsoft YaHei", size: 22, ...opts })],
    spacing: { after: 60, line: 340 }
  });
}

// Helper: tip paragraph
function tip(text) {
  return p([{ text: "💡 提示：", bold: true }, { text, color: "666666" }]);
}

// Helper: page break
function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// Helper: create table
function createTable(headers, rows, colWidths) {
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => new TableCell({
      borders,
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: { fill: "FF6B35", type: ShadingType.CLEAR },
      margins: cellMargins,
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: "FFFFFF", font: "Microsoft YaHei", size: 20 })] })]
    }))
  });

  const dataRows = rows.map(row => new TableRow({
    children: row.map((cell, i) => new TableCell({
      borders,
      width: { size: colWidths[i], type: WidthType.DXA },
      margins: cellMargins,
      children: [new Paragraph({ children: [new TextRun({ text: cell, font: "Microsoft YaHei", size: 20 })] })]
    }))
  }));

  return new Table({
    width: { size: TABLE_WIDTH, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows]
  });
}

// ============================================================
// Build Document Content
// ============================================================
const children = [];

// ─── Cover Page ───
children.push(new Paragraph({ spacing: { before: 4000 } }));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "益寿巴渝 APP", size: 56, bold: true, color: "FF6B35", font: "Microsoft YaHei" })]
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: "用户操作手册", size: 44, color: "333333", font: "Microsoft YaHei" })]
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 600, after: 100 },
  children: [new TextRun({ text: "记录美好生活 · 分享给家人朋友", size: 24, color: "888888", font: "Microsoft YaHei" })]
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 1200 },
  children: [new TextRun({ text: "版本：v1.0  |  日期：2026年6月", size: 20, color: "AAAAAA", font: "Microsoft YaHei" })]
}));
children.push(pageBreak());

// ─── 第一章 快速入门 ───
children.push(h1("第一章  快速入门"));

children.push(h2("1.1 APP 简介"));
children.push(p("益寿巴渝是一款专为50岁以上中老年人群打造的移动生活服务平台，以重庆本地文化（巴渝）为特色，集便民服务、健康管理、社交互动、积分商城、土货拼购于一体。"));
children.push(p("底部有四个Tab：益寿（便民服务台）、巴渝（社交广场，默认首页）、消息（聊天与通知）、我的（个人中心）。"));

children.push(h2("1.2 注册与登录"));
children.push(p("打开APP后，进入登录页面，有以下四种方式："));

children.push(h3("方式一：手机号验证码登录"));
children.push(step(1, "点击「手机号登录」"));
children.push(step(2, "输入手机号，点击「获取验证码」"));
children.push(step(3, "输入收到的验证码，勾选用户协议，点击「登录」"));

children.push(h3("方式二：密码登录"));
children.push(step(1, "在手机号登录页点击「切换为密码登录」"));
children.push(step(2, "输入手机号和密码（8-16位），点击「登录」"));

children.push(h3("方式三：新用户注册"));
children.push(step(1, "在登录首页点击「立即注册」"));
children.push(step(2, "输入手机号、验证码、设置密码，可选填邀请码"));
children.push(step(3, "勾选用户协议，点击「注册」"));

children.push(h3("方式四：忘记密码"));
children.push(step(1, "在密码登录页点击「忘记密码」"));
children.push(step(2, "按提示完成验证手机号 → 设置新密码 → 完成"));

children.push(h2("1.3 底部四个Tab速览"));

children.push(createTable(
  ["Tab名称", "图标含义", "主要功能"],
  [
    ["益寿", "工作台", "便民服务宫格（六助+社区生活+文娱）、心康体健、近期活动"],
    ["巴渝", "社交广场（默认首页）", "熟人/同城视频流、排名榜、圈子"],
    ["消息", "聊天与通知", "聊天列表、通讯录、通知中心（点赞/评论/收藏/粉丝）"],
    ["我的", "个人中心", "资料编辑、订单、积分商城、设置"],
  ],
  [2000, 2000, 5026]
));

children.push(pageBreak());

// ─── 第二章 核心功能操作指南 ───
children.push(h1("第二章  核心功能操作指南"));

children.push(h2("2.1 便民服务（六助）"));
children.push(p("在「益寿」Tab的便民服务宫格中，点击对应服务即可进入。"));

children.push(h3("助餐"));
children.push(p("找餐厅、预约就餐或送餐上门。"));
children.push(step(1, "点击「助餐」，进入餐厅列表页"));
children.push(step(2, "可通过「全部/附近/评分最高/价格最低」筛选餐厅"));
children.push(step(3, "点击「立即预约」，选择就餐时间、人数、配送方式，填写送餐地址后确认"));
children.push(step(4, "也可直接点击底部「拨打电话」联系餐厅"));
children.push(tip("选择「上门送餐」时，可在地图上选择送餐地址。"));

children.push(h3("助浴 / 助洁 / 助医 / 助急 / 助行"));

children.push(createTable(
  ["服务", "说明", "操作方式"],
  [
    ["助浴", "预约洗澡护理服务", "查看护工机构列表 → 拨打电话预约"],
    ["助洁", "预约清洁打扫服务", "查看清洁套餐（基础/深度/专项）→ 拨打电话预约"],
    ["助医", "预约看病陪护服务", "查看医护服务人员列表 → 拨打电话预约"],
    ["助急", "紧急联系一键呼救", "查看4个紧急联系人 → 点击「一键呼救」"],
    ["助行", "预约出行接送服务", "查看出行类型列表 → 拨打电话预约"],
  ],
  [1200, 3500, 4326]
));

children.push(h3("社区生活（赶场 / 养老社区 / 聚会中心 / 赛事 / 康养游学）"));
children.push(p("以上服务均在便民服务宫格中点击进入，操作方式相似：查看列表 → 筛选/拨打电话。"));
children.push(bullet("周边赶场：查看今日/明日赶场集市，支持赶集日历"));
children.push(bullet("养老社区：查看养老机构列表（评分4.6-4.9），拨打电话咨询"));
children.push(bullet("聚会中心：按场所分类（茶馆/会议室/KTV等）筛选，查看容纳人数"));
children.push(bullet("大众赛事：按分类筛选赛事，查看详情并咨询报名"));
children.push(bullet("康养游学 / 活动节目：查看机构/活动列表，拨打电话报名"));

children.push(pageBreak());

children.push(h2("2.2 土货拼购"));
children.push(p("在益寿工作台点击「土货拼购」，可参与社区拼团购买土特产。"));
children.push(step(1, "进入拼购首页，浏览进行中的拼购活动"));
children.push(step(2, "点击活动进入商品列表，选择心仪商品"));
children.push(step(3, "在商品详情页选择数量（1-99），点击「立即购买」"));
children.push(step(4, "确认订单页选择收货地址，点击支付完成下单"));
children.push(step(5, "在「我的订单」可查看订单状态（全部/待付款/待收货/已完成/已取消）"));
children.push(tip("拼购价低于原价，活动名额有限，建议及时下单。"));

children.push(h2("2.3 巴渝社交广场"));
children.push(p("巴渝是APP的默认首页，包含四个子Tab：熟人、同城、排名、霍圈子。"));

children.push(h3("看视频（熟人/同城）"));
children.push(step(1, "在「熟人」或「同城」Tab下，上下滑动切换视频"));
children.push(step(2, "右侧操作栏可点赞、评论、收藏、分享"));
children.push(step(3, "观看视频满5秒可获得积分奖励（+15分）"));
children.push(step(4, "点击视频可进入全屏播放模式，查看评论区"));

children.push(h3("排名榜"));
children.push(p("在「排名」Tab下，可查看巴渝头条（新闻）、巴渝劳模（发帖Top10）、巴渝名人（粉丝Top10）、巴渝豁棒（互动Top10）。"));

children.push(h3("霍圈子（圈子）"));
children.push(step(1, "在「霍圈子」Tab下，可查看已加入的圈子"));
children.push(step(2, "点击「发现圈子」可搜索和加入新圈子"));
children.push(step(3, "进入圈子详情页，可查看圈子动态、发布内容、参与活动"));
children.push(step(4, "圈主可管理公告、成员、发起活动"));

children.push(h3("发布动态"));
children.push(step(1, "在巴渝广场右上角点击「+」发布按钮"));
children.push(step(2, "选择「发图文」或「发视频」"));
children.push(step(3, "上传图片/视频，填写标题和正文，点击发布"));

children.push(h3("聊天"));
children.push(p("在「消息」Tab下，点击聊天列表中的对话进入聊天页面。支持发送文字、语音、图片消息。"));
children.push(p("消息Tab还提供：通讯录（好友列表）、新的朋友（好友申请）、通知中心（点赞/评论/收藏/粉丝通知）。"));

children.push(pageBreak());

children.push(h2("2.4 积分商城"));
children.push(p("在「我的」Tab点击「积分商城」进入。"));
children.push(step(1, "查看当前积分余额"));
children.push(step(2, "通过分类Tab（健康保健/礼品特产/兴趣休闲/生活用品）浏览商品"));
children.push(step(3, "点击商品进入详情页，查看图片轮播、规格选择"));
children.push(step(4, "选择规格后点击「立即兑换」，消耗积分完成兑换"));
children.push(step(5, "在「我的兑换」查看兑换记录和物流状态"));
children.push(tip("积分通过观看视频（+15分/条）、发帖互动等方式获得。商品兑换后不可退换，请仔细阅读购买须知。"));

children.push(h2("2.5 健康工具"));
children.push(bullet("养生助手（益寿Tab → 心康体健 → 养生助手）：查看四季养生知识、今日养生提示"));
children.push(bullet("万年历（益寿Tab顶部入口）：查看日期、农历、节气、宜忌，支持月份切换"));

children.push(pageBreak());

// ─── 第三章 个人管理与设置 ───
children.push(h1("第三章  个人管理与设置"));

children.push(h2("3.1 编辑资料"));
children.push(step(1, "在「我的」Tab点击「编辑资料」"));
children.push(step(2, "可修改头像、昵称、性别、年龄、地区、个人简介"));
children.push(step(3, "点击保存完成修改"));

children.push(h2("3.2 我的钱包"));
children.push(p("在「我的」Tab点击「我的钱包」，可查看余额、积分、交易记录。"));

children.push(h2("3.3 地址管理"));
children.push(step(1, "在设置页面点击「地址管理」"));
children.push(step(2, "可新增、编辑、删除收货地址"));
children.push(step(3, "支持省市区三级选择"));

children.push(h2("3.4 我的动态 / 收藏 / 喜欢"));
children.push(p("在「我的」Tab可分别进入「我的动态」「我的收藏」「我的喜欢」，按时间轴查看个人内容。我的动态支持删除操作。"));

children.push(h2("3.5 关注与粉丝"));
children.push(p("在「我的」Tab点击关注/粉丝数字，进入关注列表页。支持切换「互关/粉丝/关注」三个Tab查看。"));

children.push(h2("3.6 隐私与安全"));

children.push(createTable(
  ["设置项", "路径", "说明"],
  [
    ["修改密码", "我的 → 设置 → 修改密码", "需验证原手机号 → 设置新密码 → 完成"],
    ["通知设置", "我的 → 设置 → 通知设置", "管理各类消息推送开关"],
    ["隐私设置", "我的 → 设置 → 隐私设置", "管理个人资料可见范围等"],
    ["举报与拉黑", "用户主页 → 更多 → 举报/拉黑", "举报提供7个原因选项；拉黑后不再看到对方动态"],
    ["账号注销", "我的 → 设置 → 账号注销", "需同意3项条件，进入7天冷静期后完成注销"],
    ["检查更新", "我的 → 设置 → 检查更新", "查看当前版本和是否有新版本"],
    ["关于我们", "我的 → 设置 → 关于我们", "查看APP版本信息和介绍"],
  ],
  [1800, 2800, 4426]
));

children.push(pageBreak());

// ─── 第四章 常见问题 ───
children.push(h1("第四章  常见问题（FAQ）"));

const faqData = [
  ["Q1: 收不到验证码怎么办？", "请检查手机信号是否正常，确认手机号输入无误。验证码有效期10分钟，如仍未收到可尝试重新获取。"],
  ["Q2: 忘记密码怎么找回？", "在密码登录页点击「忘记密码」，按提示验证手机号后即可设置新密码。"],
  ["Q3: 如何获得积分？", "观看视频满5秒可获得15积分、完成每日任务、参与互动（点赞/评论/发帖）均可获得积分。"],
  ["Q4: 积分兑换后能退吗？", "积分兑换的商品一经兑换不支持退换，请在兑换前仔细阅读购买须知。"],
  ["Q5: 拼购订单如何查看物流？", "在「我的订单」→ 点击对应订单进入订单详情页，可查看物流信息。"],
  ["Q6: 如何添加好友？", "在消息Tab → 通讯录 → 新的朋友中处理好友申请；或在用户主页点击「添加好友」发送申请。"],
  ["Q7: 如何退出或删除圈子？", "在圈子详情页的管理模式中可选择退出圈子。"],
  ["Q8: 预约服务后如何取消？", "在对应订单或预约记录中查看状态，或直接拨打服务电话取消。"],
  ["Q9: 如何举报不良内容？", "在帖子详情或用户主页点击「更多」→「举报」，选择举报原因提交。"],
  ["Q10: 遇到问题怎么联系客服？", "在「我的」Tab → 我的服务中点击「客服中心」联系在线客服。"],
];

faqData.forEach(([q, a]) => {
  children.push(p([{ text: q, bold: true }]));
  children.push(p(a));
  children.push(new Paragraph({ spacing: { after: 80 } }));
});

children.push(pageBreak());

// ─── 附录 ───
children.push(h1("附录"));

children.push(h2("A. 重庆方言词汇对照表"));
children.push(createTable(
  ["方言词汇", "含义"],
  [
    ["巴渝", "重庆古称，APP社交广场模块名"],
    ["霍圈子", "重庆方言「混圈子/玩圈子」的意思"],
    ["豁棒", "重庆方言「好伙伴/好朋友」的意思"],
    ["赶场", "赶集，在特定日子去集市买卖"],
    ["土货", "本地农产品、土特产"],
  ],
  [2000, 7026]
));

children.push(h2("B. 紧急联系方式速查卡"));
children.push(createTable(
  ["服务类型", "联系方式"],
  [
    ["客服电话", "400-800-8888"],
    ["紧急呼救", "在「助急」页面点击一键呼救"],
    ["助餐预约", "在「助餐」页面拨打电话"],
    ["养老咨询", "在「养老社区」页面拨打电话"],
  ],
  [2000, 7026]
));

// ============================================================
// Build Document
// ============================================================

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Microsoft YaHei", size: 22 }
      }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Microsoft YaHei", color: "FF6B35" },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Microsoft YaHei", color: "333333" },
        paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 }
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Microsoft YaHei", color: "555555" },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 }
      },
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
      {
        reference: "steps",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "益寿巴渝 APP - 用户操作手册", size: 18, color: "AAAAAA", font: "Microsoft YaHei" })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "第 ", size: 18, color: "AAAAAA" }), new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "AAAAAA" }), new TextRun({ text: " 页", size: 18, color: "AAAAAA" })]
        })]
      })
    },
    children
  }]
});

const outputPath = 'd:/王旭东/Codex-project/yishou_china/src/prototypes/yishou-app/益寿巴渝APP用户操作手册.docx';

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ 手册已生成：${outputPath}`);
  console.log(`📄 文件大小：${(buffer.length / 1024).toFixed(1)} KB`);
}).catch(err => {
  console.error('❌ 生成失败：', err.message);
  process.exit(1);
});
