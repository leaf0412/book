<template>
  <div class="nav">
    <div class="menu">
      <div class="item"
           :class="`${activePath}` === item.to && 'active'"
           @click="goto(item)"
           v-for="(item, index) in menuList"
           :key="index">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePath: this.$route.path,
      menuList: [
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
  methods: {
    goto(item) {
      this.$router.push({
        path: item.to
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/nav.scss";
</style>
