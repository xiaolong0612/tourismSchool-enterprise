import fetch from '@/utils/fetch';
// 投递箱


export function saveDelivery(data) {
  return fetch({
    url: '/admin/delivery/save-delivery',
    method: 'post',
    data
  });
}
/**
 * @Author    xiaolongjun
 * @DateTime  2017-10-08
 * @namespace 投递
 * @param     {
 *            	jobId: ,
 *            	resumeId: '',
 *            	studentId: '',
 * 						}
 */
export function resumeDelivery(data) {
  return fetch({
    url: '/admin/resume-delivery-invitate/resume-delivery',
    method: 'post',
    data
  });
}

// 投递列表
export function deliveryList(data) {
  return fetch({
    url: '/admin/resume-delivery-invitate/get-student-resume-delivery',
    method: 'post',
    data
  });
}
// 评价
export function editEvaluate(data) {
  return fetch({
    url: 'admin/interview-evaluate/save-interview-evaluate',
    method: 'post',
    data
  });
}
