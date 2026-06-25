/**
 * 服务商入驻介绍页
 * 深空暗夜科技风格
 */

import React from 'react';
import {
  CheckCircleOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { Button, Card, NavBar, THEME } from '../shared/components';

interface SettleIntroPageProps {
  themeColor?: string;
  onBack: () => void;
  onNext: () => void;
}

export const SettleIntroPage: React.FC<SettleIntroPageProps> = ({
  themeColor = THEME.providerPrimary,
  onBack,
  onNext,
}) => {
  const advantages = [
    '线上接单，触达更多用户',
    '快速结算，收入有保障',
    '人员管理，团队协作更高效',
    '数据报表，经营一目了然',
  ];

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
            入驻申请
          </span>
        </div>
        <div style={{ width: 30 }} />
      </div>

      <div
        style={{
          flex: 1,
          padding: '64px 20px 32px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        {/* 中心图标 */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              width: 80,
              height: 80,
              background: `linear-gradient(135deg, ${themeColor}20 0%, ${themeColor}05 100%)`,
              border: `1px solid ${themeColor}30`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <ShopOutlined
              style={{ fontSize: 36, color: themeColor }}
            />
          </div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: THEME.textPrimary,
              marginBottom: 8,
            }}
          >
            欢迎入驻益寿平台
          </h2>
          <p
            style={{
              fontSize: 14,
              color: THEME.textSecondary,
              lineHeight: 1.6,
            }}
          >
            完成入驻后即可开始接收订单、管理服务人员
          </p>
        </div>

        {/* 入驻优势列表 */}
        <Card style={{ flex: 1 }}>
          {advantages.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: index > 0 ? '16px 0' : 0,
                borderTop: index > 0 ? `1px solid ${THEME.borderLight}` : 'none',
              }}
            >
              <CheckCircleOutlined
                style={{ fontSize: 20, color: THEME.success }}
              />
              <span
                style={{
                  fontSize: 15,
                  color: THEME.textSecondary,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </Card>

        {/* 立即入驻按钮 */}
        <Button onClick={onNext} themeColor={themeColor}>
          立即入驻
        </Button>
      </div>
    </div>
  );
};

export default SettleIntroPage;