<template>
  <transition name="zoom">
    <div class="book-content">
      <transition name="zoom">
        <div class="top-warpper" v-show="show">
          <div class="left">
            <span class="icon sky-leaf leaf-youjiantou" @click="goBack"></span>
          </div>
          <div class="right">
            <audio id="mp3Btn" :src="audioSrc"></audio>
            <button @click="play" class="btn primary">
              播放本章
            </button>
            <button @click="_addBookrack" class="btn primary">
              {{ buttonText }}
            </button>
          </div>
        </div>
      </transition>
      <div
        class="content-warpper"
        @click="menuShow"
        :style="{ backgroundColor: bgColor, color: color }"
      >
        <div class="title" :style="{ fontSize: fontSize + 4 + 'px' }">
          {{ title }}
        </div>
        <div
          class="content"
          ref="Content"
          :style="{ fontSize: fontSize + 'px' }"
          v-html="content"
        ></div>
        <div class="chapter">
          <button class="btn primary isplain" @click.stop="pervPage">
            上一章
          </button>
          <button class="btn primary isplain" @click.stop="nextPage">
            下一章
          </button>
        </div>
      </div>
      <transition name="zoom">
        <div class="footer-warpper" v-show="show">
          <div class="chapter">
            <div class="pervChapter" @click="pervPage">
              <span class="icon sky-leaf leaf-youjiantou"></span>
              上一章
            </div>
            <div class="allChapter">全部章节</div>
            <div class="nextChapter" @click="nextPage">
              下一章
              <span class="icon sky-leaf leaf-youjiantou"></span>
            </div>
          </div>
          <div class="font">
            <span class="text">{{ fontSize }}</span>
            <span class="add" @click="addFontSize">A+</span>
            <span class="reduce" @click="reduceFontSize">A-</span>
          </div>
          <div class="bg">
            <span
              class="item"
              v-for="(item, index) in bgList"
              :key="index"
              @click="changeBgColor(item)"
              :style="{ backgroundColor: item.bgColor, color: item.color }"
              >{{ item.txt }}</span
            >
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "bookContent",
  data() {
    return {
      show: false,
      fontSize: "",
      bgColor: "",
      color: "",
      bgList: [
        {
          bgColor: "rgb(240,240,230)",
          color: "rgb(90,55,20)",
          txt: "白天"
        },
        {
          bgColor: "rgb(200,225,200)",
          color: "rgb(0,60,20)",
          txt: "护眼"
        },
        {
          bgColor: "rgb(255,185,185)",
          color: "rgb(215,60,60)",
          txt: "女生"
        },
        {
          bgColor: "rgb(0,0,0)",
          color: "rgb(85,85,85)",
          txt: "夜间"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      title: state => state.bookContent.title,
      buttonText: state => state.bookContent.buttonText,
      bookid: state => state.bookContent.bookid,
      content: state => state.bookContent.content,
      bookinfo: state => state.bookContent.bookinfo,
      audioSrc: state => state.bookContent.audioSrc
    })
  },
  mounted() {
    if (!localStorage.bcontent) {
      let bcontent = {
        bgColor: "rgb(240,240,230)",
        color: "rgb(90,55,20)",
        fontSize: 16
      };
      localStorage.bcontent = JSON.stringify(bcontent);
    }
    this._getContent();
  },
  methods: {
    ...mapActions(["getBookContent", "getBookAudio"]),
    ...mapMutations(["changeButtonText", "changeBookAudio"]),
    _getContent() {
      const parmas = this.$route.query;
      this.show = false;
      let bcontent = localStorage.bcontent;
      bcontent = JSON.parse(bcontent);
      this.fontSize = bcontent.fontSize;
      this.bgColor = bcontent.bgColor;
      this.color = bcontent.color;
      if (parmas.id) this.getBookContent(parmas);
    },
    menuShow() {
      this.show = !this.show;
    },
    goBack() {
      this.$router.back();
    },
    _addBookrack() {
      let bookrackList = localStorage.bookrackList || "[]";
      const option = {};
      bookrackList = JSON.parse(bookrackList);
      let flag = bookrackList.some(v => v === this.bookid);
      if (!flag) {
        bookrackList.push(this.bookid);
        option.mes = "添加书架成功";
        this.changeButtonText("取消书架");
      } else {
        bookrackList = bookrackList.filter(v => v !== this.bookid);
        option.mes = "取消书架成功";
        this.changeButtonText("添加书架");
      }
      localStorage.bookrackList = JSON.stringify(bookrackList);
      this.$toast(option);
    },
    // 字体大小
    addFontSize() {
      if (this.fontSize < 30) {
        this.fontSize++;
      }
      this.saveFontSize();
    },
    reduceFontSize() {
      if (this.fontSize > 12) {
        this.fontSize--;
      }
      this.saveFontSize();
    },
    saveFontSize() {
      let bcontent = localStorage.bcontent;
      bcontent = JSON.parse(bcontent);
      bcontent.fontSize = this.fontSize;
      localStorage.bcontent = JSON.stringify(bcontent);
    },
    // 改变背景颜色
    changeBgColor(data) {
      let bcontent = localStorage.bcontent;
      bcontent = JSON.parse(bcontent);
      this.bgColor = data.bgColor;
      bcontent.bgColor = data.bgColor;
      this.color = data.color;
      bcontent.color = data.color;
      localStorage.bcontent = JSON.stringify(bcontent);
    },
    pervPage() {
      if (this.bookinfo) {
        if (this.bookinfo.sequence === 0) {
          this.$toast({ mes: "已经是第一章了" });
        } else {
          this.$router.replace({
            path: "/bookContent",
            query: {
              id: parseInt(this.bookinfo.id) - 1
            }
          });
        }
      } else {
        this.$toast({ mes: "暂无章节" });
        this.goBack();
      }
    },
    nextPage() {
      if (this.bookinfo) {
        this.$router.replace({
          path: "/bookContent",
          query: {
            id: parseInt(this.bookinfo.id) + 1
          }
        });
      } else {
        this.$toast({ mes: "暂无章节" });
        this.goBack();
      }
    },
    async play() {
      if (this.bookinfo) {
        let parmas = {
          title: this.title,
          content: this.$refs.Content.innerText
        };
        this.changeBookAudio("");
        const result = await this.getBookAudio(parmas);
        if (result) {
          document.getElementById("mp3Btn").play();
        }
      } else {
        this.$toast({ mes: "暂无章节" });
        this.goBack();
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
  // overflow: hidden;
  // position: relative;
  // height: 100%;
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
        color: #aeadab;
      }
    }
  }
  .content-warpper {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    z-index: 999;
    .title {
      flex: auto;
      text-align: center;
      padding: px2rem(10);
    }
    .content {
      flex: 1;
      line-height: px2rem(30);
      padding: px2rem(10) px2rem(20);
      overflow: hidden;
    }
    .chapter {
      flex: auto;
      display: flex;
      height: px2rem(40);
      line-height: px2rem(40);
      justify-content: space-between;
      padding: px2rem(20);
      font-size: px2rem(20);
      .allChapter {
        flex: 0 px2rem(100);
        text-align: center;
      }
      .pervChapter,
      .nextChapter {
        flex: auto;
      }
    }
  }
  .footer-warpper {
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    height: px2rem(130);
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 1px 1px#000;
    z-index: 1000;
    .chapter {
      display: flex;
      height: px2rem(40);
      line-height: px2rem(40);
      justify-content: space-between;
      font-size: px2rem(20);
      border-bottom: 1px solid #f5f5f5;
      color: #aeadab;
      .pervChapter {
        border-right: 1px solid #f5f5f5;
        .icon {
          display: inline-block;
          transform: rotate(180deg);
          color: #aeadab;
        }
      }
      .allChapter {
        flex: 0 px2rem(100);
        border-right: 1px solid #f5f5f5;
        text-align: center;
      }
      .pervChapter,
      .nextChapter {
        flex: auto;
        text-align: center;
      }
    }
    .font {
      height: px2rem(40);
      line-height: px2rem(40);
      font-size: px2rem(20);
      color: #aeadab;
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
    .bg {
      height: px2rem(40);
      line-height: px2rem(40);
      display: flex;
      justify-content: space-around;
      align-items: center;
      .item {
        display: block;
        width: px2rem(60);
        height: px2rem(30);
        line-height: px2rem(30);
        text-align: center;
        border-radius: px2rem(10);
      }
    }
  }
}
</style>
