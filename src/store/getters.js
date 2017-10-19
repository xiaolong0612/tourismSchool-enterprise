const getters = {
  sidebar: state => state.app.sidebar,
  header: state => state.app.header,
  type: state => state.user.type,
  id: state => state.user.id,
  name: state => state.user.name,
  age: state => state.user.age,
  email: state => state.user.email,
  stuNo: state => state.user.stuNo,
  account: state => state.user.account,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
};
export default getters
