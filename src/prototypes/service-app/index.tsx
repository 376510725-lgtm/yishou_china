/**
 * 益寿服务端 APP - 主入口
 * 深空暗夜科技风格 - 双角色原型展示
 *
 * 功能：
 * - 统一登录页（含角色选择）
 * - 服务商管理端 + 服务人员端
 * - 手机框架展示
 */

import React, { useState } from 'react';
import './style.css';

// 导入共享组件
import { PhoneFrame } from './shared/PhoneFrame';
import { LoginPage } from './shared/LoginPage';
import { THEME } from './shared/components';

// 导入服务商管理端页面
import { SettleIntroPage } from './provider/SettleIntroPage';
import { SettleFormPage } from './provider/SettleFormPage';
import { SettleUploadPage } from './provider/SettleUploadPage';
import { SettleSuccessPage } from './provider/SettleSuccessPage';
import { SettleStatusPage } from './provider/SettleStatusPage';
import { HomePage } from './provider/HomePage';
import { OrderListPage } from './provider/OrderListPage';
import { OrderDetailPage } from './provider/OrderDetailPage';
import { StaffListPage } from './provider/StaffListPage';
import { StaffAddPage } from './provider/StaffAddPage';
import { StaffDetailPage } from './provider/StaffDetailPage';
import { ProfilePage as ProviderProfilePage } from './provider/ProfilePage';
import { ProviderRegisterPage } from './provider/RegisterPage';

// 导入服务人员端页面
import { TaskListPage } from './staff/TaskListPage';
import { TaskDetailPage } from './staff/TaskDetailPage';
import { TaskCheckinPage } from './staff/TaskCheckinPage';
import { IncomePage } from './staff/IncomePage';
import { ProfilePage as StaffProfilePage } from './staff/ProfilePage';
import { StaffRegisterPage } from './staff/RegisterPage';

// 角色类型
type Role = 'provider' | 'staff';

// 入驻状态
type SettleStatus = 'none' | 'pending' | 'rejected' | 'approved';

// 页面类型
type Page =
  | 'login'
  | 'provider-register'
  | 'staff-register'
  | 'settle-intro'
  | 'settle-form'
  | 'settle-upload'
  | 'settle-success'
  | 'settle-status'
  | 'home'
  | 'orders'
  | 'order-detail'
  | 'staff'
  | 'staff-add'
  | 'staff-detail'
  | 'tasks'
  | 'task-detail'
  | 'task-checkin'
  | 'income'
  | 'profile';

// Tab 类型
type Tab = 'home' | 'orders' | 'staff' | 'profile';
type StaffTab = 'tasks' | 'income' | 'profile';

// 模拟数据
const ORDER_LIST = [
  {
    id: 'DD202406010001',
    user: '张阿姨',
    avatar: '张',
    color: '#00D4FF',
    phone: '138****5678',
    service: '助餐',
    address: '渝中区解放碑街道XX号',
    time: '今天 12:00',
    amount: '¥68.00',
    status: 'pending',
  },
  {
    id: 'DD202406010002',
    user: '李大爷',
    avatar: '李',
    color: '#10B981',
    phone: '139****8765',
    service: '助洁',
    address: '江北区观音桥街道XX号',
    time: '明天 09:00',
    amount: '¥128.00',
    status: 'dispatched',
  },
  {
    id: 'DD202406010003',
    user: '王奶奶',
    avatar: '王',
    color: '#F59E0B',
    phone: '137****2345',
    service: '助医',
    address: '南岸区南坪街道XX号',
    time: '今天 15:30',
    amount: '¥198.00',
    status: 'serving',
  },
];

const STAFF_LIST = [
  {
    id: 1,
    name: '王小明',
    avatar: '王',
    color: '#00D4FF',
    phone: '138****1234',
    status: 'online',
    skills: ['助餐', '助洁'],
    todayTasks: 3,
    totalTasks: 156,
  },
  {
    id: 2,
    name: '李小红',
    avatar: '李',
    color: '#10B981',
    phone: '139****5678',
    status: 'busy',
    skills: ['助医', '助浴'],
    todayTasks: 5,
    totalTasks: 289,
  },
];

const TASK_LIST = [
  {
    id: 'DD202406010001',
    user: '张阿姨',
    avatar: '张',
    color: '#A855F7',
    phone: '138****5678',
    service: '助餐',
    address: '渝中区解放碑街道XX号',
    time: '今天 12:00',
    amount: '¥68.00',
    status: 'pending',
  },
  {
    id: 'DD202406010003',
    user: '王奶奶',
    avatar: '王',
    color: '#F59E0B',
    phone: '137****2345',
    service: '助医',
    address: '南岸区南坪街道XX号',
    time: '今天 15:30',
    amount: '¥198.00',
    status: 'serving',
  },
];

// Tab 配置
const PROVIDER_TABS = [
  { id: 'home' as Tab, label: '工作台', icon: '🏠' },
  { id: 'orders' as Tab, label: '订单', icon: '📋' },
  { id: 'staff' as Tab, label: '人员', icon: '👥' },
  { id: 'profile' as Tab, label: '我的', icon: '👤' },
];

const STAFF_TABS = [
  { id: 'tasks' as StaffTab, label: '任务', icon: '📋' },
  { id: 'income' as StaffTab, label: '收入', icon: '💰' },
  { id: 'profile' as StaffTab, label: '我的', icon: '👤' },
];

// 主组件
export default function ServiceApp() {
  // 状态
  const [currentRole, setCurrentRole] = useState<Role>('provider');
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [providerTab, setProviderTab] = useState<Tab>('home');
  const [staffTab, setStaffTab] = useState<StaffTab>('tasks');
  const [selectedOrder, setSelectedOrder] = useState<typeof ORDER_LIST[0] | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<typeof STAFF_LIST[0] | null>(null);
  const [selectedTask, setSelectedTask] = useState<typeof TASK_LIST[0] | null>(null);
  const [settleStatus, setSettleStatus] = useState<SettleStatus>('pending');

  // 主题色
  const themeColor = currentRole === 'provider' ? THEME.providerPrimary : THEME.staffPrimary;

  // 导航函数
  const navigate = (page: Page) => setCurrentPage(page);
  const goBack = () => {
    if (currentPage === 'login') return;
    // 根据当前页面决定返回哪里
    if (['provider-register', 'staff-register', 'order-detail', 'staff-add', 'staff-detail'].includes(currentPage)) {
      if (currentRole === 'provider') {
        if (currentPage === 'order-detail') {
          navigate('orders');
        } else if (currentPage === 'provider-register') {
          navigate('login');
        } else {
          navigate('staff');
        }
      } else {
        if (currentPage === 'task-detail') {
          navigate('tasks');
        } else if (currentPage === 'staff-register') {
          navigate('login');
        }
      }
    } else if (currentPage === 'settle-form') {
      navigate('settle-intro');
    } else if (currentPage === 'settle-upload') {
      navigate('settle-form');
    } else if (currentPage === 'settle-intro') {
      navigate(settleStatus === 'none' ? 'home' : 'provider-register');
    } else if (currentPage === 'settle-status') {
      navigate('home');
    } else if (currentPage === 'task-checkin') {
      navigate('task-detail');
    } else {
      navigate('login');
    }
  };

  // 处理登录
  const handleLogin = (role: Role) => {
    setCurrentRole(role);
    if (role === 'provider') {
      setCurrentPage('home');
    } else {
      setCurrentPage('tasks');
    }
  };

  // 处理注册
  const handleRegister = (role: Role) => {
    setCurrentRole(role);
    if (role === 'provider') {
      setCurrentPage('provider-register');
    } else {
      setCurrentPage('staff-register');
    }
  };

  const handleLogout = () => {
    setCurrentRole('provider');
    setCurrentPage('login');
  };

  const handleOrderClick = (order: typeof ORDER_LIST[0]) => {
    setSelectedOrder(order);
    setCurrentPage('order-detail');
  };

  const handleStaffClick = (staff: typeof STAFF_LIST[0]) => {
    setSelectedStaff(staff);
    setCurrentPage('staff-detail');
  };

  const handleTaskClick = (task: typeof TASK_LIST[0]) => {
    setSelectedTask(task);
    setCurrentPage('task-detail');
  };

  // Tab 点击处理
  const handleProviderTabChange = (tab: Tab) => {
    setProviderTab(tab);
    if (tab === 'home') navigate('home');
    else if (tab === 'orders') navigate('orders');
    else if (tab === 'staff') navigate('staff');
    else if (tab === 'profile') navigate('profile');
  };

  const handleStaffTabChange = (tab: StaffTab) => {
    setStaffTab(tab);
    if (tab === 'tasks') navigate('tasks');
    else if (tab === 'income') navigate('income');
    else if (tab === 'profile') navigate('profile');
  };

  // 渲染服务商管理端内容
  const renderProviderContent = () => {
    switch (currentPage) {
      case 'provider-register':
        return (
          <ProviderRegisterPage
            themeColor={themeColor}
            onBack={goBack}
            onStartSettle={() => navigate('settle-intro')}
          />
        );
      case 'home':
        return (
          <HomePage
            themeColor={themeColor}
            settleStatus={settleStatus}
            onNavigate={navigate}
            onOrderClick={handleOrderClick}
            onTabChange={(tab) => setProviderTab(tab as Tab)}
          />
        );
      case 'orders':
        return (
          <OrderListPage
            themeColor={themeColor}
            onBack={goBack}
            onOrderClick={handleOrderClick}
          />
        );
      case 'staff':
        return (
          <StaffListPage
            themeColor={themeColor}
            onBack={goBack}
            onStaffClick={handleStaffClick}
            onAddStaff={() => navigate('staff-add')}
          />
        );
      case 'profile':
        return (
          <ProviderProfilePage
            themeColor={themeColor}
            onLogout={handleLogout}
          />
        );
      case 'order-detail':
        return selectedOrder ? (
          <OrderDetailPage
            themeColor={themeColor}
            order={selectedOrder}
            onBack={goBack}
          />
        ) : null;
      case 'staff-add':
        return (
          <StaffAddPage
            themeColor={themeColor}
            onBack={goBack}
            onSuccess={() => navigate('staff')}
          />
        );
      case 'staff-detail':
        return selectedStaff ? (
          <StaffDetailPage
            themeColor={themeColor}
            staff={selectedStaff}
            onBack={goBack}
            onContact={() => {}}
          />
        ) : null;
      case 'settle-intro':
        return (
          <SettleIntroPage
            themeColor={themeColor}
            onBack={goBack}
            onNext={() => navigate('settle-form')}
          />
        );
      case 'settle-form':
        return (
          <SettleFormPage
            themeColor={themeColor}
            onBack={goBack}
            onNext={() => navigate('settle-upload')}
          />
        );
      case 'settle-upload':
        return (
          <SettleUploadPage
            themeColor={themeColor}
            onBack={goBack}
            onNext={() => navigate('settle-success')}
          />
        );
      case 'settle-success':
        return (
          <SettleSuccessPage
            themeColor={themeColor}
            onBack={goBack}
            onComplete={() => {
              setSettleStatus('pending');
              navigate('home');
            }}
            onViewStatus={() => navigate('settle-status')}
          />
        );
      case 'settle-status':
        return (
          <SettleStatusPage
            themeColor={themeColor}
            status={settleStatus}
            onBack={goBack}
            onCancel={() => {
              setSettleStatus('none');
              navigate('home');
            }}
            onModify={() => {
              setSettleStatus('pending');
              navigate('settle-form');
            }}
          />
        );
      default:
        return null;
    }
  };

  // 渲染服务人员端内容
  const renderStaffContent = () => {
    switch (currentPage) {
      case 'staff-register':
        return (
          <StaffRegisterPage
            themeColor={themeColor}
            onBack={goBack}
            onSuccess={() => navigate('tasks')}
          />
        );
      case 'tasks':
        return (
          <TaskListPage
            themeColor={themeColor}
            onTaskClick={handleTaskClick}
            onCheckin={(task) => {
              setSelectedTask(task);
              navigate('task-checkin');
            }}
          />
        );
      case 'task-detail':
        return selectedTask ? (
          <TaskDetailPage
            themeColor={themeColor}
            task={selectedTask}
            onBack={goBack}
          />
        ) : null;
      case 'task-checkin':
        return (
          <TaskCheckinPage
            themeColor={themeColor}
            mode="complete"
            onBack={goBack}
            onCheckin={() => navigate('tasks')}
          />
        );
      case 'income':
        return <IncomePage themeColor={themeColor} />;
      case 'profile':
        return (
          <StaffProfilePage
            themeColor={themeColor}
            onLogout={handleLogout}
          />
        );
      default:
        return null;
    }
  };

  // 渲染登录页
  const renderLoginPage = () => (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'auto',
      }}
    >
      <LoginPage
        themeColor={themeColor}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );

  // 渲染主内容区域 - Tab栏固定在底部，内容区滚动
  const renderMainContent = () => {
    // 判断是否显示 Tab 栏
    const showProviderTab = !['provider-register', 'settle-intro', 'settle-form', 'settle-upload', 'settle-success', 'order-detail', 'staff-add', 'staff-detail'].includes(currentPage) &&
      (currentPage === 'home' || currentPage === 'orders' || currentPage === 'staff' || currentPage === 'profile');
    const showStaffTab = !['staff-register', 'task-detail', 'task-checkin'].includes(currentPage) &&
      (currentPage === 'tasks' || currentPage === 'income' || currentPage === 'profile');

    // 滚动区域样式 - 隐藏滚动条
    const scrollStyle = {
      overflowY: 'auto' as const,
      overflowX: 'hidden' as const,
      scrollbarWidth: 'none' as const,
      msOverflowStyle: 'none' as const,
      WebkitOverflowScrolling: 'touch' as const,
      // 关键：flex 子元素需要 minHeight:0 才能正常滚动
      minHeight: 0,
      flex: 1,
    };

    // Tab 栏组件 - 固定在手机框架内底部
    const tabBarHeight = 60;
    const renderTabBar = (tabs: typeof PROVIDER_TABS, activeTab: string, onChange: (id: any) => void) => (
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: tabBarHeight,
        background: THEME.bgDark, // 使用不透明背景色
        borderTop: `1px solid ${THEME.borderLight}`,
        display: 'flex',
        flexShrink: 0,
      }}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: activeTab === tab.id ? themeColor : THEME.textMuted,
              fontSize: 10,
              gap: 4,
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ fontSize: 22 }}>{tab.icon}</div>
            <div>{tab.label}</div>
          </div>
        ))}
      </div>
    );

    // 内容滚动样式 - 内部内容可以滚动，但标题栏是独立的
    const contentScrollStyle = {
      overflowY: 'auto' as const,
      overflowX: 'hidden' as const,
      scrollbarWidth: 'none' as const,
      msOverflowStyle: 'none' as const,
      WebkitOverflowScrolling: 'touch' as const,
      flex: 1,
      minHeight: 0,
    };

    // 渲染带标题栏的页面内容（不含滚动）
    const renderProviderWithTitle = () => renderProviderContent();
    const renderStaffWithTitle = () => renderStaffContent();

    if (currentRole === 'provider') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
          {/* 内容区域 - 可滚动，包含标题栏和业务内容 */}
          <div style={contentScrollStyle}>
            {renderProviderWithTitle()}
          </div>
          {/* Tab栏固定在底部 - 使用absolute定位 */}
          {showProviderTab && renderTabBar(PROVIDER_TABS, providerTab, handleProviderTabChange)}
        </div>
      );
    } else {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
          {/* 内容区域 - 可滚动，包含标题栏和业务内容 */}
          <div style={contentScrollStyle}>
            {renderStaffWithTitle()}
          </div>
          {/* Tab栏固定在底部 - 使用absolute定位 */}
          {showStaffTab && renderTabBar(STAFF_TABS, staffTab, handleStaffTabChange)}
        </div>
      );
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050810',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}
    >
      {/* 背景光效 */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse at 30% 20%, ${THEME.providerPrimary}08 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, ${THEME.staffPrimary}08 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* 内容区域 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* 手机框架 */}
        <div style={{ position: 'relative' }}>
          <PhoneFrame
            themeColor={themeColor}
            themeGradient={`linear-gradient(135deg, ${themeColor} 0%, ${currentRole === 'provider' ? THEME.providerSecondary : THEME.staffSecondary} 100%)`}
          >
            <div
              style={{
                flex: 1,
                background: THEME.bgDark,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                overflow: 'hidden',
              }}
            >
              {currentPage === 'login' ? renderLoginPage() : renderMainContent()}
            </div>
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}