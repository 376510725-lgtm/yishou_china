/**
 * 服务人员端 - 收入页面
 * 深空暗夜科技风格
 */

import React from 'react';
import { Card, Avatar, THEME } from '../shared/components';
import { RightOutlined } from '@ant-design/icons';

interface IncomePageProps {
  themeColor?: string;
}

export const IncomePage: React.FC<IncomePageProps> = ({
  themeColor = '#A855F7',
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