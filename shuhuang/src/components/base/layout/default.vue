<template>
  <div>
    <m-header :headType="headType"></m-header>
    <m-nav></m-nav>
    <slot></slot>
  </div>
</template>

<script>
import MHeader from "@/components/header/header.vue";
import MNav from "@/components/nav/nav.vue";
import { mapState } from "vuex";
export default {
  name: "MLayout",
  components: {
    MHeader,
    MNav
  },
  computed: {
    ...mapState({
      headType: state => state.header.type
    })
  }
};
</script>
