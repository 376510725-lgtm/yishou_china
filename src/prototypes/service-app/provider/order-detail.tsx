/**
 * 服务商管理端 - 订单详情
 */
import React from 'react';
import { PhoneOutlined } from '@ant-design/icons';
import {
  PRIMARY,
  SUCCESS,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_GRAY,
  BORDER_COLOR,
  ORDER_LIST,
} from '../shared';

interface Props {
  onBack: () => void;
}

export default function OrderDetail({ onBack }: Props) {
  const order = ORDER_LIST[0];

  return (
    <div className="page-with-navbar">
      <div className="navbar navbar-primary">
        <button className="nav-back" onClick={onBack}>
          ← 返回
        </button>
        <div className="nav-title">订单详情</div>
        <div className="nav-right" />
      </div>

      <div className="page-body">
        <div className="card">
          <div className="info-row">
            <div className="info-label">订单编号</div>
            <div className="info-value">{order.id}</div>
          </div>
          <div className="info-divider" />
          <div className="order-user-row" style={{ padding: '12px 0' }}>
            <div className="order-user">
              <div className="avatar avatar-lg" style={{ background: order.color }}>{order.avatar}</div>
              <div className="user-info">
                <div className="user-name">{order.user}</div>
                <div className="user-phone">{order.phone}</div>
              </div>
            </div>
            <button className="btn btn-default btn-sm">
              <PhoneOutlined />
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-title">服务信息</div>
          <div className="info-row">
            <div className="info-label">服务类型</div>
            <div className="info-value">
              <span className="service-badge">{order.service}</span>
            </div>
          </div>
          <div className="info-row">
            <div className="info-label">预约时间</div>
            <div className="info-value">{order.time}</div>
          </div>
          <div className="info-row">
            <div className="info-label">服务地址</div>
            <div className="info-value">{order.address}</div>
          </div>
          <div className="info-row">
            <div className="info-label">服务备注</div>
            <div className="info-value">无特殊要求</div>
          </div>
        </div>

        <div className="card">
          <div className="info-row">
            <div className="info-label">订单金额</div>
            <div className="info-value price">{order.amount}</div>
          </div>
          <div className="info-divider" />
          <div className="info-row">
            <div className="info-label">支付状态</div>
            <div className="info-value">
              <span className="tag tag-success">已支付</span>
            </div>
          </div>
        </div>

        <div className="bottom-actions">
          <button className="btn btn-primary btn-lg">接 单</button>
        </div>
      </div>
    </div>
  );
}