/**
 * 服务商入驻申请状态页
 * 深空暗夜科技风格
 */

import React from 'react';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  BuildOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import { Button, Card, THEME } from '../shared/components';

// 入驻状态类型
type SettleStatus = 'pending' | 'rejected' | 'approved';

// 模拟入驻申请数据
const MOCK_APPLICATION = {
  companyName: '重庆益寿养老服务有限公司',
  contact: '王旭东',
  phone: '138****8888',
  address: '重庆市渝中区解放碑街道XX号',
  serviceTypes: ['助餐', '助洁', '助医'],
  applyTime: '2024-06-01 10:30',
  status: 'pending' as SettleStatus,
  rejectReason: '营业执照信息与填写企业名称不一致，请核实后重新提交。',
  uploads: {
    businessLicense: '已上传',
    idCardFront: '已上传',
    idCardBack: '已上传',
  },
};

interface SettleStatusPageProps {
  themeColor?: string;
  status: SettleStatus;
  onBack: () => void;
  onCancel?: () => void;
  onModify?: () => void;
}

export const SettleStatusPage: React.FC<SettleStatusPageProps> = ({
  themeColor = THEME.providerPrimary,
  status,
  onBack,
  onCancel,
  onModify,
}) => {
  const application = { ...MOCK_APPLICATION, status };
  const [showCancelConfirm, setShowCancelConfirm] = React.useState(false);
  const [devStatus, setDevStatus] = React.useState<SettleStatus>(status);

  // 开发调试：循环切换状态
  const cycleStatus = () => {
    const order: SettleStatus[] = ['pending', 'rejected', 'approved'];
    const idx = order.indexOf(devStatus);
    setDevStatus(order[(idx + 1) % order.length]);
  };

  // 根据状态获取配置
  const getStatusConfig = (status: SettleStatus) => {
    switch (status) {
      case 'pending':
        return {
          label: '审核中',
          icon: <ClockCircleOutlined />,
          color: THEME.warning,
          bgColor: `${THEME.warning}15`,
          description: '您的入驻申请已提交，请耐心等待平台审核（1-3个工作日）',
        };
      case 'rejected':
        return {
          label: '审核失败',
          icon: <CloseCircleOutlined />,
          color: THEME.danger,
          bgColor: `${THEME.danger}15`,
          description: '您的入驻申请未通过审核，请查看失败原因',
        };
      case 'approved':
        return {
          label: '审核通过',
          icon: <CheckCircleOutlined />,
          color: THEME.success,
          bgColor: `${THEME.success}15`,
          description: '恭喜！您的入驻申请已通过审核，可以开始接收订单',
        };
    }
  };

  const statusConfig = getStatusConfig(devStatus);

  // 计算底部操作栏高度
  const getBottomBarHeight = () => {
    if (devStatus === 'pending' && showCancelConfirm) return 100;
    return 60;
  };

  return (
    <div
      style={{
        height: '100%',
        background: THEME.bgDark,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* 固定标题栏 */}
      <div
        style={{
          flexShrink: 0,
          height: 44,
          background: THEME.bgDark,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
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
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: THEME.textPrimary }}>
            入驻申请
          </span>
        </div>
        <div style={{ width: 30 }} />
      </div>

      {/* 内容区域 */}
      <div
        style={{
          flex: 1,
          padding: '16px 16px 16px',
          overflow: 'auto',
          paddingBottom: getBottomBarHeight() + 16,
        }}
      >
        {/* 状态卡片 */}
        <Card style={{ marginBottom: 16 }}>
          <div
            style={{
              background: statusConfig.bgColor,
              borderRadius: 12,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {/* 状态图标 */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: `${statusConfig.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                color: statusConfig.color,
              }}
            >
              {statusConfig.icon}
            </div>
            {/* 状态标签 - 点击可切换审核状态 */}
            <div
              onClick={cycleStatus}
              style={{
                padding: '6px 16px',
                borderRadius: 20,
                background: `${statusConfig.color}25`,
                color: statusConfig.color,
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                userSelect: 'none',
              }}
              title="点击切换审核状态"
            >
              {statusConfig.label}
            </div>
            {/* 状态描述 */}
            <p
              style={{
                margin: 0,
                color: THEME.textSecondary,
                fontSize: 14,
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              {statusConfig.description}
            </p>
          </div>
        </Card>

        {/* 申请信息卡片 */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ padding: '4px 0' }}>
            {/* 标题 */}
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: THEME.textPrimary,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <BuildOutlined style={{ color: themeColor }} />
              申请信息
            </div>

            {/* 企业名称 */}
            <div style={infoItemStyle}>
              <span style={labelStyle}>企业名称</span>
              <span style={valueStyle}>{application.companyName}</span>
            </div>

            {/* 联系人 */}
            <div style={infoItemStyle}>
              <span style={labelStyle}>联系人</span>
              <span style={valueStyle}>{application.contact}</span>
            </div>

            {/* 联系电话 */}
            <div style={infoItemStyle}>
              <span style={labelStyle}>联系电话</span>
              <span style={valueStyle}>{application.phone}</span>
            </div>

            {/* 详细地址 */}
            <div style={infoItemStyle}>
              <span style={labelStyle}>详细地址</span>
              <span style={valueStyle}>{application.address}</span>
            </div>

            {/* 服务类型 */}
            <div style={{ ...infoItemStyle, borderBottom: 'none' }}>
              <span style={labelStyle}>服务类型</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-end' }}>
                {application.serviceTypes.map((type, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 4,
                      background: `${themeColor}20`,
                      color: themeColor,
                      fontSize: 12,
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* 上传资料卡片 */}
        <Card style={{ marginBottom: 16 }}>
          <div style={{ padding: '4px 0' }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: THEME.textPrimary,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <FileImageOutlined style={{ color: themeColor }} />
              上传资料
            </div>

            {/* 营业执照 */}
            <div style={infoItemStyle}>
              <span style={labelStyle}>营业执照</span>
              <span style={{
                color: application.uploads.businessLicense ? THEME.success : THEME.textMuted,
                fontSize: 13,
              }}>
                {application.uploads.businessLicense ? '已上传 ✓' : '未上传'}
              </span>
            </div>

            {/* 身份证正面 */}
            <div style={infoItemStyle}>
              <span style={labelStyle}>身份证正面</span>
              <span style={{
                color: application.uploads.idCardFront ? THEME.success : THEME.textMuted,
                fontSize: 13,
              }}>
                {application.uploads.idCardFront ? '已上传 ✓' : '未上传'}
              </span>
            </div>

            {/* 身份证反面 */}
            <div style={{ ...infoItemStyle, borderBottom: 'none' }}>
              <span style={labelStyle}>身份证反面</span>
              <span style={{
                color: application.uploads.idCardBack ? THEME.success : THEME.textMuted,
                fontSize: 13,
              }}>
                {application.uploads.idCardBack ? '已上传 ✓' : '未上传'}
              </span>
            </div>
          </div>
        </Card>

        {/* 申请时间 */}
        <div
          style={{
            textAlign: 'center',
            color: THEME.textMuted,
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          申请时间：{application.applyTime}
        </div>

        {/* 审核失败 - 显示失败原因 */}
        {devStatus === 'rejected' && (
          <Card style={{ marginBottom: 16 }}>
            <div style={{ padding: '4px 0' }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: THEME.danger,
                  marginBottom: 12,
                }}
              >
                失败原因
              </div>
              <p
                style={{
                  margin: 0,
                  color: THEME.textSecondary,
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                {application.rejectReason}
              </p>
            </div>
          </Card>
        )}

        {/* 审核通过 - 显示下一步 */}
        {devStatus === 'approved' && (
          <Card>
            <div style={{ padding: '4px 0' }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: THEME.success,
                  marginBottom: 12,
                }}
              >
                下一步
              </div>
              <p
                style={{
                  margin: 0,
                  color: THEME.textSecondary,
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                您可以开始接收订单和管理服务人员了。点击工作台查看您的订单。
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* 固定底部操作栏 */}
      <div
        style={{
          flexShrink: 0,
          padding: '12px 16px',
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          background: THEME.bgDark,
          borderTop: `1px solid ${THEME.borderLight}`,
        }}
      >
        {/* 审核中 - 撤销申请 */}
        {devStatus === 'pending' && !showCancelConfirm && (
          <Button
            onClick={() => setShowCancelConfirm(true)}
            themeColor={THEME.danger}
            style={{ width: '100%' }}
          >
            撤销申请
          </Button>
        )}

        {/* 撤销确认 */}
        {devStatus === 'pending' && showCancelConfirm && (
          <div>
            <p
              style={{
                margin: 0,
                color: THEME.textSecondary,
                fontSize: 14,
                textAlign: 'center',
                lineHeight: 1.6,
                marginBottom: 12,
              }}
            >
              确定撤销入驻申请吗？撤销后可重新提交。
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button
                onClick={() => setShowCancelConfirm(false)}
                type="default"
                themeColor={themeColor}
                style={{ flex: 1 }}
              >
                再想想
              </Button>
              <Button
                onClick={onCancel}
                themeColor={THEME.danger}
                style={{ flex: 1 }}
              >
                确认撤销
              </Button>
            </div>
          </div>
        )}

        {/* 审核失败 - 修改重新提交 */}
        {devStatus === 'rejected' && (
          <Button
            onClick={onModify}
            themeColor={themeColor}
            style={{ width: '100%' }}
          >
            修改重新提交
          </Button>
        )}

        {/* 审核通过 - 返回工作台 */}
        {devStatus === 'approved' && (
          <Button
            onClick={onBack}
            themeColor={themeColor}
            style={{ width: '100%' }}
          >
            返回工作台
          </Button>
        )}
      </div>
    </div>
  );
};

// 样式
const infoItemStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 0',
  borderBottom: `1px solid ${THEME.borderLight}`,
};

const labelStyle: React.CSSProperties = {
  color: THEME.textMuted,
  fontSize: 14,
};

const valueStyle: React.CSSProperties = {
  color: THEME.textPrimary,
  fontSize: 14,
  textAlign: 'right',
  maxWidth: '60%',
};

export default SettleStatusPage;