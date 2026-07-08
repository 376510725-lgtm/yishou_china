/**
 * 共享组件和常量
 */

// 颜色常量 - 美团商家风格
export const PRIMARY = '#1989FA';          // 美团蓝
export const PRIMARY_DARK = '#1664B6';    // 深蓝
export const SUCCESS = '#00B578';          // 成功绿
export const WARNING = '#FF8F1A';          // 警告橙
export const DANGER = '#FF4D4F';           // 危险红
export const INFO = '#1989FA';             // 信息蓝
export const TEXT_PRIMARY = '#333333';     // 主文字
export const TEXT_SECONDARY = '#666666';   // 次要文字
export const TEXT_GRAY = '#999999';        // 灰色文字
export const BG_GRAY = '#F5F5F5';          // 灰色背景
export const BORDER_COLOR = '#EEEEEE';    // 边框色

// 服务类型
export const SERVICES = [
  { label: '助餐', color: PRIMARY },
  { label: '助浴', color: INFO },
  { label: '助洁', color: SUCCESS },
  { label: '助医', color: DANGER },
  { label: '助急', color: WARNING },
  { label: '助行', color: '#722ED1' },
];

// 订单状态
export const ORDER_STATUS_MAP: Record<string, string> = {
  pending: '待接单',
  accepted: '已接单',
  dispatched: '已派单',
  serving: '服务中',
  completed: '已完成',
  cancelled: '已取消',
};

// 模拟数据
export const ORDER_LIST = [
  { id: 'DD202406010001', user: '张阿姨', avatar: '张', color: '#1989FA', phone: '138****5678', service: '助餐', address: '渝中区解放碑街道XX号', time: '今天 12:00', amount: '¥68.00', status: 'pending' },
  { id: 'DD202406010002', user: '李大爷', avatar: '李', color: '#00B578', phone: '139****8765', service: '助洁', address: '江北区观音桥街道XX号', time: '明天 09:00', amount: '¥128.00', status: 'dispatched' },
  { id: 'DD202406010003', user: '王奶奶', avatar: '王', color: '#FF8F1A', phone: '137****2345', service: '助医', address: '南岸区南坪街道XX号', time: '今天 15:30', amount: '¥198.00', status: 'serving' },
  { id: 'DD202406010004', user: '赵叔叔', avatar: '赵', color: '#FF4D4F', phone: '136****9876', service: '助浴', address: '沙坪坝区三峡广场XX号', time: '昨天 10:00', amount: '¥88.00', status: 'completed' },
];

export const STAFF_LIST = [
  { id: 1, name: '王小明', avatar: '王', color: '#1989FA', phone: '138****1234', status: 'online', skills: ['助餐', '助洁'], todayTasks: 3, totalTasks: 156 },
  { id: 2, name: '李小红', avatar: '李', color: '#00B578', phone: '139****5678', status: 'busy', skills: ['助医', '助浴'], todayTasks: 5, totalTasks: 289 },
  { id: 3, name: '张大力', avatar: '张', color: '#FF8F1A', phone: '137****9012', status: 'offline', skills: ['助行', '助急'], todayTasks: 0, totalTasks: 98 },
];

export const TASK_LIST = [
  { id: 'DD202406010001', user: '张阿姨', avatar: '张', color: '#1989FA', phone: '138****5678', service: '助餐', address: '渝中区解放碑街道XX号', time: '今天 12:00', amount: '¥68.00', status: 'pending' },
  { id: 'DD202406010003', user: '王奶奶', avatar: '王', color: '#FF8F1A', phone: '137****2345', service: '助医', address: '南岸区南坪街道XX号', time: '今天 15:30', amount: '¥198.00', status: 'serving' },
  { id: 'DD202406010005', user: '刘奶奶', avatar: '刘', color: '#722ED1', phone: '135****3456', service: '助浴', address: '渝北区新南路XX号', time: '昨天 14:00', amount: '¥78.00', status: 'completed' },
];