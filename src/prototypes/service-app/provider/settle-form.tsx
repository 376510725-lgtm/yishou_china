/**
 * 服务商管理端 - 入驻表单
 */
import React from 'react';
import { PRIMARY, TEXT_SECONDARY, BG_GRAY } from '../shared';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export default function SettleForm({ onBack, onNext }: Props) {
  return (
    <div className="page-with-navbar">
      <div className="navbar navbar-primary">
        <button className="nav-back" onClick={onBack}>
          ← 返回
        </button>
        <div className="nav-title">填写信息</div>
        <div className="nav-right" />
      </div>

      <div className="page-body">
        <div className="card">
          <div className="form-group">
            <div className="form-label">服务商名称</div>
            <div className="input-wrapper">
              <input className="input-field" placeholder="请输入服务商名称" />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">联系人</div>
            <div className="input-wrapper">
              <input className="input-field" placeholder="请输入联系人姓名" />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">联系电话</div>
            <div className="input-wrapper">
              <span className="input-prefix">+86</span>
              <input className="input-field" placeholder="请输入手机号" />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">详细地址</div>
            <div className="input-wrapper">
              <input className="input-field" placeholder="请输入详细地址" />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">服务类型</div>
            <div className="service-tags">
              {['助餐', '助浴', '助洁', '助医', '助急', '助行'].map(s => (
                <div key={s} className="service-tag">{s}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="bottom-actions">
          <button className="btn btn-primary btn-lg" onClick={onNext}>
            下一步
          </button>
        </div>
      </div>
    </div>
  );
}