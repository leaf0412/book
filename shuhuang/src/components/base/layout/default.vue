<template>
  <div>
    <m-header :headtype="1"></m-header>
    <m-nav></m-nav>
    <slot></slot>
  </div>
</template>

<script>
import MHeader from "@/components/header/header.vue";
import MNav from "@/components/nav/nav.vue";
export default {
  name: "MLayout",
  data() {
    return {};
  },
  components: {
    MHeader,
    MNav
  }
};
</script>
