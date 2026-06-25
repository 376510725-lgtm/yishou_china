/**
 * 服务商资质上传页
 * 深空暗夜科技风格
 */

import React from 'react';
import {
  UploadOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, NavBar, THEME } from '../shared/components';

interface SettleUploadPageProps {
  themeColor?: string;
  onBack: () => void;
  onNext: () => void;
}

export const SettleUploadPage: React.FC<SettleUploadPageProps> = ({
  themeColor = THEME.providerPrimary,
  onBack,
  onNext,
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
            上传资质
          </span>
        </div>
        <div style={{ width: 30 }} />
      </div>

      <div
        style={{
          flex: 1,
          padding: '64px 20px 32px',
          overflow: 'auto',
        }}
      >
        {/* 营业执照 */}
        <Card style={{ marginBottom: 20 }}>
          <div
            style={{
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: THEME.textPrimary,
              }}
            >
              营业执照
            </span>
            <span style={{ color: THEME.danger, fontSize: 14 }}>*</span>
          </div>
          <div
            style={{
              height: 100,
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
              style={{ fontSize: 28, color: THEME.textMuted, marginBottom: 8 }}
            />
            <span
              style={{ fontSize: 13, color: THEME.textMuted }}
            >
              点击上传
            </span>
          </div>
        </Card>

        {/* 身份证 */}
        <Card style={{ marginBottom: 20 }}>
          <div
            style={{
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: THEME.textPrimary,
              }}
            >
              身份证
            </span>
            <span style={{ color: THEME.danger, fontSize: 14 }}>*</span>
          </div>
          <div
            style={{
              height: 100,
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
              style={{ fontSize: 28, color: THEME.textMuted, marginBottom: 8 }}
            />
            <span
              style={{ fontSize: 13, color: THEME.textMuted }}
            >
              点击上传
            </span>
          </div>
        </Card>

        {/* 提示 */}
        <Card
          style={{
            background: `${THEME.warning}10`,
            border: `1px solid ${THEME.warning}30`,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 10,
            }}
          >
            <ExclamationCircleOutlined
              style={{
                color: THEME.warning,
                fontSize: 18,
                flexShrink: 0,
                marginTop: 2,
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: THEME.warning,
                lineHeight: 1.6,
              }}
            >
              请确保上传的文件清晰可辨，信息真实有效。
            </span>
          </div>
        </Card>

        {/* 提交按钮 */}
        <Button onClick={onNext} themeColor={themeColor}>
          提交审核
        </Button>
      </div>
    </div>
  );
};

export default SettleUploadPage;