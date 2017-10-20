<template>
  <div class="workCareer-root">
    <div class="career-head"></div>
    <div class="goBack">
      <i class="iconfont icon-tubiao_fanhui" @click="goBack()"></i>
    </div>
    <div class="submit" @click="add" v-show="!addFlag">add</div>
    <div class="submit" v-show="addFlag" @click="submit">sumit</div>
    <div class="career-list" v-show="addFlag">
      <div class="created-date">
        现在
      </div>
      <div class="career-line"></div>
      <div class="green-radio"></div>
      <div class="event">
        　 <textarea v-model="eventText"></textarea>
      </div>
    </div>
    <div class="career-list" v-for="worksRecord in workRecordList" @key="worksRecord.id">
      <div class="created-date">{{worksRecord.createTime | dataFilter}}</div>
      <div class="career-line"></div>
      <div class="green-radio"></div>
      <div class="event">{{worksRecord.recordBody}}</div>
    </div>
    <div style="height: 50px;"></div>
  </div>
</template>
<script>
  import dataFormate from '../../assets/js/dataOperation';
  import {doOperationSuccess, doOperationFailture} from '../../assets/js/operation';
  import http from '../../http/http';
  import {OPERATION_RESULT_HIDDEN, OPERATION_RESULT_SHOW} from '../../store/mutation-types';
  export default{
    data () {
      return {
        id: this.$route.query.id,
        addFlag: false,
        eventText: '',
        createTime: '',
        workRecordList: []
      };
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      init(){
        http.api({
          url: '/huhuhu/workRecord/selectRecord',
          params: {'userId': this.id},
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.workRecordList = data.workRecords;
          }.bind(this),
          errorCallback: function (data) {
            this.$router.go(-1);
          }.bind(this)
        });
      },
      getToday(){
        let today = new Date();
        return today.getFullYear() + '_' +
          this.formateTime(today.getMonth() + 1) + '_' +
          this.formateTime(today.getDate());
      },
      formateTime (val){
        return val.length === 1 ? ('0' + val) : val;
      },
      toSubmit(){
        http.api({
          url: '/huhuhu/workRecord/saveRecord',
          params: {
            'userId': this.id,
            'recordBody': this.eventText,
            'createTime': this.createTime
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            doOperationSuccess(this);
            this.init();
          }.bind(this),
          errorCallback: function (data) {
            doOperationFailture(this);
            this.init();
          }.bind(this)
        });
      },
      submit(){
        this.addFlag = false;
        if (this.eventText !== '') {
          this.toSubmit();
        }
      },
      add(){
        this.addFlag = true;
        this.eventText = '';
      }
    },
    mounted (){
    },
    created(){
      this.createTime = this.getToday();
      this.init();
    },
    filters: {
      formdate(val){
        let date = new Date(val);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).length === '1' ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
        let day = date.getDate().length === '1' ? ('0' + date.getDate()) : date.getDate();
        return year + '_' +
          month + '_' +
          day;
      },
      dataFilter(val){
        return dataFormate(new Date(val), 'yyyy年MM月dd日 hh:mm:ss')
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .workCareer-root {
    background-image: url("../../../src/assets/img/background4.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    margin: 20px 30px 20px 30px;
    border-radius: 5px;
    .goBack {
      cursor: pointer;
      margin: 20px 30px 10px 30px;
      i {
        font-size: 30px;
      }
    }
    .career-head {
      height: 5px;
    }
    .career-list {
      display: flex;
      justify-content: center;
      min-height: 100px;
      .created-date {
        font-size: 20px;
        margin-right: 10px;
        width: 130px;
        input {
          width: 100%;
        }
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
        margin-left: 15px;
        padding-bottom: 10px;
        textarea {
          width: 100%;
          height: 300px;
        }
      }
    }
    .submit {
      cursor: pointer;
      position: fixed;
      right: 100px;
      top: 50px;
      width: 100px;
      text-align: center;
      background-color: #0000cc;
      color: #FFFFFF;
      border-radius: 5px;
      margin: 0 0 20px 20px;
      height: 30px;
      line-height: 30px;
    }
  }
</style>
