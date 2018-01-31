<template>
  <div class="user-else">
    <MaskLayer v-show="currentBigImage!=''"></MaskLayer>
    <div class="show-big" v-show="currentBigImage!=''">
      <img :src="currentBigImage" @click="hideBigImage">
    </div>
    <div class="user-else-head">
      <span>网站成员({{memberSize}})</span>
    </div>
    <div class="over-flow-scroll">
      <div class="user-else-info" v-for="member in members">
        <img v-if="member.userImage" :src="member.userImage" @click="showCurrentBigImg(member.userImage)"/>
        <img v-else src="./1.jpeg"/>
        <div class="introduce">
          <div class="user-name">{{member.name}}</div>
          <div class="user-good-at">{{member.email}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import MaskLayer from '../../components/operationDialog/MaskLayer.vue';
  export default{
    data () {
      return {
        members: [],
        memberSize: 0,
        currentBigImage: ''
      };
    },
    mounted(){
      this.getMembers();
    },
    methods: {
      showCurrentBigImg(val){
        this.currentBigImage = val;
      },
      hideBigImage(){
        this.currentBigImage = '';
      },
      getMembers(){
        this.$http.api({
          url: '/huhuhu/regist/getMembers',
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.memberSize = data.size;
            this.members = data.members;
          }.bind(this),
          errorCallback: function (data) {
          }.bind(this)
        });
      }
    },
    components: {
      MaskLayer
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .user-else {
    background-color: #ffffff;
    .show-big {
      padding: 20px;
      background-color: #ffffff;
      width: 400px;
      height: 400px;
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      z-index: 1002;
      img {
        width: 400px;
        height: 400px;
      }
    }
    .user-else-head {
      font-weight: 500;
      font-size: 16px;
      padding: 10px;
      border-bottom: 1px solid rgba(178, 186, 194, .15);
    }
    .over-flow-scroll {
      max-height: 340.5px;
      overflow-y: scroll;
      .user-else-info {
        padding: 10px;
        display: flex;
        border-bottom: 1px solid rgba(178, 186, 194, .15);
        img {
          height: 36px;
          width: 36px;
          border-radius: 36px;
        }
        .introduce {
          margin-left: 5px;
          width: 80%;
          .user-name {
            width: 100%;
            font-size: 14px;
            color: #333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .user-good-at {
            width: 100%;
            color: #909090;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
