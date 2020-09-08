<template>
  <form-page :onSubmit="onSubmit" :onCancel="onCancel">
    <template slot="formBox">
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="Name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="Code">
          <a-input v-model="form.code" />
        </a-form-model-item>

        <a-form-model-item label="Description">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
      </a-form-model>
    </template>
  </form-page>
</template>
<script>
import FormPage from '@/components/form-page/';
import { addRole } from '@/api/role-data.js';
import { FormModel, Input } from 'ant-design-vue';
export default {
  components: {
    FormPage,
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
    AInput: Input
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
        code: '',
        desc: ''
      },
      others: false
    };
  },
  created() {
    this.formInfo = this.$route.params.record;
  },
  methods: {
    onSubmit() {
      addRole(this.formInfo).then(res => {
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
