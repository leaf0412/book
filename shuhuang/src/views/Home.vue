<template>
  <transition name="shift-left">
    <div class="home">
      <m-up-scroll ref="upScroll"
                   :isStop="isStop"
                   :onInfiniteLoad="getMore">
          <m-down-scroll ref="downScroll"
                         :defaultOffset="50"
                         :onInfiniteLoad="_refresh">
            <m-list v-for="(item, index) in homeList"
                    :list="item"
                    :key="index"></m-list>
          </m-down-scroll>
      </m-up-scroll>
    </div>
  </transition>
</template>

<script>
import MList from "@/components/list/list.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    MList
  },
  computed: {
    ...mapState({
      homeList: state => state.home.homeList,
      isStop: state => state.home.isStop,
      refresh: state => state.home.refresh
    })
  },
  mounted() {
    this.updataHomeList();
  },
  methods: {
    ...mapActions(["updataHomeList"]),
    async _refresh() {
      await this.updataHomeList(this.refresh);
    },
    async getMore() {
      await this.updataHomeList();
    }
  }
};
</script>
