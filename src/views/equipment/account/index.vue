<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="18">
        <el-col :span="2" v-for="(dict, index) in dict.type.equipment_type" :key="index">
          <el-button type="primary" size="small" @click="searchList(dict.value)">{{dict.label}}</el-button>
        </el-col>
      </el-col>
      <el-col :span="3">
        <el-button
              class="buttonRight"
              type="success"
              size="small"
              @click="handleAdd"
            >新增设备台账</el-button>
      </el-col>
      <el-col :span="3">
        <el-button
              class="buttonRight"
              type="danger"  
              size="small"
              @click="handleDel">
              删除设备台账</el-button>
      </el-col>
      
    </el-row>

    <el-table v-loading="loading" :data="accountList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center"  />
      <el-table-column label="编号" align="center" prop="id" width="55"/>
      <el-table-column label="设备标识" align="center" prop="unique">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.unique}}</el-button>
        </template> 
      </el-table-column>
      <el-table-column label="设备炉型" align="center" prop="type">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.equipment_type" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="生产班组" align="center" prop="production_group" />
      <el-table-column label="生产负责人" align="center" prop="production_user" />
      <el-table-column label="联系方式" align="center" prop="production_user_contact" />
      <el-table-column label="客户公司" align="center" prop="company_name" />
      <el-table-column label="生产时间" align="center" prop="production_at" />
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
import { listEquipmentAccount, delEquipmentAccount, updateEquipmentAccount } from "@/api/equipment/equipment";
import { getEquipmentType } from "@/api/common";
// import DicTag from "@/components/DictTag";

export default {
  name: "EquipmentAccount",
  dicts: ['equipment_type'],
  // components: { DicTag },
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
      // 台账表格数据
      accountList: [],
      // 对话框表单
      accountForm:{},
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 设备类型列表
      typeList:[],
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
      listEquipmentAccount(this.queryParams).then(response => {
          this.accountList = response.data;
          for(var p in response.data){
            this.accountList[p].company_name = this.accountList[p].company.full_name;
          }
          this.total = response.meta.total;
          this.loading = false;
        }
      );
    },

    // 按炉型查询
    searchList(key) {
      const query = {
        type:key,
      };
      this.loading = true;
      listEquipmentAccount(query).then(response => {
          this.accountList = response.data;
          for(var p in response.data){
            this.accountList[p].company_name = this.accountList[p].company.full_name;
          }
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },


    /** 删除按钮操作 */
    handleDel() {
      const id = this.ids;
      this.$modal.confirm('是否确认删除编号为"' + id + '"的数据项？').then(function() {
        return delEquipmentAccount(id);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    // 新增按钮，跳转到新增页
    handleAdd() {
        this.$router.push({name: 'accountCreate'});
    },

    // 点击设备标识，带参跳转到台账详情
    handleClick(row) {
      row.province_code = row.company.province_code;
      row.full_name = row.company.full_name;
      row.short_name = row.company.short_name;
      row.city_code = row.company.city_code;
      row.area_info = row.company.area_info;
    
      this.$router.push({
        path: '/system/addAccount',
        query: row
      })
    }

    // handleEdit(index, row) {
    //     console.log(index, row);
    // }
    
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

