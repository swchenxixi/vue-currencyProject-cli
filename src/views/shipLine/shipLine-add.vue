<template>
  <div class="portAdd">
    <form-page :onSubmit="onSubmit" :onCancel="onCancel">
      <template slot="formBox">
        <a-form-model
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :rules="rules"
          ref="form"
        >
          <a-form-model-item label="始发站">
            <a-select v-model="form.depHarborId" placeholder="请选择始发站">
              <a-select-option
                v-for="item in startPort"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="停靠站" prop="stopPort">
            <!-- <a-checkbox-group v-model="form.stopPort">
              <a-checkbox
                :value="item.id"
                name="type"
                v-for="item in stopPort"
                :key="item.id"
              >
                {{ item.name }}
              </a-checkbox>
            </a-checkbox-group> -->
            <a-select
              mode="multiple"
              :default-value="[]"
              style="width: 100%"
              placeholder="请选择停靠站"
              v-model="form.stopPort"
              @change="handleChange"
            >
              <a-select-option v-for="item in stopPort" :key="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="目的站">
            <a-select v-model="form.destHarborId" placeholder="请选择目的站">
              <a-select-option
                v-for="item in destPort"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="备注">
            <a-input v-model="form.remark" type="textarea" />
          </a-form-model-item>
        </a-form-model>
      </template>
    </form-page>
  </div>
</template>
<script>
import FormPage from '@/components/form-page/';
import { FormModel, Input, Select } from 'ant-design-vue';
import { getAllPortData } from '@/api/port-data.js';
import {
  addLineData,
  editLineData,
  getLineDetailData
} from '@/api/shipLine-data.js';
export default {
  components: {
    FormPage,
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
    AInput: Input,
    // ACheckbox: Checkbox,
    // ACheckboxGroup: Checkbox.Group,
    ASelect: Select,
    ASelectOption: Select.Option
  },
  created() {
    console.log(this.$route.params);
    this.ids = this.$route.params.id ? this.$route.params.id : 0;
    if (this.ids != 0) {
      //初始化
      this.init();
    }
    //获取全部港口列表
    this.getAllPort();
  },
  data() {
    return {
      ids: 0,
      isread: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        code: '',
        country: '',
        latitude: '',
        longitude: '',
        address: ''
      },
      rules: {
        name: [{ required: true, message: '请输入港口', trigger: 'blur' }],
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        country: [{ required: true, message: '请输入国家', trigger: 'blur' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        longitude: [{ required: true, message: '请输入经度', trigger: 'blur' }],
        latitude: [{ required: true, message: '请输入纬度', trigger: 'blur' }]
      },
      others: false,
      stopPort: [],
      destPort: [],
      startPort: []
    };
  },
  methods: {
    init() {
      //获取当前详情数据
      this.getDetail();
    },
    async getDetail() {
      let res = await getLineDetailData(this.ids);
      console.log(res.data);
      let { code, name, address, country, latitude, longitude } = res.data;

      this.form.name = name;
      this.form.code = code;
      this.form.address = address;
      this.form.country = country;
      this.form.latitude = latitude;
      this.form.longitude = longitude;
      console.log(this.form);
    },
    onSubmit() {
      console.log(this.rules);
      this.$refs.form.validate(valid => {
        console.log(valid);
        if (valid) {
          //调保存接口
          if (this.ids != 0) {
            this.edit();
          } else {
            this.add();
          }
        } else {
          console.log('error submit!!');
          // return false;
        }
      });
    },
    async add() {
      console.log(this.form);
      let res = await addLineData(this.form);
      console.log(res);
      this.$router.push({ path: '/shipLine-list' });
    },
    async edit() {
      console.log(this.form);
      let res = await editLineData(this.form);
      console.log(res);
      this.$router.push({ path: '/shipLine-list' });
    },
    onCancel() {
      console.log('取消操作');
      this.$router.go(-1);
    },
    async getAllPort() {
      let res = await getAllPortData();
      res.data.map(obj => {
        this.stopPort.push({
          id: obj.id,
          name: obj.name
        });
      });
      this.destPort = JSON.parse(JSON.stringify(this.stopPort));
      this.startPort = JSON.parse(JSON.stringify(this.stopPort));
    },
    handleChange() {}
  }
};
</script>
<style lang="less" scoped>
.portAdd {
  padding: 20px 0;
}
</style>
