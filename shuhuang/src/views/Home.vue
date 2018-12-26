<template>
  <div class="home">
    <m-up-scroll ref="upScroll"
                 :isStop="isStop"
                 :parentPullUpState="2"
                 :onInfiniteLoad="getMore">
      <m-down-scroll ref="downScroll"
                     :defaultOffset="50"
                     :onInfiniteLoad="getMore">
        <m-header :headtype="1"></m-header>
        <m-nav></m-nav>
        <m-swiper></m-swiper>
        <m-list v-for="(item, index) in homeList"
                :list="item"
                :key="index"></m-list>
      </m-down-scroll>
    </m-up-scroll>
    <back-top></back-top>
  </div>
</template>

<script>
import MHeader from "@/components/header/header.vue";
import MNav from "@/components/nav/nav.vue";
import MList from "@/components/list/list.vue";
import { homeList } from "@/interface/home.js";
export default {
  name: "home",
  data() {
    return {
      homeList: {},
      isStop: false,
      page: 1
    };
  },
  components: {
    MHeader,
    MNav,
    MList
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
        this.homeList.unshift(...list);
        if (this.homeList.length >= 50) {
          this.isStop = true;
        }
      }
    }
  }
};
</script>
