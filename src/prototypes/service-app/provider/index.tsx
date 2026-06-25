/**
 * 服务商管理端 - 主入口
 */
import React, { useState } from 'react';
import { HomeOutlined, FileTextOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { PRIMARY, TEXT_GRAY, BORDER_COLOR } from '../shared';

import Login from './login';
import Home from './home';
import OrderList from './order-list';
import OrderDetail from './order-detail';
import StaffList from './staff-list';
import StaffAdd from './staff-add';
import StaffDetail from './staff-detail';
import SettleIntro from './settle-intro';
import SettleForm from './settle-form';
import SettleUpload from './settle-upload';
import SettleSuccess from './settle-success';
import SettleStatus from './SettleStatusPage';
import Profile from './profile';

type Screen =
  | 'login'
  | 'home'
  | 'orders'
  | 'staff'
  | 'profile'
  | 'order-detail'
  | 'staff-add'
  | 'staff-detail'
  | 'settle-intro'
  | 'settle-form'
  | 'settle-upload'
  | 'settle-success'
  | 'settle-status';

const TABS = [
  { id: 'home', label: '工作台', icon: <HomeOutlined /> },
  { id: 'orders', label: '订单', icon: <FileTextOutlined /> },
  { id: 'staff', label: '人员', icon: <TeamOutlined /> },
  { id: 'profile', label: '我的', icon: <UserOutlined /> },
];

export default function ProviderApp() {
  const [screen, setScreen] = useState<Screen>('login');
  const [tab, setTab] = useState('home');

  const navigate = (s: Screen) => setScreen(s);
  const goBack = () => {
    if (screen === 'login') {
      // 退出到角色选择
    } else if (['orders', 'staff', 'profile', 'home'].includes(screen)) {
      setTab(screen);
      setScreen('home');
    } else if (screen === 'settle-status') {
      setScreen('home');
    } else {
      // 返回首页
      setScreen('home');
    }
  };

  // 登录页
  if (screen === 'login') {
    return <Login onLogin={() => setScreen('home')} onGoBack={() => {}} />;
  }

  // 底部Tab导航
  const renderTabBar = () => (
    <div className="tab-bar">
      {TABS.map(t => (
        <div
          key={t.id}
          className={`tab-item ${tab === t.id ? 'active' : ''}`}
          onClick={() => {
            setTab(t.id);
            setScreen(t.id as Screen);
          }}
        >
          <div className="tab-icon">{t.icon}</div>
          <div className="tab-label">{t.label}</div>
        </div>
      ))}
    </div>
  );

  // 主内容区
  const renderContent = () => {
    switch (tab) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'orders':
        return <OrderList onBack={goBack} onNavigate={navigate} />;
      case 'staff':
        return <StaffList onBack={goBack} onNavigate={navigate} />;
      case 'profile':
        return <Profile onLogout={() => setScreen('login')} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  // 子页面
  if (screen !== tab) {
    switch (screen) {
      case 'order-detail':
        return (
          <div className="app-container">
            <OrderDetail onBack={goBack} />
          </div>
        );
      case 'staff-add':
        return (
          <div className="app-container">
            <StaffAdd onBack={goBack} onSuccess={() => { setScreen('staff'); setTab('staff'); }} />
          </div>
        );
      case 'staff-detail':
        return (
          <div className="app-container">
            <StaffDetail onBack={goBack} />
          </div>
        );
      case 'settle-intro':
        return (
          <div className="app-container">
            <SettleIntro onBack={goBack} onNext={() => setScreen('settle-form')} />
          </div>
        );
      case 'settle-form':
        return (
          <div className="app-container">
            <SettleForm onBack={() => setScreen('settle-intro')} onNext={() => setScreen('settle-upload')} />
          </div>
        );
      case 'settle-upload':
        return (
          <div className="app-container">
            <SettleUpload onBack={() => setScreen('settle-form')} onSuccess={() => setScreen('settle-success')} />
          </div>
        );
      case 'settle-success':
        return (
          <div className="app-container">
            <SettleSuccess
              onBack={() => setScreen('settle-form')}
              onComplete={() => { setScreen('settle-status'); setTab('home'); }}
              onViewStatus={() => { setScreen('settle-status'); setTab('home'); }}
            />
          </div>
        );
      case 'settle-status':
        return (
          <>
            <SettleStatus onBack={goBack} onEdit={() => setScreen('settle-form')} />
          </>
        );
      default:
        return null;
    }
  }

  return (
    <div className="app-container">
      <div className="status-bar">
        <span>9:41</span>
        <div>📶 🔋</div>
      </div>
      <div className="app-content">
        {renderContent()}
      </div>
      {renderTabBar()}
    </div>
  );
}