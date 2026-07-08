/**
 * 益寿服务端 APP - 主入口
 * 深空暗夜科技风格 - 双角色原型展示
 *
 * 功能：
 * - 统一登录页（含角色选择）
 * - 服务商管理端 + 服务人员端
 * - 手机框架展示
 * - 消息中心、提现、设置等完整功能
 */

import React, { useState, useCallback, useRef } from 'react';
import './style.css';

// 导入共享组件
import { PhoneFrame } from './shared/PhoneFrame';
import { LoginPage } from './shared/LoginPage';
import { Modal, Toast, THEME } from './shared/components';
import { MessageCenterPage } from './shared/MessageCenterPage';
import { SettingsPage } from './shared/SettingsPage';
import { ProfileEditPage } from './shared/ProfileEditPage';

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
import { DispatchPage } from './provider/DispatchPage';
import { ProfilePage as ProviderProfilePage } from './provider/ProfilePage';
import { ProviderRegisterPage } from './provider/RegisterPage';
import { SettlementPage } from './provider/SettlementPage';
import { StaffReviewPage } from './provider/StaffReviewPage';

// 导入服务人员端页面
import { TaskListPage } from './staff/TaskListPage';
import { TaskDetailPage } from './staff/TaskDetailPage';
import { TaskCheckinPage } from './staff/TaskCheckinPage';
import { IncomePage } from './staff/IncomePage';
import { WithdrawalPage } from './staff/WithdrawalPage';
import { ProfilePage as StaffProfilePage } from './staff/ProfilePage';
import { StaffRegisterPage } from './staff/RegisterPage';
import { ReviewListPage } from './staff/ReviewListPage';

// 导入统一模拟数据
import {
  ORDER_LIST as INITIAL_ORDERS,
  STAFF_LIST as INITIAL_STAFF,
  TASK_LIST as INITIAL_TASKS,
} from './shared/mock';
import type { OrderData, StaffData, TaskData } from './shared/mock';

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
  | 'dispatch'
  | 'staff'
  | 'staff-add'
  | 'staff-detail'
  | 'tasks'
  | 'task-detail'
  | 'task-checkin'
  | 'income'
  | 'withdrawal'
  | 'messages'
  | 'settings'
  | 'profile'
  | 'profile-edit'
  | 'settlement'
  | 'staff-review'
  | 'staff-reviews';

// Tab 类型
type Tab = 'home' | 'orders' | 'staff' | 'profile';
type StaffTab = 'tasks' | 'income' | 'profile';

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

// 路由栈配置：每个页面 key 对应其父页面
const PAGE_PARENT: Record<string, Page | null> = {
  login: null,
  'provider-register': 'login',
  'staff-register': 'login',
  'settle-intro': 'provider-register',
  'settle-form': 'settle-intro',
  'settle-upload': 'settle-form',
  'settle-success': 'settle-upload',
  'settle-status': 'home',
  home: null,
  orders: null,
  'order-detail': 'orders',
  dispatch: 'orders',
  staff: null,
  'staff-add': 'staff',
  'staff-detail': 'staff',
  tasks: null,
  'task-detail': 'tasks',
  'task-checkin': 'task-detail',
  income: null,
  withdrawal: 'income',
  messages: null,
  settings: null,
  profile: null,
  'profile-edit': 'profile',
  settlement: 'profile',
  'staff-review': 'profile',
  'staff-reviews': 'profile',
};

// 主组件
export default function ServiceApp() {
  // 状态
  const [currentRole, setCurrentRole] = useState<Role>('provider');
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [providerTab, setProviderTab] = useState<Tab>('home');
  const [staffTab, setStaffTab] = useState<StaffTab>('tasks');
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffData | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
  const [settleStatus, setSettleStatus] = useState<SettleStatus>('pending');
  const [orders, setOrders] = useState<OrderData[]>(INITIAL_ORDERS);
  const [staffs, setStaffs] = useState<StaffData[]>(INITIAL_STAFF);
  const [dispatchOrder, setDispatchOrder] = useState<OrderData | null>(null);
  const [dispatchFrom, setDispatchFrom] = useState<Page>('orders');
  // 当前服务人员的任务（派生自 orders，按 assignedStaff.name 过滤，默认展示王小明）
  const [currentStaffName] = useState('王小明');

  // 路由历史栈
  const routeStack = useRef<Page[]>(['login']);

  // 弹窗状态
  const [cancelModal, setCancelModal] = useState<OrderData | null>(null);
  const [acceptModal, setAcceptModal] = useState<TaskData | null>(null);
  const [rejectModal, setRejectModal] = useState<OrderData | null>(null);
  const [removeStaffModal, setRemoveStaffModal] = useState<StaffData | null>(null);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' | 'warning' }>({
    visible: false,
    message: '',
    type: 'success',
  });

  // 通知消息（动态生成）
  const [providerMessages, setProviderMessages] = useState<Array<{ id: string; title: string; content: string; time: string }>>([]);

  // Toast 辅助
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 2000);
  }, []);

  // 主题色
  const themeColor = currentRole === 'provider' ? THEME.providerPrimary : THEME.staffPrimary;

  // 导航函数（带历史栈）
  const navigate = useCallback((page: Page) => {
    routeStack.current.push(page);
    setCurrentPage(page);
  }, []);

  const goBack = useCallback(() => {
    if (routeStack.current.length <= 1) return;
    routeStack.current.pop(); // 弹出当前页
    const prevPage = routeStack.current[routeStack.current.length - 1];
    
    // 处理 tab 页面返回
    if (prevPage === 'home' || prevPage === 'orders' || prevPage === 'staff' || prevPage === 'profile') {
      setProviderTab(prevPage as Tab);
    }
    if (prevPage === 'tasks' || prevPage === 'income' || prevPage === 'profile') {
      setStaffTab(prevPage as StaffTab);
    }
    
    setCurrentPage(prevPage);
  }, []);

  // 登录后初始化路由栈
  const initRouteStack = useCallback((firstPage: Page) => {
    routeStack.current = [firstPage];
  }, []);

  // 派单：打开派单页面
  const handleDispatch = useCallback((order: OrderData, from: Page = 'orders') => {
    setDispatchOrder(order);
    setDispatchFrom(from);
    navigate('dispatch');
  }, [navigate]);

  // 派单确认：更新订单状态和接单人员
  const handleDispatchConfirm = useCallback((staff: { name: string; avatar: string; color: string; phone: string; skills: string[] }) => {
    if (!dispatchOrder) return;
    const updatedOrder: OrderData = {
      ...dispatchOrder,
      status: (dispatchOrder.status === 'pending' ? 'dispatched' : dispatchOrder.status) as OrderData['status'],
      assignedStaff: {
        name: staff.name,
        avatar: staff.avatar,
        color: staff.color,
        phone: staff.phone,
        skills: staff.skills,
      },
    };
    setOrders(prev => prev.map(o => (o.id === dispatchOrder.id ? updatedOrder : o)));
    // 更新人员的今日任务数
    setStaffs(prev => prev.map(s =>
      s.name === staff.name ? { ...s, todayTasks: s.todayTasks + 1 } : s
    ));
    setSelectedOrder(updatedOrder);
    setDispatchOrder(null);
    routeStack.current = routeStack.current.filter(p => p !== 'dispatch');
    setCurrentPage(dispatchFrom);
    showToast('派单成功', 'success');
  }, [dispatchOrder, dispatchFrom, showToast]);

  // 订单取消
  const handleCancelOrder = useCallback((order: OrderData) => {
    setCancelModal(order);
  }, []);

  const confirmCancelOrder = useCallback(() => {
    if (!cancelModal) return;
    const now = new Date();
    const cancelledOrder: OrderData = {
      ...cancelModal,
      status: 'cancelled',
      cancelReason: '服务商取消',
      cancelTime: now.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
    };
    setOrders(prev => prev.map(o => (o.id === cancelModal.id ? cancelledOrder : o)));
    setSelectedOrder(cancelledOrder);
    setCancelModal(null);
    showToast('订单已取消', 'success');
  }, [cancelModal, showToast]);

  // 任务接受确认（服务人员开始服务）
  const handleAcceptTask = useCallback((task: TaskData) => {
    setAcceptModal(task);
  }, []);

  const confirmAcceptTask = useCallback(() => {
    if (!acceptModal) return;
    // 将订单状态改为 serving（进行中），任务同步
    setOrders(prev => prev.map(o =>
      o.id === acceptModal.id ? { ...o, status: 'serving' as const } : o
    ));
    setSelectedTask({ ...acceptModal, status: 'serving' });
    setAcceptModal(null);
    showToast('已开始服务，请按时完成', 'success');
  }, [acceptModal, showToast]);

  // 任务拒绝
  const handleRejectTask = useCallback((order: OrderData) => {
    setRejectModal(order);
  }, []);

  const confirmRejectTask = useCallback(() => {
    if (!rejectModal) return;
    // 订单回到待派单状态，清除已指派人员
    const returnedOrder: OrderData = {
      ...rejectModal,
      status: 'pending',
      assignedStaff: undefined,
    };
    setOrders(prev => prev.map(o => (o.id === rejectModal.id ? returnedOrder : o)));
    // 通知服务商
    setProviderMessages(prev => [{
      id: `notify_${Date.now()}`,
      title: '任务被拒绝',
      content: `${currentStaffName} 拒绝了订单 ${rejectModal.id}（${rejectModal.service} - ${rejectModal.user}），请重新派单`,
      time: new Date().toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
    }, ...prev]);
    setRejectModal(null);
    showToast('已拒绝该任务', 'warning');
  }, [rejectModal, currentStaffName, showToast]);

  // 任务完成
  const handleTaskComplete = useCallback((task: TaskData) => {
    setOrders(prev => prev.map(o =>
      o.id === task.id ? { ...o, status: 'completed' as const } : o
    ));
    setSelectedTask(prev => prev ? { ...prev, status: 'completed' } : null);
    showToast('任务已完成', 'success');
  }, [showToast]);

  // 移除人员
  const handleRemoveStaff = useCallback((staff: StaffData) => {
    setRemoveStaffModal(staff);
  }, []);

  const confirmRemoveStaff = useCallback(() => {
    if (!removeStaffModal) return;
    setStaffs(prev => prev.filter(s => s.id !== removeStaffModal.id));
    setRemoveStaffModal(null);
    showToast(`${removeStaffModal.name} 已移除`, 'success');
  }, [removeStaffModal, showToast]);

  // 审核通过人员
  const handleApproveStaff = useCallback((staff: StaffData) => {
    setStaffs(prev => prev.map(s =>
      s.id === staff.id ? { ...s, reviewStatus: 'approved' as const, status: 'online' as const } : s
    ));
    showToast(`${staff.name} 审核已通过`, 'success');
  }, [showToast]);

  // 审核驳回人员
  const handleRejectStaff = useCallback((staff: StaffData) => {
    setStaffs(prev => prev.map(s =>
      s.id === staff.id ? { ...s, reviewStatus: 'rejected' as const, reason: staff.reason } : s
    ));
    showToast(`${staff.name} 审核已驳回`, 'warning');
  }, [showToast]);

  // 服务人员注册成功：添加待审核人员
  const handleStaffRegisterSuccess = useCallback((data: { phone: string; name: string; idCard: string; skills: string[]; area: string; experience: string }) => {
    const newId = Math.max(0, ...staffs.map(s => s.id)) + 1;
    const now = new Date();
    const applyTime = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    const newStaff: StaffData = {
      id: newId,
      name: data.name,
      avatar: data.name.charAt(0),
      color: '#A855F7',
      phone: data.phone,
      status: 'offline',
      skills: data.skills,
      todayTasks: 0,
      totalTasks: 0,
      reviewStatus: 'pending',
      area: data.area,
      experience: data.experience,
      applyTime,
    };
    setStaffs(prev => [...prev, newStaff]);
  }, [staffs]);

  // 派生：当前服务人员的任务列表（从 orders 中过滤）
  const derivedTasks: TaskData[] = orders
    .filter(o => o.assignedStaff && o.assignedStaff.name === currentStaffName)
    .filter(o => o.status !== 'pending' && o.status !== 'cancelled')
    .map(o => ({
      id: o.id,
      user: o.user,
      avatar: o.avatar,
      color: o.color,
      phone: o.phone,
      service: o.service,
      address: o.address,
      time: o.time,
      amount: o.amount,
      status: o.status === 'dispatched' ? 'accepted' as const : o.status as TaskData['status'],
    }));

  // 处理登录
  const handleLogin = useCallback((role: Role) => {
    setCurrentRole(role);
    const firstPage = role === 'provider' ? 'home' : 'tasks';
    initRouteStack(firstPage);
    setCurrentPage(firstPage);
    if (role === 'provider') setProviderTab('home');
    else setStaffTab('tasks');
  }, [initRouteStack]);

  // 处理注册
  const handleRegister = useCallback((role: Role) => {
    setCurrentRole(role);
    const regPage: Page = role === 'provider' ? 'provider-register' : 'staff-register';
    routeStack.current = [regPage];
    setCurrentPage(regPage);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentRole('provider');
    routeStack.current = ['login'];
    setCurrentPage('login');
  }, []);

  const handleOrderClick = useCallback((order: OrderData) => {
    const latestOrder = orders.find(o => o.id === order.id) || order;
    setSelectedOrder(latestOrder);
    navigate('order-detail');
  }, [orders, navigate]);

  const handleStaffClick = useCallback((staff: StaffData) => {
    setSelectedStaff(staff);
    navigate('staff-detail');
  }, [navigate]);

  const handleTaskClick = useCallback((task: TaskData) => {
    setSelectedTask(task);
    navigate('task-detail');
  }, [navigate]);

  // Tab 切换
  const handleProviderTabChange = useCallback((tab: Tab) => {
    setProviderTab(tab);
    const pageMap: Record<Tab, Page> = { home: 'home', orders: 'orders', staff: 'staff', profile: 'profile' };
    setCurrentPage(pageMap[tab]);
    routeStack.current = [pageMap[tab]];
  }, []);

  const handleStaffTabChange = useCallback((tab: StaffTab) => {
    setStaffTab(tab);
    const pageMap: Record<StaffTab, Page> = { tasks: 'tasks', income: 'income', profile: 'profile' };
    setCurrentPage(pageMap[tab]);
    routeStack.current = [pageMap[tab]];
  }, []);

  // ========== 渲染服务商管理端内容 ==========
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
            orders={orders}
            stats={{
              pending: orders.filter(o => o.status === 'pending').length,
              dispatched: orders.filter(o => o.status === 'dispatched').length,
              serving: orders.filter(o => o.status === 'serving').length,
              completed: orders.filter(o => o.status === 'completed').length,
            }}
            todayIncome={`¥${orders
              .filter(o => o.status === 'completed')
              .reduce((sum, o) => sum + parseFloat(o.amount.replace('¥', '')), 0)
              .toFixed(2)}`}
          />
        );
      case 'orders':
        return (
          <OrderListPage
            themeColor={themeColor}
            onBack={goBack}
            onOrderClick={handleOrderClick}
            onDispatch={handleDispatch}
            onCancel={handleCancelOrder}
            orders={orders}
          />
        );
      case 'dispatch':
        return dispatchOrder ? (
          <DispatchPage
            themeColor={themeColor}
            order={dispatchOrder}
            staffList={staffs.filter(s => s.reviewStatus === 'approved')}
            onBack={goBack}
            onDispatch={(staff) => handleDispatchConfirm({
              name: staff.name,
              avatar: staff.avatar,
              color: staff.color,
              phone: staff.phone,
              skills: staff.skills,
            })}
          />
        ) : null;
      case 'staff':
        return (
          <StaffListPage
            themeColor={themeColor}
            staffs={staffs}
            onBack={goBack}
            onStaffClick={handleStaffClick}
            onAddStaff={() => navigate('staff-add')}
            onRemoveStaff={handleRemoveStaff}
            onReview={() => navigate('staff-review')}
          />
        );
      case 'profile':
        return (
          <ProviderProfilePage
            themeColor={themeColor}
            onLogout={handleLogout}
            onNavigate={navigate}
          />
        );
      case 'messages':
        return <MessageCenterPage themeColor={themeColor} onBack={goBack} />;
      case 'settings':
        return <SettingsPage themeColor={themeColor} onBack={goBack} onLogout={handleLogout} />;
      case 'profile-edit':
        return <ProfileEditPage themeColor={themeColor} onBack={goBack} role="provider" />;
      case 'order-detail':
        return selectedOrder ? (
          <OrderDetailPage
            themeColor={themeColor}
            order={selectedOrder}
            onBack={goBack}
            onDispatch={() => handleDispatch(selectedOrder, 'order-detail')}
            onCancel={() => handleCancelOrder(selectedOrder)}
            onStaffClick={(staff) => {
              setSelectedStaff({
                id: 0,
                name: staff.name,
                avatar: staff.avatar,
                color: staff.color,
                phone: staff.phone,
                status: 'online',
                skills: staff.skills,
                todayTasks: 0,
                totalTasks: 0,
              });
              navigate('staff-detail');
            }}
          />
        ) : null;
      case 'staff-add':
        return (
          <StaffAddPage
            themeColor={themeColor}
            onBack={goBack}
            onSuccess={() => {
              routeStack.current = routeStack.current.filter(p => p !== 'staff-add');
              navigate('staff');
              showToast('人员添加成功', 'success');
            }}
          />
        );
      case 'staff-detail':
        return selectedStaff ? (
          <StaffDetailPage
            themeColor={themeColor}
            staff={selectedStaff}
            onBack={goBack}
            onContact={() => {}}
            onRemoveStaff={() => handleRemoveStaff(selectedStaff)}
          />
        ) : null;
      case 'settlement':
        return <SettlementPage themeColor={themeColor} onBack={goBack} />;
      case 'staff-review':
        return (
          <StaffReviewPage
            themeColor={themeColor}
            onBack={goBack}
            staffList={staffs}
            onApprove={(staff) => handleApproveStaff(staff)}
            onReject={(staff) => handleRejectStaff(staff)}
          />
        );
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
              routeStack.current = ['home'];
              setCurrentPage('home');
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
              routeStack.current = ['home'];
              setCurrentPage('home');
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

  // ========== 渲染服务人员端内容 ==========
  const renderStaffContent = () => {
    switch (currentPage) {
      case 'staff-register':
        return (
          <StaffRegisterPage
            themeColor={themeColor}
            onBack={goBack}
            onRegisterSuccess={handleStaffRegisterSuccess}
            onSuccess={() => {
              routeStack.current = ['tasks'];
              setCurrentPage('tasks');
              showToast('注册成功，请等待服务商审核', 'success');
            }}
          />
        );
      case 'tasks':
        return (
          <TaskListPage
            themeColor={themeColor}
            tasks={derivedTasks}
            onTaskClick={(task) => {
              const order = orders.find(o => o.id === task.id);
              if (order) handleTaskClick(task);
            }}
            onAcceptTask={handleAcceptTask}
            onRejectTask={(task) => {
              const order = orders.find(o => o.id === task.id);
              if (order) handleRejectTask(order);
            }}
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
            onAccept={
              selectedTask.status === 'pending'
                ? () => handleAcceptTask(selectedTask)
                : undefined
            }
            onStart={
              selectedTask.status === 'accepted'
                ? () => {
                    setSelectedTask({ ...selectedTask, status: 'serving' });
                    navigate('task-checkin');
                  }
                : undefined
            }
          />
        ) : null;
      case 'task-checkin':
        return (
          <TaskCheckinPage
            themeColor={themeColor}
            mode="complete"
            onBack={goBack}
            onCheckin={() => {
              if (selectedTask) handleTaskComplete(selectedTask);
              routeStack.current = routeStack.current.filter(p => p !== 'task-checkin');
              navigate('tasks');
            }}
          />
        );
      case 'income':
        return (
          <IncomePage
            themeColor={themeColor}
            onWithdraw={() => navigate('withdrawal')}
          />
        );
      case 'withdrawal':
        return <WithdrawalPage themeColor={themeColor} onBack={goBack} />;
      case 'profile':
        return (
          <StaffProfilePage
            themeColor={themeColor}
            onLogout={handleLogout}
            onNavigate={navigate}
          />
        );
      case 'messages':
        return <MessageCenterPage themeColor={themeColor} onBack={goBack} />;
      case 'settings':
        return <SettingsPage themeColor={themeColor} onBack={goBack} onLogout={handleLogout} />;
      case 'profile-edit':
        return <ProfileEditPage themeColor={themeColor} onBack={goBack} role="staff" />;
      case 'staff-reviews':
        return <ReviewListPage themeColor={themeColor} onBack={goBack} />;
      default:
        return null;
    }
  };

  // 渲染登录页
  const renderLoginPage = () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'auto' }}>
      <LoginPage
        themeColor={themeColor}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );

  // 渲染主内容区域
  const renderMainContent = () => {
    const noTabPages: Page[] = [
      'provider-register', 'staff-register',
      'settle-intro', 'settle-form', 'settle-upload', 'settle-success',
      'order-detail', 'dispatch', 'staff-add', 'staff-detail',
      'task-detail', 'task-checkin',
      'withdrawal', 'messages', 'settings', 'profile-edit',
      'settlement', 'staff-review', 'staff-reviews',
    ];

    const showProviderTab = !noTabPages.includes(currentPage) &&
      (currentPage === 'home' || currentPage === 'orders' || currentPage === 'staff' || currentPage === 'profile');
    const showStaffTab = !noTabPages.includes(currentPage) &&
      (currentPage === 'tasks' || currentPage === 'income' || currentPage === 'profile');

    const contentScrollStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
      flex: 1,
      minHeight: 0,
    };

    const renderTabBar = (tabs: typeof PROVIDER_TABS, activeTab: string, onChange: (id: any) => void) => (
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        background: THEME.bgDark,
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

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        <div style={contentScrollStyle}>
          {currentRole === 'provider' ? renderProviderContent() : renderStaffContent()}
        </div>
        {showProviderTab && currentRole === 'provider' && renderTabBar(PROVIDER_TABS, providerTab, handleProviderTabChange)}
        {showStaffTab && currentRole === 'staff' && renderTabBar(STAFF_TABS, staffTab, handleStaffTabChange)}
      </div>
    );
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

      {/* 订单取消确认弹窗 */}
      <Modal
        visible={!!cancelModal}
        title="取消订单"
        onClose={() => setCancelModal(null)}
        themeColor={themeColor}
        footer={
          <>
            <button
              onClick={() => setCancelModal(null)}
              style={{
                flex: 1,
                height: 44,
                background: THEME.bgInput,
                border: `1px solid ${THEME.borderLight}`,
                borderRadius: 12,
                color: THEME.textSecondary,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              暂不取消
            </button>
            <button
              onClick={confirmCancelOrder}
              style={{
                flex: 1,
                height: 44,
                background: THEME.danger,
                border: 'none',
                borderRadius: 12,
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              确认取消
            </button>
          </>
        }
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 8 }}>
            确定要取消订单 <strong style={{ color: THEME.textPrimary }}>{cancelModal?.id}</strong> 吗？
          </p>
          <p style={{ fontSize: 12, color: THEME.textMuted }}>
            客户：{cancelModal?.user} | 服务：{cancelModal?.service}
          </p>
        </div>
      </Modal>

      {/* 接单确认弹窗 */}
      <Modal
        visible={!!acceptModal}
        title="确认开始服务"
        onClose={() => setAcceptModal(null)}
        themeColor={themeColor}
        footer={
          <>
            <button
              onClick={() => setAcceptModal(null)}
              style={{
                flex: 1,
                height: 44,
                background: THEME.bgInput,
                border: `1px solid ${THEME.borderLight}`,
                borderRadius: 12,
                color: THEME.textSecondary,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              再想想
            </button>
            <button
              onClick={confirmAcceptTask}
              style={{
                flex: 1,
                height: 44,
                background: `linear-gradient(135deg, ${themeColor} 0%, ${THEME.staffSecondary} 100%)`,
                border: 'none',
                borderRadius: 12,
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              确认开始
            </button>
          </>
        }
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 8 }}>
            确认开始 <strong style={{ color: THEME.textPrimary }}>{acceptModal?.user}</strong> 的任务？
          </p>
          <p style={{ fontSize: 12, color: THEME.textMuted }}>
            服务：{acceptModal?.service} | 时间：{acceptModal?.time}
          </p>
          <p style={{ fontSize: 12, color: THEME.textMuted }}>
            地址：{acceptModal?.address}
          </p>
        </div>
      </Modal>

      {/* 拒绝任务确认弹窗 */}
      <Modal
        visible={!!rejectModal}
        title="拒绝任务"
        onClose={() => setRejectModal(null)}
        themeColor={themeColor}
        footer={
          <>
            <button
              onClick={() => setRejectModal(null)}
              style={{
                flex: 1,
                height: 44,
                background: THEME.bgInput,
                border: `1px solid ${THEME.borderLight}`,
                borderRadius: 12,
                color: THEME.textSecondary,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              暂不拒绝
            </button>
            <button
              onClick={confirmRejectTask}
              style={{
                flex: 1,
                height: 44,
                background: THEME.danger,
                border: 'none',
                borderRadius: 12,
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              确认拒绝
            </button>
          </>
        }
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 8 }}>
            确定拒绝 <strong style={{ color: THEME.textPrimary }}>{rejectModal?.user}</strong> 的任务吗？
          </p>
          <p style={{ fontSize: 12, color: THEME.textMuted }}>
            服务：{rejectModal?.service} | 金额：{rejectModal?.amount}
          </p>
          <p style={{ fontSize: 12, color: THEME.warning, marginTop: 8 }}>
            拒绝后该订单将返回待派单状态
          </p>
        </div>
      </Modal>

      {/* 移除人员确认弹窗 */}
      <Modal
        visible={!!removeStaffModal}
        title="移除人员"
        onClose={() => setRemoveStaffModal(null)}
        themeColor={themeColor}
        footer={
          <>
            <button
              onClick={() => setRemoveStaffModal(null)}
              style={{
                flex: 1,
                height: 44,
                background: THEME.bgInput,
                border: `1px solid ${THEME.borderLight}`,
                borderRadius: 12,
                color: THEME.textSecondary,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              取消
            </button>
            <button
              onClick={confirmRemoveStaff}
              style={{
                flex: 1,
                height: 44,
                background: THEME.danger,
                border: 'none',
                borderRadius: 12,
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              确认移除
            </button>
          </>
        }
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 8 }}>
            确定要移除 <strong style={{ color: THEME.textPrimary }}>{removeStaffModal?.name}</strong> 吗？
          </p>
          <p style={{ fontSize: 12, color: THEME.textMuted }}>
            移除后该人员将无法接单，此操作不可撤销
          </p>
        </div>
      </Modal>

      {/* Toast 提示 */}
      <Toast visible={toast.visible} message={toast.message} type={toast.type} themeColor={themeColor} />
    </div>
  );
}
