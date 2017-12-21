import fetch from '@/utils/fetch';

export function getHostestJob(data) {
  return fetch({
    url: '/admin/index/list-hostest-job',
    method: 'post',
    data
  });
}
export function getLastJob(data) {
  return fetch({
    url: '/admin/index/list-last-job',
    method: 'post',
    data
  });
}

// 新闻
export function getListNew(data) {
  return fetch({
    url: '/admin/news/list-news',
    method: 'post',
    data
  });
}