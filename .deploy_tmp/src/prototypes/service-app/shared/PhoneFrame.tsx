/**
 * 手机框架组件 - PhoneFrame
 * 深空暗夜科技风格
 */

import React, { useEffect } from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  themeColor?: string;
  themeGradient?: string;
  footer?: React.ReactNode;  // 固定在底部的 Tab 栏
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  themeColor = '#00D4FF',
  themeGradient = 'linear-gradient(135deg, #00D4FF 0%, #0066FF 100%)',
  footer,
}) => {
  // 隐藏滚动条
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      #phone-frame-content::-webkit-scrollbar { display: none; }
      #phone-frame-content { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: 375,
        height: 812,
        borderRadius: 44,
        border: '2px solid rgba(255,255,255,0.15)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        boxShadow: `
          0 0 0 1px rgba(255,255,255,0.05),
          0 25px 50px -12px rgba(0,0,0,0.8),
          0 0 60px -15px ${themeColor}40
        `,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 状态栏 - 深色背景确保标题栏固定效果 */}
      <div
        style={{
          height: 44,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          fontSize: 14,
          fontWeight: 600,
          color: '#fff',
          flexShrink: 0,
          background: '#0a0f1a', // 深色背景，标题栏固定在深色背景上
        }}
      >
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <circle cx="12" cy="20" r="1" fill="currentColor" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M22 11v2" strokeLinecap="round" />
            <path d="M6 11v2" strokeLinecap="round" />
            <path d="M10 11v2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* 内容区域 - 直接渲染 children，让 index.tsx 内的滚动区域正常工作 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>

      {/* 外边框光效 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default PhoneFrame;
