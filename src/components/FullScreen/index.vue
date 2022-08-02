<template>
  <span @click="handleClick">
    <svg-icon class="icon" icon-class="fullscreen"></svg-icon>
  </span>
</template>

<script>
export default {
  filters: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() { },
  methods: {
    async handleClick() {
      // await document.documentElement.requestFullscreen()
      // mdn中原生写法
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else {
        await document.documentElement.requestFullscreen()
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.icon {
  color: #333;
  font-size: 20px;
  margin-right: 20px;
}
</style>
