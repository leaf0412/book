<template>
  <transition name="shift-right">
    <div class="category">
        <ul class="wrapper">
          <li class="content"
              @click="goto(item)"
              v-for="(item, index) in categoryList"
              :key="index">
            <div class="type">
              {{item.name}}
            </div>
          </li>
        </ul>
    </div>
  </transition>
</template>

<script>
import MList from "@/components/list/list.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "category",
  data() {
    return {};
  },
  components: {
    MList
  },
  computed: {
    ...mapState({
      categoryList: state => state.category.list
    })
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    ...mapActions(["getCategoryList"]),
    goto(item) {
      this.$router.push({
        path: `/category/type`,
        query: {
          title: item.name
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.category {
  // height: 100%;
  .wrapper {
    .content {
      display: flex;
      border-radius: px2rem(10);
      position: relative;
      padding: px2rem(20);
      margin: px2rem(10);
      background: linear-gradient(to bottom right, #149dc5, #8bb1c2);
      &::after {
        content: "1";
        position: absolute;
        right: px2rem(20);
        content: "";
        width: 8px;
        height: 8px;
        border-top: 1px solid #fff;
        border-right: 1px solid #fff;
        transform: rotate(45deg);
      }
      .type {
        font-size: px2rem(14);
        color: #fff;
      }
    }
  }
  // .slide-box {
  //   display: flex;
  //   overflow-x: scroll;
  //   white-space: nowrap;
  //   -webkit-overflow-scrolling: touch;
  //   &::-webkit-scrollbar {
  //     display: none;
  //   }
  //   .slide-item {
  //     padding: 5px 10px;
  //   }
  // }
}
</style>

