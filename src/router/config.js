export default [
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/test')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/auth')
  },
  {
    path: '/user-list',
    name: 'UserList',
    meta: {
      auth: true
    },
    component: () => import('@/views/user/user-list')
  },
  {
    path: '/user-add',
    name: 'UserAdd',
    component: () => import('@/views/user/user-add')
  },
  {
    path: '/role-manage',
    name: 'roleManage',
    component: () => import('@/views/role')
  },
  {
    path: '/role-edit',
    name: 'roleEdit',
    component: () => import('@/views/role/role-edit')
  },
  {
    path: '/role-add',
    name: 'roleAdd',
    component: () => import('@/views/role/role-add')
  },
  {
    path: '/port-list',
    name: 'PortList',
    meta: {
      auth: true
    },
    component: () => import('@/views/port/port-list')
  },
  {
    path: '/port-add',
    name: 'PortAdd',
    component: () => import('@/views/port/port-add')
  },
  {
    path: '/shipLine-list',
    name: 'PortList',
    meta: {
      auth: true
    },
    component: () => import('@/views/shipLine/shipLine-list')
  },
  {
    path: '/shipLine-add',
    name: 'PortAdd',
    component: () => import('@/views/shipLine/shipLine-add')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404')
  },
  {
    path: '/cs',
    name: 'cs',
    component: () => import('@/components/form-page/test')
  }
];
