<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
        <el-col :span="4">
            <el-input label="设备编号" placeholder="显示设备编号" v-model="equipmentCode"></el-input>
        </el-col>
        <el-col :span="6.5">
            <el-date-picker
                v-model="dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-col>
        <el-col :span="5">
            <el-button type="primary">搜索</el-button>
        </el-col>
      
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="reportList" @selection-change="handleSelectionChange" border fit>
      <!-- <el-table-column type="selection" width="55" align="center"  /> -->
      <el-table-column label="工艺号" align="center" prop="processNumber" v-if="columns[0].visible" />
      <el-table-column label="工艺开始时间" align="center" prop="startTime" v-if="columns[1].visible" />
      <el-table-column label="工艺结束时间" align="center" prop="endTime" v-if="columns[2].visible" />
      <el-table-column label="目标温度℃" align="center" prop="targetTemp" v-if="columns[3].visible" />
      <el-table-column label="实际温度℃" align="center" prop="actualTemp" v-if="columns[4].visible" />
      <el-table-column label="目标压力bar" align="center" prop="targetBar" v-if="columns[5].visible" />
      <el-table-column label="实际压力bar" align="center" prop="actualBar" v-if="columns[6].visible" />
      <el-table-column label="目标加热时间min" align="center" prop="targetHeatingTime" v-if="columns[7].visible" />
      <el-table-column label="实际加热时间min" align="center" prop="actualHeatingTime" v-if="columns[8].visible" />
      <el-table-column label="目标脱脂时间min" align="center" prop="targetDegreasingTime" v-if="columns[9].visible" />
      <el-table-column label="实际脱脂时间min" align="center" prop="actualDegreasingTime" v-if="columns[10].visible" />
      <el-table-column label="目标加压时间min" align="center" prop="targetPressurizationTime" v-if="columns[11].visible" />
      <el-table-column label="实际加压时间min" align="center" prop="actualPressurizationTime" v-if="columns[12].visible" />
      <el-table-column label="实际冷却时间min" align="center" prop="actualCoolingTime" v-if="columns[13].visible" />
      <el-table-column label="总电能kw*h" align="center" prop="power" v-if="columns[14].visible" />
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
  name: "Report",
  // dicts: ['sys_normal_disable'],
  data() {
    return {
      equipmentCode: '',
      dateRange: '',
      // 列信息
      columns: [
        { key: 0, label: `工艺号`, visible: true },
        { key: 1, label: `工艺开始时间`, visible: true },
        { key: 2, label: `工艺结束时间`, visible: true },
        { key: 3, label: `目标温度℃`, visible: true },
        { key: 4, label: `实际温度℃`, visible: true },
        { key: 5, label: `目标压力bar`, visible: true },
        { key: 6, label: `实际压力bar`, visible: true },
        { key: 6, label: `目标加热时间min`, visible: true },
        { key: 6, label: `实际加热时间min`, visible: true },
        { key: 6, label: `目标脱脂时间min`, visible: true },
        { key: 6, label: `实际脱脂时间min`, visible: true },
        { key: 6, label: `目标加压时间min`, visible: true },
        { key: 6, label: `实际加压时间min`, visible: true },
        { key: 6, label: `实际冷却时间min`, visible: true },
        { key: 6, label: `总电能kw*h`, visible: true },
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
      reportList: [],
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

