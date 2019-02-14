<template>
  <transition name="zoom">
    <div class="book-content">
      <transition name="zoom">
        <div class="top-warpper"
             v-show="show">
          <div class="left">
            <span class="icon sky-leaf leaf-youjiantou"
                  @click="goBack"></span>
          </div>
          <div class="right">
            <button @click="_addBookrack"
                    class="btn primary">加入书架</button>
          </div>
        </div>
      </transition>
      <div class="content"
           @click="menuShow"
           :style="{fontSize: fontSize+'px'}"
           v-html="content"></div>
      <transition name="zoom">
        <div class="footer-warpper"
             v-show="show">
          <div class="font">
            <span class="text">{{fontSize}}</span>
            <span class="add"
                  @click="addFontSize">A+</span>
            <span class="reduce"
                  @click="reduceFontSize">A-</span>
          </div>
          <div class="bg">
            <span class="item" v-for="(item, index) in bgList"
                  :key="index"
                  :style="{backgroundColor: item.bgColor}"></span>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "bookContent",
  data() {
    return {
      show: false,
      fontSize: 16,
      bgList: [
        {
          bgColor: "#fff"
        },
        {
          bgColor: "#0ff"
        },
        {
          bgColor: "#f0f"
        },
        {
          bgColor: "#ff0"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      content: state => state.bookContent.content
    })
  },
  mounted() {
    this._getContent();
  },
  methods: {
    ...mapActions(["getBookContent"]),
    _getContent() {
      const parmas = this.$route.query;
      this.show = false;
      if (parmas.id) this.getBookContent(parmas);
    },
    menuShow() {
      this.show = !this.show;
    },
    goBack() {
      this.$router.back();
    },
    _addBookrack() {
      const option = {
        mes: "加入书架成功"
      };
      this.$toast(option);
    },
    addFontSize() {
      if (this.fontSize < 30) {
        this.fontSize++;
      }
    },
    reduceFontSize() {
      if (this.fontSize > 12) {
        this.fontSize--;
      }
    }
  },
  watch: {
    $route() {
      this._getContent();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/button.scss";
.book-content {
  position: relative;
  .top-warpper {
    position: fixed;
    top: 0;
    width: 100%;
    height: px2rem(50);
    line-height: px2rem(50);
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: space-between;
    align-content: center;
    box-sizing: border-box;
    z-index: 1000;
    .left {
      .icon {
        display: inline-block;
        font-size: px2rem(26);
        transform: rotate(180deg);
        color: #fff;
      }
    }
  }
  .content {
    line-height: px2rem(30);
    // font-size: px2rem(16);
    padding: px2rem(10) px2rem(20);
  }
  .footer-warpper {
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    height: px2rem(100);
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 1px 1px#000;
    z-index: 1000;
    .font {
      height: px2rem(40);
      line-height: px2rem(40);
      font-size: px2rem(20);
      color: #fff;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      .text {
        flex: 0 px2rem(50);
        text-align: center;
        border-right: 1px solid #f5f5f5;
      }
      .add {
        border-right: 1px solid #f5f5f5;
      }
      .add,
      .reduce {
        flex: auto;
        text-align: center;
      }
    }
    .bg{
      height: px2rem(40);
      line-height: px2rem(40);
      display: flex;
      justify-content: space-around;
      align-items: center;
      .item {
        display: block;
        width: px2rem(40);
        height: px2rem(20);
      }
    }
  }
}
</style>
