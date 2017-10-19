import fetch from '@/utils/fetch';


export function getSchool(data) {
  return fetch({
    url: '/admin/school/list-school',
    method: 'post',
    data
  });
}

export function updateSchool(data) {
  return fetch({
    url: '/admin/school/mod-school',
    method: 'post',
    data
  });
}
export function delSchool(data) {
  return fetch({
    url: '/admin/school/del-school',
    method: 'post',
    data
  });
}
// 报表
export function getReport(data) {
  return fetch({
    url: '/admin/school/school-report',
    method: 'post',
    data
  });
}