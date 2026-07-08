/**
 * 服务商入驻申请表单页
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import { Button, Input, Card, NavBar, THEME } from '../shared/components';

// 服务类型选项
const SERVICE_TYPES = [
  { label: '助餐', icon: '🍽️' },
  { label: '助浴', icon: '🛁' },
  { label: '助洁', icon: '🧹' },
  { label: '助医', icon: '💊' },
  { label: '助急', icon: '🚑' },
  { label: '助行', icon: '🚶' },
];

interface SettleFormPageProps {
  themeColor?: string;
  onBack: () => void;
  onNext: () => void;
}

export const SettleFormPage: React.FC<SettleFormPageProps> = ({
  themeColor = THEME.providerPrimary,
  onBack,
  onNext,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [verifyCode, setVerifyCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSendCode = () => {
    if (!contactPhone || countdown > 0) return;
    setCodeSent(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const toggleService = (label: string) => {
    setSelectedServices((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

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
            填写信息
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
        <Card style={{ marginBottom: 16 }}>
          {/* 服务商名称 */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: 'block',
                fontSize: 14,
                color: THEME.textSecondary,
                marginBottom: 8,
              }}
            >
              服务商名称
            </label>
            <Input
              placeholder="请输入服务商名称"
              value={companyName}
              onChange={setCompanyName}
              themeColor={themeColor}
            />
          </div>

          {/* 联系人 */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: 'block',
                fontSize: 14,
                color: THEME.textSecondary,
                marginBottom: 8,
              }}
            >
              联系人
            </label>
            <Input
              placeholder="请输入联系人姓名"
              value={contactName}
              onChange={setContactName}
              themeColor={themeColor}
            />
          </div>

          {/* 联系电话 */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: 'block',
                fontSize: 14,
                color: THEME.textSecondary,
                marginBottom: 8,
              }}
            >
              联系电话
            </label>
            <Input
              placeholder="请输入手机号"
              value={contactPhone}
              onChange={setContactPhone}
              prefix="+86"
              themeColor={themeColor}
            />
          </div>

          {/* 验证码 */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: 'block',
                fontSize: 14,
                color: THEME.textSecondary,
                marginBottom: 8,
              }}
            >
              验证码
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <Input
                  placeholder="请输入验证码"
                  value={verifyCode}
                  onChange={(v) => setVerifyCode(v)}
                  themeColor={themeColor}
                />
              </div>
              <button
                onClick={handleSendCode}
                disabled={!contactPhone || countdown > 0}
                style={{
                  width: 110,
                  height: 52,
                  borderRadius: 12,
                  border: countdown > 0 ? `1px solid ${THEME.borderLight}` : `1px solid ${themeColor}50`,
                  background: countdown > 0
                    ? THEME.bgInput
                    : `${themeColor}15`,
                  color: countdown > 0
                    ? THEME.textMuted
                    : themeColor,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: !contactPhone || countdown > 0 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {countdown > 0 ? `${countdown}s` : codeSent ? '重新发送' : '发送验证码'}
              </button>
            </div>
          </div>

          {/* 详细地址 */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: 'block',
                fontSize: 14,
                color: THEME.textSecondary,
                marginBottom: 8,
              }}
            >
              详细地址
            </label>
            <Input
              placeholder="请输入详细地址"
              value={address}
              onChange={setAddress}
              themeColor={themeColor}
            />
          </div>

          {/* 服务类型 */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 14,
                color: THEME.textSecondary,
                marginBottom: 12,
              }}
            >
              服务类型（可多选）
            </label>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              {SERVICE_TYPES.map((service) => (
                <div
                  key={service.label}
                  onClick={() => toggleService(service.label)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 14px',
                    borderRadius: 10,
                    fontSize: 13,
                    cursor: 'pointer',
                    background: selectedServices.includes(service.label)
                      ? `${themeColor}20`
                      : THEME.bgInput,
                    border: selectedServices.includes(service.label)
                      ? `1px solid ${themeColor}50`
                      : '1px solid transparent',
                    color: selectedServices.includes(service.label)
                      ? themeColor
                      : THEME.textSecondary,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{service.icon}</span>
                  <span>{service.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 下一步按钮 */}
        <Button onClick={onNext} themeColor={themeColor}>
          下一步
        </Button>
      </div>
    </div>
  );
};

export default SettleFormPage;