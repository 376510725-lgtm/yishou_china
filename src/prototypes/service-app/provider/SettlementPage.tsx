/**
 * 服务商管理端 - 财务结算页面
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import {
  WalletOutlined,
  RightOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Card, Tag, Button, THEME } from '../shared/components';

interface SettlementRecord {
  id: string;
  orderId: string;
  service: string;
  user: string;
  amount: string;
  date: string;
  status: 'settled' | 'pending' | 'processing';
}

const SETTLEMENT_LIST: SettlementRecord[] = [
  { id: '1', orderId: 'DD202406010004', service: '助浴', user: '赵叔叔', amount: '¥88.00', date: '06-04', status: 'settled' },
  { id: '2', orderId: 'DD202406010006', service: '助餐', user: '刘奶奶', amount: '¥68.00', date: '06-05', status: 'settled' },
  { id: '3', orderId: 'DD202406010007', service: '助医', user: '陈爷爷', amount: '¥198.00', date: '06-07', status: 'processing' },
  { id: '4', orderId: 'DD202406010009', service: '助洁', user: '周阿姨', amount: '¥128.00', date: '07-02', status: 'pending' },
  { id: '5', orderId: 'DD202406010011', service: '助行', user: '吴大爷', amount: '¥58.00', date: '07-03', status: 'pending' },
];

const FILTER_TABS = [
  { id: 'all', label: '全部' },
  { id: 'settled', label: '已结算' },
  { id: 'processing', label: '处理中' },
  { id: 'pending', label: '待结算' },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  settled: { label: '已结算', color: '#10B981', bg: '#10B98120' },
  processing: { label: '处理中', color: '#F59E0B', bg: '#F59E0B20' },
  pending: { label: '待结算', color: '#EF4444', bg: '#EF444420' },
};

interface SettlementPageProps {
  themeColor?: string;
  onBack: () => void;
}

export const SettlementPage: React.FC<SettlementPageProps> = ({
  themeColor = '#00D4FF',
  onBack,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredRecords = activeFilter === 'all'
    ? SETTLEMENT_LIST
    : SETTLEMENT_LIST.filter(r => r.status === activeFilter);

  const settledAmount = SETTLEMENT_LIST
    .filter(r => r.status === 'settled')
    .reduce((sum, r) => sum + parseFloat(r.amount.replace('¥', '')), 0);
  const pendingAmount = SETTLEMENT_LIST
    .filter(r => r.status !== 'settled')
    .reduce((sum, r) => sum + parseFloat(r.amount.replace('¥', '')), 0);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* 固定标题栏 */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 44,
        background: `linear-gradient(180deg, ${THEME.bgDark} 0%, ${THEME.bgDark}CC 100%)`,
        display: 'flex', alignItems: 'center', padding: '0 16px',
        zIndex: 10, borderBottom: `1px solid ${THEME.borderLight}`,
      }}>
        <button onClick={onBack} style={{
          border: 'none', background: 'transparent', color: themeColor, fontSize: 18,
          cursor: 'pointer', padding: 0, marginRight: 12,
        }}>←</button>
        <span style={{ fontSize: 18, fontWeight: 600, color: THEME.textPrimary, flex: 1 }}>
          财务结算
        </span>
      </div>

      <div style={{ flex: 1, padding: '52px 16px 80px', overflow: 'auto' }}>
        {/* 收入概览 */}
        <Card style={{
          background: `linear-gradient(135deg, ${themeColor}15 0%, ${themeColor}05 100%)`,
          marginBottom: 16,
        }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: THEME.textSecondary, marginBottom: 4 }}>
              累计收入
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, color: themeColor }}>
              ¥{settledAmount.toFixed(2)}
            </div>
            <div style={{ fontSize: 12, color: THEME.textMuted, marginTop: 4 }}>
              待结算 ¥{pendingAmount.toFixed(2)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{
              flex: 1, background: THEME.bgCard, borderRadius: 12, padding: '14px 12px',
              textAlign: 'center', border: `1px solid ${THEME.borderLight}`,
            }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: THEME.success, marginBottom: 4 }}>
                ¥{settledAmount.toFixed(2)}
              </div>
              <div style={{ fontSize: 12, color: THEME.textMuted }}>已结算</div>
            </div>
            <div style={{
              flex: 1, background: THEME.bgCard, borderRadius: 12, padding: '14px 12px',
              textAlign: 'center', border: `1px solid ${THEME.borderLight}`,
            }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: THEME.warning, marginBottom: 4 }}>
                ¥{pendingAmount.toFixed(2)}
              </div>
              <div style={{ fontSize: 12, color: THEME.textMuted }}>待结算</div>
            </div>
            <div style={{
              flex: 1, background: THEME.bgCard, borderRadius: 12, padding: '14px 12px',
              textAlign: 'center', border: `1px solid ${THEME.borderLight}`,
            }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: themeColor, marginBottom: 4 }}>
                {SETTLEMENT_LIST.length}
              </div>
              <div style={{ fontSize: 12, color: THEME.textMuted }}>总单数</div>
            </div>
          </div>
        </Card>

        {/* 收入趋势简易图 */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: THEME.textPrimary, marginBottom: 16 }}>
            月度收入趋势
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 100, gap: 4 }}>
            {['1月', '2月', '3月', '4月', '5月', '6月', '7月'].map((month, i) => {
              const vals = [1200, 980, 1560, 2100, 1800, 2458, 1080];
              const val = vals[i];
              return (
                <div key={month} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: themeColor, marginBottom: 4 }}>
                    {val}
                  </div>
                  <div style={{
                    width: '100%', height: Math.max(val / 2458 * 70, 4),
                    background: `linear-gradient(180deg, ${themeColor} 0%, ${themeColor}30 100%)`,
                    borderRadius: '4px 4px 0 0', minWidth: 14,
                  }} />
                  <div style={{ fontSize: 10, color: THEME.textMuted, marginTop: 4 }}>{month}</div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* 服务类型收入分布 */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: THEME.textPrimary, marginBottom: 16 }}>
            各服务类型收入
          </div>
          {[
            { service: '助医', amount: 792, color: '#F59E0B', pct: 36 },
            { service: '助洁', amount: 384, color: '#10B981', pct: 17 },
            { service: '助餐', amount: 544, color: '#00D4FF', pct: 25 },
            { service: '助浴', amount: 352, color: '#A855F7', pct: 16 },
            { service: '助行', amount: 116, color: '#EF4444', pct: 5 },
          ].map((item) => (
            <div key={item.service} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '8px 0', borderTop: `1px solid ${THEME.borderLight}`,
            }}>
              <span style={{ fontSize: 13, color: THEME.textSecondary, width: 40 }}>{item.service}</span>
              <div style={{ flex: 1, height: 8, background: THEME.bgInput, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  width: `${item.pct}%`, height: '100%', background: item.color,
                  borderRadius: 4, transition: 'width 0.5s ease',
                }} />
              </div>
              <span style={{ fontSize: 13, color: THEME.textPrimary, fontWeight: 500, width: 60, textAlign: 'right' }}>
                ¥{item.amount}
              </span>
            </div>
          ))}
        </Card>

        {/* 结算记录 */}
        <div style={{ fontSize: 15, fontWeight: 600, color: THEME.textPrimary, marginBottom: 12 }}>
          结算记录
        </div>

        {/* 筛选 */}
        <div style={{
          display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto',
        }}>
          {FILTER_TABS.map(tab => {
            const isActive = activeFilter === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: '6px 14px', borderRadius: 16, fontSize: 12,
                  fontWeight: isActive ? 600 : 400, whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  background: isActive ? `${themeColor}20` : THEME.bgCard,
                  color: isActive ? themeColor : THEME.textSecondary,
                  border: `1px solid ${isActive ? `${themeColor}40` : THEME.borderLight}`,
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </div>
            );
          })}
        </div>

        {/* 记录列表 */}
        {filteredRecords.map(record => {
          const statusCfg = STATUS_CONFIG[record.status];
          return (
            <Card key={record.id} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: THEME.textPrimary }}>
                      {record.service}
                    </span>
                    <Tag color={statusCfg.color} bg={statusCfg.bg}>
                      {statusCfg.label}
                    </Tag>
                  </div>
                  <div style={{ fontSize: 12, color: THEME.textMuted }}>
                    {record.date} · {record.user} · {record.orderId}
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: themeColor, textAlign: 'right' }}>
                  {record.amount}
                </div>
              </div>
            </Card>
          );
        })}

        {/* 提现按钮 */}
        <div style={{ marginTop: 20 }}>
          <Button
            themeColor={themeColor}
            size="large"
            disabled={pendingAmount === 0}
          >
            <WalletOutlined style={{ marginRight: 6 }} />
            {pendingAmount > 0 ? `待结算 ¥${pendingAmount.toFixed(2)}` : '暂无待结算收入'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettlementPage;
