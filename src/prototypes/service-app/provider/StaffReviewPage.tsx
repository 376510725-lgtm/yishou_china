/**
 * 服务商管理端 - 人员审核页面
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserAddOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Card, Tag, Avatar, Modal, THEME } from '../shared/components';
import type { StaffData } from '../shared/mock';

const FILTER_TABS = [
  { id: 'all', label: '全部' },
  { id: 'pending', label: '待审核' },
  { id: 'approved', label: '已通过' },
  { id: 'rejected', label: '已驳回' },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: '待审核', color: '#F59E0B', bg: '#F59E0B20' },
  approved: { label: '已通过', color: '#10B981', bg: '#10B98120' },
  rejected: { label: '已驳回', color: '#EF4444', bg: '#EF444420' },
};

interface StaffReviewPageProps {
  themeColor?: string;
  onBack: () => void;
  staffList: StaffData[];
  onApprove?: (staff: StaffData) => void;
  onReject?: (staff: StaffData) => void;
}

export const StaffReviewPage: React.FC<StaffReviewPageProps> = ({
  themeColor = '#00D4FF',
  onBack,
  staffList,
  onApprove,
  onReject,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [rejectModal, setRejectModal] = useState<StaffData | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // 从 staffList 派生审核数据：reviewStatus 不为 'approved' 的，或者有 reviewStatus 的
  const reviewList = staffList.filter(s => s.reviewStatus);

  const pendingCount = reviewList.filter(r => r.reviewStatus === 'pending').length;

  const filteredList = activeFilter === 'all'
    ? reviewList
    : reviewList.filter(r => r.reviewStatus === activeFilter);

  const handleApprove = (staff: StaffData) => {
    onApprove?.(staff);
  };

  const handleReject = () => {
    if (!rejectModal || !rejectReason.trim()) return;
    onReject?.({ ...rejectModal, reason: rejectReason });
    setRejectModal(null);
    setRejectReason('');
  };

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
          人员审核
        </span>
        {pendingCount > 0 && (
          <Tag color={THEME.warning} bg={`${THEME.warning}20`}>{pendingCount}人待审</Tag>
        )}
      </div>

      <div style={{ flex: 1, paddingTop: 44, overflow: 'auto' }}>
        {/* 统计卡片 */}
        <div style={{ padding: '16px 16px 0', display: 'flex', gap: 10 }}>
          {[
            { label: '待审核', value: reviewList.filter(r => r.reviewStatus === 'pending').length, color: THEME.warning },
            { label: '已通过', value: reviewList.filter(r => r.reviewStatus === 'approved').length, color: THEME.success },
            { label: '已驳回', value: reviewList.filter(r => r.reviewStatus === 'rejected').length, color: THEME.danger },
          ].map(stat => (
            <Card key={stat.label} style={{ flex: 1, textAlign: 'center', padding: '14px 8px', marginBottom: 0 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: THEME.textMuted, marginTop: 4 }}>{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* 筛选 */}
        <div style={{
          display: 'flex', gap: 6, padding: '12px 16px', overflowX: 'auto',
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

        {/* 审核列表 */}
        <div style={{ padding: '0 16px 80px' }}>
          {filteredList.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: 60 }}>
              <UserAddOutlined style={{ fontSize: 48, color: THEME.textMuted, opacity: 0.3, marginBottom: 16 }} />
              <div style={{ fontSize: 15, color: THEME.textMuted }}>暂无审核记录</div>
            </div>
          ) : (
            filteredList.map(staff => {
              const statusCfg = STATUS_CONFIG[staff.reviewStatus!];
              return (
                <Card key={staff.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <Avatar letter={staff.avatar} color={staff.color} size={48} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 15, fontWeight: 500, color: THEME.textPrimary }}>
                          {staff.name}
                        </span>
                        <Tag color={statusCfg.color} bg={statusCfg.bg}>
                          {statusCfg.label}
                        </Tag>
                      </div>
                      <div style={{ fontSize: 12, color: THEME.textMuted }}>
                        <PhoneOutlined style={{ marginRight: 4 }} />{staff.phone}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    fontSize: 13, color: THEME.textSecondary, marginBottom: 12,
                    background: THEME.bgInput, borderRadius: 8, padding: '10px 12px',
                  }}>
                    <div style={{ marginBottom: 4 }}>
                      擅长技能：{staff.skills.join('、')}
                    </div>
                    <div style={{ marginBottom: 4 }}>
                      <EnvironmentOutlined style={{ marginRight: 4 }} />服务区域：{staff.area || '未填写'}
                    </div>
                    <div style={{ marginBottom: 4 }}>经验：{staff.experience || '未填写'}</div>
                    <div style={{ fontSize: 12, color: THEME.textMuted }}>
                      申请时间：{staff.applyTime || '未知'}
                    </div>
                  </div>

                  {staff.reviewStatus === 'pending' && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div
                        onClick={() => handleApprove(staff)}
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          gap: 4, padding: '10px 0', borderRadius: 8,
                          background: `${THEME.success}15`, color: THEME.success,
                          border: `1px solid ${THEME.success}30`,
                          fontSize: 14, fontWeight: 500, cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <CheckCircleOutlined /> 通过
                      </div>
                      <div
                        onClick={() => { setRejectModal(staff); setRejectReason(''); }}
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          gap: 4, padding: '10px 0', borderRadius: 8,
                          background: `${THEME.danger}15`, color: THEME.danger,
                          border: `1px solid ${THEME.danger}30`,
                          fontSize: 14, fontWeight: 500, cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <CloseCircleOutlined /> 驳回
                      </div>
                    </div>
                  )}

                  {staff.reviewStatus === 'rejected' && staff.reason && (
                    <div style={{
                      fontSize: 12, color: THEME.danger, padding: '8px 12px',
                      background: `${THEME.danger}10`, borderRadius: 8,
                    }}>
                      驳回原因：{staff.reason}
                    </div>
                  )}
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* 驳回确认弹窗 */}
      <Modal
        visible={!!rejectModal}
        title="驳回申请"
        onClose={() => setRejectModal(null)}
        themeColor={themeColor}
        footer={
          <>
            <button
              onClick={() => setRejectModal(null)}
              style={{
                flex: 1, height: 44, background: THEME.bgInput,
                border: `1px solid ${THEME.borderLight}`, borderRadius: 12,
                color: THEME.textSecondary, fontSize: 14, cursor: 'pointer',
              }}
            >取消</button>
            <button
              onClick={handleReject}
              disabled={!rejectReason.trim()}
              style={{
                flex: 1, height: 44, background: rejectReason.trim() ? THEME.danger : THEME.bgInput,
                border: 'none', borderRadius: 12, color: '#fff', fontSize: 14,
                fontWeight: 600, cursor: rejectReason.trim() ? 'pointer' : 'not-allowed',
                opacity: rejectReason.trim() ? 1 : 0.5,
              }}
            >确认驳回</button>
          </>
        }
      >
        <div>
          <p style={{ marginBottom: 8, color: THEME.textPrimary }}>
            确定驳回 <strong>{rejectModal?.name}</strong> 的入驻申请？
          </p>
          <div style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 12 }}>
            请填写驳回原因：
          </div>
          <textarea
            value={rejectReason}
            onChange={e => setRejectReason(e.target.value)}
            placeholder="请输入驳回原因..."
            style={{
              width: '100%', minHeight: 60, padding: '10px 12px',
              background: THEME.bgInput, border: `1px solid ${THEME.borderLight}`,
              borderRadius: 8, color: THEME.textPrimary, fontSize: 13,
              outline: 'none', resize: 'vertical',
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default StaffReviewPage;
