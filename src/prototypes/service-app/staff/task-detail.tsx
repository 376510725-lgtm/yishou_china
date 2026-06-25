/**
 * 服务人员端 - 任务详情
 */
import React from 'react';
import { PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import {
  PRIMARY,
  SUCCESS,
  DANGER,
  WARNING,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_GRAY,
  TASK_LIST,
} from '../shared';

interface Props {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function TaskDetail({ onBack, onNavigate }: Props) {
  const task = TASK_LIST[0];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: '待接单', color: DANGER };
      case 'serving':
        return { label: '服务中', color: WARNING };
      default:
        return { label: '已完成', color: SUCCESS };
    }
  };

  const statusInfo = getStatusInfo(task.status);

  return (
    <div className="page-with-navbar">
      <div className="navbar navbar-success">
        <button className="nav-back" onClick={onBack}>
          ← 返回
        </button>
        <div className="nav-title">任务详情</div>
        <div className="nav-right" />
      </div>

      <div className="page-body">
        <div className="card">
          <div className="task-user-row">
            <div className="task-user">
              <div className="avatar avatar-lg" style={{ background: task.color }}>{task.avatar}</div>
              <div className="user-info">
                <div className="user-name">{task.user}</div>
                <div className="user-phone">{task.phone}</div>
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
              <span className="service-badge">{task.service}</span>
            </div>
          </div>
          <div className="info-row">
            <div className="info-label">预约时间</div>
            <div className="info-value">{task.time}</div>
          </div>
          <div className="info-row">
            <div className="info-label">服务地址</div>
            <div className="info-value">
              <EnvironmentOutlined /> {task.address}
            </div>
          </div>
          <div className="info-row">
            <div className="info-label">服务备注</div>
            <div className="info-value">无特殊要求</div>
          </div>
        </div>

        <div className="card">
          <div className="info-row">
            <div className="info-label">订单金额</div>
            <div className="info-value price">{task.amount}</div>
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
          {task.status === 'pending' && (
            <button className="btn btn-success btn-lg" onClick={onBack}>
              接受任务
            </button>
          )}
          {task.status === 'serving' && (
            <button className="btn btn-success btn-lg" onClick={() => onNavigate('task-checkin')}>
              开始服务
            </button>
          )}
        </div>
      </div>
    </div>
  );
}