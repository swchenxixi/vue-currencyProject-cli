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
          <a-form-model-item label="港口" prop="name">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="编码" prop="code">
            <a-input v-model="form.code" />
          </a-form-model-item>
          <a-form-model-item label="国家" prop="country">
            <a-input v-model="form.country" />
          </a-form-model-item>
          <a-form-model-item label="地址" prop="address">
            <a-input v-model="form.address" />
          </a-form-model-item>
          <a-form-model-item label="经度" prop="longitude">
            <a-input v-model="form.longitude" />
          </a-form-model-item>
          <a-form-model-item label="纬度" prop="latitude">
            <a-input v-model="form.latitude" />
          </a-form-model-item>
        </a-form-model>
      </template>
    </form-page>
  </div>
</template>
<script>
import FormPage from '@/components/form-page/';
import { FormModel, Input } from 'ant-design-vue';
import { addPortData } from '@/api/port-data.js';
export default {
  components: {
    FormPage,
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
    AInput: Input
  },
  created() {
    console.log(this.$route.params);
    this.ids = this.$route.params.id ? this.$route.params.id : 0;
    if (this.ids != 0) {
      //初始化
      this.init();
    }
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
        name: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
        code: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        country: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        address: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        longitude: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        latitude: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      others: false,
      roles: []
    };
  },
  methods: {
    init() {
      console.log(this.$route.params.records);
      let {
        code,
        name,
        address,
        country,
        latitude,
        longitude
      } = this.$route.params.records.record.record;

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
          this.add();
        } else {
          console.log('error submit!!');
          // return false;
        }
      });
    },
    async add() {
      console.log(this.form);
      let res = await addPortData(this.form);
      console.log(res);
      this.$router.push({ path: '/port-list' });
    },
    onCancel() {
      console.log('取消操作');
      this.$router.go(-1);
    },
    async getAllRoles() {
      let res = await addPortData();
      console.log(res);
      res.data.map(obj => {
        this.roles.push({
          id: obj.id,
          name: obj.name,
          code: obj.code
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.portAdd {
  padding: 20px 0;
}
</style>
