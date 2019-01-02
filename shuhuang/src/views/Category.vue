<template>
  <div class="home">
    <m-up-scroll ref="upScroll"
                 :isStop="isStop"
                 :parentPullUpState="2"
                 :onInfiniteLoad="getMore">
      <m-down-scroll ref="downScroll"
                     :defaultOffset="50"
                     :onInfiniteLoad="refresh">
        <m-layout>
          <m-swiper></m-swiper>
          <m-list v-for="(item, index) in homeList"
                  :list="item"
                  :key="index"></m-list>
        </m-layout>
      </m-down-scroll>
    </m-up-scroll>
    <back-top></back-top>
  </div>
</template>

<script>
import MList from "@/components/list/list.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "category",
  data() {
    return {};
  },
  components: {
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
