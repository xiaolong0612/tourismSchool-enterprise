import fetch from '@/utils/fetch';

// 收件箱

// 邀请面试
export function updateInbox(data) {
  return fetch({
    url: '/admin/company-resume/mod-student-resume-delivery',
    method: 'post',
    data
  });
}
// 企业直接邀请面试
export function newInbox(data) {
  return fetch({
    url: '/admin/company-resume/new-resume-delivery',
    method: 'post',
    data
  });
}
//拒绝
export function refuseInbox(data) {
  return fetch({
    url: '/admin/company-resume/refuse-student-resume-delivery',
    method: 'post',
    data
  });
}
// 同意入职
export function modInbox(data) {
  return fetch({
    url: '/admin/company-resume/mod-resume-delivery',
    method: 'post',
    data
  });
}

export function getInbox(data) {
  return fetch({
    url: '/admin/company-resume/list-resume-delivery',
    method: 'post',
    data
  });
}
