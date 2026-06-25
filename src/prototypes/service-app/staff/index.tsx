/**
 * 服务人员端 - 主入口
 */
import React, { useState } from 'react';
import { HomeOutlined, WalletOutlined, UserOutlined } from '@ant-design/icons';
import { SUCCESS, TEXT_GRAY } from '../shared';

import Login from './login';
import TaskList from './task-list';
import TaskDetail from './task-detail';
import TaskCheckin from './task-checkin';
import Income from './income';
import Profile from './profile';

type Screen =
  | 'login'
  | 'tasks'
  | 'income'
  | 'profile'
  | 'task-detail'
  | 'task-checkin';

const TABS = [
  { id: 'tasks', label: '任务', icon: <HomeOutlined /> },
  { id: 'income', label: '收入', icon: <WalletOutlined /> },
  { id: 'profile', label: '我的', icon: <UserOutlined /> },
];

export default function StaffApp() {
  const [screen, setScreen] = useState<Screen>('login');
  const [tab, setTab] = useState('tasks');

  const navigate = (s: Screen) => setScreen(s);
  const goBack = () => {
    if (screen === 'login') {
      // 退出到角色选择
    } else if (['tasks', 'income', 'profile'].includes(screen)) {
      setTab(screen);
      setScreen('tasks');
    } else {
      setScreen('tasks');
    }
  };

  // 登录页
  if (screen === 'login') {
    return <Login onLogin={() => setScreen('tasks')} onGoBack={() => {}} />;
  }

  // 底部Tab导航
  const renderTabBar = () => (
    <div className="tab-bar tab-bar-success">
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
      case 'tasks':
        return <TaskList onNavigate={navigate} />;
      case 'income':
        return <Income onBack={goBack} />;
      case 'profile':
        return <Profile onLogout={() => setScreen('login')} />;
      default:
        return <TaskList onNavigate={navigate} />;
    }
  };

  // 子页面
  if (screen !== tab) {
    switch (screen) {
      case 'task-detail':
        return (
          <div className="app-container">
            <TaskDetail onBack={goBack} onNavigate={navigate} />
          </div>
        );
      case 'task-checkin':
        return (
          <div className="app-container">
            <TaskCheckin onBack={goBack} onComplete={() => { setScreen('tasks'); setTab('tasks'); }} />
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="app-container app-container-success">
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