<template>
  <div class="home">
    <m-header :headtype="1"></m-header>
    <m-nav></m-nav>
    <m-swiper></m-swiper>
  </div>
</template>

<script>
// @ is an alias to /src
import MHeader from "@/components/header/header.vue";
import MNav from "@/components/nav/nav.vue";
import MSwiper from "@/components/swiper/swiper.vue";

export default {
  name: "home",
  components: {
    MHeader,
    MNav,
    MSwiper
  }
};
</script>
