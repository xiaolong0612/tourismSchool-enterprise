import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* admin */
import adminLayout from '../views/layout/admin/adminLayout';
/* web */
import webLayout from '../views/layout/web/webLayout';

/* 首页 */
const web_index = _import('web/home/index');
/* login */
const Login = _import('login/index');

/* 搜索列表 */
const search_index = _import('web/search/index');
/* 招聘详情 */
const search_details = _import('web/search/details');

/***************
 *    admin    *
 ***************/
const admin_student_list = _import('admin/student/index');
const admin_com_list = _import('admin/com/index');
const admin_school_list = _import('admin/school/index');
const admin_report_list = _import('admin/school/report');

/***************
 *   用户信息   *
 ***************/
/* 投递箱 */
const user_delivery = _import('web/user/delivery/index');
/* 简历列表 */
const user_resume_list = _import('web/user/resume/list');
/* 简历详情 */
const user_resume_details = _import('web/user/resume/details');
/* 收藏夹 */
const user_collect = _import('web/user/collect/index');

/***************
 *   企业信息   *
 ***************/
/* 发布招聘 */
const com_recruit_release = _import('web/com/recruit/release');
/* 招聘列表 */
const com_recruit_list = _import('web/com/recruit/list');
/* 招聘详情 */
const com_recruit_details = _import('web/com/recruit/details');
/* 收件箱 */
const com_inbox_list = _import('web/com/inbox/list');
const com_inbox_details = _import('web/com/inbox/details');




/* dashboard */
const dashboard = _import('dashboard/index');

/* error page */
const Err404 = _import('404');

/* demo page */
const Form = _import('page/form');
const Table = _import('table/index');

const form_new_resume = _import('form/new-resume');



Vue.use(Router);

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Err404, hidden: true },
  {
    path: '/',
    component: webLayout,
    redirect: '/index',
    name: 'Home',
    hidden: true,
    children: [{ path: 'index', component: web_index }]
  },
  {
    path: '/search',
    component: webLayout,
    name: 'search',
    hidden: true,
    children: [
      { path: 'list', component: search_index },
      { path: 'list/details/:id', component: search_details }
    ]
  },
  {
    path: '/dashboard',
    component: adminLayout,
    redirect: '/dashboard/index',
    name: 'Home',
    hidden: true,
    children: [{ path: 'dashboard/index', component: dashboard }]
  },
  {
    path: '/form',
    component: webLayout,
    name: 'Home',
    hidden: true,
    children: [{ path: 'form-new-resume', component: form_new_resume }]
  },
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/user',
    component: webLayout,
    name: '用户',
    hidden: true,
    meta: { role: ['2'] },
    children: [
      {
        path: 'delivery',
        component: user_delivery,
        name: '投递箱'
      },
      {
        path: 'resume/list',
        component: user_resume_list,
        name: '简历列表'
      },
      {
        path: 'resume/list/details/:id',
        component: user_resume_details,
        name: '简历详情'
      },
      {
        path: 'collect/list',
        component: user_collect,
        name: '收藏夹'
      }
    ]
  },
  {
    path: '/com',
    component: webLayout,
    name: '企业',
    hidden: true,
    meta: { role: ['3'] },
    children: [
      {
        path: 'recruit/release',
        component: com_recruit_release,
        name: '发布招聘'
      },
      {
        path: 'recruit/list',
        component: com_recruit_list,
        name: '招聘列表'
      },
      {
        path: 'inbox/list',
        component: com_inbox_list,
        name: '收件箱'
      },
      {
        path: 'inbox/details/:id',
        component: com_inbox_details,
        name: '简历'
      },
    ]
  },
  {
    path: '/com',
    component: adminLayout,
    redirect: '/com/list',
    name: '企业',
    icon: 'tubiaoleixingzhengchang',
    meta: { role: ['0'] },
    noDropdown: true,
    children: [{ path: 'list', component: admin_com_list, name: '企业列表', meta: { role: ['0'] }}]
  },
  {
    path: '/school',
    component: adminLayout,
    redirect: '/school/list',
    name: '学校',
    icon: 'tubiaoleixingzhengchang',
    meta: { role: ['0'] },
    noDropdown: true,
    children: [{ path: 'list', component: admin_school_list, name: '学校列表', meta: { role: ['0'] }}]
  },
  {
    path: '/student',
    component: adminLayout,
    redirect: '/student/list',
    name: '学生',
    icon: 'tubiaoleixingzhengchang',
    meta: { role: ['0', '1'] },
    noDropdown: true,
    children: [{ path: 'list', component: admin_student_list, name: '学生列表', meta: { role: ['0', '1'] }}]
  },
  {
    path: '/report',
    component: adminLayout,
    redirect: '/report/list',
    name: '报表',
    icon: 'tubiaoleixingzhengchang',
    meta: { role: ['1'] },
    noDropdown: true,
    children: [{ path: 'list', component: admin_report_list, name: '报表', meta: { role: ['1'] }}]
  },
  // {
  //   path: '/example',
  //   component: adminLayout,
  //   redirect: 'noredirect',
  //   name: 'Example',
  //   icon: 'zujian',
  //   hidden: true,
  //   meta: { role: ['0'] },
  //   children: [
  //     { path: 'index', component: Form, name: 'Form', icon: 'zonghe', meta: { role: ['0'] } }
  //   ]
  // },
  // {
  //   path: '/table',
  //   component: adminLayout,
  //   redirect: '/table/index',
  //   name: 'Table',
  //   icon: 'tubiaoleixingzhengchang',
  //   hidden: true,
  //   meta: { role: ['admin'] },
  //   noDropdown: true,
  //   children: [{ path: 'index', component: Table, name: 'Table', meta: { role: ['admin'] } }]
  // },
  { path: '*', redirect: '/404', hidden: true }
];