<template>
  <div class="toast"
       v-html="mes"
       :class="[position]"></div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: "center"
    },
    mes: String
  }
};
</script>


<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  background: rgba(0, 0, 0, 0.35);
  padding: 10px;
  border-radius: 5px;
  color: #fff;
  &.center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

