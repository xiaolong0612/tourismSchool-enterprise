import fetch from '@/utils/fetch';


export function welcomeTop(data) {
  return fetch({
    url: '/admin/admin/top',
    method: 'post',
    data
  });
}

export function welcomeCount(data) {
  return fetch({
    url: '/admin/admin/count',
    method: 'post',
    data
  });
}
export function welcomeSchool(data) {
  return fetch({
    url: '/admin/admin/school',
    method: 'post',
    data
  });
}
export function welcomeJob(data) {
  return fetch({
    url: '/admin/admin/job',
    method: 'post',
    data
  });
}