import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getId, getType } from '@/utils/auth' // 验权
import { constantRouterMap } from '@/router/index';

// permissiom judge
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

function getWhiteList(){
  let list = [];
  for(let i in constantRouterMap){
    if(typeof constantRouterMap[i].redirect != 'undefined'){
      list.push(constantRouterMap[i].redirect);
      // for(let c in constantRouterMap[i].children){
      //   list.push(constantRouterMap[i].path+'/'+constantRouterMap[i].children[c].path);
      // }
    }else if(typeof constantRouterMap[i].children == 'undefined'){
      list.push(constantRouterMap[i].path);
    }else{
      for(let c in constantRouterMap[i].children){
        list.push(constantRouterMap[i].path+'/'+constantRouterMap[i].children[c].path);
      }
    }
  }
  for (var i = list.length - 1; i >= 0; i--) {
    list[i] = list[i].split(':')[0]
  }
  return list;
}

// register global progress.
const whiteList = getWhiteList(); // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  if (getId() && getType()) { // 判断是否有token
    // if (to.path === '/login') {
    //   next({ path: '/' })
    // } else {
      if (store.getters.account.length == 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          store.dispatch('GenerateRoutes', { res }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to }) // hack方法 确保addRoutes已完成
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            // next({ path: '/' })
          })
        })
      } else {
        next()
      }
    // }
  } else {
    next()
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      // this.$message.error('请先登陆！！！');
      next(from.path) // 否则全部重定向到登录页
      NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})