<template>
  <div class="loadMoudle"
       @touchstart="touchStart($event)"
       @touchmove="touchMove($event)"
       :style="{transform: 'translate3d(0,' + top + 'px, 0)'}">
    <slot></slot>
    <footer class="load-more">
      <slot name="load-more">
        <div class="moreData-tip"
             v-if="pullUpState===1">
          <span class="moreData-tip-text">{{ moreDataTxt }}</span>
        </div>
        <div class="loadingMoreData-tip"
             v-if="pullUpState===2">
          <span class="icon-loading"></span>
          <span class="loadingMoreData-tip-text">{{ loadingMoreDataTxt }}</span>
        </div>
        <div class="noMoreData-tip"
             v-if="pullUpState===3">
          <span class="connectingLine"></span>
          <span class="noMoreData-tip-text">{{ noMoreDataTxt }}</span>
          <span class="connectingLine"></span>
        </div>
      </slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "MUpScroll",
  props: {
    parentPullUpState: {
      type: Number,
      default: 0
    },
    onInfiniteLoad: {
      type: Function,
      require: false
    },
    isStop: {
      type: Boolean,
      default: false
    },
    moreDataTxt: {
      type: String,
      default: "上拉加载更多"
    },
    loadingMoreDataTxt: {
      type: String,
      default: "加载中..."
    },
    noMoreDataTxt: {
      type: String,
      default: "我是有底线的"
    }
  },
  data() {
    return {
      top: 0,
      startY: 0,
      pullUpState: 1, // 1:上拉加载更多, 2:加载中……, 3:我是有底线的
      isLoading: false // 是否正在加载
    };
  },
  methods: {
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY;
    },
    touchMove(e) {
      if (e.targetTouches[0].pageY < this.startY) {
        // 上拉
        this.judgeScrollBarToTheEnd();
      }
    },
    // 判断滚动条是否到底
    judgeScrollBarToTheEnd() {
      let innerHeight = document.querySelector(".loadMoudle").clientHeight;
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      // 变量scrollHeight是滚动条的总高度
      let scrollHeight =
        // 屏幕可用工作区 高度
        window.screen.availHeight ||
        document.documentElement.clientHeight ||
        document.body.scrollHeight;
      // 滚动条到底部的条件
      if (scrollTop + scrollHeight >= innerHeight) {
        if (this.pullUpState !== 3 && !this.isLoading) {
          this.pullUpState = 1;
          this.infiniteLoad();
        }
      }
    },
    async infiniteLoad() {
      this.pullUpState = 2;
      this.isLoading = true;
      await this.onInfiniteLoad();
      if (this.isStop) {
        this.pullUpState = 3;
        this.isLoading = false;
        return;
      }
      this.infiniteLoadDone();
    },
    infiniteLoadDone() {
      this.pullUpState = 1;
      this.isLoading = false;
    }
  },
  watch: {
    parentPullUpState(curVal, oldVal) {
      console.log(oldVal)
      console.log(curVal)
      this.pullUpState = curVal;
    }
  }
};
</script>

<style scoped>
.load-more {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.load-more::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.moreData-tip,
.loadingMoreData-tip,
.noMoreData-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
}
.loadMoudle .icon-loading {
  display: inline-flex;
  width: 35px;
  height: 35px;
  background: #c0c0c0;
  margin-right: 5px;
  animation: rotating 2s linear infinite;
}
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(1turn);
  }
}
.connectingLine {
  display: inline-flex;
  width: 100px;
  height: 2px;
  background: #ddd;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
