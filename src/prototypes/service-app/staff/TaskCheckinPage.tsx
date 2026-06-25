/**
 * 服务人员端 - 打卡页面
 * 深空暗夜科技风格
 */

import React from 'react';
import {
  ClockCircleOutlined,
  CameraOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, NavBar, THEME } from '../shared/components';

interface TaskCheckinPageProps {
  themeColor?: string;
  mode: 'start' | 'complete';
  onBack: () => void;
  onCheckin: () => void;
}

export const TaskCheckinPage: React.FC<TaskCheckinPageProps> = ({
  themeColor = '#A855F7',
  mode,
  onBack,
  onCheckin,
}) => {
  const isStart = mode === 'start';

  return (
    <div
      style={{
        flex: 1,
        background: THEME.bgDark,
        display: 'flex',
        flexDirection: 'column',
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
            {isStart ? '开始服务' : '完成打卡'}
          </span>
        </div>
        <div style={{ width: 30 }} />
      </div>

      <div
        style={{
          flex: 1,
          padding: '64px 20px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'auto',
        }}
      >
        {/* 时钟图标 */}
        <div
          style={{
            width: 120,
            height: 120,
            background: `${themeColor}15`,
            border: `1px solid ${themeColor}30`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
          }}
        >
          <ClockCircleOutlined
            style={{ fontSize: 56, color: themeColor }}
          />
        </div>

        <h2
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: THEME.textPrimary,
            marginBottom: 8,
          }}
        >
          {isStart ? '即将开始服务' : '服务已完成'}
        </h2>

        <p
          style={{
            fontSize: 14,
            color: THEME.textSecondary,
            textAlign: 'center',
            marginBottom: 40,
            lineHeight: 1.6,
          }}
        >
          {isStart
            ? '点击下方按钮开始服务，系统将记录您的位置'
            : '请上传服务照片（选填）'}
        </p>

        {/* 上传照片区域 */}
        <Card
          style={{
            width: '100%',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              height: 140,
              background: THEME.bgInput,
              border: `2px dashed ${THEME.borderMedium}`,
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <PlusOutlined
              style={{ fontSize: 32, color: THEME.textMuted, marginBottom: 8 }}
            />
            <span
              style={{
                fontSize: 13,
                color: THEME.textMuted,
              }}
            >
              点击上传服务照片
            </span>
          </div>
        </Card>

        {/* 打卡按钮 */}
        <Button
          onClick={onCheckin}
          themeColor={themeColor}
          style={{ width: '100%' }}
        >
          {isStart ? '开始服务' : '完成打卡'}
        </Button>
      </div>
    </div>
  );
};

export default TaskCheckinPage;