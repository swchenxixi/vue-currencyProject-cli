<template>
  <div :style="{ width: width + 'px' }">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="账号" prop="loginId">
        <a-input v-model="form.loginId" />
      </a-form-model-item>
      <a-form-model-item label="密码" prop="loginPassword">
        <a-input v-model="form.loginPassword" />
      </a-form-model-item>
      <a-form-model-item label=" " :colon="false">
        <a-button
          type="primary"
          block
          @click.prevent="onLogin(form)"
          v-debounceFun
          >登录</a-button
        >
      </a-form-model-item>
      <a-form-model-item label=" " :colon="false">
        <a-row type="flex" justify="space-around">
          <a-col>账号：admin</a-col>
          <a-col>密码：solemn</a-col>
        </a-row>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { FormModel as AFormModel, Input as AInput } from 'ant-design-vue';
const { Item: AFormModelItem } = AFormModel;
export default {
  components: {
    AFormModel,
    AFormModelItem,
    AInput
  },

  props: {
    width: Number,
    onLogin: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        loginId: '',
        loginPassword: ''
      }
    };
  }
};
</script>
