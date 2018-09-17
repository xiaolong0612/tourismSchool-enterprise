import fetch from '@/utils/fetch';

export function login(data) {
  return fetch({
    url: '/admin/login',
    method: 'post',
    data
  });
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}

export function getInfo(data) {
  return fetch({
    url: '/admin/get-login-info',
    method: 'post',
    data
  });
}

export function registerCom(data){
  return fetch({
    url: '/admin/company/new-company',
    method: 'post',
    data
  });
}
export function registerStudent(data){
  return fetch({
    url: '/admin/student/save-student',
    method: 'post',
    data
  });
}

export function modPassword(data){
  return fetch({
    url: '/admin/company/mod-password',
    method: 'post',
    data
  });
}