<template>
  <div class="maintenance">
    <el-row :gutter="15">
      <el-form ref="" :model="formData" size="medium" :inline='true'>
        <el-col :span="3">
          <el-form-item label="" prop="status">
            <el-select v-model="formData.status" placeholder="处理状态" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="" prop="FaultSource">
            <el-select v-model="formData.faultSource" placeholder="故障来源" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in faultSourceOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="" prop="warrantyPerson">
            <el-select v-model="formData.warrantyPerson" placeholder="保修人" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in warrantyPersonOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="" prop="maintainer">
            <el-select v-model="formData.maintainer" placeholder="维修人" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in maintainerOptions" :key="index" :label="item.label"
                :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
            <!-- <div class="search-button"> -->
            <el-button type="primary" icon="el-icon-search" size="medium"> 搜索 </el-button>
            <!-- </div> -->
        </el-col>
        <el-col :span="2">
         
            <el-button type="success" style="padding: 10px;width: 100%" size="medium" @click="openFaultDialog"> 添加报修 </el-button>
    
        </el-col>
        <el-col :span="2">
         <!-- <div class="search-button"> -->
            <el-button type="danger" style="padding: 10px; width:100%" size="medium"> 删除报修 </el-button>
         <!-- </div> -->
        </el-col>
        <el-col :span="2">
     
            <el-button type="info" style="padding: 10px; width:100%" size="medium" @click="openMaintenanceDialog"> 添加维保 </el-button>
      
        </el-col>
    
      </el-form>
      </el-row>
      <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%">
       <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="equipmentCode"
        label="设备编码"
        >
        <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.equipmentCode}}</el-button>
      </template>
      </el-table-column>
      <el-table-column
        prop="oddNumbers"
        label="单号"
        >
        <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.oddNumbers}}</el-button>
      </template>
      </el-table-column>
      <el-table-column
        prop="warrantyPerson"
        label="保修人"
        >
      </el-table-column>
      <el-table-column
        prop="faultLevel"
        label="故障等级"
        >
      </el-table-column>
      <el-table-column
        prop="status"
        label="处理状态"
        >
      </el-table-column>
      <el-table-column
        prop="maintainer"
        label="维修人"
        >
      </el-table-column>
      <el-table-column
        prop="date"
        label="保修时间"
        >
      </el-table-column>
      <el-table-column
        prop="results"
        label="处理结果">
      </el-table-column>
      <el-table-column
        prop="faultInfo"
        label="故障描述">
      </el-table-column>
    </el-table>
    <!-- dialog组件 -->
    <!-- 添加故障报修-->
    <el-dialog title="添加故障报修条目" :visible.sync="dialogFaultFormVisible">
      <el-button type="success">选择设备</el-button>
      <div style="margin:0 0 20px 0;"></div>
      <el-form :model="faultForm" :inline="false" size="mini" label-width="80px">
        <el-row>
          <el-col :span="12">
        <el-form-item label="设备编号" >
          <el-input v-model="faultForm.equipmentCode" autocomplete="off"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="故障等级" >
          
          <el-select v-model="faultForm.faultLevel" placeholder="请选择故障" style="width: 100%;">
            <el-option label="一般" value="shanghai"></el-option>
            <el-option label="紧急" value="beijing"></el-option>
          </el-select>
          
        </el-form-item>
        </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
        <el-form-item label="发生日期">

          <el-date-picker type="date" placeholder="选择日期" v-model="faultForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="发生时间">
          <el-time-picker placeholder="选择时间" v-model="faultForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
        </el-col>
        </el-row>
        <el-form-item label="故障类型">
          <el-input  type="textarea" v-model="faultForm.faultType" autocomplete="off" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="故障描述" >
          <el-input type="textarea" v-model="faultForm.faultInfo" autocomplete="off" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报修人" >
                      <el-input v-model="faultForm.warrantyPerson" autocomplete="off"></el-input>
                    </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" >
                      <el-input v-model="faultForm.warrantyPersonPhone" autocomplete="off"></el-input>
                    </el-form-item>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :span="12">
        <el-form-item label="图片上传">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="文件上传">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">支持上传.rar .zip .doc .docx .pdf .jpg .png文件</div>
          </el-upload>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFaultFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFaultFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加维保信息 -->
    <el-dialog title="添加维保信息" :visible.sync="dialogMaintenanceFormVisible">
      
      <el-form :model="maintenanceForm" :inline="false" size="mini" label-width="80px">
        <el-row>
          <el-col :span="12">
        <el-form-item label="设备编号" >
          <el-input v-model="maintenanceForm.equipmentCode" autocomplete="off"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="故障等级" >
          
          <el-select v-model="maintenanceForm.faultLevel" placeholder="请选择故障" style="width: 100%;">
            <el-option label="一般" value="shanghai"></el-option>
            <el-option label="紧急" value="beijing"></el-option>
          </el-select>
          
        </el-form-item>
        </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
        <el-form-item label="维保日期">

          <el-date-picker type="date" placeholder="选择日期" v-model="maintenanceForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="维保时间">
          <el-time-picker placeholder="选择时间" v-model="maintenanceForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
        </el-col>
        </el-row>
        <el-form-item label="故障类型">
          <el-input  type="textarea" v-model="maintenanceForm.faultType" autocomplete="off" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="维保描述" >
          <el-input type="textarea" v-model="maintenanceForm.maintenanceInfo" autocomplete="off" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="维保人" >
                      <el-input v-model="maintenanceForm.maintainer" autocomplete="off"></el-input>
                    </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" >
                      <el-input v-model="maintenanceForm.maintainerPhone" autocomplete="off"></el-input>
                    </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="维保结果">
          <el-radio-group v-model="maintenanceForm.results">
            <el-radio :label="3">解决</el-radio>
            <el-radio :label="6">未解决</el-radio>
            <el-radio :label="9">待定</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-row>
          <el-col :span="12">
        <el-form-item label="图片上传">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          limit="4"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="文件上传">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">支持上传.rar .zip .doc .docx .pdf .jpg .png文件</div>
          </el-upload>
        </el-form-item>
        </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMaintenanceFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogMaintenanceFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Maintenance',
  props: [],
  data() {
    return {
      formData: {
        status: undefined,
        faultSource: undefined,
        warrantyPerson: undefined,
        maintainer: undefined,
        search: undefined,
      },
      faultForm: {
        equipmentCode: '',
        faultLevel: '',
        date1: '',
        date2: '',
        faultType: '',
        faultInfo: '',
        warrantyPerson: '',
        warrantyPersonPhone: '',
      },
      maintenanceForm: {
        equipmentCode: '',
        faultLevel: '',
        date1: '',
        date2: '',
        faultType: '',
        maintenanceInfo: '',
        maintainer: '',
        maintainerPhone: '',
        results:'',
      },
      fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
      tableData: [{
            equipmentCode: 'equipment-001',
            oddNumbers: 'bx-2021102321',
            warrantyPerson: '张三',
            faultLevel: '一般',
            status: '列入计划',
            maintainer: '李四',
            date: '2016-05-02',
            results: '',
            faultInfo: 'xxx不能正常工作，故障代码0001'
          }],
      statusOptions: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      faultSourceOptions: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      warrantyPersonOptions: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      maintainerOptions: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      dialogFaultFormVisible: false,
      dialogMaintenanceFormVisible: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs[''].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs[''].resetFields()
    },
    handleClick(row) {
        console.log(row);
        this.$router.push({name: 'info'});
    },
    openFaultDialog() {
      this.dialogFaultFormVisible = true;
    },
    openMaintenanceDialog() {
      this.dialogMaintenanceFormVisible = true;
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
      },
     handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      }

  }
}

</script>
<style>
.maintenance {
  padding: 10px 0 0 10px;
}

.search-button {
  margin-bottom: 22px;
}
</style>
