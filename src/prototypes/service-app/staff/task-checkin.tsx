/**
 * 服务人员端 - 完成打卡
 */
import React from 'react';
import { ClockCircleOutlined, CameraOutlined } from '@ant-design/icons';
import { SUCCESS } from '../shared';

interface Props {
  onBack: () => void;
  onComplete: () => void;
}

export default function TaskCheckin({ onBack, onComplete }: Props) {
  return (
    <div className="page-with-navbar">
      <div className="navbar navbar-success">
        <button className="nav-back" onClick={onBack}>
          ← 返回
        </button>
        <div className="nav-title">完成打卡</div>
        <div className="nav-right" />
      </div>

      <div className="page-body">
        <div className="card card-center">
          <div className="checkin-icon">
            <ClockCircleOutlined />
          </div>
          <div className="checkin-title">服务已完成</div>
          <div className="checkin-desc">
            请上传服务照片（选填）
          </div>

          <div className="upload-area upload-area-lg" style={{ marginBottom: 24 }}>
            <CameraOutlined />
            <div>点击上传照片</div>
          </div>

          <button className="btn btn-success btn-lg" onClick={onComplete}>
            完成打卡
          </button>
        </div>
      </div>
    </div>
  );
}