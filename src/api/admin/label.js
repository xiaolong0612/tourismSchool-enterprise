import fetch from '@/utils/fetch';


export function listLabel(data) {
  return fetch({
    url: '/admin/job/list-jobLabel',
    method: 'post',
    data
  });
}
export function newLabel(data) {
  return fetch({
    url: '/admin/job/new-jobLabel',
    method: 'post',
    data
  });
}
export function delLabel(data) {
  return fetch({
    url: '/admin/job/del-jobLabel',
    method: 'post',
    data
  });
}
export function updateLabel(data) {
  return fetch({
    url: '/admin/job/mod-jobLabel',
    method: 'post',
    data
  });
}