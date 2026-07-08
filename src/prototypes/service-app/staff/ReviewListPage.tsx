/**
 * 服务人员端 - 我的评价页面
 * 深空暗夜科技风格
 */

import React, { useState, useMemo } from 'react';
import {
  StarFilled,
  StarOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Card, Tag, Avatar, THEME } from '../shared/components';
import { REVIEW_LIST } from '../shared/mock';

interface ReviewListPageProps {
  themeColor?: string;
  onBack: () => void;
}

export const ReviewListPage: React.FC<ReviewListPageProps> = ({
  themeColor = '#A855F7',
  onBack,
}) => {
  const [activeFilter, setActiveFilter] = useState<number | 'all'>('all');

  const list = useMemo(() => {
    if (activeFilter === 'all') return REVIEW_LIST;
    return REVIEW_LIST.filter(r => r.rating === activeFilter);
  }, [activeFilter]);

  const stats = useMemo(() => {
    const avg = REVIEW_LIST.length > 0
      ? (REVIEW_LIST.reduce((sum, r) => sum + r.rating, 0) / REVIEW_LIST.length).toFixed(1)
      : '0.0';
    return {
      avg,
      total: REVIEW_LIST.length,
      good: REVIEW_LIST.filter(r => r.rating >= 4).length,
    };
  }, []);

  const ratingDistribution = useMemo(() => {
    const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    REVIEW_LIST.forEach(r => { dist[r.rating] = (dist[r.rating] || 0) + 1; });
    return dist;
  }, []);

  const maxCount = Math.max(...Object.values(ratingDistribution), 1);

  const FILTER_TABS = [
    { id: 'all' as const, label: `全部(${stats.total})` },
    { id: 5, label: `好评(${ratingDistribution[5]})` },
    { id: 4, label: `中评(${ratingDistribution[4] + ratingDistribution[3]})` },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* 标题栏 */}
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
          我的评价
        </span>
      </div>

      <div style={{ flex: 1, paddingTop: 44, overflow: 'auto' }}>
        {/* 综合评价卡片 */}
        <Card style={{ margin: '16px 16px 0', padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* 评分 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 42, fontWeight: 700, color: themeColor, lineHeight: 1 }}>
                {stats.avg}
              </div>
              <div style={{ display: 'flex', gap: 2, marginTop: 6, justifyContent: 'center' }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <StarFilled key={i} style={{
                    fontSize: 14,
                    color: i <= Math.round(Number(stats.avg)) ? '#F59E0B' : THEME.borderLight,
                  }} />
                ))}
              </div>
              <div style={{ fontSize: 12, color: THEME.textMuted, marginTop: 6 }}>
                共 {stats.total} 条评价
              </div>
            </div>

            {/* 分布条 */}
            <div style={{ flex: 1 }}>
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} style={{
                  display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4,
                }}>
                  <span style={{ fontSize: 12, color: THEME.textSecondary, width: 28, textAlign: 'right' }}>
                    {star}星
                  </span>
                  <div style={{
                    flex: 1, height: 6, borderRadius: 3, background: THEME.bgInput,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%', borderRadius: 3,
                      width: `${(ratingDistribution[star] / maxCount) * 100}%`,
                      background: star >= 4 ? THEME.success : star >= 3 ? THEME.warning : THEME.danger,
                      transition: 'width 0.3s',
                    }} />
                  </div>
                  <span style={{ fontSize: 11, color: THEME.textMuted, width: 20 }}>
                    {ratingDistribution[star]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 筛选 */}
        <div style={{
          display: 'flex', gap: 6, padding: '12px 16px', overflowX: 'auto',
        }}>
          {FILTER_TABS.map(tab => {
            const isActive = activeFilter === tab.id;
            return (
              <div
                key={String(tab.id)}
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

        {/* 评价列表 */}
        <div style={{ padding: '0 16px 80px' }}>
          {list.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: 60 }}>
              <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>📝</div>
              <div style={{ fontSize: 15, color: THEME.textMuted }}>暂无评价</div>
            </div>
          ) : (
            list.map(review => (
              <Card key={review.id} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Avatar letter={review.userAvatar} color={review.userColor} size={36} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: THEME.textPrimary }}>
                      {review.userName}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      <div style={{ display: 'flex', gap: 1 }}>
                        {[1, 2, 3, 4, 5].map(i => (
                          i <= review.rating
                            ? <StarFilled key={i} style={{ fontSize: 12, color: '#F59E0B' }} />
                            : <StarOutlined key={i} style={{ fontSize: 12, color: THEME.textMuted }} />
                        ))}
                      </div>
                      <span style={{ fontSize: 11, color: THEME.textMuted }}>
                        <CalendarOutlined style={{ marginRight: 2 }} />{review.date}
                      </span>
                    </div>
                  </div>
                  <Tag color={themeColor} bg={`${themeColor}20`}>{review.serviceType}</Tag>
                </div>

                <div style={{
                  fontSize: 13, color: THEME.textSecondary, lineHeight: 1.6,
                  marginBottom: 10,
                }}>
                  {review.content}
                </div>

                {review.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {review.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 11, padding: '3px 10px',
                        background: `${themeColor}10`,
                        color: themeColor,
                        borderRadius: 10,
                        border: `1px solid ${themeColor}20`,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewListPage;
