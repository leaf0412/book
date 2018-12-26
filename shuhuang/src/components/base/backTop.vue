<template>
  <div class="back-top"
       v-if="show">
    <span class="btn"
          @click="goTop">
      回到顶部
    </span>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
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

<style scoped>
.back-top {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 100;
}
.back-top .btn {
  display: inline-block;
  padding: 10px;
  text-align: center;
  border-radius: 50%;
  background: #8bb1c2;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}
</style>
