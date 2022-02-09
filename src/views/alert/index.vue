<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-form ref="" :model="formData" size="medium" :inline='true'>
        <el-col :span="5">
          <el-form-item label="" prop="equipmentCode">
            <el-input label="设备编号" placeholder="显示设备编号" v-model="formData.equipmentCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="" prop="daterange">
            <el-date-picker
                v-model="dateRange"
                type="formData.daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :style="{width: '100%'}">
            </el-date-picker>
          </el-form-item>   
        </el-col>
        <el-col :span="6">
            <el-button type="primary">搜索</el-button>
        </el-col>
        <el-col :span="2">
            <el-button style="background: purple; color: white; padding: 10px;width: 100%;">A类报警</el-button>
        </el-col>
        <el-col :span="2">
            <el-button style="padding: 10px;width: 100%" type="warning">B类报警</el-button>
        </el-col>
        <el-col :span="2">
            <el-button style="padding: 10px;width: 100%" type="danger">C类报警</el-button>
        </el-col>
        </el-form>
      
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar> -->
    </el-row>

    <el-table v-loading="loading" :data="alertList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center"  />
      <el-table-column label="报警编号" align="center" prop="alertId" v-if="columns[0].visible" />
      <el-table-column label="日期" align="center" prop="alertDate" v-if="columns[1].visible" />
      <el-table-column label="时间" align="center" prop="alertTime" v-if="columns[2].visible" />
      <el-table-column label="消息文本" align="center" prop="alertText" v-if="columns[3].visible" />
      <!-- <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column> -->
      <el-table-column label="设备状态" align="center" prop="alertStatus" width="180" v-if="columns[4].visible" />
      <el-table-column label="错误点" align="center" prop="alertSpot" v-if="columns[5].visible" />
      <el-table-column label="类型" align="center" prop="alertType" v-if="columns[6].visible" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    
  </div>
</template>

<script>
// import { listPost, getPost, delPost, addPost, updatePost, exportPost } from "@/api/system/post";

export default {
  name: "Alert",
  // dicts: ['sys_normal_disable'],
  data() {
    return {
      formData: {},
      equipmentCode: '',
      dateRange: '',
      // 列信息
      columns: [
        { key: 0, label: `报警编号`, visible: true },
        { key: 1, label: `日期`, visible: true },
        { key: 2, label: `时间`, visible: true },
        { key: 3, label: `消息文本`, visible: true },
        { key: 4, label: `设备状态`, visible: true },
        { key: 5, label: `错误点`, visible: true },
        { key: 6, label: `类型`, visible: true }
      ],
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
      // 报警表格数据
      alertList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        postCode: undefined,
        postName: undefined,
        status: undefined
      },
      
    };
  },
  created() {
    // this.getList();
  },
  methods: {

    getList() {

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
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.postId != undefined) {
            updatePost(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPost(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const postIds = row.postId || this.ids;
      this.$modal.confirm('是否确认删除岗位编号为"' + postIds + '"的数据项？').then(function() {
        return delPost(postIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    }
    
  }
};
</script>

