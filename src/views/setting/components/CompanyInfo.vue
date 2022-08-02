<template>
  <el-form label-width="80px" style="width: 400px" disabled>
    <el-form-item label="企业名称">
      <el-input :value="info.name"></el-input>
    </el-form-item>
    <el-form-item label="公司地址">
      <el-input :value="info.companyAddress"></el-input>
    </el-form-item>
    <el-form-item label="公司电话">
      <el-input :value="info.companyPhone"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input :value="info.mailbox"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input :value="info.remarks"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCompanyInfo } from '@/api/setting'
export default {
  filters: {},
  components: {},
  data() {
    return {
      info: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  watch: {},
  async created() {
    const res = await getCompanyInfo(this.companyId)
    this.info = res
    console.log(res)
  },
  methods: {
  }
}
</script>

<style scoped lang='scss'>
</style>

