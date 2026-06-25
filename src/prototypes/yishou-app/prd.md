# 益寿巴渝 APP — 产品需求文档

> **版本**: v6.0
> **日期**: 2026-06-10
> **说明**: 本文档完全基于 `index.tsx`（~980KB）实际代码实现重新生成，涵盖所有已实现的 64 个屏幕、完整数据结构与交互规格。

---

## 1. 产品概述

### 1.1 产品定位

专为 **50 岁以上中老年人群**打造的 UGC 社交与生活服务移动端 APP。集便民服务（七助+社区生活）、健康管理、社交广场、兴趣社群、积分商城、土货拼购于一体。品牌以重庆本地文化（巴渝）为情感锚点，以「界面极简、操作友好、温暖亲切」为核心设计原则。

### 1.2 目标用户

- **年龄**: 50 岁以上，主力 55-75 岁
- **数字能力**: 从基础（能接打电话）到熟练（能发朋友圈），覆盖不同层次
- **核心诉求**: 社交陪伴（广场舞/太极/钓鱼）、健康管理（养老社区/养生）、生活便利（助餐/助医/助行）、兴趣学习（书法/手工/摄影）
- **操作偏好**: 大字、大按钮、少步骤、高对比度

### 1.3 品牌调性

- APP 名称: **益寿巴渝**
- 品牌色: 暖橙红 `#FF6B35`
- 情感锚点: 重庆地域文化（巴渝山水、渝中老街、码头文化）
- 宣传口号: 「记录美好生活 · 分享给家人朋友」

---

## 2. 完整屏幕状态机

```
AppScreen =
  // -- 登录 --
  | 'login'                          // 登录首页（4种登录模式切换）
  | 'main'                           // 主界面（4个 Tab 切换）
  // -- 便民服务（七助） --
  | 'service'                        // 助餐（餐厅列表+预约+地图选址）
  | 'service-zhuyu'                  // 助浴（护工列表+拨打电话）
  | 'service-zhujie'                 // 助洁（清洁套餐列表）
  | 'service-zhuyi'                  // 助医（医护服务人员列表）
  | 'service-zhuju'                  // 助急（紧急联系+一键呼救）
  | 'service-zhuxing'                // 助行（出行类型列表）
  // -- 便民服务（社区生活+文娱） --
  | 'service-liaoyang'               // 康养游学（机构卡片列表）
  | 'service-activity'               // 活动节目（活动列表+报名）
  | 'service-yanglao'                // 养老社区（机构列表+拨打电话）
  | 'service-ganchang'               // 周边赶场（Tab切换+市场列表+赶集日历）
  | 'service-juhui'                   // 聚会中心（场所分类Tab+容纳人数）
  | 'service-bisai'                  // 大众赛事（赛事分类Tab+咨询报名）
  // -- 健康 --
  | 'health-yangsheng'               // 养生助手（四季养生+今日提示）
  | 'calendar-perpetual'             // 万年历（节气+宜忌）
  // -- 社交广场（巴渝） --
  | 'chat'                           // 聊天对话（语音/文字/图片）
  | 'post-detail'                    // 帖子详情（图文+话题+评论+积分弹窗）
  | 'video-feed'                     // 视频播放（全屏+评论区）
  | 'comment-detail'                 // 评论详情（原帖+评论+回复展开）
  | 'circle-detail'                  // 圈子详情（活动横幅+瀑布流）
  | 'circle-discover'                // 发现圈子（搜索+推荐+全部）
  | 'circle-announce'                // 发布公告
  | 'circle-members'                 // 管理成员
  | 'circle-activity'                // 发起活动
  | 'activity-detail'                // 活动详情+报名
  | 'competition-detail'             // 赛事详情（大众赛事的详情页）
  | 'user-profile'                   // 用户主页（图文/视频Tab+操作菜单）
  // -- 个人中心（我的） --
  | 'my-dynamics'                    // 我的动态（时间轴+可删除）
  | 'my-favorites'                   // 我的收藏（显示原作者）
  | 'my-detail'                      // 我的喜欢
  | 'follow-list'                    // 关注列表（互关/粉丝/关注 Tab）
  | 'settings'                       // 账号设置主菜单
  | 'my-profile'                     // 编辑资料
  | 'my-wallet'                      // 我的钱包（余额+积分+交易记录）
  | 'address-management'             // 地址管理（增删改+省市区选择）
  | 'change-password'                // 修改密码（3步流程）
  | 'account-cancellation'           // 账号注销（3项条件+7天冷静期）
  | 'privacy-settings'               // 隐私设置
  | 'notification-settings'          // 通知设置
  | 'check-update'                   // 检查更新
  | 'about-us'                       // 关于我们
  // -- 发布 --
  | 'create-select'                  // 发布选择（发图文/发视频）
  | 'create-image'                   // 发图文
  | 'create-video'                   // 发视频
  // -- 通讯录与消息 --
  | 'contacts'                       // 通讯录（好友列表+新朋友+群聊）
  | 'friend-requests'                // 新的朋友（好友申请列表）
  | 'friend-detail'                  // 好友详情
  // -- 通知中心 --
  | 'notify-likes'                   // 点赞通知
  | 'notify-thumbs'                  // 收藏通知
  | 'notify-comments'                // 评论通知（含回复/at提及）
  | 'notify-fans'                    // 粉丝通知
  // -- 积分商城 --
  | 'points-mall'                    // 积分商城（分类+轮播+瀑布流）
  | 'points-detail'                  // 商品详情（轮播+规格+购买须知）
  | 'points-records'                 // 我的兑换（Tab筛选+状态）
  | 'mall-favorites'                 // 商城收藏
  | 'mall-address'                   // 收货地址
  // -- 订单 --
  | 'order-detail'                   // 订单详情
  // -- 其他 --
  | 'bayu-search'                    // 巴渝搜索
  // -- 土货拼购（pindan 拼单系统） --
  | 'pindan-home'                    // 拼购首页（活动列表+入口图）
  | 'pindan-activity'                // 拼购活动详情（商品列表）
  | 'pindan-product'                 // 商品详情（规格选择+数量）
  | 'pindan-confirm'                 // 确认订单（地址+支付）
  | 'pindan-orders'                  // 我的订单（Tab筛选+状态操作）
  | 'pindan-order-detail'            // 订单详情
  // -- 入驻 --
  | 'partner-join'                   // 成为服务商（表单+信息展示）
  | 'influencer-join'                // 成为达人（表单+信息展示）
```

**共计 64 个屏幕/状态**

---

## 3. 信息架构

### 3.1 底部 Tab 栏

```
BOTTOM_TABS = [
  { id: 'yishou', label: '益寿', Icon: AppstoreOutlined },   // Tab1
  { id: 'bayu',   label: '巴渝', Icon: FireOutlined },       // Tab2
  { id: 'messages', label: '消息', Icon: MessageOutlined, badge: 15 },
  { id: 'profile', label: '我的', Icon: UserOutlined },
]
```

> **注意**: `activeTab` 初始状态为 `'bayu'`（巴渝），即巴渝是默认首页，益寿是第二 Tab。底部 Tab 视觉顺序为益寿>巴渝>消息>我的，但首次打开应用先进入巴渝。

### 3.2 Tab1 -- 益寿（工作台）

```
益寿工作台
├── 顶部问候 Banner（头像+问候+天气26度晴+万年历入口）
├── 便民服务（3列网格，13项）
│   ├── 助系列（6项）：助浴/助餐/助洁/助医/助急/助行
│   ├── 社区生活（4项）：土货拼购->pindan-home/养老社区/周边赶场/聚会中心
│   └── 文娱（3项）：大众赛事/康养游学/活动节目
├── 心康体健（3列网格，8项）
│   ├── 养生助手->health-yangsheng/用药提醒/健康饮食
│   ├── 现学现教/套路鉴别/安全交友
│   └── 价格查询/技能变现
└── 近期活动（活动卡片列表）
```

### 3.3 Tab2 -- 巴渝（社交广场，默认首页）

```
巴渝社交广场
├── 子 Tab（4个）：熟人/同城/排名/霍圈子
├── 搜索图标（右上角）-> bayu-search
├── + 发布按钮 -> create-select
│
├── 【熟人】全屏视频流（封面背景+进度条+倒计时+操作栏）
├── 【同城】全屏视频流（与熟人布局一致）
├── 【排名】标签式子 Tab
│   ├── 巴渝头条（新闻图文卡片）
│   ├── 巴渝劳模（发帖数 Top10）
│   ├── 巴渝名人（粉丝数 Top10）
│   └── 巴渝豁棒（互动数 Top10）
└── 【霍圈子】圈子列表（管理模式+发现+进入）
```

### 3.4 Tab3 -- 消息

```
消息 Tab
├── 搜索栏
├── 通讯录入口 -> contacts
├── 新的朋友入口 -> friend-requests（红色角标）
├── 通知中心入口组
│   ├── 点赞通知 -> notify-likes
│   ├── 收藏通知 -> notify-thumbs
│   ├── 评论通知 -> notify-comments
│   └── 粉丝通知 -> notify-fans
└── 聊天列表（头像+名称+最新消息+时间+未读角标）-> chat
```

### 3.5 Tab4 -- 我的（个人中心）

```
我的 Tab
├── 头部渐变区域（橙色 #FF6B35）
│   ├── 设置按钮 -> settings
│   ├── 80px头像+白色边框
│   ├── 昵称+性别年龄标签（男66岁）
│   ├── 益寿号+地区
│   ├── 简介
│   ├── 数据统计行（互关/粉丝/关注/获赞）-> follow-list
│   └── 编辑资料 -> my-profile
├── 功能入口（4列网格）：我的订单/积分商城/我的钱包/优惠券
├── 宣传卡片：成为服务商 -> partner-join / 成为达人 -> influencer-join
├── 我的服务（4列网格）：会员中心/收货地址/优惠券/积分明细/签到中心/客服中心
└── 版本信息：益寿巴渝APP v1.0.0
```

---

## 4. 核心功能详述

### 4.1 登录与注册

**登录方式切换**（LoginMode）：
- `'main'` -- 登录首页：Logo + APP名称 + 宣传语 + 三大按钮（手机号登录/密码登录/立即注册）
- `'phone-sms'` -- 短信验证码登录：+86前缀 + 11位手机号 + 验证码60s倒计时 + 协议勾选
- `'password'` -- 密码登录：手机号 + 密码显隐切换 + 忘记密码（3步弹窗：验证手机号>设置新密码>成功）
- `'register'` -- 注册：手机号 + 邀请码（选填） + 验证码 + 密码（8-16位） + 协议勾选
- 第三方授权绑定：模拟第三方登录后绑定手机号（两步流程）

**协议要求**: 所有登录方式需勾选「用户协议」和「隐私政策」后方可提交，支持弹窗查看全文

### 4.2 助餐服务（service）

- Hero Banner（橙色渐变）
- 筛选 Tab：全部/附近/评分最高/价格最低
- 餐厅卡片列表（图片90x72px、名称、评分、评分人数、距离、营业时间、人均价格、特色标签、支持送餐标签）
- 底部「拨打电话」按钮
- BookingModal：点击「立即预约」弹出（就餐时间/人数/备注/配送方式/预计费用+送餐地址+地图选址）
- MapAddressPicker：模拟地图选址（预设位置列表+详细地址输入）

### 4.3 其他便民服务

| 屏幕 | 主题色 | 布局特点 |
|------|--------|----------|
| service-zhuyu（助浴） | #1677FF | 护工机构卡片列表+拨打电话 |
| service-zhujie（助洁） | #52C41A | 清洁套餐卡片（基础/深度/专项） |
| service-zhuyi（助医） | #FF4D4F | 医护服务人员列表+拨打电话 |
| service-zhuju（助急） | #FA8C16 | 2x2紧急联系网格+一键呼救大按钮 |
| service-zhuxing（助行） | #13C2C2 | 出行类型列表+拨打电话 |
| service-liaoyang（康养游学） | #722ED1 | 游学机构卡片列表+拨打电话 |
| service-activity（活动节目） | #EB2F96 | 活动卡片列表+报名计数 |
| service-yanglao（养老社区） | #722ED1 | 养老机构卡片（评分4.6-4.9）+拨打电话 |
| service-ganchang（周边赶场） | #13C2C2 | Tab切换（今日/明日/赶集日历）+市场卡片 |
| service-juhui（聚会中心） | #EB2F96 | 场所分类Tab（全部/茶馆/会议室/KTV）+容纳人数 |
| service-bisai（大众赛事） | #FA8C16 | 赛事分类Tab（全部/健身/文化/兴趣）+competition-detail |

### 4.4 巴渝社交广场

#### 4.4.1 熟人/同城（全屏视频流）
- 黑色背景，帖子封面全屏（opacity 0.85+底部渐隐）
- 视频进度条（每200ms加1%，约20秒走完）
- 5秒圆圈倒计时（SVG圆弧，右上角）
- 倒计时完成显示橙色胶囊"+15分"
- 右侧操作栏：头像+关注(绿色渐变2秒消失)/点赞红心/评论/收藏/分享
- 切换交互：滚轮/滑动手势+上一个/下一个按钮
- 积分弹窗：进度100%弹出（+10分，3秒自动消失）

#### 4.4.2 排名
- 巴渝头条：新闻图文卡片列表
- 巴渝劳模/名人/豁棒：用户卡片列表（排名序号+头像+名称+数据）
- 排名徽章：第1名红色/第2名橙色/第3名黄色/4-10名灰色

#### 4.4.3 圈子
- circle-detail：圈子头图+CircleActivityBanner（4秒轮播）+公告+2列瀑布流+发布按钮
- circle-discover：搜索+推荐圈子+全部圈子（9个）+关注/进入按钮
- 管理：circle-announce/circle-members/circle-activity

### 4.5 帖子详情（post-detail）
- 280px大图/视频封面 + 用户信息行 + 正文 + 话题标签 + 评论列表 + 底部操作栏
- 积分弹窗（视频帖播放完成触发）

### 4.6 视频播放（video-feed）
- 全屏模式 + VideoCommentSheet（底部Sheet评论区）

### 4.7 评论详情（comment-detail）
- 原帖预览 + 评论列表（回复展开/收起）+ 底部输入栏

### 4.8 用户主页（user-profile）
- 88px彩色字母头像 + 数据统计 + 私信/关注/更多按钮
- 内容Tab（图文/视频）+ 2列瀑布流
- 更多操作：添加好友/分享名片/举报（7个原因）/拉黑

### 4.9 积分商城（points-mall）
- 积分余额卡片 + 分类Tab（全部/实物好礼/健康保健/兴趣休闲/平台优惠券）
- 热门兑换轮播 + 双列商品瀑布流
- 商品详情：图片轮播 + 规格选择 + 购买须知/售后须知
- 预置21个商品（gift 6/health 5/hobby 5/coupon 5）

### 4.10 我的动态/收藏/喜欢
- 共用TimelineGridScreen组件：筛选Tab + 时间轴 + 3列网格
- my-dynamics（7条，可删除）/ my-favorites（8条，显示原作者）/ my-detail（10条）

### 4.11 通讯录与好友
- contacts：新朋友+群聊+好友列表（字母索引）
- friend-requests：申请列表（接受/拒绝按钮）

### 4.12 通知中心
- notify-likes/notify-thumbs/notify-comments/notify-fans
- 各5条预置数据

### 4.13 发布流程
- create-select：发布选择（发图文橙色/发视频蓝色）
- create-image/create-video：上传区+标题+正文+发布按钮

### 4.14 聊天（chat）
- 消息列表（文字/语音/图片）+ 语音播放 + 输入栏（语音/键盘/发送/更多）
- 预置15条对话（子女与老人温馨场景）

### 4.15 土货拼购（pindan系统）
- pindan-home：活动列表（2个活动）+ 我的订单入口
- pindan-activity：活动详情 + 商品列表（7个商品）
- pindan-product：商品大图 + 原价/拼购价 + 数量选择 + 立即购买
- pindan-confirm：收货地址 + 商品摘要 + 支付模拟
- pindan-orders：Tab筛选（全部/待付款/待收货/已完成/已取消）+ 操作按钮
- pindan-order-detail：订单状态+物流+收货信息+商品清单+金额明细

### 4.16 入驻功能
- partner-join（成为服务商）：权益介绍（4项）+ 入驻表单
- influencer-join（成为达人）：权益介绍（4项）+ 入驻表单

### 4.17 万年历（calendar-perpetual）
- 当前日期高亮 + 农历显示 + 节气标注 + 宜忌提示 + 月份切换

### 4.18 赛事详情（competition-detail）
- 封面图 + 赛事信息 + 描述 + 参赛要求 + 咨询报名

---

## 5. 完整数据结构

### 5.1 用户数据
```
UserProfile { id, name, avatar, color, uid(YS开头), ip, bio, following, followers, likesReceived, isFollowed }
```
预置约30个用户（id 1-310），当前用户 id=0（张大爷）

### 5.2 帖子数据
```
FollowPost { id, userId, user, avatar, avatarColor, type(image/video), coverSeed, coverHeight, title, likes, comments?, saves?, shares?, date?, images? }
```

### 5.3 圈子数据
```
CircleInfo { name, members, tag, color }
```
已加入7个圈子，全部16个圈子

### 5.4 聊天数据
```
ChatMessage { id, type(text/voice/image), sender(me/other), content?, duration?, image?, time?, userId? }
```

### 5.5 拼单数据
```
PindanActivity { id, title, description, coverImage, totalQuota, remainingQuota, startTime, endTime, status(upcoming/ongoing/ended) }
PindanProduct { id, activityId, name, image, originalPrice, pindanPrice, description, stock, sold }
PindanOrder { id, orderNo, status(pending/paid/shipped/completed/cancelled), totalAmount, address, contact, phone, products[], createdAt, paidAt?, shippedAt?, completedAt? }
```

### 5.6 赛事数据
```
CompetitionInfo { id, title, category, date, location, organizer, description, requirements[], contact, image }
```
预置4条赛事

### 5.7 积分商城数据
```
PointsGoods { id, name, points, cash?, remaining, category(gift/health/hobby/coupon), stock, desc, image, images[], specs?, detailImages?, purchaseNotes?, afterSalesNotes?, jdPrice?, taobaoPrice? }
PointsRecord { id, goodsId, goodsName, image, time, status(待付款/待收货/已完成/已取消), logistics? }
```

### 5.8 餐厅/机构数据
```
Restaurant { id, name, distance, rating, ratingCount, hours, price, tags[], delivery, image, highlight? }
```
同类型：CleanCompany / ZhujuCompany / ZhuxingCompany / CareInstitution / YanglaoInstitution

### 5.9 关注列表数据
```
FollowListUser { id, name, note?, avatar?, gender(男/女), age, location }
```

---

## 6. 设计系统

### 6.1 品牌颜色
| 变量 | 值 | 用途 |
|------|-----|------|
| PRIMARY | #FF6B35 | 品牌主色（暖橙红） |
| PRIMARY_BG | #FFF4EF | 主色浅背景 |
| PAGE_BG | #F5F4F0 | 页面背景（暖白灰） |
| CHAT_BG | #EFF1F5 | 聊天背景 |
| 成功 | #52C41A | 成功状态 |
| 警告 | #FA8C16 | 警告 |
| 危险 | #FF4D4F | 危险/删除 |
| 信息 | #1677FF | 信息 |

### 6.2 适老化规范
| 项目 | 规范 |
|------|------|
| 基础字体 | 16px |
| 最小字体 | 12px |
| 按钮高度 | >=56px |
| 触摸目标 | >=60px |
| 卡片圆角 | 16px (rounded-2xl) |
| 按钮圆角 | 28px (rounded-2xl) |
| 弹窗圆角 | 24px (rounded-3xl) |
| 行距 | 1.8倍 |
| 操作反馈 | active:scale-95 |
| 手机尺寸 | 390x844px |

### 6.3 排行榜徽章
第1名 #FF4D4F / 第2名 #FA8C16 / 第3名 #FAAD14 / 4-10名 rgba(0,0,0,0.42)

---

## 7. 组件清单

### 7.1 登录组件
MainLoginScreen / PhoneSMSScreen / PasswordScreen / RegisterScreen / ThirdPartyBindScreen

### 7.2 服务组件
ServiceImageTile / RestaurantCard / BookingModal / MapAddressPicker

### 7.3 社交组件
ShareSheet / MoreMenuBubble / AddFriendModal / ShareCardSheet / ReportModal / BlockModal / CircleActivityBanner / VideoCommentSheet

### 7.4 聊天组件
ChatAvatar / ChatBubble / VoiceBubble / ChatInputBar

### 7.5 Tab组件
BayuTab / YishouTab / MessagesTab / ProfileTab

### 7.6 内容组件
TimelineGridScreen / TimeDivider / FollowVideoFeed

---

## 8. 导航关系摘要

| 来源 | 目标屏 |
|------|--------|
| 益寿工作台宫格 | 13项服务屏 / health-yangsheng / pindan-home |
| 益寿顶部 | calendar-perpetual |
| 巴渝Tab | bayu-search / create-select / post-detail / video-feed / circle-detail / circle-discover |
| 消息Tab | contacts / friend-requests / notify-* / chat |
| 我的Tab | settings / my-profile / my-wallet / follow-list / points-mall / partner-join / influencer-join / my-dynamics / my-favorites / my-detail |
| 子屏返回 | 均使用 goBack() 返回上一屏或 main |

---

## 9. 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2026-03-31 | 初版 |
| v2.0 | 2026-05-09 | 更新功能规格 |
| v3.0 | 2026-06-04 | 基于代码更新状态机 |
| v4.0 | 2026-06-04 | 完全基于 index.tsx 重构 |
| v5.0 | 2026-06-09 | 新增养老社区/周边赶场/聚会中心/大众赛事 |
| v5.1 | 2026-06-09 | 我的页面新增服务商/达人入口 |
| **v6.0** | **2026-06-10** | **完全基于最新代码重新生成：覆盖64屏，新增万年历/土货拼购(6屏)/入驻(2屏)/赛事详情，补充全部数据结构和组件清单** |
