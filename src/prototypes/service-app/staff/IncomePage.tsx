/**
 * 服务人员端 - 收入页面
 * 深空暗夜科技风格
 */

import React from 'react';
import { Card, Avatar, Button, THEME } from '../shared/components';
import { RightOutlined } from '@ant-design/icons';

interface IncomePageProps {
  themeColor?: string;
  onWithdraw?: () => void;
}

export const IncomePage: React.FC<IncomePageProps> = ({
  themeColor = '#A855F7',
  onWithdraw,
}) => {
  const incomeRecords = [
    {
      id: '1',
      date: '06-01',
      service: '助餐服务',
      amount: '+68.00',
      user: '张阿姨',
    },
    {
      id: '2',
      date: '06-01',
      service: '助洁服务',
      amount: '+128.00',
      user: '李大爷',
    },
    {
      id: '3',
      date: '06-02',
      service: '助医服务',
      amount: '+198.00',
      user: '王奶奶',
    },
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
          我的收入
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
        {/* 收入概览卡片 */}
        <div
          style={{
            background: `linear-gradient(135deg, ${themeColor}25 0%, ${themeColor}10 100%)`,
            padding: '24px 20px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: THEME.textSecondary,
                marginBottom: 8,
              }}
            >
              累计收入
            </div>
            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: themeColor,
              }}
            >
              ¥3,458.00
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 12,
            }}
          >
            <div
              style={{
                flex: 1,
                background: THEME.bgCard,
                borderRadius: 12,
                padding: '16px',
                textAlign: 'center',
                border: `1px solid ${THEME.borderLight}`,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: THEME.textMuted,
                  marginBottom: 4,
                }}
              >
                本月收入
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: THEME.textPrimary,
                }}
              >
                ¥1,280.00
              </div>
            </div>
            <div
              style={{
                flex: 1,
                background: THEME.bgCard,
                borderRadius: 12,
                padding: '16px',
                textAlign: 'center',
                border: `1px solid ${THEME.borderLight}`,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: THEME.textMuted,
                  marginBottom: 4,
                }}
              >
                待结算
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: THEME.warning,
                }}
              >
                ¥198.00
              </div>
            </div>
          </div>
        </div>

        {/* 提现按钮 */}
        <div style={{ padding: '12px 16px' }}>
          <Button onClick={onWithdraw} themeColor={themeColor} size="large">
            立即提现
          </Button>
        </div>

        {/* 收入趋势图（简易柱状图） */}
        <div style={{ padding: '0 16px 16px' }}>
          <Card>
            <div style={{ fontSize: 15, fontWeight: 600, color: THEME.textPrimary, marginBottom: 16 }}>本月收入趋势</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 100, gap: 6 }}>
              {[
                { day: '1日', value: 68 }, { day: '3日', value: 128 }, { day: '5日', value: 198 },
                { day: '7日', value: 88 }, { day: '9日', value: 156 }, { day: '11日', value: 0 },
                { day: '13日', value: 198 },
              ].map((item, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: themeColor, marginBottom: 4, fontWeight: 500 }}>
                    ¥{item.value || ''}
                  </div>
                  <div style={{
                    width: '100%', height: Math.max(item.value / 200 * 70, 4),
                    background: item.value > 0 ? `linear-gradient(180deg, ${themeColor} 0%, ${themeColor}40 100%)` : THEME.bgInput,
                    borderRadius: '4px 4px 0 0', margin: '0 auto', minWidth: 20
                  }} />
                  <div style={{ fontSize: 10, color: THEME.textMuted, marginTop: 4 }}>{item.day}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 收入记录列表 */}
        <div
          style={{
            padding: '16px',
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: THEME.textPrimary,
              marginBottom: 12,
            }}
          >
            收入记录
          </div>

          {incomeRecords.map((record, index) => (
            <Card key={record.id} style={{ marginBottom: 10 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  letter={record.user.charAt(0)}
                  color={themeColor}
                  size={40}
                />
                <div
                  style={{
                    flex: 1,
                    marginLeft: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: THEME.textPrimary,
                      marginBottom: 2,
                    }}
                  >
                    {record.service}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: THEME.textMuted,
                    }}
                  >
                    {record.date} · {record.user}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: THEME.success,
                  }}
                >
                  {record.amount}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* 底部留白 */}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
};

export default IncomePage;