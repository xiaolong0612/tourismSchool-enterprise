import fetch from '@/utils/fetch';


export function saveStudent(data) {
  return fetch({
    url: '/admin/student/save-student',
    method: 'post',
    data
  });
}

export function updateStudent(data) {
  return fetch({
    url: '/admin/student/mod-student',
    method: 'post',
    data
  });
}

export function delStudent(data) {
  return fetch({
    url: '/admin/student/del-student',
    method: 'post',
    data
  });
}

export function detailStudent(data) {
  return fetch({
    url: '/admin/student/detail-student',
    method: 'post',
    data
  });
}
export function getStudent(data) {
  return fetch({
    url: '/admin/student/get-student',
    method: 'post',
    data
  });
}