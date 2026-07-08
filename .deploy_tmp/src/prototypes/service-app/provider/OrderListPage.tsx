/**
 * 服务商管理端 - 订单列表页面
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  RightOutlined,
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
    status: 'dispatched',
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
    id: 'DD202406010004',
    user: '赵叔叔',
    avatar: '赵',
    color: '#EF4444',
    phone: '136****9876',
    service: '助浴',
    address: '沙坪坝区三峡广场XX号',
    time: '昨天 10:00',
    amount: '¥88.00',
    status: 'completed',
  },
];

const FILTER_TABS = [
  { id: 'all', label: '全部' },
  { id: 'pending', label: '待接单' },
  { id: 'dispatched', label: '已派单' },
  { id: 'serving', label: '进行中' },
  { id: 'completed', label: '已完成' },
];

const ORDER_STATUS_MAP: Record<string, string> = {
  pending: '待接单',
  accepted: '已接单',
  dispatched: '已派单',
  serving: '服务中',
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
}

export const OrderListPage: React.FC<OrderListPageProps> = ({
  themeColor = '#00D4FF',
  onBack,
  onOrderClick,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredOrders =
    activeFilter === 'all'
      ? ORDER_LIST
      : ORDER_LIST.filter((o) => o.status === activeFilter);

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

      {/* 筛选 Tab */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: '52px 16px 12px',
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
                padding: '8px 16px',
                borderRadius: 21,
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                background: isActive
                  ? `${themeColor}20`
                  : `${THEME.bgLight}60`,
                color: isActive ? themeColor : THEME.textSecondary,
                border: `1px solid ${isActive ? `${themeColor}50` : `${THEME.borderLight}`}`,
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
        {filteredOrders.map((order) => {
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
                <div style={{ display: 'flex', gap: 8 }}>
                  {order.status === 'pending' && (
                    <Button size="small" themeColor={themeColor}>
                      接单
                    </Button>
                  )}
                  {order.status === 'dispatched' && (
                    <Button size="small" themeColor={themeColor}>
                      派单
                    </Button>
                  )}
                  <Button
                    size="small"
                    type="default"
                    themeColor={themeColor}
                  >
                    详情
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default OrderListPage;