<template>
  <div class="workCareer-root">
    <div class="career-head"></div>
    <div class="goBack">
      <i class="iconfont icon-tubiao_fanhui" @click="goBack()"></i>
    </div>
    <div class="submit" @click="add" v-show="!addFlag">add</div>
    <div class="submit" v-show="addFlag" @click="submit">sumit</div>
    <div class="career-box">
      <div class="career-list" v-show="addFlag">
        <div class="career-line"></div>
        <div class="green-radio"></div>
        <div class="body-box">
          <div class="trangle-box">
            <div class="dot-left">
            </div>
          </div>
          <div class="created-date">
            现在
          </div>
          <div class="event" style="background-color: #FFFFFF;height: 300px">
            <!--　 <textarea v-model="eventText"></textarea>-->
            <VE :content="eventText" @changeText="changeEventText" :height="300"></VE>
          </div>
        </div>
      </div>
      <div class="career-list" v-for="worksRecord in workRecordList" @key="worksRecord.id">
        <div class="career-line"></div>
        <div class="green-radio"></div>
        <div class="body-box">
          <div class="trangle-box">
            <div class="dot-left">
            </div>
          </div>
          <div class="created-date">{{worksRecord.createTime | dataFilter}}</div>
          <div class="event" v-html="worksRecord.recordBody"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import VE from '../../components/vueEdit/VueEdit.vue'
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
      changeEventText (val) {
        Vue.nextTick(function () {
          this.eventText = val;
        }.bind(this));
      },
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
    },
    components: {
      VE
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .workCareer-root {
    background-color: #000000;
    border-radius: 5px;
    margin: 20px 30px 20px 30px;
    .goBack {
      position: fixed;
      right: 50px;
      top: 20px;
      cursor: pointer;
      margin: 20px 30px 10px 30px;
      color: #02ac1a;
      i {
        font-size: 30px;
      }
    }
    .career-head {
      height: 5px;
    }
    .career-box {
      margin: 50px 0;
      color: #02ac1a;
      .career-list {
        display: flex;
        min-height: 100px;
        margin-left: 100px;
        .body-box {
          width: 75%;
          margin-left: 40px;
          border: 1px solid #8c8c8c;
          margin-bottom: 20px;
          padding: 10px;
          .trangle-box {
            position: relative;
            right: 30px;
            top: -11px;
            .dot-left {
              position: absolute;
              width: 0;
              font-size: 0;
              line-height: 0;
              border-width: 20px;
              border-color: #8c8c8c;
              border-left-width: 0;
              border-style: dashed;
              border-right-style: solid;
              border-top-color: transparent;
              border-bottom-color: transparent;
            }
          }
          .created-date {
            font-size: 18px;
            /*color: #8c8c8c;*/
            input {
              width: 100%;
            }
          }
          .event {
            word-wrap: break-word;
            font-size: 16px;
            /*color: #8c8c8c;*/
            textarea {
              width: 100%;
              height: 300px;
            }
          }
        }
        .career-line {
          position: relative;
          border-left: 1px solid #8c8c8c;
          left: 16px;
        }
        .green-radio {
          z-index: 1;
          height: 30px;
          width: 30px;
          border-radius: 30px;
          background-color: #9dc814;
        }
      }
    }
    .submit {
      cursor: pointer;
      position: fixed;
      left: 10px;
      top: 75px;
      width: 100px;
      text-align: center;
      background-color: #9dc814;
      color: #FFFFFF;
      border-radius: 5px;
      margin: 0 0 20px 20px;
      height: 30px;
      line-height: 30px;
    }
  }
</style>
