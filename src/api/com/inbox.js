import fetch from '@/utils/fetch';

// 收件箱


export function saveInbox(data) {
  return fetch({
    url: '/admin/inbox/save-inbox',
    method: 'post',
    data
  });
}

export function updateInbox(data) {
  return fetch({
    url: '/admin/inbox/update-inbox',
    method: 'post',
    data
  });
}

export function delInbox(data) {
  return fetch({
    url: '/admin/inbox/del-inbox',
    method: 'post',
    data
  });
}

export function detailInbox(data) {
  return fetch({
    url: '/admin/inbox/detail-inbox',
    method: 'post',
    data
  });
}
export function searchInbox(data) {
  return fetch({
    url: '/admin/inbox/list-inbox',
    method: 'post',
    data
  });
}
