/**
 * 服务商入驻申请成功页
 * 深空暗夜科技风格
 */

import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Card, NavBar, THEME } from '../shared/components';

interface SettleSuccessPageProps {
  themeColor?: string;
  onBack: () => void;
  onComplete: () => void;
  onViewStatus?: () => void;
}

export const SettleSuccessPage: React.FC<SettleSuccessPageProps> = ({
  themeColor = THEME.providerPrimary,
  onBack,
  onComplete,
  onViewStatus,
}) => {
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
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: THEME.textPrimary }}>
            提交成功
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
        {/* 成功图标 */}
        <div
          style={{
            width: 80,
            height: 80,
            background: `${THEME.success}15`,
            border: `1px solid ${THEME.success}30`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <CheckCircleOutlined
            style={{ fontSize: 40, color: THEME.success }}
          />
        </div>

        <h2
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: THEME.textPrimary,
            marginBottom: 12,
          }}
        >
          资料已提交
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
          请等待平台审核，预计1-3个工作日
        </p>

        {/* 进度提示卡片 */}
        <Card
          style={{
            width: '100%',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: THEME.textPrimary,
              marginBottom: 16,
            }}
          >
            审核进度
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            {/* 进度线 */}
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: 20,
                right: 20,
                height: 2,
                background: THEME.borderLight,
              }}
            />
            {/* 步骤 */}
            {[
              { label: '提交资料', done: true },
              { label: '审核中', done: true },
              { label: '审核通过', done: false },
            ].map((step, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: step.done ? THEME.success : THEME.bgInput,
                    border: `2px solid ${
                      step.done ? THEME.success : THEME.borderMedium
                    }`,
                    marginBottom: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {step.done && (
                    <CheckCircleOutlined
                      style={{
                        fontSize: 12,
                        color: '#fff',
                      }}
                    />
                  )}
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: step.done
                      ? THEME.textPrimary
                      : THEME.textMuted,
                  }}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* 按钮区域 */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button onClick={onComplete} themeColor={themeColor}>
            返回工作台
          </Button>
          {onViewStatus && (
            <Button
              onClick={onViewStatus}
              type="default"
              themeColor={themeColor}
              style={{ width: '100%' }}
            >
              查看审核状态
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettleSuccessPage;