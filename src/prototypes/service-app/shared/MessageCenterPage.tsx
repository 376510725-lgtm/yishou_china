/**
 * 消息通知中心 - 服务商/服务人员通用
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import {
  BellOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Card, Tag, THEME } from '../shared/components';

interface MessageData {
  id: string;
  type: 'order' | 'system' | 'review' | 'settlement';
  title: string;
  content: string;
  time: string;
  read: boolean;
}

const MESSAGE_LIST: MessageData[] = [
  {
    id: 'msg1',
    type: 'order',
    title: '新订单提醒',
    content: '您有一条新的助餐订单待处理，客户：张阿姨，预约时间：今天12:00',
    time: '10分钟前',
    read: false,
  },
  {
    id: 'msg2',
    type: 'review',
    title: '审核结果通知',
    content: '您的入驻申请已通过审核，现在可以接单了',
    time: '2小时前',
    read: false,
  },
  {
    id: 'msg3',
    type: 'system',
    title: '系统通知',
    content: '系统将于今晚22:00进行维护升级，预计持续2小时',
    time: '昨天',
    read: true,
  },
  {
    id: 'msg4',
    type: 'settlement',
    title: '结算通知',
    content: '您5月份的收入已结算，金额¥3,458.00，预计3个工作日内到账',
    time: '3天前',
    read: true,
  },
  {
    id: 'msg5',
    type: 'order',
    title: '任务提醒',
    content: '您有一条任务即将超时，请尽快完成打卡',
    time: '5天前',
    read: true,
  },
];

const TYPE_CONFIG: Record<string, { icon: React.ReactNode; color: string }> = {
  order: { icon: <BellOutlined />, color: '#00D4FF' },
  review: { icon: <CheckCircleOutlined />, color: '#10B981' },
  system: { icon: <InfoCircleOutlined />, color: '#F59E0B' },
  settlement: { icon: <WalletOutlined />, color: '#A855F7' },
};

const FILTER_TABS = [
  { id: 'all', label: '全部' },
  { id: 'order', label: '订单' },
  { id: 'system', label: '系统' },
  { id: 'review', label: '审核' },
  { id: 'settlement', label: '结算' },
];

interface MessageCenterPageProps {
  themeColor?: string;
  onBack: () => void;
}

export const MessageCenterPage: React.FC<MessageCenterPageProps> = ({
  themeColor = '#00D4FF',
  onBack,
}) => {
  const [messages, setMessages] = useState(MESSAGE_LIST);
  const [activeFilter, setActiveFilter] = useState('all');

  const unreadCount = messages.filter((m) => !m.read).length;

  const filteredMessages =
    activeFilter === 'all'
      ? messages
      : messages.filter((m) => m.type === activeFilter);

  const handleMarkRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

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
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: THEME.textPrimary,
            flex: 1,
          }}
        >
          消息中心
        </span>
        {unreadCount > 0 && (
          <Tag color={THEME.danger} bg={`${THEME.danger}20`}>
            {unreadCount}条未读
          </Tag>
        )}
      </div>

      {/* 筛选 */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: '52px 16px 12px',
          overflowX: 'auto',
          flexShrink: 0,
        }}
      >
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 21,
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                background: isActive ? `${themeColor}20` : THEME.bgCard,
                color: isActive ? themeColor : THEME.textSecondary,
                border: `1px solid ${isActive ? `${themeColor}50` : `${THEME.borderLight}`}`,
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </div>
          );
        })}
      </div>

      {/* 消息列表 */}
      <div style={{ flex: 1, padding: '0 16px 16px', overflow: 'auto' }}>
        {filteredMessages.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 80,
            }}
          >
            <BellOutlined
              style={{ fontSize: 48, color: THEME.textMuted, opacity: 0.3, marginBottom: 16 }}
            />
            <div style={{ fontSize: 15, color: THEME.textMuted }}>暂无消息</div>
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const cfg = TYPE_CONFIG[msg.type];
            return (
              <Card
                key={msg.id}
                onClick={() => handleMarkRead(msg.id)}
                style={{ marginBottom: 10, opacity: msg.read ? 0.7 : 1 }}
              >
                <div style={{ display: 'flex', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: `${cfg.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: cfg.color,
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {cfg.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 4,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: msg.read ? 400 : 600,
                            color: THEME.textPrimary,
                          }}
                        >
                          {msg.title}
                        </span>
                        {!msg.read && (
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              background: THEME.danger,
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </div>
                      <span style={{ fontSize: 11, color: THEME.textMuted, whiteSpace: 'nowrap' }}>
                        {msg.time}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: THEME.textSecondary,
                        lineHeight: 1.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MessageCenterPage;
