/**
 * 服务商管理端 - 个人中心页面
 * 深空暗夜科技风格
 */

import React from 'react';
import {
  UserOutlined,
  MessageOutlined,
  SettingOutlined,
  LogoutOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Card, Tag, Avatar, THEME } from '../shared/components';

interface ProfilePageProps {
  themeColor?: string;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  themeColor = '#00D4FF',
  onLogout,
}) => {
  const menuItems = [
    { icon: <UserOutlined />, label: '个人资料', badge: null },
    { icon: <MessageOutlined />, label: '消息通知', badge: 3 },
    { icon: <SettingOutlined />, label: '设置', badge: null },
  ];

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* 固定标题栏 - 始终固定在顶部 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 44,
          background: `linear-gradient(180deg, ${THEME.bgDark} 0%, ${THEME.bgDark}CC 100%)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
          borderBottom: `1px solid ${THEME.borderLight}`,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: THEME.textPrimary,
          }}
        >
          我的
        </span>
      </div>

      {/* 内容区域 - 可滚动 */}
      <div
        style={{
          flex: 1,
          paddingTop: 44,
          overflow: 'auto',
        }}
      >
        {/* 头部区域 */}
        <div
          style={{
            background: `linear-gradient(135deg, ${themeColor}20 0%, ${themeColor}05 100%)`,
            padding: '20px 20px 40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <Avatar letter="管" color={themeColor} size={72} />
            <div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: THEME.textPrimary,
                  marginBottom: 4,
                }}
              >
                服务商管理员
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: THEME.textMuted,
                }}
              >
                138****1234
              </div>
            </div>
          </div>
        </div>

        {/* 菜单区域 */}
        <div
          style={{
            padding: '0 16px',
            marginTop: -40,
          }}
        >
          <Card>
            {menuItems.map((item, index) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderTop:
                    index > 0 ? `1px solid ${THEME.borderLight}` : 'none',
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    color: themeColor,
                    marginRight: 14,
                  }}
                >
                  {item.icon}
                </div>
                <div
                  style={{
                    flex: 1,
                    fontSize: 15,
                    color: THEME.textPrimary,
                  }}
                >
                  {item.label}
                </div>
                {item.badge && (
                  <Tag color={THEME.danger} bg={`${THEME.danger}20`}>
                    {item.badge}
                  </Tag>
                )}
                <RightOutlined
                  style={{ color: THEME.textMuted, fontSize: 12 }}
                />
              </div>
            ))}
          </Card>

          {/* 退出登录 */}
          <Card
            onClick={onLogout}
            style={{
              marginTop: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                color: THEME.danger,
              }}
            >
              <LogoutOutlined />
              <span style={{ fontSize: 15 }}>退出登录</span>
            </div>
          </Card>

          {/* 版本信息 */}
          <div
            style={{
              textAlign: 'center',
              padding: '32px 0',
              fontSize: 12,
              color: THEME.textMuted,
            }}
          >
            益寿服务端 v1.0.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;