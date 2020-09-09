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
        <a-form-model-item label="船名" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="船名代码" prop="code">
          <a-input v-model="form.code" />
        </a-form-model-item>
        <a-form-model-item label="普通舱" prop="ordinaryCabin">
          <a-input v-model="form.ordinaryCabin" type="number" />
        </a-form-model-item>
        <a-form-model-item label="头等舱" prop="firstClassCabin">
          <a-input v-model="form.firstClassCabin" type="number" />
        </a-form-model-item>
        <a-form-model-item label="贵宾舱" prop="vipCabin">
          <a-input v-model="form.vipCabin" type="number" />
        </a-form-model-item>
        <a-form-model-item label="舱位数" prop="cabinCount">
          <a-input v-model="form.cabinCount" type="number" />
        </a-form-model-item>
        <a-form-model-item label="公司" prop="company">
          <a-input v-model="form.company" />
        </a-form-model-item>
        <a-form-model-item label="船长度" prop="length">
          <a-input v-model="form.length" addon-after="m" type="number">
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="船型" prop="shipSize">
          <a-select
            v-model="form.shipSize"
            placeholder="please select your zone"
          >
            <a-select-option value="1">
              小
            </a-select-option>
            <a-select-option value="2">
              中
            </a-select-option>
            <a-select-option value="3">
              大
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="phone">
          <a-input v-model="form.phone" type="tel" maxlengt="11" />
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
import { updateShipInfo } from '@/api/ships.js';
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
        code: '',
        ordinaryCabin: '',
        firstClassCabin: '',
        vipCabin: '',
        cabinCount: '',
        shipSize: '',
        length: '',
        company: '',
        phone: '',
        createTime: undefined,
        desc: ''
      },
      others: false,
      rules: {
        name: [
          {
            required: true,
            message: '请输入船名',
            trigger: 'blur'
          }
        ],
        code: [{ required: true, message: '请输入船名代码', trigger: 'blur' }],
        ordinaryCabin: [
          { required: true, message: '请输入普通舱数量', trigger: 'blur' }
        ],
        cabinCount: [
          { required: true, message: '请输入总舱数量', trigger: 'blur' }
        ],
        company: [
          {
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }
        ],
        shipSize: [
          {
            required: true,
            message: '请选择船型',
            trigger: 'blur'
          }
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
    this.form.name = this.formInfo.shipName;
    this.form.code = this.formInfo.shipCode;
    this.form.ordinaryCabin = this.formInfo.firstCarbine;
    this.form.firstClassCabin = this.formInfo.generalCarbine;
    this.form.vipCabin = this.formInfo.VIPCarbine;
    this.form.cabinCount = this.formInfo.carbinsCount;
    this.form.company = this.formInfo.company;
    this.form.phone = this.formInfo.phone;
    this.form.createTime = this.formInfo.createTime;
    this.form.desc = this.formInfo.description;
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        console.log('valid', valid);
        if (valid) {
          this.editShip();
        } else {
          console.log('error submit!!');
        }
      });
    },
    editShip() {
      updateShipInfo(this.formInfo).then(res => {
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
