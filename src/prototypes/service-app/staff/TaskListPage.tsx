/**
 * 服务人员端 - 任务列表页面
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import {
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Card, Tag, Avatar, Button, THEME } from '../shared/components';

// 模拟数据
const TASK_LIST = [
  {
    id: 'DD202406010001',
    user: '张阿姨',
    avatar: '张',
    color: '#A855F7',
    phone: '138****5678',
    service: '助餐',
    address: '渝中区解放碑街道XX号',
    time: '今天 12:00',
    amount: '¥68.00',
    status: 'pending',
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
    id: 'DD202406010005',
    user: '刘奶奶',
    avatar: '刘',
    color: '#7C3AED',
    phone: '135****3456',
    service: '助浴',
    address: '渝北区新南路XX号',
    time: '昨天 14:00',
    amount: '¥78.00',
    status: 'completed',
  },
];

const FILTER_TABS = [
  { id: 'all', label: '全部' },
  { id: 'pending', label: '待接单' },
  { id: 'serving', label: '进行中' },
  { id: 'completed', label: '已完成' },
];

const STATUS_MAP: Record<string, string> = {
  pending: '待接单',
  accepted: '已接单',
  serving: '服务中',
  completed: '已完成',
};

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  pending: { color: '#EF4444', bg: '#EF444420' },
  serving: { color: '#F59E0B', bg: '#F59E0B20' },
  completed: { color: '#10B981', bg: '#10B98120' },
};

interface TaskListPageProps {
  themeColor?: string;
  onTaskClick: (task: typeof TASK_LIST[0]) => void;
  onCheckin: (task: typeof TASK_LIST[0]) => void;
}

export const TaskListPage: React.FC<TaskListPageProps> = ({
  themeColor = '#A855F7',
  onTaskClick,
  onCheckin,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTasks =
    activeFilter === 'all'
      ? TASK_LIST
      : TASK_LIST.filter((t) => t.status === activeFilter);

  // 统计数据
  const stats = [
    { label: '今日任务', value: 2 },
    { label: '进行中', value: 1 },
    { label: '已完成', value: 12 },
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
          任务
        </span>
      </div>

      {/* 统计卡片 */}
      <div style={{ padding: '52px 16px 12px', flexShrink: 0 }}>
        <Card
          style={{
            background: `linear-gradient(135deg, ${themeColor} 0%, ${THEME.staffSecondary} 100%)`,
            margin: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
            color: '#fff',
            textAlign: 'center',
            gap: 16,
            padding: '8px 0',
            margin: '-8px 0',
          }}
          >
            {stats.map((stat, index) => (
              <div key={index} style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    opacity: 0.9,
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 筛选 Tab */}
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

      {/* 任务列表 */}
      <div
        style={{
          flex: 1,
          padding: '0 16px 16px',
          overflow: 'auto',
        }}
      >
        {filteredTasks.map((task) => {
          const statusStyle = STATUS_COLORS[task.status] || {
            color: themeColor,
            bg: `${themeColor}20`,
          };
          return (
            <Card
              key={task.id}
              onClick={() => onTaskClick(task)}
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
                    letter={task.avatar}
                    color={task.color}
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
                      {task.user}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: THEME.textMuted,
                      }}
                    >
                      {task.phone}
                    </div>
                  </div>
                </div>
                <Tag color={statusStyle.color} bg={statusStyle.bg}>
                  {STATUS_MAP[task.status]}
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
                  <Tag>{task.service}</Tag> {task.time}
                </div>
                <div>
                  <EnvironmentOutlined style={{ marginRight: 4 }} />
                  {task.address}
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
                  {task.amount}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {task.status === 'pending' && (
                    <Button size="small" themeColor={themeColor}>
                      接受任务
                    </Button>
                  )}
                  {task.status === 'serving' && (
                    <Button
                      size="small"
                      themeColor={themeColor}
                      onClick={(e) => {
                        e.stopPropagation();
                        onCheckin(task);
                      }}
                    >
                      完成打卡
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

export default TaskListPage;