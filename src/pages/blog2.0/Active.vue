<template>
  <div class="Active-item">
    <div class="box" @keyup.enter="toActive">
      <input placeholder="激活口令" v-model="activeKey"/>
    </div>
  </div>
</template>
<script>
  import {saveCookie, getCookieValue, UUID} from '../../auth/index';
  export default{
    data () {
      return {
        activeKey: '',
        uuid: this.$route.query.uuid || getCookieValue(UUID)
      };
    },
    mounted(){
      console.log('激活的uuid：' + this.uuid);
      if (!this.uuid) {
        this.$router.go(-1);
      }
    },
    methods: {
      toActive(){
        if (!this.activeKey) {
          return;
        }
        this.$http.api({
          url: '/huhuhu/regist/toActive',
          params: {
            'uuid': this.uuid,
            'msg': this.activeKey
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            if (data) {
              saveCookie(data.userId, '2', '');
            }
            this.$router.go(-1);
          }.bind(this),
          errorCallback: function (data) {
            this.$router.go(-1);
          }.bind(this)
        });
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .Active-item {
    .box {
      position: fixed;
      width: 300px;
      border-radius: 5px;
      background-color: white;
      z-index: 10001;
      top: 50%;
      left: 50%;
      margin-top: -100px;
      margin-left: -150px;
      display: flex;
      input {
        width: 100%;
        height: 50px;
        font-size: 30px;
        color: #00a0e9;
        padding: 0 20px;
      }
    }
  }
</style>
