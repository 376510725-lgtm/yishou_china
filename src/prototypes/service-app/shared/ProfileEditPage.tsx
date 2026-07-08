/**
 * 个人资料编辑页 - 服务商/服务人员通用
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Button, Input, Card, Avatar, THEME, Toast } from '../shared/components';

const SKILL_OPTIONS = ['助餐', '助洁', '助医', '助浴', '助行', '助急'];
const AREA_OPTIONS = [
  '渝中区', '江北区', '南岸区', '沙坪坝区', '九龙坡区',
  '大渡口区', '巴南区', '渝北区', '北碚区',
];
const EXPERIENCE_OPTIONS = [
  '1年以下', '1-2年', '2-3年', '3-5年', '5年以上',
];

interface ProfileEditPageProps {
  themeColor?: string;
  onBack: () => void;
  role: 'provider' | 'staff';
}

export const ProfileEditPage: React.FC<ProfileEditPageProps> = ({
  themeColor = '#00D4FF',
  onBack,
  role,
}) => {
  const [name, setName] = useState('王小明');
  const [phone, setPhone] = useState('138****1234');
  const [idCard, setIdCard] = useState('510***********1234');
  const [skills, setSkills] = useState<string[]>(['助餐', '助洁']);
  const [experience, setExperience] = useState('3年');
  const [area, setArea] = useState('渝中区');
  const [showToast, setShowToast] = useState(false);

  const chipStyle = (selected: boolean) => ({
    padding: '7px 14px',
    borderRadius: 16,
    fontSize: 12,
    cursor: 'pointer',
    background: selected ? `${themeColor}20` : THEME.bgInput,
    color: selected ? themeColor : THEME.textSecondary,
    border: `1px solid ${selected ? `${themeColor}50` : THEME.borderLight}`,
    transition: 'all 0.2s ease',
  });

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: THEME.bgDark }}>
      {/* 标题栏 */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 44,
        background: `linear-gradient(180deg, ${THEME.bgDark} 0%, ${THEME.bgDark}CC 100%)`,
        display: 'flex', alignItems: 'center', padding: '0 16px',
        zIndex: 10, borderBottom: `1px solid ${THEME.borderLight}`,
      }}>
        <button onClick={onBack} style={{ border: 'none', background: 'transparent', color: themeColor, fontSize: 18, cursor: 'pointer' }}>←</button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: THEME.textPrimary }}>编辑资料</span>
        </div>
        <div style={{ width: 30 }} />
      </div>

      <div style={{ flex: 1, padding: '64px 16px 32px', overflow: 'auto' }}>
        {/* 头像 */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Avatar letter="王" color={themeColor} size={80} />
          <div style={{ fontSize: 12, color: themeColor, marginTop: 10, cursor: 'pointer' }}>更换头像</div>
        </div>

        {/* 基本信息 */}
        <Card style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: THEME.textPrimary, marginBottom: 16 }}>
            基本信息
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: THEME.textMuted, marginBottom: 6 }}>姓名</div>
              <Input value={name} onChange={setName} themeColor={themeColor} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: THEME.textMuted, marginBottom: 6 }}>手机号</div>
              <Input value={phone} onChange={setPhone} themeColor={themeColor} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: THEME.textMuted, marginBottom: 6 }}>身份证号</div>
              <Input value={idCard} onChange={setIdCard} themeColor={themeColor} />
            </div>
          </div>
        </Card>

        {/* 服务信息（仅服务人员） */}
        {role === 'staff' && (
          <Card style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: THEME.textPrimary, marginBottom: 16 }}>
              服务信息
            </div>

            {/* 擅长技能 */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: THEME.textMuted, marginBottom: 8 }}>擅长技能</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SKILL_OPTIONS.map(skill => {
                  const selected = skills.includes(skill);
                  return (
                    <div
                      key={skill}
                      onClick={() => {
                        setSkills(prev =>
                          prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
                        );
                      }}
                      style={chipStyle(selected)}
                    >
                      {skill}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 服务区域 */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: THEME.textMuted, marginBottom: 8 }}>服务区域</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {AREA_OPTIONS.map(a => (
                  <div
                    key={a}
                    onClick={() => setArea(a)}
                    style={chipStyle(area === a)}
                  >
                    <EnvironmentOutlined style={{ marginRight: 4 }} />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* 服务年限 */}
            <div>
              <div style={{ fontSize: 12, color: THEME.textMuted, marginBottom: 8 }}>服务年限</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {EXPERIENCE_OPTIONS.map(exp => (
                  <div
                    key={exp}
                    onClick={() => setExperience(exp)}
                    style={chipStyle(experience === exp)}
                  >
                    {exp}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* 修改密码 */}
        <Card style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: THEME.textPrimary, marginBottom: 16 }}>
            修改密码
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input placeholder="原密码" type="password" themeColor={themeColor} />
            <Input placeholder="新密码" type="password" themeColor={themeColor} />
            <Input placeholder="确认新密码" type="password" themeColor={themeColor} />
          </div>
        </Card>

        <Button onClick={handleSave} themeColor={themeColor}>保存修改</Button>
      </div>

      <Toast visible={showToast} message="资料保存成功" type="success" themeColor={themeColor} />
    </div>
  );
};

export default ProfileEditPage;
