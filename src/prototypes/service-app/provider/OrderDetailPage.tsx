/**
 * 服务商管理端 - 订单详情页面
 * 深空暗夜科技风格
 */

import React from 'react';
import {
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Card, Tag, Avatar, Button, NavBar, THEME } from '../shared/components';

interface AssignedStaff {
  name: string;
  avatar: string;
  color: string;
  phone: string;
  skills: string[];
}

interface OrderDetailPageProps {
  themeColor?: string;
  order: {
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
    assignedStaff?: AssignedStaff;
  };
  onBack: () => void;
  onDispatch?: () => void;
  onAccept?: () => void;
  onCancel?: () => void;
  onStaffClick?: (staff: AssignedStaff) => void;
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({
  themeColor = '#00D4FF',
  order,
  onBack,
  onDispatch,
  onAccept,
  onCancel,
  onStaffClick,
}) => {
  const STATUS_MAP: Record<string, string> = {
    pending: '待派单',
    accepted: '已接单',
    dispatched: '已派单',
    serving: '进行中',
    completed: '已完成',
    cancelled: '已取消',
  };

  return (
    <div
      style={{
        flex: 1,
        background: THEME.bgDark,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* 固定标题栏 */}
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
        <button
          onClick={onBack}
          style={{
            border: 'none',
            background: 'transparent',
            color: themeColor,
            fontSize: 18,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
          }}
        >
          ←
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: THEME.textPrimary }}>
            订单详情
          </span>
        </div>
        <div style={{ width: 30 }} />
      </div>

      <div
        style={{
          flex: 1,
          padding: '64px 16px 32px',
          overflow: 'auto',
        }}
      >
        {/* 订单基本信息 */}
        <Card style={{ marginBottom: 12 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: THEME.textSecondary,
              }}
            >
              订单编号
            </div>
            <div
              style={{
                fontSize: 14,
                color: THEME.textPrimary,
              }}
            >
              {order.id}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              paddingTop: 16,
              borderTop: `1px solid ${THEME.borderLight}`,
            }}
          >
            <Avatar letter={order.avatar} color={order.color} size={52} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: THEME.textPrimary,
                }}
              >
                {order.user}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: THEME.textMuted,
                  marginTop: 4,
                }}
              >
                {order.phone}
              </div>
            </div>
            <Button
              size="small"
              themeColor={themeColor}
              style={{ width: 44, padding: 0 }}
              onClick={() => window.open(`tel:${order.phone.replace(/\*/g, '0')}`)}
            >
              <PhoneOutlined />
            </Button>
          </div>
        </Card>

        {/* 服务信息 */}
        <Card style={{ marginBottom: 12 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: THEME.textPrimary,
              marginBottom: 16,
            }}
          >
            服务信息
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                color: THEME.textSecondary,
              }}
            >
              <Tag>{order.service}</Tag> {order.time}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                color: THEME.textSecondary,
              }}
            >
              <EnvironmentOutlined style={{ marginRight: 4 }} />
              {order.address}
            </div>
            <div
              style={{
                fontSize: 14,
                color: THEME.textMuted,
              }}
            >
              服务备注：无特殊要求
            </div>
          </div>
        </Card>

        {/* 接单人员信息 - 已派单/进行中/已完成 */}
        {(order.status === 'dispatched' || order.status === 'serving' || order.status === 'completed') && order.assignedStaff && (
          <Card
            glow
            themeColor={themeColor}
            style={{ marginBottom: 12, cursor: 'pointer' }}
            onClick={onStaffClick ? () => onStaffClick(order.assignedStaff!) : undefined}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: THEME.textPrimary,
                marginBottom: 16,
              }}
            >
              接单人员
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <Avatar letter={order.assignedStaff.avatar} color={order.assignedStaff.color} size={48} />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: THEME.textPrimary,
                    marginBottom: 4,
                  }}
                >
                  {order.assignedStaff.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: THEME.textMuted,
                    marginBottom: 6,
                  }}
                >
                  {order.assignedStaff.phone}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {order.assignedStaff.skills.map((skill) => (
                    <Tag key={skill} color={themeColor} bg={`${themeColor}15`}>
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* 费用信息 */}
        <Card style={{ marginBottom: 24 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: THEME.textSecondary,
              }}
            >
              订单金额
            </span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: themeColor,
              }}
            >
              {order.amount}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: THEME.textSecondary,
              }}
            >
              支付状态
            </span>
            <Tag color={THEME.success} bg={`${THEME.success}20`}>
              已支付
            </Tag>
          </div>
        </Card>

        {/* 操作日志时间线 */}
        {order.status !== 'pending' && (
          <Card style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: THEME.textPrimary, marginBottom: 16 }}>操作日志</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { time: order.time, action: '订单创建', color: THEME.textMuted },
                { time: '今天 10:30', action: '服务商接单', color: themeColor },
                ...(order.status === 'dispatched' || order.status === 'serving' || order.status === 'completed' ? [{ time: '今天 10:35', action: '已派单给服务人员', color: THEME.success }] : []),
                ...(order.status === 'serving' || order.status === 'completed' ? [{ time: '今天 12:05', action: '服务人员开始服务', color: THEME.warning }] : []),
                ...(order.status === 'completed' ? [{ time: '今天 14:00', action: '服务完成打卡', color: THEME.success }] : []),
                ...(order.status === 'cancelled' ? [{
                  time: (order as any).cancelTime || '今天 11:20',
                  action: (order as any).cancelReason || '订单已取消',
                  color: THEME.danger,
                }] : []),
              ].map((log, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, paddingBottom: 14, position: 'relative' }}>
                  <div style={{ width: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: log.color, flexShrink: 0, marginTop: 4 }} />
                    {i < 3 && <div style={{ flex: 1, width: 1, background: THEME.borderLight, marginTop: 4 }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: THEME.textPrimary }}>{log.action}</div>
                    <div style={{ fontSize: 11, color: THEME.textMuted }}>{log.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 操作按钮 */}
        <div style={{ display: 'flex', gap: 12 }}>
          {order.status === 'pending' && onDispatch && (
            <Button
              onClick={onDispatch}
              themeColor={themeColor}
              style={{ flex: 1 }}
            >
              派 单
            </Button>
          )}
          {(order.status === 'dispatched' || order.status === 'serving') && onDispatch && (
            <Button
              onClick={onDispatch}
              themeColor={themeColor}
              style={{ flex: 1 }}
            >
              修改派单
            </Button>
          )}
          {['pending', 'accepted', 'dispatched'].includes(order.status) && onCancel && (
            <Button
              onClick={onCancel}
              type="default"
              themeColor={THEME.danger}
              style={{ flex: 1 }}
            >
              取消订单
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;