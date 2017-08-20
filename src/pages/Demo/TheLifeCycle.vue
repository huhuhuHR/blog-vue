<template>
  <div class="theLifeCycle-root">
    <div class="msg">
      <input placeholder="input" v-model="msg"/>
    </div>
    <div>{{msg}}</div>
    <div>改变样式的三种动态方法</div>
    <div>对象：{{object}}</div>
    <div :class="classObject" @mouseover="change" @mouseout="noChange">悬浮变色</div>
    <div>数组：{{arrayClass}}</div>
    <div :class="[activeClass,errorClass]"></div>
    <div>单个：{{changeClass}}</div>
    <div :class="changeType"></div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        msg: '',
        flag: false,
        object: '<div :class="classObject" @mouseover="change" @mouseout="noChange">悬浮变色</div>',
        activeClass: 'active',
        errorClass: 'error',
        changeType: 'error',
        changeClass: '<div :class="changeType" @mouseover="change" @mouseout="noChange">悬浮变色</div>',
        arrayClass: '<div :class="[activeClass,errorClass]" @mouseover="change" @mouseout="noChange">悬浮变色</div>'
      };
    },
    methods: {
      change: function () {
        this.flag = true;
      },
      noChange: function () {
        this.flag = false;
      }
    },
    computed: {
      classObject: function () {
        return {
          'change': this.flag
        }
      }
    },
    created () {
      //dom没有挂载
      console.log(document.querySelector('.msg'));
      console.log('created');
    },
    beforeMount () {//dom没有挂载
      console.log(document.querySelector('.msg'));
      console.log('beforeMount');
    },
    mounted () {
      //dom已经挂载结束，可以动态操作dom
      console.log(document.querySelector('.msg'));
      console.log('mounted');
    },
    beforeUpdate () {
      console.log('beforeUpdate');
    },
    updated () {
      console.log('updated');
    },
    beforeDestory () {
      console.log('beforeDestory');
    },
    destroyed () {
      console.log('destroyed');
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .theLifeCycle-root {
    .change {
      color: #2097f3;
    }
    .error {
      color: #ff2626;
    }
    .active {
      color: #ffff00;
    }
  }
</style>
