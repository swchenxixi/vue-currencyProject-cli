<template>
  <form-page :onSubmit="onSubmit" :onCancel="onCancel">
    <template slot="formBox">
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="Activity name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="Activity zone">
          <a-select v-model="form.region" placeholder="please select your zone">
            <a-select-option value="shanghai">
              Zone one
            </a-select-option>
            <a-select-option value="beijing">
              Zone two
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="Activity time">
          <a-date-picker
            v-model="form.date1"
            show-time
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          />
        </a-form-model-item>
        <a-form-model-item label="Instant delivery">
          <a-switch v-model="form.delivery" />
        </a-form-model-item>
        <a-form-model-item label="Activity type">
          <a-checkbox-group v-model="form.type">
            <a-checkbox value="1" name="type">
              Online
            </a-checkbox>
            <a-checkbox value="2" name="type">
              Promotion
            </a-checkbox>
            <a-checkbox value="3" name="type">
              Offline
            </a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="Resources">
          <a-radio-group v-model="form.resource">
            <a-radio value="1">
              Sponsor
            </a-radio>
            <a-radio value="2">
              Venue
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="Activity form">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
      </a-form-model>
    </template>
  </form-page>
</template>
<script>
import FormPage from '@/components/form-page/';
import {
  FormModel,
  Input,
  Select,
  DatePicker,
  Switch,
  Radio,
  Checkbox
} from 'ant-design-vue';
export default {
  components: {
    FormPage,
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    ADatePicker: DatePicker,
    ASwitch: Switch,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group
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
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      others: false
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    },
    onCancel() {
      console.log('取消操作');
    }
  }
};
</script>
<style lang="less" scoped></style>
