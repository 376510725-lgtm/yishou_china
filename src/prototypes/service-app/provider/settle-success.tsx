/**
 * 服务商管理端 - 入驻成功
 */
import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { SUCCESS } from '../shared';

interface Props {
  onBack: () => void;
  onReview: () => void;
}

export default function SettleSuccess({ onBack, onReview }: Props) {
  return (
    <div className="page-with-navbar">
      <div className="navbar">
        <button className="nav-back" onClick={onBack}>
          ← 返回
        </button>
        <div className="nav-title">提交成功</div>
        <div className="nav-right" />
      </div>

      <div className="page-body">
        <div className="card card-center">
          <div className="success-icon">
            <CheckCircleOutlined />
          </div>
          <div className="success-title">资料已提交</div>
          <div className="success-desc">
            请等待平台审核，预计1-3个工作日
          </div>

          <button className="btn btn-primary btn-lg" onClick={onReview}>
            返回工作台
          </button>
        </div>
      </div>
    </div>
  );
}