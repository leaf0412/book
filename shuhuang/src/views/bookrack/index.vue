<template>
  <transition name="shift-left">
    <div class="bookrack">
      <div class="main">
        <div class="bg">
          <div class="imgList">
            <img :src="imgsrc" width="100%">
            <div class="txt">书籍名称</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "bookrack",
  data() {
    return {
      imgsrc: require("@/assets/image/nopic.png"),
      he: "120px"
    };
  },
  components: {},
  computed: {
    ...mapState({})
  },
  mounted() {},
  methods: {
    ...mapActions([])
  }
};
</script>

<style lang="scss" scoped>
.bookrack {
  .main {
    padding: 20px 0;
    .bg {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      justify-content: space-evenly;
      box-sizing: border-box;
      .imgList {
        width: px2rem(100);
        margin: px2rem(10);
        box-shadow: 1px 3px 25px 5px rgba(0, 0, 0, .5);
        box-sizing: border-box;
        .txt {
          width: inherit;
          padding: px2rem(10) 0;
          text-align: center;
          font-size: px2rem(15);
          @include ell();
        }
      }
    }
  }
}
</style>
