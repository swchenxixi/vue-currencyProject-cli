<template>
  <div class="center">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
