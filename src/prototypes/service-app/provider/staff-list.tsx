/**
 * 服务商管理端 - 人员列表
 */
import React from 'react';
import { UserAddOutlined, RightOutlined } from '@ant-design/icons';
import {
  PRIMARY,
  SUCCESS,
  WARNING,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_GRAY,
  STAFF_LIST,
} from '../shared';

interface Props {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function StaffList({ onBack, onNavigate }: Props) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'online':
        return { label: '在线', color: SUCCESS, bg: '#E6FFF4' };
      case 'busy':
        return { label: '忙碌', color: WARNING, bg: '#FFF7E6' };
      default:
        return { label: '离线', color: TEXT_GRAY, bg: '#F5F5F5' };
    }
  };

  return (
    <div className="page-with-navbar">
      <div className="navbar">
        <button className="nav-back" onClick={onBack}>
          ← 返回
        </button>
        <div className="nav-title">服务人员</div>
        <div className="nav-right" />
      </div>

      <div className="page-content">
        <div className="card">
          <div className="card-header">
            <div className="card-title">服务人员（{STAFF_LIST.length}人）</div>
            <button className="btn btn-primary btn-sm" onClick={() => onNavigate('staff-add')}>
              <UserAddOutlined /> 添加
            </button>
          </div>

          {STAFF_LIST.map((staff, index) => {
            const statusInfo = getStatusInfo(staff.status);
            return (
              <div
                key={staff.id}
                className="staff-item"
                onClick={() => onNavigate('staff-detail')}
              >
                <div className="avatar avatar-lg" style={{ background: staff.color }}>{staff.avatar}</div>
                <div className="staff-info">
                  <div className="staff-name-row">
                    <span className="staff-name">{staff.name}</span>
                    <span className="staff-status" style={{ color: statusInfo.color, background: statusInfo.bg }}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <div className="staff-skills">擅长：{staff.skills.join('、')}</div>
                  <div className="staff-stats">今日 {staff.todayTasks} 单 | 共 {staff.totalTasks} 单</div>
                </div>
                <RightOutlined className="staff-arrow" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}