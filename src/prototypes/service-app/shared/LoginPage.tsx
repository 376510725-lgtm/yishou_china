/**
 * 统一登录页 - 服务商/服务人员通用
 * 深空暗夜科技风格
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircleOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Button, Input, Card, THEME } from '../shared/components';
import logoImg from '../LOGO1.png';

// 角色类型
type Role = 'provider' | 'staff';

// 登录方式
type LoginMode = 'code' | 'password';

interface LoginPageProps {
  themeColor?: string;
  onLogin: (role: Role) => void;
  onRegister: (role: Role) => void;
}

// 记住上次角色
const getSavedRole = (): Role => {
  try { return (localStorage.getItem('lastRole') as Role) || 'provider'; }
  catch { return 'provider'; }
};

export const LoginPage: React.FC<LoginPageProps> = ({
  themeColor = THEME.providerPrimary,
  onLogin,
  onRegister,
}) => {
  const [role, setRole] = useState<Role>(getSavedRole);
  const [loginMode, setLoginMode] = useState<LoginMode>('code');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [codeFocused, setCodeFocused] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 清除倒计时
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const sendCode = () => {
    if (countdown > 0 || !phone) return;
    setCountdown(60);
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { if (timerRef.current) clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLogin = () => {
    try { localStorage.setItem('lastRole', role); } catch {}
    onLogin(role);
  };

  return (
    <div
      style={{
        flex: 1,
        background: THEME.bgDark,
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {/* Logo 区域 */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div
          style={{
            width: 100,
            height: 100,
            margin: '0 auto 12px',
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
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: THEME.textPrimary,
          }}
        >
          服务版
        </div>
      </div>

      {/* 角色选择 */}
      <Card style={{ marginBottom: 16, padding: 6 }}>
        <div
          style={{
            display: 'flex',
            gap: 8,
          }}
        >
          <div
            onClick={() => setRole('provider')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '10px 12px',
              borderRadius: 10,
              cursor: 'pointer',
              background:
                role === 'provider'
                  ? `linear-gradient(135deg, ${THEME.providerPrimary}15 0%, ${THEME.providerSecondary}15 100%)`
                  : 'transparent',
              border:
                role === 'provider'
                  ? `1px solid ${THEME.providerPrimary}40`
                  : '1px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                border: `2px solid ${
                  role === 'provider'
                    ? THEME.providerPrimary
                    : THEME.textMuted
                }`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {role === 'provider' && (
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: THEME.providerPrimary,
                  }}
                />
              )}
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color:
                  role === 'provider'
                    ? THEME.providerPrimary
                    : THEME.textSecondary,
              }}
            >
              我是服务商
            </span>
          </div>

          <div
            onClick={() => setRole('staff')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '10px 12px',
              borderRadius: 10,
              cursor: 'pointer',
              background:
                role === 'staff'
                  ? `linear-gradient(135deg, ${THEME.staffPrimary}15 0%, ${THEME.staffSecondary}15 100%)`
                  : 'transparent',
              border:
                role === 'staff'
                  ? `1px solid ${THEME.staffPrimary}40`
                  : '1px solid transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                border: `2px solid ${
                  role === 'staff' ? THEME.staffPrimary : THEME.textMuted
                }`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {role === 'staff' && (
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: THEME.staffPrimary,
                  }}
                />
              )}
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color:
                  role === 'staff'
                    ? THEME.staffPrimary
                    : THEME.textSecondary,
              }}
            >
              我是服务人员
            </span>
          </div>
        </div>
      </Card>

      {/* 手机号输入 */}
      <div style={{ marginBottom: 10 }}>
        <Input
          placeholder="请输入手机号"
          value={phone}
          onChange={setPhone}
          prefix="+86"
          themeColor={themeColor}
        />
      </div>

      {/* 验证码/密码输入 */}
      {loginMode === 'code' ? (
        <div style={{ marginBottom: 12, display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <Input
              placeholder="请输入验证码"
              value={code}
              onChange={setCode}
              focused={codeFocused}
              onFocus={() => setCodeFocused(true)}
              onBlur={() => setCodeFocused(false)}
              themeColor={themeColor}
            />
          </div>
          <button
            onClick={sendCode}
            disabled={countdown > 0}
            style={{
              height: 52,
              padding: '0 12px',
              background: countdown > 0 ? THEME.bgInput : `${themeColor}15`,
              color: countdown > 0 ? THEME.textMuted : themeColor,
              border: `1px solid ${countdown > 0 ? THEME.borderLight : themeColor}30`,
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 500,
              cursor: countdown > 0 ? 'default' : 'pointer',
              whiteSpace: 'nowrap',
              minWidth: 90,
            }}
          >
            {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
          </button>
        </div>
      ) : (
        <div style={{ marginBottom: 12 }}>
          <Input
            placeholder="请输入密码"
            value={password}
            onChange={setPassword}
            type="password"
            themeColor={themeColor}
          />
        </div>
      )}

      {/* 登录按钮 */}
      <Button
        onClick={handleLogin}
        themeColor={themeColor}
        style={{ marginBottom: 12 }}
      >
        登 录
      </Button>

      {/* 协议勾选 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          cursor: 'pointer',
          marginBottom: 10,
        }}
        onClick={() => setAgreementChecked(!agreementChecked)}
      >
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 4,
            border: `2px solid ${agreementChecked ? themeColor : THEME.textMuted}`,
            background: agreementChecked ? themeColor : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.2s ease',
          }}
        >
          {agreementChecked && (
            <CheckCircleOutlined style={{ color: '#fff', fontSize: 11 }} />
          )}
        </div>
        <div
          style={{
            fontSize: 11,
            color: THEME.textSecondary,
            lineHeight: 1.4,
          }}
        >
          我已阅读并同意
          <span style={{ color: themeColor }}>《用户协议》</span>
          和
          <span style={{ color: themeColor }}>《隐私政策》</span>
        </div>
      </div>

      {/* 注册链接 */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 16,
          cursor: 'pointer',
        }}
        onClick={() => onRegister(role)}
      >
        <span style={{ fontSize: 12, color: THEME.textSecondary }}>
          没有账号？{' '}
        </span>
        <span
          style={{
            fontSize: 12,
            color: themeColor,
            fontWeight: 500,
          }}
        >
          立即注册
        </span>
      </div>

      {/* 其他方式登录（分隔线） */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 60,
          marginBottom: 12,
        }}
      >
        <div style={{ flex: 1, height: 1, background: THEME.borderLight }} />
        <span
          style={{
            padding: '0 12px',
            fontSize: 11,
            color: THEME.textMuted,
          }}
        >
          其他方式登录
        </span>
        <div style={{ flex: 1, height: 1, background: THEME.borderLight }} />
      </div>

      {/* 验证码登录（图标+按钮） */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          onClick={() => setLoginMode(loginMode === 'code' ? 'password' : 'code')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '10px 20px',
            borderRadius: 20,
            background: loginMode === 'password' ? `${themeColor}20` : THEME.bgInput,
            border: `1px solid ${loginMode === 'password' ? themeColor : THEME.borderLight}`,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <LockOutlined style={{ color: loginMode === 'password' ? themeColor : THEME.textMuted, fontSize: 14 }} />
          <span style={{ fontSize: 12, color: loginMode === 'password' ? themeColor : THEME.textSecondary }}>
            密码登录
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;