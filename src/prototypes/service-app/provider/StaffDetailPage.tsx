/**
 * 服务商管理端 - 服务人员详情页面
 * 深空暗夜科技风格
 */

import React from 'react';
import {
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  StarFilled,
  SafetyCertificateOutlined,
  IdcardOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Card, Tag, Avatar, Button, THEME } from '../shared/components';

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
    area?: string;
    experience?: string;
    rating?: number;
    applyTime?: string;
    reviewStatus?: 'pending' | 'approved' | 'rejected';
    monthlyEarnings?: number;
    completedThisMonth?: number;
  };
  onBack: () => void;
  onContact: () => void;
  onRemoveStaff?: () => void;
}

export const StaffDetailPage: React.FC<StaffDetailPageProps> = ({
  themeColor = '#00D4FF',
  staff,
  onBack,
  onContact,
  onRemoveStaff,
}) => {
  const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
    online: { label: '在线', color: '#10B981', bg: '#10B98120' },
    busy: { label: '忙碌', color: '#F59E0B', bg: '#F59E0B20' },
    offline: { label: '离线', color: '#64748B', bg: '#64748B20' },
  };

  const REVIEW_STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
    pending: { label: '待审核', color: '#F59E0B', bg: '#F59E0B20' },
    approved: { label: '已通过', color: '#10B981', bg: '#10B98120' },
    rejected: { label: '已驳回', color: '#EF4444', bg: '#EF444420' },
  };

  const statusInfo = STATUS_MAP[staff.status] || STATUS_MAP.offline;
  const reviewStatusInfo = staff.reviewStatus ? REVIEW_STATUS_MAP[staff.reviewStatus] : null;

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
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Tag color={statusInfo.color} bg={statusInfo.bg}>
                  {statusInfo.label}
                </Tag>
                {reviewStatusInfo && (
                  <Tag color={reviewStatusInfo.color} bg={reviewStatusInfo.bg}>
                    {reviewStatusInfo.label}
                  </Tag>
                )}
              </div>
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

        {/* 注册信息 */}
        <Card style={{ marginBottom: 12 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 14,
            }}
          >
            <IdcardOutlined style={{ fontSize: 16, color: themeColor }} />
            <span style={{ fontSize: 15, fontWeight: 500, color: THEME.textPrimary }}>
              注册信息
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {staff.area && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 60, fontSize: 12, color: THEME.textMuted, flexShrink: 0 }}>
                  服务区域
                </div>
                <div style={{ fontSize: 13, color: THEME.textPrimary }}>
                  <EnvironmentOutlined style={{ marginRight: 4, color: themeColor }} />
                  {staff.area}
                </div>
              </div>
            )}
            {staff.experience && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 60, fontSize: 12, color: THEME.textMuted, flexShrink: 0 }}>
                  服务经验
                </div>
                <div style={{ fontSize: 13, color: THEME.textPrimary }}>
                  <TeamOutlined style={{ marginRight: 4, color: themeColor }} />
                  {staff.experience}
                </div>
              </div>
            )}
            {staff.rating != null && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 60, fontSize: 12, color: THEME.textMuted, flexShrink: 0 }}>
                  评分
                </div>
                <div style={{ fontSize: 13, color: '#F59E0B' }}>
                  <StarFilled style={{ marginRight: 4 }} />
                  {staff.rating.toFixed(1)}
                </div>
              </div>
            )}
            {staff.applyTime && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 60, fontSize: 12, color: THEME.textMuted, flexShrink: 0 }}>
                  注册时间
                </div>
                <div style={{ fontSize: 13, color: THEME.textPrimary }}>
                  <CalendarOutlined style={{ marginRight: 4, color: themeColor }} />
                  {staff.applyTime}
                </div>
              </div>
            )}
            {staff.reviewStatus && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 60, fontSize: 12, color: THEME.textMuted, flexShrink: 0 }}>
                  审核状态
                </div>
                <div style={{ fontSize: 13, color: reviewStatusInfo?.color }}>
                  <SafetyCertificateOutlined style={{ marginRight: 4 }} />
                  {reviewStatusInfo?.label}
                </div>
              </div>
            )}
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
              { label: '好评率', value: staff.rating != null ? `${(staff.rating * 20).toFixed(0)}%` : '98%' },
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
          {staff.monthlyEarnings != null && staff.completedThisMonth != null && (
            <div
              style={{
                display: 'flex',
                marginTop: 16,
                paddingTop: 14,
                borderTop: `1px solid ${THEME.borderLight}`,
              }}
            >
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#F59E0B' }}>
                  ¥{staff.monthlyEarnings?.toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: THEME.textMuted, marginTop: 4 }}>
                  本月收入
                </div>
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: themeColor }}>
                  {staff.completedThisMonth}
                </div>
                <div style={{ fontSize: 12, color: THEME.textMuted, marginTop: 4 }}>
                  本月完成
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* 操作按钮 */}
        <div style={{ display: 'flex', gap: 12, paddingBottom: 20 }}>
          <Button
            type="default"
            themeColor={themeColor}
            style={{ flex: 1, color: THEME.danger }}
            onClick={onRemoveStaff}
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