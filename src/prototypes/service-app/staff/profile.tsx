/**
 * 服务人员端 - 个人中心
 */
import React from 'react';
import {
  UserOutlined,
  MessageOutlined,
  SettingOutlined,
  LogoutOutlined,
  RightOutlined,
} from '@ant-design/icons';
import {
  SUCCESS,
  DANGER,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_GRAY,
  BG_GRAY,
} from '../shared';

interface Props {
  onLogout: () => void;
}

export default function StaffProfile({ onLogout }: Props) {
  return (
    <div className="profile-page profile-page-success">
      <div className="profile-header profile-header-success">
        <div className="avatar avatar-xl" style={{ background: '#fff', color: SUCCESS }}>小</div>
        <div className="profile-name">王小明</div>
        <div className="profile-phone">138****1234</div>
      </div>

      <div className="card" style={{ margin: '-30px 16px 16px' }}>
        <div className="info-row" style={{ padding: '12px 0' }}>
          <div className="info-label">所属服务商</div>
          <div className="info-value">重庆市某某服务商</div>
        </div>
        <div className="info-divider" />
        <div className="info-row" style={{ padding: '12px 0' }}>
          <div className="info-label">服务类型</div>
          <div className="info-value">助餐、助洁</div>
        </div>
      </div>

      <div className="card" style={{ margin: '0 16px 16px' }}>
        {[
          { icon: <UserOutlined />, label: '个人资料', arrow: true },
          { icon: <MessageOutlined />, label: '消息通知', badge: 2, arrow: true },
          { icon: <SettingOutlined />, label: '设置', arrow: true },
        ].map((item, i) => (
          <div key={i} className="menu-item">
            <div className="menu-icon" style={{ color: SUCCESS }}>{item.icon}</div>
            <div className="menu-label">{item.label}</div>
            {item.badge && <span className="menu-badge menu-badge-danger">{item.badge}</span>}
            {item.arrow && <RightOutlined className="menu-arrow" />}
          </div>
        ))}
      </div>

      <div className="card" style={{ margin: '0 16px 16px' }}>
        <div className="menu-item logout" onClick={onLogout}>
          <LogoutOutlined className="menu-icon" style={{ color: DANGER }} />
          <span className="menu-label" style={{ color: DANGER }}>退出登录</span>
        </div>
      </div>

      <div className="version-info">
        益寿服务端 v1.0.0
      </div>
    </div>
  );
}