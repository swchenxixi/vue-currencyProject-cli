<template>
  <a-card>
    <a-form>
      <a-row>
        <a-col :md="18">
          <template v-if="searchData.length <= 3">
            <a-col :md="8" v-for="item in searchData" :key="item.id">
              <a-form-item :label="item.label">
                <a-input
                  v-model="searchVal[item.valname]"
                  placeholder
                  v-if="item.type == 'input'"
                />
                <a-select
                  v-model="searchVal[item.valname]"
                  placeholder="请选择"
                  default-value="200"
                  v-else-if="item.type == 'select'"
                >
                  <a-select-option
                    v-for="selectitem in item.value"
                    :key="selectitem.id"
                    :value="selectitem.id"
                    >{{ selectitem.label }}</a-select-option
                  >
                </a-select>
                <a-range-picker
                  v-if="item.type === 'date'"
                  :default-value="[
                    moment(searchVal.dateval[0], dateFormat),
                    moment(searchVal.dateval[1], dateFormat)
                  ]"
                  v-model="dates"
                  :format="dateFormat"
                  @change="changeDate"
                />
              </a-form-item>
            </a-col>
          </template>
          <template v-else-if="searchData.length > 3">
            <a-col
              :md="8"
              v-for="item in searchData.slice(0, 3)"
              :key="item.id"
            >
              <a-form-item :label="item.label">
                <a-input
                  v-model="searchVal[item.valname]"
                  placeholder
                  v-if="item.type == 'input'"
                />
                <a-select
                  v-model="searchVal[item.valname]"
                  placeholder="请选择"
                  default-value="0"
                  v-else-if="item.type == 'select'"
                >
                  <a-select-option
                    v-for="selectitem in item.value"
                    :key="selectitem.id"
                    :value="selectitem.id"
                    >{{ selectitem.label }}</a-select-option
                  >
                </a-select>
                <a-range-picker
                  v-if="item.type === 'date'"
                  :default-value="[
                    moment(searchVal.dateval[0], dateFormat),
                    moment(searchVal.dateval[1], dateFormat)
                  ]"
                  v-model="dates"
                  :format="dateFormat"
                  @change="changeDate"
                />
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col
                :md="8"
                v-for="item in searchData.slice(3, searchData.length)"
                :key="item.id"
              >
                <a-form-item :label="item.label">
                  <a-input
                    v-model="searchVal[item.valname]"
                    placeholder
                    v-if="item.type == 'input'"
                  />
                  <a-select
                    v-model="searchVal[item.valname]"
                    placeholder="请选择"
                    default-value="0"
                    v-else-if="item.type == 'select'"
                  >
                    <a-select-option
                      v-for="selectitem in item.value"
                      :key="selectitem.id"
                      :value="selectitem.id"
                      >{{ selectitem.label }}</a-select-option
                    >
                  </a-select>
                  <a-range-picker
                    v-if="item.type === 'date'"
                    :default-value="[
                      moment(searchVal.dateval[0], dateFormat),
                      moment(searchVal.dateval[1], dateFormat)
                    ]"
                    v-model="dates"
                    :format="dateFormat"
                    @change="changeDate"
                  />
                </a-form-item>
              </a-col>
            </template>
          </template>
        </a-col>

        <a-col :md="6">
          <span class="table-page-search-submitButtons">
            <a-button type="primary" @click="search">查询</a-button>
            <a-button style="margin-left: 8px" @click="reset">重置</a-button>
            <a @click="toggleAdvanced" v-if="searchData.length > 3">
              {{ advanced ? '收起' : '展开' }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </span>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script>
import { Card, Form, DatePicker, Input } from 'ant-design-vue';
import { formatDate } from '@/filters/format-date.js';
import moment from 'moment';
export default {
  components: {
    ACard: Card,
    AForm: Form,
    AFormItem: Form.Item,
    ARangePicker: DatePicker.RangePicker,
    AInput: Input
  },
  props: {
    searchData: Array,
    queryParam: Object,
    changeTable: Function
  },
  data() {
    let searchVal = {};
    let dates = [];
    let oldDate = [];
    this.searchData.map(obj => {
      if (obj.value != '') {
        if (obj.type == 'select') {
          searchVal[obj.valname] = obj.value[0].id;
        } else {
          searchVal[obj.valname] = obj.value;
          if (obj.type == 'date') {
            obj.value.map(dateobj => {
              dates.push(moment(dateobj));
              oldDate.push(moment(dateobj));
            });
          }
        }
      } else {
        searchVal[obj.valname] = '';
      }
    });

    return {
      advanced: false,
      moment,
      dateFormat: 'YYYY/MM/DD',
      searchVal: searchVal,
      oldSearch: JSON.parse(JSON.stringify(searchVal)),
      formatDate,
      dates: dates,
      oldDate: oldDate
    };
  },
  methods: {
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    search() {
      this.changeTable('search', this.searchVal);
    },
    reset() {
      this.searchVal = JSON.parse(JSON.stringify(this.oldSearch));
      this.dates = this.oldDate;
      this.changeTable('search', this.searchVal);
    },
    changeDate(date) {
      this.dates = date;
      let date1 = new Date(date[0]._d);
      let date2 = new Date(date[1]._d);
      let nowdate1 = formatDate(date1, 'yyyy-mm-dd');
      let nowdate2 = formatDate(date2, 'yyyy-mm-dd');
      this.searchVal.dateval = [nowdate1, nowdate2];
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ant-form-item-control-wrapper {
  width: 65%;
  display: inline-block;
}
</style>
