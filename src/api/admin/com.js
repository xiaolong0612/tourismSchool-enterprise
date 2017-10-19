import fetch from '@/utils/fetch';


export function saveCom(data) {
  return fetch({
    url: '/admin/company/save-student',
    method: 'post',
    data
  });
}

export function updateCom(data) {
  return fetch({
    url: '/admin/company/mod-company',
    method: 'post',
    data
  });
}

export function delCom(data) {
  return fetch({
    url: '/admin/company/del-company',
    method: 'post',
    data
  });
}

export function detailCom(data) {
  return fetch({
    url: '/admin/company/detail-student',
    method: 'post',
    data
  });
}
export function getComList(data) {
  return fetch({
    url: '/admin/company/list-company',
    method: 'post',
    data
  });
}