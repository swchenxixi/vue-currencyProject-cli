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
                  v-if="item.type === 'daterange'"
                  :default-value="[
                    moment(searchVal.dateval[0], dateFormat),
                    moment(searchVal.dateval[1], dateFormat)
                  ]"
                  v-model="daterange"
                  :format="dateFormat"
                  @change="changeDateRange"
                />
                <a-date-picker
                  @change="changeDate"
                  v-if="item.type === 'date'"
                  v-model="dates"
                  :default-value="moment(item.value)"
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
                  v-if="item.type === 'daterange'"
                  :default-value="[
                    moment(searchVal.dateval[0], dateFormat),
                    moment(searchVal.dateval[1], dateFormat)
                  ]"
                  v-model="daterange"
                  :format="dateFormat"
                  @change="changeDateRange"
                />
                <a-date-picker
                  @change="changeDate"
                  v-if="item.type === 'date'"
                  v-model="dates"
                  :default-value="moment(item.value)"
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
                    v-if="item.type === 'daterange'"
                    :default-value="[
                      moment(searchVal.dateval[0], dateFormat),
                      moment(searchVal.dateval[1], dateFormat)
                    ]"
                    v-model="daterange"
                    :format="dateFormat"
                    @change="changeDateRange"
                  />
                  <a-date-picker
                    @change="changeDate"
                    v-if="item.type === 'date'"
                    v-model="dates"
                    :default-value="moment(item.value)"
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
    ADatePicker: DatePicker,
    AInput: Input
  },
  props: {
    searchData: Array,
    queryParam: Object,
    changeTable: Function
  },
  data() {
    let searchVal = {};
    let daterange = [];
    let oldDateRange = [];
    let dates = '';
    let oldDate = '';
    this.searchData.map(obj => {
      if (obj.value != '') {
        if (obj.type == 'select') {
          searchVal[obj.valname] = obj.value[0].id;
        } else {
          searchVal[obj.valname] = obj.value;
          if (obj.type == 'daterange') {
            obj.value.map(dateobj => {
              daterange.push(moment(dateobj));
              oldDateRange.push(moment(dateobj));
            });
          }
          if (obj.type == 'date') {
            dates = moment(obj.value);
            oldDate = moment(obj.value);
          }
        }
      } else {
        searchVal[obj.valname] = '';
      }
    });

    return {
      advanced: false,
      moment,
      dateFormat: 'YYYY-MM-DD',
      searchVal: searchVal,
      oldSearch: JSON.parse(JSON.stringify(searchVal)),
      formatDate,
      daterange: daterange,
      dates: dates,
      oldDateRange: oldDateRange,
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
      this.daterange = this.oldDateRange;
      this.dates = this.oldDate;
      this.changeTable('search', this.searchVal);
    },
    changeDateRange(date) {
      this.daterange = date;
      let date1 = new Date(date[0]._d);
      let date2 = new Date(date[1]._d);
      let nowdate1 = formatDate(date1, 'yyyy-mm-dd');
      let nowdate2 = formatDate(date2, 'yyyy-mm-dd');
      this.searchVal.daterangeval = [nowdate1, nowdate2];
    },
    changeDate(date) {
      console.log(date);
      this.dates = date;
      this.searchVal.dateval = formatDate(date._d, 'yyyy-mm-dd');
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ant-form-item-control-wrapper {
  width: 65%;
  display: inline-block;
  vertical-align: middle;
}
.ant-card-bordered {
  border: none;
}
.ant-form-item {
  margin-bottom: 0;
}
/deep/.ant-form-item label {
  width: 80px;
  display: inline-block;
}
</style>
