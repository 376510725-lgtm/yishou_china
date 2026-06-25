/**
 * 服务人员注册页
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import {
  LeftOutlined,
  CheckCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Input, Card, THEME } from '../shared/components';
import logoImg from '../LOGO1.png';

interface StaffRegisterPageProps {
  themeColor?: string;
  onBack: () => void;
  onSuccess: () => void;
}

export const StaffRegisterPage: React.FC<StaffRegisterPageProps> = ({
  themeColor = THEME.staffPrimary,
  onBack,
  onSuccess,
}) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: 信息填写, 2: 设置密码
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!phone) {
      newErrors.phone = '请输入手机号';
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      newErrors.phone = '手机号格式不正确';
    }
    if (!code) {
      newErrors.code = '请输入验证码';
    }
    if (!inviteCode) {
      newErrors.inviteCode = '请输入服务商邀请码';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!password) {
      newErrors.password = '请设置密码';
    } else if (password.length < 8 || password.length > 16) {
      newErrors.password = '密码长度为8-16位';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = '请确认密码';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = '两次密码不一致';
    }
    if (!agreementChecked) {
      newErrors.agreement = '请阅读并同意用户协议和隐私政策';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      onSuccess();
    }
  };

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
          onClick={currentStep === 1 ? onBack : () => setCurrentStep(1)}
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
            服务人员注册
          </span>
        </div>
        <div style={{ width: 30 }} />
      </div>

      {/* 内容区域 */}
      <div
        style={{
          flex: 1,
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        {/* 步骤指示器 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: currentStep >= 1 ? themeColor : THEME.bgInput,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                color: '#fff',
              }}
            >
              {currentStep > 1 ? <CheckCircleOutlined style={{ fontSize: 14 }} /> : '1'}
            </div>
            <span style={{ fontSize: 13, color: currentStep >= 1 ? themeColor : THEME.textMuted }}>
              填写信息
            </span>
          </div>
          <div
            style={{
              width: 40,
              height: 1,
              background: currentStep >= 2 ? themeColor : THEME.borderLight,
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: currentStep >= 2 ? themeColor : THEME.bgInput,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                color: '#fff',
              }}
            >
              2
            </div>
            <span style={{ fontSize: 13, color: currentStep >= 2 ? themeColor : THEME.textMuted }}>
              设置密码
            </span>
          </div>
        </div>

        {currentStep === 1 ? (
          <>
            {/* 步骤1：填写信息 */}
            <div style={{ flex: 1 }}>
              {/* Logo */}
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    margin: '0 auto 10px',
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
                <div style={{ fontSize: 15, fontWeight: 500, color: THEME.textPrimary }}>
                  加入服务商团队
                </div>
              </div>

              {/* 邀请码说明 */}
              <Card style={{ marginBottom: 16, padding: 14 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: `${themeColor}15`,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TeamOutlined style={{ fontSize: 20, color: themeColor }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: THEME.textPrimary, marginBottom: 4 }}>
                      服务商邀请码
                    </div>
                    <div style={{ fontSize: 12, color: THEME.textSecondary }}>
                      请向您的服务商管理员获取邀请码
                    </div>
                  </div>
                </div>
              </Card>

              {/* 手机号 */}
              <div style={{ marginBottom: 12 }}>
                <Input
                  placeholder="请输入手机号"
                  value={phone}
                  onChange={setPhone}
                  prefix="+86"
                  themeColor={themeColor}
                />
                {errors.phone && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* 验证码 */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <Input
                      placeholder="请输入验证码"
                      value={code}
                      onChange={setCode}
                      themeColor={themeColor}
                    />
                  </div>
                  <button
                    style={{
                      height: 52,
                      padding: '0 12px',
                      background: `${themeColor}15`,
                      color: themeColor,
                      border: `1px solid ${themeColor}30`,
                      borderRadius: 10,
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    获取验证码
                  </button>
                </div>
                {errors.code && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>
                    {errors.code}
                  </div>
                )}
              </div>

              {/* 邀请码 */}
              <div>
                <Input
                  placeholder="请输入服务商邀请码"
                  value={inviteCode}
                  onChange={setInviteCode}
                  themeColor={themeColor}
                />
                {errors.inviteCode && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>
                    {errors.inviteCode}
                  </div>
                )}
              </div>
            </div>

            <Button onClick={handleNext} themeColor={themeColor}>
              下一步
            </Button>
          </>
        ) : (
          <>
            {/* 步骤2：设置密码 */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, color: THEME.textSecondary, marginBottom: 16 }}>
                请设置您的登录密码
              </div>

              {/* 密码 */}
              <div style={{ marginBottom: 12 }}>
                <Input
                  placeholder="请设置密码（8-16位）"
                  value={password}
                  onChange={setPassword}
                  type="password"
                  themeColor={themeColor}
                />
                {errors.password && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>
                    {errors.password}
                  </div>
                )}
              </div>

              {/* 确认密码 */}
              <div style={{ marginBottom: 16 }}>
                <Input
                  placeholder="请确认密码"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  type="password"
                  themeColor={themeColor}
                />
                {errors.confirmPassword && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* 协议勾选 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  marginBottom: 16,
                }}
                onClick={() => setAgreementChecked(!agreementChecked)}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    border: `2px solid ${agreementChecked ? themeColor : THEME.textMuted}`,
                    background: agreementChecked ? themeColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {agreementChecked && (
                    <CheckCircleOutlined style={{ color: '#fff', fontSize: 12 }} />
                  )}
                </div>
                <div style={{ fontSize: 12, color: THEME.textSecondary }}>
                  我已阅读并同意
                  <span style={{ color: themeColor }}>《用户协议》</span>
                  和
                  <span style={{ color: themeColor }}>《隐私政策》</span>
                </div>
              </div>
              {errors.agreement && (
                <div style={{ fontSize: 11, color: THEME.danger, marginBottom: 12 }}>
                  {errors.agreement}
                </div>
              )}
            </div>

            <Button onClick={handleSubmit} themeColor={themeColor}>
              完成注册
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default StaffRegisterPage;
