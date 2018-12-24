<template>
  <div class="home">
    <m-header :headtype="1"></m-header>
    <m-nav></m-nav>
    <m-swiper></m-swiper>
    <m-list v-for="(item, index) in homeList" :list="item" :key="index"></m-list>
  </div>
</template>

<script>
// @ is an alias to /src
import MHeader from "@/components/header/header.vue";
import MNav from "@/components/nav/nav.vue";
import MSwiper from "@/components/swiper/swiper.vue";
import MList from "@/components/list/list.vue";
import { homeList } from "@/interface/home.js";
export default {
  name: "home",
  data() {
    return {
      homeList: {}
    }
  },
  components: {
    MHeader,
    MNav,
    MSwiper,
    MList
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let { code, list } = await homeList();
      alert(list);
      if (code === 0) {
        this.homeList = list;
      }
    }
  }
};
</script>
