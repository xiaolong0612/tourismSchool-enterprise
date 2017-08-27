import fetch from '@/utils/fetch';

export function login(account, password) {
  const data = {
    account,
    password
  };
  return fetch({
    url: '/login/login',
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

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}