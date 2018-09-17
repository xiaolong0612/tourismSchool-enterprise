<template>
    <section class="app-main">
        <transition name="fade" mode="out-in">
            <router-view :key="key"></router-view>
        </transition>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    },
    ...mapGetters([
      'id',
      'type',
      'invitateCount'
    ])
  },
  mounted() {
    console.log(this.$route)
    if(this.type == 3 && this.id != undefined && this.id != '' && this.invitateCount != 0 && this.$route.path != '/search/student-details'){
      this.$notify.info({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: '您有<span class="c-blue">'+this.invitateCount +'</span>条简历信息待处理'
      });
    }
  }
}
</script>
