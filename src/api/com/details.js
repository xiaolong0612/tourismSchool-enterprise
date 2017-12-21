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
    url: '/admin/company/mod-company',
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

export function getDetails(data) {
  return fetch({
    url: '/admin/company/detail-company',
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