# 益寿服务端 APP — 产品需求文档

> **版本**: v1.1
> **日期**: 2026-06-05
> **说明**: 服务商管理端 + 服务人员端，双角色移动端原型
> **设计说明**: 统一在一个手机 APP 中体现，通过登录页角色选择进入不同功能模块，而非展示两个独立的 APP 原型

---

## 1. 产品概述

### 1.1 产品定位

面向 **服务商** 和 **服务人员** 的移动端 APP 工具，帮助服务商入驻平台、招募管理服务人员、接受订单预约、处理结算提现，实现服务全流程线上化。

### 1.2 设计原则

| 原则 | 说明 |
|------|------|
| 单 APP 双角色 | 登录入口统一，用户选择身份后进入对应角色的页面流程 |
| 角色切换 | 用户可在登录页重新选择身份，无需退出登录 |
| Tab 栏固定 | 底部 Tab 栏固定在手机屏幕底部，不随内容滚动 |

### 1.3 目标用户

| 角色 | 说明 | 核心诉求 |
|------|------|----------|
| 服务商（机构） | 已入驻平台的服务机构管理员 | 订单管理、派单、人员管理、财务结算 |
| 服务人员（个人） | 隶属于服务商的护理员/服务员 | 接收任务、上门服务、打卡签到、收入查询 |

### 1.4 与用户端关系

- **用户端**（yishou-app）：用户下单、预约服务、支付
- **服务端**（service-app）：服务商接单、派单给服务人员、服务人员上门服务
- 数据流向：用户端订单 → 服务端接收 → 派单 → 服务人员执行

### 1.5 设计风格

| 项目 | 规范 |
|------|------|
| 整体风格 | 深空暗夜科技风（玻璃拟态 + 霓虹光效） |
| 服务商主题色 | #00D4FF（科技蓝） |
| 服务人员主题色 | #A855F7（活力紫） |
| 手机尺寸 | 390 × 844px |
| 字体 | 系统默认字体，基础 16px |
| 滚动条 | 隐藏滚动条，内容可滚动但不显示滚动条 |
| Tab 栏 | 固定在底部，高度 80px（含底部安全区） |

### 1.6 页面布局规范

#### 固定标题栏
- **所有页面**采用统一的固定标题栏布局
- 标题栏高度：**44px**
- 背景色：`rgba(255,255,255,0.05)` （THEME.bgCard）
- 下边框：`1px solid rgba(255,255,255,0.1)` （THEME.borderLight）
- **固定在顶部，不随内容滚动**
- 布局：返回按钮(左侧) + 标题(居中) + 占位(右侧)

#### 内容区域
- 内容区域位于标题栏下方，可独立滚动
- 滚动条隐藏，保持视觉整洁
- 页面底部保留适当间距（如 32px）避免内容被 Tab 栏遮挡

---

## 2. 完整屏幕状态机

### 2.1 服务商管理端

```
ProviderScreen =
  | 'login'                          // 登录（含注册入口）
  | 'provider-register'             // 服务商注册
  | 'settle-intro'                  // 入驻介绍
  | 'settle-form'                   // 入驻表单
  | 'settle-upload'                // 资质上传
  | 'settle-success'                // 入驻成功
  | 'home'                          // 工作台（默认首页）
  | 'orders'                        // 订单列表
  | 'order-detail'                  // 订单详情
  | 'staff'                         // 服务人员列表
  | 'staff-add'                      // 添加服务人员
  | 'staff-detail'                  // 人员详情
  | 'profile'                       // 个人中心
```

### 2.2 服务人员端

```
StaffScreen =
  | 'login'                          // 登录（含邀请码注册）
  | 'staff-register'                // 服务人员注册
  | 'tasks'                         // 任务列表（默认首页）
  | 'task-detail'                   // 任务详情
  | 'task-checkin'                  // 完成打卡
  | 'income'                        // 收入
  | 'profile'                       // 个人中心
```

---

## 3. 信息架构

### 3.1 服务商管理端 Tab 栏

```
服务商管理端（4个Tab）
├── 工作台（默认首页）    ← HomePage
├── 订单                   ← OrderListPage
├── 人员                   ← StaffListPage
└── 我的                   ← ProfilePage
```

### 3.2 服务人员端 Tab 栏

```
服务人员端（3个Tab）
├── 任务（默认首页）      ← TaskListPage
├── 收入                   ← IncomePage
└── 我的                   ← ProfilePage
```

### 3.3 服务商工作台（Home）

```
工作台
├── 问候区（时间 + 角色名）
├── 今日统计（3列卡片）
│   ├── 待处理订单
│   ├── 服务中订单
│   └── 今日收入
├── 快捷入口（4宫格）
│   ├── 全部订单
│   ├── 待派单
│   ├── 添加人员
│   └── 入驻管理
└── 最新订单列表（3条）
```

### 3.4 订单管理（OrderList）

```
订单列表
├── 筛选 Tab（全部/待接单/已接单/服务中/已完成）
├── 订单卡片
│   ├── 用户头像+昵称+手机
│   ├── 服务类型 + 预约时间
│   ├── 服务地址
│   └── 订单金额 + 操作按钮
└── 点击 → 订单详情
```

### 3.5 人员管理（StaffList）

```
人员列表
├── 添加按钮（右上角）
├── 人员卡片
│   ├── 头像 + 昵称
│   ├── 在线状态（在线/忙碌/离线）
│   ├── 擅长服务
│   └── 今日/累计服务单数
└── 点击 → 人员详情
```

### 3.6 服务人员任务（TaskList）

```
任务列表
├── 统计卡片（今日任务/进行中/已完成）
├── 筛选 Tab（全部/待接单/进行中/已完成）
├── 任务卡片
│   ├── 用户头像+昵称+手机
│   ├── 服务类型 + 预约时间
│   ├── 服务地址
│   ├── 订单金额
│   └── 操作按钮（接受任务/完成打卡）
└── 点击 → 任务详情
```

### 3.7 收入（Income）

```
收入页面
├── 收入卡片
│   ├── 累计收入（大字）
│   ├── 本月收入 + 待结算
└── 收入记录列表
```

---

## 4. 核心功能详述

### 4.1 登录与注册

#### 服务商登录

- 手机号 + 验证码
- 首次登录引导入驻流程

#### 服务商注册

- 手机号 + 邀请码（可选）
- 验证码 + 密码（8-16位）
- 注册后引导入驻

#### 服务人员登录

- 手机号 + 验证码
- 邀请码（必填，用于关联服务商）

#### 服务人员注册

- 手机号 + 邀请码（必填）
- 验证码 + 密码
- 注册后等待服务商审核

### 4.2 入驻流程（服务商）

```
入驻流程（4步）
├── Step 1：入驻介绍页
│   ├── 平台优势展示
│   └── 立即入驻按钮
├── Step 2：填写信息
│   ├── 服务商名称
│   ├── 联系人
│   ├── 联系电话
│   ├── 详细地址
│   └── 服务类型
├── Step 3：上传资质
│   ├── 营业执照（必填）
│   └── 身份证（必填）
└── Step 4：提交成功
    └── 等待平台审核（1-3个工作日）
```

### 4.3 订单管理

| 状态 | 说明 | 服务商操作 |
|------|------|------------|
| pending | 待接单 | 查看详情 → 接单 |
| accepted | 已接单 | 派单给服务人员 |
| dispatched | 已派单 | 等待服务人员确认 |
| serving | 服务中 | 查看进度 |
| completed | 已完成 | 确认结算 |

### 4.4 人员管理

| 功能 | 说明 |
|------|------|
| 人员列表 | 查看所有服务人员及状态 |
| 添加人员 | 输入姓名+手机号+擅长服务 → 发送邀请短信 |
| 人员详情 | 查看个人信息、服务统计 |
| 移除人员 | 从团队中移除（需确认） |

### 4.5 任务管理（服务人员）

| 状态 | 说明 | 服务人员操作 |
|------|------|-------------|
| pending | 待接单 | 查看详情 → 接受任务 |
| serving | 服务中 | 查看详情 → 完成打卡 |
| completed | 已完成 | 查看详情 |

### 4.6 打卡签到

- 服务人员到达现场后点击「完成打卡」
- 可上传服务照片（选填）
- 打卡后订单状态变更为已完成

### 4.7 收入查询

- 显示累计收入
- 显示本月收入
- 显示待结算金额
- 结算功能（规划中）

---

## 5. 数据结构

### 5.1 订单数据（Order）

```typescript
interface Order {
  id: string;           // 订单编号
  user: string;        // 用户昵称
  avatar: string;       // 头像字母
  color: string;        // 头像颜色
  phone: string;        // 手机号
  service: string;      // 服务类型
  address: string;      // 服务地址
  time: string;         // 预约时间
  amount: string;       // 订单金额
  status: OrderStatus;
}
```

### 5.2 服务人员数据（Staff）

```typescript
interface Staff {
  id: number;
  name: string;        // 姓名
  avatar: string;       // 头像字母
  color: string;        // 头像颜色
  phone: string;        // 手机号
  status: 'online' | 'busy' | 'offline';  // 在线状态
  skills: string[];     // 擅长服务
  todayTasks: number;    // 今日服务数
  totalTasks: number;    // 累计服务数
}
```

### 5.3 任务数据（Task）

```typescript
interface Task {
  id: string;           // 任务编号
  user: string;        // 用户昵称
  avatar: string;       // 头像字母
  color: string;        // 头像颜色
  phone: string;        // 手机号
  service: string;      // 服务类型
  address: string;      // 服务地址
  time: string;         // 预约时间
  amount: string;       // 任务金额
  status: TaskStatus;
}
```

---

## 6. 主题色彩

```typescript
const THEME = {
  // 服务商蓝
  providerPrimary: '#00D4FF',
  providerSecondary: '#0066FF',

  // 服务人员紫
  staffPrimary: '#A855F7',
  staffSecondary: '#7C3AED',

  // 功能色
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',

  // 背景
  bgDark: '#0a0f1a',
  bgCard: 'rgba(255,255,255,0.05)',
  bgGlass: 'rgba(255,255,255,0.03)',

  // 文字
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
};
```

---

## 7. 组件清单

### 7.1 共享组件

| 组件 | 说明 |
|------|------|
| `PhoneFrame` | 手机框架展示 |
| `LoginPage` | 统一登录页（含角色选择） |
| `Button` | 按钮（支持主题色、渐变、光效） |
| `Card` | 卡片（玻璃拟态） |
| `Input` | 输入框（聚焦高亮） |
| `Tag` | 标签 |
| `Avatar` | 字母头像 |
| `NavBar` | 导航栏 |
| `TabBar` | 底部 Tab 栏 |
| `EmptyState` | 空状态 |

### 7.2 服务商端页面组件

| 组件 | 说明 |
|------|------|
| `ProviderRegisterPage` | 服务商注册页 |
| `SettleIntroPage` | 入驻介绍页 |
| `SettleFormPage` | 入驻表单页 |
| `SettleUploadPage` | 资质上传页 |
| `SettleSuccessPage` | 入驻成功页 |
| `HomePage` | 工作台 |
| `OrderListPage` | 订单列表 |
| `OrderDetailPage` | 订单详情 |
| `StaffListPage` | 服务人员列表 |
| `StaffAddPage` | 添加服务人员 |
| `StaffDetailPage` | 人员详情 |
| `ProfilePage` | 个人中心 |

### 7.3 服务人员端页面组件

| 组件 | 说明 |
|------|------|
| `StaffRegisterPage` | 服务人员注册页 |
| `TaskListPage` | 任务列表 |
| `TaskDetailPage` | 任务详情 |
| `TaskCheckinPage` | 完成打卡 |
| `IncomePage` | 收入页 |
| `ProfilePage` | 个人中心 |

---

## 8. 页面导航关系

### 8.1 服务商端

| 页面 | 入口来源 | 返回目标 |
|------|----------|----------|
| provider-register | 登录页注册 | login |
| settle-intro | 工作台入驻入口 | home |
| settle-form | 入驻介绍下一步 | settle-intro |
| settle-upload | 入驻表单下一步 | settle-form |
| settle-success | 入驻上传完成 | home |
| orders | Tab 栏 | - |
| order-detail | 订单列表点击 | orders |
| staff | Tab 栏 | - |
| staff-add | 服务人员列表添加 | staff |
| staff-detail | 服务人员列表点击 | staff |
| profile | Tab 栏 | - |

### 8.2 服务人员端

| 页面 | 入口来源 | 返回目标 |
|------|----------|----------|
| staff-register | 登录页注册 | login |
| tasks | Tab 栏 | - |
| task-detail | 任务列表点击 | tasks |
| task-checkin | 任务详情 | task-detail |
| income | Tab 栏 | - |
| profile | Tab 栏 | - |

---

## 9. 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.2 | 2026-06-05 | 所有功能页面统一采用固定标题栏，标题栏固定不随滚动 |
| v1.1 | 2026-06-05 | 修复 Tab 栏固定和滚动问题；更新设计原则说明单 APP 双角色设计 |
| v1.0 | 2026-06-04 | 初版，实现服务商管理端 + 服务人员端双角色原型 |