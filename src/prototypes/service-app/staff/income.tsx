/**
 * 服务人员端 - 收入
 */
import React from 'react';
import {
  WalletOutlined,
} from '@ant-design/icons';
import { SUCCESS, TEXT_SECONDARY, TEXT_GRAY } from '../shared';

interface Props {
  onBack: () => void;
}

export default function Income({ onBack }: Props) {
  return (
    <div className="page-content">
      {/* 收入卡片 */}
      <div className="income-card">
        <div className="income-header">
          <div className="income-label">累计收入</div>
          <div className="income-value">¥12,680.00</div>
        </div>
        <div className="income-detail">
          <div className="income-item">
            <div className="income-item-label">本月收入</div>
            <div className="income-item-value">¥3,450.00</div>
          </div>
          <div className="income-divider" />
          <div className="income-item">
            <div className="income-item-label">待结算</div>
            <div className="income-item-value">¥680.00</div>
          </div>
        </div>
      </div>

      {/* 收入记录 */}
      <div className="card">
        <div className="card-title">收入记录</div>
        <div className="empty-state">
          <WalletOutlined />
          <div>暂无收入记录</div>
        </div>
      </div>

      <div className="page-tips">
        结算功能正在开发中，敬请期待...
      </div>
    </div>
  );
}