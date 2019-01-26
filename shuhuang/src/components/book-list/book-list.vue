<template>
  <div class="book-list">
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
        let mm = date.getMonth();
        console.log(mm);
      }
      return time;
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='scss' scoped>
.book-list {
  display: flex;
  justify-content: space-between;
  padding: px2rem(10) 0;
  .title {
    font-size: px2rem(16);
  }
}
</style>
