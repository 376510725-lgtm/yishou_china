/**
 * 服务商管理端 - 添加服务人员页面
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import {
  QrcodeOutlined,
} from '@ant-design/icons';
import { Button, Input, Card, NavBar, THEME } from '../shared/components';

// 服务类型选项
const SERVICE_TYPES = [
  { label: '助餐', icon: '🍽️' },
  { label: '助浴', icon: '🛁' },
  { label: '助洁', icon: '🧹' },
  { label: '助医', icon: '💊' },
  { label: '助急', icon: '🚑' },
  { label: '助行', icon: '🚶' },
];

interface StaffAddPageProps {
  themeColor?: string;
  onBack: () => void;
  onSuccess: () => void;
}

export const StaffAddPage: React.FC<StaffAddPageProps> = ({
  themeColor = '#00D4FF',
  onBack,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (label: string) => {
    if (selectedServices.includes(label)) {
      setSelectedServices(selectedServices.filter((s) => s !== label));
    } else {
      setSelectedServices([...selectedServices, label]);
    }
  };

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
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: THEME.textPrimary }}>
            添加服务人员
          </span>
        </div>
        <div style={{ width: 30 }} />
      </div>

      <div
        style={{
          flex: 1,
          padding: '64px 20px 32px',
          overflow: 'auto',
        }}
      >
        <Card style={{ marginBottom: 16 }}>
          {/* 姓名 */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: 'block',
                fontSize: 14,
                color: THEME.textSecondary,
                marginBottom: 8,
              }}
            >
              姓名
            </label>
            <Input
              placeholder="请输入服务人员姓名"
              value={formData.name}
              onChange={(v) => setFormData({ ...formData, name: v })}
              themeColor={themeColor}
            />
          </div>

          {/* 手机号 */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: 'block',
                fontSize: 14,
                color: THEME.textSecondary,
                marginBottom: 8,
              }}
            >
              手机号
            </label>
            <Input
              placeholder="请输入手机号"
              value={formData.phone}
              onChange={(v) => setFormData({ ...formData, phone: v })}
              prefix="+86"
              themeColor={themeColor}
            />
          </div>

          {/* 擅长服务 */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 14,
                color: THEME.textSecondary,
                marginBottom: 12,
              }}
            >
              擅长服务（可多选）
            </label>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              {SERVICE_TYPES.map((service) => (
                <div
                  key={service.label}
                  onClick={() => toggleService(service.label)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 14px',
                    borderRadius: 10,
                    fontSize: 13,
                    cursor: 'pointer',
                    background: selectedServices.includes(service.label)
                      ? `${themeColor}20`
                      : THEME.bgInput,
                    border: selectedServices.includes(service.label)
                      ? `1px solid ${themeColor}50`
                      : '1px solid transparent',
                    color: selectedServices.includes(service.label)
                      ? themeColor
                      : THEME.textSecondary,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{service.icon}</span>
                  <span>{service.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 提示卡片 */}
        <Card
          style={{
            background: `${themeColor}10`,
            border: `1px solid ${themeColor}30`,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 10,
            }}
          >
            <QrcodeOutlined
              style={{
                color: themeColor,
                fontSize: 18,
                flexShrink: 0,
                marginTop: 2,
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: THEME.textSecondary,
                lineHeight: 1.6,
              }}
            >
              添加成功后，系统将发送邀请短信给服务人员。
            </span>
          </div>
        </Card>

        {/* 提交按钮 */}
        <Button onClick={onSuccess} themeColor={themeColor}>
          添加并发送邀请
        </Button>
      </div>
    </div>
  );
};

export default StaffAddPage;