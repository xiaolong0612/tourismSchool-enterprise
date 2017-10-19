import fetch from '@/utils/fetch';
// 新闻

export function getListNew(data) {
  return fetch({
    url: '/admin/news/list-news',
    method: 'post',
    data
  });
}