<template>
  <div class="item" @click="goto(list)">
    <img v-lazy="list.pic" class="img" />
    <!-- <div class="img" :style="{ backgroundImage: 'url(' + list.pic + ')' }"></div> -->
    <div class="info">
      <div class="title">{{ list.title }}</div>
      <div class="description">{{ list.desc }}</div>
      <div class="foot">
        <div class="author">
          <span class="icon sky-leaf leaf-yonghu"></span> {{ list.author }}
        </div>
        <ul class="category">
          <li class="category-item">{{ list.category }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // emtry: require("../../assets/image/nopic.png")
    };
  },
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
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
.item {
  display: flex;
  justify-content: flex-start;
  padding: px2rem(10);
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  &:last-child {
    border-bottom: none;
  }
  .img {
    margin: px2rem(10);
    flex: 0 px2rem(80);
    height: px2rem(110);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .info {
    flex: 1;
    padding: px2rem(5) 0;
    .title {
      font-size: px2rem(16);
      line-height: px2rem(30);
      @include ell();
    }
    .description {
      margin: px2rem(5) 0 px2rem(5) 0;
      font-size: px2rem(12);
      color: #666666;
      height: px2rem(58);
      line-height: px2rem(20);
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      padding-left: 0.05rem;
    }
    .foot {
      display: flex;
      overflow: hidden;
      line-height: px2rem(22);
      margin-top: px2rem(5);
      .author {
        flex: 1;
        color: #fdc8b6;
        .icon {
          vertical-align: bottom;
          margin-right: px2rem(5);
          font-size: px2rem(12);
        }
      }
      .category {
        padding: 0 px2rem(2);
        border: px2rem(1) solid rgb(139, 177, 194);
        font-size: px2rem(12);
        border-radius: px2rem(5);
        color: rgb(139, 177, 194);
      }
    }
  }
}
</style>
