/**
 * 服务商管理端 - 资质上传
 */
import React from 'react';
import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { PRIMARY, WARNING } from '../shared';

interface Props {
  onBack: () => void;
  onSuccess: () => void;
}

export default function SettleUpload({ onBack, onSuccess }: Props) {
  return (
    <div className="page-with-navbar">
      <div className="navbar navbar-primary">
        <button className="nav-back" onClick={onBack}>
          ← 返回
        </button>
        <div className="nav-title">上传资质</div>
        <div className="nav-right" />
      </div>

      <div className="page-body">
        <div className="card">
          <div className="form-group">
            <div className="form-label">
              营业执照 <span className="required">*</span>
            </div>
            <div className="upload-area">
              <UploadOutlined />
              <div>点击上传</div>
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">
              身份证 <span className="required">*</span>
            </div>
            <div className="upload-area">
              <UploadOutlined />
              <div>点击上传</div>
            </div>
          </div>

          <div className="card card-warning">
            <div className="warning-content">
              <ExclamationCircleOutlined />
              <div>请确保上传的文件清晰可辨，信息真实有效。</div>
            </div>
          </div>
        </div>

        <div className="bottom-actions">
          <button className="btn btn-primary btn-lg" onClick={onSuccess}>
            提交审核
          </button>
        </div>
      </div>
    </div>
  );
}