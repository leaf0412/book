<template>
  <div class="header">
    <div class="header-wrapper"
         v-if="headtype === 1">
      <div class="left">
        <div class="logo"
             :style="{backgroundImage:'url(' + logoPath + ')'}"></div>
      </div>
      <div class="right">
        <span class="icon sky-leaf leaf-fangdajing"></span>
        <span class="icon sky-leaf leaf-yonghu"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoPath: require("../../assets/image/logo.png")
    };
  },
  props: {
    headtype: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/header.scss";
</style>
