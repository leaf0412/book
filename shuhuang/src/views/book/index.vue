<template>
  <transition name="left">
    <div class="book">
      <m-header :title="bookInfo.title"></m-header>

      <!-- 书籍的信息 -->
      <div class="top-warpper">
        <div class="bookInfo">
          <div :style="{ backgroundImage: 'url(' + bookInfo.pic +')' }"
               class="img"></div>
          <div class="info">
            <div class="item title">{{bookInfo.title}}</div>
            <div class="item author">{{bookInfo.author}}</div>
            <div class="item">{{bookInfo.category}} - {{bookInfo.isover}}</div>
          </div>
        </div>
        <div class="desc">
          <span class="text">内容简介：</span>
          <span class="content">
            {{desc}}
          </span>
          <span class=""
                @click="lookMore"
                v-show="show">{{toggle}}</span>
        </div>
      </div>

      <!-- 书籍最新章节 -->
      <div class="now">
        <div class="title">目录</div>
        <book-list v-for="(item, index) in bookInfo.sectionList"
                   :key="index"
                   :list="item"></book-list>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MHeader from "@/components/header/header.vue";
import BookList from "@/components/book-list/book-list.vue";

export default {
  name: "book",
  data() {
    return {
      emtry: require("../../assets/image/nopic.png"),
      toggle: "查看更多>>>",
      show: true
    };
  },
  components: {
    MHeader,
    BookList
  },
  computed: {
    ...mapState({
      bookInfo: state => state.book.bookInfo
    }),
    desc() {
      let str = "";
      if (this.bookInfo.desc) {
        let { desc } = this.bookInfo;
        str = desc;
        if (this.show) {
          if (desc.length >= 60) {
            str = desc.substring(0, 60);
          }
        }
      }
      return str;
    }
  },
  mounted() {
    this._getBook();
  },
  methods: {
    ...mapActions(["getBooks"]),
    _getBook() {
      let book = this.$route.query;
      if (book.bookid) {
        this.getBooks(book);
        this.show = true;
      }
    },
    lookMore() {
      this.show = false;
    }
  },
  watch: {
    $route() {
      this._getBook();
    }
  }
};
</script>
<style lang='scss' scoped>
.book {
  .top-warpper {
    padding: px2rem(10);
    .bookInfo {
      display: flex;
      .img {
        flex: 0 px2rem(80);
        height: px2rem(110);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .info {
        flex: 1;
        margin: 0 px2rem(10);
        .item {
          line-height: px2rem(40);
          font-size: px2rem(16);
        }
        .title {
          font-size: px2rem(20);
        }
        .author {
          font-size: px2rem(16);
        }
      }
    }
    .desc {
      margin-top: px2rem(20);
      font-size: px2rem(14);
      line-height: px2rem(20);
      .text {
        color: #333;
      }
    }
  }
  .now {
    border-top: 1px solid #ccc;
    padding: px2rem(10);
    .title {
      font-size: px2rem(18);
      padding: px2rem(10) 0;
    }
  }
}
</style>
