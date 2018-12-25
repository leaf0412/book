<template>
  <div class="home">
    <m-down-scroll ref="downScroll"
                   :parentPullUpState="pullUpState"
                   :isStop="isStop"
                   :onInfiniteLoad="getMore">
      <m-header :headtype="1"></m-header>
      <m-nav></m-nav>
      <m-swiper></m-swiper>
      <m-list v-for="(item, index) in homeList"
              :list="item"
              :key="index"></m-list>
    </m-down-scroll>
  </div>
</template>

<script>
// @ is an alias to /src
import MHeader from "@/components/header/header.vue";
import MNav from "@/components/nav/nav.vue";
import MSwiper from "@/components/swiper/swiper.vue";
import MDownScroll from "@/components/scroll/pullUpReload.vue";
import MList from "@/components/list/list.vue";
import { homeList } from "@/interface/home.js";
export default {
  name: "home",
  data() {
    return {
      homeList: {},
      pullUpState: 0,
      isStop: false,
      page: 1,
    };
  },
  components: {
    MHeader,
    MNav,
    MSwiper,
    MList,
    MDownScroll
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let { code, list } = await homeList();
      if (code === 0) {
        this.homeList = list;
      }
    },
    async getMore() {
      let pararms = {
        page: ++this.page
      };
      let { code, list } = await homeList(pararms);
      if (code === 0) {
        this.homeList.push(...list);
        if (this.homeList.length >= 50) {
          this.isStop = true;
          this.pullUpState = 3;
        }
      }
    }
  }
};
</script>
