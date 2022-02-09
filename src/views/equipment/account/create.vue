<template>
  <div class="app-container">
    <div style="margin: 20px 10px 20px 0">
      设备信息
      <el-row>
        <el-form :model="form" ref="form" label-width="150px" size="mini">
          <el-col :span="12">
            <el-form-item label="生产时间">
              <el-date-picker
                v-model="form.production_at"
                type="datetime"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd hh:mm:ss"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="el-col-12_48px">
            <el-form-item label="设备标记">
              <el-radio-group v-model="form.tag">
                <el-radio
                  v-for="item in markingOptions"
                  :key="item.key"
                  :label="item.key"
                  >{{ item.value }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号">
              <el-input
                v-model="form.contract_no"
                placeholder="请输入合同编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备区号">
              <el-input
                v-model="form.code"
                placeholder="请输入设备区号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="10">
              <el-col :span="18">
                <el-form-item label="客户公司名称">
                  <el-input
                    v-model="form.full_name"
                    placeholder="请选择公司"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-button
                  size="mini"
                  style="width: 100%"
                  type="primary"
                  @click="searchCompany"
                  >查找</el-button
                >
              </el-col>
              <el-col :span="3">
                <el-button
                  size="mini"
                  style="width: 100%"
                  type="success"
                  @click="addCompany"
                  >新增</el-button
                >
              </el-col>
            </el-row>

            <!-- <el-form-item label="客户公司名称">
                <el-input v-model="form.equipmentAddress"></el-input>
            </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备标识">
              <el-input
                v-model="form.unique"
                placeholder="请输入设备标识"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司首字母">
              <el-input v-model="form.short_name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="el-col-12_48px">
            <el-form-item label="设备炉型">
              <el-radio-group v-model="form.type">
                <el-radio
                  v-for="dict in dict.type.equipment_type"
                  :key="dict.value"
                  :label="dict.value"
                  >{{dict.label}}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户公司所在地">
              <el-input
                v-model="form.companyAddress"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产班组">
              <el-input
                v-model="form.production_group"
                placeholder="请输入设备生产班组"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户公司详细地址">
              <el-input v-model="form.area_info" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产负责人">
              <el-input
                v-model="form.production_user"
                placeholder="请输入设备生产班组负责人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row class="right">
              <el-col :span="6">
                <el-button
                  type="success"
                  size="mini"
                  class="button-length"
                  @click="ok"
                  >交付</el-button
                >
              </el-col>
              <el-col :span="6">
                <el-button
                  type="info"
                  size="mini"
                  class="button-length"
                  @click="cancel"
                  >取消</el-button
                >
              </el-col>
              <el-col :span="6">
                <el-button
                  type="warning"
                  size="mini"
                  class="button-length"
                  @click="reset"
                  >重置</el-button
                >
              </el-col>
              <el-col :span="6">
                <el-button
                  type="primary"
                  size="mini"
                  class="button-length"
                  @click="submitForm"
                  >确定</el-button
                >
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产负责人联系方式">
              <el-input
                v-model="form.production_user_contact"
                placeholder="请输入设备生产班组负责人联系方式"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>

    <el-row :gutter="10">
      <el-col :span="6">
        <div>客户验收</div>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="3">
        <el-input v-model="searchParam" placeholder="操作人或标题"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button icon="el-icon-search" type="primary">搜索</el-button>
      </el-col>
      <el-col :span="3">
        <el-button icon="el-icon-plus" type="success" @click="createCustomerAcceptance">新增</el-button>
      </el-col>
    </el-row>
    <!-- 客户验收小卡片 容器-->
    <div class="div-style">
      <el-row :gutter="10">
        <el-col
          :span="6"
          v-for="(item, index) in customerAcceptanceList"
          :key="index"
          style="margin-bottom: 5px"
        >
          <el-card shadow="hover">
            <el-row>
              <el-col :span="4">
                <div>时间</div>
              </el-col>
              <el-col :span="14">
                <div>{{ item.start_at }}</div>
              </el-col>
              <el-col :span="4">
                <div>结论</div>
              </el-col>
              <el-col :span="2">
                <i v-if="item.status == 1" class="el-icon-success"></i>
                <i v-if="item.status == -1" class="el-icon-error"></i>
                <i v-if="item.status == 0" class="el-icon-remove"></i>
              </el-col>

              <el-col :span="4">
                <span>标题</span>
              </el-col>
              <el-col :span="20">
                <span>{{ item.title }}</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="10">
      <el-col :span="6">
        <div>出厂验收</div>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="3">
        <el-input v-model="searchParam" placeholder="操作人或标题"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button icon="el-icon-search" type="primary">搜索</el-button>
      </el-col>
      <el-col :span="3">
        <el-button icon="el-icon-plus" type="success" @click="createFactoryAcceptance">新增</el-button>
      </el-col>
    </el-row>
    <!-- 出厂验收小卡片 -->
    <div class="div-style" style="background-color: #dcfae6">
      <el-row :gutter="10">
        <el-col
          :span="6"
          v-for="(item, index) in factoryAcceptanceList"
          :key="index"
          style="margin-bottom: 5px"
        >
          <el-card shadow="hover">
            <el-row>
              <el-col :span="4">
                <div>时间</div>
              </el-col>
              <el-col :span="14">
                <div>{{ item.start_at }}</div>
              </el-col>
              <el-col :span="4">
                <div>结论</div>
              </el-col>
              <el-col :span="2">
                <i v-if="item.status == 1" class="el-icon-success"></i>
                <i v-if="item.status == -1" class="el-icon-error"></i>
                <i v-if="item.status == 0" class="el-icon-remove"></i>
              </el-col>

              <el-col :span="4">
                <span>标题</span>
              </el-col>
              <el-col :span="20">
                <span>{{ item.title }}</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="margin-bottom: 50px"></div>

    <!-- 查找公司对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="queryParams" :model="queryParams" label-width="100px">
        <el-row :gutter="10">
          <el-col :span="21">
            <el-form-item label="公司名称" prop="full_name">
              <el-input
                v-model="queryParams.full_name"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="getList">查找</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="21">
            <el-form-item label="公司首字母" prop="short_name">
              <el-input
                v-model="queryParams.short_name"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="getList">查找</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="21">
            <el-form-item label="公司所在地区">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-select
                    v-model="queryParams.province_code"
                    @change="changeProvince"
                    placeholder="请选择省份"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in provinceOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select
                    v-model="queryParams.city_code"
                    @change="changeCity"
                    placeholder="请选择市"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in cityOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-select
                    v-model="queryParams.area_code"
                    placeholder="请选择区"
                    style="width: 100%"
                  >
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
          <el-col :span="3">
            <el-button type="primary" @click="getList">查找</el-button>
          </el-col>
        </el-row>
      </el-form>

      <!-- 公司列表 -->
      <el-table
        v-loading="loading"
        :data="companyList"
        highlight-current-row
        @current-change="handleCurrentChange"
        border
        max-height="400"
        style="width: 100%"
      >
        <el-table-column label="ID" align="center" prop="id" />
        <el-table-column label="公司名称" align="center" prop="full_name">
        </el-table-column>
        <el-table-column label="公司首字母" align="center" prop="short_name" />
        <!-- <el-table-column label="公司所在地区" align="center" prop="area_code" /> -->
        <el-table-column label="公司详细地址" align="center" prop="area_info" />
        <el-table-column label="联系人员" align="center" prop="contract_name" />
        <el-table-column
          label="联系方式"
          align="center"
          prop="contract_mobile"
        />
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.page"
        :limit.sync="queryParams.per_page"
        @pagination="getList"
      />

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="open = false">确 定</el-button>

        <el-button @click="open = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 新增验收条目dialog -->
    <el-dialog
      id="acceptance"
      :title="title"
      :visible.sync="openAcceptanceClient"
      width="1000px"
    >
      <el-form ref="acceptanceForm" :model="acceptanceForm" label-width="100px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="acceptanceForm.start_at"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd hh:mm:ss"
                style="width: 100%;"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="acceptanceForm.end_at"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd hh:mm:ss"
                style="width: 100%;"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

          <el-form-item label="标题">
            <el-input v-model="acceptanceForm.title" placeholder="请输入内容" />
          </el-form-item>
          <el-form-item label="具体描述">
            <el-input
              type="textarea"
              rows="5"
              v-model="acceptanceForm.desc"
              placeholder="请输入内容"
            />
          </el-form-item>
          <el-form-item label="验收结论">
            <el-radio-group v-model="acceptanceForm.status">
              <el-radio :label="1">合格</el-radio>
              <el-radio :label="-1">不合格</el-radio>
              <el-radio :label="0">待定</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="验收员">
            <el-input
              v-model="acceptanceForm.acceptances_user_name"
              placeholder="请输入内容"
            />
          </el-form-item>
          <el-divider></el-divider>
          <el-row>
            <el-col :span="12">
              <el-form-item label="图片上传">
                <!-- 图片上传组件 -->
                <div>
                  <ImageUpload v-on:getImageFileIds="getImageIds"></ImageUpload>  
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文件上传">
                <FileUpload v-on:getOtherFileIds="getOtherIds"></FileUpload>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <!-- <el-divider></el-divider> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="openAcceptanceClient = false">取 消</el-button>
        <el-button type="primary" @click="createAcceptanceClient">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getEquipmentType,
  getEquipmentTag,
  getAcceptanceStatus,
} from "@/api/common";
import { listCompany, listProvince, upload } from "@/api/system/company";
import { createEquipmentTest, getEquipmentAcceptanceClient, getEquipmentAcceptanceFactory, createEquipmentAcceptanceClient, createEquipmentAcceptanceFactory } from "@/api/equipment/equipment";
import ImageUpload from "@/components/ImageUpload";
import FileUpload from "@/components/FileUpload";
export default {
  name: "accountCreate",
  dicts: ['equipment_type'],
  components: {ImageUpload, FileUpload},
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 公司表格数据
      companyList: [],
      // 客户验收小卡片列表
      customerAcceptanceList: [],
      // 出厂验收小卡片列表
      factoryAcceptanceList: [],
      // 对话框表单
      companyForm: {},
      // // 查询表单
      // queryForm:{},
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
    //  客户验收弹出层
      openAcceptanceClient: false,
    //   上传的图片列表
      imageList: [],
    //   上传的文件列表
      fileList: [],
    //   验收表单
      acceptanceForm: {},
      form: {},
    //   炉型表
      typeOptions: [],
    //   设备标记表
      markingOptions: [],
      //   省份表
      provinceOptions: [],
      //   市级表
      cityOptions: [],
      //   区级表
      areaOptions: [],
      uploadImgUrl: process.env.VUE_APP_BASE_API + "/common/upload", // 上传的图片服务器地址
      fileType:{
          type:"acceptance-image"
      },
      dateRange: "",
      searchParam: "",
      open: false,
      queryParams: {
        page: 1, //当前是第几页
        per_page: 10, //设置一页显示多少条
        full_name: undefined,
        short_name: undefined,
        province_code: undefined,
        city_code: undefined,
        area_code: undefined,
      },
    };
  },
  created() {
    // this.getEquipmentTypeList();
    this.getEquipmentTagList();
    this.getList();
    this.getEquipmentAcceptanceClientList();
    this.getEquipmentAcceptanceFactoryList();
    this.getProvinceSelect();
    this.getRouterQuery();
  },
  methods: {
    // 打开客户验收对话框
    createCustomerAcceptance(){
      this.title = "新增客户验收";
      this.openAcceptanceClient = true;
    },
    // 打开出厂验收对话框
    createFactoryAcceptance(){
      this.title = "新增出厂验收"
      this.openAcceptanceClient = true;
    },
    // 获取所有的客户验收小卡片列表
    getEquipmentAcceptanceClientList() {
      if(this.$route.query.id != undefined){
        getEquipmentAcceptanceClient(this.$route.query.id).then((response) => {
          this.customerAcceptanceList = response.data;
        });
      }
    },
    //获取所有的出厂验收小卡片列表
    getEquipmentAcceptanceFactoryList() {
      if(this.$route.query.id != undefined){
        getEquipmentAcceptanceFactory(this.$route.query.id).then((response) => {
          this.factoryAcceptanceList = response.data;
        });
      }
    },
    //新增验收小卡片
    createAcceptanceClient() {
      this.$refs["acceptanceForm"].validate((valid) => {
        if (valid) {
          if(this.title == "新增客户验收") {
            createEquipmentAcceptanceClient(this.acceptanceForm, this.form.id).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.openAcceptanceClient = false;
              this.getEquipmentAcceptanceClientList();
            });
          } else if(this.title == "新增出厂验收") {
            createEquipmentAcceptanceFactory(this.acceptanceForm, this.form.id).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.openAcceptanceClient = false;
              this.getEquipmentAcceptanceFactoryList();
            })
          }
        }
      });
    },
    getRouterQuery() {
      // 如果是点击设备标识来的就是修改，需要路由带参
      if (this.$route.query.id != undefined) {
        this.form = this.$route.query;
        console.log(this.form);
        this.form.type = this.form.type.toString();
        this.form.tag = parseInt(this.form.tag);
        // this.form.full_name = this.form.company.full_name;
        // this.form.short_name = this.form.company.short_name;
        // this.form.area_info = this.form.company.area_info;
        // this.form.city_code = this.form.company.city_code;
        this.acceptanceForm.equipment_id = this.form.id;
        // this.handleCurrentChange(this.form.company);
      }
    },
    getList() {
      this.loading = true;
      listCompany(this.queryParams).then((response) => {
        this.companyList = response.data;
        this.total = response.meta.total;
        this.loading = false;
      });
    },
    getEquipmentTypeList() {
      getEquipmentType().then((response) => {
        this.typeOptions = response.data;
      });
    },

    getEquipmentTagList() {
      getEquipmentTag().then((response) => {
        this.markingOptions = response.data;
      });
    },

    // 重置查询参数
    resetQueryParams() {
      this.queryParams = {
        page: 1, //当前是第几页
        per_page: 10, //设置一页显示多少条
        full_name: undefined,
        short_name: undefined,
        province_code: undefined,
        city_code: undefined,
        area_code: undefined,
      };
    },

    // 点击查找公司按钮
    searchCompany() {
      this.title = "查找公司";
      this.open = true;
    },
    // 点击新增公司按钮，跳转到新增公司页
    addCompany() {
      this.$router.push({
        name: "CreateCompany",
      });
    },

    /** 首先查询省份 */
    getProvinceSelect() {
      listProvince(1).then((response) => {
        this.provinceOptions = response.data;
        // 如果是路由带参
        if (this.$route.query.id != undefined) {
          // 查找该公司的城市内的区
          var province = this.searchProvince(this.form.province_code);
          this.form.companyAddress = province.name;
          if (this.form.city_code) {
            this.getCity(province.id);
          }
        }
      });
    },

    // 省份修改，拉取对应城市列表
    changeProvince(value) {
      console.log(value);
      const selectedItem = this.provinceOptions.find((item) => {
        // 这里的provinceOptions就是上面遍历的数据源
        return item.code === value;
        // 筛选出匹配数据，是对应数据的整个对象
      });
      console.log(selectedItem);
      const query = {
        parent_id: selectedItem.id,
      };
      listProvince(query).then((response) => {
        this.cityOptions = response.data;
        // 如果是编辑按钮进来，需要路由带参
        if (this.$route.query.id != undefined) {
          // 查找该公司的城市内的区
          this.changeCity(this.$route.query.city_code);
        }
      });
    },
    // 地级市修改，拉取对应区列表
    changeCity(value) {
      const selectedItem = this.cityOptions.find((item) => {
        // 这里的cityOptions就是上面遍历的数据源
        return item.code === value;
        // 筛选出匹配数据，是对应数据的整个对象
      });
      console.log(selectedItem);
      const query = {
        parent_id: selectedItem.id,
      };
      listProvince(query).then((response) => {
        this.areaOptions = response.data;
      });
    },

    // 选中公司
    handleCurrentChange(row) {
      console.log(row);
      if (row != null) {
        //关闭dialog
        this.open = false;
        this.form.full_name = row.full_name;
        this.form.short_name = row.short_name;
        this.form.area_info = row.area_info;
        this.form.company_id = row.id;
        this.form.city_code = row.city_code;
        var province = this.searchProvince(row.province_code);
        this.form.companyAddress = province.name;
        if (row.city_code) {
          console.log("获取城市");
          this.getCity(province.id);
        }
        //重置查询参数
        this.resetQueryParams();
      }
    },

    // 遍历省份表 匹配出对应的省份
    searchProvince(value) {
      const selectedItem = this.provinceOptions.find((item) => {
        // 这里的provinceOptions就是上面遍历的数据源
        return item.code === value;
        // 筛选出匹配数据，是对应数据的整个对象
      });
      return selectedItem;
    },

    // 遍历城市表 匹配出对应的城市
    searchCity(value) {
      const selectedItem = this.cityOptions.find((item) => {
        // 这里的provinceOptions就是上面遍历的数据源
        return item.code === value;
        // 筛选出匹配数据，是对应数据的整个对象
      });
      console.log(selectedItem);
      return selectedItem;
    },

    // 拉取省份对应城市列表
    getCity(id) {
      const query = {
        parent_id: id,
      };
      listProvince(query).then((response) => {
        this.cityOptions = response.data;
        const selectedItem = this.searchCity(this.form.city_code);
        if (selectedItem) {
          this.form.companyAddress += selectedItem.name;
        }
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          createEquipmentTest(this.form).then((response) => {
            this.$modal.msgSuccess("新增成功");
            // 成功新增 返回上级路由
            this.$store.state.tagsView.visitedViews.splice(
              this.$store.state.tagsView.visitedViews.findIndex(
                (item) => item.path === this.$route.path
              ),1);
            this.$router.push(
              this.$store.state.tagsView.visitedViews[
                this.$store.state.tagsView.visitedViews.length - 1
              ].path
            );
          });
        }
      });
    },
    // 重置按钮
    reset() {
      this.form = {
        id: undefined,
        full_name: undefined,
        short_name: undefined,
        area_info: undefined,
        company_id: undefined,
        companyAddress: undefined,
        production_at: undefined,
        contract_no: undefined,
        tag: undefined,
        code: undefined,
        unique: undefined,
        type: undefined,
        production_group: undefined,
        production_user: undefined,
        production_user_contact: undefined,
      };
    },

    //取消按钮
    cancel() {
      // 取消新增 返回上级路由
      this.$store.state.tagsView.visitedViews.splice(
        this.$store.state.tagsView.visitedViews.findIndex(
          (item) => item.path === this.$route.path
        ),
        1
      );
      this.$router.push(
        this.$store.state.tagsView.visitedViews[
          this.$store.state.tagsView.visitedViews.length - 1
        ].path
      );
    },

    //交付按钮
    ok() {},

    // 父组件拿到ImageUpload传来的值
    getImageIds(e) {
        this.acceptanceForm.images = e;
        console.log(this.acceptanceForm.images);
    },
    // 父组件拿到FileUpload传来的值
    getOtherIds(e) {
        this.acceptanceForm.files = e;
        console.log(e);
    }
  },
};
</script>

<style scoped>
.button-length {
  padding: 7px 30px 7px 30px;
}
.right {
  text-align: right;
}
.el-col-12_48px {
  height: 48px;
}
.div-style {
  overflow: auto;
  background-color: #fdfbe7;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  height: 200px;
  /* border:1px solid #000; */
  font-weight: 400;
  font-size: 12px;
  max-height: 250px;
}
.el-row {
  display: flex;
  flex-wrap: wrap;
}
.el-row .el-card {
  min-width: 100%;
  height: 100%;
  /* margin-right: 20px; */
  transition: all 0.5s;
}

#acceptance .el-dialog__footer {
  padding-top: 150px;
}

</style>