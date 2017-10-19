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