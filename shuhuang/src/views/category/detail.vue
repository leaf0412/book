<template>
  <transition name="zoom">
    <div class="detail">
      <m-header :title="title"></m-header>
      <m-up-scroll ref="upScroll"
                   :isStop="isStop"
                   :onInfiniteLoad="getList">
        <m-list v-for="(item, index) in booksData"
                :list="item"
                :key="index"></m-list>
      </m-up-scroll>
    </div>
  </transition>
</template>

<script>
import MHeader from "@/components/header/header.vue";
import MList from "@/components/list/list.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "categoryDetail",
  data() {
    return {
      title: ""
    };
  },
  components: {
    MList,
    MHeader
  },
  computed: {
    ...mapState({
      booksData: state => state.category.booksData,
      refresh: state => state.category.refresh,
      isStop: state => state.category.isStop
    })
  },
  activated() {
    this.getList(this.refresh);
  },
  mounted() {
    this.getList(this.refresh);
  },
  methods: {
    ...mapActions(["getBooksData"]),
    async getList(refresh) {
      this.title = this.$route.query.title;
      await this.getBooksData({ type: this.title, refresh });
    }
  },
  watch: {}
};
</script>
