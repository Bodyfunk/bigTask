<template>
  <div class="app-container">
      <el-form ref="form" :model="form" :rules="rules" label-width="130px" class="centerForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司名称" prop="full_name">
              <el-input v-model="form.full_name" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司首字母" prop="short_name">
              <el-input v-model="form.short_name" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司所在地区" prop="province_code">
              <!-- <treeselect class="tree" v-model="form.RegionCompany" :options="RegionOptions" :normalizer="normalizer" :show-count="true" placeholder="请选择地区" /> -->
              <el-row>
                  <el-col :span="8">
                      <el-select v-model="form.province_code" @change="changeProvince" placeholder="请选择省份" style="width:100%;">
                        <el-option
                        v-for="item in provinceOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                      <el-select v-model="form.city_code" @change="changeCity" placeholder="请选择市" style="width:100%;">
                        <el-option
                        v-for="item in cityOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                      <el-select v-model="form.area_code" placeholder="请选择区" style="width:100%;">
                        <el-option
                        v-for="item in areaOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        ></el-option>
                    </el-select>
                  </el-col>
              </el-row>
              
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司详细地址" prop="area_info">
              <el-input v-model="form.area_info" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司联系人员" prop="contract_name">
              <el-input v-model="form.contract_name" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司联系方式" prop="contract_mobile">
              <el-input v-model="form.contract_mobile" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公司所在地经纬" prop="longitudeLatitude">
              <el-input v-model="form.longitudeLatitude" placeholder="请粘贴经纬度" >
                <el-button slot="append" @click="gotoBaiduMap">选择位置</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
      </el-form>
      <div slot="footer" class="dialog-footer-left">
        <el-row>
          <el-col :span="16">
            <el-button type="warning" @click="reset" class="reset">重 置</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="submitForm">确 定</el-button>
          </el-col>
        </el-row>
      </div>
      <div style="margin-bottom:50px"></div>
  </div>
</template>

<script>
import {  addCompany, listProvince, updateCompany } from "@/api/system/company";

export default {
  name: "CreateCompany",
  data() {
    return {
      imageUrl: '',
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
      // 用户表格数据
      userList: [],
      //   省份表
      provinceOptions: [],
    //   市级表
      cityOptions: [],
    //   区级表
      areaOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      // 表单参数
      form: {

        city_code:'',
        area_code:''
      },
      defaultProps: {
        children: "children",
        label: "name"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      selectedItem:[],
      // 表单校验
      rules: {
        full_name: [
          { required: true, message: "公司名称不能为空", trigger: "blur" },
        ],
        short_name: [
          { required: true, message: "公司首字母不能为空", trigger: "blur" }
        ],
        province_code: [
          { required: true, message: "省份不能为空", trigger: "blur" }
        ],
        area_info: [
          { required: true, message: "公司详细地址不能为空", trigger: "blur" }
        ],
        longitudeLatitude: [
          { required: true, pattern: /^(\-|\+)?\d+(\.\d+)?,(\-|\+)?\d+(\.\d+)?$/, message: "请输入正确的经纬度", trigger: "blur" }
        ],
        contract_name: [
          { required: true, message: "公司联系人不能为空", trigger: "blur" }
        ],
        contract_mobile: [
          {
            required: true,
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    // 根据名称筛选部门树
    // deptName(val) {
    //   this.$refs.tree.filter(val);
    // }
  },
  created() {
    this.getProvinceSelect();
    this.getRouterQuery();
  },
  methods: {
    getRouterQuery() {
      // 如果是编辑按钮进来的就是修改，需要路由带参
      if(this.$route.query.id != undefined){
        this.form = this.$route.query;
        this.form.longitudeLatitude = this.form.area_config['j'] + ',' + this.form.area_config['w'];
      }
    },
    // 跳转至百度地图
    gotoBaiduMap() {
        window.open("https://api.map.baidu.com/lbsapi/getpoint/index.html");
    },
    /** 查询省份 */
    getProvinceSelect() {
      listProvince(1).then(response => {
        this.provinceOptions = response.data;
        console.log(this.provinceOptions);
        // 如果是编辑按钮进来的就是修改，需要路由带参
        if(this.$route.query.id != undefined){
          // 查找该公司的省份内的城市
          this.searchProvince(this.$route.query.province_code);
        }
      });      
    },
    // 确定省份，拉取对应城市列表
    searchProvince (value) {
      console.log(value);
      const selectedItem = this.provinceOptions.find((item) => { // 这里的provinceOptions就是上面遍历的数据源
      return item.code === value;
        // 筛选出匹配数据，是对应数据的整个对象
      })
      console.log(selectedItem);
      const queryParams={
          parent_id: selectedItem.id
      }
      listProvince(queryParams).then(response => {
            this.cityOptions = response.data;
            // 如果是编辑按钮进来，需要路由带参
            if(this.$route.query.id != undefined){
            // 查找该公司的城市内的区
            this.searchCity(this.$route.query.city_code);
          }

        })
    },
    // 确定地级市，拉取对应区列表
    searchCity (value) {
      const selectedItem = this.cityOptions.find((item) => { // 这里的cityOptions就是上面遍历的数据源
        return item.code === value;
        // 筛选出匹配数据，是对应数据的整个对象
      })
      console.log(selectedItem);
      const queryParams={
          parent_id: selectedItem.id
      }
      listProvince(queryParams).then(response => {
          this.areaOptions = response.data;
      })
    },

    // 修改省份时触发
    changeProvince (value) {
      // 清空城、区
      this.form.city_code = '';
      this.form.area_code = '';
      const selectedItem = this.provinceOptions.find((item) => { // 这里的provinceOptions就是上面遍历的数据源
      return item.code === value;
        // 筛选出匹配数据，是对应数据的整个对象
      })
      console.log(selectedItem);
      const queryParams={
          parent_id: selectedItem.id
      }
      listProvince(queryParams).then(response => {
            this.cityOptions = response.data;
        })
    },

    // 修改城市时触发
    changeCity (value) {
      // 清空区
      this.form.area_code = '';
      const selectedItem = this.cityOptions.find((item) => { // 这里的cityOptions就是上面遍历的数据源
        return item.code === value;
        // 筛选出匹配数据，是对应数据的整个对象
      })
      console.log(selectedItem);
      const queryParams={
          parent_id: selectedItem.id
      }
      listProvince(queryParams).then(response => {
          this.areaOptions = response.data;
      })
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        name: undefined,
        mobile: undefined,
        role_id: [],
        equipment_ids:[]
      };
      this.resetForm("form");
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    }, 
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          //处理一下经纬度
          var nums = this.form.longitudeLatitude.split(",");
          var temp = {
            'j' : nums[0],
            'w' : nums[1]
          }
          this.form.area_config = temp;
          //删除longitudeLatitude元素
          delete this.form["longitudeLatitude"];
          if (this.form.id != undefined) {
            updateCompany(this.form, this.form.id).then(response => {
              this.$modal.msgSuccess("修改成功");
              // 成功修改 返回上级路由
              this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1);
              this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length - 1].path);
            });
          } else {
            console.log(this.form)
            addCompany(this.form).then(response => {              
              this.$modal.msgSuccess("新增成功");
              // 成功新增 返回上级路由
              this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1);
              this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length - 1].path);
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.id || this.ids;
      this.$modal.confirm('是否确认删除用户编号为"' + userIds + '"的数据项？').then(function() {
        return delUser(userIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    }
  }
};
</script>
<style>
.tree {
    font-weight: 400;
}
.vue-treeselect__label {
    font-weight: 400;
}
.centerForm {
    margin-left: 20%;
    margin-right: 20%;
}

  .dialog-footer-left {
    width: 100%;
    text-align:left;
  }
  .reset {
    margin-left: 40%;
  }
</style>