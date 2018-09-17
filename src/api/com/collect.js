import fetch from '@/utils/fetch';
// 收藏列表
export function listCollect(data) {
  return fetch({
    url: '/admin/resume/list-resume-collect',
    method: 'post',
    data
  });
}
// 收藏
export function resumeCollect(data) {
  return fetch({
    url: '/admin/resume/resume-collect',
    method: 'post',
    data
  });
}

// 判断简历是否被企业收藏
export function resumeIsCollect(data) {
  return fetch({
    url: '/admin/resume/resume-is-collect',
    method: 'post',
    data
  });
}
// 取消收藏
export function delResumeCollect(data) {
  return fetch({
    url: '/admin/resume/del-resume-collect',
    method: 'post',
    data
  });
}