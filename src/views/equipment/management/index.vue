<template>
  <div class="app-container">
    <el-row :gutter="10" type="flex" justify="space-around">
        <el-col :span="4" style="color:#f7a448">
            <el-col :span="12">
                <svg t="1643218099996" class="icon" viewBox="0 0 1335 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1539" width="100" height="100"><path d="M1233.549 825.047V692.461c60.253-41.004 102.103-130.285 102.103-233.739 0-137.676-73.936-250.078-167.179-257.335v-0.416l-165.918-25.822v-59.615h-56.75V166.2l-134.916-26.535V75.79h-60.698v54.494L514.285 87.01V0h-66.337v76.637L342.18 60.179v0.296c60.55 8.222 103.231 167.046 96.048 359.78C431.045 612.99 376.55 768.12 315.555 771.83l87.189-2.85v40.16l-159.017 8.102v66.842l370.554-30.66 1.41 25.555-195.628 13.342 23.24 11.353v113.975l861.792-106.733v-84.028l-34.934-4.54-36.612 2.7z m-553.36-32.219v-34.49l160.975-6.677v32.085l-160.976 9.082zM528.517 204.503l27.87-13.623v-0.846l1.41 0.148 0.43-0.148v0.282l147.738 23.552v295.787l-145.912-4.11-31.551 3.546V204.503z m-53.1 600.791l8.31-39.179 125.196-4.11 2.122 36.478-135.643 6.826z m204.77 38.883L949.337 819.2v-40.871l-43.527 2.27 4.927-31.224 231.824-14.766 15.91 93.822-478.134 42.86-0.149-27.1z m-406.854-73.58c-56.009-2.122-97.458-133.18-99.981-302.955l-35.01-2.701c-21.562 8.934-17.066 54.895-17.066 54.895H0C0 381.685 105.16 375.02 105.16 375.02l70.85 1.277c12.183-180.135 65.402-319.28 123.785-316.995 62.033 2.404 106.421 163.528 99.135 359.973-7.272 196.43-63.563 353.74-125.596 351.321z m-23.107-449.744c-11.62 0-21.697 22.974-26.743 56.87l30.943 0.712-0.282 92.62-30.245-1.276c4.897 32.204 14.989 54.168 26.327 54.168 16.384 0 29.681-45.516 29.681-101.54 0-56.023-13.297-101.554-29.681-101.554z" fill="#fb9d32" p-id="1540"></path></svg>
            </el-col>
            <el-col :span="12">
                <el-row type="flex" justify="center">
                    <div class="text-size">安装数</div>
                </el-row>
                <el-row type="flex" justify="center" align="middle" style="height:81px">
                    <div class="number-size">0</div>
                </el-row>
            </el-col>
        </el-col>
        <el-col :span="0.8">
            <el-divider direction="vertical"></el-divider>
        </el-col>

        <el-col :span="4" style="color:#00c672">
            <el-col :span="12">
                <svg t="1643218099996" class="icon" viewBox="0 0 1335 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1539" width="100" height="100"><path d="M1233.549 825.047V692.461c60.253-41.004 102.103-130.285 102.103-233.739 0-137.676-73.936-250.078-167.179-257.335v-0.416l-165.918-25.822v-59.615h-56.75V166.2l-134.916-26.535V75.79h-60.698v54.494L514.285 87.01V0h-66.337v76.637L342.18 60.179v0.296c60.55 8.222 103.231 167.046 96.048 359.78C431.045 612.99 376.55 768.12 315.555 771.83l87.189-2.85v40.16l-159.017 8.102v66.842l370.554-30.66 1.41 25.555-195.628 13.342 23.24 11.353v113.975l861.792-106.733v-84.028l-34.934-4.54-36.612 2.7z m-553.36-32.219v-34.49l160.975-6.677v32.085l-160.976 9.082zM528.517 204.503l27.87-13.623v-0.846l1.41 0.148 0.43-0.148v0.282l147.738 23.552v295.787l-145.912-4.11-31.551 3.546V204.503z m-53.1 600.791l8.31-39.179 125.196-4.11 2.122 36.478-135.643 6.826z m204.77 38.883L949.337 819.2v-40.871l-43.527 2.27 4.927-31.224 231.824-14.766 15.91 93.822-478.134 42.86-0.149-27.1z m-406.854-73.58c-56.009-2.122-97.458-133.18-99.981-302.955l-35.01-2.701c-21.562 8.934-17.066 54.895-17.066 54.895H0C0 381.685 105.16 375.02 105.16 375.02l70.85 1.277c12.183-180.135 65.402-319.28 123.785-316.995 62.033 2.404 106.421 163.528 99.135 359.973-7.272 196.43-63.563 353.74-125.596 351.321z m-23.107-449.744c-11.62 0-21.697 22.974-26.743 56.87l30.943 0.712-0.282 92.62-30.245-1.276c4.897 32.204 14.989 54.168 26.327 54.168 16.384 0 29.681-45.516 29.681-101.54 0-56.023-13.297-101.554-29.681-101.554z" fill="#16c767" p-id="1540"></path></svg>

            </el-col>
            <el-col :span="12">
                <el-row type="flex" justify="center">
                    <div class="text-size">在线数</div>
                </el-row>
                <el-row type="flex" justify="center" align="middle" style="height:81px">
                    <div class="number-size">0</div>
                </el-row>
            </el-col>
        </el-col>
        <el-col :span="0.8">
            <el-divider direction="vertical"></el-divider>
        </el-col>

        <el-col :span="4" style="color:#8e8e92">
            <el-col :span="12">
                <svg t="1643218099996" class="icon" viewBox="0 0 1335 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1539" width="100" height="100"><path d="M1233.549 825.047V692.461c60.253-41.004 102.103-130.285 102.103-233.739 0-137.676-73.936-250.078-167.179-257.335v-0.416l-165.918-25.822v-59.615h-56.75V166.2l-134.916-26.535V75.79h-60.698v54.494L514.285 87.01V0h-66.337v76.637L342.18 60.179v0.296c60.55 8.222 103.231 167.046 96.048 359.78C431.045 612.99 376.55 768.12 315.555 771.83l87.189-2.85v40.16l-159.017 8.102v66.842l370.554-30.66 1.41 25.555-195.628 13.342 23.24 11.353v113.975l861.792-106.733v-84.028l-34.934-4.54-36.612 2.7z m-553.36-32.219v-34.49l160.975-6.677v32.085l-160.976 9.082zM528.517 204.503l27.87-13.623v-0.846l1.41 0.148 0.43-0.148v0.282l147.738 23.552v295.787l-145.912-4.11-31.551 3.546V204.503z m-53.1 600.791l8.31-39.179 125.196-4.11 2.122 36.478-135.643 6.826z m204.77 38.883L949.337 819.2v-40.871l-43.527 2.27 4.927-31.224 231.824-14.766 15.91 93.822-478.134 42.86-0.149-27.1z m-406.854-73.58c-56.009-2.122-97.458-133.18-99.981-302.955l-35.01-2.701c-21.562 8.934-17.066 54.895-17.066 54.895H0C0 381.685 105.16 375.02 105.16 375.02l70.85 1.277c12.183-180.135 65.402-319.28 123.785-316.995 62.033 2.404 106.421 163.528 99.135 359.973-7.272 196.43-63.563 353.74-125.596 351.321z m-23.107-449.744c-11.62 0-21.697 22.974-26.743 56.87l30.943 0.712-0.282 92.62-30.245-1.276c4.897 32.204 14.989 54.168 26.327 54.168 16.384 0 29.681-45.516 29.681-101.54 0-56.023-13.297-101.554-29.681-101.554z" fill="#8e8e92" p-id="1540"></path></svg>

            </el-col>
            <el-col :span="12">
                <el-row type="flex" justify="center">
                    <div class="text-size">离线数</div>
                </el-row>
                <el-row type="flex" justify="center" align="middle" style="height:81px">
                    <div class="number-size">0</div>
                </el-row>
            </el-col>
        </el-col>
        <el-col :span="0.8">
            <el-divider direction="vertical"></el-divider>
        </el-col>

        <el-col :span="4" style="color:#6364ef">
            <el-col :span="12">
                <svg t="1643218099996" class="icon" viewBox="0 0 1335 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1539" width="100" height="100"><path d="M1233.549 825.047V692.461c60.253-41.004 102.103-130.285 102.103-233.739 0-137.676-73.936-250.078-167.179-257.335v-0.416l-165.918-25.822v-59.615h-56.75V166.2l-134.916-26.535V75.79h-60.698v54.494L514.285 87.01V0h-66.337v76.637L342.18 60.179v0.296c60.55 8.222 103.231 167.046 96.048 359.78C431.045 612.99 376.55 768.12 315.555 771.83l87.189-2.85v40.16l-159.017 8.102v66.842l370.554-30.66 1.41 25.555-195.628 13.342 23.24 11.353v113.975l861.792-106.733v-84.028l-34.934-4.54-36.612 2.7z m-553.36-32.219v-34.49l160.975-6.677v32.085l-160.976 9.082zM528.517 204.503l27.87-13.623v-0.846l1.41 0.148 0.43-0.148v0.282l147.738 23.552v295.787l-145.912-4.11-31.551 3.546V204.503z m-53.1 600.791l8.31-39.179 125.196-4.11 2.122 36.478-135.643 6.826z m204.77 38.883L949.337 819.2v-40.871l-43.527 2.27 4.927-31.224 231.824-14.766 15.91 93.822-478.134 42.86-0.149-27.1z m-406.854-73.58c-56.009-2.122-97.458-133.18-99.981-302.955l-35.01-2.701c-21.562 8.934-17.066 54.895-17.066 54.895H0C0 381.685 105.16 375.02 105.16 375.02l70.85 1.277c12.183-180.135 65.402-319.28 123.785-316.995 62.033 2.404 106.421 163.528 99.135 359.973-7.272 196.43-63.563 353.74-125.596 351.321z m-23.107-449.744c-11.62 0-21.697 22.974-26.743 56.87l30.943 0.712-0.282 92.62-30.245-1.276c4.897 32.204 14.989 54.168 26.327 54.168 16.384 0 29.681-45.516 29.681-101.54 0-56.023-13.297-101.554-29.681-101.554z" fill="#486ff7" p-id="1540"></path></svg>

            </el-col>

            <el-col :span="12">
                <el-row type="flex" justify="center">
                    <div class="text-size">运行数</div>
                </el-row>
                <el-row type="flex" justify="center" align="middle" style="height:81px">
                    <div class="number-size">0</div>
                </el-row>
            </el-col>
        </el-col>
        <el-col :span="0.8">
            <el-divider direction="vertical"></el-divider>
        </el-col>

        <el-col :span="4.8" style="color:#d63617">
            <el-col :span="12">
                <svg t="1643218099996" class="icon" viewBox="0 0 1335 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1539" width="100" height="100"><path d="M1233.549 825.047V692.461c60.253-41.004 102.103-130.285 102.103-233.739 0-137.676-73.936-250.078-167.179-257.335v-0.416l-165.918-25.822v-59.615h-56.75V166.2l-134.916-26.535V75.79h-60.698v54.494L514.285 87.01V0h-66.337v76.637L342.18 60.179v0.296c60.55 8.222 103.231 167.046 96.048 359.78C431.045 612.99 376.55 768.12 315.555 771.83l87.189-2.85v40.16l-159.017 8.102v66.842l370.554-30.66 1.41 25.555-195.628 13.342 23.24 11.353v113.975l861.792-106.733v-84.028l-34.934-4.54-36.612 2.7z m-553.36-32.219v-34.49l160.975-6.677v32.085l-160.976 9.082zM528.517 204.503l27.87-13.623v-0.846l1.41 0.148 0.43-0.148v0.282l147.738 23.552v295.787l-145.912-4.11-31.551 3.546V204.503z m-53.1 600.791l8.31-39.179 125.196-4.11 2.122 36.478-135.643 6.826z m204.77 38.883L949.337 819.2v-40.871l-43.527 2.27 4.927-31.224 231.824-14.766 15.91 93.822-478.134 42.86-0.149-27.1z m-406.854-73.58c-56.009-2.122-97.458-133.18-99.981-302.955l-35.01-2.701c-21.562 8.934-17.066 54.895-17.066 54.895H0C0 381.685 105.16 375.02 105.16 375.02l70.85 1.277c12.183-180.135 65.402-319.28 123.785-316.995 62.033 2.404 106.421 163.528 99.135 359.973-7.272 196.43-63.563 353.74-125.596 351.321z m-23.107-449.744c-11.62 0-21.697 22.974-26.743 56.87l30.943 0.712-0.282 92.62-30.245-1.276c4.897 32.204 14.989 54.168 26.327 54.168 16.384 0 29.681-45.516 29.681-101.54 0-56.023-13.297-101.554-29.681-101.554z" fill="#d81e06" p-id="1540"></path></svg>

            </el-col>
            <el-col :span="12">
                <el-row type="flex" justify="center">
                    <div class="text-size">报警数</div>
                </el-row>
                <el-row type="flex" justify="center" align="middle" style="height:81px">
                    <div class="number-size">0</div>
                </el-row>
            </el-col>
        </el-col>
    </el-row>

    <el-table v-loading="loading" :data="equipmentList" :key="certifyKey" border>
      <el-table-column label="所属单位" align="center" prop="company_name" >
      </el-table-column>
      <el-table-column label="设备标识" align="center" prop="unique">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.unique}}</el-button>
        </template> 
      </el-table-column>/>
      <el-table-column label="网关状态" align="center" prop="type" />
      <el-table-column label="设备状态" align="center" prop="status_desc" />

    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <div>被选择的侧边栏节点:{{this.$store.getters.selectedNode}}</div>
  </div>
</template>

<script>
// import { listPost, getPost, delPost, addPost, updatePost, exportPost } from "@/api/system/post";
import { listRealEquipment } from "@/api/equipment/equipment";
import { listCompanyAll } from "@/api/system/company"

export default {
  name: "EquipmentManagement",
  // dicts: ['sys_normal_disable'],
  data() {
    return {
      formData: {},
      equipmentCode: '',
      dateRange: '',
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
      // 设备表格数据
      equipmentList: [],
      // 公司列表
      companyList: [],
      // 表格更新标识
      certifyKey: false,
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
      listRealEquipment(this.queryParams).then(response => {
          this.equipmentList = response.data;
          this.getCompanyList();
          this.total = response.meta.total;
          
        }
      );
    },

    //获取公司列表
    getCompanyList() {
      listCompanyAll().then(response => {
        this.companyList = response.data;
        for(var index in this.equipmentList){
          var value = this.equipmentList[index].company_id;
          const selectedItem = this.companyList.find((item) => { // 这里的companyList就是上面遍历的数据源
            return item.id === value;
            // 筛选出匹配数据，是对应数据的整个对象
          })
          // console.log(selectedItem);
          this.equipmentList[index].company_name = selectedItem.full_name;
          // 给table增加一个key，解决数据更新表格不更新的情况
          this.certifyKey = !this.certifyKey;
          this.loading = false;
        }
      })
    },

    // 点击设备标识，带参跳转到台账详情
    handleClick(row) {
    
      this.$router.push({
        path: '/equipment/management/info',
        query: row
      })
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
<style>
.text-size {
    font-size: 20px;
}

.number-size {
    font-size: 24px;
    font-weight: 800;
}

.el-divider--vertical {
    height: 100px;
}
</style>
