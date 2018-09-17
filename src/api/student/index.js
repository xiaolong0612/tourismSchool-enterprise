import fetch from '@/utils/fetch';

// 保存学生信息
export function saveEdit(data) {
  return fetch({
    url: '/admin/student/mod-student',
    method: 'post',
    data
  });
}
// 工作状态
export function changeWorkType(data) {
  return fetch({
    url: '/admin/student/mod-work-type',
    method: 'post',
    data
  });
}