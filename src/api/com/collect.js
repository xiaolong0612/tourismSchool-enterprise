import fetch from '@/utils/fetch';
// 收藏


export function saveCollect(data) {
  return fetch({
    url: '/admin/collect/save-collect',
    method: 'post',
    data
  });
}