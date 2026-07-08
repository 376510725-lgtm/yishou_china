/**
 * 服务商管理端 - 人员列表页面
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import { UserAddOutlined, RightOutlined } from '@ant-design/icons';
import { Card, Tag, Avatar, Button, THEME } from '../shared/components';

// 模拟数据
const STAFF_LIST = [
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
  },
  {
    id: 3,
    name: '张大力',
    avatar: '张',
    color: '#F59E0B',
    phone: '137****9012',
    status: 'offline',
    skills: ['助行', '助急'],
    todayTasks: 0,
    totalTasks: 98,
  },
];

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
  onBack: () => void;
  onStaffClick: (staff: typeof STAFF_LIST[0]) => void;
  onAddStaff: () => void;
}

export const StaffListPage: React.FC<StaffListPageProps> = ({
  themeColor = '#00D4FF',
  onBack,
  onStaffClick,
  onAddStaff,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredStaff =
    activeFilter === 'all'
      ? STAFF_LIST
      : STAFF_LIST.filter((s) => s.status === activeFilter);

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

      {/* 人员列表 */}
      <div
        style={{
          flex: 1,
          padding: '0 16px 16px',
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
        </Card>

        {/* 人员卡片 */}
        {filteredStaff.map((staff) => {
          const statusInfo = STATUS_MAP[staff.status];
          return (
            <Card
              key={staff.id}
              onClick={() => onStaffClick(staff)}
              style={{ marginBottom: 12 }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
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
                <RightOutlined
                  style={{ color: THEME.textMuted, fontSize: 14 }}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StaffListPage;