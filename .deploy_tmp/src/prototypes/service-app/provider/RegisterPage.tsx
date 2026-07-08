/**
 * 服务商注册页
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import {
  LeftOutlined,
  CheckCircleOutlined,
  ShopOutlined,
  TeamOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Button, Input, Card, THEME } from '../shared/components';
import logoImg from '../LOGO1.png';

interface ProviderRegisterPageProps {
  themeColor?: string;
  onBack: () => void;
  onStartSettle: () => void;
}

export const ProviderRegisterPage: React.FC<ProviderRegisterPageProps> = ({
  themeColor = THEME.providerPrimary,
  onBack,
  onStartSettle,
}) => {
  return (
    <div
      style={{
        height: '100%',
        background: THEME.bgDark,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      {/* 顶部导航 */}
      <div
        style={{
          height: 44,
          background: THEME.bgDark,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
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
            服务商入驻
          </span>
        </div>
        <div style={{ width: 30 }} />
      </div>

      {/* 内容区域 */}
      <div
        style={{
          flex: 1,
          padding: '32px 16px 24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              width: 80,
              height: 80,
              margin: '0 auto 16px',
            }}
          >
            <img
              src={logoImg}
              alt="logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: THEME.textPrimary, marginBottom: 8 }}>
            欢迎入驻益寿平台
          </div>
          <div style={{ fontSize: 14, color: THEME.textSecondary }}>
            成为益寿服务商，开启数字化服务之旅
          </div>
        </div>

        {/* 入驻优势 */}
        <div style={{ marginBottom: 24 }}>
          {[
            { icon: <ShopOutlined />, title: '扩大服务范围', desc: '触达更多有需求的用户' },
            { icon: <TeamOutlined />, title: '高效团队管理', desc: '轻松管理服务人员' },
            { icon: <FileTextOutlined />, title: '智能订单处理', desc: '订单全流程线上化' },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 0',
                borderBottom: index < 2 ? `1px solid ${THEME.borderLight}` : 'none',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: `${themeColor}15`,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  color: themeColor,
                }}
              >
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, color: THEME.textPrimary, marginBottom: 2 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: THEME.textSecondary }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 入驻条件 */}
        <Card style={{ marginBottom: 24, padding: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: THEME.textPrimary, marginBottom: 12 }}>
            入驻条件
          </div>
          {[
            '具有合法经营资质的企业或个体工商户',
            '能提供专业的服务团队',
            '可承诺提供优质服务',
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                marginBottom: 8,
              }}
            >
              <CheckCircleOutlined style={{ fontSize: 14, color: themeColor, marginTop: 2 }} />
              <span style={{ fontSize: 13, color: THEME.textSecondary }}>{item}</span>
            </div>
          ))}
        </Card>

        {/* 按钮 */}
        <div style={{ marginTop: 'auto' }}>
          <Button onClick={onStartSettle} themeColor={themeColor} style={{ marginBottom: 12 }}>
            立即入驻
          </Button>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 12, color: THEME.textMuted }}>
              点击立即入驻即表示同意
            </span>
            <span style={{ fontSize: 12, color: themeColor }}>《用户协议》</span>
            <span style={{ fontSize: 12, color: THEME.textMuted }}>和</span>
            <span style={{ fontSize: 12, color: themeColor }}>《隐私政策》</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderRegisterPage;