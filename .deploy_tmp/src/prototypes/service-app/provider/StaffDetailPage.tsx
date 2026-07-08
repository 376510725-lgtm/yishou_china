/**
 * 服务商管理端 - 服务人员详情页面
 * 深空暗夜科技风格
 */

import React from 'react';
import { PhoneOutlined } from '@ant-design/icons';
import { Card, Tag, Avatar, Button, NavBar, THEME } from '../shared/components';

interface StaffDetailPageProps {
  themeColor?: string;
  staff: {
    id: number;
    name: string;
    avatar: string;
    color: string;
    phone: string;
    status: string;
    skills: string[];
    todayTasks: number;
    totalTasks: number;
  };
  onBack: () => void;
  onContact: () => void;
}

export const StaffDetailPage: React.FC<StaffDetailPageProps> = ({
  themeColor = '#00D4FF',
  staff,
  onBack,
  onContact,
}) => {
  const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
    online: { label: '在线', color: '#10B981', bg: '#10B98120' },
    busy: { label: '忙碌', color: '#F59E0B', bg: '#F59E0B20' },
    offline: { label: '离线', color: '#64748B', bg: '#64748B20' },
  };

  const statusInfo = STATUS_MAP[staff.status] || STATUS_MAP.offline;

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
            人员详情
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
        {/* 基本信息 */}
        <Card style={{ marginBottom: 12 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 16,
            }}
          >
            <Avatar
              letter={staff.avatar}
              color={staff.color}
              size={72}
            />
            <div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: THEME.textPrimary,
                  marginBottom: 6,
                }}
              >
                {staff.name}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: THEME.textMuted,
                  marginBottom: 8,
                }}
              >
                {staff.phone}
              </div>
              <Tag color={statusInfo.color} bg={statusInfo.bg}>
                {statusInfo.label}
              </Tag>
            </div>
          </div>
          <div
            style={{
              fontSize: 14,
              color: THEME.textSecondary,
            }}
          >
            擅长服务：{staff.skills.join('、')}
          </div>
        </Card>

        {/* 服务统计 */}
        <Card style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: THEME.textPrimary,
              marginBottom: 16,
            }}
          >
            服务统计
          </div>
          <div
            style={{
              display: 'flex',
            }}
          >
            {[
              { label: '累计服务', value: staff.totalTasks },
              { label: '今日服务', value: staff.todayTasks },
              { label: '好评率', value: '98%' },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: themeColor,
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: THEME.textMuted,
                    marginTop: 6,
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 操作按钮 */}
        <div style={{ display: 'flex', gap: 12 }}>
          <Button
            type="default"
            themeColor={themeColor}
            style={{ flex: 1 }}
          >
            移除
          </Button>
          <Button
            onClick={onContact}
            themeColor={themeColor}
            style={{ flex: 1 }}
          >
            <PhoneOutlined style={{ marginRight: 4 }} />
            联系
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailPage;