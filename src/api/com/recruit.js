import fetch from '@/utils/fetch';
// 岗位
/**
 * @Author    xiaolongjun
 * @DateTime  2017-10-08
 * @namespace 新增招聘
 * @param     {
 *            	companyId: integer,
 *            	companyName: '',
 *            	jobName: '',
 *            	income: '',
 *            	workCity: '',
 *            	workExperience: '',
 *            	jobType: '',
 *            	qualificate: '',
 *            	recruitNumber: '',
 *            	workAddress: '',
 *            	linkName: '',
 *            	linkPhone: '',
 *            	receiveEmail: '',
 *            	jobLabels: ''
 *            }
 */
export function newJob(data) {
  return fetch({
    url: '/admin/job/new-job',
    method: 'post',
    data
  });
}

/**
 * @Author    xiaolongjun
 * @DateTime  2017-10-12
 * @namespace 岗位搜索
 * @param     {
 *            	pageNo: '',
 *            	pageSize: '',
 *            	companyId: int, (非必传)
 *            	workCity: '',
 *            	jobType: int
 *            }
 */
export function searchJob(data) {
  return fetch({
    url: '/admin/job/list-job',
    method: 'post',
    data
  });
}

export function updateJob(data) {
  return fetch({
    url: '/admin/job/mod-job',
    method: 'post',
    data
  });
}

export function detailJob(data) {
  return fetch({
    url: '/admin/job/detail-job',
    method: 'post',
    data
  });
}

export function delJob(data) {
  return fetch({
    url: '/admin/job/del-job',
    method: 'post',
    data
  });
}
export function jobEvaluate(data) {
  return fetch({
    url: '/admin/interview-evaluate/list-interview-evaluate',
    method: 'post',
    data
  });
}

export function countBrowseRecord(data) {
  return fetch({
    url: '/admin/job-browse-record/count-browse-record',
    method: 'post',
    data
  });
}
