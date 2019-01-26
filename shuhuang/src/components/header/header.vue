<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="left">
        <div class="logo"
             v-if="headType === type"
             :style="{backgroundImage:'url(' + logoPath + ')'}"></div>
        <div class="content" v-else>
          <span class="icon sky-leaf leaf-youjiantou" @click="goBack"></span>
          <div class="title">
            {{title}}
          </div>
        </div>
      </div>
      <div class="right">
        <span class="icon sky-leaf leaf-yonghu"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      logoPath: require("../../assets/image/logo.png")
    };
  },
  props: {
    headType: {
      type: String
    },
    title: {
      type: String,
      defalut: ""
    }
  },
  computed: {
    ...mapState({
      type: state => state.header.type
    })
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/header.scss";
</style>
