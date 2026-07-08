/**
 * 设置页面 - 服务商/服务人员通用
 * 深空暗夜科技风格
 */

import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Card, THEME } from '../shared/components';

interface SettingItem {
  label: string;
  value?: string;
  danger?: boolean;
  onClick: () => void;
}

interface SettingsPageProps {
  themeColor?: string;
  onBack: () => void;
  onLogout: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  themeColor = '#00D4FF',
  onBack,
  onLogout,
}) => {
  const section1: SettingItem[] = [
    { label: '个人资料', value: '点击修改', onClick: () => {} },
    { label: '账号安全', value: '修改密码/手机号', onClick: () => {} },
  ];

  const section2: SettingItem[] = [
    { label: '通知设置', value: '已开启', onClick: () => {} },
    { label: '隐私设置', onClick: () => {} },
    { label: '清除缓存', value: '23.5MB', onClick: () => {} },
  ];

  const section3: SettingItem[] = [
    { label: '关于益寿服务版', value: 'v1.0.0', onClick: () => {} },
    { label: '用户协议', onClick: () => {} },
    { label: '隐私政策', onClick: () => {} },
  ];

  const renderSection = (title: string, items: SettingItem[]) => (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          fontSize: 12,
          color: THEME.textMuted,
          padding: '0 4px 8px',
        }}
      >
        {title}
      </div>
      <Card>
        {items.map((item, index) => (
          <div
            key={item.label}
            onClick={item.onClick}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 0',
              borderTop: index > 0 ? `1px solid ${THEME.borderLight}` : 'none',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                fontSize: 14,
                color: item.danger ? THEME.danger : THEME.textPrimary,
              }}
            >
              {item.label}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {item.value && (
                <span
                  style={{
                    fontSize: 13,
                    color: item.danger ? THEME.danger : THEME.textMuted,
                  }}
                >
                  {item.value}
                </span>
              )}
              <RightOutlined style={{ fontSize: 12, color: THEME.textMuted }} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );

  return (
    <div
      style={{
        flex: 1,
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
            padding: 0,
            marginRight: 12,
          }}
        >
          ←
        </button>
        <span style={{ fontSize: 18, fontWeight: 600, color: THEME.textPrimary }}>
          设置
        </span>
      </div>

      <div style={{ flex: 1, padding: '52px 16px 16px', overflow: 'auto' }}>
        {renderSection('账户', section1)}
        {renderSection('通用', section2)}
        {renderSection('关于', section3)}

        <Card
          onClick={onLogout}
          style={{ marginTop: 20 }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: THEME.danger,
              fontSize: 15,
              padding: '4px 0',
            }}
          >
            退出登录
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
