<template>
<div style="padding: 0 0 0 10px; background:#f3f5f3">
    <div style="margin: 20px 10px 20px 0;">设备信息
    <el-row>
        <el-form :model="equipmentForm" label-width="100px">
            <el-col :span="8">
                <el-form-item label="设备编号">
                    <el-input v-model="equipmentForm.equipmentCode"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="设备类别">
                    <el-input v-model="equipmentForm.equipmentType"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="设备所在公司">
                    <el-input v-model="equipmentForm.company"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
            <el-form-item label="设备详细位置">
                <el-input type="textarea" v-model="equipmentForm.equipmentAddress"></el-input>
            </el-form-item>
            </el-col>
        </el-form>
    </el-row>
    </div>

    <div style="margin: 20px 10px 20px 0;">故障信息
        <el-row>
            <el-form :model="faultForm" label-width="120px">
                <el-col :span="6">
                    <el-form-item label="发生时间">
                        <el-date-picker
                        v-model="faultForm.date"
                        type="datetime"
                        placeholder="选择日期时间"
                        style="width:100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="保修人">
                        <el-input v-model="faultForm.warrantyPerson"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="保修人手机号码">
                        <el-input v-model="faultForm.warrantyPersonPhone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="故障等级">
                        <el-select v-model="faultForm.faultLevel" placeholder="请选择" style="width:100%;">
                        <el-option label="一般" value="shanghai"></el-option>
                        <el-option label="紧急" value="beijing"></el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="故障类别">
                        <el-input v-model="faultForm.faultType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="甲方保修人">
                        <el-input v-model="faultForm.firstPartyWarrantyPerson"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="甲方联系方式">
                        <el-input v-model="faultForm.firstPartyWarrantyPersonPhone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="故障描述">
                        <el-input type="textarea" v-model="faultForm.faultInfo" autocomplete="off" maxlength="30" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>

    <div style="margin: 20px 0 20px 0;">维保信息
        <el-row>
            <el-form :model="maintenanceForm" label-width="100px">
                <el-col :span="6">
                    <el-form-item label="维保时间">
                        <el-date-picker
                        v-model="maintenanceForm.date"
                        type="datetime"
                        placeholder="选择日期时间"
                        style="width:100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="维保人">
                        <el-input v-model="maintenanceForm.maintainer"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="保修手机号码">
                        <el-input v-model="maintenanceForm.maintainerPhone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="维保结果">
                        <el-radio-group v-model="maintenanceForm.results">
                            <el-radio :label="3">解决</el-radio>
                            <el-radio :label="6">未解决</el-radio>
                            <el-radio :label="9">待定</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="维保描述">
                        <el-input type="textarea" v-model="maintenanceForm.maintenanceInfo" autocomplete="off" maxlength="30" :rows="5" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
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
                <el-col :span="8">
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
                

            </el-form>
        </el-row>
    </div>
</div>
</template>

<script>
export default {
    name: 'info',
    data () {
        return {
            equipmentForm: {
                equipmentCode: '',
                equipmentType: '',
                company: '',
                equipmentAddress: '',
            },
            faultForm: {
                equipmentCode: '',
                faultLevel: '',
                date: '',
                faultType: '',
                faultInfo: '',
                warrantyPerson: '',
                warrantyPersonPhone: '',
            },
            maintenanceForm: {
                equipmentCode: '',
                faultLevel: '',
                date: '',
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
        }
    },
    methods: {
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

</style>