<template>
  <div class="nav">
    <div class="menu">
      <div class="item"
           :class="`${activePath}` === item.to && 'active'"
           @click="goto(item)"
           v-for="(item, index) in list"
           :key="index">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activePath: {
      type: String,
      default: ""
    },
    list: {
      type:Array,
      default: ()=> []
    }
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
