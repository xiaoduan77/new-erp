<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card
        v-loading="isLoading"
        style="min-height: 700px"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-tabs>
          <el-tab-pane label="用户管理"
            ><!-- 用了一个行列布局 -->
            <TreeItem
              :node="titleObj"
              @delDepartment="getDepartmentList"
            ></TreeItem>
            <!-- default-expand-all等于:default-expand-all="true" -->
            <el-tree :data="data" default-expand-all>
              <template v-slot="scope">
                <TreeItem
                  :node="scope.node"
                  @delDepartment="getDepartmentList"
                ></TreeItem>
              </template> </el-tree
          ></el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import TreeItem from './components/TreeItem.vue'
import { getDepartmentList } from '@/api/department'
export default {
  filters: {},
  components: { TreeItem },
  data() {
    return {
      data: [{
        label: '技术部',
        children: [{
          label: 'java研发部'
        }]
      }],
      titleObj: {},
      isLoading: true
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      const res = await getDepartmentList()
      console.log(res)
      function tranferListToTree(list, pid) {
        var list1 = []
        list.forEach(item => {
          if (item.pid === pid) {
            list1.push(item)
            item.children = tranferListToTree(list, item.id)
          }
        })
        return list1
      }
      const res1 = tranferListToTree(res.depts, '')
      console.log(res1)
      this.data = res1
      this.titleObj = res.depts[0]
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-tree-node {
  padding: 10px !important;
  span,
  div {
    font-size: 20px;
  }
}
::v-deep .el-tree-node__content {
  padding: 20px 0 !important;
}
</style>
