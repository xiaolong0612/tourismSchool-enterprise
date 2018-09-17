const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  cachedViews: state => state.app.cachedViews,
  user: state => state.user.user,
  type: state => state.user.type,
  id: state => state.user.id,
  name: state => state.user.name,
  pic: state => state.user.pic,
  age: state => state.user.age,
  sex: state => state.user.sex,
  major: state => state.user.major,
  education: state => state.user.education,
  schoolName: state => state.user.schoolName,
  linkPhone: state => state.user.linkPhone,
  linkName: state => state.user.linkName,
  email: state => state.user.email,
  stuNo: state => state.user.stuNo,
  invitateCount: state => state.user.invitateCount,
  account: state => state.user.account,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
};
export default getters
