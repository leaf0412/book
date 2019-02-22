<template>
  <div class="back-top" v-if="show">
    <span class="btn" @click="goTop">
      回到顶部
    </span>
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {
      show: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.needScroll);
  },
  methods: {
    needScroll() {
      let clientHeight = document.documentElement.clientHeight;
      let osTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (osTop >= clientHeight) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    goTop() {
      let timer;
      timer = setInterval(function() {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (osTop === 0) {
          clearInterval(timer);
        }
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
      }, 30);
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.needScroll);
  }
};
</script>

<style lang="scss" scoped>
.back-top {
  position: fixed;
  bottom: px2rem(10);
  right: px2rem(10);
  z-index: 100;
  .btn {
    display: inline-block;
    padding: px2rem(10);
    text-align: center;
    border-radius: 50%;
    background: #8bb1c2;
    color: #fff;
    font-size: px2rem(10);
    cursor: pointer;
  }
}
</style>
