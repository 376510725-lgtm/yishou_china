/**
 * 服务商管理端 - 派单选择页面
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import {
  EnvironmentOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Card, Tag, Avatar, Button, NavBar, THEME } from '../shared/components';

// 可派单人员接口
interface StaffInfo {
  id: number;
  name: string;
  avatar: string;
  color: string;
  phone: string;
  status: string;
  skills: string[];
  todayTasks: number;
  totalTasks: number;
}

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  online: { label: '在线', color: '#10B981', bg: '#10B98120' },
  busy: { label: '忙碌', color: '#F59E0B', bg: '#F59E0B20' },
  offline: { label: '离线', color: '#64748B', bg: '#64748B20' },
};

interface OrderInfo {
  id: string;
  user: string;
  avatar: string;
  color: string;
  service: string;
  address: string;
  time: string;
  amount: string;
  status?: string;
  assignedStaff?: {
    name: string;
    avatar: string;
    color: string;
  };
}

interface DispatchPageProps {
  themeColor?: string;
  order: OrderInfo;
  staffList?: StaffInfo[];
  onBack: () => void;
  onDispatch: (staff: StaffInfo) => void;
}

export const DispatchPage: React.FC<DispatchPageProps> = ({
  themeColor = '#00D4FF',
  order,
  staffList,
  onBack,
  onDispatch,
}) => {
  const availableStaff = staffList ?? [];
  const [selectedStaff, setSelectedStaff] = useState<StaffInfo | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSelect = (staff: StaffInfo) => {
    if (confirmed) return;
    setSelectedStaff(staff.id === selectedStaff?.id ? null : staff);
  };

  const handleDispatch = () => {
    if (!selectedStaff || confirmed) return;
    setConfirmed(true);
    setTimeout(() => {
      onDispatch(selectedStaff);
    }, 800);
  };

  // 筛选可派单的人员（在线和忙碌）
  const dispatchableStaff = availableStaff.filter(
    (s) => s.status === 'online' || s.status === 'busy'
  );

  if (confirmed && selectedStaff) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
        }}
      >
        {/* 成功动画效果 */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${themeColor}30 0%, ${themeColor}10 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            border: `2px solid ${themeColor}40`,
            boxShadow: `0 0 30px ${themeColor}40`,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        >
          <CheckCircleOutlined style={{ fontSize: 40, color: themeColor }} />
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: THEME.textPrimary,
            marginBottom: 8,
          }}
        >
          派单成功
        </div>
        <div
          style={{
            fontSize: 14,
            color: THEME.textSecondary,
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          已派单给 <span style={{ color: themeColor, fontWeight: 600 }}>{selectedStaff.name}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
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
            {order.status === 'dispatched' || order.status === 'serving' ? '修改派单人员' : '选择服务人员'}
          </span>
        </div>
        <div style={{ width: 30 }} />
      </div>

      <div
        style={{
          flex: 1,
          padding: '56px 16px 100px',
          overflow: 'auto',
        }}
      >
        {/* 订单摘要卡片 */}
        <Card
          glow
          themeColor={themeColor}
          style={{ marginBottom: 8 }}
        >
          <div
            style={{
              fontSize: 13,
              color: THEME.textMuted,
              marginBottom: 12,
            }}
          >
            {order.status === 'dispatched' || order.status === 'serving' ? '修改派单 - 当前订单' : '待派单订单'}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 10,
            }}
          >
            <Avatar letter={order.avatar} color={order.color} size={40} />
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
                  marginTop: 2,
                }}
              >
                ID: {order.id}
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 12,
              fontSize: 13,
              color: THEME.textSecondary,
              flexWrap: 'wrap',
              paddingTop: 10,
              borderTop: `1px solid ${THEME.borderLight}`,
            }}
          >
            <Tag>{order.service}</Tag>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <EnvironmentOutlined style={{ fontSize: 12 }} />
              {order.address}
            </span>
            <span>{order.time}</span>
            <span style={{ color: themeColor, fontWeight: 600 }}>{order.amount}</span>
          </div>
        </Card>

        {/* 当前已派单人员（修改模式） */}
        {(order.status === 'dispatched' || order.status === 'serving') && order.assignedStaff && (
          <Card style={{ marginBottom: 8, background: `${themeColor}08` }}>
            <div
              style={{
                fontSize: 12,
                color: THEME.textMuted,
                marginBottom: 8,
              }}
            >
              当前接单人员
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Avatar letter={order.assignedStaff.avatar} color={order.assignedStaff.color} size={36} />
              <span style={{ fontSize: 14, color: THEME.textPrimary, fontWeight: 500 }}>
                {order.assignedStaff.name}
              </span>
            </div>
          </Card>
        )}

        {/* 提示文字 */}
        <div
          style={{
            fontSize: 13,
            color: THEME.textMuted,
            padding: '8px 4px 4px',
          }}
        >
          请选择合适的服务人员（共 {dispatchableStaff.length} 人在线/忙碌）
        </div>

        {/* 人员列表 */}
        {dispatchableStaff.map((staff) => {
          const statusInfo = STATUS_MAP[staff.status];
          const isSelected = selectedStaff?.id === staff.id;
          const isBusy = staff.status === 'busy';

          return (
            <Card
              key={staff.id}
              glow={isSelected}
              themeColor={themeColor}
              onClick={() => handleSelect(staff)}
              style={{
                marginBottom: 12,
                border: isSelected
                  ? `1.5px solid ${themeColor}`
                  : `1px solid ${THEME.borderLight}`,
                background: isSelected
                  ? `linear-gradient(145deg, ${themeColor}12 0%, ${themeColor}06 100%)`
                  : 'rgba(255, 255, 255, 0.06)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                {/* 选择指示器 */}
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? themeColor : THEME.borderMedium}`,
                    background: isSelected ? themeColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                    opacity: isBusy ? 0.5 : 1,
                  }}
                >
                  {isSelected && (
                    <CheckCircleOutlined style={{ fontSize: 12, color: '#fff' }} />
                  )}
                </div>

                <Avatar letter={staff.avatar} color={staff.color} size={48} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: THEME.textPrimary,
                      }}
                    >
                      {staff.name}
                    </span>
                    <Tag color={statusInfo.color} bg={statusInfo.bg}>
                      {statusInfo.label}
                    </Tag>
                    {staff.skills.includes(order.service) && (
                      <Tag color={themeColor} bg={`${themeColor}15`}>
                        擅长{order.service}
                      </Tag>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: THEME.textSecondary,
                      marginBottom: 4,
                    }}
                  >
                    擅长：{staff.skills.join('、')}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: THEME.textMuted,
                    }}
                  >
                    今日 {staff.todayTasks} 单 | 累计 {staff.totalTasks} 单
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 固定在底部的确认按钮 */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 16px 24px',
          background: `linear-gradient(180deg, transparent 0%, ${THEME.bgDark} 40%, ${THEME.bgDark} 100%)`,
          zIndex: 10,
        }}
      >
        <Button
          onClick={handleDispatch}
          disabled={!selectedStaff}
          themeColor={themeColor}
          size="large"
        >
          {selectedStaff
            ? `确认派单给 ${selectedStaff.name}`
            : '请选择一位服务人员'}
        </Button>
      </div>
    </div>
  );
};

export default DispatchPage;
