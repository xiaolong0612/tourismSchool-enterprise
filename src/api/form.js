import fetch from '@/utils/fetch';

export function comList(data) {
  return fetch({
    url: '/admin/company/get-company-list',
    method: 'post',
    data
  });
}
export function schoolList(data) {
  return fetch({
    url: '/admin/school/get-school-list',
    method: 'post',
    data
  });
}
// 获取短信验证码
export function getCode(data) {
  return fetch({
    url: '/sendmsg',
    method: 'get',
    params: data
  });
}

