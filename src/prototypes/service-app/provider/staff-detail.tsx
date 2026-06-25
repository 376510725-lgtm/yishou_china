/**
 * 服务商管理端 - 人员详情
 */
import React from 'react';
import { PhoneOutlined } from '@ant-design/icons';
import {
  PRIMARY,
  SUCCESS,
  WARNING,
  DANGER,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_GRAY,
  STAFF_LIST,
} from '../shared';

interface Props {
  onBack: () => void;
}

export default function StaffDetail({ onBack }: Props) {
  const staff = STAFF_LIST[0];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'online':
        return { label: '在线', color: SUCCESS };
      case 'busy':
        return { label: '忙碌', color: WARNING };
      default:
        return { label: '离线', color: TEXT_GRAY };
    }
  };

  const statusInfo = getStatusInfo(staff.status);

  return (
    <div className="page-with-navbar">
      <div className="navbar navbar-primary">
        <button className="nav-back" onClick={onBack}>
          ← 返回
        </button>
        <div className="nav-title">人员详情</div>
        <div className="nav-right" />
      </div>

      <div className="page-body">
        <div className="card">
          <div className="user-profile-header">
            <div className="avatar avatar-xl" style={{ background: staff.color }}>{staff.avatar}</div>
            <div className="profile-info">
              <div className="profile-name">{staff.name}</div>
              <div className="profile-phone">{staff.phone}</div>
              <div className="profile-status" style={{ color: statusInfo.color, background: `${statusInfo.color}15` }}>
                {statusInfo.label}
              </div>
            </div>
          </div>
          <div className="info-row">
            <div className="info-label">擅长服务</div>
            <div className="info-value">{staff.skills.join('、')}</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">服务统计</div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{staff.totalTasks}</div>
              <div className="stat-label">累计服务</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{staff.todayTasks}</div>
              <div className="stat-label">本月服务</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">98%</div>
              <div className="stat-label">好评率</div>
            </div>
          </div>
        </div>

        <div className="bottom-actions">
          <button className="btn btn-outline btn-lg" style={{ flex: 1, marginRight: 12 }}>
            移除
          </button>
          <button className="btn btn-primary btn-lg" style={{ flex: 1 }}>
            联系
          </button>
        </div>
      </div>
    </div>
  );
}