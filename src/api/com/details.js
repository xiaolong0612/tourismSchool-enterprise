import fetch from '@/utils/fetch';

// 企业信息

export function saveDetails(data) {
  return fetch({
    url: '/admin/details/save-details',
    method: 'post',
    data
  });
}

export function updateDetails(data) {
  return fetch({
    url: '/admin/details/update-details',
    method: 'post',
    data
  });
}

export function delDetails(data) {
  return fetch({
    url: '/admin/details/del-details',
    method: 'post',
    data
  });
}

export function detailDetails(data) {
  return fetch({
    url: '/admin/details/detail-details',
    method: 'post',
    data
  });
}
export function searchDetails(data) {
  return fetch({
    url: '/admin/details/list-details',
    method: 'post',
    data
  });
}