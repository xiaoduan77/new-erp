<template>
  <div style="width: 100%">
    <el-row
      type="flex"
      justify="space-between"
      align="middle"
      style="height: 40px; padding: 30px 140px; font-size: 14px; width: 100%"
    >
      <el-col>
        <span>{{ node.data ? node.data.name : node.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" justify="end">
          <!-- 两个内容 -->
          <el-col>{{ node.data ? node.data.manager : "负责人" }}</el-col>
          <el-col>
            <!-- 下拉菜单 element -->
            <el-dropdown @command="OnCommand">
              <span> 操作<i class="el-icon-arrow-down" /> </span>
              <!-- 下拉菜单 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">添加子部门</el-dropdown-item>
                <template v-if="node.data">
                  <el-dropdown-item command="b">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="c">删除部门</el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog
      :title="title"
      :visible.sync="addDialogVisible"
      width="50%"
      @click.native.stop
      @close="handleAddClose"
    >
      <el-form
        ref="addFormRef"
        label-width="100px"
        :model="addDerpartmentForm"
        :rules="rules"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="addDerpartmentForm.name" placeholder="1-50个字符">
          </el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="addDerpartmentForm.code"> </el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select
            v-model="addDerpartmentForm.manager"
            placeholder="请选择"
            style="width: 100%"
            filterable
          >
            <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="addDerpartmentForm.introduce" type="textarea">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onsubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { delDepartment, addDepartment, getDepartmentList, editDepartment } from '@/api/department'
import { getSimpleUserList } from '@/api/user'
export default {
  filters: {},
  components: {},
  props: {
    node: {
      type: Object,
      requried: true
    }
  },
  data() {
    const validateName = async (rule, value, callback) => {
      const res = await getDepartmentList()
      if (this.isEdit) {
        const pid = this.node.data.pid
        res.depts.filter(item => item.pid === pid && item.id !== this.node.data.id).some(item => item.name === value) ? callback(new Error('部门名称重复')) : callback()
      } else {
        const id = this.node.data ? this.node.data.id : ''
        res.depts.filter(item => item.pid === id).some(item => item.name === value) ? callback(new Error('部门名称重复')) : callback()
      }
    }
    return {
      addDialogVisible: false,
      addDerpartmentForm: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { reuqired: true, message: '部门名称不能为空', trigger: 'blur' },
          { required: true, message: '长度在3-10之间', trigger: 'blur' },
          { validator: validateName, trigger: 'change' }
        ]
      },
      users: [],
      isEdit: false
    }
  },
  computed: {
    title() {
      return this.isEdit ? '编辑部门' : '新增部门'
    }
  },
  watch: {},
  created() { },
  methods: {
    async OnCommand(key) {
      if (this.users.length === 0) {
        this.getSimpleUserList()
      }
      if (key === 'a') {
        this.isEdit = false
        this.addDialogVisible = true
        this.getSimpleUserList()
      } else if (key === 'b') {
        this.isEdit = true
        this.addDialogVisible = true
        console.log('点击的是编辑部门')
        this.addDerpartmentForm = { ...this.node.data }
      } else {
        try {
          await this.$confirm('确定删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          console.log('用户确定了')
          const res = await delDepartment(this.node.data.id)
          console.log(res)
          this.$emit('delDepartment')
        } catch (error) {
          console.log(error)
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      }
    },
    async getSimpleUserList() {
      const res = await getSimpleUserList()
      console.log(res)
      this.users = res
    },
    handleAddClose() {
      this.$refs.addFormRef.resetFields()
    },
    async onsubmit() {
      if (this.isEdit) {
        delete this.addDerpartmentForm.children
        await editDepartment(this.addDerpartmentForm)
      } else {
        this.addDerpartmentForm.pid = this.node.data ? this.node.data.id : ''
        await addDepartment(this.addDerpartmentForm)
      }
      this.addDialogVisible = false
      this.$emit('delDepartment')
    }
  }
}
</script>

<style scoped>
</style>
