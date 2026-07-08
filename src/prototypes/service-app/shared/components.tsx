/**
 * 共享组件库 - 深空暗夜科技风格
 */

import React from 'react';
import {
  HomeOutlined,
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
  UnorderedListOutlined,
  WalletOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  RightOutlined,
  PlusOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShopOutlined,
  CarOutlined,
  MedicineBoxOutlined,
  AlertOutlined,
  CameraOutlined,
  LeftOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  UserAddOutlined,
  UploadOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

// ========== 主题色彩 - 霓虹科技风格 ==========
export const THEME = {
  // 背景色
  bgDark: '#0a0f1a',
  bgDarkAlt: '#0d1219',
  bgLight: 'rgba(255,255,255,0.06)',
  bgCard: 'rgba(255,255,255,0.08)',
  bgCardHover: 'rgba(255,255,255,0.14)',
  bgInput: 'rgba(255,255,255,0.06)',
  bgGlass: 'rgba(255,255,255,0.04)',

  // 边框
  borderLight: 'rgba(255,255,255,0.08)',
  borderMedium: 'rgba(255,255,255,0.12)',
  borderNeon: 'rgba(57, 255, 20, 0.3)',

  // 文字
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',

  // 功能色
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',

  // 荧光绿主色系 (Neon Green)
  neonGreen: '#39FF14',
  neonGreenAlt: '#00FF41',
  neonGreenDark: '#20C811',
  neonGreenLight: '#7FFF00',

  // 荧光绿渐变
  neonGradient: 'linear-gradient(135deg, #39FF14 0%, #00FF41 50%, #7FFF00 100%)',
  neonGradientDark: 'linear-gradient(135deg, #20C811 0%, #39FF14 50%, #00FF41 100%)',

  // 荧光绿发光效果
  neonGlow: '0 0 20px rgba(57, 255, 20, 0.4), 0 0 40px rgba(57, 255, 20, 0.2)',
  neonGlowStrong: '0 0 30px rgba(57, 255, 20, 0.6), 0 0 60px rgba(57, 255, 20, 0.3)',
  neonGlowSubtle: '0 0 10px rgba(57, 255, 20, 0.25)',

  // 荧光绿半透明背景
  neonBg10: 'rgba(57, 255, 20, 0.1)',
  neonBg15: 'rgba(57, 255, 20, 0.15)',
  neonBg20: 'rgba(57, 255, 20, 0.2)',
  neonBg30: 'rgba(57, 255, 20, 0.3)',

  // 服务商蓝 (保留作为次要强调)
  providerPrimary: '#00D4FF',
  providerSecondary: '#0066FF',

  // 服务人员紫 (保留作为次要强调)
  staffPrimary: '#A855F7',
  staffSecondary: '#7C3AED',
};

// ========== 图标映射 ==========
export const ICONS = {
  HomeOutlined,
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
  UnorderedListOutlined,
  WalletOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  RightOutlined,
  PlusOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShopOutlined,
  CarOutlined,
  MedicineBoxOutlined,
  AlertOutlined,
  CameraOutlined,
  LeftOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  UserAddOutlined,
  UploadOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
};

// ========== 按钮组件 - 霓虹科技风格 ==========
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'default' | 'danger' | 'ghost' | 'neon';
  size?: 'large' | 'medium' | 'small';
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  themeColor?: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'primary',
  size = 'large',
  block = true,
  disabled = false,
  loading = false,
  themeColor = THEME.neonGreen,
  style: customStyle,
}) => {
  const height = size === 'large' ? 52 : size === 'medium' ? 40 : 32;
  const fontSize = size === 'large' ? 16 : size === 'medium' ? 14 : 12;
  const borderRadius = size === 'large' ? 28 : 24;

  const getStyles = () => {
    switch (type) {
      case 'primary':
        return {
          background: `linear-gradient(135deg, ${themeColor} 0%, ${adjustColor(themeColor, -20)} 100%)`,
          color: '#0a0f1a',
          border: 'none',
          boxShadow: `0 4px 20px ${themeColor}40, 0 0 40px ${themeColor}20`,
        };
      case 'neon':
        return {
          background: 'transparent',
          color: themeColor,
          border: `2px solid ${themeColor}`,
          boxShadow: `0 0 15px ${themeColor}30, inset 0 0 15px ${themeColor}10`,
        };
      case 'danger':
        return {
          background: THEME.danger,
          color: '#fff',
          border: 'none',
          boxShadow: `0 4px 15px ${THEME.danger}40`,
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: themeColor,
          border: `1px solid ${themeColor}50`,
          boxShadow: `0 0 10px ${themeColor}20`,
        };
      default:
        return {
          background: THEME.bgInput,
          color: THEME.textPrimary,
          border: `1px solid ${THEME.borderLight}`,
        };
    }
  };

  const styles = getStyles();

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        height,
        padding: '0 24px',
        ...styles,
        borderRadius,
        fontSize,
        fontWeight: 600,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: block ? '100%' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...customStyle,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = type === 'neon'
            ? `0 0 25px ${themeColor}50, inset 0 0 20px ${themeColor}20`
            : type === 'primary'
            ? `0 6px 25px ${themeColor}50, 0 0 50px ${themeColor}30`
            : styles.boxShadow;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = styles.boxShadow as string;
      }}
    >
      {loading ? (
        <span style={{ animation: 'spin 1s linear infinite' }}>⟳</span>
      ) : null}
      {children}
    </button>
  );
};

// ========== 卡片组件 - 霓虹科技风格 ==========
interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  glow?: boolean;
  themeColor?: string;
  neonStyle?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onClick,
  glow = false,
  themeColor = THEME.neonGreen,
  neonStyle = false,
}) => (
  <div
    onClick={onClick}
    style={{
      background: neonStyle
        ? 'linear-gradient(145deg, rgba(57, 255, 20, 0.08) 0%, rgba(0, 255, 65, 0.04) 100%)'
        : 'rgba(255, 255, 255, 0.06)',
      backdropFilter: 'blur(10px)',
      border: neonStyle
        ? `1px solid ${THEME.borderNeon}`
        : `1px solid ${THEME.borderLight}`,
      borderRadius: 16,
      padding: 16,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: glow
        ? `0 0 25px ${themeColor}35, inset 0 1px 0 ${themeColor}15`
        : neonStyle
        ? `0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(57, 255, 20, 0.1)`
        : 'none',
      ...style,
    }}
    onMouseEnter={(e) => {
      if (onClick) {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = neonStyle
          ? `0 8px 30px rgba(0, 0, 0, 0.4), 0 0 20px ${themeColor}25, inset 0 1px 0 ${themeColor}20`
          : `0 8px 25px rgba(0, 0, 0, 0.3)`;
        e.currentTarget.style.borderColor = neonStyle ? `${themeColor}50` : THEME.borderMedium;
      }
    }}
    onMouseLeave={(e) => {
      if (onClick) {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = neonStyle
          ? `0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(57, 255, 20, 0.1)`
          : 'none';
        e.currentTarget.style.borderColor = neonStyle ? THEME.borderNeon : THEME.borderLight;
      }
    }}
  >
    {children}
  </div>
);

// ========== 输入框组件 ==========
interface InputProps {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  focused?: boolean;
  themeColor?: string;
}

export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  prefix,
  suffix,
  type = 'text',
  onFocus,
  onBlur,
  focused = false,
  themeColor = THEME.providerPrimary,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      background: THEME.bgInput,
      borderRadius: 12,
      padding: '0 16px',
      height: 52,
      border: `1px solid ${focused ? themeColor : 'transparent'}`,
      transition: 'all 0.2s ease',
    }}
  >
    {prefix && (
      <span style={{ color: THEME.textMuted, marginRight: 8, fontSize: 15 }}>
        {prefix}
      </span>
    )}
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      style={{
        flex: 1,
        border: 'none',
        background: 'transparent',
        fontSize: 15,
        outline: 'none',
        color: THEME.textPrimary,
      }}
      onFocus={onFocus}
      onBlur={onBlur}
    />
    {suffix && (
      <span style={{ color: THEME.textMuted, marginLeft: 8 }}>{suffix}</span>
    )}
  </div>
);

// ========== 标签组件 - 霓虹科技风格 ==========
interface TagProps {
  children: React.ReactNode;
  color?: string;
  bg?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  color = THEME.neonGreen,
  bg,
}) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 10px',
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 500,
      color,
      background: bg || `${color}20`,
      boxShadow: `0 0 8px ${color}25`,
      border: `1px solid ${color}30`,
    }}
  >
    {children}
  </span>
);

// ========== 头像组件 - 霓虹科技风格 ==========
interface AvatarProps {
  letter: string;
  color?: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  letter,
  color = THEME.neonGreen,
  size = 44,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -30)} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: 600,
      fontSize: size * 0.38,
      flexShrink: 0,
      boxShadow: `0 0 15px ${color}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
      border: `1px solid ${color}30`,
    }}
  >
    {letter}
  </div>
);

// ========== 导航栏组件 - 霓虹科技风格 ==========
interface NavBarProps {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
  themeColor?: string;
}

export const NavBar: React.FC<NavBarProps> = ({
  title,
  onBack,
  right,
  themeColor = THEME.neonGreen,
}) => (
  <div
    style={{
      height: 50,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 16px',
      background: 'transparent',
    }}
  >
    <div style={{ width: 40 }}>
      {onBack && (
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
            filter: `drop-shadow(0 0 6px ${themeColor}50)`,
            transition: 'all 0.2s ease',
          }}
        >
          <LeftOutlined />
        </button>
      )}
    </div>
    <div
      style={{
        fontSize: 17,
        fontWeight: 600,
        color: THEME.textPrimary,
        textShadow: `0 0 20px ${themeColor}20`,
      }}
    >
      {title}
    </div>
    <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>
      {right}
    </div>
  </div>
);

// ========== Tab栏组件 - 霓虹科技风格 ==========
interface TabBarProps {
  tabs: { id: string; label: string; icon: React.ReactNode }[];
  active: string;
  onChange: (id: string) => void;
  themeColor?: string;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  active,
  onChange,
  themeColor = THEME.neonGreen,
}) => (
  <div
    style={{
      display: 'flex',
      background: 'linear-gradient(180deg, rgba(10, 15, 26, 0.98) 0%, rgba(13, 18, 25, 0.99) 100%)',
      borderTop: `1px solid ${THEME.borderLight}`,
      paddingBottom: 20,
      backdropFilter: 'blur(20px)',
    }}
  >
    {tabs.map((tab) => {
      const isActive = active === tab.id;
      return (
        <div
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px 0',
            cursor: 'pointer',
            color: isActive ? themeColor : THEME.textMuted,
            fontSize: 10,
            gap: 4,
            transition: 'all 0.3s ease',
            position: 'relative',
          }}
        >
          {/* 霓虹发光效果 */}
          {isActive && (
            <div
              style={{
                position: 'absolute',
                top: -1,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 32,
                height: 3,
                background: themeColor,
                borderRadius: '0 0 2px 2px',
                boxShadow: `0 0 10px ${themeColor}, 0 0 20px ${themeColor}50`,
              }}
            />
          )}
          <div
            style={{
              fontSize: 24,
              transition: 'all 0.3s ease',
              filter: isActive ? `drop-shadow(0 0 8px ${themeColor})` : 'none',
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {tab.icon}
          </div>
          <div
            style={{
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.3s ease',
              textShadow: isActive ? `0 0 10px ${themeColor}50` : 'none',
            }}
          >
            {tab.label}
          </div>
        </div>
      );
    })}
  </div>
);

// ========== 空状态组件 ==========
interface EmptyStateProps {
  icon?: React.ReactNode;
  text: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  text,
  description,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
    }}
  >
    {icon && (
      <div style={{ fontSize: 48, color: THEME.textMuted, marginBottom: 16 }}>
        {icon}
      </div>
    )}
    <div
      style={{
        fontSize: 15,
        color: THEME.textSecondary,
        textAlign: 'center',
      }}
    >
      {text}
    </div>
    {description && (
      <div
        style={{
          fontSize: 13,
          color: THEME.textMuted,
          textAlign: 'center',
          marginTop: 8,
        }}
      >
        {description}
      </div>
    )}
  </div>
);

// ========== Modal 弹窗组件 ==========
interface ModalProps {
  visible: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  themeColor?: string;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  children,
  onClose,
  footer,
  themeColor = THEME.neonGreen,
}) => {
  if (!visible) return null;
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#101826',
          borderRadius: 16,
          padding: '24px 20px 20px',
          width: '85%',
          maxWidth: 340,
          border: `1px solid ${THEME.borderMedium}`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${themeColor}15`,
        }}
      >
        {title && (
          <div
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: THEME.textPrimary,
              textAlign: 'center',
              marginBottom: 16,
            }}
          >
            {title}
          </div>
        )}
        <div style={{ color: THEME.textSecondary, fontSize: 14, lineHeight: 1.6 }}>
          {children}
        </div>
        {footer && (
          <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// ========== Toast 提示组件 ==========
interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  themeColor?: string;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'success',
  themeColor = THEME.neonGreen,
}) => {
  if (!visible) return null;
  const typeConfig: Record<string, { color: string; icon: string }> = {
    success: { color: THEME.success, icon: '✓' },
    error: { color: THEME.danger, icon: '✕' },
    warning: { color: THEME.warning, icon: '!' },
    info: { color: themeColor, icon: 'i' },
  };
  const cfg = typeConfig[type];
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2000,
        background: 'rgba(16, 24, 38, 0.95)',
        borderRadius: 12,
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        border: `1px solid ${cfg.color}30`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${cfg.color}20`,
        animation: 'toastFadeIn 0.3s ease',
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: cfg.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 12,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {cfg.icon}
      </div>
      <span style={{ color: THEME.textPrimary, fontSize: 14, fontWeight: 500 }}>
        {message}
      </span>
    </div>
  );
};

// ========== Upload 上传组件 ==========
interface UploadProps {
  label: string;
  preview?: string;
  onUpload: () => void;
  onDelete?: () => void;
  required?: boolean;
  themeColor?: string;
}

export const Upload: React.FC<UploadProps> = ({
  label,
  preview,
  onUpload,
  onDelete,
  required = false,
  themeColor = THEME.neonGreen,
}) => (
  <div style={{ marginBottom: 16 }}>
    <div
      style={{
        fontSize: 13,
        color: THEME.textSecondary,
        marginBottom: 8,
      }}
    >
      {label}
      {required && <span style={{ color: THEME.danger }}> *</span>}
    </div>
    {preview ? (
      <div
        style={{
          position: 'relative',
          borderRadius: 10,
          overflow: 'hidden',
          border: `1px solid ${THEME.borderLight}`,
        }}
      >
        <img
          src={preview}
          alt={label}
          style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
        />
        {onDelete && (
          <div
            onClick={onDelete}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            ✕
          </div>
        )}
      </div>
    ) : (
      <div
        onClick={onUpload}
        style={{
          height: 100,
          borderRadius: 10,
          border: `2px dashed ${THEME.borderMedium}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          cursor: 'pointer',
          background: THEME.bgInput,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = themeColor;
          e.currentTarget.style.background = `${themeColor}10`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = THEME.borderMedium;
          e.currentTarget.style.background = THEME.bgInput;
        }}
      >
        <CameraOutlined style={{ fontSize: 24, color: THEME.textMuted }} />
        <span style={{ fontSize: 12, color: THEME.textMuted }}>点击上传</span>
      </div>
    )}
  </div>
);

// ========== 辅助函数 ==========
export function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(Math.min((num >> 16) + amt, 255), 0);
  const G = Math.max(Math.min(((num >> 8) & 0x00ff) + amt, 255), 0);
  const B = Math.max(Math.min((num & 0x0000ff) + amt, 255), 0);
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

// ========== 导出所有组件 ==========
export default {
  THEME,
  ICONS,
  Button,
  Card,
  Input,
  Tag,
  Avatar,
  NavBar,
  TabBar,
  EmptyState,
};