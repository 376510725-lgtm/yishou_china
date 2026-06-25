/**
 * 服务商管理端 - 订单列表
 */
import React, { useState } from 'react';
import {
  RightOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import {
  PRIMARY,
  SUCCESS,
  WARNING,
  DANGER,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_GRAY,
  BORDER_COLOR,
  ORDER_LIST,
  ORDER_STATUS_MAP,
} from '../shared';

interface Props {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function OrderList({ onBack, onNavigate }: Props) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'pending', 'accepted', 'serving', 'completed'];
  const filterLabels = ['全部', '待接单', '已接单', '进行中', '已完成'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return DANGER;
      case 'completed': return SUCCESS;
      default: return WARNING;
    }
  };

  const displayedOrders = activeFilter === 'all'
    ? ORDER_LIST
    : ORDER_LIST.filter(o => o.status === activeFilter);

  return (
    <div className="page-with-navbar">
      <div className="navbar">
        <button className="nav-back" onClick={onBack}>
          ← 返回
        </button>
        <div className="nav-title">订单管理</div>
        <div className="nav-right" />
      </div>

      <div className="filter-tabs">
        {filterLabels.map((label, i) => (
          <div
            key={i}
            className={`filter-tab ${activeFilter === filters[i] ? 'active' : ''}`}
            onClick={() => setActiveFilter(filters[i])}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="order-list">
        {displayedOrders.map(order => (
          <div key={order.id} className="order-card" onClick={() => onNavigate('order-detail')}>
            <div className="order-user-row">
              <div className="order-user">
                <div className="avatar" style={{ background: order.color }}>{order.avatar}</div>
                <div className="user-info">
                  <div className="user-name">{order.user}</div>
                  <div className="user-phone">{order.phone}</div>
                </div>
              </div>
              <div className="order-tag" style={{ color: getStatusColor(order.status), background: `${getStatusColor(order.status)}15` }}>
                {ORDER_STATUS_MAP[order.status]}
              </div>
            </div>

            <div className="order-detail">
              <div className="order-service">
                <span className="service-badge">{order.service}</span>
                {order.time}
              </div>
              <div className="order-address">
                <EnvironmentOutlined /> {order.address}
              </div>
            </div>

            <div className="order-footer">
              <div className="order-amount">{order.amount}</div>
              <div className="order-actions">
                {order.status === 'pending' && (
                  <button className="btn btn-primary btn-sm">接单</button>
                )}
                {order.status === 'dispatched' && (
                  <button className="btn btn-primary btn-sm">派单</button>
                )}
                <button className="btn btn-default btn-sm">详情</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}