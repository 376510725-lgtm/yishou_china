/**
 * 服务商管理端 - 工作台页面
 * 深空暗夜科技风格
 */

import React from 'react';
import {
  HomeOutlined,
  FileTextOutlined,
  TeamOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Card, THEME } from '../shared/components';

// 模拟数据
const ORDER_LIST = [
  {
    id: 'DD202406010001',
    user: '张阿姨',
    avatar: '张',
    color: THEME.providerPrimary,
    phone: '138****5678',
    service: '助餐',
    address: '渝中区解放碑街道XX号',
    time: '今天 12:00',
    amount: '¥68.00',
    status: 'pending',
  },
  {
    id: 'DD202406010002',
    user: '李大爷',
    avatar: '李',
    color: THEME.success,
    phone: '139****8765',
    service: '助洁',
    address: '江北区观音桥街道XX号',
    time: '明天 09:00',
    amount: '¥128.00',
    status: 'dispatched',
  },
  {
    id: 'DD202406010003',
    user: '王奶奶',
    avatar: '王',
    color: THEME.warning,
    phone: '137****2345',
    service: '助医',
    address: '南岸区南坪街道XX号',
    time: '今天 15:30',
    amount: '¥198.00',
    status: 'serving',
  },
];

const SERVICE_TYPES = [
  { label: '助餐', icon: '🍽️' },
  { label: '助浴', icon: '🛁' },
  { label: '助洁', icon: '🧹' },
  { label: '助医', icon: '💊' },
  { label: '助急', icon: '🚑' },
  { label: '助行', icon: '🚶' },
];

interface HomePageProps {
  themeColor?: string;
  settleStatus?: 'none' | 'pending' | 'rejected' | 'approved';
  onNavigate: (screen: string) => void;
  onOrderClick: (order: typeof ORDER_LIST[0]) => void;
  onTabChange?: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  themeColor = THEME.providerPrimary,
  settleStatus = 'none',
  onNavigate,
  onOrderClick,
  onTabChange,
}) => {
  // 统计数据
  const stats = [
    { label: '待处理订单', value: 3, color: THEME.danger },
    { label: '进行中', value: 5, color: THEME.warning },
    { label: '今日完成', value: 28, color: THEME.success },
  ];

  // 快捷操作
  const quickActions = [
    { icon: <HomeOutlined />, label: '入驻办理', color: themeColor },
    { icon: <FileTextOutlined />, label: '订单管理', color: THEME.providerPrimary },
    { icon: <TeamOutlined />, label: '人员管理', color: THEME.success },
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
          alignItems: 'center',
          padding: '0 16px',
          zIndex: 10,
          borderBottom: `1px solid ${THEME.borderLight}`,
        }}
      >
        <div style={{ width: 30 }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: THEME.textPrimary,
            }}
          >
            工作台
          </span>
        </div>
        <BellOutlined style={{ fontSize: 20, color: THEME.textMuted }} />
      </div>

      {/* 内容区域 - 顶部留出标题栏空间，可滚动 */}
      <div
        style={{
          flex: 1,
          padding: '52px 16px 80px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* 顶部状态提示 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 0',
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: THEME.textSecondary,
            }}
          >
            今日订单概览
          </span>
        </div>

        {/* 统计卡片 */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginBottom: 16,
          }}
        >
          {stats.map((stat, index) => (
            <Card
              key={index}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '16px 8px',
                marginBottom: 0,
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: stat.color,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: THEME.textSecondary,
                  marginTop: 4,
                }}
              >
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* 快捷操作 */}
        <Card style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: THEME.textPrimary,
              marginBottom: 16,
            }}
          >
            快捷操作
          </div>
          <div
            style={{
              display: 'flex',
              gap: 16,
            }}
          >
            {quickActions.map((action, index) => (
              <div
                key={index}
                onClick={() => {
                  if (index === 0) {
                    onNavigate(settleStatus === 'none' ? 'settle-intro' : 'settle-status');
                  } else if (index === 1) {
                    onTabChange?.('orders');
                    onNavigate('orders');
                  } else {
                    onTabChange?.('staff');
                    onNavigate('staff');
                  }
                }}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {/* 入驻办理右上方审核状态角标 */}
                {index === 0 && settleStatus !== 'none' && (() => {
                  const statusConfig: Record<string, { label: string; color: string }> = {
                    pending: { label: '审核中', color: THEME.warning },
                    rejected: { label: '审核失败', color: THEME.danger },
                    approved: { label: '已通过', color: THEME.success },
                  };
                  const cfg = statusConfig[settleStatus];
                  return (
                    <span
                      style={{
                        position: 'absolute',
                        top: -6,
                        right: -4,
                        fontSize: 10,
                        color: cfg.color,
                        background: `${cfg.color}20`,
                        borderRadius: 4,
                        padding: '2px 5px',
                        lineHeight: '16px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {cfg.label}
                    </span>
                  );
                })()}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: `${action.color}15`,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px',
                    color: action.color,
                    fontSize: 20,
                  }}
                >
                  {action.icon}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: THEME.textSecondary,
                  }}
                >
                  {action.label}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 服务类型 */}
        <Card style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: THEME.textPrimary,
              marginBottom: 16,
            }}
          >
            服务类型
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
            }}
          >
            {SERVICE_TYPES.map((service) => (
              <div
                key={service.label}
                onClick={() => {
                  onTabChange?.('orders');
                  onNavigate('orders');
                }}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: THEME.bgInput,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 6px',
                    fontSize: 22,
                  }}
                >
                  {service.icon}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: THEME.textSecondary,
                  }}
                >
                  {service.label}
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
};

export default HomePage;