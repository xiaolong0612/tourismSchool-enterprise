import fetch from '@/utils/fetch';

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


