<template>
  <div class="item">
    <div class="img"></div>
    <div class="info">
      <div class="title"></div>
      <div class="description"></div>
      <div class="foot">
        <div class="author"></div>
        <ul class="category">
          <li class="category-item"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {}
}

</script>
<style lang='scss' scoped>
.item{
  display: flex;
  justify-content: flex-start;
  .img {
    flex: 0 2rem;
    width: 2rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>
