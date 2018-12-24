<template>
  <div class="nav">
    <div class="menu">
      <div class="item"
           :class="`/${activePath}` === item.to && 'active'"
           v-for="(item, index) in menuList"
           :key="index">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePath: this.$route.name,
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
          name: "免费",
          to: "/free"
        },
        {
          id: 4,
          name: "书架",
          to: "/bookrack"
        }
      ]
    };
  },
  mounted() {},
  computed: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/nav.scss";
</style>
