<template>
  <div class="formPage">
    <div class="forms">
      <slot name="formBox" />
    </div>
    <div class="btnbox">
      <a-button type="primary" @click="onSubmitForm">
        Create
      </a-button>
      <a-button style="margin-left: 10px;">
        Cancel
      </a-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    onSubmit: Function
  },
  methods: {
    onSubmitForm() {
      this.onSubmit();
    }
  }
};
</script>
<style lang="less" scoped></style>
