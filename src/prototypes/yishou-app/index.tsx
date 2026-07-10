/**
 * @name 益寿巴渝APP
 *
 * 50岁以上中老年生活服务平台完整原型
 * 包含：登录注册 → 主界面（益寿/巴渝/消息/我的）→ 助餐服务详情 → 聊天对话
 * 设计规范来源：/src/themes/antd-new（适老化定制，主色 #FF6B35）
 */

import './style.css';
import logoImg from './logo.png';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ConfigProvider } from 'antd';
import {
  HomeOutlined,
  BellOutlined,
  AppstoreOutlined,
  MessageOutlined,
  UserOutlined,
  FireOutlined,
  TeamOutlined,
  StarOutlined,
  StarFilled,
  RightOutlined,
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
  PlusOutlined,
  SettingOutlined,
  GiftOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  SafetyCertificateOutlined,
  WalletOutlined,
  MedicineBoxOutlined,
  CarOutlined,
  HeartOutlined,
  HeartFilled,
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
  SearchOutlined,
  AlertOutlined,
  UsergroupAddOutlined,
  ReadOutlined,
  TagsOutlined,
  ShopOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  SmileOutlined,
  BookOutlined,
  DollarCircleOutlined,
  WechatOutlined,
  MobileOutlined,
  AlipayOutlined,
  QqOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  SafetyOutlined,
  CheckOutlined,
  ArrowLeftOutlined,
  PhoneOutlined,
  AudioOutlined,
  PlusCircleOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
  PauseCircleFilled,
  SoundOutlined,
  EllipsisOutlined,
  UpOutlined,
  DownOutlined,
  CopyOutlined,
  CreditCardOutlined,
  UserAddOutlined,
  IdcardOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  StopOutlined,
  CloseOutlined,
  QrcodeOutlined,
  ContactsOutlined,
  LikeFilled,
  UserOutlined as UserFilledOutlined,
  VideoCameraOutlined,
  BellFilled,
  PictureOutlined,
  EditOutlined,
  NotificationOutlined,
  CrownOutlined,
  DeleteOutlined,
  SendOutlined,
  CustomerServiceOutlined,
  CloseCircleFilled,
  InboxOutlined,
  LeftOutlined,
  MinusOutlined,
  PlusOutlined as PlusOutlined2,
  MessageFilled,
  BlockOutlined,
  DownloadOutlined,
  MailOutlined,
  FileTextOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type AppScreen = 'login' | 'main' | 'service' | 'service-zhuyu' | 'service-zhujie' | 'service-zhuyi' | 'service-zhuju' | 'service-zhuxing' | 'service-liaoyang' | 'service-activity' | 'service-yanglao' | 'service-ganchang' | 'service-juhui' | 'service-bisai' | 'health-yangsheng' | 'calendar-perpetual' | 'chat' | 'post-detail' | 'video-feed' | 'circle-detail' | 'circle-discover' | 'user-profile' | 'my-dynamics' | 'my-favorites' | 'settings' | 'my-profile' | 'contacts' | 'friend-requests' | 'notify-likes' | 'notify-thumbs' | 'notify-comments' | 'notify-fans' | 'create-select' | 'create-image' | 'create-video' | 'circle-announce' | 'circle-members' | 'circle-activity' | 'activity-detail' | 'competition-detail' | 'comment-detail' | 'address-management' | 'change-password' | 'bayu-search' | 'points-mall' | 'points-detail' | 'points-records' | 'order-detail' | 'mall-favorites' | 'mall-address' | 'account-cancellation' | 'notification-settings' | 'privacy-settings' | 'check-update' | 'about-us' | 'friend-detail' | 'my-detail' | 'follow-list' | 'my-wallet' | 'pindan-home' | 'pindan-activity' | 'pindan-product' | 'pindan-confirm' | 'pindan-orders' | 'pindan-order-detail' | 'partner-join' | 'influencer-join' | 'medication-home' | 'medication-add' | 'medication-calendar' | 'medication-detail' | 'community-detail';
type LoginMode = 'main' | 'phone-sms' | 'password' | 'register';
type TabId = 'yishou' | 'bayu' | 'messages' | 'profile';
type BayuSubTab = 'follow' | 'plaza' | 'hot' | 'chatroom' | 'community';
type RankSubTab = 'news' | 'labor' | 'star' | 'active';
type FilterTab = 'all' | 'nearby' | 'rating' | 'price';
type MsgType = 'text' | 'voice' | 'image';
type MsgSender = 'me' | 'other';
// -- Medication Reminder Types --
interface Medication {
  id: number;
  name: string;
  dosage: string;
  dosageUnit: string;
  times: string[];
  timing: 'pre-meal' | 'post-meal' | 'empty-stomach' | 'bedtime' | 'with-meal';
  note?: string;
  frequency: 'daily' | 'weekly' | 'as-needed';
  daysOfWeek?: number[];
  color?: string;
  createdAt: string;
  familyShared: boolean;
  voiceReminder: boolean;
}

interface MedicationRecord {
  medicationId: number;
  medicationName: string;
  time: string;
  status: 'pending' | 'taken' | 'missed';
  takenAt?: string;
}

interface DailyMedicationRecord {
  date: string;
  medications: MedicationRecord[];
}

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

interface CleanCompany {
  id: number;
  name: string;
  address: string;
  distance: string;
  rating: number;
  ratingCount: number;
  hours: string;
  price: string;
  tags: string[];
  image: string;
  highlight?: string;
}

interface PindanActivity {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  totalQuota: number;
  remainingQuota: number;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'ongoing' | 'ended';
}

interface PindanProduct {
  id: number;
  activityId: number;
  name: string;
  image: string;
  originalPrice: number;
  pindanPrice: number;
  description: string;
  stock: number;
  sold: number;
}

interface PindanOrder {
  id: number;
  orderNo: string;
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  totalAmount: number;
  address: string;
  contact: string;
  phone: string;
  products: { productId: number; name: string; image: string; quantity: number; price: number }[];
  createdAt: string;
  paidAt?: string;
  shippedAt?: string;
  completedAt?: string;
}

interface ChatMessage {
  id: number;
  type: MsgType;
  sender: MsgSender;
  content?: string;
  duration?: number;
  image?: string;
  time?: string;
  userId?: number;
}

interface FollowUser {
  id: number;
  name: string;
  avatar: string;
  color: string;
  hasNew: boolean;
}

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
  images?: string[]; // 多张图片时使用
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  tag: string;
  color: string;
  onlineCount: number;
  memberCount: number;
  lastMessage: string;
  lastMessageTime: string;
}

interface BayoutouNews {
  id: number;
  title: string;
  cover: string;       // picsum seed
  source: string;       // 来源媒体
  publishTime: string;  // 相对时间
  likes: number;
  tags: string[];
  summary: string;      // 正文摘要
}

interface BayoutouRankUser {
  id: number;
  avatar: string;
  avatarColor: string;
  name: string;
  ip: string;
  primary: number;  // 排行依据数值（发帖数/粉丝数/点赞数）
  secondary: number; // 辅助数值（获赞数/评论数）
}

interface PostComment {
  id: number;
  user: string;
  avatar: string;
  color: string;
  content: string;
  likes: number;
  time: string;
}

interface CircleInfo {
  name: string;
  members: number;
  tag: string;
  color: string;
}

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

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const PRIMARY = '#FF6B35';
const PRIMARY_BG = '#FFF4EF';
const PAGE_BG = '#F5F4F0';
const CHAT_BG = '#EFF1F5';
const LOGIN_BG = 'linear-gradient(160deg, #FFF3E8 0%, #FFF8F0 40%, #FFF0F5 70%, #F0F4FF 100%)';

// ─────────────────────────────────────────────
// Mock Data — Main App
// ─────────────────────────────────────────────
function HomeIconPlaceholder(props: any) {
  return <ShopOutlined {...props} />;
}

const SERVICES = [
  // 助系列
  { label: '助浴', image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=160&h=120&fit=crop', Icon: SmileOutlined, color: '#1677FF', bg: '#E6F4FF' },
  { label: '助餐', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=160&h=120&fit=crop', Icon: ShopOutlined, color: '#FF6B35', bg: '#FFF4EF' },
  { label: '助洁', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=160&h=120&fit=crop', Icon: HomeIconPlaceholder, color: '#52C41A', bg: '#F6FFED' },
  { label: '助医', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=160&h=120&fit=crop', Icon: MedicineBoxOutlined, color: '#FF4D4F', bg: '#FFF2F0' },
  { label: '助急', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=160&h=120&fit=crop', Icon: AlertOutlined, color: '#FA8C16', bg: '#FFF7E6' },
  { label: '助行', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=160&h=120&fit=crop', Icon: CarOutlined, color: '#13C2C2', bg: '#E6FFFB' },
  // 社区生活
  { label: '土货拼购', image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=160&h=120&fit=crop', Icon: ShoppingOutlined, color: '#FF6B35', bg: '#FFF4EF' },
  { label: '养老社区', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=160&h=120&fit=crop', Icon: TeamOutlined, color: '#722ED1', bg: '#F9F0FF' },
  { label: '周边赶场', image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=160&h=120&fit=crop', Icon: EnvironmentOutlined, color: '#13C2C2', bg: '#E6FFFB' },
  { label: '聚会中心', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=160&h=120&fit=crop', Icon: CustomerServiceOutlined, color: '#EB2F96', bg: '#FFF0F6' },
  // 文娱活动
  { label: '大众赛事', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=160&h=120&fit=crop', Icon: TrophyOutlined, color: '#FA8C16', bg: '#FFF7E6' },
  { label: '康养游学', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=160&h=120&fit=crop', Icon: EnvironmentOutlined, color: '#722ED1', bg: '#F9F0FF' },
  { label: '活动节目', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=160&h=120&fit=crop', Icon: CalendarOutlined, color: '#EB2F96', bg: '#FFF0F6' },
] as const;

// ── 养生助手数据 ──
const YANGSHENG_TIPS = [
  { id: 1, category: '饮食', title: '早晨一杯温水，唤醒肠胃', desc: '每天清晨空腹饮用 200ml 38°C温水，促进肠胃蠕动，帮助排毒养颜。', tag: '每日必做', tagColor: '#52C41A', image: 'morning_water_elderly' },
  { id: 2, category: '运动', title: '八段锦·第三式：调理脾胃须单举', desc: '左右交替上举，拉伸脾胃经络，每次练习 8 遍，改善消化功能。', tag: '推荐', tagColor: '#FF6B35', image: 'baduanjin_exercise' },
  { id: 3, category: '睡眠', title: '午后小憩 20 分钟最佳', desc: '饭后1小时进行20-30分钟午睡，降低心脑血管疾病风险，精力更充沛。', tag: '科学依据', tagColor: '#1677FF', image: 'afternoon_nap' },
  { id: 4, category: '穴位', title: '常按足三里，胜吃老母鸡', desc: '足三里位于膝盖下方四横指处，每日按压3-5分钟，增强免疫力、调节血压。', tag: '穴位保健', tagColor: '#722ED1', image: 'acupoint_zusanli' },
  { id: 5, category: '心理', title: '养花种草，心情愉悦寿命长', desc: '园艺活动能有效降低皮质醇水平，减轻焦虑抑郁，每周坚持2-3次效果最佳。', tag: '心理健康', tagColor: '#EB2F96', image: 'gardening_elderly' },
] as const;

const YANGSHENG_SEASONS = [
  { id: 1, season: '春', advice: '春季养肝，宜多食绿色蔬菜、枸杞，早睡早起，多户外散步。', color: '#52C41A', bg: '#F6FFED' },
  { id: 2, season: '夏', advice: '夏季养心，少食辛辣，多吃苦瓜、莲子，午间小憩，避免过度出汗。', color: '#FF4D4F', bg: '#FFF2F0' },
  { id: 3, season: '秋', advice: '秋季养肺，多食白色食物如梨、百合、银耳，保持室内湿度，防燥护肤。', color: '#FA8C16', bg: '#FFF7E6' },
  { id: 4, season: '冬', advice: '冬季养肾，多食黑色食物如黑豆、核桃，注意保暖脚部，适量进补。', color: '#1677FF', bg: '#E6F4FF' },
] as const;

// ── 万年历数据 ──
const FESTIVALS_2026 = {
  '01-01': '元旦', '01-28': '春节', '01-29': '初二', '01-30': '初三',
  '02-14': '情人节', '03-08': '妇女节', '04-04': '清明', '05-01': '劳动节',
  '05-05': '端午', '06-01': '儿童节', '09-10': '中秋', '10-01': '国庆节',
  '10-02': '国庆', '10-03': '国庆', '11-11': '光棍节', '12-25': '圣诞节',
};

const SOLAR_TERMS = {
  '01-20': '大寒', '02-04': '立春', '02-19': '雨水', '03-05': '惊蛰',
  '03-20': '春分', '04-04': '清明', '04-20': '谷雨', '05-05': '立夏',
  '05-21': '小满', '06-06': '芒种', '06-21': '夏至', '07-07': '小暑',
  '07-22': '大暑', '08-07': '立秋', '08-23': '处暑', '09-07': '白露',
  '09-23': '秋分', '10-08': '寒露', '10-23': '霜降', '11-07': '立冬',
  '11-22': '小雪', '12-07': '大雪', '12-22': '冬至',
};

const LUNAR_CALENDAR: {[key: string]: string} = {
  '2026-01-01': '农历十一月廿三', '2026-01-28': '除夕', '2026-01-29': '正月初一',
  '2026-02-14': '正月初七', '2026-03-08': '正月廿九', '2026-04-04': '二月十八',
  '2026-05-01': '三月初四', '2026-05-05': '四月初八', '2026-06-01': '四月十五',
  '2026-06-09': '四月廿三', '2026-09-10': '七月廿八', '2026-10-01': '八月初一',
  '2026-10-31': '九月二十', '2026-12-25': '十一月十七',
};

const AUSPICIOUS_BAD: {[key: string]: {good: string[]; bad: string[]}} = {
  '2026-06-09': {good: ['祭祀', '祈福', '动土', '搬家'], bad: ['安葬', '行丧']},
  '2026-06-10': {good: ['开光', '装修', '开业'], bad: ['栽种', '伐木']},
  '2026-06-11': {good: ['出行', '会友', '交易'], bad: ['动土', '破土']},
};

const WEEK_DIRECTIONS: {[key: number]: string} = {
  0: '正南', 1: '西南', 2: '正西', 3: '西北', 4: '正北', 5: '东北', 6: '正东',
};

const HOLIDAY_SCHEDULE = [
  { name: '春节', start: '2026-01-28', end: '2026-02-03', color: '#FF4D4F' },
  { name: '清明节', start: '2026-04-04', end: '2026-04-06', color: '#52C41A' },
  { name: '劳动节', start: '2026-05-01', end: '2026-05-03', color: '#1890FF' },
  { name: '端午节', start: '2026-06-07', end: '2026-06-09', color: '#722ED1' },
  { name: '中秋节', start: '2026-09-08', end: '2026-09-10', color: '#FA8C16' },
  { name: '国庆节', start: '2026-10-01', end: '2026-10-07', color: '#FF6B35' },
];

// 万年历组件
const PerpetualCalendarScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string>(today.toISOString().split('T')[0]);

  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const navigateMonth = (direction: number) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;
    if (newMonth > 12) { newMonth = 1; newYear++; }
    if (newMonth < 1) { newMonth = 12; newYear--; }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const isToday = (day: number) => {
    const todayStr = today.toISOString().split('T')[0];
    return formatDateKey(currentYear, currentMonth, day) === todayStr;
  };

  const isHoliday = (day: number) => {
    const key = `${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}` as keyof typeof FESTIVALS_2026;
    return FESTIVALS_2026[key] || HOLIDAY_SCHEDULE.some(h => {
      const d = new Date(formatDateKey(currentYear, currentMonth, day));
      return d >= new Date(h.start) && d <= new Date(h.end);
    });
  };

  const getHolidayName = (day: number) => {
    const key = `${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}` as keyof typeof FESTIVALS_2026;
    if (FESTIVALS_2026[key]) return FESTIVALS_2026[key];
    const dateStr = formatDateKey(currentYear, currentMonth, day);
    for (const h of HOLIDAY_SCHEDULE) {
      if (new Date(dateStr) >= new Date(h.start) && new Date(dateStr) <= new Date(h.end)) {
        return h.name;
      }
    }
    return null;
  };

  const isSolarTerm = (day: number) => {
    const key = `${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}` as keyof typeof SOLAR_TERMS;
    return SOLAR_TERMS[key];
  };

  const getLunarDate = (day: number) => {
    const dateStr = formatDateKey(currentYear, currentMonth, day);
    if (LUNAR_CALENDAR[dateStr]) return LUNAR_CALENDAR[dateStr];
    return `农历四月廿${['初','一','二','三','四','五','六','七','八','九','十','廿','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'][day % 22] || day}`;
  };

  const getDayAuspicious = (day: number) => {
    const dateStr = formatDateKey(currentYear, currentMonth, day);
    return AUSPICIOUS_BAD[dateStr] || { good: ['出行', '会友'], bad: ['安葬'] };
  };

  const selectedAuspicious = getDayAuspicious(parseInt(selectedDate.split('-')[2]));
  const selectedLunar = getLunarDate(parseInt(selectedDate.split('-')[2]));
  const dayOfWeek = new Date(selectedDate).getDay();

  return (
    <>
      <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ position: 'relative', background: 'white', height: 54, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>万年历</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ background: PAGE_BG }}>
        {/* 月份切换头部 */}
        <div style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF9A56 100%)', padding: '16px 16px 24px' }}>
          <div className="flex items-center justify-between">
            <button onClick={() => navigateMonth(-1)} className="flex items-center justify-center rounded-full border-0 cursor-pointer active:scale-95 transition-transform" style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.25)' }}>
              <LeftOutlined style={{ fontSize: 18, color: 'white' }} />
            </button>
            <div className="text-center">
              <div style={{ fontSize: 24, fontWeight: 800, color: 'white' }}>{currentYear}年{currentMonth}月</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>
                {['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'][currentMonth - 1]}
              </div>
            </div>
            <button onClick={() => navigateMonth(1)} className="flex items-center justify-center rounded-full border-0 cursor-pointer active:scale-95 transition-transform" style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.25)' }}>
              <RightOutlined style={{ fontSize: 18, color: 'white' }} />
            </button>
          </div>
        </div>

        {/* 日历主体 */}
        <div style={{ margin: '-16px 12px 0', background: 'white', borderRadius: 16, padding: '12px 8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          {/* 星期标题 */}
          <div className="grid grid-cols-7 mb-2">
            {weekdays.map((w, i) => (
              <div key={w} className="text-center" style={{ fontSize: 12, color: i === 0 || i === 6 ? '#FF6B35' : '#999', fontWeight: 600, padding: '4px 0' }}>{w}</div>
            ))}
          </div>

          {/* 日期网格 */}
          <div className="grid grid-cols-7 gap-0.5">
            {days.map((day, idx) => {
              if (day === null) return <div key={`empty-${idx}`} />;
              const dateKey = formatDateKey(currentYear, currentMonth, day);
              const isSelected = dateKey === selectedDate;
              const todayFlag = isToday(day);
              const holidayName = getHolidayName(day);
              const solarTerm = isSolarTerm(day);
              const special = holidayName || solarTerm;

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(dateKey)}
                  className="flex flex-col items-center cursor-pointer rounded-xl transition-all"
                  style={{
                    padding: '6px 2px',
                    minHeight: 48,
                    background: isSelected ? PRIMARY : todayFlag && !isSelected ? 'rgba(255,107,53,0.08)' : 'transparent',
                    border: todayFlag && !isSelected ? '1.5px solid rgba(255,107,53,0.3)' : 'none',
                  }}
                >
                  <span style={{ fontSize: day === 1 ? 15 : 14, color: isSelected ? 'white' : todayFlag ? PRIMARY : day % 7 === 0 || day % 7 === 6 ? '#FF6B35' : '#1A1A1A', fontWeight: isSelected ? 700 : todayFlag ? 700 : 400 }}>
                    {day}
                  </span>
                  {special && (
                    <span style={{ fontSize: 9, color: isSelected ? 'rgba(255,255,255,0.9)' : '#FF6B35', marginTop: 2, fontWeight: 500 }}>{holidayName || solarTerm}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 农历日期 */}
        <div style={{ margin: '12px 16px 0', background: 'white', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #FA8C16 0%, #FFC069 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarOutlined style={{ fontSize: 18, color: 'white' }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{selectedLunar}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 1 }}>宜：{selectedAuspicious.good.join(' · ')}</div>
          </div>
        </div>

        {/* 吉凶方位 */}
        <div style={{ margin: '12px 16px 0', background: 'white', borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 10 }}>今日方位</div>
          <div className="flex items-center gap-3">
            <div style={{ flex: 1, background: '#FFF4EF', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>吉方</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#52C41A' }}>{WEEK_DIRECTIONS[dayOfWeek]}</div>
            </div>
            <div style={{ width: 1, height: 40, background: '#F0F0F0' }} />
            <div style={{ flex: 1, background: '#FFF0F0', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>凶方</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#FF4D4F' }}>{WEEK_DIRECTIONS[(dayOfWeek + 4) % 7]}</div>
            </div>
            <div style={{ flex: 1, background: '#F6FFED', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>财位</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#FA8C16' }}>{WEEK_DIRECTIONS[(dayOfWeek + 2) % 7]}</div>
            </div>
          </div>
        </div>

        {/* 宜忌详情 */}
        <div style={{ margin: '12px 16px 0', background: 'white', borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#52C41A', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircleOutlined style={{ fontSize: 14 }} /> 宜
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {selectedAuspicious.good.map(item => (
                  <span key={item} style={{ background: '#F6FFED', color: '#52C41A', borderRadius: 8, padding: '4px 10px', fontSize: 12 }}>{item}</span>
                ))}
              </div>
            </div>
            <div style={{ width: 1, background: '#F0F0F0' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#FF4D4F', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                <CloseCircleOutlined style={{ fontSize: 14 }} /> 忌
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {selectedAuspicious.bad.map(item => (
                  <span key={item} style={{ background: '#FFF2F0', color: '#FF4D4F', borderRadius: 8, padding: '4px 10px', fontSize: 12 }}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 纪念日/生日 */}
        <div style={{ margin: '12px 16px 0', background: 'white', borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 10 }}>重要纪念日</div>
          {[
            { name: '张大爷生日', date: '1952-03-15', isBirthday: true },
            { name: '结婚纪念日', date: '1980-10-01', isBirthday: false },
            { name: '王奶奶生日', date: '1955-07-22', isBirthday: true },
          ].filter(e => {
            const eventMonth = parseInt(e.date.split('-')[1]);
            const eventDay = parseInt(e.date.split('-')[2]);
            return eventMonth === currentMonth;
          }).length > 0 ? (
            [
              { name: '张大爷生日', date: '1952-03-15', isBirthday: true },
              { name: '结婚纪念日', date: '1980-10-01', isBirthday: false },
              { name: '王奶奶生日', date: '1955-07-22', isBirthday: true },
            ].filter(e => {
              const eventMonth = parseInt(e.date.split('-')[1]);
              return eventMonth === currentMonth;
            }).map((event, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: idx < 2 ? '1px solid #F5F5F5' : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: event.isBirthday ? '#FFF7E6' : '#F6FFED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {event.isBirthday ? <GiftOutlined style={{ fontSize: 16, color: '#FA8C16' }} /> : <HeartOutlined style={{ fontSize: 16, color: '#FF4D4F' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{event.name}</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>{event.date}</div>
                </div>
                <span style={{ fontSize: 12, color: event.isBirthday ? '#FA8C16' : '#52C41A' }}>{event.isBirthday ? '🎂' : '💕'}</span>
              </div>
            ))
          ) : (
            <div style={{ fontSize: 13, color: '#999', textAlign: 'center', padding: '12px 0' }}>本月暂无重要纪念日</div>
          )}
        </div>

        {/* 节假日调休提示 */}
        <div style={{ margin: '12px 16px 24px', background: 'linear-gradient(135deg, #E6F4FF 0%, #F0F7FF 100%)', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(22,119,255,0.15)' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1677FF', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <InfoCircleOutlined style={{ fontSize: 14 }} /> 节假日安排
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {HOLIDAY_SCHEDULE.map((h, idx) => {
              const startDate = new Date(h.start);
              const endDate = new Date(h.end);
              const daysOff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: h.color }} />
                  <span style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 600 }}>{h.name}</span>
                  <span style={{ fontSize: 12, color: '#888' }}>{startDate.getMonth() + 1}月{startDate.getDate()}日 - {endDate.getMonth() + 1}月{endDate.getDate()}日</span>
                  <span style={{ fontSize: 11, color: '#1677FF', background: '#E6F4FF', padding: '2px 6px', borderRadius: 4 }}>{daysOff}天假</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const HEALTH_TOOLS = [
  { label: '养生助手', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=160&h=120&fit=crop', Icon: HeartOutlined, color: '#52C41A', bg: '#F6FFED' },
  { label: '用药提醒', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=160&h=120&fit=crop', Icon: ClockCircleOutlined, color: '#1677FF', bg: '#E6F4FF' },
  { label: '健康饮食', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=160&h=120&fit=crop', Icon: ReadOutlined, color: '#FA8C16', bg: '#FFF7E6' },
  { label: '现学现教', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=160&h=120&fit=crop', Icon: BookOutlined, color: '#13C2C2', bg: '#E6FFFB' },
  { label: '套路鉴别', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=160&h=120&fit=crop', Icon: SafetyCertificateOutlined, color: '#FF4D4F', bg: '#FFF2F0' },
  { label: '安全交友', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=160&h=120&fit=crop', Icon: UsergroupAddOutlined, color: '#EB2F96', bg: '#FFF0F6' },
  { label: '价格查询', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=160&h=120&fit=crop', Icon: TagsOutlined, color: '#722ED1', bg: '#F9F0FF' },
  { label: '技能变现', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=160&h=120&fit=crop', Icon: TrophyOutlined, color: '#FAAD14', bg: '#FFFBE6' },
] as const;

const POSTS = [
  {
    id: 1,
    user: '李秀英',
    avatar: '李',
    avatarColor: '#FF6B35',
    time: '10分钟前',
    content: '今天跟姐妹们在公园跳了两个小时广场舞，感觉整个人都精神了！明天还约好了继续练习新舞步，欢迎大家一起来。',
    image: 'https://picsum.photos/seed/dance_elder/400/260',
    likes: 128,
    comments: 23,
    location: '重庆渝中区',
  },
  {
    id: 2,
    user: '张国华',
    avatar: '张',
    avatarColor: '#1677FF',
    time: '32分钟前',
    content: '分享一个稳血压的好方法：每天早上喝一杯淡盐水，坚持了三个月，血压明显稳定了很多。大家可以试试，当然要先咨询医生哦！',
    image: undefined,
    likes: 256,
    comments: 47,
    location: '重庆沙坪坝区',
  },
  {
    id: 3,
    user: '王翠华',
    avatar: '王',
    avatarColor: '#52C41A',
    time: '1小时前',
    content: '用手机拍的荷花照片，第一次用修图功能处理，感觉还不错！现在学摄影真的越老越有活头，记录美好生活。',
    image: 'https://picsum.photos/seed/lotus_flower/400/260',
    likes: 183,
    comments: 31,
    location: undefined,
  },
];

const CIRCLES = [
  { name: '广场舞圈', members: 1283, tag: '舞蹈', color: '#FF6B35' },
  { name: '养生健康圈', members: 2156, tag: '健康', color: '#52C41A' },
  { name: '书法绘画圈', members: 876, tag: '艺术', color: '#722ED1' },
  { name: '太极拳队', members: 643, tag: '武术', color: '#1677FF' },
  { name: '钓鱼爱好者', members: 512, tag: '休闲', color: '#13C2C2' },
  { name: '红歌合唱团', members: 934, tag: '音乐', color: '#EB2F96' },
];

// 全量圈子（包含未关注的候选圈子）
const ALL_CIRCLES = [
  ...CIRCLES,
  { name: '摄影爱好者', members: 1042, tag: '摄影', color: '#FA8C16' },
  { name: '旅游达人圈', members: 1876, tag: '旅行', color: '#08979C' },
  { name: '厨艺交流圈', members: 3201, tag: '美食', color: '#D4380D' },
  { name: '园艺花卉圈', members: 689, tag: '园艺', color: '#389E0D' },
  { name: '象棋围棋圈', members: 423, tag: '棋类', color: '#531DAB' },
  { name: '戏曲票友圈', members: 758, tag: '戏曲', color: '#C41D7F' },
  { name: '读书分享圈', members: 1134, tag: '阅读', color: '#0958D9' },
  { name: '手工编织圈', members: 561, tag: '手工', color: '#7CB305' },
];

// ─────────────────────────────────────────────
// Mock Data — User Profiles
// ─────────────────────────────────────────────
const USER_PROFILES: {[id: number]: UserProfile} = {
  1: { id: 1, name: '李秀英', avatar: '李', color: '#FF6B35', uid: 'YS10234567', ip: '重庆', bio: '退休教师，热爱广场舞和摄影，记录生活每一天 📸', following: 86, followers: 1283, likesReceived: 8924, isFollowed: true },
  2: { id: 2, name: '王翠华', avatar: '王', color: '#52C41A', uid: 'YS20345678', ip: '重庆', bio: '生活中的每一天都是礼物，多拍多记录 🌸', following: 124, followers: 876, likesReceived: 5431, isFollowed: true },
  3: { id: 3, name: '张师傅', avatar: '张', color: '#1677FF', uid: 'YS30456789', ip: '重庆', bio: '太极传人，每天晨练不停歇，欢迎一起来练 🥋', following: 53, followers: 643, likesReceived: 3287, isFollowed: false },
  4: { id: 4, name: '赵美云', avatar: '赵', color: '#EB2F96', uid: 'YS40567890', ip: '四川', bio: '爱美食爱生活，厨房里的快乐大厨 👩‍🍳', following: 197, followers: 2156, likesReceived: 15672, isFollowed: true },
  5: { id: 5, name: '陈大叔', avatar: '陈', color: '#722ED1', uid: 'YS50678901', ip: '重庆', bio: '书法爱好者，笔墨间寻宁静，字里行间是人生 🖌️', following: 42, followers: 512, likesReceived: 2943, isFollowed: false },
  6: { id: 6, name: '刘奶奶', avatar: '刘', color: '#13C2C2', uid: 'YS60789012', ip: '重庆', bio: '手工编织达人，一针一线织出温暖和爱 🧶', following: 68, followers: 934, likesReceived: 6218, isFollowed: false },
  8: { id: 8, name: '张师傅', avatar: '张', color: '#1677FF', uid: 'YS80678901', ip: '重庆', bio: '太极传人，每天晨练不停歇，钓鱼也是我的爱好 🎣', following: 53, followers: 643, likesReceived: 3287, isFollowed: false },
  11: { id: 11, name: '陈大爷', avatar: '陈', color: '#FA8C16', uid: 'YS11890123', ip: '重庆', bio: '广场舞爱好者，退休后每天跳舞健身，活力满满！', following: 73, followers: 2341, likesReceived: 18320, isFollowed: false },
  12: { id: 12, name: '孙阿姨', avatar: '孙', color: '#52C41A', uid: 'YS12901234', ip: '重庆', bio: '养生达人，喜欢研究健康饮食与生活方式', following: 55, followers: 1876, likesReceived: 12450, isFollowed: false },
  13: { id: 13, name: '刘大叔', avatar: '刘', color: '#1677FF', uid: 'YS13012345', ip: '四川', bio: '太极拳八段锦传授者，习武三十年，强身健体', following: 41, followers: 1543, likesReceived: 9870, isFollowed: false },
  14: { id: 14, name: '吴奶奶', avatar: '吴', color: '#EB2F96', uid: 'YS14123456', ip: '重庆', bio: '阳台园艺爱好者，花花草草是我的快乐源泉 🌹', following: 89, followers: 1234, likesReceived: 7650, isFollowed: false },
  15: { id: 15, name: '周大爷', avatar: '周', color: '#722ED1', uid: 'YS15234567', ip: '重庆', bio: '钓鱼达人，嘉陵江边是我的主场，欢迎一起来 🎣', following: 62, followers: 987, likesReceived: 5430, isFollowed: false },
  16: { id: 16, name: '郑阿姨', avatar: '郑', color: '#13C2C2', uid: 'YS16345678', ip: '重庆', bio: '家常菜爱好者，简单食材做出好味道，快乐厨房 🍳', following: 104, followers: 1102, likesReceived: 6780, isFollowed: false },
  17: { id: 17, name: '冯大叔', avatar: '冯', color: '#FF6B35', uid: 'YS17456789', ip: '重庆', bio: '太极拳教练，免费教学，欢迎加入晨练队伍', following: 38, followers: 823, likesReceived: 4320, isFollowed: false },
  18: { id: 18, name: '蒋奶奶', avatar: '蒋', color: '#FAAD14', uid: 'YS18567890', ip: '重庆', bio: '手工编织爱好者，给家人编织温暖是最大的幸福 🧶', following: 57, followers: 745, likesReceived: 3980, isFollowed: false },
  201: { id: 201, name: '周奶奶', avatar: '周', color: '#722ED1', uid: 'YS20678901', ip: '重庆', bio: '广场舞爱好者，退休后每天跳舞健身，活力满满！', following: 73, followers: 25300, likesReceived: 134560, isFollowed: false },
  301: { id: 301, name: '黄奶奶', avatar: '黄', color: '#FAAD14', uid: 'YS30678901', ip: '重庆', bio: '喜欢养花种草，每天在阳台上忙活，心情愉快 🌻', following: 45, followers: 876, likesReceived: 8760, isFollowed: false },
  302: { id: 302, name: '苏阿姨', avatar: '苏', color: '#EB2F96', uid: 'YS30789012', ip: '重庆', bio: '摄影爱好者，走遍重庆大街小巷，记录生活美好瞬间', following: 62, followers: 812, likesReceived: 8120, isFollowed: false },
  303: { id: 303, name: '胡大爷', avatar: '胡', color: '#722ED1', uid: 'YS30890123', ip: '重庆', bio: '象棋爱好者，棋逢对手乐在其中', following: 38, followers: 765, likesReceived: 7650, isFollowed: false },
  304: { id: 304, name: '杨奶奶', avatar: '杨', color: '#1677FF', uid: 'YS30901234', ip: '重庆', bio: '太极拳爱好者，每天清晨在公园练习，精神矍铄', following: 51, followers: 721, likesReceived: 7210, isFollowed: false },
  305: { id: 305, name: '徐大叔', avatar: '徐', color: '#52C41A', uid: 'YS31012345', ip: '重庆', bio: '钓鱼达人，江边一坐就是半天，享受宁静时光 🎣', following: 29, followers: 689, likesReceived: 6890, isFollowed: false },
  306: { id: 306, name: '朱阿姨', avatar: '朱', color: '#FF6B35', uid: 'YS31123456', ip: '重庆', bio: '烹饪爱好者，川菜家常菜样样拿手', following: 83, followers: 643, likesReceived: 6430, isFollowed: false },
  307: { id: 307, name: '马大爷', avatar: '马', color: '#13C2C2', uid: 'YS31234567', ip: '重庆', bio: '遛鸟爱好者，每天清晨提着鸟笼逛公园', following: 34, followers: 598, likesReceived: 5980, isFollowed: false },
  308: { id: 308, name: '唐奶奶', avatar: '唐', color: '#FA8C16', uid: 'YS31345678', ip: '重庆', bio: '广场舞爱好者，每天晚上跳两曲，健康快乐每一天', following: 71, followers: 554, likesReceived: 5540, isFollowed: false },
  309: { id: 309, name: '郭大叔', avatar: '郭', color: '#FAAD14', uid: 'YS31456789', ip: '重庆', bio: '书法爱好者，退休后专心练字修身养性', following: 27, followers: 512, likesReceived: 5120, isFollowed: false },
  310: { id: 310, name: '何阿姨', avatar: '何', color: '#EB2F96', uid: 'YS31567890', ip: '重庆', bio: '手工编织达人，毛线帽子围巾样样精通', following: 56, followers: 478, likesReceived: 4780, isFollowed: false },
};

const USER_EXTRA_POSTS: {[id: number]: FollowPost[]} = {
  1: [
    { id: 501, userId: 1, user: '李秀英', avatar: '李', avatarColor: '#FF6B35', type: 'image', coverSeed: 'autumn_park_leaves', coverHeight: 190, title: '公园赏秋，层林尽染好风光，心旷神怡！', likes: 74, comments: 18, saves: 31, shares: 8 },
    { id: 502, userId: 1, user: '李秀英', avatar: '李', avatarColor: '#FF6B35', type: 'video', coverSeed: 'dance_new_steps', coverHeight: 170, title: '广场舞新动作练习中，跟着节奏动起来！', likes: 163, comments: 42, saves: 67, shares: 15 },
    { id: 503, userId: 1, user: '李秀英', avatar: '李', avatarColor: '#FF6B35', type: 'image', coverSeed: 'morning_tai_chi', coverHeight: 200, title: '今天拍到的好看云彩，分享给大家看看', likes: 51, comments: 12, saves: 22, shares: 5 },
  ],
  2: [
    { id: 504, userId: 2, user: '王翠华', avatar: '王', avatarColor: '#52C41A', type: 'image', coverSeed: 'balcony_tomato', coverHeight: 200, title: '阳台种的小番茄第一次收获，满满一盆！', likes: 112, comments: 28, saves: 49, shares: 11 },
    { id: 505, userId: 2, user: '王翠华', avatar: '王', avatarColor: '#52C41A', type: 'video', coverSeed: 'phone_photo_tips', coverHeight: 175, title: '手机摄影小技巧，拍出好看的花花草草', likes: 89, comments: 21, saves: 38, shares: 9 },
    { id: 506, userId: 2, user: '王翠华', avatar: '王', avatarColor: '#52C41A', type: 'image', coverSeed: 'rose_bloom', coverHeight: 165, title: '玫瑰开花了，香气扑鼻，心情真好！', likes: 138, comments: 35, saves: 58, shares: 13 },
  ],
  3: [
    { id: 507, userId: 3, user: '张师傅', avatar: '张', avatarColor: '#1677FF', type: 'video', coverSeed: 'river_fishing', coverHeight: 185, title: '嘉陵江边垂钓，一钓一个大的，满载而归！', likes: 97, comments: 24, saves: 42, shares: 10 },
    { id: 508, userId: 3, user: '张师傅', avatar: '张', avatarColor: '#1677FF', type: 'image', coverSeed: 'calligraphy_peace', coverHeight: 165, title: '今日习字：宁静致远，与君共勉', likes: 54, comments: 14, saves: 25, shares: 6 },
  ],
  4: [
    { id: 509, userId: 4, user: '赵美云', avatar: '赵', avatarColor: '#EB2F96', type: 'image', coverSeed: 'braised_pork', coverHeight: 195, title: '家常红烧肉，老方法做的，香飘整条街！', likes: 208, comments: 56, saves: 89, shares: 21 },
    { id: 510, userId: 4, user: '赵美云', avatar: '赵', avatarColor: '#EB2F96', type: 'video', coverSeed: 'breakfast_recipe', coverHeight: 180, title: '早餐小食谱，营养又简单，老年人必看！', likes: 315, comments: 87, saves: 134, shares: 32 },
    { id: 511, userId: 4, user: '赵美云', avatar: '赵', avatarColor: '#EB2F96', type: 'image', coverSeed: 'herbal_soup', coverHeight: 170, title: '滋补养生汤，这个天气最适合喝了', likes: 176, comments: 45, saves: 72, shares: 17 },
  ],
  5: [
    { id: 512, userId: 5, user: '陈大叔', avatar: '陈', avatarColor: '#722ED1', type: 'image', coverSeed: 'calligraphy_study', coverHeight: 175, title: '临摹王羲之兰亭序片段，请大家指教', likes: 88, comments: 22, saves: 36, shares: 9 },
    { id: 513, userId: 5, user: '陈大叔', avatar: '陈', avatarColor: '#722ED1', type: 'image', coverSeed: 'exhibition_hall', coverHeight: 205, title: '书法展览现场，藏龙卧虎高手如云！', likes: 121, comments: 31, saves: 52, shares: 12 },
  ],
  6: [
    { id: 514, userId: 6, user: '刘奶奶', avatar: '刘', avatarColor: '#13C2C2', type: 'image', coverSeed: 'yarn_pendant', coverHeight: 190, title: '废旧毛线编的小挂件，送给邻居小孩很喜欢', likes: 143, comments: 38, saves: 61, shares: 14 },
    { id: 515, userId: 6, user: '刘奶奶', avatar: '刘', avatarColor: '#13C2C2', type: 'video', coverSeed: 'crochet_tutorial', coverHeight: 170, title: '钩针入门教学，从零开始简单易学！', likes: 267, comments: 72, saves: 113, shares: 26 },
    { id: 516, userId: 6, user: '刘奶奶', avatar: '刘', avatarColor: '#13C2C2', type: 'image', coverSeed: 'winter_sweater', coverHeight: 185, title: '给孙子织的冬天毛衣，快完工了！', likes: 199, comments: 52, saves: 85, shares: 19 },
  ],
  8: [
    { id: 601, userId: 8, user: '张师傅', avatar: '张', avatarColor: '#1677FF', type: 'video', coverSeed: 'fishing_tiger', coverHeight: 180, title: '晨练太极拳，迎接美好的一天！', likes: 67, comments: 18, saves: 29, shares: 7 },
    { id: 602, userId: 8, user: '张师傅', avatar: '张', avatarColor: '#1677FF', type: 'image', coverSeed: 'peaceful_river', coverHeight: 160, title: '江边钓鱼中，享受宁静时光', likes: 45, comments: 11, saves: 19, shares: 5 },
  ],
  11: [
    { id: 611, userId: 11, user: '陈大爷', avatar: '陈', avatarColor: '#FA8C16', type: 'video', coverSeed: 'dancing_sunset', coverHeight: 190, title: '傍晚广场舞表演，现场气氛超棒！', likes: 412, comments: 98, saves: 178, shares: 43 },
    { id: 612, userId: 11, user: '陈大爷', avatar: '陈', avatarColor: '#FA8C16', type: 'image', coverSeed: 'dance_group_photo', coverHeight: 170, title: '舞队合影，大家精气神真好！', likes: 289, comments: 65, saves: 112, shares: 28 },
    { id: 613, userId: 11, user: '陈大爷', avatar: '陈', avatarColor: '#FA8C16', type: 'video', coverSeed: 'morning_exercise', coverHeight: 185, title: '清晨健身操，每天坚持半小时', likes: 356, comments: 82, saves: 145, shares: 36 },
  ],
  12: [
    { id: 621, userId: 12, user: '孙阿姨', avatar: '孙', avatarColor: '#52C41A', type: 'video', coverSeed: 'green_tea_brew', coverHeight: 175, title: '养生茶配方分享，简单几步喝出健康！', likes: 234, comments: 58, saves: 99, shares: 24 },
    { id: 622, userId: 12, user: '孙阿姨', avatar: '孙', avatarColor: '#52C41A', type: 'image', coverSeed: 'veggie_dish', coverHeight: 195, title: '今天的养生晚餐，清淡又营养', likes: 187, comments: 45, saves: 78, shares: 19 },
  ],
  13: [
    { id: 631, userId: 13, user: '刘大叔', avatar: '刘', avatarColor: '#1677FF', type: 'video', coverSeed: 'taiji_form', coverHeight: 200, title: '太极拳八段锦教学，跟着练身体好！', likes: 567, comments: 134, saves: 234, shares: 58 },
    { id: 632, userId: 13, user: '刘大叔', avatar: '刘', avatarColor: '#1677FF', type: 'image', coverSeed: 'morning_dojo', coverHeight: 180, title: '清晨公园晨练，欢迎大家加入', likes: 389, comments: 89, saves: 156, shares: 41 },
    { id: 633, userId: 13, user: '刘大叔', avatar: '刘', avatarColor: '#1677FF', type: 'video', coverSeed: 'health_talk', coverHeight: 170, title: '老年人运动注意事项，这些细节要记住', likes: 298, comments: 72, saves: 121, shares: 32 },
  ],
  14: [
    { id: 641, userId: 14, user: '吴奶奶', avatar: '吴', avatarColor: '#EB2F96', type: 'image', coverSeed: 'balcony_garden', coverHeight: 190, title: '阳台小花园开花了，春天来了！', likes: 156, comments: 39, saves: 67, shares: 16 },
    { id: 642, userId: 14, user: '吴奶奶', avatar: '吴', avatarColor: '#EB2F96', type: 'video', coverSeed: 'rose_care', coverHeight: 175, title: '月季花养护心得分享，送你满园春色', likes: 213, comments: 54, saves: 91, shares: 22 },
  ],
  15: [
    { id: 651, userId: 15, user: '周大爷', avatar: '周', avatarColor: '#722ED1', type: 'video', coverSeed: 'fishing_sunset', coverHeight: 185, title: '嘉陵江夜钓，今晚收获不错！', likes: 178, comments: 45, saves: 76, shares: 18 },
    { id: 652, userId: 15, user: '周大爷', avatar: '周', avatarColor: '#722ED1', type: 'image', coverSeed: 'fish_basket', coverHeight: 165, title: '今天钓的鱼，够吃好几顿了', likes: 234, comments: 58, saves: 98, shares: 24 },
  ],
  16: [
    { id: 661, userId: 16, user: '郑阿姨', avatar: '郑', avatarColor: '#13C2C2', type: 'image', coverSeed: 'spicy_noodles', coverHeight: 200, title: '川味凉面做法，天热吃正好！', likes: 189, comments: 48, saves: 81, shares: 20 },
    { id: 662, userId: 16, user: '郑阿姨', avatar: '郑', avatarColor: '#13C2C2', type: 'video', coverSeed: 'hotpot_recipe', coverHeight: 180, title: '家庭版火锅教程，简单又好吃！', likes: 312, comments: 78, saves: 134, shares: 33 },
    { id: 663, userId: 16, user: '郑阿姨', avatar: '郑', avatarColor: '#13C2C2', type: 'image', coverSeed: 'home_dumplings', coverHeight: 170, title: '周末包饺子，一家人其乐融融', likes: 245, comments: 62, saves: 105, shares: 26 },
  ],
  17: [
    { id: 671, userId: 17, user: '冯大叔', avatar: '冯', avatarColor: '#FF6B35', type: 'video', coverSeed: 'free_teaching', coverHeight: 190, title: '太极拳免费教学，想学的来！', likes: 456, comments: 112, saves: 198, shares: 49 },
    { id: 672, userId: 17, user: '冯大叔', avatar: '冯', avatarColor: '#FF6B35', type: 'image', coverSeed: 'morning_group', coverHeight: 175, title: '晨练队伍越来越壮大了！', likes: 287, comments: 69, saves: 118, shares: 29 },
  ],
  18: [
    { id: 681, userId: 18, user: '蒋奶奶', avatar: '蒋', avatarColor: '#FAAD14', type: 'video', coverSeed: 'knitting_love', coverHeight: 180, title: '手工编织送温暖，给山区孩子织帽子', likes: 523, comments: 128, saves: 218, shares: 54 },
    { id: 682, userId: 18, user: '蒋奶奶', avatar: '蒋', avatarColor: '#FAAD14', type: 'image', coverSeed: 'handmade_scarf', coverHeight: 195, title: '新织的围巾，花样简单又好看', likes: 367, comments: 89, saves: 154, shares: 38 },
  ],
  201: [
    { id: 701, userId: 201, user: '周奶奶', avatar: '周', avatarColor: '#722ED1', type: 'video', coverSeed: 'senior_dance', coverHeight: 200, title: '老年人也能跳的广场舞，动作简单又健身！', likes: 18920, comments: 4532, saves: 18920, shares: 4532 },
    { id: 702, userId: 201, user: '周奶奶', avatar: '周', avatarColor: '#722ED1', type: 'image', coverSeed: 'daily_routine', coverHeight: 180, title: '我的退休生活，每天充实又快乐', likes: 12340, comments: 2987, saves: 12340, shares: 2987 },
    { id: 703, userId: 201, user: '周奶奶', avatar: '周', avatarColor: '#722ED1', type: 'video', coverSeed: 'health_tips', coverHeight: 185, title: '老年人养生三要素，早睡早起好心情', likes: 21450, comments: 5189, saves: 21450, shares: 5189 },
    { id: 704, userId: 201, user: '周奶奶', avatar: '周', avatarColor: '#722ED1', type: 'image', coverSeed: 'smile_face', coverHeight: 170, title: '保持好心态，笑容面对每一天', likes: 9876, comments: 2341, saves: 9876, shares: 2341 },
  ],
  301: [
    { id: 801, userId: 301, user: '黄奶奶', avatar: '黄', avatarColor: '#FAAD14', type: 'image', coverSeed: 'balcony_flowers', coverHeight: 200, title: '阳台上的小花园，每天浇浇水心情好', likes: 134, comments: 34, saves: 57, shares: 14 },
    { id: 802, userId: 301, user: '黄奶奶', avatar: '黄', avatarColor: '#FAAD14', type: 'video', coverSeed: 'planting_tips', coverHeight: 175, title: '种花小技巧，让你的阳台变成小花园', likes: 198, comments: 49, saves: 82, shares: 20 },
  ],
  302: [
    { id: 811, userId: 302, user: '苏阿姨', avatar: '苏', avatarColor: '#EB2F96', type: 'video', coverSeed: 'night_chongqing', coverHeight: 200, title: '重庆夜景手机拍摄教程，方法简单效果好', likes: 267, comments: 68, saves: 113, shares: 28 },
    { id: 812, userId: 302, user: '苏阿姨', avatar: '苏', avatarColor: '#EB2F96', type: 'image', coverSeed: 'old_street', coverHeight: 185, title: '磁器口老街扫街，每一处都是风景', likes: 189, comments: 47, saves: 79, shares: 19 },
    { id: 813, userId: 302, user: '苏阿姨', avatar: '苏', avatarColor: '#EB2F96', type: 'image', coverSeed: 'spring_cherry', coverHeight: 170, title: '南山上拍樱花，人在花中笑', likes: 312, comments: 78, saves: 132, shares: 32 },
  ],
  303: [
    { id: 821, userId: 303, user: '胡大爷', avatar: '胡', avatarColor: '#722ED1', type: 'image', coverSeed: 'chess_battle', coverHeight: 195, title: '棋逢对手乐在其中，欢迎来挑战！', likes: 145, comments: 37, saves: 62, shares: 15 },
    { id: 822, userId: 303, user: '胡大爷', avatar: '胡', avatarColor: '#722ED1', type: 'video', coverSeed: 'chess_tutorial', coverHeight: 175, title: '象棋入门讲座，新手必看！', likes: 223, comments: 56, saves: 94, shares: 23 },
  ],
  304: [
    { id: 831, userId: 304, user: '杨奶奶', avatar: '杨', avatarColor: '#1677FF', type: 'video', coverSeed: 'taiji_morning_park', coverHeight: 190, title: '太极拳晨练，跟我一起动起来！', likes: 178, comments: 45, saves: 76, shares: 18 },
    { id: 832, userId: 304, user: '杨奶奶', avatar: '杨', avatarColor: '#1677FF', type: 'image', coverSeed: 'park_exercise', coverHeight: 165, title: '清晨公园锻炼，精神矍铄每一天', likes: 134, comments: 34, saves: 57, shares: 14 },
  ],
  305: [
    { id: 841, userId: 305, user: '徐大叔', avatar: '徐', avatarColor: '#52C41A', type: 'video', coverSeed: 'river_breeze', coverHeight: 185, title: '江边垂钓享受宁静，退休生活真惬意', likes: 198, comments: 50, saves: 84, shares: 21 },
    { id: 842, userId: 305, user: '徐大叔', avatar: '徐', avatarColor: '#52C41A', type: 'image', coverSeed: 'fish_catch', coverHeight: 170, title: '今天鱼口不错，收获满满！', likes: 156, comments: 39, saves: 66, shares: 16 },
  ],
  306: [
    { id: 851, userId: 306, user: '朱阿姨', avatar: '朱', avatarColor: '#FF6B35', type: 'image', coverSeed: 'mapo_tofu', coverHeight: 200, title: '家常麻婆豆腐，麻辣鲜香下饭神器！', likes: 245, comments: 62, saves: 104, shares: 25 },
    { id: 852, userId: 306, user: '朱阿姨', avatar: '朱', avatarColor: '#FF6B35', type: 'video', coverSeed: 'sichuan_cuisine', coverHeight: 180, title: '川菜入门教学，学会这几道就够了', likes: 389, comments: 98, saves: 165, shares: 41 },
    { id: 853, userId: 306, user: '朱阿姨', avatar: '朱', avatarColor: '#FF6B35', type: 'image', coverSeed: 'home_cooking', coverHeight: 170, title: '今天做了回锅肉，香得不得了', likes: 312, comments: 78, saves: 132, shares: 32 },
  ],
  307: [
    { id: 861, userId: 307, user: '马大爷', avatar: '马', avatarColor: '#13C2C2', type: 'video', coverSeed: 'bird_singing', coverHeight: 175, title: '清晨遛鸟听歌，大爷的一天开始了', likes: 167, comments: 42, saves: 71, shares: 17 },
    { id: 862, userId: 307, user: '马大爷', avatar: '马', avatarColor: '#13C2C2', type: 'image', coverSeed: 'park_morning', coverHeight: 160, title: '公园里遛鸟交朋友，乐趣无穷', likes: 123, comments: 31, saves: 52, shares: 13 },
  ],
  308: [
    { id: 871, userId: 308, user: '唐奶奶', avatar: '唐', avatarColor: '#FA8C16', type: 'video', coverSeed: 'square_dance_fun', coverHeight: 190, title: '广场舞时间到！大家一起跳起来', likes: 445, comments: 109, saves: 189, shares: 46 },
    { id: 872, userId: 308, user: '唐奶奶', avatar: '唐', avatarColor: '#FA8C16', type: 'image', coverSeed: 'dance_venue', coverHeight: 175, title: '新排的舞步，大家说好不好看？', likes: 289, comments: 71, saves: 122, shares: 30 },
    { id: 873, userId: 308, user: '唐奶奶', avatar: '唐', avatarColor: '#FA8C16', type: 'video', coverSeed: 'dance_practice', coverHeight: 185, title: '舞蹈队训练日常，辛苦但快乐着', likes: 367, comments: 89, saves: 156, shares: 38 },
  ],
  309: [
    { id: 881, userId: 309, user: '郭大叔', avatar: '郭', avatarColor: '#FAAD14', type: 'image', coverSeed: 'chinese_calligraphy', coverHeight: 200, title: '静心练字修身养性，书法伴我每一天', likes: 178, comments: 45, saves: 76, shares: 18 },
    { id: 882, userId: 309, user: '郭大叔', avatar: '郭', avatarColor: '#FAAD14', type: 'video', coverSeed: 'brush_tutorial', coverHeight: 175, title: '毛笔字入门教程，新手也能写出好字', likes: 234, comments: 58, saves: 99, shares: 24 },
  ],
  310: [
    { id: 891, userId: 310, user: '何阿姨', avatar: '何', avatarColor: '#EB2F96', type: 'image', coverSeed: 'knitted_beanie', coverHeight: 190, title: '新织的毛线帽，冬天戴正合适', likes: 298, comments: 75, saves: 126, shares: 31 },
    { id: 892, userId: 310, user: '何阿姨', avatar: '何', avatarColor: '#EB2F96', type: 'video', coverSeed: 'crochet_flowers', coverHeight: 175, title: '钩针编织花朵教程，简单好看送人佳品', likes: 412, comments: 103, saves: 175, shares: 43 },
    { id: 893, userId: 310, user: '何阿姨', avatar: '何', avatarColor: '#EB2F96', type: 'image', coverSeed: 'winter_knitting', coverHeight: 185, title: '给孙女织的围巾，粉色她最喜欢', likes: 345, comments: 86, saves: 146, shares: 36 },
  ],
};

function getUserPosts(userId: number): FollowPost[] {
  const fromFollow = FOLLOW_POSTS.filter(p => p.userId === userId);
  const extra = USER_EXTRA_POSTS[userId] || [];
  const seen = new Set<number>();
  return [...fromFollow, ...extra].filter(p => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}

const CHATS = [
  { id: 1, name: '亲朋好友', avatar: '亲', color: '#FF6B35', msg: '张大爷：明天我来接你去公园玩！', time: '09:23', unread: 3, members: 28, userId: 1 },
  { id: 2, name: '同事', avatar: '同', color: '#1677FF', msg: '刘经理：下午三点部门会议，请准时参加', time: '2026-04-22', unread: 7, members: 57, userId: 12 },
  { id: 3, name: '同学', avatar: '学', color: '#52C41A', msg: '王华：下周六同学聚会，记得来啊！', time: '2026-04-22', unread: 0, members: 63, userId: 11 },
  { id: 4, name: '战友', avatar: '战', color: '#722ED1', msg: '李连长：战友情！想念大家了', time: '周一', unread: 0, members: 105, userId: 13 },
  { id: 5, name: '棋牌搭子', avatar: '棋', color: '#13C2C2', msg: '赵大爷：今天下午有空吗？来打牌！', time: '周一', unread: 2, members: 15, userId: 15 },
  { id: 6, name: '新城丽都小区', avatar: '邻', color: '#EB2F96', msg: '社区通知：本周末垃圾分类宣传活动', time: '周二', unread: 0, members: 145, userId: 16 },
  { id: 7, name: '全国城市军团长', avatar: '军', color: '#FA8C16', msg: '团长：各位弟兄注意，任务已下达！', time: '周三', unread: 0, userId: 17 },
  { id: 8, name: '重庆战区', avatar: '渝', color: '#7C3AED', msg: '战区指挥：今日补给已到位，请各队领取', time: '周三', unread: 0, userId: 18 },
  { id: 9, name: '两江分区', avatar: '江', color: '#0EA5E9', msg: '分区长：明天例会在江北分部举行', time: '周四', unread: 0, userId: 5 },
  { id: 10, name: '龙山社区', avatar: '龙', color: '#10B981', msg: '社区通知：端午节活动报名开始啦！', time: '上周', unread: 0, members: 0, userId: 14 },
  { id: 11, name: '新城丽都三大队', avatar: '队', color: '#F59E0B', msg: '大队长：本月活跃榜出炉，感谢各位队员！', time: '上周', unread: 0, userId: 3 },
];

const PROFILE_MENUS = [
  { label: '我的动态', Icon: AppstoreOutlined, count: 23, badge: undefined },
  { label: '我的收藏', Icon: StarOutlined, count: 47, badge: undefined },
  { label: '积分商城', Icon: GiftOutlined, count: undefined, badge: '320积分' },
  { label: '我的订单', Icon: ShoppingOutlined, count: 2, badge: undefined },
  { label: '优惠券', Icon: TagOutlined, count: undefined, badge: '3张可用' },
  { label: '每日任务', Icon: CheckCircleOutlined, count: undefined, badge: '待完成' },
  { label: '意见反馈', Icon: SmileOutlined, count: undefined, badge: undefined },
  { label: '账号设置', Icon: SettingOutlined, count: undefined, badge: undefined },
];

const MY_DYNAMICS_POSTS: FollowPost[] = [
  { id: 901, userId: 0, user: '张大爷', avatar: '张', avatarColor: '#FF6B35', type: 'image', coverSeed: 'my_post_1', coverHeight: 180, title: '今天早晨在公园打太极，神清气爽！', likes: 128, comments: 32, saves: 54, shares: 13, date: '2026-03-28' },
  { id: 902, userId: 0, user: '张大爷', avatar: '张', avatarColor: '#FF6B35', type: 'video', coverSeed: 'my_post_2', coverHeight: 210, title: '分享一段广场舞视频，大家跟着一起跳！', likes: 356, comments: 91, saves: 148, shares: 37, date: '2026-03-28' },
  { id: 907, userId: 0, user: '张大爷', avatar: '张', avatarColor: '#FF6B35', type: 'image', coverSeed: 'my_post_7', coverHeight: 175, title: '傍晚散步，夕阳下的南山真美', likes: 93, comments: 24, saves: 39, shares: 9, date: '2026-03-28' },
  { id: 903, userId: 0, user: '张大爷', avatar: '张', avatarColor: '#FF6B35', type: 'image', coverSeed: 'my_post_3', coverHeight: 165, title: '重庆的秋天真美，来一张南滨路照片', likes: 89, comments: 22, saves: 37, shares: 8, date: '2026-03-20' },
  { id: 904, userId: 0, user: '张大爷', avatar: '张', avatarColor: '#FF6B35', type: 'image', coverSeed: 'my_post_4', coverHeight: 195, title: '孙子来看我了，老人最开心的时刻', likes: 412, comments: 107, saves: 172, shares: 44, date: '2026-03-15' },
  { id: 905, userId: 0, user: '张大爷', avatar: '张', avatarColor: '#FF6B35', type: 'video', coverSeed: 'my_post_5', coverHeight: 185, title: '学做一道川味红烧肉，香！', likes: 234, comments: 61, saves: 98, shares: 24, date: '2026-03-10' },
  { id: 906, userId: 0, user: '张大爷', avatar: '张', avatarColor: '#FF6B35', type: 'image', coverSeed: 'my_post_6', coverHeight: 170, title: '书法练习，今天写了个福字，修身养性！', likes: 167, comments: 43, saves: 69, shares: 16, date: '2026-03-05' },
];

const MY_FAVORITES_POSTS: FollowPost[] = [
  { id: 801, userId: 1, user: '李秀英', avatar: '李', avatarColor: '#FF6B35', type: 'image', coverSeed: 'fav_1', coverHeight: 175, title: '广场舞最新舞步，跟着一起学！', likes: 342, comments: 85, saves: 143, shares: 35, date: '2026-03-29' },
  { id: 807, userId: 5, user: '陈大叔', avatar: '陈', avatarColor: '#722ED1', type: 'video', coverSeed: 'fav_7', coverHeight: 200, title: '老年健步走打卡，每天走够8000步', likes: 213, comments: 54, saves: 89, shares: 22, date: '2026-03-29' },
  { id: 808, userId: 6, user: '刘奶奶', avatar: '刘', avatarColor: '#13C2C2', type: 'image', coverSeed: 'fav_8', coverHeight: 180, title: '手工编织围巾，送给孙子的礼物', likes: 445, comments: 112, saves: 186, shares: 47, date: '2026-03-29' },
  { id: 802, userId: 2, user: '王翠华', avatar: '王', avatarColor: '#52C41A', type: 'video', coverSeed: 'fav_2', coverHeight: 205, title: '公园里的荷花盛开了，真美！', likes: 278, comments: 69, saves: 115, shares: 28, date: '2026-03-27' },
  { id: 803, userId: 4, user: '赵美云', avatar: '赵', avatarColor: '#EB2F96', type: 'image', coverSeed: 'fav_3', coverHeight: 185, title: '分享一道养生红枣银耳汤的做法', likes: 519, comments: 131, saves: 216, shares: 55, date: '2026-03-22' },
  { id: 804, userId: 11, user: '陈大爷', avatar: '陈', avatarColor: '#FA8C16', type: 'image', coverSeed: 'fav_4', coverHeight: 160, title: '晨练太极，每天都是好心情', likes: 234, comments: 58, saves: 96, shares: 23, date: '2026-03-22' },
  { id: 805, userId: 12, user: '孙阿姨', avatar: '孙', avatarColor: '#52C41A', type: 'video', coverSeed: 'fav_5', coverHeight: 215, title: '教你做重庆正宗小面，香辣过瘾！', likes: 687, comments: 176, saves: 289, shares: 73, date: '2026-03-18' },
  { id: 806, userId: 3, user: '张师傅', avatar: '张', avatarColor: '#1677FF', type: 'image', coverSeed: 'fav_6', coverHeight: 190, title: '书法班的同学们写的春联，各有千秋', likes: 156, comments: 39, saves: 64, shares: 15, date: '2026-03-12' },
];

// 用户的点赞记录（"喜欢"Tab）
const MY_LIKES_POSTS: FollowPost[] = [
  { id: 701, userId: 1, user: '李秀英', avatar: '李', avatarColor: '#FF6B35', type: 'video', coverSeed: 'like_1', coverHeight: 200, title: '广场舞最新舞步，跟着一起学！', likes: 342, comments: 85, saves: 143, shares: 35, date: '2026-04-15' },
  { id: 702, userId: 2, user: '王翠华', avatar: '王', avatarColor: '#52C41A', type: 'image', coverSeed: 'like_2', coverHeight: 175, title: '公园里的荷花盛开了，真美！', likes: 278, comments: 69, saves: 115, shares: 28, date: '2026-04-10' },
  { id: 703, userId: 4, user: '赵美云', avatar: '赵', avatarColor: '#EB2F96', type: 'image', coverSeed: 'like_3', coverHeight: 185, title: '分享一道养生红枣银耳汤的做法', likes: 519, comments: 131, saves: 216, shares: 55, date: '2026-04-08' },
  { id: 704, userId: 11, user: '陈大爷', avatar: '陈', avatarColor: '#FA8C16', type: 'video', coverSeed: 'like_4', coverHeight: 205, title: '晨练太极，每天都是好心情', likes: 234, comments: 58, saves: 96, shares: 23, date: '2026-04-05' },
  { id: 705, userId: 12, user: '孙阿姨', avatar: '孙', avatarColor: '#52C41A', type: 'image', coverSeed: 'like_5', coverHeight: 190, title: '教你做重庆正宗小面，香辣过瘾！', likes: 687, comments: 176, saves: 289, shares: 73, date: '2026-04-02' },
  { id: 706, userId: 3, user: '张师傅', avatar: '张', avatarColor: '#1677FF', type: 'video', coverSeed: 'like_6', coverHeight: 195, title: '钓鱼达人分享：嘉陵江野钓技巧', likes: 456, comments: 118, saves: 198, shares: 52, date: '2026-03-28' },
  { id: 707, userId: 5, user: '陈大叔', avatar: '陈', avatarColor: '#722ED1', type: 'image', coverSeed: 'like_7', coverHeight: 180, title: '书法练习，坚持了三个月，进步明显', likes: 189, comments: 47, saves: 78, shares: 19, date: '2026-03-25' },
  { id: 708, userId: 6, user: '刘奶奶', avatar: '刘', avatarColor: '#13C2C2', type: 'image', coverSeed: 'like_8', coverHeight: 175, title: '阳台种花日记，春暖花开的日子', likes: 321, comments: 82, saves: 134, shares: 33, date: '2026-03-22' },
  { id: 709, userId: 13, user: '刘大叔', avatar: '刘', avatarColor: '#1677FF', type: 'video', coverSeed: 'like_9', coverHeight: 210, title: '太极拳入门教学，适合初学者', likes: 578, comments: 145, saves: 241, shares: 61, date: '2026-03-18' },
  { id: 710, userId: 14, user: '吴奶奶', avatar: '吴', avatarColor: '#EB2F96', type: 'image', coverSeed: 'like_10', coverHeight: 165, title: '手工编织作品展示，孙女很喜欢', likes: 267, comments: 67, saves: 111, shares: 27, date: '2026-03-15' },
];

// ─────────────────────────────────────────────
// Mock Data — Notification Screens
// ─────────────────────────────────────────────
interface NotifyLikeItem {
  id: number;
  userId: number;
  user: string;
  avatar: string;
  avatarColor: string;
  postId: number;
  postType: 'image' | 'video';
  coverSeed: string;
  title: string;
  time: string;
}

interface NotifyFavItem {
  id: number;
  userId: number;
  user: string;
  avatar: string;
  avatarColor: string;
  postId: number;
  coverSeed: string;
  title: string;
  time: string;
}

interface NotifyCommentItem {
  id: number;
  userId: number;
  user: string;
  avatar: string;
  avatarColor: string;
  type: 'comment' | 'reply' | 'mention';
  commentText: string;
  postId: number;
  postTitle: string;
  coverSeed: string;
  time: string;
}

interface NotifyFanItem {
  id: number;
  userId: number;
  user: string;
  avatar: string;
  avatarColor: string;
  bio: string;
  time: string;
  isFollowed: boolean;
}

const NOTIFY_LIKES_DATA: NotifyLikeItem[] = [
  { id: 1, userId: 1, user: '李秀英', avatar: '李', avatarColor: '#FF6B35', postId: 901, postType: 'image', coverSeed: 'my_post_1', title: '嘉陵江边的清晨太美了，分享给大家', time: '1分钟前' },
  { id: 2, userId: 4, user: '赵美云', avatar: '赵', avatarColor: '#EB2F96', postId: 902, postType: 'video', coverSeed: 'my_post_2', title: '太极晨练第365天，坚持就是胜利！', time: '3分钟前' },
  { id: 3, userId: 2, user: '王翠华', avatar: '王', avatarColor: '#52C41A', postId: 903, postType: 'image', coverSeed: 'my_post_3', title: '重庆的秋天真美，来一张南滨路照片', time: '12分钟前' },
  { id: 4, userId: 11, user: '陈大爷', avatar: '陈', avatarColor: '#FA8C16', postId: 905, postType: 'video', coverSeed: 'my_post_5', title: '学做一道川味红烧肉，香！', time: '28分钟前' },
  { id: 5, userId: 6, user: '刘奶奶', avatar: '刘', avatarColor: '#13C2C2', postId: 904, postType: 'image', coverSeed: 'my_post_4', title: '孙子来看我了，老人最开心的时刻', time: '1小时前' },
  { id: 6, userId: 12, user: '孙阿姨', avatar: '孙', avatarColor: '#52C41A', postId: 906, postType: 'image', coverSeed: 'my_post_6', title: '书法练习，今天写了个福字，修身养性！', time: '2小时前' },
  { id: 7, userId: 14, user: '吴奶奶', avatar: '吴', avatarColor: '#EB2F96', postId: 901, postType: 'image', coverSeed: 'my_post_1', title: '嘉陵江边的清晨太美了，分享给大家', time: '2026-04-22' },
  { id: 8, userId: 15, user: '周大爷', avatar: '周', avatarColor: '#722ED1', postId: 902, postType: 'video', coverSeed: 'my_post_2', title: '太极晨练第365天，坚持就是胜利！', time: '2026-04-22' },
];

const NOTIFY_FAV_DATA: NotifyFavItem[] = [
  { id: 1, userId: 1, user: '李秀英', avatar: '李', avatarColor: '#FF6B35', postId: 901, coverSeed: 'my_post_1', title: '嘉陵江边的清晨太美了，分享给大家', time: '一分钟前' },
  { id: 2, userId: 4, user: '赵美云', avatar: '赵', avatarColor: '#EB2F96', postId: 903, coverSeed: 'my_post_3', title: '重庆的秋天真美，来一张南滨路照片', time: '10分钟前' },
  { id: 3, userId: 11, user: '陈大爷', avatar: '陈', avatarColor: '#FA8C16', postId: 906, coverSeed: 'my_post_6', title: '书法练习，今天写了个福字，修身养性！', time: '35分钟前' },
  { id: 4, userId: 6, user: '刘奶奶', avatar: '刘', avatarColor: '#13C2C2', postId: 904, coverSeed: 'my_post_4', title: '孙子来看我了，老人最开心的时刻', time: '1小时前' },
  { id: 5, userId: 2, user: '王翠华', avatar: '王', avatarColor: '#52C41A', postId: 901, coverSeed: 'my_post_1', title: '嘉陵江边的清晨太美了，分享给大家', time: '3小时前' },
  { id: 6, userId: 16, user: '郑阿姨', avatar: '郑', avatarColor: '#13C2C2', postId: 903, coverSeed: 'my_post_3', title: '重庆的秋天真美，来一张南滨路照片', time: '2026-04-22' },
];

const NOTIFY_COMMENTS_DATA: NotifyCommentItem[] = [
  { id: 1, userId: 1, user: '李秀英', avatar: '李', avatarColor: '#FF6B35', type: 'comment', commentText: '张大爷，这个地方在哪里？我也想去转转！', postId: 901, postTitle: '嘉陵江边的清晨太美了', coverSeed: 'dyn_1', time: '1分钟前' },
  { id: 2, userId: 4, user: '赵美云', avatar: '赵', avatarColor: '#EB2F96', type: 'reply', commentText: '回复您：红枣要提前泡发两小时，银耳也要充分泡发哦', postId: 902, postTitle: '养生红枣银耳汤做法', coverSeed: 'fav_3', time: '8分钟前' },
  { id: 3, userId: 2, user: '王翠华', avatar: '王', avatarColor: '#52C41A', type: 'mention', commentText: '@张大爷 您来评判一下，这个舞步对不对？', postId: 903, postTitle: '广场舞新编曲《山路十八弯》', coverSeed: 'dyn_5', time: '22分钟前' },
  { id: 4, userId: 11, user: '陈大爷', avatar: '陈', avatarColor: '#FA8C16', type: 'comment', commentText: '八段锦第三式我总是做不标准，能出个详细教程吗', postId: 904, postTitle: '养生八段锦跟练', coverSeed: 'dyn_4', time: '45分钟前' },
  { id: 5, userId: 12, user: '孙阿姨', avatar: '孙', avatarColor: '#52C41A', type: 'reply', commentText: '回复您：谢谢您的鼓励，我会继续坚持分享的！', postId: 905, postTitle: '太极晨练第365天', coverSeed: 'dyn_3', time: '1小时前' },
  { id: 6, userId: 6, user: '刘奶奶', avatar: '刘', avatarColor: '#13C2C2', type: 'comment', commentText: '火锅底料超市买的总是不够香，这个自制方法太好了', postId: 906, postTitle: '重庆火锅底料自制教程', coverSeed: 'dyn_2', time: '2小时前' },
  { id: 7, userId: 15, user: '周大爷', avatar: '周', avatarColor: '#722ED1', type: 'mention', commentText: '@张大爷 快来看，嘉陵江鱼上钩了！', postId: 907, postTitle: '嘉陵江畔垂钓', coverSeed: 'fav_6', time: '2026-04-22' },
];

const NOTIFY_FANS_DATA: NotifyFanItem[] = [
  { id: 1, userId: 13, user: '刘大叔', avatar: '刘', avatarColor: '#1677FF', bio: '太极拳八段锦传授者，习武三十年', time: '一分钟前', isFollowed: false },
  { id: 2, userId: 14, user: '吴奶奶', avatar: '吴', avatarColor: '#EB2F96', bio: '阳台园艺爱好者，花花草草是我的快乐', time: '10分钟前', isFollowed: true },
  { id: 3, userId: 16, user: '郑阿姨', avatar: '郑', avatarColor: '#13C2C2', bio: '简单食材做出好味道，快乐厨房', time: '1小时前', isFollowed: false },
  { id: 4, userId: 17, user: '冯大叔', avatar: '冯', avatarColor: '#FF6B35', bio: '太极拳教练，免费教学欢迎加入', time: '3小时前', isFollowed: false },
  { id: 5, userId: 18, user: '蒋奶奶', avatar: '蒋', avatarColor: '#FAAD14', bio: '给家人编织温暖是最大的幸福', time: '2026-04-22', isFollowed: true },
  { id: 6, userId: 15, user: '周大爷', avatar: '周', avatarColor: '#722ED1', bio: '钓鱼达人，嘉陵江边是我的主场', time: '2026-04-22', isFollowed: false },
  { id: 7, userId: 12, user: '孙阿姨', avatar: '孙', avatarColor: '#52C41A', bio: '科学养生、快乐生活', time: '2026-04-22', isFollowed: true },
];

// ─────────────────────────────────────────────
// Mock Data — Contacts Screen
// ─────────────────────────────────────────────
interface FriendRequest {
  id: number;
  name: string;
  avatar: string;
  color: string;
  msg: string;
  time: string;
}

interface FriendItem {
  id: number;
  name: string;
  avatar: string;
  color: string;
  status: string;
  note?: string;
  yishouNumber?: string;
}

const FRIEND_REQUESTS: FriendRequest[] = [
  { id: 101, name: '陈大叔', avatar: '陈', color: '#722ED1', msg: '我在书法绘画圈认识你，想加你好友', time: '一分钟前' },
  { id: 102, name: '周大爷', avatar: '周', color: '#722ED1', msg: '我是太极拳队队友，请添加好友', time: '2026-04-22' },
  { id: 103, name: '蒋奶奶', avatar: '蒋', color: '#FAAD14', msg: '我是益寿好友，请通过我的好友申请', time: '3天前' },
];

const FRIENDS_LIST: FriendItem[] = [
  { id: 1, name: '哈哈啦', avatar: '哈', color: '#FF6B35', status: '今天开心！', note: '彭亚男', yishouNumber: 'NZV5UIWQ' },
  { id: 2, name: '王翠华', avatar: '王', color: '#52C41A', status: '记录生活每一天 🌸', note: '王姐', yishouNumber: 'WANG158CUH' },
  { id: 4, name: '赵美云', avatar: '赵', color: '#EB2F96', status: '爱美食爱生活，厨房里的快乐大厨', note: '赵姐', yishouNumber: 'ZHAO87MEIYU' },
  { id: 6, name: '刘奶奶', avatar: '刘', color: '#13C2C2', status: '手工编织达人，一针一线织出温暖和爱', note: '刘阿姨', yishouNumber: 'LIU66NAINAI' },
  { id: 11, name: '陈大爷', avatar: '陈', color: '#FA8C16', status: '退休后每天跳舞健身，活力满满！', note: '老陈', yishouNumber: 'CHEN189DAD' },
  { id: 12, name: '孙阿姨', avatar: '孙', color: '#52C41A', status: '科学养生、快乐生活', note: '孙姐', yishouNumber: 'SUN223AYI' },
  { id: 13, name: '刘大叔', avatar: '刘', color: '#1677FF', status: '太极拳八段锦传授者，习武三十年', note: '太极刘', yishouNumber: 'LIU777DASHU' },
  { id: 14, name: '吴奶奶', avatar: '吴', color: '#EB2F96', status: '阳台园艺爱好者，花花草草是我的快乐', note: '吴姨', yishouNumber: 'WU345NAINAI' },
  { id: 15, name: '周大爷', avatar: '周', color: '#722ED1', status: '钓鱼达人，嘉陵江边是我的主场', note: '钓鱼周', yishouNumber: 'ZHOU668DAD' },
  { id: 16, name: '郑阿姨', avatar: '郑', color: '#13C2C2', status: '简单食材做出好味道，快乐厨房', note: '郑姐', yishouNumber: 'ZHENG99AYI' },
  { id: 17, name: '冯大叔', avatar: '冯', color: '#FF6B35', status: '太极拳教练，免费教学欢迎加入', note: '老冯', yishouNumber: 'FENG112DSHU' },
  { id: 18, name: '蒋奶奶', avatar: '蒋', color: '#FAAD14', status: '给家人编织温暖是最大的幸福 🧶', note: '蒋姨', yishouNumber: 'JIANG78NNAI' },
];

// ─────────────────────────────────────────────
// Mock Data — 便民服务（助浴/助洁/助医/助急/助行/疗养/活动）
// ─────────────────────────────────────────────
interface ServiceStaff {
  id: number; name: string; cert: string; rating: number; orders: number; imageSeed: string; available: boolean;
}
interface ZhuyuInstitution {
  id: number; name: string; address: string; rating: number; orders: number; price: string; tags: string[]; imageSeed: string; highlight?: string;
}
interface ZhuyiCompany {
  id: number; name: string; address: string; distance: string; rating: number; ratingCount: number; hours: string; price: string; tags: string[]; image: string; highlight?: string;
}
interface CleanPackage {
  id: number; name: string; price: number; duration: string; items: string[]; popular: boolean;
}
interface EmergencyContact {
  id: number; label: string; phone: string; color: string; bg: string;
}
interface ZhujuCompany {
  id: number; name: string; address: string; distance: string; rating: number; ratingCount: number; hours: string; price: string; tags: string[]; image: string; highlight?: string;
}
interface ZhuxingCompany {
  id: number; name: string; address: string; distance: string; rating: number; ratingCount: number; hours: string; price: string; tags: string[]; image: string; highlight?: string;
}
interface TransportType {
  id: string; label: string; desc: string; color: string; bg: string;
}
interface CareInstitution {
  id: number; name: string; distance: string; rating: number; ratingCount: number; price: string; tags: string[]; image: string; highlight?: string;
}
interface LocalActivity {
  id: number; title: string; category: string; date: string; location: string; enrolled: number; maxEnroll: number; image: string; organizer: string;
}

const ZHUYU_STAFF: ServiceStaff[] = [
  { id: 1, name: '李护理', cert: '中级养老护理员', rating: 4.9, orders: 312, imageSeed: 'nurse_f1', available: true },
  { id: 2, name: '王阿姨', cert: '高级护理师', rating: 4.8, orders: 256, imageSeed: 'nurse_f2', available: true },
  { id: 3, name: '陈护工', cert: '初级养老护理员', rating: 4.7, orders: 189, imageSeed: 'nurse_m1', available: false },
  { id: 4, name: '刘师傅', cert: '高级养老护理员', rating: 5.0, orders: 421, imageSeed: 'nurse_m2', available: true },
];

const ZHUYU_INSTITUTIONS: ZhuyuInstitution[] = [
  { id: 1, name: '渝中区康护服务中心', address: '渝中区中山路122号', rating: 4.9, orders: 1286, price: '88元/次', tags: ['持证护理', '专业设备', '上门服务'], imageSeed: 'zhuyu_inst_1', highlight: '官方认证' },
  { id: 2, name: '爱心助浴养老院', address: '江北区观音桥街道50号', rating: 4.8, orders: 956, price: '78元/次', tags: ['经验丰富', '安全保障', '好评如潮'], imageSeed: 'zhuyu_inst_2' },
  { id: 3, name: '福寿康养服务中心', address: '南岸区南坪镇南湖路88号', rating: 4.7, orders: 734, price: '68元/次', tags: ['价格实惠', '服务周到'], imageSeed: 'zhuyu_inst_3' },
  { id: 4, name: '夕阳红助浴站', address: '沙坪坝区小龙坎正街120号', rating: 4.9, orders: 1089, price: '98元/次', tags: ['连锁机构', '专业团队', '好评如潮'], imageSeed: 'zhuyu_inst_4', highlight: '连锁品牌' },
];

const ZHUYI_COMPANIES: ZhuyiCompany[] = [
  { id: 1, name: '陪诊无忧·渝中服务站', address: '渝中区解放碑街道88号', distance: '0.8km', rating: 4.9, ratingCount: 512, hours: '07:00 - 22:00', price: '128', tags: ['持证陪诊', '三甲经验', '全程陪同'], image: 'https://picsum.photos/seed/medical1/120/90' },
  { id: 2, name: '健康守护·江北站', address: '江北区观音桥街道108号', distance: '1.5km', rating: 4.8, ratingCount: 386, hours: '08:00 - 21:00', price: '148', tags: ['专业团队', '预约快速', '医嘱记录'], image: 'https://picsum.photos/seed/medical2/120/90' },
  { id: 3, name: '医路相伴·南岸店', address: '南岸区南坪街道168号', distance: '2.1km', rating: 4.7, ratingCount: 267, hours: '07:30 - 20:30', price: '118', tags: ['细心周到', '家属沟通', '取药服务'], image: 'https://picsum.photos/seed/medical3/120/90' },
  { id: 4, name: '安心陪诊·沙坪坝店', address: '沙坪坝区小龙坎正街88号', distance: '2.8km', rating: 4.6, ratingCount: 198, hours: '08:00 - 19:00', price: '108', tags: ['价格实惠', '准时守约', '好评如潮'], image: 'https://picsum.photos/seed/medical4/120/90' },
];

const ZHUYI_STAFF: ServiceStaff[] = [
  { id: 1, name: '赵陪诊', cert: '专业陪诊员', rating: 4.9, orders: 428, imageSeed: 'escort_f1', available: true },
  { id: 2, name: '孙助医', cert: '医疗辅助师', rating: 4.8, orders: 367, imageSeed: 'escort_m1', available: true },
  { id: 3, name: '周陪护', cert: '专业陪诊员', rating: 4.9, orders: 512, imageSeed: 'escort_f2', available: false },
  { id: 4, name: '吴助理', cert: '医疗辅助师', rating: 4.7, orders: 234, imageSeed: 'escort_m2', available: true },
];

const ZHUJIE_PACKAGES: CleanPackage[] = [
  { id: 1, name: '基础清洁', price: 68, duration: '约2小时', items: ['地面清扫拖擦', '卫生间清洁消毒', '厨房台面清洁'], popular: false },
  { id: 2, name: '深度清洁', price: 128, duration: '约4小时', items: ['全屋深度清洁', '油烟机深度清洗', '冰箱内壁消毒', '浴室去垢'], popular: true },
  { id: 3, name: '专项保洁', price: 98, duration: '约3小时', items: ['床单枕套换洗', '窗帘除尘除螨', '沙发地毯吸尘'], popular: false },
];

const ZHJU_COMPANIES: ZhujuCompany[] = [
  { id: 1, name: '急救服务·渝中中心', address: '渝中区解放碑街道66号', distance: '0.6km', rating: 4.9, ratingCount: 856, hours: '24小时', price: '88', tags: ['24H在线', '极速响应', '专业急救'], image: 'https://picsum.photos/seed/emergency1/120/90', highlight: '24小时在线' },
  { id: 2, name: '紧急救援·江北站', address: '江北区观音桥街道88号', distance: '1.3km', rating: 4.8, ratingCount: 624, hours: '24小时', price: '98', tags: ['专业团队', '3分钟内响应', '设备齐全'], image: 'https://picsum.photos/seed/emergency2/120/90' },
  { id: 3, name: '应急服务·南岸店', address: '南岸区南坪街道128号', distance: '2.0km', rating: 4.7, ratingCount: 412, hours: '24小时', price: '78', tags: ['经验丰富', '覆盖广泛', '价格实惠'], image: 'https://picsum.photos/seed/emergency3/120/90' },
  { id: 4, name: '平安急救·沙坪坝店', address: '沙坪坝区小龙坎正街66号', distance: '2.6km', rating: 4.6, ratingCount: 298, hours: '24小时', price: '68', tags: ['社区合作', '口碑良好', '快速到场'], image: 'https://picsum.photos/seed/emergency4/120/90' },
];

const ZHUXING_COMPANIES: ZhuxingCompany[] = [
  { id: 1, name: '出行无忧·渝中服务站', address: '渝中区解放碑街道78号', distance: '0.5km', rating: 4.9, ratingCount: 678, hours: '06:00 - 23:00', price: '38', tags: ['专属司机', '无障碍车', '全程陪同'], image: 'https://picsum.photos/seed/transport1/120/90', highlight: '支持轮椅' },
  { id: 2, name: '安心出行·江北站', address: '江北区观音桥街道98号', distance: '1.2km', rating: 4.8, ratingCount: 512, hours: '07:00 - 22:00', price: '48', tags: ['准时守约', '专业培训', '保险保障'], image: 'https://picsum.photos/seed/transport2/120/90' },
  { id: 3, name: '伴你行·南岸店', address: '南岸区南坪街道138号', distance: '1.8km', rating: 4.7, ratingCount: 356, hours: '06:30 - 21:30', price: '35', tags: ['价格实惠', '覆盖广泛', '好评如潮'], image: 'https://picsum.photos/seed/transport3/120/90' },
  { id: 4, name: '乐出行·沙坪坝店', address: '沙坪坝区小龙坎正街78号', distance: '2.3km', rating: 4.6, ratingCount: 245, hours: '07:00 - 21:00', price: '42', tags: ['经验丰富', '安全舒适', '预约快速'], image: 'https://picsum.photos/seed/transport4/120/90' },
];

// ─────────────────────────────────────────────
// Mock Data — 土货拼购
// ─────────────────────────────────────────────
const PINDAN_ACTIVITIES: PindanActivity[] = [
  {
    id: 1,
    title: '春季农家好物',
    description: '来自重庆周边农场的土鸡蛋、土蜂蜜等春季特产',
    coverImage: 'https://picsum.photos/seed/spring_farm_goods/400/200',
    totalQuota: 100,
    remainingQuota: 35,
    startTime: '2026-06-01',
    endTime: '2026-06-15',
    status: 'ongoing',
  },
  {
    id: 2,
    title: '端午粽子专场',
    description: '农家糯米、腊肉粽子，端午送礼首选',
    coverImage: 'https://picsum.photos/seed/dragon_boat_dumpling/400/200',
    totalQuota: 200,
    remainingQuota: 120,
    startTime: '2026-06-05',
    endTime: '2026-06-20',
    status: 'ongoing',
  },
];

const PINDAN_PRODUCTS: PindanProduct[] = [
  // 春季农家好物活动的商品
  { id: 1, activityId: 1, name: '农家土鸡蛋 30枚装', image: 'https://picsum.photos/seed/fresh_eggs/200/200', originalPrice: 68, pindanPrice: 38, description: '来自重庆山区的农家土鸡所产，天然谷物喂养，营养丰富。', stock: 50, sold: 15 },
  { id: 2, activityId: 1, name: '深山土蜂蜜 500g', image: 'https://picsum.photos/seed/honey_jar/200/200', originalPrice: 128, pindanPrice: 78, description: '武陵山深处野生蜂蜜，纯天然无添加，甜而不腻。', stock: 30, sold: 20 },
  { id: 3, activityId: 1, name: '农家腊肉 500g', image: 'https://picsum.photos/seed/dried_meat/200/200', originalPrice: 58, pindanPrice: 35, description: '传统工艺腌制，柴火慢熏，口感香醇。', stock: 80, sold: 45 },
  { id: 4, activityId: 1, name: '高山茶叶 100g', image: 'https://picsum.photos/seed/green_tea_leaves/200/200', originalPrice: 88, pindanPrice: 52, description: '武隆高山茶园，明前采摘，清香回甘。', stock: 40, sold: 25 },
  // 端午粽子专场活动的商品
  { id: 5, activityId: 2, name: '腊肉粽子 10枚装', image: 'https://picsum.photos/seed/rice_balls/200/200', originalPrice: 48, pindanPrice: 28, description: '农家糯米搭配土猪肉，香糯可口。', stock: 100, sold: 30 },
  { id: 6, activityId: 2, name: '红豆粽子 10枚装', image: 'https://picsum.photos/seed/sweet_snacks/200/200', originalPrice: 38, pindanPrice: 22, description: '甜而不腻，红豆沙细腻绵软。', stock: 120, sold: 25 },
  { id: 7, activityId: 2, name: '端午节礼盒', image: 'https://picsum.photos/seed/gift_package/200/200', originalPrice: 168, pindanPrice: 98, description: '含粽子、咸鸭蛋、皮蛋，送礼佳品。', stock: 50, sold: 15 },
];

const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { id: 1, label: '急救电话', phone: '120', color: '#FF4D4F', bg: '#FFF2F0' },
  { id: 2, label: '社区服务', phone: '12345', color: '#1677FF', bg: '#E6F4FF' },
  { id: 3, label: '子女一键联系', phone: '138****6666', color: '#52C41A', bg: '#F6FFED' },
  { id: 4, label: '平台紧急客服', phone: '023-8888-9999', color: '#FF6B35', bg: '#FFF4EF' },
];

const TRANSPORT_TYPES: TransportType[] = [
  { id: 'medical', label: '就医出行', desc: '陪同前往医院，全程协助挂号就诊', color: '#FF4D4F', bg: '#FFF2F0' },
  { id: 'daily', label: '日常出行', desc: '购物买菜、走亲访友', color: '#1677FF', bg: '#E6F4FF' },
  { id: 'tour', label: '休闲出游', desc: '公园景区、周边游览', color: '#52C41A', bg: '#F6FFED' },
];

const LIAOYANG_INSTITUTIONS: CareInstitution[] = [
  { id: 1, name: '重庆颐和康养中心', distance: '1.2km', rating: 4.9, ratingCount: 286, price: '¥188/天', tags: ['三甲合作', '中医调理', '营养餐食'], image: 'care_center_1', highlight: '本周已有12人预约' },
  { id: 2, name: '巴渝夕阳红疗养院', distance: '2.5km', rating: 4.8, ratingCount: 412, price: '¥158/天', tags: ['温泉SPA', '专业护理', '独立房间'], image: 'care_center_2', highlight: '优惠套餐立减50元' },
  { id: 3, name: '南山健康疗养基地', distance: '5.8km', rating: 4.7, ratingCount: 198, price: '¥228/天', tags: ['山地氧吧', '康复理疗', '私家厨房'], image: 'care_center_3' },
  { id: 4, name: '嘉陵江畔老年公寓', distance: '3.1km', rating: 4.6, ratingCount: 321, price: '¥138/天', tags: ['江景客房', '老年餐厅', '健身房'], image: 'care_center_4' },
];

const LOCAL_ACTIVITIES: LocalActivity[] = [
  { id: 1, title: '重庆夕阳红广场舞大赛', category: '文化', date: '4月10日 09:00', location: '解放碑广场', enrolled: 86, maxEnroll: 120, image: 'activity_dance', organizer: '渝中区文化局' },
  { id: 2, title: '中老年健步走活动', category: '健身', date: '4月12日 07:30', location: '南滨路公园', enrolled: 43, maxEnroll: 60, image: 'activity_walk', organizer: '南岸区体育局' },
  { id: 3, title: '书法绘画作品展', category: '兴趣', date: '4月15日 10:00', location: '重庆图书馆', enrolled: 28, maxEnroll: 50, image: 'activity_paint', organizer: '益寿社区中心' },
  { id: 4, title: '太极拳晨练交流会', category: '健身', date: '4月18日 06:30', location: '鹅岭公园', enrolled: 61, maxEnroll: 80, image: 'activity_taichi', organizer: '重庆太极协会' },
  { id: 5, title: '养生知识讲座', category: '社区', date: '4月20日 14:00', location: '江北区社区中心', enrolled: 35, maxEnroll: 100, image: 'activity_lecture', organizer: '益寿健康研究院' },
];

// ─────────────────────────────────────────────
// Mock Data — 新增便民服务（养老社区/周边赶场/聚会中心/大众赛事）
// ─────────────────────────────────────────────
interface YanglaoInstitution {
  id: number; name: string; address: string; distance: string; rating: number; ratingCount: number; hours: string; tags: string[]; image: string; phone: string;
}
interface MarketInfo {
  id: number; name: string; address: string; distance: string; ganjiDays: string; hours: string; image: string; phone: string;
}
interface VenueInfo {
  id: number; name: string; type: string; address: string; distance: string; capacity: string; hours: string; tags: string[]; image: string; phone: string;
}
interface CompetitionInfo {
  id: number; title: string; category: string; date: string; location: string; organizer: string; description: string; requirements: string[]; contact: string; image: string;
}

const YANGLAO_INSTITUTIONS: YanglaoInstitution[] = [
  { id: 1, name: '重庆颐和康养中心', address: '渝中区中山路88号', distance: '0.8km', rating: 4.9, ratingCount: 286, hours: '08:00-20:00', tags: ['持证护理', '医养结合', '环境优美'], image: 'https://picsum.photos/seed/yanglao1/120/90', phone: '023-8888-1001' },
  { id: 2, name: '巴渝夕阳红养老院', address: '江北区观音桥街道50号', distance: '1.5km', rating: 4.8, ratingCount: 412, hours: '24小时', tags: ['专业团队', '营养餐食', '康复理疗'], image: 'https://picsum.photos/seed/yanglao2/120/90', phone: '023-8888-1002' },
  { id: 3, name: '南山康养公寓', address: '南岸区南坪镇南湖路88号', distance: '2.1km', rating: 4.7, ratingCount: 198, hours: '08:00-18:00', tags: ['山地氧吧', '老年大学', '兴趣课程'], image: 'https://picsum.photos/seed/yanglao3/120/90', phone: '023-8888-1003' },
  { id: 4, name: '嘉陵江畔老年公寓', address: '沙坪坝区小龙坎正街66号', distance: '2.8km', rating: 4.6, ratingCount: 321, hours: '08:00-19:00', tags: ['江景客房', '老年餐厅', '活动中心'], image: 'https://picsum.photos/seed/yanglao4/120/90', phone: '023-8888-1004' },
];

const MARKETS: MarketInfo[] = [
  { id: 1, name: '渝中区农贸市场', address: '渝中区中山路100号', distance: '0.5km', ganjiDays: '逢三逢八', hours: '06:00-18:00', image: 'https://picsum.photos/seed/market1/120/90', phone: '023-8888-2001' },
  { id: 2, name: '观音桥赶集市场', address: '江北区观音桥街道80号', distance: '1.2km', ganjiDays: '逢二逢七', hours: '05:30-17:30', image: 'https://picsum.photos/seed/market2/120/90', phone: '023-8888-2002' },
  { id: 3, name: '南坪露天集市', address: '南岸区南坪正街66号', distance: '2.0km', ganjiDays: '逢五逢十', hours: '06:00-16:00', image: 'https://picsum.photos/seed/market3/120/90', phone: '023-8888-2003' },
  { id: 4, name: '沙坪坝早市', address: '沙坪坝区三峡广场28号', distance: '1.8km', ganjiDays: '逢一逢六', hours: '05:00-12:00', image: 'https://picsum.photos/seed/market4/120/90', phone: '023-8888-2004' },
];

const VENUES: VenueInfo[] = [
  { id: 1, name: '老茶馆·解放碑店', type: '茶馆', address: '渝中区解放碑步行街66号', distance: '0.5km', capacity: '20-40人', hours: '09:00-22:00', tags: ['传统茶艺', '包间充足', '实惠消费'], image: 'https://picsum.photos/seed/venue1/120/90', phone: '023-8888-3001' },
  { id: 2, name: '社区活动中心', type: '会议室', address: '江北区观音桥街道100号', distance: '1.0km', capacity: '50-100人', hours: '08:00-21:00', tags: ['多媒体设备', '空调充足', '可预订'], image: 'https://picsum.photos/seed/venue2/120/90', phone: '023-8888-3002' },
  { id: 3, name: '欢乐KTV·南坪店', type: 'KTV', address: '南岸区南坪万达广场3楼', distance: '1.8km', capacity: '10-30人', hours: '10:00-02:00', tags: ['音响专业', '歌库齐全', '会员优惠'], image: 'https://picsum.photos/seed/venue3/120/90', phone: '023-8888-3003' },
  { id: 4, name: '长江会客厅', type: '茶馆', address: '南岸区南滨路128号', distance: '2.5km', capacity: '15-30人', hours: '10:00-23:00', tags: ['江景包间', '茶点配套', '停车方便'], image: 'https://picsum.photos/seed/venue4/120/90', phone: '023-8888-3004' },
];

const COMPETITIONS: CompetitionInfo[] = [
  { id: 1, title: '重庆夕阳红广场舞大赛', category: '文化', date: '2026-04-10 09:00', location: '解放碑广场', organizer: '渝中区文化局', description: '全市中老年广场舞爱好者齐聚一堂，切磋舞艺，展示风采。', requirements: ['年龄50岁以上', '3-10人组队报名'], contact: '023-8888-4001', image: 'comp_dance_01' },
  { id: 2, title: '中老年健步走活动', category: '健身', date: '2026-04-12 07:30', location: '南滨路公园', organizer: '南岸区体育局', description: '5公里健步走，强身健体，沿途设置补给点，奖品丰富。', requirements: ['年龄50岁以上', '身体健康'], contact: '023-8888-4002', image: 'comp_walk_02' },
  { id: 3, title: '太极拳交流赛', category: '兴趣', date: '2026-04-18 06:30', location: '鹅岭公园', organizer: '重庆太极协会', description: '传统太极拳展示与交流，以武会友，增进健康。', requirements: ['太极拳基础', '自备服装'], contact: '023-8888-4003', image: 'comp_taichi_03' },
  { id: 4, title: '书法绘画作品展', category: '文化', date: '2026-04-15 10:00', location: '重庆图书馆', organizer: '益寿社区中心', description: '展示中老年书法绘画爱好者作品，传承传统文化。', requirements: ['提交作品审核', '自备装裱'], contact: '023-8888-4004', image: 'comp_art_04' },
];

// -- Medication Reminder Mock Data --
const MOCK_MEDICATIONS: Medication[] = [
  { id: 1, name: '氨氯地平片', dosage: '1', dosageUnit: '片', times: ['08:00'], timing: 'post-meal', note: '降压药，每日一次。请勿与柚子同服', frequency: 'daily', color: '#1677FF', createdAt: '2026-06-01', familyShared: true, voiceReminder: true },
  { id: 2, name: '二甲双胍片', dosage: '0.5', dosageUnit: 'g', times: ['08:30', '12:30', '17:30'], timing: 'post-meal', note: '降糖药，饭后服用。请按时服药', frequency: 'daily', color: '#52C41A', createdAt: '2026-06-01', familyShared: true, voiceReminder: true },
  { id: 3, name: '阿司匹林肠溶片', dosage: '1', dosageUnit: '片', times: ['21:00'], timing: 'bedtime', note: '抗凝血，睡前服用。勿与酒精同服', frequency: 'daily', color: '#FA8C16', createdAt: '2026-06-01', familyShared: false, voiceReminder: false },
  { id: 4, name: '阿卡波糖片', dosage: '50', dosageUnit: 'mg', times: ['12:30', '17:30'], timing: 'with-meal', note: '降糖药，随餐服用。与第一口饭同服', frequency: 'daily', color: '#EB2F96', createdAt: '2026-06-05', familyShared: true, voiceReminder: true },
];
const MOCK_MED_RECORDS: DailyMedicationRecord[] = ((today) => {
  const records: DailyMedicationRecord[] = [];
  for (let d = -6; d <= 0; d++) {
    const date = new Date(today);
    date.setDate(date.getDate() + d);
    const dateStr = date.toISOString().split('T')[0];
    const meds: MedicationRecord[] = [];
    for (const med of MOCK_MEDICATIONS) {
      for (const t of med.times) {
        const isTaken = Math.random() > 0.15;
        meds.push({ medicationId: med.id, medicationName: med.name, time: t, status: d < 0 ? (isTaken ? 'taken' : 'missed') : 'pending', takenAt: isTaken && d <= 0 ? t : undefined });
      }
    }
    records.push({ date: dateStr, medications: meds });
  }
  return records;
})(new Date());
const MED_TIMING_LABELS: Record<string, string> = { 'pre-meal': '饭前', 'post-meal': '饭后', 'empty-stomach': '空腹', 'bedtime': '睡前', 'with-meal': '随餐' };
const MED_TIMING_OPTIONS = ['pre-meal', 'post-meal', 'empty-stomach', 'bedtime', 'with-meal'] as const;
const DOSAGE_UNITS = ['片', '粒', 'ml', '支', '包', '丸', 'g', 'mg'];

const BOTTOM_TABS = [
  { id: 'yishou' as TabId, label: '益寿', Icon: AppstoreOutlined },
  { id: 'bayu' as TabId, label: '巴渝', Icon: FireOutlined },
  { id: 'messages' as TabId, label: '消息', Icon: MessageOutlined, badge: 15 },
  { id: 'profile' as TabId, label: '我的', Icon: UserOutlined },
];

const BAYU_SUBS = [
  { id: 'plaza' as BayuSubTab, label: '同城' },
  { id: 'follow' as BayuSubTab, label: '熟人' },
  { id: 'hot' as BayuSubTab, label: '排名' },
  { id: 'chatroom' as BayuSubTab, label: '霍圈子' },
  { id: 'community' as BayuSubTab, label: '社区' },
];

// ─────────────────────────────────────────────
// Mock Data — Community Tab (社区)
// ─────────────────────────────────────────────
type CommunityCategory = { id: string; name: string; icon: string; cover: string; videoCount: number; description: string; };
type CommunityVideo = { id: string; categoryId: string; title: string; cover: string; author: string; authorAvatar: string; views: number; duration?: string; likes?: number; contentType?: 'video' | 'article'; };

const COMMUNITY_CATEGORIES: CommunityCategory[] = [
  { id: 'weight-loss', name: '欧冠减肥', icon: '🏃', cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=360&h=200&fit=crop', videoCount: 28, description: '中老年科学减脂，健康瘦身不反弹' },
  { id: 'food', name: '巴渝美食', icon: '🍜', cover: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=360&h=200&fit=crop', videoCount: 45, description: '地道巴渝风味，家常美食教程' },
  { id: 'taiji', name: '养生太极', icon: '☯️', cover: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=360&h=200&fit=crop', videoCount: 36, description: '太极功法教学，修身养性' },
  { id: 'dance', name: '广场舞教学', icon: '💃', cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=360&h=200&fit=crop', videoCount: 52, description: '热门广场舞曲，跟练教学' },
  { id: 'tcm', name: '中医推拿', icon: '🖐️', cover: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=360&h=200&fit=crop', videoCount: 22, description: '中医养生推拿，穴位保健' },
  { id: 'fishing', name: '山城钓鱼', icon: '🎣', cover: 'https://images.unsplash.com/photo-1498855926480-d98e83099315?w=360&h=200&fit=crop', videoCount: 19, description: '重庆钓鱼好去处，钓友交流' },
  { id: 'calligraphy', name: '书法绘画', icon: '✍️', cover: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=360&h=200&fit=crop', videoCount: 31, description: '书法绘画入门，陶冶情操' },
  { id: 'travel', name: '旅游打卡', icon: '📷', cover: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=360&h=200&fit=crop', videoCount: 68, description: '重庆周边游，美景打卡攻略' },
];

const COMMUNITY_VIDEOS: CommunityVideo[] = [
  // 欧冠减肥
  { id: 'cv1', categoryId: 'weight-loss', title: '每天20分钟，中老年燃脂操，不伤膝盖轻松瘦', cover: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=720&h=400&fit=crop', author: '健康教练老李', authorAvatar: '李', views: 12800, duration: '12:30', likes: 892 },
  { id: 'cv2', categoryId: 'weight-loss', title: '65岁阿姨减肥成功，分享一日三餐食谱', cover: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=720&h=400&fit=crop', author: '张阿姨的日常', authorAvatar: '张', views: 35600, duration: '08:15', likes: 2350 },
  { id: 'cv3', categoryId: 'weight-loss', title: '晚饭这样吃，一个月瘦8斤不反弹', cover: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=720&h=400&fit=crop', author: '营养师小陈', authorAvatar: '陈', views: 9200, duration: '15:40', likes: 678 },
  // 巴渝美食
  { id: 'cv4', categoryId: 'food', title: '正宗重庆小面教程，从熬油开始教你', cover: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=720&h=400&fit=crop', author: '山城厨娘', authorAvatar: '厨', views: 45600, duration: '18:20', likes: 3120 },
  { id: 'cv5', categoryId: 'food', title: '自制泡椒凤爪，比买的还好吃', cover: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=720&h=400&fit=crop', author: '刘姐私房菜', authorAvatar: '刘', views: 23400, duration: '10:55', likes: 1567 },
  // 养生太极
  { id: 'cv6', categoryId: 'taiji', title: '太极拳24式完整教学（慢动作分解）', cover: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=720&h=400&fit=crop', author: '太极刘师傅', authorAvatar: '刘', views: 67800, duration: '32:10', likes: 4520 },
  { id: 'cv7', categoryId: 'taiji', title: '八段锦跟练版，每天一遍百病消', cover: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=720&h=400&fit=crop', author: '老赵养生堂', authorAvatar: '赵', views: 89200, duration: '14:30', likes: 6230 },
  // 广场舞教学
  { id: 'cv8', categoryId: 'dance', title: '最炫民族风广场舞教学（镜面分解动作）', cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=720&h=400&fit=crop', author: '红霞舞蹈队', authorAvatar: '红', views: 102000, duration: '25:40', likes: 8900 },
  { id: 'cv9', categoryId: 'dance', title: '2025新舞曲《草原情歌》跟跳教学', cover: 'https://images.unsplash.com/photo-1526925539332-aa3b66e35444?w=720&h=400&fit=crop', author: '快乐妈妈团', authorAvatar: '妈', views: 45600, duration: '16:20', likes: 3400 },
  // 中医推拿
  { id: 'cv10', categoryId: 'tcm', title: '颈椎不舒服？学会这3个穴位，告别酸痛', cover: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=720&h=400&fit=crop', author: '中医王大夫', authorAvatar: '王', views: 23400, duration: '11:15', likes: 1890 },
  { id: 'cv11', categoryId: 'tcm', title: '足底按摩教程，对应五脏六腑，做完很舒服', cover: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=720&h=400&fit=crop', author: '推拿师老周', authorAvatar: '周', views: 15600, duration: '20:05', likes: 970 },
  // 山城钓鱼
  { id: 'cv12', categoryId: 'fishing', title: '长寿湖钓鱼实拍，连杆大板鲫太过瘾了', cover: 'https://images.unsplash.com/photo-1498855926480-d98e83099315?w=720&h=400&fit=crop', author: '老周钓鱼日记', authorAvatar: '周', views: 31000, duration: '13:50', likes: 2340 },
  { id: 'cv13', categoryId: 'fishing', title: '新手野钓入门：选竿选漂打窝子全教程', cover: 'https://images.unsplash.com/photo-1567459169668-95d355371bda?w=720&h=400&fit=crop', author: '钓鱼达人老王', authorAvatar: '王', views: 18900, duration: '22:30', likes: 1560 },
  // 书法绘画
  { id: 'cv14', categoryId: 'calligraphy', title: '楷书入门：欧体基本笔画演示', cover: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=720&h=400&fit=crop', author: '墨缘书社', authorAvatar: '墨', views: 8900, duration: '28:45', likes: 670 },
  { id: 'cv15', categoryId: 'calligraphy', title: '工笔牡丹教学，零基础也能画国画', cover: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=720&h=400&fit=crop', author: '丹青阁', authorAvatar: '青', views: 12300, duration: '35:10', likes: 890 },
  // 旅游打卡
  { id: 'cv16', categoryId: 'travel', title: '武隆天生三桥，65岁以上门票免费', cover: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=720&h=400&fit=crop', author: '行走巴渝', authorAvatar: '行', views: 56700, duration: '09:40', likes: 4200 },
  { id: 'cv17', categoryId: 'travel', title: '大足石刻深度游，千年佛雕震撼人心', cover: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=720&h=400&fit=crop', author: '文史老张', authorAvatar: '张', views: 34500, duration: '16:20', likes: 2670 },
  // 图文内容（无播放按钮、无时长、显示阅读数）
  { id: 'ca1', categoryId: 'weight-loss', title: '中老年人减肥误区：这些方法越减越伤身', cover: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=720&h=400&fit=crop', author: '李医生谈健康', authorAvatar: '李', views: 8600, likes: 420, contentType: 'article' },
  { id: 'ca2', categoryId: 'food', title: '重庆人夏天必吃的10道凉菜，爽口开胃', cover: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=720&h=400&fit=crop', author: '山城美食家', authorAvatar: '食', views: 15200, likes: 680, contentType: 'article' },
  { id: 'ca3', categoryId: 'taiji', title: '太极拳日常习练心得：坚持三个月的变化', cover: 'https://images.unsplash.com/photo-1562088287-bde35a1ea164?w=720&h=400&fit=crop', author: '老陈的太极日记', authorAvatar: '陈', views: 5400, likes: 310, contentType: 'article' },
  { id: 'ca4', categoryId: 'dance', title: '广场舞选曲指南：适合中老年的舞曲推荐', cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=720&h=400&fit=crop', author: '舞蹈人生', authorAvatar: '舞', views: 12300, likes: 550, contentType: 'article' },
  { id: 'ca5', categoryId: 'tcm', title: '十个常用穴位图解，每天按揉养生保健', cover: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=720&h=400&fit=crop', author: '中医养生百科', authorAvatar: '养', views: 21800, likes: 890, contentType: 'article' },
  { id: 'ca6', categoryId: 'fishing', title: '重庆周边十大免费野钓地点汇总攻略', cover: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=720&h=400&fit=crop', author: '钓鱼俱乐部', authorAvatar: '钓', views: 9800, likes: 470, contentType: 'article' },
  { id: 'ca7', categoryId: 'calligraphy', title: '零基础学书法：笔墨纸砚怎么选不踩坑', cover: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=720&h=400&fit=crop', author: '文房四宝说', authorAvatar: '文', views: 7400, likes: 360, contentType: 'article' },
  { id: 'ca8', categoryId: 'travel', title: '渝东南自驾游攻略：一路风光美不胜收', cover: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=720&h=400&fit=crop', author: '巴渝行者', authorAvatar: '行', views: 28000, likes: 1200, contentType: 'article' },
];

// ─────────────────────────────────────────────
// Mock Data — Follow Tab
// ─────────────────────────────────────────────
const FOLLOW_USERS: FollowUser[] = [
  { id: 1, name: '李秀英', avatar: '李', color: '#FF6B35', hasNew: true },
  { id: 2, name: '王翠华', avatar: '王', color: '#52C41A', hasNew: true },
  { id: 3, name: '张师傅', avatar: '张', color: '#1677FF', hasNew: false },
  { id: 4, name: '赵美云', avatar: '赵', color: '#EB2F96', hasNew: true },
  { id: 5, name: '陈大叔', avatar: '陈', color: '#722ED1', hasNew: false },
  { id: 6, name: '刘奶奶', avatar: '刘', color: '#13C2C2', hasNew: false },
];

const FOLLOW_POSTS: FollowPost[] = [
  { id: 1, userId: 1, user: '李秀英', avatar: '李', avatarColor: '#FF6B35', type: 'image', coverSeed: 'dance_park', coverHeight: 180, title: '今天广场舞练习，大家跳得真开心！', likes: 128, tags: ['舞蹈'] },
  { id: 2, userId: 2, user: '王翠华', avatar: '王', avatarColor: '#52C41A', type: 'video', coverSeed: 'lotus_garden', coverHeight: 220, title: '拍了一段荷花视频，太美了分享给大家', likes: 256, tags: ['摄影'] },
  { id: 3, userId: 3, user: '张师傅', avatar: '张', avatarColor: '#1677FF', type: 'image', coverSeed: 'taichi_morning', coverHeight: 160, title: '早晨太极拳，一招一式都是心静', likes: 89, tags: ['运动'] },
  { id: 4, userId: 4, user: '赵美云', avatar: '赵', avatarColor: '#EB2F96', type: 'video', coverSeed: 'cooking_healthy', coverHeight: 200, title: '教你做低盐低脂的营养午餐，好吃又健康', likes: 312, tags: ['美食', '养生'] },
  { id: 5, userId: 5, user: '陈大叔', avatar: '陈', avatarColor: '#722ED1', type: 'image', coverSeed: 'calligraphy_art', coverHeight: 190, title: '今日书法练习，写了一幅寿字送给老友', likes: 147, tags: ['书法'] },
  { id: 6, userId: 6, user: '刘奶奶', avatar: '刘', avatarColor: '#13C2C2', type: 'video', coverSeed: 'knitting_wool', coverHeight: 170, title: '手工毛衣快织好了，给孙子的生日礼物', likes: 203, tags: ['手工'] },
  { id: 7, userId: 1, user: '李秀英', avatar: '李', avatarColor: '#FF6B35', type: 'image', coverSeed: 'flower_market', coverHeight: 210, title: '逛了早市买了好多花，家里顿时春意盎然', likes: 95, tags: ['园艺'] },
  { id: 8, userId: 3, user: '张师傅', avatar: '张', avatarColor: '#1677FF', type: 'video', coverSeed: 'fishing_river', coverHeight: 185, title: '嘉陵江边钓了一上午，收获颇丰！', likes: 178, tags: ['钓鱼'] },
];

const VIDEO_POSTS = FOLLOW_POSTS.filter(p => p.type === 'video');

const FOLLOW_COMMENTS: PostComment[] = [
  { id: 1, user: '张师傅', avatar: '张', color: '#1677FF', content: '跳得真好！下次带我一起去！', likes: 12, time: '1小时前' },
  { id: 2, user: '陈大叔', avatar: '陈', color: '#722ED1', content: '看着就精神，你们真厉害！', likes: 8, time: '2小时前' },
  { id: 3, user: '刘奶奶', avatar: '刘', color: '#13C2C2', content: '好想加入你们的舞蹈队！', likes: 5, time: '3小时前' },
  { id: 4, user: '赵美云', avatar: '赵', color: '#EB2F96', content: '照片拍得真美，是在哪个公园？', likes: 3, time: '2026-04-22' },
];

interface VideoComment {
  id: number;
  user: string;
  avatar: string;
  color: string;
  content: string;
  likes: number;
  time: string;
  replies?: { id: number; user: string; avatar: string; color: string; content: string; time: string }[];
}

const VIDEO_COMMENTS: VideoComment[] = [
  {
    id: 1, user: '李秀英', avatar: '李', color: '#FF6B35', content: '拍得太好了！这个地方我也去过，风景真美！', likes: 24, time: '一分钟前',
    replies: [
      { id: 11, user: '赵美云', avatar: '赵', color: '#EB2F96', content: '是啊，每次去都心情特别好！', time: '一分钟前' },
    ],
  },
  {
    id: 2, user: '陈大爷', avatar: '陈', color: '#FA8C16', content: '坚持下去，身体是最重要的！给你点赞！', likes: 18, time: '5分钟前',
    replies: [],
  },
  {
    id: 3, user: '王翠华', avatar: '王', color: '#52C41A', content: '我也想学，能教教我吗？', likes: 11, time: '12分钟前',
    replies: [
      { id: 31, user: '刘奶奶', avatar: '刘', color: '#13C2C2', content: '我也想学！一起吧！', time: '10分钟前' },
      { id: 32, user: '孙阿姨', avatar: '孙', color: '#52C41A', content: '可以加我们群，每天早上都有活动', time: '8分钟前' },
    ],
  },
  {
    id: 4, user: '刘奶奶', avatar: '刘', color: '#13C2C2', content: '看着就开心，生活就该这样有滋有味！', likes: 9, time: '30分钟前',
    replies: [],
  },
  {
    id: 5, user: '周大爷', avatar: '周', color: '#722ED1', content: '重庆的风景就是好，我在这里住了几十年了', likes: 6, time: '1小时前',
    replies: [
      { id: 51, user: '陈大爷', avatar: '陈', color: '#FA8C16', content: '同感！重庆是个好地方', time: '55分钟前' },
    ],
  },
  {
    id: 6, user: '孙阿姨', avatar: '孙', color: '#52C41A', content: '分享得真好，期待下次更多精彩！', likes: 4, time: '2小时前',
    replies: [],
  },
];

// ─────────────────────────────────────────────
// Mock Data — Plaza Tab
// ─────────────────────────────────────────────
const PLAZA_POSTS: FollowPost[] = [
  { id: 101, userId: 11, user: '陈大爷', avatar: '陈', avatarColor: '#FA8C16', type: 'image', coverSeed: 'park_morning', coverHeight: 175, title: '晨练归来，精神满满迎接新一天！', likes: 234, tags: ['运动'] },
  { id: 102, userId: 12, user: '孙阿姨', avatar: '孙', avatarColor: '#52C41A', type: 'video', coverSeed: 'square_dance', coverHeight: 215, title: '广场舞新舞步教学，欢迎大家跟着学！', likes: 387, tags: ['舞蹈'] },
  { id: 103, userId: 13, user: '刘大叔', avatar: '刘', avatarColor: '#1677FF', type: 'video', coverSeed: 'calligraphy2', coverHeight: 165, title: '今日写了一幅"福"字，心情舒畅', likes: 156, tags: ['书法'] },
  { id: 104, userId: 14, user: '吴奶奶', avatar: '吴', avatarColor: '#EB2F96', type: 'video', coverSeed: 'garden_flower', coverHeight: 195, title: '阳台上的玫瑰开花了，分享给大家', likes: 428, tags: ['园艺'] },
  { id: 105, userId: 15, user: '周大爷', avatar: '周', avatarColor: '#722ED1', type: 'video', coverSeed: 'fishing2', coverHeight: 185, title: '今天在江边钓到大鱼，开心！', likes: 312, tags: ['钓鱼'] },
  { id: 106, userId: 16, user: '郑阿姨', avatar: '郑', avatarColor: '#13C2C2', type: 'video', coverSeed: 'cooking2', coverHeight: 170, title: '分享一道简单营养的家常菜做法', likes: 267, tags: ['美食'] },
  { id: 107, userId: 17, user: '冯大叔', avatar: '冯', avatarColor: '#FF6B35', type: 'video', coverSeed: 'taichi2', coverHeight: 205, title: '太极拳基础动作，跟我一起练！', likes: 198, tags: ['运动'] },
  { id: 108, userId: 18, user: '蒋奶奶', avatar: '蒋', avatarColor: '#FAAD14', type: 'video', coverSeed: 'knitting2', coverHeight: 185, title: '手工编织小熊，送给小孙女的礼物', likes: 341, tags: ['手工'] },
];
const PLAZA_VIDEO_POSTS = PLAZA_POSTS.filter(p => p.type === 'video');

// ─────────────────────────────────────────────
// Mock Data — Hot Tab
// ─────────────────────────────────────────────
const HOT_POSTS: FollowPost[] = [
  { id: 201, userId: 11, user: '陈大爷', avatar: '陈', avatarColor: '#FA8C16', type: 'video', coverSeed: 'hot_dance', coverHeight: 160, title: '重庆夕阳红广场舞大赛视频流出，精彩！', likes: 5823, tags: ['舞蹈'] },
  { id: 202, userId: 12, user: '孙阿姨', avatar: '孙', avatarColor: '#52C41A', type: 'image', coverSeed: 'hot_health', coverHeight: 160, title: '血压高的人这样吃，效果真的不一样', likes: 4712, images: ['hot_health', 'hot_health2'], tags: ['养生'] },
  { id: 203, userId: 13, user: '刘大叔', avatar: '刘', avatarColor: '#1677FF', type: 'video', coverSeed: 'hot_taichi', coverHeight: 160, title: '八段锦全套教程，收藏慢慢练！', likes: 3967, tags: ['运动'] },
  { id: 204, userId: 14, user: '吴奶奶', avatar: '吴', avatarColor: '#EB2F96', type: 'video', coverSeed: 'hot_garden', coverHeight: 160, title: '阳台种菜大丰收，自给自足真开心', likes: 3254, tags: ['园艺'] },
  { id: 205, userId: 15, user: '周大爷', avatar: '周', avatarColor: '#722ED1', type: 'video', coverSeed: 'hot_calligraphy', coverHeight: 160, title: '老年大学书法展览，作品精彩纷呈', likes: 2891, tags: ['书法'] },
  { id: 206, userId: 16, user: '郑阿姨', avatar: '郑', avatarColor: '#13C2C2', type: 'video', coverSeed: 'hot_music', coverHeight: 160, title: '红歌合唱团表演视频，感动无数人', likes: 2543, tags: ['音乐'] },
  { id: 207, userId: 17, user: '冯大叔', avatar: '冯', avatarColor: '#FF6B35', type: 'video', coverSeed: 'hot_travel', coverHeight: 160, title: '重庆老年旅游团出发，风景美如画', likes: 2134, tags: ['旅游'] },
  { id: 208, userId: 18, user: '蒋奶奶', avatar: '蒋', avatarColor: '#FAAD14', type: 'video', coverSeed: 'hot_cooking', coverHeight: 160, title: '传统重庆火锅做法大公开，赶紧收藏！', likes: 1876, tags: ['美食'] },
];
const HOT_VIDEO_POSTS = HOT_POSTS.filter(p => p.type === 'video');

// ─────────────────────────────────────────────
// Mock Data — 霍圈子（聊天室）
// ─────────────────────────────────────────────
const ROOM_TAGS = ['舞蹈', '运动', '美食', '旅行', '养生', '娱乐', '音乐', '艺术', '摄影', '书法', '手工', '钓鱼'];
const DEFAULT_CHAT_ROOMS: ChatRoom[] = [
  { id: 'r1', name: '广场舞聊天室', description: '舞蹈爱好者交流，每日打卡练舞心得', tag: '舞蹈', color: '#FF6B35', onlineCount: 12, memberCount: 1283, lastMessage: '明早7点广场集合，不见不散！', lastMessageTime: '刚刚' },
  { id: 'r2', name: '太极拳交流群', description: '陈氏太极、杨氏太极，修身养性每一天', tag: '运动', color: '#1677FF', onlineCount: 8, memberCount: 856, lastMessage: '今天学了新招式，感觉不错', lastMessageTime: '3分钟前' },
  { id: 'r3', name: '川菜美食分享', description: '家常川菜做法交流，分享拿手好菜', tag: '美食', color: '#D4380D', onlineCount: 15, memberCount: 643, lastMessage: '今晚做了水煮鱼，太香了！', lastMessageTime: '5分钟前' },
  { id: 'r4', name: '旅游摄影圈', description: '分享旅途美景，交流摄影技巧', tag: '旅行', color: '#FA8C16', onlineCount: 6, memberCount: 520, lastMessage: '上周去武隆拍的天坑，绝美', lastMessageTime: '10分钟前' },
  { id: 'r5', name: '养生保健交流', description: '中医养生知识分享，健康生活每一天', tag: '养生', color: '#52C41A', onlineCount: 18, memberCount: 1024, lastMessage: '夏季养生要多吃苦瓜和莲子', lastMessageTime: '15分钟前' },
  { id: 'r6', name: '麻将棋牌娱乐', description: '约牌搓麻，开心娱乐不赌博', tag: '娱乐', color: '#722ED1', onlineCount: 22, memberCount: 789, lastMessage: '下午有人约麻将吗？三缺一', lastMessageTime: '刚刚' },
  { id: 'r7', name: '红歌合唱团', description: '经典红歌传唱，回忆激情岁月', tag: '音乐', color: '#EB2F96', onlineCount: 9, memberCount: 934, lastMessage: '这周末排练《歌唱祖国》', lastMessageTime: '20分钟前' },
  { id: 'r8', name: '书法绘画交流', description: '毛笔字、国画、水彩，艺术人生', tag: '艺术', color: '#08979C', onlineCount: 4, memberCount: 456, lastMessage: '今天完成了一幅山水画', lastMessageTime: '30分钟前' },
];



// ─────────────────────────────────────────────
// Mock Data — 巴渝排名专区
// ─────────────────────────────────────────────
const BAYUTOU_NEWS: BayoutouNews[] = [
  { id: 1001, title: '重庆出台养老服务新政策，60岁以上老人享更多便利', cover: 'news_policy', source: '华龙网', publishTime: '2小时前', likes: 2341, tags: ['政策', '养老'], summary: '重庆市近日发布养老服务新政策，进一步扩大高龄津贴覆盖范围，提升居家养老服务质量，让更多老年人享受到便捷高效的养老服务。' },
  { id: 1002, title: '解放碑广场舞大赛报名开启，冠军可获万元奖金', cover: 'news_dance', source: '上游新闻', publishTime: '5小时前', likes: 1892, tags: ['活动', '文化'], summary: '2026年重庆市广场舞大赛正式开启报名，面向全市50岁以上中老年群体，设置丰厚奖金，鼓励老年人展示风采、舞出健康。' },
  { id: 1003, title: '专家提醒：春季养生注意这几点，中老年人必看', cover: 'news_health', source: '重庆日报', publishTime: '8小时前', likes: 3104, tags: ['健康', '养生'], summary: '春季是养生的关键时节，专家建议老年人注意饮食清淡、适度运动、保持心情愉悦，同时做好花粉过敏等春季常见病的预防措施。' },
  { id: 1004, title: '南岸区老年大学秋季招生启动，书法绘画太极拳应有尽有', cover: 'news_school', source: '第1眼', publishTime: '2026-04-22', likes: 1567, tags: ['教育', '兴趣'], summary: '南岸区老年大学2026年秋季学期招生工作已全面启动，涵盖书法、绘画、太极拳、电脑入门等十余门课程，欢迎中老年朋友踊跃报名。' },
  { id: 1005, title: '嘉陵江畔新建健身步道，晨练老人纷纷点赞', cover: 'news_walk', source: '华龙网', publishTime: '2026-04-22', likes: 987, tags: ['健身', '城市'], summary: '嘉陵江北岸新修的健身步道近日正式向市民开放，步道全长3公里，配备休息座椅和饮水点，成为周边老年人晨练的新去处。' },
  { id: 1006, title: '重庆医保个人账户可全家共用，报销范围进一步扩大', cover: 'news_medical', source: '上游新闻', publishTime: '2天前', likes: 4521, tags: ['医保', '民生'], summary: '重庆市医保政策再升级，职工医保个人账户资金可共济给配偶、父母、子女使用，同时扩大了门诊报销药品目录，切实减轻家庭医疗负担。' },
  { id: 1007, title: '洪崖洞夜景再升级，灯光秀吸引上万游客打卡', cover: 'news_tour', source: '重庆日报', publishTime: '2天前', likes: 3218, tags: ['旅游', '文化'], summary: '洪崖洞景区夜景灯光全面升级，全新设计的灯光秀每晚吸引上万名游客前来观赏，成为重庆夜游的新名片。' },
  { id: 1008, title: '社区义诊进小区，知名专家为老年人面对面答疑', cover: 'news_clinic', source: '第1眼', publishTime: '3天前', likes: 1834, tags: ['健康', '公益'], summary: '渝中区多个社区近日开展免费义诊活动，邀请三甲医院心内科、神经内科专家坐诊，为辖区老年人提供健康咨询和用药指导服务。' },
  { id: 1009, title: '重庆首家智慧养老院投入运营，机器人送餐送药', cover: 'news_elderly', source: '华龙网', publishTime: '3天前', likes: 2657, tags: ['科技', '养老'], summary: '重庆市首家智慧养老院在江北区正式投入运营，配备智能床垫、送餐机器人、健康监测系统等设备，为入住老人提供24小时智能化照护服务。' },
  { id: 1010, title: '长江索道北站新设无障碍通道，轮椅游客点赞', cover: 'news_access', source: '上游新闻', publishTime: '4天前', likes: 1203, tags: ['民生', '旅游'], summary: '长江索道北站近日完成无障碍设施改造，新设轮椅升降平台和语音播报系统，方便老年和行动不便游客乘坐索道欣赏两岸风光。' },
];

const BAYUTOU_LABOR: BayoutouRankUser[] = [
  { id: 11, avatar: '陈', avatarColor: '#FA8C16', name: '陈大爷', ip: '重庆', primary: 328, secondary: 12453 },
  { id: 12, avatar: '孙', avatarColor: '#52C41A', name: '孙阿姨', ip: '重庆', primary: 295, secondary: 9876 },
  { id: 1, avatar: '李', avatarColor: '#FF6B35', name: '李秀英', ip: '重庆', primary: 271, secondary: 8421 },
  { id: 2, avatar: '王', avatarColor: '#722ED1', name: '王翠华', ip: '重庆', primary: 243, secondary: 7654 },
  { id: 13, avatar: '刘', avatarColor: '#1677FF', name: '刘大叔', ip: '重庆', primary: 218, secondary: 6543 },
  { id: 14, avatar: '吴', avatarColor: '#EB2F96', name: '吴奶奶', ip: '重庆', primary: 196, secondary: 5432 },
  { id: 16, avatar: '郑', avatarColor: '#13C2C2', name: '郑阿姨', ip: '重庆', primary: 175, secondary: 4321 },
  { id: 17, avatar: '冯', avatarColor: '#FA8C16', name: '冯大叔', ip: '重庆', primary: 158, secondary: 3876 },
  { id: 18, avatar: '蒋', avatarColor: '#FAAD14', name: '蒋奶奶', ip: '重庆', primary: 143, secondary: 3210 },
  { id: 4, avatar: '赵', avatarColor: '#EB2F96', name: '赵大爷', ip: '重庆', primary: 127, secondary: 2654 },
];

const BAYUTOU_CELEBRITY: BayoutouRankUser[] = [
  { id: 3, avatar: '张', avatarColor: '#1677FF', name: '张大爷', ip: '重庆', primary: 28600, secondary: 156780 },
  { id: 201, avatar: '周', avatarColor: '#722ED1', name: '周奶奶', ip: '重庆', primary: 25300, secondary: 134560 },
  { id: 11, avatar: '陈', avatarColor: '#FA8C16', name: '陈大爷', ip: '重庆', primary: 22100, secondary: 112340 },
  { id: 1, avatar: '李', avatarColor: '#FF6B35', name: '李秀英', ip: '重庆', primary: 19800, secondary: 98760 },
  { id: 2, avatar: '王', avatarColor: '#52C41A', name: '王翠华', ip: '重庆', primary: 17500, secondary: 86540 },
  { id: 12, avatar: '孙', avatarColor: '#52C41A', name: '孙阿姨', ip: '重庆', primary: 15200, secondary: 74320 },
  { id: 14, avatar: '吴', avatarColor: '#EB2F96', name: '吴奶奶', ip: '重庆', primary: 13100, secondary: 62180 },
  { id: 13, avatar: '刘', avatarColor: '#1677FF', name: '刘大叔', ip: '重庆', primary: 11400, secondary: 54320 },
  { id: 16, avatar: '郑', avatarColor: '#13C2C2', name: '郑阿姨', ip: '重庆', primary: 9800, secondary: 43210 },
  { id: 17, avatar: '冯', avatarColor: '#FA8C16', name: '冯大叔', ip: '重庆', primary: 8200, secondary: 36540 },
];

const BAYUTOU_ACTIVE: BayoutouRankUser[] = [
  { id: 301, avatar: '黄', avatarColor: '#FAAD14', name: '黄奶奶', ip: '重庆渝中', primary: 8760, secondary: 3241 },
  { id: 302, avatar: '苏', avatarColor: '#EB2F96', name: '苏阿姨', ip: '重庆江北', primary: 8120, secondary: 2956 },
  { id: 303, avatar: '胡', avatarColor: '#722ED1', name: '胡大爷', ip: '重庆南岸', primary: 7650, secondary: 2780 },
  { id: 304, avatar: '杨', avatarColor: '#1677FF', name: '杨奶奶', ip: '重庆沙坪坝', primary: 7210, secondary: 2543 },
  { id: 305, avatar: '徐', avatarColor: '#52C41A', name: '徐大叔', ip: '重庆九龙坡', primary: 6890, secondary: 2312 },
  { id: 306, avatar: '朱', avatarColor: '#FF6B35', name: '朱阿姨', ip: '重庆渝北', primary: 6430, secondary: 2178 },
  { id: 307, avatar: '马', avatarColor: '#13C2C2', name: '马大爷', ip: '重庆大渡口', primary: 5980, secondary: 1987 },
  { id: 308, avatar: '唐', avatarColor: '#FA8C16', name: '唐奶奶', ip: '重庆巴南', primary: 5540, secondary: 1821 },
  { id: 309, avatar: '郭', avatarColor: '#FAAD14', name: '郭大叔', ip: '重庆北碚', primary: 5120, secondary: 1654 },
  { id: 310, avatar: '何', avatarColor: '#EB2F96', name: '何阿姨', ip: '重庆璧山', primary: 4780, secondary: 1498 },
];

// ─────────────────────────────────────────────
// Mock Data — Circle Posts
// ─────────────────────────────────────────────
const CIRCLE_POSTS: {[key: string]: FollowPost[]} = {
  '广场舞圈': [
    { id: 301, userId: 1, user: '李秀英', avatar: '李', avatarColor: '#FF6B35', type: 'video', coverSeed: 'circle_dance1', coverHeight: 190, title: '本周新舞步教学视频，适合初学者！', likes: 312, comments: 78, saves: 125, shares: 34 },
    { id: 302, userId: 11, user: '陈大爷', avatar: '陈', avatarColor: '#FA8C16', type: 'image', coverSeed: 'circle_dance2', coverHeight: 170, title: '2026-04-22广场舞比赛现场照片合集', likes: 287, comments: 69, saves: 112, shares: 28 },
    { id: 303, userId: 12, user: '孙阿姨', avatar: '孙', avatarColor: '#52C41A', type: 'image', coverSeed: 'circle_dance3', coverHeight: 200, title: '舞蹈队年终总结，感谢每一位姐妹！', likes: 193, comments: 45, saves: 78, shares: 19 },
  ],
  '养生健康圈': [
    { id: 311, userId: 2, user: '王翠华', avatar: '王', avatarColor: '#52C41A', type: 'image', coverSeed: 'circle_health1', coverHeight: 180, title: '春季养生食谱推荐，适合老年人', likes: 456, comments: 112, saves: 189, shares: 48 },
    { id: 312, userId: 12, user: '孙阿姨', avatar: '孙', avatarColor: '#52C41A', type: 'video', coverSeed: 'circle_health2', coverHeight: 210, title: '中医科普：这些穴位经常按，身体更健康', likes: 523, comments: 134, saves: 215, shares: 56 },
    { id: 313, userId: 16, user: '郑阿姨', avatar: '郑', avatarColor: '#13C2C2', type: 'image', coverSeed: 'circle_health3', coverHeight: 165, title: '低盐低脂营养早餐分享，简单美味', likes: 278, comments: 65, saves: 108, shares: 27 },
  ],
  '书法绘画圈': [
    { id: 321, userId: 5, user: '陈大叔', avatar: '陈', avatarColor: '#722ED1', type: 'image', coverSeed: 'circle_art1', coverHeight: 195, title: '今日练习：颜体大字"仁寿"，请大家指点', likes: 167, comments: 42, saves: 71, shares: 17 },
    { id: 322, userId: 13, user: '刘大叔', avatar: '刘', avatarColor: '#1677FF', type: 'image', coverSeed: 'circle_art2', coverHeight: 175, title: '水彩画荷花，第一次尝试效果还不错', likes: 234, comments: 58, saves: 96, shares: 24 },
    { id: 323, userId: 18, user: '蒋奶奶', avatar: '蒋', avatarColor: '#FAAD14', type: 'video', coverSeed: 'circle_art3', coverHeight: 185, title: '书法课现场录像，老师讲解运笔要领', likes: 198, comments: 49, saves: 82, shares: 20 },
  ],
  '太极拳队': [
    { id: 331, userId: 3, user: '张师傅', avatar: '张', avatarColor: '#1677FF', type: 'video', coverSeed: 'circle_taichi1', coverHeight: 200, title: '二十四式太极拳完整示范，跟我学！', likes: 412, comments: 98, saves: 167, shares: 43 },
    { id: 332, userId: 17, user: '冯大叔', avatar: '冯', avatarColor: '#FF6B35', type: 'image', coverSeed: 'circle_taichi2', coverHeight: 170, title: '今晨公园练习照片，欢迎新朋友加入', likes: 156, comments: 38, saves: 64, shares: 15 },
    { id: 333, userId: 15, user: '周大爷', avatar: '周', avatarColor: '#722ED1', type: 'image', coverSeed: 'circle_taichi3', coverHeight: 185, title: '太极推手心得分享，重在以柔克刚', likes: 203, comments: 51, saves: 84, shares: 21 },
  ],
  '钓鱼爱好者': [
    { id: 341, userId: 8, user: '张师傅', avatar: '张', avatarColor: '#1677FF', type: 'image', coverSeed: 'circle_fish1', coverHeight: 185, title: '今日嘉陵江战果：草鱼两条、鲤鱼一条', likes: 234, comments: 56, saves: 95, shares: 23 },
    { id: 342, userId: 15, user: '周大爷', avatar: '周', avatarColor: '#722ED1', type: 'video', coverSeed: 'circle_fish2', coverHeight: 195, title: '新手钓鱼技巧，手把手教你选位置', likes: 178, comments: 44, saves: 73, shares: 18 },
    { id: 343, userId: 13, user: '刘大叔', avatar: '刘', avatarColor: '#1677FF', type: 'image', coverSeed: 'circle_fish3', coverHeight: 165, title: '钓鱼回来做了一锅鱼汤，鲜美无比', likes: 289, comments: 71, saves: 118, shares: 29 },
  ],
  '红歌合唱团': [
    { id: 351, userId: 4, user: '赵美云', avatar: '赵', avatarColor: '#EB2F96', type: 'video', coverSeed: 'circle_song1', coverHeight: 200, title: '合唱团演出视频，《我和我的祖国》', likes: 567, comments: 145, saves: 234, shares: 61 },
    { id: 352, userId: 16, user: '郑阿姨', avatar: '郑', avatarColor: '#13C2C2', type: 'image', coverSeed: 'circle_song2', coverHeight: 175, title: '排练现场花絮，大家认真投入！', likes: 312, comments: 76, saves: 128, shares: 32 },
    { id: 353, userId: 12, user: '孙阿姨', avatar: '孙', avatarColor: '#52C41A', type: 'image', coverSeed: 'circle_song3', coverHeight: 185, title: '团服设计方案投票，你更喜欢哪款？', likes: 198, comments: 48, saves: 81, shares: 19 },
  ],
};

interface CircleAdminInfo {
  slogan: string;
  admin: string;
  adminAvatar: string;
  adminColor: string;
  notice: string;
  noticeTime: string;
}

const CIRCLE_ADMIN_INFO: {[key: string]: CircleAdminInfo} = {
  '广场舞圈': {
    slogan: '让每一步舞动，都成为生命中最美的旋律 💃',
    admin: '李秀英',
    adminAvatar: '李',
    adminColor: '#FF6B35',
    notice: '本周六下午3点，渝中区人民广场月度汇演，欢迎所有圈友参与！请提前练习新舞步，带好服装，准时到场。',
    noticeTime: '2小时前',
  },
  '养生健康圈': {
    slogan: '科学养生、快乐生活，健康是最好的财富 🌿',
    admin: '王翠华',
    adminAvatar: '王',
    adminColor: '#52C41A',
    notice: '提醒大家：圈内养生内容仅供参考，调整饮食或用药前请务必咨询专业医生。欢迎分享亲身经验，共同进步！',
    noticeTime: '2026-04-22',
  },
  '书法绘画圈': {
    slogan: '笔墨丹青间，藏着岁月最美的故事 🖌️',
    admin: '陈大叔',
    adminAvatar: '陈',
    adminColor: '#722ED1',
    notice: '下月初将举办圈内书法作品线上展览，有意参展的朋友请在本月底前将作品照片发给我，每人限投3幅。',
    noticeTime: '3天前',
  },
  '太极拳队': {
    slogan: '以柔克刚、动静相宜，太极是生命的修行 ☯️',
    admin: '张师傅',
    adminAvatar: '张',
    adminColor: '#1677FF',
    notice: '每天早上7点至8点，朝天门广场东侧固定晨练，风雨无阻。新成员加入请先观摩一周，熟悉基本步骤后再跟练。',
    noticeTime: '4天前',
  },
  '钓鱼爱好者': {
    slogan: '一竿一线一江水，钓出的是岁月里的从容 🎣',
    admin: '周大爷',
    adminAvatar: '周',
    adminColor: '#722ED1',
    notice: '请大家注意：嘉陵江部分区段近期禁钓，具体范围见置顶帖。出行前请确认天气，安全第一，禁止单人夜钓。',
    noticeTime: '5天前',
  },
  '红歌合唱团': {
    slogan: '唱响爱国情怀，让红色旋律温暖每一颗心 🎵',
    admin: '赵美云',
    adminAvatar: '赵',
    adminColor: '#EB2F96',
    notice: '本月25日将参加区老年文艺汇演，排练时间调整为每周三、六下午2点，地点不变。请有意参演的团员准时出席！',
    noticeTime: '1天前',
  },
};

const CIRCLE_ACTIVITIES: {[key: string]: { title: string; date: string; location: string; status: 'upcoming' | 'ongoing' | 'ended' }[]} = {
  '广场舞圈': [
    { title: '月度广场舞汇演', date: '4月6日 15:00', location: '渝中区人民广场', status: 'upcoming' },
    { title: '五一联欢晚会彩排', date: '4月20日 14:00', location: '解放碑文化广场', status: 'upcoming' },
  ],
  '养生健康圈': [
    { title: '中医养生知识讲座', date: '4月8日 10:00', location: '南岸区社区中心', status: 'upcoming' },
  ],
  '书法绘画圈': [
    { title: '圈内书法作品线上展览', date: '5月1日 全天', location: '线上展览', status: 'upcoming' },
    { title: '春日写生活动', date: '4月13日 09:00', location: '南山植物园', status: 'upcoming' },
  ],
  '太极拳队': [
    { title: '太极拳友谊交流赛', date: '4月15日 08:00', location: '朝天门广场', status: 'upcoming' },
  ],
  '钓鱼爱好者': [
    { title: '春季钓鱼比赛', date: '4月19日 06:30', location: '长寿湖钓鱼基地', status: 'upcoming' },
  ],
  '红歌合唱团': [
    { title: '区老年文艺汇演', date: '4月25日 14:00', location: '渝中区文化馆', status: 'upcoming' },
  ],
};

// ─────────────────────────────────────────────
// Mock Data — Service Detail
// ─────────────────────────────────────────────
const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'nearby', label: '附近' },
  { id: 'rating', label: '评分最高' },
  { id: 'price', label: '价格最低' },
];

const RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: '渝中区爱心食堂（解放碑店）',
    distance: '0.3km',
    rating: 4.9,
    ratingCount: 318,
    hours: '07:00 - 19:00',
    price: '6',
    tags: ['送餐上门', '软烂餐', '无糖可选'],
    delivery: true,
    image: 'https://picsum.photos/seed/canteen1/120/90',
    highlight: '本月预约 823 次',
  },
  {
    id: 2,
    name: '朝天门社区食堂',
    distance: '0.8km',
    rating: 4.7,
    ratingCount: 241,
    hours: '06:30 - 20:00',
    price: '8',
    tags: ['爱心套餐', '低盐低脂', '到店就餐'],
    delivery: false,
    image: 'https://picsum.photos/seed/canteen2/120/90',
  },
  {
    id: 3,
    name: '大坪爱老食堂',
    distance: '1.2km',
    rating: 4.8,
    ratingCount: 196,
    hours: '07:30 - 18:30',
    price: '5',
    tags: ['失能老人专属', '床旁配送', '营养搭配'],
    delivery: true,
    image: 'https://picsum.photos/seed/canteen3/120/90',
    highlight: '支持养老服务卡结算',
  },
  {
    id: 4,
    name: '沙坪坝幸福餐厅',
    distance: '1.8km',
    rating: 4.6,
    ratingCount: 153,
    hours: '08:00 - 18:00',
    price: '10',
    tags: ['团餐优惠', '素食可选', '到店就餐'],
    delivery: false,
    image: 'https://picsum.photos/seed/canteen4/120/90',
  },
];

const CLEAN_COMPANIES: CleanCompany[] = [
  {
    id: 1,
    name: '家政宝·渝中旗舰店',
    address: '渝中区解放碑街道98号',
    distance: '0.5km',
    rating: 4.9,
    ratingCount: 426,
    hours: '08:00 - 20:00',
    price: '98',
    tags: ['持证上岗', '深度清洁', '满意保障'],
    image: 'https://picsum.photos/seed/clean1/120/90',
    highlight: '本月预约 1,256 次',
  },
  {
    id: 2,
    name: '洁到家·江北区服务站',
    address: '江北区观音桥街道128号',
    distance: '1.2km',
    rating: 4.8,
    ratingCount: 318,
    hours: '09:00 - 19:00',
    price: '128',
    tags: ['连锁品牌', '环保清洁剂', '保险保障'],
    image: 'https://picsum.photos/seed/clean2/120/90',
    highlight: '服务人员持证率 100%',
  },
  {
    id: 3,
    name: '夕阳红家政服务',
    address: '沙坪坝区小龙坎正街56号',
    distance: '1.8km',
    rating: 4.7,
    ratingCount: 256,
    hours: '08:30 - 18:30',
    price: '88',
    tags: ['经验丰富', '细致认真', '好评如潮'],
    image: 'https://picsum.photos/seed/clean3/120/90',
  },
  {
    id: 4,
    name: '安心保洁·南岸店',
    address: '南岸区南坪街道202号',
    distance: '2.3km',
    rating: 4.6,
    ratingCount: 189,
    hours: '08:00 - 19:00',
    price: '108',
    tags: ['准时守信', '专业设备', '售后无忧'],
    image: 'https://picsum.photos/seed/clean4/120/90',
    highlight: '支持不满意重做',
  },
];

function getSorted(filter: FilterTab): Restaurant[] {
  const list = [...RESTAURANTS];
  if (filter === 'nearby') return list.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  if (filter === 'rating') return list.sort((a, b) => b.rating - a.rating);
  if (filter === 'price') return list.sort((a, b) => parseInt(a.price) - parseInt(b.price));
  return list;
}

// ─────────────────────────────────────────────
// Mock Data — Chat
// ─────────────────────────────────────────────
const INITIAL_MESSAGES: ChatMessage[] = [
  { id: 1, type: 'text', sender: 'other', content: '妈，你今天身体感觉怎么样？', time: '上午 10:00', userId: 1 },
  { id: 2, type: 'text', sender: 'me', content: '挺好的，昨晚睡得早，今天精神不错。', userId: 0 },
  { id: 3, type: 'voice', sender: 'other', duration: 8, userId: 1 },
  { id: 4, type: 'text', sender: 'me', content: '我听到了，中午我们去公园走走吧？', userId: 0 },
  { id: 5, type: 'text', sender: 'other', content: '好啊！几点？', userId: 1 },
  { id: 6, type: 'text', sender: 'me', content: '十一点半，我开车来接你。', userId: 0 },
  { id: 7, type: 'image', sender: 'other', image: 'https://picsum.photos/seed/park1/240/180', time: '上午 10:14', userId: 1 },
  { id: 8, type: 'text', sender: 'other', content: '这是2026-04-22广场舞的照片，你看大家跳得多开心！', userId: 1 },
  { id: 9, type: 'voice', sender: 'me', duration: 12, userId: 0 },
  { id: 10, type: 'text', sender: 'me', content: '对了妈，我给你在益寿巴渝APP上约好了下午的助餐服务，不用你自己做饭了。', userId: 0 },
  { id: 11, type: 'text', sender: 'other', content: '哎哟，那挺好的，你真贴心！', userId: 1 },
  { id: 12, type: 'voice', sender: 'other', duration: 5, userId: 1 },
  { id: 13, type: 'text', sender: 'me', content: '等我下午送你回去的时候，我们再把APP里的健康打卡功能用起来。', time: '上午 10:22', userId: 0 },
  { id: 14, type: 'text', sender: 'other', content: '行，你来了教我，我年纪大了有些按钮看不清楚。', userId: 1 },
  { id: 15, type: 'text', sender: 'me', content: '没问题，APP专门为咱们这样的用户设计的，字大好操作。', userId: 0 },
];

// ─────────────────────────────────────────────
// ── LOGIN COMPONENTS ──────────────────────────
// ─────────────────────────────────────────────

interface CheckboxProps { checked: boolean; onChange: (v: boolean) => void; }
const AgreementCheckbox: React.FC<CheckboxProps> = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className="flex-shrink-0 flex items-center justify-center rounded-md border-2 cursor-pointer transition-all duration-150 active:scale-90"
    style={{ width: 26, height: 26, background: checked ? PRIMARY : 'white', borderColor: checked ? PRIMARY : '#D0D0D0' }}
  >
    {checked && <CheckOutlined style={{ fontSize: 14, color: 'white' }} />}
  </button>
);

const PhoneSMSScreen: React.FC<{ onBack: () => void; onLoginSuccess: () => void; onSwitchToPassword: () => void }> = ({ onBack, onLoginSuccess, onSwitchToPassword }) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState<'agreement' | 'privacy' | null>(null);

  // 用户协议内容
  const AGREEMENT_CONTENT = (
    <div className="flex flex-col gap-4" style={{ fontSize: 14, lineHeight: 1.8, color: '#333' }}>
      <div><strong style={{ fontSize: 16 }}>益寿巴渝用户协议</strong></div>
      <div style={{ color: '#666', fontSize: 13 }}>更新时间：2024年1月1日</div>
      <div><strong>一、服务条款的确认和接纳</strong></div>
      <div style={{ color: '#555' }}>益寿巴渝平台所有权和运营权归[公司名称]所有。用户在使用益寿巴渝平台服务时，应遵守以下条款。用户通过注册或使用本平台，即表示同意接受本协议的全部条款。</div>
      <div><strong>二、服务内容</strong></div>
      <div style={{ color: '#555' }}>益寿巴渝为用户提供以下服务：健康数据记录与管理、健康资讯推送、在线问诊预约、社区交流、养老服务查询、活动报名等。</div>
      <div><strong>三、用户注册与账户</strong></div>
      <div style={{ color: '#555' }}>1. 用户应提供真实、准确的个人信息<br/>2. 用户需妥善保管账户密码<br/>3. 用户需年满18周岁方可使用本平台服务</div>
      <div><strong>四、用户行为规范</strong></div>
      <div style={{ color: '#555' }}>用户不得发布违法违规内容、侵犯他人合法权益、破坏平台正常运行。</div>
      <div><strong>五、免责声明</strong></div>
      <div style={{ color: '#555' }}>平台不保证服务不会中断，用户因使用本平台造成的任何损失，平台不承担责任。</div>
    </div>
  );

  // 隐私政策内容
  const PRIVACY_CONTENT = (
    <div className="flex flex-col gap-4" style={{ fontSize: 14, lineHeight: 1.8, color: '#333' }}>
      <div><strong style={{ fontSize: 16 }}>益寿巴渝隐私政策</strong></div>
      <div style={{ color: '#666', fontSize: 13 }}>更新时间：2024年1月1日</div>
      <div><strong>一、我们如何收集信息</strong></div>
      <div style={{ color: '#555' }}>1. 用户注册时提供的信息（手机号、昵称等）<br/>2. 健康数据（血压、血糖、体检报告等）<br/>3. 设备信息<br/>4. 位置信息</div>
      <div><strong>二、我们如何使用信息</strong></div>
      <div style={{ color: '#555' }}>1. 提供、维护和改进服务<br/>2. 个性化推荐内容和服务<br/>3. 发送重要通知<br/>4. 进行数据分析和研究</div>
      <div><strong>三、我们如何共享信息</strong></div>
      <div style={{ color: '#555' }}>1. 经用户同意后与第三方共享<br/>2. 为提供服务的关联公司<br/>3. 遵守法律法规要求<br/>4. 不会出售用户个人信息</div>
      <div><strong>四、信息存储与安全</strong></div>
      <div style={{ color: '#555' }}>信息存储在安全服务器上，采用加密技术保护数据传输，严格限制访问权限。</div>
    </div>
  );

  const startCountdown = () => {
    if (!phone || phone.length < 11) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => { if (prev <= 1) { clearInterval(timer); return 0; } return prev - 1; });
    }, 1000);
  };

    return (
    <div className="flex flex-col flex-1" style={{ background: LOGIN_BG, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,107,53,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 60, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,180,80,0.08)', pointerEvents: 'none' }} />

      {/* 可滚动内容区域 */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4 gap-4" style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={onBack} className="flex items-center gap-2 border-0 bg-transparent cursor-pointer p-0 mb-2" style={{ color: '#B07050', fontSize: 15, position: 'relative' }}>
          <span style={{ fontSize: 20 }}>←</span> 返回
        </button>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#D4500A', position: 'relative' }}>手机号登录</div>
        <div style={{ fontSize: 15, color: '#B07050', marginTop: -8, position: 'relative' }}>请输入您的手机号，将发送验证码</div>

        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>手机号</div>
          <div className="flex items-center rounded-2xl px-4 gap-3" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 60, background: 'rgba(255,255,255,0.85)' }}>
            <span style={{ fontSize: 16, color: '#B07050', flexShrink: 0 }}>+86</span>
            <div style={{ width: 1, height: 22, background: 'rgba(255,107,53,0.2)' }} />
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="请输入手机号码" maxLength={11}
              className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 18, color: '#1A1A1A' }} />
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>验证码</div>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-2xl px-4 flex-1" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 52, background: 'white' }}>
              <input type="number" value={code} onChange={e => setCode(e.target.value)} placeholder="请输入验证码"
                className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 16, color: '#1A1A1A' }} />
            </div>
            <button onClick={startCountdown} disabled={countdown > 0 || phone.length < 11}
              className="rounded-xl font-semibold cursor-pointer border-0 flex-shrink-0"
              style={{ height: 52, padding: '0 14px', background: countdown > 0 || phone.length < 11 ? '#F0EBE4' : 'transparent', color: countdown > 0 || phone.length < 11 ? '#C0A898' : PRIMARY, fontSize: 14, border: `1px solid ${countdown > 0 || phone.length < 11 ? 'transparent' : 'rgba(255,107,53,0.3)'}`, borderRadius: 14 }}>
              {countdown > 0 ? `${countdown}s` : '获取验证码'}
            </button>
          </div>
        </div>

        <div style={{ fontSize: 13, color: '#C0A898', marginTop: -4, position: 'relative' }}>验证码有效期 10 分钟，如未收到请检查手机信号</div>

        {/* 协议勾选 */}
        <div className="flex items-center gap-2 py-1">
          <button
            onClick={() => setAgreed(!agreed)}
            className="flex items-center justify-center rounded cursor-pointer border-0 flex-shrink-0 transition-all"
            style={{ width: 20, height: 20, background: agreed ? '#FF6B35' : 'transparent', border: `2px solid ${agreed ? '#FF6B35' : '#CCC'}` }}
          >
            {agreed && <CheckOutlined style={{ fontSize: 12, color: 'white' }} />}
          </button>
          <span style={{ fontSize: 13, color: '#8C7B6E' }}>
            我已阅读并同意
            <button onClick={() => setShowPolicyModal('agreement')} className="border-0 bg-transparent cursor-pointer p-0" style={{ color: PRIMARY, fontWeight: 500 }}>《用户协议》</button>
            和
            <button onClick={() => setShowPolicyModal('privacy')} className="border-0 bg-transparent cursor-pointer p-0" style={{ color: PRIMARY, fontWeight: 500 }}>《隐私政策》</button>
          </span>
        </div>

        {/* 占位元素 */}
        <div style={{ height: 80 }} />
      </div>

      {/* 固定底部登录按钮 */}
      <div className="w-full px-6 py-4 flex-shrink-0" style={{ background: LOGIN_BG }}>
        <button onClick={onLoginSuccess} className="w-full rounded-2xl text-white font-bold cursor-pointer border-0"
          style={{ height: 64, background: `linear-gradient(90deg, #FF6B35 0%, #FFAA5A 100%)`, fontSize: 20, boxShadow: '0 6px 18px rgba(255,107,53,0.35)', borderRadius: 32 }}>
          登 录
        </button>
        {/* 切换到密码登录 */}
        <div className="flex justify-center mt-3">
          <button onClick={onSwitchToPassword} className="border-0 bg-transparent cursor-pointer p-0" style={{ color: PRIMARY, fontSize: 14 }}>
            切换为密码登录
          </button>
        </div>
      </div>

      {/* 用户协议/隐私政策弹窗 */}
      {showPolicyModal && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '85vh' }}>
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>
                {showPolicyModal === 'agreement' ? '用户协议' : '隐私政策'}
              </div>
              <button onClick={() => setShowPolicyModal(null)} className="border-0 bg-transparent cursor-pointer" style={{ fontSize: 24, color: '#AAA', lineHeight: 1 }}>×</button>
            </div>
            <div className="px-5 py-4 overflow-y-auto" style={{ flex: 1 }}>
              {showPolicyModal === 'agreement' ? AGREEMENT_CONTENT : PRIVACY_CONTENT}
            </div>
            <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: '1px solid #F0F0F0' }}>
              <button onClick={() => setShowPolicyModal(null)} className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
                style={{ height: 48, background: PRIMARY, fontSize: 16 }}>
                已阅读
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PasswordScreen: React.FC<{ onBack: () => void; onLoginSuccess: () => void; onSwitchToSMS: () => void }> = ({ onBack, onLoginSuccess, onSwitchToSMS }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotPhone, setForgotPhone] = useState('');
  const [forgotCode, setForgotCode] = useState('');
  const [forgotNewPwd, setForgotNewPwd] = useState('');
  const [forgotConfirmPwd, setForgotConfirmPwd] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState<'agreement' | 'privacy' | null>(null);

  // 用户协议内容
  const AGREEMENT_CONTENT = (
    <div className="flex flex-col gap-4" style={{ fontSize: 14, lineHeight: 1.8, color: '#333' }}>
      <div><strong style={{ fontSize: 16 }}>益寿巴渝用户协议</strong></div>
      <div style={{ color: '#666', fontSize: 13 }}>更新时间：2024年1月1日</div>
      <div><strong>一、服务条款的确认和接纳</strong></div>
      <div style={{ color: '#555' }}>益寿巴渝平台所有权和运营权归[公司名称]所有。用户在使用益寿巴渝平台服务时，应遵守以下条款。用户通过注册或使用本平台，即表示同意接受本协议的全部条款。</div>
      <div><strong>二、服务内容</strong></div>
      <div style={{ color: '#555' }}>益寿巴渝为用户提供以下服务：健康数据记录与管理、健康资讯推送、在线问诊预约、社区交流、养老服务查询、活动报名等。</div>
      <div><strong>三、用户注册与账户</strong></div>
      <div style={{ color: '#555' }}>1. 用户应提供真实、准确的个人信息<br/>2. 用户需妥善保管账户密码<br/>3. 用户需年满18周岁方可使用本平台服务</div>
      <div><strong>四、用户行为规范</strong></div>
      <div style={{ color: '#555' }}>用户不得发布违法违规内容、侵犯他人合法权益、破坏平台正常运行。</div>
      <div><strong>五、免责声明</strong></div>
      <div style={{ color: '#555' }}>平台不保证服务不会中断，用户因使用本平台造成的任何损失，平台不承担责任。</div>
    </div>
  );

  // 隐私政策内容
  const PRIVACY_CONTENT = (
    <div className="flex flex-col gap-4" style={{ fontSize: 14, lineHeight: 1.8, color: '#333' }}>
      <div><strong style={{ fontSize: 16 }}>益寿巴渝隐私政策</strong></div>
      <div style={{ color: '#666', fontSize: 13 }}>更新时间：2024年1月1日</div>
      <div><strong>一、我们如何收集信息</strong></div>
      <div style={{ color: '#555' }}>1. 用户注册时提供的信息（手机号、昵称等）<br/>2. 健康数据（血压、血糖、体检报告等）<br/>3. 设备信息<br/>4. 位置信息</div>
      <div><strong>二、我们如何使用信息</strong></div>
      <div style={{ color: '#555' }}>1. 提供、维护和改进服务<br/>2. 个性化推荐内容和服务<br/>3. 发送重要通知<br/>4. 进行数据分析和研究</div>
      <div><strong>三、我们如何共享信息</strong></div>
      <div style={{ color: '#555' }}>1. 经用户同意后与第三方共享<br/>2. 为提供服务的关联公司<br/>3. 遵守法律法规要求<br/>4. 不会出售用户个人信息</div>
      <div><strong>四、信息存储与安全</strong></div>
      <div style={{ color: '#555' }}>信息存储在安全服务器上，采用加密技术保护数据传输，严格限制访问权限。</div>
    </div>
  );

  const ready = true; // 演示模式：跳过验证

  const startCountdown = () => {
    if (!forgotPhone || forgotPhone.length < 11) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => { if (prev <= 1) { clearInterval(timer); return 0; } return prev - 1; });
    }, 1000);
  };

  const handleForgotClose = () => {
    setShowForgotModal(false);
    setForgotStep(1);
    setForgotPhone('');
    setForgotCode('');
    setForgotNewPwd('');
    setForgotConfirmPwd('');
    setCountdown(0);
  };

  return (
    <div className="flex flex-col flex-1" style={{ background: LOGIN_BG, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,107,53,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 120, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,180,80,0.08)', pointerEvents: 'none' }} />

      {/* 可滚动内容区域 */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4 gap-4" style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={onBack} className="flex items-center gap-2 border-0 bg-transparent cursor-pointer p-0 mb-2" style={{ color: '#B07050', fontSize: 15, position: 'relative' }}>
          <span style={{ fontSize: 20 }}>←</span> 返回
        </button>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#D4500A', position: 'relative' }}>密码登录</div>

        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>手机号</div>
          <div className="flex items-center rounded-2xl px-4 gap-3" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 60, background: 'rgba(255,255,255,0.85)' }}>
            <span style={{ fontSize: 16, color: '#B07050', flexShrink: 0 }}>+86</span>
            <div style={{ width: 1, height: 22, background: 'rgba(255,107,53,0.2)' }} />
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="请输入手机号码" maxLength={11}
              className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 18, color: '#1A1A1A' }} />
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>密码</div>
          <div className="flex items-center rounded-2xl px-4 gap-3" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 60, background: 'rgba(255,255,255,0.85)' }}>
            <LockOutlined style={{ fontSize: 18, color: '#C0A898', flexShrink: 0 }} />
            <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
              placeholder="请输入密码（8-16位）" className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 18, color: '#1A1A1A' }} />
            <button onClick={() => setShowPwd(!showPwd)} className="border-0 bg-transparent cursor-pointer p-1" style={{ color: '#C0A898' }}>
              {showPwd ? <EyeOutlined style={{ fontSize: 20 }} /> : <EyeInvisibleOutlined style={{ fontSize: 20 }} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end" style={{ position: 'relative' }}>
          <button onClick={() => setShowForgotModal(true)} className="border-0 bg-transparent cursor-pointer p-0" style={{ color: PRIMARY, fontSize: 15 }}>忘记密码？</button>
        </div>

        {/* 协议勾选 */}
        <div className="flex items-center gap-2 py-1">
          <button
            onClick={() => setAgreed(!agreed)}
            className="flex items-center justify-center rounded cursor-pointer border-0 flex-shrink-0 transition-all"
            style={{ width: 20, height: 20, background: agreed ? '#FF6B35' : 'transparent', border: `2px solid ${agreed ? '#FF6B35' : '#CCC'}` }}
          >
            {agreed && <CheckOutlined style={{ fontSize: 12, color: 'white' }} />}
          </button>
          <span style={{ fontSize: 13, color: '#8C7B6E' }}>
            我已阅读并同意
            <button onClick={() => setShowPolicyModal('agreement')} className="border-0 bg-transparent cursor-pointer p-0" style={{ color: PRIMARY, fontWeight: 500 }}>《用户协议》</button>
            和
            <button onClick={() => setShowPolicyModal('privacy')} className="border-0 bg-transparent cursor-pointer p-0" style={{ color: PRIMARY, fontWeight: 500 }}>《隐私政策》</button>
          </span>
        </div>

        {/* 占位元素 */}
        <div style={{ height: 80 }} />
      </div>

      {/* 固定底部登录按钮 */}
      <div className="w-full px-6 py-4 flex-shrink-0" style={{ background: LOGIN_BG }}>
        <button onClick={onLoginSuccess} className="w-full text-white font-bold cursor-pointer border-0"
          style={{ height: 64, borderRadius: 32, background: 'linear-gradient(90deg, #FF6B35 0%, #FFAA5A 100%)', fontSize: 20, boxShadow: '0 6px 18px rgba(255,107,53,0.35)' }}>
          登 录
        </button>
        {/* 切换到验证码登录 */}
        <div className="flex justify-center mt-3">
          <button onClick={onSwitchToSMS} className="border-0 bg-transparent cursor-pointer p-0" style={{ color: PRIMARY, fontSize: 14 }}>
            切换为验证码登录
          </button>
        </div>
      </div>

      {/* 用户协议/隐私政策弹窗 */}
      {showPolicyModal && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 110 }}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '85vh' }}>
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>
                {showPolicyModal === 'agreement' ? '用户协议' : '隐私政策'}
              </div>
              <button onClick={() => setShowPolicyModal(null)} className="border-0 bg-transparent cursor-pointer" style={{ fontSize: 24, color: '#AAA', lineHeight: 1 }}>×</button>
            </div>
            <div className="px-5 py-4 overflow-y-auto" style={{ flex: 1 }}>
              {showPolicyModal === 'agreement' ? AGREEMENT_CONTENT : PRIVACY_CONTENT}
            </div>
            <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: '1px solid #F0F0F0' }}>
              <button onClick={() => setShowPolicyModal(null)} className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
                style={{ height: 48, background: PRIMARY, fontSize: 16 }}>
                已阅读
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 忘记密码弹窗 */}
      {showForgotModal && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '85vh' }}>
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>
                {forgotStep === 1 ? '验证手机号' : forgotStep === 2 ? '设置新密码' : '设置成功'}
              </div>
              <button onClick={handleForgotClose} className="border-0 bg-transparent cursor-pointer" style={{ fontSize: 24, color: '#AAA', lineHeight: 1 }}>×</button>
            </div>
            <div className="px-5 py-5 flex flex-col gap-5" style={{ flex: 1, overflowY: 'auto' }}>
              {forgotStep === 1 ? (
                <>
                  <div style={{ fontSize: 15, color: '#666' }}>请输入您注册的手机号，系统将发送验证码</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>手机号</div>
                    <div className="flex items-center rounded-2xl px-4 gap-3" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 52, background: 'white' }}>
                      <span style={{ fontSize: 16, color: '#B07050', flexShrink: 0 }}>+86</span>
                      <div style={{ width: 1, height: 20, background: 'rgba(255,107,53,0.2)' }} />
                      <input type="tel" value={forgotPhone} onChange={e => setForgotPhone(e.target.value)} placeholder="请输入手机号码" maxLength={11}
                        className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 16, color: '#1A1A1A' }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>验证码</div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-2xl px-4 flex-1" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 52, background: 'white' }}>
                        <input type="number" value={forgotCode} onChange={e => setForgotCode(e.target.value)} placeholder="请输入验证码" maxLength={6}
                          className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 16, color: '#1A1A1A' }} />
                      </div>
                      <button onClick={startCountdown} disabled={countdown > 0 || forgotPhone.length < 11}
                        className="rounded-xl font-semibold cursor-pointer border-0 flex-shrink-0"
                        style={{ height: 52, padding: '0 14px', background: countdown > 0 || forgotPhone.length < 11 ? '#F0EBE4' : 'transparent', color: countdown > 0 || forgotPhone.length < 11 ? '#C0A898' : PRIMARY, fontSize: 14, border: `1px solid ${countdown > 0 || forgotPhone.length < 11 ? 'transparent' : 'rgba(255,107,53,0.3)'}` }}>
                        {countdown > 0 ? `${countdown}s` : '获取验证码'}
                      </button>
                    </div>
                  </div>
                  <button onClick={() => { if (forgotPhone.length >= 11 && forgotCode.length > 0) setForgotStep(2); }} className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
                    style={{ height: 48, background: forgotPhone.length >= 11 && forgotCode.length > 0 ? 'linear-gradient(90deg, #FF6B35 0%, #FFAA5A 100%)' : '#F5D5C0', fontSize: 16 }}>
                    下一步
                  </button>
                </>
              ) : forgotStep === 2 ? (
                <>
                  <div style={{ fontSize: 15, color: '#666' }}>验证码通过，请设置您的新密码</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>新密码</div>
                    <div className="flex items-center rounded-2xl px-4 gap-3" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 52, background: 'white' }}>
                      <LockOutlined style={{ fontSize: 18, color: '#C0A898', flexShrink: 0 }} />
                      <input type="password" value={forgotNewPwd} onChange={e => setForgotNewPwd(e.target.value)} placeholder="请输入新密码（6-12位）" maxLength={12}
                        className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 16, color: '#1A1A1A' }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>确认密码</div>
                    <div className="flex items-center rounded-2xl px-4 gap-3" style={{ border: `2px solid ${forgotConfirmPwd && forgotNewPwd !== forgotConfirmPwd ? '#FF4D4F' : 'rgba(255,107,53,0.25)'}`, height: 52, background: 'white' }}>
                      <LockOutlined style={{ fontSize: 18, color: '#C0A898', flexShrink: 0 }} />
                      <input type="password" value={forgotConfirmPwd} onChange={e => setForgotConfirmPwd(e.target.value)} placeholder="请再次输入新密码" maxLength={12}
                        className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 16, color: '#1A1A1A' }} />
                    </div>
                    {forgotConfirmPwd && forgotNewPwd !== forgotConfirmPwd && (
                      <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>两次输入的密码不一致</div>
                    )}
                  </div>
                  <button onClick={() => { if (forgotNewPwd.length >= 6 && forgotNewPwd === forgotConfirmPwd) setForgotStep(3); }} className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
                    style={{ height: 48, background: forgotNewPwd.length >= 6 && forgotNewPwd === forgotConfirmPwd ? 'linear-gradient(90deg, #FF6B35 0%, #FFAA5A 100%)' : '#F5D5C0', fontSize: 16 }}>
                    确认修改
                  </button>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center gap-4 py-6">
                    <CheckCircleFilled style={{ fontSize: 64, color: '#52C41A' }} />
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A' }}>密码修改成功！</div>
                    <div style={{ fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 1.8 }}>请使用新密码重新登录</div>
                  </div>
                  <button onClick={handleForgotClose} className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
                    style={{ height: 48, background: 'linear-gradient(90deg, #FF6B35 0%, #FFAA5A 100%)', fontSize: 16 }}>
                    返回登录
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 注册页面
const RegisterScreen: React.FC<{ onBack: () => void; onRegisterSuccess: () => void }> = ({ onBack, onRegisterSuccess }) => {
  const [phone, setPhone] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState<'agreement' | 'privacy' | null>(null);

  // 用户协议内容
  const AGREEMENT_CONTENT = (
    <div className="flex flex-col gap-4" style={{ fontSize: 14, lineHeight: 1.8, color: '#333' }}>
      <div><strong style={{ fontSize: 16 }}>益寿巴渝用户协议</strong></div>
      <div style={{ color: '#666', fontSize: 13 }}>更新时间：2024年1月1日</div>
      <div><strong>一、服务条款的确认和接纳</strong></div>
      <div style={{ color: '#555' }}>益寿巴渝平台所有权和运营权归[公司名称]所有。用户在使用益寿巴渝平台服务时，应遵守以下条款。用户通过注册或使用本平台，即表示同意接受本协议的全部条款。</div>
      <div><strong>二、服务内容</strong></div>
      <div style={{ color: '#555' }}>益寿巴渝为用户提供以下服务：健康数据记录与管理、健康资讯推送、在线问诊预约、社区交流、养老服务查询、活动报名等。具体服务内容以平台实际提供为准。</div>
      <div><strong>三、用户注册与账户</strong></div>
      <div style={{ color: '#555' }}>1. 用户应提供真实、准确的个人信息<br/>2. 用户需妥善保管账户密码，因保管不当造成的损失由用户承担<br/>3. 用户不得转让、借用或继承账户<br/>4. 用户需年满18周岁方可使用本平台服务</div>
      <div><strong>四、用户行为规范</strong></div>
      <div style={{ color: '#555' }}>用户在使用本平台时不得：<br/>1. 发布违法违规内容<br/>2. 侵犯他人合法权益<br/>3. 破坏平台正常运行<br/>4. 进行商业广告行为<br/>5. 其他违反法律法规的行为</div>
      <div><strong>五、免责声明</strong></div>
      <div style={{ color: '#555' }}>1. 平台不保证服务不会中断<br/>2. 用户因使用本平台造成的任何损失，平台不承担责任<br/>3. 用户在平台发表的内容不代表平台观点<br/>4. 平台有权随时修改或终止服务</div>
      <div><strong>六、知识产权</strong></div>
      <div style={{ color: '#555' }}>益寿巴渝平台的所有内容（包括但不限于文字、图片、视频、代码）的知识产权归平台所有，未经授权不得使用。</div>
      <div><strong>七、协议修改</strong></div>
      <div style={{ color: '#555' }}>平台有权随时修改本协议，修改后将在平台公示。用户继续使用本平台即表示接受修改后的协议。</div>
    </div>
  );

  // 隐私政策内容
  const PRIVACY_CONTENT = (
    <div className="flex flex-col gap-4" style={{ fontSize: 14, lineHeight: 1.8, color: '#333' }}>
      <div><strong style={{ fontSize: 16 }}>益寿巴渝隐私政策</strong></div>
      <div style={{ color: '#666', fontSize: 13 }}>更新时间：2024年1月1日</div>
      <div><strong>一、我们如何收集信息</strong></div>
      <div style={{ color: '#555' }}>1. 用户注册时提供的信息（手机号、昵称等）<br/>2. 健康数据（血压、血糖、体检报告等）<br/>3. 设备信息（设备型号、操作系统等）<br/>4. 位置信息（用于附近服务推荐）<br/>5. 使用记录（浏览、搜索、点击等行为数据）</div>
      <div><strong>二、我们如何使用信息</strong></div>
      <div style={{ color: '#555' }}>1. 提供、维护和改进服务<br/>2. 个性化推荐内容和服务<br/>3. 发送重要通知（订单提醒、健康提醒等）<br/>4. 进行数据分析和研究<br/>5. 预防欺诈和保障安全</div>
      <div><strong>三、我们如何共享信息</strong></div>
      <div style={{ color: '#555' }}>1. 经用户同意后与第三方共享<br/>2. 为提供服务的关联公司<br/>3. 遵守法律法规要求<br/>4. 保护平台和用户安全<br/>5. 不会出售用户个人信息</div>
      <div><strong>四、信息存储与安全</strong></div>
      <div style={{ color: '#555' }}>1. 信息存储在安全服务器上<br/>2. 采用加密技术保护数据传输<br/>3. 严格限制访问权限<br/>4. 定期进行安全审计<br/>5. 但无法保证绝对安全</div>
      <div><strong>五、用户权利</strong></div>
      <div style={{ color: '#555' }}>用户享有以下权利：<br/>1. 访问和下载个人信息<br/>2. 更正不准确信息<br/>3. 删除个人信息<br/>4. 撤回同意<br/>5. 注销账户</div>
      <div><strong>六、未成年人隐私</strong></div>
      <div style={{ color: '#555' }}>我们非常重视保护未成年人隐私。若您是未成年人，请在使用服务前征得监护人同意。我们不会故意收集未成年人的个人信息。</div>
      <div><strong>七、政策更新</strong></div>
      <div style={{ color: '#555' }}>我们可能随时更新本政策。重大变更将通过平台公告或推送通知告知。继续使用服务即表示接受更新后的政策。</div>
      <div><strong>八、联系我们</strong></div>
      <div style={{ color: '#555' }}>如对本政策有任何疑问，请联系我们：<br/>电话：400-XXX-XXXX<br/>邮箱：support@yishoubayu.com<br/>地址：重庆市渝北区XXX</div>
    </div>
  );

  const startCountdown = () => {
    if (!phone || phone.length < 11) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => { if (prev <= 1) { clearInterval(timer); return 0; } return prev - 1; });
    }, 1000);
  };

  const isFormValid = () => {
    if (phone.length < 11) return false;
    if (code.length < 4) return false;
    if (password.length < 8 || password.length > 16) return false;
    if (!agreed) return false;
    return true;
  };

  // 演示模式：跳过验证，直接注册成功
  const handleRegister = () => {
    onRegisterSuccess();
  };

  return (
    <div className="flex flex-col flex-1" style={{ background: LOGIN_BG, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,107,53,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 120, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,180,80,0.08)', pointerEvents: 'none' }} />

      {/* 可滚动内容区域 */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4 gap-4" style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={onBack} className="flex items-center gap-2 border-0 bg-transparent cursor-pointer p-0 mb-2" style={{ color: '#B07050', fontSize: 15, position: 'relative' }}>
          <span style={{ fontSize: 20 }}>←</span> 返回
        </button>

        <div style={{ fontSize: 24, fontWeight: 800, color: '#D4500A', position: 'relative' }}>注册账号</div>
        <div style={{ fontSize: 15, color: '#B07050', marginTop: -8, position: 'relative' }}>创建新账号，开始您的康养之旅</div>

        {/* 手机号 */}
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>手机号</div>
          <div className="flex items-center rounded-2xl px-4 gap-3" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 56, background: 'rgba(255,255,255,0.85)' }}>
            <span style={{ fontSize: 16, color: '#B07050', flexShrink: 0 }}>+86</span>
            <div style={{ width: 1, height: 22, background: 'rgba(255,107,53,0.2)' }} />
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="请输入手机号码" maxLength={11}
              className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 18, color: '#1A1A1A' }} />
          </div>
        </div>

        {/* 邀请码 */}
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>邀请码</div>
          <div className="flex items-center rounded-2xl px-4 gap-3" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 56, background: 'rgba(255,255,255,0.85)' }}>
            <GiftOutlined style={{ fontSize: 18, color: '#C0A898', flexShrink: 0 }} />
            <input type="text" value={inviteCode} onChange={e => setInviteCode(e.target.value)} placeholder="请输入邀请码" maxLength={8}
              className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 18, color: '#1A1A1A' }} />
          </div>
        </div>

        {/* 验证码 */}
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>验证码</div>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-2xl px-4 flex-1" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 52, background: 'white' }}>
              <input type="number" value={code} onChange={e => setCode(e.target.value)} placeholder="请输入验证码" maxLength={6}
                className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 16, color: '#1A1A1A' }} />
            </div>
            <button onClick={startCountdown} disabled={countdown > 0 || phone.length < 11}
              className="rounded-xl font-semibold cursor-pointer border-0 flex-shrink-0"
              style={{ height: 52, padding: '0 14px', background: countdown > 0 || phone.length < 11 ? '#F0EBE4' : 'transparent', color: countdown > 0 || phone.length < 11 ? '#C0A898' : PRIMARY, fontSize: 14, border: `1px solid ${countdown > 0 || phone.length < 11 ? 'transparent' : 'rgba(255,107,53,0.3)'}`, borderRadius: 14 }}>
              {countdown > 0 ? `${countdown}s` : '获取验证码'}
            </button>
          </div>
        </div>

        {/* 登录密码 */}
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>登录密码 <span style={{ color: '#999', fontWeight: 400 }}>（8-16位）</span></div>
          <div className="flex items-center rounded-2xl px-4 gap-3" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 56, background: 'rgba(255,255,255,0.85)' }}>
            <LockOutlined style={{ fontSize: 18, color: '#C0A898', flexShrink: 0 }} />
            <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
              placeholder="请设置登录密码（8-16位）" maxLength={16} className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 18, color: '#1A1A1A' }} />
            <button onClick={() => setShowPwd(!showPwd)} className="border-0 bg-transparent cursor-pointer p-1" style={{ color: '#C0A898' }}>
              {showPwd ? <EyeOutlined style={{ fontSize: 20 }} /> : <EyeInvisibleOutlined style={{ fontSize: 20 }} />}
            </button>
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#FFF2F0', border: '1px solid #FFCCC7' }}>
            <SafetyOutlined style={{ color: '#FF4D4F', fontSize: 14, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#FF4D4F' }}>{error}</span>
          </div>
        )}

        {/* 协议勾选 */}
        <div className="flex items-center gap-2 py-1">
          <button
            onClick={() => setAgreed(!agreed)}
            className="flex items-center justify-center rounded cursor-pointer border-0 flex-shrink-0 transition-all"
            style={{ width: 20, height: 20, background: agreed ? '#FF6B35' : 'transparent', border: `2px solid ${agreed ? '#FF6B35' : '#CCC'}` }}
          >
            {agreed && <CheckOutlined style={{ fontSize: 12, color: 'white' }} />}
          </button>
          <span style={{ fontSize: 13, color: '#8C7B6E' }}>
            我已阅读并同意
            <button onClick={() => setShowPolicyModal('agreement')} className="border-0 bg-transparent cursor-pointer p-0" style={{ color: PRIMARY, fontWeight: 500 }}>《用户协议》</button>
            和
            <button onClick={() => setShowPolicyModal('privacy')} className="border-0 bg-transparent cursor-pointer p-0" style={{ color: PRIMARY, fontWeight: 500 }}>《隐私政策》</button>
          </span>
        </div>

        {/* 占位元素，确保内容不遮挡底部按钮 */}
        <div style={{ height: 80 }} />
      </div>

      {/* 固定底部注册按钮 */}
      <div className="w-full px-6 py-4 flex-shrink-0" style={{ background: LOGIN_BG }}>
        <button onClick={handleRegister} className="w-full text-white font-bold cursor-pointer border-0"
          style={{ height: 64, borderRadius: 32, background: isFormValid() ? 'linear-gradient(90deg, #FF6B35 0%, #FFAA5A 100%)' : '#F5D5C0', fontSize: 20, boxShadow: isFormValid() ? '0 6px 18px rgba(255,107,53,0.35)' : 'none' }}>
          注 册
        </button>
      </div>

      {/* 用户协议/隐私政策弹窗 */}
      {showPolicyModal && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '85vh' }}>
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>
                {showPolicyModal === 'agreement' ? '用户协议' : '隐私政策'}
              </div>
              <button onClick={() => setShowPolicyModal(null)} className="border-0 bg-transparent cursor-pointer" style={{ fontSize: 24, color: '#AAA', lineHeight: 1 }}>×</button>
            </div>
            <div className="px-5 py-4 overflow-y-auto" style={{ flex: 1 }}>
              {showPolicyModal === 'agreement' ? AGREEMENT_CONTENT : PRIVACY_CONTENT}
            </div>
            <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: '1px solid #F0F0F0' }}>
              <button onClick={() => setShowPolicyModal(null)} className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
                style={{ height: 48, background: PRIMARY, fontSize: 16 }}>
                已阅读
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 第三方登录绑定手机号页面（两步）
const ThirdPartyBindScreen: React.FC<{ onBack: () => void; onBindSuccess: () => void }> = ({ onBack, onBindSuccess }) => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [showPolicyModal, setShowPolicyModal] = useState<'agreement' | 'privacy' | null>(null);

  // 用户协议内容
  const AGREEMENT_CONTENT = (
    <div className="flex flex-col gap-4" style={{ fontSize: 14, lineHeight: 1.8, color: '#333' }}>
      <div><strong style={{ fontSize: 16 }}>益寿巴渝用户协议</strong></div>
      <div style={{ color: '#666', fontSize: 13 }}>更新时间：2024年1月1日</div>
      <div><strong>一、服务条款的确认和接纳</strong></div>
      <div style={{ color: '#555' }}>益寿巴渝平台所有权和运营权归[公司名称]所有。用户在使用益寿巴渝平台服务时，应遵守以下条款。</div>
      <div><strong>二、服务内容</strong></div>
      <div style={{ color: '#555' }}>益寿巴渝为用户提供：健康数据记录与管理、健康资讯推送、在线问诊预约、社区交流、养老服务查询、活动报名等服务。</div>
      <div><strong>三、用户注册与账户</strong></div>
      <div style={{ color: '#555' }}>用户应提供真实、准确的个人信息，需妥善保管账户密码，用户需年满18周岁方可使用本平台服务。</div>
      <div><strong>四、用户行为规范</strong></div>
      <div style={{ color: '#555' }}>用户不得发布违法违规内容、侵犯他人合法权益、破坏平台正常运行。</div>
      <div><strong>五、免责声明</strong></div>
      <div style={{ color: '#555' }}>平台不保证服务不会中断，用户因使用本平台造成的任何损失，平台不承担责任。</div>
    </div>
  );

  // 隐私政策内容
  const PRIVACY_CONTENT = (
    <div className="flex flex-col gap-4" style={{ fontSize: 14, lineHeight: 1.8, color: '#333' }}>
      <div><strong style={{ fontSize: 16 }}>益寿巴渝隐私政策</strong></div>
      <div style={{ color: '#666', fontSize: 13 }}>更新时间：2024年1月1日</div>
      <div><strong>一、我们如何收集信息</strong></div>
      <div style={{ color: '#555' }}>1. 用户注册时提供的信息（手机号、昵称等）<br/>2. 健康数据（血压、血糖、体检报告等）<br/>3. 设备信息<br/>4. 位置信息</div>
      <div><strong>二、我们如何使用信息</strong></div>
      <div style={{ color: '#555' }}>1. 提供、维护和改进服务<br/>2. 个性化推荐内容和服务<br/>3. 发送重要通知<br/>4. 进行数据分析和研究</div>
      <div><strong>三、我们如何共享信息</strong></div>
      <div style={{ color: '#555' }}>1. 经用户同意后与第三方共享<br/>2. 为提供服务的关联公司<br/>3. 遵守法律法规要求<br/>4. 不会出售用户个人信息</div>
      <div><strong>四、信息存储与安全</strong></div>
      <div style={{ color: '#555' }}>信息存储在安全服务器上，采用加密技术保护数据传输，严格限制访问权限。</div>
      <div><strong>五、联系我们</strong></div>
      <div style={{ color: '#555' }}>电话：400-XXX-XXXX<br/>邮箱：support@yishoubayu.com</div>
    </div>
  );

  const startCountdown = () => {
    if (!phone || phone.length < 11) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => { if (prev <= 1) { clearInterval(timer); return 0; } return prev - 1; });
    }, 1000);
  };

  const WECHAT_GREEN = '#FF6B35';
  const WECHAT_GREEN_LIGHT = '#FFAA5A';
  const LOGIN_BG = '#FDF6EE';

  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-8 gap-4" style={{ background: LOGIN_BG, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,107,53,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 60, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,180,80,0.08)', pointerEvents: 'none' }} />

      {/* 返回按钮 */}
      <div style={{ display: 'flex', alignItems: 'center', height: 32, position: 'relative' }}>
        <button onClick={step === 1 ? onBack : () => setStep(1)} className="flex items-center gap-1 border-0 bg-transparent cursor-pointer p-0" style={{ color: '#B07050', fontSize: 15 }}>
          <span style={{ fontSize: 18 }}>←</span>
          <span>{step === 1 ? '返回' : '上一步'}</span>
        </button>
      </div>

      {/* 步骤1: 手机号绑定 */}
      {step === 1 && (
        <>
          <div style={{ height: 8, position: 'relative' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#D4500A' }}>绑定手机号</div>
            <div style={{ fontSize: 14, color: '#B07050', marginTop: 6 }}>绑定后享受益寿巴渝APP全部功能</div>
          </div>

          <div style={{ height: 12, position: 'relative' }} />

          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>手机号</div>
            <div className="flex items-center rounded-2xl px-4 gap-3" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 56, background: 'white' }}>
              <span style={{ fontSize: 16, color: '#B07050', flexShrink: 0 }}>+86</span>
              <div style={{ width: 1, height: 20, background: 'rgba(255,107,53,0.2)' }} />
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="请输入手机号码" maxLength={11}
                className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 17, color: '#1A1A1A' }} />
            </div>
          </div>

          <div style={{ height: 8, position: 'relative' }} />

          <button
            onClick={() => { if (phone.length >= 11) { setStep(2); startCountdown(); } }}
            className="w-full rounded-2xl text-white font-bold cursor-pointer border-0"
            style={{ height: 52, background: phone.length >= 11 ? `linear-gradient(90deg, ${WECHAT_GREEN} 0%, ${WECHAT_GREEN_LIGHT} 100%)` : 'rgba(255,107,53,0.2)', fontSize: 17, boxShadow: phone.length >= 11 ? '0 4px 14px rgba(255,107,53,0.3)' : 'none', borderRadius: 26, position: 'relative' }}>
            下一步
          </button>

          <div style={{ height: 4, position: 'relative' }} />

          <div style={{ fontSize: 12, color: '#C0A898', textAlign: 'center', position: 'relative' }}>
            绑定即表示同意
            <button onClick={() => setShowPolicyModal('agreement')} className="border-0 bg-transparent cursor-pointer p-0" style={{ color: '#D4500A', fontWeight: 500 }}>《用户协议》</button>
            和
            <button onClick={() => setShowPolicyModal('privacy')} className="border-0 bg-transparent cursor-pointer p-0" style={{ color: '#D4500A', fontWeight: 500 }}>《隐私政策》</button>
          </div>
        </>
      )}

      {/* 步骤2: 验证码确认 */}
      {step === 2 && (
        <>
          <div style={{ height: 8, position: 'relative' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#D4500A' }}>输入验证码</div>
            <div style={{ fontSize: 14, color: '#B07050', marginTop: 6 }}>
              已发送至 <strong style={{ color: '#D4500A' }}>{phone}</strong>
            </div>
          </div>

          <div style={{ height: 12, position: 'relative' }} />

          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>验证码</div>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-2xl px-4 flex-1" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 56, background: 'white' }}>
                <input type="number" value={code} onChange={e => setCode(e.target.value)} placeholder="请输入验证码" maxLength={6}
                  className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 17, color: '#1A1A1A' }} />
              </div>
              <button onClick={startCountdown} disabled={countdown > 0}
                className="rounded-2xl font-semibold cursor-pointer border-0 flex-shrink-0"
                style={{ height: 56, padding: '0 14px', background: countdown > 0 ? '#FFF2EC' : 'white', color: countdown > 0 ? '#C0A898' : WECHAT_GREEN, fontSize: 14, border: `1px solid ${countdown > 0 ? 'transparent' : 'rgba(255,107,53,0.3)'}`, borderRadius: 14 }}>
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </button>
            </div>
          </div>

          <div style={{ fontSize: 12, color: '#C0A898', position: 'relative' }}>验证码有效期 10 分钟，如未收到请检查手机信号</div>

          <div style={{ height: 8, position: 'relative' }} />

          <button
            onClick={onBindSuccess}
            className="w-full rounded-2xl text-white font-bold cursor-pointer border-0"
            style={{ height: 52, background: code.length > 0 ? `linear-gradient(90deg, ${WECHAT_GREEN} 0%, ${WECHAT_GREEN_LIGHT} 100%)` : 'rgba(255,107,53,0.2)', fontSize: 17, boxShadow: code.length > 0 ? '0 4px 14px rgba(255,107,53,0.3)' : 'none', borderRadius: 26, position: 'relative' }}>
            确认绑定
          </button>
        </>
      )}

      {/* 用户协议/隐私政策弹窗 */}
      {showPolicyModal && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '85vh' }}>
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>
                {showPolicyModal === 'agreement' ? '用户协议' : '隐私政策'}
              </div>
              <button onClick={() => setShowPolicyModal(null)} className="border-0 bg-transparent cursor-pointer" style={{ fontSize: 24, color: '#AAA', lineHeight: 1 }}>×</button>
            </div>
            <div className="px-5 py-4 overflow-y-auto" style={{ flex: 1 }}>
              {showPolicyModal === 'agreement' ? AGREEMENT_CONTENT : PRIVACY_CONTENT}
            </div>
            <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: '1px solid #F0F0F0' }}>
              <button onClick={() => setShowPolicyModal(null)} className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
                style={{ height: 48, background: '#FF6B35', fontSize: 16 }}>
                已阅读
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface MainLoginScreenProps { onNavigate: (m: LoginMode) => void; onLoginSuccess: () => void; }
const MainLoginScreen: React.FC<MainLoginScreenProps> = ({ onNavigate, onLoginSuccess }) => {
  return (
    <div className="flex flex-col flex-1" style={{ background: LOGIN_BG, position: 'relative', overflow: 'hidden' }}>
      {/* 装饰圆 */}
      <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,107,53,0.10)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 80, left: -40, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,180,80,0.10)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 120, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,107,53,0.07)', pointerEvents: 'none' }} />

      {/* Logo + 欢迎语 */}
      <div className="flex flex-col items-center pt-12 pb-2 flex-shrink-0">
        <img src={logoImg} alt="益寿巴渝" style={{ width: 180, height: 180, objectFit: 'contain' }} />
        <div style={{ fontSize: 14, color: '#B07050', marginTop: 16, letterSpacing: 1 }}>记录美好生活 · 陪伴每一天</div>
      </div>

      {/* 登录/注册按钮区域 - 垂直居中布局 */}
      <div className="flex flex-col items-center justify-center flex-1 px-8 gap-5">
        {/* 手机号登录按钮 */}
        <button
          onClick={() => onNavigate('phone-sms')}
          className="w-full rounded-2xl text-white font-bold cursor-pointer border-0 active:scale-95 transition-transform"
          style={{ height: 58, background: 'linear-gradient(90deg, #FF6B35 0%, #FFAA5A 100%)', fontSize: 18, boxShadow: '0 6px 18px rgba(255,107,53,0.35)' }}
        >
          手机号登录
        </button>

        {/* 立即注册按钮 */}
        <button
          onClick={() => onNavigate('register')}
          className="w-full rounded-2xl font-bold cursor-pointer border-0 active:scale-95 transition-transform"
          style={{ height: 58, background: 'white', fontSize: 18, boxShadow: '0 3px 10px rgba(0,0,0,0.08)', border: '2px solid rgba(255,107,53,0.3)', color: '#FF6B35' }}
        >
          立即注册
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── SERVICE DETAIL COMPONENTS ─────────────────
// ─────────────────────────────────────────────

interface BookingModalProps { restaurant: Restaurant; onClose: () => void; }
const BookingModal: React.FC<BookingModalProps> = ({ restaurant, onClose }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng: number; name: string} | null>(null);

  const handleLocationSelect = (loc: {lat: number; lng: number; name: string}) => {
    setSelectedLocation(loc);
    setAddress(loc.name);
    setShowMap(false);
  };

  if (confirmed) {
    return (
      <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }}>
        <div className="w-full bg-white rounded-t-3xl p-8 flex flex-col items-center gap-4" style={{ paddingBottom: 48 }}>
          <CheckCircleFilled style={{ fontSize: 64, color: '#52C41A' }} />
          <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A' }}>预约成功！</div>
          <div style={{ fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 1.8 }}>
            已预约 <strong>{restaurant.name}</strong><br />服务人员将在 30 分钟内致电确认时间
          </div>
          {selectedLocation && (
            <div className="w-full px-4 py-3 rounded-2xl flex items-start gap-2" style={{ background: '#E6F4FF', border: '1px solid #91D5FF' }}>
              <EnvironmentOutlined style={{ fontSize: 16, color: '#1677FF', marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 14, color: '#1677FF', fontWeight: 600 }}>送餐地址</div>
                <div style={{ fontSize: 13, color: '#333', marginTop: 2 }}>{address}</div>
              </div>
            </div>
          )}
          <div className="w-full px-4 py-4 rounded-2xl" style={{ background: '#F6FFED', border: '1px solid #B7EB8F' }}>
            <div style={{ fontSize: 14, color: '#389E0D' }}>预约记录已同步到"我的订单"，可随时查看进度</div>
          </div>
          <button onClick={onClose} className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
            style={{ height: 60, background: PRIMARY, fontSize: 18 }}>返回列表</button>
        </div>
      </div>
    );
  }

  // 地图选址模拟界面
  if (showMap) {
    const mockLocations = [
      { lat: 29.55, lng: 106.55, name: '渝中区大坪街道某小区' },
      { lat: 29.56, lng: 106.56, name: '渝中区石油路街道某社区' },
      { lat: 29.54, lng: 106.54, name: '渝中区化龙桥街道某小区' },
    ];
    return (
      <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 60 }}>
        <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ height: '80vh' }}>
          <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #F0F0F0' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>选择送餐地址</div>
            <button onClick={() => setShowMap(false)} className="border-0 bg-transparent cursor-pointer text-2xl" style={{ color: '#AAA', lineHeight: 1 }}>×</button>
          </div>
          <div className="flex-1 relative" style={{ background: '#F5F5F5' }}>
            {/* 模拟地图背景 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <EnvironmentOutlined style={{ fontSize: 48, color: '#CCC' }} />
                <div style={{ fontSize: 14, color: '#999', marginTop: 8 }}>地图定位中...</div>
              </div>
            </div>
            {/* 模拟位置标记 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: PRIMARY }}>
                  <EnvironmentOutlined style={{ color: 'white', fontSize: 16 }} />
                </div>
                <div className="w-0.5 h-4" style={{ background: PRIMARY }} />
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 p-4" style={{ borderTop: '1px solid #F0F0F0', background: 'white' }}>
            <div style={{ fontSize: 14, color: '#888', marginBottom: 12 }}>请选择或输入送餐地址</div>
            <div className="flex flex-col gap-2">
              {mockLocations.map((loc, idx) => (
                <button key={idx} onClick={() => handleLocationSelect(loc)}
                  className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors"
                  style={{ background: selectedLocation?.name === loc.name ? PRIMARY_BG : 'white', borderColor: selectedLocation?.name === loc.name ? PRIMARY : '#E8E8E8' }}>
                  <EnvironmentOutlined style={{ color: selectedLocation?.name === loc.name ? PRIMARY : '#999', fontSize: 18 }} />
                  <span style={{ fontSize: 14, color: selectedLocation?.name === loc.name ? PRIMARY : '#333', textAlign: 'left' }}>{loc.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-4">
              <input type="text" placeholder="输入详细地址..." value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border" style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
            </div>
            <button onClick={() => setShowMap(false)} className="w-full mt-3 rounded-2xl text-white font-bold border-0 cursor-pointer"
              style={{ height: 50, background: address ? PRIMARY : '#DDD', fontSize: 16 }}>确认地址</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }}>
      <div className="w-full bg-white rounded-t-3xl" style={{ paddingBottom: 48 }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #F0F0F0' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>确认预约</div>
          <button onClick={onClose} className="border-0 bg-transparent cursor-pointer text-2xl" style={{ color: '#AAA', lineHeight: 1 }}>×</button>
        </div>
        <div className="px-5 py-4 flex flex-col gap-4">
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>{restaurant.name}</div>
          {[
            { label: '就餐时间', value: '今天 11:30（午餐）' },
            { label: '就餐人数', value: '1 人' },
            { label: '特殊备注', value: '少盐少油，软烂易嚼' },
            { label: '配送方式', value: restaurant.delivery ? '上门送餐' : '到店就餐' },
            { label: '预计费用', value: `¥${restaurant.price} 起` },
          ].map(row => (
            <div key={row.label} className="flex items-start justify-between" style={{ borderBottom: '1px solid #F5F5F5', paddingBottom: 12 }}>
              <span style={{ fontSize: 15, color: '#888', flexShrink: 0 }}>{row.label}</span>
              <span style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
            </div>
          ))}
          {/* 送餐地址字段 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 15, color: '#888', flexShrink: 0 }}>送餐地址</span>
              {address && (
                <button onClick={() => setAddress('')} style={{ fontSize: 13, color: '#999', border: 'none', background: 'transparent', cursor: 'pointer' }}>清除</button>
              )}
            </div>
            <button onClick={() => setShowMap(true)}
              className="flex items-center justify-between p-3 rounded-xl border cursor-pointer"
              style={{ background: address ? PRIMARY_BG : 'white', borderColor: address ? PRIMARY : '#E8E8E8' }}>
              <span style={{ fontSize: 14, color: address ? PRIMARY : '#999', textAlign: 'left', flex: 1 }}>
                {address || '点击选择地图位置'}
              </span>
              <EnvironmentOutlined style={{ color: address ? PRIMARY : '#CCC', fontSize: 16 }} />
            </button>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose}
              className="flex-1 rounded-xl border cursor-pointer font-bold"
              style={{ height: 50, background: '#F5F5F5', color: '#666', fontSize: 16 }}>取消</button>
            <button onClick={() => setConfirmed(true)}
              className="flex-1 rounded-xl border-0 cursor-pointer font-bold"
              style={{ height: 50, background: PRIMARY, color: 'white', fontSize: 16 }}>确认预约</button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RestaurantCardProps { restaurant: Restaurant; onBook: (r: Restaurant) => void; }
const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant: r, onBook }) => (
  <div className="bg-white rounded-2xl overflow-hidden flex flex-col" style={{ border: '1px solid #EBEBEB' }}>
    <div className="flex gap-3 p-4 pb-3">
      <img src={r.image} alt={r.name} className="rounded-xl object-cover flex-shrink-0" style={{ width: 90, height: 72 }} />
      <div className="flex-1 min-w-0">
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4 }}>{r.name}</div>
        <div className="flex items-center gap-1 mt-1">
          <StarFilled style={{ fontSize: 14, color: '#FAAD14' }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{r.rating}</span>
          <span style={{ fontSize: 13, color: '#AAA' }}>（{r.ratingCount}人评价）</span>
        </div>
        <div className="flex items-center gap-3 mt-1" style={{ fontSize: 13, color: '#888' }}>
          <span className="flex items-center gap-1"><EnvironmentOutlined /> {r.distance}</span>
          <span className="flex items-center gap-1"><ClockCircleOutlined /> {r.hours}</span>
        </div>
        <div className="mt-1" style={{ fontSize: 14 }}>
          <span style={{ color: PRIMARY, fontWeight: 700, fontSize: 16 }}>¥{r.price}</span>
          <span style={{ color: '#AAA' }}> /餐起</span>
          {r.delivery && (
            <span className="ml-2 rounded-md px-1.5 py-0.5" style={{ fontSize: 12, background: PRIMARY_BG, color: PRIMARY }}>支持送餐</span>
          )}
        </div>
      </div>
    </div>
    <div className="flex flex-wrap gap-1.5 px-4 pb-3">
      {r.tags.map(tag => (
        <span key={tag} className="rounded-lg px-2 py-1 flex items-center gap-1" style={{ fontSize: 12, background: '#F5F5F5', color: '#666' }}>
          <TagOutlined style={{ fontSize: 11 }} />{tag}
        </span>
      ))}
    </div>
    <div className="flex items-center justify-end gap-2 px-4 py-3" style={{ borderTop: '1px solid #F5F5F5' }}>
      <button onClick={() => window.location.href = 'tel:023-8888-6666'} className="flex items-center gap-1 rounded-xl text-white font-semibold border-0 cursor-pointer active:scale-95 transition-transform"
        style={{ height: 40, padding: '0 16px', background: '#52C41A', fontSize: 14 }}>
        <PhoneOutlined style={{ fontSize: 14 }} />拨打电话
      </button>
      <button onClick={() => onBook(r)} className="rounded-xl text-white font-semibold border-0 cursor-pointer active:scale-95 transition-transform"
        style={{ height: 40, padding: '0 20px', background: PRIMARY, fontSize: 15 }}>立即预约</button>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// ── CHAT COMPONENTS ───────────────────────────
// ─────────────────────────────────────────────

const ChatAvatar: React.FC<{ sender: MsgSender; onClick?: () => void }> = ({ sender, onClick }) => (
  <div
    className={`rounded-full flex-shrink-0 overflow-hidden ${onClick ? 'cursor-pointer active:scale-95 transition-transform' : ''}`}
    style={{ width: 40, height: 40 }}
    onClick={onClick}
  >
    {sender === 'other' ? (
      <img src="https://picsum.photos/seed/elder_daughter/40/40" alt="李秀英" style={{ width: 40, height: 40, objectFit: 'cover' }} />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-white font-bold" style={{ background: PRIMARY, fontSize: 16 }}>我</div>
    )}
  </div>
);

const VoiceBubble: React.FC<{ duration: number; sender: MsgSender }> = ({ duration, sender }) => {
  const [playing, setPlaying] = useState(false);
  const isMe = sender === 'me';
  const toggle = () => {
    setPlaying(p => !p);
    if (!playing) setTimeout(() => setPlaying(false), duration * 1000);
  };
  return (
    <button onClick={toggle} className="flex items-center gap-2 rounded-2xl border-0 cursor-pointer transition-all active:scale-95"
      style={{ width: 140, height: 46, paddingLeft: 14, paddingRight: 14, background: isMe ? PRIMARY : 'white', color: isMe ? 'white' : '#1A1A1A',
        flexDirection: isMe ? 'row-reverse' : 'row', boxShadow: isMe ? 'none' : '0 1px 4px rgba(0,0,0,0.08)' }}>
      {playing ? <PauseCircleFilled style={{ fontSize: 22, flexShrink: 0 }} /> : <PlayCircleFilled style={{ fontSize: 22, flexShrink: 0 }} />}
      <SoundOutlined style={{ fontSize: 16, opacity: 0.7 }} />
      <span style={{ fontSize: 14, fontWeight: 500, flexShrink: 0 }}>{duration}"</span>
    </button>
  );
};

const ChatBubble: React.FC<{ msg: ChatMessage; onOpenFriendDetail?: (userId: number) => void; onOpenMyDetail?: (userId: number) => void }> = ({ msg, onOpenFriendDetail, onOpenMyDetail }) => {
  const isMe = msg.sender === 'me';

  const handleAvatarClick = () => {
    if (isMe && onOpenMyDetail) {
      onOpenMyDetail(0);
    } else if (!isMe && onOpenFriendDetail && msg.userId !== undefined) {
      onOpenFriendDetail(msg.userId);
    }
  };

  return (
    <div className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className="rounded-full flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
        style={{ width: 40, height: 40 }}
        onClick={handleAvatarClick}
      >
        {isMe ? (
          <div className="w-full h-full flex items-center justify-center text-white font-bold" style={{ background: PRIMARY, fontSize: 16 }}>我</div>
        ) : (
          <img src="https://picsum.photos/seed/elder_daughter/40/40" alt="" style={{ width: 40, height: 40, objectFit: 'cover' }} />
        )}
      </div>
      {msg.type === 'text' && (
        <div style={{ maxWidth: 240, padding: '10px 14px', background: isMe ? PRIMARY : 'white', color: isMe ? 'white' : '#1A1A1A',
          borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px', fontSize: 16, lineHeight: 1.6,
          boxShadow: isMe ? 'none' : '0 1px 4px rgba(0,0,0,0.08)', wordBreak: 'break-word' }}>
          {msg.content}
        </div>
      )}
      {msg.type === 'voice' && <VoiceBubble duration={msg.duration!} sender={msg.sender} />}
      {msg.type === 'image' && (
        <img src={msg.image} alt="图片消息" style={{ width: 160, height: 120, borderRadius: 12, objectFit: 'cover', display: 'block' }} />
      )}
    </div>
  );
};

const TimeDivider: React.FC<{ time: string }> = ({ time }) => (
  <div className="flex items-center justify-center py-1">
    <span className="px-3 py-1 rounded-xl" style={{ fontSize: 12, color: '#AAA', background: 'rgba(0,0,0,0.06)' }}>{time}</span>
  </div>
);

// ─────────────────────────────────────────────
// ── SHARE SHEET ───────────────────────────────
// ─────────────────────────────────────────────
const ShareSheet: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => { setCopied(false); onClose(); }, 1200);
  };

  const SHARE_OPTIONS = [
    { label: '私信好友', Icon: MessageOutlined, color: '#FF6B35', bg: '#FFF4EF' },
    { label: '微信好友', Icon: WechatOutlined, color: '#07C160', bg: '#E8FFF0' },
    { label: '朋友圈', Icon: TeamOutlined, color: '#07C160', bg: '#E8FFF0' },
    { label: '复制链接', Icon: CopyOutlined, color: '#1677FF', bg: '#E6F4FF' },
  ] as const;

  return (
    <div className="absolute inset-0 z-[400] flex items-end"
      style={{ background: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}>
      <div className="w-full bg-white rounded-t-3xl" style={{ paddingBottom: 24 }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-center pt-3 pb-1">
          <div style={{ width: 36, height: 4, background: '#E0E0E0', borderRadius: 2 }} />
        </div>
        <div className="px-4 pt-3 pb-1 text-center" style={{ fontSize: 14, color: '#888' }}>分享到</div>
        <div className="flex justify-around px-4 py-4">
          {SHARE_OPTIONS.map((opt) => {
            const { Icon } = opt;
            const isCopyDone = copied && opt.label === '复制链接';
            return (
              <button
                key={opt.label}
                onClick={opt.label === '复制链接' ? handleCopy : onClose}
                className="flex flex-col items-center gap-2 border-0 bg-transparent cursor-pointer active:scale-95 transition-transform"
              >
                <div className="flex items-center justify-center rounded-2xl"
                  style={{ width: 58, height: 58, background: isCopyDone ? '#F6FFED' : opt.bg }}>
                  {isCopyDone
                    ? <CheckCircleFilled style={{ fontSize: 28, color: '#52C41A' }} />
                    : <Icon style={{ fontSize: 28, color: opt.color }} />}
                </div>
                <span style={{ fontSize: 12, color: '#444' }}>{isCopyDone ? '已复制' : opt.label}</span>
              </button>
            );
          })}
        </div>
        <div className="px-4 pt-2">
          <button onClick={onClose}
            className="w-full rounded-2xl border-0 cursor-pointer font-medium"
            style={{ height: 52, background: '#F5F5F5', fontSize: 16, color: '#555' }}>取消</button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── MORE MENU BUBBLE ─────────────────────────
// ─────────────────────────────────────────────
const MoreMenuBubble: React.FC<{
  onClose: () => void;
  onAddFriend: () => void;
  onShareCard: () => void;
  onReport: () => void;
  onBlock: () => void;
}> = ({ onClose, onAddFriend, onShareCard, onReport, onBlock }) => {
  const ITEMS = [
    { label: '添加好友', Icon: UserAddOutlined, color: '#FF6B35', action: onAddFriend },
    { label: '分享名片', Icon: IdcardOutlined, color: '#1677FF', action: onShareCard },
    { label: '举报', Icon: ExclamationCircleOutlined, color: '#FA8C16', action: onReport },
    { label: '拉黑', Icon: StopOutlined, color: '#FF4D4F', action: onBlock },
  ];
  return (
    <>
      <div className="absolute inset-0 z-40" onClick={onClose} />
      <div className="absolute z-50"
        style={{ top: 54, right: 10, background: 'white', borderRadius: 14, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', overflow: 'hidden', minWidth: 140 }}>
        {/* caret */}
        <div style={{ position: 'absolute', top: -8, right: 14, width: 16, height: 8, overflow: 'hidden' }}>
          <div style={{ width: 14, height: 14, background: 'white', transform: 'rotate(45deg)', marginLeft: 1, marginTop: 4, boxShadow: '-2px -2px 4px rgba(0,0,0,0.06)' }} />
        </div>
        {ITEMS.map((item, idx) => {
          const { Icon } = item;
          return (
            <button key={item.label}
              onClick={() => { onClose(); item.action(); }}
              className="flex items-center gap-3 w-full border-0 bg-transparent cursor-pointer active:scale-95"
              style={{
                padding: '13px 18px',
                borderBottom: idx < ITEMS.length - 1 ? '1px solid #F5F5F5' : 'none',
                fontSize: 15, color: '#1A1A1A', fontWeight: 500,
              }}>
              <Icon style={{ fontSize: 18, color: item.color }} />
              {item.label}
            </button>
          );
        })}
      </div>
    </>
  );
};

// ─────────────────────────────────────────────
// ── ADD FRIEND MODAL (仿微信) ─────────────────
// ─────────────────────────────────────────────
const AddFriendModal: React.FC<{ profile: { name: string; avatar: string; uid: string; ip: string }; onClose: () => void }> = ({ profile, onClose }) => {
  const [step, setStep] = useState<'confirm' | 'verify' | 'sent'>('confirm');
  const [verifyText, setVerifyText] = useState(`我是${profile.name}的益寿好友`);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="bg-white rounded-3xl overflow-hidden" style={{ width: 310, boxShadow: '0 8px 40px rgba(0,0,0,0.22)' }} onClick={e => e.stopPropagation()}>
        {step === 'confirm' && (
          <>
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <span style={{ fontSize: 17, fontWeight: 700 }}>添加好友</span>
              <button onClick={onClose} className="border-0 bg-transparent cursor-pointer" style={{ color: '#999' }}><CloseOutlined /></button>
            </div>
            <div className="flex items-center gap-4 px-5 py-4" style={{ borderTop: '1px solid #F5F5F5', borderBottom: '1px solid #F5F5F5' }}>
              <div className="flex items-center justify-center rounded-2xl font-black flex-shrink-0"
                style={{ width: 56, height: 56, background: '#FF6B35', color: 'white', fontSize: 22 }}>
                {profile.avatar}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{profile.name}</div>
                <div style={{ fontSize: 12, color: '#999', marginTop: 3 }}>益寿号：{profile.uid}</div>
                <div style={{ fontSize: 12, color: '#999' }}>IP：{profile.ip}</div>
              </div>
            </div>
            <div className="px-5 py-4">
              <button onClick={() => setStep('verify')}
                className="w-full rounded-2xl border-0 cursor-pointer font-semibold active:scale-95"
                style={{ height: 48, background: '#FF6B35', color: 'white', fontSize: 16 }}>
                发送好友申请
              </button>
              <button onClick={onClose}
                className="w-full rounded-2xl border-0 cursor-pointer font-medium mt-2"
                style={{ height: 44, background: '#F5F5F5', color: '#555', fontSize: 15 }}>
                取消
              </button>
            </div>
          </>
        )}
        {step === 'verify' && (
          <>
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <button onClick={() => setStep('confirm')} className="border-0 bg-transparent cursor-pointer" style={{ color: '#FF6B35', fontSize: 15 }}>返回</button>
              <span style={{ fontSize: 17, fontWeight: 700 }}>发送申请</span>
              <div style={{ width: 40 }} />
            </div>
            <div className="px-5 pb-4">
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>验证信息（对方可见）</div>
              <textarea
                value={verifyText}
                onChange={e => setVerifyText(e.target.value)}
                maxLength={50}
                rows={3}
                className="w-full rounded-2xl border"
                style={{ padding: '10px 14px', fontSize: 15, resize: 'none', borderColor: '#E0E0E0', outline: 'none', fontFamily: 'inherit' }}
              />
              <div style={{ fontSize: 11, color: '#CCC', textAlign: 'right' }}>{verifyText.length}/50</div>
              <button onClick={() => setStep('sent')}
                className="w-full rounded-2xl border-0 cursor-pointer font-semibold active:scale-95 mt-3"
                style={{ height: 48, background: '#FF6B35', color: 'white', fontSize: 16 }}>
                发送
              </button>
            </div>
          </>
        )}
        {step === 'sent' && (
          <div className="flex flex-col items-center px-5 py-8 gap-3">
            <CheckCircleFilled style={{ fontSize: 52, color: '#52C41A' }} />
            <div style={{ fontSize: 18, fontWeight: 700 }}>申请已发送</div>
            <div style={{ fontSize: 14, color: '#888', textAlign: 'center' }}>等待 {profile.name} 确认后即可成为好友</div>
            <button onClick={onClose}
              className="w-full rounded-2xl border-0 cursor-pointer font-semibold active:scale-95 mt-2"
              style={{ height: 48, background: '#FF6B35', color: 'white', fontSize: 16 }}>
              知道了
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── SHARE CARD SHEET (分享名片) ───────────────
// ─────────────────────────────────────────────
const ShareCardSheet: React.FC<{ profile: { name: string; avatar: string; uid: string }; onClose: () => void }> = ({ profile, onClose }) => {
  const [copied, setCopied] = useState(false);
  const SHARE_OPTIONS = [
    { label: '私信好友', Icon: MessageOutlined, color: '#FF6B35', bg: '#FFF4EF' },
    { label: '微信好友', Icon: WechatOutlined, color: '#07C160', bg: '#E8FFF0' },
    { label: '朋友圈', Icon: TeamOutlined, color: '#07C160', bg: '#E8FFF0' },
    { label: '复制链接', Icon: CopyOutlined, color: '#1677FF', bg: '#E6F4FF' },
  ] as const;
  const handleCopy = () => { setCopied(true); setTimeout(() => { setCopied(false); onClose(); }, 1200); };
  return (
    <div className="absolute inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div className="w-full bg-white rounded-t-3xl" style={{ paddingBottom: 24 }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-center pt-3 pb-1">
          <div style={{ width: 36, height: 4, background: '#E0E0E0', borderRadius: 2 }} />
        </div>
        {/* 名片预览 */}
        <div className="mx-4 mt-3 mb-2 rounded-2xl flex items-center gap-3 px-4 py-3"
          style={{ background: '#FFF8F5', border: '1.5px solid #FFD0B8' }}>
          <div className="flex items-center justify-center rounded-xl font-black flex-shrink-0"
            style={{ width: 44, height: 44, background: '#FF6B35', color: 'white', fontSize: 18 }}>
            {profile.avatar}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{profile.name}</div>
            <div style={{ fontSize: 12, color: '#999' }}>益寿号：{profile.uid}</div>
          </div>
          <IdcardOutlined style={{ fontSize: 22, color: '#FF6B35', marginLeft: 'auto' }} />
        </div>
        <div className="px-4 pt-1 pb-1 text-center" style={{ fontSize: 14, color: '#888' }}>分享名片到</div>
        <div className="flex justify-around px-4 py-4">
          {SHARE_OPTIONS.map((opt) => {
            const { Icon } = opt;
            const isCopyDone = copied && opt.label === '复制链接';
            return (
              <button key={opt.label}
                onClick={opt.label === '复制链接' ? handleCopy : onClose}
                className="flex flex-col items-center gap-2 border-0 bg-transparent cursor-pointer active:scale-95 transition-transform">
                <div className="flex items-center justify-center rounded-2xl"
                  style={{ width: 58, height: 58, background: isCopyDone ? '#F6FFED' : opt.bg }}>
                  {isCopyDone
                    ? <CheckCircleFilled style={{ fontSize: 28, color: '#52C41A' }} />
                    : <Icon style={{ fontSize: 28, color: opt.color }} />}
                </div>
                <span style={{ fontSize: 12, color: '#555' }}>{isCopyDone ? '已复制' : opt.label}</span>
              </button>
            );
          })}
        </div>
        <div className="px-4 pt-2">
          <button onClick={onClose} className="w-full rounded-2xl border-0 cursor-pointer font-medium"
            style={{ height: 52, background: '#F5F5F5', fontSize: 16, color: '#555' }}>取消</button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── REPORT MODAL (仿抖音) ─────────────────────
// ─────────────────────────────────────────────
const ReportModal: React.FC<{ name: string; onClose: () => void }> = ({ name, onClose }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const REASONS = ['骚扰我', '发布垃圾广告', '冒充他人', '传播虚假信息', '涉黄涉暴', '诈骗', '其他'];
  return (
    <div className="absolute inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div className="w-full bg-white rounded-t-3xl" style={{ paddingBottom: 24, maxHeight: '75vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-center pt-3 pb-1">
          <div style={{ width: 36, height: 4, background: '#E0E0E0', borderRadius: 2 }} />
        </div>
        {!submitted ? (
          <>
            <div className="flex items-center justify-between px-5 py-3">
              <span style={{ fontSize: 17, fontWeight: 700 }}>举报 {name}</span>
              <button onClick={onClose} className="border-0 bg-transparent cursor-pointer" style={{ color: '#999', fontSize: 20 }}><CloseOutlined /></button>
            </div>
            <div style={{ fontSize: 13, color: '#999', paddingInline: 20, marginBottom: 8 }}>请选择举报原因</div>
            <div className="flex flex-col">
              {REASONS.map((r) => (
                <button key={r}
                  onClick={() => setSelected(r)}
                  className="flex items-center justify-between border-0 bg-transparent cursor-pointer"
                  style={{ padding: '14px 20px', borderBottom: '1px solid #F5F5F5', fontSize: 15, color: '#1A1A1A' }}>
                  {r}
                  {selected === r
                    ? <CheckCircleFilled style={{ fontSize: 18, color: '#FF6B35' }} />
                    : <RightOutlined style={{ fontSize: 12, color: '#CCC' }} />}
                </button>
              ))}
            </div>
            <div className="px-4 pt-4">
              <button
                onClick={() => selected && setSubmitted(true)}
                className="w-full rounded-2xl border-0 cursor-pointer font-semibold active:scale-95"
                style={{ height: 48, background: selected ? '#FA8C16' : '#F5F5F5', color: selected ? 'white' : '#CCC', fontSize: 16, transition: 'all 0.2s' }}>
                提交举报
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center px-5 py-10 gap-3">
            <CheckCircleFilled style={{ fontSize: 52, color: '#52C41A' }} />
            <div style={{ fontSize: 18, fontWeight: 700 }}>举报已提交</div>
            <div style={{ fontSize: 14, color: '#888', textAlign: 'center' }}>我们将在 24 小时内核实处理，感谢你的反馈</div>
            <button onClick={onClose}
              className="w-full rounded-2xl border-0 cursor-pointer font-semibold active:scale-95 mt-2"
              style={{ height: 48, background: '#FA8C16', color: 'white', fontSize: 16 }}>
              知道了
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── BLOCK MODAL (仿抖音) ──────────────────────
// ─────────────────────────────────────────────
const BlockModal: React.FC<{ name: string; onClose: () => void; onConfirm: () => void }> = ({ name, onClose, onConfirm }) => {
  const [done, setDone] = useState(false);
  const handleConfirm = () => { setDone(true); setTimeout(() => { onConfirm(); onClose(); }, 1500); };
  return (
    <div className="absolute inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={onClose}>
      <div className="w-full bg-white rounded-t-3xl" style={{ paddingBottom: 24 }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-center pt-3 pb-1">
          <div style={{ width: 36, height: 4, background: '#E0E0E0', borderRadius: 2 }} />
        </div>
        {!done ? (
          <>
            <div className="flex flex-col items-center px-6 pt-4 pb-2 gap-2">
              <StopOutlined style={{ fontSize: 40, color: '#FF4D4F' }} />
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>拉黑 {name}？</div>
              <div style={{ fontSize: 14, color: '#888', textAlign: 'center' }}>拉黑后，对方将无法给你发消息、查看你的主页</div>
            </div>
            <div className="px-4 pt-3 flex flex-col gap-2">
              <button onClick={handleConfirm}
                className="w-full rounded-2xl border-0 cursor-pointer font-semibold active:scale-95"
                style={{ height: 48, background: '#FF4D4F', color: 'white', fontSize: 16 }}>
                确认拉黑
              </button>
              <button onClick={onClose}
                className="w-full rounded-2xl border-0 cursor-pointer font-medium"
                style={{ height: 44, background: '#F5F5F5', color: '#555', fontSize: 15 }}>
                取消
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center px-5 py-10 gap-3">
            <CheckCircleFilled style={{ fontSize: 52, color: '#52C41A' }} />
            <div style={{ fontSize: 18, fontWeight: 700 }}>已拉黑 {name}</div>
            <div style={{ fontSize: 14, color: '#888', textAlign: 'center' }}>对方已无法联系你或查看你的内容</div>
          </div>
        )}
      </div>
    </div>
  );
};

const ChatInputBar: React.FC<{ onSend: (text: string) => void }> = ({ onSend }) => {
  const [voiceMode, setVoiceMode] = useState(false);
  const [text, setText] = useState('');
  const [pressing, setPressing] = useState(false);
  const handleSend = () => { const t = text.trim(); if (!t) return; onSend(t); setText(''); };
  return (
    <div className="flex items-center gap-2 px-3 py-2 flex-shrink-0" style={{ background: 'white', borderTop: '1px solid #E8E8E8', paddingBottom: 16 }}>
      <button onClick={() => setVoiceMode(v => !v)} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer flex-shrink-0"
        style={{ width: 40, height: 40, color: '#666' }}>
        {voiceMode ? <span style={{ fontSize: 20, lineHeight: 1 }}>⌨</span> : <AudioOutlined style={{ fontSize: 22 }} />}
      </button>
      {voiceMode ? (
        <button onMouseDown={() => setPressing(true)} onMouseUp={() => setPressing(false)} onMouseLeave={() => setPressing(false)}
          onTouchStart={() => setPressing(true)} onTouchEnd={() => setPressing(false)}
          className="flex-1 rounded-2xl font-semibold border-0 cursor-pointer transition-all"
          style={{ height: 44, fontSize: 16, background: pressing ? '#E0E0E0' : '#F5F5F5', color: pressing ? '#1A1A1A' : '#888', transform: pressing ? 'scale(0.97)' : 'scale(1)' }}>
          {pressing ? '松开发送' : '按住 说话'}
        </button>
      ) : (
        <div className="flex-1 flex items-center rounded-2xl px-4" style={{ height: 44, background: '#F5F5F5', border: '1.5px solid #E8E8E8' }}>
          <input type="text" value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="输入消息..." className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 16, color: '#1A1A1A' }} />
        </div>
      )}
      {!voiceMode && (
        <button className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer flex-shrink-0" style={{ width: 40, height: 40, color: '#888' }}>
          <SmileOutlined style={{ fontSize: 22 }} />
        </button>
      )}
      {!voiceMode && text.trim() ? (
        <button onClick={handleSend} className="flex items-center justify-center rounded-xl text-white font-semibold border-0 cursor-pointer flex-shrink-0 active:scale-95 transition-transform"
          style={{ width: 64, height: 40, background: PRIMARY, fontSize: 15 }}>发送</button>
      ) : (
        <button className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer flex-shrink-0" style={{ width: 40, height: 40, color: '#888' }}>
          <PlusCircleOutlined style={{ fontSize: 24 }} />
        </button>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// ── MAIN APP TAB COMPONENTS ───────────────────
// ─────────────────────────────────────────────

interface ServiceTileProps { label: string; Icon: React.ComponentType<any>; color: string; bg: string; onClick?: () => void; }
const ServiceTile: React.FC<ServiceTileProps> = ({ label, Icon, color, bg, onClick }) => (
  <button onClick={onClick}
    className="flex flex-col items-center gap-1.5 py-3 rounded-2xl active:scale-95 transition-transform duration-150 cursor-pointer border-0 outline-none w-full"
    style={{ background: 'white' }}>
    <div className="flex items-center justify-center rounded-2xl" style={{ width: 52, height: 52, background: bg }}>
      <Icon style={{ fontSize: 24, color }} />
    </div>
    <span style={{ fontSize: 14, color: '#1A1A1A', fontWeight: 500 }}>{label}</span>
  </button>
);

interface ServiceImageTileProps { label: string; image: string; onClick?: () => void; }
const ServiceImageTile: React.FC<ServiceImageTileProps> = ({ label, image, onClick }) => (
  <button onClick={onClick}
    className="flex flex-col active:scale-95 transition-transform duration-150 cursor-pointer border-0 outline-none w-full overflow-hidden"
    style={{ background: 'white', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', padding: 0 }}>
    <img
      src={image}
      alt={label}
      className="w-full object-cover"
      style={{ height: 76, display: 'block' }}
    />
    <div className="flex items-center justify-center w-full" style={{ height: 36 }}>
      <span style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 500 }}>{label}</span>
    </div>
  </button>
);

const YishouTab: React.FC<{ onOpenService: (label: string) => void; onOpenHealth: (label: string) => void; onNavigate: (screen: AppScreen) => void; onOpenActivity: (activity: LocalActivity) => void }> = ({ onOpenService, onOpenHealth, onNavigate, onOpenActivity }) => (
  <div className="flex flex-col gap-4 pb-6" style={{ background: 'linear-gradient(160deg, #FFF3E8 0%, #FFF8F0 40%, #FFF0F5 70%, #F0F4FF 100%)', minHeight: '100%' }}>
    <div className="mx-4 mt-4 rounded-3xl p-5 text-white" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF9A56 100%)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>早上好，张大爷</div>
        <button
          onClick={() => onNavigate('calendar-perpetual')}
          className="flex items-center justify-center rounded-full border-0 cursor-pointer active:scale-95 transition-transform"
          style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.25)' }}
        >
          <CalendarOutlined style={{ fontSize: 18, color: 'white' }} />
        </button>
      </div>
      <div style={{ fontSize: 14, opacity: 0.9 }}>今天重庆 26°C 晴，适合出门活动</div>
    </div>

    <div className="mx-4">
      <div className="flex items-center justify-between mb-3">
        <span style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>便民服务</span>
      </div>
      <div className="rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.6)' }}>
        <div className="grid grid-cols-3 gap-3">
          {SERVICES.map((s) => (
            <ServiceImageTile key={s.label} label={s.label} image={s.image}
              onClick={() => onOpenService(s.label)} />
          ))}
        </div>
      </div>
    </div>

    <div className="mx-4">
      <div className="flex items-center justify-between mb-3">
        <span style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>心康体健</span>
      </div>
      <div className="rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.6)' }}>
        <div className="grid grid-cols-3 gap-3">
          {HEALTH_TOOLS.map((s) => (
            <ServiceImageTile key={s.label} label={s.label} image={s.image} onClick={() => onOpenHealth(s.label)} />
          ))}
        </div>
      </div>
    </div>

    <div className="mx-4">
      <div className="flex items-center justify-between mb-3">
        <span style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>近期活动</span>
      </div>
      <div className="rounded-2xl overflow-hidden cursor-pointer" style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,107,53,0.12)' }} onClick={() => onOpenActivity(LOCAL_ACTIVITIES[0])}>
        <img src="https://picsum.photos/seed/seniors_dance/390/160" alt="近期活动" className="w-full object-cover" style={{ height: 140 }} />
        <div className="p-4">
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>重庆夕阳红广场舞大赛</div>
          <div className="flex items-center gap-4" style={{ color: '#888', fontSize: 13 }}>
            <span className="flex items-center gap-1"><CalendarOutlined /> 2026年4月10日</span>
            <span className="flex items-center gap-1"><EnvironmentOutlined /> 解放碑广场</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onOpenActivity(LOCAL_ACTIVITIES[0]); }} className="mt-3 w-full rounded-xl text-white font-semibold cursor-pointer border-0" style={{ background: PRIMARY, height: 44, fontSize: 16 }}>立即报名</button>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// ── FOLLOW: POST DETAIL SCREEN ────────────────
// ─────────────────────────────────────────────
const PostDetailScreen: React.FC<{ post: FollowPost; onBack: () => void; onOpenUserProfile: (userId: number) => void; onOpenCommentDetail?: () => void; isFromFavorites?: boolean; isFromMyDynamics?: boolean; onShowFavToast?: (msg: string) => void }> = ({ post, onBack, onOpenUserProfile, onOpenCommentDetail, isFromFavorites = false, isFromMyDynamics = false, onShowFavToast }) => {
  // 通过 post.id 判断是否来自我的收藏（更可靠）
  const isFromFav = isFromFavorites || MY_FAVORITES_POSTS.some(p => p.id === post.id);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(isFromFav);
  const [showShare, setShowShare] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{ id: number; user: string } | null>(null);
  const [commentText, setCommentText] = useState('');
  const [commentReplies, setCommentReplies] = useState<{[commentId: number]: Array<{ id: number; user: string; content: string; time: string }>}>({});
  const [videoProgress, setVideoProgress] = useState(0); // 视频播放进度
  const [showPoints, setShowPoints] = useState(false); // 积分弹窗
  const inputRef = useRef<HTMLInputElement>(null);
  const pointsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 积分弹窗自动消失（约3秒后）
  const showPointsToast = (show: boolean) => {
    if (pointsTimerRef.current) clearTimeout(pointsTimerRef.current);
    setShowPoints(show);
    if (show) {
      pointsTimerRef.current = setTimeout(() => setShowPoints(false), 3000);
    }
  };

  // 视频播放进度动画（仅视频帖）
  useEffect(() => {
    if (post.type !== 'video') return;
    const timer = setInterval(() => {
      setVideoProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => showPointsToast(true), 100);
          return 100;
        }
        return p + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [post.id]);

  const likeCount = post.likes + (liked ? 1 : 0);
  const savedCount = post.saves ?? 0;
  const shareCount = post.shares ?? 0;
  const commentCount = post.comments ?? 0;

  const handleReplyClick = (comment: PostComment) => {
    setReplyingTo({ id: comment.id, user: comment.user });
    setCommentText('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setCommentText('');
  };

  const handleSend = () => {
    const text = commentText.trim();
    if (!text) return;
    if (replyingTo) {
      setCommentReplies(prev => ({
        ...prev,
        [replyingTo.id]: [...(prev[replyingTo.id] || []), {
          id: Date.now(),
          user: '张大爷',
          content: text,
          time: '一分钟前',
        }],
      }));
    }
    setCommentText('');
    setReplyingTo(null);
  };

  return (
    <div className="flex flex-col relative" style={{ background: 'white', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 200 }}>
      {/* 积分弹窗（覆盖全屏） */}
      {showPoints && (
        <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="flex flex-col items-center gap-3 rounded-3xl p-6"
            style={{ background: 'white', width: 220, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div className="flex items-center justify-center rounded-full"
              style={{ width: 60, height: 60, background: 'linear-gradient(135deg, #FF6B35 0%, #FF4D4F 100%)' }}>
              <StarFilled style={{ fontSize: 28, color: 'white' }} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#FF6B35' }}>+10</div>
            <div style={{ fontSize: 15, color: '#333', fontWeight: 600 }}>看视频得积分</div>
            <div style={{ fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 1.5 }}>
              恭喜获得10积分<br />已存入您的账户
            </div>
            <button onClick={() => showPointsToast(false)} className="border-0 cursor-pointer mt-2"
              style={{ height: 42, borderRadius: 21, background: 'linear-gradient(90deg, #FF6B35 0%, #FF4D4F 100%)', fontSize: 16, fontWeight: 700, color: 'white', width: 160, boxShadow: '0 4px 16px rgba(255,107,53,0.4)' }}>
              继续观看
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 px-4 flex-shrink-0" style={{ height: 54, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div className="flex-1" />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto min-h-0" style={{ background: 'white' }}>
        <div style={{ height: 280, position: 'relative' }}>
          <img src={`https://picsum.photos/seed/${post.coverSeed}/390/300`} alt="" className="w-full h-full object-cover" />
          {post.type === 'video' && (
            <>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex items-center justify-center rounded-full"
                  style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)' }}>
                  <PlayCircleFilled style={{ fontSize: 48, color: 'white' }} />
                </div>
              </div>
              {/* 视频进度条 */}
              <div className="absolute left-0 right-0 bottom-0 px-4 pb-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)' }}>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.35)', borderRadius: 2 }}>
                  <div style={{
                    height: '100%',
                    width: `${videoProgress}%`,
                    background: '#FF6B35',
                    borderRadius: 2,
                    transition: 'width 0.18s linear',
                  }} />
                </div>
                <div className="flex justify-between mt-1.5" style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>
                  <span>{Math.floor(videoProgress * 0.2)}:{String(Math.floor((videoProgress * 0.2 * 60) % 60)).padStart(2, '0')}</span>
                  <span>0:20</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid #F5F5F5' }}>
          <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 cursor-pointer"
            onClick={() => onOpenUserProfile(post.userId)}
            style={{ width: 44, height: 44, background: post.avatarColor, fontSize: 16 }}>{post.avatar}</div>
          <div className="flex-1 cursor-pointer" onClick={() => onOpenUserProfile(post.userId)}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{post.user}</div>
            <div style={{ fontSize: 12, color: '#AAA', marginTop: 1 }}>一分钟前 · 重庆渝中区</div>
          </div>
          <button className="rounded-2xl text-white font-medium border-0 cursor-pointer px-4"
            style={{ height: 34, background: PRIMARY, fontSize: 13 }}>已关注</button>
        </div>
        <div className="px-4 py-3">
          <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.6, marginBottom: 8 }}>{post.title}</div>
          <div style={{ fontSize: 15, color: '#333', lineHeight: 1.9 }}>
            分享生活中的美好瞬间，每一天都值得被记录。希望大家看到这些能感受到快乐和温暖，生活虽然平淡，但因为有彼此的分享而更加丰富多彩。
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {['老年生活', '重庆', '快乐晚年'].map(tag => (
              <span key={tag} style={{ fontSize: 13, color: PRIMARY }}>#{tag}</span>
            ))}
          </div>
        </div>
        <div style={{ background: '#F8F8F8', borderTop: '8px solid #F0F0F0' }}>
          <div className="px-4 py-3" style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>
            评论 {FOLLOW_COMMENTS.length}
          </div>
          {FOLLOW_COMMENTS.map((c) => (
            <div key={c.id}>
              <div className="flex gap-3 px-4 py-3" style={{ borderTop: '1px solid #F0F0F0' }}>
                <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
                  style={{ width: 38, height: 38, background: c.color, fontSize: 14 }}>{c.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{c.user}</span>
                    <span style={{ fontSize: 12, color: '#BBB' }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 14, color: '#333', lineHeight: 1.7 }}>{c.content}</div>
                  <div className="flex items-center gap-4 mt-1.5">
                    <button className="flex items-center gap-1 border-0 bg-transparent cursor-pointer p-0"
                      style={{ fontSize: 12, color: '#999' }}>
                      <LikeOutlined style={{ fontSize: 13 }} />{c.likes}
                    </button>
                    <button onClick={() => handleReplyClick(c)}
                      className="border-0 bg-transparent cursor-pointer p-0"
                      style={{ fontSize: 12, color: '#999' }}>
                      回复
                    </button>
                  </div>
                </div>
              </div>
              {(commentReplies[c.id] || []).map(reply => (
                <div key={reply.id} className="flex gap-2.5 py-2.5"
                  style={{ background: '#F2F2F2', borderTop: '1px solid #EBEBEB', paddingLeft: 64, paddingRight: 16 }}>
                  <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
                    style={{ width: 28, height: 28, background: PRIMARY, fontSize: 11 }}>张</div>
                  <div className="flex-1">
                    <div style={{ fontSize: 13, color: '#333', lineHeight: 1.6 }}>
                      <span style={{ fontWeight: 600, color: '#1A1A1A' }}>张大爷 </span>
                      <span style={{ color: PRIMARY }}>@{c.user} </span>
                      {reply.content}
                    </div>
                    <div style={{ fontSize: 11, color: '#BBB', marginTop: 2 }}>{reply.time}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="py-6 text-center" style={{ fontSize: 13, color: '#CCC' }}>暂无更多评论</div>
        </div>
      </div>
      {replyingTo && (
        <div className="flex items-center justify-between px-4 py-2 flex-shrink-0"
          style={{ background: '#F5F5F5', borderTop: '1px solid #EBEBEB' }}>
          <span style={{ fontSize: 13, color: '#666' }}>
            回复 <span style={{ color: PRIMARY, fontWeight: 500 }}>@{replyingTo.user}</span>
          </span>
          <button onClick={cancelReply} className="border-0 bg-transparent cursor-pointer"
            style={{ fontSize: 20, color: '#999', lineHeight: 1, padding: '0 4px' }}>×</button>
        </div>
      )}
      <div className="flex items-center px-4 gap-2 flex-shrink-0" style={{ background: 'white', height: 60, borderTop: '1px solid #F0F0F0', zIndex: 300 }}>
        <div className="flex-1 flex items-center rounded-2xl px-4" style={{ background: '#F5F5F5', height: 40 }}>
          <input
            ref={inputRef}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={replyingTo ? `回复 @${replyingTo.user}...` : '说点什么...'}
            className="flex-1 border-0 outline-none bg-transparent"
            style={{ fontSize: 15, color: '#1A1A1A' }}
          />
        </div>
        {commentText.trim() ? (
          <button onClick={handleSend}
            className="rounded-xl text-white font-semibold border-0 cursor-pointer flex-shrink-0 active:scale-95 transition-transform"
            style={{ height: 40, padding: '0 16px', background: PRIMARY, fontSize: 14 }}>发送</button>
        ) : (
          <>
            <button onClick={() => setLiked(l => !l)}
              className="flex flex-col items-center border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"
              style={{ color: liked ? '#FF4D4F' : '#888', minWidth: 40 }}>
              {liked ? <HeartFilled style={{ fontSize: 22 }} /> : <HeartOutlined style={{ fontSize: 22 }} />}
              <span style={{ fontSize: 11, marginTop: 1 }}>{likeCount}</span>
            </button>
            <button onClick={() => { const wasSaved = saved; setSaved(!wasSaved); if (wasSaved && onShowFavToast) onShowFavToast('已取消收藏'); }}
              className="flex flex-col items-center border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"
              style={{ color: saved ? '#FAAD14' : '#888', minWidth: 40 }}>
              {saved ? <StarFilled style={{ fontSize: 22 }} /> : <StarOutlined style={{ fontSize: 22 }} />}
              <span style={{ fontSize: 11, marginTop: 1 }}>{savedCount}</span>
            </button>
            <button onClick={() => setShowShare(true)}
              className="flex flex-col items-center border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"
              style={{ color: '#888', minWidth: 40 }}>
              <ShareAltOutlined style={{ fontSize: 22 }} />
              <span style={{ fontSize: 11, marginTop: 1 }}>{shareCount}</span>
            </button>
          </>
        )}
      </div>
      {showShare && <ShareSheet onClose={() => setShowShare(false)} />}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="flex flex-col rounded-3xl p-6 mx-4"
            style={{ background: 'white', width: '100%', maxWidth: 320, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 12, textAlign: 'center' }}>
              确认删除
            </div>
            <div style={{ fontSize: 15, color: '#666', lineHeight: 1.6, marginBottom: 24, textAlign: 'center' }}>
              删除后将无法恢复，确定要删除这条动态吗？
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 border-0 cursor-pointer rounded-xl"
                style={{ height: 44, background: '#F5F5F5', fontSize: 16, fontWeight: 600, color: '#666' }}>
                取消
              </button>
              <button onClick={() => { setShowDeleteConfirm(false); onBack(); }}
                className="flex-1 border-0 cursor-pointer rounded-xl"
                style={{ height: 44, background: '#FF4D4F', fontSize: 16, fontWeight: 600, color: 'white' }}>
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// ── COMMENT DETAIL SCREEN ───────────────────
// ─────────────────────────────────────────────
const CommentDetailScreen: React.FC<{
  post: FollowPost;
  onBack: () => void;
  onOpenUserProfile: (userId: number) => void;
}> = ({ post, onBack, onOpenUserProfile }) => {
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<{ id: number; user: string } | null>(null);
  const [commentText, setCommentText] = useState('');
  const [replies, setReplies] = useState<{[commentId: number]: Array<{ id: number; user: string; avatar: string; color: string; content: string; time: string }>}>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const comments = FOLLOW_COMMENTS;
  const allReplies = VIDEO_COMMENTS;

  const handleReplyClick = (comment: PostComment) => {
    setReplyingTo({ id: comment.id, user: comment.user });
    setCommentText('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setCommentText('');
  };

  const handleSend = () => {
    const text = commentText.trim();
    if (!text) return;
    const newReply = {
      id: Date.now(),
      user: '张大爷',
      avatar: '张',
      color: '#FF6B35',
      content: text,
      time: '一分钟前',
    };
    if (replyingTo) {
      setReplies(prev => ({
        ...prev,
        [replyingTo.id]: [...(prev[replyingTo.id] || []), newReply],
      }));
    }
    setCommentText('');
    setReplyingTo(null);
  };

  const toggleLike = (id: number) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <>
      {/* Top nav */}
      <div className="flex items-center gap-3 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div className="flex-1 text-center" style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A' }}>
          评论 {comments.length}
        </div>
        <button className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ShareAltOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ background: '#F5F5F5' }}>

        {/* Original post preview */}
        <div style={{ background: 'white', marginBottom: 8 }}>
          {/* 图片或视频预览 */}
          <div style={{ height: 280, position: 'relative' }}>
            <img src={`https://picsum.photos/seed/${post.coverSeed}/390/300`} alt="" className="w-full h-full object-cover" />
            {/* 仅视频类型显示播放按钮 */}
            {post.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex items-center justify-center rounded-full"
                  style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)' }}>
                  <PlayCircleFilled style={{ fontSize: 48, color: 'white' }} />
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 cursor-pointer"
              onClick={() => onOpenUserProfile(post.userId)}
              style={{ width: 44, height: 44, background: post.avatarColor, fontSize: 16 }}>
              {post.avatar}
            </div>
            <div className="flex-1 cursor-pointer" onClick={() => onOpenUserProfile(post.userId)}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{post.user}</div>
              <div style={{ fontSize: 12, color: '#AAA', marginTop: 1 }}>一分钟前 · 重庆渝中区</div>
            </div>
          </div>
          <div className="px-4 pb-3">
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.6, marginBottom: 6 }}>
              {post.title}
            </div>
            <div style={{ fontSize: 15, color: '#444', lineHeight: 1.8 }}>
              {post.content || '分享生活中的美好瞬间，每一天都值得被记录。希望大家看到这些能感受到快乐和温暖。'}
            </div>
          </div>
          <div style={{ height: 8, background: '#F5F5F5' }} />
        </div>

        {/* Comment list */}
        <div style={{ background: 'white' }}>
          <div className="px-4 py-3" style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>
            最新评论
          </div>

          {comments.map((c) => (
            <div key={c.id}>
              {/* Main comment */}
              <div className="flex gap-3 px-4 py-3" style={{ borderTop: '1px solid #F0F0F0' }}>
                <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 cursor-pointer"
                  onClick={() => onOpenUserProfile(c.id + 10)}
                  style={{ width: 38, height: 38, background: c.color, fontSize: 14 }}>
                  {c.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="cursor-pointer" style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}
                      onClick={() => onOpenUserProfile(c.id + 10)}>{c.user}</span>
                    <span style={{ fontSize: 12, color: '#BBB' }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 14, color: '#333', lineHeight: 1.7 }}>{c.content}</div>
                  <div className="flex items-center gap-5 mt-1.5">
                    <button
                      onClick={() => toggleLike(c.id)}
                      className="flex items-center gap-1 border-0 bg-transparent cursor-pointer p-0"
                      style={{ fontSize: 12, color: likedIds.has(c.id) ? '#FF4D4F' : '#999' }}>
                      {likedIds.has(c.id)
                        ? <HeartFilled style={{ fontSize: 13 }} />
                        : <LikeOutlined style={{ fontSize: 13 }} />}
                      {c.likes + (likedIds.has(c.id) ? 1 : 0)}
                    </button>
                    <button onClick={() => handleReplyClick(c)}
                      className="border-0 bg-transparent cursor-pointer p-0"
                      style={{ fontSize: 12, color: '#999' }}>
                      回复
                    </button>
                  </div>

                  {/* Replies from VIDEO_COMMENTS */}
                  {(allReplies[c.id - 1]?.replies || []).map(reply => (
                    <div key={reply.id} className="flex gap-2 py-2"
                      style={{ background: '#F8F8F8', borderRadius: 8, marginTop: 6, padding: '8px 10px' }}>
                      <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 cursor-pointer"
                        onClick={() => onOpenUserProfile(reply.id + 20)}
                        style={{ width: 26, height: 26, background: reply.color, fontSize: 11 }}>
                        {reply.avatar}
                      </div>
                      <div className="flex-1">
                        <div style={{ fontSize: 13, color: '#333', lineHeight: 1.6 }}>
                          <span className="cursor-pointer" style={{ fontWeight: 600, color: '#1A1A1A' }}
                            onClick={() => onOpenUserProfile(reply.id + 20)}>{reply.user} </span>
                          <span style={{ color: '#999' }}>回复 </span>
                          <span style={{ color: PRIMARY }}>@{c.user} </span>
                          {reply.content}
                        </div>
                        <div style={{ fontSize: 11, color: '#BBB', marginTop: 2 }}>{reply.time}</div>
                      </div>
                    </div>
                  ))}

                  {/* User-added replies */}
                  {(replies[c.id] || []).map(reply => (
                    <div key={reply.id} className="flex gap-2 py-2"
                      style={{ background: '#FFF7F0', borderRadius: 8, marginTop: 6, padding: '8px 10px' }}>
                      <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 cursor-pointer"
                        onClick={() => onOpenUserProfile(100)}
                        style={{ width: 26, height: 26, background: reply.color, fontSize: 11 }}>
                        {reply.avatar}
                      </div>
                      <div className="flex-1">
                        <div style={{ fontSize: 13, color: '#333', lineHeight: 1.6 }}>
                          <span className="cursor-pointer" style={{ fontWeight: 600, color: '#1A1A1A' }}
                            onClick={() => onOpenUserProfile(100)}>{reply.user} </span>
                          <span style={{ color: '#999' }}>回复 </span>
                          <span style={{ color: PRIMARY }}>@{c.user} </span>
                          {reply.content}
                        </div>
                        <div style={{ fontSize: 11, color: '#BBB', marginTop: 2 }}>{reply.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="py-5 text-center" style={{ fontSize: 13, color: '#CCC' }}>暂无更多评论</div>
        </div>
      </div>

      {/* Reply bar */}
      {replyingTo && (
        <div className="flex items-center justify-between px-4 py-2 flex-shrink-0"
          style={{ background: '#F5F5F5', borderTop: '1px solid #EBEBEB' }}>
          <span style={{ fontSize: 13, color: '#666' }}>
            回复 <span style={{ color: PRIMARY, fontWeight: 500 }}>@{replyingTo.user}</span>
          </span>
          <button onClick={cancelReply} className="border-0 bg-transparent cursor-pointer"
            style={{ fontSize: 20, color: '#999', lineHeight: 1, padding: '0 4px' }}>×</button>
        </div>
      )}

      {/* Input bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 flex-shrink-0"
        style={{ background: 'white', borderTop: '1px solid #F0F0F0' }}>
        <input
          ref={inputRef}
          type="text"
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          placeholder={replyingTo ? `回复 @${replyingTo.user}...` : '说点什么...'}
          className="flex-1 border-0 outline-none bg-transparent"
          style={{ fontSize: 15, color: '#1A1A1A' }}
        />
        {commentText.trim() ? (
          <button onClick={handleSend}
            className="rounded-xl text-white font-semibold border-0 cursor-pointer flex-shrink-0 active:scale-95 transition-transform"
            style={{ height: 38, padding: '0 16px', background: PRIMARY, fontSize: 14 }}>发送</button>
        ) : (
          <button className="border-0 bg-transparent cursor-pointer flex-shrink-0"
            style={{ color: '#CCC', fontSize: 20 }}>
            <SendOutlined />
          </button>
        )}
      </div>
    </>
  );
};

// ─────────────────────────────────────────────
// ── VIDEO COMMENT SHEET ───────────────────────
// ─────────────────────────────────────────────
const VideoCommentSheet: React.FC<{ onClose: () => void; onOpenComment?: () => void; videoProgress?: number; variant?: 'sheet' | 'inline'; post?: { saves?: number; shares?: number } }> = ({ onClose, onOpenComment, videoProgress = 0, variant = 'sheet', post }) => {
  const [comments, setComments] = useState<VideoComment[]>(VIDEO_COMMENTS);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{ id: number; user: string } | null>(null);
  const [inputText, setInputText] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const totalCount = comments.reduce((sum, c) => sum + 1 + (c.replies?.length ?? 0), 0);
  const isInline = variant === 'inline';
  const likeCount = VIDEO_COMMENTS.reduce((s, c) => s + c.likes, 0) + (liked ? 1 : 0);

  const handleLike = (id: number) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    setComments(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + (likedIds.has(id) ? -1 : 1) } : c));
  };

  const handleReply = (id: number, user: string) => {
    setReplyingTo({ id, user });
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    if (replyingTo) {
      setComments(prev => prev.map(c => c.id === replyingTo.id
        ? { ...c, replies: [...(c.replies ?? []), { id: Date.now(), user: '张大爷', avatar: '张', color: '#FF6B35', content: text, time: '一分钟前' }] }
        : c
      ));
      setExpandedReplies(prev => new Set(prev).add(replyingTo.id));
    } else {
      setComments(prev => [...prev, { id: Date.now(), user: '张大爷', avatar: '张', color: '#FF6B35', content: text, likes: 0, time: '一分钟前', replies: [] }]);
    }
    setInputText('');
    setReplyingTo(null);
  };

  const toggleReplies = (id: number) => {
    setExpandedReplies(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <>
      {/* 遮罩（仅 sheet 模式显示） */}
      {!isInline && <div className="absolute inset-0 z-30" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={onClose} />}
      {/* 面板 */}
      <div className={isInline ? 'flex flex-col h-full' : 'absolute left-0 right-0 bottom-0 z-40 flex flex-col rounded-t-3xl overflow-hidden'}
        style={{ background: isInline ? 'transparent' : 'white', maxHeight: isInline ? 'none' : '75%' }}>
        {/* 顶部把手 + 标题（仅 sheet 模式显示） */}
        {!isInline && (
          <div className="flex-shrink-0 flex flex-col items-center pt-3 pb-2" style={{ borderBottom: '1px solid #F0F0F0' }}>
            <div style={{ width: 36, height: 4, background: '#E0E0E0', borderRadius: 2, marginBottom: 10 }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>评论 {totalCount}</div>
            {onOpenComment && (
              <button onClick={() => { onClose(); onOpenComment(); }}
                className="mt-1 border-0 bg-transparent cursor-pointer"
                style={{ fontSize: 13, color: PRIMARY }}>查看全部 &rsaquo;</button>
            )}
          </div>
        )}

        {/* 评论列表（inline 模式不需要进度条，外层视频区已有） */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {comments.map((c) => {
            const isLiked = likedIds.has(c.id);
            const showReplies = expandedReplies.has(c.id);
            return (
              <div key={c.id} className="py-3" style={{ borderBottom: isInline ? '1px solid rgba(255,255,255,0.08)' : '1px solid #F7F7F7' }}>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
                    style={{ width: 38, height: 38, background: c.color, fontSize: 14 }}>{c.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ fontSize: 14, fontWeight: 600, color: isInline ? 'white' : '#1A1A1A' }}>{c.user}</span>
                      <span style={{ fontSize: 12, color: isInline ? 'rgba(255,255,255,0.5)' : '#BBB' }}>{c.time}</span>
                    </div>
                    <div style={{ fontSize: 14, color: isInline ? 'rgba(255,255,255,0.8)' : '#333', lineHeight: 1.7 }}>{c.content}</div>
                    <div className="flex items-center gap-4 mt-2">
                      <button onClick={() => handleReply(c.id, c.user)}
                        className="border-0 bg-transparent cursor-pointer p-0"
                        style={{ fontSize: 12, color: isInline ? 'rgba(255,255,255,0.5)' : '#999' }}>回复</button>
                      <button onClick={() => handleLike(c.id)}
                        className="flex items-center gap-1 border-0 bg-transparent cursor-pointer p-0"
                        style={{ fontSize: 12, color: isLiked ? '#FF4D4F' : (isInline ? 'rgba(255,255,255,0.5)' : '#999') }}>
                        {isLiked ? <HeartFilled style={{ fontSize: 13 }} /> : <HeartOutlined style={{ fontSize: 13 }} />}
                        {c.likes > 0 && c.likes}
                      </button>
                    </div>
                    {/* 展开/收起回复 */}
                    {(c.replies?.length ?? 0) > 0 && (
                      <button onClick={() => toggleReplies(c.id)}
                        className="border-0 bg-transparent cursor-pointer p-0 mt-2"
                        style={{ fontSize: 13, color: PRIMARY }}>
                        {showReplies ? '收起回复' : `查看${c.replies!.length}条回复`}
                      </button>
                    )}
                    {/* 回复列表 */}
                    {showReplies && (
                      <div className="mt-2 pl-3" style={{ borderLeft: `2px solid ${isInline ? 'rgba(255,255,255,0.15)' : '#F0F0F0'}` }}>
                        {c.replies!.map(r => (
                          <div key={r.id} className="flex gap-2 py-2">
                            <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
                              style={{ width: 28, height: 28, background: r.color, fontSize: 11 }}>{r.avatar}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span style={{ fontSize: 13, fontWeight: 600, color: isInline ? 'white' : '#1A1A1A' }}>{r.user}</span>
                                <span style={{ fontSize: 11, color: isInline ? 'rgba(255,255,255,0.5)' : '#BBB' }}>{r.time}</span>
                              </div>
                              <div style={{ fontSize: 13, color: isInline ? 'rgba(255,255,255,0.7)' : '#555', lineHeight: 1.6 }}>{r.content}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ height: 16 }} />
        </div>

        {/* 输入栏（与熟人页面一致：空输入时显示点赞/收藏/分享按钮） */}
        <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', background: isInline ? 'rgba(0,0,0,0.3)' : 'white' }}>
          <div className="flex-1 flex items-center rounded-2xl px-4" style={{ background: isInline ? 'rgba(255,255,255,0.15)' : '#F5F5F5', height: 40 }}>
            <input
              ref={inputRef}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder={replyingTo ? `回复 @${replyingTo.user}...` : '说点什么...'}
              style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 14, color: isInline ? 'white' : '#1A1A1A' }}
            />
            {replyingTo && (
              <button onClick={() => setReplyingTo(null)}
                className="border-0 bg-transparent cursor-pointer p-0 flex-shrink-0"
                style={{ fontSize: 18, color: isInline ? 'rgba(255,255,255,0.5)' : '#BBB', lineHeight: 1 }}>×</button>
            )}
          </div>
          {replyingTo || inputText.trim() ? (
            <button onClick={handleSend}
              className="flex-shrink-0 flex items-center justify-center rounded-full border-0 cursor-pointer text-white font-bold"
              style={{ width: 40, height: 40, background: PRIMARY, fontSize: 20 }}>↑</button>
          ) : (
            <div className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => setLiked(l => !l)}
                className="flex flex-col items-center border-0 bg-transparent cursor-pointer p-1"
                style={{ color: liked ? '#FF4D4F' : (isInline ? 'rgba(255,255,255,0.6)' : '#888'), minWidth: 36 }}>
                {liked ? <HeartFilled style={{ fontSize: 20 }} /> : <HeartOutlined style={{ fontSize: 20 }} />}
                <span style={{ fontSize: 10, marginTop: 1 }}>{likeCount}</span>
              </button>
              <button onClick={() => setSaved(s => !s)}
                className="flex flex-col items-center border-0 bg-transparent cursor-pointer p-1"
                style={{ color: saved ? '#FAAD14' : (isInline ? 'rgba(255,255,255,0.6)' : '#888'), minWidth: 36 }}>
                {saved ? <StarFilled style={{ fontSize: 20 }} /> : <StarOutlined style={{ fontSize: 20 }} />}
                <span style={{ fontSize: 10, marginTop: 1 }}>{post.saves !== undefined ? (saved ? post.saves + 1 : post.saves) : 0}</span>
              </button>
              <button onClick={() => setShowShare(true)}
                className="flex flex-col items-center border-0 bg-transparent cursor-pointer p-1"
                style={{ color: isInline ? 'rgba(255,255,255,0.6)' : '#888', minWidth: 36 }}>
                <ShareAltOutlined style={{ fontSize: 20 }} />
                <span style={{ fontSize: 10, marginTop: 1 }}>{post.shares !== undefined ? post.shares : 0}</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {showShare && <ShareSheet onClose={() => setShowShare(false)} />}
    </>
  );
};

// ─────────────────────────────────────────────
// ── CREATE POST SELECT SCREEN ─────────────────
// ─────────────────────────────────────────────
const CreatePostSelectScreen: React.FC<{
  onBack: () => void;
  onSelectImage: () => void;
  onSelectVideo: () => void;
}> = ({ onBack, onSelectImage, onSelectVideo }) => (
  <div className="flex flex-col flex-1" style={{ background: 'linear-gradient(180deg, #FFF7ED 0%, #FFF1F5 50%, #F0F4FF 100%)', position: 'relative', overflow: 'hidden' }}>
    {/* 背景装饰圆 */}
    <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,107,53,0.08)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', top: 80, left: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,180,0,0.07)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', bottom: 120, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(22,119,255,0.06)', pointerEvents: 'none' }} />

    {/* Header */}
    <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ background: 'transparent' }}>
      <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
        <ArrowLeftOutlined style={{ fontSize: 22, color: '#1A1A1A' }} />
      </button>
    </div>

    {/* 顶部宣传区 */}
    <div className="flex flex-col items-center px-6 pt-2 pb-6" style={{ flex: 1, justifyContent: 'flex-start' }}>
      {/* 主标语 */}
      <div style={{ fontSize: 28, fontWeight: 800, color: '#1A1A1A', textAlign: 'center', lineHeight: 1.35, marginBottom: 10 }}>
        记录美好生活<br />
        <span style={{ color: '#FF6B35' }}>分享给家人朋友</span>
      </div>
      <div style={{ fontSize: 15, color: '#888', textAlign: 'center', lineHeight: 1.7, marginBottom: 6 }}>
        每一张照片、每一段视频<br />都是珍贵的回忆
      </div>
      {/* 小装饰标签 */}
      <div className="flex gap-2 mt-2 mb-2">
        {['📸 记录日常', '🌸 分享心情', '🎬 留住精彩'].map(tag => (
          <span key={tag} style={{ fontSize: 12, color: '#FF6B35', background: 'rgba(255,107,53,0.1)', borderRadius: 20, padding: '3px 10px', fontWeight: 600 }}>{tag}</span>
        ))}
      </div>
    </div>

    {/* 横排卡片区 */}
    <div className="flex gap-4 px-5 pb-10" style={{ flexShrink: 0 }}>
      {/* 发视频卡片 */}
      <button onClick={onSelectVideo}
        className="flex flex-col items-center border-0 cursor-pointer"
        style={{ flex: 1, borderRadius: 24, padding: '28px 12px 22px', background: 'linear-gradient(160deg, #1677FF 0%, #5BA4FF 100%)', boxShadow: '0 8px 28px rgba(22,119,255,0.35)', position: 'relative', overflow: 'hidden' }}>
        {/* 卡片内装饰 */}
        <div style={{ position: 'absolute', top: -18, right: -18, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
        <div style={{ position: 'absolute', bottom: -10, left: -10, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        {/* 图标圆 */}
        <div className="flex items-center justify-center" style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', marginBottom: 14 }}>
          <VideoCameraOutlined style={{ fontSize: 34, color: 'white' }} />
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 6 }}>发视频</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 1.6 }}>
          录制视频<br />留住精彩
        </div>
        <div style={{ marginTop: 14, background: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: '5px 18px', fontSize: 13, color: 'white', fontWeight: 700 }}>
          立即发布 →
        </div>
      </button>

      {/* 发图文卡片 */}
      <button onClick={onSelectImage}
        className="flex flex-col items-center border-0 cursor-pointer"
        style={{ flex: 1, borderRadius: 24, padding: '28px 12px 22px', background: 'linear-gradient(160deg, #FF6B35 0%, #FFAA5A 100%)', boxShadow: '0 8px 28px rgba(255,107,53,0.35)', position: 'relative', overflow: 'hidden' }}>
        {/* 卡片内装饰 */}
        <div style={{ position: 'absolute', top: -18, right: -18, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
        <div style={{ position: 'absolute', bottom: -10, left: -10, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        {/* 图标圆 */}
        <div className="flex items-center justify-center" style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', marginBottom: 14 }}>
          <PictureOutlined style={{ fontSize: 34, color: 'white' }} />
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 6 }}>发图文</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 1.6 }}>
          上传照片<br />配上文字
        </div>
        <div style={{ marginTop: 14, background: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: '5px 18px', fontSize: 13, color: 'white', fontWeight: 700 }}>
          立即发布 →
        </div>
      </button>
    </div>

    {/* 底部提示 */}
    <div className="flex items-center justify-center pb-6" style={{ flexShrink: 0 }}>
      <span style={{ fontSize: 13, color: '#BBB' }}>选择一种方式，开始分享吧 🌟</span>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// ── CREATE IMAGE POST SCREEN ──────────────────
// ─────────────────────────────────────────────
const CreateImagePostScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  return (
    <div className="flex flex-col flex-1" style={{ background: 'linear-gradient(180deg, #FFF7ED 0%, #FFF1F5 50%, #F0F4FF 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* 背景装饰圆 */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,107,53,0.07)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 100, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,180,0,0.06)', pointerEvents: 'none' }} />
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ background: 'transparent' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 22, color: '#1A1A1A' }} />
        </button>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', flex: 1 }}>发图文</div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Upload area */}
        <div className="mb-3">
          <div className="flex items-center justify-center rounded-2xl cursor-pointer"
            style={{ width: '100%', height: 160, background: 'rgba(255,255,255,0.85)', border: '2px dashed #FFBB96', flexDirection: 'column', gap: 8 }}>
            <PlusOutlined style={{ fontSize: 36, color: '#FF6B35' }} />
            <span style={{ fontSize: 15, color: '#FF9A6C', fontWeight: 600 }}>上传图片 / 视频</span>
          </div>
        </div>
        {/* Title */}
        <div className="mb-3">
          <div className="rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.85)' }}>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="添加标题..."
              className="w-full border-0 outline-none bg-transparent"
              style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A' }}
            />
          </div>
        </div>
        {/* Content */}
        <div>
          <div className="rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.85)', minHeight: 140 }}>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="添加正文，分享你的生活故事..."
              className="w-full border-0 outline-none bg-transparent resize-none"
              style={{ fontSize: 16, color: '#333', lineHeight: 1.8, minHeight: 120 }}
            />
          </div>
        </div>
      </div>
      {/* 底部大发布按钮 */}
      <div className="px-5 pb-8 pt-3 flex-shrink-0">
        <button className="w-full border-0 cursor-pointer"
          style={{ height: 56, borderRadius: 28, background: 'linear-gradient(90deg, #FF6B35 0%, #FFAA5A 100%)', boxShadow: '0 6px 20px rgba(255,107,53,0.4)', fontSize: 18, fontWeight: 800, color: 'white', letterSpacing: 4 }}>
          发 布
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── CREATE VIDEO POST SCREEN ──────────────────
// ─────────────────────────────────────────────
const CreateVideoPostScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  return (
    <div className="flex flex-col flex-1" style={{ background: 'linear-gradient(180deg, #FFF7ED 0%, #FFF1F5 50%, #F0F4FF 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: 60, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(22,119,255,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 140, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(91,164,255,0.1)', pointerEvents: 'none' }} />
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ background: 'transparent' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', flex: 1 }}>发视频</div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Upload area */}
        <div className="p-4">
          <div className="flex items-center justify-center rounded-2xl cursor-pointer"
            style={{ width: '100%', height: 160, background: 'rgba(22,119,255,0.06)', border: '2px dashed rgba(22,119,255,0.3)', flexDirection: 'column', gap: 8 }}>
            <VideoCameraOutlined style={{ fontSize: 36, color: '#1677FF' }} />
            <span style={{ fontSize: 15, color: '#1677FF', fontWeight: 600 }}>上传视频</span>
            <span style={{ fontSize: 13, color: '#888' }}>支持常见视频格式</span>
          </div>
        </div>
        {/* Title */}
        <div className="px-4 pb-3">
          <div className="rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.85)' }}>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="添加标题..."
              className="w-full border-0 outline-none bg-transparent"
              style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}
            />
          </div>
        </div>
        {/* Content */}
        <div className="px-4 pb-4">
          <div className="rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.85)', minHeight: 140 }}>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="添加正文，描述你的视频内容..."
              className="w-full border-0 outline-none bg-transparent resize-none"
              style={{ fontSize: 15, color: '#333', lineHeight: 1.7, minHeight: 120 }}
            />
          </div>
        </div>
      </div>
      {/* Bottom publish button */}
      <div className="px-5 pb-8 pt-3 flex-shrink-0">
        <button className="w-full border-0 cursor-pointer"
          style={{ height: 56, borderRadius: 28, background: 'linear-gradient(90deg, #1677FF 0%, #5BA4FF 100%)', boxShadow: '0 6px 20px rgba(22,119,255,0.4)', fontSize: 18, fontWeight: 800, color: 'white', letterSpacing: 4 }}>
          发 布
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── FOLLOW: VIDEO FEED SCREEN ─────────────────
// ─────────────────────────────────────────────
const VideoFeedScreen: React.FC<{ startId: number; videoPool?: FollowPost[]; onBack: () => void; onOpenPost?: (post: FollowPost, isFromFavorites?: boolean, isFromMyDynamics?: boolean) => void; onOpenComment: (post: FollowPost) => void; isFromFavorites?: boolean; isFromMyDynamics?: boolean; isFromLikes?: boolean; enableDelete?: boolean; onShowFavToast?: (msg: string) => void }> = ({ startId, videoPool = VIDEO_POSTS, onBack, onOpenPost, onOpenComment, isFromFavorites = false, isFromMyDynamics = false, isFromLikes = false, enableDelete = false, onShowFavToast }) => {
  const [index, setIndex] = useState(() => {
    const i = videoPool.findIndex(p => p.id === startId);
    return i >= 0 ? i : 0;
  });
  const [liked, setLiked] = useState<{[id: number]: boolean}>({});
  // 我的收藏中的视频，初始状态为已收藏（star亮起）
  const initialSaved: {[id: number]: boolean} = {};
  if (isFromFavorites && videoPool) {
    videoPool.forEach(p => { initialSaved[p.id] = true; });
  }
  const [saved, setSaved] = useState<{[id: number]: boolean}>(initialSaved);
  const [fade, setFade] = useState(true);
  const [showShare, setShowShare] = useState(false);
  const [showPostMenu, setShowPostMenu] = useState(false); // 作品Tab操作菜单
  const [videoProgress, setVideoProgress] = useState(0); // 视频播放进度
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // 删除确认弹窗
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState(''); // 收藏提示
  const [imageIdx, setImageIdx] = useState<{[postId: number]: number}>({}); // 图文帖子的当前图片索引
  const prevIndexRef = useRef(index);
  const wheelLock = useRef(false);

  // 收藏提示toast自动消失
  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => setToastVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  // 视频切换时重置进度
  useEffect(() => {
    if (index !== prevIndexRef.current) {
      prevIndexRef.current = index;
    }
    setVideoProgress(0);
  }, [index]);

  const switchVideo = (dir: 'next' | 'prev') => {
    if (wheelLock.current) return;
    if (dir === 'next' && index >= videoPool.length - 1) return;
    if (dir === 'prev' && index <= 0) return;
    wheelLock.current = true;
    setFade(false);
    setTimeout(() => {
      setIndex(i => dir === 'next' ? i + 1 : i - 1);
      setFade(true);
      setTimeout(() => { wheelLock.current = false; }, 400);
    }, 200);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 30) switchVideo('next');
    else if (e.deltaY < -30) switchVideo('prev');
  };

  const post = videoPool[index];
  if (!post) return null;
  const isLiked = !!liked[post.id];
  const isSaved = !!saved[post.id];

  return (
    <div className="flex flex-col flex-1 relative overflow-hidden" style={{ background: '#000' }}
      onWheel={handleWheel}>
      {/* Back */}
      <button onClick={onBack}
        className="absolute top-3 left-3 z-20 flex items-center justify-center border-0 bg-transparent cursor-pointer p-2"
        style={{ color: 'white' }}>
        <ArrowLeftOutlined style={{ fontSize: 22 }} />
      </button>

      {/* Cover image (placeholder for video) */}
      <img
        src={`https://picsum.photos/seed/${post.images?.[imageIdx[post.id] ?? 0] ?? post.coverSeed}/390/844`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: fade ? 0.85 : 0, transition: 'opacity 0.2s ease' }}
      />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0.55) 100%)', opacity: fade ? 1 : 0, transition: 'opacity 0.2s ease' }} />

      {/* Center play button (仅视频显示) */}
      {post.type === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="flex items-center justify-center rounded-full"
            style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)' }}>
            <PlayCircleFilled style={{ fontSize: 48, color: 'white' }} />
          </div>
        </div>
      )}

      {/* Right side actions */}
      <div className="absolute right-3 z-20 flex flex-col items-center gap-5" style={{ bottom: 110 }}>
        {/* User avatar + follow */}
        <div className="flex flex-col items-center gap-0.5 mb-2">
          <div className="flex items-center justify-center rounded-full text-white font-bold border-2 border-white"
            style={{ width: 48, height: 48, background: post.avatarColor, fontSize: 16 }}>{post.avatar}</div>
          <div className="flex items-center justify-center rounded-full text-white font-bold"
            style={{ width: 20, height: 20, background: PRIMARY, fontSize: 13, marginTop: -10, border: '1.5px solid white' }}>+</div>
        </div>
        {/* Like */}
        <button
          onClick={() => setLiked(l => ({ ...l, [post.id]: !l[post.id] }))}
          className="flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer p-0"
          style={{ color: isLiked ? '#FF4D4F' : 'white' }}>
          {isLiked ? <HeartFilled style={{ fontSize: 34 }} /> : <HeartOutlined style={{ fontSize: 34 }} />}
          <span style={{ fontSize: 12, color: 'white' }}>{post.likes + (isLiked ? 1 : 0)}</span>
        </button>
        {/* Comment */}
        <button onClick={() => onOpenPost ? onOpenPost(post, isFromFavorites, isFromMyDynamics) : onOpenComment(post)} className="flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer p-0" style={{ color: 'white' }}>
          <CommentOutlined style={{ fontSize: 32 }} />
          <span style={{ fontSize: 12 }}>{post.comments ?? 0}</span>
        </button>
        {/* Save */}
        <button
          onClick={() => {
            const newVal = !saved[post.id];
            setSaved(s => ({ ...s, [post.id]: newVal }));
            if (!newVal && isFromFavorites) {
              if (onShowFavToast) {
                onShowFavToast('已取消收藏');
              } else {
                setToastMsg('已取消收藏');
                setToastVisible(true);
              }
            }
          }}
          className="flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer p-0"
          style={{ color: isSaved ? '#FAAD14' : 'white' }}>
          {isSaved ? <StarFilled style={{ fontSize: 32 }} /> : <StarOutlined style={{ fontSize: 32 }} />}
          <span style={{ fontSize: 12, color: 'white' }}>{post.saves ?? 0}</span>
        </button>
        {/* 更多菜单（仅作品Tab显示） */}
        {enableDelete ? (
          <button onClick={() => setShowPostMenu(true)} className="flex items-center justify-center border-0 bg-transparent cursor-pointer" style={{ color: 'white', width: 56, height: 56, padding: 12 }}>
            <EllipsisOutlined style={{ fontSize: 32 }} />
          </button>
        ) : (
          <button onClick={() => setShowShare(true)} className="flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer p-0" style={{ color: 'white' }}>
            <ShareAltOutlined style={{ fontSize: 32 }} />
            <span style={{ fontSize: 12 }}>{post.shares ?? 0}</span>
          </button>
        )}
      </div>

      {/* Share Sheet */}
      {showShare && <ShareSheet onClose={() => setShowShare(false)} />}

      {/* 操作菜单弹窗（仅作品Tab显示） */}
      {showPostMenu && enableDelete && (
        <>
          <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={() => setShowPostMenu(false)} />
          <div className="fixed left-1/2 -translate-x-1/2 z-[51]" style={{ bottom: 160, width: 200 }}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <button
                onClick={() => { setShowPostMenu(false); setShowShare(true); }}
                className="flex items-center gap-3 w-full border-0 bg-transparent cursor-pointer active:scale-95 transition-transform"
                style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0F0' }}>
                <ShareAltOutlined style={{ fontSize: 18, color: PRIMARY }} />
                <span style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>分享</span>
              </button>
              <button
                onClick={() => { setShowPostMenu(false); setShowDeleteConfirm(true); }}
                className="flex items-center gap-3 w-full border-0 bg-transparent cursor-pointer active:scale-95 transition-transform"
                style={{ padding: '16px 20px' }}>
                <DeleteOutlined style={{ fontSize: 18, color: '#FF4D4F' }} />
                <span style={{ fontSize: 15, color: '#FF4D4F', fontWeight: 500 }}>删除</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* 删除确认弹窗 */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.55)' }}>
          <div className="flex flex-col items-center rounded-2xl p-5"
            style={{ background: 'white', width: 280, boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>确认删除</div>
            <div style={{ fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 1.5, marginBottom: 20 }}>
              删除后不可恢复<br />确定要删除这条内容吗？
            </div>
            <div className="flex gap-3 w-full">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 border-0 cursor-pointer py-2.5 rounded-full"
                style={{ background: '#F0F0F0', fontSize: 15, fontWeight: 600, color: '#666' }}>
                取消
              </button>
              <button onClick={() => { setShowDeleteConfirm(false); onBack(); }} className="flex-1 border-0 cursor-pointer py-2.5 rounded-full"
                style={{ background: '#FF4D4F', fontSize: 15, fontWeight: 600, color: 'white' }}>
                删除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast提示（取消收藏） */}
      {toastVisible && (
        <div className="absolute top-1/2 left-1/2 z-50 flex items-center justify-center"
          style={{ transform: 'translate(-50%, -50%)', width: 200, pointerEvents: 'none' }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: 'rgba(0,0,0,0.75)', color: 'white', fontSize: 14 }}>
            <StarOutlined style={{ fontSize: 16, color: '#FAAD14' }} />
            {toastMsg}
          </div>
        </div>
      )}

      {/* Bottom info + 进度条（与熟人页面一致，进度条在最底部） */}
      <div className="absolute left-0 right-0 z-20 px-4" style={{ bottom: 0, opacity: fade ? 1 : 0, transition: 'opacity 0.2s ease' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 6 }}>@{post.user}</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, paddingRight: 64 }}>{post.title}</div>

        {/* 视频进度条（仅视频帖显示） */}
        {post.type === 'video' && (
          <div className="mt-3 mb-6">
            <div style={{ height: 3, background: 'rgba(255,255,255,0.35)', borderRadius: 2 }}>
              <div style={{
                height: '100%',
                width: `${videoProgress}%`,
                background: '#FF6B35',
                borderRadius: 2,
                transition: 'width 0.18s linear',
              }} />
            </div>
            <div className="flex justify-between mt-1.5" style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>
              <span>{Math.floor(videoProgress * 0.2)}:{String(Math.floor((videoProgress * 0.2 * 60) % 60)).padStart(2, '0')}</span>
              <span>0:20</span>
            </div>
          </div>
        )}

        {/* 图文帖子：查看详情按钮 */}
        {post.type === 'image' && (
          <button
            onClick={() => onOpenPost ? onOpenPost(post, isFromFavorites, isFromMyDynamics) : onOpenComment(post)}
            className="flex items-center justify-center gap-2 border-0 cursor-pointer active:scale-95 mt-3 mb-6"
            style={{ height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)', fontSize: 15, fontWeight: 600, color: 'white', paddingLeft: 20, paddingRight: 20 }}>
            <EyeOutlined style={{ fontSize: 16 }} /> 查看详情
          </button>
        )}

        {/* 图片缩略图横向滚动条（仅多图时显示） */}
        {post.type === 'image' && post.images && post.images.length > 1 && (
          <div className="flex gap-4 justify-center mb-6" style={{ paddingLeft: 16, paddingRight: 16 }}>
            {post.images.map((_, imgIdx) => {
              const curIdx = imageIdx[post.id] ?? 0;
              return (
                <button
                  key={imgIdx}
                  onClick={() => setImageIdx(prev => ({ ...prev, [post.id]: imgIdx }))}
                  className="border-0 cursor-pointer p-0"
                  style={{
                    width: curIdx === imgIdx ? 28 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: curIdx === imgIdx ? 'white' : 'rgba(255,255,255,0.4)',
                    transition: 'all 0.2s',
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── USER PROFILE SCREEN ───────────────────────
// ─────────────────────────────────────────────
const UserProfileScreen: React.FC<{
  userId: number;
  onBack: () => void;
  onOpenPost: (post: FollowPost) => void;
  onOpenVideo: (post: FollowPost, pool?: FollowPost[]) => void;
  onOpenChat: (userId: number) => void;
}> = ({ userId, onBack, onOpenPost, onOpenVideo, onOpenChat }) => {
  const profile = USER_PROFILES[userId];
  const allPosts = getUserPosts(userId);
  const [tab, setTab] = useState<'image' | 'video'>('image');
  const [isFollowed, setIsFollowed] = useState(profile?.isFollowed ?? false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showBlock, setShowBlock] = useState(false);

  if (!profile) return null;

  const imagePosts = allPosts.filter(p => p.type === 'image');
  const videoPosts = allPosts.filter(p => p.type === 'video');
  const displayPosts = tab === 'video' ? videoPosts : imagePosts;
  const leftCol = displayPosts.filter((_, i) => i % 2 === 0);
  const rightCol = displayPosts.filter((_, i) => i % 2 === 1);

  const renderCard = (post: FollowPost) => (
    <button key={post.id}
      onClick={() => post.type === 'video' ? onOpenVideo(post, videoPosts) : onOpenPost(post)}
      className="relative rounded-2xl overflow-hidden border-0 cursor-pointer p-0 text-left w-full"
      style={{ background: 'white', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
      <div className="relative">
        <img
          src={`https://picsum.photos/seed/${post.coverSeed}/200/${post.coverHeight}`}
          alt=""
          className="w-full object-cover"
          style={{ height: Math.round(post.coverHeight * 0.85) }}
        />
        {post.type === 'video' && (
          <div className="absolute top-2 right-2 flex items-center justify-center rounded-full"
            style={{ width: 28, height: 28, background: 'rgba(0,0,0,0.48)' }}>
            <PlayCircleFilled style={{ fontSize: 18, color: 'white' }} />
          </div>
        )}
      </div>
      <div className="px-2 py-1.5">
        <div style={{ fontSize: 13, color: '#1A1A1A', lineHeight: 1.5, fontWeight: 500, marginBottom: 5 }}>{post.title}</div>
        {/* 互动指标：紧凑两行布局 */}
        <div className="flex items-center gap-3" style={{ fontSize: 11 }}>
          <span className="flex items-center gap-0.5" style={{ color: '#999' }}>
            <MessageOutlined style={{ fontSize: 11 }} />{post.comments ?? 0}
          </span>
          <span className="flex items-center gap-0.5" style={{ color: '#FF6B35' }}>
            <HeartOutlined style={{ fontSize: 11 }} />{post.likes}
          </span>
        </div>
        <div className="flex items-center gap-3" style={{ fontSize: 11, marginTop: 2 }}>
          <span className="flex items-center gap-0.5" style={{ color: '#999' }}>
            <StarOutlined style={{ fontSize: 11 }} />{post.saves ?? 0}
          </span>
          <span className="flex items-center gap-0.5" style={{ color: '#999' }}>
            <ShareAltOutlined style={{ fontSize: 11 }} />{post.shares ?? 0}
          </span>
        </div>
      </div>
    </button>
  );

  return (
    <div className="relative flex flex-col flex-1 overflow-hidden" style={{ background: PAGE_BG }}>
      <div className="flex-1 overflow-y-auto">

        {/* ── Hero Section (full-bleed gradient background) ── */}
        <div style={{
          background: 'linear-gradient(180deg, #E8521A 0%, #FF6B35 38%, #FF9A56 72%, #FFB87A 100%)',
          paddingBottom: 28,
        }}>
          {/* Transparent nav overlay */}
          <div className="relative flex items-center justify-between px-3" style={{ height: 52 }}>
            <button onClick={onBack}
              className="flex items-center justify-center border-0 cursor-pointer rounded-full"
              style={{ width: 38, height: 38, background: 'rgba(0,0,0,0.18)', padding: 0 }}>
              <ArrowLeftOutlined style={{ fontSize: 18, color: 'white' }} />
            </button>
            <button
              onClick={() => setShowMoreMenu(v => !v)}
              className="flex items-center justify-center border-0 cursor-pointer rounded-full"
              style={{ width: 38, height: 38, background: 'rgba(0,0,0,0.18)', padding: 0 }}>
              <EllipsisOutlined style={{ fontSize: 20, color: 'white' }} />
            </button>
            {showMoreMenu && (
              <MoreMenuBubble
                onClose={() => setShowMoreMenu(false)}
                onAddFriend={() => setShowAddFriend(true)}
                onShareCard={() => setShowShareCard(true)}
                onReport={() => setShowReport(true)}
                onBlock={() => setShowBlock(true)}
              />
            )}
          </div>

          {/* Profile info — centered */}
          <div className="flex flex-col items-center px-6 pt-1">
            {/* Avatar */}
            <div className="flex items-center justify-center rounded-full font-black flex-shrink-0"
              style={{
                width: 88, height: 88,
                background: 'rgba(255,255,255,0.22)',
                border: '3px solid rgba(255,255,255,0.85)',
                boxShadow: '0 6px 24px rgba(0,0,0,0.22)',
                fontSize: 32, color: 'white',
              }}>
              {profile.avatar}
            </div>

            {/* Name */}
            <div style={{ fontSize: 22, fontWeight: 900, color: 'white', marginTop: 12, letterSpacing: 0.5 }}>
              {profile.name}
            </div>

            {/* ID · IP */}
            <div className="flex items-center gap-2 mt-1.5">
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>益寿号 {profile.uid}</span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10 }}>|</span>
              <span className="flex items-center gap-0.5" style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>
                <EnvironmentOutlined style={{ fontSize: 11 }} />{profile.ip}
              </span>
            </div>

            {/* Bio */}
            {profile.bio && (
              <div style={{
                fontSize: 13, color: 'rgba(255,255,255,0.88)', lineHeight: 1.65,
                marginTop: 10, textAlign: 'center', maxWidth: 260,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {profile.bio}
              </div>
            )}

            {/* Stats row */}
            <div className="flex gap-10 mt-5">
              {[
                { label: '关注', value: profile.following },
                { label: '粉丝', value: profile.followers >= 1000 ? (profile.followers / 1000).toFixed(1) + 'k' : profile.followers },
                { label: '获赞', value: profile.likesReceived >= 1000 ? (profile.likesReceived / 1000).toFixed(1) + 'k' : profile.likesReceived },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span style={{ fontSize: 22, fontWeight: 900, color: 'white', lineHeight: 1 }}>{stat.value}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-5">
              <button
                className="flex items-center justify-center gap-1.5 rounded-full border-0 cursor-pointer"
                onClick={() => onOpenChat(userId)}
                style={{
                  height: 40, paddingInline: 22, fontSize: 14, fontWeight: 600,
                  background: 'rgba(255,255,255,0.18)',
                  color: 'white',
                  border: '1.5px solid rgba(255,255,255,0.5)',
                }}>
                <MessageOutlined style={{ fontSize: 14 }} />私信
              </button>
              <button
                onClick={() => setIsFollowed(v => !v)}
                className="flex items-center justify-center rounded-full border-0 cursor-pointer active:scale-95"
                style={{
                  height: 40, paddingInline: 28, fontSize: 14, fontWeight: 700,
                  background: isFollowed ? 'rgba(255,255,255,0.18)' : 'white',
                  color: isFollowed ? 'white' : PRIMARY,
                  border: isFollowed ? '1.5px solid rgba(255,255,255,0.5)' : 'none',
                  transition: 'all 0.15s',
                }}>
                {isFollowed ? '✓ 已关注' : '+ 关注'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Content Tabs (sticky) ── */}
        <div className="flex sticky top-0 z-10"
          style={{ background: 'white', borderBottom: '1px solid #ECECEC' }}>
          {[
            { id: 'image' as const, label: '图文', count: imagePosts.length },
            { id: 'video' as const, label: '视频', count: videoPosts.length },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-3.5 border-0 bg-transparent cursor-pointer"
              style={{
                fontSize: 15, fontWeight: tab === t.id ? 700 : 400,
                color: tab === t.id ? PRIMARY : '#888',
                borderBottom: tab === t.id ? `2.5px solid ${PRIMARY}` : '2.5px solid transparent',
              }}>
              {t.label}
              <span style={{
                fontSize: 11, color: tab === t.id ? PRIMARY : '#CCC',
                background: tab === t.id ? PRIMARY_BG : '#F5F5F5',
                borderRadius: 10, padding: '1px 6px',
              }}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* ── Waterfall posts ── */}
        {displayPosts.length > 0 ? (
          <div className="flex gap-2 p-2 pb-6">
            <div className="flex flex-col gap-2 flex-1">{leftCol.map(p => renderCard(p))}</div>
            <div className="flex flex-col gap-2 flex-1">{rightCol.map(p => renderCard(p))}</div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16" style={{ color: '#CCC' }}>
            <SmileOutlined style={{ fontSize: 48, marginBottom: 12 }} />
            <span style={{ fontSize: 15 }}>暂无{tab === 'video' ? '视频' : '图文'}内容</span>
          </div>
        )}

      </div>
      {showAddFriend && (
        <AddFriendModal
          profile={{ name: profile.name, avatar: profile.avatar, uid: profile.uid, ip: profile.ip }}
          onClose={() => setShowAddFriend(false)}
        />
      )}
      {showShareCard && (
        <ShareCardSheet
          profile={{ name: profile.name, avatar: profile.avatar, uid: profile.uid }}
          onClose={() => setShowShareCard(false)}
        />
      )}
      {showReport && (
        <ReportModal name={profile.name} onClose={() => setShowReport(false)} />
      )}
      {showBlock && (
        <BlockModal
          name={profile.name}
          onClose={() => setShowBlock(false)}
          onConfirm={() => setIsFollowed(false)}
        />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// ── CIRCLE ACTIVITY BANNER ────────────────────
// ─────────────────────────────────────────────
const CircleActivityBanner: React.FC<{
  activities: { title: string; date: string; location: string; status: 'upcoming' | 'ongoing' | 'ended' }[];
  onGoActivity: () => void;
}> = ({ activities, onGoActivity }) => {
  const upcomingActivities = activities.filter(a => a.status === 'upcoming');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (upcomingActivities.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % upcomingActivities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [upcomingActivities.length]);

  if (upcomingActivities.length === 0) return null;

  const activity = upcomingActivities[currentIndex];

  return (
    <div className="mx-4 mb-3">
      <button
        onClick={onGoActivity}
        className="w-full rounded-2xl overflow-hidden border-0 cursor-pointer p-0 text-left"
        style={{ background: 'linear-gradient(135deg, #FA8C16, #FFC069)', boxShadow: '0 2px 8px rgba(250,140,22,0.25)' }}>
        <div className="flex items-center gap-3 p-3">
          <div className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.25)' }}>
            <CalendarOutlined style={{ fontSize: 24, color: 'white' }} />
          </div>
          <div className="flex-1 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span style={{ fontSize: 15, fontWeight: 700 }}>{activity.title}</span>
              {upcomingActivities.length > 1 && (
                <span style={{ fontSize: 11, opacity: 0.8 }}>{currentIndex + 1}/{upcomingActivities.length}</span>
              )}
            </div>
            <div style={{ fontSize: 12, opacity: 0.9 }}>{activity.date} · {activity.location}</div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0" style={{ color: 'white', opacity: 0.9 }}>
            <span style={{ fontSize: 13 }}>查看详情</span>
            <RightOutlined style={{ fontSize: 12 }} />
          </div>
        </div>
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── CIRCLE DETAIL SCREEN ──────────────────────
// ─────────────────────────────────────────────
const CircleDetailScreen: React.FC<{
  circle: CircleInfo;
  onBack: () => void;
  onOpenPost: (post: FollowPost) => void;
  onOpenVideo: (post: FollowPost, pool?: FollowPost[]) => void;
  onOpenUserProfile: (userId: number) => void;
  onNavigate: (screen: AppScreen) => void;
  onGoActivity: () => void;
}> = ({ circle, onBack, onOpenPost, onOpenVideo, onOpenUserProfile, onNavigate, onGoActivity }) => {
  const [showMenu, setShowMenu] = useState(false);
  const posts = CIRCLE_POSTS[circle.name] || [];
  const circleVideos = posts.filter(p => p.type === 'video');
  const leftCol = posts.filter((_, i) => i % 2 === 0);
  const rightCol = posts.filter((_, i) => i % 2 === 1);

  const renderCard = (post: FollowPost) => (
    <button key={post.id}
      onClick={() => post.type === 'video' ? onOpenVideo(post, circleVideos) : onOpenPost(post)}
      className="relative rounded-2xl overflow-hidden border-0 cursor-pointer p-0 text-left w-full"
      style={{ background: 'white', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
      <div className="relative">
        <img
          src={`https://picsum.photos/seed/${post.coverSeed}/200/${post.coverHeight}`}
          alt=""
          className="w-full object-cover"
          style={{ height: Math.round(post.coverHeight * 0.85) }}
        />
        {post.type === 'video' && (
          <div className="absolute top-2 right-2 flex items-center justify-center rounded-full"
            style={{ width: 28, height: 28, background: 'rgba(0,0,0,0.48)' }}>
            <PlayCircleFilled style={{ fontSize: 18, color: 'white' }} />
          </div>
        )}
      </div>
      <div className="px-2.5 py-2">
        <div style={{ fontSize: 13, color: '#1A1A1A', lineHeight: 1.5, fontWeight: 500, marginBottom: 6 }}>{post.title}</div>
        {/* 互动指标：两列布局 */}
        <div className="flex items-center justify-between" style={{ fontSize: 11 }}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" style={{ color: '#999' }}>
              <MessageOutlined style={{ fontSize: 11 }} />
              <span>{post.comments ?? 0}</span>
            </span>
            <span className="flex items-center gap-1" style={{ color: '#FF6B35' }}>
              <HeartOutlined style={{ fontSize: 11 }} />
              <span>{post.likes}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" style={{ color: '#999' }}>
              <StarOutlined style={{ fontSize: 11 }} />
              <span>{post.saves ?? 0}</span>
            </span>
            <span className="flex items-center gap-1" style={{ color: '#999' }}>
              <ShareAltOutlined style={{ fontSize: 11 }} />
              <span>{post.shares ?? 0}</span>
            </span>
          </div>
        </div>
      </div>
    </button>
  );

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: PAGE_BG, position: 'relative' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative', zIndex: 10 }}>
        <button onClick={onBack} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', flex: 1 }}>{circle.name}</div>
        <div style={{ position: 'relative' }}>
          <button
            className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"
            onClick={() => setShowMenu(v => !v)}>
            <EllipsisOutlined style={{ fontSize: 22, color: '#1A1A1A' }} />
          </button>
          {showMenu && (
            <>
              <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setShowMenu(false)} />
              <div className="rounded-2xl overflow-hidden" style={{
                position: 'absolute', top: 38, right: 0, zIndex: 100, minWidth: 140,
                background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
              }}>
                {[
                  { label: '发布公告', icon: <NotificationOutlined style={{ fontSize: 16, color: '#FF6B35' }} />, screen: 'circle-announce' as AppScreen },
                  { label: '管理成员', icon: <TeamOutlined style={{ fontSize: 16, color: '#1677FF' }} />, screen: 'circle-members' as AppScreen },
                  { label: '发起活动', icon: <CalendarOutlined style={{ fontSize: 16, color: '#52C41A' }} />, screen: 'circle-activity' as AppScreen },
                ].map((item, idx, arr) => (
                  <button key={item.label}
                    onClick={() => { setShowMenu(false); onNavigate(item.screen); }}
                    className="flex items-center gap-3 w-full border-0 bg-transparent cursor-pointer px-4"
                    style={{ height: 50, borderBottom: idx < arr.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                    {item.icon}
                    <span style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>{item.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Circle banner */}
        <div className="mx-4 mt-4 mb-3 rounded-2xl overflow-hidden" style={{ background: circle.color }}>
          <div className="flex items-center gap-4 p-4">
            <div className="flex items-center justify-center rounded-2xl text-white font-bold flex-shrink-0"
              style={{ width: 60, height: 60, background: 'rgba(255,255,255,0.22)', fontSize: 24 }}>{circle.name[0]}</div>
            <div className="flex-1 text-white">
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{circle.name}</div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>{circle.members.toLocaleString()}人 · {circle.tag}</div>
            </div>
            <div className="rounded-xl px-3 py-1.5 text-white font-medium flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.25)', fontSize: 13, border: '1px solid rgba(255,255,255,0.5)' }}>已加入</div>
          </div>
        </div>

        {/* Activity banner */}
        {CIRCLE_ACTIVITIES[circle.name] && (
          <CircleActivityBanner activities={CIRCLE_ACTIVITIES[circle.name]} onGoActivity={onGoActivity} />
        )}

        {/* Admin notice + slogan */}
        {CIRCLE_ADMIN_INFO[circle.name] && (() => {
          const info = CIRCLE_ADMIN_INFO[circle.name];
          return (
            <div className="mx-4 mb-3 rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
              {/* Slogan */}
              <div className="px-4 py-3 flex items-center gap-2"
                style={{ borderBottom: '1px solid #F5F5F5', background: `${circle.color}10` }}>
                <div className="flex-shrink-0 rounded-full flex items-center justify-center"
                  style={{ width: 6, height: 6, background: circle.color }} />
                <span style={{ fontSize: 13, color: circle.color, fontWeight: 500, lineHeight: 1.5 }}>{info.slogan}</span>
              </div>
              {/* Admin notice */}
              <div className="px-4 pt-3 pb-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="rounded-md px-1.5 py-0.5 flex-shrink-0"
                    style={{ background: circle.color, fontSize: 11, color: 'white', fontWeight: 600 }}>管理员公告</div>
                  <span style={{ fontSize: 12, color: '#BBB' }}>{info.noticeTime}</span>
                </div>
                <div className="flex gap-2.5">
                  <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
                    style={{ width: 34, height: 34, background: info.adminColor, fontSize: 13 }}>{info.adminAvatar}</div>
                  <div className="flex-1">
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>{info.admin}（圈主）</div>
                    <div style={{ fontSize: 13, color: '#444', lineHeight: 1.7 }}>{info.notice}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Post count */}
        <div className="px-4 mb-2" style={{ fontSize: 13, color: '#888' }}>
          圈子动态 · <strong style={{ color: '#1A1A1A' }}>{posts.length}</strong> 条
        </div>

        {/* 2-column waterfall */}
        <div className="flex gap-2 px-2 pb-20">
          <div className="flex flex-col gap-2 flex-1">{leftCol.map(renderCard)}</div>
          <div className="flex flex-col gap-2 flex-1">{rightCol.map(renderCard)}</div>
        </div>
      </div>

      {/* Post button */}
      <div className="absolute left-0 right-0 bottom-0 flex items-center justify-end px-5 py-4 flex-shrink-0"
        style={{ background: 'white', borderTop: '1px solid #F0F0F0' }}>
        <button className="flex items-center gap-2 rounded-2xl text-white font-semibold border-0 cursor-pointer px-5"
          style={{ height: 46, background: circle.color, fontSize: 15 }}>
          <PlusOutlined style={{ fontSize: 16 }} /> 发布动态
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── CIRCLE DISCOVER SCREEN ────────────────────
// ─────────────────────────────────────────────
const CircleDiscoverScreen: React.FC<{
  onBack: () => void;
  onOpenCircle: (circle: CircleInfo) => void;
  followedCircles: string[];
  onFollow: (name: string) => void;
}> = ({ onBack, onOpenCircle, followedCircles, onFollow }) => {
  const [query, setQuery] = useState('');

  const results = ALL_CIRCLES.filter(c => {
    const q = query.trim().toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q);
  });

  const recommended = ALL_CIRCLES.filter(c => !followedCircles.includes(c.name));
  const showResults = query.trim().length > 0;

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: PAGE_BG }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-2xl" style={{ background: '#F5F5F5' }}>
          <SearchOutlined style={{ color: '#AAA', fontSize: 16, flexShrink: 0 }} />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="搜索圈子名称或标签"
            className="flex-1 border-0 bg-transparent outline-none"
            style={{ fontSize: 14, color: '#1A1A1A' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="border-0 bg-transparent cursor-pointer p-0" style={{ color: '#BBB', lineHeight: 1 }}>✕</button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pt-4 pb-6">
        {showResults ? (
          <>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>
              找到 <strong style={{ color: '#1A1A1A' }}>{results.length}</strong> 个圈子
            </div>
            {results.length === 0 && (
              <div className="py-16 text-center" style={{ fontSize: 14, color: '#BBB' }}>没有找到相关圈子</div>
            )}
            <div className="flex flex-col gap-3">
              {results.map(c => {
                const isFollowed = followedCircles.includes(c.name);
                return (
                  <div key={c.name} className="flex items-center justify-between p-4 rounded-2xl" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center rounded-xl text-white font-bold flex-shrink-0"
                        style={{ width: 46, height: 46, background: c.color, fontSize: 17 }}>{c.name[0]}</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{c.name}</div>
                        <div style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{c.members.toLocaleString()}人 · {c.tag}</div>
                      </div>
                    </div>
                    {isFollowed ? (
                      <button onClick={() => onOpenCircle(c)}
                        className="rounded-xl cursor-pointer border-0 font-medium"
                        style={{ background: '#F5F5F5', color: '#555', fontSize: 13, padding: '7px 16px' }}>进入</button>
                    ) : (
                      <button onClick={() => onFollow(c.name)}
                        className="rounded-xl cursor-pointer border-0 text-white font-medium"
                        style={{ background: c.color, fontSize: 13, fontWeight: 600, padding: '7px 16px' }}>+ 关注</button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* 推荐加入 */}
            {recommended.length > 0 && (
              <div className="mb-5">
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>推荐圈子</div>
                <div className="flex flex-col gap-3">
                  {recommended.map(c => (
                    <div key={c.name} className="flex items-center justify-between p-4 rounded-2xl" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-xl text-white font-bold flex-shrink-0"
                          style={{ width: 46, height: 46, background: c.color, fontSize: 17 }}>{c.name[0]}</div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{c.name}</div>
                          <div style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{c.members.toLocaleString()}人 · {c.tag}</div>
                        </div>
                      </div>
                      <button onClick={() => onFollow(c.name)}
                        className="rounded-xl cursor-pointer border-0 text-white font-medium"
                        style={{ background: c.color, fontSize: 13, fontWeight: 600, padding: '7px 16px' }}>+ 关注</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 全部圈子 */}
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>全部圈子</div>
              <div className="flex flex-col gap-3">
                {ALL_CIRCLES.map(c => {
                  const isFollowed = followedCircles.includes(c.name);
                  return (
                    <div key={c.name} className="flex items-center justify-between p-4 rounded-2xl" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-xl text-white font-bold flex-shrink-0"
                          style={{ width: 46, height: 46, background: c.color, fontSize: 17 }}>{c.name[0]}</div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{c.name}</div>
                          <div style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{c.members.toLocaleString()}人 · {c.tag}</div>
                        </div>
                      </div>
                      {isFollowed ? (
                        <button onClick={() => onOpenCircle(c)}
                          className="rounded-xl cursor-pointer border-0 font-medium"
                          style={{ background: '#F5F5F5', color: '#555', fontSize: 13, padding: '7px 16px' }}>进入</button>
                      ) : (
                        <button onClick={() => onFollow(c.name)}
                          className="rounded-xl cursor-pointer border-0 text-white font-medium"
                          style={{ background: c.color, fontSize: 13, fontWeight: 600, padding: '7px 16px' }}>+ 关注</button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── CIRCLE ANNOUNCE SCREEN ────────────────────
// ─────────────────────────────────────────────
const CircleAnnounceScreen: React.FC<{ onBack: () => void; circle: CircleInfo }> = ({ onBack, circle }) => {
  const [content, setContent] = useState('');
  const [sent, setSent] = useState(false);
  const maxLen = 300;
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F7F7F7' }}>
      <div className="flex items-center px-4 flex-shrink-0" style={{ height: 54, background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ flex: 1, fontSize: 17, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>发布公告</div>
        <button
          onClick={() => { if (content.trim()) setSent(true); }}
          className="border-0 cursor-pointer rounded-xl px-4"
          style={{ height: 34, background: content.trim() ? circle.color : '#E0E0E0', color: 'white', fontSize: 14, fontWeight: 600 }}>
          发布
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        {sent ? (
          <div className="flex flex-col items-center justify-center" style={{ paddingTop: 80 }}>
            <CheckCircleFilled style={{ fontSize: 56, color: circle.color }} />
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginTop: 16 }}>公告已发布</div>
            <div style={{ fontSize: 14, color: '#999', marginTop: 8 }}>圈内所有成员将收到通知</div>
            <button onClick={onBack} className="border-0 cursor-pointer rounded-2xl mt-8"
              style={{ background: circle.color, color: 'white', fontSize: 15, fontWeight: 600, padding: '12px 40px' }}>
              返回圈子
            </button>
          </div>
        ) : (
          <>
            {/* 公告历史 */}
            <div className="rounded-2xl overflow-hidden mb-4" style={{ background: 'white' }}>
              <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: '1px solid #F5F5F5' }}>
                <NotificationOutlined style={{ fontSize: 15, color: circle.color }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>历史公告</span>
              </div>
              {(CIRCLE_ADMIN_INFO[circle.name] ? [CIRCLE_ADMIN_INFO[circle.name]] : []).map((info, idx) => (
                <div key={idx} className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: 12, color: '#BBB' }}>{info.noticeTime}</span>
                  </div>
                  <div style={{ fontSize: 14, color: '#444', lineHeight: 1.7 }}>{info.notice}</div>
                </div>
              ))}
            </div>
            {/* 编辑区 */}
            <div className="rounded-2xl overflow-hidden" style={{ background: 'white' }}>
              <div className="px-4 py-3" style={{ borderBottom: '1px solid #F5F5F5' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>新公告内容</span>
              </div>
              <div className="px-4 pt-3 pb-2">
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value.slice(0, maxLen))}
                  placeholder="在这里输入公告内容，发布后圈内所有成员将收到通知…"
                  className="w-full border-0 outline-none resize-none"
                  style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.7, minHeight: 140, background: 'transparent' }}
                />
                <div className="flex justify-end" style={{ fontSize: 12, color: '#BBB' }}>
                  {content.length}/{maxLen}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── CIRCLE MEMBERS SCREEN ─────────────────────
// ─────────────────────────────────────────────
const CIRCLE_MEMBER_ROLES: {[key: string]: { role: 'admin' | 'member'; joinDate: string }} = {
  '李秀英': { role: 'admin', joinDate: '2023-06-01' },
  '王翠华': { role: 'member', joinDate: '2023-08-15' },
  '赵美云': { role: 'member', joinDate: '2023-09-03' },
  '陈大爷': { role: 'member', joinDate: '2023-10-20' },
  '孙阿姨': { role: 'member', joinDate: '2024-01-08' },
  '刘奶奶': { role: 'member', joinDate: '2024-02-14' },
  '周大爷': { role: 'member', joinDate: '2024-03-05' },
  '郑阿姨': { role: 'member', joinDate: '2024-04-11' },
};

const CircleMembersScreen: React.FC<{ onBack: () => void; circle: CircleInfo; onOpenUserProfile: (userId: number) => void }> = ({ onBack, circle, onOpenUserProfile }) => {
  const posts = CIRCLE_POSTS[circle.name] || [];
  const uniqueUsers = Array.from(new Map(posts.map(p => [p.userId, p])).values());
  const [removed, setRemoved] = useState<Set<number>>(new Set());

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F7F7F7' }}>
      <div className="flex items-center px-4 flex-shrink-0" style={{ height: 54, background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ flex: 1, fontSize: 17, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>管理成员</div>
        <div style={{ width: 28 }} />
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <div style={{ fontSize: 13, color: '#999', marginBottom: 8, paddingLeft: 4 }}>
          共 {uniqueUsers.filter(u => !removed.has(u.userId)).length} 位成员
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ background: 'white' }}>
          {uniqueUsers.map((u, idx) => {
            if (removed.has(u.userId)) return null;
            const roleInfo = CIRCLE_MEMBER_ROLES[u.user];
            const isAdmin = roleInfo?.role === 'admin';
            return (
              <div key={u.userId}
                className="flex items-center gap-3 px-4"
                style={{ height: 68, borderBottom: idx < uniqueUsers.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                <div
                  className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 cursor-pointer"
                  style={{ width: 46, height: 46, background: u.avatarColor, fontSize: 17 }}
                  onClick={() => onOpenUserProfile(u.userId)}>
                  {u.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{u.user}</span>
                    {isAdmin && (
                      <span className="rounded-md px-1.5 py-0.5" style={{ fontSize: 11, background: circle.color, color: 'white', fontWeight: 600 }}>圈主</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: '#BBB', marginTop: 2 }}>加入于 {roleInfo?.joinDate ?? '2024-01-01'}</div>
                </div>
                {!isAdmin && (
                  <button
                    onClick={() => setRemoved(prev => new Set([...prev, u.userId]))}
                    className="border-0 cursor-pointer rounded-xl px-3"
                    style={{ height: 32, background: '#FFF1F0', color: '#FF4D4F', fontSize: 13, fontWeight: 500 }}>
                    移除
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── CIRCLE ACTIVITY SCREEN ────────────────────
// ─────────────────────────────────────────────
const CircleActivityScreen: React.FC<{ onBack: () => void; circle: CircleInfo; onNavigate: (screen: AppScreen) => void }> = ({ onBack, circle, onNavigate }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [desc, setDesc] = useState('');
  const [sent, setSent] = useState(false);
  const canSubmit = title.trim() && date.trim() && location.trim();

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: '#F7F7F7' }}>
      <div className="flex items-center px-4 flex-shrink-0" style={{ height: 54, background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ flex: 1, fontSize: 17, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>发起活动</div>
        <button
          onClick={() => { if (canSubmit) setSent(true); }}
          className="border-0 cursor-pointer rounded-xl px-4"
          style={{ height: 34, background: canSubmit ? circle.color : '#E0E0E0', color: 'white', fontSize: 14, fontWeight: 600 }}>
          发起
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        {sent ? (
          <div className="flex flex-col items-center justify-center" style={{ paddingTop: 80 }}>
            <CheckCircleFilled style={{ fontSize: 56, color: circle.color }} />
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginTop: 16 }}>活动已发起</div>
            <div style={{ fontSize: 14, color: '#999', marginTop: 8 }}>圈内成员将收到活动邀请</div>
            {/* 活动预览卡片 */}
            <div className="rounded-2xl mt-8 w-full" style={{ background: 'white', border: `1.5px solid ${circle.color}30`, overflow: 'hidden' }}>
              <div className="px-4 py-3 flex items-center gap-2" style={{ background: `${circle.color}15` }}>
                <CalendarOutlined style={{ fontSize: 16, color: circle.color }} />
                <span style={{ fontSize: 15, fontWeight: 700, color: circle.color }}>{title}</span>
              </div>
              <div className="px-4 py-3 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <ClockCircleOutlined style={{ fontSize: 14, color: '#999' }} />
                  <span style={{ fontSize: 14, color: '#555' }}>{date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <EnvironmentOutlined style={{ fontSize: 14, color: '#999' }} />
                  <span style={{ fontSize: 14, color: '#555' }}>{location}</span>
                </div>
                {desc ? <div style={{ fontSize: 13, color: '#888', lineHeight: 1.6, marginTop: 4 }}>{desc}</div> : null}
              </div>
            </div>
            <button onClick={onBack} className="border-0 cursor-pointer rounded-2xl mt-6"
              style={{ background: circle.color, color: 'white', fontSize: 15, fontWeight: 600, padding: '12px 40px' }}>
              返回圈子
            </button>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'white' }}>
            {[
              { label: '活动名称', placeholder: '例：广场舞月度汇演', value: title, onChange: setTitle },
              { label: '活动时间', placeholder: '例：2026-05-01 下午3:00', value: date, onChange: setDate },
              { label: '活动地点', placeholder: '例：渝中区人民广场', value: location, onChange: setLocation },
            ].map((field, idx) => (
              <div key={field.label} className="flex items-center px-4" style={{ height: 56, borderBottom: '1px solid #F5F5F5' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', width: 72, flexShrink: 0 }}>{field.label}</span>
                <input
                  value={field.value}
                  onChange={e => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  className="flex-1 border-0 outline-none bg-transparent"
                  style={{ fontSize: 14, color: '#1A1A1A' }}
                />
              </div>
            ))}
            <div className="px-4 pt-3 pb-4">
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>活动简介（选填）</div>
              <textarea
                value={desc}
                onChange={e => setDesc(e.target.value.slice(0, 200))}
                placeholder="介绍一下活动内容、注意事项等…"
                className="w-full border-0 outline-none resize-none"
                style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.7, minHeight: 100, background: '#F7F7F7', borderRadius: 12, padding: '10px 12px' }}
              />
              <div className="flex justify-end mt-1" style={{ fontSize: 12, color: '#BBB' }}>{desc.length}/200</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── BAYU TAB ──────────────────────────────────
// ─────────────────────────────────────────────
const BayuTab: React.FC<{
  onOpenPost: (post: FollowPost) => void;
  onOpenVideo: (post: FollowPost, pool?: FollowPost[]) => void;
  onOpenComment: (post: FollowPost) => void;
  onOpenCircle: (circle: CircleInfo) => void;
  onOpenUserProfile: (userId: number) => void;
  onCreatePost: () => void;
  onDiscoverCircles: () => void;
  onNavigate: (screen: AppScreen) => void;
  onOpenChat: (roomId: string) => void;
  followedCircles: string[];
  onFollow: (name: string) => void;
  onUnfollow: (name: string) => void;
  yishouSubTab: BayuSubTab;
  setYishouSubTab: (tab: BayuSubTab) => void;
  onShare: () => void;
  userPoints: number;
  onSetUserPoints: (fn: number | ((prev: number) => number)) => void;
  onOpenCommunityDetail: (categoryId: string) => void;
}> = ({ onOpenPost, onOpenVideo, onOpenComment, onOpenCircle, onOpenUserProfile, onCreatePost, onDiscoverCircles, onNavigate, onOpenChat, followedCircles, onFollow, onUnfollow, yishouSubTab, setYishouSubTab, onShare, userPoints, onSetUserPoints, onOpenCommunityDetail }) => {
  const [sub, setSub] = [yishouSubTab, setYishouSubTab];
  const [rankSubTab, setRankSubTab] = useState<RankSubTab>('news');
  const [circleManage, setCircleManage] = useState(false);
  const [followVideoIdx, setFollowVideoIdx] = useState(0);
  const [followLiked, setFollowLiked] = useState<{[id: number]: boolean}>({});
  const [followSaved, setFollowSaved] = useState<{[id: number]: boolean}>({});
  const [followImageIdx, setFollowImageIdx] = useState<{[id: number]: number}>({}); // 记录每条帖子的当前图片索引
  const [followedUsers, setFollowedUsers] = useState<{[userId: string]: 'checking' | 'done'}>({}); // 关注用户：checking=显示勾选，done=已消失
  const [showShare, setShowShare] = useState(false);
  const [showPointRules, setShowPointRules] = useState(false); // 是否显示积分规则弹窗
  const [videoProgress, setVideoProgress] = useState(0); // 视频播放进度（0-100）
  const [countdown, setCountdown] = useState(5); // 圆圈倒计时
  const [countdownDone, setCountdownDone] = useState(false); // 倒计时是否完成
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(DEFAULT_CHAT_ROOMS);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomForm, setNewRoomForm] = useState({ name: '', description: '', tag: '' });
  // 社区状态
  const [communitySearch, setCommunitySearch] = useState('');
  const followAutoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const followVideoWheelLock = useRef(false);
  const followVideoTouchStartY = useRef<number | null>(null);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 滑动切换视频
  const onVideoSwitch = (videoId: number, isVideo: boolean) => {
    // 重置倒计时
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    setCountdown(5);
    setCountdownDone(false);
    if (isVideo) {
      // 启动5秒倒计时
      countdownTimerRef.current = setInterval(() => {
        setCountdown(c => {
          if (c <= 1) {
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
            setCountdownDone(true);
            onSetUserPoints(p => p + 2);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
  };

  // 视频进度模拟：切换视频时重置并重新开始
  useEffect(() => {
    if (sub === 'follow' || sub === 'plaza') {
      setVideoProgress(0);
      // 重置倒计时
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      setCountdown(5);
      setCountdownDone(false);
      // 启动5秒倒计时（仅对当前视频）
      const currentPost = sub === 'follow'
        ? [...HOT_POSTS, ...PLAZA_POSTS.filter(p => !HOT_POSTS.find(h => h.id === p.id))][followVideoIdx]
        : PLAZA_POSTS[followVideoIdx];
      if (currentPost && currentPost.type === 'video') {
        countdownTimerRef.current = setInterval(() => {
          setCountdown(c => {
            if (c <= 1) {
              if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
              setCountdownDone(true);
              onSetUserPoints(p => p + 2);
              return 0;
            }
            return c - 1;
          });
        }, 1000);
      }
      const timer = setInterval(() => {
        setVideoProgress(p => {
          if (p >= 100) {
            clearInterval(timer);
            return 100;
          }
          return p + 1;
        });
      }, 200); // 每200ms增加1%，约20秒完成
      return () => {
        clearInterval(timer);
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      };
    }
  }, [followVideoIdx, sub]);

  const followVideos = VIDEO_POSTS;
  const followCurrentVideo = followVideos[followVideoIdx];
  const plazaLeft = PLAZA_POSTS.filter((_, i) => i % 2 === 0);
  const plazaRight = PLAZA_POSTS.filter((_, i) => i % 2 === 1);

  const renderCard = (post: FollowPost, videoPool?: FollowPost[]) => (
    <button key={post.id}
      onClick={() => post.type === 'video' ? onOpenVideo(post, videoPool) : onOpenPost(post)}
      className="relative rounded-2xl overflow-hidden border-0 cursor-pointer p-0 text-left w-full"
      style={{ background: 'white', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
      <div className="relative">
        <img
          src={`https://picsum.photos/seed/${post.coverSeed}/200/${post.coverHeight}`}
          alt=""
          className="w-full object-cover"
          style={{ height: Math.round(post.coverHeight * 0.85) }}
        />
        {post.type === 'video' && (
          <div className="absolute top-2 right-2 flex items-center justify-center rounded-full"
            style={{ width: 28, height: 28, background: 'rgba(0,0,0,0.48)' }}>
            <PlayCircleFilled style={{ fontSize: 18, color: 'white' }} />
          </div>
        )}
      </div>
      <div className="px-2.5 py-2">
        <div style={{ fontSize: 13, color: '#1A1A1A', lineHeight: 1.5, fontWeight: 500, marginBottom: 6 }}>{post.title}</div>
        {/* 互动指标：两列布局 */}
        <div className="flex items-center justify-between" style={{ fontSize: 11 }}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" style={{ color: '#999' }}>
              <MessageOutlined style={{ fontSize: 11 }} />
              <span>{post.comments ?? 0}</span>
            </span>
            <span className="flex items-center gap-1" style={{ color: '#FF6B35' }}>
              <HeartOutlined style={{ fontSize: 11 }} />
              <span>{post.likes}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" style={{ color: '#999' }}>
              <StarOutlined style={{ fontSize: 11 }} />
              <span>{post.saves ?? 0}</span>
            </span>
            <span className="flex items-center gap-1" style={{ color: '#999' }}>
              <ShareAltOutlined style={{ fontSize: 11 }} />
              <span>{post.shares ?? 0}</span>
            </span>
          </div>
        </div>
      </div>
    </button>
  );

  return (
    <div className="flex flex-col" style={{ background: (sub === 'follow' || sub === 'plaza') ? '#000' : 'white', position: 'relative', height: '100%' }}>
      {/* Sub tab nav — 无边框，底部短线条指示器，右侧搜索图标（5项加宽间距） */}
      <div className="flex items-end justify-between px-0 flex-shrink-0" style={{ borderBottom: '1px solid transparent', position: 'relative', zIndex: 35, background: 'transparent' }}>
        <div className="flex items-end">
          {BAYU_SUBS.map((s) => (
            <div key={s.id} onClick={() => setSub(s.id)} className="relative cursor-pointer px-4 py-3.5 flex-shrink-0"
              style={{ fontSize: 16, fontWeight: sub === s.id ? 600 : 400, color: sub === s.id ? '#FF6B35' : (sub === 'follow' || sub === 'plaza' ? 'white' : '#888888'), transition: 'color 0.2s' }}>
              {s.label}
              {sub === s.id && (
                <div style={{
                  position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                  width: '70%', height: 3, borderRadius: '2px 2px 0 0',
                  background: '#FF6B35'
                }} />
              )}
            </div>
          ))}
        </div>
        <button className="self-center border-0 bg-transparent cursor-pointer p-1" onClick={() => onNavigate('bayu-search')}>
          <SearchOutlined style={{ fontSize: 22, color: sub === 'follow' || sub === 'plaza' ? 'white' : '#1A1A1A' }} />
        </button>
      </div>

      {/* ── Follow tab — Douyin full-screen feed (视频+图文混排) ── */}
      {sub === 'follow' && ([...HOT_POSTS, ...PLAZA_POSTS.filter(p => !HOT_POSTS.find(h => h.id === p.id))][followVideoIdx]) && (
        <div className="flex flex-col overflow-hidden relative" style={{ background: '#000', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 31 }}
          onWheel={(e) => {
            e.preventDefault();
            if (!followVideoWheelLock.current) {
              const feed = [...HOT_POSTS, ...PLAZA_POSTS.filter(p => !HOT_POSTS.find(h => h.id === p.id))];
              if (e.deltaY > 20) {
                const nextIdx = followVideoIdx < feed.length - 1 ? followVideoIdx + 1 : followVideoIdx;
                const currentPost = feed[followVideoIdx];
                if (nextIdx !== followVideoIdx) onVideoSwitch(currentPost.id, currentPost.type === 'video');
                followVideoWheelLock.current = true;
                setFollowVideoIdx(nextIdx);
                setTimeout(() => followVideoWheelLock.current = false, 600);
              }
              else if (e.deltaY < -20) {
                followVideoWheelLock.current = true;
                setFollowVideoIdx(i => i > 0 ? i - 1 : i);
                setTimeout(() => followVideoWheelLock.current = false, 600);
              }
            }
          }}
          onTouchStart={(e) => { followVideoTouchStartY.current = e.touches[0].clientY; }}
          onTouchEnd={(e) => {
            if (followVideoTouchStartY.current === null) return;
            const delta = followVideoTouchStartY.current - e.changedTouches[0].clientY;
            const feed = [...HOT_POSTS, ...PLAZA_POSTS.filter(p => !HOT_POSTS.find(h => h.id === p.id))];
            if (Math.abs(delta) > 50) {
              if (delta > 0 && followVideoIdx < feed.length - 1) {
                setFollowVideoIdx(i => i + 1);
              }
              else if (delta < 0 && followVideoIdx > 0) setFollowVideoIdx(i => i - 1);
            }
            followVideoTouchStartY.current = null;
          }}>
          {(() => {
            const currentPost = [...HOT_POSTS, ...PLAZA_POSTS.filter(p => !HOT_POSTS.find(h => h.id === p.id))][followVideoIdx];
            const isVideo = currentPost.type === 'video';
            return (
            <>
              <img
                src={`https://picsum.photos/seed/${currentPost.images?.[followImageIdx[currentPost.id] ?? 0] ?? currentPost.coverSeed}/390/844`}
                alt=""
                className="absolute"
                style={{ top: 0, left: 0, width: '100%', height: '100%', objectFit: 'fill', opacity: 0.85 }}
              />
              {/* 视频：显示播放按钮；图文：不显示 */}
              {isVideo && (
                <>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.55) 100%)' }} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex items-center justify-center rounded-full"
                      style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)' }}>
                      <PlayCircleFilled style={{ fontSize: 48, color: 'white' }} />
                    </div>
                  </div>
                  {/* 5秒圆圈倒计时（右上角，往下移动避免与搜索按钮重叠） */}
                  {countdown > 0 && (
                    <div className="absolute right-3 z-20 flex items-center justify-center" style={{ width: 44, height: 44, top: 56 }}>
                      <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                        <circle
                          cx="22" cy="22" r="18"
                          fill="none" stroke="#FF6B35" strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 18}`}
                          strokeDashoffset={`${2 * Math.PI * 18 * (1 - countdown / 5)}`}
                          style={{ transition: 'stroke-dashoffset 1s linear' }}
                        />
                      </svg>
                      <span className="absolute" style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>{countdown}</span>
                    </div>
                  )}
                  {/* 倒计时完成后显示获得积分效果 */}
                  {countdownDone && (
                    <div className="absolute right-3 z-20 flex items-center justify-center rounded-full"
                      style={{ height: 44, top: 56, paddingLeft: 12, paddingRight: 12, background: 'rgba(255,107,53,0.85)', backdropFilter: 'blur(4px)' }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: 'white', whiteSpace: 'nowrap' }}>+15分</span>
                    </div>
                  )}
                </>
              )}
              {/* 非视频时也加一点渐变遮罩 */}
              {!isVideo && (
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.45) 100%)' }} />
              )}
              {/* Right side actions */}
              <div className="absolute right-3 z-20 flex flex-col items-center gap-5" style={{ bottom: 120 }}>
                <div className="flex flex-col items-center gap-0.5 border-0 bg-transparent p-0">
                  <button onClick={() => onOpenUserProfile(currentPost.userId)}
                    className="flex items-center justify-center rounded-full text-white font-bold cursor-pointer"
                    style={{ width: 48, height: 48, background: currentPost.avatarColor, fontSize: 16, border: '2px solid white' }}>{currentPost.avatar}</button>
                  {followedUsers[currentPost.userId] !== 'done' && (
                    <button
                      onClick={() => {
                        if (!followedUsers[currentPost.userId]) {
                          setFollowedUsers(prev => ({ ...prev, [currentPost.userId]: 'checking' }));
                          setTimeout(() => setFollowedUsers(prev => ({ ...prev, [currentPost.userId]: 'done' })), 2000);
                        }
                      }}
                      className="flex items-center justify-center rounded-full text-white font-bold cursor-pointer transition-all"
                      style={{
                        width: 20, height: 20,
                        background: followedUsers[currentPost.userId] === 'checking' ? '#52C41A' : PRIMARY,
                        fontSize: followedUsers[currentPost.userId] === 'checking' ? 14 : 13,
                        marginTop: -10, border: '1.5px solid white',
                        transform: followedUsers[currentPost.userId] === 'checking' ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.15s, background 0.15s',
                      }}>
                      {followedUsers[currentPost.userId] === 'checking' ? '✓' : '+'}
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setFollowLiked(l => ({ ...l, [currentPost.id]: !l[currentPost.id] }))}
                  className="flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer p-0"
                  style={{ color: followLiked[currentPost.id] ? '#FF4D4F' : 'white' }}>
                  {followLiked[currentPost.id] ? <HeartFilled style={{ fontSize: 34 }} /> : <HeartOutlined style={{ fontSize: 34 }} />}
                  <span style={{ fontSize: 12, color: 'white' }}>{currentPost.likes + (followLiked[currentPost.id] ? 1 : 0)}</span>
                </button>
                <button
                  onClick={() => onOpenPost(currentPost)}
                  className="flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer p-0" style={{ color: 'white' }}>
                  <CommentOutlined style={{ fontSize: 32 }} />
                  <span style={{ fontSize: 12 }}>{currentPost.comments ?? 0}</span>
                </button>
                <button
                  onClick={() => setFollowSaved(s => ({ ...s, [currentPost.id]: !s[currentPost.id] }))}
                  className="flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer p-0"
                  style={{ color: followSaved[currentPost.id] ? '#FAAD14' : 'white' }}>
                  {followSaved[currentPost.id] ? <StarFilled style={{ fontSize: 32 }} /> : <StarOutlined style={{ fontSize: 32 }} />}
                  <span style={{ fontSize: 12, color: 'white' }}>{currentPost.saves ?? 0}</span>
                </button>
                <button
                  onClick={() => onShare()}
                  className="flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer p-0" style={{ color: 'white' }}>
                  <ShareAltOutlined style={{ fontSize: 32 }} />
                  <span style={{ fontSize: 12 }}>{currentPost.shares ?? 0}</span>
                </button>
              </div>
              {/* Bottom info */}
              <div className="absolute left-0 right-0 z-20 px-4 pb-4" style={{ bottom: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 6 }}>@{currentPost.user}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, paddingRight: 64 }}>{currentPost.title}</div>
                {/* 视频进度条（仅视频帖显示，放在标题下方） */}
                {isVideo && (
                  <div className="mt-3">
                    {/* 进度条 */}
                    <div className="relative" style={{ height: 3, background: 'rgba(255,255,255,0.3)', borderRadius: 2 }}>
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: '100%',
                          width: `${videoProgress}%`,
                          background: '#FF6B35',
                          borderRadius: 2,
                          transition: 'width 0.2s linear',
                        }}
                      />
                    </div>
                    {/* 时间显示 */}
                    <div className="flex justify-between mt-1.5" style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>
                      <span>{Math.floor(videoProgress * 0.2)}:{String(Math.floor((videoProgress * 0.2 * 60) % 60)).padStart(2, '0')}</span>
                      <span>0:20</span>
                    </div>
                  </div>
                )}
                {!isVideo && (
                  <button
                    onClick={() => onOpenPost(currentPost)}
                    className="flex items-center justify-center gap-2 border-0 cursor-pointer active:scale-95 mt-3"
                    style={{ height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)', fontSize: 15, fontWeight: 600, color: 'white', paddingLeft: 20, paddingRight: 20 }}>
                    <EyeOutlined style={{ fontSize: 16 }} /> 查看详情
                  </button>
                )}
                {/* 图片缩略图横向滚动条 */}
                {!isVideo && currentPost.images && currentPost.images.length > 1 && (
                  <div
                    className="flex gap-4 justify-center mt-4"
                    style={{ paddingLeft: 16, paddingRight: 16 }}
                  >
                    {currentPost.images.map((_, imgIdx) => {
                      const curIdx = followImageIdx[currentPost.id] ?? 0;
                      const isActive = imgIdx === curIdx;
                      return (
                        <div
                          key={imgIdx}
                          className="cursor-pointer transition-all"
                          style={{
                            width: 36,
                            height: 5,
                            borderRadius: 3,
                            background: isActive ? 'white' : 'rgba(255,255,255,0.35)',
                          }}
                          onClick={() => setFollowImageIdx(prev => ({ ...prev, [currentPost.id]: imgIdx }))}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </>
            );
          })()}
        </div>
      )}

      {/* ── Plaza tab — 全屏浏览模式，与熟人Tab完全一致 ── */}
      {sub === 'plaza' && PLAZA_POSTS[followVideoIdx] && (
        <div className="flex flex-col overflow-hidden relative" style={{ background: '#000', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 31 }}
          onWheel={(e) => {
            e.preventDefault();
            if (!followVideoWheelLock.current) {
              const feed = PLAZA_POSTS;
              if (e.deltaY > 20) {
                const nextIdx = followVideoIdx < feed.length - 1 ? followVideoIdx + 1 : followVideoIdx;
                const currentPost = PLAZA_POSTS[followVideoIdx];
                if (nextIdx !== followVideoIdx) onVideoSwitch(currentPost.id, currentPost.type === 'video');
                followVideoWheelLock.current = true;
                setFollowVideoIdx(nextIdx);
                setTimeout(() => followVideoWheelLock.current = false, 600);
              }
              else if (e.deltaY < -20) { followVideoWheelLock.current = true; setFollowVideoIdx(i => i > 0 ? i - 1 : i); setTimeout(() => followVideoWheelLock.current = false, 600); }
            }
          }}
          onTouchStart={(e) => { followVideoTouchStartY.current = e.touches[0].clientY; }}
          onTouchEnd={(e) => {
            if (followVideoTouchStartY.current === null) return;
            const delta = followVideoTouchStartY.current - e.changedTouches[0].clientY;
            const feed = PLAZA_POSTS;
            if (Math.abs(delta) > 50) {
              if (delta > 0 && followVideoIdx < feed.length - 1) {
                setFollowVideoIdx(i => i + 1);
              }
              else if (delta < 0 && followVideoIdx > 0) setFollowVideoIdx(i => i - 1);
            }
            followVideoTouchStartY.current = null;
          }}>
          {(() => {
            const currentPost = PLAZA_POSTS[followVideoIdx];
            const isVideo = currentPost.type === 'video';
            return (
            <>
              <img
                src={`https://picsum.photos/seed/${currentPost.images?.[followImageIdx[currentPost.id] ?? 0] ?? currentPost.coverSeed}/390/844`}
                alt=""
                className="absolute"
                style={{ top: 0, left: 0, width: '100%', height: '100%', objectFit: 'fill', opacity: 0.85 }}
              />
              {isVideo && (
                <>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.55) 100%)' }} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex items-center justify-center rounded-full"
                      style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)' }}>
                      <PlayCircleFilled style={{ fontSize: 48, color: 'white' }} />
                    </div>
                  </div>
                  {/* 5秒圆圈倒计时（右上角，往下移动避免与搜索按钮重叠） */}
                  {countdown > 0 && (
                    <div className="absolute right-3 z-20 flex items-center justify-center" style={{ width: 44, height: 44, top: 56 }}>
                      <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                        <circle
                          cx="22" cy="22" r="18"
                          fill="none" stroke="#FF6B35" strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 18}`}
                          strokeDashoffset={`${2 * Math.PI * 18 * (1 - countdown / 5)}`}
                          style={{ transition: 'stroke-dashoffset 1s linear' }}
                        />
                      </svg>
                      <span className="absolute" style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>{countdown}</span>
                    </div>
                  )}
                  {/* 倒计时完成后显示获得积分效果 */}
                  {countdownDone && (
                    <div className="absolute right-3 z-20 flex items-center justify-center rounded-full"
                      style={{ height: 44, top: 56, paddingLeft: 12, paddingRight: 12, background: 'rgba(255,107,53,0.85)', backdropFilter: 'blur(4px)' }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: 'white', whiteSpace: 'nowrap' }}>+15分</span>
                    </div>
                  )}
                </>
              )}
              {!isVideo && (
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.45) 100%)' }} />
              )}
              <div className="absolute right-3 z-20 flex flex-col items-center gap-5" style={{ bottom: 120 }}>
                <div className="flex flex-col items-center gap-0.5 border-0 bg-transparent p-0">
                  <button onClick={() => onOpenUserProfile(currentPost.userId)}
                    className="flex items-center justify-center rounded-full text-white font-bold cursor-pointer"
                    style={{ width: 48, height: 48, background: currentPost.avatarColor, fontSize: 16, border: '2px solid white' }}>{currentPost.avatar}</button>
                  {followedUsers[currentPost.userId] !== 'done' && (
                    <button
                      onClick={() => {
                        if (!followedUsers[currentPost.userId]) {
                          setFollowedUsers(prev => ({ ...prev, [currentPost.userId]: 'checking' }));
                          setTimeout(() => setFollowedUsers(prev => ({ ...prev, [currentPost.userId]: 'done' })), 2000);
                        }
                      }}
                      className="flex items-center justify-center rounded-full text-white font-bold cursor-pointer transition-all"
                      style={{
                        width: 20, height: 20,
                        background: followedUsers[currentPost.userId] === 'checking' ? '#52C41A' : PRIMARY,
                        fontSize: followedUsers[currentPost.userId] === 'checking' ? 14 : 13,
                        marginTop: -10, border: '1.5px solid white',
                        transform: followedUsers[currentPost.userId] === 'checking' ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.15s, background 0.15s',
                      }}>
                      {followedUsers[currentPost.userId] === 'checking' ? '✓' : '+'}
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setFollowLiked(l => ({ ...l, [currentPost.id]: !l[currentPost.id] }))}
                  className="flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer p-0"
                  style={{ color: followLiked[currentPost.id] ? '#FF4D4F' : 'white' }}>
                  {followLiked[currentPost.id] ? <HeartFilled style={{ fontSize: 34 }} /> : <HeartOutlined style={{ fontSize: 34 }} />}
                  <span style={{ fontSize: 12, color: 'white' }}>{currentPost.likes + (followLiked[currentPost.id] ? 1 : 0)}</span>
                </button>
                <button
                  onClick={() => onOpenPost(currentPost)}
                  className="flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer p-0" style={{ color: 'white' }}>
                  <CommentOutlined style={{ fontSize: 32 }} />
                  <span style={{ fontSize: 12 }}>{currentPost.comments ?? 0}</span>
                </button>
                <button
                  onClick={() => setFollowSaved(s => ({ ...s, [currentPost.id]: !s[currentPost.id] }))}
                  className="flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer p-0"
                  style={{ color: followSaved[currentPost.id] ? '#FAAD14' : 'white' }}>
                  {followSaved[currentPost.id] ? <StarFilled style={{ fontSize: 32 }} /> : <StarOutlined style={{ fontSize: 32 }} />}
                  <span style={{ fontSize: 12, color: 'white' }}>{currentPost.saves ?? 0}</span>
                </button>
                <button
                  onClick={() => onShare()}
                  className="flex flex-col items-center gap-1 border-0 bg-transparent cursor-pointer p-0" style={{ color: 'white' }}>
                  <ShareAltOutlined style={{ fontSize: 32 }} />
                  <span style={{ fontSize: 12 }}>{currentPost.shares ?? 0}</span>
                </button>
              </div>
              <div className="absolute left-0 right-0 z-20 px-4 pb-4" style={{ bottom: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 6 }}>@{currentPost.user}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, paddingRight: 64 }}>{currentPost.title}</div>
                {isVideo && (
                  <div className="mt-3">
                    <div className="relative" style={{ height: 3, background: 'rgba(255,255,255,0.3)', borderRadius: 2 }}>
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: '100%',
                          width: `${videoProgress}%`,
                          background: '#FF6B35',
                          borderRadius: 2,
                          transition: 'width 0.2s linear',
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5" style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>
                      <span>{Math.floor(videoProgress * 0.2)}:{String(Math.floor((videoProgress * 0.2 * 60) % 60)).padStart(2, '0')}</span>
                      <span>0:20</span>
                    </div>
                  </div>
                )}
                {!isVideo && (
                  <button
                    onClick={() => onOpenPost(currentPost)}
                    className="flex items-center justify-center gap-2 border-0 cursor-pointer active:scale-95 mt-3"
                    style={{ height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)', fontSize: 15, fontWeight: 600, color: 'white', paddingLeft: 20, paddingRight: 20 }}>
                    <EyeOutlined style={{ fontSize: 16 }} /> 查看详情
                  </button>
                )}
                {!isVideo && currentPost.images && currentPost.images.length > 1 && (
                  <div className="flex gap-4 justify-center mt-4" style={{ paddingLeft: 16, paddingRight: 16 }}>
                    {currentPost.images.map((_, imgIdx) => {
                      const curIdx = followImageIdx[currentPost.id] ?? 0;
                      const isActive = imgIdx === curIdx;
                      return (
                        <div key={imgIdx} className="cursor-pointer transition-all"
                          style={{ width: 36, height: 5, borderRadius: 3, background: isActive ? 'white' : 'rgba(255,255,255,0.35)' }}
                          onClick={() => setFollowImageIdx(prev => ({ ...prev, [currentPost.id]: imgIdx }))} />
                      );
                    })}
                  </div>
                )}
              </div>
            </>
            );
          })()}
        </div>
      )}

      {/* ── Hot tab — ranking sub-tabs ── */}
      {sub === 'hot' && (
        <div className="flex flex-col" style={{ height: '100%' }}>
          {/* 排名子 Tab 栏 — 标签形式 */}
          <div className="flex items-center gap-2 px-3 py-3 flex-shrink-0 overflow-x-auto" style={{ background: '#F5F4F0' }}>
            {([
              { id: 'news' as RankSubTab, label: '巴渝头条' },
              { id: 'labor' as RankSubTab, label: '巴渝劳模' },
              { id: 'star' as RankSubTab, label: '巴渝名人' },
              { id: 'active' as RankSubTab, label: '巴渝豁棒' },
            ]).map((s) => (
              <button key={s.id} onClick={() => setRankSubTab(s.id)}
                className="flex-shrink-0 rounded-full cursor-pointer border-0 transition-all"
                style={{
                  padding: '7px 18px',
                  fontSize: 14,
                  fontWeight: rankSubTab === s.id ? 600 : 400,
                  background: rankSubTab === s.id ? '#FF6B35' : 'white',
                  color: rankSubTab === s.id ? 'white' : '#666666',
                  border: rankSubTab === s.id ? 'none' : '1px solid #DDDDDD',
                  boxShadow: rankSubTab === s.id ? '0 2px 8px rgba(255,107,53,0.25)' : '0 1px 3px rgba(0,0,0,0.06)',
                  whiteSpace: 'nowrap',
                }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* ── 巴渝头条 ── */}
          {rankSubTab === 'news' && (
            <div className="flex-1 overflow-y-auto p-3 pb-4" style={{ background: '#F5F4F0' }}>
              {BAYUTOU_NEWS.map((news) => (
                <button key={news.id}
                  onClick={() => onOpenPost({
                    id: news.id,
                    userId: 0,
                    user: news.source,
                    avatar: news.source[0],
                    avatarColor: '#FA8C16',
                    type: 'image',
                    coverSeed: news.cover,
                    coverHeight: 88,
                    title: news.title,
                    likes: news.likes,
                  })}
                  className="w-full flex gap-3 p-3 mb-2.5 rounded-2xl border-0 cursor-pointer text-left active:scale-[0.98] transition-transform"
                  style={{ background: 'white', boxShadow: '0 1px 5px rgba(0,0,0,0.06)' }}>
                  {/* 封面图 */}
                  <div className="flex-shrink-0 rounded-xl overflow-hidden" style={{ width: 88, height: 88 }}>
                    <img src={`https://picsum.photos/seed/${news.cover}/176/176`} alt="" className="w-full h-full object-cover" />
                  </div>
                  {/* 文字内容 */}
                  <div className="flex-1 flex flex-col justify-between py-0.5" style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.5 }} className="line-clamp-2">{news.title}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="rounded px-1.5 py-0.5 text-white font-medium" style={{ fontSize: 10, background: '#FA8C16' }}>{news.source}</span>
                        <span style={{ fontSize: 11, color: '#BBBBBB' }}>{news.publishTime}</span>
                      </div>
                      <span className="flex items-center gap-0.5" style={{ fontSize: 12, color: '#999' }}>
                        <LikeOutlined style={{ fontSize: 12, color: '#FF6B35' }} />{news.likes.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── 巴渝劳模 / 名人 / 豁棒 ── */}
          {rankSubTab === 'labor' && (
            <div className="flex-1 overflow-y-auto p-3 pb-4" style={{ background: '#F5F4F0' }}>
              {BAYUTOU_LABOR.map((user, idx) => (
                <button key={user.id}
                  onClick={() => onOpenUserProfile(user.id)}
                  className="w-full flex items-center gap-3 p-3 mb-2.5 rounded-2xl border-0 cursor-pointer text-left active:scale-[0.98] transition-transform"
                  style={{ background: 'white', boxShadow: '0 1px 5px rgba(0,0,0,0.06)' }}>
                  {/* 排名徽章 */}
                  <div className="flex items-center justify-center rounded-lg font-black text-white flex-shrink-0"
                    style={{ width: 28, height: 28, fontSize: 13,
                      background: idx === 0 ? '#FF4D4F' : idx === 1 ? '#FA8C16' : idx === 2 ? '#FAAD14' : 'rgba(0,0,0,0.42)' }}>
                    {idx + 1}
                  </div>
                  {/* 头像 */}
                  <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 cursor-pointer"
                    style={{ width: 48, height: 48, background: user.avatarColor, fontSize: 18 }}>{user.avatar}</div>
                  {/* 文字信息 */}
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <div className="flex items-center gap-1.5">
                      <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{user.name}</span>
                      <span style={{ fontSize: 12, color: '#AAAAAA' }}>{user.ip}</span>
                    </div>
                  </div>
                  <div className="rounded-full px-3 py-1.5 text-white font-medium flex-shrink-0"
                    style={{ fontSize: 12, background: '#FF6B35' }}>关注</div>
                </button>
              ))}
            </div>
          )}

          {rankSubTab === 'star' && (
            <div className="flex-1 overflow-y-auto p-3 pb-4" style={{ background: '#F5F4F0' }}>
              {BAYUTOU_CELEBRITY.map((user, idx) => (
                <button key={user.id}
                  onClick={() => onOpenUserProfile(user.id)}
                  className="w-full flex items-center gap-3 p-3 mb-2.5 rounded-2xl border-0 cursor-pointer text-left active:scale-[0.98] transition-transform"
                  style={{ background: 'white', boxShadow: '0 1px 5px rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center justify-center rounded-lg font-black text-white flex-shrink-0"
                    style={{ width: 28, height: 28, fontSize: 13,
                      background: idx === 0 ? '#FF4D4F' : idx === 1 ? '#FA8C16' : idx === 2 ? '#FAAD14' : 'rgba(0,0,0,0.42)' }}>
                    {idx + 1}
                  </div>
                  <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 cursor-pointer"
                    style={{ width: 48, height: 48, background: user.avatarColor, fontSize: 18 }}>{user.avatar}</div>
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <div className="flex items-center gap-1.5">
                      <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{user.name}</span>
                      <span style={{ fontSize: 12, color: '#AAAAAA' }}>{user.ip}</span>
                    </div>
                  </div>
                  <div className="rounded-full px-3 py-1.5 text-white font-medium flex-shrink-0"
                    style={{ fontSize: 12, background: '#FF6B35' }}>关注</div>
                </button>
              ))}
            </div>
          )}

          {rankSubTab === 'active' && (
            <div className="flex-1 overflow-y-auto p-3 pb-4" style={{ background: '#F5F4F0' }}>
              {BAYUTOU_ACTIVE.map((user, idx) => (
                <button key={user.id}
                  onClick={() => onOpenUserProfile(user.id)}
                  className="w-full flex items-center gap-3 p-3 mb-2.5 rounded-2xl border-0 cursor-pointer text-left active:scale-[0.98] transition-transform"
                  style={{ background: 'white', boxShadow: '0 1px 5px rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center justify-center rounded-lg font-black text-white flex-shrink-0"
                    style={{ width: 28, height: 28, fontSize: 13,
                      background: idx === 0 ? '#FF4D4F' : idx === 1 ? '#FA8C16' : idx === 2 ? '#FAAD14' : 'rgba(0,0,0,0.42)' }}>
                    {idx + 1}
                  </div>
                  <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 cursor-pointer"
                    style={{ width: 48, height: 48, background: user.avatarColor, fontSize: 18 }}>{user.avatar}</div>
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <div className="flex items-center gap-1.5">
                      <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{user.name}</span>
                      <span style={{ fontSize: 12, color: '#AAAAAA' }}>{user.ip}</span>
                    </div>
                  </div>
                  <div className="rounded-full px-3 py-1.5 text-white font-medium flex-shrink-0"
                    style={{ fontSize: 12, background: '#FF6B35' }}>关注</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Chatroom tab（霍圈子）── */}
      {sub === 'chatroom' && (
        <div className="flex flex-col" style={{ background: PAGE_BG, height: '100%', position: 'relative' }}>
          {/* 列表区域 */}
          <div className="flex-1 overflow-y-auto pt-3" style={{ minHeight: 0 }}>
            <div className="flex flex-col gap-3 px-4 pb-4" style={{ paddingBottom: 100 }}>
              {/* 创建新圈子入口 */}
              <div className="rounded-2xl flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
                style={{ background: '#FFF7F2', padding: '14px 18px', border: `1.5px dashed ${PRIMARY}35` }}
                onClick={() => setShowCreateRoom(true)}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center rounded-xl" style={{ width: 46, height: 46, background: `${PRIMARY}12`, border: `1px dashed ${PRIMARY}40` }}>
                    <PlusOutlined style={{ fontSize: 24, color: PRIMARY }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>创建新圈子</div>
                    <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>找到志同道合的朋友</div>
                  </div>
                </div>
                <div style={{ fontSize: 22, color: PRIMARY, fontWeight: 300 }}>›</div>
              </div>
              {/* 房间列表 */}
              {chatRooms.map(room => (
                <div key={room.id} className="rounded-2xl transition-all active:scale-[0.98]"
                  style={{ background: 'white', padding: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-xl flex-shrink-0"
                      style={{ width: 50, height: 50, background: `${room.color}12`, border: `1.5px solid ${room.color}30` }}>
                      <span style={{ fontSize: 22, color: room.color, fontWeight: 700 }}>{room.name[0]}</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center" style={{ minWidth: 0, gap: 4 }}>
                      <div className="flex items-center gap-2" style={{ minWidth: 0 }}>
                        <span className="truncate" style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', whiteSpace: 'nowrap' }}>{room.name}</span>
                        <span className="rounded-full px-1.5 py-0.5 flex-shrink-0" style={{ fontSize: 10, background: `${room.color}12`, color: room.color, whiteSpace: 'nowrap' }}>{room.tag}</span>
                        <span className="flex-shrink-0" style={{ fontSize: 11, color: '#CCC', marginLeft: 'auto', whiteSpace: 'nowrap' }}>{room.lastMessageTime}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ minWidth: 0 }}>
                        <span style={{ fontSize: 12, color: '#888', whiteSpace: 'nowrap' }}>{room.memberCount} 人</span>
                        <span style={{ fontSize: 12, color: '#52C41A', whiteSpace: 'nowrap' }}>● {room.onlineCount} 在线</span>
                      </div>
                      <div className="truncate" style={{ fontSize: 12, color: '#999', whiteSpace: 'nowrap' }}>{room.lastMessage}</div>
                    </div>
                    <button className="flex-shrink-0 rounded-full border-0 cursor-pointer active:scale-95 transition-transform"
                      style={{ padding: '7px 14px', background: PRIMARY, color: 'white', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}
                      onClick={() => onOpenChat(room.id)}>
                      进入聊天
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 创建圈子弹窗 - 限制在手机框内 */}
          {showCreateRoom && (
            <div className="absolute inset-0 flex items-end justify-center z-50" style={{ background: 'rgba(0,0,0,0.45)' }}>
              <div className="w-full rounded-t-3xl bg-white flex flex-col"
                style={{ maxHeight: '85%', animation: 'slideUp 0.2s ease' }}
                onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0" style={{ borderColor: '#F0F0F0' }}>
                  <span style={{ fontSize: 17, fontWeight: 700 }}>创建新圈子</span>
                  <button className="border-0 bg-transparent cursor-pointer" onClick={() => setShowCreateRoom(false)}>
                    <CloseOutlined style={{ fontSize: 18, color: '#999' }} />
                  </button>
                </div>
                <div className="px-5 py-4 flex flex-col gap-4 overflow-y-auto" style={{ flex: 1 }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>圈子名称</div>
                    <input className="w-full rounded-xl border px-3 py-2.5" style={{ borderColor: '#E8E8E8', fontSize: 15 }}
                      placeholder="给你的圈子起个名字" value={newRoomForm.name}
                      onChange={e => setNewRoomForm(prev => ({ ...prev, name: e.target.value }))} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>圈子简介</div>
                    <input className="w-full rounded-xl border px-3 py-2.5" style={{ borderColor: '#E8E8E8', fontSize: 15 }}
                      placeholder="简单介绍一下这个圈子" value={newRoomForm.description}
                      onChange={e => setNewRoomForm(prev => ({ ...prev, description: e.target.value }))} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>标签</div>
                    <div className="flex flex-wrap gap-2">
                      {ROOM_TAGS.map(tag => (
                        <span key={tag} onClick={() => setNewRoomForm(prev => ({ ...prev, tag: prev.tag === tag ? '' : tag }))}
                          className="rounded-full px-3 py-1 cursor-pointer transition-all"
                          style={{ fontSize: 13, background: newRoomForm.tag === tag ? PRIMARY : '#F5F5F5', color: newRoomForm.tag === tag ? 'white' : '#666', border: newRoomForm.tag === tag ? `1px solid ${PRIMARY}` : '1px solid #E8E8E8' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: '1px solid #F0F0F0' }}>
                  <button onClick={() => {
                    if (!newRoomForm.name.trim()) return;
                    const colors = ['#FF6B35', '#1677FF', '#52C41A', '#722ED1', '#EB2F96', '#FA8C16', '#08979C', '#D4380D'];
                    const newRoom: ChatRoom = {
                      id: `r${Date.now()}`, name: newRoomForm.name.trim(),
                      description: newRoomForm.description.trim() || '新的圈子，欢迎加入', tag: newRoomForm.tag || '社交',
                      color: colors[Math.floor(Math.random() * colors.length)], onlineCount: 1, memberCount: 1,
                      lastMessage: '圈子刚建立，快来聊天吧！', lastMessageTime: '刚刚',
                    };
                    setChatRooms(prev => [newRoom, ...prev]);
                    setNewRoomForm({ name: '', description: '', tag: '' });
                    setShowCreateRoom(false);
                  }} disabled={!newRoomForm.name.trim()}
                    className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer transition-all active:scale-[0.98]"
                    style={{ fontSize: 16, padding: '12px 0', background: newRoomForm.name.trim() ? PRIMARY : '#D9D9D9', opacity: newRoomForm.name.trim() ? 1 : 0.5 }}>
                    创建圈子
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Community tab（社区）── */}
      {sub === 'community' && (
        /* 社区主页 — 分类标签墙 */
        <div className="flex flex-col" style={{ background: '#F5F5F5', height: '100%', overflow: 'hidden' }}>
          {/* 搜索栏 */}
          <div className="px-4 py-3 flex-shrink-0" style={{ background: 'white', borderBottom: '1px solid #F0F0F0' }}>
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl" style={{ background: '#F5F5F5' }}>
              <SearchOutlined style={{ fontSize: 16, color: '#999' }} />
              <input
                className="flex-1 border-0 bg-transparent outline-none"
                style={{ fontSize: 14, color: '#333' }}
                placeholder="搜索社区分类或视频"
                value={communitySearch}
                onChange={e => setCommunitySearch(e.target.value)}
              />
            </div>
          </div>
          {/* 分类卡片墙 */}
          <div className="flex-1 overflow-y-auto px-4 pt-4" style={{ minHeight: 0 }}>
            <div className="text-base font-semibold mb-3" style={{ color: '#1A1A1A' }}>全部分类</div>
            <div className="grid grid-cols-2 gap-2" style={{ paddingBottom: 100 }}>
              {COMMUNITY_CATEGORIES.filter(c => !communitySearch || c.name.includes(communitySearch) || c.description.includes(communitySearch)).map(cat => {
                const catVideos = COMMUNITY_VIDEOS.filter(v => v.categoryId === cat.id);
                return (
                  <div key={cat.id} onClick={() => onOpenCommunityDetail(cat.id)}
                    className="bg-white rounded-lg overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <div style={{ position: 'relative' }}>
                      <img src={cat.cover} alt={cat.name} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.55)', color: 'white', fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 500 }}>{cat.videoCount}个内容</span>
                    </div>
                    <div className="px-2.5 py-2">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span style={{ fontSize: 17 }}>{cat.icon}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{cat.name}</span>
                      </div>
                      <div>
                        <span style={{ fontSize: 12, color: '#999' }}>{cat.description}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 积分规则弹窗 */}
      {showPointRules && (
        <div className="flex items-center justify-center" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, background: 'rgba(0,0,0,0.6)' }} onClick={() => setShowPointRules(false)}>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'white', width: 320, margin: '0 auto' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid #F0F0F0' }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>刷视频积分规则</span>
              <button onClick={() => setShowPointRules(false)} className="border-0 bg-transparent cursor-pointer p-1">
                <CloseOutlined style={{ fontSize: 18, color: '#999' }} />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center rounded-xl" style={{ width: 44, height: 44, background: '#FFF4EF' }}>
                  <PlayCircleFilled style={{ fontSize: 24, color: '#FF6B35' }} />
                </div>
                <div className="flex-1">
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>看视频</div>
                  <div style={{ fontSize: 14, color: '#666' }}>每看完一个视频，获得 <span style={{ color: '#FF6B35', fontWeight: 700 }}>+2 积分</span></div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#999', lineHeight: 1.8, borderTop: '1px solid #F0F0F0', paddingTop: 16, marginTop: 4 }}>
                <div>• 滑动到下一个视频，视为看完</div>
                <div>• 同一视频只计算一次</div>
                <div>• 积分可兑换优惠券、平台礼品</div>
                <div>• 积分有效期：每年12月31日清零</div>
              </div>
            </div>
            <div className="p-4" style={{ borderTop: '1px solid #F0F0F0' }}>
              <button onClick={() => setShowPointRules(false)} className="w-full rounded-xl border-0 cursor-pointer text-white font-bold" style={{ height: 48, background: '#FF6B35', fontSize: 16 }}>
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// ── MESSAGES TAB ─────────────────────────────
// ─────────────────────────────────────────────
const MessagesTab: React.FC<{
  onOpenChat: (id: number) => void;
  onOpenContacts: () => void;
  onOpenNotifyLikes: () => void;
  onOpenNotifyThumbs: () => void;
  onOpenNotifyComments: () => void;
  onOpenNotifyFans: () => void;
}> = ({ onOpenChat, onOpenContacts, onOpenNotifyLikes, onOpenNotifyThumbs, onOpenNotifyComments, onOpenNotifyFans }) => (
  <div className="flex flex-col h-full" style={{ background: PAGE_BG }}>
    {/* 通知入口 4宫格 */}
    <div className="flex-shrink-0" style={{ background: 'white', borderBottom: '1px solid #F0F0F0', padding: '12px 8px 8px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
        {[
          { label: '喜欢', icon: <HeartFilled style={{ fontSize: 22, color: '#FF4D6A' }} />, bg: '#FFF0F3', onClick: onOpenNotifyLikes, badge: 2 },
          { label: '评论/@', icon: <MessageOutlined style={{ fontSize: 22, color: '#1677FF' }} />, bg: '#EFF5FF', onClick: onOpenNotifyComments, badge: 5 },
          { label: '收藏', icon: <HeartFilled style={{ fontSize: 22, color: '#FF6B35' }} />, bg: '#FFF4EE', onClick: onOpenNotifyThumbs, badge: 3 },
          { label: '粉丝', icon: <UserOutlined style={{ fontSize: 22, color: '#52C41A' }} />, bg: '#F0FBF0', onClick: onOpenNotifyFans, badge: 1 },
        ].map(entry => (
          <div key={entry.label} onClick={entry.onClick}
            className="flex flex-col items-center gap-1 py-2 rounded-xl cursor-pointer active:scale-95 relative"
            style={{ background: entry.bg, transition: 'transform 0.1s' }}>
            {entry.icon}
            <span style={{ fontSize: 12, color: '#555', fontWeight: 500 }}>{entry.label}</span>
            {entry.badge && (
              <div className="absolute flex items-center justify-center rounded-full text-white font-bold"
                style={{ top: 6, right: 6, minWidth: 18, height: 18, background: '#FF4D4F', fontSize: 11, padding: '0 4px' }}>
                +{entry.badge}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    {/* 通讯录 Entry */}
    <div className="flex-shrink-0" style={{ background: 'white', marginBottom: 8, borderBottom: '1px solid #F0F0F0' }}>
      <div onClick={onOpenContacts}
        className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-50">
        <div className="flex items-center justify-center rounded-2xl flex-shrink-0"
          style={{ width: 46, height: 46, background: 'linear-gradient(135deg, #FF6B35, #FF9A56)' }}>
          <ContactsOutlined style={{ fontSize: 22, color: 'white' }} />
        </div>
        <div style={{ flex: 1, fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>通讯录</div>
        <RightOutlined style={{ fontSize: 14, color: '#CCC' }} />
      </div>
    </div>
    {/* Chat List */}
    <div className="flex-1 overflow-y-auto">
      {CHATS.map((chat, idx) => (
        <div key={chat.id} onClick={() => onOpenChat(chat.id)}
          className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-50"
          style={{ background: 'white', borderBottom: idx < CHATS.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
          <div className="relative flex-shrink-0">
            {(chat as any).members ? (
              <div style={{ width: 50, height: 50, background: '#EDEDEE', borderRadius: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, padding: 3 }}>
                {[0, 1, 2, 3].map(function(i) {
                  var palette = ['#FF6B35','#1677FF','#52C41A','#FA8C16','#722ED1','#EB2F96','#13C2C2','#F5222D'];
                  var letters = ['李','张','王','陈','赵','刘','杨','黄'];
                  var colorIdx = (chat.id * 3 + i * 2) % palette.length;
                  return (
                    <div key={i} style={{ background: palette[colorIdx], borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white', fontWeight: 700 }}>
                      {letters[(chat.id + i) % letters.length]}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-2xl text-white font-bold"
                style={{ width: 50, height: 50, background: chat.color, fontSize: 18 }}>{chat.avatar}</div>
            )}
            {chat.unread > 0 && (
              <div className="absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white font-bold"
                style={{ minWidth: 18, height: 18, background: '#FF4D4F', fontSize: 11, padding: '0 4px' }}>{chat.unread}</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between" style={{ marginBottom: 3 }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>{chat.name}</span>
              <span style={{ fontSize: 12, color: '#BBB' }}>{chat.time}</span>
            </div>
            <div className="truncate" style={{ fontSize: 14, color: '#999' }}>{chat.msg}</div>
          </div>
        </div>
      ))}
      <div style={{ height: 20 }} />
    </div>
  </div>
);

// ─────────────────────────────────────────────
// ── FRIEND REQUESTS SCREEN ───────────────────
// ─────────────────────────────────────────────
const FriendRequestsScreen: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  const [requestStatus, setRequestStatus] = React.useState<{[id: number]: 'accepted' | 'rejected'}>({});

  return (
    <div className="flex flex-col h-full" style={{ background: PAGE_BG }}>
      {/* Nav Bar */}
      <div className="flex items-center px-4 flex-shrink-0" style={{ height: 52, background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ flex: 1, fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>新的朋友</div>
        <button className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <UserAddOutlined style={{ fontSize: 22, color: PRIMARY }} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="mt-2" style={{ background: 'white' }}>
          {FRIEND_REQUESTS.map((req, idx) => (
            <div key={req.id} className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: idx < FRIEND_REQUESTS.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
              <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
                style={{ width: 50, height: 50, background: req.color, fontSize: 17 }}>{req.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between" style={{ marginBottom: 2 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{req.name}</span>
                  <span style={{ fontSize: 12, color: '#BBB' }}>{req.time}</span>
                </div>
                <div className="truncate" style={{ fontSize: 13, color: '#999' }}>{req.msg}</div>
              </div>
              <div className="flex-shrink-0 ml-2">
                {requestStatus[req.id] === 'accepted' ? (
                  <span style={{ fontSize: 13, color: '#BBB' }}>已添加</span>
                ) : requestStatus[req.id] === 'rejected' ? (
                  <span style={{ fontSize: 13, color: '#BBB' }}>已拒绝</span>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setRequestStatus(s => ({ ...s, [req.id]: 'rejected' }))}
                      className="rounded-xl border cursor-pointer font-bold"
                      style={{ fontSize: 13, padding: '5px 12px', background: 'white', color: '#666', borderColor: '#DDD' }}>拒绝</button>
                    <button onClick={() => setRequestStatus(s => ({ ...s, [req.id]: 'accepted' }))}
                      className="rounded-xl border-0 cursor-pointer text-white font-bold"
                      style={{ background: PRIMARY, fontSize: 13, padding: '5px 12px' }}>接受</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── PINDAN SCREENS ──────────────────────────
// ─────────────────────────────────────────────

// 土货拼购主页
const PindanHomeScreen: React.FC<{
  onBack: () => void;
  onOpenActivity: (activity: PindanActivity) => void;
}> = ({ onBack, onOpenActivity }) => {
  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>土货拼购</span>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* 活动专场列表 */}
        <div className="flex flex-col gap-4 p-4 pb-6">
          {PINDAN_ACTIVITIES.map(activity => (
            <div key={activity.id} onClick={() => onOpenActivity(activity)} className="bg-white rounded-2xl overflow-hidden cursor-pointer active:opacity-90" style={{ border: '1px solid #EBEBEB' }}>
              <img src={activity.coverImage} alt={activity.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
              <div className="p-3">
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{activity.title}</div>
                <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>{activity.description}</div>
                <div className="flex items-center justify-between">
                  <div style={{ fontSize: 12, color: activity.status === 'ongoing' ? '#52C41A' : '#888' }}>
                    {activity.status === 'ongoing' ? '正在热拼' : activity.status === 'upcoming' ? '即将开始' : '已结束'}
                  </div>
                  <div style={{ fontSize: 13, color: '#666' }}>
                    剩余 <span style={{ color: '#E8302A', fontWeight: 700 }}>{activity.remainingQuota}</span> / {activity.totalQuota} 名额
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 专场详情页
const PindanActivityScreen: React.FC<{
  activity: PindanActivity;
  onBack: () => void;
  onOpenProduct: (product: PindanProduct) => void;
}> = ({ activity, onBack, onOpenProduct }) => {
  const products = PINDAN_PRODUCTS.filter(p => p.activityId === activity.id);

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>{activity.title}</span>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <img src={activity.coverImage} alt={activity.title} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
        <div className="p-3">
          <div style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>{activity.description}</div>
        </div>
        {/* 商品列表 */}
        <div className="flex flex-col gap-3 px-4 pb-6">
          {products.map(product => (
            <div key={product.id} onClick={() => onOpenProduct(product)} className="bg-white rounded-2xl overflow-hidden cursor-pointer active:opacity-90" style={{ border: '1px solid #EBEBEB' }}>
              <div className="flex gap-3 p-3">
                <img src={product.image} alt={product.name} style={{ width: 90, height: 90, borderRadius: 12, objectFit: 'cover' }} />
                <div className="flex-1">
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4 }}>{product.name}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#E8302A' }}>¥{product.pindanPrice}</span>
                    <span style={{ fontSize: 12, color: '#AAA', textDecoration: 'line-through' }}>¥{product.originalPrice}</span>
                  </div>
                  <div className="mt-2">
                    <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>已抢 {product.sold} 件，剩余 {product.stock} 件</div>
                    <div style={{ height: 6, background: '#F0F0F0', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(product.sold / (product.sold + product.stock)) * 100}%`, background: 'linear-gradient(90deg, #FF6B35, #E8302A)', borderRadius: 3 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 商品详情页
const PindanProductScreen: React.FC<{
  product: PindanProduct;
  quantity: number;
  onChangeQuantity: (q: number) => void;
  onBack: () => void;
  onBuyNow: () => void;
}> = ({ product, quantity, onChangeQuantity, onBack, onBuyNow }) => {
  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>商品详情</span>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <img src={product.image} alt={product.name} style={{ width: '100%', height: 280, objectFit: 'cover' }} />
        <div className="p-4 bg-white">
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>{product.name}</div>
          <div className="flex items-center gap-3 mb-4">
            <span style={{ fontSize: 24, fontWeight: 800, color: '#E8302A' }}>¥{product.pindanPrice}</span>
            <span style={{ fontSize: 14, color: '#AAA', textDecoration: 'line-through' }}>¥{product.originalPrice}</span>
            <span className="rounded px-2 py-1" style={{ fontSize: 12, background: '#FFF0E6', color: '#E8302A' }}>拼购价</span>
          </div>
          <div style={{ fontSize: 13, color: '#666', lineHeight: 1.8 }}>{product.description}</div>
        </div>
        <div className="mt-2 p-4 bg-white">
          <div style={{ fontSize: 14, color: '#888' }}>剩余库存 {product.stock} 件</div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3" style={{ background: 'white', borderTop: '1px solid #F0F0F0' }}>
        <div className="flex items-center gap-2">
          <button onClick={() => onChangeQuantity(Math.max(1, quantity - 1))} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #E8E8E8', background: 'white', fontSize: 18, cursor: 'pointer' }}>-</button>
          <span style={{ width: 40, textAlign: 'center', fontSize: 16, fontWeight: 600 }}>{quantity}</span>
          <button onClick={() => onChangeQuantity(quantity + 1)} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #E8E8E8', background: 'white', fontSize: 18, cursor: 'pointer' }}>+</button>
        </div>
        <button onClick={onBuyNow} className="flex-1 rounded-xl border-0 text-white font-bold cursor-pointer" style={{ height: 48, background: '#E8302A', fontSize: 16 }}>
          立即拼购 ¥{product.pindanPrice * quantity}
        </button>
      </div>
    </div>
  );
};

// 确认订单页
const PindanConfirmScreen: React.FC<{
  product: PindanProduct;
  quantity: number;
  onBack: () => void;
  onSubmitOrder: () => void;
}> = ({ product, quantity, onBack, onSubmitOrder }) => {
  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>确认订单</span>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* 收货地址 */}
        <div className="p-4 bg-white mb-2">
          <div className="flex items-center gap-2 mb-2">
            <EnvironmentOutlined style={{ color: '#E8302A' }} />
            <span style={{ fontSize: 15, fontWeight: 600 }}>收货地址</span>
          </div>
          <div style={{ fontSize: 14, color: '#1A1A1A' }}>张阿姨</div>
          <div style={{ fontSize: 13, color: '#666' }}>138****1234</div>
          <div style={{ fontSize: 13, color: '#888' }}>渝中区解放碑街道98号</div>
        </div>
        {/* 商品信息 */}
        <div className="p-4 bg-white">
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 12 }}>商品信息</div>
          <div className="flex gap-3">
            <img src={product.image} alt={product.name} style={{ width: 72, height: 72, borderRadius: 8, objectFit: 'cover' }} />
            <div className="flex-1">
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{product.name}</div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>×{quantity}</div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#E8302A' }}>¥{product.pindanPrice * quantity}</div>
          </div>
        </div>
        {/* 订单金额 */}
        <div className="mt-2 p-4 bg-white">
          <div className="flex justify-between items-center mb-2">
            <span style={{ fontSize: 14, color: '#666' }}>商品金额</span>
            <span style={{ fontSize: 14, color: '#1A1A1A' }}>¥{product.pindanPrice * quantity}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span style={{ fontSize: 14, color: '#666' }}>运费</span>
            <span style={{ fontSize: 14, color: '#52C41A' }}>免运费</span>
          </div>
          <div className="flex justify-between items-center pt-2" style={{ borderTop: '1px solid #F0F0F0' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>合计</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#E8302A' }}>¥{product.pindanPrice * quantity}</span>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="flex-shrink-0 flex items-center justify-end px-4 py-3" style={{ background: 'white', borderTop: '1px solid #F0F0F0' }}>
        <button onClick={onSubmitOrder} className="rounded-xl border-0 text-white font-bold cursor-pointer" style={{ height: 48, padding: '0 40px', background: '#E8302A', fontSize: 16 }}>
          提交订单
        </button>
      </div>
    </div>
  );
};

// 订单列表页
const PindanOrdersScreen: React.FC<{
  orders: PindanOrder[];
  filter: 'all' | 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  onChangeFilter: (f: typeof filter) => void;
  onBack: () => void;
  onViewDetail: (order: PindanOrder) => void;
  onPay: (orderId: number) => void;
  onReceive: (orderId: number) => void;
}> = ({ orders, filter, onChangeFilter, onBack, onViewDetail, onPay, onReceive }) => {
  const filterTabs = [
    { key: 'all', label: '全部' },
    { key: 'pending', label: '待付款' },
    { key: 'shipped', label: '待收货' },
    { key: 'completed', label: '已完成' },
    { key: 'cancelled', label: '已取消' },
  ];

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const getStatusText = (status: PindanOrder['status']) => {
    const map: Record<string, string> = { pending: '待付款', paid: '已付款', shipped: '待收货', completed: '已完成', cancelled: '已取消' };
    return map[status] || status;
  };

  const getStatusColor = (status: PindanOrder['status']) => {
    const map: Record<string, string> = { pending: '#E8302A', paid: '#1677FF', shipped: '#52C41A', completed: '#888', cancelled: '#AAA' };
    return map[status] || '#888';
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>我的订单</span>
      </div>
      {/* Filter Tabs */}
      <div className="flex-shrink-0 bg-white" style={{ borderBottom: '1px solid #F0F0F0' }}>
        <div className="flex">
          {filterTabs.map(tab => (
            <button key={tab.key} onClick={() => onChangeFilter(tab.key as typeof filter)} className="flex-1 py-3 border-0 cursor-pointer" style={{ fontSize: 14, fontWeight: filter === tab.key ? 600 : 400, color: filter === tab.key ? '#E8302A' : '#666', borderBottom: filter === tab.key ? '2px solid #E8302A' : '2px solid transparent' }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Order List */}
      <div className="flex-1 overflow-y-auto">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingOutlined style={{ fontSize: 48, color: '#DDD', marginBottom: 12 }} />
            <div style={{ fontSize: 14, color: '#AAA' }}>暂无订单</div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-4">
            {filteredOrders.map(order => (
              <div key={order.id} onClick={() => onViewDetail(order)} className="bg-white rounded-2xl overflow-hidden cursor-pointer" style={{ border: '1px solid #EBEBEB' }}>
                <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #F5F5F5' }}>
                  <span style={{ fontSize: 12, color: '#888' }}>{order.orderNo}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: getStatusColor(order.status) }}>{getStatusText(order.status)}</span>
                </div>
                <div className="px-4 py-3">
                  {order.products.map((p, idx) => (
                    <div key={idx} className="flex gap-3 mb-2">
                      <img src={p.image} alt={p.name} style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover' }} />
                      <div className="flex-1">
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: '#888' }}>×{p.quantity}</div>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>¥{p.price * p.quantity}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: '1px solid #F5F5F5' }}>
                  <span style={{ fontSize: 12, color: '#888' }}>{order.createdAt}</span>
                  {order.status === 'pending' && (
                    <button onClick={(e) => { e.stopPropagation(); onPay(order.id); }} className="rounded-full border-0 text-white cursor-pointer" style={{ height: 28, padding: '0 16px', background: '#E8302A', fontSize: 13, fontWeight: 600 }}>去支付</button>
                  )}
                  {order.status === 'shipped' && (
                    <button onClick={(e) => { e.stopPropagation(); onReceive(order.id); }} className="rounded-full border-0 text-white cursor-pointer" style={{ height: 28, padding: '0 16px', background: '#52C41A', fontSize: 13, fontWeight: 600 }}>确认收货</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 订单详情页
const PindanOrderDetailScreen: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  // 简化版：显示最新一个订单的详情
  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F5F5' }}>
      {/* Header */}
      <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>订单详情</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 bg-white mb-2">
          <div style={{ fontSize: 14, color: '#888' }}>订单详情页面建设中...</div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── NOTIFY LIKES SCREEN ──────────────────────
// ─────────────────────────────────────────────
const NotifyLikesScreen: React.FC<{
  onBack: () => void;
  onOpenPost: (post: FollowPost) => void;
  onOpenVideo: (post: FollowPost, pool?: FollowPost[]) => void;
  onOpenUserProfile: (userId: number) => void;
}> = ({ onBack, onOpenPost, onOpenVideo, onOpenUserProfile }) => {

  const handleOpen = (item: NotifyLikeItem) => {
    const post: FollowPost = {
      id: item.postId, userId: 0, user: '张大爷', avatar: '张', avatarColor: '#FF6B35',
      type: item.postType, coverSeed: item.coverSeed, coverHeight: 180, title: item.title, likes: 0, date: '',
    };
    if (item.postType === 'video') onOpenVideo(post);
    else onOpenPost(post);
  };
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: PAGE_BG }}>
      <div className="flex items-center px-4 flex-shrink-0" style={{ height: 52, background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ flex: 1, fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>喜欢</div>
        <div style={{ width: 28 }} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div style={{ background: 'white', marginTop: 8 }}>
          {NOTIFY_LIKES_DATA.map((item, idx) => (
            <div key={item.id}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-50"
              style={{ borderBottom: idx < NOTIFY_LIKES_DATA.length - 1 ? '1px solid #F5F5F5' : 'none' }}
              onClick={() => handleOpen(item)}>
              {/* 头像 */}
              <div
                className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 cursor-pointer"
                style={{ width: 48, height: 48, background: item.avatarColor, fontSize: 17 }}
                onClick={(e) => { e.stopPropagation(); onOpenUserProfile(item.userId); }}>
                {item.avatar}
              </div>
              {/* 文字 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between" style={{ marginBottom: 2 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{item.user}</span>
                  <span style={{ fontSize: 12, color: '#BBB' }}>{item.time}</span>
                </div>
                <div style={{ fontSize: 13, color: '#999' }}>
                  喜欢了你的{item.postType === 'video' ? '视频' : '图文'}
                </div>
                <div className="truncate mt-1" style={{ fontSize: 13, color: '#555' }}>{item.title}</div>
              </div>
              {/* 封面缩略图 */}
              <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 56, height: 56, position: 'relative' }}>
                <img src={`https://picsum.photos/seed/${item.coverSeed}/112/112`} alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {item.postType === 'video' && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PlayCircleOutlined style={{ fontSize: 20, color: 'white' }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── NOTIFY FAV SCREEN ────────────────────────
// ─────────────────────────────────────────────
const NotifyThumbsScreen: React.FC<{
  onBack: () => void;
  onOpenPost: (post: FollowPost) => void;
  onOpenUserProfile: (userId: number) => void;
}> = ({ onBack, onOpenPost, onOpenUserProfile }) => {
  const handleOpen = (item: NotifyFavItem) => {
    const post: FollowPost = {
      id: item.postId, userId: 0, user: '张大爷', avatar: '张', avatarColor: '#FF6B35',
      type: 'image', coverSeed: item.coverSeed, coverHeight: 180, title: item.title, likes: 0, date: '',
    };
    onOpenPost(post);
  };
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: PAGE_BG }}>
      <div className="flex items-center px-4 flex-shrink-0" style={{ height: 52, background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ flex: 1, fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>收藏</div>
        <div style={{ width: 28 }} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div style={{ background: 'white', marginTop: 8 }}>
          {NOTIFY_FAV_DATA.map((item, idx) => (
            <div key={item.id}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-50"
              style={{ borderBottom: idx < NOTIFY_FAV_DATA.length - 1 ? '1px solid #F5F5F5' : 'none' }}
              onClick={() => handleOpen(item)}>
              {/* 头像 */}
              <div
                className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 cursor-pointer"
                style={{ width: 48, height: 48, background: item.avatarColor, fontSize: 17 }}
                onClick={(e) => { e.stopPropagation(); onOpenUserProfile(item.userId); }}>
                {item.avatar}
              </div>
              {/* 文字 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between" style={{ marginBottom: 2 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{item.user}</span>
                  <span style={{ fontSize: 12, color: '#BBB' }}>{item.time}</span>
                </div>
                <div style={{ fontSize: 13, color: '#999' }}>收藏了你的图文</div>
                <div className="truncate mt-1" style={{ fontSize: 13, color: '#555' }}>{item.title}</div>
              </div>
              {/* 封面缩略图 */}
              <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 56, height: 56 }}>
                <img src={`https://picsum.photos/seed/${item.coverSeed}/112/112`} alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── NOTIFY COMMENTS SCREEN ───────────────────
// ─────────────────────────────────────────────
const NotifyCommentsScreen: React.FC<{
  onBack: () => void;
  onOpenPost: (post: FollowPost) => void;
  onOpenUserProfile: (userId: number) => void;
}> = ({ onBack, onOpenPost, onOpenUserProfile }) => {
  const handleOpen = (item: NotifyCommentItem) => {
    const post: FollowPost = {
      id: item.postId, userId: item.userId, user: item.user, avatar: item.avatar, avatarColor: item.avatarColor,
      type: 'image', coverSeed: item.coverSeed, coverHeight: 180, title: item.postTitle, likes: 0, date: '',
    };
    onOpenPost(post);
  };
  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: PAGE_BG }}>
      <div className="flex items-center px-4 flex-shrink-0" style={{ height: 52, background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ flex: 1, fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>评论/@</div>
        <div style={{ width: 28 }} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div style={{ background: 'white', marginTop: 8 }}>
          {NOTIFY_COMMENTS_DATA.map((item, idx) => (
            <div key={item.id}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-50"
              style={{ borderBottom: idx < NOTIFY_COMMENTS_DATA.length - 1 ? '1px solid #F5F5F5' : 'none' }}
              onClick={() => handleOpen(item)}>
              {/* 头像 */}
              <div
                className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 cursor-pointer"
                style={{ width: 48, height: 48, background: item.avatarColor, fontSize: 17 }}
                onClick={(e) => { e.stopPropagation(); onOpenUserProfile(item.userId); }}>
                {item.avatar}
              </div>
              {/* 文字 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between" style={{ marginBottom: 2 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{item.user}</span>
                  <span style={{ fontSize: 12, color: '#BBB' }}>{item.time}</span>
                </div>
                <div style={{ fontSize: 13, color: '#999' }}>
                  {item.type === 'comment' && '评论了你的作品'}
                  {item.type === 'reply' && '回复了你的评论'}
                  {item.type === 'mention' && '@了你'}
                </div>
                <div className="truncate mt-1" style={{ fontSize: 13, color: '#555' }}>{item.commentText}</div>
              </div>
              {/* 封面缩略图 */}
              <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 56, height: 56 }}>
                <img src={`https://picsum.photos/seed/${item.coverSeed}/112/112`} alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── NOTIFY FANS SCREEN ───────────────────────
// ─────────────────────────────────────────────
const NotifyFansScreen: React.FC<{
  onBack: () => void;
  onOpenUserProfile: (userId: number) => void;
}> = ({ onBack, onOpenUserProfile }) => {
  const [followed, setFollowed] = React.useState<{[id: number]: boolean}>(
    () => Object.fromEntries(NOTIFY_FANS_DATA.map(f => [f.id, f.isFollowed]))
  );
  return (
    <div className="flex flex-col h-full" style={{ background: PAGE_BG }}>
      <div className="flex items-center px-4 flex-shrink-0" style={{ height: 52, background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ flex: 1, fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>新增粉丝</div>
        <div style={{ width: 28 }} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div style={{ background: 'white', marginTop: 8 }}>
          {NOTIFY_FANS_DATA.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: idx < NOTIFY_FANS_DATA.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
              <div
                className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 cursor-pointer"
                style={{ width: 48, height: 48, background: item.avatarColor, fontSize: 17 }}
                onClick={() => onOpenUserProfile(item.userId)}>
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{item.user}</div>
                <div style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{item.bio}</div>
              </div>
              <span style={{ fontSize: 12, color: '#BBB', marginRight: 8 }}>{item.time}</span>
              <button
                onClick={() => setFollowed(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                className="flex-shrink-0"
                style={{
                  padding: '5px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
                  background: followed[item.id] ? '#F0F0F0' : PRIMARY,
                  color: followed[item.id] ? '#999' : 'white',
                }}>
                {followed[item.id] ? '已关注' : '回关'}
              </button>
            </div>
          ))}
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── FRIEND DETAIL SCREEN ─────────────────────
// ─────────────────────────────────────────────
const FriendDetailScreen: React.FC<{
  friendId: number;
  onBack: () => void;
  onOpenChat: (userId: number) => void;
  onOpenUserProfile: (userId: number) => void;
}> = ({ friendId, onBack, onOpenChat, onOpenUserProfile }) => {
  const friend = FRIENDS_LIST.find(f => f.id === friendId);

  if (!friend) return null;

  const handleDeleteFriend = () => {
    // 确认删除
    if (confirm('确定要删除该好友吗？')) {
      // 删除成功后返回通讯录
      onBack();
    }
  };

  return (
    <div className="relative flex flex-col h-full" style={{ background: PAGE_BG }}>
      {/* ── Header Bar ── */}
      <div className="flex items-center justify-between px-4" style={{ height: 52, background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack}
          className="flex items-center justify-center border-0 cursor-pointer bg-transparent active:scale-95 transition-transform"
          style={{ padding: 0 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A' }}>用户详情</span>
        <div style={{ width: 28 }} />
      </div>

      {/* ── Profile Info Section ── */}
      <div className="flex items-center gap-4 px-4 py-5" style={{ background: 'white' }}>
        <div className="flex items-center justify-center rounded-full font-bold flex-shrink-0"
          style={{
            width: 72, height: 72,
            background: friend.color,
            fontSize: 28,
            color: 'white',
          }}>
          {friend.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{friend.name}</div>
          {friend.note && (
            <div style={{ fontSize: 14, color: '#666', marginBottom: 2 }}>备注：{friend.note}</div>
          )}
          {friend.yishouNumber && (
            <div style={{ fontSize: 13, color: '#999' }}>野火号：{friend.yishouNumber}</div>
          )}
        </div>
      </div>

      {/* ── Settings Module ── */}
      <div className="mx-4 mt-3 rounded-xl overflow-hidden" style={{ background: 'white' }}>
        <button
          className="w-full flex items-center justify-between px-4 py-3.5 border-0 cursor-pointer active:bg-gray-50"
          style={{ borderBottom: '1px solid #F0F0F0' }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: '#1A1A1A' }}>设置昵称或别名</span>
          <RightOutlined style={{ fontSize: 14, color: '#CCC' }} />
        </button>
        <button
          className="w-full flex items-center justify-between px-4 py-3.5 border-0 cursor-pointer active:bg-gray-50">
          <span style={{ fontSize: 15, fontWeight: 500, color: '#1A1A1A' }}>更多信息</span>
          <RightOutlined style={{ fontSize: 14, color: '#CCC' }} />
        </button>
      </div>

      {/* ── Action Buttons Module ── */}
      <div className="mx-4 mt-4 rounded-xl overflow-hidden" style={{ background: 'white' }}>
        <button onClick={() => onOpenUserProfile(friendId)}
          className="w-full flex items-center justify-center gap-2 py-3.5 border-0 cursor-pointer active:bg-gray-50"
          style={{ borderBottom: '1px solid #F0F0F0' }}>
          <UserOutlined style={{ fontSize: 18, color: '#FF4D4F' }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: '#FF4D4F' }}>用户主页</span>
        </button>
        <button onClick={() => onOpenChat(friendId)}
          className="w-full flex items-center justify-center gap-2 py-3.5 border-0 cursor-pointer active:bg-gray-50"
          style={{ borderBottom: '1px solid #F0F0F0' }}>
          <MessageOutlined style={{ fontSize: 18, color: '#FF4D4F' }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: '#FF4D4F' }}>发送消息</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-2 py-3.5 border-0 cursor-pointer active:bg-gray-50">
          <VideoCameraOutlined style={{ fontSize: 18, color: '#FF4D4F' }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: '#FF4D4F' }}>视频聊天</span>
        </button>
      </div>

      {/* ── Delete Friend Button ── */}
      <div className="mx-4 mt-3 rounded-xl overflow-hidden" style={{ background: 'white' }}>
        <button onClick={handleDeleteFriend}
          className="w-full flex items-center justify-center gap-2 py-3.5 border-0 cursor-pointer active:bg-gray-50">
          <DeleteOutlined style={{ fontSize: 18, color: '#FF4D4F' }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: '#FF4D4F' }}>删除好友</span>
        </button>
      </div>

      <div style={{ height: 24 }} />
    </div>
  );
};

// ─────────────────────────────────────────────
// ── MY DETAIL SCREEN ─────────────────────────
// ─────────────────────────────────────────────
const MyDetailScreen: React.FC<{
  userId: number;
  onBack: () => void;
  onOpenChat: (userId: number) => void;
}> = ({ userId, onBack, onOpenChat }) => {
  const profile = USER_PROFILES[userId] ?? { name: '张大爷', avatar: '张', color: '#FF6B35', note: '', yishouNumber: 'ZHANG99DAD' };

  return (
    <div className="relative flex flex-col h-full" style={{ background: PAGE_BG }}>
      {/* ── Header Bar ── */}
      <div className="flex items-center justify-between px-4" style={{ height: 52, background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack}
          className="flex items-center justify-center border-0 cursor-pointer bg-transparent active:scale-95 transition-transform"
          style={{ padding: 0 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A' }}>我的详情</span>
        <div style={{ width: 28 }} />
      </div>

      {/* ── Profile Info Section ── */}
      <div className="flex items-center gap-4 px-4 py-5" style={{ background: 'white' }}>
        <div className="flex items-center justify-center rounded-full font-bold flex-shrink-0"
          style={{
            width: 72, height: 72,
            background: profile.color,
            fontSize: 28,
            color: 'white',
          }}>
          {profile.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{profile.name}</div>
          {profile.note && (
            <div style={{ fontSize: 14, color: '#666', marginBottom: 2 }}>备注：{profile.note}</div>
          )}
          {profile.yishouNumber && (
            <div style={{ fontSize: 13, color: '#999' }}>野火号：{profile.yishouNumber}</div>
          )}
        </div>
      </div>

      {/* ── Settings Module ── */}
      <div className="mx-4 mt-3 rounded-xl overflow-hidden" style={{ background: 'white' }}>
        <button
          className="w-full flex items-center justify-between px-4 py-3.5 border-0 cursor-pointer active:bg-gray-50"
          style={{ borderBottom: '1px solid #F0F0F0' }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: '#1A1A1A' }}>设置昵称或别名</span>
          <RightOutlined style={{ fontSize: 14, color: '#CCC' }} />
        </button>
        <button
          className="w-full flex items-center justify-between px-4 py-3.5 border-0 cursor-pointer active:bg-gray-50">
          <span style={{ fontSize: 15, fontWeight: 500, color: '#1A1A1A' }}>更多信息</span>
          <RightOutlined style={{ fontSize: 14, color: '#CCC' }} />
        </button>
      </div>

      {/* ── Action Buttons Module (no video chat, no delete, no user profile) ── */}
      <div className="mx-4 mt-4 rounded-xl overflow-hidden" style={{ background: 'white' }}>
        <button onClick={() => onOpenChat(userId)}
          className="w-full flex items-center justify-center gap-2 py-3.5 border-0 cursor-pointer active:bg-gray-50">
          <MessageOutlined style={{ fontSize: 18, color: '#FF4D4F' }} />
          <span style={{ fontSize: 16, fontWeight: 600, color: '#FF4D4F' }}>发送消息</span>
        </button>
      </div>

      <div style={{ height: 24 }} />
    </div>
  );
};

// ─────────────────────────────────────────────
// ── CONTACTS SCREEN ───────────────────────────
// ─────────────────────────────────────────────
const ContactsScreen: React.FC<{
  onBack: () => void;
  onOpenChat: (id: number) => void;
  onOpenUserProfile: (userId: number) => void;
  onOpenFriendRequests: () => void;
  onOpenFriendDetail: (userId: number) => void;
}> = ({ onBack, onOpenChat, onOpenUserProfile, onOpenFriendRequests, onOpenFriendDetail }) => {
  const groupChats = CHATS.filter(c => 'members' in c && (c as any).members);

  return (
    <div className="flex flex-col h-full" style={{ background: PAGE_BG }}>
      {/* Nav Bar */}
      <div className="flex items-center gap-3 px-4 flex-shrink-0" style={{ height: 52, background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ flex: 1, fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center', marginRight: 28 }}>通讯录</div>
      </div>
      <div className="flex-1 overflow-hidden" style={{ position: 'relative' }}>
      <div className="flex-1 overflow-y-auto" style={{ height: '100%' }}>
        {/* ── 新的朋友 ── */}
        <div className="mt-2" style={{ background: 'white' }}>
          <div onClick={onOpenFriendRequests} className="flex items-center gap-3 px-4 py-3.5 cursor-pointer active:bg-gray-50">
            <div className="flex items-center justify-center rounded-2xl flex-shrink-0"
              style={{ width: 48, height: 48, background: 'linear-gradient(135deg, #FF6B35, #FF9A56)' }}>
              <UserAddOutlined style={{ fontSize: 22, color: 'white' }} />
            </div>
            <div className="flex-1">
              <span style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>新的朋友</span>
            </div>
            <div className="flex items-center justify-center rounded-full text-white font-bold"
              style={{ minWidth: 20, height: 20, background: '#FF4D4F', fontSize: 12, padding: '0 5px' }}>
              {FRIEND_REQUESTS.length}
            </div>
            <RightOutlined style={{ fontSize: 14, color: '#CCC', marginLeft: 4 }} />
          </div>
        </div>
        {/* ── 我的组织 ── */}
        <div className="mt-2" style={{ background: 'white' }}>
          <div className="flex items-center gap-3 px-4 py-3.5 cursor-pointer active:bg-gray-50">
            <div className="flex items-center justify-center rounded-2xl flex-shrink-0"
              style={{ width: 48, height: 48, background: 'linear-gradient(135deg, #1677FF, #4096FF)' }}>
              <TeamOutlined style={{ fontSize: 22, color: 'white' }} />
            </div>
            <div className="flex-1">
              <span style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>我的组织</span>
            </div>
            <RightOutlined style={{ fontSize: 14, color: '#CCC' }} />
          </div>
        </div>
        {/* ── 群聊 ── */}
        <div className="mt-2" style={{ background: 'white' }}>
          <div className="px-4 py-2" style={{ fontSize: 13, color: '#999', borderBottom: '1px solid #F0F0F0' }}>群聊</div>
          {groupChats.map((chat, idx) => (
            <div key={chat.id} onClick={() => onOpenChat(chat.id)}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-50"
              style={{ borderBottom: idx < groupChats.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
              <div className="flex-shrink-0" style={{ width: 48, height: 48, background: '#EDEDEE', borderRadius: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, padding: 3 }}>
                {[0, 1, 2, 3].map(function(i) {
                  var palette = ['#FF6B35','#1677FF','#52C41A','#FA8C16','#722ED1','#EB2F96','#13C2C2','#F5222D'];
                  var letters = ['李','张','王','陈','赵','刘','杨','黄'];
                  var colorIdx = ((chat as any).id * 3 + i * 2) % palette.length;
                  return (
                    <div key={i} style={{ background: palette[colorIdx], borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white', fontWeight: 700 }}>
                      {letters[((chat as any).id + i) % letters.length]}
                    </div>
                  );
                })}
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>{chat.name}</div>
                <div className="truncate" style={{ fontSize: 13, color: '#999', marginTop: 2 }}>
                  {(chat as any).members ? ((chat as any).members + '人') : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* ── 我的好友 ── */}
        <div className="mt-2" style={{ background: 'white' }}>
          <div className="px-4 py-2" style={{ fontSize: 13, color: '#999', borderBottom: '1px solid #F0F0F0' }}>我的好友</div>
          {FRIENDS_LIST.map((friend, idx) => (
            <div key={friend.id} onClick={() => onOpenFriendDetail(friend.id)}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-50"
              style={{ borderBottom: idx < FRIENDS_LIST.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
              <div className="flex items-center justify-center rounded-full text-white font-bold flex-shrink-0"
                style={{ width: 48, height: 48, background: friend.color, fontSize: 17 }}>{friend.avatar}</div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>{friend.name}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 24 }} />
      </div>
      {/* A-Z Index Bar — absolute overlay */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 8, paddingBottom: 8, zIndex: 10 }}>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('').map(letter => (
          <div key={letter} style={{ fontSize: 12, color: '#999', lineHeight: '1.8', userSelect: 'none' }}>{letter}</div>
        ))}
      </div>
    </div>
  </div>
  );
};

// ─────────────────────────────────────────────
// Shared: Timeline Grid Screen (used by My Dynamics & My Favorites)
// ─────────────────────────────────────────────
type PostFilterTab = 'all' | 'image' | 'video';

const TimelineGridScreen: React.FC<{
  title: string;
  posts: FollowPost[];
  showAuthor?: boolean;
  onBack: () => void;
  onOpenPost: (post: FollowPost, isFromFavorites?: boolean, isFromMyDynamics?: boolean) => void;
  onOpenVideo: (post: FollowPost, pool?: FollowPost[], isFromFavorites?: boolean, isFromMyDynamics?: boolean) => void;
  enableDelete?: boolean;
}> = ({ title, posts, showAuthor, onBack, onOpenPost, onOpenVideo, enableDelete = false }) => {
  const [filter, setFilter] = useState<PostFilterTab>('all');

  const filtered = filter === 'all' ? posts : posts.filter(p => p.type === filter);
  const videoPosts = posts.filter(p => p.type === 'video');

  // Group by date
  const groups: { date: string; items: FollowPost[] }[] = [];
  filtered.forEach(post => {
    const d = post.date ?? '未知日期';
    const last = groups[groups.length - 1];
    if (last && last.date === d) { last.items.push(post); }
    else { groups.push({ date: d, items: [post] }); }
  });

  const formatDate = (d: string) => {
    if (d === '未知日期') return d;
    const [y, m, day] = d.split('-');
    return `${y}年${parseInt(m)}月${parseInt(day)}日`;
  };

  const renderThumb = (post: FollowPost) => (
    <button key={post.id}
      onClick={() => {
        // 在我的动态和我的收藏中，所有帖子（包括图文）都进入全屏浏览模式
        onOpenVideo(post, filtered, !enableDelete, enableDelete);
      }}
      className="relative overflow-hidden border-0 cursor-pointer p-0"
      style={{ background: '#E8E8E8', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', aspectRatio: '3/4', width: '100%' }}>
      <img
        src={`https://picsum.photos/seed/${post.coverSeed}/200/267`}
        alt=""
        className="w-full h-full object-cover"
      />
      {post.type === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.25)' }}>
          <PlayCircleFilled style={{ fontSize: 24, color: 'white' }} />
        </div>
      )}
      {showAuthor && (
        <div className="absolute bottom-0 left-0 right-0 px-1.5 py-1"
          style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.55))' }}>
          <div className="flex items-center gap-1">
            <div className="flex items-center justify-center rounded-full text-white flex-shrink-0"
              style={{ width: 14, height: 14, background: post.avatarColor, fontSize: 8, fontWeight: 700 }}>{post.avatar}</div>
            <span className="truncate" style={{ fontSize: 10, color: 'white' }}>{post.user}</span>
          </div>
        </div>
      )}
    </button>
  );

  const FILTER_OPTIONS: { id: PostFilterTab; label: string }[] = [
    { id: 'all', label: '全部' },
    { id: 'image', label: '图文' },
    { id: 'video', label: '视频' },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: PAGE_BG }}>
      {/* Nav bar */}
      <div className="flex items-center flex-shrink-0" style={{ background: 'white', height: 52, borderBottom: '1px solid #F0F0F0', padding: '0 16px' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1 mr-3" style={{ minWidth: 32 }}>
          <ArrowLeftOutlined style={{ fontSize: 18, color: '#1A1A1A' }} />
        </button>
        <span style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', flex: 1, textAlign: 'center' }}>{title}</span>
        <div style={{ width: 40 }} />
      </div>
      {/* Filter tabs */}
      <div className="flex flex-shrink-0" style={{ background: 'white', borderBottom: '1px solid #F0F0F0', padding: '0 16px' }}>
        {FILTER_OPTIONS.map(opt => (
          <button key={opt.id} onClick={() => setFilter(opt.id)}
            className="border-0 bg-transparent cursor-pointer"
            style={{ padding: '10px 14px', fontSize: 14, fontWeight: filter === opt.id ? 700 : 400,
              color: filter === opt.id ? PRIMARY : '#666',
              borderBottom: filter === opt.id ? `2.5px solid ${PRIMARY}` : '2.5px solid transparent' }}>
            {opt.label}
            <span style={{ fontSize: 12, marginLeft: 3, color: '#AAA' }}>
              {opt.id === 'all' ? posts.length : posts.filter(p => p.type === opt.id).length}
            </span>
          </button>
        ))}
      </div>
      {/* Timeline */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '8px 0 24px' }}>
        {groups.length === 0 && (
          <div className="flex items-center justify-center" style={{ paddingTop: 60, fontSize: 14, color: '#CCC' }}>暂无内容</div>
        )}
        {groups.map((group, gi) => (
          <div key={group.date} className="relative" style={{ paddingLeft: 48, paddingRight: 14, marginBottom: 8 }}>
            {/* Timeline vertical line */}
            <div className="absolute" style={{ left: 20, top: 0, bottom: gi === groups.length - 1 ? 20 : 0, width: 2, background: '#EBEBEB' }} />
            {/* Date dot */}
            <div className="absolute flex items-center justify-center rounded-full"
              style={{ left: 13, top: 6, width: 16, height: 16, background: PRIMARY, border: '2.5px solid white', boxShadow: '0 0 0 2px #FFD5C0', zIndex: 1 }} />
            {/* Date label */}
            <div style={{ fontSize: 13, fontWeight: 600, color: PRIMARY, marginBottom: 10, lineHeight: 1.6 }}>{formatDate(group.date)}</div>
            {/* 3-column grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {group.items.map(renderThumb)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Points Mall Screen
// ─────────────────────────────────────────────
interface PointsGoods {
  id: number;
  name: string;
  points: number;
  cash?: number;
  remaining: number;
  category: 'gift' | 'health' | 'hobby' | 'coupon';
  stock: '充足' | '紧张' | '已兑完';
  desc: string;
  image: string;
  images: string[];
  specs?: { label: string; options: string[] };
  detailImages: string[];
  purchaseNotes: string[];
  afterSalesNotes: string[];
  jdPrice?: number; // 京东价
  taobaoPrice?: number; // 淘宝价
}

const POINTS_GOODS: PointsGoods[] = [
  // 实物好礼
  { id: 1, name: '304不锈钢保温杯', points: 500, cash: 50, remaining: 128, category: 'gift', stock: '充足', desc: '304不锈钢内胆，480ml大容量，长效保温12小时', image: 'https://picsum.photos/seed/保温杯/200/200', images: ['https://picsum.photos/seed/保温杯/400/400', 'https://picsum.photos/seed/保温杯详1/400/400', 'https://picsum.photos/seed/保温杯详2/400/400'], specs: { label: '颜色', options: ['银色', '黑色', '蓝色'] }, detailImages: ['https://picsum.photos/seed/保温杯大图1/400/600', 'https://picsum.photos/seed/保温杯大图2/400/600', 'https://picsum.photos/seed/保温杯大图3/400/600'], purchaseNotes: ['实物商品预计3-5个工作日送达', '每用户限兑2件', '积分+现金兑换不支持退换货'], afterSalesNotes: ['签收后7天内可申请退换（质量问题）', '退换货需保持商品完好、配件齐全', '客服电话：400-800-8888'], jdPrice: 89, taobaoPrice: 68 },
  { id: 2, name: '颈椎按摩仪', points: 600, cash: 30, remaining: 36, category: 'gift', stock: '充足', desc: '脉冲按摩，16档力度，语音提示，USB充电', image: 'https://picsum.photos/seed/按摩仪/200/200', images: ['https://picsum.photos/seed/按摩仪/400/400', 'https://picsum.photos/seed/按摩仪详1/400/400', 'https://picsum.photos/seed/按摩仪详2/400/400'], specs: { label: '档位模式', options: ['标准版', '旗舰版'] }, detailImages: ['https://picsum.photos/seed/按摩仪大图1/400/600', 'https://picsum.photos/seed/按摩仪大图2/400/600', 'https://picsum.photos/seed/按摩仪大图3/400/600'], purchaseNotes: ['实物商品预计5-7个工作日送达', '每用户限兑1件', '积分+现金兑换不支持退换货'], afterSalesNotes: ['签收后7天内可申请退换（质量问题）', '1年内免费维修（非人为损坏）', '客服电话：400-800-8888'], jdPrice: 199, taobaoPrice: 158 },
  { id: 3, name: '老年轻便健步鞋', points: 1200, remaining: 52, category: 'gift', stock: '充足', desc: '防滑鞋底，透气网面，一脚蹬穿脱方便', image: 'https://picsum.photos/seed/健步鞋/200/200', images: ['https://picsum.photos/seed/健步鞋/400/400', 'https://picsum.photos/seed/健步鞋详1/400/400', 'https://picsum.photos/seed/健步鞋详2/400/400'], specs: { label: '鞋码', options: ['38', '39', '40', '41', '42', '43'] }, detailImages: ['https://picsum.photos/seed/健步鞋大图1/400/600', 'https://picsum.photos/seed/健步鞋大图2/400/600', 'https://picsum.photos/seed/健步鞋大图3/400/600'], purchaseNotes: ['实物商品预计3-5个工作日送达', '每用户每码限兑1双', '防滑鞋底适合老年人室内外行走'], afterSalesNotes: ['签收7天内可退换（码数问题）', '退换需保持鞋面干净、无磨损', '客服电话：400-800-8888'], jdPrice: 168, taobaoPrice: 128 },
  { id: 4, name: '太极服套装（春夏款）', points: 3500, remaining: 18, category: 'gift', stock: '充足', desc: '太极服+裤，含腰带，棉麻透气面料', image: 'https://picsum.photos/seed/太极服/200/200', images: ['https://picsum.photos/seed/太极服/400/400', 'https://picsum.photos/seed/太极服详1/400/400', 'https://picsum.photos/seed/太极服详2/400/400'], specs: { label: '尺码', options: ['M', 'L', 'XL', 'XXL'] }, detailImages: ['https://picsum.photos/seed/太极服大图1/400/600', 'https://picsum.photos/seed/太极服大图2/400/600', 'https://picsum.photos/seed/太极服大图3/400/600'], purchaseNotes: ['实物商品预计5-7个工作日送达', '含上衣+裤子+腰带三件套', '棉麻面料透气舒适，适合春夏晨练'], afterSalesNotes: ['7天无理由退换（未洗涤、吊牌完整）', '尺码问题可换货一次', '客服电话：400-800-8888'], jdPrice: 128, taobaoPrice: 98 },
  { id: 5, name: '便携折叠购物车', points: 800, remaining: 8, category: 'gift', stock: '紧张', desc: '铝合金车架，可坐可拖，万向轮静音', image: 'https://picsum.photos/seed/购物车/200/200', images: ['https://picsum.photos/seed/购物车/400/400', 'https://picsum.photos/seed/购物车详1/400/400', 'https://picsum.photos/seed/购物车详2/400/400'], specs: { label: '颜色', options: ['深灰色', '酒红色'] }, detailImages: ['https://picsum.photos/seed/购物车大图1/400/600', 'https://picsum.photos/seed/购物车大图2/400/600', 'https://picsum.photos/seed/购物车大图3/400/600'], purchaseNotes: ['实物商品预计5-7个工作日送达', '载重可达150斤，可坐可拖', '折叠后尺寸约30×25×60cm'], afterSalesNotes: ['签收15天内可申请退换', '车架铝合金，质保3年', '客服电话：400-800-8888'], jdPrice: 138, taobaoPrice: 108 },
  { id: 6, name: '放大镜带灯老花镜', points: 600, remaining: 95, category: 'gift', stock: '充足', desc: 'LED灯珠，3倍放大，超轻镜架，阅读专用', image: 'https://picsum.photos/seed/老花镜/200/200', images: ['https://picsum.photos/seed/老花镜/400/400', 'https://picsum.photos/seed/老花镜详1/400/400', 'https://picsum.photos/seed/老花镜详2/400/400'], specs: { label: '度数', options: ['+1.5D', '+2.0D', '+2.5D', '+3.0D'] }, detailImages: ['https://picsum.photos/seed/老花镜大图1/400/600', 'https://picsum.photos/seed/老花镜大图2/400/600', 'https://picsum.photos/seed/老花镜大图3/400/600'], purchaseNotes: ['实物商品预计3-5个工作日送达', 'LED灯珠需自备2节AAA电池', '每用户每度数限兑1副'], afterSalesNotes: ['7天无理由退换（镜片无划痕）', '灯珠保修6个月', '客服电话：400-800-8888'], jdPrice: 45, taobaoPrice: 32 },
  // 健康保健
  { id: 7, name: '液体钙软胶囊礼盒', points: 1800, remaining: 64, category: 'health', stock: '充足', desc: '柠檬酸钙，易吸收，中老年骨骼健康', image: 'https://picsum.photos/seed/液体钙/200/200', images: ['https://picsum.photos/seed/液体钙/400/400', 'https://picsum.photos/seed/液体钙详1/400/400', 'https://picsum.photos/seed/液体钙详2/400/400'], specs: { label: '规格', options: ['单瓶装（60粒）', '双瓶装（120粒）', '礼盒装（3瓶）'] }, detailImages: ['https://picsum.photos/seed/液体钙大图1/400/600', 'https://picsum.photos/seed/液体钙大图2/400/600', 'https://picsum.photos/seed/液体钙大图3/400/600'], purchaseNotes: ['预计2-3个工作日发货', '每用户每规格限兑3件', '建议随餐服用，每日2粒'], afterSalesNotes: ['保健品非药品，不支持7天无理由退货', '质量问题可联系客服退换', '客服电话：400-800-8888'], jdPrice: 198, taobaoPrice: 158 },
  { id: 8, name: '电子血压计（语音款）', points: 5000, remaining: 22, category: 'health', stock: '充足', desc: '大屏显示，全程语音播报，心律不齐提醒', image: 'https://picsum.photos/seed/血压计/200/200', images: ['https://picsum.photos/seed/血压计/400/400', 'https://picsum.photos/seed/血压计详1/400/400', 'https://picsum.photos/seed/血压计详2/400/400'], specs: { label: '腕带尺寸', options: ['标准腕带（22-32cm）', '加宽腕带（22-42cm）'] }, detailImages: ['https://picsum.photos/seed/血压计大图1/400/600', 'https://picsum.photos/seed/血压计大图2/400/600', 'https://picsum.photos/seed/血压计大图3/400/600'], purchaseNotes: ['实物商品预计5-7个工作日送达', '含血压计+腕带+说明书+电池', '每用户限兑1台'], afterSalesNotes: ['签收15天内非人为故障可退换', '整机质保2年，腕带质保半年', '客服电话：400-800-8888'], jdPrice: 268, taobaoPrice: 218 },
  { id: 9, name: '智能足浴盆', points: 6800, remaining: 5, category: 'health', stock: '紧张', desc: '恒温加热，气泡按摩，电动滚轮，足底刮痧', image: 'https://picsum.photos/seed/足浴盆/200/200', images: ['https://picsum.photos/seed/足浴盆/400/400', 'https://picsum.photos/seed/足浴盆详1/400/400', 'https://picsum.photos/seed/足浴盆详2/400/400'], specs: { label: '容量', options: ['8L标准版', '12L加大版'] }, detailImages: ['https://picsum.photos/seed/足浴盆大图1/400/600', 'https://picsum.photos/seed/足浴盆大图2/400/600', 'https://picsum.photos/seed/足浴盆大图3/400/600'], purchaseNotes: ['实物商品预计7-10个工作日送达（大件）', '额定功率600W，需使用接地插座', '每用户限兑1台'], afterSalesNotes: ['签收15天内可申请退换（非人为损坏）', '加热元件质保3年，整机质保1年', '客服电话：400-800-8888'], jdPrice: 398, taobaoPrice: 328 },
  { id: 10, name: '电子体温计（耳温枪）', points: 900, remaining: 156, category: 'health', stock: '充足', desc: '1秒速测，高温报警，LCD高清屏', image: 'https://picsum.photos/seed/耳温枪/200/200', images: ['https://picsum.photos/seed/耳温枪/400/400', 'https://picsum.photos/seed/耳温枪详1/400/400', 'https://picsum.photos/seed/耳温枪详2/400/400'], specs: { label: '测量方式', options: ['耳温款', '额温款（耳温+额温）'] }, detailImages: ['https://picsum.photos/seed/耳温枪大图1/400/600', 'https://picsum.photos/seed/耳温枪大图2/400/600', 'https://picsum.photos/seed/耳温枪大图3/400/600'], purchaseNotes: ['预计2-3个工作日发货', '含耳温枪+电池+说明书', '每用户每款限兑1支'], afterSalesNotes: ['签收7天内非人为故障可退换', '质保1年（电池除外）', '客服电话：400-800-8888'], jdPrice: 89, taobaoPrice: 68 },
  { id: 11, name: '蛋白粉营养礼盒', points: 2200, remaining: 38, category: 'health', stock: '充足', desc: '优质动植物蛋白，提高免疫力，大罐装礼盒', image: 'https://picsum.photos/seed/蛋白粉/200/200', images: ['https://picsum.photos/seed/蛋白粉/400/400', 'https://picsum.photos/seed/蛋白粉详1/400/400', 'https://picsum.photos/seed/蛋白粉详2/400/400'], specs: { label: '口味', options: ['原味', '山楂味', '红枣味'] }, detailImages: ['https://picsum.photos/seed/蛋白粉大图1/400/600', 'https://picsum.photos/seed/蛋白粉大图2/400/600', 'https://picsum.photos/seed/蛋白粉大图3/400/600'], purchaseNotes: ['预计2-3个工作日发货', '每罐约450g，每用户每口味限兑3罐', '请置于阴凉干燥处保存'], afterSalesNotes: ['食品类不支持7天无理由退货', '发现胀罐、变质请联系客服处理', '客服电话：400-800-8888'], jdPrice: 188, taobaoPrice: 148 },
  // 兴趣休闲
  { id: 12, name: '广场舞U盘（100首经典曲目）', points: 300, remaining: 280, category: 'hobby', stock: '充足', desc: '100首经典广场舞曲目，附送动作分解PDF', image: 'https://picsum.photos/seed/广场舞U盘/200/200', images: ['https://picsum.photos/seed/广场舞U盘/400/400', 'https://picsum.photos/seed/广场舞U盘详1/400/400', 'https://picsum.photos/seed/广场舞U盘详2/400/400'], specs: { label: '曲目类型', options: ['经典老歌', '现代流行', '混搭版（50首经典+50首现代）'] }, detailImages: ['https://picsum.photos/seed/广场舞U盘大图1/400/600', 'https://picsum.photos/seed/广场舞U盘大图2/400/600', 'https://picsum.photos/seed/广场舞U盘大图3/400/600'], purchaseNotes: ['预计1-2个工作日发货（虚拟+实物）', 'U盘容量16G，内含100首MP3曲目', '附赠动作分解视频下载二维码'], afterSalesNotes: ['U盘质量问题7天内可换货', '音乐内容不支持退换', '客服电话：400-800-8888'], jdPrice: 38, taobaoPrice: 25 },
  { id: 13, name: '钓鱼套装入门版', points: 1500, remaining: 45, category: 'hobby', stock: '充足', desc: '鱼竿+鱼线+鱼钩+饵料+防晒帽，齐全一套', image: 'https://picsum.photos/seed/钓鱼套装/200/200', images: ['https://picsum.photos/seed/钓鱼套装/400/400', 'https://picsum.photos/seed/钓鱼套装详1/400/400', 'https://picsum.photos/seed/钓鱼套装详2/400/400'], specs: { label: '鱼竿长度', options: ['2.7米（便携款）', '3.6米（标准款）', '4.5米（远投款）'] }, detailImages: ['https://picsum.photos/seed/钓鱼套装大图1/400/600', 'https://picsum.photos/seed/钓鱼套装大图2/400/600', 'https://picsum.photos/seed/钓鱼套装大图3/400/600'], purchaseNotes: ['实物商品预计5-7个工作日送达', '套装包含：鱼竿、鱼线、鱼钩、饵料包、防晒帽', '每用户每长度限兑1套'], afterSalesNotes: ['签收7天内配件缺失可补发', '鱼竿质保1年（非人为折断）', '客服电话：400-800-8888'], jdPrice: 128, taobaoPrice: 98 },
  { id: 14, name: '书法临摹套装', points: 600, remaining: 88, category: 'hobby', stock: '充足', desc: '毛笔+墨汁+宣纸+毛边纸+描红字帖，新手必备', image: 'https://picsum.photos/seed/书法套装/200/200', images: ['https://picsum.photos/seed/书法套装/400/400', 'https://picsum.photos/seed/书法套装详1/400/400', 'https://picsum.photos/seed/书法套装详2/400/400'], specs: { label: '字帖类型', options: ['楷书基础', '行书入门', '隶书练习'] }, detailImages: ['https://picsum.photos/seed/书法套装大图1/400/600', 'https://picsum.photos/seed/书法套装大图2/400/600', 'https://picsum.photos/seed/书法套装大图3/400/600'], purchaseNotes: ['预计2-3个工作日发货', '含毛笔×2、墨汁×1、宣纸×20、毛边纸×30、描红字帖×1', '每用户每类型限兑1套'], afterSalesNotes: ['签收7天内配件缺失可补发', '墨汁开封后不支持退换', '客服电话：400-800-8888'], jdPrice: 58, taobaoPrice: 42 },
  { id: 15, name: '老年大学体验课（任选一门）', points: 4000, remaining: 12, category: 'hobby', stock: '充足', desc: '可选：书法/绘画/摄影/舞蹈/太极，体验一学期', image: 'https://picsum.photos/seed/老年大学/200/200', images: ['https://picsum.photos/seed/老年大学/400/400', 'https://picsum.photos/seed/老年大学详1/400/400', 'https://picsum.photos/seed/老年大学详2/400/400'], specs: { label: '课程类型', options: ['书法', '国画', '摄影', '民族舞', '太极'] }, detailImages: ['https://picsum.photos/seed/老年大学大图1/400/600', 'https://picsum.photos/seed/老年大学大图2/400/600', 'https://picsum.photos/seed/老年大学大图3/400/600'], purchaseNotes: ['兑换后需预约上课时间', '每课程每学期16课时，每周1次', '有效期为兑换后6个月内'], afterSalesNotes: ['课程预约后不支持退款', '因故缺课可申请调课一次', '客服电话：400-800-8888'] },
  { id: 16, name: '太极剑（碳纤维）', points: 2800, remaining: 6, category: 'hobby', stock: '紧张', desc: '碳纤维剑身，轻便耐用，配剑鞘剑袋', image: 'https://picsum.photos/seed/太极剑/200/200', images: ['https://picsum.photos/seed/太极剑/400/400', 'https://picsum.photos/seed/太极剑详1/400/400', 'https://picsum.photos/seed/太极剑详2/400/400'], specs: { label: '剑长', options: ['标准剑（1.2米）', '加长剑（1.4米）'] }, detailImages: ['https://picsum.photos/seed/太极剑大图1/400/600', 'https://picsum.photos/seed/太极剑大图2/400/600', 'https://picsum.photos/seed/太极剑大图3/400/600'], purchaseNotes: ['实物商品预计5-7个工作日送达', '含太极剑+剑鞘+剑袋', '每用户每长度限兑1把'], afterSalesNotes: ['签收15天内可申请退换（非人为损坏）', '剑身质保2年', '客服电话：400-800-8888'] },
  // 平台优惠券
  { id: 17, name: '社区助餐服务8折券', points: 200, remaining: 999, category: 'coupon', stock: '充足', desc: '在平台合作食堂消费，满30元可用，有效期30天', image: 'https://picsum.photos/seed/助餐券/200/200', images: ['https://picsum.photos/seed/助餐券/400/400', 'https://picsum.photos/seed/助餐券详1/400/400'], specs: { label: '使用门店', options: ['全部合作门店', '就近门店（渝中区）', '就近门店（江北区）'] }, detailImages: ['https://picsum.photos/seed/助餐券大图1/400/600', 'https://picsum.photos/seed/助餐券大图2/400/600'], purchaseNotes: ['兑换后即时到账，请到「我的-优惠券」查看', '满30元可使用8折优惠，最高减20元', '有效期30天，不找零不兑现'], afterSalesNotes: ['优惠券一经兑换不支持退换', '使用时出示二维码即可', '客服电话：400-800-8888'] },
  { id: 18, name: '社区疗养院体验券（1次）', points: 800, remaining: 56, category: 'coupon', stock: '充足', desc: '合作疗养院免费体验1次，含1次健康评估', image: 'https://picsum.photos/seed/疗养券/200/200', images: ['https://picsum.photos/seed/疗养券/400/400', 'https://picsum.photos/seed/疗养券详1/400/400'], specs: { label: '体验项目', options: ['经络按摩体验（40分钟）', '中药泡脚体验（30分钟）', '健康评估（60分钟）'] }, detailImages: ['https://picsum.photos/seed/疗养券大图1/400/600', 'https://picsum.photos/seed/疗养券大图2/400/600'], purchaseNotes: ['兑换后需电话预约体验时间', '每用户每项目限用1张', '有效期90天'], afterSalesNotes: ['体验券一经兑换不支持退换', '预约成功后不可改期', '客服电话：400-800-8888'] },
  { id: 19, name: '健康讲座免费入场券', points: 100, remaining: 320, category: 'coupon', stock: '充足', desc: '社区健康讲座免费入场，每月1次，名额有限', image: 'https://picsum.photos/seed/健康讲座/200/200', images: ['https://picsum.photos/seed/健康讲座/400/400', 'https://picsum.photos/seed/健康讲座详1/400/400'], specs: { label: '讲座主题', options: ['心脑血管保健（5月场）', '糖尿病饮食管理（6月场）', '中医养生智慧（7月场）'] }, detailImages: ['https://picsum.photos/seed/健康讲座大图1/400/600', 'https://picsum.photos/seed/健康讲座大图2/400/600'], purchaseNotes: ['兑换后需选择场次，到账后不可更改', '每场限额50人，报满即止', '有效期为所选讲座日期当天'], afterSalesNotes: ['入场券一经兑换不支持退换', '请提前15分钟签到', '客服电话：400-800-8888'] },
  { id: 20, name: '广场舞队服定制8折券', points: 150, remaining: 180, category: 'coupon', stock: '充足', desc: '平台合作商家定制广场舞队服，满100元8折', image: 'https://picsum.photos/seed/队服券/200/200', images: ['https://picsum.photos/seed/队服券/400/400', 'https://picsum.photos/seed/队服券详1/400/400'], specs: { label: '合作商家', options: ['舞韵服饰（渝中区）', '彩之韵服饰（南岸区）'] }, detailImages: ['https://picsum.photos/seed/队服券大图1/400/600', 'https://picsum.photos/seed/队服券大图2/400/600'], purchaseNotes: ['兑换后到账，有效期60天', '满100元可用，最高优惠50元', '不与其他优惠同用'], afterSalesNotes: ['优惠券一经兑换不支持退换', '到店出示二维码即可使用', '客服电话：400-800-8888'] },
  { id: 21, name: '社区活动免费入场券', points: 50, remaining: 500, category: 'coupon', stock: '充足', desc: '社区组织的各类活动免费入场，有效期7天', image: 'https://picsum.photos/seed/活动券/200/200', images: ['https://picsum.photos/seed/活动券/400/400', 'https://picsum.photos/seed/活动券详1/400/400'], specs: { label: '活动类型', options: ['文艺演出', '健康义诊', '手工课堂', '兴趣交流'] }, detailImages: ['https://picsum.photos/seed/活动券大图1/400/600', 'https://picsum.photos/seed/活动券大图2/400/600'], purchaseNotes: ['兑换后需选择活动场次', '每用户每场活动限用1张', '有效期7天，过期作废'], afterSalesNotes: ['入场券一经兑换不支持退换', '请关注活动日历选择心仪活动', '客服电话：400-800-8888'] },
];

const POINTS_CATEGORIES = [
  { id: 'all', label: '全部' },
  { id: 'gift', label: '实物好礼' },
  { id: 'health', label: '健康保健' },
  { id: 'hobby', label: '兴趣休闲' },
  { id: 'coupon', label: '平台优惠券' },
];

// 新版积分商城使用4个Tab的数据
const MALL_CATEGORIES = [
  { id: 'health', name: '健康保健', color: '#52C41A', icon: 'heart' },
  { id: 'gift', name: '礼品特产', color: '#FA8C16', icon: 'gift' },
  { id: 'hobby', name: '兴趣休闲', color: '#1677FF', icon: 'hobby' },
  { id: 'coupon', name: '生活用品', color: '#722ED1', icon: 'home' },
];

const POINTS_HOT_BANNERS = [
  { id: 1, title: '限时兑换 · 颈椎按摩仪', sub: '600积分+30元，积分专享价', image: 'https://picsum.photos/seed/按摩仪banner/400/160' },
  { id: 2, title: '新用户首兑立减500积分', sub: '保温杯仅需500积分+50元', image: 'https://picsum.photos/seed/保温杯banner/400/160' },
  { id: 3, title: '健康好物 · 积分翻倍', sub: '全场指定商品双倍积分', image: 'https://picsum.photos/seed/健康banner/400/160' },
];

// 商城商品数据
const MALL_PRODUCTS = [
  { id: 1, name: '电子血压计（语音款）', image: 'https://picsum.photos/seed/bp-monitor/400/400', images: ['https://picsum.photos/seed/bp-monitor/400/400', 'https://picsum.photos/seed/bp2/400/400', 'https://picsum.photos/seed/bp3/400/400'], points: 5000, cash: 0, priceType: 'points', stock: '充足', category: 'health' as const, tags: ['热门', '语音播报'], remaining: 50, desc: '高清大屏显示，语音播报功能，适合老年人使用。全自动智能加压，一键操作，方便快捷。', detailImages: ['https://picsum.photos/seed/bp-detail1/400/400', 'https://picsum.photos/seed/bp-detail2/400/400'], purchaseNotes: ['正品保证', '7天无理由退换', '全国联保'], afterSalesNotes: ['质量问题包退换', '客服电话：400-xxx-xxxx'], specs: { label: '颜色', options: ['白色', '蓝色'] }, isVideo: true, jdPrice: 268, taobaoPrice: 218 },
  { id: 2, name: '颈椎按摩仪智能款', image: 'https://picsum.photos/seed/neck-massager/400/400', images: ['https://picsum.photos/seed/neck-massager/400/400', 'https://picsum.photos/seed/neck2/400/400'], points: 600, cash: 30, priceType: 'hybrid', stock: '充足', category: 'health' as const, tags: ['热卖'], remaining: 80, desc: '仿真人按摩手法，16档力度调节，恒温热敷，续航持久。', detailImages: ['https://picsum.photos/seed/massage-detail1/400/400'], purchaseNotes: ['正品保证', '15天无忧退换'], afterSalesNotes: ['一年质保', '运费险'], specs: { label: '型号', options: ['标准版', '升级版'] }, isVideo: true, jdPrice: 199, taobaoPrice: 158 },
  { id: 3, name: '液体钙软胶囊礼盒装', image: 'https://picsum.photos/seed/calcium/400/400', images: ['https://picsum.photos/seed/calcium/400/400', 'https://picsum.photos/seed/calcium2/400/400'], points: 1800, cash: 0, priceType: 'points', stock: '充足', category: 'gift' as const, tags: ['新品'], remaining: 120, desc: '美国进口钙源，易吸收，礼盒包装精美，送礼自用两相宜。', detailImages: ['https://picsum.photos/seed/calcium-detail/400/400'], purchaseNotes: ['正品保障', '防伪查询'], afterSalesNotes: ['质量问题包退'], specs: { label: '规格', options: ['60粒装', '120粒装'] }, jdPrice: 198, taobaoPrice: 158 },
  { id: 4, name: '智能足浴盆全自动加热', image: 'https://picsum.photos/seed/foot-bath/400/400', images: ['https://picsum.photos/seed/foot-bath/400/400', 'https://picsum.photos/seed/foot2/400/400'], points: 6800, cash: 0, priceType: 'points', stock: '紧张', remaining: 12, desc: '太极按摩盘，滚轮刮痧，自动恒温，PTC加热，安全省心。', detailImages: ['https://picsum.photos/seed/footbath-detail/400/400'], purchaseNotes: ['品质保障', '送货上门'], afterSalesNotes: ['30天退换', '一年保修'], specs: { label: '容量', options: ['8L', '12L'] }, jdPrice: 398, taobaoPrice: 328 },
  { id: 5, name: '有机五谷杂粮礼盒 2kg', image: 'https://picsum.photos/seed/grain-box/400/400', images: ['https://picsum.photos/seed/grain-box/400/400'], points: 0, cash: 39.9, priceType: 'cash', stock: '充足', category: 'gift' as const, tags: ['精选'], remaining: 200, desc: '精选有机杂粮，营养均衡，礼盒包装精美，过节送礼首选。', detailImages: ['https://picsum.photos/seed/grain-detail/400/400'], purchaseNotes: ['有机认证', '破损包赔'], afterSalesNotes: ['七天退换'], specs: { label: '口味', options: ['五谷杂粮', '粗粮组合'] }, jdPrice: 68, taobaoPrice: 52 },
  { id: 6, name: '野生蜂蜜500g正宗土蜂蜜', image: 'https://picsum.photos/seed/honey/400/400', images: ['https://picsum.photos/seed/honey/400/400', 'https://picsum.photos/seed/honey2/400/400'], points: 500, cash: 25, priceType: 'hybrid', stock: '充足', category: 'gift' as const, tags: ['热卖', '正宗'], remaining: 60, desc: '深山野生蜂蜜，纯天然无添加，花香浓郁，口感醇厚。', detailImages: ['https://picsum.photos/seed/honey-detail/400/400'], purchaseNotes: ['假一赔十', '质检报告'], afterSalesNotes: ['质量问题包退'], specs: { label: '蜜种', options: ['百花蜜', '槐花蜜'] }, jdPrice: 88, taobaoPrice: 68 },
  { id: 7, name: '新疆核桃坚果礼盒', image: 'https://picsum.photos/seed/walnut/400/400', images: ['https://picsum.photos/seed/walnut/400/400'], points: 0, cash: 59.9, priceType: 'cash', stock: '充足', category: 'gift' as const, tags: ['精选'], remaining: 150, desc: '新疆原产地直供，手剥核桃仁，独立小包装，食用方便。', detailImages: ['https://picsum.photos/seed/walnut-detail/400/400'], purchaseNotes: ['产地直发', '新鲜保障'], afterSalesNotes: ['破损包退'], specs: { label: '净含量', options: ['500g', '1kg'] }, jdPrice: 98, taobaoPrice: 78 },
  { id: 8, name: '多功能按摩披肩肩颈一体', image: 'https://picsum.photos/seed/massage-shoulder/400/400', images: ['https://picsum.photos/seed/massage-shoulder/400/400', 'https://picsum.photos/seed/shoulder2/400/400'], points: 1200, cash: 0, priceType: 'points', stock: '充足', category: 'hobby' as const, tags: ['新品'], remaining: 45, desc: '仿真人揉捏，恒温热敷，多部位可用，充电式设计。', detailImages: ['https://picsum.photos/seed/shoulder-detail/400/400'], purchaseNotes: ['正品保障', '全国联保'], afterSalesNotes: ['一年质保', '运费险'], specs: { label: '颜色', options: ['灰色', '米色'] }, jdPrice: 168, taobaoPrice: 138 },
  { id: 9, name: '便携式电子体温计耳温枪', image: 'https://picsum.photos/seed/thermometer/400/400', images: ['https://picsum.photos/seed/thermometer/400/400'], points: 900, cash: 0, priceType: 'points', stock: '充足', category: 'health' as const, tags: ['热门'], remaining: 100, desc: '一秒测温，精准快速，LED大屏显示，静音设计，适合婴幼儿。', detailImages: ['https://picsum.photos/seed/thermometer-detail/400/400'], purchaseNotes: ['医疗器械认证', '精准测温'], afterSalesNotes: ['质量问题包退'], specs: { label: '型号', options: ['基础款', '高端款'] }, jdPrice: 89, taobaoPrice: 68 },
  { id: 10, name: '304不锈钢保温杯480ml', image: 'https://picsum.photos/seed/thermos/400/400', images: ['https://picsum.photos/seed/thermos/400/400', 'https://picsum.photos/seed/thermos2/400/400'], points: 500, cash: 0, priceType: 'points', stock: '充足', category: 'coupon' as const, tags: ['热卖'], remaining: 200, desc: '食品级304不锈钢，12小时保温保冷，一键开盖设计。', detailImages: ['https://picsum.photos/seed/thermos-detail/400/400'], purchaseNotes: ['正品保证', '质检合格'], afterSalesNotes: ['一年质保', '破损包赔'], specs: { label: '颜色', options: ['银色', '黑色', '白色'] }, jdPrice: 89, taobaoPrice: 68 },
  { id: 11, name: '老年轻便健步鞋防滑舒适', image: 'https://picsum.photos/seed/shoes/400/400', images: ['https://picsum.photos/seed/shoes/400/400'], points: 1200, cash: 0, priceType: 'points', stock: '充足', category: 'hobby' as const, tags: ['舒适', '防滑'], remaining: 80, desc: '超轻透气，防滑鞋底，魔术贴设计，穿脱方便，专为老年人设计。', detailImages: ['https://picsum.photos/seed/shoes-detail/400/400'], purchaseNotes: ['正品保障', '尺码标准'], afterSalesNotes: ['七天试穿', '质量问题包退'], specs: { label: '尺码', options: ['38', '39', '40', '41', '42'] }, jdPrice: 168, taobaoPrice: 128 },
  { id: 12, name: '太极服套装春夏款透气', image: 'https://picsum.photos/seed/taichi/400/400', images: ['https://picsum.photos/seed/taichi/400/400', 'https://picsum.photos/seed/taichi2/400/400'], points: 3500, cash: 0, priceType: 'points', stock: '充足', category: 'hobby' as const, tags: ['新品'], remaining: 35, desc: '太极服套装，透气速干，宽松舒适，传统款式，修炼必备。', detailImages: ['https://picsum.photos/seed/taichi-detail/400/400'], purchaseNotes: ['品质面料', '做工精细'], afterSalesNotes: ['尺码问题可换'], specs: { label: '尺码', options: ['M', 'L', 'XL', 'XXL'] }, jdPrice: 128, taobaoPrice: 98 },
];

// 商城用户数据
const MALL_USER = {
  id: 1,
  name: '张大爷',
  uid: 'ysby_8886',
  balance: 128.50,
  points: 2560,
  coupons: 3,
  favorites: 12,
};

const PointsMallScreen: React.FC<{
  onBack: () => void;
  onNavigate: (screen: AppScreen) => void;
  userPoints: number;
  onOpenDetail: (goods: PointsGoods) => void;
  onRedeem: (goods: PointsGoods) => void;
  initialTab?: 'home' | 'category' | 'cart' | 'mine';
  onTabChange?: (tab: 'home' | 'category' | 'cart' | 'mine') => void;
  setMallReturnTab?: (tab: 'home' | 'category' | 'cart' | 'mine') => void;
}> = ({ onBack, onNavigate, userPoints, onOpenDetail, onRedeem, initialTab, setMallReturnTab }) => {
  const RED = '#FF4D4F';
  const [mallTab, setMallTab] = useState<'home' | 'category' | 'cart' | 'mine'>(initialTab || 'home');

  // 当外部传入的initialTab变化时，同步内部状态
  useEffect(() => {
    if (initialTab) setMallTab(initialTab);
  }, [initialTab]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState<{product: any, quantity: number, selected: boolean}[]>([
    { product: MALL_PRODUCTS[0], quantity: 1, selected: true },
    { product: MALL_PRODUCTS[4], quantity: 2, selected: true },
  ]);

  const bannerTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    bannerTimerRef.current = setInterval(() => {
      setBannerIndex(i => (i + 1) % POINTS_HOT_BANNERS.length);
    }, 5000);
    return () => { if (bannerTimerRef.current) clearInterval(bannerTimerRef.current); };
  }, []);

  const formatPrice = (product: any) => {
    switch (product.priceType) {
      case 'points': return `${product.points.toLocaleString()} 积分`;
      case 'cash': return `¥${product.cash.toFixed(2)}`;
      case 'hybrid': return `¥${product.cash}+${product.points}积分`;
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case '热门': case '热卖': return RED;
      case '新品': return '#FA8C16';
      case '精选': return '#52C41A';
      default: return '#999';
    }
  };

  const cartCount = cartItems.length;
  const totalCash = cartItems.filter(i => i.selected).reduce((sum, i) => sum + i.product.cash * i.quantity, 0);
  const totalPoints = cartItems.filter(i => i.selected).reduce((sum, i) => sum + i.product.points * i.quantity, 0);
  const selectedCount = cartItems.filter(i => i.selected).length;

  const ProductCard = ({ product, onClick }: { product: any; onClick?: () => void }) => (
    <div className="rounded-2xl overflow-hidden bg-white cursor-pointer active:scale-95 transition-transform" onClick={onClick}>
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full object-cover" style={{ height: 160 }} />
        {/* 视频封面显示播放按钮 */}
        {product.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <PlayCircleFilled style={{ fontSize: 48, color: 'white' }} />
          </div>
        )}
        {product.tags && product.tags[0] && (
          <div className="absolute top-2 left-2 rounded-full px-2 py-0.5 text-white" style={{ fontSize: 11, background: getTagColor(product.tags[0]) }}>
            {product.tags[0]}
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="line-clamp-2" style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.5, marginBottom: 6 }}>
          {product.name}
        </div>
        <div style={{ fontSize: 16, fontWeight: 800, color: RED }}>{formatPrice(product)}</div>
      </div>
    </div>
  );

  // 好物推荐单列卡片（图片在上，信息在下）
  const HotProductCard = ({ product, onClick }: { product: any; onClick?: () => void }) => (
    <div className="rounded-2xl overflow-hidden bg-white cursor-pointer active:scale-95 transition-transform" onClick={onClick}>
      <div className="relative" style={{ height: 180 }}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        {product.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <PlayCircleFilled style={{ fontSize: 44, color: 'white' }} />
          </div>
        )}
        {product.tags && product.tags[0] && (
          <div className="absolute top-2 left-2 rounded-full px-2 py-0.5 text-white" style={{ fontSize: 10, background: getTagColor(product.tags[0]) }}>
            {product.tags[0]}
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="line-clamp-2" style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4, marginBottom: 6 }}>
          {product.name}
        </div>
        <div className="flex items-baseline gap-2" style={{ marginBottom: 6 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: RED }}>{formatPrice(product)}</span>
          {product.tags && product.tags.length > 1 && (
            <span className="rounded-full px-1.5 py-0.5" style={{ fontSize: 10, background: '#FFF1F0', color: RED, border: '1px solid #FFA39E' }}>
              {product.tags[1]}
            </span>
          )}
        </div>
        {/* 对比价 */}
        {product.jdPrice && product.taobaoPrice && (
          <div className="flex items-center gap-2 mt-2 rounded-xl px-3 py-2" style={{ background: '#FFF5F2', border: '1px solid #FFE8E0' }}>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center justify-center rounded-md flex-shrink-0" style={{ width: 22, height: 22, background: '#E1251B' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: 'white', lineHeight: 1 }}>JD</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#888', textDecoration: 'line-through' }}>¥{product.jdPrice}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center justify-center rounded-md flex-shrink-0" style={{ width: 22, height: 22, background: '#FF5000' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'white', lineHeight: 1 }}>淘</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#888', textDecoration: 'line-through' }}>¥{product.taobaoPrice}</span>
            </div>
            <span className="rounded-full px-2 py-0.5 flex-shrink-0" style={{ fontSize: 11, fontWeight: 600, color: '#52C41A', background: 'white', border: '1px solid #B7EB8F' }}>更省钱</span>
          </div>
        )}
      </div>
    </div>
  );

  // 首页
  const MallHomeTab = ({ onNavigate, setMallReturnTab }: { onNavigate: (screen: AppScreen) => void; setMallReturnTab?: (tab: 'home' | 'category' | 'cart' | 'mine') => void }) => (
    <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
      {/* Banner */}
      <div className="mx-4 mt-3 relative overflow-hidden rounded-2xl" style={{ height: 140 }}>
        {POINTS_HOT_BANNERS.map((banner, idx) => (
          <div key={banner.id} className="absolute inset-0 transition-opacity duration-500" style={{ opacity: idx === bannerIndex ? 1 : 0 }}>
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-end" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }}>
              <div className="px-4 pb-3 text-white">
                <div style={{ fontSize: 15, fontWeight: 700 }}>{banner.title}</div>
                {banner.sub && <div style={{ fontSize: 12, opacity: 0.85 }}>{banner.sub}</div>}
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-2 right-3 flex gap-1.5">
          {POINTS_HOT_BANNERS.map((_, idx) => (
            <div key={idx} className="rounded-full" style={{ width: 6, height: 6, background: idx === bannerIndex ? 'white' : 'rgba(255,255,255,0.4)' }} />
          ))}
        </div>
      </div>

      {/* 金刚区 */}
      <div className="mx-4 mt-4 rounded-2xl p-4 bg-white">
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: ShoppingOutlined, label: '我的订单', bgColor: '#FF7875', key: 'orders' },
            { icon: HeartOutlined, label: '我的收藏', bgColor: '#FFA8B4', key: 'favorites' },
            { icon: EnvironmentOutlined, label: '收货地址', bgColor: '#52C41A', key: 'address' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform" onClick={() => {
              if (item.key === 'orders') { if (setMallReturnTab) setMallReturnTab('home'); onNavigate('points-records'); }
              else if (item.key === 'favorites') { if (setMallReturnTab) setMallReturnTab('home'); onNavigate('mall-favorites'); }
              else if (item.key === 'address') { if (setMallReturnTab) setMallReturnTab('home'); onNavigate('mall-address'); }
            }}>
              <div className="flex items-center justify-center rounded-full" style={{ width: 48, height: 48, background: item.bgColor }}>
                <item.icon style={{ fontSize: 22, color: 'white' }} />
              </div>
              <span style={{ fontSize: 12, color: '#1A1A1A' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 好物推荐 - 单列卡片 */}
      <div className="mx-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GiftOutlined style={{ fontSize: 20, color: '#FF6B35' }} />
            <span style={{ fontSize: 17, fontWeight: 700 }}>好物推荐</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {MALL_PRODUCTS.filter(p => p.tags?.includes('热卖') || p.tags?.includes('热门')).slice(0, 4).map(product => (
            <HotProductCard key={product.id} product={product} onClick={() => onOpenDetail({ ...product, points: product.points || 0, cash: product.cash || 0 })} />
          ))}
        </div>
      </div>
    </div>
  );

  // 分类页
  const MallCategoryTab = () => (
    <div className="flex flex-1" style={{ minHeight: 0 }}>
      <div className="flex flex-col flex-shrink-0 overflow-y-auto" style={{ width: 88, background: '#F5F5F5' }}>
        {MALL_CATEGORIES.map(cat => (
          <div key={cat.id} className="flex items-center cursor-pointer" style={{
            height: 56, paddingLeft: 12,
            background: activeCategory === cat.id ? 'white' : 'transparent',
            borderLeft: activeCategory === cat.id ? '4px solid #FF4D4F' : '4px solid transparent',
          }} onClick={() => setActiveCategory(cat.id)}>
            <span style={{ fontSize: 14, fontWeight: activeCategory === cat.id ? 600 : 400, color: activeCategory === cat.id ? RED : '#666' }}>
              {cat.name}
            </span>
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-center gap-2 mb-4" style={{ fontSize: 16, fontWeight: 600 }}>
          <div style={{ width: 24, height: 1, background: '#E8E8E8' }} />
          {MALL_CATEGORIES.find(c => c.id === activeCategory)?.name}
          <div style={{ width: 24, height: 1, background: '#E8E8E8' }} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {MALL_PRODUCTS.filter(p => p.category === activeCategory).map(product => (
            <ProductCard key={product.id} product={product} onClick={() => onOpenDetail({ ...product, points: product.points || 0, cash: product.cash || 0 })} />
          ))}
        </div>
      </div>
    </div>
  );

  // 购物车页
  const MallCartTab = () => (
    <div className="flex flex-col flex-1" style={{ minHeight: 0 }}>
      <div className="flex items-center justify-around px-4 py-2" style={{ background: 'linear-gradient(135deg, #FF4D4F, #FF7875)' }}>
        {['100%正品保证', '所有商品精挑细选', '售后无忧'].map((item, idx) => (
          <div key={idx} className="flex items-center gap-1 text-white" style={{ fontSize: 11 }}>
            <CheckCircleFilled style={{ fontSize: 12 }} />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <span style={{ fontSize: 14 }}>购物数量 <span style={{ fontSize: 16, fontWeight: 700, color: RED }}>{cartItems.length}</span></span>
      </div>
      <div className="flex-1 overflow-y-auto pb-20 px-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <ShoppingOutlined style={{ fontSize: 64, color: '#CCC' }} />
            <div style={{ fontSize: 14, color: '#999', marginTop: 16 }}>暂无商品，去添加点什么吧</div>
          </div>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex gap-3 p-3 rounded-2xl bg-white">
                <div className="w-5 h-5 rounded border-2 flex items-center justify-center mt-6 cursor-pointer" style={{
                  borderColor: item.selected ? RED : '#DDD', background: item.selected ? RED : 'white',
                }} onClick={() => setCartItems(items => items.map((i, j) => j === idx ? { ...i, selected: !i.selected } : i))}>
                  {item.selected && <CheckCircleFilled style={{ fontSize: 16, color: 'white' }} />}
                </div>
                <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="line-clamp-2" style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{item.product.name}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: RED, marginTop: 4 }}>{formatPrice(item.product)}</div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" style={{ background: '#F5F5F5' }} onClick={() => item.quantity > 1 && setCartItems(items => items.map((i, j) => j === idx ? { ...i, quantity: i.quantity - 1 } : i))}>
                        <MinusOutlined style={{ fontSize: 12 }} />
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 600, minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" style={{ background: '#F5F5F5' }} onClick={() => setCartItems(items => items.map((i, j) => j === idx ? { ...i, quantity: i.quantity + 1 } : i))}>
                        <PlusOutlined style={{ fontSize: 12 }} />
                      </div>
                    </div>
                    <DeleteOutlined style={{ fontSize: 18, color: '#999' }} onClick={() => setCartItems(items => items.filter((_, j) => j !== idx))} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white" style={{ borderTop: '1px solid #F0F0F0' }}>
          <div>
            <div style={{ fontSize: 13, color: '#999' }}>合计</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: RED }}>¥{totalCash.toFixed(2)}{totalPoints > 0 && <span className="ml-1">+{totalPoints}积分</span>}</div>
          </div>
          <button className="rounded-full text-white cursor-pointer active:scale-95 transition-transform" style={{ height: 48, padding: '0 32px', fontSize: 16, fontWeight: 600, background: 'linear-gradient(135deg, #FF4D4F, #FF7875)' }}>
            去结算({selectedCount})
          </button>
        </div>
      )}
    </div>
  );

  // 我的页面
  const MallMineTab = ({ onNavigate, setMallReturnTab }: { onNavigate: (screen: AppScreen) => void; setMallReturnTab?: (tab: 'home' | 'category' | 'cart' | 'mine') => void }) => (
    <div className="flex flex-col flex-1" style={{ minHeight: 0 }}>
      <div className="flex items-center px-4 pt-4 pb-6" style={{ background: 'linear-gradient(135deg, #FF4D4F, #FF7875)' }}>
        <div className="flex items-center justify-center rounded-full" style={{ width: 64, height: 64, background: '#FFF0F0', border: '3px solid white', fontSize: 28, fontWeight: 700, color: RED }}>
          {MALL_USER.name.charAt(0)}
        </div>
        <div className="ml-4 flex-1">
          <div style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>{MALL_USER.name}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>益寿号：{MALL_USER.uid}</div>
        </div>
        <SettingOutlined style={{ fontSize: 22, color: 'white' }} />
      </div>

      <div className="flex items-center justify-around mx-4 -mt-4 p-4 rounded-2xl bg-white">
        {[
          { label: '余额', value: `¥${MALL_USER.balance.toFixed(2)}` },
          { label: '积分', value: MALL_USER.points.toLocaleString() },
          { label: '优惠券', value: MALL_USER.coupons.toString() },
          { label: '收藏', value: MALL_USER.favorites.toString() },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div style={{ fontSize: 18, fontWeight: 800, color: RED }}>{item.value}</div>
            <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{item.label}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pb-20 px-4 pt-4">
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontSize: 16, fontWeight: 700 }}>我的订单</span>
            <div className="flex items-center gap-1 cursor-pointer active:opacity-70" style={{ fontSize: 13, color: '#999' }} onClick={() => { if (setMallReturnTab) setMallReturnTab('mine'); onNavigate('points-records'); }}>
              查看全部<RightOutlined style={{ fontSize: 10 }} />
            </div>
          </div>
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform" onClick={() => { if (setMallReturnTab) setMallReturnTab('mine'); onNavigate('points-records'); }}>
              <ShoppingOutlined style={{ fontSize: 26, color: '#FA8C16' }} />
              <span className="mt-1" style={{ fontSize: 12 }}>待付款</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform" onClick={() => { if (setMallReturnTab) setMallReturnTab('mine'); onNavigate('points-records'); }}>
              <ShoppingOutlined style={{ fontSize: 26, color: '#1677FF' }} />
              <span className="mt-1" style={{ fontSize: 12 }}>待发货</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform" onClick={() => { if (setMallReturnTab) setMallReturnTab('mine'); onNavigate('points-records'); }}>
              <ShoppingOutlined style={{ fontSize: 26, color: '#52C41A' }} />
              <span className="mt-1" style={{ fontSize: 12 }}>待收货</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform" onClick={() => { if (setMallReturnTab) setMallReturnTab('mine'); onNavigate('points-records'); }}>
              <ShoppingOutlined style={{ fontSize: 26, color: '#722ED1' }} />
              <span className="mt-1" style={{ fontSize: 12 }}>待评价</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform" onClick={() => { if (setMallReturnTab) setMallReturnTab('mine'); onNavigate('points-records'); }}>
              <ShoppingOutlined style={{ fontSize: 26, color: '#999' }} />
              <span className="mt-1" style={{ fontSize: 12 }}>售后</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 mt-3">
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontSize: 16, fontWeight: 700 }}>我的服务</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: CrownOutlined, label: '会员中心', color: '#FFC53D' },
              { icon: EnvironmentOutlined, label: '收货地址', color: '#52C41A' },
              { icon: TagOutlined, label: '优惠券', color: '#FF4D4F' },
              { icon: GiftOutlined, label: '积分明细', color: '#FA8C16' },
              { icon: CalendarOutlined, label: '签到中心', color: '#1677FF' },
              { icon: CustomerServiceOutlined, label: '客服中心', color: '#722ED1' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform">
                <div className="flex items-center justify-center rounded-full mb-1" style={{ width: 40, height: 40, background: `${item.color}20` }}>
                  <item.icon style={{ fontSize: 20, color: item.color }} />
                </div>
                <span style={{ fontSize: 11 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center py-4">
          <span style={{ fontSize: 12, color: '#999' }}>© 益寿巴渝版权所有</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col" style={{ background: '#F5F5F5', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* 状态栏 */}
      <div className="flex items-center justify-between px-7 flex-shrink-0" style={{ background: 'white', height: 44, paddingTop: 6, position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>09:41</span>
        <div style={{ width: 96, height: 30, background: '#1A1A1A', borderRadius: 20, position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)' }} />
        <div className="flex items-center gap-1.5" style={{ opacity: 0.8 }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ color: '#1A1A1A' }}>
            <circle cx="8" cy="10.5" r="1.5" fill="currentColor" />
            <path d="M4.8 7.4C5.7 6.5 6.8 6 8 6s2.3.5 3.2 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <path d="M2 4.6C3.5 3.1 5.6 2.2 8 2.2s4.5.9 6 2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" style={{ color: '#1A1A1A' }}>
            <rect x="0.6" y="0.6" width="19.8" height="10.8" rx="2.2" stroke="currentColor" strokeWidth="1.2" />
            <rect x="2.2" y="2.2" width="14" height="7.6" rx="1.2" fill="currentColor" />
            <path d="M21.5 4.2v3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 导航栏 */}
      <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', flex: 1, textAlign: 'center' }}>积分商城</div>
        {/* 积分余额 */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ background: '#FFF7E6' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#FF8C00" strokeWidth="2"/>
            <text x="12" y="16" textAnchor="middle" fill="#FF8C00" fontSize="12" fontWeight="bold">P</text>
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#FF8C00' }}>{userPoints.toLocaleString()}</span>
        </div>
      </div>

      {/* Tab 内容 */}
      <div className="flex-1 flex flex-col" style={{ minHeight: 0 }}>
        {mallTab === 'home' && <MallHomeTab onNavigate={onNavigate} setMallReturnTab={setMallReturnTab} />}
        {mallTab === 'category' && <MallCategoryTab />}
        {mallTab === 'cart' && <MallCartTab />}
        {mallTab === 'mine' && <MallMineTab onNavigate={onNavigate} setMallReturnTab={setMallReturnTab} />}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Points Records Screen
// ─────────────────────────────────────────────
interface PointsRecord {
  id: number;
  goodsId: number;
  goodsName: string;
  image: string;
  time: string;
  status: '待付款' | '待收货' | '已完成' | '已取消';
  logistics?: string;
}

const POINTS_RECORDS: PointsRecord[] = [
  { id: 1, goodsId: 1, goodsName: '304不锈钢保温杯', image: 'https://picsum.photos/seed/保温杯/200/200', time: '2026-04-25 14:32', status: '待付款' },
  { id: 2, goodsId: 2, goodsName: '电子体温计（耳温枪）', image: 'https://picsum.photos/seed/耳温枪/200/200', time: '2026-04-18 09:15', status: '待收货', logistics: '顺丰速运 SF1234567890' },
  { id: 3, goodsId: 3, goodsName: '社区助餐服务8折券', image: 'https://picsum.photos/seed/助餐券/200/200', time: '2026-04-10 16:44', status: '已完成' },
  { id: 4, goodsId: 4, goodsName: '广场舞U盘（100首经典曲目）', image: 'https://picsum.photos/seed/广场舞U盘/200/200', time: '2026-03-28 11:20', status: '已完成' },
  { id: 5, goodsId: 5, goodsName: '放大镜带灯老花镜', image: 'https://picsum.photos/seed/老花镜/200/200', time: '2026-03-15 15:08', status: '已取消' },
];

// ─────────────────────────────────────────────
// Points Detail Screen
// ─────────────────────────────────────────────
const PointsDetailScreen: React.FC<{ goods: PointsGoods; onBack: () => void; userPoints: number; onRedeem: (goods: PointsGoods, spec?: string) => void; onNavigate: (screen: 'mall-address') => void }> = ({ goods, onBack, userPoints, onRedeem, onNavigate }) => {
  const RED = '#FF4D4F';
  const canAfford = userPoints >= goods.points;
  const outOfStock = goods.stock === '已兑完';
  const [imgIndex, setImgIndex] = useState(0);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [afterSalesOpen, setAfterSalesOpen] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState(goods.specs?.options[0] || '');
  const [showRedeemConfirm, setShowRedeemConfirm] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showFavToast, setShowFavToast] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex flex-col" style={{ background: PAGE_BG, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* 状态栏 */}
      <div className="flex items-center justify-between px-7 flex-shrink-0" style={{ background: 'white', height: 44, paddingTop: 6, position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>09:41</span>
        <div style={{ width: 96, height: 30, background: '#1A1A1A', borderRadius: 20, position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)' }} />
        <div className="flex items-center gap-1.5" style={{ opacity: 0.8 }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ color: '#1A1A1A' }}>
            <circle cx="8" cy="10.5" r="1.5" fill="currentColor" />
            <path d="M4.8 7.4C5.7 6.5 6.8 6 8 6s2.3.5 3.2 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <path d="M2 4.6C3.5 3.1 5.6 2.2 8 2.2s4.5.9 6 2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" style={{ color: '#1A1A1A' }}>
            <rect x="0.6" y="0.6" width="19.8" height="10.8" rx="2.2" stroke="currentColor" strokeWidth="1.2" />
            <rect x="2.2" y="2.2" width="14" height="7.6" rx="1.2" fill="currentColor" />
            <path d="M21.5 4.2v3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', zIndex: 10 }}>
        <button onClick={onBack} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 active:scale-95" style={{ width: 40, height: 40 }}><ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} /></button>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', flex: 1 }}>商品详情</div>
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* 商品图片轮播 */}
        <div className="relative" style={{ height: 320 }}>
          <img src={goods.images[imgIndex] || goods.image} alt={goods.name} className="w-full h-full object-cover" />
          {/* 视频封面显示播放按钮 */}
          {goods.isVideo && imgIndex === 0 && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <PlayCircleFilled style={{ fontSize: 72, color: 'white' }} />
            </div>
          )}
          {/* 轮播指示器 */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {goods.images.map((_, idx) => (
              <div key={idx} className="rounded-full transition-all" style={{ width: 8, height: 8, background: idx === imgIndex ? 'white' : 'rgba(255,255,255,0.5)' }} />
            ))}
          </div>
          {/* 左右切换按钮 */}
          {goods.images.length > 1 && (
            <>
              <button onClick={() => setImgIndex(i => (i - 1 + goods.images.length) % goods.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 border-0 cursor-pointer flex items-center justify-center active:scale-95">
                <LeftOutlined style={{ fontSize: 14, color: 'white' }} />
              </button>
              <button onClick={() => setImgIndex(i => (i + 1) % goods.images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 border-0 cursor-pointer flex items-center justify-center active:scale-95">
                <RightOutlined style={{ fontSize: 14, color: 'white' }} />
              </button>
            </>
          )}
          {/* 库存标签 */}
          {goods.stock !== '已兑完' && (
            <div className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-white" style={{ fontSize: 12, background: 'rgba(0,0,0,0.5)' }}>
              剩余 {goods.remaining} 件
            </div>
          )}
        </div>

        {/* 商品积分价格和名称 */}
        <div className="px-4 py-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <span style={{ fontSize: 28, fontWeight: 800, color: RED }}>{goods.points.toLocaleString()}</span>
            <span style={{ fontSize: 14, color: '#888', marginTop: 6 }}>积分{goods.cash ? `+${goods.cash}元` : ''}</span>
            <span className="ml-auto" style={{ fontSize: 12, color: '#888' }}>库存：{goods.remaining}件</span>
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.5 }}>{goods.name}</div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 6 }}>{goods.desc}</div>
        </div>

        {/* 价格对比模块 */}
        <div className="mx-4 mt-3 rounded-2xl bg-white p-4">
          <div style={{ fontSize: 14, color: '#666', marginBottom: 10 }}>其他平台价格参考</div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: '#FFF5F5', flex: 1 }}>
              <div className="flex items-center justify-center rounded-md" style={{ width: 24, height: 24, background: '#E33026' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'white' }}>JD</span>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#888' }}>京东价</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>¥{goods.jdPrice || 100}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: '#FFF8F0', flex: 1 }}>
              <div className="flex items-center justify-center rounded-md" style={{ width: 24, height: 24, background: '#FF5000' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'white' }}>淘</span>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#888' }}>淘宝价</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>¥{goods.taobaoPrice || 80}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 配送至（收货地址选择） */}
        <div className="mx-4 mt-3 rounded-2xl bg-white p-4 flex items-center justify-between cursor-pointer active:bg-gray-50" onClick={() => onNavigate('mall-address')}>
          <div className="flex items-center gap-2">
            <EnvironmentOutlined style={{ fontSize: 16, color: RED }} />
            <div>
              <div style={{ fontSize: 13, color: '#888' }}>配送至</div>
              <div style={{ fontSize: 14, color: '#1A1A1A', fontWeight: 600, marginTop: 2 }}>重庆市渝中区解放碑街道中华路168号3栋2单元5-2</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>张大爷 · 138****8888</div>
            </div>
          </div>
          <RightOutlined style={{ fontSize: 14, color: '#CCC' }} />
        </div>

        {/* 选择规格 */}
        {goods.specs && (
          <div className="mx-4 mt-3 rounded-2xl bg-white p-4">
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>选择{goods.specs.label}</div>
            <div className="flex flex-wrap gap-2">
              {goods.specs.options.map(opt => (
                <button key={opt} onClick={() => setSelectedSpec(opt)} className="rounded-xl border-2 cursor-pointer active:scale-95 transition-all" style={{
                  height: 40, padding: '0 16px', fontSize: 14,
                  borderColor: selectedSpec === opt ? RED : '#E8E8E8',
                  color: selectedSpec === opt ? RED : '#666',
                  background: selectedSpec === opt ? '#FFF5F5' : 'white',
                }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 商品详情（商品介绍大图） */}
        <div className="mx-4 mt-3 rounded-2xl bg-white overflow-hidden">
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', padding: '16px 16px 12px' }}>商品详情</div>
          {goods.detailImages.map((img, idx) => (
            <img key={idx} src={img} alt={`商品详情${idx + 1}`} className="w-full object-cover" style={{ display: 'block' }} />
          ))}
        </div>

        {/* 购买须知（点击展开） */}
        <div className="mx-4 mt-3 rounded-2xl bg-white overflow-hidden">
          <button onClick={() => setPurchaseOpen(!purchaseOpen)} className="w-full p-4 flex items-center justify-between border-0 bg-transparent cursor-pointer">
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>购买须知</span>
            <DownOutlined style={{ fontSize: 12, color: '#CCC', transform: purchaseOpen ? 'rotate(180deg)' : 'none', transition: 'all 0.2s' }} />
          </button>
          {purchaseOpen && (
            <div className="px-4 pb-4 flex flex-col gap-3">
              {goods.purchaseNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircleOutlined style={{ fontSize: 16, color: RED, marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{note}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 售后须知（点击展开） */}
        <div className="mx-4 mt-3 rounded-2xl bg-white overflow-hidden mb-4">
          <button onClick={() => setAfterSalesOpen(!afterSalesOpen)} className="w-full p-4 flex items-center justify-between border-0 bg-transparent cursor-pointer">
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>售后须知</span>
            <DownOutlined style={{ fontSize: 12, color: '#CCC', transform: afterSalesOpen ? 'rotate(180deg)' : 'none', transition: 'all 0.2s' }} />
          </button>
          {afterSalesOpen && (
            <div className="px-4 pb-4 flex flex-col gap-3">
              {goods.afterSalesNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <SafetyCertificateOutlined style={{ fontSize: 16, color: RED, marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{note}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 我的积分提示 */}
        <div className="mx-4 mt-3 rounded-2xl bg-gray-50 p-4 flex items-center justify-between">
          <div style={{ fontSize: 14, color: '#666' }}>我的积分</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: RED }}>{userPoints.toLocaleString()} <span style={{ fontSize: 13, color: '#888' }}>积分</span></div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="flex items-center flex-shrink-0 px-4 py-3 gap-3" style={{ background: 'white', borderTop: '1px solid #F0F0F0', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowShare(true)} className="flex flex-col items-center cursor-pointer bg-transparent border-0 active:scale-90 transition-transform">
            <ShareAltOutlined style={{ fontSize: 22, color: '#666' }} />
            <span style={{ fontSize: 10, color: '#666', marginTop: 2 }}>分享</span>
          </button>
          <button onClick={() => { setIsFavorited(!isFavorited); setShowFavToast(true); setTimeout(() => setShowFavToast(false), 2000); }} className="flex flex-col items-center cursor-pointer bg-transparent border-0 active:scale-90 transition-transform">
            {isFavorited ? <HeartFilled style={{ fontSize: 22, color: RED }} /> : <HeartOutlined style={{ fontSize: 22, color: '#666' }} />}
            <span style={{ fontSize: 10, color: isFavorited ? RED : '#666', marginTop: 2 }}>{isFavorited ? '已收藏' : '收藏'}</span>
          </button>
        </div>
        <button onClick={() => { if (canAfford && !outOfStock) setShowRedeemConfirm(true); }}
          className="rounded-2xl border-0 cursor-pointer active:scale-95" style={{ height: 56, fontSize: 17, fontWeight: 700, color: 'white', background: outOfStock ? '#CCC' : canAfford ? RED : '#CCC', flex: 1 }}>
          {outOfStock ? '已兑完' : canAfford ? '立即兑换' : '积分不足'}
        </button>
      </div>

      {/* 收藏提示 */}
      {showFavToast && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-xl px-6 py-3" style={{ background: 'rgba(0,0,0,0.75)', color: 'white', fontSize: 14 }}>
          {isFavorited ? '已收藏' : '已取消收藏'}
        </div>
      )}

      {/* 分享弹窗 */}
      {showShare && (
        <div className="absolute inset-0 z-[400] flex items-end" style={{ background: 'rgba(0,0,0,0.45)' }} onClick={() => setShowShare(false)}>
          <div className="w-full bg-white rounded-t-3xl" style={{ paddingBottom: 24 }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-center pt-3 pb-1">
              <div style={{ width: 36, height: 4, background: '#E0E0E0', borderRadius: 2 }} />
            </div>
            <div className="px-4 pt-3 pb-1 text-center" style={{ fontSize: 14, color: '#888' }}>分享到</div>
            <div className="flex justify-around px-4 py-4">
              {[
                { label: '私信好友', Icon: MessageOutlined, color: '#FF6B35', bg: '#FFF4EF' },
                { label: '微信好友', Icon: WechatOutlined, color: '#07C160', bg: '#E8FFF0' },
                { label: '朋友圈', Icon: TeamOutlined, color: '#07C160', bg: '#E8FFF0' },
                { label: '复制链接', Icon: CopyOutlined, color: '#1677FF', bg: '#E6F4FF' },
              ].map((opt) => {
                const { Icon } = opt;
                const isCopyDone = copied && opt.label === '复制链接';
                return (
                  <button
                    key={opt.label}
                    onClick={() => {
                      if (opt.label === '复制链接') {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }
                      if (opt.label !== '复制链接') setShowShare(false);
                    }}
                    className="flex flex-col items-center gap-2 border-0 bg-transparent cursor-pointer active:scale-95 transition-transform"
                  >
                    <div className="flex items-center justify-center rounded-2xl"
                      style={{ width: 58, height: 58, background: isCopyDone ? '#F6FFED' : opt.bg }}>
                      {isCopyDone
                        ? <CheckCircleFilled style={{ fontSize: 28, color: '#52C41A' }} />
                        : <Icon style={{ fontSize: 28, color: opt.color }} />}
                    </div>
                    <span style={{ fontSize: 12, color: '#444' }}>{isCopyDone ? '已复制' : opt.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="px-4 pt-2">
              <button onClick={() => setShowShare(false)}
                className="w-full rounded-2xl border-0 cursor-pointer font-medium"
                style={{ height: 52, background: '#F5F5F5', fontSize: 16, color: '#555' }}>取消</button>
            </div>
          </div>
        </div>
      )}

      {/* 确认兑换弹窗 */}
      {showRedeemConfirm && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }}>
          <div className="w-full bg-white rounded-t-3xl" style={{ paddingBottom: 48 }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>确认兑换</div>
              <button onClick={() => setShowRedeemConfirm(false)} className="border-0 bg-transparent cursor-pointer text-2xl" style={{ color: '#AAA', lineHeight: 1 }}>×</button>
            </div>
            <div className="px-5 py-4 flex flex-col gap-4">
              {/* 商品信息 */}
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#F6F6F6' }}>
                <img src={goods.image} alt={goods.name} className="rounded-lg flex-shrink-0" style={{ width: 60, height: 60, objectFit: 'cover' }} />
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4 }}>{goods.name}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: RED, marginTop: 4 }}>
                    {goods.points.toLocaleString()}积分{goods.cash ? `+${goods.cash}元` : ''}
                  </div>
                </div>
              </div>
              {/* 兑换信息 */}
              <div className="flex flex-col gap-3">
                {[
                  { label: '兑换规格', value: goods.specs ? `${goods.specs.label}：${selectedSpec}` : '默认' },
                  { label: '配送地址', value: '重庆市渝中区解放碑街道中华路168号3栋2单元5-2' },
                  { label: '收货人', value: '张大爷 · 138****8888' },
                ].map(row => (
                  <div key={row.label} className="flex items-start justify-between" style={{ borderBottom: '1px solid #F5F5F5', paddingBottom: 12 }}>
                    <span style={{ fontSize: 15, color: '#888', flexShrink: 0 }}>{row.label}</span>
                    <span style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
                  </div>
                ))}
              </div>
              {/* 费用明细 */}
              <div className="p-3 rounded-xl" style={{ background: '#FFF8E6', border: '1px solid #FFE58F' }}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: 14, color: '#8C6800' }}>积分</span>
                  <span style={{ fontSize: 14, color: '#8C6800' }}>-{goods.points.toLocaleString()}</span>
                </div>
                {goods.cash && (
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: 14, color: '#8C6800' }}>现金支付</span>
                    <span style={{ fontSize: 14, color: '#8C6800' }}>+{goods.cash}元</span>
                  </div>
                )}
                <div className="flex items-center justify-between" style={{ borderTop: '1px dashed #FFE58F', paddingTop: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#8C6800' }}>还需支付</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: RED }}>{goods.cash ? `${goods.cash}元` : '0元'}</span>
                </div>
              </div>
              <button onClick={() => {
                setShowRedeemConfirm(false);
                onRedeem(goods, selectedSpec);
              }}
                className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
                style={{ height: 54, background: RED, fontSize: 17 }}>
                确认兑换
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Points Records Screen
// ─────────────────────────────────────────────
const PointsRecordsScreen: React.FC<{ onBack: () => void; onViewDetail: (record: PointsRecord) => void }> = ({ onBack, onViewDetail }) => {
  const RED = '#E8302A';
  const [activeTab, setActiveTab] = useState('全部');
  const STATUS_TABS = ['全部', '待付款', '待收货', '已完成', '已取消'];

  const filteredRecords = activeTab === '全部' ? POINTS_RECORDS : POINTS_RECORDS.filter(r => r.status === activeTab);

  const getStatusColor = (status: string) => {
    if (status === '待付款') return { bg: '#FFF0F0', text: RED };
    if (status === '待收货') return { bg: '#E6F4FF', text: '#1677FF' };
    if (status === '已完成') return { bg: '#F6FFED', text: '#52C41A' };
    if (status === '已取消') return { bg: '#F5F5F5', text: '#999' };
    return { bg: '#F5F5F5', text: '#999' };
  };

  return (
    <div className="flex flex-col" style={{ background: PAGE_BG, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* 状态栏 */}
      <div className="flex items-center justify-between px-7 flex-shrink-0" style={{ background: 'white', height: 44, paddingTop: 6, position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>09:41</span>
        <div style={{ width: 96, height: 30, background: '#1A1A1A', borderRadius: 20, position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)' }} />
        <div className="flex items-center gap-1.5" style={{ opacity: 0.8 }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ color: '#1A1A1A' }}>
            <circle cx="8" cy="10.5" r="1.5" fill="currentColor" />
            <path d="M4.8 7.4C5.7 6.5 6.8 6 8 6s2.3.5 3.2 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <path d="M2 4.6C3.5 3.1 5.6 2.2 8 2.2s4.5.9 6 2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" style={{ color: '#1A1A1A' }}>
            <rect x="0.6" y="0.6" width="19.8" height="10.8" rx="2.2" stroke="currentColor" strokeWidth="1.2" />
            <rect x="2.2" y="2.2" width="14" height="7.6" rx="1.2" fill="currentColor" />
            <path d="M21.5 4.2v3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 导航栏 */}
      <div className="flex items-center flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={() => onBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer" style={{ width: 54, height: 54 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div className="flex-1 flex items-center justify-center" style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>我的订单</div>
        <div style={{ width: 54 }} />
      </div>

      {/* 状态 Tab */}
      <div className="flex gap-2 px-4 py-3 flex-shrink-0" style={{ background: 'white', borderBottom: '1px solid #F0F0F0', overflowX: 'auto' }}>
        {STATUS_TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className="rounded-full border-0 cursor-pointer px-3 flex-shrink-0" style={{
            height: 30, fontSize: 12, fontWeight: activeTab === tab ? 700 : 400,
            color: activeTab === tab ? 'white' : '#666',
            background: activeTab === tab ? RED : 'white',
            border: activeTab === tab ? 'none' : '1px solid #E8E8E8',
            whiteSpace: 'nowrap',
          }}>
            {tab}
          </button>
        ))}
      </div>

      {/* 记录列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredRecords.length === 0 ? (
          <div className="flex flex-col items-center mt-16">
            <InboxOutlined style={{ fontSize: 48, color: '#E0E0E0' }} />
            <div style={{ fontSize: 15, color: '#AAA', marginTop: 12 }}>暂无兑换记录</div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredRecords.map(record => {
              const colors = getStatusColor(record.status);
              return (
                <div key={record.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 cursor-pointer active:bg-gray-50" onClick={() => onViewDetail(record)}>
                  <img src={record.image} alt={record.goodsName} className="rounded-xl object-cover flex-shrink-0" style={{ width: 56, height: 56 }} />
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A' }} className="truncate">{record.goodsName}</div>
                    <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{record.time}</div>
                    {record.logistics && <div style={{ fontSize: 10, color: RED, marginTop: 2 }} className="truncate">{record.logistics}</div>}
                  </div>
                  <div className="rounded-lg px-1.5 py-0.5" style={{ background: colors.bg, fontSize: 11, fontWeight: 600, color: colors.text, flexShrink: 0, whiteSpace: 'nowrap' }}>
                    {record.status}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Order Detail Screen (订单详情)
// ─────────────────────────────────────────────
const OrderDetailScreen: React.FC<{ record: PointsRecord; onBack: () => void; onNavigate: (screen: AppScreen) => void; onOpenGoodsDetail: (goods: PointsGoods) => void }> = ({ record, onBack, onNavigate, onOpenGoodsDetail }) => {
  const RED = '#FF4D4F';
  const PRIMARY = '#FF6B35';
  const statusColors = {
    '待付款': { bg: '#FFF4EE', text: RED, icon: '#FFF0F0' },
    '待收货': { bg: '#E6F4FF', text: '#1677FF', icon: '#E6F4FF' },
    '已完成': { bg: '#F6FFED', text: '#52C41A', icon: '#F6FFED' },
    '已取消': { bg: '#F5F5F5', text: '#999', icon: '#F5F5F5' },
  };
  const colors = statusColors[record.status as keyof typeof statusColors] || statusColors['已取消'];

  // 获取状态步骤
  const getStatusSteps = () => {
    return [
      { label: '下单', time: record.time, done: true },
      { label: '支付', time: record.status !== '待付款' ? record.time : '-', done: record.status !== '待付款' },
      { label: '发货', time: record.status === '待付款' ? '-' : '2026-04-26', done: record.status === '待收货' || record.status === '已完成' },
      { label: '收货', time: record.status === '已完成' ? '2026-04-28' : '-', done: record.status === '已完成' },
    ];
  };
  const steps = getStatusSteps();

  // 获取当前进度索引
  const getCurrentStepIndex = () => {
    if (record.status === '待付款') return 1;
    if (record.status === '待收货') return 2;
    if (record.status === '已完成') return 3;
    return 0;
  };
  const currentStep = getCurrentStepIndex();

  // 底部操作按钮
  const renderActionButtons = () => {
    if (record.status === '待付款') {
      return (
        <div className="flex gap-3">
          <button className="flex-1 py-3.5 rounded-2xl cursor-pointer border-0 font-semibold" style={{ background: 'white', color: '#666', fontSize: 15, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            取消订单
          </button>
          <button className="flex-1 py-3.5 rounded-2xl border-0 cursor-pointer font-semibold text-white" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)', fontSize: 15, boxShadow: '0 4px 12px rgba(255,107,53,0.3)' }}>
            立即付款
          </button>
        </div>
      );
    }
    if (record.status === '待收货') {
      return (
        <div className="flex gap-3">
          <button className="flex-1 py-3.5 rounded-2xl cursor-pointer border-0 font-semibold" style={{ background: 'white', color: '#1677FF', fontSize: 15, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            查看物流
          </button>
          <button className="flex-1 py-3.5 rounded-2xl border-0 cursor-pointer font-semibold text-white" style={{ background: 'linear-gradient(135deg, #52C41A, #73D13D)', fontSize: 15, boxShadow: '0 4px 12px rgba(82,196,26,0.3)' }}>
            确认收货
          </button>
        </div>
      );
    }
    if (record.status === '已完成') {
      return (
        <div className="flex gap-3">
          <button className="flex-1 py-3.5 rounded-2xl cursor-pointer border-0 font-semibold" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)', color: 'white', fontSize: 15, boxShadow: '0 4px 12px rgba(255,107,53,0.3)' }}>
            再来一单
          </button>
          <button className="flex-1 py-3.5 rounded-2xl cursor-pointer border-0 font-semibold" style={{ background: 'white', color: RED, fontSize: 15, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            评价晒单
          </button>
        </div>
      );
    }
    if (record.status === '已取消') {
      return (
        <button className="w-full py-3.5 rounded-2xl border-0 cursor-pointer font-semibold" style={{ background: '#F5F5F5', color: '#666', fontSize: 15 }}>
          删除订单
        </button>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col" style={{ background: PAGE_BG, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* 状态栏 */}
      <div className="flex items-center justify-between px-7 flex-shrink-0" style={{ background: 'white', height: 44, paddingTop: 6, position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>09:41</span>
        <div style={{ width: 96, height: 30, background: '#1A1A1A', borderRadius: 20, position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)' }} />
        <div className="flex items-center gap-1.5" style={{ opacity: 0.8 }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ color: '#1A1A1A' }}>
            <circle cx="8" cy="10.5" r="1.5" fill="currentColor" />
            <path d="M4.8 7.4C5.7 6.5 6.8 6 8 6s2.3.5 3.2 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <path d="M2 4.6C3.5 3.1 5.6 2.2 8 2.2s4.5.9 6 2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" style={{ color: '#1A1A1A' }}>
            <rect x="0.6" y="0.6" width="19.8" height="10.8" rx="2.2" stroke="currentColor" strokeWidth="1.2" />
            <rect x="2.2" y="2.2" width="14" height="7.6" rx="1.2" fill="currentColor" />
            <path d="M21.5 4.2v3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 导航栏 */}
      <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', zIndex: 10 }}>
        <button onClick={onBack} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 active:scale-95" style={{ width: 40, height: 40 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', flex: 1, textAlign: 'center' }}>订单详情</div>
        <div style={{ width: 40 }} />
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* 订单状态头部 - 渐变背景 */}
        <div className="px-5 py-6" style={{ background: `linear-gradient(180deg, ${colors.bg} 0%, ${PAGE_BG} 100%)` }}>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-2xl" style={{ width: 56, height: 56, background: colors.text, boxShadow: `0 4px 12px ${colors.text}40` }}>
              {record.status === '待付款' && <WalletOutlined style={{ fontSize: 28, color: 'white' }} />}
              {record.status === '待收货' && <CarOutlined style={{ fontSize: 28, color: 'white' }} />}
              {record.status === '已完成' && <CheckCircleOutlined style={{ fontSize: 28, color: 'white' }} />}
              {record.status === '已取消' && <CloseCircleOutlined style={{ fontSize: 28, color: 'white' }} />}
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: colors.text }}>{record.status}</div>
              <div style={{ fontSize: 13, color: colors.text, opacity: 0.8, marginTop: 4 }}>
                {record.status === '待付款' && '请在30分钟内完成支付'}
                {record.status === '待收货' && '商品配送中，请保持手机畅通'}
                {record.status === '已完成' && '感谢您的支持，欢迎再次购买'}
                {record.status === '已取消' && '订单已关闭'}
              </div>
            </div>
          </div>
        </div>

        {/* 收货地址 */}
        <div className="mx-4 rounded-2xl bg-white p-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center rounded-full" style={{ width: 36, height: 36, background: `${RED}15` }}>
              <EnvironmentOutlined style={{ fontSize: 18, color: RED }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>张大爷</span>
                <span style={{ fontSize: 14, color: '#666' }}>138****8888</span>
              </div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 6, lineHeight: 1.5 }}>重庆市渝中区解放碑街道中华路168号3栋2单元5-2</div>
            </div>
          </div>
        </div>

        {/* 商品信息 - 可点击进入商品详情 */}
        <div className="mx-4 mt-3 rounded-2xl bg-white p-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div className="flex gap-3 items-center cursor-pointer active:opacity-80" onClick={() => {
            // 根据订单找到对应的商品数据
            const goodsIndex = [0, 1, 2, 5, 6][record.goodsId - 1] || 0;
            onOpenGoodsDetail(MALL_PRODUCTS[goodsIndex]);
          }}>
            <img src={record.image} alt={record.goodsName} className="rounded-xl object-cover flex-shrink-0" style={{ width: 76, height: 76, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.5 }}>{record.goodsName}</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 6 }}>兑换时间：{record.time}</div>
              {record.logistics && (
                <div className="flex items-center gap-2 mt-2 px-2 py-1 rounded-lg" style={{ background: `${RED}10` }}>
                  <CarOutlined style={{ fontSize: 12, color: RED }} />
                  <span style={{ fontSize: 12, color: RED }}>{record.logistics}</span>
                </div>
              )}
            </div>
            <RightOutlined style={{ fontSize: 16, color: '#CCC' }} />
          </div>
        </div>

        {/* 订单进度时间线 - 改进设计 */}
        <div className="mx-4 mt-4 rounded-2xl bg-white p-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 20 }}>订单进度</div>
          {/* 横向步骤条 */}
          <div className="flex items-start">
            {steps.map((step, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center relative">
                {/* 连接线 - 在点的上方 */}
                {idx < steps.length - 1 && (
                  <div
                    className="absolute"
                    style={{
                      top: 11,
                      left: '50%',
                      right: '-50%',
                      height: 3,
                      background: idx < currentStep ? '#52C41A' : '#E8E8E8',
                      zIndex: 0,
                    }}
                  />
                )}
                {/* 圆点 */}
                <div
                  className="flex items-center justify-center rounded-full z-10"
                  style={{
                    width: 24,
                    height: 24,
                    background: idx <= currentStep ? '#52C41A' : '#E8E8E8',
                    boxShadow: idx <= currentStep ? '0 2px 8px rgba(82,196,26,0.4)' : 'none',
                  }}
                >
                  {idx < currentStep && <CheckOutlined style={{ fontSize: 12, color: 'white' }} />}
                  {idx === currentStep && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                {/* 标签 */}
                <div style={{ fontSize: 12, color: idx <= currentStep ? '#52C41A' : '#999', marginTop: 10, fontWeight: idx <= currentStep ? 600 : 400 }}>{step.label}</div>
                <div style={{ fontSize: 10, color: '#CCC', marginTop: 4 }}>{step.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 物流详情（待收货状态） */}
        {record.status === '待收货' && record.logistics && (
          <div className="mx-4 mt-3 rounded-2xl bg-white p-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-2 mb-4">
              <CarOutlined style={{ fontSize: 18, color: '#1677FF' }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>物流信息</span>
              <span style={{ fontSize: 12, color: '#888', marginLeft: 'auto' }}>{record.logistics}</span>
            </div>
            <div className="relative pl-4" style={{ borderLeft: '2px solid #E8E8E8' }}>
              <div className="absolute w-2 h-2 rounded-full bg-green-500" style={{ left: -5, top: 4 }} />
              <div style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 500, marginLeft: 8 }}>包裹已到达重庆分拨中心</div>
              <div style={{ fontSize: 11, color: '#999', marginLeft: 8, marginTop: 2 }}>2026-04-27 08:32</div>

              <div className="absolute w-2 h-2 rounded-full" style={{ left: -5, top: 44, background: '#52C41A' }} />
              <div style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 500, marginLeft: 8, marginTop: 32 }}>包裹正在配送途中</div>
              <div style={{ fontSize: 11, color: '#999', marginLeft: 8, marginTop: 2 }}>2026-04-27 14:15</div>

              <div className="absolute w-2 h-2 rounded-full" style={{ left: -5, top: 84, background: '#52C41A' }} />
              <div style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 500, marginLeft: 8, marginTop: 72 }}>商家已发货</div>
              <div style={{ fontSize: 11, color: '#999', marginLeft: 8, marginTop: 2 }}>2026-04-26 10:30</div>
            </div>
          </div>
        )}

        {/* 订单信息 */}
        <div className="mx-4 mt-3 rounded-2xl bg-white p-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>订单信息</div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span style={{ fontSize: 13, color: '#888' }}>订单编号</span>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 13, color: '#1A1A1A' }}>YS{record.id.toString().padStart(10, '0')}</span>
                <button style={{ fontSize: 12, color: PRIMARY, background: `${PRIMARY}15`, border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}>复制</button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ fontSize: 13, color: '#888' }}>下单时间</span>
              <span style={{ fontSize: 13, color: '#1A1A1A' }}>{record.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ fontSize: 13, color: '#888' }}>支付方式</span>
              <span style={{ fontSize: 13, color: '#1A1A1A' }}>积分兑换</span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部操作按钮 - 固定在手机框架内 */}
      <div className="flex-shrink-0 px-4 py-4" style={{ background: 'white', boxShadow: '0 -2px 12px rgba(0,0,0,0.08)' }}>
        {renderActionButtons()}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Mall Favorites Screen (积分商城收藏)
// ─────────────────────────────────────────────
const MallFavoritesScreen: React.FC<{ onBack: () => void; onOpenDetail: (goods: any) => void }> = ({ onBack, onOpenDetail }) => {
  const RED = '#FF4D4F';
  // 模拟收藏数据
  const favorites = [MALL_PRODUCTS[0], MALL_PRODUCTS[2], MALL_PRODUCTS[5]];

  return (
    <div className="flex flex-col" style={{ background: PAGE_BG, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* 状态栏 */}
      <div className="flex items-center justify-between px-7 flex-shrink-0" style={{ background: 'white', height: 44, paddingTop: 6, position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>09:41</span>
        <div style={{ width: 96, height: 30, background: '#1A1A1A', borderRadius: 20, position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)' }} />
        <div className="flex items-center gap-1.5" style={{ opacity: 0.8 }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ color: '#1A1A1A' }}>
            <circle cx="8" cy="10.5" r="1.5" fill="currentColor" />
            <path d="M4.8 7.4C5.7 6.5 6.8 6 8 6s2.3.5 3.2 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <path d="M2 4.6C3.5 3.1 5.6 2.2 8 2.2s4.5.9 6 2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" style={{ color: '#1A1A1A' }}>
            <rect x="0.6" y="0.6" width="19.8" height="10.8" rx="2.2" stroke="currentColor" strokeWidth="1.2" />
            <rect x="2.2" y="2.2" width="14" height="7.6" rx="1.2" fill="currentColor" />
            <path d="M21.5 4.2v3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 导航栏 */}
      <div className="flex items-center flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={() => onBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer" style={{ width: 54, height: 54 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div className="flex-1 flex items-center justify-center" style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>我的收藏</div>
        <div style={{ width: 54 }} />
      </div>

      {/* 收藏列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center mt-16">
            <HeartOutlined style={{ fontSize: 48, color: '#E0E0E0' }} />
            <div style={{ fontSize: 15, color: '#AAA', marginTop: 12 }}>暂无收藏商品</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {favorites.map(product => (
              <div key={product.id} className="rounded-2xl overflow-hidden bg-white cursor-pointer active:scale-95 transition-transform" onClick={() => onOpenDetail({ ...product, points: product.points || 0, cash: product.cash || 0 })}>
                <img src={product.image} alt={product.name} className="w-full object-cover" style={{ height: 140 }} />
                <div className="p-2">
                  <div className="line-clamp-2" style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4, marginBottom: 4 }}>{product.name}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: RED }}>
                    {product.priceType === 'points' ? `${product.points.toLocaleString()} 积分` : product.priceType === 'cash' ? `¥${product.cash}` : `¥${product.cash}+${product.points}积分`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Mall Address Screen (积分商城收货地址)
// ─────────────────────────────────────────────
const MallAddressScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const RED = '#FF4D4F';
  // 管理地址列表状态
  const [addresses, setAddresses] = useState([
    { id: 1, name: '张大爷', phone: '138****8888', address: '重庆市渝中区解放碑街道中华路168号3栋2单元5-2', isDefault: true },
    { id: 2, name: '张大爷', phone: '138****8888', address: '重庆市江北区观音桥街道建新东路36号10栋1单元3-1', isDefault: false },
    { id: 3, name: '李阿姨', phone: '139****6666', address: '重庆市南岸区南坪街道南湖路28号5栋2单元8-2', isDefault: false },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  // 新地址表单状态
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    region: '重庆市',
    detail: '',
    isDefault: false,
  });
  const [formErrors, setFormErrors] = useState({ name: '', phone: '', detail: '' });

  // 验证表单
  const validateForm = () => {
    const errors = { name: '', phone: '', detail: '' };
    let isValid = true;
    if (!newAddress.name.trim()) {
      errors.name = '请输入收货人姓名';
      isValid = false;
    }
    if (!newAddress.phone.trim()) {
      errors.phone = '请输入手机号码';
      isValid = false;
    } else if (!/^1[3-9]\d{9}$/.test(newAddress.phone.trim())) {
      errors.phone = '请输入正确的手机号码';
      isValid = false;
    }
    if (!newAddress.detail.trim()) {
      errors.detail = '请输入详细地址';
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  // 保存新地址
  const handleSaveAddress = () => {
    if (!validateForm()) return;
    const fullAddress = newAddress.region + newAddress.detail;
    const id = Math.max(...addresses.map(a => a.id)) + 1;
    let updatedAddresses;
    if (newAddress.isDefault) {
      // 取消其他默认地址
      updatedAddresses = addresses.map(a => ({ ...a, isDefault: false }));
    } else {
      updatedAddresses = [...addresses];
    }
    const newAddr = {
      id,
      name: newAddress.name.trim(),
      phone: newAddress.phone.trim().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
      address: fullAddress,
      isDefault: newAddress.isDefault || addresses.length === 0,
    };
    setAddresses([...updatedAddresses, newAddr]);
    // 重置表单并关闭弹窗
    setNewAddress({ name: '', phone: '', region: '重庆市', detail: '', isDefault: false });
    setShowAddModal(false);
  };

  // 删除地址
  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  // 设为默认
  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="flex flex-col" style={{ background: PAGE_BG, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* 状态栏 */}
      <div className="flex items-center justify-between px-7 flex-shrink-0" style={{ background: 'white', height: 44, paddingTop: 6, position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>09:41</span>
        <div style={{ width: 96, height: 30, background: '#1A1A1A', borderRadius: 20, position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)' }} />
        <div className="flex items-center gap-1.5" style={{ opacity: 0.8 }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ color: '#1A1A1A' }}>
            <circle cx="8" cy="10.5" r="1.5" fill="currentColor" />
            <path d="M4.8 7.4C5.7 6.5 6.8 6 8 6s2.3.5 3.2 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            <path d="M2 4.6C3.5 3.1 5.6 2.2 8 2.2s4.5.9 6 2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" style={{ color: '#1A1A1A' }}>
            <rect x="0.6" y="0.6" width="19.8" height="10.8" rx="2.2" stroke="currentColor" strokeWidth="1.2" />
            <rect x="2.2" y="2.2" width="14" height="7.6" rx="1.2" fill="currentColor" />
            <path d="M21.5 4.2v3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 导航栏 */}
      <div className="flex items-center flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={() => onBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer" style={{ width: 54, height: 54 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div className="flex-1 flex items-center justify-center" style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>收货地址</div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center justify-center rounded-2xl border-0 bg-transparent cursor-pointer" style={{ background: RED, color: 'white', fontSize: 13, fontWeight: 600, padding: '6px 14px', marginRight: 12 }}>
          添加
        </button>
      </div>

      {/* 地址列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-3">
          {addresses.map(addr => (
            <div key={addr.id} className="rounded-2xl bg-white p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>{addr.name}</span>
                  <span style={{ fontSize: 14, color: '#666', marginLeft: 12 }}>{addr.phone}</span>
                </div>
                {addr.isDefault && (
                  <div className="rounded-full px-2 py-0.5" style={{ background: RED, color: 'white', fontSize: 11 }}>默认</div>
                )}
              </div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{addr.address}</div>
              <div className="flex items-center justify-end gap-4 mt-3 pt-3" style={{ borderTop: '1px solid #F0F0F0' }}>
                <span className="cursor-pointer" style={{ fontSize: 13, color: '#666' }}>编辑</span>
                <span className="cursor-pointer" style={{ fontSize: 13, color: '#999' }} onClick={() => handleDelete(addr.id)}>删除</span>
                {!addr.isDefault && <span className="cursor-pointer" style={{ fontSize: 13, color: RED }} onClick={() => handleSetDefault(addr.id)}>设为默认</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 添加地址弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={(e) => { if (e.target === e.currentTarget) setShowAddModal(false); }}>
          <div className="rounded-2xl bg-white w-[340px] max-h-[80vh] overflow-y-auto">
            {/* 弹窗头部 */}
            <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid #F0F0F0' }}>
              <span className="cursor-pointer" style={{ fontSize: 14, color: '#666' }} onClick={() => setShowAddModal(false)}>取消</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>添加收货地址</span>
              <span className="cursor-pointer" style={{ fontSize: 14, color: RED }} onClick={handleSaveAddress}>保存</span>
            </div>
            {/* 表单内容 */}
            <div className="p-4">
              <div className="mb-4">
                <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>收货人</div>
                <input
                  type="text"
                  placeholder="请输入收货人姓名"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  className="w-full rounded-xl px-4 py-3"
                  style={{ background: '#F5F5F5', border: formErrors.name ? '1px solid #FF4D4F' : 'none', fontSize: 14 }}
                />
                {formErrors.name && <div style={{ fontSize: 12, color: RED, marginTop: 4 }}>{formErrors.name}</div>}
              </div>
              <div className="mb-4">
                <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>手机号码</div>
                <input
                  type="tel"
                  placeholder="请输入手机号码"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  className="w-full rounded-xl px-4 py-3"
                  style={{ background: '#F5F5F5', border: formErrors.phone ? '1px solid #FF4D4F' : 'none', fontSize: 14 }}
                  maxLength={11}
                />
                {formErrors.phone && <div style={{ fontSize: 12, color: RED, marginTop: 4 }}>{formErrors.phone}</div>}
              </div>
              <div className="mb-4">
                <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>所在地区</div>
                <div className="flex items-center rounded-xl px-4 py-3" style={{ background: '#F5F5F5' }}>
                  <span style={{ fontSize: 14, color: '#1A1A1A' }}>{newAddress.region}</span>
                  <RightOutlined style={{ fontSize: 12, color: '#999', marginLeft: 'auto' }} />
                </div>
              </div>
              <div className="mb-4">
                <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>详细地址</div>
                <textarea
                  placeholder="请输入街道、楼栋、单元、门牌号"
                  value={newAddress.detail}
                  onChange={(e) => setNewAddress({ ...newAddress, detail: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 resize-none"
                  style={{ background: '#F5F5F5', border: formErrors.detail ? '1px solid #FF4D4F' : 'none', fontSize: 14, height: 80 }}
                />
                {formErrors.detail && <div style={{ fontSize: 12, color: RED, marginTop: 4 }}>{formErrors.detail}</div>}
              </div>
              <div className="flex items-center justify-between" onClick={() => setNewAddress({ ...newAddress, isDefault: !newAddress.isDefault })}>
                <span style={{ fontSize: 14, color: '#1A1A1A' }}>设为默认地址</span>
                <div className="w-11 h-6 rounded-full relative cursor-pointer transition-colors" style={{ background: newAddress.isDefault ? RED : '#E0E0E0' }}>
                  <div className="w-5 h-5 rounded-full absolute top-0.5 bg-white transition-all" style={{ left: newAddress.isDefault ? 26 : 3 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// My Wallet Screen
// ─────────────────────────────────────────────
const MyWalletScreen: React.FC<{ onBack: () => void; onNavigate?: (screen: AppScreen) => void; setMallInitialTab?: (tab: 'home' | 'mine') => void }> = ({ onBack, onNavigate, setMallInitialTab }) => {
  const digitalAssets = [
    { label: '优惠券', value: '3张可用', Icon: TagOutlined, color: '#FF6B35', bg: '#FFF4EF' },
    { label: '会员权益', value: '2项可用', Icon: CrownOutlined, color: '#1677FF', bg: '#EEF6FF' },
    { label: '到期提醒', value: '1项快到期', Icon: ClockCircleOutlined, color: '#8C6A50', bg: '#F3EEE8' },
  ];

  const recentChanges = [
    { text: '+10积分，看视频奖励', color: '#52C41A' },
    { text: '+¥2.30，数据收益到账', color: '#0F766E' },
    { text: '助餐8折券还有6天到期', color: '#FF6B35' },
  ];

  return (
    <div className="flex flex-col" style={{ background: '#F5F4F0', height: '100%', minHeight: 0 }}>
      {/* 顶部导航栏 */}
      <div className="flex items-center px-4" style={{ background: 'white', height: 52, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-1" style={{ width: 32 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div className="flex-1 text-center" style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>我的钱包</div>
        <button className="flex items-center justify-center border-0 cursor-pointer p-0" style={{ width: 32, height: 32, borderRadius: 16, background: '#F7F2EC' }}>
          <QuestionCircleOutlined style={{ fontSize: 16, color: '#8C6A50' }} />
        </button>
      </div>

      {/* 钱包内容区 */}
      <div className="flex-1 overflow-y-auto p-4" style={{ minHeight: 0, paddingBottom: 96 }}>
        {/* 资金账户主卡 */}
        <div className="rounded-2xl overflow-hidden mb-4" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #E84E21 100%)' }}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.25)' }}>
                  <WalletOutlined style={{ fontSize: 16, color: 'white' }} />
                </div>
                <div>
                  <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.92)', fontWeight: 700 }}>资金账户</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.72)', marginTop: 2 }}>可提现与不可提现分开管理</div>
                </div>
              </div>
              <div className="rounded-full px-3 py-1" style={{ background: 'rgba(255,255,255,0.18)', fontSize: 12, color: 'white', fontWeight: 700 }}>安全中</div>
            </div>
            <div className="flex items-baseline gap-2">
              <span style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>¥</span>
              <span style={{ fontSize: 32, fontWeight: 800, color: 'white', lineHeight: 1 }}>1,280.50</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.76)', marginTop: 4 }}>账户余额</div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="rounded-xl p-2.5" style={{ background: 'rgba(255,255,255,0.14)' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', marginBottom: 4 }}>可提现</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>¥850.00</div>
              </div>
              <div className="rounded-xl p-2.5" style={{ background: 'rgba(255,255,255,0.14)' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', marginBottom: 4 }}>不可提现</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>¥430.50</div>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2.5 rounded-xl border-0 cursor-pointer font-semibold" style={{ background: 'white', color: '#E84E21', fontSize: 14 }}>
                提现
              </button>
              <button className="flex-1 py-2.5 rounded-xl border-0 cursor-pointer font-semibold" style={{ background: 'rgba(255,255,255,0.18)', color: 'white', fontSize: 14 }}>
                收支明细
              </button>
              <button className="py-2.5 rounded-xl border-0 cursor-pointer font-semibold" style={{ width: 62, background: 'rgba(255,255,255,0.18)', color: 'white', fontSize: 14 }}>
                规则
              </button>
            </div>
          </div>
        </div>

        {/* 积分账户 */}
        <div className="rounded-2xl p-4 mb-4" style={{ background: 'linear-gradient(135deg, #E6F7D9 0%, #F9FFF1 100%)', border: '1px solid #D3EDBE' }}>
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <CreditCardOutlined style={{ fontSize: 18, color: '#52C41A' }} />
              <span style={{ fontSize: 17, fontWeight: 800, color: '#1A1A1A' }}>积分账户</span>
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#58704D', marginTop: 3 }}>平台奖励积分，可兑换服务和健康好物</div>
            </div>
          </div>

          <div className="flex items-end gap-2 mb-2">
            <span style={{ fontSize: 36, fontWeight: 800, color: '#1A1A1A', lineHeight: 1 }}>8,680</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#3A8F19', paddingBottom: 4 }}>积分</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ClockCircleOutlined style={{ fontSize: 14, color: '#8C6A50' }} />
              <span style={{ fontSize: 13, color: '#8C6A50' }}>320积分本月到期</span>
            </div>
            <span style={{ fontSize: 12, color: '#3A8F19', fontWeight: 700 }}>可用于兑换</span>
          </div>

          <div className="flex gap-3">
            <button disabled className="flex-1 py-3 rounded-xl border-0 font-semibold" style={{ background: 'white', color: '#3A8F19', fontSize: 14, cursor: 'default', opacity: 1 }}>
              积分明细
            </button>
            <button onClick={() => { if (setMallInitialTab) setMallInitialTab('home'); onNavigate && onNavigate('points-mall'); }} className="flex-1 py-3 rounded-xl border-0 cursor-pointer font-semibold" style={{ background: '#FF6B35', color: 'white', fontSize: 14 }}>
              去兑换
            </button>
          </div>
        </div>

        {/* 数字资产包 */}
        <div className="rounded-2xl p-4 mb-4" style={{ background: 'white' }}>
          <div className="mb-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TagOutlined style={{ fontSize: 18, color: '#1677FF' }} />
                <span style={{ fontSize: 17, fontWeight: 800, color: '#1A1A1A' }}>数字资产包</span>
              </div>
              <div style={{ fontSize: 13, color: '#777', marginTop: 4 }}>优惠券、会员权益和兑换资格统一管理</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {digitalAssets.map((item) => (
              <button key={item.label} className="rounded-xl border-0 cursor-pointer p-3 text-left" style={{ background: item.bg, minHeight: 78 }}>
                <item.Icon style={{ fontSize: 18, color: item.color, marginBottom: 10 }} />
                <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: '#6F6259' }}>{item.value}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 数据权益中心 */}
        <div className="rounded-2xl overflow-hidden mb-4" style={{ background: 'linear-gradient(135deg, #0F766E 0%, #115E8A 100%)' }}>
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <SafetyCertificateOutlined style={{ fontSize: 18, color: 'white' }} />
                  <span style={{ fontSize: 17, color: 'white', fontWeight: 800 }}>数据权益中心</span>
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6 }}>
                  查看数据贡献值、数据收益记录和授权状态
                </div>
              </div>
              <div className="rounded-full px-3 py-1.5" style={{ background: 'rgba(255,255,255,0.16)', color: 'white', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', minWidth: 64, textAlign: 'center' }}>已授权</div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.14)' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', marginBottom: 6 }}>贡献值</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'white' }}>1,260</div>
              </div>
              <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.14)' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', marginBottom: 6 }}>累计收益</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'white' }}>¥36.80</div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="flex-1 py-3 rounded-xl border-0 cursor-pointer font-semibold" style={{ background: 'white', color: '#115E8A', fontSize: 14 }}>
                收益记录
              </button>
              <button className="flex-1 py-3 rounded-xl border-0 cursor-pointer font-semibold" style={{ background: 'rgba(255,255,255,0.18)', color: 'white', fontSize: 14 }}>
                授权管理
              </button>
            </div>
          </div>
        </div>

        {/* 最近变动 */}
        <div className="rounded-2xl p-4 mb-4" style={{ background: 'white' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#1A1A1A', marginBottom: 12 }}>最近变动</div>
          <div className="flex flex-col gap-3">
            {recentChanges.map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <span style={{ width: 8, height: 8, borderRadius: 4, background: item.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#4D453E' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 资金说明 */}
        <div className="rounded-xl p-4" style={{ background: '#FFF7E6' }}>
          <div className="flex items-start gap-2">
            <ExclamationCircleOutlined style={{ fontSize: 16, color: '#FA8C16', marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#8C6A50', marginBottom: 4 }}>资金说明</div>
              <div style={{ fontSize: 13, color: '#8C6A50', lineHeight: 1.6 }}>
                不可提现余额来自平台补贴、红包和活动奖励，仅限在平台内消费使用。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// My Dynamics Screen
// ─────────────────────────────────────────────
const MyDynamicsScreen: React.FC<{
  onBack: () => void;
  onOpenPost: (post: FollowPost) => void;
  onOpenVideo: (post: FollowPost, pool?: FollowPost[]) => void;
}> = (props) => (
  <TimelineGridScreen title="我的动态" posts={MY_DYNAMICS_POSTS} showAuthor={false} enableDelete {...props} />
);

// ─────────────────────────────────────────────
// My Favorites Screen
// ─────────────────────────────────────────────
const MyFavoritesScreen: React.FC<{
  onBack: () => void;
  onOpenPost: (post: FollowPost) => void;
  onOpenVideo: (post: FollowPost, pool?: FollowPost[], isFromFavorites?: boolean) => void;
}> = (props) => (
  <TimelineGridScreen title="我的收藏" posts={MY_FAVORITES_POSTS} showAuthor={true} {...props} />
);

// ─────────────────────────────────────────────
// Follow List Screen (互关/粉丝/关注)
// ─────────────────────────────────────────────
type FollowTab = 'mutual' | 'followers' | 'following';

interface FollowListUser {
  id: number;
  name: string;
  note?: string;
  avatar?: string;
  gender: '♂' | '♀';
  age: number;
  location: string;
}

const MUTUAL_USERS: FollowListUser[] = [
  { id: 2, name: '李秀英', note: '广场舞姐妹', gender: '♀', age: 63, location: '重庆渝中区', avatar: 'https://picsum.photos/seed/lixiuying/76/76' },
  { id: 3, name: '王翠华', note: '书法班老王', gender: '♀', age: 67, location: '重庆江北区', avatar: 'https://picsum.photos/seed/wangcuihua/76/76' },
  { id: 5, name: '赵阿姨', note: '', gender: '♀', age: 61, location: '重庆沙坪坝区', avatar: 'https://picsum.photos/seed/zhaoayi/76/76' },
  { id: 8, name: '陈大爷', note: '钓鱼高手', gender: '♂', age: 69, location: '重庆南岸区', avatar: 'https://picsum.photos/seed/chendaye/76/76' },
  { id: 10, name: '周婆婆', note: '', gender: '♀', age: 65, location: '重庆渝北区', avatar: 'https://picsum.photos/seed/zhoupopo/76/76' },
  { id: 11, name: '吴老师', note: '太极教练', gender: '♂', age: 71, location: '重庆九龙坡区', avatar: 'https://picsum.photos/seed/wulaoshi/76/76' },
  { id: 12, name: '孙大哥', note: '摄影爱好者', gender: '♂', age: 64, location: '重庆大渡口区', avatar: 'https://picsum.photos/seed/sundage/76/76' },
  { id: 13, name: '郑阿姨', note: '', gender: '♀', age: 58, location: '重庆巴南区', avatar: 'https://picsum.photos/seed/zhengayi/76/76' },
  { id: 14, name: '黄婆婆', note: '养生达人', gender: '♀', age: 70, location: '重庆北碚区', avatar: 'https://picsum.photos/seed/huangpopo/76/76' },
  { id: 15, name: '刘大爷', note: '', gender: '♂', age: 68, location: '重庆璧山区', avatar: 'https://picsum.photos/seed/liudaye/76/76' },
];

const FOLLOWERS_USERS: FollowListUser[] = [
  { id: 4, name: '马建国', note: '', gender: '♂', age: 65, location: '重庆沙坪坝区', avatar: 'https://picsum.photos/seed/majianguo/76/76' },
  { id: 6, name: '刘秀兰', note: '邻居', gender: '♀', age: 62, location: '重庆南岸区', avatar: 'https://picsum.photos/seed/liuxiulan/76/76' },
  { id: 7, name: '张桂英', note: '', gender: '♀', age: 70, location: '重庆渝中区', avatar: 'https://picsum.photos/seed/zhangguiying/76/76' },
  { id: 9, name: '王明华', note: '牌友老王', gender: '♂', age: 72, location: '重庆江北区', avatar: 'https://picsum.photos/seed/wangminghua/76/76' },
  { id: 16, name: '李秀芬', note: '', gender: '♀', age: 59, location: '重庆渝北区', avatar: 'https://picsum.photos/seed/lixiufen/76/76' },
  { id: 17, name: '陈秀英', note: '舞蹈班', gender: '♀', age: 64, location: '重庆九龙坡区', avatar: 'https://picsum.photos/seed/chenxiuying/76/76' },
  { id: 18, name: '赵桂兰', note: '', gender: '♀', age: 66, location: '重庆大渡口区', avatar: 'https://picsum.photos/seed/zhaoguilan/76/76' },
  { id: 19, name: '钱大爷', note: '棋友', gender: '♂', age: 68, location: '重庆巴南区', avatar: 'https://picsum.photos/seed/qiandaye/76/76' },
  { id: 20, name: '孙秀英', note: '', gender: '♀', age: 63, location: '重庆北碚区', avatar: 'https://picsum.photos/seed/sunxiuying/76/76' },
  { id: 21, name: '周大爷', note: '', gender: '♂', age: 71, location: '重庆璧山区', avatar: 'https://picsum.photos/seed/zhoudaye/76/76' },
  { id: 22, name: '吴秀兰', note: '', gender: '♀', age: 67, location: '重庆沙坪坝区', avatar: 'https://picsum.photos/seed/wuxiulan/76/76' },
  { id: 23, name: '郑建国', note: '', gender: '♂', age: 60, location: '重庆南岸区', avatar: 'https://picsum.photos/seed/zhengjianguo/76/76' },
];

const FOLLOWING_USERS: FollowListUser[] = [
  { id: 3, name: '王翠华', note: '书法班老王', gender: '♀', age: 67, location: '重庆江北区', avatar: 'https://picsum.photos/seed/wangcuihua/76/76' },
  { id: 8, name: '陈大爷', note: '钓鱼高手', gender: '♂', age: 69, location: '重庆南岸区', avatar: 'https://picsum.photos/seed/chendaye/76/76' },
  { id: 24, name: '许秀英', note: '', gender: '♀', age: 65, location: '重庆渝中区', avatar: 'https://picsum.photos/seed/xuxiuying/76/76' },
  { id: 25, name: '蒋建国', note: '太极爱好者', gender: '♂', age: 66, location: '重庆江北区', avatar: 'https://picsum.photos/seed/jiangjianguo/76/76' },
  { id: 26, name: '韩秀兰', note: '', gender: '♀', age: 69, location: '重庆沙坪坝区', avatar: 'https://picsum.photos/seed/hanxiulan/76/76' },
  { id: 27, name: '冯桂英', note: '', gender: '♀', age: 64, location: '重庆南岸区', avatar: 'https://picsum.photos/seed/fengguiying/76/76' },
  { id: 28, name: '董大爷', note: '', gender: '♂', age: 73, location: '重庆渝北区', avatar: 'https://picsum.photos/seed/dongdaye/76/76' },
  { id: 29, name: '楚秀英', note: '', gender: '♀', age: 61, location: '重庆九龙坡区', avatar: 'https://picsum.photos/seed/chuxiuying/76/76' },
  { id: 30, name: '薛婆婆', note: '养生班', gender: '♀', age: 68, location: '重庆大渡口区', avatar: 'https://picsum.photos/seed/xuepopo/76/76' },
  { id: 31, name: '卫建国', note: '', gender: '♂', age: 67, location: '重庆巴南区', avatar: 'https://picsum.photos/seed/weijianguo/76/76' },
  { id: 32, name: '曹秀芬', note: '', gender: '♀', age: 62, location: '重庆北碚区', avatar: 'https://picsum.photos/seed/caoxiufen/76/76' },
  { id: 33, name: '严大爷', note: '书法爱好者', gender: '♂', age: 70, location: '重庆璧山区', avatar: 'https://picsum.photos/seed/yandaye/76/76' },
];

const FollowListScreen: React.FC<{
  onBack: () => void;
  onOpenUserProfile: (userId: number) => void;
}> = ({ onBack, onOpenUserProfile }) => {
  const [activeTab, setActiveTab] = useState<FollowTab>('mutual');
  const [searchText, setSearchText] = useState('');
  const [followingSet, setFollowingSet] = useState<Set<number>>(new Set(FOLLOWING_USERS.map(u => u.id)));
  const [mutualSet, setMutualSet] = useState<Set<number>>(new Set(MUTUAL_USERS.map(u => u.id)));

  const getData = () => {
    if (activeTab === 'mutual') return MUTUAL_USERS;
    if (activeTab === 'followers') return FOLLOWERS_USERS;
    return FOLLOWING_USERS;
  };

  const filtered = getData().filter(u =>
    u.name.includes(searchText) || (u.note && u.note.includes(searchText))
  );

  const handleFollowToggle = (userId: number) => {
    setFollowingSet(prev => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  const handleMutualToggle = (userId: number) => {
    setMutualSet(prev => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full" style={{ background: PAGE_BG }}>
      {/* 顶部导航栏 */}
      <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>互关/粉丝/关注</span>
      </div>

      {/* 搜索框 */}
      <div className="flex-shrink-0" style={{ padding: '12px 16px', background: 'white', borderBottom: '1px solid #F0F0F0' }}>
        <div className="flex items-center rounded-xl px-3" style={{ height: 38, background: '#F5F4F0' }}>
          <SearchOutlined style={{ fontSize: 16, color: '#999', marginRight: 6 }} />
          <input
            className="flex-1 border-0 outline-none bg-transparent"
            style={{ fontSize: 14, color: '#1A1A1A' }}
            placeholder="搜索用户昵称或备注"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          {searchText.length > 0 && (
            <button onClick={() => setSearchText('')} className="border-0 bg-transparent cursor-pointer p-0">
              <CloseCircleFilled style={{ fontSize: 16, color: '#999' }} />
            </button>
          )}
        </div>
      </div>

      {/* Tab 切换栏 */}
      <div className="flex-shrink-0" style={{ background: 'white', borderBottom: '1px solid #F0F0F0', display: 'flex' }}>
        {([
          { key: 'mutual' as FollowTab, label: '互关', count: MUTUAL_USERS.length },
          { key: 'followers' as FollowTab, label: '粉丝', count: FOLLOWERS_USERS.length },
          { key: 'following' as FollowTab, label: '关注', count: FOLLOWING_USERS.length },
        ]).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex-1 border-0 bg-transparent cursor-pointer relative"
            style={{ height: 48, fontSize: 15, fontWeight: activeTab === tab.key ? 600 : 400, color: activeTab === tab.key ? PRIMARY : '#888', background: 'transparent' }}>
            {tab.label} ({tab.count})
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-1/2" style={{ width: 40, height: 3, background: PRIMARY, borderRadius: 2, transform: 'translateX(-50%)' }} />
            )}
          </button>
        ))}
      </div>

      {/* 用户列表 */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center" style={{ paddingTop: 80 }}>
            <SearchOutlined style={{ fontSize: 48, color: '#DDD', marginBottom: 16 }} />
            <div style={{ fontSize: 15, color: '#999' }}>未找到相关用户</div>
          </div>
        ) : (
          filtered.map((user, index) => (
            <div key={user.id} className="flex items-center bg-white"
              style={{ padding: '12px 16px', borderBottom: index < filtered.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
              {/* 头像 */}
              <button onClick={() => onOpenUserProfile(user.id)} className="flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 border-0 bg-transparent cursor-pointer"
                style={{ width: 48, height: 48 }}>
                <img src={user.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </button>

              {/* 用户信息 */}
              <button onClick={() => onOpenUserProfile(user.id)} className="flex-1 mx-3 text-left border-0 bg-transparent cursor-pointer">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{user.name}</span>
                  {user.note && (
                    <span className="text-xs rounded px-1 py-0.5" style={{ background: '#FFF3E0', color: '#FF6B35' }}>{user.note}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5" style={{ fontSize: 13, color: '#888' }}>
                  <span>{user.gender} · {user.age}岁</span>
                  <span>·</span>
                  <span>{user.location}</span>
                </div>
              </button>

              {/* 操作按钮 */}
              <div className="flex-shrink-0">
                {activeTab === 'mutual' && (
                  mutualSet.has(user.id) ? (
                    <button onClick={() => handleMutualToggle(user.id)} className="rounded-full px-3 py-1.5 text-xs border-0 cursor-pointer"
                      style={{ background: '#FFF3E0', color: PRIMARY, fontWeight: 600 }}>已互关</button>
                  ) : (
                    <button onClick={() => handleMutualToggle(user.id)} className="rounded-full px-3 py-1.5 text-xs border-0 cursor-pointer"
                      style={{ background: PRIMARY, color: 'white', fontWeight: 600 }}>回关</button>
                  )
                )}
                {activeTab === 'followers' && (
                  followingSet.has(user.id) ? (
                    <div className="rounded-full px-3 py-1.5 text-xs" style={{ background: '#F0F0F0', color: '#888' }}>已互关</div>
                  ) : (
                    <button onClick={() => handleFollowToggle(user.id)} className="rounded-full px-3 py-1.5 text-xs border-0 cursor-pointer"
                      style={{ background: PRIMARY, color: 'white', fontWeight: 600 }}>回关</button>
                  )
                )}
                {activeTab === 'following' && (
                  followingSet.has(user.id) ? (
                    <button onClick={() => handleFollowToggle(user.id)} className="rounded-full px-3 py-1.5 text-xs border-0 cursor-pointer"
                      style={{ background: '#FFF3E0', color: PRIMARY, fontWeight: 600 }}>已关注</button>
                  ) : (
                    <button onClick={() => handleFollowToggle(user.id)} className="rounded-full px-3 py-1.5 text-xs border-0 cursor-pointer"
                      style={{ background: PRIMARY, color: 'white', fontWeight: 600 }}>关注</button>
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ─── Account Cancellation Screen ─────────────────────────────────────────────
const AccountCancellationScreen: React.FC<{ onBack: () => void; onLogout: () => void }> = ({ onBack, onLogout }) => {
  const DANGER = '#FF4D4F';
  const WARNING = '#FA8C16';
  const [agreed, setAgreed] = React.useState(false);
  const [agreed2, setAgreed2] = React.useState(false);
  const [agreed3, setAgreed3] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const allChecked = agreed && agreed2 && agreed3;

  const handleCancel = () => {
    setShowConfirm(true);
  };

  const confirmCancel = () => {
    setShowConfirm(false);
    setShowSuccess(true);
  };

  const handleConfirmSuccess = () => {
    setShowSuccess(false);
    onLogout();
  };

  const handleBack = () => {
    if (showConfirm || showSuccess) {
      setShowConfirm(false);
      setShowSuccess(false);
    } else {
      onBack();
    }
  };

  // 确定按钮文字
  const getConfirmText = () => {
    if (!allChecked) return '请勾选全部提示';
    return '确认注销';
  };

  const CheckboxIcon = ({ checked, onChange, color }: { checked: boolean; onChange: () => void; color?: string }) => (
    <button onClick={onChange} className="flex items-center justify-center rounded border-0 bg-transparent cursor-pointer flex-shrink-0" style={{ width: 24, height: 24 }}>
      {checked ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill={color || '#FF6B35'} />
          <path d="M7 12.5L10.5 16L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F4F0' }}>
      {/* 导航栏 */}
      <div className="flex items-center flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={handleBack} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer" style={{ width: 54, height: 54 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div className="flex-1 flex items-center justify-center" style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>账号注销</div>
        <div style={{ width: 54 }} />
      </div>

      {/* 确认弹窗 */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
          <div className="rounded-2xl overflow-hidden w-80" style={{ background: 'white' }}>
            <div className="p-5 text-center">
              <div className="flex justify-center mb-3">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="#FFF1F0" />
                  <path d="M24 14V26M24 32V34" stroke={DANGER} strokeWidth="3" strokeLinecap="round" />
                  <circle cx="24" cy="24" r="18" stroke={DANGER} strokeWidth="2" />
                </svg>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>确定要注销账号吗？</div>
              <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>注销后您的账号将无法恢复，所有数据将被永久删除，包括：</div>
              <ul style={{ fontSize: 13, color: '#999', textAlign: 'left', marginTop: 12, paddingLeft: 20, lineHeight: 2 }}>
                <li>个人资料和头像</li>
                <li>发布的动态和评论</li>
                <li>积分余额（将自动失效）</li>
                <li>收藏记录</li>
                <li>好友关系和消息记录</li>
              </ul>
              <div className="mt-3 p-3 rounded-lg" style={{ background: '#FFF7E6', border: '1px solid #FFE7B3', textAlign: 'left' }}>
                <div style={{ fontSize: 12, color: '#B37400' }}>
                  <span style={{ fontWeight: 600 }}>温馨提示：</span>注销后积分将自动失效，建议您确认积分已使用或兑换完毕后再申请注销。
                </div>
              </div>
            </div>
            <div className="flex border-t" style={{ borderColor: '#F0F0F0' }}>
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-4 border-0 bg-transparent cursor-pointer" style={{ fontSize: 16, color: '#666', borderRight: '1px solid #F0F0F0' }}>取消</button>
              <button onClick={confirmCancel} className="flex-1 py-4 border-0 bg-transparent cursor-pointer" style={{ fontSize: 16, color: DANGER, fontWeight: 600 }}>确定注销</button>
            </div>
          </div>
        </div>
      )}

      {/* 注销成功弹窗 */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
          <div className="rounded-2xl overflow-hidden w-80" style={{ background: 'white' }}>
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="32" fill="#F6FFED" />
                  <circle cx="32" cy="32" r="24" stroke="#52C41A" strokeWidth="2" />
                  <path d="M22 32L28 38L42 24" stroke="#52C41A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>注销申请已提交</div>
              <div style={{ fontSize: 14, color: '#666', lineHeight: 1.8 }}>
                您的账号将于 <span style={{ color: DANGER, fontWeight: 600 }}>7天后</span> 正式注销<br />
                注销生效前可联系客服撤回申请
              </div>
            </div>
            <div style={{ padding: '0 16px 20px' }}>
              <button onClick={handleConfirmSuccess} className="w-full py-3 rounded-xl border-0 cursor-pointer" style={{ background: DANGER, color: 'white', fontSize: 16, fontWeight: 600 }}>
                知道了
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto p-4" style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
        {/* 警告提示 */}
        <div className="rounded-2xl p-4 mb-4" style={{ background: '#FFF7E6', border: '1px solid #FFE7B3' }}>
          <div className="flex items-start gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
              <path d="M12 2L2 20H22L12 2Z" stroke={WARNING} strokeWidth="2" strokeLinejoin="round" />
              <path d="M12 9V13M12 17V17.01" stroke={WARNING} strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#874000', marginBottom: 4 }}>账号注销后将无法恢复</div>
              <div style={{ fontSize: 13, color: '#B37400', lineHeight: 1.6 }}>
                请您谨慎操作！在提交注销申请前，请确认您已经了解以下重要信息。
              </div>
            </div>
          </div>
        </div>

        {/* 注销条件 */}
        <div className="rounded-2xl overflow-hidden mb-4" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
          <div className="px-4 py-3" style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', borderBottom: '1px solid #F0F0F0' }}>
            注销前置条件
          </div>

          <div className="px-4 py-3.5 flex items-start gap-3" style={{ borderBottom: '1px solid #F0F0F0' }}>
            <CheckboxIcon checked={agreed} onChange={() => setAgreed(!agreed)} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: '#1A1A1A', marginBottom: 2 }}>我已了解积分处理规则</div>
              <div style={{ fontSize: 12, color: '#999' }}>注销后积分将自动失效，无需使用完毕</div>
            </div>
          </div>

          <div className="px-4 py-3.5 flex items-start gap-3" style={{ borderBottom: '1px solid #F0F0F0' }}>
            <CheckboxIcon checked={agreed2} onChange={() => setAgreed2(!agreed2)} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: '#1A1A1A', marginBottom: 2 }}>我的订单已全部完成</div>
              <div style={{ fontSize: 12, color: '#999' }}>如有未完成的订单，请先处理</div>
            </div>
          </div>

          <div className="px-4 py-3.5 flex items-start gap-3">
            <CheckboxIcon checked={agreed3} onChange={() => setAgreed3(!agreed3)} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: '#1A1A1A', marginBottom: 2 }}>我已了解注销后果</div>
              <div style={{ fontSize: 12, color: '#999' }}>账号注销后，所有数据将被永久删除</div>
            </div>
          </div>
        </div>

        {/* 注销说明 */}
        <div className="rounded-2xl overflow-hidden mb-6" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
          <div className="px-4 py-3" style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', borderBottom: '1px solid #F0F0F0' }}>
            注销说明
          </div>
          <div style={{ padding: 16, fontSize: 13, color: '#666', lineHeight: 2 }}>
            <p style={{ marginBottom: 12 }}>1. 账号注销后，您将无法使用该账号登录益寿巴渝平台及相关服务。</p>
            <p style={{ marginBottom: 12 }}>2. 您的个人身份信息、发布的内容、互动记录等将被永久删除。</p>
            <p style={{ marginBottom: 12 }}>3. 您的积分余额将在注销生效后自动清零，不可转移或兑换。</p>
            <p style={{ marginBottom: 12 }}>4. 注销申请提交后，有7天的冷静期，期间可联系客服撤回。</p>
            <p>5. 冷静期结束后，账号将自动完成注销，数据无法恢复。</p>
          </div>
        </div>

        {/* 注销按钮 */}
        <button
          onClick={handleCancel}
          disabled={!allChecked}
          className="w-full py-4 rounded-2xl border-0 cursor-pointer"
          style={{
            background: allChecked ? DANGER : '#F5F5F5',
            color: allChecked ? 'white' : '#CCC',
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          {getConfirmText()}
        </button>
      </div>
    </div>
  );
};

// ─── Settings Screen ───────────────────────────────────────────────────────
const SETTINGS_GROUPS = [
  {
    items: [
      { label: '我的资料', Icon: UserOutlined },
      { label: '地址管理', Icon: EnvironmentOutlined },
    ],
  },
  {
    items: [
      { label: '修改密码', Icon: LockOutlined },
      { label: '账号注销', Icon: StopOutlined, danger: true },
    ],
  },
  {
    items: [
      { label: '通知设置', Icon: BellOutlined },
      { label: '隐私设置', Icon: EyeOutlined },
    ],
  },
  {
    items: [
      { label: '检查更新', Icon: CheckCircleOutlined },
      { label: '关于我们', Icon: ExclamationCircleOutlined },
    ],
  },
];

const SettingsScreen: React.FC<{ onBack: () => void; onNavigate: (s: AppScreen) => void; onLogout: () => void }> = ({ onBack, onNavigate, onLogout }) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
      <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
        <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
      </button>
      <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>设置</span>
    </div>
    <div className="flex-1 overflow-y-auto" style={{ background: '#F5F4F0', padding: '12px 16px 32px' }}>
      {SETTINGS_GROUPS.map((group, gi) => (
        <div key={gi} className="rounded-2xl overflow-hidden mb-3" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
          {group.items.map((item, ii) => {
            const { Icon } = item as any;
            const isDanger = !!(item as any).danger;
            return (
              <button key={item.label}
                onClick={() => {
                  if (item.label === '我的资料') onNavigate('my-profile');
                  if (item.label === '地址管理') onNavigate('address-management');
                  if (item.label === '修改密码') onNavigate('change-password');
                  if (item.label === '账号注销') onNavigate('account-cancellation');
                  if (item.label === '通知设置') onNavigate('notification-settings');
                  if (item.label === '隐私设置') onNavigate('privacy-settings');
                  if (item.label === '检查更新') onNavigate('check-update');
                  if (item.label === '关于我们') onNavigate('about-us');
                }}
                className="flex items-center gap-3 px-4 w-full border-0 bg-transparent text-left cursor-pointer"
                style={{ height: 60, borderBottom: ii < group.items.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                <div className="flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ width: 38, height: 38, background: isDanger ? '#FFF1F0' : '#FFF4EF' }}>
                  <Icon style={{ fontSize: 18, color: isDanger ? '#FF4D4F' : '#FF6B35' }} />
                </div>
                <span style={{ flex: 1, fontSize: 16, color: '#1A1A1A' }}>{item.label}</span>
                {!isDanger && <RightOutlined style={{ fontSize: 13, color: '#CCCCCC' }} />}
              </button>
            );
          })}
        </div>
      ))}
      <button className="w-full rounded-2xl border-0 cursor-pointer"
        onClick={onLogout}
        style={{ height: 56, background: 'white', border: '1px solid #FFCCC7', color: '#FF4D4F', fontSize: 17, fontWeight: 600, marginTop: 4 }}>
        退出登录
      </button>
    </div>
  </div>
);

// ─── Notification Settings Screen ───────────────────────────────────────────
const NotificationSettingsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const PRIMARY = '#FF6B35';
  const [settings, setSettings] = useState({
    likes: true,
    comments: true,
    follows: true,
    messages: true,
    activityReminder: true,
    circleAnnounce: true,
  });

  const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
    <div
      onClick={onChange}
      className="cursor-pointer relative flex-shrink-0"
      style={{ width: 52, height: 30, background: checked ? PRIMARY : '#E5E5E5', borderRadius: 15, transition: 'background 0.2s' }}
    >
      <div
        className="absolute top-0.5"
        style={{
          width: 26, height: 26, borderRadius: 13,
          background: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          top: 2, left: checked ? 24 : 2,
          transition: 'left 0.2s',
        }}
      />
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>通知设置</span>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ background: '#F5F4F0', padding: '12px 16px 32px' }}>
        {/* 互动通知 */}
        <div className="mb-3">
          <div style={{ fontSize: 13, fontWeight: 600, color: '#999', padding: '0 4px', marginBottom: 8 }}>互动通知</div>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
            <div className="flex items-center px-4" style={{ height: 56, borderBottom: '1px solid #F5F5F5' }}>
              <div className="flex items-center gap-3 flex-1">
                <HeartFilled style={{ fontSize: 18, color: '#FF4D6A' }} />
                <div>
                  <div style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>获赞通知</div>
                  <div style={{ fontSize: 12, color: '#999' }}>有人点赞时通知我</div>
                </div>
              </div>
              <Toggle checked={settings.likes} onChange={() => setSettings(s => ({ ...s, likes: !s.likes }))} />
            </div>
            <div className="flex items-center px-4" style={{ height: 56, borderBottom: '1px solid #F5F5F5' }}>
              <div className="flex items-center gap-3 flex-1">
                <MessageFilled style={{ fontSize: 18, color: '#1677FF' }} />
                <div>
                  <div style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>评论通知</div>
                  <div style={{ fontSize: 12, color: '#999' }}>有人评论时通知我</div>
                </div>
              </div>
              <Toggle checked={settings.comments} onChange={() => setSettings(s => ({ ...s, comments: !s.comments }))} />
            </div>
            <div className="flex items-center px-4" style={{ height: 56 }}>
              <div className="flex items-center gap-3 flex-1">
                <UserAddOutlined style={{ fontSize: 18, color: '#52C41A' }} />
                <div>
                  <div style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>新增关注</div>
                  <div style={{ fontSize: 12, color: '#999' }}>有人关注时通知我</div>
                </div>
              </div>
              <Toggle checked={settings.follows} onChange={() => setSettings(s => ({ ...s, follows: !s.follows }))} />
            </div>
          </div>
        </div>

        {/* 消息通知 */}
        <div className="mb-3">
          <div style={{ fontSize: 13, fontWeight: 600, color: '#999', padding: '0 4px', marginBottom: 8 }}>消息通知</div>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
            <div className="flex items-center px-4" style={{ height: 56, borderBottom: '1px solid #F5F5F5' }}>
              <div className="flex items-center gap-3 flex-1">
                <MessageOutlined style={{ fontSize: 18, color: '#722ED1' }} />
                <div>
                  <div style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>私信消息</div>
                  <div style={{ fontSize: 12, color: '#999' }}>收到私信时通知我</div>
                </div>
              </div>
              <Toggle checked={settings.messages} onChange={() => setSettings(s => ({ ...s, messages: !s.messages }))} />
            </div>
            <div className="flex items-center px-4" style={{ height: 56 }}>
              <div className="flex items-center gap-3 flex-1">
                <BellOutlined style={{ fontSize: 18, color: '#FA8C16' }} />
                <div>
                  <div style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>活动提醒</div>
                  <div style={{ fontSize: 12, color: '#999' }}>活动开始前提醒我</div>
                </div>
              </div>
              <Toggle checked={settings.activityReminder} onChange={() => setSettings(s => ({ ...s, activityReminder: !s.activityReminder }))} />
            </div>
          </div>
        </div>

        {/* 圈子通知 */}
        <div className="mb-3">
          <div style={{ fontSize: 13, fontWeight: 600, color: '#999', padding: '0 4px', marginBottom: 8 }}>圈子通知</div>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
            <div className="flex items-center px-4" style={{ height: 56 }}>
              <div className="flex items-center gap-3 flex-1">
                <TeamOutlined style={{ fontSize: 18, color: '#13C2C2' }} />
                <div>
                  <div style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>圈子公告</div>
                  <div style={{ fontSize: 12, color: '#999' }}>圈子有新公告时通知我</div>
                </div>
              </div>
              <Toggle checked={settings.circleAnnounce} onChange={() => setSettings(s => ({ ...s, circleAnnounce: !s.circleAnnounce }))} />
            </div>
          </div>
        </div>

        {/* 说明 */}
        <div style={{ fontSize: 12, color: '#CCC', textAlign: 'center', marginTop: 16 }}>
          如需完全关闭通知，请在手机系统设置中操作
        </div>
      </div>
    </div>
  );
};

// ─── Privacy Settings Screen ───────────────────────────────────────────────
const PrivacySettingsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [privacy, setPrivacy] = useState({
    allowFindMe: true,
    allowComment: true,
    allowDownload: false,
    showLocation: true,
    showOnline: true,
  });

  const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
    <div
      onClick={onChange}
      className="cursor-pointer relative flex-shrink-0"
      style={{ width: 52, height: 30, background: checked ? '#FF6B35' : '#E5E5E5', borderRadius: 15, transition: 'background 0.2s' }}
    >
      <div
        className="absolute top-0.5"
        style={{
          width: 26, height: 26, borderRadius: 13,
          background: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          top: 2, left: checked ? 24 : 2,
          transition: 'left 0.2s',
        }}
      />
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>隐私设置</span>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ background: '#F5F4F0', padding: '12px 16px 32px' }}>
        {/* 互动隐私 */}
        <div className="mb-3">
          <div style={{ fontSize: 13, fontWeight: 600, color: '#999', padding: '0 4px', marginBottom: 8 }}>互动隐私</div>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
            <div className="flex items-center px-4" style={{ height: 56, borderBottom: '1px solid #F5F5F5' }}>
              <div className="flex items-center gap-3 flex-1">
                <SearchOutlined style={{ fontSize: 18, color: '#1677FF' }} />
                <div>
                  <div style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>允许被发现</div>
                  <div style={{ fontSize: 12, color: '#999' }}>允许他人通过搜索找到我</div>
                </div>
              </div>
              <Toggle checked={privacy.allowFindMe} onChange={() => setPrivacy(p => ({ ...p, allowFindMe: !p.allowFindMe }))} />
            </div>
            <div className="flex items-center px-4" style={{ height: 56 }}>
              <div className="flex items-center gap-3 flex-1">
                <MessageOutlined style={{ fontSize: 18, color: '#722ED1' }} />
                <div>
                  <div style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>允许评论</div>
                  <div style={{ fontSize: 12, color: '#999' }}>允许他人对我的内容发表评论</div>
                </div>
              </div>
              <Toggle checked={privacy.allowComment} onChange={() => setPrivacy(p => ({ ...p, allowComment: !p.allowComment }))} />
            </div>
          </div>
        </div>

        {/* 内容隐私 */}
        <div className="mb-3">
          <div style={{ fontSize: 13, fontWeight: 600, color: '#999', padding: '0 4px', marginBottom: 8 }}>内容隐私</div>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
            <div className="flex items-center px-4" style={{ height: 56, borderBottom: '1px solid #F5F5F5' }}>
              <div className="flex items-center gap-3 flex-1">
                <DownloadOutlined style={{ fontSize: 18, color: '#52C41A' }} />
                <div>
                  <div style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>允许下载</div>
                  <div style={{ fontSize: 12, color: '#999' }}>允许他人保存我的图片和视频</div>
                </div>
              </div>
              <Toggle checked={privacy.allowDownload} onChange={() => setPrivacy(p => ({ ...p, allowDownload: !p.allowDownload }))} />
            </div>
            <div className="flex items-center px-4" style={{ height: 56 }}>
              <div className="flex items-center gap-3 flex-1">
                <EnvironmentOutlined style={{ fontSize: 18, color: '#FA8C16' }} />
                <div>
                  <div style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>显示位置</div>
                  <div style={{ fontSize: 12, color: '#999' }}>在我的资料中显示我的位置</div>
                </div>
              </div>
              <Toggle checked={privacy.showLocation} onChange={() => setPrivacy(p => ({ ...p, showLocation: !p.showLocation }))} />
            </div>
          </div>
        </div>

        {/* 在线状态 */}
        <div className="mb-3">
          <div style={{ fontSize: 13, fontWeight: 600, color: '#999', padding: '0 4px', marginBottom: 8 }}>在线状态</div>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
            <div className="flex items-center px-4" style={{ height: 56 }}>
              <div className="flex items-center gap-3 flex-1">
                <EyeOutlined style={{ fontSize: 18, color: '#EB2F96' }} />
                <div>
                  <div style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>显示在线状态</div>
                  <div style={{ fontSize: 12, color: '#999' }}>允许他人看到我是否在线</div>
                </div>
              </div>
              <Toggle checked={privacy.showOnline} onChange={() => setPrivacy(p => ({ ...p, showOnline: !p.showOnline }))} />
            </div>
          </div>
        </div>

        {/* 黑名单 */}
        <div className="mb-3">
          <div style={{ fontSize: 13, fontWeight: 600, color: '#999', padding: '0 4px', marginBottom: 8 }}>账号管理</div>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
            <button className="flex items-center px-4 w-full border-0 bg-transparent cursor-pointer" style={{ height: 56, borderBottom: '1px solid #F5F5F5' }}>
              <div className="flex items-center gap-3 flex-1">
                <BlockOutlined style={{ fontSize: 18, color: '#FF4D4F' }} />
                <div style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>黑名单管理</div>
              </div>
              <RightOutlined style={{ fontSize: 13, color: '#CCCCCC' }} />
            </button>
            <button className="flex items-center px-4 w-full border-0 bg-transparent cursor-pointer" style={{ height: 56 }}>
              <div className="flex items-center gap-3 flex-1">
                <LockOutlined style={{ fontSize: 18, color: '#FA8C16' }} />
                <div style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>修改密码</div>
              </div>
              <RightOutlined style={{ fontSize: 13, color: '#CCCCCC' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Check Update Screen ──────────────────────────────────────────────────
const CheckUpdateScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const PRIMARY = '#FF6B35';
  const [checking, setChecking] = useState(false);
  const [hasNewVersion, setHasNewVersion] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const currentVersion = '1.0.0';
  const latestVersion = '1.1.0';
  const updateContent = [
    '优化了消息通知的及时性',
    '新增了隐私设置功能',
    '修复了一些已知问题',
    '提升了应用运行稳定性',
  ];

  const handleCheckUpdate = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setHasNewVersion(true);
    }, 1500);
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>检查更新</span>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ background: '#F5F4F0', padding: '24px 16px 32px' }}>
        {/* App Icon and Version Info */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center rounded-2xl overflow-hidden mb-4"
            style={{ width: 88, height: 88, background: 'linear-gradient(135deg, #FF6B35 0%, #FF9A56 100%)', boxShadow: '0 4px 12px rgba(255,107,53,0.3)' }}>
            <img src={logoImg} alt="logo" style={{ width: 60, height: 60, objectFit: 'contain' }} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>益寿巴渝</div>
          <div style={{ fontSize: 14, color: '#999' }}>当前版本 {currentVersion}</div>
        </div>

        {/* Update Status */}
        {hasNewVersion ? (
          <>
            <div className="rounded-2xl overflow-hidden mb-4" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
              <div className="px-4 py-4" style={{ borderBottom: '1px solid #F5F5F5' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center justify-center rounded-md"
                    style={{ width: 24, height: 24, background: '#FFF4E6' }}>
                    <TagOutlined style={{ fontSize: 14, color: PRIMARY }} />
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>发现新版本 v{latestVersion}</div>
                </div>
                <div style={{ fontSize: 13, color: '#999', marginLeft: 32 }}>新版本来袭，快来体验吧！</div>
              </div>
              <div className="px-4 py-3">
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 12 }}>更新内容</div>
                {updateContent.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 mb-2">
                    <div className="flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                      style={{ width: 18, height: 18, background: '#FFF4E6' }}>
                      <CheckCircleFilled style={{ fontSize: 12, color: PRIMARY }} />
                    </div>
                    <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{item}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Button */}
            {downloaded ? (
              <div className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border-0 cursor-pointer"
                style={{ background: '#F5F5F5', color: '#52C41A', fontSize: 16, fontWeight: 600 }}>
                <CheckCircleFilled style={{ fontSize: 20 }} />
                已下载，点击安装
              </div>
            ) : downloading ? (
              <div className="w-full">
                <div className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border-0 cursor-pointer"
                  style={{ background: PRIMARY, color: 'white', fontSize: 16, fontWeight: 600, opacity: 0.7 }}>
                  <div className="animate-spin rounded-full border-2 border-white border-t-transparent" style={{ width: 20, height: 20 }} />
                  下载中...
                </div>
                <div className="mt-2 rounded-xl overflow-hidden" style={{ background: '#F0F0F0', height: 8 }}>
                  <div className="h-full rounded-full transition-all" style={{ width: '65%', background: PRIMARY }} />
                </div>
              </div>
            ) : (
              <button onClick={handleDownload}
                className="w-full py-4 rounded-2xl border-0 cursor-pointer"
                style={{ background: PRIMARY, color: 'white', fontSize: 16, fontWeight: 600 }}>
                下载更新
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center rounded-full mb-4"
              style={{ width: 80, height: 80, background: '#F0FFF0' }}>
              <CheckCircleFilled style={{ fontSize: 40, color: '#52C41A' }} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>已是最新版本</div>
            <div style={{ fontSize: 14, color: '#999', marginBottom: 24 }}>感谢您的支持，益寿巴渝会持续优化</div>
            <button onClick={handleCheckUpdate}
              className="px-6 py-3 rounded-2xl border-0 cursor-pointer"
              style={{ background: PRIMARY, color: 'white', fontSize: 15, fontWeight: 600 }}>
              重新检查
            </button>
          </div>
        )}

        {/* Check Update Button (when no new version or loading) */}
        {checking && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="animate-spin rounded-full border-2 border-orange-200 border-t-orange-500" style={{ width: 20, height: 20 }} />
            <span style={{ fontSize: 14, color: '#999' }}>正在检查更新...</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── About Us Screen ──────────────────────────────────────────────────────
const AboutUsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const PRIMARY = '#FF6B35';
  const [showService, setShowService] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const features = [
    { icon: <HeartOutlined />, title: '健康生活', desc: '每日健康资讯，养生知识分享' },
    { icon: <TeamOutlined />, title: '社交圈子', desc: '结识邻里朋友，分享生活点滴' },
    { icon: <GiftOutlined />, title: '积分兑换', desc: '健康好物免费换，福利天天享' },
    { icon: <MedicineBoxOutlined />, title: '助餐服务', desc: '社区助餐预约，健康饮食相伴' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>关于我们</span>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ background: '#F5F4F0', padding: '24px 16px 32px' }}>
        {/* App Info */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center rounded-2xl overflow-hidden mb-4"
            style={{ width: 88, height: 88, background: 'linear-gradient(135deg, #FF6B35 0%, #FF9A56 100%)', boxShadow: '0 4px 12px rgba(255,107,53,0.3)' }}>
            <img src={logoImg} alt="logo" style={{ width: 60, height: 60, objectFit: 'contain' }} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>益寿巴渝</div>
          <div style={{ fontSize: 14, color: '#999', marginBottom: 8 }}>v1.0.0 · 关怀每一位长辈</div>
          <div style={{ fontSize: 13, color: '#CCC' }}>让中老年生活更美好</div>
        </div>

        {/* Introduction */}
        <div className="rounded-2xl overflow-hidden mb-4" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
          <div className="px-4 py-4" style={{ borderBottom: '1px solid #F5F5F5' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>平台介绍</div>
            <div style={{ fontSize: 13, color: '#666', lineHeight: 1.8 }}>
              益寿巴渝是一款专为50岁以上中老年朋友打造的生活服务平台。我们致力于为用户提供便捷的社交、健康、购物等综合服务，让每一位长辈都能享受科技带来的便利生活。
            </div>
          </div>
          <div className="px-4 py-4">
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 12 }}>核心功能</div>
            <div className="grid grid-cols-2 gap-3">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 p-3 rounded-xl" style={{ background: '#FAFAFA' }}>
                  <div className="flex items-center justify-center rounded-lg flex-shrink-0"
                    style={{ width: 32, height: 32, background: '#FFF4EF' }}>
                    <span style={{ fontSize: 16, color: PRIMARY }}>{item.icon}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: '#999', lineHeight: 1.4 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="rounded-2xl overflow-hidden mb-4" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
          <div className="px-4 py-4" style={{ borderBottom: '1px solid #F5F5F5' }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 12 }}>联系我们</div>
            <div className="flex items-center gap-3 mb-3">
              <CustomerServiceOutlined style={{ fontSize: 18, color: PRIMARY }} />
              <div>
                <div style={{ fontSize: 14, color: '#1A1A1A' }}>客服热线</div>
                <div style={{ fontSize: 15, color: PRIMARY, fontWeight: 600 }}>400-888-8888</div>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <MessageOutlined style={{ fontSize: 18, color: PRIMARY }} />
              <div>
                <div style={{ fontSize: 14, color: '#1A1A1A' }}>在线客服</div>
                <div style={{ fontSize: 13, color: '#666' }}>工作日 9:00-18:00</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MailOutlined style={{ fontSize: 18, color: PRIMARY }} />
              <div>
                <div style={{ fontSize: 14, color: '#1A1A1A' }}>电子邮箱</div>
                <div style={{ fontSize: 13, color: '#666' }}>service@yishoubayu.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Agreements */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
          <button className="flex items-center justify-between w-full px-4 border-0 bg-transparent cursor-pointer"
            onClick={() => setShowService(!showService)}
            style={{ height: 56, borderBottom: '1px solid #F5F5F5' }}>
            <div className="flex items-center gap-3">
              <FileTextOutlined style={{ fontSize: 18, color: PRIMARY }} />
              <span style={{ fontSize: 15, color: '#1A1A1A' }}>用户服务协议</span>
            </div>
            {showService ? <UpOutlined style={{ fontSize: 14, color: '#CCC' }} /> : <DownOutlined style={{ fontSize: 14, color: '#CCC' }} />}
          </button>
          {showService && (
            <div className="px-4 py-3" style={{ fontSize: 13, color: '#666', lineHeight: 1.8, textAlign: 'left' }}>
              本协议是您与益寿巴渝平台之间就平台服务等相关事宜订立的协议。请您在注册前仔细阅读本协议条款，确认您同意后再使用我们的服务...
            </div>
          )}
          <button className="flex items-center justify-between w-full px-4 border-0 bg-transparent cursor-pointer"
            onClick={() => setShowPrivacy(!showPrivacy)}
            style={{ height: 56 }}>
            <div className="flex items-center gap-3">
              <SafetyOutlined style={{ fontSize: 18, color: PRIMARY }} />
              <span style={{ fontSize: 15, color: '#1A1A1A' }}>隐私政策</span>
            </div>
            {showPrivacy ? <UpOutlined style={{ fontSize: 14, color: '#CCC' }} /> : <DownOutlined style={{ fontSize: 14, color: '#CCC' }} />}
          </button>
          {showPrivacy && (
            <div className="px-4 py-3" style={{ fontSize: 13, color: '#666', lineHeight: 1.8, textAlign: 'left' }}>
              我们重视您的个人信息和隐私保护。在您使用益寿巴渝服务时，我们可能会收集和使用您的相关信息。详情请阅读完整隐私政策...
            </div>
          )}
        </div>

        {/* Copyright */}
        <div style={{ fontSize: 12, color: '#CCC', textAlign: 'center', marginTop: 24 }}>
          版权所有 © 2026 益寿巴渝<br />
          重庆益寿科技有限公司
        </div>
      </div>
    </div>
  );
};

// ─── Address Management Screen ─────────────────────────────────────────────
// 重庆市辖区数据（简化版）
const CHONGQING_AREAS: { [key: string]: string[] } = {
  '重庆市': ['渝中区', '江北区', '南岸区', '沙坪坝区', '九龙坡区', '大渡口区', '渝北区', '巴南区']
};

interface Address {
  id: string;
  contactName: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detailAddress: string;
  isDefault: boolean;
}

const AddressManagementScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const PRIMARY = '#FF6B35';
  const [addresses, setAddresses] = React.useState<Address[]>([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editingAddress, setEditingAddress] = React.useState<Address | null>(null);
  const [formData, setFormData] = React.useState({
    contactName: '',
    phone: '',
    province: '重庆市',
    city: '',
    district: '',
    detailAddress: '',
    isDefault: false
  });
  const [showAreaPicker, setShowAreaPicker] = React.useState(false);
  const [areaStep, setAreaStep] = React.useState<'province' | 'city' | 'district'>('province');
  const [selectedProvince, setSelectedProvince] = React.useState('重庆市');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<string | null>(null);
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const resetForm = () => {
    setFormData({
      contactName: '',
      phone: '',
      province: '重庆市',
      city: '',
      district: '',
      detailAddress: '',
      isDefault: addresses.length === 0
    });
    setSelectedCity('');
  };

  const openAddForm = () => {
    resetForm();
    setEditingAddress(null);
    setShowForm(true);
  };

  const openEditForm = (addr: Address) => {
    setFormData({
      contactName: addr.contactName,
      phone: addr.phone,
      province: addr.province,
      city: addr.city,
      district: addr.district,
      detailAddress: addr.detailAddress,
      isDefault: addr.isDefault
    });
    setSelectedCity(addr.city);
    setEditingAddress(addr);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.contactName.trim()) { showToast('请输入联系人姓名'); return; }
    if (!formData.phone.trim() || formData.phone.length !== 11) { showToast('请输入正确的手机号码'); return; }
    if (!selectedCity) { showToast('请选择所在地区'); return; }
    if (!formData.detailAddress.trim()) { showToast('请输入详细地址'); return; }

    let newAddresses = [...addresses];
    if (editingAddress) {
      newAddresses = newAddresses.map(a => a.id === editingAddress.id ? { ...a, ...formData, city: selectedCity } : a);
    } else {
      const newAddr: Address = {
        id: Date.now().toString(),
        ...formData,
        city: selectedCity
      };
      newAddresses.push(newAddr);
    }

    if (formData.isDefault) {
      newAddresses = newAddresses.map(a => ({ ...a, isDefault: a.id === (editingAddress?.id ?? newAddresses[newAddresses.length - 1]?.id) }));
    }

    setAddresses(newAddresses);
    setShowForm(false);
    showToast(editingAddress ? '地址已更新' : '地址已添加');
  };

  const handleDelete = (id: string) => {
    const newAddresses = addresses.filter(a => a.id !== id);
    setAddresses(newAddresses);
    setShowDeleteConfirm(null);
    showToast('地址已删除');
  };

  const handleSetDefault = (id: string) => {
    const newAddresses = addresses.map(a => ({ ...a, isDefault: a.id === id }));
    setAddresses(newAddresses);
    showToast('已设为默认地址');
  };

  const formatPhone = (phone: string) => {
    if (phone.length !== 11) return phone;
    return phone.slice(0, 3) + '****' + phone.slice(7);
  };

  const currentAreas = selectedProvince ? CHONGQING_AREAS[selectedProvince] || [] : [];

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F4F0', position: 'relative' }}>
      {/* 导航栏 */}
      <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>地址管理</span>
      </div>

      {/* 地址列表 */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '12px 16px 100px' }}>
        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center" style={{ paddingTop: 80 }}>
            <div className="flex items-center justify-center rounded-full mb-4" style={{ width: 80, height: 80, background: 'rgba(255,107,53,0.1)' }}>
              <EnvironmentOutlined style={{ fontSize: 36, color: PRIMARY }} />
            </div>
            <p style={{ fontSize: 17, color: '#333', marginBottom: 8 }}>还没有收货地址</p>
            <p style={{ fontSize: 14, color: '#999' }}>点击下方按钮添加</p>
          </div>
        ) : (
          addresses.map((addr, idx) => (
            <div key={addr.id} className="rounded-2xl mb-3 p-4 relative overflow-hidden" style={{ background: 'white', boxShadow: '0 2px 12px rgba(255,107,53,0.12)' }}>
              {/* 装饰角标 */}
              <div className="absolute top-0 right-0 w-16 h-16" style={{ background: `linear-gradient(135deg, ${PRIMARY}20 0%, transparent 70%)`, borderRadius: '0 16px 0 40px' }} />

              {/* 联系人行 */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${PRIMARY} 0%, #FFAA5A 100%)` }}>
                  <UserOutlined style={{ fontSize: 14, color: 'white' }} />
                </div>
                <span style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A' }}>{addr.contactName}</span>
                {addr.isDefault && (
                  <span className="rounded-full px-2 py-0.5 flex items-center gap-1" style={{ fontSize: 11, color: '#FFF', background: `linear-gradient(90deg, ${PRIMARY} 0%, #FFAA5A 100%)` }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'white' }} />默认
                  </span>
                )}
              </div>

              {/* 手机号 */}
              <div className="flex items-center gap-2 mb-2" style={{ paddingLeft: 44 }}>
                <MobileOutlined style={{ fontSize: 13, color: '#FF6B35' }} />
                <span style={{ fontSize: 14, color: '#666' }}>{formatPhone(addr.phone)}</span>
              </div>

              {/* 地址 */}
              <div className="flex items-start gap-2 mb-3" style={{ paddingLeft: 44 }}>
                <EnvironmentOutlined style={{ fontSize: 13, color: '#52C41A', marginTop: 2 }} />
                <span style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>{addr.province} {addr.city} {addr.district} {addr.detailAddress}</span>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center justify-end gap-2 pt-2" style={{ borderTop: '1px dashed #F0F0F0' }}>
                {!addr.isDefault && (
                  <button onClick={() => handleSetDefault(addr.id)}
                    className="flex items-center gap-1 px-3 py-1.5 border-0 rounded-full cursor-pointer transition-all duration-200 hover:scale-105"
                    style={{ fontSize: 13, color: PRIMARY, background: '#FFF4EF' }}>
                    <span style={{ width: 12, height: 12, borderRadius: '50%', border: `1.5px solid ${PRIMARY}` }} />设为默认
                  </button>
                )}
                <button onClick={() => openEditForm(addr)}
                  className="flex items-center gap-1 px-3 py-1.5 border-0 rounded-full cursor-pointer transition-all duration-200 hover:scale-105"
                  style={{ fontSize: 13, color: '#1677FF', background: '#E6F4FF' }}>
                  <EditOutlined style={{ fontSize: 12 }} />编辑
                </button>
                <button onClick={() => setShowDeleteConfirm(addr.id)}
                  className="flex items-center gap-1 px-3 py-1.5 border-0 rounded-full cursor-pointer transition-all duration-200 hover:scale-105"
                  style={{ fontSize: 13, color: '#FF4D4F', background: '#FFF1F0' }}>
                  <DeleteOutlined style={{ fontSize: 12 }} />删除
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 底部新增按钮 */}
      <div className="flex items-center flex-shrink-0" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px 24px', background: '#F5F4F0' }}>
        <button onClick={openAddForm} className="flex items-center justify-center w-full border-0 cursor-pointer rounded-full"
          style={{ height: 56, background: `linear-gradient(90deg, ${PRIMARY} 0%, #FFAA5A 100%)`, boxShadow: '0 4px 12px rgba(255,107,53,0.3)' }}>
          <span style={{ fontSize: 17, fontWeight: 600, color: 'white', letterSpacing: 2 }}>{addresses.length === 0 ? '添加地址' : '新增收货地址'}</span>
        </button>
      </div>

      {/* 新增/编辑表单 Modal */}
      {showForm && (
        <div className="absolute inset-0 z-50 flex flex-col" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="flex-1" onClick={() => setShowForm(false)} />
          <div className="rounded-t-3xl bg-white" style={{ maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* 表单头部 */}
            <div className="flex items-center flex-shrink-0 justify-center" style={{ height: 56, borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
              <button onClick={() => setShowForm(false)} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ position: 'absolute', right: 8 }}>
                <CloseOutlined style={{ fontSize: 18, color: '#999' }} />
              </button>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{editingAddress ? '编辑地址' : '新增地址'}</span>
            </div>

            {/* 表单内容 */}
            <div className="flex-1 overflow-y-auto" style={{ padding: '16px 16px 24px' }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
                {/* 联系人姓名 */}
                <div className="flex items-center px-4" style={{ height: 60, borderBottom: '1px solid #F5F5F5' }}>
                  <span style={{ fontSize: 15, color: '#666', width: 72, flexShrink: 0 }}>联系人</span>
                  <input value={formData.contactName} onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="请输入联系人姓名" className="flex-1 border-0 outline-none text-right"
                    style={{ fontSize: 16, color: '#1A1A1A', background: 'transparent' }} />
                </div>
                {/* 手机号码 */}
                <div className="flex items-center px-4" style={{ height: 60, borderBottom: '1px solid #F5F5F5' }}>
                  <span style={{ fontSize: 15, color: '#666', width: 72, flexShrink: 0 }}>手机号</span>
                  <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 11) })}
                    placeholder="请输入手机号码" className="flex-1 border-0 outline-none text-right"
                    style={{ fontSize: 16, color: '#1A1A1A', background: 'transparent' }} type="tel" />
                </div>
                {/* 所在地区 */}
                <button onClick={() => { setAreaStep('city'); setShowAreaPicker(true); }} className="flex items-center px-4 w-full border-0 bg-transparent text-left cursor-pointer" style={{ height: 60, borderBottom: '1px solid #F5F5F5' }}>
                  <span style={{ fontSize: 15, color: '#666', width: 72, flexShrink: 0 }}>地区</span>
                  <span className="flex-1" style={{ fontSize: 16, color: selectedCity ? '#1A1A1A' : '#CCC', textAlign: 'right' }}>
                    {selectedCity ? `${selectedProvince} ${selectedCity}` : '请选择省/市/区'}
                  </span>
                  <RightOutlined style={{ fontSize: 13, color: '#CCC', marginLeft: 8 }} />
                </button>
                {/* 详细地址 */}
                <div className="flex items-start px-4 pt-3 pb-3" style={{ borderBottom: '1px solid #F5F5F5' }}>
                  <span style={{ fontSize: 15, color: '#666', width: 72, flexShrink: 0, marginTop: 8 }}>详情</span>
                  <textarea value={formData.detailAddress} onChange={e => setFormData({ ...formData, detailAddress: e.target.value })}
                    placeholder="请输入详细地址，如街道、门牌号" className="flex-1 border-0 outline-none resize-none"
                    style={{ fontSize: 16, color: '#1A1A1A', background: 'transparent', minHeight: 60, lineHeight: 1.5 }} />
                </div>
                {/* 设为默认 */}
                <div className="flex items-center px-4 justify-between" style={{ height: 56 }}>
                  <span style={{ fontSize: 15, color: '#666' }}>设为默认地址</span>
                  <button onClick={() => setFormData({ ...formData, isDefault: !formData.isDefault })}
                    className="flex items-center justify-center border-0 cursor-pointer rounded-full"
                    style={{ width: 48, height: 28, background: formData.isDefault ? PRIMARY : '#E5E5E5', transition: 'all 0.2s' }}>
                    <div className="rounded-full bg-white" style={{ width: 24, height: 24, transform: formData.isDefault ? 'translateX(20px)' : 'translateX(0)', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                  </button>
                </div>
              </div>
            </div>

            {/* 保存按钮 */}
            <div className="flex-shrink-0 px-4 pb-6" style={{ paddingTop: 8 }}>
              <button onClick={handleSave} className="flex items-center justify-center w-full border-0 cursor-pointer rounded-full"
                style={{ height: 56, background: `linear-gradient(90deg, ${PRIMARY} 0%, #FFAA5A 100%)`, boxShadow: '0 4px 12px rgba(255,107,53,0.3)' }}>
                <span style={{ fontSize: 18, fontWeight: 600, color: 'white', letterSpacing: 4 }}>保存</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 省市区选择器 */}
      {showAreaPicker && (
        <div className="absolute inset-0 z-50 flex flex-col" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="flex-1" onClick={() => setShowAreaPicker(false)} />
          <div className="rounded-t-3xl bg-white" style={{ height: 360 }}>
            <div className="flex items-center justify-center" style={{ height: 56, borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
              <span style={{ fontSize: 17, fontWeight: 600, color: '#1A1A1A' }}>选择地区</span>
              <button onClick={() => setShowAreaPicker(false)} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ position: 'absolute', right: 8 }}>
                <CloseOutlined style={{ fontSize: 18, color: '#999' }} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {currentAreas.map(area => (
                <button key={area} onClick={() => { setSelectedCity(area); setShowAreaPicker(false); }}
                  className="flex items-center w-full border-0 bg-transparent cursor-pointer px-4 py-3 rounded-lg"
                  style={{ fontSize: 16, color: selectedCity === area ? PRIMARY : '#1A1A1A', background: selectedCity === area ? '#FFF4EF' : 'transparent' }}>
                  {area}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 删除确认 */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="rounded-2xl mx-8 w-full max-w-sm" style={{ background: 'white', padding: 24 }}>
            <p className="text-center mb-6" style={{ fontSize: 17, color: '#1A1A1A' }}>确定要删除该地址吗？</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 border-0 cursor-pointer rounded-full py-3"
                style={{ fontSize: 16, color: '#666', background: '#F5F5F5' }}>取消</button>
              <button onClick={() => handleDelete(showDeleteConfirm)} className="flex-1 border-0 cursor-pointer rounded-full py-3"
                style={{ fontSize: 16, color: 'white', background: '#FF4D4F' }}>删除</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast 提示 */}
      {toast && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-xl px-6 py-3" style={{ background: 'rgba(0,0,0,0.75)', maxWidth: 280 }}>
          <p className="text-center text-white" style={{ fontSize: 15 }}>{toast}</p>
        </div>
      )}
    </div>
  );
};

// ─── Change Password Screen ─────────────────────────────────────────────────
const ChangePasswordScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const PRIMARY = '#FF6B35';
  const [step, setStep] = React.useState(1);
  const [phone, setPhone] = React.useState('');
  const [code, setCode] = React.useState('');
  const [countdown, setCountdown] = React.useState(0);
  const [newPwd, setNewPwd] = React.useState('');
  const [confirmPwd, setConfirmPwd] = React.useState('');
  const [toast, setToast] = React.useState<string | null>(null);
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const startCountdown = () => {
    if (phone.length < 11) return;
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => { if (prev <= 1) { clearInterval(timer); return 0; } return prev - 1; });
    }, 1000);
  };

  const isStep1Valid = phone.length === 11 && code.length > 0;
  const isStep2Valid = newPwd.length >= 6 && newPwd === confirmPwd;
  const canSendCode = phone.length === 11 && countdown === 0;

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F4F0' }}>
      {/* 导航栏 */}
      <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>修改密码</span>
      </div>

      {/* 进度指示 */}
      <div className="flex items-center px-8 py-5 gap-3">
        {[1, 2, 3].map(s => (
          <React.Fragment key={s}>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center justify-center rounded-full"
                style={{
                  width: 32, height: 32,
                  background: step >= s ? `linear-gradient(135deg, ${PRIMARY} 0%, #FFAA5A 100%)` : '#E5E5E5',
                  boxShadow: step >= s ? '0 2px 8px rgba(255,107,53,0.3)' : 'none'
                }}>
                {step > s ? (
                  <CheckOutlined style={{ fontSize: 14, color: 'white' }} />
                ) : (
                  <span style={{ fontSize: 14, color: step >= s ? 'white' : '#999', fontWeight: 600 }}>{s}</span>
                )}
              </div>
              <span style={{ fontSize: 11, color: step >= s ? PRIMARY : '#999' }}>
                {s === 1 ? '验证身份' : s === 2 ? '设置密码' : '完成'}
              </span>
            </div>
            {s < 3 && (
              <div className="flex-1 h-0.5 -mt-5" style={{ background: step > s ? PRIMARY : '#E5E5E5' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 内容区 */}
      <div className="flex-1 px-5 py-4" style={{ overflowY: 'auto' }}>

        {/* Step 1: 验证身份 */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            {/* Hero 提示 */}
            <div className="rounded-2xl p-5 text-center" style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, #FFAA5A 100%)` }}>
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <MobileOutlined style={{ fontSize: 32, color: 'white' }} />
              </div>
              <p style={{ fontSize: 16, color: 'white', fontWeight: 600 }}>为保障账户安全</p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>请验证您绑定的手机号</p>
            </div>

            {/* 手机号 */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>手机号</div>
              <div className="flex items-center rounded-2xl px-4 gap-3" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 52, background: 'white' }}>
                <span style={{ fontSize: 16, color: '#B07050', flexShrink: 0 }}>+86</span>
                <div style={{ width: 1, height: 20, background: 'rgba(255,107,53,0.2)' }} />
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))} placeholder="请输入手机号码"
                  className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 16, color: '#1A1A1A' }} />
              </div>
            </div>

            {/* 验证码 */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>验证码</div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-2xl px-4 flex-1" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 52, background: 'white' }}>
                  <input type="number" value={code} onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="请输入验证码"
                    className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 16, color: '#1A1A1A' }} />
                </div>
                <button onClick={startCountdown} disabled={!canSendCode}
                  className="rounded-xl font-semibold cursor-pointer border-0 flex-shrink-0"
                  style={{ height: 52, padding: '0 14px', background: canSendCode ? `linear-gradient(135deg, ${PRIMARY} 0%, #FFAA5A 100%)` : '#F0EBE4', color: canSendCode ? 'white' : '#C0A898', fontSize: 14, boxShadow: canSendCode ? '0 2px 8px rgba(255,107,53,0.3)' : 'none' }}>
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </button>
              </div>
            </div>

            {/* 下一步 */}
            <button onClick={() => { if (isStep1Valid) setStep(2); else showToast('请填写完整信息'); }}
              className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
              style={{ height: 52, background: isStep1Valid ? `linear-gradient(90deg, ${PRIMARY} 0%, #FFAA5A 100%)` : '#F5D5C0', fontSize: 17, boxShadow: isStep1Valid ? '0 4px 12px rgba(255,107,53,0.3)' : 'none' }}>
              下一步
            </button>
          </div>
        )}

        {/* Step 2: 设置新密码 */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: '#FFF4EF' }}>
              <div className="flex items-center justify-center rounded-full" style={{ width: 36, height: 36, background: PRIMARY }}>
                <CheckOutlined style={{ fontSize: 16, color: 'white' }} />
              </div>
              <div>
                <p style={{ fontSize: 14, color: '#333', fontWeight: 600 }}>身份验证通过</p>
                <p style={{ fontSize: 12, color: '#999' }}>请设置新的登录密码</p>
              </div>
            </div>

            {/* 新密码 */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>新密码</div>
              <div className="flex items-center rounded-2xl px-4 gap-3" style={{ border: '2px solid rgba(255,107,53,0.25)', height: 52, background: 'white' }}>
                <LockOutlined style={{ fontSize: 18, color: '#C0A898', flexShrink: 0 }} />
                <input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value.replace(/\s/g, '').slice(0, 12))} placeholder="请输入新密码（6-12位）"
                  className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 16, color: '#1A1A1A' }} />
              </div>
              {/* 密码强度 */}
              {newPwd.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1 rounded-full" style={{ background: newPwd.length >= 6 ? (newPwd.length >= 10 ? '#52C41A' : '#FA8C16') : '#FF4D4F' }} />
                  <span style={{ fontSize: 12, color: newPwd.length >= 6 ? (newPwd.length >= 10 ? '#52C41A' : '#FA8C16') : '#FF4D4F' }}>
                    {newPwd.length >= 10 ? '强' : newPwd.length >= 6 ? '中' : '弱'}
                  </span>
                </div>
              )}
            </div>

            {/* 确认密码 */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#8C6A50', marginBottom: 8 }}>确认密码</div>
              <div className="flex items-center rounded-2xl px-4 gap-3" style={{ border: `2px solid ${confirmPwd && newPwd !== confirmPwd ? '#FF4D4F' : 'rgba(255,107,53,0.25)'}`, height: 52, background: 'white' }}>
                <LockOutlined style={{ fontSize: 18, color: '#C0A898', flexShrink: 0 }} />
                <input type="password" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value.replace(/\s/g, '').slice(0, 12))} placeholder="请再次输入新密码"
                  className="flex-1 border-0 outline-none bg-transparent" style={{ fontSize: 16, color: '#1A1A1A' }} />
              </div>
              {confirmPwd && newPwd !== confirmPwd && (
                <p className="mt-2" style={{ fontSize: 12, color: '#FF4D4F' }}>两次密码输入不一致，请重新输入</p>
              )}
            </div>

            {/* 提交 */}
            <button onClick={() => { if (isStep2Valid) setStep(3); else if (newPwd.length < 6) showToast('密码至少6位'); else if (newPwd !== confirmPwd) showToast('两次密码不一致'); }}
              className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
              style={{ height: 52, background: isStep2Valid ? `linear-gradient(90deg, ${PRIMARY} 0%, #FFAA5A 100%)` : '#F5D5C0', fontSize: 17, boxShadow: isStep2Valid ? '0 4px 12px rgba(255,107,53,0.3)' : 'none' }}>
              确认修改
            </button>
          </div>
        )}

        {/* Step 3: 设置成功 */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center" style={{ paddingTop: 60 }}>
            <div className="flex items-center justify-center rounded-full mb-6" style={{ width: 96, height: 96, background: '#F0FBF0', boxShadow: '0 4px 16px rgba(82,196,26,0.2)' }}>
              <CheckCircleFilled style={{ fontSize: 56, color: '#52C41A' }} />
            </div>
            <p style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>密码修改成功</p>
            <p style={{ fontSize: 15, color: '#999', marginBottom: 40 }}>请使用新密码重新登录</p>
            <button onClick={onBack}
              className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
              style={{ height: 52, background: `linear-gradient(90deg, ${PRIMARY} 0%, #FFAA5A 100%)`, fontSize: 17, boxShadow: '0 4px 12px rgba(255,107,53,0.3)', maxWidth: 300 }}>
              返回账号设置
            </button>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-xl px-6 py-3" style={{ background: 'rgba(0,0,0,0.75)', maxWidth: 280 }}>
          <p className="text-center text-white" style={{ fontSize: 15 }}>{toast}</p>
        </div>
      )}
    </div>
  );
};

// ─── Bayu Search Screen ───────────────────────────────────────────────────
const BayuSearchScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const PRIMARY = '#FF6B35';
  const [searchText, setSearchText] = React.useState('');
  const [hotSearches] = React.useState(['广场舞大赛', '养老院推荐', '重庆火锅', '巴渝文化', '健康养生', '旅游出行']);
  const [historySearches] = React.useState(['附近美食', '养生讲座', '社区活动']);

  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F4F0' }}>
      {/* 顶部搜索栏 */}
      <div className="flex items-center flex-shrink-0 px-3 py-3" style={{ background: 'white', height: 56 }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginRight: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div className="flex-1 flex items-center px-3 py-2.5 rounded-2xl" style={{ background: '#F5F5F5', border: '1px solid #EFEFEF' }}>
          <SearchOutlined style={{ fontSize: 16, color: '#999', marginRight: 8 }} />
          <input
            type="text"
            placeholder="搜索巴渝内容"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 border-0 bg-transparent outline-none"
            style={{ fontSize: 15, color: '#1A1A1A', padding: 0 }}
          />
          {searchText && (
            <button onClick={() => setSearchText('')} className="border-0 bg-transparent cursor-pointer p-0.5">
              <CloseCircleFilled style={{ fontSize: 14, color: '#CCC' }} />
            </button>
          )}
        </div>
      </div>

      {/* 搜索建议内容 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* 热门搜索 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FireOutlined style={{ fontSize: 14, color: PRIMARY }} />
            <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>热门搜索</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {hotSearches.map((item, idx) => (
              <button key={idx} className="border-0 cursor-pointer rounded-full px-4 py-2" style={{ background: 'white', fontSize: 14, color: idx === 0 ? PRIMARY : '#666' }}>
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* 搜索历史 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ClockCircleOutlined style={{ fontSize: 14, color: '#999' }} />
              <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>搜索历史</span>
            </div>
            <button className="border-0 bg-transparent cursor-pointer p-1">
              <DeleteOutlined style={{ fontSize: 14, color: '#999' }} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {historySearches.map((item, idx) => (
              <button key={idx} className="flex items-center border-0 bg-transparent cursor-pointer p-0 text-left">
                <span style={{ fontSize: 14, color: '#666' }}>{item}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── My Profile Screen ───────────────────────────────────────────────────
const MyProfileScreen: React.FC<{ onBack: () => void; onNavigate: (screen: string) => void }> = ({ onBack, onNavigate }) => {
  const PRIMARY = '#FF6B35';
  const [nickname, setNickname] = React.useState('张大爷');
  const [nicknameEdit, setNicknameEdit] = React.useState(false);
  const [nicknameInput, setNicknameInput] = React.useState('张大爷');
  const [gender, setGender] = React.useState<'男' | '女'>('男');
  const [genderSheet, setGenderSheet] = React.useState(false);
  const [bio, setBio] = React.useState('热爱生活，喜欢结交朋友');
  const [bioEdit, setBioEdit] = React.useState(false);
  const [bioInput, setBioInput] = React.useState('热爱生活，喜欢结交朋友');
  const [birthday, setBirthday] = React.useState('1965-08-15');
  const [birthdaySheet, setBirthdaySheet] = React.useState(false);
  const [location, setLocation] = React.useState({ province: '重庆市', city: '渝中区', district: '' });
  const [locationSheet, setLocationSheet] = React.useState(false);
  const [userId] = React.useState('88325671');
  const [phoneStep, setPhoneStep] = React.useState<0 | 1 | 2 | 3>(0);
  const [newPhone, setNewPhone] = React.useState('');
  const [smsCode, setSmsCode] = React.useState('');
  const [toast, setToast] = React.useState<string | null>(null);
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2200); };
  // 实名认证相关状态
  const [realNameStep, setRealNameStep] = React.useState<0 | 1 | 2 | 3>(0);
  const [realName, setRealName] = React.useState('');
  const [idCard, setIdCard] = React.useState('');
  const [agreeProtocol, setAgreeProtocol] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);
  const InfoRow = ({ label, value, onClick }: { label: string; value: string; onClick?: () => void }) => (
    <button onClick={onClick} className="flex items-center w-full border-0 bg-transparent text-left cursor-pointer px-4"
      style={{ height: 60, borderBottom: '1px solid #F5F5F5' }}>
      <span style={{ fontSize: 15, color: '#888', width: 72, flexShrink: 0 }}>{label}</span>
      <span style={{ flex: 1, fontSize: 16, color: '#1A1A1A' }}>{value}</span>
      <RightOutlined style={{ fontSize: 13, color: '#CCC' }} />
    </button>
  );
  return (
    <div className="flex flex-col h-full" style={{ background: '#F5F4F0', position: 'relative' }}>
      <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
        <button onClick={onBack} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>我的资料</span>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ padding: '12px 16px 40px' }}>
        <div className="rounded-2xl overflow-hidden mb-3" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
          <div className="flex items-center px-4" style={{ height: 80 }}>
            <span style={{ fontSize: 15, color: '#888', width: 72, flexShrink: 0 }}>头像</span>
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full text-white font-bold"
                style={{ width: 52, height: 52, background: 'linear-gradient(135deg,#FF6B35,#FF9A56)', fontSize: 22, border: '2px solid #FFE0D0' }}>张</div>
              <RightOutlined style={{ fontSize: 13, color: '#CCC' }} />
            </div>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden mb-3" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
          {/* 名字 */}
          {nicknameEdit ? (
            <div className="flex items-center px-4" style={{ height: 60, borderBottom: '1px solid #F5F5F5' }}>
              <span style={{ fontSize: 15, color: '#888', width: 72, flexShrink: 0 }}>名字</span>
              <input value={nicknameInput} onChange={e => setNicknameInput(e.target.value)}
                className="flex-1 border-0 outline-none"
                style={{ fontSize: 16, color: '#1A1A1A', background: 'transparent' }} />
              <button onClick={() => { setNickname(nicknameInput); setNicknameEdit(false); showToast('名字已修改'); }}
                className="border-0 cursor-pointer rounded-full px-3 py-1 text-white text-sm font-medium"
                style={{ background: PRIMARY, flexShrink: 0 }}>保存</button>
            </div>
          ) : (
            <InfoRow label="名字" value={nickname} onClick={() => { setNicknameInput(nickname); setNicknameEdit(true); }} />
          )}
          {/* 简介 */}
          {bioEdit ? (
            <div className="flex flex-col px-4 py-3" style={{ borderBottom: '1px solid #F5F5F5' }}>
              <div className="flex items-center">
                <span style={{ fontSize: 15, color: '#888', width: 72, flexShrink: 0 }}>简介</span>
                <textarea value={bioInput} onChange={e => setBioInput(e.target.value.slice(0, 100))}
                  className="flex-1 border-0 outline-none resize-none"
                  style={{ fontSize: 16, color: '#1A1A1A', background: 'transparent', minHeight: 40, lineHeight: 1.5 }}
                  placeholder="请输入简介（100字以内）" />
              </div>
              <div className="flex items-center justify-end mt-2 gap-2">
                <span style={{ fontSize: 12, color: '#999' }}>{bioInput.length}/100</span>
                <button onClick={() => { setBio(bioInput); setBioEdit(false); showToast('简介已修改'); }}
                  className="border-0 cursor-pointer rounded-full px-3 py-1 text-white text-sm font-medium"
                  style={{ background: PRIMARY, flexShrink: 0 }}>保存</button>
              </div>
            </div>
          ) : (
            <InfoRow label="简介" value={bio || '点击添加简介'} onClick={() => { setBioInput(bio); setBioEdit(true); }} />
          )}
          <InfoRow label="手机号" value="138****8888" onClick={() => setPhoneStep(1)} />
          <InfoRow label="性别" value={gender} onClick={() => setGenderSheet(true)} />
          {/* 生日 */}
          <InfoRow label="生日" value={birthday} onClick={() => setBirthdaySheet(true)} />
          {/* 所在地 */}
          <InfoRow label="所在地" value={location.province + ' ' + location.city + (location.district ? ' ' + location.district : '')} onClick={() => setLocationSheet(true)} />
          {/* ID */}
          <div className="flex items-center px-4" style={{ height: 60, borderBottom: '1px solid #F5F5F5' }}>
            <span style={{ fontSize: 15, color: '#888', width: 72, flexShrink: 0 }}>ID</span>
            <span style={{ flex: 1, fontSize: 16, color: '#1A1A1A' }}>{userId}</span>
            <button onClick={() => { const input = document.createElement('input'); input.value = userId; document.body.appendChild(input); input.select(); document.execCommand('copy'); document.body.removeChild(input); showToast('复制成功'); }} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ color: '#CCC' }}>
              <CopyOutlined style={{ fontSize: 16 }} />
            </button>
          </div>
          {/* 实名认证 */}
          <InfoRow label="实名认证" value={isVerified ? '已认证 ✓' : '去认证'} onClick={() => setRealNameStep(isVerified ? 2 : 1)} />
        </div>
      </div>
      {phoneStep > 0 && (
        <div className="absolute inset-0 flex flex-col" style={{ background: '#F5F4F0', zIndex: 20 }}>
          <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
            <button onClick={() => setPhoneStep(0)} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
              <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
            </button>
            <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>
              {phoneStep === 1 ? '换绑手机号' : phoneStep === 2 ? '输入验证码' : '换绑成功'}
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center px-6 pt-10">
            {phoneStep === 3 ? (
              <>
                <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>换绑成功</div>
                <div style={{ fontSize: 15, color: '#888', marginBottom: 32 }}>新手机号 {newPhone} 已绑定</div>
                <button onClick={() => setPhoneStep(0)} className="w-full border-0 cursor-pointer rounded-2xl text-white font-bold" style={{ height: 56, fontSize: 17, background: PRIMARY }}>完成</button>
              </>
            ) : phoneStep === 2 ? (
              <>
                <div style={{ fontSize: 15, color: '#888', marginBottom: 24 }}>验证码已发送至 {newPhone}</div>
                <input value={smsCode} onChange={(e: any) => setSmsCode(e.target.value)} placeholder="请输入6位验证码"
                  className="w-full border-0 rounded-2xl px-4 outline-none"
                  style={{ height: 56, fontSize: 22, borderColor: '#EBEBEB', background: 'white', letterSpacing: 8, textAlign: 'center', border: '1px solid #EBEBEB' }} />
                <button onClick={() => { if (smsCode.length >= 4) setPhoneStep(3); }} className="w-full border-0 cursor-pointer rounded-2xl text-white font-bold mt-4" style={{ height: 56, fontSize: 17, background: PRIMARY }}>确认换绑</button>
              </>
            ) : (
              <>
                <div style={{ fontSize: 15, color: '#888', marginBottom: 24 }}>请输入新手机号码</div>
                <input value={newPhone} onChange={(e: any) => setNewPhone(e.target.value)} placeholder="请输入新手机号"
                  className="w-full border-0 rounded-2xl px-4 outline-none"
                  style={{ height: 56, fontSize: 18, background: 'white', border: '1px solid #EBEBEB' }} />
                <button onClick={() => { if (newPhone.length >= 7) setPhoneStep(2); }} className="w-full border-0 cursor-pointer rounded-2xl text-white font-bold mt-4" style={{ height: 56, fontSize: 17, background: PRIMARY }}>获取验证码</button>
              </>
            )}
          </div>
        </div>
      )}
      {genderSheet && (
        <div className="absolute inset-0" style={{ zIndex: 30 }} onClick={() => setGenderSheet(false)}>
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white" style={{ padding: '20px 16px 40px' }} onClick={(e: any) => e.stopPropagation()}>
            <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 17, marginBottom: 16 }}>选择性别</div>
            {(['男', '女'] as const).map(g => (
              <button key={g} onClick={() => { setGender(g); setGenderSheet(false); showToast('性别已修改'); }}
                className="w-full border-0 cursor-pointer rounded-2xl mb-2 font-medium"
                style={{ height: 52, fontSize: 16, background: gender === g ? '#FFF4EF' : '#F5F4F0', color: gender === g ? PRIMARY : '#1A1A1A', fontWeight: gender === g ? 700 : 400 }}>{g}</button>
            ))}
          </div>
        </div>
      )}
      {/* 生日选择器 */}
      {birthdaySheet && (
        <div className="absolute inset-0 flex items-end" style={{ zIndex: 30, background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full bg-white rounded-t-3xl" style={{ maxHeight: '60vh' }}>
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #F0F0F0' }}>
              <button onClick={() => setBirthdaySheet(false)} style={{ border: 0, background: 0, fontSize: 15, color: '#999' }}>取消</button>
              <span style={{ fontSize: 17, fontWeight: 700 }}>选择生日</span>
              <button onClick={() => { setBirthdaySheet(false); showToast('生日已修改'); }} style={{ border: 0, background: 0, fontSize: 15, color: PRIMARY, fontWeight: 600 }}>确定</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="text-center text-6xl font-light" style={{ color: PRIMARY }}>{birthday}</div>
              <p className="text-center mt-4 mb-6" style={{ fontSize: 14, color: '#999' }}>生日信息仅用于生成用户画像，不会公开显示</p>
              <div className="flex gap-2 justify-center">
                {['1960', '1965', '1970', '1975', '1980', '1985', '1990', '1995', '2000'].map(year => (
                  <button key={year} onClick={() => setBirthday(`${year}-08-15`)}
                    className="px-3 py-2 rounded-lg font-medium"
                    style={{ background: birthday.startsWith(year) ? PRIMARY : '#F5F4F0', color: birthday.startsWith(year) ? 'white' : '#666', fontSize: 14 }}>{year}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 所在地选择器 */}
      {locationSheet && (
        <div className="absolute inset-0 flex items-end" style={{ zIndex: 30, background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full bg-white rounded-t-3xl" style={{ paddingBottom: 24 }}>
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid #F0F0F0' }}>
              <button onClick={() => setLocationSheet(false)} style={{ border: 0, background: 0, fontSize: 15, color: '#999' }}>取消</button>
              <span style={{ fontSize: 17, fontWeight: 700 }}>选择地区</span>
              <button onClick={() => { setLocationSheet(false); showToast('所在地已修改'); }} style={{ border: 0, background: 0, fontSize: 15, color: PRIMARY, fontWeight: 600 }}>确定</button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {(['渝中区', '江北区', '南岸区', '沙坪坝区', '九龙坡区', '大渡口区', '渝北区', '巴南区'] as const).map(area => (
                <button key={area} onClick={() => { setLocation({ province: '重庆市', city: area, district: '' }); }}
                  className="w-full text-left py-3 px-2 rounded-lg mb-1"
                  style={{ background: location.city === area ? '#FFF4EF' : 'transparent', color: location.city === area ? PRIMARY : '#1A1A1A', fontSize: 15 }}>
                  {area}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* 实名认证流程 */}
      {realNameStep > 0 && (
        <div className="absolute inset-0 flex flex-col" style={{ background: '#F5F4F0', zIndex: 20 }}>
          <div className="flex items-center flex-shrink-0" style={{ height: 56, background: 'white', borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
            <button onClick={() => setRealNameStep(0)} className="flex items-center justify-center border-0 bg-transparent cursor-pointer p-2" style={{ marginLeft: 8 }}>
              <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
            </button>
            <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 18, fontWeight: 700, pointerEvents: 'none' }}>
              {realNameStep === 1 ? '实名认证' : realNameStep === 2 ? (isVerified ? '已认证' : '人脸认证') : '认证成功'}
            </span>
          </div>
          <div className="flex-1 flex flex-col px-6 pt-8" style={{ overflowY: 'auto' }}>
            {realNameStep === 3 ? (
              <>
                <div style={{ textAlign: 'center', marginTop: 40 }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <CheckOutlined style={{ fontSize: 40, color: '#52C41A' }} />
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>实名认证成功</div>
                  <div style={{ fontSize: 15, color: '#888', marginBottom: 8 }}>您已通过实名认证</div>
                  <div style={{ fontSize: 14, color: '#666' }}>认证姓名：{realName}</div>
                  <div style={{ fontSize: 14, color: '#666' }}>身份证号：{idCard.replace(/(\d{3})\d*(\d{4})/, '$1********$2')}</div>
                </div>
                <div style={{ flex: 1 }} />
                <button onClick={() => { setRealNameStep(0); setIsVerified(true); }} className="w-full border-0 cursor-pointer rounded-2xl text-white font-bold mb-8" style={{ height: 56, fontSize: 17, background: PRIMARY }}>完成</button>
              </>
            ) : realNameStep === 2 ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: isVerified ? '#E8F5E9' : '#FFF4EF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    {isVerified ? (
                      <CheckOutlined style={{ fontSize: 40, color: '#52C41A' }} />
                    ) : (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="#FF6B35">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
                      </svg>
                    )}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{isVerified ? '已认证' : '人脸认证'}</div>
                  <div style={{ fontSize: 14, color: '#888' }}>{isVerified ? '您已通过实名认证' : '请将面部对准摄像头，保持光线充足'}</div>
                </div>
                <div style={{ background: '#FFF4EF', borderRadius: 12, padding: '16px', marginBottom: 24 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: PRIMARY, marginBottom: 8 }}>认证信息</div>
                  <div style={{ fontSize: 14, color: '#666' }}>姓名：{realName || '张大爷'}</div>
                  <div style={{ fontSize: 14, color: '#666' }}>证件类型：中国居民身份证</div>
                  <div style={{ fontSize: 14, color: '#666' }}>证件号码：{idCard ? idCard.replace(/(\d{3})\d*(\d{4})/, '$1********$2') : '******************'}</div>
                </div>
                <div style={{ flex: 1 }} />
                {isVerified ? (
                  <button onClick={() => setRealNameStep(0)} className="w-full border-0 cursor-pointer rounded-2xl text-white font-bold mb-8" style={{ height: 56, fontSize: 17, background: PRIMARY }}>返回</button>
                ) : (
                  <button onClick={() => setRealNameStep(3)} className="w-full border-0 cursor-pointer rounded-2xl text-white font-bold mb-8" style={{ height: 56, fontSize: 17, background: PRIMARY }}>开始认证</button>
                )}
              </>
            ) : (
              <>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>请填写认证信息</div>
                <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
                  {/* 证件类型 */}
                  <div className="flex items-center px-4" style={{ height: 56, borderBottom: '1px solid #F5F5F5' }}>
                    <span style={{ fontSize: 15, color: '#888', width: 84, flexShrink: 0 }}>证件类型</span>
                    <span style={{ flex: 1, fontSize: 15, color: '#1A1A1A' }}>中国居民身份证</span>
                  </div>
                  {/* 姓名 */}
                  <div className="flex items-center px-4" style={{ height: 56, borderBottom: '1px solid #F5F5F5' }}>
                    <span style={{ fontSize: 15, color: '#888', width: 84, flexShrink: 0 }}>姓名</span>
                    <input value={realName} onChange={e => setRealName(e.target.value)} placeholder="请输入真实姓名"
                      className="flex-1 border-0 outline-none" style={{ fontSize: 15, color: '#1A1A1A', background: 'transparent' }} />
                  </div>
                  {/* 身份证号 */}
                  <div className="flex items-center px-4" style={{ height: 56 }}>
                    <span style={{ fontSize: 15, color: '#888', width: 84, flexShrink: 0 }}>身份证号</span>
                    <input value={idCard} onChange={e => setIdCard(e.target.value)} placeholder="请输入18位身份证号"
                      className="flex-1 border-0 outline-none" style={{ fontSize: 15, color: '#1A1A1A', background: 'transparent', letterSpacing: 0 }} maxLength={18} />
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 20 }}>认证方式</div>
                <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
                  <div className="flex items-center px-4" style={{ height: 56 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #FF6B35', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF6B35' }} />
                    </div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF6B35" style={{ marginRight: 8 }}>
                      <circle cx="12" cy="8" r="4" />
                      <path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
                    </svg>
                    <span style={{ fontSize: 15, color: '#1A1A1A' }}>人脸认证</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 px-4 mt-6" style={{ cursor: 'pointer' }} onClick={() => setAgreeProtocol(!agreeProtocol)}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: agreeProtocol ? 'none' : '1px solid #CCC', background: agreeProtocol ? PRIMARY : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2, flexShrink: 0 }}>
                    {agreeProtocol && <CheckOutlined style={{ fontSize: 14, color: 'white' }} />}
                  </div>
                  <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
                    我已阅读并同意<a style={{ color: PRIMARY }}>《服务协议》</a><a style={{ color: PRIMARY }}>《隐私政策》</a>，我同意益寿巴渝采集人脸图像或视频用于认证服务
                  </div>
                </div>
                <div style={{ flex: 1 }} />
                <button onClick={() => setRealNameStep(2)}
                  className="w-full border-0 cursor-pointer rounded-2xl text-white font-bold mb-8"
                  style={{ height: 56, fontSize: 17, background: PRIMARY }}>下一步</button>
              </>
            )}
          </div>
        </div>
      )}
      {toast && (
        <div className="absolute left-1/2 flex items-center justify-center rounded-2xl" style={{ bottom: 100, transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', color: 'white', fontSize: 15, padding: '10px 24px', zIndex: 50, whiteSpace: 'nowrap' }}>{toast}</div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Profile Tab（抖音风格重构）
// ─────────────────────────────────────────────
type ProfileContentTab = 'works' | 'favorites' | 'likes';

const ProfileTab: React.FC<{ onNavigate: (screen: AppScreen) => void; setActiveVideoPool?: (pool: FollowPost[]) => void; setProfileVideoStartId?: (id: number) => void; setActivePost?: (post: FollowPost) => void; setMallInitialTab?: (tab: 'home' | 'mine') => void }> = ({ onNavigate, setActiveVideoPool, setProfileVideoStartId, setActivePost, setMallInitialTab }) => {
  const [contentTab, setContentTab] = useState<ProfileContentTab>('works');

  // 根据当前Tab获取内容
  const getCurrentPosts = () => {
    if (contentTab === 'works') return MY_DYNAMICS_POSTS;
    if (contentTab === 'favorites') return MY_FAVORITES_POSTS;
    return MY_LIKES_POSTS;
  };

  // Tab配置
  const TABS: { id: ProfileContentTab; label: string; count: number }[] = [
    { id: 'works', label: '作品', count: MY_DYNAMICS_POSTS.length },
    { id: 'favorites', label: '收藏', count: MY_FAVORITES_POSTS.length },
    { id: 'likes', label: '喜欢', count: MY_LIKES_POSTS.length },
  ];

  // 功能入口配置
  const FUNCTION_ITEMS = [
    { icon: ShoppingCartOutlined, label: '我的订单', badge: undefined },
    { icon: GiftOutlined, label: '积分商城', badge: undefined },
    { icon: WalletOutlined, label: '我的钱包', badge: undefined },
    { icon: TagOutlined, label: '优惠券', badge: undefined },
  ];

  // 内容Tab点击处理 - 所有帖子先进入大屏界面，再通过"查看详情"进入详情页
  const handleContentClick = (post: FollowPost) => {
    // 所有帖子（图文和视频）都进入视频大屏
    if (setActiveVideoPool) setActiveVideoPool(getCurrentPosts());
    if (setProfileVideoStartId) setProfileVideoStartId(post.id);
    onNavigate('video-feed');
  };

  return (
    <div className="flex flex-col flex-1 min-h-0" style={{ background: 'transparent' }}>
      {/* 头部渐变区域 */}
      <div style={{ background: 'linear-gradient(150deg, #FF6B35 0%, #FF6B35 100%)', position: 'relative', paddingTop: 20, flexShrink: 0 }}>
        {/* 设置按钮 */}
        <button
          onClick={() => onNavigate('settings')}
          className="flex items-center gap-1 border-0 cursor-pointer absolute"
          style={{ top: 12, right: 16, background: 'rgba(255,255,255,0.22)', borderRadius: 20, padding: '6px 14px', color: 'white', fontSize: 13, fontWeight: 600 }}>
          <SettingOutlined style={{ fontSize: 14 }} />
        </button>

        {/* 头像区域 */}
        <div className="flex flex-col items-center pb-4">
          <div className="flex items-center justify-center rounded-full overflow-hidden"
            style={{ width: 80, height: 80, border: '3px solid rgba(255,255,255,0.5)' }}>
            <img src="https://picsum.photos/seed/zhangdaye/80/80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* 昵称 + 年龄标签 */}
          <div className="flex items-center gap-2 mt-3 text-white">
            <span style={{ fontSize: 22, fontWeight: 700 }}>张大爷</span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-white" style={{ fontSize: 12, background: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>
              <span>♂</span>
              <span>66岁</span>
            </div>
          </div>

          {/* ID + 地区 */}
          <div className="flex items-center justify-center gap-2 text-white mt-1" style={{ fontSize: 13, opacity: 0.85 }}>
            <span>益寿号：YS10234567</span>
            <EnvironmentOutlined style={{ fontSize: 12 }} />
            <span>重庆市渝中区</span>
          </div>

          {/* 简介 */}
          <div className="text-white mt-1 text-center" style={{ fontSize: 13, opacity: 0.75 }}>热爱生活，每天保持好心情</div>

          {/* 数据统计行（4列） */}
          <div className="flex mt-4 w-full" style={{ maxWidth: 320 }}>
            <button onClick={() => onNavigate('follow-list')} className="flex-1 text-center border-0 cursor-pointer" style={{ background: 'transparent' }}>
              <div className="text-white" style={{ fontSize: 18, fontWeight: 700 }}>10</div>
              <div className="text-white" style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>互关</div>
            </button>
            <button onClick={() => onNavigate('follow-list')} className="flex-1 text-center border-0 cursor-pointer" style={{ background: 'transparent' }}>
              <div className="text-white" style={{ fontSize: 18, fontWeight: 700 }}>186</div>
              <div className="text-white" style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>粉丝</div>
            </button>
            <button onClick={() => onNavigate('follow-list')} className="flex-1 text-center border-0 cursor-pointer" style={{ background: 'transparent' }}>
              <div className="text-white" style={{ fontSize: 18, fontWeight: 700 }}>94</div>
              <div className="text-white" style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>关注</div>
            </button>
            <button className="flex-1 text-center border-0 cursor-pointer" style={{ background: 'transparent' }}>
              <div className="text-white" style={{ fontSize: 18, fontWeight: 700 }}>1.2k</div>
              <div className="text-white" style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>获赞</div>
            </button>
          </div>
        </div>
      </div>

      {/* 功能入口区域 */}
      <div className="mx-4 mt-3 rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
        <div className="grid grid-cols-4">
          {FUNCTION_ITEMS.map((item, idx) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.label === '我的订单') {
                  onNavigate('points-records');
                } else if (item.label === '积分商城') {
                  if (setMallInitialTab) setMallInitialTab('home');
                  onNavigate('points-mall');
                } else if (item.label === '我的钱包') {
                  onNavigate('my-wallet');
                } else if (item.label === '优惠券') {
                  // TODO: 优惠券页面
                } else if (item.label === '账号设置') {
                  onNavigate('settings');
                }
              }}
              className="flex flex-col items-center py-4 border-0 cursor-pointer bg-transparent">
              <div className="flex items-center justify-center rounded-2xl" style={{ width: 44, height: 44, background: PRIMARY_BG }}>
                <item.icon style={{ fontSize: 20, color: PRIMARY }} />
              </div>
              <div className="mt-2" style={{ fontSize: 12, color: '#1A1A1A', fontWeight: 500 }}>{item.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 广告宣传卡片 */}
      <div className="mx-4 mt-3 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 50%, #FFB380 100%)' }}>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 text-white">
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>加入我们，开启精彩生活</div>
              <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.6, marginBottom: 12 }}>成为服务商或达人，分享美好生活，获得更多收益</div>
              <div className="flex gap-2">
                <button
                  onClick={() => onNavigate('partner-join')}
                  className="flex items-center justify-center gap-1 rounded-full border-0 cursor-pointer font-semibold"
                  style={{ height: 36, padding: '0 16px', fontSize: 13, background: 'white', color: '#FF6B35' }}
                >
                  <span>成为服务商</span>
                </button>
                <button
                  onClick={() => onNavigate('influencer-join')}
                  className="flex items-center justify-center gap-1 rounded-full border-0 cursor-pointer font-semibold"
                  style={{ height: 36, padding: '0 16px', fontSize: 13, background: 'rgba(255,255,255,0.3)', color: 'white' }}
                >
                  <span>成为达人</span>
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop"
                alt="加入我们"
                className="rounded-xl object-cover"
                style={{ width: 80, height: 80 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 内容Tab区域 */}
      <div className="mt-4 rounded-t-3xl" style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Tab栏 */}
        <div className="flex">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setContentTab(tab.id)}
              className="flex-1 py-3 border-0 cursor-pointer bg-transparent relative"
              style={{ background: 'transparent' }}>
              <span style={{
                fontSize: 15,
                fontWeight: contentTab === tab.id ? 700 : 400,
                color: contentTab === tab.id ? '#1A1A1A' : '#999',
              }}>
                {tab.label}
              </span>
              {contentTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 rounded-full" style={{ height: 3, background: PRIMARY }} />
              )}
            </button>
          ))}
        </div>

        {/* 内容网格（3列瀑布流）- 可滚动 */}
        <div className="flex-1 overflow-y-auto p-1">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {getCurrentPosts().map(post => (
              <button
                key={post.id}
                onClick={() => handleContentClick(post)}
                className="relative overflow-hidden border-0 cursor-pointer p-0"
                style={{ background: '#E8E8E8', aspectRatio: '3/4', width: '100%' }}>
                <img
                  src={`https://picsum.photos/seed/${post.coverSeed}/200/267`}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                {/* 视频缩略图显示播放按钮 */}
                {post.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.2)' }}>
                    <PlayCircleFilled style={{ fontSize: 32, color: 'white' }} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 版本信息 */}
      <div className="py-4 text-center flex-shrink-0" style={{ fontSize: 12, color: '#CCC' }}>益寿巴渝APP v1.0.0 · 关怀每一位长辈</div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ── ACTIVITY DETAIL SCREEN ──────────────────
// ─────────────────────────────────────────────
const ActivityDetailScreen: React.FC<{
  activity: LocalActivity;
  enrolled: boolean;
  onEnroll: () => void;
  onBack: () => void;
}> = ({ activity, enrolled, onEnroll, onBack }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', idCard: '', emergencyContact: '', emergencyPhone: '', healthNote: '' });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const full = activity.enrolled >= activity.maxEnroll;
  const progressPercent = Math.round((activity.enrolled / activity.maxEnroll) * 100);

  const handleEnroll = () => {
    if (enrolled || full) return;
    setShowEnrollForm(true);
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    if (!formData.name.trim()) errors.name = '请输入您的姓名';
    if (!formData.phone.trim()) errors.phone = '请输入手机号码';
    else if (!/^1[3-9]\d{9}$/.test(formData.phone)) errors.phone = '请输入正确的手机号码';
    if (!formData.idCard.trim()) errors.idCard = '请输入身份证号';
    else if (!/^\d{17}[\dXx]$/.test(formData.idCard)) errors.idCard = '请输入正确的身份证号';
    if (!formData.emergencyContact.trim()) errors.emergencyContact = '请输入紧急联系人姓名';
    if (!formData.emergencyPhone.trim()) errors.emergencyPhone = '请输入紧急联系人电话';
    else if (!/^1[3-9]\d{9}$/.test(formData.emergencyPhone)) errors.emergencyPhone = '请输入正确的手机号码';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitEnroll = () => {
    if (!validateForm()) return;
    setShowEnrollForm(false);
    onEnroll();
    setShowSuccess(true);
  };

  return (
    <div className="flex flex-col flex-1" style={{ background: '#F5F5F5', position: 'relative', minHeight: 0 }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative', zIndex: 1 }}>
        <button onClick={onBack} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, color: '#1A1A1A', pointerEvents: 'none' }}>活动详情</span>
      </div>

      {/* Content */}
      <div className="overflow-y-auto" style={{ flex: 1, height: 0, paddingBottom: 96 }}>
        {/* Hero Image */}
        <img
          src={`https://picsum.photos/seed/${activity.image}/400/220`}
          alt={activity.title}
          style={{ width: '100%', height: 220, objectFit: 'cover' }}
        />

        {/* Info Card */}
        <div className="mx-4 -mt-6 rounded-2xl overflow-hidden" style={{ background: 'white', position: 'relative', zIndex: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="rounded-full px-3 py-1" style={{ fontSize: 12, background: PRIMARY_BG, color: PRIMARY }}>{activity.category}</span>
              <span style={{ fontSize: 12, color: '#AAA' }}>{activity.organizer}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A', marginBottom: 12, lineHeight: 1.3 }}>{activity.title}</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2" style={{ fontSize: 14, color: '#666' }}>
                <CalendarOutlined style={{ color: PRIMARY, fontSize: 16, flexShrink: 0 }} />
                <span>{activity.date}</span>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: 14, color: '#666' }}>
                <EnvironmentOutlined style={{ color: PRIMARY, fontSize: 16, flexShrink: 0 }} />
                <span>{activity.location}</span>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: 14, color: '#666' }}>
                <TeamOutlined style={{ color: PRIMARY, fontSize: 16, flexShrink: 0 }} />
                <span>主办：{activity.organizer}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollment Progress */}
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'white' }}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: 14, color: '#333', fontWeight: 600 }}>报名进度</span>
              <span style={{ fontSize: 13, color: '#888' }}>已报名 {activity.enrolled}/{activity.maxEnroll} 人</span>
            </div>
            <div style={{ height: 8, background: '#F0F0F0', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressPercent}%`, background: progressPercent >= 90 ? '#FF4D4F' : progressPercent >= 60 ? '#FAAD14' : PRIMARY, borderRadius: 4, transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>

        {/* Activity Description */}
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'white' }}>
          <div className="p-4">
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>活动介绍</div>
            <div style={{ fontSize: 14, color: '#666', lineHeight: 1.9 }}>
              <p style={{ marginBottom: 10 }}>{activity.title}是面向全市中老年朋友的大型文化体育活动，旨在丰富老年人精神文化生活，推广健康生活方式，促进社区交流与互动。</p>
              <p style={{ marginBottom: 10 }}>本次活动由{activity.organizer}联合举办，吸引了来自各区县的众多中老年朋友积极参与。活动内容包括才艺展示、健康运动、文化交流等多个环节。</p>
              <p style={{ marginBottom: 10 }}>我们诚挚邀请各位老年朋友踊跃报名参加，共同度过一个欢乐、健康、有意义的美好时光！报名成功后将有工作人员电话确认，请保持手机畅通。</p>
              <p>温馨提示：请根据自身身体状况选择适合的项目参加，活动当天请提前30分钟到场签到。</p>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="mx-4 mt-4 mb-4 rounded-2xl overflow-hidden" style={{ background: '#FFF7E6' }}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ExclamationCircleOutlined style={{ color: '#FA8C16', fontSize: 16 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#D48806' }}>注意事项</span>
            </div>
            <div style={{ fontSize: 13, color: '#8C6A50', lineHeight: 1.8 }}>
              <p>1. 请如实填写个人信息，以便工作人员联系确认</p>
              <p>2. 活动当天请携带身份证件原件</p>
              <p>3. 如有慢性病或过敏史请提前告知</p>
              <p>4. 名额有限，报满即止</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: 'white', borderTop: '1px solid #F0F0F0' }}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center" style={{ flexShrink: 0 }}>
            <HeartOutlined style={{ fontSize: 22, color: '#FF6B35' }} />
            <span style={{ fontSize: 11, color: '#888', marginTop: 2 }}>收藏</span>
          </div>
          <div className="flex flex-col items-center" style={{ flexShrink: 0, cursor: 'pointer' }} onClick={() => setShowShare(true)}>
            <ShareAltOutlined style={{ fontSize: 22, color: '#666' }} />
            <span style={{ fontSize: 11, color: '#888', marginTop: 2 }}>分享</span>
          </div>
          <button
            onClick={handleEnroll}
            className="flex-1 rounded-xl text-white font-bold border-0 cursor-pointer"
            style={{
              height: 48,
              background: enrolled ? '#F6FFED' : full ? '#F5F5F5' : PRIMARY,
              color: enrolled ? '#52C41A' : full ? '#BBB' : 'white',
              fontSize: 16,
              boxShadow: enrolled || full ? 'none' : '0 4px 14px rgba(255,107,53,0.3)',
              cursor: enrolled || full ? 'default' : 'pointer',
            }}
          >
            {enrolled ? '✓ 已报名' : full ? '名额已满' : '立即报名'}
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {showShare && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }} onClick={() => setShowShare(false)}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col items-center" style={{ paddingBottom: 48, paddingTop: 12 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ width: 40, height: 4, background: '#E0E0E0', borderRadius: 2, marginBottom: 16 }} />
            <div style={{ fontSize: 15, color: '#666', marginBottom: 20 }}>分享到</div>
            <div className="flex items-start justify-center gap-8 px-4">
              <div className="flex flex-col items-center gap-2" style={{ cursor: 'pointer' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="#FF9800"/>
                  </svg>
                </div>
                <span style={{ fontSize: 12, color: '#333' }}>私信好友</span>
              </div>
              <div className="flex flex-col items-center gap-2" style={{ cursor: 'pointer' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M8.5 11.5C9.33 11.5 10 10.83 10 10C10 9.17 9.33 8.5 8.5 8.5C7.67 8.5 7 9.17 7 10C7 10.83 7.67 11.5 8.5 11.5ZM15.5 11.5C16.33 11.5 17 10.83 17 10C17 9.17 16.33 8.5 15.5 8.5C14.67 8.5 14 9.17 14 10C14 10.83 14.67 11.5 15.5 11.5ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#4CAF50"/>
                  </svg>
                </div>
                <span style={{ fontSize: 12, color: '#333' }}>微信好友</span>
              </div>
              <div className="flex flex-col items-center gap-2" style={{ cursor: 'pointer' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M18.5 10C17.12 10 16 8.88 16 7.5C16 6.12 17.12 5 18.5 5C19.88 5 21 6.12 21 7.5C21 8.88 19.88 10 18.5 10ZM11.5 5C9.62 5 8 6.62 8 8.5C8 10.38 9.62 12 11.5 12C13.38 12 15 10.38 15 8.5C15 6.62 13.38 5 11.5 5ZM11.5 14C8.41 14 2 16.22 2 19.5V21H21V19.5C21 16.22 14.59 14 11.5 14Z" fill="#4CAF50"/>
                  </svg>
                </div>
                <span style={{ fontSize: 12, color: '#333' }}>朋友圈</span>
              </div>
              <div className="flex flex-col items-center gap-2" style={{ cursor: 'pointer' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="#2196F3"/>
                  </svg>
                </div>
                <span style={{ fontSize: 12, color: '#333' }}>复制链接</span>
              </div>
            </div>
            <div className="w-full px-4 mt-6">
              <div className="w-full rounded-xl border-0 cursor-pointer flex items-center justify-center" style={{ height: 48, background: '#F5F5F5', fontSize: 16, color: '#666' }} onClick={() => setShowShare(false)}>
                取消
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Form Modal */}
      {showEnrollForm && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }} onClick={() => setShowEnrollForm(false)}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ width: 40, height: 4, background: '#E0E0E0', borderRadius: 2, margin: '0 auto 12px' }} />
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>报名信息填写</div>
              <div style={{ fontSize: 13, color: '#888', textAlign: 'center', marginTop: 4 }}>请填写真实信息以便工作人员联系</div>
            </div>
            <div className="overflow-y-auto" style={{ flex: 1, padding: '16px 20px 20px' }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>姓名 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input
                  type="text"
                  placeholder="请输入您的姓名"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.name ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
                {formErrors.name && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.name}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>手机号码 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input
                  type="tel"
                  placeholder="请输入手机号码"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.phone ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
                {formErrors.phone && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.phone}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>身份证号 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input
                  type="text"
                  placeholder="请输入身份证号码"
                  value={formData.idCard}
                  onChange={(e) => setFormData({...formData, idCard: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.idCard ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
                {formErrors.idCard && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.idCard}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>紧急联系人 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input
                  type="text"
                  placeholder="请输入紧急联系人姓名"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.emergencyContact ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
                {formErrors.emergencyContact && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.emergencyContact}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>紧急联系人电话 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input
                  type="tel"
                  placeholder="请输入紧急联系人电话"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.emergencyPhone ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
                {formErrors.emergencyPhone && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.emergencyPhone}</div>}
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>健康备注（选填）</div>
                <textarea
                  placeholder="如有慢性病、过敏史或需特殊照顾的情况，请在此说明"
                  value={formData.healthNote}
                  onChange={(e) => setFormData({...formData, healthNote: e.target.value})}
                  rows={3}
                  style={{ width: '100%', borderRadius: 12, border: '1px solid #E8E8E8', padding: '12px 14px', fontSize: 15, outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>
            </div>
            <div className="flex gap-3 px-4 pb-6 pt-2" style={{ borderTop: '1px solid #F0F0F0', paddingTop: 12 }}>
              <button
                onClick={() => setShowEnrollForm(false)}
                className="flex-1 rounded-xl border-0 cursor-pointer font-bold"
                style={{ height: 48, background: '#F5F5F5', color: '#666', fontSize: 16 }}
              >
                取消
              </button>
              <button
                onClick={handleSubmitEnroll}
                className="flex-1 rounded-xl text-white font-bold border-0 cursor-pointer"
                style={{ height: 48, background: PRIMARY, fontSize: 16, boxShadow: '0 4px 14px rgba(255,107,53,0.3)' }}
              >
                确认报名
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Success Modal */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col items-center gap-4 p-6" style={{ paddingBottom: 48 }}>
            <CheckCircleFilled style={{ fontSize: 72, color: '#52C41A' }} />
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A' }}>报名成功！</div>
            <div style={{ fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 1.8 }}>
              您已成功报名参加<br /><strong>{activity.title}</strong><br />工作人员将在24小时内致电确认
            </div>
            <div className="w-full px-4 py-4 rounded-2xl" style={{ background: '#F6FFED', border: '1px solid #B7EB8F' }}>
              <div style={{ fontSize: 14, color: '#389E0D' }}>
                <CheckCircleOutlined style={{ marginRight: 6 }} />报名记录已同步到"我的" → "我的活动"
              </div>
            </div>
            <button onClick={() => { setShowSuccess(false); onBack(); }} className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
              style={{ height: 52, background: PRIMARY, fontSize: 16 }}>
              返回活动列表
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Competition Detail Screen
// ─────────────────────────────────────────────
const BISAI_ORANGE = '#FA8C16';
const BISAI_BG = '#FFF7E6';

const CompetitionDetailScreen: React.FC<{
  competition: CompetitionInfo;
  onBack: () => void;
}> = ({ competition, onBack }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', idCard: '', emergencyContact: '', emergencyPhone: '', healthNote: '' });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    if (!formData.name.trim()) errors.name = '请输入您的姓名';
    if (!formData.phone.trim()) errors.phone = '请输入手机号码';
    else if (!/^1[3-9]\d{9}$/.test(formData.phone)) errors.phone = '请输入正确的手机号码';
    if (!formData.idCard.trim()) errors.idCard = '请输入身份证号';
    else if (!/^\d{17}[\dXx]$/.test(formData.idCard)) errors.idCard = '请输入正确的身份证号';
    if (!formData.emergencyContact.trim()) errors.emergencyContact = '请输入紧急联系人姓名';
    if (!formData.emergencyPhone.trim()) errors.emergencyPhone = '请输入紧急联系人电话';
    else if (!/^1[3-9]\d{9}$/.test(formData.emergencyPhone)) errors.emergencyPhone = '请输入正确的手机号码';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitEnroll = () => {
    if (!validateForm()) return;
    setShowEnrollForm(false);
    setShowSuccess(true);
  };

  return (
    <div className="flex flex-col flex-1" style={{ background: '#F5F5F5', position: 'relative', minHeight: 0 }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative', zIndex: 1 }}>
        <button onClick={onBack} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, color: '#1A1A1A', pointerEvents: 'none' }}>赛事详情</span>
      </div>

      {/* Content */}
      <div className="overflow-y-auto" style={{ flex: 1, height: 0, paddingBottom: 96 }}>
        {/* Hero Image */}
        <img
          src={`https://picsum.photos/seed/${competition.image}/400/220`}
          alt={competition.title}
          style={{ width: '100%', height: 220, objectFit: 'cover' }}
        />

        {/* Info Card */}
        <div className="mx-4 -mt-6 rounded-2xl overflow-hidden" style={{ background: 'white', position: 'relative', zIndex: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="rounded-full px-3 py-1" style={{ fontSize: 12, background: BISAI_BG, color: BISAI_ORANGE }}>{competition.category}</span>
              <span style={{ fontSize: 12, color: '#AAA' }}>{competition.organizer}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A', marginBottom: 12, lineHeight: 1.3 }}>{competition.title}</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2" style={{ fontSize: 14, color: '#666' }}>
                <CalendarOutlined style={{ color: BISAI_ORANGE, fontSize: 16, flexShrink: 0 }} />
                <span>{competition.date}</span>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: 14, color: '#666' }}>
                <EnvironmentOutlined style={{ color: BISAI_ORANGE, fontSize: 16, flexShrink: 0 }} />
                <span>{competition.location}</span>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: 14, color: '#666' }}>
                <TeamOutlined style={{ color: BISAI_ORANGE, fontSize: 16, flexShrink: 0 }} />
                <span>主办：{competition.organizer}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Competition Description */}
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'white' }}>
          <div className="p-4">
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>赛事介绍</div>
            <div style={{ fontSize: 14, color: '#666', lineHeight: 1.9 }}>
              <p style={{ marginBottom: 10 }}>{competition.title}是面向全市中老年朋友的大型体育文化活动，旨在丰富老年人精神文化生活，推广健康生活方式，促进社区交流与互动。</p>
              <p style={{ marginBottom: 10 }}>本次活动由{competition.organizer}联合举办，吸引了来自各区县的众多中老年朋友积极参与。活动内容包括体育竞技、才艺展示、健康运动等多个环节。</p>
              <p style={{ marginBottom: 10 }}>我们诚挚邀请各位老年朋友踊跃报名参加，共同度过一个欢乐、健康、有意义的美好时光！报名成功后将有工作人员电话确认，请保持手机畅通。</p>
              <p>温馨提示：请根据自身身体状况选择适合的项目参加，赛事当天请提前30分钟到场签到。</p>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="mx-4 mt-4 mb-4 rounded-2xl overflow-hidden" style={{ background: '#FFF7E6' }}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ExclamationCircleOutlined style={{ color: '#FA8C16', fontSize: 16 }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#D48806' }}>注意事项</span>
            </div>
            <div style={{ fontSize: 13, color: '#8C6A50', lineHeight: 1.8 }}>
              <p>1. 请如实填写个人信息，以便工作人员联系确认</p>
              <p>2. 赛事当天请携带身份证件原件</p>
              <p>3. 如有慢性病或过敏史请提前告知</p>
              <p>4. 名额有限，报满即止</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: 'white', borderTop: '1px solid #F0F0F0' }}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center" style={{ flexShrink: 0 }}>
            <HeartOutlined style={{ fontSize: 22, color: '#FA8C16' }} />
            <span style={{ fontSize: 11, color: '#888', marginTop: 2 }}>收藏</span>
          </div>
          <div className="flex flex-col items-center" style={{ flexShrink: 0, cursor: 'pointer' }} onClick={() => setShowShare(true)}>
            <ShareAltOutlined style={{ fontSize: 22, color: '#666' }} />
            <span style={{ fontSize: 11, color: '#888', marginTop: 2 }}>分享</span>
          </div>
          <button
            onClick={() => setShowEnrollForm(true)}
            className="flex-1 rounded-xl text-white font-bold border-0 cursor-pointer"
            style={{
              height: 48,
              background: BISAI_ORANGE,
              color: 'white',
              fontSize: 16,
              boxShadow: '0 4px 14px rgba(250,140,22,0.3)',
            }}
          >
            立即报名
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {showShare && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }} onClick={() => setShowShare(false)}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col items-center" style={{ paddingBottom: 48, paddingTop: 12 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ width: 40, height: 4, background: '#E0E0E0', borderRadius: 2, marginBottom: 16 }} />
            <div style={{ fontSize: 15, color: '#666', marginBottom: 20 }}>分享到</div>
            <div className="flex items-start justify-center gap-8 px-4">
              <div className="flex flex-col items-center gap-2" style={{ cursor: 'pointer' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="#FF9800"/>
                  </svg>
                </div>
                <span style={{ fontSize: 12, color: '#333' }}>私信好友</span>
              </div>
              <div className="flex flex-col items-center gap-2" style={{ cursor: 'pointer' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M8.5 11.5C9.33 11.5 10 10.83 10 10C10 9.17 9.33 8.5 8.5 8.5C7.67 8.5 7 9.17 7 10C7 10.83 7.67 11.5 8.5 11.5Z" fill="#4CAF50"/>
                  </svg>
                </div>
                <span style={{ fontSize: 12, color: '#333' }}>微信好友</span>
              </div>
              <div className="flex flex-col items-center gap-2" style={{ cursor: 'pointer' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M18.5 10C17.12 10 16 8.88 16 7.5C16 6.12 17.12 5 18.5 5C19.88 5 21 6.12 21 7.5C21 8.88 19.88 10 18.5 10Z" fill="#4CAF50"/>
                  </svg>
                </div>
                <span style={{ fontSize: 12, color: '#333' }}>朋友圈</span>
              </div>
              <div className="flex flex-col items-center gap-2" style={{ cursor: 'pointer' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5Z" fill="#2196F3"/>
                  </svg>
                </div>
                <span style={{ fontSize: 12, color: '#333' }}>复制链接</span>
              </div>
            </div>
            <div className="w-full px-4 mt-6">
              <div className="w-full rounded-xl border-0 cursor-pointer flex items-center justify-center" style={{ height: 48, background: '#F5F5F5', fontSize: 16, color: '#666' }} onClick={() => setShowShare(false)}>
                取消
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Form Modal */}
      {showEnrollForm && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }} onClick={() => setShowEnrollForm(false)}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ width: 40, height: 4, background: '#E0E0E0', borderRadius: 2, margin: '0 auto 12px' }} />
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>报名信息填写</div>
              <div style={{ fontSize: 13, color: '#888', textAlign: 'center', marginTop: 4 }}>请填写真实信息以便工作人员联系</div>
            </div>
            <div className="overflow-y-auto" style={{ flex: 1, padding: '16px 20px 20px' }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>姓名 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input
                  type="text"
                  placeholder="请输入您的姓名"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.name ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
                {formErrors.name && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.name}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>手机号码 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input
                  type="tel"
                  placeholder="请输入手机号码"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.phone ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
                {formErrors.phone && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.phone}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>身份证号 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input
                  type="text"
                  placeholder="请输入身份证号码"
                  value={formData.idCard}
                  onChange={(e) => setFormData({...formData, idCard: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.idCard ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
                {formErrors.idCard && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.idCard}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>紧急联系人 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input
                  type="text"
                  placeholder="请输入紧急联系人姓名"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.emergencyContact ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
                {formErrors.emergencyContact && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.emergencyContact}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>紧急联系人电话 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input
                  type="tel"
                  placeholder="请输入紧急联系人电话"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.emergencyPhone ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
                />
                {formErrors.emergencyPhone && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.emergencyPhone}</div>}
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>健康备注（选填）</div>
                <textarea
                  placeholder="如有慢性病、过敏史或需特殊照顾的情况，请在此说明"
                  value={formData.healthNote}
                  onChange={(e) => setFormData({...formData, healthNote: e.target.value})}
                  rows={3}
                  style={{ width: '100%', borderRadius: 12, border: '1px solid #E8E8E8', padding: '12px 14px', fontSize: 15, outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>
            </div>
            <div className="flex gap-3 px-4 pb-6 pt-2" style={{ borderTop: '1px solid #F0F0F0', paddingTop: 12 }}>
              <button
                onClick={() => setShowEnrollForm(false)}
                className="flex-1 rounded-xl border-0 cursor-pointer font-bold"
                style={{ height: 48, background: '#F5F5F5', color: '#666', fontSize: 16 }}
              >
                取消
              </button>
              <button
                onClick={handleSubmitEnroll}
                className="flex-1 rounded-xl text-white font-bold border-0 cursor-pointer"
                style={{ height: 48, background: BISAI_ORANGE, fontSize: 16, boxShadow: '0 4px 14px rgba(250,140,22,0.3)' }}
              >
                确认报名
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Success Modal */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col items-center gap-4 p-6" style={{ paddingBottom: 48 }}>
            <CheckCircleFilled style={{ fontSize: 72, color: '#52C41A' }} />
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A' }}>报名成功！</div>
            <div style={{ fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 1.8 }}>
              您已成功报名参加<br /><strong>{competition.title}</strong><br />工作人员将在24小时内致电确认
            </div>
            <div className="w-full px-4 py-4 rounded-2xl" style={{ background: '#F6FFED', border: '1px solid #B7EB8F' }}>
              <div style={{ fontSize: 14, color: '#389E0D' }}>
                <CheckCircleOutlined style={{ marginRight: 6 }} />报名记录已同步到"我的" → "我的活动"
              </div>
            </div>
            <button onClick={() => { setShowSuccess(false); onBack(); }} className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
              style={{ height: 52, background: BISAI_ORANGE, fontSize: 16 }}>
              返回赛事列表
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Partner Join Screen (成为服务商)
// ─────────────────────────────────────────────
const PartnerJoinScreen: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', idCard: '', serviceType: '', address: '', experience: '', intro: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const SERVICE_TYPES = ['助餐服务', '助浴服务', '助洁服务', '助医服务', '助急服务', '助行服务', '养老社区', '聚会中心', '其他服务'];

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    if (!formData.name.trim()) errors.name = '请输入您的姓名';
    if (!formData.phone.trim()) errors.phone = '请输入手机号码';
    else if (!/^1[3-9]\d{9}$/.test(formData.phone)) errors.phone = '请输入正确的手机号码';
    if (!formData.idCard.trim()) errors.idCard = '请输入身份证号';
    else if (!/^\d{17}[\dXx]$/.test(formData.idCard)) errors.idCard = '请输入正确的身份证号';
    if (!formData.serviceType) errors.serviceType = '请选择服务类型';
    if (!formData.address.trim()) errors.address = '请输入服务地址';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setShowForm(false);
    setShowSuccess(true);
  };

  return (
    <div className="flex flex-col flex-1" style={{ background: '#F5F5F5', position: 'relative', minHeight: 0 }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative', zIndex: 1 }}>
        <button onClick={onBack} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, color: '#1A1A1A', pointerEvents: 'none' }}>成为服务商</span>
      </div>

      {/* Content */}
      <div className="overflow-y-auto flex-1" style={{ paddingBottom: 100 }}>
        {/* Hero Banner */}
        <div style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF9A56 50%, #FFB380 100%)', padding: '32px 20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ position: 'absolute', bottom: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div className="relative z-10">
            <div style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 8, lineHeight: 1.3 }}>成为益寿服务商</div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.92)', lineHeight: 1.7, marginBottom: 16 }}>发挥您的专长，服务更多中老年朋友<br />开启事业新篇章</div>
            <div className="flex gap-2 flex-wrap">
              {['政府背书', '稳定客源', '专业培训'].map(t => (
                <span key={t} style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: '4px 12px', fontSize: 13, color: 'white' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mx-4 mt-5">
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>为什么选择成为服务商</div>
          <div className="flex flex-col gap-3">
            {[
              { icon: '🎯', title: '专属服务区域', desc: '系统智能分配周边客户，省去奔波烦恼' },
              { icon: '📈', title: '稳定收入来源', desc: '订单持续稳定增长，月收入可达8000+' },
              { icon: '🛡️', title: '政府合规背书', desc: '平台资质认证，让服务更有保障' },
              { icon: '📚', title: '专业技能培训', desc: '免费参加平台培训，提升服务水平' },
              { icon: '🤝', title: '社区归属感', desc: '加入服务商社群，互帮互助共同成长' },
              { icon: '💰', title: '灵活结算周期', desc: '收入按周结算，资金周转无压力' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: PRIMARY_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', marginBottom: 3 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="mx-4 mt-5">
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>入驻要求</div>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
            {[
              '具备相关服务经验或资质证书',
              '有固定服务场所或交通工具',
              '无违法犯罪记录，品行良好',
              '认同平台理念，愿意服务中老年群体',
            ].map((req, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4" style={{ borderBottom: idx < 3 ? '1px solid #F5F5F5' : 'none' }}>
                <CheckCircleOutlined style={{ fontSize: 18, color: PRIMARY, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#333' }}>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-4 mt-5 mb-6">
          <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)', padding: '24px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 8 }}>准备好了吗？</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>立即申请成为益寿服务商，开启事业新篇章</div>
            <button onClick={() => setShowForm(true)}
              className="w-full rounded-xl border-0 cursor-pointer font-bold active:scale-95 transition-transform"
              style={{ height: 52, background: 'white', color: PRIMARY, fontSize: 16 }}>
              立即加入
            </button>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }} onClick={() => setShowForm(false)}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '80vh' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ width: 40, height: 4, background: '#E0E0E0', borderRadius: 2, margin: '0 auto 12px' }} />
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>服务商申请</div>
              <div style={{ fontSize: 13, color: '#888', textAlign: 'center', marginTop: 4 }}>请填写真实信息，工作人员将尽快与您联系</div>
            </div>
            <div className="overflow-y-auto" style={{ flex: 1, padding: '16px 20px 20px' }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>姓名 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input type="text" placeholder="请输入您的姓名" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.name ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
                {formErrors.name && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.name}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>手机号码 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input type="tel" placeholder="请输入手机号码" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.phone ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
                {formErrors.phone && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.phone}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>身份证号 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input type="text" placeholder="请输入身份证号码" value={formData.idCard} onChange={(e) => setFormData({...formData, idCard: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.idCard ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
                {formErrors.idCard && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.idCard}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>服务类型 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <select value={formData.serviceType} onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.serviceType ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box', background: 'white' }}>
                  <option value="">请选择服务类型</option>
                  {SERVICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {formErrors.serviceType && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.serviceType}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>服务地址 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input type="text" placeholder="请输入详细地址" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.address ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
                {formErrors.address && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.address}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>服务经验（选填）</div>
                <input type="text" placeholder="如：从事家政服务5年" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>自我介绍（选填）</div>
                <textarea placeholder="简单介绍一下自己或您的服务优势" value={formData.intro} onChange={(e) => setFormData({...formData, intro: e.target.value})}
                  rows={3} style={{ width: '100%', borderRadius: 12, border: '1px solid #E8E8E8', padding: '12px 14px', fontSize: 15, outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
              </div>
            </div>
            <div className="flex gap-3 px-4 pb-6 pt-2" style={{ borderTop: '1px solid #F0F0F0', paddingTop: 12 }}>
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border-0 cursor-pointer font-bold" style={{ height: 48, background: '#F5F5F5', color: '#666', fontSize: 16 }}>取消</button>
              <button onClick={handleSubmit} className="flex-1 rounded-xl text-white font-bold border-0 cursor-pointer" style={{ height: 48, background: PRIMARY, fontSize: 16 }}>提交申请</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col items-center gap-4 p-6" style={{ paddingBottom: 48 }}>
            <CheckCircleFilled style={{ fontSize: 72, color: '#52C41A' }} />
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A' }}>申请已提交！</div>
            <div style={{ fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 1.8 }}>
              您的服务商申请已提交<br />工作人员将在3个工作日内联系您
            </div>
            <div className="w-full px-4 py-4 rounded-2xl" style={{ background: '#F6FFED', border: '1px solid #B7EB8F' }}>
              <div style={{ fontSize: 14, color: '#389E0D' }}>
                <CheckCircleOutlined style={{ marginRight: 6 }} />申请记录可在"我的"页面查看
              </div>
            </div>
            <button onClick={() => { setShowSuccess(false); onBack(); }} className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
              style={{ height: 52, background: PRIMARY, fontSize: 16 }}>
              返回上一页
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Influencer Join Screen (成为达人)
// ─────────────────────────────────────────────
const InfluencerJoinScreen: React.FC<{
  onBack: () => void;
}> = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', idCard: '', specialty: '', platforms: '', followers: '', intro: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const SPECIALTIES = ['养生保健', '健康饮食', '兴趣爱好', '才艺展示', '生活技巧', '其他特长'];
  const PLATFORMS = ['抖音', '快手', '微信视频号', '小红书', '其他平台'];

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    if (!formData.name.trim()) errors.name = '请输入您的姓名';
    if (!formData.phone.trim()) errors.phone = '请输入手机号码';
    else if (!/^1[3-9]\d{9}$/.test(formData.phone)) errors.phone = '请输入正确的手机号码';
    if (!formData.idCard.trim()) errors.idCard = '请输入身份证号';
    else if (!/^\d{17}[\dXx]$/.test(formData.idCard)) errors.idCard = '请输入正确的身份证号';
    if (!formData.specialty) errors.specialty = '请选择您的专长领域';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setShowForm(false);
    setShowSuccess(true);
  };

  return (
    <div className="flex flex-col flex-1" style={{ background: '#F5F5F5', position: 'relative', minHeight: 0 }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative', zIndex: 1 }}>
        <button onClick={onBack} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, color: '#1A1A1A', pointerEvents: 'none' }}>成为达人</span>
      </div>

      {/* Content */}
      <div className="overflow-y-auto flex-1" style={{ paddingBottom: 100 }}>
        {/* Hero Banner */}
        <div style={{ background: 'linear-gradient(135deg, #722ED1 0%, #9254DE 50%, #B37FEB 100%)', padding: '32px 20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ position: 'absolute', bottom: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div className="relative z-10">
            <div style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 8, lineHeight: 1.3 }}>成为益寿达人</div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.92)', lineHeight: 1.7, marginBottom: 16 }}>一人公司新模式，内容创作赢收益<br />开启达人事业新篇章</div>
            <div className="flex gap-2 flex-wrap">
              {['内容变现', '一人公司', '专属扶持'].map(t => (
                <span key={t} style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: '4px 12px', fontSize: 13, color: 'white' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* What is Influencer Section */}
        <div className="mx-4 mt-5">
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>什么是益寿达人？</div>
          <div className="rounded-2xl p-4" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
            <div style={{ fontSize: 14, color: '#666', lineHeight: 1.9, marginBottom: 12 }}>
              益寿达人是一种创新的一人公司模式（类似OPC），您将成为益寿平台的认证内容创作者，以独立达人的身份在平台上创作、分享和变现。
            </div>
            <div style={{ fontSize: 14, color: '#666', lineHeight: 1.9 }}>
              作为达人，您可以创作中老年生活相关的优质内容（如养生知识、健康食谱、兴趣爱好等），通过内容获得收益分成，并享受平台提供的专属培训和扶持政策。
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mx-4 mt-5">
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>达人专属权益</div>
          <div className="flex flex-col gap-3">
            {[
              { icon: '💰', title: '内容变现收益', desc: '作品播放量越高，收益分成越多，月入可达5000+' },
              { icon: '🏆', title: '官方认证标识', desc: '获得平台达人认证，提升个人品牌影响力' },
              { icon: '📱', title: '专属流量扶持', desc: '新人期获得平台流量倾斜，快速积累粉丝' },
              { icon: '🎓', title: '创作培训支持', desc: '免费参加创作培训，学习短视频制作技巧' },
              { icon: '🤝', title: '一人公司模式', desc: '自主创作灵活安排，类似OPC合规经营' },
              { icon: '🎁', title: '丰富活动权益', desc: '优先参与平台活动，有机会获得现金奖励' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: '#F9F0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', marginBottom: 3 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="mx-4 mt-5">
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>入驻条件</div>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
            {[
              '热爱内容创作',
              '有一部智能手机，会使用短视频APP',
              '擅长或对某个领域有独到见解',
              '愿意分享、乐于与中老年朋友交流',
              '认同平台理念，遵守社区规范',
            ].map((req, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4" style={{ borderBottom: idx < 4 ? '1px solid #F5F5F5' : 'none' }}>
                <CheckCircleOutlined style={{ fontSize: 18, color: '#722ED1', flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#333' }}>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-4 mt-5 mb-6">
          <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #722ED1 0%, #9254DE 100%)', padding: '24px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 8 }}>准备好展示自己了吗？</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>立即申请成为益寿达人，开启内容创业之路</div>
            <button onClick={() => setShowForm(true)}
              className="w-full rounded-xl border-0 cursor-pointer font-bold active:scale-95 transition-transform"
              style={{ height: 52, background: 'white', color: '#722ED1', fontSize: 16 }}>
              立即加入
            </button>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }} onClick={() => setShowForm(false)}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '80vh' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ width: 40, height: 4, background: '#E0E0E0', borderRadius: 2, margin: '0 auto 12px' }} />
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>达人申请</div>
              <div style={{ fontSize: 13, color: '#888', textAlign: 'center', marginTop: 4 }}>请填写真实信息，工作人员将尽快与您联系</div>
            </div>
            <div className="overflow-y-auto" style={{ flex: 1, padding: '16px 20px 20px' }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>姓名 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input type="text" placeholder="请输入您的姓名" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.name ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
                {formErrors.name && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.name}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>手机号码 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input type="tel" placeholder="请输入手机号码" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.phone ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
                {formErrors.phone && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.phone}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>身份证号 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <input type="text" placeholder="请输入身份证号码" value={formData.idCard} onChange={(e) => setFormData({...formData, idCard: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.idCard ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box' }} />
                {formErrors.idCard && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.idCard}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>专长领域 <span style={{ color: '#FF4D4F' }}>*</span></div>
                <select value={formData.specialty} onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: formErrors.specialty ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box', background: 'white' }}>
                  <option value="">请选择您的专长领域</option>
                  {SPECIALTIES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {formErrors.specialty && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{formErrors.specialty}</div>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>常用平台（选填）</div>
                <select value={formData.platforms} onChange={(e) => setFormData({...formData, platforms: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box', background: 'white' }}>
                  <option value="">请选择常用平台</option>
                  {PLATFORMS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>粉丝数量（选填）</div>
                <select value={formData.followers} onChange={(e) => setFormData({...formData, followers: e.target.value})}
                  style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #E8E8E8', padding: '0 14px', fontSize: 15, outline: 'none', boxSizing: 'border-box', background: 'white' }}>
                  <option value="">请选择粉丝数量</option>
                  <option value="0-1000">0-1000</option>
                  <option value="1000-5000">1000-5000</option>
                  <option value="5000-10000">5000-10000</option>
                  <option value="10000+">10000+</option>
                </select>
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 14, color: '#333', marginBottom: 6, fontWeight: 500 }}>自我介绍（选填）</div>
                <textarea placeholder="简单介绍一下自己或您的创作方向" value={formData.intro} onChange={(e) => setFormData({...formData, intro: e.target.value})}
                  rows={3} style={{ width: '100%', borderRadius: 12, border: '1px solid #E8E8E8', padding: '12px 14px', fontSize: 15, outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
              </div>
            </div>
            <div className="flex gap-3 px-4 pb-6 pt-2" style={{ borderTop: '1px solid #F0F0F0', paddingTop: 12 }}>
              <button onClick={() => setShowForm(false)} className="flex-1 rounded-xl border-0 cursor-pointer font-bold" style={{ height: 48, background: '#F5F5F5', color: '#666', fontSize: 16 }}>取消</button>
              <button onClick={handleSubmit} className="flex-1 rounded-xl text-white font-bold border-0 cursor-pointer" style={{ height: 48, background: '#722ED1', fontSize: 16 }}>提交申请</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }}>
          <div className="w-full bg-white rounded-t-3xl flex flex-col items-center gap-4 p-6" style={{ paddingBottom: 48 }}>
            <CheckCircleFilled style={{ fontSize: 72, color: '#52C41A' }} />
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A' }}>申请已提交！</div>
            <div style={{ fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 1.8 }}>
              您的达人申请已提交<br />工作人员将在3个工作日内联系您
            </div>
            <div className="w-full px-4 py-4 rounded-2xl" style={{ background: '#F6FFED', border: '1px solid #B7EB8F' }}>
              <div style={{ fontSize: 14, color: '#389E0D' }}>
                <CheckCircleOutlined style={{ marginRight: 6 }} />申请记录可在"我的"页面查看
              </div>
            </div>
            <button onClick={() => { setShowSuccess(false); onBack(); }} className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
              style={{ height: 52, background: '#722ED1', fontSize: 16 }}>
              返回上一页
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const TAB_TITLES: {[key in TabId]: string} = { yishou: '益寿', bayu: '巴渝', messages: '消息', profile: '我的' };

const MedicationHomeScreen: React.FC<{
  onBack: () => void; medications: Medication[]; medRecords: DailyMedicationRecord[];
  onSetMedications: (m: Medication[]) => void; onSetRecords: (r: DailyMedicationRecord[]) => void;
  onOpenAdd: () => void; onOpenCalendar: () => void; onOpenDetail: (m: Medication) => void;
}> = ({ onBack, medications: meds, medRecords: recs, onSetRecords, onOpenAdd, onOpenCalendar, onOpenDetail }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayRecord = React.useMemo(() => recs.find(r => r.date === today), [recs, today]);
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  let taken = 0, pending = 0, missed = 0;
  if (todayRecord) {
    for (const m of todayRecord.medications || []) {
      const [hh, mm] = (m.time || '00:00').split(':').map(Number);
      const medMin = hh * 60 + mm;
      if (m.status === 'pending' && currentMinutes > medMin + 30) missed++;
      else if (m.status === 'pending') pending++;
      else if (m.status === 'taken') taken++;
      else missed++;
    }
  }
  const total = taken + pending + missed;
  const rate = total > 0 ? Math.round((taken / total) * 100) : 0;

  const handleMarkTaken = React.useCallback((time: string, medId: number) => {
    onSetRecords(recs.map(r => r.date !== today ? r : { ...r, medications: (r.medications || []).map(m =>
      m.medicationId === medId && m.time === time && m.status === 'pending'
        ? { ...m, status: 'taken' as const, takenAt: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) } : m
    ) }));
  }, [recs, today, onSetRecords]);

  const getPeriod = (t: string) => { const h = parseInt((t || '00').split(':')[0]); if (h < 6) return '凌晨'; if (h < 9) return '早晨'; if (h < 12) return '上午'; if (h < 14) return '中午'; if (h < 18) return '下午'; if (h < 21) return '傍晚'; return '睡前'; };

  const cards: { time: string; med: Medication; period: string; status: string }[] = [];
  if (meds) {
    for (const med of meds) {
      if (med && med.times) {
        for (const time of med.times) {
          const record = todayRecord?.medications?.find(m => m.medicationId === med.id && m.time === time);
          const [hh, mm] = (time || '00:00').split(':').map(Number);
          const medMin = hh * 60 + mm;
          let status = 'pending';
          if (record?.status === 'taken') status = 'taken';
          else if (currentMinutes > medMin + 30) status = 'missed';
          cards.push({ med, time, period: getPeriod(time), status });
        }
      }
    }
  }
  cards.sort((a, b) => parseInt(a.time.split(':')[0]) * 60 + parseInt(a.time.split(':')[1]) - parseInt(b.time.split(':')[0]) * 60 + parseInt(b.time.split(':')[1]));

  const periods = ['早晨', '上午', '中午', '下午', '傍晚', '睡前'];

  const renderCards = () => {
    if (cards.length === 0) {
      return <div style={{ textAlign: 'center', padding: '40px 20px', color: '#999' }}>
        <ClockCircleOutlined style={{ fontSize: 48, color: '#B9D8FF', marginBottom: 12 }} />
        <div style={{ fontSize: 15, marginBottom: 6 }}>还没有定时用药</div>
        <div style={{ fontSize: 13 }}>点击右上角 "+" 添加你的第一种药品</div>
      </div>;
    }
    return periods.map(period => {
      const periodCards = cards.filter(c => c.period === period);
      if (periodCards.length === 0) return null;
      return <div key={period}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 6, paddingLeft: 4 }}>{period}</div>
        {periodCards.map((card, idx) => {
          const med = card.med;
          return <div key={idx} style={{ borderRadius: 14, background: 'white', padding: '12px 14px', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: card.status === 'taken' ? '#F6FFED' : card.status === 'missed' ? '#FFF2F0' : '#F0F5FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {card.status === 'taken' ? <CheckOutlined style={{ fontSize: 14, color: '#52C41A' }} /> :
                 card.status === 'missed' ? <CloseOutlined style={{ fontSize: 14, color: '#FF4D4F' }} /> :
                 <span style={{ width: 8, height: 8, borderRadius: 4, background: '#1677FF' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#888' }}>{card.time}</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{med.name}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                  <span style={{ fontSize: 12, color: '#666' }}>{med.dosage}{med.dosageUnit}/次</span>
                  <span style={{ fontSize: 12, color: '#1677FF', background: '#E6F4FF', borderRadius: 8, padding: '0 6px' }}>{MED_TIMING_LABELS[med.timing]}</span>
                </div>
              </div>
              <div>{card.status === 'pending' ? (
                <button onClick={() => handleMarkTaken(card.time, med.id)} className="border-0 cursor-pointer active:scale-95"
                  style={{ height: 32, padding: '0 12px', borderRadius: 16, background: '#1677FF', color: 'white', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>标记已服</button>
              ) : card.status === 'taken' ? (
                <div style={{ fontSize: 12, color: '#52C41A', fontWeight: 600 }}>已服 ✓</div>
              ) : (
                <div style={{ fontSize: 12, color: '#FF4D4F', fontWeight: 600 }}>漏服</div>
              )}</div>
            </div>
          </div>;
        })}
      </div>;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, background: '#F5F4F0', minHeight: 0 }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', background: 'white', height: 54, borderBottom: '1px solid #F0F0F0' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, border: 'none', background: 'transparent', cursor: 'pointer', padding: 4 }}>
          <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
        </button>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>用药提醒</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button onClick={onOpenCalendar} style={{ width: 36, height: 36, borderRadius: 12, border: 'none', background: '#F5F5F5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarOutlined style={{ fontSize: 18, color: '#1677FF' }} />
          </button>
          <button onClick={onOpenAdd} style={{ width: 36, height: 36, borderRadius: 12, border: 'none', background: '#E6F4FF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PlusOutlined style={{ fontSize: 18, color: '#1677FF' }} />
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        <div style={{ borderRadius: 16, background: 'linear-gradient(135deg, #1677FF 0%, #4096FF 100%)', padding: '16px 20px', color: 'white', marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>今日用药</div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            <div style={{ flex: 1, textAlign: 'center' }}><div style={{ fontSize: 24, fontWeight: 800 }}>{taken}</div><div style={{ fontSize: 12, opacity: 0.85 }}>已服</div></div>
            <div style={{ flex: 1, textAlign: 'center' }}><div style={{ fontSize: 24, fontWeight: 800 }}>{pending}</div><div style={{ fontSize: 12, opacity: 0.85 }}>待服</div></div>
            <div style={{ flex: 1, textAlign: 'center' }}><div style={{ fontSize: 24, fontWeight: 800, color: missed > 0 ? '#FFD666' : 'white' }}>{missed}</div><div style={{ fontSize: 12, opacity: 0.85 }}>漏服</div></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.3)', overflow: 'hidden' }}>
              <div style={{ width: rate + '%', height: '100%', borderRadius: 4, background: rate > 80 ? '#95DE64' : '#FFD666' }} />
            </div>
            <span style={{ fontSize: 12 }}>依从率 {rate}%</span>
          </div>
        </div>
        {renderCards()}
      </div>
    </div>
  );
};
// ── MEDICATION ADD SCREEN ──
const MedicationAddScreen: React.FC<{
  onBack: () => void; medications: Medication[]; onSave: (m: Medication) => void;
  editMedication?: Medication; onDelete?: (id: number) => void;
}> = ({ onBack, medications, onSave, editMedication, onDelete }) => {
  const [name, setName] = React.useState(editMedication?.name || "");
  const [dosage, setDosage] = React.useState(editMedication?.dosage || "1");
  const [dosageUnit, setDosageUnit] = React.useState(editMedication?.dosageUnit || "片");
  const [times, setTimes] = React.useState<string[]>(editMedication?.times || ["08:00"]);
  const [timing, setTiming] = React.useState(editMedication?.timing || "post-meal");
  const [frequency, setFrequency] = React.useState(editMedication?.frequency || "daily");
  const [daysOfWeek, setDaysOfWeek] = React.useState<number[]>(editMedication?.daysOfWeek || [1,2,3,4,5,6,7]);
  const [note, setNote] = React.useState(editMedication?.note || "");
  const [familyShared, setFamilyShared] = React.useState(editMedication?.familyShared ?? true);
  const [voiceReminder, setVoiceReminder] = React.useState(editMedication?.voiceReminder ?? true);
  const [showUnitPicker, setShowUnitPicker] = React.useState(false);
  const isValid = name.trim().length > 0 && times.length > 0;
  const colors = ["#1677FF","#52C41A","#FA8C16","#EB2F96","#722ED1","#13C2C2","#FF6B35"];
  const dayLabels = ["一", "二", "三", "四", "五", "六", "日"];

  const handleSave = () => {
    if (!isValid) return;
    const med: Medication = {
      id: editMedication?.id || Math.max(...medications.map(m => m.id), 0) + 1,
      name: name.trim(), dosage, dosageUnit, times,
      timing: timing as Medication["timing"], note: note.trim() || undefined,
      frequency: frequency as Medication["frequency"],
      daysOfWeek: frequency === "weekly" ? daysOfWeek : undefined,
      color: colors[medications.length % 7],
      createdAt: editMedication?.createdAt || new Date().toISOString().split("T")[0],
      familyShared, voiceReminder,
    };
    onSave(med);
  };

  const addTime = () => setTimes(prev => [...prev, "12:00"]);
  const removeTime = (idx: number) => setTimes(prev => prev.filter((_, i) => i !== idx));
  const updateTime = (idx: number, val: string) => setTimes(prev => prev.map((t, i) => i === idx ? val : t));
  const toggleDay = (d: number) => setDaysOfWeek(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d].sort());

  return (
    <div className="flex flex-col flex-1" style={{ background: "#F5F4F0", minHeight: 0 }}>
      <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ position: "relative", background: "white", height: 54, borderBottom: "1px solid #F0F0F0" }}>
        <button onClick={onBack} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: "#1A1A1A" }} />
        </button>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#1A1A1A" }}>{editMedication ? "编辑药品" : "添加药品"}</span>
        </div>
        <button onClick={handleSave} disabled={!isValid}
          className="border-0 cursor-pointer active:scale-95 ml-auto"
          style={{ height: 32, padding: "0 14px", borderRadius: 16, background: isValid ? "#1677FF" : "#D9D9D9", color: "white", fontSize: 13, fontWeight: 600 }}>保存</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ borderRadius: 14, background: "white", padding: 14 }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>药品名称</div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="输入药品名称" className="w-full outline-none" style={{ fontSize: 16, border: "none", background: "transparent" }} />
        </div>
        <div style={{ borderRadius: 14, background: "white", padding: 14 }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>每次用量</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={dosage} onChange={e => setDosage(e.target.value.replace(/[^0-9.]/g, ""))} className="w-20 outline-none text-center" style={{ fontSize: 16, border: "1px solid #E8E8E8", borderRadius: 10, padding: "8px 0" }} />
            <div className="relative">
              <button onClick={() => setShowUnitPicker(!showUnitPicker)} className="border-0 cursor-pointer" style={{ height: "100%", padding: "0 14px", borderRadius: 10, border: "1px solid #E8E8E8", background: "white", fontSize: 14 }}>
                {dosageUnit} ▼
              </button>
              {showUnitPicker && (
                <div style={{ position: "absolute", top: "100%", left: 0, background: "white", borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 10, minWidth: 80, marginTop: 4 }}>
                  {DOSAGE_UNITS.map(u => (
                    <div key={u} onClick={() => { setDosageUnit(u); setShowUnitPicker(false); }}
                      style={{ padding: "8px 14px", fontSize: 14, cursor: "pointer", background: dosageUnit === u ? "#E6F4FF" : "transparent" }}>{u}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{ borderRadius: 14, background: "white", padding: 14 }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>服用时间</div>
          {times.map((t, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <input value={t} onChange={e => updateTime(idx, e.target.value)} type="time"
                className="flex-1 outline-none" style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #E8E8E8", fontSize: 15 }} />
              {times.length > 1 && (
                <button onClick={() => removeTime(idx)} className="border-0 cursor-pointer p-2"><CloseOutlined style={{ fontSize: 14, color: "#FF4D4F" }} /></button>
              )}
            </div>
          ))}
          <button onClick={addTime} className="border-0 cursor-pointer active:scale-95"
            style={{ width: "100%", padding: "10px", borderRadius: 10, border: "1px dashed #1677FF", background: "#F0F5FF", color: "#1677FF", fontSize: 13 }}>+ 添加时间</button>
        </div>
        <div style={{ borderRadius: 14, background: "white", padding: 14 }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>服用方式</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {MED_TIMING_OPTIONS.map(t => (
              <button key={t} onClick={() => setTiming(t)}
                className="border-0 cursor-pointer active:scale-95"
                style={{ padding: "6px 14px", borderRadius: 16, fontSize: 13, fontWeight: timing === t ? 600 : 400, background: timing === t ? "#1677FF" : "#F5F5F5", color: timing === t ? "white" : "#666" }}>
                {MED_TIMING_LABELS[t]}
              </button>
            ))}
          </div>
        </div>
        <div style={{ borderRadius: 14, background: "white", padding: 14 }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>服药频率</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[{v:"daily",l:"每日"},{v:"weekly",l:"每周"},{v:"as-needed",l:"按需"}].map(f => (
              <button key={f.v} onClick={() => setFrequency(f.v)}
                className="flex-1 border-0 cursor-pointer active:scale-95"
                style={{ padding: "8px 0", borderRadius: 10, fontSize: 13, fontWeight: frequency === f.v ? 600 : 400, background: frequency === f.v ? "#1677FF" : "#F5F5F5", color: frequency === f.v ? "white" : "#666" }}>{f.l}</button>
            ))}
          </div>
          {frequency === "weekly" && (
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              {dayLabels.map((l, i) => (
                <button key={i} onClick={() => toggleDay(i+1)}
                  className="border-0 cursor-pointer active:scale-95"
                  style={{ width: 36, height: 36, borderRadius: 18, fontSize: 13, fontWeight: daysOfWeek.includes(i+1) ? 600 : 400, background: daysOfWeek.includes(i+1) ? "#1677FF" : "#F5F5F5", color: daysOfWeek.includes(i+1) ? "white" : "#666" }}>{l}</button>
              ))}
            </div>
          )}
        </div>
        <div style={{ borderRadius: 14, background: "white", padding: 14 }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>备注</div>
          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="服药注意事项（选填）" className="w-full outline-none resize-none" rows={2} style={{ fontSize: 15, border: "none", background: "transparent" }} />
        </div>
        <div style={{ borderRadius: 14, background: "white", padding: 14 }}>
          {[{k:"familyShared",l:"家庭共享",desc:"家庭成员可查看服药记录"},{k:"voiceReminder",l:"语音提醒",desc:"到时间语音播报药品名称"}].map(s => (
            <div key={s.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
              <div><div style={{ fontSize: 14, fontWeight: 500 }}>{s.l}</div><div style={{ fontSize: 12, color: "#999" }}>{s.desc}</div></div>
              <div onClick={() => { if (s.k === "familyShared") setFamilyShared(!familyShared); if (s.k === "voiceReminder") setVoiceReminder(!voiceReminder); }}
                style={{ width: 44, height: 24, borderRadius: 12, background: (s.k === "familyShared" ? familyShared : voiceReminder) ? "#1677FF" : "#D9D9D9", position: "relative", cursor: "pointer" }}>
                <div style={{ width: 20, height: 20, borderRadius: 10, background: "white", position: "absolute", top: 2, left: (s.k === "familyShared" ? familyShared : voiceReminder) ? 22 : 2 }} />
              </div>
            </div>
          ))}
        </div>
        {editMedication && onDelete && (
          <button onClick={() => onDelete(editMedication.id)}
            className="w-full border-0 cursor-pointer active:scale-95"
            style={{ padding: 12, borderRadius: 14, background: "#FFF2F0", color: "#FF4D4F", fontSize: 14, fontWeight: 600 }}>删除药品</button>
        )}
      </div>
    </div>
  );
};

// ── MEDICATION CALENDAR SCREEN ──
const MedicationCalendarScreen: React.FC<{
  onBack: () => void; medRecords: DailyMedicationRecord[]; medications: Medication[];
}> = ({ onBack, medRecords, medications }) => {
  const today = new Date();
  const [year, setYear] = React.useState(today.getFullYear());
  const [month, setMonth] = React.useState(today.getMonth() + 1);
  const [selectedDate, setSelectedDate] = React.useState(today.toISOString().split("T")[0]);

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
    const d = new Date(year, month - 1, i + 1);
    return d.toISOString().split("T")[0];
  });

  const getDayRate = (dateStr: string) => {
    const rec = medRecords.find(r => r.date === dateStr);
    if (!rec || rec.medications.length === 0) return -1;
    return Math.round(rec.medications.filter(m => m.status === "taken").length / rec.medications.length * 100);
  };

  const selectedRecord = medRecords.find(r => r.date === selectedDate);
  const monthMeds = medRecords.filter(r => r.date.startsWith(year + "-" + String(month).padStart(2,"0")));
  const monthTotal = monthMeds.flatMap(r => r.medications);
  const monthRate = monthTotal.length > 0 ? Math.round(monthTotal.filter(m => m.status === "taken").length / monthTotal.length * 100) : 0;

  const prevMonth = () => { if (month === 1) { setYear(y => y-1); setMonth(12); } else setMonth(m => m-1); };
  const nextMonth = () => { if (month === 12) { setYear(y => y+1); setMonth(1); } else setMonth(m => m+1); };

  return (
    <div className="flex flex-col flex-1" style={{ background: "#F5F4F0", minHeight: 0 }}>
      <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ position: "relative", background: "white", height: 54, borderBottom: "1px solid #F0F0F0" }}>
        <button onClick={onBack} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: "#1A1A1A" }} />
        </button>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#1A1A1A" }}>服药日历</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ borderRadius: 14, background: "white", padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <button onClick={prevMonth} className="border-0 cursor-pointer p-1"><LeftOutlined style={{ fontSize: 16, color: "#666" }} /></button>
            <span style={{ fontSize: 16, fontWeight: 700 }}>{year}年{month}月</span>
            <button onClick={nextMonth} className="border-0 cursor-pointer p-1"><RightOutlined style={{ fontSize: 16, color: "#666" }} /></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>
            {["日","一","二","三","四","五","六"].map(l => <div key={l} style={{ textAlign: "center", fontSize: 11, color: "#999", padding: "4px 0" }}>{l}</div>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={"e"+i} />)}
            {monthDays.map(ds => {
              const rate = getDayRate(ds);
              const isToday = ds === today.toISOString().split("T")[0];
              const isSel = ds === selectedDate;
              return (
                <button key={ds} onClick={() => setSelectedDate(ds)}
                  className="border-0 cursor-pointer active:scale-95"
                  style={{ aspectRatio: "1", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1,
                    background: isSel ? "#1677FF" : isToday ? "#E6F4FF" : "transparent",
                    color: isSel ? "white" : isToday ? "#1677FF" : "#1A1A1A", fontWeight: isToday ? 700 : 400 }}>
                  <span style={{ fontSize: 14 }}>{ds.split("-")[2]}</span>
                  {rate >= 0 && <span style={{ width: 6, height: 6, borderRadius: 3, background: rate >= 80 ? "#52C41A" : rate >= 50 ? "#FAAD14" : "#FF4D4F" }} />}
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 12, padding: "8px 12px", borderRadius: 10, background: "#F0F5FF", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#666" }}>本月依从率</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: monthRate >= 80 ? "#52C41A" : monthRate >= 50 ? "#FA8C16" : "#FF4D4F" }}>{monthRate}%</span>
          </div>
        </div>
        {selectedRecord && selectedRecord.medications.length > 0 ? (
          <div style={{ borderRadius: 14, background: "white", padding: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{selectedDate} 服药记录</div>
            {selectedRecord.medications.map((m, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: idx < selectedRecord.medications.length - 1 ? "1px solid #F5F5F5" : "none" }}>
                <div style={{ width: 24, height: 24, borderRadius: 12, background: m.status === "taken" ? "#F6FFED" : m.status === "missed" ? "#FFF2F0" : "#F0F5FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {m.status === "taken" ? <CheckOutlined style={{ fontSize: 12, color: "#52C41A" }} /> :
                   m.status === "missed" ? <CloseOutlined style={{ fontSize: 12, color: "#FF4D4F" }} /> :
                   <span style={{ width: 6, height: 6, borderRadius: 3, background: "#1677FF" }} />}
                </div>
                <span style={{ flex: 1, fontSize: 14 }}>{m.medicationName}</span>
                <span style={{ fontSize: 12, color: "#888" }}>{m.time}</span>
                <span style={{ fontSize: 12, color: m.status === "taken" ? "#52C41A" : m.status === "missed" ? "#FF4D4F" : "#1677FF" }}>
                  {m.status === "taken" ? "已服" : m.status === "missed" ? "漏服" : "待服"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ borderRadius: 14, background: "white", padding: 20, textAlign: "center", color: "#999", fontSize: 13 }}>该日暂无服药记录</div>
        )}
      </div>
    </div>
  );
};

// ── MEDICATION DETAIL SCREEN ──
const MedicationDetailScreen: React.FC<{
  onBack: () => void; medication: Medication; medRecords: DailyMedicationRecord[];
  onEdit: (m: Medication) => void; onDelete: (id: number) => void;
}> = ({ onBack, medication, medRecords, onEdit, onDelete }) => {
  const today = new Date();
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today); d.setDate(d.getDate() - (6 - i));
    const ds = d.toISOString().split("T")[0];
    const dayRec = medRecords.find(r => r.date === ds);
    const medRecs = dayRec?.medications.filter(m => m.medicationId === medication.id) || [];
    const taken = medRecs.filter(m => m.status === "taken").length;
    const total = medRecs.length;
    return { date: ds, label: ["日","一","二","三","四","五","六"][d.getDay()], rate: total > 0 ? Math.round(taken / total * 100) : -1, taken, total };
  });
  const validDays = last7.filter(d => d.rate >= 0);
  const overallRate = validDays.length > 0 ? Math.round(validDays.reduce((s, d) => s + d.rate, 0) / validDays.length) : 0;

  return (
    <div className="flex flex-col flex-1" style={{ background: "#F5F4F0", minHeight: 0 }}>
      <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ position: "relative", background: "white", height: 54, borderBottom: "1px solid #F0F0F0" }}>
        <button onClick={onBack} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1">
          <ArrowLeftOutlined style={{ fontSize: 20, color: "#1A1A1A" }} />
        </button>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: "#1A1A1A" }}>{medication.name}</span>
        </div>
        <button onClick={() => onEdit(medication)} className="ml-auto border-0 cursor-pointer p-1">
          <EditOutlined style={{ fontSize: 18, color: "#666" }} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ borderRadius: 14, background: "white", padding: 16 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: (medication.color || "#1677FF") + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MedicineBoxOutlined style={{ fontSize: 24, color: medication.color || "#1677FF" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 700 }}>{medication.name}</div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>{medication.dosage}{medication.dosageUnit}/次 {"\u00B7"} {MED_TIMING_LABELS[medication.timing]}</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: overallRate >= 80 ? "#52C41A" : overallRate >= 50 ? "#FA8C16" : "#FF4D4F" }}>{overallRate}%</div>
          </div>
          <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 10, background: "#F5F5F5", display: "flex", flexWrap: "wrap", gap: 6 }}>
            {medication.times.map((t, i) => (
              <span key={i} style={{ fontSize: 13, background: "#E6F4FF", color: "#1677FF", borderRadius: 12, padding: "2px 10px" }}>{t}</span>
            ))}
            <span style={{ fontSize: 13, color: "#888" }}>每日{medication.times.length}次</span>
          </div>
        </div>
        <div style={{ borderRadius: 14, background: "white", padding: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>近7天依从率</div>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 80, paddingBottom: 20 }}>
            {last7.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                <span style={{ fontSize: 11, color: d.rate >= 80 ? "#52C41A" : d.rate >= 50 ? "#FA8C16" : d.rate >= 0 ? "#FF4D4F" : "#999", marginBottom: 4, fontWeight: 600 }}>
                  {d.rate >= 0 ? d.rate + "%" : "-"}
                </span>
                <div style={{ width: "100%", height: Math.max(d.rate >= 0 ? d.rate * 0.4 : 4, 4), borderRadius: "4px 4px 0 0",
                  background: d.rate >= 80 ? "#95DE64" : d.rate >= 50 ? "#FFD666" : d.rate >= 0 ? "#FFA39E" : "#F0F0F0" }} />
                <span style={{ fontSize: 10, color: "#999", marginTop: 4 }}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderRadius: 14, background: "white", padding: 14 }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>用药方案</div>
          <div style={{ fontSize: 14, lineHeight: 1.6 }}>
            <div>每日 {medication.times.length} 次 {"\u00B7"} {medication.dosage}{medication.dosageUnit}/次 {"\u00B7"} {MED_TIMING_LABELS[medication.timing]}</div>
            {medication.note && <div style={{ color: "#FF6B35", marginTop: 4 }}>提示：{medication.note}</div>}
          </div>
        </div>
        <div style={{ borderRadius: 14, background: "white", padding: 14 }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>提醒设置</div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 14 }}>
            <span>家庭共享</span><span style={{ color: medication.familyShared ? "#52C41A" : "#999" }}>{medication.familyShared ? "已开启" : "已关闭"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 14 }}>
            <span>语音提醒</span><span style={{ color: medication.voiceReminder ? "#52C41A" : "#999" }}>{medication.voiceReminder ? "已开启" : "已关闭"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


const Component: React.FC = () => {

// ─────────────────────────────────────────────
// ── MEDICATION HOME SCREEN ──
// ─────────────────────────────────────────────
  const [screen, setScreen] = useState<AppScreen>('login');
  const [loginMode, setLoginMode] = useState<LoginMode>('main');
  const [activeTab, setActiveTab] = useState<TabId>('bayu');
  const [userPoints, setUserPoints] = useState(1280); // 用户积分（提升至App级别，供积分商城使用）
  const [medications, setMedications] = useState<Medication[]>(MOCK_MEDICATIONS);
  const [medRecords, setMedRecords] = useState<DailyMedicationRecord[]>(MOCK_MED_RECORDS);
  const [editMedication, setEditMedication] = useState<Medication | undefined>(undefined);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [serviceFilter, setServiceFilter] = useState<FilterTab>('all');
  const [bookingTarget, setBookingTarget] = useState<Restaurant | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [activePost, setActivePost] = useState<FollowPost | null>(null);
  const [activeCommentPost, setActiveCommentPost] = useState<FollowPost | null>(null);
  const [activeVideoStartId, setActiveVideoStartId] = useState<number>(0);
  const [activeVideoPool, setActiveVideoPool] = useState<FollowPost[]>(VIDEO_POSTS);
  const [isVideoFromFavorites, setIsVideoFromFavorites] = useState(false);
  const [isVideoFromMyDynamics, setIsVideoFromMyDynamics] = useState(false);
  const [isVideoFromLikes, setIsVideoFromLikes] = useState(false);
  const [profileVideoStartId, setProfileVideoStartId] = useState<number>(0);
  const [isPostFromFavorites, setIsPostFromFavorites] = useState(false);
  const [isPostFromMyDynamics, setIsPostFromMyDynamics] = useState(false);
  const [favToastMsg, setFavToastMsg] = useState('');
  const [favToastVisible, setFavToastVisible] = useState(false);
  useEffect(() => { if (favToastVisible) setTimeout(() => setFavToastVisible(false), 2000); }, [favToastVisible]);
  const [activeCircle, setActiveCircle] = useState<CircleInfo | null>(null);
  const [activeCommunityCategoryId, setActiveCommunityCategoryId] = useState<string | null>(null);
  const [activeUserId, setActiveUserId] = useState<number | null>(null);
  const [activeFriendId, setActiveFriendId] = useState<number | null>(null);
  const [activeMyDetailId, setActiveMyDetailId] = useState<number | null>(null);
  const [navStack, setNavStack] = useState<AppScreen[]>([]);
  const [savedActiveTab, setSavedActiveTab] = useState<TabId>('bayu');
  const [yishouSubTab, setYishouSubTab] = useState<BayuSubTab>('plaza');
  const [savedYishouSubTab, setSavedYishouSubTab] = useState<BayuSubTab>('plaza');
  const [showShare, setShowShare] = useState(false);
  const [followedCircles, setFollowedCircles] = useState<string[]>(CIRCLES.map(c => c.name));
  const [showMsgPlusMenu, setShowMsgPlusMenu] = useState(false);
  const [mallReturnTab, setMallReturnTab] = useState<'home' | 'category' | 'cart' | 'mine' | null>(null);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
  const [staffBookingConfirmed, setStaffBookingConfirmed] = useState(false);
  const [selectedZhuyuInstId, setSelectedZhuyuInstId] = useState<number | null>(null);
  const [currentLocation, setCurrentLocation] = useState('渝中区');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showZhuyuBookingModal, setShowZhuyuBookingModal] = useState(false);
  const [zhuyuBookingInfo, setZhuyuBookingInfo] = useState({
    date: '',
    time: '',
    notes: '',
    address: '',
    genderPreference: '',
  });
  const [zhuyuBookingConfirmed, setZhuyuBookingConfirmed] = useState(false);
  const [showZhuyuMap, setShowZhuyuMap] = useState(false);
  const [zhuyuSelectedLocation, setZhuyuSelectedLocation] = useState<{lat: number; lng: number; name: string} | null>(null);
  const [zhuyuDetailedAddress, setZhuyuDetailedAddress] = useState('');
  const [selectedPackageId, setSelectedPackageId] = useState<number>(2);
  const [packageBookingConfirmed, setPackageBookingConfirmed] = useState(false);
  const [showZhujieBookingModal, setShowZhujieBookingModal] = useState(false);
  const [zhujieBookingTarget, setZhujieBookingTarget] = useState<CleanCompany | null>(null);
  const [zhujieBookingInfo, setZhujieBookingInfo] = useState({
    date: '',
    time: '',
    notes: '',
    address: '',
  });
  const [showZhujieMap, setShowZhujieMap] = useState(false);
  const [zhujieSelectedLocation, setZhujieSelectedLocation] = useState<{lat: number; lng: number; name: string} | null>(null);
  const [zhujieDetailedAddress, setZhujieDetailedAddress] = useState('');
  const [showZhuyiBookingModal, setShowZhuyiBookingModal] = useState(false);
  const [zhuyiBookingTarget, setZhuyiBookingTarget] = useState<ZhuyiCompany | null>(null);
  const [zhuyiBookingInfo, setZhuyiBookingInfo] = useState({
    date: '',
    time: '',
    notes: '',
    address: '',
  });
  const [showZhujuBookingModal, setShowZhujuBookingModal] = useState(false);
  const [zhujuBookingTarget, setZhujuBookingTarget] = useState<ZhujuCompany | null>(null);
  const [zhujuBookingInfo, setZhujuBookingInfo] = useState({
    date: '',
    time: '',
    notes: '',
    address: '',
  });
  const [showZhuxingBookingModal, setShowZhuxingBookingModal] = useState(false);
  const [zhuxingBookingTarget, setZhuxingBookingTarget] = useState<ZhuxingCompany | null>(null);
  const [zhuxingBookingInfo, setZhuxingBookingInfo] = useState({
    date: '',
    time: '',
    notes: '',
    address: '',
  });
  // 土货拼购相关状态
  const [pindanOrders, setPindanOrders] = useState<PindanOrder[]>([
    { id: 1, orderNo: 'PD20260609001', status: 'pending', totalAmount: 38, address: '渝中区解放碑街道98号', contact: '张阿姨', phone: '138****1234', products: [{ productId: 1, name: '农家土鸡蛋 30枚装', image: 'https://picsum.photos/seed/fresh_eggs/200/200', quantity: 1, price: 38 }], createdAt: '2026-06-09 10:30' },
    { id: 2, orderNo: 'PD20260608002', status: 'shipped', totalAmount: 78, address: '江北区观音桥街道88号', contact: '李叔叔', phone: '139****5678', products: [{ productId: 2, name: '深山土蜂蜜 500g', image: 'https://picsum.photos/seed/honey_jar/200/200', quantity: 1, price: 78 }], createdAt: '2026-06-08 14:20', paidAt: '2026-06-08 14:25', shippedAt: '2026-06-09 08:00' },
    { id: 3, orderNo: 'PD20260605003', status: 'completed', totalAmount: 35, address: '南岸区南坪街道128号', contact: '王奶奶', phone: '137****9012', products: [{ productId: 3, name: '农家腊肉 500g', image: 'https://picsum.photos/seed/dried_meat/200/200', quantity: 1, price: 35 }], createdAt: '2026-06-05 09:15', paidAt: '2026-06-05 09:20', shippedAt: '2026-06-06 10:00', completedAt: '2026-06-07 15:30' },
    { id: 4, orderNo: 'PD20260601004', status: 'cancelled', totalAmount: 28, address: '沙坪坝区小龙坎正街66号', contact: '赵阿姨', phone: '136****3456', products: [{ productId: 5, name: '腊肉粽子 10枚装', image: 'https://picsum.photos/seed/rice_balls/200/200', quantity: 1, price: 28 }], createdAt: '2026-06-01 16:45' },
  ]);
  const [pindanSelectedActivity, setPindanSelectedActivity] = useState<PindanActivity | null>(null);
  const [pindanSelectedProduct, setPindanSelectedProduct] = useState<PindanProduct | null>(null);
  const [pindanOrderQuantity, setPindanOrderQuantity] = useState(1);
  const [pindanOrderFilter, setPindanOrderFilter] = useState<'all' | 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'>('all');
  const [showPindanPay, setShowPindanPay] = useState(false);
  const [pindanPaySuccess, setPindanPaySuccess] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [welcomeModalShown, setWelcomeModalShown] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState<string>('medical');
  const [activityEnrolled, setActivityEnrolled] = useState<number[]>([]);
  const [activeActivity, setActiveActivity] = useState<LocalActivity | null>(null);
  const [activePointsGoods, setActivePointsGoods] = useState<PointsGoods | null>(null);
  const [showPointsRedeemSuccess, setShowPointsRedeemSuccess] = useState(false);
  const [redeemedGoods, setRedeemedGoods] = useState<PointsGoods | null>(null);
  const [mallInitialTab, setMallInitialTab] = useState<'home' | 'mine'>('home'); // 控制积分商城打开时的默认Tab
  const [selectedOrderRecord, setSelectedOrderRecord] = useState<PointsRecord | null>(null); // 当前查看的订单详情
  // 新增便民服务相关状态
  const [yanglaoFilter, setYanglaoFilter] = useState<'all' | 'nearby' | 'rating'>('all');
  const [ganchangTab, setGanchangTab] = useState<'today' | 'tomorrow' | 'calendar'>('today');
  const [juhuiFilter, setJuhuiFilter] = useState<'all' | 'teahouse' | 'meeting' | 'ktv'>('all');
  const [bisaiActiveCompetition, setBisaiActiveCompetition] = useState<CompetitionInfo | null>(null);
  // 康养游学预约相关状态
  const [liaoyangEnrollForm, setLiaoyangEnrollForm] = useState(false);
  const [liaoyangSelectedInst, setLiaoyangSelectedInst] = useState<CareInstitution | null>(null);
  const [liaoyangFormData, setLiaoyangFormData] = useState({ name: '', phone: '', visitDate: '', visitTime: '', personCount: '1', healthNote: '' });
  const [liaoyangFormErrors, setLiaoyangFormErrors] = useState<{[key: string]: string}>({});
  const [liaoyangEnrollSuccess, setLiaoyangEnrollSuccess] = useState(false);
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (screen === 'chat' && chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [screen, chatMessages]);

  // 首次进入益寿页面时弹出提醒
  useEffect(() => {
    if (screen === 'main' && activeTab === 'yishou' && !welcomeModalShown) {
      setShowWelcomeModal(true);
      setWelcomeModalShown(true);
    }
  }, [screen, activeTab]);

  const pushScreen = (next: AppScreen) => {
    if (screen === 'main') {
      setSavedActiveTab(activeTab);
    }
    setNavStack((prev: AppScreen[]) => [...prev, screen]);
    setScreen(next);
  };
  const openChat = (id: number) => { setActiveChatId(id); pushScreen('chat'); };
  const openChatForUser = (userId: number) => openChat(((userId - 1) % 5) + 1);
  const openService = (label: string) => {
    const screenMap: {[key: string]: AppScreen} = {
      '助餐': 'service', '助浴': 'service-zhuyu', '助洁': 'service-zhujie',
      '助医': 'service-zhuyi', '助急': 'service-zhuju', '助行': 'service-zhuxing',
      '康养游学': 'service-liaoyang', '活动节目': 'service-activity',
      '土货拼购': 'pindan-home',
      '养老社区': 'service-yanglao', '周边赶场': 'service-ganchang',
      '聚会中心': 'service-juhui', '大众赛事': 'service-bisai',
    };
    if (screen === 'main') setSavedActiveTab(activeTab);
    pushScreen(screenMap[label] ?? 'service');
  };
  const openHealth = (label: string) => { if (label === '养生助手') { if (screen === 'main') setSavedActiveTab(activeTab); pushScreen('health-yangsheng'); } else if (label === '用药提醒') { if (screen === 'main') setSavedActiveTab(activeTab); pushScreen('medication-home'); } };
  const goMain = () => setScreen('main');
  const openPost = (post: FollowPost, isFromFavorites?: boolean, isFromMyDynamics?: boolean) => { if (activeTab === 'bayu') { setSavedActiveTab(activeTab); setSavedYishouSubTab(yishouSubTab); } setActivePost(post); setIsPostFromFavorites(isFromFavorites ?? false); setIsPostFromMyDynamics(isFromMyDynamics ?? false); pushScreen('post-detail'); };
  const openComment = (post: FollowPost) => { if (activeTab === 'bayu') { setSavedActiveTab(activeTab); setSavedYishouSubTab(yishouSubTab); } setActiveCommentPost(post); pushScreen('comment-detail'); };
  const openVideo = (post: FollowPost, pool?: FollowPost[], isFromFavorites?: boolean, isFromMyDynamics?: boolean) => { if (activeTab === 'bayu') { setSavedActiveTab(activeTab); setSavedYishouSubTab(yishouSubTab); } setActiveVideoStartId(post.id); setActiveVideoPool(pool ?? VIDEO_POSTS); setIsVideoFromFavorites(isFromFavorites ?? false); setIsVideoFromMyDynamics(isFromMyDynamics ?? false); pushScreen('video-feed'); };
  const openCircle = (circle: CircleInfo) => { if (activeTab === 'bayu') { setSavedActiveTab(activeTab); setSavedYishouSubTab(yishouSubTab); } setActiveCircle(circle); pushScreen('circle-detail'); };
  const openCommunityDetail = (categoryId: string) => { setSavedYishouSubTab('community'); setActiveCommunityCategoryId(categoryId); pushScreen('community-detail'); };
  const openUserProfile = (userId: number) => {
    if (!USER_PROFILES[userId]) return;
    if (activeTab === 'bayu') { setSavedActiveTab(activeTab); setSavedYishouSubTab(yishouSubTab); }
    setActiveUserId(userId);
    pushScreen('user-profile');
  };
  const openFriendDetail = (userId: number) => {
    setActiveFriendId(userId);
    pushScreen('friend-detail');
  };
  const openMyDetail = (userId: number) => {
    setActiveMyDetailId(userId);
    pushScreen('my-detail');
  };
  const handleLogout = () => {
    setNavStack([]);
    setScreen('login');
  };
  const goBack = useCallback(() => {
    // 正常的栈式返回：怎么进入就怎么返回，不跳过任何页面
    const next = [...navStack];
    const target = next.pop() ?? 'main';
    if (target === 'main') {
      setActiveTab(savedActiveTab);
      if (savedActiveTab === 'bayu') {
        setYishouSubTab(savedYishouSubTab);
      }
    }
    setNavStack(next);
    setScreen(target);
  }, [screen, navStack, savedActiveTab, savedYishouSubTab]);

  const onShare = () => setShowShare(true);

  const activeChat = CHATS.find(c => c.id === activeChatId);
  const sortedRestaurants = getSorted(serviceFilter);

  // Status bar adapts to screen
  const isVideoScreen = screen === 'video-feed';
  const isProfileScreen = activeTab === 'profile' && screen === 'main';
  const statusBarBg = screen === 'login' ? 'transparent' : isVideoScreen ? '#000' : isProfileScreen ? '#FF6B35' : 'white';
  const statusTextColor = isVideoScreen || isProfileScreen ? 'white' : '#1A1A1A';

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: PRIMARY, borderRadius: 12, fontSize: 16, fontFamily: "-apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif" } }}
    >
      <div className="min-h-screen flex items-center justify-center py-8" style={{ background: 'linear-gradient(135deg, #FFF4EF 0%, #EBF4FF 100%)' }}>
        <div className="relative flex flex-col select-none overflow-hidden rounded-[48px]"
          style={{ width: 390, height: 844, borderRadius: 48, border: '9px solid #1A1A1A',
            background: screen === 'chat' ? CHAT_BG : screen === 'login' ? LOGIN_BG : isVideoScreen ? '#000' : PAGE_BG,
            boxShadow: '0 40px 100px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.08)' }}>

          {/* ── Status Bar ── */}
          <div className="flex items-center justify-between px-7 flex-shrink-0"
            style={{ background: statusBarBg, height: 44, paddingTop: 6, position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: statusTextColor }}>09:41</span>
            <div style={{ width: 96, height: 30, background: '#1A1A1A', borderRadius: 20, position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)' }} />
            <div className="flex items-center gap-1.5" style={{ opacity: 0.8 }}>
              {/* WiFi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ color: statusTextColor }}>
                <circle cx="8" cy="10.5" r="1.5" fill="currentColor" />
                <path d="M4.8 7.4C5.7 6.5 6.8 6 8 6s2.3.5 3.2 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                <path d="M2 4.6C3.5 3.1 5.6 2.2 8 2.2s4.5.9 6 2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              </svg>
              {/* Battery */}
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none" style={{ color: statusTextColor }}>
                <rect x="0.6" y="0.6" width="19.8" height="10.8" rx="2.2" stroke="currentColor" strokeWidth="1.2" />
                <rect x="2.2" y="2.2" width="14" height="7.6" rx="1.2" fill="currentColor" />
                <path d="M21.5 4.2v3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* ── LOGIN SCREEN ── */}
          {screen === 'login' && (
            <div className="flex flex-col flex-1 overflow-y-auto" style={{ background: LOGIN_BG }}>
              {loginMode === 'main' && <MainLoginScreen onNavigate={setLoginMode} onLoginSuccess={goMain} />}
              {loginMode === 'phone-sms' && <PhoneSMSScreen onBack={() => setLoginMode('main')} onLoginSuccess={goMain} onSwitchToPassword={() => setLoginMode('password')} />}
              {loginMode === 'password' && <PasswordScreen onBack={() => setLoginMode('main')} onLoginSuccess={goMain} onSwitchToSMS={() => setLoginMode('phone-sms')} />}
              {loginMode === 'register' && <RegisterScreen onBack={() => setLoginMode('main')} onRegisterSuccess={goMain} />}
            </div>
          )}

          {/* ── MAIN APP ── */}
          {screen === 'main' && (
            <>
              {/* 巴渝Tab时隐藏顶部标题栏，子Tab直接放在顶部 */}
              {activeTab !== 'bayu' && (
                <div className="flex items-center justify-between px-5 flex-shrink-0" style={{ background: activeTab === 'profile' ? 'transparent' : 'white', height: activeTab === 'profile' ? 0 : 52, borderBottom: activeTab === 'profile' ? 'none' : '1px solid #F0F0F0' }}>
                  {activeTab !== 'profile' && <span style={{ fontSize: 20, fontWeight: 800, color: PRIMARY }}>{TAB_TITLES[activeTab]}</span>}
                  {activeTab === 'messages' ? (
                  <div className="flex items-center gap-3 relative">
                    <button className="border-0 bg-transparent cursor-pointer p-1">
                      <SearchOutlined style={{ fontSize: 22, color: '#1A1A1A' }} />
                    </button>
                    <button onClick={() => setShowMsgPlusMenu(v => !v)} className="flex items-center justify-center border-0 bg-transparent cursor-pointer rounded-full" style={{ width: 32, height: 32, background: PRIMARY }}>
                      <PlusOutlined style={{ fontSize: 16, color: 'white' }} />
                    </button>
                    {showMsgPlusMenu && (
                      <>
                        <div onClick={() => setShowMsgPlusMenu(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                        <div style={{ position: 'absolute', top: 40, right: 0, background: 'white', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', zIndex: 50, minWidth: 140, overflow: 'hidden' }}>
                          <div style={{ position: 'absolute', top: -6, right: 10, width: 12, height: 12, background: 'white', transform: 'rotate(45deg)', boxShadow: '-2px -2px 4px rgba(0,0,0,0.06)' }} />
                          {[{ icon: <UsergroupAddOutlined />, label: '发起群聊' }, { icon: <UserAddOutlined />, label: '添加朋友' }, { icon: <QrcodeOutlined />, label: '扫一扫' }].map((item, i) => (
                            <button key={i} onClick={() => setShowMsgPlusMenu(false)} className="flex items-center gap-3 w-full border-0 bg-transparent cursor-pointer px-4" style={{ height: 48, borderBottom: i < 2 ? '1px solid #F5F5F5' : 'none' }}>
                              <span style={{ fontSize: 18, color: PRIMARY }}>{item.icon}</span>
                              <span style={{ fontSize: 15, color: '#1A1A1A' }}>{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : activeTab === 'yishou' ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #FFF4EF, #FFE8D6)', border: '1px solid rgba(255,107,53,0.2)' }}>
                    <StarFilled style={{ fontSize: 15, color: '#FF6B35' }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#FF6B35' }}>1,280</span>
                    <span style={{ fontSize: 11, color: '#FF9A56', fontWeight: 500 }}>积分</span>
                  </div>
                ) : activeTab === 'profile' ? (
                  <div style={{ width: 32 }} />
                ) : (
                  <button
                    className="relative border-0 bg-transparent cursor-pointer p-1"
                    onClick={() => setActiveTab('messages')}
                  >
                    <BellOutlined style={{ fontSize: 22, color: '#1A1A1A' }} />
                    <div className="absolute flex items-center justify-center rounded-full text-white font-bold"
                      style={{ top: 0, right: -2, minWidth: 18, height: 18, background: '#FF4D4F', fontSize: 11, padding: '0 4px' }}>
                      99+
                    </div>
                  </button>
                )}
              </div>
              )}
              <div className="flex-1 overflow-y-auto" style={{ background: activeTab === 'profile' ? 'transparent' : (activeTab === 'yishou' && (yishouSubTab === 'follow' || yishouSubTab === 'plaza')) ? '#000' : PAGE_BG, position: 'relative' }}>
                {activeTab === 'bayu' && <BayuTab onOpenPost={openPost} onOpenVideo={openVideo} onOpenComment={openComment} onOpenCircle={openCircle} onOpenUserProfile={openUserProfile} onCreatePost={() => pushScreen('create-select')} onDiscoverCircles={() => pushScreen('circle-discover')} onNavigate={pushScreen} onOpenChat={(roomId) => { setSavedYishouSubTab(yishouSubTab); setActiveChatId(1); pushScreen('chat'); }} followedCircles={followedCircles} onFollow={(name) => setFollowedCircles(prev => [...prev, name])} onUnfollow={(name) => setFollowedCircles(prev => prev.filter(n => n !== name))} yishouSubTab={yishouSubTab} setYishouSubTab={setYishouSubTab} onShare={onShare} userPoints={userPoints} onSetUserPoints={setUserPoints} onOpenCommunityDetail={openCommunityDetail} />}
                {activeTab === 'yishou' && <YishouTab onOpenService={openService} onOpenHealth={openHealth} onNavigate={pushScreen} onOpenActivity={(activity) => { setActiveActivity(activity); pushScreen('activity-detail'); }} />}
                {activeTab === 'messages' && <MessagesTab onOpenChat={openChat} onOpenContacts={() => pushScreen('contacts')} onOpenNotifyLikes={() => pushScreen('notify-likes')} onOpenNotifyThumbs={() => pushScreen('notify-thumbs')} onOpenNotifyComments={() => pushScreen('notify-comments')} onOpenNotifyFans={() => pushScreen('notify-fans')} />}
                {activeTab === 'profile' && <ProfileTab onNavigate={pushScreen} setActiveVideoPool={setActiveVideoPool} setProfileVideoStartId={setProfileVideoStartId} setActivePost={setActivePost} setMallInitialTab={setMallInitialTab} />}
              </div>
              <div className="flex flex-shrink-0 items-stretch" style={{ background: 'white', borderTop: '1px solid #F0F0F0', height: 60, position: 'relative', zIndex: 100 }}>
                {/* 巴渝 */}
                <button onClick={() => setActiveTab('bayu')} className="flex flex-col items-center justify-center gap-0.5 border-0 bg-transparent cursor-pointer relative" style={{ flex: 1 }}>
                  <div className="relative">
                    <FireOutlined style={{ fontSize: 23, color: activeTab === 'bayu' ? PRIMARY : '#AAAAAA', transition: 'color 0.2s' }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: activeTab === 'bayu' ? 700 : 400, color: activeTab === 'bayu' ? PRIMARY : '#AAAAAA', transition: 'color 0.2s' }}>巴渝</span>
                  {activeTab === 'bayu' && <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: PRIMARY }} />}
                </button>
                {/* 益寿 */}
                <button onClick={() => setActiveTab('yishou')} className="flex flex-col items-center justify-center gap-0.5 border-0 bg-transparent cursor-pointer relative" style={{ flex: 1 }}>
                  <div className="relative">
                    <AppstoreOutlined style={{ fontSize: 23, color: activeTab === 'yishou' ? PRIMARY : '#AAAAAA', transition: 'color 0.2s' }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: activeTab === 'yishou' ? 700 : 400, color: activeTab === 'yishou' ? PRIMARY : '#AAAAAA', transition: 'color 0.2s' }}>益寿</span>
                  {activeTab === 'yishou' && <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: PRIMARY }} />}
                </button>
                {/* 发布按钮 - 凸起圆形底座 */}
                <div style={{ width: 52, flexShrink: 0, position: 'relative' }}>
                  {/* 白色圆形凸起底座 - 恰好覆盖导航栏顶部边缘 */}
                  <div style={{
                    position: 'absolute',
                    left: -4,
                    width: 60,
                    height: 36,
                    borderRadius: '30px 30px 0 0',
                    background: 'white',
                    boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
                    zIndex: 1,
                  }} />
                  {/* 渐变红色按钮 */}
                  <button onClick={() => pushScreen('create-select')}
                    className="flex items-center justify-center border-0 bg-transparent cursor-pointer"
                    style={{
                      width: 48, height: 48,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FF6B35, #FF9A56)',
                      boxShadow: '0 4px 14px rgba(255,107,53,0.4)',
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: -8,
                      margin: 'auto',
                      zIndex: 2,
                    }}>
                    <PlusOutlined style={{ fontSize: 26, color: 'white', fontWeight: 300 }} />
                  </button>
                </div>
                {/* 消息 */}
                <button onClick={() => setActiveTab('messages')} className="flex flex-col items-center justify-center gap-0.5 border-0 bg-transparent cursor-pointer relative" style={{ flex: 1 }}>
                  <div className="relative">
                    <MessageOutlined style={{ fontSize: 23, color: activeTab === 'messages' ? PRIMARY : '#AAAAAA', transition: 'color 0.2s' }} />
                    <div className="absolute -top-1.5 -right-2 flex items-center justify-center rounded-full text-white font-bold"
                      style={{ minWidth: 16, height: 16, background: '#FF4D4F', fontSize: 10, padding: '0 3px' }}>15</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: activeTab === 'messages' ? 700 : 400, color: activeTab === 'messages' ? PRIMARY : '#AAAAAA', transition: 'color 0.2s' }}>消息</span>
                  {activeTab === 'messages' && <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: PRIMARY }} />}
                </button>
                {/* 我的 */}
                <button onClick={() => setActiveTab('profile')} className="flex flex-col items-center justify-center gap-0.5 border-0 bg-transparent cursor-pointer relative" style={{ flex: 1 }}>
                  <div className="relative">
                    <UserOutlined style={{ fontSize: 23, color: activeTab === 'profile' ? PRIMARY : '#AAAAAA', transition: 'color 0.2s' }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: activeTab === 'profile' ? 700 : 400, color: activeTab === 'profile' ? PRIMARY : '#AAAAAA', transition: 'color 0.2s' }}>我的</span>
                  {activeTab === 'profile' && <div style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: PRIMARY }} />}
                </button>
              </div>

              {/* ── 熟人和同城页面分享弹窗 ── */}
              {showShare && (
                <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.45)', zIndex: 999 }} onClick={() => setShowShare(false)}>
                  <div className="w-full bg-white rounded-t-3xl" style={{ paddingBottom: 24 }}
                    onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-center pt-3 pb-1">
                      <div style={{ width: 36, height: 4, background: '#E0E0E0', borderRadius: 2 }} />
                    </div>
                    <div className="px-4 pt-3 pb-1 text-center" style={{ fontSize: 14, color: '#888' }}>分享到</div>
                    <div className="flex justify-around px-4 py-4">
                      <button onClick={() => setShowShare(false)}
                        className="flex flex-col items-center gap-2 border-0 bg-transparent cursor-pointer active:scale-95 transition-transform">
                        <div className="flex items-center justify-center rounded-2xl" style={{ width: 58, height: 58, background: '#FFF4EF' }}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF6B35"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
                        </div>
                        <span style={{ fontSize: 12, color: '#444' }}>私信好友</span>
                      </button>
                      <button onClick={() => setShowShare(false)}
                        className="flex flex-col items-center gap-2 border-0 bg-transparent cursor-pointer active:scale-95 transition-transform">
                        <div className="flex items-center justify-center rounded-2xl" style={{ width: 58, height: 58, background: '#E8FFF0' }}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="#07C160"><path d="M8.5 11.5C9.33 11.5 10 10.83 10 10C10 9.17 9.33 8.5 8.5 8.5C7.67 8.5 7 9.17 7 10C7 10.83 7.67 11.5 8.5 11.5ZM15.5 11.5C16.33 11.5 17 10.83 17 10C17 9.17 16.33 8.5 15.5 8.5C14.67 8.5 14 9.17 14 10C14 10.83 14.67 11.5 15.5 11.5ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"/></svg>
                        </div>
                        <span style={{ fontSize: 12, color: '#444' }}>微信好友</span>
                      </button>
                      <button onClick={() => setShowShare(false)}
                        className="flex flex-col items-center gap-2 border-0 bg-transparent cursor-pointer active:scale-95 transition-transform">
                        <div className="flex items-center justify-center rounded-2xl" style={{ width: 58, height: 58, background: '#E8FFF0' }}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="#07C160"><path d="M18.5 10C17.12 10 16 8.88 16 7.5C16 6.12 17.12 5 18.5 5C19.88 5 21 6.12 21 7.5C21 8.88 19.88 10 18.5 10ZM11.5 5C9.62 5 8 6.62 8 8.5C8 10.38 9.62 12 11.5 12C13.38 12 15 10.38 15 8.5C15 6.62 13.38 5 11.5 5ZM11.5 14C8.41 14 2 16.22 2 19.5V21H21V19.5C21 16.22 14.59 14 11.5 14Z"/></svg>
                        </div>
                        <span style={{ fontSize: 12, color: '#444' }}>朋友圈</span>
                      </button>
                      <button onClick={() => setShowShare(false)}
                        className="flex flex-col items-center gap-2 border-0 bg-transparent cursor-pointer active:scale-95 transition-transform">
                        <div className="flex items-center justify-center rounded-2xl" style={{ width: 58, height: 58, background: '#E6F4FF' }}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="#1677FF"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                        </div>
                        <span style={{ fontSize: 12, color: '#444' }}>复制链接</span>
                      </button>
                    </div>
                    <div className="px-4 pt-2">
                      <button onClick={() => setShowShare(false)}
                        className="w-full rounded-2xl border-0 cursor-pointer font-medium"
                        style={{ height: 52, background: '#F5F5F5', fontSize: 16, color: '#555' }}>取消</button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── 今日提醒弹窗 ── */}
              {showWelcomeModal && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => setShowWelcomeModal(false)}>
                  <div style={{ background: 'white', borderRadius: 24, width: 320, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}
                    onClick={e => e.stopPropagation()}>
                    {/* 弹窗头部 */}
                    <div style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF9A56 100%)', padding: '20px 20px 16px' }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 4 }}>今日提醒</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>张大爷，以下是您今天的安排</div>
                    </div>
                    {/* 提醒列表 */}
                    <div style={{ padding: '16px 20px' }}>
                      <div className="flex items-center gap-3 py-3" style={{ borderBottom: '1px solid #F5F5F5' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#E6F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ClockCircleOutlined style={{ fontSize: 20, color: '#1677FF' }} />
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>用药提醒</div>
                          <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>今日 09:30 服用降压药</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 py-3">
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#FFF4EF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CalendarOutlined style={{ fontSize: 20, color: '#FF6B35' }} />
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>活动安排</div>
                          <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>今日 14:00 太极拳练习</div>
                        </div>
                      </div>
                    </div>
                    {/* 关闭按钮 */}
                    <div style={{ padding: '0 20px 20px' }}>
                      <button onClick={() => setShowWelcomeModal(false)}
                        style={{ width: '100%', height: 46, borderRadius: 14, background: 'linear-gradient(135deg, #FF6B35, #FF9A56)', border: 'none', color: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
                        我知道了
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── SERVICE DETAIL SCREEN ── */}
          {screen === 'service' && (
            <>
              <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ background: 'white', borderBottom: '1px solid #F0F0F0' }}>
                <button onClick={() => goBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1">
                  <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
                </button>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', flex: 1 }}>助餐服务</div>
                <button className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1">
                  <SearchOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {/* Hero Banner */}
                <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF9A56)' }}>
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 text-white">
                      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>助餐服务</div>
                      <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.7 }}>对接周边爱心食堂，支持送餐上门<br />软烂餐 · 低盐低脂 · 养老卡结算</div>
                      <div className="flex gap-2 mt-3">
                        {['送餐上门', '无需排队', '营养搭配'].map(t => (
                          <span key={t} className="rounded-lg px-2 py-1 text-white" style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <img src="https://picsum.photos/seed/food_elder/90/90" alt="助餐" className="rounded-2xl object-cover flex-shrink-0" style={{ width: 84, height: 84 }} />
                  </div>
                </div>
                <div className="mx-4 mt-4 flex items-center justify-between">
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>选择助餐机构</div>
                  <button onClick={() => setShowLocationPicker(true)} className="flex items-center gap-1 border-0 bg-transparent cursor-pointer p-1 rounded-lg" style={{ fontSize: 13, color: PRIMARY }}>
                    <EnvironmentOutlined style={{ fontSize: 12 }} />
                    <span>{currentLocation}</span>
                    <DownOutlined style={{ fontSize: 10 }} />
                  </button>
                </div>
                {/* Restaurant List */}
                <div className="flex flex-col gap-3 p-4 pb-24">
                  {sortedRestaurants.map(r => <RestaurantCard key={r.id} restaurant={r} onBook={setBookingTarget} />)}
                </div>
              </div>
              {/* Booking Modal */}
              {bookingTarget && <BookingModal restaurant={bookingTarget} onClose={() => setBookingTarget(null)} />}
            </>
          )}

          {/* ── SERVICE: 助浴 ── */}
          {screen === 'service-zhuyu' && (
            <>
              <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
                <button onClick={() => goBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"><ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} /></button>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}><span style={{ fontSize: 17, fontWeight: 700 }}>助浴服务</span></div>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ background: PAGE_BG }}>
                <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#FF6B35,#FF9A56)' }}>
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 text-white">
                      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>专业上门助浴</div>
                      <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.7 }}>持证机构专业服务，上门助浴<br />专业设备 · 安全舒适 · 贴心护理</div>
                      <div className="flex gap-2 mt-3">
                        {['持证机构', '上门服务', '安全保障'].map(t => (
                          <span key={t} className="rounded-lg px-2 py-1 text-white" style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1552693673-1bf958298935?w=160&h=160&fit=crop" alt="助浴" className="rounded-2xl object-cover flex-shrink-0" style={{ width: 84, height: 84 }} />
                  </div>
                </div>
                <div className="mx-4 mt-4 flex items-center justify-between">
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>选择服务机构</div>
                  <button onClick={() => setShowLocationPicker(true)} className="flex items-center gap-1 border-0 bg-transparent cursor-pointer p-1 rounded-lg" style={{ fontSize: 13, color: PRIMARY }}>
                    <EnvironmentOutlined style={{ fontSize: 12 }} />
                    <span>{currentLocation}</span>
                    <DownOutlined style={{ fontSize: 10 }} />
                  </button>
                </div>
                <div className="flex flex-col gap-3 mx-4 mt-3 pb-24">
                  {ZHUYU_INSTITUTIONS.map(inst => (
                    <button key={inst.id} onClick={() => { setSelectedZhuyuInstId(inst.id); setStaffBookingConfirmed(false); }}
                      className="rounded-2xl border-0 text-left cursor-pointer w-full overflow-hidden"
                      style={{ background: 'white', border: selectedZhuyuInstId === inst.id ? `2px solid ${PRIMARY}` : '2px solid #EBEBEB' }}>
                      <div className="flex gap-3 p-4">
                        <img src={`https://picsum.photos/seed/${inst.imageSeed}/100/100`} alt={inst.name} className="rounded-xl flex-shrink-0" style={{ width: 80, height: 80, objectFit: 'cover' }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>{inst.name}</span>
                            {inst.highlight && <span className="rounded px-1.5 py-0.5" style={{ fontSize: 10, background: PRIMARY_BG, color: PRIMARY }}>{inst.highlight}</span>}
                          </div>
                          <div className="flex items-center gap-1 mt-1" style={{ fontSize: 12, color: '#888' }}>
                            <EnvironmentOutlined style={{ fontSize: 11 }} />
                            <span className="truncate">{inst.address}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1" style={{ fontSize: 12, color: '#666' }}>
                            <span style={{ color: '#FA8C16' }}>★ {inst.rating}</span>
                            <span>{inst.orders}次服务</span>
                            <span style={{ color: PRIMARY, fontWeight: 600 }}>{inst.price}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {inst.tags.map(tag => (
                              <span key={tag} className="rounded px-1.5 py-0.5" style={{ fontSize: 10, background: '#F5F5F5', color: '#666' }}>{tag}</span>
                            ))}
                          </div>
                        </div>
                        {selectedZhuyuInstId === inst.id && <CheckCircleFilled style={{ fontSize: 22, color: PRIMARY }} className="flex-shrink-0" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 px-4 py-3" style={{ background: 'white', borderTop: '1px solid #F0F0F0' }}>
                {staffBookingConfirmed ? (
                  <div className="flex items-center justify-center gap-2 rounded-2xl" style={{ height: 56, background: '#F6FFED', color: '#52C41A', fontSize: 16, fontWeight: 700 }}><CheckCircleFilled />预约成功！服务机构将尽快联系您</div>
                ) : (
                  <button onClick={() => selectedZhuyuInstId && setShowZhuyuBookingModal(true)}
                    className="w-full rounded-2xl border-0 text-white font-bold cursor-pointer"
                    style={{ height: 56, background: selectedZhuyuInstId ? PRIMARY : '#DDD', fontSize: 17 }}>
                    {selectedZhuyuInstId ? '立即预约' : '请先选择服务机构'}
                  </button>
                )}
              </div>
              {/* 当前位置选择弹窗 */}
              {showLocationPicker && (
                <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
                  <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '60vh' }}>
                    <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #F0F0F0' }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>选择服务区域</div>
                      <button onClick={() => setShowLocationPicker(false)} className="border-0 bg-transparent cursor-pointer" style={{ fontSize: 24, color: '#AAA', lineHeight: 1 }}>×</button>
                    </div>
                    <div className="px-5 py-4 overflow-y-auto" style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>当前定位：<span style={{ color: PRIMARY }}>重庆市</span></div>
                      <div className="flex flex-wrap gap-2">
                        {['渝中区', '江北区', '南岸区', '沙坪坝区', '九龙坡区', '大渡口区', '渝北区', '巴南区', '北碚区', '璧山区', '长寿区', '涪陵区'].map(area => (
                          <button key={area} onClick={() => { setCurrentLocation(area); setShowLocationPicker(false); }}
                            className="rounded-xl px-4 py-2 border-0 cursor-pointer"
                            style={{
                              fontSize: 14,
                              background: currentLocation === area ? PRIMARY : '#F5F5F5',
                              color: currentLocation === area ? 'white' : '#666',
                              fontWeight: currentLocation === area ? 600 : 400,
                            }}>
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: '1px solid #F0F0F0' }}>
                      <button onClick={() => setShowLocationPicker(false)}
                        className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
                        style={{ height: 50, background: PRIMARY, fontSize: 16 }}>确认</button>
                    </div>
                  </div>
                </div>
              )}

              {/* 助浴预约确认弹窗 */}
              {showZhuyuBookingModal && (
                <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 110 }}>
                  <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '85vh' }}>
                    <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #F0F0F0' }}>
                      <div style={{ width: 40, height: 4, background: '#E0E0E0', borderRadius: 2, margin: '0 auto 12px' }} />
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>确认预约信息</div>
                    </div>
                    <div className="px-5 py-4 overflow-y-auto flex-1">
                      {/* 机构信息 */}
                      <div className="flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background: '#FFF7F0', border: `1px solid ${PRIMARY}20` }}>
                        <img src={`https://picsum.photos/seed/${ZHUYU_INSTITUTIONS.find(i => i.id === selectedZhuyuInstId)?.imageSeed}/100/100`} alt="" className="rounded-lg flex-shrink-0" style={{ width: 48, height: 48, objectFit: 'cover' }} />
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{ZHUYU_INSTITUTIONS.find(i => i.id === selectedZhuyuInstId)?.name}</div>
                          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{ZHUYU_INSTITUTIONS.find(i => i.id === selectedZhuyuInstId)?.price}/次</div>
                        </div>
                      </div>

                      {/* 助浴时间 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>预约助浴时间</div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <input type="date" value={zhuyuBookingInfo.date}
                              onChange={e => setZhuyuBookingInfo(prev => ({ ...prev, date: e.target.value }))}
                              className="w-full px-3 py-3 rounded-xl border cursor-pointer"
                              style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                          </div>
                          <div className="flex-1">
                            <select value={zhuyuBookingInfo.time}
                              onChange={e => setZhuyuBookingInfo(prev => ({ ...prev, time: e.target.value }))}
                              className="w-full px-3 py-3 rounded-xl border cursor-pointer"
                              style={{ fontSize: 14, borderColor: '#E8E8E8', background: 'white' }}>
                              <option value="">选择时段</option>
                              <option value="08:00-10:00">上午 08:00-10:00</option>
                              <option value="10:00-12:00">上午 10:00-12:00</option>
                              <option value="14:00-16:00">下午 14:00-16:00</option>
                              <option value="16:00-18:00">下午 16:00-18:00</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* 服务人员性别偏好 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>服务人员偏好</div>
                        <div className="flex gap-2">
                          {['男', '女', '不限'].map(opt => (
                            <button key={opt} onClick={() => setZhuyuBookingInfo(prev => ({ ...prev, genderPreference: opt }))}
                              className="flex-1 py-2.5 rounded-xl border cursor-pointer transition-colors"
                              style={{
                                fontSize: 14,
                                background: zhuyuBookingInfo.genderPreference === opt ? PRIMARY : 'white',
                                color: zhuyuBookingInfo.genderPreference === opt ? 'white' : '#666',
                                borderColor: zhuyuBookingInfo.genderPreference === opt ? PRIMARY : '#E8E8E8',
                                fontWeight: zhuyuBookingInfo.genderPreference === opt ? 600 : 400,
                              }}>
                              {opt || '不限'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 服务地址 */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>服务地址</span>
                          {zhuyuSelectedLocation && (
                            <button onClick={() => { setZhuyuSelectedLocation(null); setZhuyuBookingInfo(prev => ({ ...prev, address: '' })); setZhuyuDetailedAddress(''); }}
                              style={{ fontSize: 13, color: '#999', border: 'none', background: 'transparent', cursor: 'pointer' }}>清除</button>
                          )}
                        </div>
                        <button onClick={() => setShowZhuyuMap(true)}
                          className="w-full flex items-center justify-between p-3 rounded-xl border cursor-pointer"
                          style={{ background: zhuyuSelectedLocation ? PRIMARY_BG : 'white', borderColor: zhuyuSelectedLocation ? PRIMARY : '#E8E8E8' }}>
                          <span style={{ fontSize: 14, color: zhuyuSelectedLocation ? PRIMARY : '#999', textAlign: 'left', flex: 1 }}>
                            {zhuyuSelectedLocation?.name || '点击选择地图位置'}
                          </span>
                          <EnvironmentOutlined style={{ color: zhuyuSelectedLocation ? PRIMARY : '#CCC', fontSize: 16 }} />
                        </button>
                      </div>

                      {/* 特殊备注 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>特殊备注</div>
                        <textarea value={zhuyuBookingInfo.notes}
                          onChange={e => setZhuyuBookingInfo(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="如有特殊需求请在此说明（如：需要协助移动、身体状况等）"
                          className="w-full px-3 py-3 rounded-xl border resize-none"
                          style={{ fontSize: 14, borderColor: '#E8E8E8', minHeight: 80 }}
                          rows={3} />
                      </div>

                      {/* 费用说明 */}
                      <div className="p-3 rounded-xl" style={{ background: '#FFF8E6', border: '1px solid #FFE58F' }}>
                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: 13, color: '#8C6800' }}>预计费用</span>
                          <span style={{ fontSize: 18, fontWeight: 700, color: PRIMARY }}>{ZHUYU_INSTITUTIONS.find(i => i.id === selectedZhuyuInstId)?.price}</span>
                        </div>
                        <div style={{ fontSize: 12, color: '#AD6800', marginTop: 4 }}>具体费用以服务人员确认为准</div>
                      </div>
                    </div>
                    <div className="flex gap-3 px-5 py-4" style={{ borderTop: '1px solid #F0F0F0' }}>
                      <button onClick={() => setShowZhuyuBookingModal(false)}
                        className="flex-1 rounded-xl border cursor-pointer font-bold"
                        style={{ height: 48, background: '#F5F5F5', color: '#666', fontSize: 16 }}>取消</button>
                      <button onClick={() => { setShowZhuyuBookingModal(false); setZhuyuBookingConfirmed(true); }}
                        className="flex-1 rounded-xl border-0 cursor-pointer font-bold"
                        style={{ height: 48, background: zhuyuBookingInfo.date && zhuyuBookingInfo.time && zhuyuSelectedLocation ? PRIMARY : '#DDD', color: 'white', fontSize: 16 }}>确认预约</button>
                    </div>
                  </div>
                </div>
              )}

              {/* 助浴地图选址弹窗 */}
              {showZhuyuMap && (
                <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 120 }}>
                  <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ height: '80vh' }}>
                    <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #F0F0F0' }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>选择服务地址</div>
                      <button onClick={() => setShowZhuyuMap(false)} className="border-0 bg-transparent cursor-pointer" style={{ fontSize: 24, color: '#AAA', lineHeight: 1 }}>×</button>
                    </div>
                    <div className="flex-1 relative" style={{ background: '#F5F5F5' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <EnvironmentOutlined style={{ fontSize: 48, color: '#CCC' }} />
                          <div style={{ fontSize: 14, color: '#999', marginTop: 8 }}>地图定位中...</div>
                        </div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: PRIMARY }}>
                            <EnvironmentOutlined style={{ color: 'white', fontSize: 16 }} />
                          </div>
                          <div className="w-0.5 h-4" style={{ background: PRIMARY }} />
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 p-4" style={{ borderTop: '1px solid #F0F0F0', background: 'white' }}>
                      <div style={{ fontSize: 14, color: '#888', marginBottom: 12 }}>请选择或输入服务地址</div>
                      <div className="flex flex-col gap-2">
                        {[
                          { lat: 29.55, lng: 106.55, name: `${currentLocation}大坪街道某小区` },
                          { lat: 29.56, lng: 106.56, name: `${currentLocation}石油路街道某社区` },
                          { lat: 29.54, lng: 106.54, name: `${currentLocation}化龙桥街道某小区` },
                        ].map((loc, idx) => (
                          <button key={idx} onClick={() => setZhuyuSelectedLocation(loc)}
                            className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors"
                            style={{ background: zhuyuSelectedLocation?.name === loc.name ? PRIMARY_BG : 'white', borderColor: zhuyuSelectedLocation?.name === loc.name ? PRIMARY : '#E8E8E8' }}>
                            <EnvironmentOutlined style={{ color: zhuyuSelectedLocation?.name === loc.name ? PRIMARY : '#999', fontSize: 18 }} />
                            <span style={{ fontSize: 14, color: zhuyuSelectedLocation?.name === loc.name ? PRIMARY : '#333', textAlign: 'left', flex: 1 }}>{loc.name}</span>
                          </button>
                        ))}
                      </div>
                      <div className="mt-4">
                        <input type="text" placeholder="输入详细地址（如：XX路XX号XX栋XX室）" value={zhuyuDetailedAddress}
                          onChange={(e) => setZhuyuDetailedAddress(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border" style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                      </div>
                      <button onClick={() => {
                        const fullAddress = zhuyuSelectedLocation ? (zhuyuDetailedAddress ? `${zhuyuSelectedLocation.name} ${zhuyuDetailedAddress}` : zhuyuSelectedLocation.name) : zhuyuDetailedAddress;
                        setZhuyuBookingInfo(prev => ({ ...prev, address: fullAddress }));
                        setShowZhuyuMap(false);
                      }}
                        className="w-full mt-3 rounded-2xl text-white font-bold border-0 cursor-pointer"
                        style={{ height: 50, background: zhuyuSelectedLocation || zhuyuDetailedAddress ? PRIMARY : '#DDD', fontSize: 16 }}>确认地址</button>
                    </div>
                  </div>
                </div>
              )}

              {/* 助浴预约成功弹窗 */}
              {zhuyuBookingConfirmed && (
                <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 100 }}>
                  <div className="w-full bg-white rounded-t-3xl p-6 flex flex-col items-center gap-4" style={{ paddingBottom: 48 }}>
                    <CheckCircleFilled style={{ fontSize: 64, color: '#52C41A' }} />
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A' }}>预约成功！</div>
                    <div style={{ fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 1.8 }}>
                      已预约 <strong>{ZHUYU_INSTITUTIONS.find(i => i.id === selectedZhuyuInstId)?.name}</strong><br />
                      服务人员将在 30 分钟内致电确认时间
                    </div>
                    <div className="w-full flex flex-col gap-3">
                      {zhuyuBookingInfo.date && (
                        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#F6F6F6' }}>
                          <CalendarOutlined style={{ fontSize: 18, color: PRIMARY }} />
                          <span style={{ fontSize: 14, color: '#333' }}>预约时间：{zhuyuBookingInfo.date} {zhuyuBookingInfo.time}</span>
                        </div>
                      )}
                      {zhuyuBookingInfo.address && (
                        <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: '#E6F4FF', border: '1px solid #91D5FF' }}>
                          <EnvironmentOutlined style={{ fontSize: 18, color: '#1677FF', marginTop: 2 }} />
                          <div>
                            <div style={{ fontSize: 14, color: '#1677FF', fontWeight: 600 }}>服务地址</div>
                            <div style={{ fontSize: 13, color: '#333', marginTop: 2 }}>{zhuyuBookingInfo.address}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-full px-4 py-3 rounded-xl" style={{ background: '#F6FFED', border: '1px solid #B7EB8F' }}>
                      <div style={{ fontSize: 14, color: '#389E0D' }}>预约记录已同步到"我的订单"，可随时查看进度</div>
                    </div>
                    <button onClick={() => { setZhuyuBookingConfirmed(false); setZhuyuBookingInfo({ date: '', time: '', notes: '', address: '', genderPreference: '' }); setZhuyuSelectedLocation(null); setZhuyuDetailedAddress(''); setSelectedZhuyuInstId(null); }}
                      className="w-full rounded-2xl text-white font-bold border-0 cursor-pointer"
                      style={{ height: 56, background: PRIMARY, fontSize: 17 }}>返回列表</button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── SERVICE: 助洁 ── */}
          {screen === 'service-zhujie' && (
            <>
              <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
                <button onClick={() => goBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"><ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} /></button>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}><span style={{ fontSize: 17, fontWeight: 700 }}>助洁服务</span></div>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ background: PAGE_BG }}>
                <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#52C41A,#95DE64)' }}>
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 text-white">
                      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>专业家政保洁</div>
                      <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.7 }}>持证上岗，环保清洁剂<br />深度清洁 · 满意保障</div>
                      <div className="flex gap-2 mt-3">
                        {['持证上岗', '环保清洁', '满意保障'].map(t => (
                          <span key={t} className="rounded-lg px-2 py-1 text-white" style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=160&h=160&fit=crop" alt="助洁" className="rounded-2xl object-cover flex-shrink-0" style={{ width: 84, height: 84 }} />
                  </div>
                </div>
                <div className="mx-4 mt-4 flex items-center justify-between">
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>选择助洁机构</div>
                  <button onClick={() => setShowLocationPicker(true)} className="flex items-center gap-1 border-0 bg-transparent cursor-pointer p-1 rounded-lg" style={{ fontSize: 13, color: PRIMARY }}>
                    <EnvironmentOutlined style={{ fontSize: 12 }} />
                    <span>{currentLocation}</span>
                    <DownOutlined style={{ fontSize: 10 }} />
                  </button>
                </div>
                <div className="flex flex-col gap-3 mx-4 mt-3 pb-24">
                  {CLEAN_COMPANIES.map(company => (
                    <div key={company.id} className="bg-white rounded-2xl overflow-hidden flex flex-col" style={{ border: '1px solid #EBEBEB' }}>
                      <div className="flex gap-3 p-4 pb-3">
                        <img src={company.image} alt={company.name} className="rounded-xl object-cover flex-shrink-0" style={{ width: 90, height: 72 }} />
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4 }}>{company.name}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <StarFilled style={{ fontSize: 14, color: '#FAAD14' }} />
                            <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{company.rating}</span>
                            <span style={{ fontSize: 13, color: '#AAA' }}>（{company.ratingCount}人评价）</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1" style={{ fontSize: 13, color: '#888' }}>
                            <span className="flex items-center gap-1"><EnvironmentOutlined /> {company.distance}</span>
                            <span className="flex items-center gap-1"><ClockCircleOutlined /> {company.hours}</span>
                          </div>
                          <div className="mt-1" style={{ fontSize: 14 }}>
                            <span style={{ color: PRIMARY, fontWeight: 700, fontSize: 16 }}>¥{company.price}</span>
                            <span style={{ color: '#AAA' }}> /次起</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                        {company.tags.map(tag => (
                          <span key={tag} className="rounded-lg px-2 py-1 flex items-center gap-1" style={{ fontSize: 12, background: '#F5F5F5', color: '#666' }}>
                            <TagOutlined style={{ fontSize: 11 }} />{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-end gap-2 px-4 py-3" style={{ borderTop: '1px solid #F5F5F5' }}>
                        <button onClick={() => window.location.href = 'tel:023-8888-6666'} className="flex items-center gap-1 rounded-xl text-white font-semibold border-0 cursor-pointer active:scale-95 transition-transform"
                          style={{ height: 40, padding: '0 16px', background: '#52C41A', fontSize: 14 }}>
                          <PhoneOutlined style={{ fontSize: 14 }} />拨打电话
                        </button>
                        <button onClick={() => { setZhujieBookingTarget(company); setShowZhujieBookingModal(true); }}
                          className="rounded-xl text-white font-semibold border-0 cursor-pointer active:scale-95 transition-transform"
                          style={{ height: 40, padding: '0 20px', background: PRIMARY, fontSize: 15 }}>立即预约</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* 无底部固定栏，因为每个卡片已有按钮 */}
              {/* 助洁预约确认弹窗 */}
          {showZhujieBookingModal && zhujieBookingTarget && (
                <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 110 }}>
                  <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '85vh' }}>
                    <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #F0F0F0' }}>
                      <div style={{ width: 40, height: 4, background: '#E0E0E0', borderRadius: 2, margin: '0 auto 12px' }} />
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>确认预约信息</div>
                    </div>
                    <div className="px-5 py-4 overflow-y-auto flex-1">
                      {/* 机构信息 */}
                      <div className="flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background: '#F6FFED', border: '1px solid #52C41A20' }}>
                        <img src={zhujieBookingTarget?.image} alt="" className="rounded-lg flex-shrink-0" style={{ width: 48, height: 48, objectFit: 'cover' }} />
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{zhujieBookingTarget?.name}</div>
                          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>¥{zhujieBookingTarget?.price}/次起</div>
                        </div>
                      </div>

                      {/* 预约保洁时间 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>预约保洁时间</div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <input type="date" value={zhujieBookingInfo.date}
                              onChange={e => setZhujieBookingInfo(prev => ({ ...prev, date: e.target.value }))}
                              className="w-full px-3 py-3 rounded-xl border cursor-pointer"
                              style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                          </div>
                          <div className="flex-1">
                            <select value={zhujieBookingInfo.time}
                              onChange={e => setZhujieBookingInfo(prev => ({ ...prev, time: e.target.value }))}
                              className="w-full px-3 py-3 rounded-xl border cursor-pointer"
                              style={{ fontSize: 14, borderColor: '#E8E8E8', background: 'white' }}>
                              <option value="">选择时段</option>
                              <option value="08:00-10:00">上午 08:00-10:00</option>
                              <option value="10:00-12:00">上午 10:00-12:00</option>
                              <option value="14:00-16:00">下午 14:00-16:00</option>
                              <option value="16:00-18:00">下午 16:00-18:00</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* 服务地址 */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>服务地址</span>
                          {zhujieSelectedLocation && (
                            <button onClick={() => { setZhujieSelectedLocation(null); setZhujieBookingInfo(prev => ({ ...prev, address: '' })); setZhujieDetailedAddress(''); }}
                              style={{ fontSize: 13, color: '#999', border: 'none', background: 'transparent', cursor: 'pointer' }}>清除</button>
                          )}
                        </div>
                        <button onClick={() => setShowZhujieMap(true)}
                          className="w-full flex items-center justify-between p-3 rounded-xl border cursor-pointer"
                          style={{ background: zhujieSelectedLocation ? PRIMARY_BG : 'white', borderColor: zhujieSelectedLocation ? PRIMARY : '#E8E8E8' }}>
                          <span style={{ fontSize: 14, color: zhujieSelectedLocation ? PRIMARY : '#999', textAlign: 'left', flex: 1 }}>
                            {zhujieSelectedLocation?.name || '点击选择地图位置'}
                          </span>
                          <EnvironmentOutlined style={{ color: zhujieSelectedLocation ? PRIMARY : '#CCC', fontSize: 16 }} />
                        </button>
                      </div>

                      {/* 特殊备注 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>特殊备注</div>
                        <textarea value={zhujieBookingInfo.notes}
                          onChange={e => setZhujieBookingInfo(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="如有特殊需求请在此说明（如：重点清洁区域、特殊材质等）"
                          className="w-full px-3 py-3 rounded-xl border resize-none"
                          style={{ fontSize: 14, borderColor: '#E8E8E8', minHeight: 80 }}
                          rows={3} />
                      </div>

                      {/* 费用说明 */}
                      <div className="p-3 rounded-xl" style={{ background: '#FFF8E6', border: '1px solid #FFE58F' }}>
                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: 13, color: '#8C6800' }}>预计费用</span>
                          <span style={{ fontSize: 18, fontWeight: 700, color: PRIMARY }}>¥{zhujieBookingTarget?.price}/次起</span>
                        </div>
                        <div style={{ fontSize: 12, color: '#AD6800', marginTop: 4 }}>具体费用以保洁师确认为准</div>
                      </div>
                    </div>
                    <div className="flex gap-3 px-5 py-4" style={{ borderTop: '1px solid #F0F0F0' }}>
                      <button onClick={() => setShowZhujieBookingModal(false)}
                        className="flex-1 rounded-xl border cursor-pointer font-bold"
                        style={{ height: 48, background: '#F5F5F5', color: '#666', fontSize: 16 }}>取消</button>
                      <button onClick={() => { setShowZhujieBookingModal(false); setPackageBookingConfirmed(true); }}
                        className="flex-1 rounded-xl border-0 cursor-pointer font-bold"
                        style={{ height: 48, background: zhujieBookingInfo.date && zhujieBookingInfo.time && zhujieSelectedLocation ? PRIMARY : '#DDD', color: 'white', fontSize: 16 }}>确认预约</button>
                    </div>
                  </div>
                </div>
              )}

              {/* 助洁地图选址弹窗 */}
              {showZhujieMap && (
                <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 120 }}>
                  <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ height: '80vh' }}>
                    <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #F0F0F0' }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>选择服务地址</div>
                      <button onClick={() => setShowZhujieMap(false)} className="border-0 bg-transparent cursor-pointer" style={{ fontSize: 24, color: '#AAA', lineHeight: 1 }}>×</button>
                    </div>
                    <div className="flex-1 relative" style={{ background: '#F5F5F5' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <EnvironmentOutlined style={{ fontSize: 48, color: '#CCC' }} />
                          <div style={{ fontSize: 14, color: '#999', marginTop: 8 }}>地图定位中...</div>
                        </div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: PRIMARY }}>
                            <EnvironmentOutlined style={{ color: 'white', fontSize: 16 }} />
                          </div>
                          <div className="w-0.5 h-4" style={{ background: PRIMARY }} />
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 p-4" style={{ borderTop: '1px solid #F0F0F0', background: 'white' }}>
                      <div style={{ fontSize: 14, color: '#888', marginBottom: 12 }}>请选择或输入服务地址</div>
                      <div className="flex flex-col gap-2">
                        {[
                          { lat: 29.55, lng: 106.55, name: `${currentLocation}大坪街道某小区` },
                          { lat: 29.56, lng: 106.56, name: `${currentLocation}石油路街道某社区` },
                          { lat: 29.54, lng: 106.54, name: `${currentLocation}化龙桥街道某小区` },
                        ].map((loc, idx) => (
                          <button key={idx} onClick={() => setZhujieSelectedLocation(loc)}
                            className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors"
                            style={{ background: zhujieSelectedLocation?.name === loc.name ? PRIMARY_BG : 'white', borderColor: zhujieSelectedLocation?.name === loc.name ? PRIMARY : '#E8E8E8' }}>
                            <EnvironmentOutlined style={{ color: zhujieSelectedLocation?.name === loc.name ? PRIMARY : '#999', fontSize: 18 }} />
                            <span style={{ fontSize: 14, color: zhujieSelectedLocation?.name === loc.name ? PRIMARY : '#333', textAlign: 'left', flex: 1 }}>{loc.name}</span>
                          </button>
                        ))}
                      </div>
                      <div className="mt-4">
                        <input type="text" placeholder="输入详细地址（如：XX路XX号XX栋XX室）" value={zhujieDetailedAddress}
                          onChange={(e) => setZhujieDetailedAddress(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border" style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                      </div>
                      <button onClick={() => {
                        const fullAddress = zhujieSelectedLocation ? (zhujieDetailedAddress ? `${zhujieSelectedLocation.name} ${zhujieDetailedAddress}` : zhujieSelectedLocation.name) : zhujieDetailedAddress;
                        setZhujieBookingInfo(prev => ({ ...prev, address: fullAddress }));
                        setShowZhujieMap(false);
                      }}
                        className="w-full mt-3 rounded-2xl text-white font-bold border-0 cursor-pointer"
                        style={{ height: 50, background: zhujieSelectedLocation || zhujieDetailedAddress ? PRIMARY : '#DDD', fontSize: 16 }}>确认地址</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── SERVICE: 助医 ── */}
          {screen === 'service-zhuyi' && (
            <>
              <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
                <button onClick={() => goBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"><ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} /></button>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}><span style={{ fontSize: 17, fontWeight: 700 }}>助医服务</span></div>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ background: PAGE_BG }}>
                <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#1677FF,#69B1FF)' }}>
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 text-white">
                      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>专业陪诊服务</div>
                      <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.7 }}>全程陪同就医 · 帮助挂号取药<br />医嘱记录整理 · 贴心家属沟通</div>
                      <div className="flex gap-2 mt-3">
                        {['持证陪诊', '三甲经验', '医嘱记录'].map(t => (
                          <span key={t} className="rounded-lg px-2 py-1 text-white" style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=160&h=160&fit=crop" alt="助医" className="rounded-2xl object-cover flex-shrink-0" style={{ width: 84, height: 84 }} />
                  </div>
                </div>
                <div className="mx-4 mt-4 flex items-center justify-between">
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>选择助医机构</div>
                  <button onClick={() => setShowLocationPicker(true)} className="flex items-center gap-1 border-0 bg-transparent cursor-pointer p-1 rounded-lg" style={{ fontSize: 13, color: PRIMARY }}>
                    <EnvironmentOutlined style={{ fontSize: 12 }} />
                    <span>{currentLocation}</span>
                    <DownOutlined style={{ fontSize: 10 }} />
                  </button>
                </div>
                <div className="flex flex-col gap-3 mx-4 mt-3 pb-24">
                  {ZHUYI_COMPANIES.map(company => (
                    <div key={company.id} className="bg-white rounded-2xl overflow-hidden flex flex-col" style={{ border: '1px solid #EBEBEB' }}>
                      <div className="flex gap-3 p-4 pb-3">
                        <img src={company.image} alt={company.name} className="rounded-xl object-cover flex-shrink-0" style={{ width: 90, height: 72 }} />
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4 }}>{company.name}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <StarFilled style={{ fontSize: 14, color: '#FAAD14' }} />
                            <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{company.rating}</span>
                            <span style={{ fontSize: 13, color: '#AAA' }}>（{company.ratingCount}人评价）</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1" style={{ fontSize: 13, color: '#888' }}>
                            <span className="flex items-center gap-1"><EnvironmentOutlined /> {company.distance}</span>
                            <span className="flex items-center gap-1"><ClockCircleOutlined /> {company.hours}</span>
                          </div>
                          <div className="mt-1" style={{ fontSize: 14 }}>
                            <span style={{ color: PRIMARY, fontWeight: 700, fontSize: 16 }}>¥{company.price}</span>
                            <span style={{ color: '#AAA' }}> /次起</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                        {company.tags.map(tag => (
                          <span key={tag} className="rounded-lg px-2 py-1 flex items-center gap-1" style={{ fontSize: 12, background: '#F5F5F5', color: '#666' }}>
                            <TagOutlined style={{ fontSize: 11 }} />{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-end gap-2 px-4 py-3" style={{ borderTop: '1px solid #F5F5F5' }}>
                        <button onClick={() => window.location.href = 'tel:023-8888-6666'} className="flex items-center gap-1 rounded-xl text-white font-semibold border-0 cursor-pointer active:scale-95 transition-transform"
                          style={{ height: 40, padding: '0 16px', background: '#52C41A', fontSize: 14 }}>
                          <PhoneOutlined style={{ fontSize: 14 }} />拨打电话
                        </button>
                        <button onClick={() => { setZhuyiBookingTarget(company); setShowZhuyiBookingModal(true); }}
                          className="rounded-xl text-white font-semibold border-0 cursor-pointer active:scale-95 transition-transform"
                          style={{ height: 40, padding: '0 20px', background: PRIMARY, fontSize: 15 }}>立即预约</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* 助医预约确认弹窗 */}
          {showZhuyiBookingModal && zhuyiBookingTarget && (
                <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 110 }}>
                  <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '85vh' }}>
                    <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #F0F0F0' }}>
                      <div style={{ width: 40, height: 4, background: '#E0E0E0', borderRadius: 2, margin: '0 auto 12px' }} />
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>确认预约信息</div>
                    </div>
                    <div className="px-5 py-4 overflow-y-auto flex-1">
                      {/* 机构信息 */}
                      <div className="flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background: '#E6F4FF', border: '1px solid #1677FF20' }}>
                        <img src={zhuyiBookingTarget?.image} alt="" className="rounded-lg flex-shrink-0" style={{ width: 48, height: 48, objectFit: 'cover' }} />
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{zhuyiBookingTarget?.name}</div>
                          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>¥{zhuyiBookingTarget?.price}/次起</div>
                        </div>
                      </div>

                      {/* 预约陪诊时间 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>预约陪诊时间</div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <input type="date" value={zhuyiBookingInfo.date}
                              onChange={e => setZhuyiBookingInfo(prev => ({ ...prev, date: e.target.value }))}
                              className="w-full px-3 py-3 rounded-xl border cursor-pointer"
                              style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                          </div>
                          <div className="flex-1">
                            <select value={zhuyiBookingInfo.time}
                              onChange={e => setZhuyiBookingInfo(prev => ({ ...prev, time: e.target.value }))}
                              className="w-full px-3 py-3 rounded-xl border cursor-pointer"
                              style={{ fontSize: 14, borderColor: '#E8E8E8' }}>
                              <option value="">选择时段</option>
                              <option value="上午">上午 (08:00-12:00)</option>
                              <option value="下午">下午 (14:00-18:00)</option>
                              <option value="全天">全天</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* 就诊医院 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>就诊医院</div>
                        <input type="text" placeholder="请输入就诊医院名称"
                          className="w-full px-3 py-3 rounded-xl border"
                          style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                      </div>

                      {/* 就诊科室 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>就诊科室</div>
                        <input type="text" placeholder="请输入科室名称"
                          className="w-full px-3 py-3 rounded-xl border"
                          style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                      </div>

                      {/* 服务地址 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>服务地址</div>
                        <input type="text" placeholder="请输入详细地址"
                          value={zhuyiBookingInfo.address}
                          onChange={e => setZhuyiBookingInfo(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full px-3 py-3 rounded-xl border"
                          style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                      </div>

                      {/* 备注 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>备注（选填）</div>
                        <textarea placeholder="如有特殊需求请备注说明"
                          value={zhuyiBookingInfo.notes}
                          onChange={e => setZhuyiBookingInfo(prev => ({ ...prev, notes: e.target.value }))}
                          className="w-full px-3 py-3 rounded-xl border resize-none"
                          rows={3}
                          style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                      </div>
                    </div>
                    <div className="flex gap-3 px-5 py-4" style={{ borderTop: '1px solid #F0F0F0' }}>
                      <button onClick={() => setShowZhuyiBookingModal(false)}
                        className="flex-1 rounded-xl border cursor-pointer font-bold"
                        style={{ height: 48, background: '#F5F5F5', color: '#666', fontSize: 16 }}>取消</button>
                      <button onClick={() => setShowZhuyiBookingModal(false)}
                        className="flex-1 rounded-xl border-0 cursor-pointer font-bold"
                        style={{ height: 48, background: PRIMARY, color: 'white', fontSize: 16 }}>确认预约</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── SERVICE: 助急 ── */}
          {screen === 'service-zhuju' && (
            <>
              <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
                <button onClick={() => goBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"><ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} /></button>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}><span style={{ fontSize: 17, fontWeight: 700 }}>助急服务</span></div>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ background: PAGE_BG }}>
                <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#FF4D4F,#FF7875)' }}>
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 text-white">
                      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>紧急救助，快速响应</div>
                      <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.7 }}>24小时在线 · 响应 &lt; 3分钟<br />专业急救团队 · 一键呼救</div>
                      <div className="flex gap-2 mt-3">
                        {['24H在线', '极速响应', '专业急救'].map(t => (
                          <span key={t} className="rounded-lg px-2 py-1 text-white" style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=160&h=160&fit=crop" alt="助急" className="rounded-2xl object-cover flex-shrink-0" style={{ width: 84, height: 84 }} />
                  </div>
                </div>
                <div className="mx-4 mt-4 flex items-center justify-between">
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>选择急救机构</div>
                  <button onClick={() => setShowLocationPicker(true)} className="flex items-center gap-1 border-0 bg-transparent cursor-pointer p-1 rounded-lg" style={{ fontSize: 13, color: PRIMARY }}>
                    <EnvironmentOutlined style={{ fontSize: 12 }} />
                    <span>{currentLocation}</span>
                    <DownOutlined style={{ fontSize: 10 }} />
                  </button>
                </div>
                <div className="flex flex-col gap-3 mx-4 mt-3 pb-24">
                  {ZHJU_COMPANIES.map(company => (
                    <div key={company.id} className="bg-white rounded-2xl overflow-hidden flex flex-col" style={{ border: '1px solid #EBEBEB' }}>
                      <div className="flex gap-3 p-4 pb-3">
                        <img src={company.image} alt={company.name} className="rounded-xl object-cover flex-shrink-0" style={{ width: 90, height: 72 }} />
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4 }}>{company.name}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <StarFilled style={{ fontSize: 14, color: '#FAAD14' }} />
                            <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{company.rating}</span>
                            <span style={{ fontSize: 13, color: '#AAA' }}>（{company.ratingCount}人评价）</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1" style={{ fontSize: 13, color: '#888' }}>
                            <span className="flex items-center gap-1"><EnvironmentOutlined /> {company.distance}</span>
                            <span className="flex items-center gap-1"><ClockCircleOutlined /> {company.hours}</span>
                          </div>
                          <div className="mt-1" style={{ fontSize: 14 }}>
                            <span style={{ color: PRIMARY, fontWeight: 700, fontSize: 16 }}>¥{company.price}</span>
                            <span style={{ color: '#AAA' }}> /次起</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                        {company.tags.map(tag => (
                          <span key={tag} className="rounded-lg px-2 py-1 flex items-center gap-1" style={{ fontSize: 12, background: '#F5F5F5', color: '#666' }}>
                            <TagOutlined style={{ fontSize: 11 }} />{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-end gap-2 px-4 py-3" style={{ borderTop: '1px solid #F5F5F5' }}>
                        <button onClick={() => window.location.href = 'tel:023-8888-6666'} className="flex items-center gap-1 rounded-xl text-white font-semibold border-0 cursor-pointer active:scale-95 transition-transform"
                          style={{ height: 40, padding: '0 16px', background: '#52C41A', fontSize: 14 }}>
                          <PhoneOutlined style={{ fontSize: 14 }} />拨打电话
                        </button>
                        <button onClick={() => { setZhujuBookingTarget(company); setShowZhujuBookingModal(true); }}
                          className="rounded-xl text-white font-semibold border-0 cursor-pointer active:scale-95 transition-transform"
                          style={{ height: 40, padding: '0 20px', background: PRIMARY, fontSize: 15 }}>立即预约</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* 助急预约确认弹窗 */}
          {showZhujuBookingModal && zhujuBookingTarget && (
                <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 110 }}>
                  <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '85vh' }}>
                    <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #F0F0F0' }}>
                      <div style={{ width: 40, height: 4, background: '#E0E0E0', borderRadius: 2, margin: '0 auto 12px' }} />
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>确认预约信息</div>
                    </div>
                    <div className="px-5 py-4 overflow-y-auto flex-1">
                      {/* 机构信息 */}
                      <div className="flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background: '#FFF2F0', border: '1px solid #FF4D4F20' }}>
                        <img src={zhujuBookingTarget?.image} alt="" className="rounded-lg flex-shrink-0" style={{ width: 48, height: 48, objectFit: 'cover' }} />
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{zhujuBookingTarget?.name}</div>
                          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>¥{zhujuBookingTarget?.price}/次起</div>
                        </div>
                      </div>

                      {/* 预约急救时间 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>预约急救时间</div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <input type="date" value={zhujuBookingInfo.date}
                              onChange={e => setZhujuBookingInfo(prev => ({ ...prev, date: e.target.value }))}
                              className="w-full px-3 py-3 rounded-xl border cursor-pointer"
                              style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                          </div>
                          <div className="flex-1">
                            <select value={zhujuBookingInfo.time}
                              onChange={e => setZhujuBookingInfo(prev => ({ ...prev, time: e.target.value }))}
                              className="w-full px-3 py-3 rounded-xl border cursor-pointer"
                              style={{ fontSize: 14, borderColor: '#E8E8E8' }}>
                              <option value="">选择时段</option>
                              <option value="上午">上午 (08:00-12:00)</option>
                              <option value="下午">下午 (14:00-18:00)</option>
                              <option value="全天">全天</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* 服务地址 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>服务地址</div>
                        <input type="text" placeholder="请输入详细地址"
                          value={zhujuBookingInfo.address}
                          onChange={e => setZhujuBookingInfo(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full px-3 py-3 rounded-xl border"
                          style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                      </div>

                      {/* 紧急情况描述 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>紧急情况描述</div>
                        <textarea placeholder="请简要描述需要急救的情况"
                          value={zhujuBookingInfo.notes}
                          onChange={e => setZhujuBookingInfo(prev => ({ ...prev, notes: e.target.value }))}
                          className="w-full px-3 py-3 rounded-xl border resize-none"
                          rows={3}
                          style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                      </div>
                    </div>
                    <div className="flex gap-3 px-5 py-4" style={{ borderTop: '1px solid #F0F0F0' }}>
                      <button onClick={() => setShowZhujuBookingModal(false)}
                        className="flex-1 rounded-xl border cursor-pointer font-bold"
                        style={{ height: 48, background: '#F5F5F5', color: '#666', fontSize: 16 }}>取消</button>
                      <button onClick={() => setShowZhujuBookingModal(false)}
                        className="flex-1 rounded-xl border-0 cursor-pointer font-bold"
                        style={{ height: 48, background: PRIMARY, color: 'white', fontSize: 16 }}>确认预约</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── SERVICE: 助行 ── */}
          {screen === 'service-zhuxing' && (
            <>
              <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
                <button onClick={() => goBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"><ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} /></button>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}><span style={{ fontSize: 17, fontWeight: 700 }}>助行服务</span></div>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ background: PAGE_BG }}>
                <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#722ED1,#B37FEB)' }}>
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 text-white">
                      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>贴心出行陪伴</div>
                      <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.7 }}>专属司机接送 · 无障碍车辆<br />全程陪同出行 · 安全舒适</div>
                      <div className="flex gap-2 mt-3">
                        {['专属司机', '无障碍', '全程陪同'].map(t => (
                          <span key={t} className="rounded-lg px-2 py-1 text-white" style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=160&h=160&fit=crop" alt="助行" className="rounded-2xl object-cover flex-shrink-0" style={{ width: 84, height: 84 }} />
                  </div>
                </div>
                <div className="mx-4 mt-4 flex items-center justify-between">
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>选择出行机构</div>
                  <button onClick={() => setShowLocationPicker(true)} className="flex items-center gap-1 border-0 bg-transparent cursor-pointer p-1 rounded-lg" style={{ fontSize: 13, color: PRIMARY }}>
                    <EnvironmentOutlined style={{ fontSize: 12 }} />
                    <span>{currentLocation}</span>
                    <DownOutlined style={{ fontSize: 10 }} />
                  </button>
                </div>
                <div className="flex flex-col gap-3 mx-4 mt-3 pb-24">
                  {ZHUXING_COMPANIES.map(company => (
                    <div key={company.id} className="bg-white rounded-2xl overflow-hidden flex flex-col" style={{ border: '1px solid #EBEBEB' }}>
                      <div className="flex gap-3 p-4 pb-3">
                        <img src={company.image} alt={company.name} className="rounded-xl object-cover flex-shrink-0" style={{ width: 90, height: 72 }} />
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4 }}>{company.name}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <StarFilled style={{ fontSize: 14, color: '#FAAD14' }} />
                            <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{company.rating}</span>
                            <span style={{ fontSize: 13, color: '#AAA' }}>（{company.ratingCount}人评价）</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1" style={{ fontSize: 13, color: '#888' }}>
                            <span className="flex items-center gap-1"><EnvironmentOutlined /> {company.distance}</span>
                            <span className="flex items-center gap-1"><ClockCircleOutlined /> {company.hours}</span>
                          </div>
                          <div className="mt-1" style={{ fontSize: 14 }}>
                            <span style={{ color: PRIMARY, fontWeight: 700, fontSize: 16 }}>¥{company.price}</span>
                            <span style={{ color: '#AAA' }}> /次起</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                        {company.tags.map(tag => (
                          <span key={tag} className="rounded-lg px-2 py-1 flex items-center gap-1" style={{ fontSize: 12, background: '#F5F5F5', color: '#666' }}>
                            <TagOutlined style={{ fontSize: 11 }} />{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-end gap-2 px-4 py-3" style={{ borderTop: '1px solid #F5F5F5' }}>
                        <button onClick={() => window.location.href = 'tel:023-8888-6666'} className="flex items-center gap-1 rounded-xl text-white font-semibold border-0 cursor-pointer active:scale-95 transition-transform"
                          style={{ height: 40, padding: '0 16px', background: '#52C41A', fontSize: 14 }}>
                          <PhoneOutlined style={{ fontSize: 14 }} />拨打电话
                        </button>
                        <button onClick={() => { setZhuxingBookingTarget(company); setShowZhuxingBookingModal(true); }}
                          className="rounded-xl text-white font-semibold border-0 cursor-pointer active:scale-95 transition-transform"
                          style={{ height: 40, padding: '0 20px', background: PRIMARY, fontSize: 15 }}>立即预约</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* 助行预约确认弹窗 */}
          {showZhuxingBookingModal && zhuxingBookingTarget && (
                <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 110 }}>
                  <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '85vh' }}>
                    <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #F0F0F0' }}>
                      <div style={{ width: 40, height: 4, background: '#E0E0E0', borderRadius: 2, margin: '0 auto 12px' }} />
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>确认预约信息</div>
                    </div>
                    <div className="px-5 py-4 overflow-y-auto flex-1">
                      {/* 机构信息 */}
                      <div className="flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background: '#F3F0FF', border: '1px solid #722ED120' }}>
                        <img src={zhuxingBookingTarget?.image} alt="" className="rounded-lg flex-shrink-0" style={{ width: 48, height: 48, objectFit: 'cover' }} />
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{zhuxingBookingTarget?.name}</div>
                          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>¥{zhuxingBookingTarget?.price}/次起</div>
                        </div>
                      </div>

                      {/* 预约出行时间 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>预约出行时间</div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <input type="date" value={zhuxingBookingInfo.date}
                              onChange={e => setZhuxingBookingInfo(prev => ({ ...prev, date: e.target.value }))}
                              className="w-full px-3 py-3 rounded-xl border cursor-pointer"
                              style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                          </div>
                          <div className="flex-1">
                            <select value={zhuxingBookingInfo.time}
                              onChange={e => setZhuxingBookingInfo(prev => ({ ...prev, time: e.target.value }))}
                              className="w-full px-3 py-3 rounded-xl border cursor-pointer"
                              style={{ fontSize: 14, borderColor: '#E8E8E8' }}>
                              <option value="">选择时段</option>
                              <option value="上午">上午 (06:00-12:00)</option>
                              <option value="下午">下午 (12:00-18:00)</option>
                              <option value="全天">全天</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* 出发地点 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>出发地点</div>
                        <input type="text" placeholder="请输入出发地点"
                          value={zhuxingBookingInfo.address}
                          onChange={e => setZhuxingBookingInfo(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full px-3 py-3 rounded-xl border"
                          style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                      </div>

                      {/* 目的地 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>目的地</div>
                        <input type="text" placeholder="请输入目的地"
                          className="w-full px-3 py-3 rounded-xl border"
                          style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                      </div>

                      {/* 备注 */}
                      <div className="mb-4">
                        <div style={{ fontSize: 14, color: '#666', marginBottom: 8, fontWeight: 500 }}>备注（选填）</div>
                        <textarea placeholder="如有特殊需求请备注说明（如需要轮椅、无障碍车辆等）"
                          value={zhuxingBookingInfo.notes}
                          onChange={e => setZhuxingBookingInfo(prev => ({ ...prev, notes: e.target.value }))}
                          className="w-full px-3 py-3 rounded-xl border resize-none"
                          rows={3}
                          style={{ fontSize: 14, borderColor: '#E8E8E8' }} />
                      </div>
                    </div>
                    <div className="flex gap-3 px-5 py-4" style={{ borderTop: '1px solid #F0F0F0' }}>
                      <button onClick={() => setShowZhuxingBookingModal(false)}
                        className="flex-1 rounded-xl border cursor-pointer font-bold"
                        style={{ height: 48, background: '#F5F5F5', color: '#666', fontSize: 16 }}>取消</button>
                      <button onClick={() => setShowZhuxingBookingModal(false)}
                        className="flex-1 rounded-xl border-0 cursor-pointer font-bold"
                        style={{ height: 48, background: PRIMARY, color: 'white', fontSize: 16 }}>确认预约</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── SERVICE: 康养游学 ── */}
          {screen === 'service-liaoyang' && (
            <>
              <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
                <button onClick={() => goBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"><ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} /></button>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}><span style={{ fontSize: 17, fontWeight: 700 }}>康养游学</span></div>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ background: PAGE_BG }}>
                <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#13C2C2,#5CDBD3)' }}>
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 text-white">
                      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>优质养老机构推荐</div>
                      <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.7 }}>专业认证机构 · 一键预约参观<br />真实评价参考 · 贴心入住服务</div>
                      <div className="flex gap-2 mt-3">
                        {['专业认证', '实地参观', '真实评价'].map(t => (
                          <span key={t} className="rounded-lg px-2 py-1 text-white" style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=170&h=170&fit=crop"
                      alt="疗养服务"
                      className="rounded-2xl object-cover flex-shrink-0"
                      style={{ width: 84, height: 84 }}
                    />
                  </div>
                </div>
                <div className="mx-4 mt-4" style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>附近机构</div>
                <div className="flex flex-col gap-3 mx-4 mt-3 pb-6">
                  {LIAOYANG_INSTITUTIONS.map(inst => (
                    <div key={inst.id} className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB' }}>
                      <div className="relative">
                        <img src={`https://picsum.photos/seed/${inst.image}/390/140`} alt={inst.name} className="w-full object-cover" style={{ height: 120 }} />
                        {inst.highlight && <span className="absolute top-2 left-2 rounded-full px-3 py-1" style={{ fontSize: 12, background: '#13C2C2', color: 'white' }}>{inst.highlight}</span>}
                      </div>
                      <div className="p-3">
                        <div className="flex items-start justify-between">
                          <div style={{ fontSize: 16, fontWeight: 700 }}>{inst.name}</div>
                          <div style={{ fontSize: 13, color: '#888' }}>{inst.distance}</div>
                        </div>
                        <div className="flex items-center gap-1 mt-1" style={{ fontSize: 13 }}>
                          <span style={{ color: '#FA8C16' }}>★ {inst.rating}</span>
                          <span style={{ color: '#BBB' }}>({inst.ratingCount}条评价)</span>
                          <span style={{ marginLeft: 8, color: PRIMARY, fontWeight: 600 }}>{inst.price}/月起</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">{inst.tags.map(t => <span key={t} className="rounded-lg px-2 py-0.5" style={{ fontSize: 11, background: '#F0FAFA', color: '#13C2C2' }}>{t}</span>)}</div>
                        <button onClick={() => { setLiaoyangSelectedInst(inst); setLiaoyangEnrollForm(true); }} className="w-full mt-3 rounded-xl border-0 cursor-pointer font-bold" style={{ height: 44, background: PRIMARY_BG, color: PRIMARY, fontSize: 15 }}>预约参观</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── 康养游学预约表单 ── */}
          {liaoyangEnrollForm && (
            <div className="absolute inset-0 flex items-end" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 50 }} onClick={() => setLiaoyangEnrollForm(false)}>
              <div className="w-full bg-white rounded-t-3xl flex flex-col" style={{ maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
                <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #F0F0F0' }}>
                  <div style={{ width: 40, height: 4, background: '#E0E0E0', borderRadius: 2, margin: '0 auto 12px' }} />
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>预约参观</div>
                  <div style={{ fontSize: 13, color: '#888', textAlign: 'center', marginTop: 4 }}>{liaoyangSelectedInst?.name || '康养机构'}</div>
                </div>
                <div className="overflow-y-auto" style={{ flex: 1, padding: '16px 20px 20px' }}>
                  {/* 姓名 */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 14, color: '#333', marginBottom: 8, fontWeight: 500 }}>您的姓名 <span style={{ color: '#FF4D4F' }}>*</span></div>
                    <input
                      type="text"
                      placeholder="请输入真实姓名"
                      value={liaoyangFormData.name}
                      onChange={(e) => { setLiaoyangFormData(prev => ({ ...prev, name: e.target.value })); setLiaoyangFormErrors(prev => { const n = {...prev}; delete n.name; return n; }); }}
                      style={{ width: '100%', height: 48, borderRadius: 16, border: liaoyangFormErrors.name ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 16px', fontSize: 15, outline: 'none', boxSizing: 'border-box', background: '#FAFAFA' }}
                    />
                    {liaoyangFormErrors.name && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{liaoyangFormErrors.name}</div>}
                  </div>
                  {/* 手机号 */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 14, color: '#333', marginBottom: 8, fontWeight: 500 }}>手机号码 <span style={{ color: '#FF4D4F' }}>*</span></div>
                    <input
                      type="tel"
                      placeholder="请输入手机号码"
                      value={liaoyangFormData.phone}
                      onChange={(e) => { setLiaoyangFormData(prev => ({ ...prev, phone: e.target.value })); setLiaoyangFormErrors(prev => { const n = {...prev}; delete n.phone; return n; }); }}
                      style={{ width: '100%', height: 48, borderRadius: 16, border: liaoyangFormErrors.phone ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 16px', fontSize: 15, outline: 'none', boxSizing: 'border-box', background: '#FAFAFA' }}
                    />
                    {liaoyangFormErrors.phone && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{liaoyangFormErrors.phone}</div>}
                  </div>
                  {/* 预约日期 */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 14, color: '#333', marginBottom: 8, fontWeight: 500 }}>预约日期 <span style={{ color: '#FF4D4F' }}>*</span></div>
                    <input
                      type="date"
                      value={liaoyangFormData.visitDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => { setLiaoyangFormData(prev => ({ ...prev, visitDate: e.target.value })); setLiaoyangFormErrors(prev => { const n = {...prev}; delete n.visitDate; return n; }); }}
                      style={{ width: '100%', height: 48, borderRadius: 16, border: liaoyangFormErrors.visitDate ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 16px', fontSize: 15, outline: 'none', boxSizing: 'border-box', background: '#FAFAFA' }}
                    />
                    {liaoyangFormErrors.visitDate && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{liaoyangFormErrors.visitDate}</div>}
                  </div>
                  {/* 预约时间 */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 14, color: '#333', marginBottom: 8, fontWeight: 500 }}>预约时间 <span style={{ color: '#FF4D4F' }}>*</span></div>
                    <input
                      type="time"
                      value={liaoyangFormData.visitTime}
                      onChange={(e) => { setLiaoyangFormData(prev => ({ ...prev, visitTime: e.target.value })); setLiaoyangFormErrors(prev => { const n = {...prev}; delete n.visitTime; return n; }); }}
                      style={{ width: '100%', height: 48, borderRadius: 16, border: liaoyangFormErrors.visitTime ? '1px solid #FF4D4F' : '1px solid #E8E8E8', padding: '0 16px', fontSize: 15, outline: 'none', boxSizing: 'border-box', background: '#FAFAFA' }}
                    />
                    {liaoyangFormErrors.visitTime && <div style={{ fontSize: 12, color: '#FF4D4F', marginTop: 4 }}>{liaoyangFormErrors.visitTime}</div>}
                  </div>
                  {/* 参观人数 */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 14, color: '#333', marginBottom: 8, fontWeight: 500 }}>参观人数</div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setLiaoyangFormData(prev => ({ ...prev, personCount: String(Math.max(1, parseInt(prev.personCount) - 1)) }))} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid #E8E8E8', background: '#FAFAFA', fontSize: 18, cursor: 'pointer' }}>-</button>
                      <span style={{ fontSize: 16, fontWeight: 600, minWidth: 24, textAlign: 'center' }}>{liaoyangFormData.personCount}人</span>
                      <button onClick={() => setLiaoyangFormData(prev => ({ ...prev, personCount: String(Math.min(10, parseInt(prev.personCount) + 1)) }))} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid #E8E8E8', background: '#FAFAFA', fontSize: 18, cursor: 'pointer' }}>+</button>
                    </div>
                  </div>
                  {/* 健康说明 */}
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 14, color: '#333', marginBottom: 8, fontWeight: 500 }}>健康状况说明</div>
                    <textarea
                      placeholder="如有特殊健康需求或生活护理要求，请在此说明（如：需要轮椅、听力辅助设备、糖尿病饮食等）"
                      value={liaoyangFormData.healthNote}
                      onChange={(e) => setLiaoyangFormData(prev => ({ ...prev, healthNote: e.target.value }))}
                      rows={3}
                      style={{ width: '100%', borderRadius: 16, border: '1px solid #E8E8E8', padding: '12px 16px', fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#FAFAFA', resize: 'none', lineHeight: 1.6 }}
                    />
                  </div>
                </div>
                <div className="flex gap-3 px-4 py-4" style={{ borderTop: '1px solid #F0F0F0' }}>
                  <button
                    onClick={() => setLiaoyangEnrollForm(false)}
                    className="flex-1 rounded-xl border cursor-pointer font-bold"
                    style={{ height: 48, background: '#F5F5F5', color: '#666', fontSize: 16 }}
                  >取消</button>
                  <button
                    onClick={() => {
                      const errors: {[key: string]: string} = {};
                      if (!liaoyangFormData.name.trim()) errors.name = '请输入您的姓名';
                      if (!liaoyangFormData.phone.trim()) errors.phone = '请输入手机号码';
                      else if (!/^1[3-9]\d{9}$/.test(liaoyangFormData.phone)) errors.phone = '请输入正确的手机号码';
                      if (!liaoyangFormData.visitDate) errors.visitDate = '请选择预约日期';
                      if (!liaoyangFormData.visitTime) errors.visitTime = '请选择预约时间';
                      setLiaoyangFormErrors(errors);
                      if (Object.keys(errors).length === 0) {
                        setLiaoyangEnrollForm(false);
                        setLiaoyangEnrollSuccess(true);
                      }
                    }}
                    className="flex-1 rounded-xl border-0 cursor-pointer font-bold"
                    style={{ height: 48, background: 'linear-gradient(135deg, #13C2C2, #5CDBD3)', color: 'white', fontSize: 16 }}
                  >确认预约</button>
                </div>
              </div>
            </div>
          )}

          {/* ── 康养游学预约成功 ── */}
          {liaoyangEnrollSuccess && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)', zIndex: 51 }} onClick={() => setLiaoyangEnrollSuccess(false)}>
              <div className="mx-6 rounded-3xl overflow-hidden" style={{ background: 'white', width: '100%', maxWidth: 320 }} onClick={(e) => e.stopPropagation()}>
                <div style={{ padding: '40px 24px 32px', textAlign: 'center' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#E6FFFB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <CheckCircleFilled style={{ fontSize: 36, color: '#13C2C2' }} />
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>预约成功</div>
                  <div style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>
                    您的预约已提交<br />
                    {liaoyangSelectedInst?.name}将于{liaoyangFormData.visitDate} {liaoyangFormData.visitTime} 接待您参观
                  </div>
                </div>
                <button
                  onClick={() => setLiaoyangEnrollSuccess(false)}
                  style={{ width: '100%', height: 52, border: 'none', borderTop: '1px solid #F0F0F0', background: 'white', color: '#13C2C2', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
                >我知道了</button>
              </div>
            </div>
          )}

          {/* ── SERVICE: 活动 ── */}
          {screen === 'service-activity' && (
            <>
              <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
                <button onClick={() => goBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"><ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} /></button>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}><span style={{ fontSize: 17, fontWeight: 700 }}>活动节目</span></div>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ background: PAGE_BG }}>
                <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#FA8C16,#FFC069)' }}>
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 text-white">
                      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>精彩活动，乐享晚年</div>
                      <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.7 }}>文化娱乐 · 健身养生<br />公益志愿 · 丰富晚年生活</div>
                      <div className="flex gap-2 mt-3">
                        {['文化娱乐', '健身养生', '公益志愿'].map(t => (
                          <span key={t} className="rounded-lg px-2 py-1 text-white" style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=170&h=170&fit=crop"
                      alt="活动报名"
                      className="rounded-2xl object-cover flex-shrink-0"
                      style={{ width: 84, height: 84 }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 mx-4 mt-4 pb-6">
                  {LOCAL_ACTIVITIES.map(act => {
                    const enrolled = activityEnrolled.includes(act.id);
                    const full = act.enrolled >= act.maxEnroll;
                    return (
                      <div key={act.id} className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB', cursor: 'pointer' }} onClick={() => { setActiveActivity(act); pushScreen('activity-detail'); }}>
                        <img src={`https://picsum.photos/seed/${act.image}/390/130`} alt={act.title} className="w-full object-cover" style={{ height: 110 }} />
                        <div className="p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="rounded-full px-2 py-0.5" style={{ fontSize: 11, background: PRIMARY_BG, color: PRIMARY }}>{act.category}</span>
                            <span style={{ fontSize: 12, color: '#AAA' }}>{act.organizer}</span>
                          </div>
                          <div style={{ fontSize: 16, fontWeight: 700 }}>{act.title}</div>
                          <div className="flex items-center gap-3 mt-1" style={{ fontSize: 13, color: '#888' }}>
                            <span><CalendarOutlined style={{ marginRight: 3 }} />{act.date}</span>
                            <span><EnvironmentOutlined style={{ marginRight: 3 }} />{act.location}</span>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span style={{ fontSize: 13, color: '#888' }}>已报名 <strong style={{ color: PRIMARY }}>{enrolled ? act.enrolled + 1 : act.enrolled}</strong>/{act.maxEnroll} 人</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); setActiveActivity(act); pushScreen('activity-detail'); }}
                              className="rounded-xl border-0 cursor-pointer font-bold"
                              style={{ height: 38, padding: '0 20px', fontSize: 14,
                                background: enrolled ? '#F6FFED' : full ? '#F5F5F5' : PRIMARY,
                                color: enrolled ? '#52C41A' : full ? '#BBB' : 'white',
                                cursor: enrolled || full ? 'default' : 'pointer' }}
                            >
                              {enrolled ? '✓ 已报名' : full ? '名额已满' : '立即报名'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* ── SERVICE: 养老社区 ── */}
          {screen === 'service-yanglao' && (
            <>
              <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
                <button onClick={() => goBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"><ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} /></button>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}><span style={{ fontSize: 17, fontWeight: 700 }}>养老社区</span></div>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ background: PAGE_BG }}>
                <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#722ED1,#B37FEB)' }}>
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 text-white">
                      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>优质养老机构服务</div>
                      <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.7 }}>实地考察 · 环境优美<br />专业护理 · 贴心关怀</div>
                      <div className="flex gap-2 mt-3">
                        {['持证护理', '医养结合', '环境优美'].map(t => (
                          <span key={t} className="rounded-lg px-2 py-1 text-white" style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=160&h=160&fit=crop" alt="养老社区" className="rounded-2xl object-cover flex-shrink-0" style={{ width: 84, height: 84 }} />
                  </div>
                </div>
                <div className="mx-4 mt-4 flex items-center justify-between">
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>选择养老机构</div>
                  <button onClick={() => setShowLocationPicker(true)} className="flex items-center gap-1 border-0 bg-transparent cursor-pointer p-1 rounded-lg" style={{ fontSize: 13, color: '#722ED1' }}>
                    <EnvironmentOutlined style={{ fontSize: 12 }} />
                    <span>{currentLocation}</span>
                    <DownOutlined style={{ fontSize: 10 }} />
                  </button>
                </div>
                <div className="flex flex-col gap-3 mx-4 mt-3 pb-24">
                  {YANGLAO_INSTITUTIONS.map(inst => (
                    <div key={inst.id} className="bg-white rounded-2xl overflow-hidden flex flex-col" style={{ border: '1px solid #EBEBEB' }}>
                      <div className="flex gap-3 p-4 pb-3">
                        <img src={inst.image} alt={inst.name} className="rounded-xl object-cover flex-shrink-0" style={{ width: 90, height: 72 }} />
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4 }}>{inst.name}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <StarFilled style={{ fontSize: 14, color: '#FAAD14' }} />
                            <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{inst.rating}</span>
                            <span style={{ fontSize: 13, color: '#AAA' }}>（{inst.ratingCount}人评价）</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1" style={{ fontSize: 13, color: '#888' }}>
                            <span className="flex items-center gap-1"><EnvironmentOutlined /> {inst.distance}</span>
                            <span className="flex items-center gap-1"><ClockCircleOutlined /> {inst.hours}</span>
                          </div>
                          <div className="mt-1" style={{ fontSize: 12, color: '#888' }}>{inst.address}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                        {inst.tags.map(tag => (
                          <span key={tag} className="rounded-lg px-2 py-1 flex items-center gap-1" style={{ fontSize: 12, background: '#F5F5F5', color: '#666' }}>
                            <TagOutlined style={{ fontSize: 11 }} />{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-end gap-2 px-4 py-3" style={{ borderTop: '1px solid #F5F5F5' }}>
                        <button onClick={() => window.location.href = `tel:${inst.phone}`} className="flex items-center gap-1 rounded-xl text-white font-semibold border-0 cursor-pointer active:scale-95 transition-transform"
                          style={{ height: 40, padding: '0 16px', background: '#722ED1', fontSize: 14 }}>
                          <PhoneOutlined style={{ fontSize: 14 }} />拨打电话
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── SERVICE: 周边赶场 ── */}
          {screen === 'service-ganchang' && (
            <>
              <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
                <button onClick={() => goBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"><ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} /></button>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}><span style={{ fontSize: 17, fontWeight: 700 }}>周边赶场</span></div>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ background: PAGE_BG }}>
                <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#13C2C2,#5CDBD3)' }}>
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 text-white">
                      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>周边赶场服务</div>
                      <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.7 }}>赶集日历 · 不错过<br />实惠好物 · 新鲜直达</div>
                      <div className="flex gap-2 mt-3">
                        {['赶集日历', '新鲜直达', '实惠好物'].map(t => (
                          <span key={t} className="rounded-lg px-2 py-1 text-white" style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=160&h=160&fit=crop" alt="周边赶场" className="rounded-2xl object-cover flex-shrink-0" style={{ width: 84, height: 84 }} />
                  </div>
                </div>
                {/* Tab切换 */}
                <div className="mx-4 mt-4 flex items-center gap-1 bg-white rounded-xl p-1" style={{ border: '1px solid #EBEBEB' }}>
                  {(['today', 'tomorrow', 'calendar'] as const).map(tab => (
                    <button key={tab} onClick={() => setGanchangTab(tab)} className="flex-1 rounded-lg border-0 cursor-pointer py-2 text-center transition-all"
                      style={{ fontSize: 14, fontWeight: 600, background: ganchangTab === tab ? '#13C2C2' : 'transparent', color: ganchangTab === tab ? 'white' : '#666' }}>
                      {tab === 'today' ? '今日赶场' : tab === 'tomorrow' ? '明日赶场' : '赶集日历'}
                    </button>
                  ))}
                </div>
                <div className="mx-4 mt-4 flex items-center justify-between">
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>选择市场</div>
                  <button onClick={() => setShowLocationPicker(true)} className="flex items-center gap-1 border-0 bg-transparent cursor-pointer p-1 rounded-lg" style={{ fontSize: 13, color: '#13C2C2' }}>
                    <EnvironmentOutlined style={{ fontSize: 12 }} />
                    <span>{currentLocation}</span>
                    <DownOutlined style={{ fontSize: 10 }} />
                  </button>
                </div>
                <div className="flex flex-col gap-3 mx-4 mt-3 pb-24">
                  {MARKETS.map(market => (
                    <div key={market.id} className="bg-white rounded-2xl overflow-hidden flex flex-col" style={{ border: '1px solid #EBEBEB' }}>
                      <div className="flex gap-3 p-4 pb-3">
                        <img src={market.image} alt={market.name} className="rounded-xl object-cover flex-shrink-0" style={{ width: 90, height: 72 }} />
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4 }}>{market.name}</div>
                          <div className="flex items-center gap-3 mt-1" style={{ fontSize: 13, color: '#888' }}>
                            <span className="flex items-center gap-1"><EnvironmentOutlined /> {market.distance}</span>
                            <span className="flex items-center gap-1"><ClockCircleOutlined /> {market.hours}</span>
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <CalendarOutlined style={{ fontSize: 14, color: '#13C2C2' }} />
                            <span style={{ fontSize: 14, color: '#13C2C2', fontWeight: 600 }}>{market.ganjiDays}</span>
                          </div>
                          <div className="mt-1" style={{ fontSize: 12, color: '#888' }}>{market.address}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-2 px-4 py-3" style={{ borderTop: '1px solid #F5F5F5' }}>
                        <button onClick={() => window.location.href = `tel:${market.phone}`} className="flex items-center gap-1 rounded-xl text-white font-semibold border-0 cursor-pointer active:scale-95 transition-transform"
                          style={{ height: 40, padding: '0 16px', background: '#13C2C2', fontSize: 14 }}>
                          <PhoneOutlined style={{ fontSize: 14 }} />拨打电话
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── SERVICE: 聚会中心 ── */}
          {screen === 'service-juhui' && (
            <>
              <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
                <button onClick={() => goBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"><ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} /></button>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}><span style={{ fontSize: 17, fontWeight: 700 }}>聚会中心</span></div>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ background: PAGE_BG }}>
                <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#EB2F96,#F759AB)' }}>
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 text-white">
                      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>聚会场所服务</div>
                      <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.7 }}>多样选择 · 灵活预约<br />舒适环境 · 贴心服务</div>
                      <div className="flex gap-2 mt-3">
                        {['容纳多人', '环境优雅', '灵活预约'].map(t => (
                          <span key={t} className="rounded-lg px-2 py-1 text-white" style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=160&h=160&fit=crop" alt="聚会中心" className="rounded-2xl object-cover flex-shrink-0" style={{ width: 84, height: 84 }} />
                  </div>
                </div>
                {/* 场所分类Tab */}
                <div className="mx-4 mt-4 flex items-center gap-1 bg-white rounded-xl p-1" style={{ border: '1px solid #EBEBEB' }}>
                  {(['all', 'teahouse', 'meeting', 'ktv'] as const).map(tab => (
                    <button key={tab} onClick={() => setJuhuiFilter(tab)} className="flex-1 rounded-lg border-0 cursor-pointer py-2 text-center transition-all"
                      style={{ fontSize: 14, fontWeight: 600, background: juhuiFilter === tab ? '#EB2F96' : 'transparent', color: juhuiFilter === tab ? 'white' : '#666' }}>
                      {tab === 'all' ? '全部' : tab === 'teahouse' ? '茶馆' : tab === 'meeting' ? '会议室' : 'KTV'}
                    </button>
                  ))}
                </div>
                <div className="mx-4 mt-4 flex items-center justify-between">
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>选择场所</div>
                  <button onClick={() => setShowLocationPicker(true)} className="flex items-center gap-1 border-0 bg-transparent cursor-pointer p-1 rounded-lg" style={{ fontSize: 13, color: '#EB2F96' }}>
                    <EnvironmentOutlined style={{ fontSize: 12 }} />
                    <span>{currentLocation}</span>
                    <DownOutlined style={{ fontSize: 10 }} />
                  </button>
                </div>
                <div className="flex flex-col gap-3 mx-4 mt-3 pb-24">
                  {VENUES.filter(v => juhuiFilter === 'all' || v.type.toLowerCase().includes(juhuiFilter === 'teahouse' ? '茶馆' : juhuiFilter === 'meeting' ? '会议室' : 'KTV')).map(venue => (
                    <div key={venue.id} className="bg-white rounded-2xl overflow-hidden flex flex-col" style={{ border: '1px solid #EBEBEB' }}>
                      <div className="flex gap-3 p-4 pb-3">
                        <img src={venue.image} alt={venue.name} className="rounded-xl object-cover flex-shrink-0" style={{ width: 90, height: 72 }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="rounded-full px-2 py-0.5" style={{ fontSize: 11, background: '#FFF0F6', color: '#EB2F96' }}>{venue.type}</span>
                          </div>
                          <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4, marginTop: 4 }}>{venue.name}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <span style={{ fontSize: 14, color: '#666' }}>可容纳</span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: '#EB2F96' }}>{venue.capacity}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1" style={{ fontSize: 13, color: '#888' }}>
                            <span className="flex items-center gap-1"><EnvironmentOutlined /> {venue.distance}</span>
                            <span className="flex items-center gap-1"><ClockCircleOutlined /> {venue.hours}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                        {venue.tags.map(tag => (
                          <span key={tag} className="rounded-lg px-2 py-1 flex items-center gap-1" style={{ fontSize: 12, background: '#F5F5F5', color: '#666' }}>
                            <TagOutlined style={{ fontSize: 11 }} />{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-end gap-2 px-4 py-3" style={{ borderTop: '1px solid #F5F5F5' }}>
                        <button onClick={() => window.location.href = `tel:${venue.phone}`} className="flex items-center gap-1 rounded-xl text-white font-semibold border-0 cursor-pointer active:scale-95 transition-transform"
                          style={{ height: 40, padding: '0 16px', background: '#EB2F96', fontSize: 14 }}>
                          <PhoneOutlined style={{ fontSize: 14 }} />拨打电话预约
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── SERVICE: 大众赛事 ── */}
          {screen === 'service-bisai' && (
            <>
              <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ background: 'white', height: 54, borderBottom: '1px solid #F0F0F0', position: 'relative' }}>
                <button onClick={() => goBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0"><ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} /></button>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}><span style={{ fontSize: 17, fontWeight: 700 }}>大众赛事</span></div>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ background: PAGE_BG }}>
                <div className="mx-4 mt-4 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#FA8C16,#FFC069)' }}>
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 text-white">
                      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>大众赛事，乐享晚年</div>
                      <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.7 }}>丰富赛事 · 健康生活<br />兴趣驱动 · 以赛会友</div>
                      <div className="flex gap-2 mt-3">
                        {['广场舞', '健步走', '太极拳'].map(t => (
                          <span key={t} className="rounded-lg px-2 py-1 text-white" style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=170&h=170&fit=crop"
                      alt="大众赛事"
                      className="rounded-2xl object-cover flex-shrink-0"
                      style={{ width: 84, height: 84 }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 mx-4 mt-4 pb-6">
                  {COMPETITIONS.map(comp => (
                    <div key={comp.id} className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid #EBEBEB', cursor: 'pointer' }} onClick={() => { setBisaiActiveCompetition(comp); pushScreen('competition-detail'); }}>
                      <img src={`https://picsum.photos/seed/${comp.image}/390/130`} alt={comp.title} className="w-full object-cover" style={{ height: 110 }} />
                      <div className="p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="rounded-full px-2 py-0.5" style={{ fontSize: 11, background: BISAI_BG, color: BISAI_ORANGE }}>{comp.category}</span>
                          <span style={{ fontSize: 12, color: '#AAA' }}>{comp.organizer}</span>
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 700 }}>{comp.title}</div>
                        <div className="flex items-center gap-3 mt-1" style={{ fontSize: 13, color: '#888' }}>
                          <span><CalendarOutlined style={{ marginRight: 3 }} />{comp.date}</span>
                          <span><EnvironmentOutlined style={{ marginRight: 3 }} />{comp.location}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span style={{ fontSize: 13, color: '#888' }}>主办方：{comp.organizer}</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); setBisaiActiveCompetition(comp); pushScreen('competition-detail'); }}
                            className="rounded-xl border-0 cursor-pointer font-bold"
                            style={{ height: 38, padding: '0 20px', fontSize: 14, background: BISAI_ORANGE, color: 'white' }}
                          >
                            查看详情
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── ACTIVITY DETAIL SCREEN ── */}
          {screen === 'activity-detail' && activeActivity && (
            <ActivityDetailScreen
              activity={activeActivity}
              enrolled={activityEnrolled.includes(activeActivity.id)}
              onEnroll={() => setActivityEnrolled(prev => [...prev, activeActivity.id])}
              onBack={goBack}
            />
          )}

          {/* ── COMPETITION DETAIL SCREEN ── */}
          {screen === 'competition-detail' && bisaiActiveCompetition && (
            <CompetitionDetailScreen
              competition={bisaiActiveCompetition}
              onBack={goBack}
            />
          )}

          {/* ── PARTNER JOIN SCREEN ── */}
          {screen === 'partner-join' && (
            <PartnerJoinScreen onBack={goBack} />
          )}

          {/* ── INFLUENCER JOIN SCREEN ── */}
          {screen === 'influencer-join' && (
            <InfluencerJoinScreen onBack={goBack} />
          )}

          {/* ── MEDICATION HOME SCREEN ── */}
          {screen === 'medication-home' && (
            <MedicationHomeScreen
              onBack={goBack} medications={medications} medRecords={medRecords}
              onSetMedications={setMedications} onSetRecords={setMedRecords}
              onOpenAdd={() => { setEditMedication(undefined); pushScreen('medication-add'); }}
              onOpenCalendar={() => pushScreen('medication-calendar')}
              onOpenDetail={(m) => { setEditMedication(m); pushScreen('medication-detail'); }}
            />
          )}

          {/* ── MEDICATION ADD SCREEN ── */}
          {screen === 'medication-add' && (
            <MedicationAddScreen
              onBack={goBack} medications={medications}
              onSave={(med) => {
                const existing = medications.findIndex(m => m.id === med.id);
                if (existing >= 0) { const updated = [...medications]; updated[existing] = med; setMedications(updated); }
                else { setMedications(prev => [...prev, med]); }
                goBack();
              }}
              editMedication={editMedication}
              onDelete={(id) => { setMedications(prev => prev.filter(m => m.id !== id)); goBack(); }}
            />
          )}

          {/* ── MEDICATION CALENDAR SCREEN ── */}
          {screen === 'medication-calendar' && (
            <MedicationCalendarScreen onBack={goBack} medRecords={medRecords} medications={medications} />
          )}

          {/* ── MEDICATION DETAIL SCREEN ── */}
          {screen === 'medication-detail' && editMedication && (
            <MedicationDetailScreen
              onBack={goBack} medication={editMedication} medRecords={medRecords}
              onEdit={(m) => { setEditMedication(m); pushScreen('medication-add'); }}
              onDelete={(id) => { setMedications(prev => prev.filter(x => x.id !== id)); goBack(); }}
            />
          )}

          {/* ── HEALTH YANGSHENG SCREEN ── */}
          {screen === 'health-yangsheng' && (
            <>
              <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ position: 'relative', background: 'white', height: 54, borderBottom: '1px solid #F0F0F0' }}>
                <button onClick={() => goBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0">
                  <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
                </button>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <span style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>养生助手</span>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <ShareAltOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ background: PAGE_BG }}>
                {/* Hero Banner */}
                <div style={{ margin: '12px 16px 0', borderRadius: 16, background: 'linear-gradient(135deg, #52C41A 0%, #95DE64 100%)', padding: '20px 16px 16px', color: 'white', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>养生·健康生活</div>
                    <div style={{ fontSize: 13, opacity: 0.92, lineHeight: 1.5 }}>顺应四季，调养身心，每天一点养生智慧</div>
                    <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {['饮食调养', '经络保健', '四季起居'].map(t => (
                        <span key={t} style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: '3px 10px', fontSize: 12 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <img src="https://picsum.photos/seed/herb_tea_zen/120/120" alt="" style={{ width: 90, height: 90, borderRadius: 14, objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.18)' }} />
                </div>
                {/* 四季养生 */}
                <div style={{ margin: '16px 16px 0' }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 10 }}>四季养生</div>
                  <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
                    {YANGSHENG_SEASONS.map((s, i) => {
                      const seeds = ['spring_flowers_tea', 'summer_lotus_pond', 'autumn_pear_fruit', 'winter_ginger_soup'];
                      return (
                        <div key={s.season} style={{ flexShrink: 0, width: 130, borderRadius: 16, background: s.bg, border: `1.5px solid ${s.color}30`, overflow: 'hidden' }}>
                          <img src={`https://picsum.photos/seed/${seeds[i]}/260/120`} alt={s.season} style={{ width: '100%', height: 72, objectFit: 'cover', display: 'block' }} />
                          <div style={{ padding: '10px 10px 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                              <span style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.season}</span>
                              <span style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>{s.season}季养生</span>
                            </div>
                            <div style={{ fontSize: 11, color: '#555', lineHeight: 1.6 }}>{s.advice}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* 今日养生提示 */}
                <div style={{ margin: '16px 16px 0' }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A', marginBottom: 10 }}>今日养生提示</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {YANGSHENG_TIPS.map(tip => (
                      <div key={tip.id} style={{ background: 'white', borderRadius: 14, padding: '14px 14px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <span style={{ background: PRIMARY + '18', color: PRIMARY, borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 600 }}>{tip.category}</span>
                          <span style={{ background: tip.tagColor + '18', color: tip.tagColor, borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 600, marginLeft: 'auto' }}>{tip.tag}</span>
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{tip.title}</div>
                        <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{tip.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ height: 24 }} />
              </div>
            </>
          )}

          {/* ── PERPETUAL CALENDAR SCREEN ── */}
          {screen === 'calendar-perpetual' && <PerpetualCalendarScreen onBack={goBack} />}

          {/* ── CHAT SCREEN ── */}
          {screen === 'chat' && (
            <>
              <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ position: 'relative', background: 'white', height: 54, borderBottom: '1px solid #F0F0F0' }}>
                <button onClick={() => goBack()} className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-1 flex-shrink-0">
                  <ArrowLeftOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
                </button>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>{activeChat?.name ?? '聊天'}</div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0" style={{ marginLeft: 'auto' }}>
                  <button className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-2">
                    <PhoneOutlined style={{ fontSize: 20, color: '#1A1A1A' }} />
                  </button>
                  <button className="flex items-center justify-center rounded-xl border-0 bg-transparent cursor-pointer p-2">
                    <EllipsisOutlined style={{ fontSize: 22, color: '#1A1A1A' }} />
                  </button>
                </div>
              </div>
              <div ref={chatListRef} className="flex-1 overflow-y-auto" style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {chatMessages.map(msg => (
                  <React.Fragment key={msg.id}>
                    {msg.time && <TimeDivider time={msg.time} />}
                    <ChatBubble
                      msg={msg}
                      onOpenFriendDetail={openFriendDetail}
                      onOpenMyDetail={openMyDetail}
                    />
                  </React.Fragment>
                ))}
              </div>
              <ChatInputBar onSend={(text) => setChatMessages(prev => [...prev, { id: Date.now(), type: 'text', sender: 'me', content: text }])} />
            </>
          )}

          {/* ── POST DETAIL SCREEN ── */}
          {screen === 'post-detail' && activePost && (
            <PostDetailScreen post={activePost} isFromFavorites={isPostFromFavorites} isFromMyDynamics={isPostFromMyDynamics} onShowFavToast={(msg) => { setFavToastMsg(msg); setFavToastVisible(true); }} onBack={goBack} onOpenUserProfile={openUserProfile} onOpenCommentDetail={() => { setActiveCommentPost(activePost); pushScreen('comment-detail'); }} />
          )}

          {/* ── COMMENT DETAIL SCREEN ── */}
          {screen === 'comment-detail' && activeCommentPost && (
            <CommentDetailScreen post={activeCommentPost} onBack={goBack} onOpenUserProfile={openUserProfile} />
          )}

          {/* ── VIDEO FEED SCREEN ── */}
          {screen === 'video-feed' && (
            <VideoFeedScreen startId={profileVideoStartId > 0 ? profileVideoStartId : activeVideoStartId} videoPool={activeVideoPool} onBack={goBack} onOpenPost={openPost} onOpenComment={openComment} isFromFavorites={isVideoFromFavorites} isFromMyDynamics={isVideoFromMyDynamics} isFromLikes={isVideoFromLikes} enableDelete={activeVideoPool.length > 0 && MY_DYNAMICS_POSTS.some(m => m.id === activeVideoPool[0].id)} onShowFavToast={(msg) => { setFavToastMsg(msg); setFavToastVisible(true); }} />
          )}

          {/* ── CIRCLE DETAIL SCREEN ── */}
          {screen === 'circle-detail' && activeCircle && (
            <CircleDetailScreen circle={activeCircle} onBack={goBack} onOpenPost={openPost} onOpenVideo={openVideo} onOpenUserProfile={openUserProfile} onNavigate={pushScreen} onGoActivity={() => pushScreen('service-activity')} />
          )}

          {/* ── COMMUNITY DETAIL SCREEN（社区分类视频详情页，全屏无顶部菜单）── */}
          {screen === 'community-detail' && activeCommunityCategoryId && (
            <div className="flex flex-col" style={{ height: '100%', overflow: 'hidden', background: '#F5F5F5' }}>
              {/* 顶部导航 */}
              <div className="flex items-center justify-center px-4 py-3 flex-shrink-0" style={{ background: 'white', borderBottom: '1px solid #F0F0F0', paddingTop: 12, position: 'relative' }}>
                <button onClick={goBack} className="border-0 bg-transparent cursor-pointer p-1" style={{ fontSize: 20, color: '#1A1A1A', position: 'absolute', left: 12 }}>
                  <ArrowLeftOutlined />
                </button>
                <span style={{ fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>
                  {(() => { const cat = COMMUNITY_CATEGORIES.find(c => c.id === activeCommunityCategoryId); return cat ? `${cat.icon} ${cat.name}` : ''; })()}
                </span>
              </div>
              {/* 内容列表 — 一排一个，视频与图文混合 */} 
              <div className="flex-1 overflow-y-auto px-4 py-3" style={{ minHeight: 0 }}>
                <div className="flex flex-col gap-4" style={{ paddingBottom: 100 }}>
                  {COMMUNITY_VIDEOS.filter(v => v.categoryId === activeCommunityCategoryId).map(item => {
                    const isVideo = item.contentType !== 'article';
                    return (
                    <div key={item.id} className="bg-white rounded-2xl overflow-hidden cursor-pointer" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                      <div style={{ position: 'relative' }}>
                        <img src={item.cover} alt={item.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                        {isVideo && (
                          <>
                            {/* 播放按钮 */}
                            <div className="flex items-center justify-center rounded-full" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 48, height: 48, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}>
                              <PlayCircleFilled style={{ fontSize: 28, color: 'white' }} />
                            </div>
                            {/* 时长标签 */}
                            <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.75)', color: 'white', fontSize: 12, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>
                              {item.duration}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="p-3">
                        <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4, marginBottom: 10 }}>
                          {item.title}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 28, height: 28, background: PRIMARY, color: 'white', fontSize: 12, fontWeight: 700 }}>
                              {item.authorAvatar}
                            </div>
                            <span style={{ fontSize: 13, color: '#666' }}>{item.author}</span>
                          </div>
                          <div className="flex items-center gap-3" style={{ fontSize: 12, color: '#999' }}>
                            {isVideo ? (
                              <>
                                <span>{item.views >= 10000 ? `${(item.views / 10000).toFixed(1)}万` : item.views} 播放</span>
                                <span>❤ {item.likes}</span>
                              </>
                            ) : (
                              <>
                                <span>{item.views >= 10000 ? `${(item.views / 10000).toFixed(1)}万` : item.views} 阅读</span>
                                <span>❤ {item.likes}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── CIRCLE ANNOUNCE SCREEN ── */}
          {screen === 'circle-announce' && activeCircle && (
            <CircleAnnounceScreen onBack={goBack} circle={activeCircle} />
          )}

          {/* ── CIRCLE MEMBERS SCREEN ── */}
          {screen === 'circle-members' && activeCircle && (
            <CircleMembersScreen onBack={goBack} circle={activeCircle} onOpenUserProfile={openUserProfile} />
          )}

          {/* ── CIRCLE ACTIVITY SCREEN ── */}
          {screen === 'circle-activity' && activeCircle && (
            <CircleActivityScreen onBack={goBack} circle={activeCircle} onNavigate={pushScreen} />
          )}

          {/* ── CIRCLE DISCOVER SCREEN ── */}
          {screen === 'circle-discover' && (
            <CircleDiscoverScreen onBack={goBack} onOpenCircle={openCircle} followedCircles={followedCircles} onFollow={(name) => setFollowedCircles(prev => prev.includes(name) ? prev : [...prev, name])} />
          )}

          {/* ── USER PROFILE SCREEN ── */}
          {screen === 'user-profile' && activeUserId !== null && (
            <UserProfileScreen userId={activeUserId} onBack={goBack} onOpenPost={openPost} onOpenVideo={openVideo} onOpenChat={openChatForUser} />
          )}

          {/* ── FRIEND DETAIL SCREEN ── */}
          {screen === 'friend-detail' && activeFriendId !== null && (
            <FriendDetailScreen
              friendId={activeFriendId}
              onBack={goBack}
              onOpenChat={(userId) => openChatForUser(userId)}
              onOpenUserProfile={(userId) => openUserProfile(userId)}
            />
          )}

          {/* ── MY DETAIL SCREEN ── */}
          {screen === 'my-detail' && activeMyDetailId !== null && (
            <MyDetailScreen
              userId={activeMyDetailId}
              onBack={goBack}
              onOpenChat={(userId) => openChatForUser(userId)}
            />
          )}

          {/* ── POINTS MALL SCREEN ── */}
          {screen === 'points-mall' && (
            <PointsMallScreen
              onBack={goBack}
              onNavigate={pushScreen}
              userPoints={userPoints}
              onOpenDetail={(goods) => { setActivePointsGoods(goods); pushScreen('points-detail'); }}
              onRedeem={(goods) => { setRedeemedGoods(goods); setShowPointsRedeemSuccess(true); }}
              initialTab={mallInitialTab}
              setMallReturnTab={setMallReturnTab}
            />
          )}

          {/* ── POINTS DETAIL SCREEN ── */}
          {screen === 'points-detail' && activePointsGoods && (
            <PointsDetailScreen
              goods={activePointsGoods}
              onBack={goBack}
              userPoints={userPoints}
              onRedeem={(goods) => { setUserPoints(p => p - goods.points); setRedeemedGoods(goods); setShowPointsRedeemSuccess(true); }}
              onNavigate={pushScreen}
            />
          )}

          {/* ── POINTS RECORDS SCREEN ── */}
          {screen === 'points-records' && (
            <PointsRecordsScreen onBack={goBack} onViewDetail={(record) => { setSelectedOrderRecord(record); pushScreen('order-detail'); }} />
          )}

          {/* ── ORDER DETAIL SCREEN ── */}
          {screen === 'order-detail' && selectedOrderRecord && (
            <OrderDetailScreen record={selectedOrderRecord} onBack={goBack} onNavigate={pushScreen} onOpenGoodsDetail={(goods) => { setActivePointsGoods(goods); pushScreen('points-detail'); }} />
          )}

          {/* ── MALL FAVORITES SCREEN ── */}
          {screen === 'mall-favorites' && (
            <MallFavoritesScreen onBack={goBack} onOpenDetail={(goods) => { setActivePointsGoods(goods); pushScreen('points-detail'); }} />
          )}

          {/* ── MALL ADDRESS SCREEN ── */}
          {screen === 'mall-address' && (
            <MallAddressScreen onBack={goBack} />
          )}

          {/* ── MY DYNAMICS SCREEN ── */}
          {screen === 'my-dynamics' && (
            <MyDynamicsScreen onBack={goBack} onOpenPost={openPost} onOpenVideo={openVideo} />
          )}

          {/* ── MY FAVORITES SCREEN ── */}
          {screen === 'my-favorites' && (
            <MyFavoritesScreen onBack={goBack} onOpenPost={openPost} onOpenVideo={openVideo} />
          )}

          {/* ── FOLLOW LIST SCREEN (互关/粉丝/关注) ── */}
          {screen === 'follow-list' && (
            <FollowListScreen onBack={goBack} onOpenUserProfile={openUserProfile} />
          )}

          {/* ── SETTINGS SCREEN ── */}
          {screen === 'settings' && (
            <SettingsScreen onBack={goBack} onNavigate={pushScreen} onLogout={handleLogout} />
          )}

          {/* ── MY WALLET SCREEN ── */}
          {screen === 'my-wallet' && (
            <MyWalletScreen onBack={goBack} onNavigate={pushScreen} setMallInitialTab={setMallInitialTab} />
          )}

          {/* ── ACCOUNT CANCELLATION SCREEN ── */}
          {screen === 'account-cancellation' && (
            <AccountCancellationScreen onBack={goBack} onLogout={handleLogout} />
          )}

          {/* ── NOTIFICATION SETTINGS SCREEN ── */}
          {screen === 'notification-settings' && (
            <NotificationSettingsScreen onBack={goBack} />
          )}

          {/* ── PRIVACY SETTINGS SCREEN ── */}
          {screen === 'privacy-settings' && (
            <PrivacySettingsScreen onBack={goBack} />
          )}

          {/* ── CHECK UPDATE SCREEN ── */}
          {screen === 'check-update' && (
            <CheckUpdateScreen onBack={goBack} />
          )}

          {/* ── ABOUT US SCREEN ── */}
          {screen === 'about-us' && (
            <AboutUsScreen onBack={goBack} />
          )}

          {/* ── PINDAN HOME SCREEN ── */}
          {screen === 'pindan-home' && (
            <PindanHomeScreen onBack={goBack} onOpenActivity={(activity) => { setPindanSelectedActivity(activity); pushScreen('pindan-activity'); }} />
          )}

          {/* ── PINDAN ACTIVITY SCREEN ── */}
          {screen === 'pindan-activity' && pindanSelectedActivity && (
            <PindanActivityScreen activity={pindanSelectedActivity} onBack={goBack} onOpenProduct={(product) => { setPindanSelectedProduct(product); setPindanOrderQuantity(1); pushScreen('pindan-product'); }} />
          )}

          {/* ── PINDAN PRODUCT SCREEN ── */}
          {screen === 'pindan-product' && pindanSelectedProduct && (
            <PindanProductScreen product={pindanSelectedProduct} quantity={pindanOrderQuantity} onChangeQuantity={setPindanOrderQuantity} onBack={goBack} onBuyNow={() => pushScreen('pindan-confirm')} />
          )}

          {/* ── PINDAN CONFIRM ORDER SCREEN ── */}
          {screen === 'pindan-confirm' && pindanSelectedProduct && (
            <PindanConfirmScreen product={pindanSelectedProduct} quantity={pindanOrderQuantity} onBack={goBack} onSubmitOrder={() => setShowPindanPay(true)} />
          )}

          {/* ── PINDAN ORDERS SCREEN ── */}
          {screen === 'pindan-orders' && (
            <PindanOrdersScreen orders={pindanOrders} filter={pindanOrderFilter} onChangeFilter={setPindanOrderFilter} onBack={goBack} onViewDetail={(order) => { setPindanSelectedProduct(null); pushScreen('pindan-order-detail'); }} onPay={(orderId) => { const order = pindanOrders.find(o => o.id === orderId); if (order) { setPindanOrders(prev => prev.map(o => o.id === orderId ? {...o, status: 'paid' as const, paidAt: new Date().toLocaleString()} : o)); } }} onReceive={(orderId) => { setPindanOrders(prev => prev.map(o => o.id === orderId ? {...o, status: 'completed' as const, completedAt: new Date().toLocaleString()} : o)); }} />
          )}

          {/* ── PINDAN ORDER DETAIL SCREEN ── */}
          {screen === 'pindan-order-detail' && (
            <PindanOrderDetailScreen onBack={goBack} />
          )}

          {/* ── ADDRESS MANAGEMENT SCREEN ── */}
          {screen === 'address-management' && (
            <AddressManagementScreen onBack={goBack} />
          )}

          {/* ── CHANGE PASSWORD SCREEN ── */}
          {screen === 'change-password' && (
            <ChangePasswordScreen onBack={goBack} />
          )}

          {/* ── BAYU SEARCH SCREEN ── */}
          {screen === 'bayu-search' && (
            <BayuSearchScreen onBack={goBack} />
          )}

          {/* ── MY PROFILE SCREEN ── */}
          {screen === 'my-profile' && (
            <MyProfileScreen onBack={goBack} onNavigate={pushScreen} />
          )}

          {/* ── CONTACTS SCREEN ── */}
          {screen === 'contacts' && (
            <ContactsScreen
              onBack={goBack}
              onOpenChat={(id) => openChat(id)}
              onOpenUserProfile={(userId) => openUserProfile(userId)}
              onOpenFriendRequests={() => pushScreen('friend-requests')}
              onOpenFriendDetail={(userId) => openFriendDetail(userId)}
            />
          )}

          {/* ── NOTIFY LIKES SCREEN ── */}
          {screen === 'notify-likes' && (
            <NotifyLikesScreen onBack={goBack} onOpenPost={openPost} onOpenVideo={openVideo} onOpenUserProfile={openUserProfile} />
          )}

          {/* ── NOTIFY THUMBS SCREEN ── */}
          {screen === 'notify-thumbs' && (
            <NotifyThumbsScreen onBack={goBack} onOpenPost={openPost} onOpenUserProfile={openUserProfile} />
          )}

          {/* ── NOTIFY COMMENTS SCREEN ── */}
          {screen === 'notify-comments' && (
            <NotifyCommentsScreen onBack={goBack} onOpenPost={openPost} onOpenUserProfile={openUserProfile} />
          )}

          {/* ── NOTIFY FANS SCREEN ── */}
          {screen === 'notify-fans' && (
            <NotifyFansScreen onBack={goBack} onOpenUserProfile={openUserProfile} />
          )}

          {/* ── FRIEND REQUESTS SCREEN ── */}
          {screen === 'friend-requests' && (
            <FriendRequestsScreen onBack={goBack} />
          )}

          {/* ── CREATE POST SCREENS ── */}
          {screen === 'create-select' && (
            <CreatePostSelectScreen
              onBack={goBack}
              onSelectImage={() => pushScreen('create-image')}
              onSelectVideo={() => pushScreen('create-video')}
            />
          )}
          {screen === 'create-image' && (
            <CreateImagePostScreen onBack={goBack} />
          )}
          {screen === 'create-video' && (
            <CreateVideoPostScreen onBack={goBack} />
          )}

        </div>

        {/* 积分商城成功弹窗（固定在最外层） */}
        {showPointsRedeemSuccess && redeemedGoods && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'white', borderRadius: 24, width: 300, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}>
              <div style={{ background: 'linear-gradient(135deg, #E8302A, #FF6B35)', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GiftOutlined style={{ fontSize: 32, color: 'white' }} />
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>恭喜兑换成功</div>
              </div>
              <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <img src={redeemedGoods.image} alt={redeemedGoods.name} style={{ width: 72, height: 72, borderRadius: 12, objectFit: 'cover' }} />
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', textAlign: 'center' }}>{redeemedGoods.name}</div>
                <div style={{ fontSize: 13, color: '#888', textAlign: 'center' }}>请到"我的兑换"查看领取方式</div>
                <div style={{ display: 'flex', gap: 10, width: '100%', marginTop: 4 }}>
                  <button onClick={() => { setShowPointsRedeemSuccess(false); pushScreen('points-records'); }} style={{ flex: 1, height: 48, borderRadius: 12, border: 'none', background: '#E8302A', color: 'white', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>查看兑换记录</button>
                  <button onClick={() => setShowPointsRedeemSuccess(false)} style={{ flex: 1, height: 48, borderRadius: 12, border: 'none', background: '#F0F0F0', color: '#666', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>继续逛逛</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 土货拼购支付弹窗 */}
        {showPindanPay && pindanSelectedProduct && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'white', borderRadius: 24, width: 320, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}>
              <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#FFF4E6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlipayOutlined style={{ fontSize: 32, color: '#1677FF' }} />
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>确认支付</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#E8302A' }}>¥{pindanSelectedProduct.pindanPrice * pindanOrderQuantity}</div>
                <div style={{ fontSize: 13, color: '#888' }}>支付完成后，商家将尽快发货</div>
                <div style={{ width: '100%', padding: '12px 16px', background: '#F5F5F5', borderRadius: 8, fontSize: 13, color: '#666' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span>商品</span>
                    <span>{pindanSelectedProduct.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>数量</span>
                    <span>×{pindanOrderQuantity}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, width: '100%', marginTop: 8 }}>
                  <button onClick={() => setShowPindanPay(false)} style={{ flex: 1, height: 48, borderRadius: 12, border: '1px solid #E8E8E8', background: 'white', color: '#666', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>取消</button>
                  <button onClick={() => {
                    const newOrder: PindanOrder = {
                      id: Date.now(),
                      orderNo: `PD${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}${String(new Date().getDate()).padStart(2,'0')}${String(Date.now()).slice(-4)}`,
                      status: 'pending',
                      totalAmount: pindanSelectedProduct.pindanPrice * pindanOrderQuantity,
                      address: '渝中区解放碑街道98号',
                      contact: '张阿姨',
                      phone: '138****1234',
                      products: [{
                        productId: pindanSelectedProduct.id,
                        name: pindanSelectedProduct.name,
                        image: pindanSelectedProduct.image,
                        quantity: pindanOrderQuantity,
                        price: pindanSelectedProduct.pindanPrice
                      }],
                      createdAt: new Date().toLocaleString('zh-CN', { hour: '2-digit', minute: '2-digit' })
                    };
                    setPindanOrders(prev => [newOrder, ...prev]);
                    setShowPindanPay(false);
                    setPindanPaySuccess(true);
                  }} style={{ flex: 1, height: 48, borderRadius: 12, border: 'none', background: '#1677FF', color: 'white', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>去支付</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 土货拼购支付成功弹窗 */}
        {pindanPaySuccess && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'white', borderRadius: 24, width: 300, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}>
              <div style={{ background: 'linear-gradient(135deg, #52C41A, #73D13D)', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircleFilled style={{ fontSize: 32, color: 'white' }} />
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>支付成功</div>
              </div>
              <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 13, color: '#888', textAlign: 'center' }}>感谢您的拼购，商家将尽快发货<br />请留意订单状态</div>
                <div style={{ display: 'flex', gap: 10, width: '100%', marginTop: 4 }}>
                  <button onClick={() => { setPindanPaySuccess(false); pushScreen('pindan-orders'); }} style={{ flex: 1, height: 48, borderRadius: 12, border: 'none', background: '#52C41A', color: 'white', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>查看订单</button>
                  <button onClick={() => { setPindanPaySuccess(false); pushScreen('pindan-home'); }} style={{ flex: 1, height: 48, borderRadius: 12, border: 'none', background: '#F0F0F0', color: '#666', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>继续拼购</button>
                </div>
              </div>
            </div>
          </div>
        )}

          {/* 收藏toast（在overflow容器外面，绝对安全） */}
          {favToastVisible && (
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 99999, display: 'flex', justifyContent: 'center' }}>
              <div className="flex items-center gap-2 px-6 py-3 rounded-full"
                style={{ background: 'rgba(0,0,0,0.82)', color: 'white', fontSize: 15, fontWeight: 600, boxShadow: '0 4px 16px rgba(0,0,0,0.3)', whiteSpace: 'nowrap' }}>
                <StarOutlined style={{ fontSize: 20, color: '#FAAD14' }} />
                {favToastMsg}
              </div>
            </div>
          )}
      </div>
    </ConfigProvider>
  );
};

export default Component;
