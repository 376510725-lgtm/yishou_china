/**
 * 服务商管理端 - 订单列表页面
 * 深空暗夜科技风格
 */

import React, { useState, useMemo } from 'react';
import {
  EnvironmentOutlined,
  SearchOutlined,
  DownOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { Card, Tag, Avatar, Button, THEME } from '../shared/components';

// 模拟数据
const ORDER_LIST = [
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

const FILTER_TABS = [
  { id: 'all', label: '全部' },
  { id: 'pending', label: '待派单' },
  { id: 'dispatched', label: '已派单' },
  { id: 'serving', label: '进行中' },
  { id: 'completed', label: '已完成' },
];

const SERVICE_TYPES = ['全部', '助餐', '助洁', '助医', '助浴', '助行', '助急'];

const DATE_PRESETS = [
  { id: 'all', label: '全部时间' },
  { id: 'today', label: '今天' },
  { id: 'week', label: '近7天' },
  { id: 'month', label: '近30天' },
  { id: 'custom', label: '自定义' },
];

const isInDateRange = (dateStr: string | undefined, filter: string, customStart?: string, customEnd?: string): boolean => {
  if (filter === 'all' || !dateStr) return true;
  if (filter === 'custom') {
    if (!customStart && !customEnd) return true;
    const orderTime = new Date(dateStr).getTime();
    if (customStart && orderTime < new Date(customStart).getTime()) return false;
    if (customEnd && orderTime > new Date(customEnd + 'T23:59:59').getTime()) return false;
    return true;
  }
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const orderDate = new Date(date);
  orderDate.setHours(0, 0, 0, 0);
  const diff = today.getTime() - orderDate.getTime();
  const days = diff / 86400000;
  switch (filter) {
    case 'today': return days === 0;
    case 'week': return days >= 0 && days < 7;
    case 'month': return days >= 0 && days < 30;
    default: return true;
  }
};

const ORDER_STATUS_MAP: Record<string, string> = {
  pending: '待派单',
  accepted: '已接单',
  dispatched: '已派单',
  serving: '进行中',
  completed: '已完成',
  cancelled: '已取消',
};

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  pending: { color: '#EF4444', bg: '#EF444420' },
  dispatched: { color: '#F59E0B', bg: '#F59E0B20' },
  serving: { color: '#F59E0B', bg: '#F59E0B20' },
  completed: { color: '#10B981', bg: '#10B98120' },
};

interface OrderListPageProps {
  themeColor?: string;
  onBack: () => void;
  onOrderClick: (order: typeof ORDER_LIST[0]) => void;
  onDispatch: (order: typeof ORDER_LIST[0]) => void;
  onCancel?: (order: typeof ORDER_LIST[0]) => void;
  orders?: typeof ORDER_LIST;
}

export const OrderListPage: React.FC<OrderListPageProps> = ({
  themeColor = '#00D4FF',
  onBack,
  onOrderClick,
  onDispatch,
  onCancel,
  orders: propOrders,
}) => {
  const orders = propOrders ?? ORDER_LIST;
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [serviceFilter, setServiceFilter] = useState<string[]>([]);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('all');
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  // 当前选中日期标签文案
  const dateLabel = dateFilter === 'custom'
    ? (customStart || customEnd ? `${customStart || '不限'} ~ ${customEnd || '不限'}` : '自定义')
    : DATE_PRESETS.find(d => d.id === dateFilter)?.label || '全部时间';

  const filteredOrders = useMemo(() => {
    let result = orders;

    // 状态筛选
    if (activeFilter !== 'all') {
      result = result.filter((o) => o.status === activeFilter);
    }

    // 服务类型筛选（多选）
    if (serviceFilter.length > 0) {
      result = result.filter((o) => serviceFilter.includes(o.service));
    }

    // 日期筛选
    result = result.filter((o) => isInDateRange(o.date, dateFilter, customStart, customEnd));

    // 关键词搜索
    if (searchText.trim()) {
      const kw = searchText.trim().toLowerCase();
      result = result.filter(
        (o) =>
          o.user.toLowerCase().includes(kw) ||
          o.phone.includes(kw) ||
          o.address.toLowerCase().includes(kw) ||
          o.id.toLowerCase().includes(kw)
      );
    }

    return result;
  }, [orders, activeFilter, serviceFilter, searchText, dateFilter, customStart, customEnd]);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* 固定标题栏 - 始终固定在顶部 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 44,
          background: `linear-gradient(180deg, ${THEME.bgDark} 0%, ${THEME.bgDark}CC 100%)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
          borderBottom: `1px solid ${THEME.borderLight}`,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: THEME.textPrimary,
          }}
        >
          订单
        </span>
      </div>

      {/* 搜索栏 */}
      <div style={{ padding: '52px 16px 10px', flexShrink: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: THEME.bgInput,
            borderRadius: 10,
            padding: '10px 14px',
            border: `1px solid ${THEME.borderLight}`,
          }}
        >
          <SearchOutlined style={{ color: THEME.textMuted, fontSize: 16 }} />
          <input
            type="text"
            placeholder="搜索名称/电话/地址/订单编号"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: THEME.textPrimary,
              fontSize: 14,
            }}
          />
          {searchText && (
            <span onClick={() => setSearchText('')} style={{ color: THEME.textMuted, cursor: 'pointer', fontSize: 14, padding: '0 4px' }}>
              ✕
            </span>
          )}
          {/* 筛选切换按钮 */}
          <div
            onClick={(e) => { e.stopPropagation(); setFilterPanelOpen(!filterPanelOpen); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px 10px',
              borderRadius: 6,
              cursor: 'pointer',
              background: (serviceFilter.length > 0 || dateFilter !== 'all')
                ? `${themeColor}18`
                : 'transparent',
              color: (serviceFilter.length > 0 || dateFilter !== 'all')
                ? themeColor
                : THEME.textMuted,
              border: `1px solid ${(serviceFilter.length > 0 || dateFilter !== 'all') ? `${themeColor}30` : 'transparent'}`,
              transition: 'all 0.2s ease',
            }}
          >
            <FilterOutlined style={{ fontSize: 13 }} />
            <span style={{ fontSize: 12 }}>筛选</span>
            {(serviceFilter.length > 0 || dateFilter !== 'all') && (
              <span style={{ fontSize: 10, background: themeColor, color: '#fff', borderRadius: 10, minWidth: 16, height: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>
                {[serviceFilter.length > 0, dateFilter !== 'all'].filter(Boolean).length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 筛选面板 */}
      {filterPanelOpen && (
        <div style={{ padding: '0 16px 10px', flexShrink: 0 }}>
          <Card style={{ marginBottom: 0, padding: '14px 16px' }}>
            {/* 服务类型 */}
            <div style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 8 }}>服务类型（可多选）</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
              {SERVICE_TYPES.filter(t => t !== '全部').map((type) => {
                const isActive = serviceFilter.includes(type);
                return (
                  <div
                    key={type}
                    onClick={() => {
                      setServiceFilter(prev =>
                        prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
                      );
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 16,
                      fontSize: 12,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      background: isActive ? `${themeColor}20` : THEME.bgInput,
                      color: isActive ? themeColor : THEME.textSecondary,
                      border: `1px solid ${isActive ? `${themeColor}40` : THEME.borderLight}`,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {type}
                    {isActive && <span style={{ fontSize: 10 }}>✓</span>}
                  </div>
                );
              })}
            </div>

            {/* 日期范围 */}
            <div style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 8 }}>日期范围</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
              {DATE_PRESETS.map((item) => {
                const isActive = dateFilter === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => { setDateFilter(item.id); if (item.id !== 'custom') { setCustomStart(''); setCustomEnd(''); } }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 16,
                      fontSize: 12,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      background: isActive ? `${themeColor}20` : THEME.bgInput,
                      color: isActive ? themeColor : THEME.textSecondary,
                      border: `1px solid ${isActive ? `${themeColor}40` : THEME.borderLight}`,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>

            {/* 自定义日期范围 */}
            {dateFilter === 'custom' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    borderRadius: 8,
                    background: THEME.bgInput,
                    border: `1px solid ${THEME.borderLight}`,
                    color: THEME.textPrimary,
                    fontSize: 13,
                    outline: 'none',
                  }}
                />
                <span style={{ color: THEME.textMuted, fontSize: 13 }}>至</span>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    borderRadius: 8,
                    background: THEME.bgInput,
                    border: `1px solid ${THEME.borderLight}`,
                    color: THEME.textPrimary,
                    fontSize: 13,
                    outline: 'none',
                  }}
                />
              </div>
            )}

            {/* 重置按钮 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <div
                onClick={() => {
                  setServiceFilter([]);
                  setDateFilter('all');
                  setCustomStart('');
                  setCustomEnd('');
                }}
                style={{
                  padding: '6px 16px',
                  borderRadius: 6,
                  fontSize: 12,
                  cursor: 'pointer',
                  color: THEME.textMuted,
                  background: THEME.bgInput,
                  border: `1px solid ${THEME.borderLight}`,
                }}
              >
                重置筛选
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 状态筛选 Tab */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: '0 16px 12px',
          overflowX: 'auto',
          flexShrink: 0,
        }}
      >
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 16,
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                background: isActive
                  ? `${themeColor}20`
                  : THEME.bgCard,
                color: isActive ? themeColor : THEME.textSecondary,
                border: `1px solid ${isActive ? `${themeColor}40` : THEME.borderLight}`,
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </div>
          );
        })}
      </div>

      {/* 订单列表 */}
      <div
        style={{
          flex: 1,
          padding: '0 16px 80px',
          overflow: 'auto',
        }}
      >
        {filteredOrders.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 80,
            }}
          >
            <div
              style={{
                fontSize: 48,
                color: THEME.textMuted,
                opacity: 0.3,
                marginBottom: 16,
              }}
            >
              📋
            </div>
            <div
              style={{
                fontSize: 15,
                color: THEME.textMuted,
              }}
            >
              暂无匹配的订单
            </div>
          </div>
        ) : (
          filteredOrders.map((order) => {
          const statusStyle = STATUS_COLORS[order.status] || {
            color: themeColor,
            bg: `${themeColor}20`,
          };
          return (
            <Card
              key={order.id}
              onClick={() => onOrderClick(order)}
              style={{ marginBottom: 12 }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <Avatar
                    letter={order.avatar}
                    color={order.color}
                    size={44}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: THEME.textPrimary,
                      }}
                    >
                      {order.user}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: THEME.textMuted,
                      }}
                    >
                      {order.phone}
                    </div>
                  </div>
                </div>
                <Tag color={statusStyle.color} bg={statusStyle.bg}>
                  {ORDER_STATUS_MAP[order.status]}
                </Tag>
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: THEME.textSecondary,
                  marginBottom: 12,
                }}
              >
                <div style={{ marginBottom: 6 }}>
                  <Tag>{order.service}</Tag> {order.time}
                </div>
                <div>
                  <EnvironmentOutlined style={{ marginRight: 4 }} />
                  {order.address}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 12,
                  borderTop: `1px solid ${THEME.borderLight}`,
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: themeColor,
                  }}
                >
                  {order.amount}
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  {order.status === 'pending' && (
                    <Button
                      size="small"
                      block={false}
                      themeColor={themeColor}
                      onClick={() => onDispatch(order)}
                    >
                      派单
                    </Button>
                  )}
                  <Button
                    size="small"
                    block={false}
                    type="default"
                    themeColor={themeColor}
                  >
                    详情
                  </Button>
                </div>
              </div>
            </Card>
          );
        })
        )}
      </div>
    </div>
  );
};

export default OrderListPage;