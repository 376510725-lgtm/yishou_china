# 益寿巴渝 APP — 功能规格文档（SPEC）

> **版本**: v4.0
> **日期**: 2026-06-04
> **说明**: 本文档完全基于 `index.tsx` 实际代码实现，涵盖所有组件、数据结构和交互规格。

---

## 1. 组件清单

### 1.1 登录组件

| 组件名 | 说明 | 关键特性 |
|--------|------|----------|
| `MainLoginScreen` | 主登录页 | Logo + 宣传语 + 手机号登录/立即注册按钮 |
| `PhoneSMSScreen` | 手机号验证码登录 | +86前缀 + 验证码60s倒计时 + 协议勾选 + 弹窗查看协议/隐私 |
| `PasswordScreen` | 密码登录 | 密码显隐切换 + 忘记密码弹窗（3步：验证手机→设置新密码→成功） |
| `RegisterScreen` | 注册页 | 手机号 + 邀请码（选填） + 验证码 + 密码（8-16位） + 协议勾选 |
| `ThirdPartyBindScreen` | 第三方登录绑定手机号 | 两步流程（手机号→验证码确认） |

### 1.2 服务详情组件

| 组件名 | 说明 |
|--------|------|
| `ServiceTile` | 服务图标（图标圆+文字标签） |
| `ServiceImageTile` | 服务图片卡片（图片+标签） |
| `RestaurantCard` | 餐厅卡片（图片90×72 + 名称/评分/距离/标签/立即预约） |
| `BookingModal` | 预约确认弹窗（含送餐地址字段 + 地图选址） |

### 1.3 社交组件

| 组件名 | 说明 |
|--------|------|
| `ShareSheet` | 分享面板（私信好友/微信好友/朋友圈/复制链接） |
| `MoreMenuBubble` | 更多菜单气泡（添加好友/分享名片/举报/拉黑） |
| `AddFriendModal` | 添加好友（仿微信，3步：确认→填写验证语→发送成功） |
| `ShareCardSheet` | 分享名片（名片预览 + 4个分享入口） |
| `ReportModal` | 举报弹窗（7个原因选项 + 提交成功） |
| `BlockModal` | 拉黑确认（确认后显示成功，自动取消关注） |
| `CircleActivityBanner` | 圈子活动横幅（每4秒自动轮播 + x/n计数） |

### 1.4 内容组件

| 组件名 | 说明 |
|--------|------|
| `ChatAvatar` | 聊天头像 |
| `ChatBubble` | 聊天气泡（文字/语音/图片） |
| `VoiceBubble` | 语音气泡（播放/暂停切换） |
| `ChatInputBar` | 聊天输入栏（语音/键盘切换 + 发送/更多按钮） |
| `VideoCommentSheet` | 视频评论区（sheet/inline两种模式） |
| `TimeDivider` | 时间分隔线 |

### 1.5 主 Tab 组件

| 组件名 | 说明 |
|--------|------|
| `BayuTab` | 巴渝社交广场（含4个子Tab：熟人/同城/排名/霍圈子） | ← Tab1（默认首页）
| `YishouTab` | 益寿工作台（问候Banner + 便民服务3列 + 心康体健3列 + 近期活动卡片） | ← Tab2 |
| `ServiceTile` / `ServiceImageTile` | 服务图标卡片 |

---

## 2. 数据常量

### 2.1 颜色常量

```typescript
const PRIMARY = '#FF6B35';           // 品牌主色（暖橙红）
const PRIMARY_BG = '#FFF4EF';         // 主色浅背景
const PAGE_BG = '#F5F4F0';           // 页面背景（暖白灰）
const CHAT_BG = '#EFF1F5';            // 聊天背景

// LOGIN_BG：渐变背景
'linear-gradient(160deg, #FFF3E8 0%, #FFF8F0 40%, #FFF0F5 70%, #F0F4FF 100%)'
```

### 2.2 排行榜徽章颜色

| 排名 | 颜色代码 | 用途 |
|------|----------|------|
| 第1名 | `#FF4D4F` | 红色 |
| 第2名 | `#FA8C16` | 橙色 |
| 第3名 | `#FAAD14` | 黄色 |
| 第4-10名 | `rgba(0,0,0,0.42)` | 灰色 |

### 2.3 功能色

| 用途 | 颜色 |
|------|------|
| 成功 | `#52C41A` |
| 警告 | `#FA8C16` |
| 危险 | `#FF4D4F` |
| 信息 | `#1677FF` |

### 2.4 便民服务颜色

```typescript
const SERVICES = [
  { label: '助浴', color: '#1677FF', bg: '#E6F4FF' },
  { label: '助餐', color: '#FF6B35', bg: '#FFF4EF' },
  { label: '助洁', color: '#52C41A', bg: '#F6FFED' },
  { label: '助医', color: '#FF4D4F', bg: '#FFF2F0' },
  { label: '助急', color: '#FA8C16', bg: '#FFF7E6' },
  { label: '助行', color: '#13C2C2', bg: '#E6FFFB' },
  { label: '土货拼购', color: '#FF6B35', bg: '#FFF4EF' },
  { label: '养老社区', color: '#722ED1', bg: '#F9F0FF' },
  { label: '周边赶场', color: '#13C2C2', bg: '#E6FFFB' },
  { label: '聚会中心', color: '#EB2F96', bg: '#FFF0F6' },
  { label: '大众赛事', color: '#FA8C16', bg: '#FFF7E6' },
  { label: '康养游学', color: '#722ED1', bg: '#F9F0FF' },
  { label: '活动节目', color: '#EB2F96', bg: '#FFF0F6' },
];
```

### 2.5 心康体健颜色

```typescript
const HEALTH_TOOLS = [
  { label: '养生助手', color: '#52C41A', bg: '#F6FFED' },
  { label: '用药提醒', color: '#1677FF', bg: '#E6F4FF' },
  { label: '健康饮食', color: '#FA8C16', bg: '#FFF7E6' },
  { label: '现学现教', color: '#13C2C2', bg: '#E6FFFB' },
  { label: '套路鉴别', color: '#FF4D4F', bg: '#FFF2F0' },
  { label: '安全交友', color: '#EB2F96', bg: '#FFF0F6' },
  { label: '价格查询', color: '#722ED1', bg: '#F9F0FF' },
  { label: '技能变现', color: '#FAAD14', bg: '#FFFBE6' },
];
```

---

## 3. 屏幕布局规格

### 3.1 容器结构

| 项目 | 尺寸 |
|------|------|
| 手机尺寸 | 390 × 844px |
| 状态栏 | 44px |
| 导航栏 | ~54px |
| Tab 栏 | ~56px |
| 图标宫格 | 52×52px（ServiceImageTile） |
| 按钮高度 | ≥56px |
| 触摸目标 | ≥60px |

### 3.2 卡片圆角

| 组件 | 圆角 |
|------|------|
| 服务卡片 | 14px（rounded-xl） |
| 功能卡片 | 16px（rounded-2xl） |
| 按钮 | 28px（rounded-2xl，胶囊形） |
| 输入框 | 16px（rounded-2xl） |
| 弹窗 | 24px（rounded-3xl） |

---

## 4. 子 Tab 配置

### 4.1 底部 Tab

```typescript
const BOTTOM_TABS = [
  { id: 'bayu', label: '巴渝', Icon: FireOutlined },   // 默认首页
  { id: 'yishou', label: '益寿', Icon: AppstoreOutlined },
  { id: 'messages', label: '消息', Icon: MessageOutlined, badge: 15 },
  { id: 'profile', label: '我的', Icon: UserOutlined },
];
```

> ⚠️ **注意**：代码中 `activeTab` 默认值为 `'bayu'`，即**巴渝为默认首页**，而非益寿。益寿为第二 Tab。

### 4.2 巴渝子 Tab

```typescript
const BAYU_SUBS = [
  { id: 'follow', label: '熟人' },
  { id: 'plaza', label: '同城' },
  { id: 'hot', label: '排名' },
  { id: 'circles', label: '霍圈子' },
];
```

### 4.3 排名子 Tab

```typescript
type RankSubTab = 'news' | 'labor' | 'star' | 'active';
// 巴渝头条 / 巴渝劳模 / 巴渝名人 / 巴渝豁棒
```

---

## 5. 接口数据结构

### 5.1 Restaurant（餐厅）

```typescript
interface Restaurant {
  id: number;
  name: string;
  distance: string;
  rating: number;
  ratingCount: number;
  hours: string;
  price: string;
  tags: string[];
  delivery: boolean;
  image: string;
  highlight?: string;
}
```

### 5.2 FollowPost（帖子）

```typescript
interface FollowPost {
  id: number;
  userId: number;
  user: string;
  avatar: string;
  avatarColor: string;
  type: 'image' | 'video';
  coverSeed: string;
  coverHeight: number;
  title: string;
  likes: number;
  comments?: number;
  saves?: number;
  shares?: number;
  date?: string;
  images?: string[];  // 多图时使用
}
```

### 5.3 ChatMessage（聊天消息）

```typescript
interface ChatMessage {
  id: number;
  type: 'text' | 'voice' | 'image';
  sender: 'me' | 'other';
  content?: string;
  duration?: number;
  image?: string;
  time?: string;
  userId?: number;
}
```

### 5.4 UserProfile（用户资料）

```typescript
interface UserProfile {
  id: number;
  name: string;
  avatar: string;
  color: string;
  uid: string;
  ip: string;
  bio: string;
  following: number;
  followers: number;
  likesReceived: number;
  isFollowed: boolean;
}
```

### 5.5 CircleInfo（圈子）

```typescript
interface CircleInfo {
  name: string;
  members: number;
  tag: string;
  color: string;
}
```

---

## 6. 交互规格

### 6.1 返回机制

- `prevScreen` 变量记录来源页面
- 所有子屏返回按钮调用 `goBack()` 返回来源屏
- `yishouSubTab` 状态提升至 App 级，从子屏返回时自动恢复

### 6.2 视频进度机制

- 进度条：每200ms增加1%，约20秒走完
- 5秒圆圈倒计时（SVG圆弧，countdown 5→0）
- 倒计时完成：橙色胶囊 "+15分"
- 切换视频时重置进度和倒计时

### 6.3 积分弹窗

- 视频播放完成（进度100%）时弹出
- 全屏遮罩 + 白色圆角卡片
- 3秒后自动消失
- 「继续观看」按钮关闭弹窗

### 6.4 按钮状态

| 状态 | 样式 |
|------|------|
| 默认 | 主色背景（#FF6B35），白色文字 |
| 悬停/激活 | active:scale-95 缩放反馈 |
| 禁用 | 灰色背景（#E0E0E0） |

### 6.5 Tab 状态

| 状态 | 样式 |
|------|------|
| 默认 | 图标+文字 #999999 |
| 激活 | 图标+文字 #FF6B35，底部3px指示条 |

---

## 7. 表单校验规格

### 7.1 手机号

- 格式：11位数字
- 前缀：+86

### 7.2 验证码

- 长度：4-6位数字
- 有效期：60秒倒计时

### 7.3 密码

- 长度：8-16位
- 支持显示/隐藏切换

### 7.4 邀请码

- 长度：最多8位
- 选填

---

## 8. 特殊组件规格

### 8.1 CircleActivityBanner

- 橙黄渐变背景
- 每4秒自动轮播（多个活动时）
- 显示 x/n 计数
- 点击跳转活动报名页

### 8.2 VideoCommentSheet

- 两种模式：sheet（底部弹出）/ inline（内嵌）
- 含评论列表 + 回复展开/收起 + 输入栏
- 空输入时显示点赞/收藏/分享快捷按钮

### 8.3 ShareSheet

- 4个分享入口：私信好友/微信好友/朋友圈/复制链接
- 复制链接成功显示「已复制」状态

### 8.4 AddFriendModal（仿微信）

- 步骤1：确认信息（头像+昵称+益寿号+IP）
- 步骤2：填写验证语（≤50字）
- 步骤3：发送成功提示

### 8.5 ReportModal（仿抖音）

- 7个原因选项：骚扰我/发布垃圾广告/冒充他人/传播虚假信息/涉黄涉暴/诈骗/其他
- 提交后显示受理成功提示

---

## 9. 占位组件

### 9.1 服务卡片

`ServiceImageTile`:
- 图片高度：76px
- 文字标签：13px，底部居中

### 9.2 餐厅卡片

`RestaurantCard`:
- 图片：90×72px，圆角12px
- 评分：星星图标 + 数字 + 人评价
- 标签：TagsOutlined 图标
- 支持送餐标签：橙色背景

### 9.3 用户头像

- 彩色字母圆形
- 尺寸：38px（小）/ 48px（中）/ 76-88px（大）
- 白色描边（用户主页88px头像）

---

## 10. 空状态

### 10.1 地址管理空状态

- 地址图标（80px橙色半透明圆形）
- 「还没有收货地址」文案
- 「点击下方按钮添加」副文案

### 10.2 用户主页空状态

- 笑脸图标（SmileOutlined，48px）
- 「暂无图文/视频内容」文案

### 10.3 圈子空状态

- 「还没有加入任何圈子，去发现一下吧」

---

## 11. 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2026-03-31 | 初版 |
| v2.0 | 2026-05-09 | 更新功能规格 |
| v3.0 | 2026-06-04 | 基于旧代码更新 |
| **v4.0** | 2026-06-04 | 完全基于 `index.tsx` 重构，与实际代码实现完全同步；补充完整组件清单、数据结构、交互规格 |