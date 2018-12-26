<template>
  <div class="loadMoudle"
       @touchstart="touchStart($event)"
       @touchmove="touchMove($event)"
       @touchend="touchEnd($event)"
       :style="{transform: 'translate3d(0,' + top + 'px, 0)'}">
    <header class="load-more">
      <slot name="load-more">
        <div class="drow-tip"
             v-if="dropDownState===1"
             :style="{ height: defaultOffset+'px' }">
          <span class="drow-tip-text">{{ drowTxt }}</span>
        </div>
        <div class="refresh-tip"
             v-if="dropDownState===2"
             :style="{ height: defaultOffset+'px' }">
          <span class="refresh-tip-text">{{ refreshTxt }}</span>
        </div>
        <div class="loading-tip"
             v-if="dropDownState===3"
             :style="{ height: defaultOffset+'px' }">
          <span class="icon-loading"></span>
          <span class="loading-tip-text">{{ loadingTxt }}</span>
        </div>
      </slot>
    </header>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MDownScroll",
  props: {
    onInfiniteLoad: {
      type: Function,
      require: false
    },
    defaultOffset: {
      type: Number,
      default: 30
    },
    drowTxt: {
      type: String,
      default: "下拉刷新"
    },
    loadingTxt: {
      type: String,
      default: "刷新中..."
    },
    refreshTxt: {
      type: String,
      default: "松开刷新"
    }
  },
  data() {
    return {
      top: 0,
      scrollIsToTop: 0,
      startY: 0,
      isDropDown: false, // 是否下拉
      isRefreshing: false, // 是否正在刷新
      dropDownState: 0 // 显示1:下拉刷新, 2:松开刷新, 3:刷新中……
    };
  },
  created() {
    this.$nextTick(() => {
      // 获取不同手机的物理像素（dpr）,以便适配rem
      this.defaultOffset =
        document.querySelector(".load-more").clientHeight || this.defaultOffset;
    });
  },
  methods: {
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY;
    },
    touchMove(e) {
      this.scrollIsToTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop; // safari 获取scrollTop用window.pageYOffset
      if (e.targetTouches[0].pageY > this.startY) {
        // 下拉
        this.isDropDown = true;
        if (this.scrollIsToTop === 0 && !this.isRefreshing) {
          // 拉动的距离
          let diff =
            e.targetTouches[0].pageY - this.startY - this.scrollIsToTop;
          this.top =
            Math.pow(diff, 0.8) +
            (this.dropDownState === 3 ? this.defaultOffset : 0);
          if (this.top >= this.defaultOffset) {
            this.dropDownState = 2;
            e.preventDefault();
          } else {
            this.dropDownState = 1;
            e.preventDefault();
          }
        }
      } else {
        this.isDropDown = false;
        this.dropDownState = 0;
        this.top = 0;
      }
    },
    touchEnd() {
      if (this.isDropDown && !this.isRefreshing) {
        if (this.top >= this.defaultOffset) {
          // do refresh
          this.refresh();
          this.isRefreshing = true;
          // console.log(`do refresh`);
        } else {
          // cancel refresh
          this.isRefreshing = false;
          this.isDropDown = false;
          this.dropDownState = 0;
          this.top = 0;
        }
      }
    },
    async refresh() {
      this.dropDownState = 3;
      await this.onInfiniteLoad();
      await this.refreshDone();
    },
    refreshDone() {
      this.isRefreshing = false;
      this.isDropDown = false;
      this.dropDownState = 1;
      this.top = "-" + this.defaultOffset;
    }
  }
};
</script>

<style scoped>
.loadMoudle {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch; /* ios5+ */
}

.load-more {
  width: 100%;
  transition-duration: 200ms;
}

.drow-tip,
.loading-tip,
.refresh-tip {
  display: flex;
  align-items: center;
  justify-content: center;
}
.loadMoudle .icon-loading {
  display: inline-flex;
  padding: 10px;
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
</style>
