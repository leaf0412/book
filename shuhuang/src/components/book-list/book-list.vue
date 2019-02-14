<template>
  <div class="book-list" @click="goto(list)">
    <div class="title">{{list.title}}</div>
    <div class="time">{{time}}</div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    time() {
      let time = "";
      let listTime = this.list.time;
      if (listTime) {
        let date = new Date(listTime); 
        let YY = date.getFullYear();
        let MM = date.getMonth() + 1;
        let DD = date.getDate();
        time = YY + "-" + MM + "-" + DD;  
      }
      return time;
    }
  },
  data() {
    return {};
  },
  methods: {
    goto(item) {
      this.$router.push({
        path: "/bookContent",
        query: {
          id: item.id
        }
      })
    }
  }
};
</script>

<style lang='scss' scoped>
.book-list {
  display: flex;
  justify-content: space-between;
  padding: px2rem(10) 0;
  .title {
    font-size: px2rem(16);
    width: px2rem(250);
    @include ell();
  }
  .time {
    font-size: px2rem(14);
    width: px2rem(80);
    text-align: center;
  }
}
</style>
