/**
 * 服务商管理端 - 入驻介绍
 */
import React from 'react';
import { ShopOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { PRIMARY, SUCCESS, TEXT_SECONDARY } from '../shared';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export default function SettleIntro({ onBack, onNext }: Props) {
  return (
    <div className="page-with-navbar">
      <div className="navbar navbar-primary">
        <button className="nav-back" onClick={onBack}>
          ← 返回
        </button>
        <div className="nav-title">入驻办理</div>
        <div className="nav-right" />
      </div>

      <div className="page-body">
        <div className="card card-center">
          <div className="intro-icon">
            <ShopOutlined />
          </div>
          <div className="intro-title">欢迎入驻益寿平台</div>
          <div className="intro-desc">
            完成入驻后即可开始接收订单、管理服务人员
          </div>

          <div className="intro-benefits">
            {[
              '线上接单，触达更多用户',
              '快速结算，收入有保障',
              '人员管理，团队协作更高效',
              '数据报表，经营一目了然',
            ].map((item, i) => (
              <div key={i} className="intro-benefit">
                <CheckCircleOutlined className="benefit-icon" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <button className="btn btn-primary btn-lg" onClick={onNext}>
            立即入驻
          </button>
        </div>
      </div>
    </div>
  );
}