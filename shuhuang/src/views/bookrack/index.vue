<template>
  <transition name="shift-left">
    <div class="bookrack">
      <div class="main">
        <template v-if="bookList.length > 0">
          <div class="bg"
               v-for="item in bookList"
               :key="item.title">
            <div class="imgList"
                 :title="item.title"
                 @click="goto(item)">
              <img v-lazy="item.pic"
                   width="100%">
              <div class="txt">{{item.title}}</div>
            </div>
          </div>
        </template>
        <div class="empty"
             v-else>
          <router-link class="back"
                       :to="{path:'/'}">返回精选</router-link>
          <div class="txt">
            请阅读书籍后并添加到书架中
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
    };
  },
  components: {},
  computed: {
    ...mapState({
      bookList: state => state.bookrack.bookList
    })
  },
  mounted() {
    this.getBookrackList();
  },
  activated() {
    this.getBookrackList();
  },
  methods: {
    ...mapActions(["getBookrackList"]),
    goto(item) {
      this.$router.push({
        path: "/book",
        query: {
          bookid: item.bookid
        }
      });
    }
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
      justify-content: space-between;
      box-sizing: border-box;
      .imgList {
        width: px2rem(100);
        margin: px2rem(10);
        box-shadow: 1px 3px 25px 5px rgba(0, 0, 0, 0.5);
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
    .empty {
      text-align: center;
      font-size: px2rem(20);
      .back {
        color: #fc6e51;
      }
      .txt{
        margin: px2rem(10) 0;
      }
    }
  }
}
</style>
