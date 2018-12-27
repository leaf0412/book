<template>
  <div class="home">
    <m-up-scroll ref="upScroll"
                 :isStop="isStop"
                 :parentPullUpState="2"
                 :onInfiniteLoad="getMore">
      <m-down-scroll ref="downScroll"
                     :defaultOffset="50"
                     :onInfiniteLoad="refresh">
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
import { mapState, mapActions } from "vuex";
import MHeader from "@/components/header/header.vue";
import MNav from "@/components/nav/nav.vue";
import MList from "@/components/list/list.vue";
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    MHeader,
    MNav,
    MList
  },
  computed: {
    ...mapState({
      homeList: state => state.home.homeList,
      isStop: state => state.home.isStop
    })
  },
  mounted() {
    this.updataHomeList();
  },
  methods: {
    ...mapActions(["updataHomeList"]),
    async refresh() {
      await this.updataHomeList("refresh");
    },
    async getMore() {
      await this.updataHomeList();
    }
  }
};
</script>
