<template>
  <div class="app-container">
      <div>
            <el-button
              class="buttonRight"
              type="success"
              size="small"
              @click="handleAdd"
            >新增公司</el-button>  
      </div>

    <el-table v-loading="loading" :data="companyList" border>
      <el-table-column type="selection" width="55" align="center"  />
      <el-table-column label="ID" align="center" prop="id" width="55"/>
      <el-table-column label="公司名称" align="center" prop="full_name"> 
      </el-table-column>
      <el-table-column label="公司首字母" align="center" prop="short_name" />
      <!-- <el-table-column label="公司所在地区" align="center" prop="area_code" /> -->
      <el-table-column label="公司详细地址" align="center" prop="area_info" />
      <el-table-column label="联系人员" align="center" prop="contract_name" />
      <el-table-column label="联系方式" align="center" prop="contract_mobile" />
      <el-table-column label="创建时间" align="center" prop="updateTime" />
      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="scope" >
          <el-button size="small" style="padding:9px 9px 9px 9px;" type="success" @click="handleUpdate(scope.row)">编辑</el-button>
          
          <el-button size="small" style="padding:9px 9px 9px 9px;" type="danger" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.per_page"
      @pagination="getList"
    />

    <div style="margin-bottom:50px"></div>
  </div>
</template>

<script>
import { listCompany, getCompany, delCompany, updateCompany,  } from "@/api/system/company";

export default {
  name: "Company",
  // dicts: ['sys_normal_disable'],
  data() {
    return {
      // 遮罩层
      loading: false,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 公司表格数据
      companyList: [],
      // 对话框表单
      companyForm:{},
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        page: 1,//当前是第几页
        per_page: 10,//设置一页显示多少条
        postCode: undefined,
        postName: undefined,
        status: undefined
      },
      
    };
  },
  created() {
    this.getList();
  },
  methods: {

    getList() {
      this.loading = true;
      listCompany(this.queryParams).then(response => {
          this.companyList = response.data;
          this.total = response.meta.total;
          this.loading = false;
        }
      );
    },
    
    reset() {

    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.postId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },

    /** 提交按钮 */
    submitForm: function() {
      this.$refs["equipmentForm"].validate(valid => {
        if (valid) {
          if (this.equipmentForm.id != undefined) {
            updateEquipment(this.equipmentForm, this.equipmentForm.id).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDel(row) {
      const id = row.id;
      this.$modal.confirm('是否确认删除编号为"' + id + '"的数据项？').then(function() {
        return delCompany(id);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    // 新增按钮，跳转到新增页
    handleAdd() {
        this.$router.push({
          name: 'CreateCompany',
          });
    },

    // 编辑按钮
    handleUpdate(row) {
      this.$router.push({
        path: '/system/createCompany',
        query: row
      })
    }
    
  }
};
</script>

<style scoped>
/* .el-button {
    margin: 0 0 5px 0;
} */

.buttonRight {
    float: right;
    margin-left: 5px;
    margin-bottom: 5px;
}

.tb-edit .el-input {
    display: none
}
.tb-edit .current-row .el-input {
    display: block
}
.tb-edit .current-row .el-input+span {
    display: none
}
</style>

