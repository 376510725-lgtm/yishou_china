/**
 * 服务商管理端 - 个人中心
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
  PRIMARY,
  DANGER,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_GRAY,
} from '../shared';

interface Props {
  onLogout: () => void;
}

export default function ProviderProfile({ onLogout }: Props) {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="avatar avatar-xl" style={{ background: '#fff', color: PRIMARY }}>管</div>
        <div className="profile-name">服务商管理员</div>
        <div className="profile-phone">138****1234</div>
      </div>

      <div className="card">
        {[
          { icon: <UserOutlined />, label: '个人资料', arrow: true },
          { icon: <MessageOutlined />, label: '消息通知', badge: 3, arrow: true },
          { icon: <SettingOutlined />, label: '设置', arrow: true },
        ].map((item, i) => (
          <div key={i} className="menu-item">
            <div className="menu-icon" style={{ color: PRIMARY }}>{item.icon}</div>
            <div className="menu-label">{item.label}</div>
            {item.badge && <span className="menu-badge">{item.badge}</span>}
            {item.arrow && <RightOutlined className="menu-arrow" />}
          </div>
        ))}
      </div>

      <div className="card">
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