<template>
    <el-menu mode="vertical" theme="dark" :default-active="$route.path" background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
        <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
</template>

<script>
    import { mapGetters } from 'vuex';
    import SidebarItem from './SidebarItem';
    export default {
      components: { SidebarItem },
      computed: {
        ...mapGetters([
          'permission_routers'
        ])
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
    min-height: 100%;
}

</style>
