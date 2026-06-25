/**
 * 服务商管理端 - 登录页
 */
import React, { useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { PRIMARY, TEXT_PRIMARY, TEXT_SECONDARY, TEXT_GRAY, BORDER_COLOR, BG_GRAY } from '../shared';
import './style.css';

interface Props {
  onLogin: () => void;
  onGoBack: () => void;
}

export default function ProviderLogin({ onLogin, onGoBack }: Props) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  const sendCode = () => {
    if (phone.length === 11) {
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <button className="back-btn" onClick={onGoBack}>
          <LeftOutlined />
        </button>
        <div className="login-logo">服务商登录</div>
        <div className="login-slogan">管理订单，指派服务</div>
      </div>

      <div className="login-form">
        <div className="input-wrapper">
          <span className="input-prefix">+86</span>
          <input
            className="input-field"
            placeholder="请输入手机号"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        <div className="code-row">
          <div className="input-wrapper" style={{ flex: 1 }}>
            <input
              className="input-field"
              placeholder="请输入验证码"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
          </div>
          <button
            className="code-btn"
            onClick={sendCode}
            disabled={countdown > 0 || phone.length < 11}
          >
            {countdown > 0 ? `${countdown}s` : '获取验证码'}
          </button>
        </div>

        <button className="submit-btn" onClick={onLogin}>
          登录
        </button>

        <div className="login-tips">
          登录即表示同意<span className="link">《用户协议》</span>和<span className="link">《隐私政策》</span>
        </div>
      </div>
    </div>
  );
}