<template>
  <form-page :onSubmit="onSubmit" :onCancel="onCancel">
    <template slot="formBox">
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
        ref="form"
      >
        <a-form-model-item label="公司名称" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="公司地址" prop="address">
          <a-input v-model="form.address" />
        </a-form-model-item>
        <a-form-model-item label="法人" prop="legalPerson">
          <a-input v-model="form.legalPerson" />
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="phone">
          <a-input v-model="form.phone" />
        </a-form-model-item>
        <a-form-model-item label="创建时间" prop="createTime">
          <a-date-picker
            v-model="form.createTime"
            show-time
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="desc">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
      </a-form-model>
    </template>
  </form-page>
</template>
<script>
import FormPage from '@/components/form-page/';
import { addCompany } from '@/api/ship-company-data.js';
import { FormModel, Input, DatePicker } from 'ant-design-vue';
export default {
  components: {
    FormPage,
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
    AInput: Input,
    ADatePicker: DatePicker
  },
  data() {
    return {
      ids: 0,
      isread: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formInfo: '',
      form: {
        name: '',
        address: '',
        legalPerson: '',
        phone: '',
        createTime: undefined,
        desc: ''
      },
      others: false,
      rules: {
        name: [
          {
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        legalPerson: [
          { required: true, message: '请输入法人', trigger: 'blur' }
        ],
        phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        createTime: [
          { required: true, message: '请选择创建时间', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.formInfo = this.$route.params.record;
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        console.log('valid', valid);
        if (valid) {
          this.addCompany();
        } else {
          console.log('error submit!!');
        }
      });
    },
    addCompany() {
      addCompany(this.formInfo).then(res => {
        this.$notification.open({
          message: 'success',
          description: res.message,
          icon: <a-icon type="smile" style="color: #108ee9" />
        });
        this.$router.go(-1);
      });
    },
    onCancel() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped></style>
