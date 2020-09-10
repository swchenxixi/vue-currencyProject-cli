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
  }
];
