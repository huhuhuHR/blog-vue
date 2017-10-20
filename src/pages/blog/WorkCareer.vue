<template>
  <div class="workCareer-root">
    <div class="career-head"></div>
  </div>
</template>
<script>
  import http from '../../http/http';
  export default{
    data () {
      return {
        id: this.$route.query.id
      };
    },
    methods: {},
    mounted (){
//      console.log(this.id);
    },
    created(){
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .workCareer-root {
    margin: 20px 30px 20px 30px;
    background-color: #FFFFFF;
    .career-head {
      height: 20px;
    }
    .career-list {
      display: flex;
      justify-content: center;
      .created-date {
        font-size: 24px;
        margin-right: 10px;
      }
      .career-line {
        position: relative;
        border-left: 1px solid #000000;
        left: 16px;
      }
      .green-radio {
        z-index: 1;
        height: 30px;
        width: 30px;
        border-radius: 30px;
        background-color: #0000ff;
      }
      .event {
        width: 300px;
        word-wrap: break-word;
        font-size: 16px;
        margin-left: 5px;
        padding-bottom: 10px;
      }
    }
  }
</style>
