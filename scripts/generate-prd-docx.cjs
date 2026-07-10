const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, PageBreak, TabStopType, TabStopPosition
} = require("docx");

// ── Helpers ──
const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const headerBorder = { style: BorderStyle.SINGLE, size: 6, color: "2E75B6" };
const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

const fontMain = "Arial";
const fontMono = "Consolas";
const colorPrimary = "FF6B35";
const colorDark = "1A1A1A";
const colorGray = "666666";
const colorHeaderBg = "2E75B6";
const colorLightBg = "F5F7FA";
const colorWhite = "FFFFFF";

const defaultSize = 21; // 10.5pt
const bodySize = 22;    // 11pt
const heading1Size = 36; // 18pt
const heading2Size = 30; // 15pt
const heading3Size = 26; // 13pt
const heading4Size = 24; // 12pt
const smallSize = 18;    // 9pt
const monoSize = 20;     // 10pt

function t(text, opts = {}) {
  return new TextRun({ text, font: fontMain, size: opts.size || bodySize, color: opts.color || colorDark, ...opts });
}
function tm(text, opts = {}) {
  return new TextRun({ text, font: fontMono, size: opts.size || monoSize, color: opts.color || colorDark, ...opts });
}
function tb(text, opts = {}) {
  return new TextRun({ text, font: fontMain, size: opts.size || bodySize, bold: true, color: opts.color || colorDark, ...opts });
}
function p(children, opts = {}) {
  return new Paragraph({ spacing: { after: 120, line: 360 }, ...opts, children });
}
function heading(level, text) {
  return new Paragraph({ heading: level, spacing: { before: level === HeadingLevel.HEADING_1 ? 360 : 240, after: 160 }, children: [new TextRun({ text, font: fontMain })] });
}
function h1(text) { return heading(HeadingLevel.HEADING_1, text); }
function h2(text) { return heading(HeadingLevel.HEADING_2, text); }
function h3(text) { return heading(HeadingLevel.HEADING_3, text); }
function h4(text) { return heading(HeadingLevel.HEADING_4, text); }

function cell(textOrChildren, opts = {}) {
  const children = typeof textOrChildren === "string"
    ? [new Paragraph({ children: [t(textOrChildren, { size: opts.fontSize || 20 })] })]
    : textOrChildren;
  return new TableCell({
    borders,
    width: opts.width ? { size: opts.width, type: WidthType.DXA } : undefined,
    shading: opts.shading ? { fill: opts.shading, type: ShadingType.CLEAR } : undefined,
    margins: cellMargins,
    verticalAlign: "center",
    children,
  });
}

function tableRow(cells, opts = {}) {
  return new TableRow({ children: cells });
}

function makeTable(headers, rows, colWidths) {
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);
  const headerCells = headers.map((h, i) => cell([new Paragraph({ children: [tb(h, { size: 20, color: colorWhite })] })], {
    width: colWidths[i], shading: colorHeaderBg,
  }));
  const dataRows = rows.map(row =>
    new TableRow({ children: row.map((c, i) => cell(c, { width: colWidths[i] })) })
  );
  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [new TableRow({ children: headerCells }), ...dataRows],
  });
}

function bullet(text, level = 0) {
  const indent = 720 + level * 360;
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 60, line: 340 },
    children: [t(text, { size: bodySize })],
  });
}
function numbered(text) {
  return new Paragraph({
    numbering: { reference: "numbers", level: 0 },
    spacing: { after: 60, line: 340 },
    children: [t(text, { size: bodySize })],
  });
}

function divider() {
  return new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "E0E0E0", space: 4 } }, spacing: { before: 120, after: 120 }, children: [] });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function metaLine(label, value) {
  return p([tb(label + "：", { size: bodySize }), t(value, { size: bodySize, color: colorGray })], { spacing: { after: 60 } });
}

// ═══════════════════════════════════════════
// BUILD DOCUMENT
// ═══════════════════════════════════════════

const children = [];

// ── Cover Page ──
children.push(new Paragraph({ spacing: { before: 2400 }, children: [] }));
children.push(p([new TextRun({ text: "益寿巴渝 APP", font: fontMain, size: 56, bold: true, color: colorPrimary })], { alignment: AlignmentType.CENTER }));
children.push(p([new TextRun({ text: "产品需求文档（PRD）", font: fontMain, size: 40, bold: true, color: colorDark })], { alignment: AlignmentType.CENTER, spacing: { after: 400 } }));
children.push(divider());
children.push(new Paragraph({ spacing: { before: 200 }, children: [] }));
children.push(metaLine("文档编号", "YSBY-PRD-001"));
children.push(metaLine("版本", "v8.0"));
children.push(metaLine("日期", "2026-07-10"));
children.push(metaLine("作者", "产品部"));
children.push(metaLine("密级", "内部/机密"));
children.push(metaLine("状态", "已发布"));
children.push(new Paragraph({ spacing: { before: 400 }, children: [] }));
children.push(p([new TextRun({ text: "全国首个以地域文化为锚点、以\"社交 + 生活服务 + 健康管理\"三位一体为核心的一站式老年智慧生活 App", font: fontMain, size: 22, color: colorGray, italics: true })], { alignment: AlignmentType.CENTER }));
children.push(pageBreak());

// ── Revision History ──
children.push(h1("修订历史"));
children.push(makeTable(
  ["版本", "日期", "修订人", "修订说明"],
  [
    ["v1.0", "2026-03-31", "产品部", "初版"],
    ["v2.0", "2026-05-09", "产品部", "更新功能规格"],
    ["v3.0", "2026-06-04", "产品部", "基于代码更新状态机"],
    ["v4.0", "2026-06-04", "产品部", "完全基于 index.tsx 重构"],
    ["v5.0", "2026-06-09", "产品部", "新增养老社区/周边赶场/聚会中心/大众赛事"],
    ["v5.1", "2026-06-09", "产品部", "我的页面新增服务商/达人入口"],
    ["v6.0", "2026-06-10", "产品部", "基于代码重写，覆盖 64 屏"],
    ["v7.0", "2026-07-07", "产品部", "按标准PRD格式重构：补全68屏，新增非功能需求"],
    ["v8.0", "2026-07-10", "产品部", "新增社区模块：第5子Tab「社区」，含8大分类，70屏"],
  ],
  [1800, 1600, 1400, 4560]
));
children.push(pageBreak());

// ── 1. 产品概述 ──
children.push(h1("1. 产品概述"));
children.push(h2("1.1 产品定位"));
children.push(p([t("益寿巴渝是一款专为 ", { size: bodySize }), tb("50 岁以上中老年人群", { size: bodySize }), t(" 打造的 UGC 社交与生活服务移动端应用。产品以重庆地域文化（巴渝）为情感锚点，集便民服务（六助体系）、健康管理、社交广场、兴趣社群、积分商城、土货拼购于一体。", { size: bodySize })]));
children.push(p([tb("一句话描述：", { size: bodySize }), t("全国首个以地域文化为锚点、以「社交 + 生活服务 + 健康管理」三位一体为核心的一站式老年智慧生活 App。", { size: bodySize, italics: true })]));

children.push(h2("1.2 产品愿景与使命"));
children.push(p([tb("愿景：", { size: bodySize }), t("成为中国最具温度的老年智慧生活服务平台，让每一位长者都能享受数字时代的便利与温暖，实现「老有所依、老有所乐、老有所为」。", { size: bodySize })]));
children.push(p([tb("使命：", { size: bodySize })]));
children.push(bullet("连接：连接长者与社区、长者与家庭、长者与优质生活服务，打破数字鸿沟和社交孤岛"));
children.push(bullet("赋能：以适老化科技赋能中老年群体，降低数字使用门槛"));
children.push(bullet("守护：通过健康管理、紧急救助、用药提醒等功能，为长者的健康安全提供全天候守护"));
children.push(bullet("激发：通过社交广场、兴趣社群、内容创作，激发长者的社交活力与创造力"));

children.push(h2("1.3 品牌调性"));
children.push(makeTable(
  ["项目", "内容"],
  [
    ["APP 名称", "益寿巴渝"],
    ["品牌色", "暖橙红 #FF6B35"],
    ["情感锚点", "重庆地域文化（巴渝山水、渝中老街、码头文化）"],
    ["宣传口号", "「记录美好生活 · 分享给家人朋友」"],
    ["设计哲学", "零学习成本、零心理负担、零操作障碍"],
  ],
  [2400, 6960]
));

children.push(h2("1.4 核心价值主张"));
children.push(p([t("益寿巴渝解决的根本问题是：中国 5 亿+ 50 岁以上中老年人在数字化时代面临的「三重断裂」——", { size: bodySize })]));
children.push(makeTable(
  ["断裂类型", "具体表现", "益寿巴渝解决路径"],
  [
    ["社交断裂", "退休后社交圈缩小，子女不在身边", "巴渝广场 + 霍圈子构建线上社交家园"],
    ["服务断裂", "需要生活服务但不知道去哪找", "六助服务体系 + 平台信任背书 + 评价机制"],
    ["数字断裂", "想用手机但功能太复杂，担心被骗", "极致适老化设计 + AI 语音交互 + 安全守护"],
  ],
  [2200, 3400, 3760]
));

children.push(h2("1.5 竞争优势"));
children.push(makeTable(
  ["序号", "竞争壁垒", "说明", "可持续性"],
  [
    ["1", "文化情感壁垒", "以「巴渝」地域文化为锚点", "⭐⭐⭐⭐⭐"],
    ["2", "适老化先发优势", "全链路适老化设计", "⭐⭐⭐⭐"],
    ["3", "社交驱动增长", "UGC 社交为核心增长飞轮", "⭐⭐⭐⭐⭐"],
    ["4", "场景闭环", "线上社交→线下服务→线上分享", "⭐⭐⭐⭐"],
    ["5", "银发经济全链路", "六助服务 + 拼购 + 积分商城 + 健康", "⭐⭐⭐⭐"],
  ],
  [800, 2400, 3960, 2200]
));
children.push(pageBreak());

// ── 2. 市场与用户分析 ──
children.push(h1("2. 市场与用户分析"));
children.push(h2("2.1 市场概况"));
children.push(bullet("目标市场：银发经济，2026 年规模约 12 万亿人民币"));
children.push(bullet("目标用户基数：全国 50 岁以上人口约 5 亿，重庆市 50 岁以上人口约 800 万"));
children.push(bullet("政策窗口期：2024-2027 年为最佳切入期"));
children.push(bullet("竞争格局：尚无直接竞品覆盖「社交 + 服务 + 健康」全场景"));

children.push(h2("2.2 目标用户画像"));
children.push(h3("用户分层"));
children.push(makeTable(
  ["用户层级", "年龄", "占比", "数字能力", "核心场景", "平台角色"],
  [
    ["活力退休族", "50-65岁", "45%", "熟练", "社交互动、兴趣社群", "内容生产者+消费者"],
    ["居家养老族", "65-75岁", "35%", "基础", "健康管理、生活服务", "服务消费者"],
    ["高龄照护族", "75岁以上", "15%", "极低", "紧急救助、上门医护", "被动受益者"],
    ["子女决策者", "30-50岁", "5%", "高度熟练", "代父母下单", "付费决策者"],
  ],
  [1800, 1200, 900, 1400, 2200, 1860]
));

children.push(h3("核心用户痛点"));
children.push(makeTable(
  ["痛点", "严重程度", "当前解决方案", "益寿巴渝方案"],
  [
    ["社交圈缩小、孤独感", "高", "广场舞/小区聊天", "巴渝广场熟人内容 + 霍圈子"],
    ["生活服务获取困难", "高", "子女代办、电话求助", "六助一键预约 + 评价体系"],
    ["数字产品使用困难", "高", "放弃使用或求助子女", "适老化大字大按钮 + 语音输入"],
    ["健康管理缺位", "中高", "本子记录/靠记忆", "用药提醒 + 健康日历"],
  ],
  [2400, 1400, 2800, 2760]
));

children.push(h3("典型使用场景"));
children.push(makeTable(
  ["时间", "场景", "频率", "产品触点"],
  [
    ["6:00-8:00", "晨间养生浏览", "每日", "巴渝视频流、健康小贴士"],
    ["9:00-11:00", "上午社交互动", "每日", "霍圈子聊天、评论点赞"],
    ["11:00-13:00", "午间助餐", "每周2-3次", "助餐预约、社区食堂"],
    ["14:00-17:00", "下午兴趣活动", "每周2-3次", "活动报名、文娱课程"],
    ["17:00-19:00", "傍晚内容创作", "每周3-5次", "发布视频/图文"],
    ["19:00-21:00", "晚间浏览购物", "每日", "土货拼购、积分商城"],
    ["21:00-22:00", "睡前健康管理", "每日", "用药提醒确认"],
  ],
  [2000, 2400, 2000, 2960]
));
children.push(pageBreak());

// ── 3. 功能需求清单 ──
children.push(h1("3. 功能需求清单"));
children.push(h2("3.1 功能优先级体系"));
children.push(makeTable(
  ["优先级", "定义", "判断标准"],
  [
    ["P0", "必须具备", "MVP 核心闭环功能，缺一不可上线"],
    ["P1", "应该具备", "重要但不影响核心闭环"],
    ["P2", "可以具备", "锦上添花，资源允许时上线"],
    ["P3", "未来规划", "战略方向，后续版本迭代"],
  ],
  [1800, 2400, 5160]
));

children.push(h2("3.2 功能全景矩阵（摘要）"));
children.push(makeTable(
  ["模块", "核心功能", "屏幕数", "P0", "P1", "P2"],
  [
    ["登录与注册", "手机号验证码/密码/注册/第三方", "1", "1", "1", "-"],
    ["益寿工作台", "问候Banner+13项便民+8项健康", "1", "1", "-", "-"],
    ["便民服务(六助)", "助餐/浴/洁/医/急/行", "6", "2", "4", "-"],
    ["社区生活与文娱", "土货拼购/养老社区/聚会中心等", "6", "1", "4", "1"],
    ["健康管理", "养生助手/万年历/用药提醒", "6", "1", "1", "1"],
    ["巴渝社交广场", "视频流/排名/霍圈子/社区 5Tab", "16", "3", "5", "8"],
    ["消息与通讯录", "聊天/通讯录/好友/通知", "7", "1", "5", "1"],
    ["个人中心", "主页/编辑/内容管理/设置", "14", "2", "8", "4"],
    ["发布", "图文/视频发布", "2", "-", "2", "-"],
    ["积分商城", "首页/详情/兑换/订单", "6", "-", "4", "2"],
    ["土货拼购", "拼购全流程6屏", "6", "1", "-", "-"],
    ["入驻", "服务商/达人入驻", "2", "-", "1", "1"],
  ],
  [2200, 3200, 1000, 700, 700, 700]
));
children.push(p([tb("总计：70 个屏幕，", { size: bodySize }), t("跨 13 个功能模块，P0 功能 16 项、P1 功能 31 项、P2 功能 18 项、P3 功能 0 项。", { size: bodySize })]));
children.push(pageBreak());

// ── 4. 功能需求详述 ──
children.push(h1("4. 功能需求详述"));

// 4.1
children.push(h2("4.1 登录与注册"));
children.push(p([t("屏幕标识：", { size: bodySize }), tm("login"), t(" | 优先级：P0", { size: bodySize })]));
children.push(p([t("支持 4 种登录模式切换（LoginMode）：", { size: bodySize })]));
children.push(makeTable(
  ["模式", "核心交互", "关键规则"],
  [
    ["main", "Logo+APP名称+宣传语+三大圆角入口按钮", "首次进入或退出登录后展示"],
    ["phone-sms", "手机号+验证码(60s倒计时)+协议勾选", "验证码间隔≥60s，每日上限5次"],
    ["password", "手机号+密码(显隐切换)+协议+忘记密码", "密码8-16位，含数字和字母"],
    ["register", "手机号+邀请码(选填)+验证码+密码+协议", "手机号唯一性校验"],
  ],
  [2000, 4000, 3360]
));
children.push(h4("验收标准"));
children.push(bullet("4 种登录模式可正常切换，不丢失已输入信息"));
children.push(bullet("所有登录方式未勾选协议时，登录按钮置灰不可点击"));
children.push(bullet("短信验证码 60 秒倒计时正常"));
children.push(bullet("忘记密码 3 步流程完整：验证手机号→设置新密码→成功提示"));
children.push(bullet("协议全文可在弹窗中完整查看"));

// 4.2
children.push(h2("4.2 益寿工作台"));
children.push(p([t("屏幕标识：", { size: bodySize }), tm("main (yishou Tab)"), t(" | 优先级：P0", { size: bodySize })]));
children.push(makeTable(
  ["区域", "内容", "交互"],
  [
    ["顶部 Banner", "用户头像+个性化问候语+天气+万年历入口", "点击万年历 → calendar-perpetual"],
    ["便民服务", "3列宫格，13项：六助系列+社区生活+文娱", "点击→进入对应服务页面"],
    ["心康体健", "3列宫格，8项：养生助手/用药提醒等", "点击→进入对应功能"],
    ["近期活动", "活动卡片列表", "点击→活动详情"],
  ],
  [2200, 4200, 2960]
));

// 4.3
children.push(h2("4.3 便民服务（六助体系）"));
children.push(h3("4.3.1 助餐服务"));
children.push(p([t("屏幕标识：", { size: bodySize }), tm("service"), t(" | 优先级：P0", { size: bodySize })]));
children.push(bullet("Hero Banner（橙色渐变背景）+ 筛选 Tab：全部/附近/评分最高/价格最低"));
children.push(bullet("餐厅卡片列表：图片+名称+评分+距离+营业时间+人均+特色标签"));
children.push(bullet("预约流程：选时间→选人数→备注→配送方式→费用确认→选地址→提交"));
children.push(bullet("预置数据：6 家餐厅"));

children.push(h3("4.3.2 其他六助服务"));
children.push(makeTable(
  ["服务", "屏幕标识", "优先级", "主题色", "预置数据"],
  [
    ["助浴", "service-zhuyu", "P1", "#1677FF", "4 家"],
    ["助洁", "service-zhujie", "P1", "#52C41A", "4 家"],
    ["助医", "service-zhuyi", "P1", "#FF4D4F", "5 人"],
    ["助急", "service-zhuju", "P0", "#FA8C16", "4 位联系人"],
    ["助行", "service-zhuxing", "P1", "#13C2C2", "4 项"],
  ],
  [1600, 2200, 1400, 1600, 2560]
));

// 4.4
children.push(h2("4.4 社区生活与文娱"));
children.push(makeTable(
  ["服务", "屏幕标识", "优先级", "核心功能"],
  [
    ["土货拼购", "pindan-home → 6屏", "P0", "拼单电商全流程"],
    ["养老社区", "service-yanglao", "P1", "机构卡片+详情+拨打电话"],
    ["周边赶场", "service-ganchang", "P1", "3Tab：今日/明日/赶集日历"],
    ["聚会中心", "service-juhui", "P1", "场所分类Tab+容纳人数"],
    ["大众赛事", "service-bisai", "P1", "赛事分类Tab+咨询报名"],
    ["康养游学", "service-liaoyang", "P2", "游学机构卡片+行程介绍"],
    ["活动节目", "service-activity", "P2", "活动卡片+报名计数"],
  ],
  [2000, 2800, 1400, 3160]
));
children.push(p([t("预置数据：养老社区 4 家 / 赶场 6 家 / 聚会场所 8 家 / 赛事 4 场 / 游学 4 家 / 活动 4 个", { size: smallSize, color: colorGray })]));

// 4.5
children.push(h2("4.5 健康管理"));
children.push(h3("4.5.1 养生助手"));
children.push(p([t("屏幕标识：", { size: bodySize }), tm("health-yangsheng"), t(" | 优先级：P1", { size: bodySize })]));
children.push(bullet("四季养生内容推荐 + 今日养生提示 + 健康小贴士列表"));

children.push(h3("4.5.2 万年历"));
children.push(p([t("屏幕标识：", { size: bodySize }), tm("calendar-perpetual"), t(" | 优先级：P2", { size: bodySize })]));
children.push(bullet("公历+农历双显示 + 当前日期高亮（橙色圆形）+ 节气标注 + 当日宜忌提示"));

children.push(h3("4.5.3 用药提醒"));
children.push(p([t("4 屏：", { size: bodySize }), tm("medication-home/add/calendar/detail"), t(" | 优先级：P0", { size: bodySize })]));
children.push(makeTable(
  ["屏幕", "功能描述"],
  [
    ["medication-home", "今日用药清单+服药状态标签(待服/已服/漏服)+历史记录+添加按钮"],
    ["medication-add", "药品名称+剂量+提醒时间+频次+服用时机+家庭共享开关"],
    ["medication-calendar", "月视图日历+每日服药状态标记+月份切换"],
    ["medication-detail", "单药品完整信息+服药历史记录"],
  ],
  [2800, 6560]
));
children.push(p([t("预置数据：5 种常用药品（降压药、降糖药、钙片、维生素、安眠药）", { size: smallSize, color: colorGray })]));

// 4.6
children.push(h2("4.6 巴渝社交广场"));
children.push(p([t("默认首页，包含 5 个子 Tab：熟人 / 同城 / 排名 / 霍圈子 / 社区", { size: bodySize })]));

children.push(h3("4.6.1 全屏视频流"));
children.push(bullet("全屏显示 + 进度条(约20秒) + 右上角倒计时 + 积分弹窗"));
children.push(bullet("右侧操作栏：头像+关注+点赞(红心动画)+评论+收藏+分享"));
children.push(bullet("支持滚轮/滑动手势 + 上/下一个按钮"));

children.push(h3("4.6.2 排名"));
children.push(bullet("4 个子标签：巴渝头条 / 巴渝劳模(发帖Top10) / 巴渝名人(粉丝Top10) / 巴渝豁棒(互动Top10)"));
children.push(bullet("名次徽章：第1名红色、第2名橙色、第3名黄色、第4-10名灰色"));

children.push(h3("4.6.3 霍圈子（聊天室）"));
children.push(bullet("8 个预置聊天室：广场舞/太极养生/钓鱼/书法/手工DIY/摄影/棋牌/歌唱"));
children.push(bullet("展开详情+创建圈子+聊天室内消息(系统/他人/我的消息)"));

children.push(h3("4.6.4 社交功能子页面"));
children.push(makeTable(
  ["屏幕", "优先级", "功能要点"],
  [
    ["post-detail", "P0", "280px大图/视频+用户信息+正文+话题+评论+操作栏"],
    ["video-feed", "P0", "全屏视频+VideoCommentSheet评论区"],
    ["comment-detail", "P1", "原帖预览+评论列表(回复展开/收起)+输入栏"],
    ["user-profile", "P0", "88px色块头像+数据统计+私信/关注+内容Tab+瀑布流"],
    ["bayu-search", "P1", "搜索框+用户/内容/话题筛选"],
    ["circle-detail", "P2", "圈子活动横幅+描述+成员头像+瀑布流帖子"],
    ["activity-detail", "P2", "活动封面+信息+报名按钮"],
    ["competition-detail", "P2", "赛事封面+信息+参赛要求+咨询报名"],
  ],
  [2800, 1400, 5160]
));

children.push(h3("4.6.5 社区（分类内容广场）"));
children.push(p([t("子 Tab 标识：", { size: bodySize }), tm("community"), t(" | 优先级：P1", { size: bodySize })]));
children.push(p([t("顶部搜索栏 + 「全部分类」标题 + 2 列卡片网格", { size: bodySize })]));
children.push(makeTable(
  ["分类名称", "图标", "内容数", "定位"],
  [
    ["欧冠减肥", "🏃", "28", "中老年科学减脂，健康瘦身不反弹"],
    ["巴渝美食", "🍜", "45", "地道巴渝风味，家常美食教程"],
    ["养生太极", "☯️", "36", "太极功法教学，修身养性"],
    ["广场舞教学", "💃", "52", "热门广场舞曲，跟练教学"],
    ["中医推拿", "🖐️", "22", "中医养生推拿，穴位保健"],
    ["山城钓鱼", "🎣", "19", "重庆钓鱼好去处，钓友交流"],
    ["书法绘画", "✍️", "31", "书法绘画入门，陶冶情操"],
    ["旅游打卡", "📷", "68", "重庆周边游，美景打卡攻略"],
  ],
  [2000, 1000, 1200, 5160]
));
children.push(p([t("社区分类详情页（community-detail）：视频+图文混合列表，共 25 条内容（17 视频 + 8 图文）", { size: smallSize, color: colorGray })]));
children.push(pageBreak());

// ── 5. 信息架构与导航设计 ──
children.push(h1("5. 信息架构与导航设计"));
children.push(h2("5.1 底部主导航"));
children.push(makeTable(
  ["Tab", "标识", "说明"],
  [
    ["益寿", "yishou", "工作台，便民服务 + 健康入口"],
    ["巴渝", "bayu", "社交广场，默认首页"],
    ["消息", "messages", "聊天 + 通讯录 + 通知（红色角标）"],
    ["我的", "profile", "个人中心 + 设置 + 积分"],
  ],
  [1800, 2200, 5360]
));

children.push(h2("5.2 导航机制"));
children.push(bullet("栈式导航：进入子页面 push 到栈顶，返回时 pop"));
children.push(bullet("状态恢复：进入子页面前保存当前 tab 和子 tab 状态"));
children.push(bullet("全局返回规则：益寿→工作台 / 巴渝→广场 / 消息→列表 / 我的→主页"));

children.push(h2("5.3 巴渝子 Tab"));
children.push(makeTable(
  ["子 Tab", "标识", "内容形态"],
  [
    ["熟人", "follow", "关注用户全屏视频流"],
    ["同城", "plaza", "同城用户全屏视频流"],
    ["排名", "hot", "4 个榜单子标签"],
    ["霍圈子", "chatroom", "聊天室列表"],
    ["社区", "community", "8 大分类内容广场 + 搜索"],
  ],
  [2400, 2400, 4560]
));
children.push(pageBreak());

// ── 6. 非功能需求 ──
children.push(h1("6. 非功能需求"));
children.push(h2("6.1 性能需求"));
children.push(makeTable(
  ["指标", "目标值", "测量方式"],
  [
    ["首屏加载时间", "≤ 3 秒（4G网络）", "Lighthouse 评测"],
    ["页面切换响应", "≤ 200ms", "手动测试"],
    ["视频首帧时间", "≤ 1 秒", "手动测试"],
    ["接口响应时间", "≤ 500ms（P95）", "APM 监控"],
    ["崩溃率", "≤ 0.1%", "Crash 监控"],
  ],
  [2800, 2800, 3760]
));

children.push(h2("6.2 安全需求"));
children.push(bullet("数据传输加密：全站 HTTPS，敏感数据 AES-256 加密"));
children.push(bullet("用户隐私保护：符合《个人信息保护法》，最小必要原则收集"));
children.push(bullet("账号安全：验证码防刷机制（每日上限 5 次/手机号）"));
children.push(bullet("内容安全：AI + 人工内容审核"));
children.push(bullet("老年人防诈骗：转账/支付场景增加二次确认和风险提示"));

children.push(h2("6.3 适老化合规需求"));
children.push(bullet("符合工信部《移动互联网应用（APP）适老化通用设计规范》"));
children.push(bullet("符合 W3C WCAG 2.1 AA 级标准"));
children.push(bullet("字体 ≥ 14sp（辅助） / ≥ 17sp（正文）"));
children.push(bullet("可点击区域 ≥ 44×44pt"));
children.push(bullet("正文与背景对比度 ≥ 4.5:1"));
children.push(pageBreak());

// ── 7. 设计系统与规范 ──
children.push(h1("7. 设计系统与规范"));
children.push(h2("7.1 品牌色板"));
children.push(makeTable(
  ["色值变量", "色值", "用途"],
  [
    ["PRIMARY", "#FF6B35", "品牌主色：按钮、标签、高亮"],
    ["PRIMARY_BG", "#FFF4EF", "主色浅背景区域"],
    ["PAGE_BG", "#F5F4F0", "页面通用背景（暖白灰）"],
    ["SUCCESS", "#52C41A", "操作成功/已服标记"],
    ["WARNING", "#FA8C16", "警告提示"],
    ["DANGER", "#FF4D4F", "删除/举报/漏服标记"],
    ["INFO", "#1677FF", "链接/信息"],
  ],
  [2800, 2400, 4160]
));

children.push(h2("7.2 适老化设计规范"));
children.push(makeTable(
  ["规范项", "数值", "说明"],
  [
    ["基础字体", "17sp", "正文阅读舒适"],
    ["标题字体", "≥ 20sp", "信息层级清晰"],
    ["行高", "1.8 倍", "提升可读性"],
    ["按钮最小高度", "56px", "便于老年人点击"],
    ["触摸目标最小", "60×60px", "包含内边距"],
    ["卡片圆角", "16px", "柔和视觉"],
    ["按钮圆角", "28px", "大圆角按钮"],
  ],
  [2600, 2200, 4560]
));

children.push(h2("7.3 内容设计规范"));
children.push(makeTable(
  ["规范", "要求", "示例"],
  [
    ["文案风格", "亲切温暖、口语化", "「张大爷，该吃降压药了哦」"],
    ["称呼方式", "统一使用「您」敬称", "处处使用「您」"],
    ["术语使用", "避免互联网黑话和英文", "「发布」而非「同步」"],
    ["错误提示", "说明原因+解决方案", "「网络好像不太好，请检查后重试」"],
    ["空状态", "引导文案+操作按钮", "「还没有内容，去发布第一条吧」"],
  ],
  [2000, 3200, 4160]
));
children.push(pageBreak());

// ── 8. 数据模型 ──
children.push(h1("8. 数据模型"));
children.push(h2("8.1 用户数据"));
children.push(p([tm("UserProfile {")]));
children.push(p([tm("  id: number, name: string, avatar: string, color: string,")]));
children.push(p([tm("  uid: string (益寿号, YS开头), ip: string, bio: string,")]));
children.push(p([tm("  gender: string, age: number,")]));
children.push(p([tm("  following: number, followers: number, likesReceived: number,")]));
children.push(p([tm("  isFollowed: boolean")]));
children.push(p([tm("}")]));
children.push(p([t("预置约 30 个用户。", { size: smallSize, color: colorGray })]));

children.push(h2("8.2 社区分类与内容数据（v8.0 新增）"));
children.push(p([tm("CommunityCategory {")]));
children.push(p([tm("  id: string, name: string, icon: string (Emoji),")]));
children.push(p([tm("  cover: string, videoCount: number, description: string")]));
children.push(p([tm("}")]));
children.push(p([tm("CommunityVideo {")]));
children.push(p([tm("  id: string, categoryId: string, title: string,")]));
children.push(p([tm("  cover: string, author: string, authorAvatar: string,")]));
children.push(p([tm("  views: number, duration?: string, likes?: number,")]));
children.push(p([tm("  contentType?: 'video' | 'article'")]));
children.push(p([tm("}")]));
children.push(p([t("预置 8 个分类、25 条内容（17 视频 + 8 图文）。", { size: smallSize, color: colorGray })]));

children.push(h2("8.3 其他数据模型"));
children.push(makeTable(
  ["模型", "说明", "预置数量"],
  [
    ["Restaurant", "助餐餐厅", "6 家"],
    ["CleanCompany", "清洁公司", "4 家"],
    ["ServiceStaff", "服务人员（护工/医护）", "各 4-5 人"],
    ["CareInstitution", "康养游学机构", "4 家"],
    ["YanglaoInstitution", "养老社区", "4 家"],
    ["GanchangMarket", "赶场市场", "6 家"],
    ["JuhuiVenue", "聚会场所", "8 家"],
    ["CompetitionInfo", "大众赛事", "4 场"],
    ["PindanProduct", "拼购商品", "7 个"],
    ["PointsGoods", "积分商城商品", "24 个"],
  ],
  [2800, 3000, 2560]
));
children.push(pageBreak());

// ── 9. 接口与集成需求 ──
children.push(h1("9. 接口与集成需求"));
children.push(h2("9.1 外部服务集成"));
children.push(makeTable(
  ["集成服务", "用途", "阶段"],
  [
    ["短信服务商", "验证码发送", "第一阶段"],
    ["微信开放平台", "微信一键登录 + 分享", "第一阶段"],
    ["地图服务（高德/腾讯）", "LBS 定位、周边服务推荐", "第二阶段"],
    ["支付平台", "服务支付、拼购支付", "第二阶段"],
    ["智能硬件 SDK", "手环/血压计等设备数据接入", "第三阶段"],
    ["政府养老平台 API", "养老补贴发放、服务监管", "第三阶段"],
  ],
  [3200, 3400, 2760]
));

children.push(h2("9.2 AI 服务集成"));
children.push(makeTable(
  ["AI 能力", "应用场景", "阶段"],
  [
    ["内容推荐引擎", "巴渝视频流个性化推荐", "第一阶段"],
    ["内容安全审核", "图文/视频自动审核", "第一阶段"],
    ["智能客服", "常见问题自动应答", "第一阶段"],
    ["语音识别 (ASR)", "语音输入/语音搜索", "第二阶段"],
    ["健康异常检测", "健康数据趋势分析+预警", "第二阶段"],
  ],
  [3000, 3600, 2760]
));
children.push(pageBreak());

// ── 10. 发布计划与路线图 ──
children.push(h1("10. 发布计划与路线图"));
children.push(h2("10.1 MVP（v1.0）— 核心闭环验证"));
children.push(p([t("时间：3 个月 | 目标：完成核心功能闭环，在重庆主城 9 区冷启动", { size: bodySize })]));
children.push(makeTable(
  ["模块", "上线范围"],
  [
    ["登录", "手机号验证码登录 + 密码登录 + 注册"],
    ["益寿工作台", "完整 13 项便民服务宫格 + 8 项心康体健宫格"],
    ["便民服务", "助餐（含预约）+ 助急（紧急呼救）"],
    ["巴渝广场", "熟人视频流 + 帖子详情 + 视频播放 + 用户主页"],
    ["消息", "聊天 + 通知中心"],
    ["个人中心", "个人主页 + 编辑资料"],
    ["土货拼购", "全流程 6 屏"],
    ["健康管理", "用药提醒 4 屏"],
  ],
  [2800, 6560]
));

children.push(h2("10.2 v1.1 — 增长与商业化"));
children.push(p([t("时间：MVP 后 3 个月", { size: bodySize })]));
children.push(bullet("新增 P1 所有六助服务（助浴/助洁/助医/助行）"));
children.push(bullet("积分商城完整版 + 发布功能（图文/视频）"));
children.push(bullet("社区生活（养老社区/周边赶场/聚会中心/大众赛事）+ 通讯录 + 好友体系"));

children.push(h2("10.3 v1.2 — 生态与社交深化"));
children.push(p([t("时间：v1.1 后 3 个月", { size: bodySize })]));
children.push(bullet("活动节目 + 康养游学 + 圈子体系完整版 + 达人入驻"));

children.push(h2("10.4 v2.0 — 智能化与全国扩展"));
children.push(p([t("时间：上线 12 个月后", { size: bodySize })]));
children.push(bullet("AI 内容推荐引擎 + 智能语音助手 + 健康硬件联动 + 直播功能"));
children.push(pageBreak());

// ── 11. 成功指标与验收标准 ──
children.push(h1("11. 成功指标与验收标准"));
children.push(h2("11.1 核心 KPI"));
children.push(makeTable(
  ["维度", "指标", "年度目标", "监测频率"],
  [
    ["用户增长", "月活用户数（MAU）", "年增长 ≥ 150%", "月度"],
    ["用户粘性", "次月留存率", "≥ 55%", "月度"],
    ["用户粘性", "日均使用时长", "≥ 25 分钟", "周度"],
    ["用户活跃", "DAU/MAU 比值", "≥ 35%", "周度"],
    ["内容生态", "日均 UGC 发帖量", "年增长 ≥ 100%", "周度"],
    ["服务交易", "月均助老服务订单量", "年增长 ≥ 200%", "月度"],
    ["商业转化", "GMV", "年增长 ≥ 180%", "月度"],
    ["用户满意度", "NPS（净推荐值）", "≥ 50", "季度"],
  ],
  [2200, 3000, 2200, 1960]
));

children.push(h2("11.2 MVP 验收总标准"));
children.push(bullet("全部 P0 功能完成开发并通过测试"));
children.push(bullet("核心任务完成率 ≥ 90%（预约助餐/浏览视频/用药提醒/拼购下单）"));
children.push(bullet("首屏加载时间 ≤ 3 秒（4G 网络）"));
children.push(bullet("无严重/阻塞性 Bug"));
children.push(bullet("适老化合规检查通过（工信部标准）"));
children.push(pageBreak());

// ── 12. 风险与假设 ──
children.push(h1("12. 风险与假设"));
children.push(h2("12.1 关键假设"));
children.push(makeTable(
  ["假设", "验证方式", "优先级"],
  [
    ["50岁以上用户愿意使用 UGC 社交产品", "MVP 数据验证（DAU/内容量/留存率）", "高"],
    ["子女会帮助父母注册和使用 APP", "注册来源 / 邀请链路数据分析", "高"],
    ["六助服务是老年人的真实刚需", "服务下单量 / 复购率", "高"],
    ["巴渝地域文化能有效建立品牌认同", "用户调研 + NPS 评分", "中"],
    ["服务商愿意入驻平台", "服务商入驻申请量 / 活跃度", "中"],
  ],
  [3800, 3600, 1960]
));

children.push(h2("12.2 主要风险与应对"));
children.push(makeTable(
  ["风险", "可能性", "影响", "应对策略"],
  [
    ["目标用户数字素养不足", "中", "高", "社区地推+老年大学合作+子女邀请裂变"],
    ["服务供给质量参差不齐", "高", "高", "服务商评级体系+定期巡检+用户评价"],
    ["互联网巨头进入银发赛道", "中", "高", "加速建立社交关系链+文化壁垒"],
    ["老年人数据安全舆情风险", "中", "高", "严格合规体系+透明隐私政策"],
  ],
  [2800, 1200, 1200, 4160]
));
children.push(pageBreak());

// ── 13. 附录 ──
children.push(h1("13. 附录"));
children.push(h2("13.1 完整屏幕清单（70 屏）"));
children.push(makeTable(
  ["模块", "屏幕数"],
  [
    ["登录", "1"],
    ["主界面", "1"],
    ["便民服务（六助）", "6"],
    ["社区生活与文娱", "6"],
    ["健康管理", "6"],
    ["巴渝社交广场", "16"],
    ["消息与通讯录", "3"],
    ["通知中心", "4"],
    ["个人中心", "14"],
    ["发布", "2"],
    ["积分商城", "6"],
    ["土货拼购", "6"],
    ["入驻", "2"],
    ["合计", "70"],
  ],
  [5000, 4360]
));

children.push(h2("13.2 弹窗与浮层组件"));
children.push(makeTable(
  ["组件", "用途", "出现场景"],
  [
    ["BookingModal", "助餐预约", "助餐页「立即预约」"],
    ["MapAddressPicker", "地图选址", "预约中选择地址"],
    ["ShareSheet", "分享面板", "帖子/用户/视频"],
    ["VideoCommentSheet", "视频评论区", "视频播放页"],
    ["ForgetPasswordModal", "忘记密码(3步)", "密码登录页"],
    ["CreateRoomModal", "创建聊天室", "霍圈子页"],
    ["PointsEarnedToast", "积分获取提示", "视频/帖子浏览完成"],
    ["ReportModal", "举报(7个原因)", "用户主页"],
  ],
  [3200, 3000, 3160]
));

children.push(h2("13.3 技术栈"));
children.push(makeTable(
  ["技术", "用途"],
  [
    ["React 18 + TypeScript", "前端框架"],
    ["Vite", "构建工具"],
    ["Ant Design Icons", "图标库"],
    ["Tailwind CSS", "样式系统"],
  ],
  [3000, 6360]
));

children.push(h2("13.4 术语表"));
children.push(makeTable(
  ["术语", "说明"],
  [
    ["六助", "助餐/助浴/助洁/助医/助急/助行"],
    ["巴渝", "重庆地域文化品牌，巴渝广场是社交模块名称"],
    ["益寿", "工作台模块名称"],
    ["霍圈子", "兴趣聊天室模块名称"],
    ["社区", "巴渝社交广场第 5 子 Tab，8 大分类内容广场"],
    ["土货拼购", "拼单电商模块"],
    ["益寿号", "用户唯一标识（YS 开头）"],
  ],
  [2400, 6960]
));

children.push(new Paragraph({ spacing: { before: 400 }, children: [] }));
children.push(divider());
children.push(p([t("文档结束", { size: bodySize, italics: true, color: colorGray })], { alignment: AlignmentType.CENTER }));
children.push(p([t("本文档为益寿巴渝 APP 唯一权威产品需求文档，所有功能需以此为基准。版本更新需经产品负责人审批。", { size: smallSize, color: colorGray, italics: true })], { alignment: AlignmentType.CENTER }));

// ═══════════════════════════════════════════
// Finalize Document
// ═══════════════════════════════════════════

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: fontMain, size: defaultSize } },
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: heading1Size, bold: true, font: fontMain, color: colorPrimary },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: heading2Size, bold: true, font: fontMain, color: colorDark },
        paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 1 },
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: heading3Size, bold: true, font: fontMain, color: colorDark },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 },
      },
      {
        id: "Heading4", name: "Heading 4", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: heading4Size, bold: true, font: fontMain, color: colorDark },
        paragraph: { spacing: { before: 160, after: 100 }, outlineLevel: 3 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
      {
        reference: "numbers",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 1440, right: 1300, bottom: 1440, left: 1300 },
      },
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: colorPrimary, space: 4 } },
            spacing: { after: 80 },
            children: [
              new TextRun({ text: "益寿巴渝 APP — 产品需求文档（PRD）", font: fontMain, size: 18, color: colorGray }),
              new TextRun({ text: "\t\tv8.0 | 内部/机密", font: fontMain, size: 18, color: colorGray }),
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          }),
        ],
      }),
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            border: { top: { style: BorderStyle.SINGLE, size: 2, color: "E0E0E0", space: 4 } },
            children: [
              new TextRun({ text: "第 ", font: fontMain, size: 18, color: colorGray }),
              new TextRun({ children: [PageNumber.CURRENT], font: fontMain, size: 18, color: colorGray }),
              new TextRun({ text: " 页", font: fontMain, size: 18, color: colorGray }),
            ],
          }),
        ],
      }),
    },
    children,
  }],
});

const outputPath = "d:\\王旭东\\Codex-project\\yishou_china\\output\\益寿巴渝APP-产品需求文档-PRD-v8.0.docx";
fs.mkdirSync("d:\\王旭东\\Codex-project\\yishou_china\\output", { recursive: true });

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log("✅ 文档生成成功: " + outputPath);
  console.log("   文件大小: " + (buffer.length / 1024).toFixed(1) + " KB");
});
