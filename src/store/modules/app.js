import Cookies from 'js-cookie';

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    header: {
      type: !+Cookies.get('headerStatus')
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    TOGGLE_HEADER: state => {
      if (state.header.type) {
        Cookies.set('headerStatus', 1); // 企业
      } else {
        Cookies.set('headerStatus', 0); // 学生
      }

      state.header.type = !state.header.type;
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    ToggleHeader: ({ commit }) => {
      commit('TOGGLE_HEADER')
    },
  }
};

export default app;
