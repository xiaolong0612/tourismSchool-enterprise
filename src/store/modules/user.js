import { login, logout, getInfo } from '@/api/login';
import { getType, setType, removeType, getId, setId, removeId } from '@/utils/auth';

const user = {
  state: {
    user: {},
    account: '',
    age: '',
    email: '',
    id: getId() || '',
    linkPhone: '',
    linkName: '',
    name: '',
    pic: '',
    openId: '',
    password: '',
    schoolId: '',
    education : '',
    schoolName: '',
    sex: '',
    sexStr: '',
    stuNo: '',
    roles: [],
    type: getType() || 2,
    invitateCount: 0
  },

  mutations: {
    SET_INVITATECOUNT: (state, invitateCount) => {
      state.invitateCount = invitateCount;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account;
    },
    SET_ID: (state, id) => {
      state.id = id;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_PIC: (state, pic) => {
      state.pic = pic;
    },
    SET_AGE: (state, age) => {
      state.age = age;
    },
    SET_SEX: (state, sex) => {
      state.sex = sex;
    },
    SET_MAJOR: (state, major) => {
      state.major = major;
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
    },
    SET_LINKNAME: (state, linkName) => {
      state.linkName = linkName;
    },
    SET_LINKPHONE: (state, linkPhone) => {
      state.linkPhone = linkPhone;
    },
    SET_SCHOOLNAME: (state, schoolName) => {
      state.schoolName = schoolName;
    },
    SET_EDUCATION: (state, education ) => {
      state.education  = education ;
    },
    SET_STUNO: (state, stuNo) => {
      state.stuNo = stuNo;
    },
    SET_TYPE: (state, type) => {
      state.type = type;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          if(res.code == 1){
            setId(res.userinfo);
            setType(res.type);

            commit('SET_ID', getId());
            commit('SET_TYPE', getType());
            // resolve();
          }else {
            // Message({
            //   message: res.msg,
            //   type: 'error',
            //   duration: 5 * 1000
            // });
          }
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        let user = {
          id: getId(),
          type: getType()
        }
        getInfo(user).then(res => {
          const data = res.userinfo;
          commit('SET_USER', data);
          setType(res.type);
          if (res.type == 3){
            commit('SET_NAME', data.companyName);
            commit('SET_LINKNAME', data.linkName);
          }
          if (res.type == 2){
            commit('SET_NAME', data.name);
            commit('SET_PIC', data.pic);
            commit('SET_EDUCATION', data.education );
            commit('SET_SEX', data.sex);
            commit('SET_MAJOR', data.major);
          }
          commit('SET_LINKPHONE', data.linkPhone);
          commit('SET_INVITATECOUNT', res.invitateCount);
          commit('SET_TYPE', res.type);
          commit('SET_ID', data.id);
          commit('SET_AGE', data.age);
          commit('SET_EMAIL', data.email);

          commit('SET_STUNO', data.stuNo);
          commit('SET_SCHOOLNAME', data.schoolName);
          commit('SET_ACCOUNT', data.account);
          commit('SET_ROLES', getType().split(','));
          resolve(getType().split(','));
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 第三方验证登录
    LoginByThirdparty({ commit, state }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code);
        loginByThirdparty(state.status, state.email, state.code).then(response => {
          commit('SET_TOKEN', response.data.token);
          setToken(response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_ROLES', []);
          removeId();
          removeType();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_ROLES', []);
        removeId();
        removeType();
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TYPE', role);
        // setToken(role);
        resolve();
      })
    }
  }
};

export default user;