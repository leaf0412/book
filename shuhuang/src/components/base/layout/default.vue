<template>
  <div v-if="show">
    <m-header :headType="headType"></m-header>
    <m-nav :activePath="activePath"
           :list="list"></m-nav>
    <!-- <slot></slot> -->
  </div>
</template>

<script>
import MHeader from "@/components/header/header.vue";
import MNav from "@/components/nav/nav.vue";
import { mapState } from "vuex";
export default {
  name: "MLayout",
  data() {
    return {
      activePath: "",
      show: true,
      list: [
        {
          id: 1,
          name: "精选",
          to: "/home"
        },
        {
          id: 2,
          name: "分类",
          to: "/category"
        },
        {
          id: 3,
          name: "书架",
          to: "/bookrack"
        },
        {
          id: 4,
          name: "搜索",
          to: "/search"
        }
      ]
    };
  },
  components: {
    MHeader,
    MNav
  },
  computed: {
    ...mapState({
      headType: state => state.header.type
    })
  },
  watch: {
    $route() {
      this.activePath = this.$route.path;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].to == this.activePath) {
          return (this.show = true);
        } else {
          this.show = false;
        }
      }
    }
  }
};
</script>
