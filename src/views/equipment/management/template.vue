<template>
  <div class="app-container">
      <div>
            <el-button
              class="buttonRight"
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增</el-button>  
      </div>

    <el-table v-loading="loading" :data="templateList" border>
      <!-- <el-table-column type="selection" width="55" align="center"  /> -->
      <el-table-column label="编号" align="center" prop="id" width="55"/>
      <el-table-column label="模版名称" align="center" prop="name" />
      <!-- <el-table-column label="创建人" align="center" prop="who" /> -->
      <el-table-column label="模版生成炉型" align="center" prop="remark" />
      <el-table-column label="模版描述" align="center" prop="desc" />
      <el-table-column label="创建时间" align="center" prop="created_at" />
      <el-table-column label="更新时间" align="center" prop="updated_at" />
      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="scope" >
          
          <el-button size="small" style="padding:9px 9px 9px 9px;" type="primary" @click="handleApply(scope.row)">应用</el-button>
             
          <el-button size="small" style="padding:9px 9px 9px 9px;" type="success" @click="handleUpdate(scope.row)">编辑</el-button>
             
          <el-button size="small" style="padding:9px 9px 9px 9px;" type="warning" @click="handleCopy(scope.row)">拷贝</el-button>
          
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
import { listEquipment, delEquipmentTemp, updateEquipment, cloneEquipmentTemp } from "@/api/equipment/equipment";

export default {
  name: "equipmentTemplate",
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
      // 模版表格数据
      templateList: [],
      // 对话框表单
      equipmentForm:{},
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
      listEquipment(this.queryParams).then(response => {
          this.templateList = response.data;
          // for(var p in response.data){
          //   this.templateList[p].who = this.templateList[p].user.name;
          // }
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
        return delEquipmentTemp(id);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    // 新增按钮，跳转到新增页
    handleAdd() {
        this.$router.push({name: 'createEquipment'});
    },

    // 编辑按钮
    handleUpdate(row) {
      // this.title = '修改设备模版'
      // this.open = true;
      // this.equipmentForm = row;
      // 带参跳转到新增页
      this.$router.push({
        path: '/system/create',
        query: row
      })

    },
    
    // 拷贝按钮
    handleCopy(row) {
      cloneEquipmentTemp(row.id).then(response => {
        this.$modal.msgSuccess("修改成功");
        this.getList();
        this.loading = false;
        }
      );
    },
    handleEdit(index, row) {
        console.log(index, row);
    },
    // 删除指定行
    handleDelete(index, row) {
        this.equipmentForm.content.splice(index, 1);
        console.log(index, row);
    },
    // 添加行
    addRow() {
        let j = { "addr": "", "var": "", "unit": "" };
        this.equipmentForm.content.push(j);
        // this.master_user.sel = JSON.parse(JSON.stringify(j));
    },
    
  }
};
</script>

<style scoped>
/* .el-button {
    margin: 0 0 5px 0;
} */

.buttonRight {
    float: right;
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

