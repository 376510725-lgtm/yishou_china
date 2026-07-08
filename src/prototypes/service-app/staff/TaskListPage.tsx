/**
 * 服务人员端 - 任务列表页面
 * 深空暗夜科技风格
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import {
  EnvironmentOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { Card, Tag, Avatar, Button, THEME } from '../shared/components';

interface TaskData {
  id: string;
  user: string;
  avatar: string;
  color: string;
  phone: string;
  service: string;
  address: string;
  time: string;
  amount: string;
  status: 'pending' | 'accepted' | 'serving' | 'completed';
}

const FILTER_TABS = [
  { id: 'all', label: '全部' },
  { id: 'accepted', label: '待开始' },
  { id: 'serving', label: '进行中' },
  { id: 'completed', label: '已完成' },
];

const STATUS_MAP: Record<string, string> = {
  pending: '待接单',
  accepted: '待开始',
  serving: '服务中',
  completed: '已完成',
};

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  pending: { color: '#EF4444', bg: '#EF444420' },
  accepted: { color: '#00D4FF', bg: '#00D4FF20' },
  serving: { color: '#F59E0B', bg: '#F59E0B20' },
  completed: { color: '#10B981', bg: '#10B98120' },
};

interface TaskListPageProps {
  themeColor?: string;
  tasks?: TaskData[];
  onTaskClick: (task: TaskData) => void;
  onAcceptTask?: (task: TaskData) => void;
  onRejectTask?: (task: TaskData) => void;
  onCheckin: (task: TaskData) => void;
}

export const TaskListPage: React.FC<TaskListPageProps> = ({
  themeColor = '#A855F7',
  tasks: propTasks,
  onTaskClick,
  onAcceptTask,
  onRejectTask,
  onCheckin,
}) => {
  const taskList = propTasks ?? [];
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [actionMenuTaskId, setActionMenuTaskId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ bottom: number; right: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // 关闭菜单
  const closeMenu = useCallback(() => {
    setActionMenuTaskId(null);
    setMenuPosition(null);
  }, []);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    if (actionMenuTaskId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [actionMenuTaskId, closeMenu]);

  // 滚动时关闭菜单
  useEffect(() => {
    const el = listRef.current;
    if (!el || !actionMenuTaskId) return;
    const handleScroll = () => closeMenu();
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [actionMenuTaskId, closeMenu]);

  const filteredTasks = (activeFilter === 'all'
    ? taskList
    : taskList.filter((t) => t.status === activeFilter))
    .filter(t => !searchText || t.user.includes(searchText) || t.service.includes(searchText) || t.address.includes(searchText));

  // 统计数据（实时计算）
  const stats = [
    { label: '全部任务', value: taskList.length },
    { label: '进行中', value: taskList.filter(t => t.status === 'serving').length },
    { label: '已完成', value: taskList.filter(t => t.status === 'completed').length },
  ];

  return (
    <>
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

      {/* 搜索框 */}
      <div style={{ padding: '0 16px 10px', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', background: THEME.bgInput,
          borderRadius: 10, padding: '10px 14px', border: `1px solid ${THEME.borderLight}`,
          gap: 8,
        }}>
          <SearchOutlined style={{ color: THEME.textMuted, fontSize: 16 }} />
          <input
            placeholder="搜索任务/用户/地址..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'transparent', color: THEME.textPrimary, fontSize: 14, outline: 'none' }}
          />
          {searchText && <span onClick={() => setSearchText('')} style={{ color: THEME.textMuted, cursor: 'pointer', fontSize: 16 }}>✕</span>}
        </div>
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

      {/* 任务列表 */}
      <div
        ref={listRef}
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
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  {task.status === 'accepted' && (
                    <Button
                      size="small"
                      themeColor={themeColor}
                      onClick={(e) => {
                        e.stopPropagation();
                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        if (actionMenuTaskId === task.id) {
                          closeMenu();
                        } else {
                          setActionMenuTaskId(task.id);
                          setMenuPosition({ bottom: window.innerHeight - rect.top + 6, right: window.innerWidth - rect.right });
                        }
                      }}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      操作
                      <MoreOutlined style={{ marginLeft: 4, fontSize: 12 }} />
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
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      完成打卡
                    </Button>
                  )}
                  <Button
                    size="small"
                    type="default"
                    themeColor={themeColor}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTaskClick(task);
                    }}
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
    {/* Portal 下拉菜单 - 渲染到 body 避免被 overflow 裁剪 */}
    {actionMenuTaskId && menuPosition && ReactDOM.createPortal(
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          bottom: menuPosition.bottom,
          right: menuPosition.right,
          background: THEME.bgDark,
          borderRadius: 10,
          border: `1px solid ${THEME.borderLight}`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          minWidth: 140,
          zIndex: 9999,
          overflow: 'hidden',
          padding: 4,
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            closeMenu();
            onAcceptTask?.(taskList.find(t => t.id === actionMenuTaskId)!);
          }}
          style={{
            padding: '10px 14px',
            fontSize: 13,
            color: THEME.textPrimary,
            cursor: 'pointer',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = THEME.bgLight)}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <PlayCircleOutlined style={{ color: themeColor, fontSize: 15 }} />
          开始服务
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            closeMenu();
            onRejectTask?.(taskList.find(t => t.id === actionMenuTaskId)!);
          }}
          style={{
            padding: '10px 14px',
            fontSize: 13,
            color: THEME.danger,
            cursor: 'pointer',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = THEME.bgLight)}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <CloseCircleOutlined style={{ fontSize: 15 }} />
          拒绝
        </div>
      </div>,
      document.body
    )}
    </>
  );
};

export default TaskListPage;