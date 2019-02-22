<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="left">
        <div class="logo" :title="headType" v-if="headType === type">
          {{ logoTxt }}
        </div>
        <div class="content" v-else>
          <span class="icon sky-leaf leaf-youjiantou" @click="goBack"></span>
          <div class="title">
            {{ title }}
          </div>
        </div>
      </div>
      <div class="right">
        <span @click="getUserInfo" class="icon sky-leaf leaf-yonghu"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // logoPath: require("../../assets/image/logo.png"),
      logoTxt: "书荒典"
    };
  },
  props: {
    headType: {
      type: String,
      defalut: ""
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
      this.$router.back();
    },
    getUserInfo() {
      const option = {
        mes: "敬请期待"
      };
      this.$toast(option);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/header.scss";
</style>
