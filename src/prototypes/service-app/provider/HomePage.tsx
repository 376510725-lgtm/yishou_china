/**
 * 服务商管理端 - 工作台页面
 * 深空暗夜科技风格
 */

import React from 'react';
import {
  HomeOutlined,
  FileTextOutlined,
  TeamOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Card, Tag, Avatar, Button, THEME } from '../shared/components';

interface OrderInfo {
  id: string;
  user: string;
  avatar: string;
  color: string;
  phone: string;
  service: string;
  address: string;
  time: string;
  amount: string;
  status: string;
}

const SERVICE_TYPES = [
  { label: '助餐', icon: '🍽️' },
  { label: '助浴', icon: '🛁' },
  { label: '助洁', icon: '🧹' },
  { label: '助医', icon: '💊' },
  { label: '助急', icon: '🚑' },
  { label: '助行', icon: '🚶' },
];

interface HomePageProps {
  themeColor?: string;
  settleStatus?: 'none' | 'pending' | 'rejected' | 'approved';
  onNavigate: (screen: string) => void;
  onOrderClick: (order: OrderInfo) => void;
  onTabChange?: (tab: string) => void;
  orders?: OrderInfo[];
  stats?: { pending: number; dispatched: number; serving: number; completed: number };
  todayIncome?: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  themeColor = THEME.providerPrimary,
  settleStatus = 'none',
  onNavigate,
  onOrderClick,
  onTabChange,
  orders: propOrders,
  stats: propStats,
  todayIncome = '¥1,268.00',
}) => {
  const orderList = propOrders ?? [];
  const p = propStats || { pending: 3, dispatched: 2, serving: 5, completed: 28 };
  const stats = [
    { label: '待派单', value: p.pending, color: THEME.danger },
    { label: '已派单', value: p.dispatched, color: '#00D4FF' },
    { label: '进行中', value: p.serving, color: THEME.warning },
    { label: '已完成', value: p.completed, color: THEME.success },
  ];

  // 快捷操作
  const quickActions = [
    { icon: <HomeOutlined />, label: '入驻办理', color: themeColor },
    { icon: <FileTextOutlined />, label: '订单管理', color: THEME.providerPrimary },
    { icon: <TeamOutlined />, label: '人员管理', color: THEME.success },
  ];

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
          alignItems: 'center',
          padding: '0 16px',
          zIndex: 10,
          borderBottom: `1px solid ${THEME.borderLight}`,
        }}
      >
        <div style={{ width: 30 }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: THEME.textPrimary,
            }}
          >
            工作台
          </span>
        </div>
        <div
          onClick={() => onNavigate('messages')}
          style={{ position: 'relative', cursor: 'pointer' }}
        >
          <BellOutlined style={{ fontSize: 20, color: THEME.textPrimary }} />
          <div style={{
            position: 'absolute', top: -3, right: -4, width: 8, height: 8,
            borderRadius: '50%', background: THEME.danger
          }} />
        </div>
      </div>

      {/* 内容区域 - 顶部留出标题栏空间，可滚动 */}
      <div
        style={{
          flex: 1,
          padding: '52px 16px 80px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* 顶部状态提示 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 0',
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: THEME.textSecondary,
            }}
          >
            今日订单概览
          </span>
        </div>

        {/* 统计卡片 */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginBottom: 16,
          }}
        >
          {stats.map((stat, index) => (
            <Card
              key={index}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '16px 8px',
                marginBottom: 0,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: stat.color,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: THEME.textSecondary,
                  marginTop: 4,
                }}
              >
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* 快捷操作 */}
        <Card style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: THEME.textPrimary,
              marginBottom: 16,
            }}
          >
            快捷操作
          </div>
          <div
            style={{
              display: 'flex',
              gap: 16,
            }}
          >
            {quickActions.map((action, index) => (
              <div
                key={index}
                onClick={() => {
                  if (index === 0) {
                    onNavigate(settleStatus === 'none' ? 'settle-intro' : 'settle-status');
                  } else if (index === 1) {
                    onTabChange?.('orders');
                    onNavigate('orders');
                  } else {
                    onTabChange?.('staff');
                    onNavigate('staff');
                  }
                }}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {/* 入驻办理右上方审核状态角标 */}
                {index === 0 && settleStatus !== 'none' && (() => {
                  const statusConfig: Record<string, { label: string; color: string }> = {
                    pending: { label: '审核中', color: THEME.warning },
                    rejected: { label: '审核失败', color: THEME.danger },
                    approved: { label: '已通过', color: THEME.success },
                  };
                  const cfg = statusConfig[settleStatus];
                  return (
                    <span
                      style={{
                        position: 'absolute',
                        top: -6,
                        right: -4,
                        fontSize: 10,
                        color: cfg.color,
                        background: `${cfg.color}20`,
                        borderRadius: 4,
                        padding: '2px 5px',
                        lineHeight: '16px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {cfg.label}
                    </span>
                  );
                })()}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: `${action.color}15`,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px',
                    color: action.color,
                    fontSize: 20,
                  }}
                >
                  {action.icon}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: THEME.textSecondary,
                  }}
                >
                  {action.label}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 服务类型 */}
        <Card style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: THEME.textPrimary,
              marginBottom: 16,
            }}
          >
            服务类型
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
            }}
          >
            {SERVICE_TYPES.map((service) => (
              <div
                key={service.label}
                onClick={() => {
                  onTabChange?.('orders');
                  onNavigate('orders');
                }}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: THEME.bgInput,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 6px',
                    fontSize: 22,
                  }}
                >
                  {service.icon}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: THEME.textSecondary,
                  }}
                >
                  {service.label}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 今日收入 */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 13, color: THEME.textSecondary, marginBottom: 4 }}>今日收入</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: themeColor }}>{todayIncome}</div>
            </div>
            <span
              onClick={() => { onTabChange?.('orders'); onNavigate('orders'); }}
              style={{ fontSize: 13, color: themeColor, cursor: 'pointer', paddingBottom: 6 }}
            >
              详情 →
            </span>
          </div>
        </Card>

        {/* 最新订单 */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: THEME.textPrimary, marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span>最新订单</span>
            <span style={{ fontSize: 12, color: themeColor, cursor: 'pointer' }} onClick={() => { onTabChange?.('orders'); onNavigate('orders'); }}>全部 →</span>
          </div>
          {orderList.slice(0, 5).map((order) => (
            <div key={order.id} onClick={() => onOrderClick(order)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
              borderTop: `1px solid ${THEME.borderLight}`, cursor: 'pointer'
            }}>
              <Avatar letter={order.avatar} color={order.color} size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: THEME.textPrimary }}>{order.user} · {order.service}</div>
                <div style={{ fontSize: 12, color: THEME.textMuted }}>{order.time}</div>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: themeColor }}>{order.amount}</span>
            </div>
          ))}
          {orderList.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px 0', color: THEME.textMuted, fontSize: 13 }}>
              暂无订单
            </div>
          )}
        </Card>

      </div>
    </div>
  );
};

export default HomePage;