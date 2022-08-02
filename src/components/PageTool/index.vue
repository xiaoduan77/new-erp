<template>
  <el-card>
    <el-row type="flex" justify="space-between">
      <el-col>
        <el-alert
          v-if="title.length > 0"
          :title="'共有'+title+'条数据'"
          type="success"
          :closable="false"
          show-icon
        >
        </el-alert>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right"></slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  filters: {},
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() { },
  methods: {}
}
</script>

<style scoped lang='scss'>
.el-alert {
  display: inline;
  // 清除原本的样式
  width: unset;
  ::v-deep .el-icon-show{
    font-size: 14px;
  }
}
</style>
