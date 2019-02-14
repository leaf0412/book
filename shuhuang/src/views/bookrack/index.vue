<template>
  <transition name="shift-left">
    <div class="bookrack">
        <ul class="top-wrapper">
          <li class="item"
              :class="menuActive === item.type ? 'active' : ''"
              v-for="item in menuList"
              :key="item.id">
            {{item.name}}
          </li>
        </ul>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "bookrack",
  data() {
    return {
      menuActive: "readingRecode",
      menuList: [
        {
          id: 1,
          type: "readingRecode",
          name: "阅读记录"
        },
        {
          id: 2,
          type: "bookrack",
          name: "我的书架"
        }
      ]
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
  height: 100%;
  .top-wrapper {
    width: 90%;
    margin: px2rem(10) auto;
    display: flex;
    align-content: center;
    justify-content: space-between;
    border-radius: px2rem(15);
    background: #f5f5f5;
    .item {
      width: 50%;
      text-align: center;
      padding: px2rem(10);
      border-radius: px2rem(15);
      &.active {
        background: $primary;
        color: #fff;
      }
    }
  }
}
</style>

