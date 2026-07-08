/**
 * 服务商管理端 - 人员列表页面
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import { UserAddOutlined, RightOutlined, SearchOutlined, DeleteOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Card, Tag, Avatar, Button, THEME } from '../shared/components';

interface StaffData {
  id: number;
  name: string;
  avatar: string;
  color: string;
  phone: string;
  status: 'online' | 'busy' | 'offline';
  skills: string[];
  todayTasks: number;
  totalTasks: number;
  reviewStatus?: 'pending' | 'approved' | 'rejected';
}

const FILTER_TABS = [
  { id: 'all', label: '全部' },
  { id: 'online', label: '在线' },
  { id: 'busy', label: '忙碌' },
  { id: 'offline', label: '离线' },
];

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  online: { label: '在线', color: '#10B981', bg: '#10B98120' },
  busy: { label: '忙碌', color: '#F59E0B', bg: '#F59E0B20' },
  offline: { label: '离线', color: '#64748B', bg: '#64748B20' },
};

interface StaffListPageProps {
  themeColor?: string;
  staffs?: StaffData[];
  onBack: () => void;
  onStaffClick: (staff: StaffData) => void;
  onAddStaff: () => void;
  onRemoveStaff?: (staff: StaffData) => void;
  onReview?: () => void;
}

export const StaffListPage: React.FC<StaffListPageProps> = ({
  themeColor = '#00D4FF',
  staffs: propStaffs,
  onBack,
  onStaffClick,
  onAddStaff,
  onRemoveStaff,
  onReview,
}) => {
  const staffList = (propStaffs ?? []).filter(s => s.reviewStatus !== 'pending');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  const filteredStaff = (activeFilter === 'all'
    ? staffList
    : staffList.filter((s) => s.status === activeFilter))
    .filter(s => !searchText || s.name.includes(searchText) || s.skills.some(sk => sk.includes(searchText)));

  const pendingCount = (propStaffs ?? []).filter(s => s.reviewStatus === 'pending').length;

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
          人员管理
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
                  : THEME.bgCard,
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

      {/* 搜索框 */}
      <div style={{ padding: '0 16px 10px', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', background: THEME.bgInput,
          borderRadius: 10, padding: '10px 14px', border: `1px solid ${THEME.borderLight}`,
          gap: 8,
        }}>
          <SearchOutlined style={{ color: THEME.textMuted, fontSize: 16 }} />
          <input
            placeholder="搜索人员姓名/技能..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'transparent', color: THEME.textPrimary, fontSize: 14, outline: 'none' }}
          />
          {searchText && <span onClick={() => setSearchText('')} style={{ color: THEME.textMuted, cursor: 'pointer', fontSize: 16 }}>✕</span>}
        </div>
      </div>

      {/* 人员列表 */}
      <div
        style={{
          flex: 1,
          padding: '0 16px 80px',
          overflow: 'auto',
        }}
      >
        {/* 统计卡片 */}
        <Card style={{ marginBottom: 16 }}>
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
                fontSize: 15,
                fontWeight: 600,
                color: THEME.textPrimary,
              }}
            >
              服务人员
            </div>
            <Button
              size="small"
              onClick={onAddStaff}
              themeColor={themeColor}
              style={{ width: 'auto', padding: '0 12px' }}
            >
              <UserAddOutlined style={{ marginRight: 4 }} /> 添加
            </Button>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: THEME.textMuted }}>
            <span>在线 {staffList.filter(s => s.status === 'online').length}</span>
            <span>忙碌 {staffList.filter(s => s.status === 'busy').length}</span>
            <span>离线 {staffList.filter(s => s.status === 'offline').length}</span>
          </div>
        </Card>

        {/* 人员审核入口 */}
        {onReview && (
          <Card
            style={{ marginBottom: 16, cursor: 'pointer' }}
            onClick={onReview}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${themeColor}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <SafetyCertificateOutlined style={{ fontSize: 22, color: themeColor }} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: THEME.textPrimary,
                    marginBottom: 2,
                  }}
                >
                  人员审核
                </div>
                <div style={{ fontSize: 12, color: THEME.textMuted }}>
                  {pendingCount > 0
                    ? `${pendingCount} 名人员待审核`
                    : '暂无待审核人员'}
                </div>
              </div>
              {pendingCount > 0 && (
                <div
                  style={{
                    minWidth: 24,
                    height: 24,
                    borderRadius: 12,
                    background: THEME.danger,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#fff',
                    padding: '0 6px',
                  }}
                >
                  {pendingCount}
                </div>
              )}
              <RightOutlined style={{ color: THEME.textMuted, fontSize: 14 }} />
            </div>
          </Card>
        )}

        {/* 人员卡片 */}
        {filteredStaff.map((staff) => {
          const statusInfo = STATUS_MAP[staff.status];
          return (
            <Card
              key={staff.id}
              style={{ marginBottom: 12 }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div onClick={() => onStaffClick(staff)} style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, cursor: 'pointer' }}>
                  <Avatar
                    letter={staff.avatar}
                    color={staff.color}
                    size={52}
                  />
                  <div style={{ flex: 1 }}>
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
                          fontSize: 16,
                          fontWeight: 500,
                          color: THEME.textPrimary,
                        }}
                      >
                        {staff.name}
                      </span>
                      <Tag
                        color={statusInfo.color}
                        bg={statusInfo.bg}
                      >
                        {statusInfo.label}
                      </Tag>
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
                      今日 {staff.todayTasks} 单 | 共 {staff.totalTasks} 单
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <RightOutlined
                    style={{ color: THEME.textMuted, fontSize: 14, cursor: 'pointer' }}
                    onClick={() => onStaffClick(staff)}
                  />
                  <DeleteOutlined
                    style={{ color: THEME.danger, fontSize: 14, cursor: 'pointer', opacity: 0.6 }}
                    onClick={(e) => { e.stopPropagation(); onRemoveStaff?.(staff); }}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StaffListPage;