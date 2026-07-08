/**
 * 服务人员注册页
 * 深空暗夜科技风格
 */

import React, { useState } from 'react';
import {
  CheckCircleOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { Button, Input, Card, THEME } from '../shared/components';
import logoImg from '../LOGO1.png';

export interface RegisterFormData {
  phone: string;
  name: string;
  idCard: string;
  skills: string[];
  area: string;
  experience: string;
}

interface StaffRegisterPageProps {
  themeColor?: string;
  onBack: () => void;
  onSuccess: () => void;
  onRegisterSuccess?: (data: RegisterFormData) => void;
}

const SKILL_OPTIONS = ['助餐', '助洁', '助医', '助浴', '助行', '助急'];

const AREA_OPTIONS = [
  '渝中区', '江北区', '南岸区', '沙坪坝区', '九龙坡区',
  '大渡口区', '巴南区', '渝北区', '北碚区',
];

const EXPERIENCE_OPTIONS = [
  '1年以下', '1-2年', '2-3年', '3-5年', '5年以上',
];

export const StaffRegisterPage: React.FC<StaffRegisterPageProps> = ({
  themeColor = THEME.staffPrimary,
  onBack,
  onSuccess,
  onRegisterSuccess,
}) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: 账号信息, 2: 完善资料, 3: 实名认证
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 2/3 字段
  const [staffName, setStaffName] = useState('');
  const [idCard, setIdCard] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [faceVerified, setFaceVerified] = useState(false); // 人脸识别状态

  // Step 1: 账号信息（手机号+验证码+邀请码+密码+协议）
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!phone) {
      newErrors.phone = '请输入手机号';
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      newErrors.phone = '手机号格式不正确';
    }
    if (!code) {
      newErrors.code = '请输入验证码';
    }
    if (!inviteCode) {
      newErrors.inviteCode = '请输入服务商邀请码';
    }
    if (!password) {
      newErrors.password = '请设置密码';
    } else if (password.length < 8 || password.length > 16) {
      newErrors.password = '密码长度为8-16位';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = '请确认密码';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = '两次密码不一致';
    }
    if (!agreementChecked) {
      newErrors.agreement = '请阅读并同意用户协议和隐私政策';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2: 完善资料（擅长技能+服务区域+服务经验）
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (selectedSkills.length === 0) {
      newErrors.skills = '请选择至少一项擅长技能';
    }
    if (!selectedArea) {
      newErrors.area = '请选择服务区域';
    }
    if (!selectedExperience) {
      newErrors.experience = '请选择服务经验';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 3: 实名认证（姓名+身份证号+人脸识别）
  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!staffName.trim()) {
      newErrors.name = '请输入姓名';
    }
    if (!idCard) {
      newErrors.idCard = '请输入身份证号';
    } else if (!/^\d{17}[\dXx]$/.test(idCard)) {
      newErrors.idCard = '身份证号格式不正确';
    }
    if (!faceVerified) {
      newErrors.face = '请完成人脸识别验证';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleToStep3 = () => {
    if (validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = () => {
    if (validateStep3()) {
      onRegisterSuccess?.({
        phone,
        name: staffName.trim(),
        idCard,
        skills: selectedSkills,
        area: selectedArea,
        experience: selectedExperience,
      });
      onSuccess();
    }
  };

  return (
    <div
      style={{
        height: '100%',
        background: THEME.bgDark,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      {/* 顶部导航 */}
      <div
        style={{
          height: 44,
          background: THEME.bgDark,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          borderBottom: `1px solid ${THEME.borderLight}`,
        }}
      >
        <button
          onClick={currentStep === 1 ? onBack : () => setCurrentStep(currentStep - 1)}
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
            服务人员注册
          </span>
        </div>
        <div style={{ width: 30 }} />
      </div>

      {/* 内容区域 */}
      <div
        style={{
          flex: 1,
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* 步骤指示器 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 24,
          }}
        >
          {[
            { step: 1, label: '账号信息' },
            { step: 2, label: '完善资料' },
            { step: 3, label: '实名认证' },
          ].map((item, idx) => (
            <React.Fragment key={item.step}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: currentStep >= item.step ? themeColor : THEME.bgInput,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    color: '#fff',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {currentStep > item.step ? <CheckCircleOutlined style={{ fontSize: 14 }} /> : item.step}
                </div>
                <span style={{ fontSize: 12, color: currentStep >= item.step ? themeColor : THEME.textMuted }}>
                  {item.label}
                </span>
              </div>
              {idx < 2 && (
                <div
                  style={{
                    width: 24,
                    height: 1,
                    background: currentStep > item.step ? themeColor : THEME.borderLight,
                    transition: 'all 0.3s ease',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {currentStep === 1 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Step 1: 账号信息 - 可滚动区域 */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {/* Logo */}
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    margin: '0 auto 10px',
                  }}
                >
                  <img
                    src={logoImg}
                    alt="logo"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, color: THEME.textPrimary }}>
                  加入服务商团队
                </div>
              </div>

              {/* 邀请码说明 */}
              <Card style={{ marginBottom: 16, padding: 14 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: `${themeColor}15`,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TeamOutlined style={{ fontSize: 20, color: themeColor }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: THEME.textPrimary, marginBottom: 4 }}>
                      服务商邀请码
                    </div>
                    <div style={{ fontSize: 12, color: THEME.textSecondary }}>
                      请向您的服务商管理员获取邀请码
                    </div>
                  </div>
                </div>
              </Card>

              {/* 手机号 */}
              <div style={{ marginBottom: 12 }}>
                <Input
                  placeholder="请输入手机号"
                  value={phone}
                  onChange={setPhone}
                  prefix="+86"
                  themeColor={themeColor}
                />
                {errors.phone && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* 验证码 */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <Input
                      placeholder="请输入验证码"
                      value={code}
                      onChange={setCode}
                      themeColor={themeColor}
                    />
                  </div>
                  <button
                    style={{
                      height: 52,
                      padding: '0 12px',
                      background: `${themeColor}15`,
                      color: themeColor,
                      border: `1px solid ${themeColor}30`,
                      borderRadius: 10,
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    获取验证码
                  </button>
                </div>
                {errors.code && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>
                    {errors.code}
                  </div>
                )}
              </div>

              {/* 邀请码 */}
              <div style={{ marginBottom: 12 }}>
                <Input
                  placeholder="请输入服务商邀请码"
                  value={inviteCode}
                  onChange={setInviteCode}
                  themeColor={themeColor}
                />
                {errors.inviteCode && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>
                    {errors.inviteCode}
                  </div>
                )}
              </div>

              {/* 分隔 */}
              <div
                style={{
                  height: 1,
                  background: THEME.borderLight,
                  margin: '16px 0',
                }}
              />

              {/* 密码 */}
              <div style={{ marginBottom: 12 }}>
                <Input
                  placeholder="请设置密码（8-16位）"
                  value={password}
                  onChange={setPassword}
                  type="password"
                  themeColor={themeColor}
                />
                {errors.password && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>
                    {errors.password}
                  </div>
                )}
              </div>

              {/* 确认密码 */}
              <div style={{ marginBottom: 16 }}>
                <Input
                  placeholder="请确认密码"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  type="password"
                  themeColor={themeColor}
                />
                {errors.confirmPassword && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* 协议勾选 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  marginBottom: 16,
                }}
                onClick={() => setAgreementChecked(!agreementChecked)}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    border: `2px solid ${agreementChecked ? themeColor : THEME.textMuted}`,
                    background: agreementChecked ? themeColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {agreementChecked && (
                    <CheckCircleOutlined style={{ color: '#fff', fontSize: 12 }} />
                  )}
                </div>
                <div style={{ fontSize: 12, color: THEME.textSecondary }}>
                  我已阅读并同意
                  <span style={{ color: themeColor }}>《用户协议》</span>
                  和
                  <span style={{ color: themeColor }}>《隐私政策》</span>
                </div>
              </div>
              {errors.agreement && (
                <div style={{ fontSize: 11, color: THEME.danger, marginBottom: 12 }}>
                  {errors.agreement}
                </div>
              )}
            </div>

            {/* 固定在底部的按钮 */}
            <div style={{ padding: '12px 0 8px', flexShrink: 0 }}>
              <Button onClick={handleNext} themeColor={themeColor}>
                下一步
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Step 2: 完善资料 - 可滚动区域 */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <div style={{ fontSize: 15, color: THEME.textSecondary, marginBottom: 4 }}>
                请完善您的个人资料
              </div>
              <div style={{ fontSize: 12, color: THEME.textMuted, marginBottom: 16 }}>
                这些信息将展示在您的个人资料中
              </div>

              {/* 擅长技能 */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: THEME.textMuted, marginBottom: 8 }}>擅长技能</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {SKILL_OPTIONS.map(skill => {
                    const selected = selectedSkills.includes(skill);
                    return (
                      <div
                        key={skill}
                        onClick={() => {
                          setSelectedSkills(prev =>
                            prev.includes(skill)
                              ? prev.filter(s => s !== skill)
                              : [...prev, skill]
                          );
                        }}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 20,
                          fontSize: 13,
                          cursor: 'pointer',
                          background: selected ? `${themeColor}20` : THEME.bgInput,
                          color: selected ? themeColor : THEME.textSecondary,
                          border: `1px solid ${selected ? `${themeColor}50` : THEME.borderLight}`,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {skill}
                      </div>
                    );
                  })}
                </div>
                {errors.skills && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>{errors.skills}</div>
                )}
              </div>

              {/* 服务区域 */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: THEME.textMuted, marginBottom: 8 }}>服务区域</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {AREA_OPTIONS.map(area => {
                    const selected = selectedArea === area;
                    return (
                      <div
                        key={area}
                        onClick={() => setSelectedArea(area)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 16,
                          fontSize: 12,
                          cursor: 'pointer',
                          background: selected ? `${themeColor}20` : THEME.bgInput,
                          color: selected ? themeColor : THEME.textSecondary,
                          border: `1px solid ${selected ? `${themeColor}50` : THEME.borderLight}`,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <EnvironmentOutlined style={{ marginRight: 4 }} />
                        {area}
                      </div>
                    );
                  })}
                </div>
                {errors.area && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>{errors.area}</div>
                )}
              </div>

              {/* 服务经验 */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: THEME.textMuted, marginBottom: 8 }}>服务经验</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {EXPERIENCE_OPTIONS.map(exp => {
                    const selected = selectedExperience === exp;
                    return (
                      <div
                        key={exp}
                        onClick={() => setSelectedExperience(exp)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 16,
                          fontSize: 12,
                          cursor: 'pointer',
                          background: selected ? `${themeColor}20` : THEME.bgInput,
                          color: selected ? themeColor : THEME.textSecondary,
                          border: `1px solid ${selected ? `${themeColor}50` : THEME.borderLight}`,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {exp}
                      </div>
                    );
                  })}
                </div>
                {errors.experience && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>{errors.experience}</div>
                )}
              </div>
            </div>

            {/* 固定在底部的按钮 */}
            <div style={{ padding: '12px 0 8px', flexShrink: 0 }}>
              <Button onClick={handleToStep3} themeColor={themeColor}>
                下一步
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Step 3: 实名认证 - 可滚动区域 */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <div style={{
                textAlign: 'center',
                marginBottom: 20,
              }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    margin: '0 auto 12px',
                    borderRadius: '50%',
                    background: `${themeColor}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IdcardOutlined style={{ fontSize: 26, color: themeColor }} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: THEME.textPrimary, marginBottom: 4 }}>
                  实名认证
                </div>
                <div style={{ fontSize: 12, color: THEME.textMuted }}>
                  请填写真实身份信息并完成人脸识别
                </div>
              </div>

              {/* 姓名 */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: THEME.textMuted, marginBottom: 6 }}>姓名</div>
                <Input
                  placeholder="请输入真实姓名"
                  value={staffName}
                  onChange={setStaffName}
                  themeColor={themeColor}
                />
                {errors.name && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>{errors.name}</div>
                )}
              </div>

              {/* 身份证号 */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: THEME.textMuted, marginBottom: 6 }}>身份证号</div>
                <Input
                  placeholder="请输入身份证号"
                  value={idCard}
                  onChange={setIdCard}
                  themeColor={themeColor}
                />
                {errors.idCard && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 4 }}>{errors.idCard}</div>
                )}
              </div>

              {/* 分隔 */}
              <div
                style={{
                  height: 1,
                  background: THEME.borderLight,
                  margin: '0 0 20px',
                }}
              />

              {/* 人脸识别区域 */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: THEME.textPrimary, marginBottom: 4 }}>
                  人脸识别验证
                </div>
                <div style={{ fontSize: 12, color: THEME.textMuted, marginBottom: 14 }}>
                  请将面部对准取景框，确保光线充足
                </div>

                {!faceVerified ? (
                  <>
                    {/* 人脸识别取景框 */}
                    <div
                      style={{
                        width: 200,
                        height: 200,
                        margin: '0 auto 16px',
                        borderRadius: '50%',
                        border: `3px dashed ${themeColor}50`,
                        background: `${themeColor}08`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* 扫描线动画 */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 2,
                          background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)`,
                          animation: 'faceScan 2s ease-in-out infinite',
                        }}
                      />
                      <style>{`
                        @keyframes faceScan {
                          0%, 100% { top: 0; }
                          50% { top: calc(100% - 2px); }
                        }
                      `}</style>
                      <div style={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        background: `${themeColor}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={themeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
                        </svg>
                      </div>
                    </div>

                    <button
                      onClick={() => setFaceVerified(true)}
                      style={{
                        padding: '12px 32px',
                        borderRadius: 10,
                        border: 'none',
                        background: themeColor,
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        letterSpacing: 1,
                      }}
                    >
                      开始人脸识别
                    </button>

                    <div style={{ fontSize: 11, color: THEME.textMuted, marginTop: 10 }}>
                      点击后将自动调用前置摄像头进行验证
                    </div>
                  </>
                ) : (
                  <>
                    {/* 识别成功 */}
                    <div
                      style={{
                        width: 200,
                        height: 200,
                        margin: '0 auto 16px',
                        borderRadius: '50%',
                        border: `3px solid ${themeColor}`,
                        background: `${themeColor}10`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CheckCircleOutlined style={{ fontSize: 48, color: themeColor }} />
                      <div style={{ fontSize: 14, fontWeight: 600, color: themeColor, marginTop: 8 }}>
                        验证通过
                      </div>
                    </div>

                    <div style={{ fontSize: 12, color: THEME.textMuted }}>
                      人脸识别已完成，信息真实有效
                    </div>
                  </>
                )}

                {errors.face && (
                  <div style={{ fontSize: 11, color: THEME.danger, marginTop: 8 }}>{errors.face}</div>
                )}
              </div>
            </div>

            {/* 固定在底部的按钮 */}
            <div style={{ padding: '12px 0 8px', flexShrink: 0 }}>
              <Button onClick={handleSubmit} themeColor={themeColor}>
                完成注册
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffRegisterPage;
