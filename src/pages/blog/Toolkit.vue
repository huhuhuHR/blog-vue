<template>
  <div class="toolkit-root">
    <div class="goBack">
      <i class="iconfont icon-fanhui" @click="goBack()"></i>
    </div>
    <div class="toolkit-list">
      <div class="add-new" @click="ToggleAdd()">
        添加
      </div>
      <div style="width: 100%;border-bottom: 1px solid #8ec31e;"></div>
      <div class="add-box" v-show="showAdd">
        <div class="add-iu">
          <span>icon:</span><input v-model="iconName"/>
        </div>
        <div class="add-iu">
          <span>url:</span><input v-model="url"/>
        </div>
        <div style="display: flex;">
          <div class="add-submit" style="margin-right: 20px" @click="submit">add</div>
          <div class="add-submit" @click="cancel()">cancel</div>
        </div>
      </div>
      <div class="box-toolkit" v-show="!showAdd">
        <div class="toolkits" v-for="(toolKit,index) in toolKitList" key="toolKit.id">
          <a :href="toolKit.url">
            <i :class="toolKit.iconName"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import auth from '../../auth';
  import http from '../../http/http';
  export default{
    data () {
      return {
        id: this.$route.query.id,
        iconName: '',
        url: '',
        showAdd: false,
        toolKitList: []
      };
    },
    methods: {
      init(){
        http.api({
          url: '/huhuhu/ToolKit/selectTookies',
          params: {'userId': this.id},
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.toolKitList = data.toolKitList;
          }.bind(this),
          errorCallback: function (data) {
            console.log("error");
          }.bind(this)
        });
      },
      submit(){
        let condition = Object.assign({}, {'cookie': auth.getCookieValue(auth.TOKEN_KEY)}, {'iconName': this.iconName}, {'url': this.url});
        http.api({
          url: '/huhuhu/ToolKit/inserToolKit',
          params: condition,
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.init();
            this.cancel();
          }.bind(this),
          errorCallback: function (data) {
            console.log("error");
          }.bind(this)
        });
      },
      cancel(){
        this.url = '';
        this.iconName = '';
        this.showAdd = false;
      },
      goBack(){
        this.$router.go(-1);
      },
      ToggleAdd(){
        this.showAdd = !this.showAdd;
      }
    },
    mounted (){
    },
    created(){
      this.init();
    },
    components: {}
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .toolkit-root {
    border: 1px dashed #111;
    border-radius: 5px;
    margin: 0 30px 0 30px;
    .goBack {
      margin: 20px 30px 10px 30px;
      border-bottom: 1px solid #8ec31e;
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
