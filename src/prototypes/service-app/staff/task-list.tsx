/**
 * 服务人员端 - 任务列表
 */
import React, { useState } from 'react';
import { EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import {
  PRIMARY,
  SUCCESS,
  DANGER,
  WARNING,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_GRAY,
  TASK_LIST,
} from '../shared';

interface Props {
  onNavigate: (screen: string) => void;
}

export default function TaskList({ onNavigate }: Props) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'pending', 'serving', 'completed'];
  const filterLabels = ['全部', '待接单', '进行中', '已完成'];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: '待接单', color: DANGER, bg: '#FFF2F0' };
      case 'serving':
        return { label: '服务中', color: WARNING, bg: '#FFF7E6' };
      default:
        return { label: '已完成', color: SUCCESS, bg: '#F6FFED' };
    }
  };

  const displayedTasks = activeFilter === 'all'
    ? TASK_LIST
    : TASK_LIST.filter(t => t.status === activeFilter);

  const todayCount = TASK_LIST.length;
  const servingCount = TASK_LIST.filter(t => t.status === 'serving').length;
  const completedCount = TASK_LIST.filter(t => t.status === 'completed').length;

  return (
    <div className="page-content">
      {/* 统计卡片 */}
      <div className="stats-card stats-card-success">
        <div className="stats-row-inner">
          <div className="stat-item">
            <div className="stat-value">{todayCount}</div>
            <div className="stat-label">今日任务</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{servingCount}</div>
            <div className="stat-label">进行中</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{completedCount}</div>
            <div className="stat-label">已完成</div>
          </div>
        </div>
      </div>

      {/* 筛选标签 */}
      <div className="filter-tabs">
        {filterLabels.map((label, i) => (
          <div
            key={i}
            className={`filter-tab ${activeFilter === filters[i] ? 'active active-success' : ''}`}
            onClick={() => setActiveFilter(filters[i])}
          >
            {label}
          </div>
        ))}
      </div>

      {/* 任务列表 */}
      <div className="card">
        {displayedTasks.map(task => {
          const statusInfo = getStatusInfo(task.status);
          return (
            <div key={task.id} className="task-card" onClick={() => onNavigate('task-detail')}>
              <div className="task-header">
                <div className="task-user">
                  <div className="avatar" style={{ background: task.color }}>{task.avatar}</div>
                  <div className="user-info">
                    <div className="user-name">{task.user}</div>
                    <div className="user-phone">{task.phone}</div>
                  </div>
                </div>
                <div className="task-tag" style={{ color: statusInfo.color, background: statusInfo.bg }}>
                  {statusInfo.label}
                </div>
              </div>

              <div className="task-info">
                <div className="task-service">
                  <span className="service-badge">{task.service}</span>
                  {task.time}
                </div>
                <div className="task-address">
                  <EnvironmentOutlined /> {task.address}
                </div>
              </div>

              <div className="task-footer">
                <div className="task-amount">{task.amount}</div>
                <div className="task-actions">
                  {task.status === 'pending' && (
                    <button className="btn btn-success btn-sm">接受任务</button>
                  )}
                  {task.status === 'serving' && (
                    <button className="btn btn-success btn-sm" onClick={(e) => { e.stopPropagation(); onNavigate('task-checkin'); }}>
                      完成打卡
                    </button>
                  )}
                  <button className="btn btn-default btn-sm">详情</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}