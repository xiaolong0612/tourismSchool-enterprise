import fetch from '@/utils/fetch';

// 简历

/**
 * @Author    xiaolongjun
 * @DateTime  2017-10-08
 * @namespace 新增简历
 * @param     {
 *            	studentId: integer,
 *            	jobIntent: '',
 *            	certificate: '',
 *            	selfIntro: '',
 *            	skillDescript: '',
 *            	pic: '',
 *            	labelName: '',
 *            	working: '',
 *            	expectAddress: '',
 *            	expectIncome: '',
 *            	expectJob: '',
 *            	workList: [
 *            		{
 *            			companyName: '',
 *            			beginDate: '',
 *            			endDate: '',
 *            			workJob: '',
 *            			workContent: '',
 *            			schoolName: '',
 *            			major: '',
 *            			qualificate: '',
 *            			graduateYear: ''
 *            		}
 *            	]
 * 						}
 */
export function saveResume(data) {
  return fetch({
    url: '/admin/resume/save-resume',
    method: 'post',
    data
  });
}

export function updateResume(data) {
  return fetch({
    url: '/admin/resume/mod-resume',
    method: 'post',
    data
  });
}

export function delResume(data) {
  return fetch({
    url: '/admin/resume/del-resume',
    method: 'post',
    data
  });
}

export function detailResume(data) {
  return fetch({
    url: '/admin/resume/detail-resume',
    method: 'post',
    data
  });
}

export function searchResume(data) {
  return fetch({
    url: '/admin/resume/get-studnet-resume',
    method: 'post',
    data
  });
}

// 获取单个简历内容
export function getResumeDetails(data) {
  return fetch({
    url: '/ admin/resume/get-resume',
    method: 'post',
    data
  });
}



