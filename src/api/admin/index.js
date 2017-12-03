import fetch from '@/utils/fetch';


export function welcomeTop(data) {
  return fetch({
    url: '/admin/admin/top',
    method: 'post',
    data
  });
}

export function welcomeCount(data) {
  return fetch({
    url: '/admin/admin/count',
    method: 'post',
    data
  });
}