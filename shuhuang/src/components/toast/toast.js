import Vue from "vue";
// 引入创建的静态组件
import MyToast from "./toast.vue";

// 返回一个 扩展实例的构造器
const toast = Vue.extend(MyToast);

// 实例化一个 toast.vue
const toastDom = new toast({
  el: document.createElement("div")
});

// 定义弹出组件的函数 接收 2个参数
// mes 显示的文本或者是html片段
// duration 显示时间
const showToast = (options = {}) => {
  toastDom.mes = options.mes;
  toastDom.duration = options.duration || 2000;
  const el = toastDom.$el;
  // const length = document.getElementsByClassName('toast').length;
  // if(length > 0){
  //   return;
  // }
  // 将实例化 toast 挂载到 body 上
  document.body.appendChild(el);
  // 到了duration 时间后隐藏 如果duration 为 0 不触发隐藏
  setTimeout(() => {
    if (options.duration !== 0) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }, toastDom.duration);
};

const registryToast = () => {
  Vue.prototype.$toast = showToast;
};

// 注册为全局组件
export default registryToast;
