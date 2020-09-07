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
        <a-form-model-item label="用户名" prop="username">
          <a-input v-model="form.username" />
        </a-form-model-item>
        <a-form-model-item label="用户姓名" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input-password v-model="form.password" />
        </a-form-model-item>
        <a-form-model-item label="手机号" prop="mobile">
          <a-input v-model="form.mobile" />
        </a-form-model-item>
        <a-form-model-item label="角色" prop="rolesId">
          <a-checkbox-group v-model="form.rolesId">
            <a-checkbox
              :value="item.id"
              name="type"
              v-for="item in roles"
              :key="item.id"
            >
              {{ item.name }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>
      </a-form-model>
    </template>
  </form-page>
</template>
<script>
import FormPage from '@/components/form-page/';
import { FormModel, Input, Checkbox } from 'ant-design-vue';
import { addRole } from '@/api/role-data.js';
import { pass } from '@/utils/reg.js';
export default {
  components: {
    FormPage,
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
    AInput: Input,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    AInputPassword: Input.Password
  },
  created() {
    console.log(this.$route.params.record);
    //获取全部角色列表
    this.getAllRoles();
  },
  data() {
    return {
      formList: [
        {
          label: '表单输入框',
          type: 'input',
          value: '',
          valName: 'inputval'
        },
        {
          label: '表单下拉选择',
          type: 'select',
          value: [
            { value: 101, name: 'option1' },
            { value: 102, name: 'option2' }
          ],
          valName: 'selectval'
        },
        {
          label: '表单时间选择',
          type: 'date',
          value: '',
          valName: 'dateval'
        },
        {
          label: '文本域',
          type: 'textarea',
          value: '',
          valName: 'textarea'
        }
      ],
      ids: 0,
      isread: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        username: '',
        mobile: '',
        password: '',
        rolesId: []
      },
      rules: {
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          { validator: this.passreg }
        ],
        name: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        rolesId: [{ required: true, message: '请选择角色', trigger: 'change' }]
      },
      others: false,
      roles: []
    };
  },
  methods: {
    onSubmit() {
      console.log(this.rules);
      this.$refs.form.validate(valid => {
        console.log(valid);
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          // return false;
        }
      });
    },
    onCancel() {
      console.log('取消操作');
      this.$router.go(-1);
    },
    async getAllRoles() {
      let res = await addRole();
      console.log(res);
      res.data.map(obj => {
        this.roles.push({
          id: obj.id,
          name: obj.name,
          code: obj.code
        });
      });
    },
    passreg(rule, value, callback) {
      let res = pass(value);
      if (!res) {
        callback('请输入6-8位字母或数字密码');
      } else {
        callback();
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
