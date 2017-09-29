<template>
  <div id="app" class="page-wrapper">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <LoadLayer></LoadLayer>
  </div>
</template>
<script>
  import LoadLayer from './components/loading/LoadLayer';
  export default {
    name: 'app',
    components: {
      LoadLayer
    }
  }
</script>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  /*@import "assets/css/reset.css";*/
  @import "assets/icon/iconfont.css";
</style>
