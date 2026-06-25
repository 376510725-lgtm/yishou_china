/**
 * 服务商管理端 - 添加服务人员
 */
import React from 'react';
import { QrcodeOutlined } from '@ant-design/icons';
import {
  PRIMARY,
  SUCCESS,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_GRAY,
  BG_GRAY,
  SERVICES,
} from '../shared';

interface Props {
  onBack: () => void;
  onSuccess: () => void;
}

export default function StaffAdd({ onBack, onSuccess }: Props) {
  return (
    <div className="page-with-navbar">
      <div className="navbar navbar-primary">
        <button className="nav-back" onClick={onBack}>
          ← 返回
        </button>
        <div className="nav-title">添加服务人员</div>
        <div className="nav-right" />
      </div>

      <div className="page-body">
        <div className="card">
          <div className="form-group">
            <div className="form-label">姓名</div>
            <div className="input-wrapper">
              <input className="input-field" placeholder="请输入服务人员姓名" />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">手机号</div>
            <div className="input-wrapper">
              <span className="input-prefix">+86</span>
              <input className="input-field" placeholder="请输入手机号" />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">擅长服务</div>
            <div className="service-tags">
              {SERVICES.map(s => (
                <div key={s.label} className="service-tag">{s.label}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="card card-tip">
          <div className="tip-content">
            <QrcodeOutlined style={{ color: PRIMARY, fontSize: 16 }} />
            <div>添加成功后，系统将发送邀请短信给服务人员。</div>
          </div>
        </div>

        <div className="bottom-actions">
          <button className="btn btn-primary btn-lg" onClick={onSuccess}>
            添加并发送邀请
          </button>
        </div>
      </div>
    </div>
  );
}