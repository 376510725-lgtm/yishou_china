/**
 * 统一模拟数据
 * 所有页面共享同一份数据源，避免多处重复定义
 */

// ========== 订单数据 ==========
export interface OrderData {
  id: string;
  user: string;
  avatar: string;
  color: string;
  phone: string;
  service: string;
  address: string;
  time: string;
  amount: string;
  date?: string;
  status: 'pending' | 'accepted' | 'dispatched' | 'serving' | 'completed' | 'cancelled';
  assignedStaff?: {
    name: string;
    avatar: string;
    color: string;
    phone: string;
    skills: string[];
  };
  cancelReason?: string;
  cancelTime?: string;
}

export const ORDER_LIST: OrderData[] = [
  {
    id: 'DD202406010001',
    user: '张阿姨',
    avatar: '张',
    color: '#00D4FF',
    phone: '138****5678',
    service: '助餐',
    address: '渝中区解放碑街道XX号',
    time: '今天 12:00',
    amount: '¥68.00',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
  },
  {
    id: 'DD202406010002',
    user: '李大爷',
    avatar: '李',
    color: '#10B981',
    phone: '139****8765',
    service: '助洁',
    address: '江北区观音桥街道XX号',
    time: '明天 09:00',
    amount: '¥128.00',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    status: 'dispatched',
    assignedStaff: {
      name: '王小明',
      avatar: '王',
      color: '#00D4FF',
      phone: '138****1234',
      skills: ['助餐', '助洁'],
    },
  },
  {
    id: 'DD202406010003',
    user: '王奶奶',
    avatar: '王',
    color: '#F59E0B',
    phone: '137****2345',
    service: '助医',
    address: '南岸区南坪街道XX号',
    time: '今天 15:30',
    amount: '¥198.00',
    date: new Date().toISOString().split('T')[0],
    status: 'serving',
    assignedStaff: {
      name: '李小红',
      avatar: '李',
      color: '#10B981',
      phone: '139****5678',
      skills: ['助医', '助浴'],
    },
  },
  {
    id: 'DD202406010004',
    user: '赵叔叔',
    avatar: '赵',
    color: '#EF4444',
    phone: '136****9876',
    service: '助浴',
    address: '沙坪坝区三峡广场XX号',
    time: '昨天 10:00',
    amount: '¥88.00',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    status: 'completed',
    assignedStaff: {
      name: '王小明',
      avatar: '王',
      color: '#00D4FF',
      phone: '138****1234',
      skills: ['助餐', '助洁'],
    },
  },
];

// ========== 服务人员数据 ==========
export interface StaffData {
  id: number;
  name: string;
  avatar: string;
  color: string;
  phone: string;
  status: 'online' | 'busy' | 'offline';
  skills: string[];
  todayTasks: number;
  totalTasks: number;
  rating?: number;
  reviewStatus?: 'pending' | 'approved' | 'rejected';
  area?: string;
  experience?: string;
  applyTime?: string;
  reason?: string;
  monthlyEarnings?: number;
  completedThisMonth?: number;
}

export const STAFF_LIST: StaffData[] = [
  {
    id: 1,
    name: '王小明',
    avatar: '王',
    color: '#00D4FF',
    phone: '138****1234',
    status: 'online',
    skills: ['助餐', '助洁'],
    todayTasks: 3,
    totalTasks: 156,
    rating: 4.8,
    reviewStatus: 'approved',
    area: '渝中区',
    experience: '3年护工经验',
    monthlyEarnings: 3458,
    completedThisMonth: 12,
  },
  {
    id: 2,
    name: '李小红',
    avatar: '李',
    color: '#10B981',
    phone: '139****5678',
    status: 'busy',
    skills: ['助医', '助浴'],
    todayTasks: 5,
    totalTasks: 289,
    rating: 4.9,
    reviewStatus: 'approved',
    area: '江北区',
    experience: '5年家政服务经验',
    monthlyEarnings: 5280,
    completedThisMonth: 18,
  },
  {
    id: 3,
    name: '张建国',
    avatar: '张',
    color: '#F59E0B',
    phone: '135****2345',
    status: 'online',
    skills: ['助餐', '助行'],
    todayTasks: 2,
    totalTasks: 98,
    rating: 4.6,
    reviewStatus: 'approved',
    area: '南岸区',
    experience: '2年护工经验',
    monthlyEarnings: 2150,
    completedThisMonth: 8,
  },
  {
    id: 4,
    name: '陈小芳',
    avatar: '陈',
    color: '#EF4444',
    phone: '136****6543',
    status: 'offline',
    skills: ['助浴', '助洁'],
    todayTasks: 0,
    totalTasks: 67,
    reviewStatus: 'pending',
    area: '渝中区',
    experience: '3年护工经验',
    applyTime: '2026-07-03 14:30',
  },
  {
    id: 5,
    name: '赵建国',
    avatar: '赵',
    color: '#F59E0B',
    phone: '135****9876',
    status: 'offline',
    skills: ['助餐', '助行', '助急'],
    todayTasks: 0,
    totalTasks: 0,
    reviewStatus: 'pending',
    area: '江北区',
    experience: '5年家政服务经验',
    applyTime: '2026-07-04 09:15',
  },
  {
    id: 6,
    name: '孙美丽',
    avatar: '孙',
    color: '#10B981',
    phone: '137****3456',
    status: 'offline',
    skills: ['助医', '助浴'],
    todayTasks: 0,
    totalTasks: 0,
    reviewStatus: 'pending',
    area: '南岸区',
    experience: '2年护工经验',
    applyTime: '2026-07-02 16:00',
  },
];

// ========== 任务数据（服务人员视角） ==========
export interface TaskData {
  id: string;
  user: string;
  avatar: string;
  color: string;
  phone: string;
  service: string;
  address: string;
  time: string;
  amount: string;
  status: 'pending' | 'accepted' | 'serving' | 'completed';
}

export const TASK_LIST: TaskData[] = [
  {
    id: 'DD202406010001',
    user: '张阿姨',
    avatar: '张',
    color: '#A855F7',
    phone: '138****5678',
    service: '助餐',
    address: '渝中区解放碑街道XX号',
    time: '今天 12:00',
    amount: '¥68.00',
    status: 'pending',
  },
  {
    id: 'DD202406010003',
    user: '王奶奶',
    avatar: '王',
    color: '#F59E0B',
    phone: '137****2345',
    service: '助医',
    address: '南岸区南坪街道XX号',
    time: '今天 15:30',
    amount: '¥198.00',
    status: 'serving',
  },
  {
    id: 'DD202406010005',
    user: '刘奶奶',
    avatar: '刘',
    color: '#7C3AED',
    phone: '135****3456',
    service: '助浴',
    address: '渝北区新南路XX号',
    time: '昨天 14:00',
    amount: '¥78.00',
    status: 'completed',
  },
];

// ========== 消息通知数据 ==========
export interface MessageData {
  id: string;
  type: 'order' | 'system' | 'review' | 'settlement';
  title: string;
  content: string;
  time: string;
  read: boolean;
}

export const MESSAGE_LIST: MessageData[] = [
  {
    id: 'msg1',
    type: 'order',
    title: '新订单提醒',
    content: '您有一条新的助餐订单待处理，客户：张阿姨，预约时间：今天12:00',
    time: '10分钟前',
    read: false,
  },
  {
    id: 'msg2',
    type: 'review',
    title: '审核结果通知',
    content: '您的入驻申请已通过审核，现在可以接单了',
    time: '2小时前',
    read: false,
  },
  {
    id: 'msg3',
    type: 'system',
    title: '系统通知',
    content: '系统将于今晚22:00进行维护升级，预计持续2小时',
    time: '昨天',
    read: true,
  },
  {
    id: 'msg4',
    type: 'settlement',
    title: '结算通知',
    content: '您5月份的收入已结算，金额¥3,458.00，预计3个工作日内到账',
    time: '3天前',
    read: true,
  },
  {
    id: 'msg5',
    type: 'order',
    title: '任务提醒',
    content: '您有一条任务即将超时，请尽快完成打卡',
    time: '5天前',
    read: true,
  },
];

// ========== 收入记录 ==========
export interface IncomeRecord {
  id: string;
  date: string;
  service: string;
  amount: string;
  user: string;
  status: 'settled' | 'pending';
}

// ========== 评价数据 ==========
export interface ReviewData {
  id: string;
  userName: string;
  userAvatar: string;
  userColor: string;
  rating: number;
  content: string;
  serviceType: string;
  date: string;
  tags: string[];
}

export const REVIEW_LIST: ReviewData[] = [
  {
    id: 'rv1',
    userName: '张阿姨',
    userAvatar: '张',
    userColor: '#00D4FF',
    rating: 5,
    content: '王师傅服务态度特别好，做的饭菜也很合口味，非常感谢！每次都准时到，很放心。',
    serviceType: '助餐',
    date: '2026-07-01',
    tags: ['态度好', '手艺好', '准时'],
  },
  {
    id: 'rv2',
    userName: '李大爷',
    userAvatar: '李',
    userColor: '#10B981',
    rating: 5,
    content: '打扫得很干净，连角落里都清理到了，很细心。以后还找王师傅。',
    serviceType: '助洁',
    date: '2026-06-28',
    tags: ['细心', '干净', '认真'],
  },
  {
    id: 'rv3',
    userName: '赵叔叔',
    userAvatar: '赵',
    userColor: '#EF4444',
    rating: 4,
    content: '整体还不错，帮我洗了澡，动作也比较轻柔。只是晚了十分钟到。',
    serviceType: '助浴',
    date: '2026-06-25',
    tags: ['专业', '轻柔'],
  },
  {
    id: 'rv4',
    userName: '刘奶奶',
    userAvatar: '刘',
    userColor: '#F59E0B',
    rating: 5,
    content: '小芳人很好，陪我聊天还帮我整理房间，像自家闺女一样贴心。',
    serviceType: '助餐',
    date: '2026-06-20',
    tags: ['贴心', '热情', '耐心'],
  },
  {
    id: 'rv5',
    userName: '陈爷爷',
    userAvatar: '陈',
    userColor: '#A855F7',
    rating: 5,
    content: '王师傅每次都把饭菜做得刚好适合我的口味，咸淡适中，很满意！',
    serviceType: '助餐',
    date: '2026-06-18',
    tags: ['口味好', '准时'],
  },
];

export const INCOME_RECORDS: IncomeRecord[] = [
  { id: '1', date: '06-01', service: '助餐服务', amount: '+68.00', user: '张阿姨', status: 'settled' },
  { id: '2', date: '06-01', service: '助洁服务', amount: '+128.00', user: '李大爷', status: 'settled' },
  { id: '3', date: '06-02', service: '助医服务', amount: '+198.00', user: '王奶奶', status: 'pending' },
  { id: '4', date: '06-03', service: '助浴服务', amount: '+88.00', user: '赵叔叔', status: 'settled' },
  { id: '5', date: '06-05', service: '助餐服务', amount: '+68.00', user: '刘奶奶', status: 'settled' },
  { id: '6', date: '06-07', service: '助行服务', amount: '+58.00', user: '陈爷爷', status: 'pending' },
];
