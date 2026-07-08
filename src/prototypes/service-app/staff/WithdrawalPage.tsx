/**
 * 服务人员/服务商 - 提现页面
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import { Button, Card, Input, THEME } from '../shared/components';

interface WithdrawalPageProps {
  themeColor?: string;
  onBack: () => void;
  balance?: string;
}

export const WithdrawalPage: React.FC<WithdrawalPageProps> = ({
  themeColor = '#A855F7',
  onBack,
  balance = '3,458.00',
}) => {
  const [amount, setAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const quickAmounts = ['100', '200', '500', '1000', '全部'];

  const handleQuickAmount = (val: string) => {
    if (val === '全部') {
      setAmount(balance);
    } else {
      setAmount(val);
    }
  };

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onBack();
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: THEME.bgDark,
          padding: 40,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${THEME.success} 0%, #059669 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            color: '#fff',
            marginBottom: 16,
            boxShadow: `0 0 30px ${THEME.success}40`,
          }}
        >
          ✓
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: THEME.textPrimary,
            marginBottom: 8,
          }}
        >
          提现申请已提交
        </div>
        <div style={{ fontSize: 14, color: THEME.textSecondary }}>
          预计2小时内到账
        </div>
      </div>
    );
  }

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
          提现
        </span>
      </div>

      <div style={{ flex: 1, padding: '52px 16px 16px', overflow: 'auto' }}>
        {/* 余额卡片 */}
        <Card
          style={{
            background: `linear-gradient(135deg, ${themeColor} 0%, ${THEME.staffSecondary} 100%)`,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              textAlign: 'center',
              color: '#fff',
              padding: '12px 0',
            }}
          >
            <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 8 }}>可提现余额</div>
            <div style={{ fontSize: 36, fontWeight: 700 }}>¥{balance}</div>
          </div>
        </Card>

        {/* 提现金额输入 */}
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 13,
              color: THEME.textSecondary,
              marginBottom: 8,
            }}
          >
            提现金额
          </div>
          <Input
            placeholder="请输入提现金额"
            value={amount}
            onChange={setAmount}
            prefix="¥"
            themeColor={themeColor}
          />
        </div>

        {/* 快捷金额 */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 13,
              color: THEME.textSecondary,
              marginBottom: 10,
            }}
          >
            快捷金额
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {quickAmounts.map((val) => (
              <div
                key={val}
                onClick={() => handleQuickAmount(val)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 20,
                  fontSize: 13,
                  cursor: 'pointer',
                  background: amount === val || (val === '全部' && amount === balance)
                    ? `${themeColor}20`
                    : THEME.bgInput,
                  color: amount === val || (val === '全部' && amount === balance)
                    ? themeColor
                    : THEME.textSecondary,
                  border: `1px solid ${amount === val || (val === '全部' && amount === balance) ? `${themeColor}50` : THEME.borderLight}`,
                  transition: 'all 0.2s ease',
                }}
              >
                {val === '全部' ? val : `¥${val}`}
              </div>
            ))}
          </div>
        </div>

        {/* 到账信息 */}
        <Card style={{ marginBottom: 24 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 13, color: THEME.textSecondary }}>到账银行卡</span>
            <span style={{ fontSize: 13, color: THEME.textPrimary }}>中国银行 ****6789</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: THEME.textSecondary }}>预计到账</span>
            <span style={{ fontSize: 13, color: THEME.success }}>2小时内</span>
          </div>
        </Card>

        <Button
          onClick={handleSubmit}
          themeColor={themeColor}
          disabled={!amount || parseFloat(amount) <= 0}
        >
          确认提现
        </Button>
      </div>
    </div>
  );
};

export default WithdrawalPage;
