/**
 * 服务商管理端 - 工作台
 */
import React from 'react';
import {
  HomeOutlined,
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
  ShopOutlined,
  CheckCircleOutlined,
  RightOutlined,
  EnvironmentOutlined,
  BellOutlined,
} from '@ant-design/icons';
import {
  PRIMARY,
  SUCCESS,
  WARNING,
  DANGER,
  INFO,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_GRAY,
  BG_GRAY,
  BORDER_COLOR,
  SERVICES,
  ORDER_LIST,
} from '../shared';

interface Props {
  onNavigate: (screen: string) => void;
}

export default function ProviderHome({ onNavigate }: Props) {
  const pendingOrders = ORDER_LIST.filter(o => o.status === 'pending');

  return (
    <div className="page-content">
      {/* 统计卡片 */}
      <div className="stats-row">
        <div className="stat-card stat-danger">
          <div className="stat-value">{pendingOrders.length}</div>
          <div className="stat-label">待处理订单</div>
        </div>
        <div className="stat-card stat-warning">
          <div className="stat-value">5</div>
          <div className="stat-label">进行中</div>
        </div>
        <div className="stat-card stat-success">
          <div className="stat-value">28</div>
          <div className="stat-label">今日完成</div>
        </div>
      </div>

      {/* 快捷操作 */}
      <div className="card">
        <div className="card-title">快捷操作</div>
        <div className="quick-actions">
          <div className="quick-action" onClick={() => onNavigate('settle')}>
            <div className="quick-icon" style={{ background: `${PRIMARY}15`, color: PRIMARY }}>
              <ShopOutlined />
            </div>
            <div className="quick-label">入驻办理</div>
          </div>
          <div className="quick-action" onClick={() => onNavigate('orders')}>
            <div className="quick-icon" style={{ background: `${INFO}15`, color: INFO }}>
              <FileTextOutlined />
            </div>
            <div className="quick-label">订单管理</div>
          </div>
          <div className="quick-action" onClick={() => onNavigate('staff')}>
            <div className="quick-icon" style={{ background: `${SUCCESS}15`, color: SUCCESS }}>
              <TeamOutlined />
            </div>
            <div className="quick-label">人员管理</div>
          </div>
        </div>
      </div>

      {/* 服务类型 */}
      <div className="card">
        <div className="card-title">服务类型</div>
        <div className="service-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="service-item" onClick={() => onNavigate('orders')}>
              <div className="service-icon" style={{ background: BG_GRAY, color: TEXT_SECONDARY }}>
                <HomeOutlined />
              </div>
              <div className="service-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 新订单提醒 */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">新订单提醒</div>
          <div className="card-link" onClick={() => onNavigate('orders')}>
            查看全部 <RightOutlined />
          </div>
        </div>
        {pendingOrders.slice(0, 2).map(order => (
          <div key={order.id} className="order-item" onClick={() => onNavigate('order-detail')}>
            <div className="order-header">
              <div className="order-user">
                <div className="avatar" style={{ background: order.color }}>{order.avatar}</div>
                <div className="user-info">
                  <div className="user-name">{order.user}</div>
                  <div className="user-phone">{order.phone}</div>
                </div>
              </div>
              <div className="order-tag tag-danger">待接单</div>
            </div>
            <div className="order-info">
              <div className="order-service">
                <span className="service-badge">{order.service}</span>
                {order.time}
              </div>
              <div className="order-address">
                <EnvironmentOutlined /> {order.address}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}