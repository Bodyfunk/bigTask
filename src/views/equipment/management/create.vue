<template>
<div class="app-container">
    <el-form ref="form" :model="form" label-width="100px" label-position>
        <el-row :gutter="100">
            <el-col :span="10">
                <el-form-item label="模版名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="14">
                <el-form-item label="模版描述">
                    <el-input type="textarea" :rows="2" placeholder="关于应用此模版生成的炉型的描述，或者相关事项" v-model="form.desc"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="100">
            <el-col :span="10">
                <el-form-item label="模版生成炉型">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="14">
                <el-form-item label="创建人">
                    <el-input v-model="form.who"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <HR align=center width=100% color=#dddddd size=1 />
        <el-form-item label="导入文件">
            <el-button
              type="info"
              plain
              icon="el-icon-upload2"
              @click="handleImport"
            >导入</el-button>
        </el-form-item>
        <HR align=center width=100% color=#dddddd size=1 />
        <el-form-item v-if="isSuccess" label="变量表">
            <!-- <el-button
              type="warning"
              plain
              icon="el-icon-download"
              :loading="exportLoading"
              @click="handleExport"
            >导出</el-button> -->
            <el-row :gutter="20" style="margin-left:0px;">
                <el-col :span="12" v-for="(item, index) in content" :key="index">
                    <div>{{item.name}}变量表</div>
                    <el-button type="success" class="el-table-add-row" style="width: 100%;" @click="addRow(item)"><span>+ 添加</span></el-button>
                    <el-table :data="item.values" class="tb-edit" style="width:100%" height="300" border highlight-current-row @row-click="handleCurrentChange">
                        <el-table-column label="地址" prop="addr">
                            <template slot-scope="scope" >
                                <el-input v-model="scope.row.addr" @change="handleEdit(scope.$index, scope.row)" placeholder="请输入内容"></el-input>
                                <span>{{scope.row.addr}}</span> 
                            </template>
                        </el-table-column>
                        <el-table-column label="变量名" prop="var">
                            <template slot-scope="scope" >
                                <el-input v-model="scope.row.var" @change="handleEdit(scope.$index, scope.row)" placeholder="请输入内容"></el-input>
                                <span>{{scope.row.var}}</span> 
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" prop="unit">
                            <template slot-scope="scope" >
                                <el-input v-model="scope.row.unit" @change="handleEdit(scope.$index, scope.row)" placeholder="请输入内容"></el-input>
                                <span>{{scope.row.unit}}</span> 
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(item.values, scope.$index, scope.row)"
                                v-if="scope.$index!=0">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-form-item>
        <!-- <div>数据:{{content}}</div> -->
        <div class="button_center">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
        <div style="margin-bottom:50px"></div>
    </el-form>

    <!-- 用户导入变量表对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { createEquipmentTemp, updateEquipmentTemp, getEquipmentTempInfo } from "@/api/equipment/equipment"
export default {
    name: 'createEquipment',
    data () {
        return {
            // 变量表数据
            content:[],
            // 显示表格编辑框
            showEdit:[],
            // 显示操作按钮
            showBtn:[],
            // 用户导入参数
            upload: {
                // 是否显示弹出层（用户导入）
                open: false,
                // 弹出层标题（用户导入）
                title: "",
                // 是否禁用上传
                isUploading: false,
                // 设置上传的请求头部
                headers: { Authorization: getToken() },
                // 上传的变量表模版的地址
                url: process.env.VUE_APP_BASE_API + "/v1/equipment_temp/parsing"
            },
            // 文件导入成功标志
            isSuccess:false,
            // 表单参数
            form:{},
        }
    },
    created() {
        // this.reset(this.content);
        this.getRouterQuery();
    },
    methods: {
    // 如果有，就获取路由参数
    getRouterQuery() {
      // 如果是点击编辑按钮来的就是修改，需要路由带参
      if (this.$route.query.id != undefined) {
        //   获取模版详情
        getEquipmentTempInfo(this.$route.query.id).then(response => {
            this.form = response.data;
            this.content = this.form.content;
            this.isSuccess = true;
        });
        
      }
    },
    isActive(route) {
        return route.path === this.$route.path
    },
        // 取消按钮 跳转至上一级路由
    cancel() {
      this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
      this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length - 1].path)
    },
        /**提交表单 */
    onSubmit() {
        const formContent = [];
        // 变量表content处理 删除为“”的变量表
        for(const index in this.content){
            if(this.content[index].values != ''){
                formContent.push(this.content[index]);
            }
        }
        this.form.content = formContent;
        if(this.form.id !=undefined){
            updateEquipmentTemp(this.form, this.form.id).then(response => {
                this.$modal.msgSuccess("修改成功");
                // 修改成功 返回上级路由
                this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1);
                this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length - 1].path);
            });
        }else{
            createEquipmentTemp(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                //   this.$router.push({name: 'equipmentTemplate'});
                // 新增成功 返回上级路由
                this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1);
                this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length - 1].path);
                });
        }
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "导入变量表";
      this.upload.open = true;
    },
    /** 导出按钮操作 */
    handleExport() {
      
      this.$modal.confirm('是否确认导出变量表？').then(() => {
        this.exportLoading = true;
        return exportUser();
      }).then(response => {
        this.$download.name(response.msg);
        this.exportLoading = false;
      }).catch(() => {});
    },
    /** 下载模板操作 */
    importTemplate() {
        window.open('http://47.100.101.133/%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx')
    //   axios({
    //     method: "GET",
    //     url: `/v1/equipment_temp/down`,
    //     responseType: 'arraybuffer', // 或者responseType: 'blob'
    //     xsrfHeaderName: 'Authorization',
    //     // data:{},//post携带参数
    //     //params:{},get携带参数
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': getToken()
    //     }
    //   }).then(res => {
    //       const blob = new Blob([res.data], {
    //       type: 'application/vnd.ms-excel'//下载excel 也可下载zip压缩包 application/zip'
    //     })
    //       const objectUrl = window.URL.createObjectURL(blob)//可以直接下载的url链接
    //       window.location.href = objectUrl
    //       }).catch(err => {
    //     console.log(err);
    //   })
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert("导入成功");
      this.content = response.data;
      this.isSuccess = true;
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },

    handleCurrentChange(row, event, column) {
        console.log(row, event, column, event.currentTarget)
    },

    handleEdit(index, row) {
        console.log(index, row);
    },
    // 删除指定行
    handleDelete(values, index, row) {
        // const noticeIds = row.noticeId || this.ids
        this.$modal.confirm('是否确认删除第"' + index + '"项？').then(function() {
            return values.splice(index, 1);
        }).then(() => {
            
            this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
        
        // values.splice(index, 1);
    },
    // 添加行
    addRow(item) {

        let j = { "addr": "", "var": "", "unit": "" };
        item.values.push(j);
        // this.master_user.sel = JSON.parse(JSON.stringify(j));
    },
    }
}
</script>

<style scoped>
.button_center {
    text-align: center;
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