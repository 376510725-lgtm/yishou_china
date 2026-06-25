/**
 * 服务人员端 - 登录页
 */
import React, { useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { SUCCESS, TEXT_PRIMARY, TEXT_SECONDARY, TEXT_GRAY } from '../shared';
import './style.css';

interface Props {
  onLogin: () => void;
  onGoBack: () => void;
}

export default function StaffLogin({ onLogin, onGoBack }: Props) {
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [password, setPassword] = useState('');
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
        <div className="login-logo">服务人员{isRegister ? '注册' : '登录'}</div>
        <div className="login-slogan">接收任务，上门服务</div>
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

        {isRegister && (
          <div className="input-wrapper">
            <input
              className="input-field"
              placeholder="请输入服务商邀请码"
              value={inviteCode}
              onChange={e => setInviteCode(e.target.value)}
            />
          </div>
        )}

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
            className="code-btn code-btn-success"
            onClick={sendCode}
            disabled={countdown > 0 || phone.length < 11}
          >
            {countdown > 0 ? `${countdown}s` : '获取验证码'}
          </button>
        </div>

        {isRegister && (
          <div className="input-wrapper">
            <input
              className="input-field"
              type="password"
              placeholder="请设置密码（8-16位）"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        )}

        <button className="submit-btn submit-btn-success" onClick={onLogin}>
          {isRegister ? '注册并登录' : '登录'}
        </button>

        <div className="login-toggle">
          <span style={{ color: TEXT_SECONDARY }}>{isRegister ? '已有账号？' : '没有账号？'}</span>
          <span className="link" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? '登录' : '注册'}
          </span>
        </div>
      </div>
    </div>
  );
}