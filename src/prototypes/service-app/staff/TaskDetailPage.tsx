/**
 * 服务人员端 - 任务详情页面
 * 深空暗夜科技风格
 */

import React from 'react';
import {
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Card, Tag, Avatar, Button, NavBar, THEME } from '../shared/components';

interface TaskDetailPageProps {
  themeColor?: string;
  task: {
    id: string;
    user: string;
    avatar: string;
    color: string;
    phone: string;
    service: string;
    address: string;
    time: string;
    amount: string;
    status: string;
  };
  onBack: () => void;
  onAccept?: () => void;
  onStart?: () => void;
}

export const TaskDetailPage: React.FC<TaskDetailPageProps> = ({
  themeColor = '#A855F7',
  task,
  onBack,
  onAccept,
  onStart,
}) => {
  const STATUS_MAP: Record<string, string> = {
    pending: '待接单',
    accepted: '已接单',
    serving: '服务中',
    completed: '已完成',
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: THEME.bgDark,
        overflow: 'hidden',
      }}
    >
      {/* 固定标题栏 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 44,
          background: `linear-gradient(180deg, ${THEME.bgDark} 0%, ${THEME.bgDark}CC 100%)`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          zIndex: 10,
          borderBottom: `1px solid ${THEME.borderLight}`,
        }}
      >
        <button
          onClick={onBack}
          style={{
            border: 'none',
            background: 'transparent',
            color: themeColor,
            fontSize: 18,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
          }}
        >
          ←
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: THEME.textPrimary }}>
            任务详情
          </span>
        </div>
        <div style={{ width: 30 }} />
      </div>

      <div
        style={{
          flex: 1,
          padding: '64px 16px 32px',
          overflow: 'auto',
        }}
      >
        {/* 用户信息 */}
        <Card style={{ marginBottom: 12 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              paddingBottom: 16,
              borderBottom: `1px solid ${THEME.borderLight}`,
            }}
          >
            <Avatar letter={task.avatar} color={task.color} size={52} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: THEME.textPrimary,
                }}
              >
                {task.user}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: THEME.textMuted,
                  marginTop: 4,
                }}
              >
                {task.phone}
              </div>
            </div>
            <Button
              size="small"
              themeColor={themeColor}
              style={{ width: 44, padding: 0 }}
              onClick={() => window.open(`tel:${task.phone.replace(/\*/g, '0')}`)}
            >
              <PhoneOutlined />
            </Button>
          </div>
          <div
            style={{
              paddingTop: 16,
            }}
          >
            <Tag color={themeColor} bg={`${themeColor}20`}>
              {task.service}
            </Tag>
            <span
              style={{
                marginLeft: 8,
                fontSize: 14,
                color: THEME.textSecondary,
              }}
            >
              {task.time}
            </span>
          </div>
        </Card>

        {/* 服务信息 */}
        <Card style={{ marginBottom: 12 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: THEME.textPrimary,
              marginBottom: 16,
            }}
          >
            服务信息
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                color: themeColor,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              onClick={() => window.open(`https://uri.amap.com/search?keyword=${encodeURIComponent(task.address)}`)}
            >
              <EnvironmentOutlined style={{ marginRight: 4 }} />
              {task.address}
              <span style={{ fontSize: 12, color: THEME.success, background: `${THEME.success}15`, padding: '2px 6px', borderRadius: 4, textDecoration: 'none' }}>导航</span>
            </div>
            <div
              style={{
                fontSize: 14,
                color: THEME.textMuted,
              }}
            >
              服务备注：无特殊要求
            </div>
          </div>
        </Card>

        {/* 费用信息 */}
        <Card style={{ marginBottom: 24 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: THEME.textSecondary,
              }}
            >
              订单金额
            </span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: themeColor,
              }}
            >
              {task.amount}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: THEME.textSecondary,
              }}
            >
              支付状态
            </span>
            <Tag color={THEME.success} bg={`${THEME.success}20`}>
              已支付
            </Tag>
          </div>
        </Card>

        {/* 操作按钮 */}
        <div style={{ display: 'flex', gap: 12 }}>
          {task.status === 'pending' && onAccept && (
            <Button
              onClick={onAccept}
              themeColor={themeColor}
              style={{ flex: 1 }}
            >
              接受任务
            </Button>
          )}
          {task.status === 'serving' && onStart && (
            <Button
              onClick={onStart}
              themeColor={themeColor}
              style={{ flex: 1 }}
            >
              开始服务
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;