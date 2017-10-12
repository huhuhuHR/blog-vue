<template>
  <div class="toolkit-root">
    <div class="goBack">
      <i class="iconfont icon-fanhui" @click="goBack()"></i>
    </div>
    <div class="toolkit-list">
      <div class="add-new">
        添加
      </div>
      <div class="add-box" v-show="false">
        <div class="add-iu">
          <span>icon:</span><input v-model="iconName"/>
        </div>
        <div class="add-iu">
          <span>url:</span><input v-model="url"/>
        </div>
        <div class="add-submit">add</div>
      </div>
      <div class="box-toolkit">
        <div class="toolkits">
          <a href="http://tool.oschina.net/codeformat/json">
            <i class="iconfont icon-jsongeshihua"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import http from '../../http/http';
  export default{
    data () {
      return {
        id: this.$route.query.id,
        iconName: '',
        url: ''
      };
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      }
    },
    mounted (){
//      console.log(this.id);
    },
    created(){
    },
    components: {}
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .toolkit-root {
    .goBack {
      padding: 20px 0 10px 30px;
      i {
        font-size: 30px;
        color: #8ec31e;
      }
    }
    background-color: #FFFFFF;
    .toolkit-list {
      margin: 10px 30px 0 30px;
      .add-new {
        width: 50px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        background-color: #00a0e9;
        color: #FFFFFF;
        border-radius: 5px;
        margin: 5px 0 5px 0;
        text-align: center;
      }
      .add-box {
        .add-iu {
          margin: 5px 0 5px 0;
          span {
            height: 30px;
            line-height: 30px;
            display: inline-block;
            width: 50px;
            font-size: 16px;
          }
          input {
            width: 200px;
            height: 30px;
            background-color: #808080;
            color: #FFFFFF;
            font-size: 16px;
            border: none;
            padding-left: 5px;
            border-radius: 5px;
          }
        }
        .add-submit {
          width: 50px;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          background-color: #00a0e9;
          color: #FFFFFF;
          border-radius: 5px;
          margin: 5px 0 5px 0;
          text-align: center;
        }
      }
      .box-toolkit {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .toolkits {
          i {
            font-size: 50px;
          }
          width: 30%;
        }
      }
    }
  }
</style>
