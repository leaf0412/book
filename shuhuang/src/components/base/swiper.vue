<template>
  <div class="swiper-warpper">
    <swiper class="swiper"
            :options="swiperOption">
      <swiper-slide class="item">
        广告轮播图
      </swiper-slide>
      <div class="swiper-pagination"
           slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "MSwiper",
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        autoplay: {
          stopOnLastSlide: true,
          delay: 5000
        },
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.swiper-warpper {
  .swiper {
    .item {
      text-align: center;
      color: #fff;
      font-size: 1rem;
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      background: #d4d4d4;
    }
  }
  .swiper-pagination {
    .swiper-pagination-bullet {
      display: inline-block;
      padding: 0.5rem;
    }
  }
}
</style>
