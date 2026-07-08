/**
 * @name 益寿巴渝后台管理系统
 */
import './style.css';
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import dayjs from 'dayjs';
import {
  ConfigProvider, Layout, Menu, Avatar, Dropdown, Breadcrumb,
  Card, Row, Col, Statistic, Table, Button, Tag, Space, Input,
  Modal, Form, Select, Drawer, Tabs, Popconfirm, message,
  Tree, Typography, Radio, Badge, Timeline, Tooltip,
  Cascader, DatePicker, Divider, InputNumber, Progress, Transfer,
} from 'antd';
import {
  DashboardOutlined, UserOutlined, TeamOutlined, FileTextOutlined,
  AppstoreOutlined, ShoppingCartOutlined, CalendarOutlined,
  BellOutlined, FlagOutlined, SafetyOutlined, LogoutOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined, StarOutlined,
  PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  LockOutlined, PhoneOutlined,
  RiseOutlined, FallOutlined, TeamOutlined as GroupOutlined,
  FileImageOutlined, ShopOutlined, TrophyOutlined, ArrowLeftOutlined,
  VideoCameraOutlined, HeartOutlined, MessageOutlined, SearchOutlined,
  ManOutlined, WomanOutlined, MobileOutlined, WarningOutlined,
  FilterOutlined, ReloadOutlined, PlayCircleOutlined, BookOutlined,
  EnvironmentOutlined, ClockCircleOutlined, StopOutlined,
  LikeOutlined, CommentOutlined, UploadOutlined,
  BankOutlined, MoreOutlined, SwapOutlined, CheckCircleOutlined, FireOutlined,
  ShoppingOutlined, PlusCircleOutlined, MinusCircleOutlined, SettingOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

// ─── 品牌色 ───────────────────────────────────────────────
const PRIMARY = '#FF6B35';

// ─── Mock 数据 ────────────────────────────────────────────
const USERS = [
  { id: 1, nickname: '张大爷', phone: '138****1234', region: '重庆市渝中区', status: 'active', registerDate: '2025-06-12', postCount: 42, points: 1280, followers: 128, following: 36, gender: 'male', age: 68, lastLogin: '2026-04-06 08:12', device: 'iPhone 14', auths: { wechat: true, alipay: true, qq: false } },
  { id: 2, nickname: '李奶奶', phone: '139****5678', region: '重庆市南岸区', status: 'active', registerDate: '2025-07-03', postCount: 18, points: 860, followers: 64, following: 22, gender: 'female', age: 72, lastLogin: '2026-04-05 14:30', device: 'HUAWEI Mate 60', auths: { wechat: true, alipay: false, qq: false } },
  { id: 3, nickname: '王老汉', phone: '137****9012', region: '重庆市江北区', status: 'banned', registerDate: '2025-08-15', postCount: 5, points: 120, followers: 8, following: 5, gender: 'male', age: 65, lastLogin: '2026-03-20 10:00', device: 'OPPO Reno 10', auths: { wechat: false, alipay: false, qq: false } },
  { id: 4, nickname: '赵阿姨', phone: '136****3456', region: '重庆市沙坪坝区', status: 'active', registerDate: '2025-09-01', postCount: 67, points: 2340, followers: 312, following: 88, gender: 'female', age: 63, lastLogin: '2026-04-06 09:45', device: 'vivo X100', auths: { wechat: true, alipay: true, qq: true } },
  { id: 5, nickname: '陈大妈', phone: '135****7890', region: '重庆市九龙坡区', status: 'active', registerDate: '2025-10-20', postCount: 31, points: 980, followers: 97, following: 41, gender: 'female', age: 70, lastLogin: '2026-04-04 16:20', device: 'Xiaomi 14', auths: { wechat: false, alipay: true, qq: false } },
  { id: 6, nickname: '刘师傅', phone: '134****2345', region: '重庆市渝北区', status: 'active', registerDate: '2025-11-08', postCount: 24, points: 760, followers: 156, following: 29, gender: 'male', age: 61, lastLogin: '2026-04-06 07:55', device: 'Samsung S24', auths: { wechat: true, alipay: false, qq: true } },
];

// 用户动态 Mock 数据（扩展字段：views/favorites/duration）
const USER_POSTS: Record<number, any[]> = {
  1: [
    { id: 101, type: 'image', title: '今日养生早餐分享', content: '今天做了一份营养丰富的早餐，有燕麦粥、水煮蛋和新鲜水果，大家一起来学习健康饮食吧！', time: '2026-04-01 08:30', likes: 24, comments: 6, favorites: 12, views: 380, status: 'approved' },
    { id: 102, type: 'image', title: '渝中区公园晨练记录', content: '每天早上六点准时到公园晨练，今天打了一套太极拳，感觉精神焕发！', time: '2026-03-28 07:15', likes: 18, comments: 3, favorites: 7, views: 210, status: 'approved' },
    { id: 103, type: 'video', title: '太极拳练习视频', content: '分享一段太极拳练习视频，这是我练习了三年的成果，希望对大家有帮助。', time: '2026-03-20 09:00', likes: 56, comments: 12, favorites: 31, views: 1240, duration: '03:28', status: 'approved' },
    { id: 104, type: 'image', title: '春日花卉摄影', content: '今天在公园拍了一些春天的花，颜色真的太美了，分享给大家！', time: '2026-03-15 10:20', likes: 33, comments: 8, favorites: 15, views: 460, status: 'pending' },
  ],
  2: [
    { id: 201, type: 'image', title: '春日踏青照片', content: '趁着好天气，和老姐妹们一起去南山踏青，空气清新，心情大好！', time: '2026-04-02 10:00', likes: 31, comments: 8, favorites: 14, views: 520, status: 'approved' },
    { id: 202, type: 'image', title: '手工编织作品展示', content: '花了两个月时间编织的毛衣终于完成了，送给孙子当生日礼物。', time: '2026-03-25 14:30', likes: 45, comments: 10, favorites: 22, views: 680, status: 'approved' },
    { id: 203, type: 'video', title: '编织教学：基础针法', content: '教大家最基础的几种编织针法，简单易学，适合零基础的朋友。', time: '2026-03-10 09:00', likes: 62, comments: 18, favorites: 40, views: 1580, duration: '05:12', status: 'approved' },
  ],
  3: [
    { id: 301, type: 'image', title: '某违规内容', content: '（内容已被系统屏蔽）', time: '2026-03-29 08:00', likes: 0, comments: 0, favorites: 0, views: 12, status: 'rejected' },
  ],
  4: [
    { id: 401, type: 'video', title: '广场舞新编舞蹈教学', content: '最新编排的广场舞，融合了民族舞和现代舞元素，节奏欢快，老少皆宜！', time: '2026-04-03 16:00', likes: 128, comments: 34, favorites: 76, views: 3200, duration: '08:45', status: 'approved' },
    { id: 402, type: 'image', title: '重阳节活动现场', content: '参加了社区组织的重阳节活动，现场热闹非凡，大家一起包饺子、唱歌跳舞。', time: '2026-03-30 11:00', likes: 67, comments: 15, favorites: 28, views: 890, status: 'approved' },
    { id: 403, type: 'image', title: '社区活动合影', content: '和广场舞队的姐妹们合影留念，我们队伍越来越壮大了！', time: '2026-03-22 15:00', likes: 42, comments: 9, favorites: 18, views: 560, status: 'approved' },
    { id: 404, type: 'video', title: '五月花广场舞完整版', content: '五月花广场舞完整版教学，共分三个部分，今天先分享第一部分。', time: '2026-03-10 14:00', likes: 95, comments: 27, favorites: 58, views: 2100, duration: '06:30', status: 'pending' },
  ],
  5: [
    { id: 501, type: 'image', title: '家常菜谱分享', content: '今天分享一道简单好吃的家常菜——番茄炒蛋，食材简单，营养丰富，老人小孩都爱吃。', time: '2026-04-01 12:00', likes: 19, comments: 5, favorites: 9, views: 310, status: 'approved' },
    { id: 502, type: 'image', title: '清明节踏青记录', content: '清明节和家人一起去郊外踏青，空气清新，心情愉快。', time: '2026-03-20 15:00', likes: 14, comments: 3, favorites: 6, views: 180, status: 'approved' },
  ],
  6: [
    { id: 601, type: 'video', title: '太极二十四式教学', content: '完整的太极二十四式教学视频，动作分解详细，适合初学者跟练。', time: '2026-03-31 09:30', likes: 89, comments: 22, favorites: 54, views: 2680, duration: '12:15', status: 'approved' },
    { id: 602, type: 'image', title: '钓鱼收获分享', content: '今天在嘉陵江边钓了一上午，收获颇丰，晚上炖鱼汤喝！', time: '2026-03-26 17:00', likes: 33, comments: 7, favorites: 11, views: 420, status: 'approved' },
    { id: 603, type: 'video', title: '陈氏太极拳第一路', content: '陈氏太极拳第一路完整演示，这是我练习了五年的成果，请大家多多指教。', time: '2026-03-15 10:00', likes: 112, comments: 31, favorites: 68, views: 3450, duration: '18:40', status: 'approved' },
  ],
};

// 用户关注/粉丝 Mock 数据
const USER_FOLLOWS: Record<number, any[]> = {
  1: [
    { id: 4, nickname: '赵阿姨', region: '重庆市沙坪坝区', postCount: 67, status: 'active' },
    { id: 6, nickname: '刘师傅', region: '重庆市渝北区', postCount: 24, status: 'active' },
  ],
  4: [
    { id: 1, nickname: '张大爷', region: '重庆市渝中区', postCount: 42, status: 'active' },
    { id: 2, nickname: '李奶奶', region: '重庆市南岸区', postCount: 18, status: 'active' },
    { id: 6, nickname: '刘师傅', region: '重庆市渝北区', postCount: 24, status: 'active' },
  ],
  6: [
    { id: 1, nickname: '张大爷', region: '重庆市渝中区', postCount: 42, status: 'active' },
    { id: 4, nickname: '赵阿姨', region: '重庆市沙坪坝区', postCount: 67, status: 'active' },
  ],
};

const USER_FANS: Record<number, any[]> = {
  1: [
    { id: 2, nickname: '李奶奶', region: '重庆市南岸区', postCount: 18, status: 'active' },
    { id: 4, nickname: '赵阿姨', region: '重庆市沙坪坝区', postCount: 67, status: 'active' },
    { id: 5, nickname: '陈大妈', region: '重庆市九龙坡区', postCount: 31, status: 'active' },
  ],
  4: [
    { id: 1, nickname: '张大爷', region: '重庆市渝中区', postCount: 42, status: 'active' },
    { id: 5, nickname: '陈大妈', region: '重庆市九龙坡区', postCount: 31, status: 'active' },
    { id: 6, nickname: '刘师傅', region: '重庆市渝北区', postCount: 24, status: 'active' },
  ],
  6: [
    { id: 1, nickname: '张大爷', region: '重庆市渝中区', postCount: 42, status: 'active' },
    { id: 4, nickname: '赵阿姨', region: '重庆市沙坪坝区', postCount: 67, status: 'active' },
  ],
};

// 用户登录日志
const USER_LOGIN_LOGS: Record<number, any[]> = {
  1: [
    { time: '2026-04-06 08:12', device: 'iPhone 14', ip: '113.246.xxx.xxx', location: '重庆市渝中区' },
    { time: '2026-04-05 07:58', device: 'iPhone 14', ip: '113.246.xxx.xxx', location: '重庆市渝中区' },
    { time: '2026-04-04 08:30', device: 'iPhone 14', ip: '113.246.xxx.xxx', location: '重庆市渝中区' },
    { time: '2026-04-03 09:10', device: 'iPhone 14', ip: '113.246.xxx.xxx', location: '重庆市渝中区' },
    { time: '2026-04-02 08:05', device: 'iPhone 14', ip: '113.246.xxx.xxx', location: '重庆市渝中区' },
  ],
  3: [
    { time: '2026-03-20 10:00', device: 'OPPO Reno 10', ip: '171.221.xxx.xxx', location: '重庆市江北区' },
    { time: '2026-03-18 14:22', device: 'OPPO Reno 10', ip: '171.221.xxx.xxx', location: '重庆市江北区' },
  ],
};

// 用户封禁记录
const USER_BAN_LOGS: Record<number, any[]> = {
  3: [
    { time: '2026-03-29 10:30', reason: '发布违规内容（含虚假健康信息）', operator: 'auditor01', duration: '永久封禁', status: 'active' },
  ],
};

// 用户积分流水（按用户ID索引）
const USER_POINTS_RECORDS: Record<number, any[]> = {
  1: [
    { id: 1, type: 'earn', amount: 10, reason: '每日签到', time: '2026-04-06 08:12', balance: 1280 },
    { id: 2, type: 'earn', amount: 20, reason: '发布图文', time: '2026-04-01 08:35', balance: 1270 },
    { id: 3, type: 'earn', amount: 10, reason: '每日签到', time: '2026-04-01 08:12', balance: 1250 },
    { id: 4, type: 'spend', amount: 100, reason: '积分兑换优惠券', time: '2026-03-28 14:00', balance: 1240 },
    { id: 5, type: 'earn', amount: 50, reason: '参与活动', time: '2026-03-25 10:00', balance: 1340 },
  ],
  2: [
    { id: 1, type: 'earn', amount: 10, reason: '每日签到', time: '2026-04-05 09:00', balance: 860 },
    { id: 2, type: 'earn', amount: 30, reason: '发布视频', time: '2026-03-10 09:05', balance: 850 },
    { id: 3, type: 'earn', amount: 200, reason: '完善个人资料', time: '2026-03-01 10:00', balance: 820 },
  ],
  3: [
    { id: 1, type: 'spend', amount: 100, reason: '积分兑换优惠券', time: '2026-03-15 10:15', balance: 120 },
    { id: 2, type: 'earn', amount: 10, reason: '每日签到', time: '2026-03-10 08:00', balance: 220 },
  ],
  4: [
    { id: 1, type: 'earn', amount: 30, reason: '发布视频', time: '2026-04-03 16:05', balance: 2340 },
    { id: 2, type: 'earn', amount: 50, reason: '参与活动', time: '2026-03-30 11:05', balance: 2310 },
    { id: 3, type: 'admin', amount: 500, reason: '管理员手动发放（优质创作者奖励）', time: '2026-03-20 17:00', balance: 2260 },
    { id: 4, type: 'spend', amount: 200, reason: '积分兑换礼品', time: '2026-03-15 15:44', balance: 1760 },
    { id: 5, type: 'earn', amount: 10, reason: '每日签到', time: '2026-03-01 08:00', balance: 1960 },
  ],
  5: [
    { id: 1, type: 'earn', amount: 20, reason: '发布图文', time: '2026-04-01 12:05', balance: 980 },
    { id: 2, type: 'earn', amount: 50, reason: '参与活动', time: '2026-03-25 11:00', balance: 960 },
    { id: 3, type: 'earn', amount: 10, reason: '每日签到', time: '2026-03-20 08:00', balance: 910 },
  ],
  6: [
    { id: 1, type: 'earn', amount: 30, reason: '发布视频', time: '2026-03-31 09:35', balance: 760 },
    { id: 2, type: 'earn', amount: 20, reason: '发布图文', time: '2026-03-26 17:05', balance: 730 },
    { id: 3, type: 'admin', amount: 500, reason: '管理员手动发放（优质创作者奖励）', time: '2026-03-31 17:00', balance: 710 },
    { id: 4, type: 'spend', amount: 200, reason: '积分兑换礼品', time: '2026-03-10 10:00', balance: 210 },
  ],
};

const ORGS = [
  { key: 'root', title: '益寿巴渝平台', icon: <BankOutlined />, children: [
    { key: 'org1', title: '渝中区老年大学', icon: <BankOutlined />, children: [
      { key: 'org1-1', title: '书法班', icon: <BankOutlined /> },
      { key: 'org1-2', title: '太极班', icon: <BankOutlined /> },
    ]},
    { key: 'org2', title: '南岸区夕阳红协会', icon: <BankOutlined />, children: [
      { key: 'org2-1', title: '广场舞队', icon: <BankOutlined /> },
    ]},
    { key: 'org3', title: '江北区长者中心', icon: <BankOutlined /> },
  ]},
];

const ORG_MEMBERS: Record<string, any[]> = {
  root: [
    { id: 1, name: '平台管理员', role: '成员', phone: '138****0000', status: 'active' },
    { id: 2, name: '张大爷', role: '成员', phone: '138****1234', status: 'active' },
    { id: 3, name: '李奶奶', role: '成员', phone: '139****5678', status: 'active' },
    { id: 4, name: '赵阿姨', role: '成员', phone: '136****3456', status: 'active' },
    { id: 5, name: '陈大妈', role: '成员', phone: '135****7890', status: 'active' },
    { id: 6, name: '刘师傅', role: '成员', phone: '134****2345', status: 'active' },
    { id: 7, name: '王老汉', role: '成员', phone: '137****9012', status: 'banned' },
    { id: 8, name: '孙大爷', role: '成员', phone: '133****1111', status: 'active' },
    { id: 9, name: '周阿姨', role: '成员', phone: '132****2222', status: 'active' },
  ],
  org1: [
    { id: 2, name: '张大爷', role: '成员', phone: '138****1234', status: 'active' },
    { id: 3, name: '李奶奶', role: '成员', phone: '139****5678', status: 'active' },
  ],
  org2: [
    { id: 4, name: '赵阿姨', role: '成员', phone: '136****3456', status: 'active' },
    { id: 5, name: '陈大妈', role: '成员', phone: '135****7890', status: 'active' },
  ],
  org3: [
    { id: 6, name: '刘师傅', role: '成员', phone: '134****2345', status: 'active' },
  ],
  'org1-1': [{ id: 7, name: '王老汉', role: '成员', phone: '137****9012', status: 'banned' }],
  'org1-2': [{ id: 8, name: '孙大爷', role: '成员', phone: '133****1111', status: 'active' }],
  'org2-1': [{ id: 9, name: '周阿姨', role: '成员', phone: '132****2222', status: 'active' }],
};

const CIRCLES = [
  { id: 1, name: '广场舞爱好者', category: '兴趣爱好', cover: '', description: '热爱广场舞的朋友们聚集地，分享舞蹈技巧和快乐', memberCount: 1284, postCount: 3420, activityCount: 8, status: 'normal', admins: ['赵阿姨', '陈大妈'], createTime: '2025-08-15 10:00', creator: '赵阿姨', joinType: 'public', activeToday: 156, newThisWeek: 23 },
  { id: 2, name: '养生交流圈', category: '健康养生', cover: '', description: '分享养生知识，交流健康生活方式', memberCount: 986, postCount: 2108, activityCount: 5, status: 'normal', admins: ['张大爷'], createTime: '2025-09-20 14:30', creator: '张大爷', joinType: 'public', activeToday: 98, newThisWeek: 15 },
  { id: 3, name: '书法天地', category: '文化艺术', cover: '', description: '书法爱好者的交流平台，传承中华书法艺术', memberCount: 542, postCount: 1320, activityCount: 3, status: 'normal', admins: ['李奶奶'], createTime: '2025-07-10 09:00', creator: '李奶奶', joinType: 'approval', activeToday: 45, newThisWeek: 8 },
  { id: 4, name: '太极功夫', category: '运动健身', cover: '', description: '太极拳爱好者的练习交流圈', memberCount: 421, postCount: 890, activityCount: 2, status: 'normal', admins: ['孙大爷'], createTime: '2025-10-05 16:00', creator: '孙大爷', joinType: 'public', activeToday: 32, newThisWeek: 5 },
  { id: 5, name: '钓鱼达人', category: '兴趣爱好', cover: '', description: '钓鱼爱好者的天堂，分享钓鱼技巧和渔获', memberCount: 318, postCount: 654, activityCount: 4, status: 'normal', admins: ['刘师傅'], createTime: '2025-11-12 11:00', creator: '刘师傅', joinType: 'public', activeToday: 28, newThisWeek: 6 },
  { id: 6, name: '红歌传唱', category: '文化艺术', cover: '', description: '传唱经典红歌，弘扬红色文化', memberCount: 765, postCount: 1890, activityCount: 6, status: 'normal', admins: ['王老汉', '周阿姨'], createTime: '2025-06-18 15:30', creator: '王老汉', joinType: 'public', activeToday: 67, newThisWeek: 12 },
  { id: 7, name: '摄影俱乐部', category: '兴趣爱好', cover: '', description: '用镜头记录美好生活，分享摄影作品和技巧', memberCount: 623, postCount: 1456, activityCount: 7, status: 'normal', admins: ['陈大妈'], createTime: '2025-09-01 10:30', creator: '陈大妈', joinType: 'public', activeToday: 52, newThisWeek: 9 },
  { id: 8, name: '社区志愿者', category: '社区服务', cover: '', description: '热心公益的志愿者们，为社区贡献力量', memberCount: 234, postCount: 567, activityCount: 12, status: 'normal', admins: ['李奶奶'], createTime: '2025-12-03 09:00', creator: '李奶奶', joinType: 'approval', activeToday: 18, newThisWeek: 4 },
  { id: 9, name: '棋牌娱乐', category: '兴趣爱好', cover: '', description: '象棋、围棋、麻将爱好者的交流圈', memberCount: 892, postCount: 2345, activityCount: 5, status: 'normal', admins: ['刘师傅', '王老汉'], createTime: '2025-08-28 14:00', creator: '刘师傅', joinType: 'public', activeToday: 78, newThisWeek: 11 },
  { id: 10, name: '园艺种植', category: '兴趣爱好', cover: '', description: '分享种植经验，交流园艺心得', memberCount: 456, postCount: 1123, activityCount: 4, status: 'disabled', admins: [], createTime: '2025-10-20 11:30', creator: '冯奶奶', joinType: 'public', activeToday: 0, newThisWeek: 0 },
];

const CIRCLE_MEMBERS = [
  // 广场舞爱好者 (circleId: 1) - 7人
  { id: 1, circleId: 1, userId: 4, userName: '赵阿姨', avatar: '', role: 'admin', joinTime: '2025-08-15 10:00', postCount: 156, lastActive: '2026-04-06 10:30', status: 'active' },
  { id: 2, circleId: 1, userId: 5, userName: '陈大妈', avatar: '', role: 'admin', joinTime: '2025-08-15 10:05', postCount: 134, lastActive: '2026-04-06 09:15', status: 'active' },
  { id: 3, circleId: 1, userId: 2, userName: '张大爷', avatar: '', role: 'member', joinTime: '2025-08-16 14:20', postCount: 89, lastActive: '2026-04-05 16:40', status: 'active' },
  { id: 4, circleId: 1, userId: 3, userName: '李奶奶', avatar: '', role: 'member', joinTime: '2025-08-18 09:30', postCount: 67, lastActive: '2026-04-06 08:20', status: 'active' },
  { id: 5, circleId: 1, userId: 9, userName: '周阿姨', avatar: '', role: 'member', joinTime: '2025-08-20 11:00', postCount: 45, lastActive: '2026-04-04 15:30', status: 'active' },
  { id: 6, circleId: 1, userId: 10, userName: '吴大爷', avatar: '', role: 'member', joinTime: '2025-09-01 10:00', postCount: 23, lastActive: '2026-03-28 12:00', status: 'silent' },
  { id: 7, circleId: 1, userId: 11, userName: '郑奶奶', avatar: '', role: 'member', joinTime: '2025-09-15 16:30', postCount: 12, lastActive: '2026-03-15 09:00', status: 'silent' },

  // 养生交流圈 (circleId: 2) - 5人
  { id: 8, circleId: 2, userId: 2, userName: '张大爷', avatar: '', role: 'admin', joinTime: '2025-09-20 14:30', postCount: 198, lastActive: '2026-04-06 11:00', status: 'active' },
  { id: 9, circleId: 2, userId: 3, userName: '李奶奶', avatar: '', role: 'member', joinTime: '2025-09-21 10:00', postCount: 145, lastActive: '2026-04-06 09:45', status: 'active' },
  { id: 10, circleId: 2, userId: 6, userName: '刘师傅', avatar: '', role: 'member', joinTime: '2025-09-25 15:20', postCount: 87, lastActive: '2026-04-05 14:30', status: 'active' },
  { id: 11, circleId: 2, userId: 8, userName: '孙大爷', avatar: '', role: 'member', joinTime: '2025-10-02 09:00', postCount: 56, lastActive: '2026-04-03 16:20', status: 'active' },
  { id: 12, circleId: 2, userId: 12, userName: '冯奶奶', avatar: '', role: 'member', joinTime: '2025-10-15 14:30', postCount: 34, lastActive: '2026-03-20 11:00', status: 'silent' },

  // 书法天地 (circleId: 3) - 6人
  { id: 13, circleId: 3, userId: 3, userName: '李奶奶', avatar: '', role: 'admin', joinTime: '2025-07-10 09:00', postCount: 234, lastActive: '2026-04-06 10:15', status: 'active' },
  { id: 14, circleId: 3, userId: 2, userName: '张大爷', avatar: '', role: 'member', joinTime: '2025-07-12 11:30', postCount: 156, lastActive: '2026-04-05 16:00', status: 'active' },
  { id: 15, circleId: 3, userId: 7, userName: '王老汉', avatar: '', role: 'member', joinTime: '2025-07-15 14:00', postCount: 98, lastActive: '2026-04-04 10:30', status: 'active' },
  { id: 16, circleId: 3, userId: 9, userName: '周阿姨', avatar: '', role: 'member', joinTime: '2025-07-20 10:00', postCount: 67, lastActive: '2026-04-05 09:15', status: 'active' },
  { id: 17, circleId: 3, userId: 11, userName: '郑奶奶', avatar: '', role: 'member', joinTime: '2025-08-01 15:30', postCount: 45, lastActive: '2026-03-25 14:00', status: 'silent' },
  { id: 18, circleId: 3, userId: 13, userName: '何大爷', avatar: '', role: 'member', joinTime: '2025-08-10 11:00', postCount: 23, lastActive: '2026-03-18 10:30', status: 'silent' },

  // 太极功夫 (circleId: 4) - 4人
  { id: 19, circleId: 4, userId: 8, userName: '孙大爷', avatar: '', role: 'admin', joinTime: '2025-10-05 16:00', postCount: 123, lastActive: '2026-04-06 08:30', status: 'active' },
  { id: 20, circleId: 4, userId: 2, userName: '张大爷', avatar: '', role: 'member', joinTime: '2025-10-08 10:00', postCount: 89, lastActive: '2026-04-05 15:20', status: 'active' },
  { id: 21, circleId: 4, userId: 7, userName: '王老汉', avatar: '', role: 'member', joinTime: '2025-10-12 14:30', postCount: 56, lastActive: '2026-04-04 11:00', status: 'active' },
  { id: 22, circleId: 4, userId: 10, userName: '吴大爷', avatar: '', role: 'member', joinTime: '2025-10-20 09:00', postCount: 34, lastActive: '2026-03-30 16:00', status: 'active' },

  // 钓鱼达人 (circleId: 5) - 5人
  { id: 23, circleId: 5, userId: 6, userName: '刘师傅', avatar: '', role: 'admin', joinTime: '2025-11-12 11:00', postCount: 178, lastActive: '2026-04-06 09:45', status: 'active' },
  { id: 24, circleId: 5, userId: 2, userName: '张大爷', avatar: '', role: 'member', joinTime: '2025-11-15 14:00', postCount: 98, lastActive: '2026-04-05 10:30', status: 'active' },
  { id: 25, circleId: 5, userId: 7, userName: '王老汉', avatar: '', role: 'member', joinTime: '2025-11-18 10:30', postCount: 67, lastActive: '2026-04-04 15:00', status: 'active' },
  { id: 26, circleId: 5, userId: 10, userName: '吴大爷', avatar: '', role: 'member', joinTime: '2025-11-25 16:00', postCount: 45, lastActive: '2026-04-03 11:20', status: 'active' },
  { id: 27, circleId: 5, userId: 13, userName: '何大爷', avatar: '', role: 'member', joinTime: '2025-12-01 09:00', postCount: 23, lastActive: '2026-03-28 14:30', status: 'silent' },

  // 红歌传唱 (circleId: 6) - 6人
  { id: 28, circleId: 6, userId: 7, userName: '王老汉', avatar: '', role: 'admin', joinTime: '2025-06-18 15:30', postCount: 189, lastActive: '2026-04-06 10:00', status: 'active' },
  { id: 29, circleId: 6, userId: 9, userName: '周阿姨', avatar: '', role: 'admin', joinTime: '2025-06-18 15:35', postCount: 156, lastActive: '2026-04-06 09:30', status: 'active' },
  { id: 30, circleId: 6, userId: 3, userName: '李奶奶', avatar: '', role: 'member', joinTime: '2025-06-20 10:00', postCount: 123, lastActive: '2026-04-05 14:20', status: 'active' },
  { id: 31, circleId: 6, userId: 4, userName: '赵阿姨', avatar: '', role: 'member', joinTime: '2025-06-22 11:30', postCount: 98, lastActive: '2026-04-05 11:00', status: 'active' },
  { id: 32, circleId: 6, userId: 5, userName: '陈大妈', avatar: '', role: 'member', joinTime: '2025-06-25 14:00', postCount: 67, lastActive: '2026-04-04 16:30', status: 'active' },
  { id: 33, circleId: 6, userId: 11, userName: '郑奶奶', avatar: '', role: 'member', joinTime: '2025-07-01 10:00', postCount: 34, lastActive: '2026-03-22 09:00', status: 'silent' },

  // 摄影俱乐部 (circleId: 7) - 5人
  { id: 34, circleId: 7, userId: 5, userName: '陈大妈', avatar: '', role: 'admin', joinTime: '2025-09-01 10:30', postCount: 167, lastActive: '2026-04-06 11:15', status: 'active' },
  { id: 35, circleId: 7, userId: 2, userName: '张大爷', avatar: '', role: 'member', joinTime: '2025-09-03 14:00', postCount: 112, lastActive: '2026-04-05 15:45', status: 'active' },
  { id: 36, circleId: 7, userId: 6, userName: '刘师傅', avatar: '', role: 'member', joinTime: '2025-09-05 11:00', postCount: 89, lastActive: '2026-04-05 10:20', status: 'active' },
  { id: 37, circleId: 7, userId: 8, userName: '孙大爷', avatar: '', role: 'member', joinTime: '2025-09-10 16:30', postCount: 56, lastActive: '2026-04-03 14:00', status: 'active' },
  { id: 38, circleId: 7, userId: 12, userName: '冯奶奶', avatar: '', role: 'member', joinTime: '2025-09-15 09:00', postCount: 34, lastActive: '2026-03-26 11:30', status: 'silent' },

  // 社区志愿者 (circleId: 8) - 4人
  { id: 39, circleId: 8, userId: 3, userName: '李奶奶', avatar: '', role: 'admin', joinTime: '2025-12-03 09:00', postCount: 145, lastActive: '2026-04-06 08:45', status: 'active' },
  { id: 40, circleId: 8, userId: 4, userName: '赵阿姨', avatar: '', role: 'member', joinTime: '2025-12-05 10:30', postCount: 98, lastActive: '2026-04-05 16:00', status: 'active' },
  { id: 41, circleId: 8, userId: 9, userName: '周阿姨', avatar: '', role: 'member', joinTime: '2025-12-08 14:00', postCount: 67, lastActive: '2026-04-04 10:15', status: 'active' },
  { id: 42, circleId: 8, userId: 11, userName: '郑奶奶', avatar: '', role: 'member', joinTime: '2025-12-12 11:00', postCount: 45, lastActive: '2026-04-02 15:30', status: 'active' },

  // 棋牌娱乐 (circleId: 9) - 6人
  { id: 43, circleId: 9, userId: 6, userName: '刘师傅', avatar: '', role: 'admin', joinTime: '2025-08-28 14:00', postCount: 201, lastActive: '2026-04-06 10:45', status: 'active' },
  { id: 44, circleId: 9, userId: 7, userName: '王老汉', avatar: '', role: 'admin', joinTime: '2025-08-28 14:05', postCount: 178, lastActive: '2026-04-06 09:20', status: 'active' },
  { id: 45, circleId: 9, userId: 2, userName: '张大爷', avatar: '', role: 'member', joinTime: '2025-08-30 10:00', postCount: 134, lastActive: '2026-04-05 14:30', status: 'active' },
  { id: 46, circleId: 9, userId: 8, userName: '孙大爷', avatar: '', role: 'member', joinTime: '2025-09-02 11:30', postCount: 98, lastActive: '2026-04-05 11:15', status: 'active' },
  { id: 47, circleId: 9, userId: 10, userName: '吴大爷', avatar: '', role: 'member', joinTime: '2025-09-05 15:00', postCount: 67, lastActive: '2026-04-04 16:00', status: 'active' },
  { id: 48, circleId: 9, userId: 13, userName: '何大爷', avatar: '', role: 'member', joinTime: '2025-09-10 09:30', postCount: 45, lastActive: '2026-03-29 10:00', status: 'silent' },
];

const CIRCLE_POSTS = [
  // 广场舞爱好者 (circleId: 1) - 8条
  { id: 1, circleId: 1, type: 'image', title: '今日广场舞新动作教学', author: '赵阿姨', authorId: 4, createTime: '2026-04-06 09:30', likes: 156, comments: 34, views: 892, status: 'pinned', isPinned: true },
  { id: 2, circleId: 1, type: 'video', title: '五一晚会节目预演视频', author: '陈大妈', authorId: 5, createTime: '2026-04-05 16:20', likes: 234, comments: 56, views: 1245, status: 'pinned', isPinned: true },
  { id: 3, circleId: 1, type: 'image', title: '广场舞队服装设计方案', author: '张大爷', authorId: 2, createTime: '2026-04-05 14:10', likes: 89, comments: 23, views: 567, status: 'normal', isPinned: false },
  { id: 4, circleId: 1, type: 'image', title: '上周汇演精彩瞬间回顾', author: '李奶奶', authorId: 3, createTime: '2026-04-04 11:00', likes: 178, comments: 45, views: 923, status: 'normal', isPinned: false },
  { id: 5, circleId: 1, type: 'image', title: '新成员自我介绍', author: '周阿姨', authorId: 9, createTime: '2026-04-03 10:30', likes: 67, comments: 12, views: 345, status: 'normal', isPinned: false },
  { id: 6, circleId: 1, type: 'video', title: '广场舞基础步伐教学', author: '赵阿姨', authorId: 4, createTime: '2026-04-02 14:20', likes: 145, comments: 38, views: 756, status: 'normal', isPinned: false },
  { id: 7, circleId: 1, type: 'image', title: '舞蹈队新队服投票', author: '陈大妈', authorId: 5, createTime: '2026-04-01 10:15', likes: 98, comments: 67, views: 634, status: 'normal', isPinned: false },
  { id: 8, circleId: 1, type: 'image', title: '违规广告内容', author: '测试用户', authorId: 99, createTime: '2026-03-30 10:00', likes: 0, comments: 0, views: 12, status: 'deleted', isPinned: false },

  // 养生交流圈 (circleId: 2) - 7条
  { id: 9, circleId: 2, type: 'image', title: '春季养生食谱分享', author: '张大爷', authorId: 2, createTime: '2026-04-06 08:45', likes: 267, comments: 78, views: 1456, status: 'pinned', isPinned: true },
  { id: 10, circleId: 2, type: 'image', title: '中医养生讲座笔记整理', author: '李奶奶', authorId: 3, createTime: '2026-04-05 15:30', likes: 198, comments: 56, views: 1023, status: 'normal', isPinned: false },
  { id: 11, circleId: 2, type: 'video', title: '八段锦教学视频', author: '刘师傅', authorId: 6, createTime: '2026-04-04 09:20', likes: 345, comments: 89, views: 1890, status: 'normal', isPinned: false },
  { id: 12, circleId: 2, type: 'image', title: '养生茶配方推荐', author: '张大爷', authorId: 2, createTime: '2026-04-03 14:00', likes: 156, comments: 34, views: 789, status: 'normal', isPinned: false },
  { id: 13, circleId: 2, type: 'image', title: '春季养生注意事项', author: '孙大爷', authorId: 8, createTime: '2026-04-02 11:30', likes: 123, comments: 28, views: 567, status: 'normal', isPinned: false },
  { id: 14, circleId: 2, type: 'video', title: '太极养生功法演示', author: '刘师傅', authorId: 6, createTime: '2026-04-01 16:00', likes: 189, comments: 45, views: 923, status: 'normal', isPinned: false },
  { id: 15, circleId: 2, type: 'image', title: '养生药膳制作方法', author: '李奶奶', authorId: 3, createTime: '2026-03-31 10:20', likes: 134, comments: 32, views: 678, status: 'normal', isPinned: false },

  // 书法天地 (circleId: 3) - 6条
  { id: 16, circleId: 3, type: 'image', title: '本周书法作品展示', author: '李奶奶', authorId: 3, createTime: '2026-04-06 10:00', likes: 234, comments: 45, views: 1123, status: 'pinned', isPinned: true },
  { id: 17, circleId: 3, type: 'image', title: '楷书基础笔画练习心得', author: '张大爷', authorId: 2, createTime: '2026-04-05 11:30', likes: 123, comments: 28, views: 678, status: 'normal', isPinned: false },
  { id: 18, circleId: 3, type: 'image', title: '行书临摹技巧分享', author: '王老汉', authorId: 7, createTime: '2026-04-04 15:20', likes: 167, comments: 34, views: 845, status: 'normal', isPinned: false },
  { id: 19, circleId: 3, type: 'image', title: '颜真卿楷书临摹作品', author: '周阿姨', authorId: 9, createTime: '2026-04-03 09:45', likes: 145, comments: 29, views: 734, status: 'normal', isPinned: false },
  { id: 20, circleId: 3, type: 'video', title: '书法执笔姿势讲解', author: '李奶奶', authorId: 3, createTime: '2026-04-02 14:30', likes: 198, comments: 52, views: 1012, status: 'normal', isPinned: false },
  { id: 21, circleId: 3, type: 'image', title: '草书入门练习', author: '张大爷', authorId: 2, createTime: '2026-04-01 11:00', likes: 112, comments: 23, views: 589, status: 'normal', isPinned: false },

  // 太极功夫 (circleId: 4) - 5条
  { id: 22, circleId: 4, type: 'video', title: '太极拳24式完整演示', author: '孙大爷', authorId: 8, createTime: '2026-04-06 08:15', likes: 278, comments: 67, views: 1456, status: 'pinned', isPinned: true },
  { id: 23, circleId: 4, type: 'image', title: '太极拳基本功练习要点', author: '张大爷', authorId: 2, createTime: '2026-04-05 10:30', likes: 156, comments: 34, views: 823, status: 'normal', isPinned: false },
  { id: 24, circleId: 4, type: 'video', title: '太极推手技巧讲解', author: '孙大爷', authorId: 8, createTime: '2026-04-04 14:20', likes: 189, comments: 45, views: 967, status: 'normal', isPinned: false },
  { id: 25, circleId: 4, type: 'image', title: '太极拳练习心得分享', author: '王老汉', authorId: 7, createTime: '2026-04-03 11:45', likes: 123, comments: 28, views: 645, status: 'normal', isPinned: false },
  { id: 26, circleId: 4, type: 'image', title: '太极拳呼吸法要领', author: '吴大爷', authorId: 10, createTime: '2026-04-02 09:30', likes: 98, comments: 19, views: 534, status: 'normal', isPinned: false },

  // 钓鱼达人 (circleId: 5) - 6条
  { id: 27, circleId: 5, type: 'image', title: '春季钓鱼技巧分享', author: '刘师傅', authorId: 6, createTime: '2026-04-06 07:30', likes: 234, comments: 56, views: 1234, status: 'pinned', isPinned: true },
  { id: 28, circleId: 5, type: 'image', title: '今日渔获展示', author: '张大爷', authorId: 2, createTime: '2026-04-05 16:45', likes: 178, comments: 43, views: 892, status: 'normal', isPinned: false },
  { id: 29, circleId: 5, type: 'video', title: '钓鱼装备选购指南', author: '刘师傅', authorId: 6, createTime: '2026-04-04 10:20', likes: 156, comments: 38, views: 756, status: 'normal', isPinned: false },
  { id: 30, circleId: 5, type: 'image', title: '钓鱼饵料配方推荐', author: '王老汉', authorId: 7, createTime: '2026-04-03 14:30', likes: 134, comments: 31, views: 678, status: 'normal', isPinned: false },
  { id: 31, circleId: 5, type: 'image', title: '南山水库钓点推荐', author: '吴大爷', authorId: 10, createTime: '2026-04-02 11:00', likes: 112, comments: 27, views: 589, status: 'normal', isPinned: false },
  { id: 32, circleId: 5, type: 'video', title: '钓鱼抛竿技巧教学', author: '刘师傅', authorId: 6, createTime: '2026-04-01 15:20', likes: 189, comments: 48, views: 923, status: 'normal', isPinned: false },

  // 红歌传唱 (circleId: 6) - 5条
  { id: 33, circleId: 6, type: 'video', title: '《我和我的祖国》合唱', author: '王老汉', authorId: 7, createTime: '2026-04-06 09:00', likes: 312, comments: 78, views: 1567, status: 'pinned', isPinned: true },
  { id: 34, circleId: 6, type: 'image', title: '红歌歌词整理分享', author: '周阿姨', authorId: 9, createTime: '2026-04-05 14:30', likes: 189, comments: 45, views: 923, status: 'normal', isPinned: false },
  { id: 35, circleId: 6, type: 'video', title: '《歌唱祖国》演唱技巧', author: '李奶奶', authorId: 3, createTime: '2026-04-04 10:45', likes: 234, comments: 56, views: 1123, status: 'normal', isPinned: false },
  { id: 36, circleId: 6, type: 'image', title: '红歌演唱会节目单', author: '赵阿姨', authorId: 4, createTime: '2026-04-03 15:20', likes: 156, comments: 38, views: 789, status: 'normal', isPinned: false },
  { id: 37, circleId: 6, type: 'video', title: '红歌合唱排练视频', author: '陈大妈', authorId: 5, createTime: '2026-04-02 11:30', likes: 178, comments: 42, views: 867, status: 'normal', isPinned: false },

  // 摄影俱乐部 (circleId: 7) - 6条
  { id: 38, circleId: 7, type: 'image', title: '春日花卉摄影作品', author: '陈大妈', authorId: 5, createTime: '2026-04-06 10:20', likes: 267, comments: 67, views: 1345, status: 'pinned', isPinned: true },
  { id: 39, circleId: 7, type: 'image', title: '人像摄影技巧分享', author: '张大爷', authorId: 2, createTime: '2026-04-05 14:45', likes: 198, comments: 48, views: 1012, status: 'normal', isPinned: false },
  { id: 40, circleId: 7, type: 'video', title: '相机参数设置教学', author: '刘师傅', authorId: 6, createTime: '2026-04-04 11:30', likes: 234, comments: 56, views: 1156, status: 'normal', isPinned: false },
  { id: 41, circleId: 7, type: 'image', title: '风光摄影作品展示', author: '孙大爷', authorId: 8, createTime: '2026-04-03 09:15', likes: 178, comments: 42, views: 923, status: 'normal', isPinned: false },
  { id: 42, circleId: 7, type: 'image', title: '手机摄影技巧分享', author: '陈大妈', authorId: 5, createTime: '2026-04-02 15:30', likes: 156, comments: 38, views: 789, status: 'normal', isPinned: false },
  { id: 43, circleId: 7, type: 'video', title: '摄影构图基础讲解', author: '张大爷', authorId: 2, createTime: '2026-04-01 10:45', likes: 189, comments: 45, views: 967, status: 'normal', isPinned: false },

  // 社区志愿者 (circleId: 8) - 5条
  { id: 44, circleId: 8, type: 'image', title: '社区清洁活动总结', author: '李奶奶', authorId: 3, createTime: '2026-04-06 08:30', likes: 234, comments: 56, views: 1123, status: 'pinned', isPinned: true },
  { id: 45, circleId: 8, type: 'image', title: '志愿服务心得分享', author: '赵阿姨', authorId: 4, createTime: '2026-04-05 14:20', likes: 178, comments: 43, views: 892, status: 'normal', isPinned: false },
  { id: 46, circleId: 8, type: 'video', title: '社区义诊活动记录', author: '周阿姨', authorId: 9, createTime: '2026-04-04 10:30', likes: 198, comments: 48, views: 1012, status: 'normal', isPinned: false },
  { id: 47, circleId: 8, type: 'image', title: '志愿者招募公告', author: '李奶奶', authorId: 3, createTime: '2026-04-03 11:45', likes: 156, comments: 38, views: 789, status: 'normal', isPinned: false },
  { id: 48, circleId: 8, type: 'image', title: '社区帮扶活动照片', author: '郑奶奶', authorId: 11, createTime: '2026-04-02 15:00', likes: 134, comments: 32, views: 678, status: 'normal', isPinned: false },

  // 棋牌娱乐 (circleId: 9) - 6条
  { id: 49, circleId: 9, type: 'image', title: '象棋残局破解技巧', author: '刘师傅', authorId: 6, createTime: '2026-04-06 09:45', likes: 289, comments: 72, views: 1456, status: 'pinned', isPinned: true },
  { id: 50, circleId: 9, type: 'video', title: '围棋入门教学视频', author: '王老汉', authorId: 7, createTime: '2026-04-05 14:30', likes: 234, comments: 58, views: 1234, status: 'normal', isPinned: false },
  { id: 51, circleId: 9, type: 'image', title: '麻将技巧心得分享', author: '张大爷', authorId: 2, createTime: '2026-04-04 11:20', likes: 198, comments: 48, views: 1023, status: 'normal', isPinned: false },
  { id: 52, circleId: 9, type: 'image', title: '象棋比赛精彩对局', author: '孙大爷', authorId: 8, createTime: '2026-04-03 15:45', likes: 167, comments: 39, views: 867, status: 'normal', isPinned: false },
  { id: 53, circleId: 9, type: 'video', title: '围棋定式讲解', author: '王老汉', authorId: 7, createTime: '2026-04-02 10:30', likes: 189, comments: 45, views: 945, status: 'normal', isPinned: false },
  { id: 54, circleId: 9, type: 'image', title: '棋牌室活动安排', author: '吴大爷', authorId: 10, createTime: '2026-04-01 14:15', likes: 145, comments: 34, views: 723, status: 'normal', isPinned: false },
];

const ACTIVITIES = [
  // 进行中活动
  { id: 1, title: '重阳节健步走活动', startTime: '2026-10-09 08:00', endTime: '2026-10-09 11:00', location: '渝中区人民公园', maxEnroll: 200, enrollCount: 128, scopeType: 'region', scope: '重庆市渝中区', scopeDetail: ['500000', '500103'], description: '重阳节特别活动，组织老年朋友们进行健步走锻炼，增强体质，享受秋日美景。活动结束后有茶话会交流环节。', promotionalImages: ['https://picsum.photos/750/400?random=1', 'https://picsum.photos/750/400?random=2'], status: 'ongoing', creator: '运营部-张华', createTime: '2026-09-20 10:00', publishTime: '2026-09-21 09:00' },
  { id: 4, title: '春季太极拳培训班', startTime: '2026-04-10 07:00', endTime: '2026-04-10 09:00', location: '南岸区南滨路江边广场', maxEnroll: 60, enrollCount: 45, scopeType: 'region', scope: '重庆市南岸区', scopeDetail: ['500000', '500108'], description: '专业太极拳教练授课，适合零基础学员。学习24式简化太极拳，强身健体，修身养性。', promotionalImages: ['https://picsum.photos/750/400?random=7'], status: 'ongoing', creator: '运营部-赵强', createTime: '2026-03-15 11:00', publishTime: '2026-03-16 09:00' },
  { id: 5, title: '社区义诊活动', startTime: '2026-04-12 09:00', endTime: '2026-04-12 12:00', location: '江北区观音桥街道社区服务中心', maxEnroll: 150, enrollCount: 89, scopeType: 'region', scope: '重庆市江北区', scopeDetail: ['500000', '500105'], description: '联合多家医院开展免费义诊，提供血压测量、血糖检测、健康咨询等服务。现场发放健康手册。', promotionalImages: ['https://picsum.photos/750/400?random=8', 'https://picsum.photos/750/400?random=9'], status: 'ongoing', creator: '运营部-孙丽', createTime: '2026-03-28 15:00', publishTime: '2026-03-29 10:00' },
  { id: 6, title: '老年智能手机使用培训', startTime: '2026-04-15 14:00', endTime: '2026-04-15 16:00', location: '沙坪坝区老年活动中心', maxEnroll: 40, enrollCount: 38, scopeType: 'org', scope: '沙坪坝区老年协会', scopeDetail: [103], description: '手把手教老年人使用智能手机，包括微信使用、网上购物、健康码操作等实用技能。', promotionalImages: [], status: 'ongoing', creator: '运营部-周敏', createTime: '2026-04-01 10:00', publishTime: '2026-04-02 09:00' },
  { id: 7, title: '端午节包粽子大赛', startTime: '2026-06-01 09:00', endTime: '2026-06-01 12:00', location: '渝北区龙溪街道文化广场', maxEnroll: 80, enrollCount: 72, scopeType: 'region', scope: '重庆市渝北区', scopeDetail: ['500000', '500112'], description: '传统端午节活动，比拼包粽子技艺，评选最佳粽子。活动结束后大家一起品尝粽子，共度佳节。', promotionalImages: ['https://picsum.photos/750/400?random=10'], status: 'ongoing', creator: '运营部-吴涛', createTime: '2026-05-10 09:00', publishTime: '2026-05-11 10:00' },
  { id: 8, title: '摄影技巧分享会', startTime: '2026-04-18 15:00', endTime: '2026-04-18 17:00', location: '九龙坡区文化宫', maxEnroll: 50, enrollCount: 31, scopeType: 'all', scope: '全平台', scopeDetail: null, description: '资深摄影师分享手机摄影技巧，教大家如何拍出好看的照片。现场互动点评学员作品。', promotionalImages: ['https://picsum.photos/750/400?random=11', 'https://picsum.photos/750/400?random=12'], status: 'ongoing', creator: '运营部-郑杰', createTime: '2026-04-05 14:00', publishTime: '2026-04-06 09:00' },
  { id: 10, title: '健康饮食讲座', startTime: '2026-04-20 14:30', endTime: '2026-04-20 16:30', location: '线上直播', maxEnroll: 300, enrollCount: 187, scopeType: 'all', scope: '全平台', scopeDetail: null, description: '营养师讲解老年人健康饮食知识，包括营养搭配、食材选择、烹饪方法等。提供实用食谱参考。', promotionalImages: ['https://picsum.photos/750/400?random=13'], status: 'ongoing', creator: '运营部-何静', createTime: '2026-04-08 11:00', publishTime: '2026-04-09 10:00' },
  { id: 11, title: '社区运动会', startTime: '2026-05-15 08:00', endTime: '2026-05-15 12:00', location: '巴南区体育公园', maxEnroll: 200, enrollCount: 156, scopeType: 'region', scope: '重庆市巴南区', scopeDetail: ['500000', '500113'], description: '社区老年运动会，设有健步走、太极拳、广场舞等比赛项目。增强体质，促进邻里交流。', promotionalImages: ['https://picsum.photos/750/400?random=14', 'https://picsum.photos/750/400?random=15'], status: 'ongoing', creator: '运营部-梁宇', createTime: '2026-04-25 09:00', publishTime: '2026-04-26 10:00' },

  // 已结束活动
  { id: 2, title: '老年书法展览', startTime: '2026-09-15 09:00', endTime: '2026-09-15 17:00', location: '渝中区文化馆三楼展厅', maxEnroll: 100, enrollCount: 56, scopeType: 'org', scope: '渝中区老年大学', scopeDetail: [101, 102], description: '展示老年书法爱好者的优秀作品，弘扬传统文化，促进书法艺术交流。现场有书法名家点评指导。', promotionalImages: ['https://picsum.photos/750/400?random=3'], status: 'finished', creator: '运营部-李明', createTime: '2026-08-25 14:30', publishTime: '2026-08-26 10:00' },
  { id: 3, title: '夏日养生讲座', startTime: '2026-08-20 14:00', endTime: '2026-08-20 16:30', location: '线上直播', maxEnroll: 500, enrollCount: 342, scopeType: 'all', scope: '全平台', scopeDetail: null, description: '邀请中医养生专家讲解夏季养生知识，包括饮食调理、作息安排、运动保健等内容。支持线上观看和互动提问。', promotionalImages: ['https://picsum.photos/750/400?random=4', 'https://picsum.photos/750/400?random=5', 'https://picsum.photos/750/400?random=6'], status: 'finished', creator: '运营部-王芳', createTime: '2026-08-01 09:00', publishTime: '2026-08-02 10:00' },
  { id: 9, title: '中秋诗词朗诵会', startTime: '2026-09-10 19:00', endTime: '2026-09-10 21:00', location: '大渡口区文化艺术中心', maxEnroll: 120, enrollCount: 95, scopeType: 'region', scope: '重庆市大渡口区', scopeDetail: ['500000', '500104'], description: '中秋佳节诗词朗诵活动，朗诵经典诗词，感受传统文化魅力。欢迎朗诵爱好者报名参加。', promotionalImages: [], status: 'finished', creator: '运营部-冯娜', createTime: '2026-08-20 10:00', publishTime: '2026-08-21 09:00' },

  // 未开始活动
  { id: 22, title: '母亲节感恩活动', startTime: '2026-05-10 14:00', endTime: '2026-05-10 17:00', location: '渝中区解放碑广场', maxEnroll: 150, enrollCount: 68, scopeType: 'all', scope: '全平台', scopeDetail: null, description: '母亲节特别活动，为母亲们送上祝福和礼物。现场有文艺表演、亲子互动游戏等环节。', promotionalImages: ['https://picsum.photos/750/400?random=19'], status: 'pending', creator: '运营部-张华', createTime: '2026-04-01 09:00', publishTime: '2026-04-02 10:00' },
  { id: 23, title: '夏季养生茶会', startTime: '2026-06-15 15:00', endTime: '2026-06-15 17:30', location: '南岸区茶文化中心', maxEnroll: 50, enrollCount: 32, scopeType: 'region', scope: '重庆市南岸区', scopeDetail: ['500000', '500108'], description: '夏季养生茶品鉴会，学习夏季养生茶饮知识，品尝多种养生茶。茶艺师现场教学泡茶技巧。', promotionalImages: ['https://picsum.photos/750/400?random=20', 'https://picsum.photos/750/400?random=21'], status: 'pending', creator: '运营部-李明', createTime: '2026-04-03 10:00', publishTime: '2026-04-04 09:00' },
  { id: 24, title: '书画交流会', startTime: '2026-05-20 09:00', endTime: '2026-05-20 12:00', location: '江北区文化艺术中心', maxEnroll: 80, enrollCount: 45, scopeType: 'org', scope: '渝中区老年大学、江北区老年协会', scopeDetail: [101, 104], description: '书画爱好者交流活动，现场创作、互相点评。邀请书画名家现场指导。', promotionalImages: [], status: 'pending', creator: '运营部-王芳', createTime: '2026-04-05 11:00', publishTime: '2026-04-06 10:00' },
  { id: 25, title: '健康体检活动', startTime: '2026-04-25 08:00', endTime: '2026-04-25 12:00', location: '沙坪坝区人民医院', maxEnroll: 100, enrollCount: 87, scopeType: 'region', scope: '重庆市沙坪坝区', scopeDetail: ['500000', '500106'], description: '免费健康体检活动，包括血压、血糖、心电图等常规检查。体检后有医生一对一健康咨询。', promotionalImages: ['https://picsum.photos/750/400?random=22'], status: 'pending', creator: '运营部-赵强', createTime: '2026-04-01 14:00', publishTime: '2026-04-02 09:00' },
  { id: 26, title: '圈子联谊活动', startTime: '2026-05-08 14:00', endTime: '2026-05-08 17:00', location: '渝北区龙湖公园', maxEnroll: 60, enrollCount: 41, scopeType: 'circle', scope: '广场舞爱好者、养生交流圈、书画爱好者', scopeDetail: [1, 2, 3], description: '多个圈子联合举办的户外联谊活动，增进圈友交流，拓展社交圈。现场有游戏互动和茶点。', promotionalImages: ['https://picsum.photos/750/400?random=23'], status: 'pending', creator: '运营部-孙丽', createTime: '2026-04-04 15:00', publishTime: '2026-04-05 10:00' },

  // 草稿活动
  { id: 12, title: '广场舞大赛', startTime: '2026-11-01 14:00', endTime: '2026-11-01 17:00', location: '南岸区南山植物园广场', maxEnroll: 100, enrollCount: 0, scopeType: 'region', scope: '重庆市南岸区', scopeDetail: ['500000', '500108'], description: '全区广场舞队伍大比拼，展示各队风采，评选优秀队伍。设有一二三等奖和优秀组织奖。', promotionalImages: [], status: 'draft', creator: '运营部-张华', createTime: '2026-04-05 16:00' },
  { id: 13, title: '老年合唱团招募', startTime: '2026-04-25 09:00', endTime: '2026-04-25 11:00', location: '渝中区文化馆音乐厅', maxEnroll: 60, enrollCount: 0, scopeType: 'org', scope: '渝中区老年大学', scopeDetail: [101], description: '组建老年合唱团，定期排练演出。欢迎热爱唱歌的老年朋友加入，不要求专业基础。', promotionalImages: [], status: 'draft', creator: '运营部-李明', createTime: '2026-04-06 10:30' },
  { id: 14, title: '春游踏青活动', startTime: '2026-04-28 08:00', endTime: '2026-04-28 17:00', location: '北碚区缙云山风景区', maxEnroll: 80, enrollCount: 0, scopeType: 'all', scope: '全平台', scopeDetail: null, description: '组织老年朋友春游踏青，欣赏自然风光,呼吸新鲜空气。包含往返交通和午餐，专业领队陪同。', promotionalImages: [], status: 'draft', creator: '运营部-王芳', createTime: '2026-04-06 11:00' },
  { id: 15, title: '象棋比赛', startTime: '2026-05-05 13:00', endTime: '2026-05-05 18:00', location: '江北区老年活动中心', maxEnroll: 40, enrollCount: 0, scopeType: 'region', scope: '重庆市江北区', scopeDetail: ['500000', '500105'], description: '象棋爱好者切磋交流，采用积分循环赛制。设有冠亚季军奖项，欢迎棋艺爱好者报名。', promotionalImages: [], status: 'draft', creator: '运营部-赵强', createTime: '2026-04-06 13:20' },
  { id: 19, title: '手工编织培训班', startTime: '2026-05-10 14:00', endTime: '2026-05-10 17:00', location: '沙坪坝区老年活动中心', maxEnroll: 30, enrollCount: 0, scopeType: 'circle', scope: '广场舞爱好者、养生交流圈', scopeDetail: [1, 2], description: '教授基础编织技巧，包括围巾、帽子、手套等实用物品的编织方法。适合零基础学员。', promotionalImages: [], status: 'draft', creator: '运营部-陈敏', createTime: '2026-04-06 14:00' },
  { id: 20, title: '茶艺体验活动', startTime: '2026-05-18 15:00', endTime: '2026-05-18 17:30', location: '渝北区茶文化体验馆', maxEnroll: 25, enrollCount: 0, scopeType: 'circle', scope: '养生交流圈', scopeDetail: [2], description: '学习茶艺知识，体验茶道文化。专业茶艺师现场教学，品鉴多种名茶。', promotionalImages: [], status: 'draft', creator: '运营部-刘洋', createTime: '2026-04-06 15:30' },
  { id: 21, title: '园艺种植讲座', startTime: '2026-05-22 09:00', endTime: '2026-05-22 11:30', location: '九龙坡区社区花园', maxEnroll: 50, enrollCount: 0, scopeType: 'all', scope: '全平台', scopeDetail: null, description: '园艺专家讲解家庭种植技巧，包括花卉养护、蔬菜种植、病虫害防治等实用知识。', promotionalImages: [], status: 'draft', creator: '运营部-黄丽', createTime: '2026-04-06 16:00' },

  // 已下架活动
  { id: 16, title: '新春联欢会', startTime: '2026-02-10 14:00', endTime: '2026-02-10 17:00', location: '渝中区大礼堂', maxEnroll: 300, enrollCount: 278, scopeType: 'all', scope: '全平台', scopeDetail: null, description: '新春佳节联欢活动，精彩节目表演，抽奖互动环节。与老年朋友们共度欢乐时光。', promotionalImages: ['https://picsum.photos/750/400?random=16', 'https://picsum.photos/750/400?random=17'], status: 'offline', creator: '运营部-孙丽', createTime: '2026-01-15 09:00', publishTime: '2026-01-16 10:00' },
  { id: 17, title: '冬季养生讲座', startTime: '2026-01-20 14:00', endTime: '2026-01-20 16:00', location: '线上直播', maxEnroll: 400, enrollCount: 312, scopeType: 'all', scope: '全平台', scopeDetail: null, description: '冬季养生保健知识讲座，专家讲解冬季常见疾病预防和保健方法。', promotionalImages: [], status: 'offline', creator: '运营部-周敏', createTime: '2026-01-05 10:00', publishTime: '2026-01-06 09:00' },
  { id: 18, title: '元宵节猜灯谜', startTime: '2026-02-24 15:00', endTime: '2026-02-24 18:00', location: '南岸区南滨路', maxEnroll: 150, enrollCount: 132, scopeType: 'region', scope: '重庆市南岸区', scopeDetail: ['500000', '500108'], description: '元宵节传统活动，猜灯谜赢奖品。现场还有汤圆品尝和文艺表演。', promotionalImages: ['https://picsum.photos/750/400?random=18'], status: 'offline', creator: '运营部-吴涛', createTime: '2026-02-10 09:00', publishTime: '2026-02-11 10:00' },
];

// 活动报名成员
const ACTIVITY_ENROLLMENTS: Record<number, any[]> = {
  1: Array.from({ length: 128 }, (_, i) => ({
    id: i + 1,
    userId: 1000 + i,
    nickname: `用户${i + 1}`,
    avatar: '',
    phone: `138****${String(1000 + i).slice(-4)}`,
    region: ['重庆市渝中区', '重庆市江北区', '重庆市南岸区'][i % 3],
    enrollTime: `2026-09-${22 + Math.floor(i / 10)} ${8 + (i % 12)}:${10 + (i % 50)}`,
    status: i < 120 ? 'confirmed' : 'pending',
  })),
  2: Array.from({ length: 56 }, (_, i) => ({
    id: i + 1,
    userId: 2000 + i,
    nickname: `书法爱好者${i + 1}`,
    avatar: '',
    phone: `139****${String(2000 + i).slice(-4)}`,
    region: '重庆市渝中区',
    enrollTime: `2026-09-${5 + Math.floor(i / 10)} ${9 + (i % 10)}:${15 + (i % 45)}`,
    status: 'confirmed',
  })),
  3: Array.from({ length: 342 }, (_, i) => ({
    id: i + 1,
    userId: 3000 + i,
    nickname: `养生学员${i + 1}`,
    avatar: '',
    phone: `137****${String(3000 + i).slice(-4)}`,
    region: ['重庆市渝中区', '重庆市江北区', '重庆市南岸区', '重庆市沙坪坝区'][i % 4],
    enrollTime: `2026-08-${10 + Math.floor(i / 20)} ${10 + (i % 12)}:${5 + (i % 55)}`,
    status: 'confirmed',
  })),
  4: Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    userId: 4000 + i,
    nickname: `太极学员${i + 1}`,
    avatar: '',
    phone: `136****${String(4000 + i).slice(-4)}`,
    region: '重庆市南岸区',
    enrollTime: `2026-03-${20 + Math.floor(i / 10)} ${7 + (i % 8)}:${20 + (i % 40)}`,
    status: 'confirmed',
  })),
  5: Array.from({ length: 89 }, (_, i) => ({
    id: i + 1,
    userId: 5000 + i,
    nickname: `居民${i + 1}`,
    avatar: '',
    phone: `135****${String(5000 + i).slice(-4)}`,
    region: '重庆市江北区',
    enrollTime: `2026-04-${1 + Math.floor(i / 20)} ${8 + (i % 10)}:${10 + (i % 50)}`,
    status: 'confirmed',
  })),
};

const CIRCLE_ACTIVITIES = [
  // 广场舞爱好者 (circleId: 1) - 4个活动
  { id: 1, circleId: 1, circleName: '广场舞爱好者', title: '月度广场舞汇演', startTime: '2026-04-06 14:00', endTime: '2026-04-06 17:00', location: '渝中区人民广场', maxEnroll: 80, enrollCount: 47, description: '每月一次的广场舞汇演活动，展示各队伍的精彩舞蹈，促进交流学习。欢迎所有广场舞爱好者参加观摩。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-01 10:30', reviewer: '审核员A', activityStatus: 'ongoing', creator: '赵阿姨', createTime: '2026-03-28 09:00' },
  { id: 2, circleId: 1, circleName: '广场舞爱好者', title: '五一联欢晚会彩排', startTime: '2026-04-20 15:00', endTime: '2026-04-20 18:00', location: '解放碑文化广场', maxEnroll: 60, enrollCount: 32, description: '为五一联欢晚会做准备，进行节目彩排和走位练习。请参演人员务必准时到场。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-10 14:20', reviewer: '审核员B', activityStatus: 'upcoming', creator: '陈大妈', createTime: '2026-04-08 11:00' },
  { id: 3, circleId: 1, circleName: '广场舞爱好者', title: '广场舞技巧交流会', startTime: '2026-03-28 14:00', endTime: '2026-03-28 17:00', location: '渝中区文化宫', maxEnroll: 60, enrollCount: 56, description: '邀请专业舞蹈老师讲解广场舞技巧，分享舞蹈心得，提升舞蹈水平。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-03-20 09:15', reviewer: '审核员A', activityStatus: 'ended', creator: '赵阿姨', createTime: '2026-03-15 10:30' },
  { id: 4, circleId: 1, circleName: '广场舞爱好者', title: '夏季广场舞服装展示', startTime: '2026-05-10 14:00', endTime: '2026-05-10 16:00', location: '渝中区人民广场', maxEnroll: 50, enrollCount: 0, description: '展示新设计的夏季广场舞服装，征集大家意见，投票选出最受欢迎的款式。', promotionalImages: [], approvalStatus: 'pending', activityStatus: 'upcoming', creator: '陈大妈', createTime: '2026-04-06 08:30' },

  // 养生交流圈 (circleId: 2) - 3个活动
  { id: 5, circleId: 2, circleName: '养生交流圈', title: '中医养生知识讲座', startTime: '2026-04-08 09:00', endTime: '2026-04-08 11:30', location: '南岸区社区中心', maxEnroll: 100, enrollCount: 58, description: '邀请中医专家讲解春季养生知识，包括饮食调理、穴位按摩、作息调整等内容。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-02 15:40', reviewer: '审核员C', activityStatus: 'ended', creator: '张大爷', createTime: '2026-03-25 14:00' },
  { id: 6, circleId: 2, circleName: '养生交流圈', title: '春季养生茶品鉴会', startTime: '2026-04-12 14:30', endTime: '2026-04-12 17:00', location: '南岸区茶艺馆', maxEnroll: 50, enrollCount: 34, description: '品鉴各类养生茶，学习茶艺知识，了解不同茶叶的养生功效。现场有专业茶艺师指导。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-05 10:20', reviewer: '审核员A', activityStatus: 'upcoming', creator: '李奶奶', createTime: '2026-04-01 09:15' },
  { id: 7, circleId: 2, circleName: '养生交流圈', title: '夏季养生食谱分享会', startTime: '2026-05-15 10:00', endTime: '2026-05-15 12:00', location: '南岸区社区中心', maxEnroll: 60, enrollCount: 0, description: '分享夏季养生食谱，现场演示制作方法，交流养生心得。', promotionalImages: [], approvalStatus: 'rejected', reviewedAt: '2026-04-06 11:00', reviewer: '审核员B', rejectReason: '活动时间与社区中心其他活动冲突，建议调整时间后重新提交', activityStatus: 'upcoming', creator: '张大爷', createTime: '2026-04-05 16:30' },

  // 书法天地 (circleId: 3) - 3个活动
  { id: 8, circleId: 3, circleName: '书法天地', title: '圈内书法作品线上展览', startTime: '2026-05-01 00:00', endTime: '2026-05-07 23:59', location: '线上展览', maxEnroll: 100, enrollCount: 23, description: '线上展示圈内成员的书法作品，为期一周。欢迎大家投稿参展，展示自己的书法成果。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-15 09:30', reviewer: '审核员C', activityStatus: 'upcoming', creator: '王老汉', createTime: '2026-04-10 14:20' },
  { id: 9, circleId: 3, circleName: '书法天地', title: '春日写生活动', startTime: '2026-04-13 08:00', endTime: '2026-04-13 12:00', location: '南山植物园', maxEnroll: 30, enrollCount: 19, description: '到南山植物园进行户外写生，感受春天气息，创作书法作品。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-08 16:10', reviewer: '审核员A', activityStatus: 'ended', creator: '王老汉', createTime: '2026-04-03 10:00' },
  { id: 10, circleId: 3, circleName: '书法天地', title: '书法入门培训班', startTime: '2026-04-25 14:00', endTime: '2026-04-25 17:00', location: '江北区文化中心', maxEnroll: 40, enrollCount: 0, description: '面向书法初学者的培训课程，讲解基本笔画和书写技巧。', promotionalImages: [], approvalStatus: 'pending', activityStatus: 'upcoming', creator: '王老汉', createTime: '2026-04-06 09:45' },

  // 太极功夫 (circleId: 4) - 2个活动
  { id: 11, circleId: 4, circleName: '太极功夫', title: '太极拳友谊交流赛', startTime: '2026-04-15 08:30', endTime: '2026-04-15 12:00', location: '朝天门广场', maxEnroll: 40, enrollCount: 28, description: '与其他太极拳团队进行友谊交流赛，切磋技艺，增进友谊。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-08 14:50', reviewer: '审核员B', activityStatus: 'upcoming', creator: '刘师傅', createTime: '2026-04-02 11:20' },
  { id: 12, circleId: 4, circleName: '太极功夫', title: '太极拳晨练活动', startTime: '2026-04-20 06:00', endTime: '2026-04-20 07:30', location: '朝天门广场', maxEnroll: 50, enrollCount: 0, description: '每周固定晨练活动，练习太极拳，强身健体。', promotionalImages: [], approvalStatus: 'rejected', reviewedAt: '2026-04-06 10:15', reviewer: '审核员A', rejectReason: '活动信息不完整，缺少详细的活动流程和注意事项说明', activityStatus: 'upcoming', creator: '刘师傅', createTime: '2026-04-06 07:00' },

  // 钓鱼达人 (circleId: 5) - 3个活动
  { id: 13, circleId: 5, circleName: '钓鱼达人', title: '春季钓鱼大赛', startTime: '2026-04-18 06:00', endTime: '2026-04-18 14:00', location: '南山水库', maxEnroll: 50, enrollCount: 42, description: '春季钓鱼比赛，设置多个奖项，欢迎钓鱼爱好者参加。比赛规则详见活动群公告。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-10 09:20', reviewer: '审核员C', activityStatus: 'upcoming', creator: '孙大爷', createTime: '2026-04-05 15:30' },
  { id: 14, circleId: 5, circleName: '钓鱼达人', title: '钓鱼技巧分享会', startTime: '2026-04-10 14:00', endTime: '2026-04-10 17:00', location: '江北区钓鱼协会', maxEnroll: 30, enrollCount: 23, description: '资深钓友分享钓鱼技巧和经验，包括选位、打窝、调漂等实用技巧。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-06 08:40', reviewer: '审核员A', activityStatus: 'ended', creator: '孙大爷', createTime: '2026-04-01 10:00' },
  { id: 15, circleId: 5, circleName: '钓鱼达人', title: '夏季夜钓活动', startTime: '2026-05-20 18:00', endTime: '2026-05-21 02:00', location: '南山水库', maxEnroll: 30, enrollCount: 0, description: '夏季夜钓活动，体验夜钓的乐趣。请自备照明设备和防蚊用品。', promotionalImages: [], approvalStatus: 'pending', activityStatus: 'upcoming', creator: '孙大爷', createTime: '2026-04-06 11:30' },

  // 红歌传唱 (circleId: 6) - 2个活动
  { id: 16, circleId: 6, circleName: '红歌传唱', title: '区老年文艺汇演', startTime: '2026-04-25 14:00', endTime: '2026-04-25 17:30', location: '渝中区文化馆', maxEnroll: 80, enrollCount: 61, description: '参加区级老年文艺汇演，演唱经典红歌，展示我们圈子的风采。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-12 10:00', reviewer: '审核员B', activityStatus: 'upcoming', creator: '周阿姨', createTime: '2026-04-08 09:20' },
  { id: 17, circleId: 6, circleName: '红歌传唱', title: '红歌排练活动', startTime: '2026-04-22 15:00', endTime: '2026-04-22 17:00', location: '渝中区文化馆', maxEnroll: 60, enrollCount: 0, description: '为文艺汇演进行排练，统一服装和动作。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-15 14:30', reviewer: '审核员C', activityStatus: 'upcoming', creator: '周阿姨', createTime: '2026-04-14 10:15' },

  // 摄影俱乐部 (circleId: 7) - 2个活动
  { id: 18, circleId: 7, circleName: '摄影俱乐部', title: '春日摄影采风活动', startTime: '2026-04-14 08:00', endTime: '2026-04-14 12:00', location: '南山植物园', maxEnroll: 40, enrollCount: 38, description: '到南山植物园拍摄春季花卉，交流摄影技巧。请自备相机和必要装备。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-08 11:20', reviewer: '审核员A', activityStatus: 'ended', creator: '陈大妈', createTime: '2026-04-03 14:00' },
  { id: 19, circleId: 7, circleName: '摄影俱乐部', title: '摄影作品评选活动', startTime: '2026-04-28 14:00', endTime: '2026-04-28 17:00', location: '江北区文化中心', maxEnroll: 50, enrollCount: 0, description: '展示和评选圈内成员的摄影作品，设置多个奖项。', promotionalImages: [], approvalStatus: 'pending', activityStatus: 'upcoming', creator: '陈大妈', createTime: '2026-04-06 10:00' },

  // 社区志愿者 (circleId: 8) - 2个活动
  { id: 20, circleId: 8, circleName: '社区志愿者', title: '社区清洁日活动', startTime: '2026-04-09 08:00', endTime: '2026-04-09 11:00', location: '渝中区各社区', maxEnroll: 100, enrollCount: 67, description: '组织社区清洁活动，美化社区环境。请穿着便于活动的服装。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-03 09:30', reviewer: '审核员B', activityStatus: 'ended', creator: '李奶奶', createTime: '2026-03-28 15:00' },
  { id: 21, circleId: 8, circleName: '社区志愿者', title: '关爱空巢老人活动', startTime: '2026-04-22 09:00', endTime: '2026-04-22 12:00', location: '渝中区各社区', maxEnroll: 50, enrollCount: 0, description: '走访慰问社区空巢老人，提供生活帮助和精神关怀。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-16 10:45', reviewer: '审核员C', activityStatus: 'upcoming', creator: '李奶奶', createTime: '2026-04-12 11:00' },

  // 棋牌娱乐 (circleId: 9) - 3个活动
  { id: 22, circleId: 9, circleName: '棋牌娱乐', title: '象棋友谊赛', startTime: '2026-04-16 14:00', endTime: '2026-04-16 18:00', location: '江北区老年活动中心', maxEnroll: 60, enrollCount: 45, description: '举办象棋友谊赛，以棋会友，切磋棋艺。设置冠亚季军奖项。', promotionalImages: [], approvalStatus: 'approved', reviewedAt: '2026-04-10 15:20', reviewer: '审核员A', activityStatus: 'upcoming', creator: '刘师傅', createTime: '2026-04-06 09:00' },
  { id: 23, circleId: 9, circleName: '棋牌娱乐', title: '围棋入门培训', startTime: '2026-04-24 14:00', endTime: '2026-04-24 17:00', location: '江北区老年活动中心', maxEnroll: 30, enrollCount: 0, description: '面向围棋初学者的培训课程，讲解围棋基础知识和入门技巧。', promotionalImages: [], approvalStatus: 'pending', activityStatus: 'upcoming', creator: '王老汉', createTime: '2026-04-06 12:00' },
  { id: 24, circleId: 9, circleName: '棋牌娱乐', title: '麻将技巧交流会', startTime: '2026-05-05 14:00', endTime: '2026-05-05 17:00', location: '江北区老年活动中心', maxEnroll: 40, enrollCount: 0, description: '交流麻将技巧和心得，提升麻将水平。', promotionalImages: [], approvalStatus: 'rejected', reviewedAt: '2026-04-06 13:20', reviewer: '审核员B', rejectReason: '活动内容不符合规范，麻将属于娱乐性质，不宜作为圈子活动主题', activityStatus: 'upcoming', creator: '刘师傅', createTime: '2026-04-06 11:45' },
];

const PROVIDERS = [
  { id: 1, name: '渝中区爱心助餐中心', service: '助餐', contact: '023-6312****', region: '渝中区', rating: 4.8, orderCount: 312, status: 'active', createTime: '2024-01-15' },
  { id: 2, name: '南岸区暖心护理服务', service: '助浴', contact: '138****2233', region: '南岸区', rating: 4.7, orderCount: 187, status: 'active', createTime: '2024-03-22' },
  { id: 3, name: '洁家帮家政服务', service: '助洁', contact: '139****4455', region: '江北区', rating: 4.6, orderCount: 243, status: 'active', createTime: '2024-02-08' },
  { id: 4, name: '重庆三甲陪诊服务', service: '助医', contact: '136****6677', region: '渝中区', rating: 4.9, orderCount: 156, status: 'active', createTime: '2024-04-12' },
  { id: 5, name: '急救先锋应急服务', service: '助急', contact: '135****8899', region: '全市', rating: 4.9, orderCount: 89, status: 'active', createTime: '2024-05-01' },
  { id: 6, name: '安心出行专车', service: '助行', contact: '134****0011', region: '全市', rating: 4.7, orderCount: 421, status: 'active', createTime: '2024-01-20' },
  { id: 7, name: '巴渝颐养疗养院', service: '疗养', contact: '023-6788****', region: '北碚区', rating: 4.8, orderCount: 64, status: 'active', createTime: '2024-06-15' },
  { id: 8, name: '夕阳红活动策划', service: '活动', contact: '137****2233', region: '全市', rating: 4.6, orderCount: 38, status: 'inactive', createTime: '2024-07-01' },
];

const POINTS_RECORDS = [
  { id: 1, user: '张大爷', phone: '138****1234', type: 'earn', amount: 50, reason: '每日签到', time: '2026-04-02 08:12', balance: 1280 },
  { id: 2, user: '李奶奶', phone: '139****5678', type: 'earn', amount: 100, reason: '发布优质内容', time: '2026-04-02 09:30', balance: 860 },
  { id: 3, user: '赵阿姨', phone: '136****3456', type: 'spend', amount: 200, reason: '积分兑换礼品', time: '2026-04-01 15:44', balance: 2340 },
  { id: 4, user: '陈大妈', phone: '135****7890', type: 'earn', amount: 30, reason: '参与活动', time: '2026-04-01 11:20', balance: 980 },
  { id: 5, user: '刘师傅', phone: '134****2345', type: 'admin', amount: 500, reason: '管理员手动发放', time: '2026-03-31 17:00', balance: 760 },
  { id: 6, user: '王老汉', phone: '137****9012', type: 'spend', amount: 100, reason: '积分兑换优惠券', time: '2026-03-30 10:15', balance: 120 },
];

const POINT_RULES = [
  { id: 1, action: '每日签到', points: 10, limit: '每天1次', status: 'active' },
  { id: 2, action: '发布图文', points: 20, limit: '每天3次', status: 'active' },
  { id: 3, action: '发布视频', points: 30, limit: '每天2次', status: 'active' },
  { id: 4, action: '参与活动', points: 50, limit: '每次活动1次', status: 'active' },
  { id: 5, action: '邀请好友', points: 100, limit: '每人1次', status: 'active' },
  { id: 6, action: '内容被点赞', points: 5, limit: '每天上限50分', status: 'active' },
  { id: 7, action: '完善个人资料', points: 200, limit: '仅限1次', status: 'active' },
];

const CONTENTS = [
  { id: 1, type: 'image', title: '今日养生早餐分享', author: '张大爷', authorId: 1, createTime: '2026-04-06 09:12', status: 'pending', content: '今天给大家分享一下我的养生早餐，燕麦粥配红枣枸杞，营养又健康。坚持吃了一个月，感觉精神状态好多了。', likes: 0, comments: 0, favorites: 0, views: 23, shares: 0, thumbnail: 'https://picsum.photos/seed/1/400/300' },
  { id: 2, type: 'video', title: '太极二十四式教学', author: '刘师傅', authorId: 2, createTime: '2026-04-06 10:45', status: 'pending', content: '太极拳是中华传统武术，今天教大家二十四式的前八式，适合初学者练习。', likes: 0, comments: 0, favorites: 0, views: 45, shares: 0, duration: '12:30', thumbnail: 'https://picsum.photos/seed/2/400/300' },
  { id: 3, type: 'image', title: '重庆春日踏青记录', author: '李奶奶', authorId: 3, createTime: '2026-04-05 15:30', status: 'approved', content: '周末和老伴去南山植物园踏青，春天的花开得真美，拍了好多照片分享给大家。', likes: 156, comments: 23, favorites: 45, views: 892, shares: 32, reviewedAt: '2026-04-05 16:20', reviewer: '审核员A', thumbnail: 'https://picsum.photos/seed/3/400/300' },
  { id: 4, type: 'image', title: '某违规内容', author: '王老汉', authorId: 4, createTime: '2026-04-04 08:00', status: 'rejected', content: '包含不实信息的内容...', likes: 2, comments: 1, favorites: 0, views: 34, shares: 0, reviewedAt: '2026-04-04 09:15', reviewer: '审核员B', rejectReason: '内容违规：包含虚假医疗信息，可能误导用户', thumbnail: 'https://picsum.photos/seed/4/400/300' },
  { id: 5, type: 'video', title: '广场舞新编舞蹈', author: '赵阿姨', authorId: 5, createTime: '2026-04-03 14:20', status: 'approved', content: '我们舞蹈队新编的广场舞，节奏欢快，动作简单易学，欢迎大家一起来跳。', likes: 234, comments: 67, favorites: 89, views: 1523, shares: 56, duration: '8:45', reviewedAt: '2026-04-03 15:10', reviewer: '审核员A', thumbnail: 'https://picsum.photos/seed/5/400/300' },
  { id: 6, type: 'image', title: '家常菜谱：红烧肉', author: '陈大妈', authorId: 6, createTime: '2026-04-06 11:30', status: 'pending', content: '分享一道经典川菜红烧肉的做法，肥而不腻，入口即化。用料：五花肉500g、冰糖、酱油、料酒...', likes: 0, comments: 0, favorites: 0, views: 12, shares: 0, thumbnail: 'https://picsum.photos/seed/6/400/300' },
  { id: 7, type: 'video', title: '书法入门教学', author: '孙老师', authorId: 7, createTime: '2026-04-05 09:00', status: 'approved', content: '书法是中国传统艺术，今天教大家楷书基本笔画的写法，从横竖撇捺开始练习。', likes: 189, comments: 34, favorites: 67, views: 1045, shares: 45, duration: '15:20', reviewedAt: '2026-04-05 10:30', reviewer: '审核员C', thumbnail: 'https://picsum.photos/seed/7/400/300' },
  { id: 8, type: 'image', title: '社区活动照片集锦', author: '周大爷', authorId: 8, createTime: '2026-04-04 16:45', status: 'approved', content: '上周社区组织的春游活动，大家玩得很开心，这里整理了一些精彩瞬间。', likes: 267, comments: 45, favorites: 78, views: 1234, shares: 89, reviewedAt: '2026-04-04 17:20', reviewer: '审核员A', thumbnail: 'https://picsum.photos/seed/8/400/300' },
  { id: 9, type: 'video', title: '涉嫌广告推广', author: '某用户', authorId: 9, createTime: '2026-04-03 10:15', status: 'rejected', content: '推广某保健品的视频内容...', likes: 5, comments: 2, favorites: 1, views: 67, shares: 0, duration: '5:30', reviewedAt: '2026-04-03 11:00', reviewer: '审核员B', rejectReason: '涉及敏感信息：未经授权的商业广告推广', thumbnail: 'https://picsum.photos/seed/9/400/300' },
  { id: 10, type: 'image', title: '手工编织教程', author: '吴奶奶', authorId: 10, createTime: '2026-04-06 08:20', status: 'pending', content: '教大家编织一个简单的杯垫，材料简单，适合新手学习。', likes: 0, comments: 0, favorites: 0, views: 8, shares: 0, thumbnail: 'https://picsum.photos/seed/10/400/300' },
  { id: 11, type: 'video', title: '晨练八段锦', author: '马师傅', authorId: 11, createTime: '2026-04-02 06:30', status: 'approved', content: '八段锦是传统养生功法，每天早上练习可以强身健体，今天带大家完整练习一遍。', likes: 312, comments: 56, favorites: 123, views: 2134, shares: 98, duration: '18:40', reviewedAt: '2026-04-02 08:00', reviewer: '审核员C', thumbnail: 'https://picsum.photos/seed/11/400/300' },
  { id: 12, type: 'image', title: '低质量图片测试', author: '测试用户', authorId: 12, createTime: '2026-04-01 14:00', status: 'rejected', content: '模糊不清的图片内容...', likes: 0, comments: 0, favorites: 0, views: 15, shares: 0, reviewedAt: '2026-04-01 14:30', reviewer: '审核员A', rejectReason: '低质量内容：图片模糊不清，无实质内容', thumbnail: 'https://picsum.photos/seed/12/400/300' },
  { id: 13, type: 'video', title: '养生茶饮制作', author: '郑阿姨', authorId: 13, createTime: '2026-04-05 13:45', status: 'approved', content: '分享几款适合春季的养生茶饮，枸杞菊花茶、玫瑰花茶等，简单易做。', likes: 198, comments: 41, favorites: 89, views: 1456, shares: 67, duration: '10:15', reviewedAt: '2026-04-05 14:30', reviewer: '审核员B', thumbnail: 'https://picsum.photos/seed/13/400/300' },
  { id: 14, type: 'image', title: '社区志愿服务', author: '何大爷', authorId: 14, createTime: '2026-04-06 07:50', status: 'pending', content: '昨天参加了社区的志愿服务活动，帮助清理公共区域卫生，虽然累但很有意义。', likes: 0, comments: 0, favorites: 0, views: 5, shares: 0, thumbnail: 'https://picsum.photos/seed/14/400/300' },
  { id: 15, type: 'video', title: '虚假信息传播', author: '不良用户', authorId: 15, createTime: '2026-03-31 09:20', status: 'rejected', content: '传播未经证实的健康谣言...', likes: 3, comments: 1, favorites: 0, views: 89, shares: 0, duration: '6:20', reviewedAt: '2026-03-31 10:00', reviewer: '审核员C', rejectReason: '虚假信息：传播未经证实的健康谣言，可能造成不良影响', thumbnail: 'https://picsum.photos/seed/15/400/300' },
  { id: 16, type: 'image', title: '摄影技巧分享', author: '林老师', authorId: 16, createTime: '2026-04-04 11:20', status: 'approved', content: '给大家分享一些手机摄影的小技巧，如何拍出好看的风景照和人像照。', likes: 223, comments: 38, favorites: 91, views: 1678, shares: 134, reviewedAt: '2026-04-04 12:00', reviewer: '审核员A', thumbnail: 'https://picsum.photos/seed/16/400/300' },
  { id: 17, type: 'video', title: '民族舞蹈表演', author: '杨老师', authorId: 17, createTime: '2026-04-03 16:30', status: 'approved', content: '我们舞蹈团表演的民族舞蹈，展现了传统文化的魅力。', likes: 276, comments: 52, favorites: 104, views: 1890, shares: 78, duration: '9:50', reviewedAt: '2026-04-03 17:15', reviewer: '审核员B', thumbnail: 'https://picsum.photos/seed/17/400/300' },
  { id: 18, type: 'image', title: '园艺种植心得', author: '冯奶奶', authorId: 18, createTime: '2026-04-06 10:10', status: 'pending', content: '分享我在阳台种植蔬菜的经验，小空间也能有大收获，绿色健康又环保。', likes: 0, comments: 0, favorites: 0, views: 18, shares: 0, thumbnail: 'https://picsum.photos/seed/18/400/300' },
];

const REPORTS = [
  { id: 1, type: 'content', target: '某违规内容', reporter: '陈大妈', reason: '包含不实信息', time: '2026-03-30 11:00', status: 'pending' },
  { id: 2, type: 'user', target: '王老汉', reporter: '李奶奶', reason: '发送骚扰消息', time: '2026-03-29 16:00', status: 'handled' },
  { id: 3, type: 'circle', target: '某圈子', reporter: '张大爷', reason: '发布广告', time: '2026-03-28 09:30', status: 'pending' },
];

const ROLES = [
  { id: 1, roleName: '超级管理员', desc: '平台最高权限', accountCount: 2, permissions: ['all'] },
  { id: 2, roleName: '内容审核员', desc: '负责内容与举报审核', accountCount: 5, permissions: ['content', 'report'] },
  { id: 3, roleName: '运营专员', desc: '活动、圈子、推送管理', accountCount: 8, permissions: ['activity', 'circle', 'push'] },
  { id: 4, roleName: '企业合作方', desc: '仅可查看本企业用户与活动', accountCount: 12, permissions: ['user_view', 'activity_view'] },
];

const ACCOUNTS = [
  { id: 1, username: 'admin', company: '益寿巴渝平台', role: '超级管理员', status: 'active', lastLogin: '2026-03-31 08:30' },
  { id: 2, username: 'auditor01', company: '益寿巴渝平台', role: '内容审核员', status: 'active', lastLogin: '2026-03-30 17:20' },
  { id: 3, username: 'yuelao_op', company: '益寿巴渝平台', role: '运营专员', status: 'active', lastLogin: '2026-03-31 09:10' },
  { id: 4, username: 'partner_yzy', company: '渝中区民政局', role: '企业合作方', status: 'active', lastLogin: '2026-03-28 14:00' },
  { id: 5, username: 'partner_nan', company: '南岸区老龄委', role: '企业合作方', status: 'inactive', lastLogin: '2026-02-15 10:00' },
];

// ─── 登录页 ───────────────────────────────────────────────
const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [loginType, setLoginType] = useState<'account' | 'phone'>('account');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1000);
  };

  return (
    <div className="flex h-screen w-screen">
      {/* 左侧品牌区 */}
      <div className="login-brand-bg hidden md:flex flex-col items-center justify-center w-1/2 text-white p-12">
        <img src="../../prototypes/management/logo.png" alt="logo" className="mb-6 shadow-lg" style={{ maxWidth: '120px', height: 'auto', background: 'white', padding: '12px', borderRadius: '8px' }} />
        <h1 className="text-3xl font-bold mb-2">益寿巴渝</h1>
        <p className="text-lg opacity-90 mb-1">后台管理系统</p>
        <p className="text-sm opacity-70 mt-4 text-center">专为中老年生活服务打造的<br />智慧运营管理中心</p>
      </div>
      {/* 右侧表单区 */}
      <div className="flex flex-1 items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">欢迎登录</h2>
            <p className="text-gray-400 text-sm mt-1">益寿巴渝管理平台</p>
          </div>
          <Tabs activeKey={loginType} onChange={v => setLoginType(v as any)} centered
            items={[
              { key: 'account', label: '账号登录' },
              { key: 'phone', label: '手机号登录' },
            ]}
          />
          <Form layout="vertical" className="mt-4">
            {loginType === 'account' ? (
              <>
                <Form.Item label="账号">
                  <Input prefix={<UserOutlined />} placeholder="请输入账号" size="large" />
                </Form.Item>
                <Form.Item label="密码">
                  <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" size="large" />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item label="手机号">
                  <Input prefix={<PhoneOutlined />} placeholder="请输入手机号" size="large" />
                </Form.Item>
                <Form.Item label="密码">
                  <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" size="large" />
                </Form.Item>
              </>
            )}
            <Form.Item className="mt-2">
              <Button type="primary" size="large" block loading={loading}
                style={{ background: PRIMARY, borderColor: PRIMARY }}
                onClick={handleLogin}>登录</Button>
            </Form.Item>
          </Form>
          <p className="text-center text-gray-400 text-xs mt-4">如需账号请联系平台管理员</p>
        </div>
      </div>
    </div>
  );
};

// ─── Dashboard ──────────────────────────────────────────
const DashboardPage: React.FC = () => {
  const trendChartRef = useRef<HTMLDivElement>(null);
  const userChartRef = useRef<HTMLDivElement>(null);
  const contentChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 趋势图表
    if (trendChartRef.current) {
      const chart = echarts.init(trendChartRef.current);
      const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { data: ['新增用户', '活跃用户', '内容发布'], bottom: 0 },
        grid: { left: 50, right: 30, top: 20, bottom: 50 },
        xAxis: {
          type: 'category',
          data: ['3/25', '3/26', '3/27', '3/28', '3/29', '3/30', '3/31'],
          axisLabel: { fontSize: 11 },
        },
        yAxis: { type: 'value', axisLabel: { fontSize: 11 } },
        series: [
          {
            name: '新增用户',
            type: 'bar',
            data: [156, 189, 178, 203, 198, 215, 234],
            itemStyle: { color: PRIMARY },
          },
          {
            name: '活跃用户',
            type: 'line',
            smooth: true,
            data: [7823, 8156, 8234, 8567, 8789, 8923, 8921],
            itemStyle: { color: '#52c41a' },
          },
          {
            name: '内容发布',
            type: 'line',
            smooth: true,
            data: [423, 456, 489, 512, 534, 567, 589],
            itemStyle: { color: '#1677ff' },
          },
        ],
      };
      chart.setOption(option);
      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, []);

  useEffect(() => {
    // 用户分布饼图
    if (userChartRef.current) {
      const chart = echarts.init(userChartRef.current);
      const option = {
        tooltip: { trigger: 'item', formatter: '{b}: {c}人 ({d}%)' },
        legend: { orient: 'vertical', right: 10, top: 'center', textStyle: { fontSize: 11 } },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['35%', '50%'],
            data: [
              { value: 38567, name: '渝中区', itemStyle: { color: PRIMARY } },
              { value: 32145, name: '南岸区', itemStyle: { color: '#52c41a' } },
              { value: 28934, name: '江北区', itemStyle: { color: '#1677ff' } },
              { value: 18456, name: '沙坪坝区', itemStyle: { color: '#722ed1' } },
              { value: 10354, name: '其他区域', itemStyle: { color: '#13c2c2' } },
            ],
            label: { fontSize: 11 },
          },
        ],
      };
      chart.setOption(option);
      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, []);

  useEffect(() => {
    // 内容类型柱状图
    if (contentChartRef.current) {
      const chart = echarts.init(contentChartRef.current);
      const option = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: 60, right: 20, top: 20, bottom: 30 },
        xAxis: {
          type: 'value',
          axisLabel: { fontSize: 11 },
        },
        yAxis: {
          type: 'category',
          data: ['视频', '图文', '活动', '圈子帖子'],
          axisLabel: { fontSize: 11 },
        },
        series: [
          {
            type: 'bar',
            data: [
              { value: 89234, itemStyle: { color: PRIMARY } },
              { value: 156789, itemStyle: { color: '#52c41a' } },
              { value: 45678, itemStyle: { color: '#1677ff' } },
              { value: 50407, itemStyle: { color: '#722ed1' } },
            ],
            label: { show: true, position: 'right', fontSize: 11 },
          },
        ],
      };
      chart.setOption(option);
      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, []);

  return (
    <div>
      {/* 页面标题 */}
      <div className="mb-6">
        <Title level={4} style={{ margin: 0 }}>数据概览</Title>
        <Text type="secondary">实时数据统计 · 更新时间：2026-03-31 14:30</Text>
      </div>

      {/* 核心指标卡片 */}
      <div className="mb-4">
        <Text strong style={{ fontSize: 15, color: '#262626' }}>核心指标</Text>
        <Text type="secondary" style={{ fontSize: 13, marginLeft: 8 }}>平台整体运营数据</Text>
      </div>
      <Row gutter={[16, 16]} className="mb-6">
        {[
          { title: '用户总量', value: 128456, suffix: '人', trend: '+234', trendUp: true, icon: <UserOutlined />, color: PRIMARY, desc: '较昨日新增' },
          { title: '今日活跃', value: 8921, suffix: '人', trend: '6.9%', trendUp: true, icon: <RiseOutlined />, color: '#52c41a', desc: '活跃率' },
          { title: '内容总量', value: 342108, suffix: '篇', trend: '+589', trendUp: true, icon: <FileTextOutlined />, color: '#1677ff', desc: '较昨日新增' },
          { title: '服务订单', value: 1204, suffix: '单', trend: '+96', trendUp: true, icon: <ShoppingOutlined />, color: '#722ed1', desc: '较昨日新增' },
          { title: '活跃圈子', value: 36, suffix: '个', trend: '100%', trendUp: true, icon: <AppstoreOutlined />, color: '#13c2c2', desc: '圈子活跃率' },
        ].map(item => (
          <Col xs={24} sm={12} lg={8} xl={24/5*1} key={item.title}>
            <Card className="kpi-card" style={{ height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <Text type="secondary" style={{ fontSize: 13 }}>{item.title}</Text>
                  <div style={{ marginTop: 8 }}>
                    <Statistic value={item.value} suffix={item.suffix}
                      valueStyle={{ color: item.color, fontSize: 26, fontWeight: 600, lineHeight: 1 }} />
                  </div>
                </div>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${item.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  color: item.color
                }}>
                  {item.icon}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid #f0f0f0' }}>
                <Text style={{ fontSize: 12, color: '#8c8c8c' }}>{item.desc}</Text>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {item.trendUp ? <RiseOutlined style={{ color: '#52c41a', fontSize: 12 }} /> : <FallOutlined style={{ color: '#ff4d4f', fontSize: 12 }} />}
                  <Text style={{ color: item.trendUp ? '#52c41a' : '#ff4d4f', fontSize: 12, fontWeight: 600 }}>
                    {item.trend}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 趋势分析 */}
      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ fontSize: 15, color: '#262626' }}>趋势分析</Text>
        <Text type="secondary" style={{ fontSize: 13, marginLeft: 8 }}>近7日数据变化趋势</Text>
      </div>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card title="用户与内容增长趋势" className="kpi-card" extra={<Text type="secondary" style={{ fontSize: 12 }}>近7日</Text>} style={{ height: '100%' }}>
            <div ref={trendChartRef} style={{ height: 280, width: '100%' }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="用户区域分布" className="kpi-card" extra={<Text type="secondary" style={{ fontSize: 12 }}>总计 128,456人</Text>} style={{ height: '100%' }}>
            <div ref={userChartRef} style={{ height: 280, width: '100%' }} />
          </Card>
        </Col>
      </Row>

      {/* 业务数据 */}
      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ fontSize: 15, color: '#262626' }}>业务数据</Text>
        <Text type="secondary" style={{ fontSize: 13, marginLeft: 8 }}>各业务模块详细数据</Text>
      </div>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="内容类型分布" className="kpi-card" extra={<Text type="secondary" style={{ fontSize: 12 }}>总计 342,108篇</Text>} style={{ height: '100%' }}>
            <div ref={contentChartRef} style={{ height: 280, width: '100%' }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="待处理事项" className="kpi-card" extra={<Button type="link" size="small" style={{ color: PRIMARY }}>查看全部</Button>} style={{ height: '100%' }}>
            <div style={{ padding: '8px 0' }}>
              {[
                { label: '内容待审核', value: 12, color: '#faad14', icon: <FileTextOutlined /> },
                { label: '举报待处理', value: 3, color: '#ff4d4f', icon: <WarningOutlined /> },
                { label: '圈子活动待审', value: 5, color: '#1677ff', icon: <CalendarOutlined /> },
                { label: '服务订单待处理', value: 8, color: '#722ed1', icon: <ShoppingOutlined /> },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 12,
                  marginBottom: 8,
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: '#fafafa',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.2s'
                }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.background = `${item.color}08`;
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.borderColor = '#f0f0f0';
                    e.currentTarget.style.background = '#fafafa';
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ fontSize: 18, color: item.color }}>{item.icon}</div>
                    <Text style={{ fontSize: 14 }}>{item.label}</Text>
                  </div>
                  <div style={{
                    background: item.color,
                    color: '#fff',
                    padding: '2px 12px',
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: 600
                  }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* 数据表格 */}
      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ fontSize: 15, color: '#262626' }}>实时动态</Text>
        <Text type="secondary" style={{ fontSize: 13, marginLeft: 8 }}>最新用户注册与内容发布</Text>
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="最新注册用户" className="kpi-card" extra={<Text type="secondary" style={{ fontSize: 12 }}>最近10条</Text>} style={{ height: '100%' }}>
            <Table
              size="small"
              pagination={false}
              dataSource={[
                { id: 1, name: '张大爷', region: '渝中区', time: '14:28' },
                { id: 2, name: '李奶奶', region: '南岸区', time: '14:15' },
                { id: 3, name: '王阿姨', region: '江北区', time: '14:02' },
                { id: 4, name: '赵师傅', region: '渝中区', time: '13:56' },
                { id: 5, name: '孙老师', region: '沙坪坝区', time: '13:42' },
              ]}
              columns={[
                { title: '用户', dataIndex: 'name', width: 100 },
                { title: '所在区域', dataIndex: 'region', width: 100 },
                { title: '注册时间', dataIndex: 'time', render: (v: string) => <Text type="secondary" style={{ fontSize: 12 }}>{v}</Text> },
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="最新发布内容" className="kpi-card" extra={<Text type="secondary" style={{ fontSize: 12 }}>最近10条</Text>} style={{ height: '100%' }}>
            <Table
              size="small"
              pagination={false}
              dataSource={[
                { id: 1, title: '晨练太极拳教学', type: '视频', author: '马师傅', time: '14:25' },
                { id: 2, title: '社区活动照片分享', type: '图文', author: '周大爷', time: '14:18' },
                { id: 3, title: '养生茶饮制作方法', type: '图文', author: '郑阿姨', time: '14:05' },
                { id: 4, title: '书法入门教学', type: '视频', author: '孙老师', time: '13:52' },
                { id: 5, title: '手工编织教程', type: '图文', author: '吴奶奶', time: '13:38' },
              ]}
              columns={[
                { title: '内容标题', dataIndex: 'title', ellipsis: true },
                { title: '类型', dataIndex: 'type', width: 60, render: (v: string) => <Tag color={v==='视频'?'orange':'blue'}>{v}</Tag> },
                { title: '作者', dataIndex: 'author', width: 80 },
                { title: '时间', dataIndex: 'time', width: 60, render: (v: string) => <Text type="secondary" style={{ fontSize: 12 }}>{v}</Text> },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// ─── 用户管理 ────────────────────────────────────────────
const UserPage: React.FC<{ selectedUser?: any; setSelectedUser?: (user: any) => void }> = ({ selectedUser: externalSelectedUser, setSelectedUser: externalSetSelectedUser }) => {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // 如果外部传入了 selectedUser，切换到详情视图
  useEffect(() => {
    if (externalSelectedUser) {
      setSelectedUser(externalSelectedUser);
      setViewMode('detail');
      if (externalSetSelectedUser) {
        externalSetSelectedUser(null); // 清除外部状态
      }
    }
  }, [externalSelectedUser, externalSetSelectedUser]);
  const [detailTab, setDetailTab] = useState('info');

  // 筛选条件
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<any>(null);

  // 批量操作
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Modal 状态
  const [resetPwdModal, setResetPwdModal] = useState(false);
  const [resetTarget, setResetTarget] = useState<any>(null);
  const [postDetailModal, setPostDetailModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [grantPointsModal, setGrantPointsModal] = useState(false);

  // 作品筛选状态
  const [postTypeFilter, setPostTypeFilter] = useState<string>('all');
  const [postStatusFilter, setPostStatusFilter] = useState<string>('all');
  const [postSearch, setPostSearch] = useState('');

  // 筛选逻辑
  const filtered = USERS.filter(u => {
    if (search && !(u.nickname.includes(search) || u.phone.includes(search) || String(u.id).includes(search))) return false;
    if (statusFilter !== 'all' && u.status !== statusFilter) return false;
    if (genderFilter !== 'all' && u.gender !== genderFilter) return false;
    if (regionFilter !== 'all' && !u.region.includes(regionFilter)) return false;
    if (dateRange && dateRange.length === 2) {
      const regDate = new Date(u.registerDate).getTime();
      if (regDate < dateRange[0].valueOf() || regDate > dateRange[1].valueOf()) return false;
    }
    return true;
  });

  const openDetail = (user: any, tab = 'info') => {
    setSelectedUser(user);
    setDetailTab(tab);
    setViewMode('detail');
  };

  const backToList = () => {
    setViewMode('list');
    setSelectedUser(null);
  };

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setGenderFilter('all');
    setRegionFilter('all');
    setDateRange(null);
  };

  // ── 列表视图 ──
  if (viewMode === 'list') {
    const columns = [
      { title: 'ID', dataIndex: 'id', width: 60 },
      { title: '昵称', dataIndex: 'nickname', width: 100 },
      { title: '手机号', dataIndex: 'phone', width: 120 },
      { title: '性别', dataIndex: 'gender', width: 60, render: (v: string) =>
        v === 'male' ? <ManOutlined style={{ color: '#1677ff' }} /> : <WomanOutlined style={{ color: '#eb2f96' }} /> },
      { title: '年龄', dataIndex: 'age', width: 60 },
      { title: '地区', dataIndex: 'region', width: 140 },
      { title: '注册日期', dataIndex: 'registerDate', width: 100 },
      { title: '动态数', dataIndex: 'postCount', width: 80 },
      { title: '粉丝数', dataIndex: 'followers', width: 80 },
      { title: '积分', dataIndex: 'points', width: 80 },
      { title: '最后登录', dataIndex: 'lastLogin', width: 140 },
      { title: '状态', dataIndex: 'status', width: 80, render: (v: string) =>
        <Tag color={v === 'active' ? 'success' : 'error'}>{v === 'active' ? '正常' : '已封禁'}</Tag> },
      { title: '操作', width: 200, fixed: 'right' as const, render: (_: any, row: any) => (
        <Space size="small">
          <Button size="small" type="link" icon={<EyeOutlined />} onClick={() => openDetail(row)}>详情</Button>
          <Button size="small" type="link" icon={<BookOutlined />} onClick={() => openDetail(row, 'posts')}>作品</Button>
          <Popconfirm title={row.status === 'active' ? '确认封禁该用户？' : '确认解封该用户？'}
            okText="确认" cancelText="取消">
            <Button size="small" type="link" danger={row.status === 'active'}>
              {row.status === 'active' ? '封禁' : '解封'}
            </Button>
          </Popconfirm>
        </Space>
      )},
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
    };

    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <Title level={4} style={{ margin: 0 }}>用户管理</Title>
        </div>

        {/* 统计卡片 */}
        <Row gutter={16} className="mb-4">
          <Col span={4}>
            <Card size="small">
              <Statistic
                title="用户总数"
                value={USERS.length}
                prefix={<TeamOutlined style={{ color: PRIMARY }} />}
                valueStyle={{ color: PRIMARY, fontSize: 22 }}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card size="small">
              <Statistic
                title="正常用户"
                value={USERS.filter(u => u.status === 'active').length}
                prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#52c41a', fontSize: 22 }}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card size="small">
              <Statistic
                title="已封禁"
                value={USERS.filter(u => u.status === 'banned').length}
                prefix={<StopOutlined style={{ color: '#ff4d4f' }} />}
                valueStyle={{ color: '#ff4d4f', fontSize: 22 }}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card size="small">
              <Statistic
                title="今日活跃"
                value={Math.floor(USERS.length * 0.6)}
                prefix={<FireOutlined style={{ color: '#fa8c16' }} />}
                valueStyle={{ color: '#fa8c16', fontSize: 22 }}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card size="small">
              <Statistic
                title="本周新增"
                value={Math.floor(USERS.length * 0.15)}
                prefix={<RiseOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff', fontSize: 22 }}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card size="small">
              <Statistic
                title="总动态数"
                value={USERS.reduce((sum, u) => sum + u.postCount, 0)}
                prefix={<FileTextOutlined style={{ color: '#722ed1' }} />}
                valueStyle={{ color: '#722ed1', fontSize: 22 }}
              />
            </Card>
          </Col>
        </Row>

        {/* 表格 */}
        <Card className="page-card" style={{ padding: 16 }}>
          <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Input
              placeholder="搜索昵称/手机号/ID"
              prefix={<SearchOutlined />}
              value={search}
              onChange={e => setSearch(e.target.value)}
              allowClear
              style={{ width: 200 }}
            />
            <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 120 }}>
              <Select.Option value="all">全部状态</Select.Option>
              <Select.Option value="active">正常</Select.Option>
              <Select.Option value="banned">已封禁</Select.Option>
            </Select>
            <Select value={genderFilter} onChange={setGenderFilter} style={{ width: 120 }}>
              <Select.Option value="all">全部性别</Select.Option>
              <Select.Option value="male">男</Select.Option>
              <Select.Option value="female">女</Select.Option>
            </Select>
            <Select value={regionFilter} onChange={setRegionFilter} style={{ width: 140 }}>
              <Select.Option value="all">全部地区</Select.Option>
              <Select.Option value="渝中区">渝中区</Select.Option>
              <Select.Option value="南岸区">南岸区</Select.Option>
              <Select.Option value="江北区">江北区</Select.Option>
              <Select.Option value="沙坪坝区">沙坪坝区</Select.Option>
              <Select.Option value="九龙坡区">九龙坡区</Select.Option>
              <Select.Option value="渝北区">渝北区</Select.Option>
            </Select>
            <DatePicker.RangePicker
              value={dateRange}
              onChange={setDateRange}
              placeholder={['注册开始', '注册结束']}
              style={{ width: 280 }}
            />
            <Button icon={<ReloadOutlined />} onClick={resetFilters}>重置</Button>
            <span style={{ marginLeft: 'auto', color: '#999', fontSize: 14 }}>共 {filtered.length} 条结果</span>
          </div>
          <Table
            dataSource={filtered}
            columns={columns}
            rowKey="id"
            rowSelection={rowSelection}
            pagination={{ pageSize: 10, showTotal: (t: number) => `共 ${t} 条` }}
            scroll={{ x: 1400 }}
          />
        </Card>

        {/* 批量操作浮动栏 */}
        {selectedRowKeys.length > 0 && (
          <div style={{
            position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            background: '#fff', padding: '12px 24px', borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)', zIndex: 1000,
          }}>
            <Space size="large">
              <Text>已选择 <Text strong style={{ color: PRIMARY }}>{selectedRowKeys.length}</Text> 项</Text>
              <Popconfirm title="确认批量封禁选中用户？" okText="确认" cancelText="取消">
                <Button danger>批量封禁</Button>
              </Popconfirm>
              <Popconfirm title="确认批量解封选中用户？" okText="确认" cancelText="取消">
                <Button>批量解封</Button>
              </Popconfirm>
              <Button onClick={() => setSelectedRowKeys([])}>取消选择</Button>
            </Space>
          </div>
        )}

        {/* 重置密码 Modal */}
        <Modal
          title={`重置密码 — ${resetTarget?.nickname}`}
          open={resetPwdModal}
          onCancel={() => setResetPwdModal(false)}
          width={420}
          footer={
            <Space>
              <Button onClick={() => setResetPwdModal(false)}>取消</Button>
              <Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }}
                onClick={() => setResetPwdModal(false)}>确认重置</Button>
            </Space>
          }
        >
          <div className="text-sm text-gray-500 mb-4">
            将为用户 <Text strong>{resetTarget?.nickname}（{resetTarget?.phone}）</Text> 重置登录密码。
          </div>
          <Form layout="vertical">
            <Form.Item label="新密码" required>
              <Input.Password placeholder="请输入新密码（至少8位）" />
            </Form.Item>
            <Form.Item label="确认新密码" required>
              <Input.Password placeholder="请再次输入新密码" />
            </Form.Item>
          </Form>
          <div className="text-xs text-gray-400 mt-2">重置后用户需使用新密码重新登录，原密码立即失效。</div>
        </Modal>
      </div>
    );
  }

  // ── 详情视图 ──
  if (!selectedUser) return null;

  const userPosts = USER_POSTS[selectedUser.id] || [];
  const userFollows = USER_FOLLOWS[selectedUser.id] || [];
  const userFans = USER_FANS[selectedUser.id] || [];
  const userPointsRecords = USER_POINTS_RECORDS[selectedUser.id] || [];
  const userLoginLogs = USER_LOGIN_LOGS[selectedUser.id] || [];
  const userBanLogs = USER_BAN_LOGS[selectedUser.id] || [];

  const postStatusMap: Record<string, { color: string; label: string }> = {
    approved: { color: 'success', label: '已通过' },
    rejected: { color: 'error', label: '已拒绝' },
    pending: { color: 'warning', label: '待审核' },
  };

  const pointTypeMap: Record<string, { color: string; label: string }> = {
    earn: { color: 'success', label: '获得' },
    spend: { color: 'error', label: '消耗' },
    admin: { color: 'processing', label: '手动发放' },
  };

  const filteredPosts = userPosts.filter(p => {
    if (postTypeFilter !== 'all' && p.type !== postTypeFilter) return false;
    if (postStatusFilter !== 'all' && p.status !== postStatusFilter) return false;
    if (postSearch && !p.title.includes(postSearch)) return false;
    return true;
  });

  const postStats = {
    total: userPosts.length,
    image: userPosts.filter(p => p.type === 'image').length,
    video: userPosts.filter(p => p.type === 'video').length,
    pending: userPosts.filter(p => p.status === 'pending').length,
  };

  return (
    <div>
      {/* 顶部导航 */}
      <div className="flex items-center gap-3 mb-4">
        <Button icon={<ArrowLeftOutlined />} onClick={backToList}>返回</Button>
        <Breadcrumb items={[
          { title: '用户管理' },
          { title: selectedUser.nickname },
        ]} />
      </div>

      {/* 用户信息头部卡片 */}
      <Card className="mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar size={80} style={{ background: PRIMARY, fontSize: 32 }}>
              {selectedUser.nickname[0]}
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Text strong style={{ fontSize: 20 }}>{selectedUser.nickname}</Text>
                <Tag color={selectedUser.status === 'active' ? 'success' : 'error'}>
                  {selectedUser.status === 'active' ? '正常' : '已封禁'}
                </Tag>
              </div>
              <div className="text-gray-500 mb-1">{selectedUser.phone}</div>
              <Space size="large" className="text-sm text-gray-500">
                <span>{selectedUser.gender === 'male' ? <ManOutlined /> : <WomanOutlined />} {selectedUser.age}岁</span>
                <span><EnvironmentOutlined /> {selectedUser.region}</span>
                <span><ClockCircleOutlined /> 注册于 {selectedUser.registerDate}</span>
              </Space>
            </div>
          </div>
          <Space>
            <Button icon={<LockOutlined />} onClick={() => { setResetTarget(selectedUser); setResetPwdModal(true); }}>
              重置密码
            </Button>
            <Popconfirm title={selectedUser.status === 'active' ? '确认封禁该用户？' : '确认解封该用户？'}
              okText="确认" cancelText="取消">
              <Button danger={selectedUser.status === 'active'} icon={<StopOutlined />}>
                {selectedUser.status === 'active' ? '封禁用户' : '解封用户'}
              </Button>
            </Popconfirm>
          </Space>
        </div>

        {/* KPI 数字 */}
        <Divider />
        <Row gutter={24}>
          {[
            { label: '动态数', value: selectedUser.postCount, color: PRIMARY },
            { label: '粉丝数', value: selectedUser.followers, color: '#52c41a' },
            { label: '关注数', value: selectedUser.following, color: '#722ed1' },
            { label: '互关', value: Math.floor(selectedUser.followers * 0.3), color: '#fa8c16' },
            { label: '获赞数', value: Math.floor(selectedUser.postCount * 15), color: '#eb2f96' },
            { label: '收藏', value: Math.floor(selectedUser.postCount * 8), color: '#13c2c2' },
            { label: '积分', value: selectedUser.points, color: '#1677ff' },
            { label: '勋章', value: Math.floor(selectedUser.points / 500), color: '#faad14' },
            { label: '注册天数', value: Math.floor((new Date('2026-04-06').getTime() - new Date(selectedUser.registerDate).getTime()) / 86400000), color: '#9254de' },
          ].map(s => (
            <Col span={24/9} key={s.label}>
              <Statistic title={s.label} value={s.value}
                valueStyle={{ color: s.color, fontSize: 22, fontWeight: 700 }} />
            </Col>
          ))}
        </Row>
      </Card>

      {/* 6个 Tab 详情 */}
      <Card className="page-card" style={{ padding: 0 }}>
        <Tabs activeKey={detailTab} onChange={setDetailTab} style={{ padding: '0 16px' }}
          items={[
            { key: 'info', label: '基本信息' },
            { key: 'posts', label: `作品管理 (${userPosts.length})` },
            { key: 'social', label: '社交关系' },
            { key: 'points', label: '积分记录' },
            { key: 'logs', label: '登录日志' },
            { key: 'bans', label: '封禁记录' },
          ]}
        />
        <div style={{ padding: '0 16px 16px' }}>
          {/* Tab 1: 基本信息 */}
          {detailTab === 'info' && (
            <div>
              <Title level={5}>账号信息</Title>
              <Row gutter={[16, 16]} className="mb-4">
                <Col span={8}><Text type="secondary">用户ID</Text><br /><Text>{selectedUser.id}</Text></Col>
                <Col span={8}><Text type="secondary">手机号</Text><br /><Text>{selectedUser.phone}</Text></Col>
                <Col span={8}><Text type="secondary">注册日期</Text><br /><Text>{selectedUser.registerDate}</Text></Col>
                <Col span={8}><Text type="secondary">最后登录</Text><br /><Text>{selectedUser.lastLogin}</Text></Col>
                <Col span={8}><Text type="secondary">登录设备</Text><br /><Text>{selectedUser.device}</Text></Col>
              </Row>

              <Title level={5}>个人资料</Title>
              <Row gutter={[16, 16]} className="mb-4">
                <Col span={8}><Text type="secondary">昵称</Text><br /><Text>{selectedUser.nickname}</Text></Col>
                <Col span={8}><Text type="secondary">性别</Text><br /><Text>{selectedUser.gender === 'male' ? '男' : '女'}</Text></Col>
                <Col span={8}><Text type="secondary">年龄</Text><br /><Text>{selectedUser.age}岁</Text></Col>
                <Col span={8}><Text type="secondary">地区</Text><br /><Text>{selectedUser.region}</Text></Col>
              </Row>

              <Title level={5}>第三方授权</Title>
              <div className="space-y-2">
                {[
                  { label: '微信登录', bound: selectedUser.auths?.wechat },
                  { label: '支付宝登录', bound: selectedUser.auths?.alipay },
                  { label: 'QQ 登录', bound: selectedUser.auths?.qq },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <Text>{item.label}</Text>
                    <Space>
                      <Tag color={item.bound ? 'success' : 'default'}>{item.bound ? '已绑定' : '未绑定'}</Tag>
                      {item.bound && <Button size="small" danger>解绑</Button>}
                    </Space>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: 作品管理 */}
          {detailTab === 'posts' && (
            <div>
              {/* 统计摘要 */}
              <Row gutter={16} className="mb-4">
                <Col span={6}>
                  <Card size="small">
                    <Statistic title="总作品数" value={postStats.total} suffix="篇" valueStyle={{ color: PRIMARY }} />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic title="图文" value={postStats.image} suffix="篇" valueStyle={{ color: '#1677ff' }} />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic title="视频" value={postStats.video} suffix="个" valueStyle={{ color: '#722ed1' }} />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card size="small">
                    <Statistic title="待审核" value={postStats.pending} suffix="篇" valueStyle={{ color: '#faad14' }} />
                  </Card>
                </Col>
              </Row>

              {/* 筛选栏 */}
              <div className="flex gap-3 mb-3">
                <Select value={postTypeFilter} onChange={setPostTypeFilter} style={{ width: 120 }}>
                  <Select.Option value="all">全部类型</Select.Option>
                  <Select.Option value="image">图文</Select.Option>
                  <Select.Option value="video">视频</Select.Option>
                </Select>
                <Select value={postStatusFilter} onChange={setPostStatusFilter} style={{ width: 120 }}>
                  <Select.Option value="all">全部状态</Select.Option>
                  <Select.Option value="approved">已通过</Select.Option>
                  <Select.Option value="pending">待审核</Select.Option>
                  <Select.Option value="rejected">已拒绝</Select.Option>
                </Select>
                <Input.Search
                  placeholder="搜索作品标题"
                  value={postSearch}
                  onChange={e => setPostSearch(e.target.value)}
                  style={{ width: 240 }}
                  allowClear
                />
              </div>

              {/* 作品卡片列表 */}
              <div className="space-y-3">
                {filteredPosts.map(post => (
                  <Card key={post.id} size="small" hoverable>
                    <div className="flex gap-4">
                      {/* 封面占位 */}
                      <div style={{
                        width: 120, height: 90, background: '#f0f0f0', borderRadius: 6,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#999', flexShrink: 0,
                      }}>
                        {post.type === 'video' ? <VideoCameraOutlined style={{ fontSize: 32 }} /> : <FileImageOutlined style={{ fontSize: 32 }} />}
                      </div>

                      {/* 内容 */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Space>
                              <Text strong style={{ fontSize: 15 }}>{post.title}</Text>
                              <Tag color={post.type === 'video' ? 'purple' : 'blue'}>
                                {post.type === 'video' ? '视频' : '图文'}
                              </Tag>
                              <Tag color={postStatusMap[post.status]?.color}>
                                {postStatusMap[post.status]?.label}
                              </Tag>
                            </Space>
                          </div>
                          <Space>
                            <Button size="small" icon={<EyeOutlined />}
                              onClick={() => { setSelectedPost(post); setPostDetailModal(true); }}>
                              查看详情
                            </Button>
                            {post.status === 'approved' && (
                              <Popconfirm title="确认强制下架该作品？" okText="确认" cancelText="取消">
                                <Button size="small" danger>下架</Button>
                              </Popconfirm>
                            )}
                            <Popconfirm title="确认删除该作品？此操作不可恢复" okText="确认" cancelText="取消">
                              <Button size="small" danger icon={<DeleteOutlined />}>删除</Button>
                            </Popconfirm>
                          </Space>
                        </div>
                        <Text type="secondary" className="text-sm" ellipsis>{post.content}</Text>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span><HeartOutlined /> {post.likes}</span>
                          <span><MessageOutlined /> {post.comments}</span>
                          <span><StarOutlined /> {post.favorites}</span>
                          {post.type === 'video' && <span><PlayCircleOutlined /> {post.views} 播放</span>}
                          {post.type === 'video' && post.duration && <span><ClockCircleOutlined /> {post.duration}</span>}
                          <span className="ml-auto">{post.time}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                {filteredPosts.length === 0 && (
                  <div className="text-center py-8 text-gray-400">暂无作品</div>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: 社交关系 */}
          {detailTab === 'social' && (
            <Row gutter={16}>
              <Col span={12}>
                <Card title={`关注列表 (${userFollows.length})`} size="small">
                  <div className="space-y-2" style={{ maxHeight: 400, overflow: 'auto' }}>
                    {userFollows.map(u => (
                      <div key={u.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                        <Space>
                          <Avatar style={{ background: PRIMARY }}>{u.nickname[0]}</Avatar>
                          <div>
                            <div><Text strong>{u.nickname}</Text></div>
                            <div className="text-xs text-gray-400">{u.region} · {u.postCount}篇动态</div>
                          </div>
                        </Space>
                        <Button size="small" type="link" onClick={() => openDetail(USERS.find(user => user.id === u.id)!)}>
                          查看
                        </Button>
                      </div>
                    ))}
                    {userFollows.length === 0 && <div className="text-center py-4 text-gray-400">暂无关注</div>}
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title={`粉丝列表 (${userFans.length})`} size="small">
                  <div className="space-y-2" style={{ maxHeight: 400, overflow: 'auto' }}>
                    {userFans.map(u => (
                      <div key={u.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                        <Space>
                          <Avatar style={{ background: PRIMARY }}>{u.nickname[0]}</Avatar>
                          <div>
                            <div><Text strong>{u.nickname}</Text></div>
                            <div className="text-xs text-gray-400">{u.region} · {u.postCount}篇动态</div>
                          </div>
                        </Space>
                        <Button size="small" type="link" onClick={() => openDetail(USERS.find(user => user.id === u.id)!)}>
                          查看
                        </Button>
                      </div>
                    ))}
                    {userFans.length === 0 && <div className="text-center py-4 text-gray-400">暂无粉丝</div>}
                  </div>
                </Card>
              </Col>
            </Row>
          )}

          {/* Tab 4: 积分记录 */}
          {detailTab === 'points' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <Statistic title="当前积分余额" value={selectedUser.points} suffix="分"
                  valueStyle={{ color: PRIMARY, fontSize: 32, fontWeight: 700 }} />
                <Button type="primary" icon={<PlusOutlined />} style={{ background: PRIMARY, borderColor: PRIMARY }}
                  onClick={() => setGrantPointsModal(true)}>
                  手动发放积分
                </Button>
              </div>
              <Table
                dataSource={userPointsRecords}
                rowKey="id"
                size="small"
                pagination={{ pageSize: 10 }}
                columns={[
                  { title: '时间', dataIndex: 'time', width: 150 },
                  { title: '类型', dataIndex: 'type', width: 100, render: (v: string) =>
                    <Tag color={pointTypeMap[v]?.color}>{pointTypeMap[v]?.label}</Tag> },
                  { title: '积分变动', dataIndex: 'amount', width: 100, render: (v: number, row: any) =>
                    <span style={{ color: row.type === 'spend' ? '#ff4d4f' : '#52c41a', fontWeight: 600 }}>
                      {row.type === 'spend' ? `-${v}` : `+${v}`}
                    </span> },
                  { title: '原因', dataIndex: 'reason' },
                  { title: '余额', dataIndex: 'balance', width: 100 },
                ]}
              />
            </div>
          )}

          {/* Tab 5: 登录日志 */}
          {detailTab === 'logs' && (
            <Table
              dataSource={userLoginLogs}
              rowKey="time"
              size="small"
              pagination={{ pageSize: 10 }}
              columns={[
                { title: '登录时间', dataIndex: 'time' },
                { title: '设备型号', dataIndex: 'device' },
                { title: 'IP地址', dataIndex: 'ip' },
                { title: '登录地点', dataIndex: 'location' },
              ]}
            />
          )}

          {/* Tab 6: 封禁记录 */}
          {detailTab === 'bans' && (
            <div>
              {userBanLogs.length > 0 ? (
                <Timeline
                  items={userBanLogs.map(log => ({
                    color: log.status === 'active' ? 'red' : 'gray',
                    children: (
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <Text strong>{log.time}</Text>
                          <Tag color={log.status === 'active' ? 'error' : 'default'}>
                            {log.status === 'active' ? '封禁中' : '已解封'}
                          </Tag>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>封禁原因：{log.reason}</div>
                          <div>操作人：{log.operator}</div>
                          <div>封禁时长：{log.duration}</div>
                        </div>
                        {log.status === 'active' && (
                          <Popconfirm title="确认解封该用户？" okText="确认" cancelText="取消">
                            <Button size="small" type="primary" className="mt-2">立即解封</Button>
                          </Popconfirm>
                        )}
                      </div>
                    ),
                  }))}
                />
              ) : (
                <div className="text-center py-8 text-gray-400">该用户无封禁记录</div>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* 作品详情 Modal */}
      <Modal
        title="作品详情"
        open={postDetailModal}
        onCancel={() => setPostDetailModal(false)}
        width={720}
        footer={null}
      >
        {selectedPost && (
          <div>
            <div className="mb-4">
              <Space>
                <Tag color={selectedPost.type === 'video' ? 'purple' : 'blue'}>
                  {selectedPost.type === 'video' ? '视频' : '图文'}
                </Tag>
                <Tag color={postStatusMap[selectedPost.status]?.color}>
                  {postStatusMap[selectedPost.status]?.label}
                </Tag>
              </Space>
            </div>
            <Title level={5}>{selectedPost.title}</Title>
            <div className="mb-4 p-4 bg-gray-50 rounded" style={{ minHeight: 200 }}>
              <Text>{selectedPost.content}</Text>
            </div>
            <Row gutter={16}>
              <Col span={6}><Statistic title="点赞" value={selectedPost.likes} /></Col>
              <Col span={6}><Statistic title="评论" value={selectedPost.comments} /></Col>
              <Col span={6}><Statistic title="收藏" value={selectedPost.favorites} /></Col>
              <Col span={6}><Statistic title="浏览" value={selectedPost.views} /></Col>
            </Row>
            <Divider />
            <div className="text-sm text-gray-500">发布时间：{selectedPost.time}</div>
          </div>
        )}
      </Modal>

      {/* 手动发放积分 Modal */}
      <Modal
        title="手动发放积分"
        open={grantPointsModal}
        onCancel={() => setGrantPointsModal(false)}
        width={440}
        footer={
          <Space>
            <Button onClick={() => setGrantPointsModal(false)}>取消</Button>
            <Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }}>确认发放</Button>
          </Space>
        }
      >
        <div className="mb-4">
          <Text>目标用户：<Text strong>{selectedUser.nickname}（{selectedUser.phone}）</Text></Text>
        </div>
        <Form layout="vertical">
          <Form.Item label="发放积分数">
            <Input type="number" placeholder="请输入积分数量" min={1} />
          </Form.Item>
          <Form.Item label="发放原因">
            <Input.TextArea rows={2} placeholder="请输入发放原因，将显示在积分记录中" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 重置密码 Modal */}
      <Modal
        title={`重置密码 — ${resetTarget?.nickname}`}
        open={resetPwdModal}
        onCancel={() => setResetPwdModal(false)}
        width={420}
        footer={
          <Space>
            <Button onClick={() => setResetPwdModal(false)}>取消</Button>
            <Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }}
              onClick={() => setResetPwdModal(false)}>确认重置</Button>
          </Space>
        }
      >
        <div className="text-sm text-gray-500 mb-4">
          将为用户 <Text strong>{resetTarget?.nickname}（{resetTarget?.phone}）</Text> 重置登录密码。
        </div>
        <Form layout="vertical">
          <Form.Item label="新密码" required>
            <Input.Password placeholder="请输入新密码（至少8位）" />
          </Form.Item>
          <Form.Item label="确认新密码" required>
            <Input.Password placeholder="请再次输入新密码" />
          </Form.Item>
        </Form>
        <div className="text-xs text-gray-400 mt-2">重置后用户需使用新密码重新登录，原密码立即失效。</div>
      </Modal>
    </div>
  );
};

// ─── 组织管理 ────────────────────────────────────────────
const OrgPage: React.FC<{ setActivePage?: (page: string) => void; setSelectedUser?: (user: any) => void }> = ({ setActivePage, setSelectedUser }) => {
  const [selectedOrg, setSelectedOrg] = useState<string>('root');
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [currentOrg, setCurrentOrg] = useState<any>(null);
  const [memberDetailModal, setMemberDetailModal] = useState(false);
  const [changeOrgModal, setChangeOrgModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [targetOrgs, setTargetOrgs] = useState<string[]>([]);
  const [showDirectOnly, setShowDirectOnly] = useState(false);

  // 筛选条件
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // 获取组织及其所有下级组织的成员
  const getOrgMembers = (orgKey: string, directOnly: boolean = false): any[] => {
    const directMembers = ORG_MEMBERS[orgKey] || [];

    // 如果只显示直属成员
    if (directOnly) {
      // 对于根组织，需要过滤掉那些同时属于子组织的成员
      if (orgKey === 'root') {
        return directMembers.filter(member => {
          // 检查该成员是否属于任何子组织
          const belongsToSubOrg = Object.keys(ORG_MEMBERS).some(key => {
            if (key === 'root') return false;
            const subMembers = ORG_MEMBERS[key] || [];
            return subMembers.find(m => m.id === member.id);
          });
          return !belongsToSubOrg; // 只返回不属于任何子组织的成员
        });
      }
      // 其他组织直接返回直属成员
      return directMembers;
    }

    // 获取所有下级组织的key
    const getChildOrgKeys = (key: string): string[] => {
      const childKeys: string[] = [];
      Object.keys(ORG_MEMBERS).forEach(k => {
        if (k.startsWith(key + '-') || (key === 'root' && k !== 'root')) {
          childKeys.push(k);
        }
      });
      return childKeys;
    };

    // 如果是root，返回所有成员
    if (orgKey === 'root') {
      return ORG_MEMBERS['root'];
    }

    // 收集当前组织和所有下级组织的成员
    const allMembers: any[] = [...directMembers];
    const childKeys = getChildOrgKeys(orgKey);

    childKeys.forEach(childKey => {
      const childMembers = ORG_MEMBERS[childKey] || [];
      childMembers.forEach(member => {
        // 避免重复添加
        if (!allMembers.find(m => m.id === member.id)) {
          allMembers.push(member);
        }
      });
    });

    return allMembers;
  };

  // 获取成员所属的所有组织名称
  const getMemberOrgs = (memberId: number): string => {
    const orgNames: string[] = [];
    const orgMap: Record<string, string> = {
      'root': '益寿巴渝平台',
      'org1': '渝中区老年大学',
      'org1-1': '书法班',
      'org1-2': '太极班',
      'org2': '南岸区夕阳红协会',
      'org2-1': '广场舞队',
      'org3': '江北区长者中心',
    };

    Object.keys(ORG_MEMBERS).forEach(orgKey => {
      const members = ORG_MEMBERS[orgKey] || [];
      if (members.find(m => m.id === memberId)) {
        orgNames.push(orgMap[orgKey] || orgKey);
      }
    });

    // 如果只在 root 组织中，显示"益寿巴渝平台"
    if (orgNames.length === 1 && orgNames[0] === '益寿巴渝平台') {
      return '益寿巴渝平台';
    }

    // 过滤掉 root，只显示具体的子组织
    const filteredOrgs = orgNames.filter(name => name !== '益寿巴渝平台');
    return filteredOrgs.length > 0 ? filteredOrgs.join('、') : '益寿巴渝平台';
  };

  const members = getOrgMembers(selectedOrg, showDirectOnly);

  // 筛选成员
  const filteredMembers = members.filter(member => {
    // 搜索筛选：昵称或手机号
    if (searchText && !(member.name.includes(searchText) || member.phone.includes(searchText))) {
      return false;
    }
    // 状态筛选
    if (statusFilter !== 'all' && member.status !== statusFilter) {
      return false;
    }
    return true;
  });

  // 组织穿梭框数据源
  const orgTransferData = [
    { key: 'root', title: '益寿巴渝平台' },
    { key: 'org1', title: '渝中区老年大学' },
    { key: 'org1-1', title: '渝中区老年大学 / 书法班' },
    { key: 'org1-2', title: '渝中区老年大学 / 太极班' },
    { key: 'org2', title: '南岸区夕阳红协会' },
    { key: 'org2-1', title: '南岸区夕阳红协会 / 广场舞队' },
    { key: 'org3', title: '江北区长者中心' },
  ];

  const handleEdit = (org: any) => {
    setCurrentOrg(org);
    setEditModal(true);
  };

  const handleDelete = (orgKey: string) => {
    message.success('组织已删除');
  };

  const handleAddChild = (org: any) => {
    setCurrentOrg(org);
    setAddModal(true);
  };

  const handleMemberDetail = (member: any) => {
    if (setActivePage && setSelectedUser) {
      // 尝试从 USERS 中找到对应的完整用户数据
      const fullUser = USERS.find(u => u.id === member.id);

      if (fullUser) {
        // 如果找到完整用户数据，使用完整数据
        setSelectedUser(fullUser);
      } else {
        // 如果没有找到，创建一个基础用户对象
        const userFromMember = {
          id: member.id,
          nickname: member.name,
          phone: member.phone,
          status: member.status,
          region: '重庆市渝中区',
          registerDate: '2025-01-15',
          postCount: 0,
          points: 0,
          followers: 0,
          following: 0,
          gender: 'male',
          age: 65,
          lastLogin: '2026-04-06 14:30',
          device: 'iPhone 14',
          auths: { wechat: false, alipay: false, qq: false },
        };
        setSelectedUser(userFromMember);
      }
      setActivePage('user');
    }
  };

  const handleChangeOrg = (member: any) => {
    setSelectedMember(member);
    // 模拟当前成员已加入的组织
    setTargetOrgs(['org1', 'org1-1']);
    setChangeOrgModal(true);
  };

  const handleToggleMemberStatus = (member: any) => {
    const isActive = member.status === 'active';
    Modal.confirm({
      title: isActive ? '确认封禁该用户？' : '确认解封该用户？',
      content: `确定要${isActive ? '封禁' : '解封'}"${member.name}"吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => message.success(isActive ? '用户已封禁' : '用户已解封'),
    });
  };

  const handleRemoveMember = (member: any) => {
    Modal.confirm({
      title: '确认移除',
      content: `确定要将"${member.name}"从当前组织移除吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => message.success('成员已移除'),
    });
  };

  const renderTreeTitle = (node: any) => (
    <div className="flex items-center justify-between group" style={{ width: '100%', paddingRight: 8 }}>
      <span className="flex items-center gap-2">
        <span style={{ color: PRIMARY }}>{node.icon}</span>
        <span>{node.title}</span>
      </span>
      <Dropdown
        menu={{
          items: [
            { key: 'edit', label: '编辑', icon: <EditOutlined />, onClick: () => handleEdit(node) },
            { key: 'add', label: '添加下级组织', icon: <PlusOutlined />, onClick: () => handleAddChild(node) },
            { key: 'delete', label: '删除', icon: <DeleteOutlined />, danger: true, onClick: () => {
              Modal.confirm({
                title: '确认删除',
                content: `确定要删除"${node.title}"吗？删除后该组织及其下级组织将被移除。`,
                okText: '确认',
                cancelText: '取消',
                onOk: () => handleDelete(node.key),
              });
            }},
          ],
        }}
        trigger={['click']}
      >
        <MoreOutlined
          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-primary"
          style={{ fontSize: 16, padding: '4px' }}
          onClick={(e) => e.stopPropagation()}
        />
      </Dropdown>
    </div>
  );

  const treeDataWithActions = (nodes: any[]): any[] => {
    return nodes.map(node => ({
      ...node,
      title: renderTreeTitle(node),
      children: node.children ? treeDataWithActions(node.children) : undefined,
    }));
  };

  const memberCols = [
    { title: '昵称', dataIndex: 'name' },
    { title: '角色', dataIndex: 'role' },
    { title: '手机号', dataIndex: 'phone' },
    { title: '组织', render: (_: any, record: any) => {
      const orgs = getMemberOrgs(record.id);
      return (
        <Tooltip title={orgs}>
          <span style={{
            maxWidth: 200,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'inline-block'
          }}>
            {orgs}
          </span>
        </Tooltip>
      );
    }},
    { title: '状态', dataIndex: 'status', render: (v: string, record: any) => (
      <Tag
        color={v === 'active' ? 'success' : 'error'}
        style={{ cursor: 'pointer' }}
        onClick={() => handleToggleMemberStatus(record)}
      >
        {v === 'active' ? '正常' : '已封禁'}
      </Tag>
    )},
    { title: '操作', width: 80, render: (_: any, record: any) => (
      <Dropdown
        menu={{
          items: [
            { key: 'detail', label: '详情', icon: <EyeOutlined />, onClick: () => handleMemberDetail(record) },
            { key: 'change', label: '变更组织', icon: <SwapOutlined />, onClick: () => handleChangeOrg(record) },
            { key: 'remove', label: '移除组织', icon: <DeleteOutlined />, danger: true, onClick: () => handleRemoveMember(record) },
          ],
        }}
        trigger={['click']}
      >
        <Button size="small" icon={<MoreOutlined />} />
      </Dropdown>
    )},
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={4} style={{ margin: 0 }}>组织管理</Title>
      </div>

      {/* 统计卡片 */}
      <Row gutter={16} className="mb-4">
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="组织总数"
              value={9}
              prefix={<BankOutlined style={{ color: PRIMARY }} />}
              valueStyle={{ color: PRIMARY, fontSize: 24 }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="成员总数"
              value={8}
              prefix={<TeamOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a', fontSize: 24 }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="管理员数量"
              value={3}
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff', fontSize: 24 }}
            />
          </Card>
        </Col>
      </Row>

      <Card className="page-card" style={{ padding: 0 }}>
        <div className="flex" style={{ minHeight: 480 }}>
          <div className="org-tree-container" style={{ width: 280 }}>
            <div className="text-xs text-gray-400 mb-2 px-1">组织架构</div>
            <Tree
              treeData={treeDataWithActions(ORGS)}
              defaultExpandAll
              selectedKeys={[selectedOrg]}
              onSelect={(keys) => keys[0] && setSelectedOrg(keys[0] as string)}
            />
          </div>
          <div className="flex-1 p-4">
            {/* 筛选条件 */}
            <Card className="mb-3" size="small" style={{ background: '#fafafa' }}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Input
                    placeholder="搜索昵称/手机号"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    allowClear
                  />
                </Col>
                <Col span={6}>
                  <Select value={statusFilter} onChange={setStatusFilter} style={{ width: '100%' }}>
                    <Select.Option value="all">全部状态</Select.Option>
                    <Select.Option value="active">正常</Select.Option>
                    <Select.Option value="banned">已封禁</Select.Option>
                  </Select>
                </Col>
                <Col span={10} className="flex justify-end items-center">
                  <Button icon={<ReloadOutlined />} onClick={() => { setSearchText(''); setStatusFilter('all'); }}>
                    重置
                  </Button>
                </Col>
              </Row>
            </Card>

            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <Text strong>成员列表</Text>
                <Radio.Group value={showDirectOnly} onChange={(e) => setShowDirectOnly(e.target.value)} size="small">
                  <Radio value={false}>全部成员</Radio>
                  <Radio value={true}>仅直属成员</Radio>
                </Radio.Group>
              </div>
              <Space>
                <Button size="small" icon={<PlusOutlined />} onClick={() => { setCurrentOrg(null); setAddModal(true); }}>新增组织</Button>
                <Button size="small" type="primary" icon={<PlusOutlined />}
                  style={{ background: PRIMARY, borderColor: PRIMARY }}>添加成员</Button>
              </Space>
            </div>
            <Table dataSource={filteredMembers} columns={memberCols} rowKey="id"
              pagination={false} size="small" />
          </div>
        </div>
      </Card>

      {/* 编辑组织弹窗 */}
      <Modal
        title="编辑组织"
        open={editModal}
        onCancel={() => setEditModal(false)}
        onOk={() => { message.success('组织信息已更新'); setEditModal(false); }}
        okText="保存"
        cancelText="取消"
      >
        <Form layout="vertical">
          <Form.Item label="组织名称" required>
            <Input placeholder="请输入组织名称" defaultValue={currentOrg?.title} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加下级组织弹窗 */}
      <Modal
        title={currentOrg ? `为"${currentOrg.title}"添加下级组织` : '新增组织'}
        open={addModal}
        onCancel={() => setAddModal(false)}
        onOk={() => { message.success('组织已添加'); setAddModal(false); }}
        okText="添加"
        cancelText="取消"
      >
        <Form layout="vertical">
          <Form.Item label="组织名称" required>
            <Input placeholder="请输入组织名称" />
          </Form.Item>
          <Form.Item label="上级组织">
            <Cascader
              options={[
                { value: 'root', label: '益寿巴渝平台', children: [
                  { value: 'org1', label: '渝中区老年大学', children: [
                    { value: 'org1-1', label: '书法班' },
                    { value: 'org1-2', label: '太极班' },
                  ]},
                  { value: 'org2', label: '南岸区夕阳红协会', children: [
                    { value: 'org2-1', label: '广场舞队' },
                  ]},
                  { value: 'org3', label: '江北区长者中心' },
                ]},
              ]}
              placeholder="请选择上级组织（不选则为顶级组织）"
              changeOnSelect
              defaultValue={currentOrg ? [currentOrg.key] : undefined}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 成员详情弹窗 */}
      <Modal
        title="成员详情"
        open={memberDetailModal}
        onCancel={() => setMemberDetailModal(false)}
        footer={[
          <Button key="close" onClick={() => setMemberDetailModal(false)}>关闭</Button>
        ]}
      >
        {selectedMember && (
          <div>
            <p><strong>姓名：</strong>{selectedMember.name}</p>
            <p><strong>角色：</strong>{selectedMember.role}</p>
            <p><strong>手机号：</strong>{selectedMember.phone}</p>
            <p><strong>状态：</strong>
              <Tag color={selectedMember.status === 'active' ? 'success' : 'error'}>
                {selectedMember.status === 'active' ? '正常' : '已封禁'}
              </Tag>
            </p>
          </div>
        )}
      </Modal>

      {/* 变更组织弹窗 */}
      <Modal
        title="变更组织"
        open={changeOrgModal}
        onCancel={() => setChangeOrgModal(false)}
        onOk={() => { message.success('组织变更成功'); setChangeOrgModal(false); }}
        okText="确认变更"
        cancelText="取消"
        width={700}
      >
        <div className="mb-3">
          <Text>成员：<strong>{selectedMember?.name}</strong></Text>
          <div className="text-xs text-gray-400 mt-1">可以选择多个组织，该成员将同时属于这些组织</div>
        </div>
        <Transfer
          dataSource={orgTransferData}
          titles={['可选组织', '已加入组织']}
          targetKeys={targetOrgs}
          onChange={setTargetOrgs}
          render={item => item.title}
          listStyle={{ width: 280, height: 400 }}
          showSearch
          filterOption={(inputValue, item) => item.title.indexOf(inputValue) !== -1}
          locale={{ itemUnit: '项', itemsUnit: '项' }}
        />
      </Modal>
    </div>
  );
};

// ─── 内容管理 ────────────────────────────────────────────
const ContentPage: React.FC<{
  setActivePage: (page: string) => void;
  setSelectedUser: (user: any) => void;
  mode?: 'review' | 'list'; // review=审核 only pending, list=已审核列表 approved/rejected
}> = ({ setActivePage, setSelectedUser, mode = 'review' }) => {
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [authorSearch, setAuthorSearch] = useState('');
  const [dateRange, setDateRange] = useState<any>(null);
  const [keywordSearch, setKeywordSearch] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [detailModal, setDetailModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectType, setRejectType] = useState('custom');
  const [batchReject, setBatchReject] = useState(false);

  const statusMap: Record<string, {color: string; label: string}> = {
    pending: { color: 'warning', label: '待审核' },
    approved: { color: 'success', label: '已通过' },
    rejected: { color: 'error', label: '已拒绝' },
  };

  // 审核模式：只显示待审核内容；列表模式：显示已审核内容
  const getDefaultStatus = () => {
    if (mode === 'review') return 'pending';
    return 'all';
  };
  const [statusFilter, setStatusFilter] = useState(getDefaultStatus());

  // 当 mode 改变时，重置 statusFilter
  React.useEffect(() => {
    setStatusFilter(getDefaultStatus());
  }, [mode]);

  // 筛选逻辑
  const filteredContents = CONTENTS.filter(c => {
    // 内容类型筛选
    if (typeFilter !== 'all' && c.type !== typeFilter) return false;
    // 审核模式：只显示待审核；列表模式：只显示已审核
    if (mode === 'review') {
      if (c.status !== 'pending') return false;
    } else {
      if (c.status === 'pending') return false;
    }
    // 状态筛选
    if (mode === 'list' && statusFilter !== 'all' && c.status !== statusFilter) return false;
    // 作者筛选
    if (authorSearch && !c.author.includes(authorSearch) && !c.authorId.toString().includes(authorSearch)) return false;
    // 日期筛选
    if (dateRange && dateRange[0] && dateRange[1]) {
      const createTime = new Date(c.createTime);
      if (createTime < dateRange[0] || createTime > dateRange[1]) return false;
    }
    // 关键词筛选
    if (keywordSearch && !c.title.includes(keywordSearch) && !c.content.includes(keywordSearch)) return false;
    return true;
  });

  // 统计数据
  const stats = {
    pending: CONTENTS.filter(c => c.status === 'pending').length,
    todayReviewed: CONTENTS.filter(c => c.reviewedAt && c.reviewedAt.startsWith('2026-04-06')).length,
    todayApproved: CONTENTS.filter(c => c.reviewedAt && c.reviewedAt.startsWith('2026-04-06') && c.status === 'approved').length,
    total: CONTENTS.length,
    approved: CONTENTS.filter(c => c.status === 'approved').length,
    rejected: CONTENTS.filter(c => c.status === 'rejected').length,
  };
  const todayPassRate = stats.todayReviewed > 0 ? ((stats.todayApproved / stats.todayReviewed) * 100).toFixed(1) : '0';

  // 重置筛选
  const resetFilters = () => {
    setStatusFilter(getDefaultStatus());
    setTypeFilter('all');
    setAuthorSearch('');
    setDateRange(null);
    setKeywordSearch('');
  };

  // 查看详情
  const viewDetail = (record: any) => {
    setSelectedContent(record);
    setDetailModal(true);
  };

  // 单条通过
  const handleApprove = (record: any) => {
    message.success('审核通过');
  };

  // 单条拒绝
  const handleReject = (record: any) => {
    setSelectedContent(record);
    setBatchReject(false);
    setRejectModal(true);
  };

  // 批量通过
  const handleBatchApprove = () => {
    message.success(`已批量通过 ${selectedRowKeys.length} 条内容`);
    setSelectedRowKeys([]);
  };

  // 批量拒绝
  const handleBatchReject = () => {
    setBatchReject(true);
    setRejectModal(true);
  };

  // 确认拒绝
  const confirmReject = () => {
    if (!rejectReason || rejectReason.length < 10) {
      message.error('拒绝原因至少需要10个字');
      return;
    }
    if (batchReject) {
      message.success(`已批量拒绝 ${selectedRowKeys.length} 条内容`);
      setSelectedRowKeys([]);
    } else {
      message.success('已拒绝');
    }
    setRejectModal(false);
    setRejectReason('');
    setRejectType('custom');
  };

  const cols = [
    { title: '序号', width: 60, render: (_: any, __: any, index: number) => index + 1 },
    { title: '类型', dataIndex: 'type', width: 80, render: (v: string) =>
      v === 'image' ? <FileImageOutlined style={{ fontSize: 18, color: '#1890ff' }} /> : <PlayCircleOutlined style={{ fontSize: 18, color: '#52c41a' }} />
    },
    { title: '标题', dataIndex: 'title', render: (v: string, row: any) =>
      <a onClick={() => viewDetail(row)} style={{ color: PRIMARY }}>{v}</a>
    },
    { title: '作者', dataIndex: 'author', render: (v: string, row: any) =>
      <a onClick={() => { setActivePage('user'); setSelectedUser(USERS.find(u => u.id === row.authorId)); }} style={{ color: PRIMARY }}>{v}</a>
    },
    { title: '发布时间', dataIndex: 'createTime', width: 150 },
    { title: '互动数据', width: 180, render: (_: any, row: any) => (
      <Space size={16}>
        <span><LikeOutlined /> {row.likes}</span>
        <span><CommentOutlined /> {row.comments}</span>
        <span><EyeOutlined /> {row.views}</span>
      </Space>
    )},
    { title: '状态', dataIndex: 'status', width: 100, render: (v: string) =>
      <Tag color={statusMap[v]?.color}>{statusMap[v]?.label}</Tag> },
    { title: '操作', width: mode === 'review' ? 200 : 80, render: (_: any, row: any) => (
      <Space>
        <Button size="small" icon={<EyeOutlined />} onClick={() => viewDetail(row)}>详情</Button>
        {mode === 'review' && row.status === 'pending' && (
          <>
            <Popconfirm title="确认通过？" onConfirm={() => handleApprove(row)} okText="通过" okButtonProps={{ style: { background: '#52c41a', borderColor: '#52c41a' } }}>
              <Button size="small" style={{ color: '#52c41a', borderColor: '#52c41a' }}>通过</Button>
            </Popconfirm>
            <Button size="small" danger onClick={() => handleReject(row)}>拒绝</Button>
          </>
        )}
      </Space>
    )},
  ];

  return (
    <div>
      <Title level={4} className="mb-4">{mode === 'review' ? '内容审核' : '内容列表'}</Title>

      {/* 统计卡片 */}
      {mode === 'review' ? (
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Card size="small">
            <Statistic title="待审核" value={stats.pending} valueStyle={{ color: PRIMARY }} />
          </Card>
          <Card size="small">
            <Statistic title="今日已审核" value={stats.todayReviewed} />
          </Card>
          <Card size="small">
            <Statistic title="今日通过率" value={todayPassRate} suffix="%" valueStyle={{ color: '#52c41a' }} />
          </Card>
          <Card size="small">
            <Statistic title="累计审核" value={stats.total} />
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Card size="small">
            <Statistic title="已通过" value={stats.approved} valueStyle={{ color: '#52c41a' }} />
          </Card>
          <Card size="small">
            <Statistic title="已拒绝" value={stats.rejected} valueStyle={{ color: '#ff4d4f' }} />
          </Card>
          <Card size="small">
            <Statistic title="总计" value={stats.approved + stats.rejected} />
          </Card>
        </div>
      )}

      <Card className="page-card" style={{ padding: 0 }}>
        {/* 筛选栏 */}
        <div style={{ padding: '16px 16px 0' }}>
          <div className="flex gap-3 mb-3 items-center flex-wrap">
            {mode === 'review' ? (
              // 审核模式：显示类型筛选 + 作者 + 关键词 + 日期
              <>
                <div className="flex items-center gap-2">
                  <Text type="secondary">内容类型:</Text>
                  <Radio.Group value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    <Radio.Button value="all">全部</Radio.Button>
                    <Radio.Button value="image">图文</Radio.Button>
                    <Radio.Button value="video">视频</Radio.Button>
                  </Radio.Group>
                </div>
                <Input placeholder="搜索作者（昵称/ID）" value={authorSearch} onChange={e => setAuthorSearch(e.target.value)}
                  style={{ width: 200 }} prefix={<SearchOutlined />} allowClear />
                <Input placeholder="搜索关键词（标题/内容）" value={keywordSearch} onChange={e => setKeywordSearch(e.target.value)}
                  style={{ width: 240 }} prefix={<SearchOutlined />} allowClear />
                <DatePicker.RangePicker value={dateRange} onChange={setDateRange} placeholder={['开始日期', '结束日期']} style={{ width: 280 }} />
                <Button icon={<ReloadOutlined />} onClick={resetFilters}>重置</Button>
              </>
            ) : (
              // 列表模式：显示类型筛选 + 状态筛选 + 作者 + 关键词 + 日期
              <>
                <div className="flex items-center gap-2">
                  <Text type="secondary">内容类型:</Text>
                  <Radio.Group value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    <Radio.Button value="all">全部</Radio.Button>
                    <Radio.Button value="image">图文</Radio.Button>
                    <Radio.Button value="video">视频</Radio.Button>
                  </Radio.Group>
                </div>
                <div className="flex items-center gap-2">
                  <Text type="secondary">审核状态:</Text>
                  <Radio.Group value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <Radio.Button value="all">全部</Radio.Button>
                    <Radio.Button value="approved">已通过</Radio.Button>
                    <Radio.Button value="rejected">已拒绝</Radio.Button>
                  </Radio.Group>
                </div>
                <Input placeholder="搜索作者（昵称/ID）" value={authorSearch} onChange={e => setAuthorSearch(e.target.value)}
                  style={{ width: 200 }} prefix={<SearchOutlined />} allowClear />
                <Input placeholder="搜索关键词（标题/内容）" value={keywordSearch} onChange={e => setKeywordSearch(e.target.value)}
                  style={{ width: 240 }} prefix={<SearchOutlined />} allowClear />
                <DatePicker.RangePicker value={dateRange} onChange={setDateRange} placeholder={['开始日期', '结束日期']} style={{ width: 280 }} />
                <Button icon={<ReloadOutlined />} onClick={resetFilters}>重置</Button>
              </>
            )}
          </div>
        </div>

        <Table
          dataSource={filteredContents}
          columns={cols}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          size="middle"
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
            getCheckboxProps: (record: any) => ({
              disabled: record.status !== 'pending',
            }),
          }}
        />

        {/* 批量操作浮动栏 - 仅审核模式 */}
        {mode === 'review' && selectedRowKeys.length > 0 && (
          <div style={{
            position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            background: '#fff', padding: '12px 24px', borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)', zIndex: 1000,
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <Text>已选 <Text strong style={{ color: PRIMARY }}>{selectedRowKeys.length}</Text> 项</Text>
            <Popconfirm title={`确认通过 ${selectedRowKeys.length} 条内容？`} onConfirm={handleBatchApprove} okText="确认" okButtonProps={{ style: { background: '#52c41a', borderColor: '#52c41a' } }}>
              <Button type="primary" style={{ background: '#52c41a', borderColor: '#52c41a' }}>批量通过</Button>
            </Popconfirm>
            <Button danger onClick={handleBatchReject}>批量拒绝</Button>
            <Button onClick={() => setSelectedRowKeys([])}>取消选择</Button>
          </div>
        )}
      </Card>

      {/* 内容详情 Modal */}
      <Modal
        title="内容详情"
        open={detailModal}
        onCancel={() => setDetailModal(false)}
        width={720}
        footer={selectedContent?.status === 'pending' ? [
          <Button key="cancel" onClick={() => setDetailModal(false)}>关闭</Button>,
          <Popconfirm key="approve" title="确认通过？" onConfirm={() => { handleApprove(selectedContent); setDetailModal(false); }} okText="通过" okButtonProps={{ style: { background: '#52c41a', borderColor: '#52c41a' } }}>
            <Button type="primary" style={{ background: '#52c41a', borderColor: '#52c41a' }}>通过</Button>
          </Popconfirm>,
          <Button key="reject" danger onClick={() => { setDetailModal(false); handleReject(selectedContent); }}>拒绝</Button>,
        ] : [
          <Button key="close" onClick={() => setDetailModal(false)}>关闭</Button>
        ]}
      >
        {selectedContent && (
          <div>
            <div className="mb-4">
              <Title level={5} className="mb-2">{selectedContent.title}</Title>
              <Space>
                <Tag color={selectedContent.type === 'image' ? 'blue' : 'green'}>
                  {selectedContent.type === 'image' ? '图文' : '视频'}
                </Tag>
                <Tag color={statusMap[selectedContent.status]?.color}>
                  {statusMap[selectedContent.status]?.label}
                </Tag>
              </Space>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <Avatar size={40} style={{ background: PRIMARY }}>{selectedContent.author[0]}</Avatar>
              <div>
                <div><Text strong>{selectedContent.author}</Text></div>
                <Text type="secondary" style={{ fontSize: 12 }}>{selectedContent.createTime}</Text>
              </div>
            </div>

            <div className="mb-4">
              {/* 内容缩略图/视频占位 */}
              {selectedContent.type === 'image' ? (
                <div className="rounded overflow-hidden mb-4" style={{ maxHeight: 200 }}>
                  <img src={selectedContent.thumbnail} alt="缩略图" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <div className="rounded mb-4 flex items-center justify-center relative overflow-hidden" style={{ height: 200, background: '#000' }}>
                  <img src={selectedContent.thumbnail} alt="视频封面" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircleOutlined style={{ fontSize: 64, color: '#fff' }} />
                  </div>
                  {selectedContent.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-white text-sm">
                      {selectedContent.duration}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mb-4 p-4 bg-gray-50 rounded" style={{ minHeight: 80 }}>
              <Text>{selectedContent.content}</Text>
              {selectedContent.type === 'video' && selectedContent.duration && (
                <div className="mt-3">
                  <Tag icon={<PlayCircleOutlined />}>时长: {selectedContent.duration}</Tag>
                </div>
              )}
            </div>

            <div className="flex justify-between gap-2 mb-4">
              <Statistic title="点赞" value={selectedContent.likes} prefix={<LikeOutlined />} />
              <Statistic title="评论" value={selectedContent.comments} prefix={<CommentOutlined />} />
              <Statistic title="收藏" value={selectedContent.favorites} prefix={<StarOutlined />} />
              <Statistic title="分享" value={selectedContent.shares || 0} prefix={<ShareAltOutlined />} />
              <Statistic title="浏览" value={selectedContent.views} prefix={<EyeOutlined />} />
            </div>

            {selectedContent.reviewedAt && (
              <div className="mt-4 p-3 bg-blue-50 rounded">
                <Text strong>审核信息</Text>
                <div className="mt-2">
                  <div><Text type="secondary">审核时间:</Text> {selectedContent.reviewedAt}</div>
                  <div><Text type="secondary">审核员:</Text> {selectedContent.reviewer}</div>
                  {selectedContent.rejectReason && (
                    <div className="mt-2">
                      <Text type="secondary">拒绝原因:</Text>
                      <div className="mt-1 p-2 bg-white rounded">
                        <Text>{selectedContent.rejectReason}</Text>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* 拒绝原因 Modal */}
      <Modal
        title={batchReject ? `批量拒绝 ${selectedRowKeys.length} 条内容` : '拒绝内容'}
        open={rejectModal}
        onCancel={() => { setRejectModal(false); setRejectReason(''); setRejectType('custom'); }}
        onOk={confirmReject}
        okText="确认拒绝"
        okButtonProps={{ danger: true }}
      >
        <div className="mb-4">
          <Text strong>常用原因:</Text>
          <Radio.Group value={rejectType} onChange={e => {
            setRejectType(e.target.value);
            if (e.target.value !== 'custom') {
              const reasons: Record<string, string> = {
                violation: '内容违规：包含违反平台规范的内容',
                sensitive: '涉及敏感信息：包含敏感或不当信息',
                lowquality: '低质量内容：内容质量不符合平台标准',
                fake: '虚假信息：传播未经证实的虚假信息',
              };
              setRejectReason(reasons[e.target.value] || '');
            } else {
              setRejectReason('');
            }
          }} className="mt-2">
            <Radio value="violation">内容违规</Radio>
            <Radio value="sensitive">涉及敏感信息</Radio>
            <Radio value="lowquality">低质量内容</Radio>
            <Radio value="fake">虚假信息</Radio>
            <Radio value="custom">其他（自定义）</Radio>
          </Radio.Group>
        </div>
        <div>
          <Text strong>拒绝原因 <Text type="danger">*</Text></Text>
          <Text type="secondary" style={{ fontSize: 12 }}> （至少10个字）</Text>
          <Input.TextArea
            value={rejectReason}
            onChange={e => setRejectReason(e.target.value)}
            placeholder="请详细说明拒绝原因..."
            rows={4}
            className="mt-2"
            maxLength={200}
            showCount
          />
        </div>
      </Modal>
    </div>
  );
};

// ─── 圈子管理（卡片 + 详情 + 圈子活动合并）────────────────
const CirclePage: React.FC<{ setActivePage?: (page: string) => void; setSelectedUser?: (user: any) => void }> = ({ setActivePage, setSelectedUser }) => {
  const [detail, setDetail] = useState<any>(null); // null = 列表, object = 详情
  const [activityModal, setActivityModal] = useState(false);
  const [detailTab, setDetailTab] = useState('info');

  // 新建/编辑圈子
  const [circleModal, setCircleModal] = useState(false);
  const [editingCircle, setEditingCircle] = useState<any>(null);
  const [circleForm] = Form.useForm();

  // 新增管理员
  const [adminModal, setAdminModal] = useState(false);

  // 列表页筛选
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 活动管理相关
  const [activityForm] = Form.useForm();
  const [activityDetailModal, setActivityDetailModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [activityRejectModal, setActivityRejectModal] = useState(false);
  const [activityRejectReason, setActivityRejectReason] = useState('');

  // 活动筛选条件
  const [activityApprovalFilter, setActivityApprovalFilter] = useState('all');
  const [activityStatusFilter, setActivityStatusFilter] = useState('all');
  const [activityScopeFilter, setActivityScopeFilter] = useState('all');
  const [activityScopeDetailFilter, setActivityScopeDetailFilter] = useState<any>(null);
  const [activityCircleFilter, setActivityCircleFilter] = useState<number | null>(null);
  const [activityKeyword, setActivityKeyword] = useState('');
  const [activityTimeRange, setActivityTimeRange] = useState<any>(null);

  const categoryColor: Record<string, string> = {
    兴趣爱好: 'magenta', 健康养生: 'green', 文化艺术: 'blue', 运动健身: 'orange', 社区服务: 'cyan',
  };

  const activityApprovalStatusMap: Record<string, { color: string; label: string }> = {
    pending: { color: 'warning', label: '待审核' },
    approved: { color: 'success', label: '已通过' },
    rejected: { color: 'error', label: '已拒绝' },
  };

  const activityStatusMap: Record<string, { color: string; label: string }> = {
    upcoming: { color: 'processing', label: '即将开始' },
    ongoing: { color: 'cyan', label: '进行中' },
    ended: { color: 'default', label: '已结束' },
  };

  // 新建/编辑圈子处理
  const handleCircleSubmit = () => {
    circleForm.validateFields().then(values => {
      if (editingCircle) {
        message.success('圈子信息已更新');
      } else {
        message.success('圈子创建成功');
      }
      setCircleModal(false);
      setEditingCircle(null);
      circleForm.resetFields();
    });
  };

  const openCircleModal = (circle?: any) => {
    if (circle) {
      setEditingCircle(circle);
      circleForm.setFieldsValue(circle);
    } else {
      setEditingCircle(null);
      circleForm.resetFields();
    }
    setCircleModal(true);
  };

  // 新增管理员处理
  const handleAddAdmin = () => {
    message.success('管理员添加成功');
    setAdminModal(false);
  };

  // 筛选逻辑
  const filteredCircles = CIRCLES.filter(c => {
    if (categoryFilter !== 'all' && c.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchKeyword && !c.name.includes(searchKeyword) && !c.description.includes(searchKeyword)) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'latest') return new Date(b.createTime).getTime() - new Date(a.createTime).getTime();
    if (sortBy === 'members') return b.memberCount - a.memberCount;
    if (sortBy === 'posts') return b.postCount - a.postCount;
    if (sortBy === 'active') return b.activeToday - a.activeToday;
    return 0;
  });

  const circleActivities = detail
    ? CIRCLE_ACTIVITIES.filter(a => a.circleId === detail.id)
    : CIRCLE_ACTIVITIES;

  const activityCols = [
    { title: '活动名称', dataIndex: 'title', render: (text: string, row: any) => (
      <a style={{ color: PRIMARY }} onClick={() => {
        // 转换圈子活动数据为平台活动格式
        const platformActivity = {
          id: row.id,
          title: row.title,
          startTime: row.startTime,
          endTime: row.endTime,
          location: row.location,
          maxEnroll: row.maxEnroll,
          enrollCount: row.enrollCount,
          description: row.description,
          promotionalImages: row.promotionalImages,
          status: 'published',
          scopeType: 'org',
          scope: `圈子：${CIRCLES.find(c => c.id === row.circleId)?.name || ''}`,
          creator: row.creator,
          createTime: row.createTime,
        };
        (window as any).__selectedActivity = platformActivity;
        setActivePage?.('activity');
      }}>{text}</a>
    )},
    { title: '活动时间', render: (_: any, row: any) => (
      <div style={{ fontSize: 12 }}>
        <div>{row.startTime}</div>
        <div style={{ color: '#999' }}>至 {row.endTime}</div>
      </div>
    )},
    { title: '活动地点', dataIndex: 'location', ellipsis: true },
    { title: '参与范围', render: (_: any, row: any) => {
      const circle = CIRCLES.find(c => c.id === row.circleId);
      return <Tag color="purple">{circle?.name || '未知圈子'}</Tag>;
    }},
    { title: '报名情况', render: (_: any, row: any) => (
      <div style={{ width: 120 }}>
        <div style={{ fontSize: 12, marginBottom: 4 }}>{row.enrollCount} / {row.maxEnroll} 人</div>
        <Progress percent={Math.round((row.enrollCount / row.maxEnroll) * 100)} size="small" strokeColor={PRIMARY} />
      </div>
    )},
    { title: '状态', dataIndex: 'activityStatus', render: (v: string) =>
      <Tag color={activityStatusMap[v]?.color}>{activityStatusMap[v]?.label}</Tag> },
    { title: '操作', width: 120, render: (_: any, row: any) => (
      <Space size="small">
        <Button size="small" type="link" onClick={() => {
          // 转换圈子活动数据为平台活动格式
          const platformActivity = {
            id: row.id,
            title: row.title,
            startTime: row.startTime,
            endTime: row.endTime,
            location: row.location,
            maxEnroll: row.maxEnroll,
            enrollCount: row.enrollCount,
            description: row.description,
            promotionalImages: row.promotionalImages,
            status: 'published',
            scopeType: 'org',
            scope: `圈子：${CIRCLES.find(c => c.id === row.circleId)?.name || ''}`,
            creator: row.creator,
            createTime: row.createTime,
          };
          (window as any).__selectedActivity = platformActivity;
          setActivePage?.('activity');
        }}>详情</Button>
      </Space>
    )},
  ];

  // 成员管理列
  const memberCols = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '用户', render: (_: any, row: any) => (
      <Space>
        <Avatar size={32} style={{ background: PRIMARY }}>{row.userName[0]}</Avatar>
        <span
          style={{ color: PRIMARY, cursor: 'pointer' }}
          onClick={() => {
            if (setActivePage && setSelectedUser) {
              const user = USERS.find(u => u.id === row.userId);
              if (user) {
                setSelectedUser(user);
                setActivePage('user');
              }
            }
          }}
        >
          {row.userName}
        </span>
      </Space>
    )},
    { title: '角色', dataIndex: 'role', render: (v: string) =>
      <Tag color={v === 'admin' ? 'orange' : 'default'}>{v === 'admin' ? '管理员' : '普通成员'}</Tag> },
    { title: '加入时间', dataIndex: 'joinTime' },
    { title: '发帖数', dataIndex: 'postCount' },
    { title: '最后活跃', dataIndex: 'lastActive' },
    { title: '状态', dataIndex: 'status', render: (v: string) =>
      <Tag color={v === 'active' ? 'success' : 'default'}>{v === 'active' ? '活跃' : '沉默'}</Tag> },
    { title: '操作', render: (_: any, row: any) => (
      <Space>
        <Button size="small" onClick={() => {
          if (setActivePage && setSelectedUser) {
            const user = USERS.find(u => u.id === row.userId);
            if (user) {
              setSelectedUser(user);
              setActivePage('user');
            }
          }
        }}>查看详情</Button>
        {row.role === 'member' ? (
          <Popconfirm title="确认设为管理员？">
            <Button size="small" style={{ color: PRIMARY, borderColor: PRIMARY }}>设为管理员</Button>
          </Popconfirm>
        ) : (
          <Popconfirm title="确认移除管理员？">
            <Button size="small" danger>移除管理员</Button>
          </Popconfirm>
        )}
        <Popconfirm title="确认移出圈子？">
          <Button size="small" danger>移出圈子</Button>
        </Popconfirm>
      </Space>
    )},
  ];

  // 帖子管理列
  const postCols = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '类型', dataIndex: 'type', width: 80, render: (v: string) =>
      v === 'image' ? <FileImageOutlined style={{ fontSize: 18, color: '#1677ff' }} /> : <VideoCameraOutlined style={{ fontSize: 18, color: '#722ed1' }} /> },
    { title: '标题', dataIndex: 'title', render: (text: string, row: any) => (
      <span style={{ color: row.isPinned ? PRIMARY : 'inherit', fontWeight: row.isPinned ? 600 : 400 }}>
        {row.isPinned && <Tag color="orange" style={{ marginRight: 4 }}>置顶</Tag>}
        {text}
      </span>
    )},
    { title: '作者', render: (_: any, row: any) => (
      <span
        style={{ color: PRIMARY, cursor: 'pointer' }}
        onClick={() => {
          if (setActivePage && setSelectedUser) {
            const user = USERS.find(u => u.id === row.authorId);
            if (user) {
              setSelectedUser(user);
              setActivePage('user');
            }
          }
        }}
      >
        {row.author}
      </span>
    )},
    { title: '发布时间', dataIndex: 'createTime' },
    { title: '互动数据', render: (_: any, row: any) => (
      <Space size={16}>
        <span><LikeOutlined style={{ color: '#999', marginRight: 4 }} />{row.likes}</span>
        <span><CommentOutlined style={{ color: '#999', marginRight: 4 }} />{row.comments}</span>
        <span><EyeOutlined style={{ color: '#999', marginRight: 4 }} />{row.views}</span>
      </Space>
    )},
    { title: '状态', dataIndex: 'status', render: (v: string) => {
      const map: Record<string, { color: string; label: string }> = {
        normal: { color: 'success', label: '正常' },
        pinned: { color: 'orange', label: '已置顶' },
        deleted: { color: 'error', label: '已删除' },
      };
      return <Tag color={map[v]?.color}>{map[v]?.label}</Tag>;
    }},
    { title: '操作', render: (_: any, row: any) => row.status !== 'deleted' ? (
      <Space>
        <Button size="small">查看详情</Button>
        {row.isPinned ? (
          <Popconfirm title="确认取消置顶？">
            <Button size="small">取消置顶</Button>
          </Popconfirm>
        ) : (
          <Popconfirm title="确认置顶该帖子？">
            <Button size="small" style={{ color: PRIMARY, borderColor: PRIMARY }}>置顶</Button>
          </Popconfirm>
        )}
        <Popconfirm title="确认删除该帖子？">
          <Button size="small" danger>删除</Button>
        </Popconfirm>
      </Space>
    ) : <Text type="secondary">已删除</Text> },
  ];

  // ── 圈子详情页（全页面展示）──
  if (detail) {
    const members = CIRCLE_MEMBERS.filter(m => m.circleId === detail.id);
    const posts = CIRCLE_POSTS.filter(p => p.circleId === detail.id);
    const activities = CIRCLE_ACTIVITIES.filter(a => a.circleId === detail.id);

    const stats = {
      totalMembers: members.length,
      newThisWeek: members.filter(m => {
        const joinDate = new Date(m.joinTime);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return joinDate >= weekAgo;
      }).length,
      activeMembers: members.filter(m => m.status === 'active').length,
      silentMembers: members.filter(m => m.status === 'silent').length,
      totalPosts: posts.length,
      todayPosts: posts.filter(p => p.createTime.startsWith('2026-04-06')).length,
      normalPosts: posts.filter(p => p.status === 'normal' || p.status === 'pinned').length,
      deletedPosts: posts.filter(p => p.status === 'deleted').length,
      totalActivities: activities.length,
      upcomingActivities: activities.filter(a => a.status === 'upcoming').length,
      endedActivities: activities.filter(a => a.status === 'ended').length,
    };

    return (
      <div>
        {/* 顶部导航 */}
        <div className="flex items-center gap-2 mb-4">
          <Button icon={<ArrowLeftOutlined />} onClick={() => setDetail(null)}>返回</Button>
          <Breadcrumb items={[
            { title: '圈子管理' },
            { title: detail.name },
          ]} />
        </div>

        {/* 圈子信息头部卡片 */}
        <Card className="page-card mb-4">
          <div className="flex gap-6">
            {/* 左侧封面 */}
            <div style={{ width: 180, height: 180, background: `${PRIMARY}15`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Avatar size={120} style={{ background: PRIMARY, fontSize: 48 }}>{detail.name[0]}</Avatar>
            </div>
            {/* 右侧信息 */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <Title level={3} style={{ margin: 0, marginBottom: 8 }}>{detail.name}</Title>
                  <Space size={8}>
                    <Tag color={categoryColor[detail.category] ?? 'default'}>{detail.category}</Tag>
                    <Tag color={detail.status === 'normal' ? 'success' : 'error'}>
                      {detail.status === 'normal' ? '正常' : '已禁用'}
                    </Tag>
                    <Tag color="blue">{detail.joinType === 'public' ? '公开' : detail.joinType === 'approval' ? '需审核' : '邀请制'}</Tag>
                  </Space>
                </div>
                <Space>
                  <Button icon={<EditOutlined />} onClick={() => openCircleModal(detail)}>编辑</Button>
                  <Popconfirm title={detail.status === 'disabled' ? '确认启用该圈子？' : '确认禁用该圈子？'} onConfirm={() => message.success(detail.status === 'disabled' ? '圈子已启用' : '圈子已禁用')}>
                    <Button danger={detail.status !== 'disabled'}>
                      {detail.status === 'disabled' ? '启用' : '禁用'}
                    </Button>
                  </Popconfirm>
                </Space>
              </div>
              <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>{detail.description}</Text>
              <div style={{ color: '#999', fontSize: 13, marginBottom: 16 }}>
                创建时间：{detail.createTime} · 创建人：{detail.creator}
              </div>
              {/* KPI 数字 */}
              <Row gutter={24}>
                <Col span={4}>
                  <Statistic title="成员总数" value={detail.memberCount} valueStyle={{ color: PRIMARY, fontSize: 24 }} />
                </Col>
                <Col span={4}>
                  <Statistic title="帖子总数" value={detail.postCount} valueStyle={{ color: '#1677ff', fontSize: 24 }} />
                </Col>
                <Col span={4}>
                  <Statistic title="活动总数" value={detail.activityCount} valueStyle={{ color: '#722ed1', fontSize: 24 }} />
                </Col>
                <Col span={4}>
                  <Statistic title="今日活跃" value={detail.activeToday} valueStyle={{ color: '#52c41a', fontSize: 24 }} />
                </Col>
                <Col span={4}>
                  <Statistic title="本周新增" value={detail.newThisWeek} valueStyle={{ color: '#faad14', fontSize: 24 }} />
                </Col>
              </Row>
            </div>
          </div>
        </Card>

        {/* Tab 详情区 */}
        <Card className="page-card" style={{ padding: 0 }}>
          <Tabs activeKey={detailTab} onChange={setDetailTab} style={{ padding: '0 16px' }}
            items={[
              { key: 'info', label: '基本信息' },
              { key: 'members', label: `成员管理 (${members.length})` },
              { key: 'posts', label: `帖子管理 (${posts.length})` },
              { key: 'activities', label: `活动管理 (${activities.length})` },
              { key: 'stats', label: '数据统计' },
            ]}
          />
          <div style={{ padding: '0 16px 16px' }}>
            {/* 基本信息 Tab */}
            {detailTab === 'info' && (
              <div>
                <Title level={5} className="mb-3">圈子信息</Title>
                <div style={{ background: '#fafafa', padding: 16, borderRadius: 8, marginBottom: 24 }}>
                  <Row gutter={[16, 16]}>
                    <Col span={8}><Text type="secondary">圈子名称：</Text><Text strong>{detail.name}</Text></Col>
                    <Col span={8}><Text type="secondary">分类：</Text><Tag color={categoryColor[detail.category]}>{detail.category}</Tag></Col>
                    <Col span={8}><Text type="secondary">状态：</Text><Tag color={detail.status === 'normal' ? 'success' : 'error'}>{detail.status === 'normal' ? '正常' : '已禁用'}</Tag></Col>
                    <Col span={8}><Text type="secondary">创建时间：</Text><Text>{detail.createTime}</Text></Col>
                    <Col span={8}><Text type="secondary">创建人：</Text><Text>{detail.creator}</Text></Col>
                    <Col span={8}><Text type="secondary">加入方式：</Text><Tag color="blue">{detail.joinType === 'public' ? '公开' : detail.joinType === 'approval' ? '需审核' : '邀请制'}</Tag></Col>
                    <Col span={24}><Text type="secondary">简介：</Text><Text>{detail.description}</Text></Col>
                  </Row>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <Title level={5} style={{ margin: 0 }}>管理员列表</Title>
                  <Button type="primary" size="small" icon={<PlusOutlined />} style={{ background: PRIMARY, borderColor: PRIMARY }}
                    onClick={() => setAdminModal(true)}>添加管理员</Button>
                </div>
                <Table
                  dataSource={members.filter(m => m.role === 'admin')}
                  columns={[
                    { title: '用户', render: (_: any, row: any) => (
                      <Space>
                        <Avatar size={32} style={{ background: PRIMARY }}>{row.userName[0]}</Avatar>
                        <span>{row.userName}</span>
                      </Space>
                    )},
                    { title: '加入时间', dataIndex: 'joinTime' },
                    { title: '发帖数', dataIndex: 'postCount' },
                    { title: '最后活跃', dataIndex: 'lastActive' },
                    { title: '操作', render: (_: any, row: any) => (
                      <Space>
                        <Button size="small" onClick={() => {
                          if (setActivePage && setSelectedUser) {
                            const user = USERS.find(u => u.id === row.userId);
                            if (user) {
                              setSelectedUser(user);
                              setActivePage('user');
                            }
                          }
                        }}>查看详情</Button>
                        <Popconfirm title="确认移除管理员？" onConfirm={() => message.success('已移除管理员')}>
                          <Button size="small" danger>移除管理员</Button>
                        </Popconfirm>
                      </Space>
                    )},
                  ]}
                  rowKey="id"
                  pagination={false}
                />
              </div>
            )}

            {/* 成员管理 Tab */}
            {detailTab === 'members' && (
              <div>
                {/* 统计摘要 */}
                <Row gutter={16} className="mb-4">
                  <Col span={6}>
                    <Card size="small">
                      <Statistic title="总成员数" value={stats.totalMembers} valueStyle={{ color: PRIMARY }} />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card size="small">
                      <Statistic title="本周新增" value={stats.newThisWeek} valueStyle={{ color: '#52c41a' }} />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card size="small">
                      <Statistic title="活跃成员" value={stats.activeMembers} valueStyle={{ color: '#1677ff' }} />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card size="small">
                      <Statistic title="沉默成员" value={stats.silentMembers} valueStyle={{ color: '#999' }} />
                    </Card>
                  </Col>
                </Row>
                <Table dataSource={members} columns={memberCols} rowKey="id" pagination={{ pageSize: 10 }} />
              </div>
            )}

            {/* 帖子管理 Tab */}
            {detailTab === 'posts' && (
              <div>
                {/* 统计摘要 */}
                <Row gutter={16} className="mb-4">
                  <Col span={6}>
                    <Card size="small">
                      <Statistic title="总帖子数" value={stats.totalPosts} valueStyle={{ color: PRIMARY }} />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card size="small">
                      <Statistic title="今日新增" value={stats.todayPosts} valueStyle={{ color: '#52c41a' }} />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card size="small">
                      <Statistic title="正常帖子" value={stats.normalPosts} valueStyle={{ color: '#1677ff' }} />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card size="small">
                      <Statistic title="已删除" value={stats.deletedPosts} valueStyle={{ color: '#ff4d4f' }} />
                    </Card>
                  </Col>
                </Row>
                <Table dataSource={posts} columns={postCols} rowKey="id" pagination={{ pageSize: 10 }} />
              </div>
            )}

            {/* 活动管理 Tab */}
            {detailTab === 'activities' && (
              <div>
                {/* 筛选栏 */}
                <Card size="small" className="mb-4">
                  <Row gutter={[16, 16]}>
                    <Col span={5}>
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>活动状态</Text>
                        <Select
                          value={activityStatusFilter}
                          onChange={setActivityStatusFilter}
                          style={{ width: '100%', marginTop: 4 }}
                          options={[
                            { value: 'all', label: '全部状态' },
                            { value: 'draft', label: '草稿' },
                            { value: 'pending', label: '未开始' },
                            { value: 'ongoing', label: '进行中' },
                            { value: 'finished', label: '已结束' },
                            { value: 'offline', label: '已下架' },
                          ]}
                        />
                      </div>
                    </Col>
                    <Col span={5}>
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>参与范围</Text>
                        <Select
                          value={activityScopeFilter}
                          onChange={(val) => { setActivityScopeFilter(val); setActivityScopeDetailFilter(null); }}
                          style={{ width: '100%', marginTop: 4 }}
                          options={[
                            { value: 'all', label: '全部范围' },
                            { value: 'all', label: '全平台' },
                            { value: 'region', label: '按区域' },
                            { value: 'org', label: '按组织' },
                            { value: 'circle', label: '按圈子' },
                          ]}
                        />
                      </div>
                    </Col>
                    {activityScopeFilter === 'region' && (
                      <Col span={5}>
                        <div>
                          <Text type="secondary" style={{ fontSize: 12 }}>选择区域</Text>
                          <Cascader
                            value={activityScopeDetailFilter}
                            onChange={setActivityScopeDetailFilter}
                            style={{ width: '100%', marginTop: 4 }}
                            placeholder="选择区域"
                            options={[
                              { value: '500000', label: '重庆市', children: [
                                { value: '500103', label: '渝中区' },
                                { value: '500104', label: '大渡口区' },
                                { value: '500105', label: '江北区' },
                                { value: '500106', label: '沙坪坝区' },
                                { value: '500107', label: '九龙坡区' },
                                { value: '500108', label: '南岸区' },
                                { value: '500109', label: '北碚区' },
                                { value: '500110', label: '綦江区' },
                                { value: '500111', label: '大足区' },
                                { value: '500112', label: '渝北区' },
                                { value: '500113', label: '巴南区' },
                              ]}
                            ]}
                          />
                        </div>
                      </Col>
                    )}
                    {activityScopeFilter === 'org' && (
                      <Col span={5}>
                        <div>
                          <Text type="secondary" style={{ fontSize: 12 }}>选择组织</Text>
                          <Select
                            mode="multiple"
                            value={activityScopeDetailFilter}
                            onChange={setActivityScopeDetailFilter}
                            style={{ width: '100%', marginTop: 4 }}
                            placeholder="选择组织"
                            options={[
                              { value: 101, label: '渝中区老年大学' },
                              { value: 102, label: '南岸区夕阳红协会' },
                              { value: 103, label: '沙坪坝区老年协会' },
                              { value: 104, label: '江北区长者中心' },
                              { value: 105, label: '渝北区老年活动中心' },
                            ]}
                          />
                        </div>
                      </Col>
                    )}
                    {activityScopeFilter === 'circle' && (
                      <Col span={5}>
                        <div>
                          <Text type="secondary" style={{ fontSize: 12 }}>选择圈子</Text>
                          <Select
                            mode="multiple"
                            value={activityScopeDetailFilter}
                            onChange={setActivityScopeDetailFilter}
                            style={{ width: '100%', marginTop: 4 }}
                            placeholder="选择圈子"
                            options={CIRCLES.filter(c => c.status === 'normal').map(c => ({
                              value: c.id,
                              label: c.name,
                            }))}
                          />
                        </div>
                      </Col>
                    )}
                    <Col span={activityScopeFilter !== 'all' ? 4 : 8}>
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>活动时间</Text>
                        <DatePicker.RangePicker
                          value={activityTimeRange}
                          onChange={setActivityTimeRange}
                          style={{ width: '100%', marginTop: 4 }}
                          placeholder={['开始时间', '结束时间']}
                        />
                      </div>
                    </Col>
                    <Col span={activityScopeFilter !== 'all' ? 5 : 6}>
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>关键词搜索</Text>
                        <Input
                          value={activityKeyword}
                          onChange={e => setActivityKeyword(e.target.value)}
                          placeholder="搜索活动名称/地点"
                          style={{ marginTop: 4 }}
                          allowClear
                        />
                      </div>
                    </Col>
                    <Col span={activityScopeFilter !== 'all' ? 5 : 5}>
                      <div style={{ marginTop: 20 }}>
                        <Space>
                          <Button
                            onClick={() => {
                              setActivityStatusFilter('all');
                              setActivityScopeFilter('all');
                              setActivityScopeDetailFilter(null);
                              setActivityKeyword('');
                              setActivityTimeRange(null);
                            }}
                          >
                            重置
                          </Button>
                          <Text type="secondary">
                            共找到 {activities.filter(a => {
                              if (activityStatusFilter !== 'all' && a.activityStatus !== activityStatusFilter) return false;
                              if (activityScopeFilter !== 'all' && a.scopeType !== activityScopeFilter) return false;
                              if (activityScopeDetailFilter) {
                                if (activityScopeFilter === 'region' && a.scopeType === 'region') {
                                  const regionCode = activityScopeDetailFilter[activityScopeDetailFilter.length - 1];
                                  if (!a.scopeDetail || !a.scopeDetail.includes(regionCode)) return false;
                                }
                                if (activityScopeFilter === 'org' && a.scopeType === 'org') {
                                  if (!a.scopeDetail || !activityScopeDetailFilter.some((id: number) => a.scopeDetail.includes(id))) return false;
                                }
                                if (activityScopeFilter === 'circle' && a.scopeType === 'circle') {
                                  if (!a.scopeDetail || !activityScopeDetailFilter.some((id: number) => a.scopeDetail.includes(id))) return false;
                                }
                              }
                              if (activityKeyword && !a.title.includes(activityKeyword) && !a.location.includes(activityKeyword)) return false;
                              if (activityTimeRange && activityTimeRange[0] && activityTimeRange[1]) {
                                const startTime = new Date(a.startTime);
                                if (startTime < activityTimeRange[0] || startTime > activityTimeRange[1]) return false;
                              }
                              return true;
                            }).length} 条活动
                          </Text>
                        </Space>
                      </div>
                    </Col>
                  </Row>
                </Card>
                <Table dataSource={activities.filter(a => {
                  if (activityStatusFilter !== 'all' && a.activityStatus !== activityStatusFilter) return false;
                  if (activityScopeFilter !== 'all' && a.scopeType !== activityScopeFilter) return false;
                  if (activityScopeDetailFilter) {
                    if (activityScopeFilter === 'region' && a.scopeType === 'region') {
                      const regionCode = activityScopeDetailFilter[activityScopeDetailFilter.length - 1];
                      if (!a.scopeDetail || !a.scopeDetail.includes(regionCode)) return false;
                    }
                    if (activityScopeFilter === 'org' && a.scopeType === 'org') {
                      if (!a.scopeDetail || !activityScopeDetailFilter.some((id: number) => a.scopeDetail.includes(id))) return false;
                    }
                    if (activityScopeFilter === 'circle' && a.scopeType === 'circle') {
                      if (!a.scopeDetail || !activityScopeDetailFilter.some((id: number) => a.scopeDetail.includes(id))) return false;
                    }
                  }
                  if (activityKeyword && !a.title.includes(activityKeyword) && !a.location.includes(activityKeyword)) return false;
                  if (activityTimeRange && activityTimeRange[0] && activityTimeRange[1]) {
                    const startTime = new Date(a.startTime);
                    if (startTime < activityTimeRange[0] || startTime > activityTimeRange[1]) return false;
                  }
                  return true;
                })} columns={activityCols} rowKey="id" pagination={{ pageSize: 10 }} />
              </div>
            )}

            {/* 数据统计 Tab */}
            {detailTab === 'stats' && (
              <div>
                <Title level={5} className="mb-3">成员增长趋势</Title>
                <div style={{ height: 300, marginBottom: 32 }}>
                  <div ref={(node) => {
                    if (node && detail) {
                      const chart = echarts.init(node);
                      chart.setOption({
                        tooltip: { trigger: 'axis' },
                        xAxis: { type: 'category', data: ['第1周', '第2周', '第3周', '第4周'] },
                        yAxis: { type: 'value', name: '新增成员' },
                        series: [{
                          data: [12, 18, 23, 15],
                          type: 'line',
                          smooth: true,
                          itemStyle: { color: PRIMARY },
                          areaStyle: { color: `${PRIMARY}20` }
                        }]
                      });
                    }
                  }} style={{ width: '100%', height: '100%' }} />
                </div>

                <Title level={5} className="mb-3">帖子发布趋势</Title>
                <div style={{ height: 300, marginBottom: 32 }}>
                  <div ref={(node) => {
                    if (node && detail) {
                      const chart = echarts.init(node);
                      chart.setOption({
                        tooltip: { trigger: 'axis' },
                        xAxis: { type: 'category', data: ['第1周', '第2周', '第3周', '第4周'] },
                        yAxis: { type: 'value', name: '发布帖子' },
                        series: [{
                          data: [45, 67, 89, 78],
                          type: 'bar',
                          itemStyle: { color: '#1677ff' }
                        }]
                      });
                    }
                  }} style={{ width: '100%', height: '100%' }} />
                </div>

                <Title level={5} className="mb-3">活跃度趋势</Title>
                <div style={{ height: 300 }}>
                  <div ref={(node) => {
                    if (node && detail) {
                      const chart = echarts.init(node);
                      chart.setOption({
                        tooltip: { trigger: 'axis' },
                        legend: { data: ['日活跃', '周活跃'] },
                        xAxis: { type: 'category', data: ['第1周', '第2周', '第3周', '第4周'] },
                        yAxis: { type: 'value', name: '活跃人数' },
                        series: [
                          {
                            name: '日活跃',
                            data: [120, 145, 156, 142],
                            type: 'line',
                            smooth: true,
                            itemStyle: { color: '#52c41a' }
                          },
                          {
                            name: '周活跃',
                            data: [450, 520, 580, 540],
                            type: 'line',
                            smooth: true,
                            itemStyle: { color: '#faad14' }
                          }
                        ]
                      });
                    }
                  }} style={{ width: '100%', height: '100%' }} />
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* 新建/编辑活动 Modal */}
        <Modal
          title={selectedActivity ? '编辑活动' : '新建圈子活动'}
          open={activityModal}
          onCancel={() => { setActivityModal(false); setSelectedActivity(null); activityForm.resetFields(); }}
          width={640}
          footer={
            <Space>
              <Button onClick={() => { setActivityModal(false); setSelectedActivity(null); activityForm.resetFields(); }}>取消</Button>
              <Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }} onClick={() => {
                activityForm.validateFields().then(() => {
                  message.success(selectedActivity ? '活动编辑成功' : '活动创建成功');
                  setActivityModal(false);
                  setSelectedActivity(null);
                  activityForm.resetFields();
                });
              }}>保存</Button>
            </Space>
          }
        >
          <Form layout="vertical" form={activityForm}>
            <Form.Item label="活动名称" name="title" rules={[{ required: true, message: '请输入活动名称' }]}>
              <Input placeholder="请输入活动名称" maxLength={50} />
            </Form.Item>

            <Form.Item label="所属圈子" name="circleId" rules={[{ required: true, message: '请选择圈子' }]}>
              <Select placeholder="请选择圈子" options={CIRCLES.map(c => ({ value: c.id, label: c.name }))} />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="开始时间" name="startTime" rules={[{ required: true, message: '请选择开始时间' }]}>
                  <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} placeholder="选择开始时间" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="结束时间" name="endTime" rules={[{ required: true, message: '请选择结束时间' }]}>
                  <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} placeholder="选择结束时间" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="活动地点" name="location" rules={[{ required: true, message: '请输入活动地点' }]}>
              <Input placeholder="请输入活动地点" />
            </Form.Item>

            <Form.Item label="最大报名人数" name="maxEnroll" rules={[{ required: true, message: '请输入人数上限' }]}>
              <InputNumber min={1} placeholder="请输入人数上限" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="活动简介" name="description" rules={[{ required: true, message: '请输入活动简介' }]}>
              <Input.TextArea rows={4} placeholder="请输入活动简介" maxLength={500} showCount />
            </Form.Item>

            <Form.Item label="宣传图片" name="promotionalImages">
              <div>
                <Button icon={<UploadOutlined />}>上传图片</Button>
                <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
                  建议尺寸：750x400，支持 JPG、PNG 格式，最多上传 3 张
                </div>
              </div>
            </Form.Item>
          </Form>
        </Modal>

        {/* 新增管理员 Modal */}
        <Modal title="添加管理员" open={adminModal} onCancel={() => setAdminModal(false)} width={480}
          footer={<Space><Button onClick={() => setAdminModal(false)}>取消</Button>
            <Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }} onClick={handleAddAdmin}>确认添加</Button></Space>}>
          <Form layout="vertical">
            <Form.Item label="选择成员" required>
              <Select
                placeholder="请选择要设为管理员的成员"
                showSearch
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={members.filter(m => m.role === 'member').map(m => ({ value: m.userId, label: m.userName }))}
              />
            </Form.Item>
            <Text type="secondary" style={{ fontSize: 13 }}>
              只能从当前圈子成员中选择，管理员将拥有圈子管理权限
            </Text>
          </Form>
        </Modal>

        {/* 活动详情 Modal */}
        <Modal
          title="活动详情"
          open={activityDetailModal}
          onCancel={() => { setActivityDetailModal(false); setSelectedActivity(null); }}
          width={800}
          footer={
            selectedActivity?.approvalStatus === 'pending' ? [
              <Button key="cancel" onClick={() => { setActivityDetailModal(false); setSelectedActivity(null); }}>关闭</Button>,
              <Popconfirm
                key="approve"
                title="确认通过该活动？"
                onConfirm={() => {
                  message.success('活动审核通过');
                  setActivityDetailModal(false);
                  setSelectedActivity(null);
                }}
                okText="通过"
                okButtonProps={{ style: { background: '#52c41a', borderColor: '#52c41a' } }}
              >
                <Button type="primary" style={{ background: '#52c41a', borderColor: '#52c41a' }}>通过</Button>
              </Popconfirm>,
              <Button
                key="reject"
                danger
                onClick={() => {
                  setActivityDetailModal(false);
                  setActivityRejectModal(true);
                }}
              >
                拒绝
              </Button>,
            ] : selectedActivity?.approvalStatus === 'approved' ? [
              <Button key="cancel" onClick={() => { setActivityDetailModal(false); setSelectedActivity(null); }}>关闭</Button>,
              <Button
                key="edit"
                type="primary"
                style={{ background: PRIMARY, borderColor: PRIMARY }}
                onClick={() => {
                  setActivityDetailModal(false);
                  setActivityModal(true);
                }}
              >
                编辑
              </Button>,
              <Popconfirm
                key="delete"
                title="确认删除该活动？"
                onConfirm={() => {
                  message.success('活动已删除');
                  setActivityDetailModal(false);
                  setSelectedActivity(null);
                }}
              >
                <Button danger>删除</Button>
              </Popconfirm>,
            ] : [
              <Button key="close" onClick={() => { setActivityDetailModal(false); setSelectedActivity(null); }}>关闭</Button>,
              <Popconfirm
                key="delete"
                title="确认删除该活动？"
                onConfirm={() => {
                  message.success('活动已删除');
                  setActivityDetailModal(false);
                  setSelectedActivity(null);
                }}
              >
                <Button danger>删除</Button>
              </Popconfirm>,
            ]
          }
        >
          {selectedActivity && (
            <div>
              {/* 顶部标题和状态 */}
              <div style={{ marginBottom: 24 }}>
                <Title level={4} style={{ marginBottom: 8 }}>{selectedActivity.title}</Title>
                <Space>
                  <Tag color={activityApprovalStatusMap[selectedActivity.approvalStatus]?.color}>
                    {activityApprovalStatusMap[selectedActivity.approvalStatus]?.label}
                  </Tag>
                  <Tag color={activityStatusMap[selectedActivity.activityStatus]?.color}>
                    {activityStatusMap[selectedActivity.activityStatus]?.label}
                  </Tag>
                </Space>
              </div>

              {/* 基本信息 */}
              <div style={{ marginBottom: 24 }}>
                <Title level={5} style={{ marginBottom: 12 }}>基本信息</Title>
                <Row gutter={[16, 12]}>
                  <Col span={12}>
                    <Text type="secondary">所属圈子：</Text>
                    <a style={{ color: PRIMARY }} onClick={() => {
                      const circle = CIRCLES.find(c => c.id === selectedActivity.circleId);
                      if (circle) {
                        setActivityDetailModal(false);
                        setDetail(circle);
                      }
                    }}>{selectedActivity.circleName}</a>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">活动地点：</Text>
                    <Text>{selectedActivity.location}</Text>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">开始时间：</Text>
                    <Text>{selectedActivity.startTime}</Text>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">结束时间：</Text>
                    <Text>{selectedActivity.endTime}</Text>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">创建人：</Text>
                    <Text>{selectedActivity.creator}</Text>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">创建时间：</Text>
                    <Text>{selectedActivity.createTime}</Text>
                  </Col>
                </Row>
              </div>

              {/* 报名情况 */}
              <div style={{ marginBottom: 24 }}>
                <Title level={5} style={{ marginBottom: 12 }}>报名情况</Title>
                <div style={{ marginBottom: 8 }}>
                  <Text>已报名 {selectedActivity.enrollCount} 人 / 上限 {selectedActivity.maxEnroll} 人</Text>
                </div>
                <Progress
                  percent={Math.round((selectedActivity.enrollCount / selectedActivity.maxEnroll) * 100)}
                  strokeColor={PRIMARY}
                />
              </div>

              {/* 活动简介 */}
              <div style={{ marginBottom: 24 }}>
                <Title level={5} style={{ marginBottom: 12 }}>活动简介</Title>
                <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 8 }}>
                  <Text>{selectedActivity.description}</Text>
                </div>
              </div>

              {/* 宣传图片 */}
              {selectedActivity.promotionalImages && selectedActivity.promotionalImages.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <Title level={5} style={{ marginBottom: 12 }}>宣传图片</Title>
                  <Space size={12}>
                    {selectedActivity.promotionalImages.map((img: string, idx: number) => (
                      <div key={idx} style={{ width: 120, height: 80, background: '#f0f0f0', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Text type="secondary">图片 {idx + 1}</Text>
                      </div>
                    ))}
                  </Space>
                </div>
              )}

              {/* 审核历史 */}
              {(selectedActivity.reviewedAt || selectedActivity.approvalStatus !== 'pending') && (
                <div>
                  <Title level={5} style={{ marginBottom: 12 }}>审核历史</Title>
                  <Timeline>
                    <Timeline.Item color="blue">
                      <Text type="secondary">{selectedActivity.createTime}</Text>
                      <div>活动创建，等待审核</div>
                    </Timeline.Item>
                    {selectedActivity.reviewedAt && (
                      <Timeline.Item color={selectedActivity.approvalStatus === 'approved' ? 'green' : 'red'}>
                        <Text type="secondary">{selectedActivity.reviewedAt}</Text>
                        <div>
                          {selectedActivity.reviewer} {selectedActivity.approvalStatus === 'approved' ? '审核通过' : '审核拒绝'}
                        </div>
                        {selectedActivity.rejectReason && (
                          <div style={{ marginTop: 4, color: '#ff4d4f' }}>
                            拒绝原因：{selectedActivity.rejectReason}
                          </div>
                        )}
                      </Timeline.Item>
                    )}
                  </Timeline>
                </div>
              )}
            </div>
          )}
        </Modal>

        {/* 活动拒绝原因 Modal */}
        <Modal
          title="拒绝活动"
          open={activityRejectModal}
          onCancel={() => { setActivityRejectModal(false); setActivityRejectReason(''); }}
          width={520}
          footer={
            <Space>
              <Button onClick={() => { setActivityRejectModal(false); setActivityRejectReason(''); }}>取消</Button>
              <Button
                danger
                onClick={() => {
                  if (!activityRejectReason || activityRejectReason.length < 10) {
                    message.error('请输入至少10个字的拒绝原因');
                    return;
                  }
                  message.success('活动已拒绝');
                  setActivityRejectModal(false);
                  setActivityRejectReason('');
                  setSelectedActivity(null);
                }}
              >
                确认拒绝
              </Button>
            </Space>
          }
        >
          <div style={{ marginBottom: 16 }}>
            <Text strong>常用原因</Text>
            <Radio.Group
              style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}
              onChange={(e) => {
                const presets: Record<string, string> = {
                  incomplete: '活动信息不完整，缺少必要的活动详情和注意事项',
                  conflict: '活动时间与其他活动或场地安排冲突，建议调整时间',
                  violation: '活动内容不符合平台规范，请修改后重新提交',
                  sensitive: '活动涉及敏感内容，不适合作为圈子活动',
                };
                if (e.target.value !== 'custom') {
                  setActivityRejectReason(presets[e.target.value] || '');
                } else {
                  setActivityRejectReason('');
                }
              }}
            >
              <Radio value="incomplete">活动信息不完整</Radio>
              <Radio value="conflict">活动时间冲突</Radio>
              <Radio value="violation">活动内容不符合规范</Radio>
              <Radio value="sensitive">涉及敏感内容</Radio>
              <Radio value="custom">其他（自定义）</Radio>
            </Radio.Group>
          </div>
          <div>
            <Text strong>拒绝原因 <Text type="danger">*</Text></Text>
            <Text type="secondary" style={{ fontSize: 12 }}> （至少10个字）</Text>
            <Input.TextArea
              value={activityRejectReason}
              onChange={e => setActivityRejectReason(e.target.value)}
              placeholder="请详细说明拒绝原因..."
              rows={4}
              className="mt-2"
              maxLength={200}
              showCount
            />
          </div>
        </Modal>
      </div>
    );
  }

  // ── 圈子列表（卡片视图，4列布局）──
  const totalCircles = CIRCLES.length;
  const normalCircles = CIRCLES.filter(c => c.status === 'normal').length;
  const disabledCircles = CIRCLES.filter(c => c.status === 'disabled').length;
  const totalMembers = CIRCLES.reduce((sum, c) => sum + c.memberCount, 0);
  const totalPosts = Object.values(CIRCLE_POSTS).flat().length;
  const totalActivities = CIRCLE_ACTIVITIES.length;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={4} style={{ margin: 0 }}>圈子管理</Title>
      </div>

      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic title="圈子总数" value={totalCircles} suffix="个" valueStyle={{ color: PRIMARY }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="正常圈子" value={normalCircles} suffix="个" valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="圈子成员" value={totalMembers} suffix="人" valueStyle={{ color: '#1677ff' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="圈子帖子" value={totalPosts} suffix="条" valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
      </Row>

      {/* 筛选栏和卡片网格 */}
      <Card className="page-card" style={{ padding: 16 }}>
        {/* 筛选条件 */}
        <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Select
            placeholder="分类筛选"
            value={categoryFilter}
            onChange={setCategoryFilter}
            style={{ width: 140 }}
            options={[
              { value: 'all', label: '全部分类' },
              { value: '兴趣爱好', label: '兴趣爱好' },
              { value: '健康养生', label: '健康养生' },
              { value: '文化艺术', label: '文化艺术' },
              { value: '运动健身', label: '运动健身' },
              { value: '社区服务', label: '社区服务' },
            ]}
          />
          <Select
            placeholder="状态筛选"
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 120 }}
            options={[
              { value: 'all', label: '全部状态' },
              { value: 'normal', label: '正常' },
              { value: 'disabled', label: '已禁用' },
            ]}
          />
          <Select
            placeholder="排序方式"
            value={sortBy}
            onChange={setSortBy}
            style={{ width: 140 }}
            options={[
              { value: 'latest', label: '最新创建' },
              { value: 'members', label: '成员最多' },
              { value: 'posts', label: '帖子最多' },
              { value: 'active', label: '最活跃' },
            ]}
          />
          <Input.Search
            placeholder="搜索圈子名称/简介"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            onSearch={setSearchKeyword}
            allowClear
            style={{ width: 240 }}
          />
          <Button icon={<ReloadOutlined />} onClick={() => {
            setCategoryFilter('all');
            setStatusFilter('all');
            setSortBy('latest');
            setSearchKeyword('');
          }}>重置</Button>
          <Button type="primary" icon={<PlusOutlined />} style={{ background: PRIMARY, borderColor: PRIMARY }}
            onClick={() => openCircleModal()}>新建圈子</Button>
          <span style={{ marginLeft: 'auto', color: '#999', fontSize: 14 }}>
            共 {filteredCircles.length} 个圈子
          </span>
        </div>

        {/* 卡片网格（4列布局）*/}
        <Row gutter={[16, 16]}>
          {filteredCircles.map(circle => {
            const activities = CIRCLE_ACTIVITIES.filter(a => a.circleId === circle.id);
            return (
              <Col xs={24} sm={12} md={8} lg={6} key={circle.id}>
                <Card
                  className="kpi-card"
                  hoverable
                  style={{ cursor: 'pointer' }}
                  onClick={() => { setDetail(circle); setDetailTab('info'); }}
                  bodyStyle={{ padding: 12 }}
                  actions={[
                    <Popconfirm
                      key="toggle"
                      title={circle.status === 'disabled' ? '确认启用该圈子？' : '确认禁用该圈子？'}
                      okText="确认" cancelText="取消"
                      onPopupClick={e => e.stopPropagation()}
                      onConfirm={(e) => { e?.stopPropagation(); message.success(circle.status === 'disabled' ? '圈子已启用' : '圈子已禁用'); }}
                    >
                      <span onClick={e => e.stopPropagation()}
                        style={{ color: circle.status === 'disabled' ? '#52c41a' : '#ff4d4f', fontSize: 12 }}>
                        {circle.status === 'disabled' ? '启用' : '禁用'}
                      </span>
                    </Popconfirm>,
                    <span key="edit" onClick={e => { e.stopPropagation(); openCircleModal(circle); }}
                      style={{ color: PRIMARY, fontSize: 12 }}>
                      <EditOutlined /> 编辑
                    </span>,
                    <span key="detail" style={{ color: PRIMARY, fontSize: 12 }}>
                      详情 →
                    </span>,
                  ]}
                >
                  {/* 标题行：图标 + 名称 */}
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar size={36} style={{ background: PRIMARY, fontSize: 16, flexShrink: 0 }}>
                      {circle.name[0]}
                    </Avatar>
                    <div className="flex-1" style={{ minWidth: 0 }}>
                      <Text strong style={{ fontSize: 14, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {circle.name}
                      </Text>
                    </div>
                  </div>

                  {/* 标签行 */}
                  <div className="mb-2">
                    <Space size={4}>
                      <Tag color={categoryColor[circle.category] ?? 'default'} style={{ fontSize: 11, margin: 0 }}>
                        {circle.category}
                      </Tag>
                      <Tag color={circle.status === 'normal' ? 'success' : 'error'} style={{ fontSize: 11, margin: 0 }}>
                        {circle.status === 'normal' ? '正常' : '已禁用'}
                      </Tag>
                    </Space>
                  </div>

                  {/* 统计数据 */}
                  <Row gutter={8}>
                    <Col span={8} className="text-center">
                      <div style={{ color: PRIMARY, fontWeight: 600, fontSize: 16 }}>{circle.memberCount.toLocaleString()}</div>
                      <div style={{ color: '#999', fontSize: 11 }}>成员</div>
                    </Col>
                    <Col span={8} className="text-center">
                      <div style={{ color: '#1677ff', fontWeight: 600, fontSize: 16 }}>{circle.postCount.toLocaleString()}</div>
                      <div style={{ color: '#999', fontSize: 11 }}>帖子</div>
                    </Col>
                    <Col span={8} className="text-center">
                      <div style={{ color: '#722ed1', fontWeight: 600, fontSize: 16 }}>{activities.length}</div>
                      <div style={{ color: '#999', fontSize: 11 }}>活动</div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>

        {filteredCircles.length === 0 && (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <Empty description="暂无符合条件的圈子" />
          </div>
        )}
      </Card>

      {/* 新建/编辑圈子 Modal */}
      <Modal
        title={editingCircle ? '编辑圈子' : '新建圈子'}
        open={circleModal}
        onCancel={() => { setCircleModal(false); setEditingCircle(null); circleForm.resetFields(); }}
        width={600}
        footer={<Space>
          <Button onClick={() => { setCircleModal(false); setEditingCircle(null); circleForm.resetFields(); }}>取消</Button>
          <Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }} onClick={handleCircleSubmit}>
            {editingCircle ? '保存' : '创建'}
          </Button>
        </Space>}>
        <Form form={circleForm} layout="vertical">
          <Form.Item label="圈子头像" name="avatar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Avatar size={64} style={{ background: PRIMARY, fontSize: 24 }}>
                {circleForm.getFieldValue('name')?.[0] || '圈'}
              </Avatar>
              <div>
                <Button size="small" icon={<UploadOutlined />}>上传头像</Button>
                <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
                  建议尺寸：200x200，支持 JPG、PNG 格式
                </div>
              </div>
            </div>
          </Form.Item>
          <Form.Item label="圈子名称" name="name" rules={[{ required: true, message: '请输入圈子名称' }]}>
            <Input placeholder="请输入圈子名称" maxLength={20} showCount />
          </Form.Item>
          <Form.Item label="分类" name="category" rules={[{ required: true, message: '请选择分类' }]}>
            <Select placeholder="请选择分类" options={[
              { value: '兴趣爱好', label: '兴趣爱好' },
              { value: '健康养生', label: '健康养生' },
              { value: '文化艺术', label: '文化艺术' },
              { value: '运动健身', label: '运动健身' },
              { value: '社区服务', label: '社区服务' },
            ]} />
          </Form.Item>
          <Form.Item label="加入方式" name="joinType" rules={[{ required: true, message: '请选择加入方式' }]}>
            <Radio.Group>
              <Radio value="public">公开（任何人可加入）</Radio>
              <Radio value="approval">需审核（需管理员审批）</Radio>
              <Radio value="invite">邀请制（仅限邀请）</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="圈子简介" name="description" rules={[{ required: true, message: '请输入圈子简介' }]}>
            <Input.TextArea rows={4} placeholder="请输入圈子简介" maxLength={200} showCount />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// ─── 活动管理 ────────────────────────────────────────────
const ActivityPage: React.FC<{ setActivePage?: (page: string) => void }> = ({ setActivePage }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [scopeType, setScopeType] = useState<'all'|'region'|'org'|'circle'>('all');
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [editingActivity, setEditingActivity] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [scopeFilter, setScopeFilter] = useState('all');
  const [scopeDetailFilter, setScopeDetailFilter] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<any>(null);
  const [keyword, setKeyword] = useState('');
  const [activityForm] = Form.useForm();

  // 检查是否从圈子活动跳转过来
  React.useEffect(() => {
    if ((window as any).__selectedActivity) {
      setSelectedActivity((window as any).__selectedActivity);
      delete (window as any).__selectedActivity;
    }
  }, []);

  const statusMap: Record<string, {color:string;label:string}> = {
    draft: { color: 'default', label: '草稿' },
    pending: { color: 'blue', label: '未开始' },
    ongoing: { color: 'success', label: '进行中' },
    finished: { color: 'default', label: '已结束' },
    offline: { color: 'warning', label: '已下架' },
  };

  const cols = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '活动名称', dataIndex: 'title', render: (text: string, row: any) => (
      <a style={{ color: PRIMARY }} onClick={() => setSelectedActivity(row)}>{text}</a>
    )},
    { title: '活动时间', render: (_: any, row: any) => (
      <div style={{ fontSize: 12 }}>
        <div>{row.startTime}</div>
        <div style={{ color: '#999' }}>至 {row.endTime}</div>
      </div>
    )},
    { title: '活动地点', dataIndex: 'location', ellipsis: true },
    { title: '参与范围', render: (_: any, row: any) => (
      <Tag color={row.scopeType==='all'?'blue':row.scopeType==='region'?'orange':'purple'}>{row.scope}</Tag>
    )},
    { title: '报名情况', render: (_: any, row: any) => (
      <div style={{ width: 120 }}>
        <div style={{ fontSize: 12, marginBottom: 4 }}>{row.enrollCount} / {row.maxEnroll} 人</div>
        <Progress percent={Math.round((row.enrollCount / row.maxEnroll) * 100)} size="small" strokeColor={PRIMARY} />
      </div>
    )},
    { title: '状态', dataIndex: 'status', render: (v: string) =>
      <Tag color={statusMap[v]?.color}>{statusMap[v]?.label}</Tag> },
    { title: '操作', width: 200, render: (_: any, row: any) => (
      <Space size="small">
        <Button size="small" type="link" onClick={() => setSelectedActivity(row)}>详情</Button>
        {row.status === 'draft' && (
          <>
            <Button size="small" type="link" icon={<EditOutlined />} onClick={() => {
              setEditingActivity(row);
              setScopeType(row.scopeType || 'all');
              activityForm.setFieldsValue({
                ...row,
                startTime: row.startTime ? dayjs(row.startTime, 'YYYY-MM-DD HH:mm') : null,
                endTime: row.endTime ? dayjs(row.endTime, 'YYYY-MM-DD HH:mm') : null,
              });
              setModalOpen(true);
            }}>编辑</Button>
            <Popconfirm title="确认上架该活动？" onConfirm={() => message.success('活动已上架')}>
              <Button size="small" type="link" style={{ color: '#52c41a' }}>上架</Button>
            </Popconfirm>
          </>
        )}
        {row.status === 'pending' && (
          <>
            <Button size="small" type="link" icon={<EditOutlined />} onClick={() => {
              setEditingActivity(row);
              setScopeType(row.scopeType || 'all');
              activityForm.setFieldsValue({
                ...row,
                startTime: row.startTime ? dayjs(row.startTime, 'YYYY-MM-DD HH:mm') : null,
                endTime: row.endTime ? dayjs(row.endTime, 'YYYY-MM-DD HH:mm') : null,
              });
              setModalOpen(true);
            }}>编辑</Button>
            <Popconfirm title="确认下架该活动？" onConfirm={() => message.success('活动已下架')}>
              <Button size="small" type="link" style={{ color: '#faad14' }}>下架</Button>
            </Popconfirm>
          </>
        )}
        {row.status === 'ongoing' && (
          <>
            <Button size="small" type="link" icon={<EditOutlined />} onClick={() => {
              setEditingActivity(row);
              setScopeType(row.scopeType || 'all');
              activityForm.setFieldsValue({
                ...row,
                startTime: row.startTime ? dayjs(row.startTime, 'YYYY-MM-DD HH:mm') : null,
                endTime: row.endTime ? dayjs(row.endTime, 'YYYY-MM-DD HH:mm') : null,
              });
              setModalOpen(true);
            }}>编辑</Button>
            <Popconfirm title="确认下架该活动？" onConfirm={() => message.success('活动已下架')}>
              <Button size="small" type="link" style={{ color: '#faad14' }}>下架</Button>
            </Popconfirm>
          </>
        )}
        {row.status === 'finished' && (
          <>
            <Popconfirm title="确认下架该活动？" onConfirm={() => message.success('活动已下架')}>
              <Button size="small" type="link" style={{ color: '#faad14' }}>下架</Button>
            </Popconfirm>
          </>
        )}
        {row.status === 'offline' && (
          <>
            <Popconfirm title="确认重新发布该活动？" onConfirm={() => message.success('活动已重新发布')}>
              <Button size="small" type="link" style={{ color: '#52c41a' }}>重新发布</Button>
            </Popconfirm>
            <Popconfirm title="确认删除该活动？" onConfirm={() => message.success('活动已删除')}>
              <Button size="small" type="link" danger>删除</Button>
            </Popconfirm>
          </>
        )}
      </Space>
    )},
  ];
  const filteredActivities = ACTIVITIES.filter(a => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (scopeFilter !== 'all' && a.scopeType !== scopeFilter) return false;

    // 参与范围详细筛选
    if (scopeDetailFilter) {
      if (scopeFilter === 'region' && a.scopeType === 'region') {
        const regionCode = scopeDetailFilter[scopeDetailFilter.length - 1];
        if (!a.scopeDetail || !a.scopeDetail.includes(regionCode)) return false;
      }
      if (scopeFilter === 'org' && a.scopeType === 'org') {
        if (!a.scopeDetail || !scopeDetailFilter.some((id: number) => a.scopeDetail.includes(id))) return false;
      }
      if (scopeFilter === 'circle' && a.scopeType === 'circle') {
        if (!a.scopeDetail || !scopeDetailFilter.some((id: number) => a.scopeDetail.includes(id))) return false;
      }
    }

    if (timeRange && timeRange[0] && timeRange[1]) {
      const startTime = new Date(a.startTime);
      if (startTime < timeRange[0] || startTime > timeRange[1]) return false;
    }
    if (keyword && !a.title.includes(keyword) && !a.location.includes(keyword)) return false;
    return true;
  });

  if (selectedActivity) {
    return <ActivityDetailPage activity={selectedActivity} onBack={() => setSelectedActivity(null)} setActivePage={setActivePage} />;
  }

  const draftCount = ACTIVITIES.filter(a => a.status === 'draft').length;
  const pendingCount = ACTIVITIES.filter(a => a.status === 'pending').length;
  const ongoingCount = ACTIVITIES.filter(a => a.status === 'ongoing').length;
  const finishedCount = ACTIVITIES.filter(a => a.status === 'finished').length;
  const totalEnrollCount = ACTIVITIES.reduce((sum, a) => sum + a.enrollCount, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={4} style={{ margin: 0 }}>活动管理</Title>
      </div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic title="草稿活动" value={draftCount} suffix="个" valueStyle={{ color: '#999' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="未开始活动" value={pendingCount} suffix="个" valueStyle={{ color: '#1890ff' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="进行中活动" value={ongoingCount} suffix="个" valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="累计报名人数" value={totalEnrollCount} suffix="人" valueStyle={{ color: PRIMARY }} />
          </Card>
        </Col>
      </Row>
      <Card className="page-card" style={{ padding: 16 }}>
        <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Select placeholder="状态筛选" value={statusFilter} onChange={setStatusFilter} style={{ width: 120 }}>
            <Select.Option value="all">全部状态</Select.Option>
            <Select.Option value="draft">草稿</Select.Option>
            <Select.Option value="pending">未开始</Select.Option>
            <Select.Option value="ongoing">进行中</Select.Option>
            <Select.Option value="finished">已结束</Select.Option>
            <Select.Option value="offline">已下架</Select.Option>
          </Select>
          <Select placeholder="参与范围" value={scopeFilter} onChange={(val) => { setScopeFilter(val); setScopeDetailFilter(null); }} style={{ width: 120 }}>
            <Select.Option value="all">全部范围</Select.Option>
            <Select.Option value="all">全平台</Select.Option>
            <Select.Option value="region">按区域</Select.Option>
            <Select.Option value="org">按组织</Select.Option>
            <Select.Option value="circle">按圈子</Select.Option>
          </Select>
          {scopeFilter === 'region' && (
            <Select mode="multiple" placeholder="选择区域" value={scopeDetailFilter} onChange={setScopeDetailFilter} style={{ width: 200 }} options={[
              { value: '500103', label: '渝中区' },
              { value: '500108', label: '南岸区' },
              { value: '500105', label: '江北区' },
              { value: '500106', label: '沙坪坝区' },
              { value: '500107', label: '九龙坡区' },
              { value: '500104', label: '大渡口区' },
              { value: '500109', label: '北碚区' },
              { value: '500112', label: '渝北区' },
              { value: '500113', label: '巴南区' },
            ]} />
          )}
          {scopeFilter === 'org' && (
            <Select mode="multiple" placeholder="选择组织" value={scopeDetailFilter} onChange={setScopeDetailFilter} style={{ width: 200 }} options={[
              { value: 101, label: '渝中区老年大学' },
              { value: 102, label: '南岸区夕阳红协会' },
              { value: 103, label: '沙坪坝区老年协会' },
              { value: 104, label: '江北区长者中心' },
              { value: 105, label: '渝北区老年活动中心' },
            ]} />
          )}
          {scopeFilter === 'circle' && (
            <Select mode="multiple" placeholder="选择圈子" value={scopeDetailFilter} onChange={setScopeDetailFilter} style={{ width: 200 }} options={CIRCLES.filter(c => c.status === 'normal').map(c => ({
              value: c.id,
              label: c.name,
            }))} />
          )}
          <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} value={timeRange} onChange={setTimeRange} style={{ width: 280 }} />
          <Input.Search placeholder="搜索活动名称/地点" value={keyword} onChange={e => setKeyword(e.target.value)} style={{ width: 200 }} allowClear />
          <Button icon={<ReloadOutlined />} onClick={() => { setStatusFilter('all'); setScopeFilter('all'); setScopeDetailFilter(null); setTimeRange(null); setKeyword(''); }}>重置</Button>
          <Button type="primary" icon={<PlusOutlined />} style={{ background: PRIMARY, borderColor: PRIMARY }}
            onClick={() => { setScopeType('all'); setEditingActivity(null); activityForm.resetFields(); setModalOpen(true); }}>新建活动</Button>
          <span style={{ lineHeight: '32px', color: '#999', marginLeft: 'auto' }}>共 {filteredActivities.length} 条结果</span>
        </div>
        <Table dataSource={filteredActivities} columns={cols} rowKey="id"
          pagination={{ pageSize: 10 }} />
      </Card>
      <Modal title={editingActivity ? '编辑活动' : '新建活动'} open={modalOpen} onCancel={() => setModalOpen(false)} width={640}
        footer={<Space>
          <Button onClick={() => setModalOpen(false)}>取消</Button>
          <Button onClick={() => { message.success('活动已保存为草稿'); setModalOpen(false); }}>保存为草稿</Button>
          <Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }} onClick={() => { message.success('活动已保存并发布'); setModalOpen(false); }}>保存并发布</Button>
        </Space>}>
        <Form layout="vertical" form={activityForm}>
          <Form.Item label="活动名称" name="title" rules={[{ required: true, message: '请输入活动名称' }]}>
            <Input placeholder="请输入活动名称" maxLength={50} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="开始时间" name="startTime" rules={[{ required: true, message: '请选择开始时间' }]}>
                <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="结束时间" name="endTime" rules={[{ required: true, message: '请选择结束时间' }]}>
                <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="活动地点" name="location" rules={[{ required: true, message: '请输入活动地点' }]}>
            <Input placeholder="请输入活动地点" />
          </Form.Item>
          <Form.Item label="最大报名人数" name="maxEnroll" rules={[{ required: true, message: '请输入最大报名人数' }]}>
            <InputNumber min={1} placeholder="请输入人数上限" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="参与范围" name="scopeType" rules={[{ required: true, message: '请选择参与范围' }]}>
            <Radio.Group onChange={e => setScopeType(e.target.value)}>
              <Radio value="all">全平台</Radio>
              <Radio value="region">按区域</Radio>
              <Radio value="org">按组织</Radio>
              <Radio value="circle">按圈子</Radio>
            </Radio.Group>
            <div style={{ marginTop: 12 }}>
              {scopeType === 'region' && (
                <Cascader
                  options={[
                    { value: 'yuzhong', label: '渝中区', children: [
                      { value: 'jiefangbei', label: '解放碑街道' },
                      { value: 'chaotianmen', label: '朝天门街道' },
                    ]},
                    { value: 'nanan', label: '南岸区', children: [
                      { value: 'nanping', label: '南坪街道' },
                      { value: 'nanshan', label: '南山街道' },
                    ]},
                    { value: 'jiangbei', label: '江北区', children: [
                      { value: 'guanyinqiao', label: '观音桥街道' },
                      { value: 'jiangbeizui', label: '江北嘴街道' },
                    ]},
                  ]}
                  placeholder="请选择区域"
                  multiple
                  maxTagCount="responsive"
                  style={{ width: '100%' }}
                />
              )}
              {scopeType === 'org' && (
                <Transfer
                  dataSource={[
                    { key: 'org1', title: '渝中区老年大学' },
                    { key: 'org2', title: '南岸区夕阳红协会' },
                    { key: 'org3', title: '江北区文化中心' },
                    { key: 'org4', title: '九龙坡区社区服务中心' },
                  ]}
                  titles={['可选组织', '已选组织']}
                  targetKeys={[]}
                  render={item => item.title}
                  listStyle={{ width: 240, height: 300 }}
                  showSearch
                  filterOption={(inputValue, item) => item.title.indexOf(inputValue) !== -1}
                  locale={{ itemUnit: '项', itemsUnit: '项' }}
                />
              )}
              {scopeType === 'circle' && (
                <Select
                  mode="multiple"
                  placeholder="请选择圈子"
                  style={{ width: '100%' }}
                  maxTagCount="responsive"
                  options={[
                    { value: 'circle1', label: '广场舞爱好者圈' },
                    { value: 'circle2', label: '养生交流圈' },
                    { value: 'circle3', label: '书法艺术圈' },
                    { value: 'circle4', label: '摄影分享圈' },
                    { value: 'circle5', label: '健康生活圈' },
                  ]}
                />
              )}
            </div>
          </Form.Item>
          <Form.Item label="活动简介" name="description" rules={[{ required: true, message: '请输入活动简介' }]}>
            <Input.TextArea rows={4} placeholder="请输入活动简介" maxLength={500} showCount />
          </Form.Item>
          <Form.Item label="宣传图片" name="promotionalImages">
            <div>
              <Button icon={<UploadOutlined />}>上传图片</Button>
              <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
                建议尺寸：750x400，支持 JPG、PNG 格式，最多上传 3 张
              </div>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// ─── 活动详情页 ────────────────────────────────────────────
const ActivityDetailPage: React.FC<{ activity: any; onBack: () => void; setActivePage?: (page: string) => void }> = ({ activity, onBack, setActivePage }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [editingActivity, setEditingActivity] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [scopeType, setScopeType] = useState<'all'|'region'|'org'|'circle'>('all');
  const [activityForm] = Form.useForm();

  const statusMap: Record<string, {color:string;label:string}> = {
    draft: { color: 'default', label: '草稿' },
    pending: { color: 'blue', label: '未开始' },
    ongoing: { color: 'success', label: '进行中' },
    finished: { color: 'default', label: '已结束' },
    offline: { color: 'warning', label: '已下架' },
  };

  const enrollments = ACTIVITY_ENROLLMENTS[activity.id] || [];
  const enrollStatusMap: Record<string, {color:string;label:string}> = {
    confirmed: { color: 'success', label: '已确认' },
    pending: { color: 'warning', label: '待确认' },
  };

  const enrollCols = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '用户昵称', dataIndex: 'nickname', render: (text: string, row: any) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar size={32} style={{ background: PRIMARY }}>{text[0]}</Avatar>
        <span>{text}</span>
      </div>
    )},
    { title: '手机号', dataIndex: 'phone' },
    { title: '所在地区', dataIndex: 'region' },
    { title: '报名时间', dataIndex: 'enrollTime' },
    { title: '状态', dataIndex: 'status', render: (v: string) =>
      <Tag color={enrollStatusMap[v]?.color}>{enrollStatusMap[v]?.label}</Tag> },
    { title: '操作', render: (_: any, row: any) => (
      <Space size="small">
        <Button size="small" type="link" onClick={() => {
          const user = USERS.find(u => u.id === row.userId);
          if (user) {
            (window as any).__selectedUser = user;
            setActivePage?.('user');
          } else {
            message.error('用户不存在');
          }
        }}>查看用户</Button>
        {row.status === 'pending' && (
          <Popconfirm title="确认该用户报名？" onConfirm={() => message.success('已确认报名')}>
            <Button size="small" type="link" style={{ color: '#52c41a' }}>确认</Button>
          </Popconfirm>
        )}
      </Space>
    )},
  ];

  return (
    <div>
      <div className="flex items-center mb-4">
        <Button icon={<ArrowLeftOutlined />} onClick={onBack} style={{ marginRight: 16 }}>返回</Button>
        <Title level={4} style={{ margin: 0, marginRight: 12 }}>{activity.title}</Title>
        <Tag color={statusMap[activity.status]?.color}>{statusMap[activity.status]?.label}</Tag>
      </div>
      <Card className="page-card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <Row gutter={[24, 16]}>
              <Col span={12}>
                <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>活动时间</div>
                <div>{activity.startTime} ~ {activity.endTime}</div>
              </Col>
              <Col span={12}>
                <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>活动地点</div>
                <div>{activity.location}</div>
              </Col>
              <Col span={12}>
                <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>参与范围</div>
                <div><Tag color={activity.scopeType==='all'?'blue':activity.scopeType==='region'?'orange':'purple'}>{activity.scope}</Tag></div>
              </Col>
              <Col span={12}>
                <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>报名情况</div>
                <div style={{ marginBottom: 4 }}>{activity.enrollCount} / {activity.maxEnroll} 人</div>
                <Progress percent={Math.round((activity.enrollCount / activity.maxEnroll) * 100)} strokeColor={PRIMARY} />
              </Col>
              <Col span={12}>
                <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>创建人</div>
                <div>{activity.creator}</div>
              </Col>
              <Col span={12}>
                <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>创建时间</div>
                <div>{activity.createTime}</div>
              </Col>
              {activity.publishTime && (
                <Col span={12}>
                  <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>发布时间</div>
                  <div>{activity.publishTime}</div>
                </Col>
              )}
            </Row>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>活动简介</div>
              <div style={{ background: '#fafafa', padding: 12, borderRadius: 4, lineHeight: 1.8, fontSize: 13 }}>{activity.description}</div>
            </div>
            {activity.promotionalImages && activity.promotionalImages.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>宣传图片</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {activity.promotionalImages.map((img: string, idx: number) => (
                    <img key={idx} src={img} alt={`宣传图${idx+1}`} style={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 4 }} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <Space>
              {activity.status === 'draft' && (
                <>
                  <Button icon={<EditOutlined />} onClick={() => {
                    setEditingActivity(activity);
                    setScopeType(activity.scopeType || 'all');
                    activityForm.setFieldsValue({
                      ...activity,
                      startTime: activity.startTime ? dayjs(activity.startTime, 'YYYY-MM-DD HH:mm') : null,
                      endTime: activity.endTime ? dayjs(activity.endTime, 'YYYY-MM-DD HH:mm') : null,
                    });
                    setModalOpen(true);
                  }}>编辑</Button>
                  <Popconfirm title="确认开始该活动？" onConfirm={() => message.success('活动已开始')}>
                    <Button type="primary" style={{ background: '#52c41a', borderColor: '#52c41a' }}>开始活动</Button>
                  </Popconfirm>
                  <Popconfirm title="确认删除该活动？" onConfirm={() => { message.success('活动已删除'); onBack(); }}>
                    <Button danger>删除</Button>
                  </Popconfirm>
                </>
              )}
              {activity.status === 'pending' && (
                <>
                  <Button icon={<EditOutlined />} onClick={() => {
                    setEditingActivity(activity);
                    setScopeType(activity.scopeType || 'all');
                    activityForm.setFieldsValue({
                      ...activity,
                      startTime: activity.startTime ? dayjs(activity.startTime, 'YYYY-MM-DD HH:mm') : null,
                      endTime: activity.endTime ? dayjs(activity.endTime, 'YYYY-MM-DD HH:mm') : null,
                    });
                    setModalOpen(true);
                  }}>编辑</Button>
                  <Popconfirm title="确认开始该活动？" onConfirm={() => message.success('活动已开始')}>
                    <Button type="primary" style={{ background: '#52c41a', borderColor: '#52c41a' }}>开始活动</Button>
                  </Popconfirm>
                  <Popconfirm title="确认下架该活动？" onConfirm={() => message.success('活动已下架')}>
                    <Button style={{ color: '#faad14', borderColor: '#faad14' }}>下架活动</Button>
                  </Popconfirm>
                </>
              )}
              {activity.status === 'ongoing' && (
                <>
                  <Button icon={<EditOutlined />} onClick={() => {
                    setEditingActivity(activity);
                    setScopeType(activity.scopeType || 'all');
                    activityForm.setFieldsValue({
                      ...activity,
                      startTime: activity.startTime ? dayjs(activity.startTime, 'YYYY-MM-DD HH:mm') : null,
                      endTime: activity.endTime ? dayjs(activity.endTime, 'YYYY-MM-DD HH:mm') : null,
                    });
                    setModalOpen(true);
                  }}>编辑</Button>
                  <Popconfirm title="确认结束该活动？" onConfirm={() => message.success('活动已结束')}>
                    <Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }}>结束活动</Button>
                  </Popconfirm>
                  <Popconfirm title="确认下架该活动？" onConfirm={() => message.success('活动已下架')}>
                    <Button style={{ color: '#faad14', borderColor: '#faad14' }}>下架活动</Button>
                  </Popconfirm>
                </>
              )}
              {activity.status === 'finished' && (
                <>
                  <Button icon={<EditOutlined />} onClick={() => {
                    setEditingActivity(activity);
                    setScopeType(activity.scopeType || 'all');
                    activityForm.setFieldsValue({
                      ...activity,
                      startTime: activity.startTime ? dayjs(activity.startTime, 'YYYY-MM-DD HH:mm') : null,
                      endTime: activity.endTime ? dayjs(activity.endTime, 'YYYY-MM-DD HH:mm') : null,
                    });
                    setModalOpen(true);
                  }}>编辑</Button>
                  <Popconfirm title="确认删除该活动？" onConfirm={() => { message.success('活动已删除'); onBack(); }}>
                    <Button danger>删除活动</Button>
                  </Popconfirm>
                  <Popconfirm title="确认下架该活动？" onConfirm={() => message.success('活动已下架')}>
                    <Button style={{ color: '#faad14', borderColor: '#faad14' }}>下架活动</Button>
                  </Popconfirm>
                </>
              )}
              {activity.status === 'offline' && (
                <>
                  <Button icon={<EditOutlined />} onClick={() => {
                    setEditingActivity(activity);
                    setScopeType(activity.scopeType || 'all');
                    activityForm.setFieldsValue({
                      ...activity,
                      startTime: activity.startTime ? dayjs(activity.startTime, 'YYYY-MM-DD HH:mm') : null,
                      endTime: activity.endTime ? dayjs(activity.endTime, 'YYYY-MM-DD HH:mm') : null,
                    });
                    setModalOpen(true);
                  }}>编辑</Button>
                  <Popconfirm title="确认删除该活动？" onConfirm={() => { message.success('活动已删除'); onBack(); }}>
                    <Button danger>删除活动</Button>
                  </Popconfirm>
                  <Popconfirm title="确认重新发布该活动？" onConfirm={() => message.success('活动已重新发布')}>
                    <Button type="primary" style={{ background: '#52c41a', borderColor: '#52c41a' }}>重新发布</Button>
                  </Popconfirm>
                </>
              )}
            </Space>
          </div>
        </div>
      </Card>
      <Card className="page-card">
        <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 16 }}>报名成员 ({enrollments.length})</div>
        <Table dataSource={enrollments} columns={enrollCols} rowKey="id" pagination={{ pageSize: 20 }} />
      </Card>
      <Modal title={editingActivity ? '编辑活动' : '新建活动'} open={modalOpen} onCancel={() => setModalOpen(false)} width={640}
        footer={<Space>
          <Button onClick={() => setModalOpen(false)}>取消</Button>
          <Button onClick={() => { message.success('活动已保存为草稿'); setModalOpen(false); }}>保存为草稿</Button>
          <Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }} onClick={() => { message.success('活动已保存并发布'); setModalOpen(false); }}>保存并发布</Button>
        </Space>}>
        <Form layout="vertical" form={activityForm}>
          <Form.Item label="活动名称" name="title" rules={[{ required: true, message: '请输入活动名称' }]}>
            <Input placeholder="请输入活动名称" maxLength={50} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="开始时间" name="startTime" rules={[{ required: true, message: '请选择开始时间' }]}>
                <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="结束时间" name="endTime" rules={[{ required: true, message: '请选择结束时间' }]}>
                <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="活动地点" name="location" rules={[{ required: true, message: '请输入活动地点' }]}>
            <Input placeholder="请输入活动地点" />
          </Form.Item>
          <Form.Item label="最大报名人数" name="maxEnroll" rules={[{ required: true, message: '请输入最大报名人数' }]}>
            <InputNumber min={1} placeholder="请输入人数上限" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="参与范围" name="scopeType" rules={[{ required: true, message: '请选择参与范围' }]}>
            <Radio.Group onChange={e => setScopeType(e.target.value)}>
              <Radio value="all">全平台</Radio>
              <Radio value="region">按区域</Radio>
              <Radio value="org">按组织</Radio>
              <Radio value="circle">按圈子</Radio>
            </Radio.Group>
            <div style={{ marginTop: 12 }}>
              {scopeType === 'region' && (
                <Cascader
                  options={[
                    { value: 'yuzhong', label: '渝中区', children: [
                      { value: 'jiefangbei', label: '解放碑街道' },
                      { value: 'chaotianmen', label: '朝天门街道' },
                    ]},
                    { value: 'nanan', label: '南岸区', children: [
                      { value: 'nanping', label: '南坪街道' },
                      { value: 'nanshan', label: '南山街道' },
                    ]},
                    { value: 'jiangbei', label: '江北区', children: [
                      { value: 'guanyinqiao', label: '观音桥街道' },
                      { value: 'jiangbeizui', label: '江北嘴街道' },
                    ]},
                  ]}
                  placeholder="请选择区域"
                  multiple
                  maxTagCount="responsive"
                  style={{ width: '100%' }}
                />
              )}
              {scopeType === 'org' && (
                <Transfer
                  dataSource={[
                    { key: 'org1', title: '渝中区老年大学' },
                    { key: 'org2', title: '南岸区夕阳红协会' },
                    { key: 'org3', title: '江北区文化中心' },
                    { key: 'org4', title: '九龙坡区社区服务中心' },
                  ]}
                  titles={['可选组织', '已选组织']}
                  targetKeys={[]}
                  render={item => item.title}
                  listStyle={{ width: 240, height: 300 }}
                  showSearch
                  filterOption={(inputValue, item) => item.title.indexOf(inputValue) !== -1}
                  locale={{ itemUnit: '项', itemsUnit: '项' }}
                />
              )}
              {scopeType === 'circle' && (
                <Select
                  mode="multiple"
                  placeholder="请选择圈子"
                  style={{ width: '100%' }}
                  maxTagCount="responsive"
                  options={[
                    { value: 'circle1', label: '广场舞爱好者圈' },
                    { value: 'circle2', label: '养生交流圈' },
                    { value: 'circle3', label: '书法艺术圈' },
                    { value: 'circle4', label: '摄影分享圈' },
                    { value: 'circle5', label: '健康生活圈' },
                  ]}
                />
              )}
            </div>
          </Form.Item>
          <Form.Item label="活动简介" name="description" rules={[{ required: true, message: '请输入活动简介' }]}>
            <Input.TextArea rows={4} placeholder="请输入活动简介" maxLength={500} showCount />
          </Form.Item>
          <Form.Item label="宣传图片" name="promotionalImages">
            <div>
              <Button icon={<UploadOutlined />}>上传图片</Button>
              <div style={{ color: '#999', fontSize: 12, marginTop: 4 }}>
                建议尺寸：750x400，支持 JPG、PNG 格式，最多上传 3 张
              </div>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// ─── 服务管理（方案A：服务订单 + 服务商管理）────────────────
const ServiceOrderPage: React.FC = () => {
  const [serviceTab, setServiceTab] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [dateRange, setDateRange] = useState<any>(null);
  const [orderDetailModal, setOrderDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const services = ['助餐', '助浴', '助洁', '助医', '助急', '助行', '疗养', '活动'];
  const mockOrders = [
    { id: 'SO202604001', user: '张大爷', phone: '138****1234', address: '渝中区解放碑街道108号', time: '2026-04-06 09:00', status: 'pending', service: '助餐', provider: '渝中区爱心助餐中心', amount: 25 },
    { id: 'SO202604002', user: '李奶奶', phone: '139****5678', address: '南岸区南坪街道56号', time: '2026-04-05 14:30', status: 'done', service: '助浴', provider: '南岸区暖心护理服务', amount: 80 },
    { id: 'SO202604003', user: '赵阿姨', phone: '136****3456', address: '沙坪坝区三峡广场22号', time: '2026-04-04 10:00', status: 'cancelled', service: '助洁', provider: '洁家帮家政服务', amount: 120 },
    { id: 'SO202604004', user: '王大爷', phone: '137****7890', address: '江北区观音桥街道88号', time: '2026-04-06 08:00', status: 'pending', service: '助医', provider: '重庆三甲陪诊服务', amount: 200 },
    { id: 'SO202604005', user: '陈大妈', phone: '135****9012', address: '九龙坡区杨家坪街道15号', time: '2026-04-05 16:00', status: 'processing', service: '助餐', provider: '渝中区爱心助餐中心', amount: 25 },
    { id: 'SO202604006', user: '刘师傅', phone: '134****3456', address: '渝北区新南路街道33号', time: '2026-04-04 11:00', status: 'done', service: '助行', provider: '安心出行专车', amount: 50 },
    { id: 'SO202604007', user: '周大爷', phone: '133****7890', address: '北碚区天生街道72号', time: '2026-04-03 09:30', status: 'done', service: '疗养', provider: '巴渝颐养疗养院', amount: 350 },
    { id: 'SO202604008', user: '吴奶奶', phone: '132****2345', address: '大渡口区九宫庙街道44号', time: '2026-04-06 15:00', status: 'pending', service: '助急', provider: '急救先锋应急服务', amount: 150 },
  ];

  const orderStatusMap: Record<string, { color: string; label: string }> = {
    pending: { color: 'warning', label: '待处理' },
    processing: { color: 'processing', label: '进行中' },
    done: { color: 'success', label: '已完成' },
    cancelled: { color: 'error', label: '已取消' },
  };

  const filteredOrders = mockOrders.filter(o => {
    if (serviceTab !== 'all' && o.service !== serviceTab) return false;
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (keyword) {
      const kw = keyword.toLowerCase();
      if (!o.id.toLowerCase().includes(kw) &&
          !o.user.includes(keyword) &&
          !o.phone.includes(keyword) &&
          !o.address.includes(keyword) &&
          !o.provider.includes(keyword)) return false;
    }
    if (dateRange && dateRange[0] && dateRange[1]) {
      const orderDate = new Date(o.time);
      if (orderDate < dateRange[0] || orderDate > dateRange[1]) return false;
    }
    return true;
  });

  const stats = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    done: mockOrders.filter(o => o.status === 'done').length,
  };

  const orderCols = [
    { title: '序号', width: 60, render: (_: any, __: any, index: number) => index + 1 },
    { title: '订单编号', dataIndex: 'id', width: 120 },
    { title: '服务类型', dataIndex: 'service', width: 90, render: (v: string) => <Tag color="orange">{v}</Tag> },
    { title: '服务商', dataIndex: 'provider', width: 160 },
    { title: '用户', dataIndex: 'user', width: 80 },
    { title: '手机号', dataIndex: 'phone', width: 120 },
    { title: '服务地址', dataIndex: 'address', ellipsis: true },
    { title: '预约时间', dataIndex: 'time', width: 150 },
    { title: '金额', dataIndex: 'amount', width: 80, render: (v: number) => <span style={{ color: PRIMARY, fontWeight: 600 }}>¥{v}</span> },
    { title: '状态', dataIndex: 'status', width: 90, render: (v: string) => <Tag color={orderStatusMap[v]?.color}>{orderStatusMap[v]?.label}</Tag> },
    { title: '操作', width: 120, render: (_: any, row: any) => (
      <Space>
        <Button size="small" icon={<EyeOutlined />} onClick={() => { setSelectedOrder(row); setOrderDetailModal(true); }}>详情</Button>
      </Space>
    )},
  ];

  return (
    <div>
      <Title level={4} className="mb-4">服务订单</Title>

      {/* 订单统计卡片 */}
      <Row gutter={16} className="mb-4">
        <Col span={6}>
          <Card className="kpi-card" size="small">
            <Statistic title="总订单数" value={stats.total} prefix={<ShoppingOutlined style={{ color: PRIMARY }} />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="kpi-card" size="small">
            <Statistic title="待处理" value={stats.pending} valueStyle={{ color: '#faad14' }} prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="kpi-card" size="small">
            <Statistic title="进行中" value={stats.processing} valueStyle={{ color: '#1890ff' }} prefix={<PlayCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="kpi-card" size="small">
            <Statistic title="已完成" value={stats.done} valueStyle={{ color: '#52c41a' }} prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card className="page-card" style={{ padding: 0 }}>
        {/* 服务类型 Tab */}
        <Tabs activeKey={serviceTab} onChange={setServiceTab} style={{ padding: '0 16px' }}
          items={[{ key: 'all', label: '全部' }, ...services.map(s => ({ key: s, label: s }))]} />

        {/* 筛选条件 */}
        <div style={{ padding: '16px 16px 0' }}>
          <div className="flex gap-3 items-center flex-wrap mb-3">
            <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 120 }}>
              <Select.Option value="all">全部状态</Select.Option>
              <Select.Option value="pending">待处理</Select.Option>
              <Select.Option value="processing">进行中</Select.Option>
              <Select.Option value="done">已完成</Select.Option>
              <Select.Option value="cancelled">已取消</Select.Option>
            </Select>
            <DatePicker.RangePicker value={dateRange} onChange={setDateRange} placeholder={['开始日期', '结束日期']} style={{ width: 280 }} />
            <Input.Search placeholder="搜索订单号/用户/服务商" value={keyword} onChange={e => setKeyword(e.target.value)} onSearch={setKeyword} style={{ width: 220 }} allowClear />
            <Button icon={<ReloadOutlined />} onClick={() => { setStatusFilter('all'); setKeyword(''); setDateRange(null); }}>重置</Button>
            <span style={{ marginLeft: 'auto', color: '#999' }}>共 <Text strong>{filteredOrders.length}</Text> 条订单</span>
          </div>
        </div>

        <Table dataSource={filteredOrders} columns={orderCols} rowKey="id" pagination={{ pageSize: 10 }} size="middle" />
      </Card>

      {/* 订单详情 Modal */}
      <Modal title="订单详情" open={orderDetailModal} onCancel={() => setOrderDetailModal(false)} width={560} footer={null}>
        {selectedOrder && (
          <div>
            <Card size="small" className="mb-3" title="订单信息">
              <Row gutter={16}>
                <Col span={12}><Text type="secondary">订单编号：</Text><Text strong>{selectedOrder.id}</Text></Col>
                <Col span={12}><Text type="secondary">预约时间：</Text><Text strong>{selectedOrder.time}</Text></Col>
                <Col span={12}><Text type="secondary">服务类型：</Text><Tag color="orange">{selectedOrder.service}</Tag></Col>
                <Col span={12}><Text type="secondary">订单金额：</Text><Text strong style={{ color: PRIMARY }}>¥{selectedOrder.amount}</Text></Col>
              </Row>
            </Card>
            <Card size="small" className="mb-3" title="用户信息">
              <Row gutter={16}>
                <Col span={12}><Text type="secondary">用户姓名：</Text><Text strong>{selectedOrder.user}</Text></Col>
                <Col span={12}><Text type="secondary">手机号码：</Text><Text strong>{selectedOrder.phone}</Text></Col>
                <Col span={24}><Text type="secondary">服务地址：</Text><Text>{selectedOrder.address}</Text></Col>
              </Row>
            </Card>
            <Card size="small" className="mb-3" title="服务商信息">
              <Row gutter={16}>
                <Col span={24}><Text type="secondary">服务商名称：</Text><Text strong>{selectedOrder.provider}</Text></Col>
              </Row>
            </Card>
            <Card size="small" title="订单状态">
              <div className="flex items-center gap-3">
                <Tag color={orderStatusMap[selectedOrder.status]?.color} style={{ fontSize: 14, padding: '4px 12px' }}>
                  {orderStatusMap[selectedOrder.status]?.label}
                </Tag>
                {selectedOrder.status === 'pending' && (
                  <Space>
                    <Popconfirm title="确认开始处理该订单？" onConfirm={() => message.success('订单已开始处理')}>
                      <Button type="primary" size="small" style={{ background: '#1890ff', borderColor: '#1890ff' }}>开始处理</Button>
                    </Popconfirm>
                    <Popconfirm title="确认取消该订单？" onConfirm={() => message.success('订单已取消')}>
                      <Button size="small" danger>取消订单</Button>
                    </Popconfirm>
                  </Space>
                )}
                {selectedOrder.status === 'processing' && (
                  <Popconfirm title="确认完成该订单？" onConfirm={() => message.success('订单已完成')}>
                    <Button type="primary" size="small" style={{ background: '#52c41a', borderColor: '#52c41a' }}>确认完成</Button>
                  </Popconfirm>
                )}
              </div>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ─── 服务商管理 ────────────────────────────────────────────
const ServiceProviderPage: React.FC = () => {
  const [providerModal, setProviderModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [form] = Form.useForm();

  const services = ['助餐', '助浴', '助洁', '助医', '助急', '助行', '疗养', '活动'];

  const filteredProviders = PROVIDERS.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (serviceTypeFilter !== 'all' && p.service !== serviceTypeFilter) return false;
    if (keyword) {
      if (!p.name.includes(keyword) && !p.contact.includes(keyword) && !p.region.includes(keyword)) return false;
    }
    return true;
  });

  const stats = {
    total: PROVIDERS.length,
    active: PROVIDERS.filter(p => p.status === 'active').length,
    inactive: PROVIDERS.filter(p => p.status === 'inactive').length,
  };

  const providerCols = [
    { title: '序号', width: 60, render: (_: any, __: any, index: number) => index + 1 },
    { title: '服务商名称', dataIndex: 'name', width: 180 },
    { title: '服务类型', dataIndex: 'service', width: 90, render: (v: string) => <Tag color="orange">{v}</Tag> },
    { title: '联系方式', dataIndex: 'contact', width: 130 },
    { title: '服务区域', dataIndex: 'region', width: 100 },
    { title: '评分', dataIndex: 'rating', width: 80, render: (v: number) => <span style={{ color: '#faad14', fontWeight: 600 }}>★ {v}</span> },
    { title: '订单数', dataIndex: 'orderCount', width: 80 },
    { title: '入驻时间', dataIndex: 'createTime', width: 120 },
    { title: '状态', dataIndex: 'status', width: 90, render: (v: string) =>
      <Tag color={v === 'active' ? 'success' : 'default'}>{v === 'active' ? '正常' : '已停用'}</Tag> },
    { title: '操作', width: 150, render: (_: any, row: any) => (
      <Space>
        <Button size="small" icon={<EyeOutlined />} onClick={() => { setSelectedProvider(row); form.setFieldsValue(row); setProviderModal(true); }}>查看</Button>
        <Popconfirm title={row.status === 'active' ? '确认停用该服务商？' : '确认启用该服务商？'} onConfirm={() => message.success(row.status === 'active' ? '服务商已停用' : '服务商已启用')}>
          <Button size="small" danger={row.status === 'active'} type="text">{row.status === 'active' ? '停用' : '启用'}</Button>
        </Popconfirm>
      </Space>
    )},
  ];

  return (
    <div>
      <Title level={4} className="mb-4">服务商管理</Title>

      {/* 统计卡片 */}
      <Row gutter={16} className="mb-4">
        <Col span={8}>
          <Card className="kpi-card" size="small">
            <Statistic title="服务商总数" value={stats.total} prefix={<ShopOutlined style={{ color: PRIMARY }} />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="kpi-card" size="small">
            <Statistic title="正常运营" value={stats.active} valueStyle={{ color: '#52c41a' }} prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="kpi-card" size="small">
            <Statistic title="已停用" value={stats.inactive} valueStyle={{ color: '#999' }} prefix={<StopOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card className="page-card" style={{ padding: 0 }}>
        <div style={{ padding: '16px 16px 0' }}>
          <div className="flex gap-3 items-center flex-wrap mb-3">
            <Button type="primary" size="small" icon={<PlusOutlined />} style={{ background: PRIMARY, borderColor: PRIMARY }}
              onClick={() => { setSelectedProvider(null); form.resetFields(); setProviderModal(true); }}>新增服务商</Button>
            <Select value={statusFilter} onChange={setStatusFilter} style={{ width: 120 }}>
              <Select.Option value="all">全部状态</Select.Option>
              <Select.Option value="active">正常</Select.Option>
              <Select.Option value="inactive">已停用</Select.Option>
            </Select>
            <Select value={serviceTypeFilter} onChange={setServiceTypeFilter} style={{ width: 120 }}>
              <Select.Option value="all">全部类型</Select.Option>
              {services.map(s => <Select.Option key={s} value={s}>{s}</Select.Option>)}
            </Select>
            <Input.Search placeholder="搜索名称/联系方式/区域" value={keyword} onChange={e => setKeyword(e.target.value)} onSearch={setKeyword} style={{ width: 220 }} allowClear />
            <Button icon={<ReloadOutlined />} onClick={() => { setStatusFilter('all'); setServiceTypeFilter('all'); setKeyword(''); }}>重置</Button>
            <span style={{ marginLeft: 'auto', color: '#999' }}>共 <Text strong>{filteredProviders.length}</Text> 家服务商</span>
          </div>
        </div>

        <Table dataSource={filteredProviders} columns={providerCols} rowKey="id" pagination={{ pageSize: 10 }} size="middle" />
      </Card>

      {/* 新增/编辑/查看服务商 Modal */}
      <Modal
        title={selectedProvider ? (selectedProvider._viewOnly ? '服务商详情' : '编辑服务商') : '新增服务商'}
        open={providerModal}
        onCancel={() => setProviderModal(false)}
        width={480}
        footer={selectedProvider?._viewOnly ? (
          <Button onClick={() => setProviderModal(false)}>关闭</Button>
        ) : (
          <Space>
            <Button onClick={() => setProviderModal(false)}>取消</Button>
            <Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }} onClick={() => { form.validateFields().then(() => message.success(selectedProvider ? '服务商信息已更新' : '服务商添加成功')); setProviderModal(false); }}>保存</Button>
          </Space>
        )}
      >
        <Form form={form} layout="vertical" initialValues={selectedProvider ? { ...selectedProvider, _viewOnly: undefined } : {}}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="服务商名称" name="name" rules={[{ required: true, message: '请输入服务商名称' }]}>
                <Input placeholder="请输入服务商名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="服务类型" name="service" rules={[{ required: true, message: '请选择服务类型' }]}>
                <Select placeholder="请选择">
                  {services.map(s => <Select.Option key={s} value={s}>{s}</Select.Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系方式" name="contact" rules={[{ required: true, message: '请输入联系方式' }]}>
                <Input placeholder="请输入联系方式" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="服务区域" name="region" rules={[{ required: true, message: '请输入服务区域' }]}>
                <Input placeholder="请输入服务区域" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="入驻时间" name="createTime">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          {selectedProvider?._viewOnly && (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="评分">
                  <Input disabled value={`★ ${selectedProvider.rating}`} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="订单数">
                  <Input disabled value={selectedProvider.orderCount} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="状态">
                  <Tag color={selectedProvider.status === 'active' ? 'success' : 'default'}>
                    {selectedProvider.status === 'active' ? '正常' : '已停用'}
                  </Tag>
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form>
      </Modal>
    </div>
  );
};

// ─── 积分管理 ──────────────────────────────────────────────
const PointsPage: React.FC = () => {
  const [tab, setTab] = useState('records');
  const [grantModal, setGrantModal] = useState(false);
  const [ruleModal, setRuleModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState<any>(null);

  const typeMap: Record<string, { color: string; label: string }> = {
    earn:  { color: 'success', label: '获得' },
    spend: { color: 'error',   label: '消耗' },
    admin: { color: 'processing', label: '手动发放' },
  };

  const filteredRecords = POINTS_RECORDS.filter(r => {
    if (typeFilter !== 'all' && r.type !== typeFilter) return false;
    if (search && !r.user.includes(search) && !r.phone.includes(search) && !r.reason.includes(search)) return false;
    return true;
  });

  const totalEarned = POINTS_RECORDS.filter(r => r.type === 'earn' || r.type === 'admin').reduce((sum, r) => sum + r.amount, 0);
  const totalSpent = POINTS_RECORDS.filter(r => r.type === 'spend').reduce((sum, r) => sum + r.amount, 0);
  const activeRules = POINT_RULES.filter(r => r.status === 'active').length;

  const resetFilters = () => {
    setSearch('');
    setTypeFilter('all');
    setDateRange(null);
  };

  const recordCols = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '用户', dataIndex: 'user' },
    { title: '手机号', dataIndex: 'phone' },
    { title: '类型', dataIndex: 'type', render: (v: string) =>
      <Tag color={typeMap[v]?.color}>{typeMap[v]?.label}</Tag> },
    { title: '积分变动', dataIndex: 'amount', render: (v: number, row: any) =>
      <span style={{ color: row.type === 'spend' ? '#ff4d4f' : '#52c41a', fontWeight: 600 }}>
        {row.type === 'spend' ? `-${v}` : `+${v}`}
      </span> },
    { title: '原因', dataIndex: 'reason' },
    { title: '时间', dataIndex: 'time' },
    { title: '余额', dataIndex: 'balance' },
  ];

  const ruleCols = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '触发行为', dataIndex: 'action' },
    { title: '获得积分', dataIndex: 'points', render: (v: number) =>
      <span style={{ color: PRIMARY, fontWeight: 600 }}>+{v}</span> },
    { title: '每日限制', dataIndex: 'limit' },
    { title: '状态', dataIndex: 'status', render: (v: string) =>
      <Tag color={v === 'active' ? 'success' : 'default'}>{v === 'active' ? '启用' : '停用'}</Tag> },
    { title: '操作', render: (_: any, row: any) => (
      <Space>
        <Button size="small" icon={<EditOutlined />} onClick={() => { setSelectedRule(row); setRuleModal(true); }}>编辑</Button>
        <Popconfirm title={row.status === 'active' ? '确认停用该规则？' : '确认启用该规则？'}>
          <Button size="small" danger={row.status === 'active'}>{row.status === 'active' ? '停用' : '启用'}</Button>
        </Popconfirm>
      </Space>
    )},
  ];

  return (
    <div>
      <Title level={4} className="mb-4">积分管理</Title>

      {/* 统计卡片 */}
      <Row gutter={16} className="mb-4">
        <Col span={6}>
          <Card className="kpi-card">
            <Statistic title="总记录数" value={POINTS_RECORDS.length} prefix={<FileTextOutlined style={{ color: PRIMARY }} />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="kpi-card">
            <Statistic title="累计发放" value={totalEarned} valueStyle={{ color: '#52c41a' }} prefix={<PlusCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="kpi-card">
            <Statistic title="累计消耗" value={totalSpent} valueStyle={{ color: '#ff4d4f' }} prefix={<MinusCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="kpi-card">
            <Statistic title="启用规则" value={activeRules} suffix={`/ ${POINT_RULES.length}`} valueStyle={{ color: PRIMARY }} prefix={<SettingOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card className="page-card" style={{ padding: 0 }}>
        <Tabs activeKey={tab} onChange={setTab} style={{ padding: '0 16px' }}
          tabBarExtraContent={
            tab === 'records' ? (
              <Button type="primary" size="small" icon={<PlusOutlined />} style={{ background: PRIMARY, borderColor: PRIMARY, marginBottom: 4 }}
                onClick={() => setGrantModal(true)}>手动发放积分</Button>
            ) : (
              <Button type="primary" size="small" icon={<PlusOutlined />} style={{ background: PRIMARY, borderColor: PRIMARY, marginBottom: 4 }}
                onClick={() => { setSelectedRule(null); setRuleModal(true); }}>新增规则</Button>
            )
          }
          items={[
            { key: 'records', label: '积分记录' },
            { key: 'rules', label: '积分规则' },
          ]}
        />
        <div style={{ padding: '0 16px 16px' }}>
          {tab === 'records' ? (
            <>
              {/* 积分记录筛选条件 */}
              <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <Select placeholder="类型筛选" value={typeFilter} onChange={setTypeFilter} style={{ width: 120 }}>
                  <Select.Option value="all">全部类型</Select.Option>
                  <Select.Option value="earn">获得</Select.Option>
                  <Select.Option value="spend">消耗</Select.Option>
                  <Select.Option value="admin">手动发放</Select.Option>
                </Select>
                <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} value={dateRange} onChange={setDateRange} style={{ width: 280 }} />
                <Input.Search placeholder="搜索用户/手机号/原因" value={search} onChange={e => setSearch(e.target.value)} style={{ width: 220 }} allowClear />
                <Button icon={<ReloadOutlined />} onClick={resetFilters}>重置</Button>
                <span style={{ marginLeft: 'auto', color: '#999', fontSize: 14 }}>共 {filteredRecords.length} 条结果</span>
              </div>
              <Table dataSource={filteredRecords} columns={recordCols} rowKey="id" pagination={{ pageSize: 10, showTotal: (t: number) => `共 ${t} 条` }} />
            </>
          ) : (
            <Table dataSource={POINT_RULES} columns={ruleCols} rowKey="id" pagination={false} />
          )}
        </div>
      </Card>

      {/* 手动发放积分 Modal */}
      <Modal title="手动发放积分" open={grantModal} onCancel={() => setGrantModal(false)} width={440}
        footer={<Space><Button onClick={() => setGrantModal(false)}>取消</Button>
          <Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }}>确认发放</Button></Space>}>
        <Form layout="vertical">
          <Form.Item label="目标用户">
            <Select showSearch placeholder="搜索用户昵称或手机号"
              options={USERS.map(u => ({ value: u.id, label: `${u.nickname}（${u.phone}）` }))} />
          </Form.Item>
          <Form.Item label="发放积分数"><Input type="number" placeholder="请输入积分数量" min={1} /></Form.Item>
          <Form.Item label="发放原因"><Input.TextArea rows={2} placeholder="请输入发放原因，将显示在积分记录中" /></Form.Item>
        </Form>
      </Modal>

      {/* 积分规则编辑 Modal */}
      <Modal title={selectedRule ? '编辑积分规则' : '新增积分规则'} open={ruleModal}
        onCancel={() => setRuleModal(false)} width={440}
        footer={<Space><Button onClick={() => setRuleModal(false)}>取消</Button>
          <Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }}>保存</Button></Space>}>
        <Form layout="vertical">
          <Form.Item label="触发行为"><Input placeholder="如：每日签到" defaultValue={selectedRule?.action} /></Form.Item>
          <Form.Item label="获得积分"><Input type="number" placeholder="请输入积分数" defaultValue={selectedRule?.points} /></Form.Item>
          <Form.Item label="每日限制说明"><Input placeholder="如：每天1次" defaultValue={selectedRule?.limit} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// ─── 消息推送 ────────────────────────────────────────────
const PushPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [targetFilter, setTargetFilter] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');
  const [dateRange, setDateRange] = useState<any>(null);
  const [targetType, setTargetType] = useState('all');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [targetOrgs, setTargetOrgs] = useState<string[]>([]);
  const [selectedCircles, setSelectedCircles] = useState<string[]>([]);

  const records = [
    { id: 1, title: '重阳节活动通知', target: '全体用户', creator: '张管理员', sendTime: '2026-10-01 09:00', status: 'sent' },
    { id: 2, title: '系统升级公告', target: '全体用户', creator: '李管理员', sendTime: '2026-03-20 18:00', status: 'sent' },
    { id: 3, title: '渝中区活动提醒', target: '渝中区老年大学', creator: '王管理员', sendTime: '2026-03-28 10:00', status: 'pending' },
    { id: 4, title: '健康讲座通知', target: '南岸区', creator: '张管理员', sendTime: '2026-04-05 14:00', status: 'cancelled' },
  ];

  const statusMap: Record<string, { color: string; label: string }> = {
    sent: { color: 'success', label: '已发送' },
    pending: { color: 'warning', label: '待发送' },
    cancelled: { color: 'default', label: '已取消' },
  };

  const orgTransferData = [
    { key: 'org1', title: '渝中区老年大学' },
    { key: 'org2', title: '南岸区夕阳红协会' },
    { key: 'org3', title: '江北区文化中心' },
    { key: 'org4', title: '九龙坡区社区服务中心' },
  ];

  const filteredRecords = records.filter(r => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (targetFilter.length > 0 && !targetFilter.some(t => r.target.includes(t))) return false;
    if (keyword && !r.title.includes(keyword)) return false;
    return true;
  });

  const resetFilters = () => {
    setStatusFilter('all');
    setTargetFilter([]);
    setKeyword('');
    setDateRange(null);
  };

  const cols = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '推送标题', dataIndex: 'title' },
    { title: '推送对象', dataIndex: 'target' },
    { title: '创建人', dataIndex: 'creator', width: 100 },
    { title: '发送时间', dataIndex: 'sendTime' },
    { title: '状态', dataIndex: 'status', render: (v: string) =>
      <Tag color={statusMap[v]?.color}>{statusMap[v]?.label}</Tag> },
    { title: '操作', width: 150, render: (_: any, row: any) => (
      <Space size="small">
        {row.status === 'pending' && (
          <>
            <Popconfirm title="确认发送该推送？" onConfirm={() => message.success('推送已发送')}>
              <Button size="small" type="link" style={{ color: '#52c41a' }}>发送</Button>
            </Popconfirm>
            <Popconfirm title="确认取消该推送？" onConfirm={() => message.success('推送已取消')}>
              <Button size="small" type="link" danger>取消</Button>
            </Popconfirm>
          </>
        )}
        {row.status === 'sent' && (
          <Text type="secondary" style={{ fontSize: 12 }}>已发送</Text>
        )}
        {row.status === 'cancelled' && (
          <Text type="secondary" style={{ fontSize: 12 }}>已取消</Text>
        )}
      </Space>
    )},
  ];

  return (
    <div>
      <Title level={4} className="mb-4">消息推送</Title>
      <Card className="page-card" style={{ padding: 16 }}>
        <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Select placeholder="状态筛选" value={statusFilter} onChange={setStatusFilter} style={{ width: 120 }}>
            <Select.Option value="all">全部状态</Select.Option>
            <Select.Option value="sent">已发送</Select.Option>
            <Select.Option value="pending">待发送</Select.Option>
            <Select.Option value="cancelled">已取消</Select.Option>
          </Select>
          <Select mode="multiple" placeholder="推送对象" value={targetFilter} onChange={setTargetFilter} style={{ width: 200 }}>
            <Select.Option value="全体用户">全体用户</Select.Option>
            <Select.Option value="渝中区">渝中区</Select.Option>
            <Select.Option value="南岸区">南岸区</Select.Option>
            <Select.Option value="江北区">江北区</Select.Option>
            <Select.Option value="渝中区老年大学">渝中区老年大学</Select.Option>
            <Select.Option value="南岸区夕阳红协会">南岸区夕阳红协会</Select.Option>
            <Select.Option value="广场舞爱好者圈">广场舞爱好者圈</Select.Option>
            <Select.Option value="养生交流圈">养生交流圈</Select.Option>
          </Select>
          <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} value={dateRange} onChange={setDateRange} style={{ width: 280 }} />
          <Input.Search placeholder="搜索推送标题" value={keyword} onChange={e => setKeyword(e.target.value)} style={{ width: 200 }} allowClear />
          <Button icon={<ReloadOutlined />} onClick={resetFilters}>重置</Button>
          <Button type="primary" icon={<PlusOutlined />} style={{ background: PRIMARY, borderColor: PRIMARY }}
            onClick={() => { setTargetType('all'); setModalOpen(true); }}>新建推送</Button>
          <span style={{ marginLeft: 'auto', color: '#999', fontSize: 14 }}>共 {filteredRecords.length} 条结果</span>
        </div>
        <Table dataSource={filteredRecords} columns={cols} rowKey="id" pagination={{ pageSize: 10, showTotal: (t: number) => `共 ${t} 条` }} />
      </Card>
      <Modal title="新建推送" open={modalOpen} onCancel={() => setModalOpen(false)} width={600}
        footer={<Space><Button onClick={() => setModalOpen(false)}>取消</Button>
          <Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }} onClick={() => { message.success('推送已保存，状态为待发送'); setModalOpen(false); }}>保存</Button></Space>}>
        <Form layout="vertical">
          <Form.Item label="推送标题"><Input placeholder="请输入推送标题" /></Form.Item>
          <Form.Item label="推送内容"><Input.TextArea rows={4} placeholder="请输入推送内容" /></Form.Item>
          <Form.Item label="推送对象">
            <Radio.Group value={targetType} onChange={e => setTargetType(e.target.value)}>
              <Radio value="all">全平台</Radio>
              <Radio value="region">按区域</Radio>
              <Radio value="org">按组织</Radio>
              <Radio value="circle">按圈子</Radio>
            </Radio.Group>
            <div style={{ marginTop: 12 }}>
              {targetType === 'region' && (
                <Cascader
                  options={[
                    { value: 'yuzhong', label: '渝中区', children: [
                      { value: 'jiefangbei', label: '解放碑街道' },
                      { value: 'chaotianmen', label: '朝天门街道' },
                    ]},
                    { value: 'nanan', label: '南岸区', children: [
                      { value: 'nanping', label: '南坪街道' },
                      { value: 'nanshan', label: '南山街道' },
                    ]},
                    { value: 'jiangbei', label: '江北区', children: [
                      { value: 'guanyinqiao', label: '观音桥街道' },
                      { value: 'jiangbeizui', label: '江北嘴街道' },
                    ]},
                  ]}
                  placeholder="请选择区域"
                  multiple
                  maxTagCount="responsive"
                  style={{ width: '100%' }}
                />
              )}
              {targetType === 'org' && (
                <Transfer
                  dataSource={orgTransferData}
                  titles={['可选组织', '已选组织']}
                  targetKeys={targetOrgs}
                  onChange={setTargetOrgs}
                  render={item => item.title}
                  listStyle={{ width: 240, height: 300 }}
                  showSearch
                  filterOption={(inputValue, item) => item.title.indexOf(inputValue) !== -1}
                  locale={{ itemUnit: '项', itemsUnit: '项' }}
                />
              )}
              {targetType === 'circle' && (
                <Select
                  mode="multiple"
                  placeholder="请选择圈子"
                  value={selectedCircles}
                  onChange={setSelectedCircles}
                  style={{ width: '100%' }}
                  maxTagCount="responsive"
                  options={[
                    { value: 'circle1', label: '广场舞爱好者圈' },
                    { value: 'circle2', label: '养生交流圈' },
                    { value: 'circle3', label: '书法艺术圈' },
                    { value: 'circle4', label: '摄影分享圈' },
                    { value: 'circle5', label: '健康生活圈' },
                  ]}
                />
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// ─── 举报管理 ────────────────────────────────────────────
const ReportPage: React.FC = () => {
  const [tab, setTab] = useState('content');
  const [statusFilter, setStatusFilter] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [dateRange, setDateRange] = useState<any>(null);

  const allReports = REPORTS.filter(r => r.type === tab);
  const filtered = allReports.filter(r => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (keyword && !r.target.includes(keyword) && !r.reporter.includes(keyword) && !r.reason.includes(keyword)) return false;
    return true;
  });

  const pendingCount = allReports.filter(r => r.status === 'pending').length;
  const processedCount = allReports.filter(r => r.status === 'processed').length;

  const resetFilters = () => {
    setStatusFilter('all');
    setKeyword('');
    setDateRange(null);
  };

  const cols = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '举报对象', dataIndex: 'target' },
    { title: '举报人', dataIndex: 'reporter' },
    { title: '举报原因', dataIndex: 'reason' },
    { title: '举报时间', dataIndex: 'time' },
    { title: '状态', dataIndex: 'status', render: (v: string) =>
      <Tag color={v==='pending'?'warning':'success'}>{v==='pending'?'待处理':'已处理'}</Tag> },
    { title: '操作', render: (_: any, row: any) => row.status==='pending' ? (
      <Space>
        <Popconfirm title="确认处理完成？"><Button size="small" style={{ color:'#52c41a', borderColor:'#52c41a' }}>通过</Button></Popconfirm>
        <Popconfirm title="确认驳回？"><Button size="small" danger>驳回</Button></Popconfirm>
      </Space>
    ) : <Text type="secondary">已处理</Text> },
  ];

  return (
    <div>
      <Title level={4} className="mb-4">举报管理</Title>

      {/* 统计卡片 */}
      <Row gutter={16} className="mb-4">
        <Col span={6}>
          <Card className="kpi-card">
            <Statistic title="总举报数" value={allReports.length} prefix={<WarningOutlined style={{ color: PRIMARY }} />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="kpi-card">
            <Statistic title="待处理" value={pendingCount} valueStyle={{ color: '#faad14' }} prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="kpi-card">
            <Statistic title="已处理" value={processedCount} valueStyle={{ color: '#52c41a' }} prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="kpi-card">
            <Statistic title="处理率" value={allReports.length > 0 ? Math.round((processedCount / allReports.length) * 100) : 0} suffix="%" valueStyle={{ color: PRIMARY }} />
          </Card>
        </Col>
      </Row>

      <Card className="page-card" style={{ padding: 0 }}>
        <Tabs activeKey={tab} onChange={setTab} style={{ padding: '0 16px' }}
          items={[
            { key: 'content', label: '内容举报' },
            { key: 'user', label: '用户举报' },
            { key: 'circle', label: '圈子举报' },
          ]}
        />
        <div style={{ padding: '0 16px 16px' }}>
          {/* 筛选条件 */}
          <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Select placeholder="状态筛选" value={statusFilter} onChange={setStatusFilter} style={{ width: 120 }}>
              <Select.Option value="all">全部状态</Select.Option>
              <Select.Option value="pending">待处理</Select.Option>
              <Select.Option value="processed">已处理</Select.Option>
            </Select>
            <DatePicker.RangePicker placeholder={['开始时间', '结束时间']} value={dateRange} onChange={setDateRange} style={{ width: 280 }} />
            <Input.Search placeholder="搜索举报对象/举报人/原因" value={keyword} onChange={e => setKeyword(e.target.value)} style={{ width: 240 }} allowClear />
            <Button icon={<ReloadOutlined />} onClick={resetFilters}>重置</Button>
            <span style={{ marginLeft: 'auto', color: '#999', fontSize: 14 }}>共 {filtered.length} 条结果</span>
          </div>
          <Table dataSource={filtered} columns={cols} rowKey="id" pagination={{ pageSize: 10, showTotal: (t: number) => `共 ${t} 条` }} />
        </div>
      </Card>
    </div>
  );
};

// ─── 权限管理 ────────────────────────────────────────────
const PermissionPage: React.FC = () => {
  const [tab, setTab] = useState('role');
  const [permDrawer, setPermDrawer] = useState(false);
  const [accountModal, setAccountModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  // 筛选条件
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [keyword, setKeyword] = useState('');

  const PERM_TREE = [
    { key: 'dashboard', title: '数据概览' },
    { key: 'user', title: '用户管理', children: [
      { key: 'user_view', title: '查看用户' },
      { key: 'user_ban', title: '封禁用户' },
    ]},
    { key: 'content', title: '内容审核' },
    { key: 'circle', title: '圈子管理' },
    { key: 'activity', title: '活动管理', children: [
      { key: 'activity_view', title: '查看活动' },
      { key: 'activity_edit', title: '编辑活动' },
    ]},
    { key: 'push', title: '消息推送' },
    { key: 'report', title: '举报管理' },
    { key: 'org', title: '组织管理' },
    { key: 'permission', title: '权限管理' },
  ];

  const roleCols = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '角色名称', dataIndex: 'roleName' },
    { title: '描述', dataIndex: 'desc' },
    { title: '账号数', dataIndex: 'accountCount' },
    { title: '操作', render: (_: any, row: any) => (
      <Space>
        <Button size="small" icon={<EditOutlined />}
          onClick={() => { setSelectedRole(row); setPermDrawer(true); }}>编辑权限</Button>
        <Popconfirm title="确认删除该角色？">
          <Button size="small" danger icon={<DeleteOutlined />}>删除</Button>
        </Popconfirm>
      </Space>
    )},
  ];

  const accountCols = [
    { title: 'ID', dataIndex: 'id', width: 60 },
    { title: '账号', dataIndex: 'username' },
    { title: '所属企业', dataIndex: 'company' },
    { title: '角色', dataIndex: 'role', render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: '最后登录', dataIndex: 'lastLogin' },
    { title: '状态', dataIndex: 'status', render: (v: string) =>
      <Tag color={v==='active'?'success':'default'}>{v==='active'?'启用':'禁用'}</Tag> },
    { title: '操作', render: (_: any, row: any) => (
      <Space>
        <Button size="small" icon={<EditOutlined />}>编辑</Button>
        <Popconfirm title={row.status==='active'?'确认禁用？':'确认启用？'}>
          <Button size="small" danger={row.status==='active'}>
            {row.status==='active'?'禁用':'启用'}
          </Button>
        </Popconfirm>
      </Space>
    )},
  ];

  // 筛选逻辑
  const filteredAccounts = ACCOUNTS.filter(acc => {
    if (roleFilter.length > 0 && !roleFilter.includes(acc.role)) return false;
    if (statusFilter !== 'all' && acc.status !== statusFilter) return false;
    if (keyword && !acc.username.includes(keyword) && !acc.company.includes(keyword)) return false;
    return true;
  });

  const resetFilters = () => {
    setRoleFilter([]);
    setStatusFilter('all');
    setKeyword('');
  };

  // 统计数据
  const totalAccounts = ACCOUNTS.length;
  const activeAccounts = ACCOUNTS.filter(a => a.status === 'active').length;
  const totalRoles = ROLES.length;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={4} style={{ margin: 0 }}>权限管理</Title>
        {tab==='role'
          ? <Button type="primary" icon={<PlusOutlined />} style={{ background: PRIMARY, borderColor: PRIMARY }}>新建角色</Button>
          : <Button type="primary" icon={<PlusOutlined />} style={{ background: PRIMARY, borderColor: PRIMARY }} onClick={() => setAccountModal(true)}>新建账号</Button>
        }
      </div>

      {/* 统计卡片 */}
      <Row gutter={16} className="mb-4">
        <Col span={6}>
          <Card className="kpi-card">
            <Statistic title="总账号数" value={totalAccounts} prefix={<UserOutlined style={{ color: PRIMARY }} />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="kpi-card">
            <Statistic title="启用账号" value={activeAccounts} prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="kpi-card">
            <Statistic title="角色数量" value={totalRoles} prefix={<SafetyOutlined style={{ color: PRIMARY }} />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="kpi-card">
            <Statistic title="活跃率" value={totalAccounts > 0 ? Math.round((activeAccounts / totalAccounts) * 100) : 0} suffix="%" valueStyle={{ color: PRIMARY }} />
          </Card>
        </Col>
      </Row>

      <Card className="page-card" style={{ padding: 0 }}>
        <Tabs activeKey={tab} onChange={setTab} style={{ padding: '0 16px' }}
          items={[
            { key: 'role', label: '角色管理' },
            { key: 'account', label: '账号管理' },
          ]}
        />
        <div style={{ padding: '0 16px 16px' }}>
          {/* 账号管理筛选条件 */}
          {tab === 'account' && (
            <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <Select mode="multiple" placeholder="角色筛选" value={roleFilter} onChange={setRoleFilter} style={{ width: 200 }} options={ROLES.map(r => ({ value: r.roleName, label: r.roleName }))} />
              <Select placeholder="状态筛选" value={statusFilter} onChange={setStatusFilter} style={{ width: 120 }}>
                <Select.Option value="all">全部状态</Select.Option>
                <Select.Option value="active">启用</Select.Option>
                <Select.Option value="inactive">禁用</Select.Option>
              </Select>
              <Input.Search placeholder="搜索账号/企业" value={keyword} onChange={e => setKeyword(e.target.value)} style={{ width: 200 }} allowClear />
              <Button icon={<ReloadOutlined />} onClick={resetFilters}>重置</Button>
              <span style={{ marginLeft: 'auto', color: '#999', fontSize: 14 }}>共 {filteredAccounts.length} 条结果</span>
            </div>
          )}
          {tab==='role'
            ? <Table dataSource={ROLES} columns={roleCols} rowKey="id" pagination={false} />
            : <Table dataSource={filteredAccounts} columns={accountCols} rowKey="id" pagination={{ pageSize: 10, showTotal: (t: number) => `共 ${t} 条` }} />
          }
        </div>
      </Card>
      <Drawer title={`编辑权限 — ${selectedRole?.roleName}`} open={permDrawer}
        onClose={() => setPermDrawer(false)} width={400}
        footer={<Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }} block onClick={() => setPermDrawer(false)}>保存权限</Button>}>
        <Text type="secondary" className="mb-3 block">勾选该角色可访问的功能模块：</Text>
        <Tree checkable treeData={PERM_TREE} defaultExpandAll
          defaultCheckedKeys={selectedRole?.permissions ?? []} />
      </Drawer>
      <Modal title="新建账号" open={accountModal} onCancel={() => setAccountModal(false)} width={480}
        footer={<Space><Button onClick={() => setAccountModal(false)}>取消</Button>
          <Button type="primary" style={{ background: PRIMARY, borderColor: PRIMARY }}>创建</Button></Space>}>
        <Form layout="vertical">
          <Form.Item label="账号"><Input placeholder="请输入登录账号" /></Form.Item>
          <Form.Item label="初始密码"><Input.Password placeholder="请输入初始密码" /></Form.Item>
          <Form.Item label="所属企业"><Input placeholder="请输入企业名称" /></Form.Item>
          <Form.Item label="分配角色">
            <Select placeholder="请选择角色" options={ROLES.map(r=>({ value: r.id, label: r.roleName }))} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// ─── 三栏布局菜单结构 ──────────────────────────────────────

// 1级菜单
const LEVEL1_MENU = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: '数据管理' },
  { key: 'user', icon: <UserOutlined />, label: '用户管理' },
  { key: 'content', icon: <FileTextOutlined />, label: '内容管理' },
  { key: 'circle', icon: <TeamOutlined />, label: '圈子管理' },
  { key: 'activity', icon: <CalendarOutlined />, label: '活动管理' },
  { key: 'service', icon: <ShoppingCartOutlined />, label: '服务管理' },
  { key: 'points', icon: <StarOutlined />, label: '积分管理' },
  { key: 'push', icon: <BellOutlined />, label: '消息管理' },
  { key: 'report', icon: <FlagOutlined />, label: '举报管理' },
  { key: 'permission', icon: <SafetyOutlined />, label: '权限管理' },
  { key: 'org', icon: <BankOutlined />, label: '组织管理' },
];

// 2级菜单（按1级模块分组）
const LEVEL2_MENU: Record<string, { key: string; label: string }[]> = {
  dashboard: [{ key: 'dashboard', label: '数据概览' }],
  user: [{ key: 'user', label: '用户列表' }],
  content: [
    { key: 'content-review', label: '内容审核' },
    { key: 'content-list', label: '内容列表' },
  ],
  circle: [{ key: 'circle', label: '圈子列表' }],
  activity: [
    { key: 'activity-platform', label: '平台活动' },
    { key: 'activity-circle', label: '圈子活动' },
  ],
  service: [
    { key: 'service-order', label: '服务订单' },
    { key: 'service-provider', label: '服务商管理' },
  ],
  points: [
    { key: 'points-record', label: '积分记录' },
    { key: 'points-rule', label: '积分规则' },
  ],
  push: [{ key: 'push', label: '推送管理' }],
  report: [{ key: 'report', label: '举报处理' }],
  permission: [
    { key: 'permission-role', label: '角色管理' },
    { key: 'permission-account', label: '账号管理' },
  ],
  org: [{ key: 'org', label: '组织架构' }],
};

// 1级模块名称映射
const LEVEL1_NAMES: Record<string, string> = {
  dashboard: '数据管理', user: '用户管理', content: '内容管理', circle: '圈子管理',
  activity: '活动管理', service: '服务管理', points: '积分管理', push: '消息管理',
  report: '举报管理', permission: '权限管理', org: '组织管理',
};

// 页面 Key 映射到 1级模块
const PAGE_TO_MODULE: Record<string, string> = {
  dashboard: 'dashboard',
  user: 'user',
  'content-review': 'content', 'content-list': 'content',
  circle: 'circle',
  'activity-platform': 'activity', 'activity-circle': 'activity',
  'service-order': 'service', 'service-provider': 'service',
  'points-record': 'points', 'points-rule': 'points',
  push: 'push',
  report: 'report',
  'permission-role': 'permission', 'permission-account': 'permission',
  org: 'org',
};

const BREADCRUMB: Record<string, string> = {
  dashboard: '数据概览', user: '用户列表',
  'content-review': '内容审核', 'content-list': '内容列表',
  circle: '圈子列表',
  'activity-platform': '平台活动', 'activity-circle': '圈子活动',
  'service-order': '服务订单', 'service-provider': '服务商管理',
  'points-record': '积分记录', 'points-rule': '积分规则',
  push: '推送管理', report: '举报处理',
  'permission-role': '角色管理', 'permission-account': '账号管理',
  org: '组织架构',
};

// ─── 三栏布局组件 ────────────────────────────────────────────
const MainLayout: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState('dashboard');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // 当前1级模块
  const currentModule = PAGE_TO_MODULE[page] || page;

  React.useEffect(() => {
    if ((window as any).__selectedUser) {
      setSelectedUser((window as any).__selectedUser);
      delete (window as any).__selectedUser;
    }
  }, [page]);

  // 页面渲染
  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <DashboardPage />;
      case 'user': return <UserPage selectedUser={selectedUser} setSelectedUser={setSelectedUser} />;
      case 'content-review':
        return <ContentPage setActivePage={setPage} setSelectedUser={setSelectedUser} mode="review" />;
      case 'content-list':
        return <ContentPage setActivePage={setPage} setSelectedUser={setSelectedUser} mode="list" />;
      case 'circle': return <CirclePage setActivePage={setPage} setSelectedUser={setSelectedUser} />;
      case 'activity-platform':
      case 'activity-circle':
        return <ActivityPage setActivePage={setPage} />;
      case 'service-order': return <ServiceOrderPage />;
      case 'service-provider': return <ServiceProviderPage />;
      case 'points-record':
      case 'points-rule':
        return <PointsPage />;
      case 'push': return <PushPage />;
      case 'report': return <ReportPage />;
      case 'permission-role':
      case 'permission-account':
        return <PermissionPage />;
      case 'org': return <OrgPage setActivePage={setPage} setSelectedUser={setSelectedUser} />;
      default: return <DashboardPage />;
    }
  };

  const userMenu = {
    items: [
      { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', danger: true },
    ],
    onClick: ({ key }: any) => { if (key === 'logout') onLogout(); },
  };

  const level2Items = LEVEL2_MENU[currentModule] || [];

  return (
    <div className="three-col-layout">
      {/* 1级菜单 */}
      <div className={`level1-menu ${collapsed ? '' : 'expanded'}`}>
        <div className="level1-logo">
          <img src="../../prototypes/yishou-app/logo.png" alt="logo" />
          <span className="level1-logo-text">益寿巴渝</span>
        </div>
        <Menu mode="inline" theme="dark" selectedKeys={[currentModule]}
          onClick={({ key }) => {
            // 点击1级菜单时，自动跳转到该模块的第一个2级菜单
            const firstSub = LEVEL2_MENU[key]?.[0]?.key;
            if (firstSub) setPage(firstSub);
          }}
          style={{ background: 'transparent', borderRight: 'none', flex: 1 }}
          items={LEVEL1_MENU.map(item => ({
            key: item.key,
            icon: item.icon,
            label: <span className="level1-item-text">{item.label}</span>,
          }))}
        />
        <div className="level1-collapse-btn">
          <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)} />
        </div>
      </div>

      {/* 2级菜单 */}
      <div className="level2-menu">
        <div className="level2-header">
          <span className="level2-header-title">{LEVEL1_NAMES[currentModule]}</span>
        </div>
        <div className="level2-nav">
          <Menu mode="inline" selectedKeys={[page]}
            onClick={({ key }) => setPage(key)}
            style={{ borderRight: 'none' }}
            items={level2Items.map(item => ({
              key: item.key,
              label: item.label,
            }))}
          />
        </div>
      </div>

      {/* 右侧主体 */}
      <div className={`main-content-area ${collapsed ? '' : 'expanded'}`}>
        {/* Header */}
        <Header style={{
          position: 'fixed', top: 0, right: 0, left: collapsed ? 228 : 340,
          zIndex: 98, height: 56, padding: '0 24px',
          background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'left 0.2s',
        }}>
          <div className="flex items-center gap-3">
            <Breadcrumb items={[
              { title: '首页' },
              { title: BREADCRUMB[page] || LEVEL1_NAMES[currentModule] },
            ]} />
          </div>
          <Dropdown menu={userMenu} trigger={['click']}>
            <div className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-50">
              <Avatar size={32} style={{ background: PRIMARY }}>管</Avatar>
              <span className="text-sm text-gray-700">admin</span>
            </div>
          </Dropdown>
        </Header>

        {/* 内容区 */}
        <Content className="mgmt-content" style={{ marginTop: 56 }}>
          {renderPage()}
        </Content>
      </div>
    </div>
  );
};

// ─── 根组件 ──────────────────────────────────────────────
const Component: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: PRIMARY,
        borderRadius: 6,
        fontSize: 14,
      },
    }}>
      {loggedIn
        ? <MainLayout onLogout={() => setLoggedIn(false)} />
        : <LoginPage onLogin={() => setLoggedIn(true)} />
      }
    </ConfigProvider>
  );
};

export default Component;










