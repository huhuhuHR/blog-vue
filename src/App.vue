<template>
  <div id="app" class="page-wrapper">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <OpeartionDialog></OpeartionDialog>
    <LoadLayer></LoadLayer>
  </div>
</template>
<script>
  import {OpeartionDialog} from './components/index';
  import LoadLayer from './components/loading/LoadLayer';

  export default {
    name: 'app',
    components: {
      LoadLayer,
      OpeartionDialog
    }
  }
</script>
<style>
  html {
    background-color: #b2bac2;
  }

  @import "assets/icon/iconfont.css";
</style>
