<template>
  <div class="article-root">
    <goBack @goBack="goBack"
            @goHome="goHome"></goBack>
    <div class="chose-type">选择</div>
    <div class="box">
      <div class="article-select-add" @click="goAdd()">
        <i class="iconfont icon-icon02"></i>
      </div>
      <div class="article-select-list" @click="goList()">
        <i class="iconfont icon-liebiao"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import {goBack} from '../../../components/index';
  import Vue from 'vue';
  import {setStyle}  from  '../../../assets/js/dom';
  export default{
    data () {
      return {
        id: this.$route.query.id
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      goHome(){
        this.$router.push({path: '/homePage', query: {'id': this.id}});
      },
      goList(){
        this.$router.push({path: '/acticleList', query: {'id': this.id}});
      },
      goAdd(){
        this.$router.push({path: '/acticleAdd', query: {'id': this.id}});
      }
    },
    watch: {},
    created(){
      Vue.nextTick(function () {
        let height = window.screen.height;
        setStyle(document.querySelector('.article-root'), 'height', height + 'px');
      }.bind(this));
    },
    mounted (){
    },
    components: {
      goBack
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .article-root {
    color: #8c8c8c;
    .chose-type {
      font-size: 30px;
      text-align: center;
    }
    .box {
      position: absolute;
      top: 40%;
      display: flex;
      justify-content: space-around;
      align-self: center;
      width: 100%;
      .article-select-add {
        overflow: hidden;
        width: 130px;
        height: 130px;
        line-height: 130px;
        border: 1px solid #000000;
        background-color: #10b0de;
        i {
          font-size: 120px;
          color: #ffffff;
          position: relative;
          top: -8px;
          left: 6px;
        }
      }
      .article-select-list {
        overflow: hidden;
        width: 130px;
        height: 130px;
        border: 1px solid #000000;
        background-color: #9e3fc6;
        i {
          font-size: 120px;
          color: #ffffff;
          position: relative;
          left: 5px;
        }
      }
    }
  }
</style>
