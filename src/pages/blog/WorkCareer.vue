<template>
  <div class=jian-li-root>
    <div class="jian-li-title">个人简历</div>
    <div class="common" v-show="!showTag">
      <div class="personal-information">
        <div class="personal-title">
          <span><i class="iconfont icon-anniu1"></i></span>
          <span>个人信息</span>
        </div>
        <div class="person-detail-show">
          <span>姓名：{{personDetail.name}}</span>
          <span>性别：{{personDetail.sex}}</span>
          <span>籍贯：{{personDetail.nativePlace}}</span>
          <span>年龄：{{personDetail.age}}</span>
          <span>手机：{{personDetail.phoneNumber}}</span>
          <span>学历：{{personDetail.studyLevel}}</span>
          <span>工作年限：{{personDetail.workYear}}</span>
        </div>
      </div>
      <div style="border: 1px dashed #000000"></div>
      <div class="work-experience">
        <div><span><i class="iconfont icon-anniu1"></i></span><span>工作经历</span></div>
        <div v-for="(workList,index) in personDetail.workLists" class="workList">
          <div style="margin-left: 5px">
            <span>{{workList.startTime}}</span>
            -
            <span>{{workList.endTime}}</span>
          </div>
          <div style="margin: 5px 10px">
            {{workList.experienceRecord}}
          </div>
        </div>
      </div>
      <div style="border: 1px dashed #000000"></div>
      <div class="professional-skills">
        <div><span><i class="iconfont icon-anniu1"></i></span><span>精通技术</span></div>
        <div style="margin: 5px 10px">
          {{personDetail.skills}}
        </div>
      </div>
      <div style="border: 1px dashed #000000"></div>
      <div class="self-assessment">
        <div><span><i class="iconfont icon-anniu1"></i></span><span>自我评价</span></div>
        <div style="margin: 5px 10px">
          {{personDetail.assessment}}
        </div>
      </div>
    </div>
    <div class="edit" v-show="showTag">
      <div class="personal-information">
        <div class="personal-title">
          <span><i class="iconfont icon-anniu1"></i></span>
          <span>个人信息</span>
        </div>
        <div class="person-detail">
          <span>姓名：<input v-model="personDetail.name"/></span>
          <span>性别：<input v-model="personDetail.sex"/></span>
          <span>籍贯：<input v-model="personDetail.nativePlace"/></span>
          <span>年龄：<input v-model="personDetail.age"/></span>
          <span>手机：<input v-model="personDetail.phoneNumber"/></span>
          <span>学历：<input v-model="personDetail.studyLevel"/></span>
          <span>工作年限：<input v-model="personDetail.workYear"/></span>
        </div>
      </div>
      <div class="work-experience">
        <div><span><i class="iconfont icon-anniu1"></i></span><span>工作经历</span></div>
        <div v-for="(workList,index) in personDetail.workLists" class="workList">
          <div class="delete-relative" @click="deleteWorkList(index)">
            <div class="delete-absolute">
              <i class="iconfont icon-shanchu1"></i>
            </div>
          </div>
          <div style="margin-left: 5px">
            <span><input v-model="workList.startTime"/></span>
            -
            <span><input v-model="workList.endTime"/></span>
          </div>
          <div>
            <textarea v-model="workList.experienceRecord"></textarea>
          </div>
        </div>
        <div class="add-workList">
          <i class="iconfont icon-icon02" @click="addWorkList"></i>
        </div>
      </div>
      <div class="professional-skills">
        <div><span><i class="iconfont icon-anniu1"></i></span><span>精通技术</span></div>
        <div>
          <textarea v-model="personDetail.skills"></textarea>
        </div>
      </div>
      <div class="self-assessment">
        <div><span><i class="iconfont icon-anniu1"></i></span><span>自我评价</span></div>
        <div>
          <textarea v-model="personDetail.assessment"></textarea>
        </div>
      </div>
      <div style="display: flex;justify-content: center">
        <div class="submit" @click="submit">submit</div>
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
        edit: this.$route.query.edit,
        showTag: false,
        personDetail: {
          'name': '',
          'sex': '',
          'nativePlace': '',
          'age': '',
          'workYear': '',
          'studyLevel': '',
          'phoneNumber': '',
          'workLists': [],
          'skills': '',
          'assessment': ''
        }
      };
    },
    methods: {
      init(){
        http.api({
          url: '/huhuhu/resume/selectInit',
          params: {
            'userId': this.id
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.personDetail = data.personDetail;
            if (data.personDetail === null) {
              this.showTag = true;
            } else {
              if (this.edit !== '1') {
                this.showTag = false;
              }
            }
          }.bind(this),
          errorCallback: function (data) {
            console.log(data);
          }.bind(this)
        });
      },
      submit () {
        http.api({
          url: '/huhuhu/resume/submit',
          params: {
            'id': this.id,
            'personDetail': JSON.stringify(this.personDetail)
          },
          emulateJSON: true,
          useLoadLayer: true,
          successCallback: function (data) {
            this.init();
            this.showTag = false;
          }.bind(this),
          errorCallback: function (data) {
            console.log(data);
          }.bind(this)
        });
      },
      deleteWorkList (index){
        this.personDetail.workLists.splice(index, 1);
      },
      addWorkList () {
        this.personDetail.workLists.push({
          'startTime': '',
          'endTime': '',
          'experienceRecord': ''
        });
      }
    },
    mounted (){
    },
    created(){
      this.showTag = (this.edit === '1');
      this.init();
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .jian-li-root {
    padding: 0;
    font-size: 18px;
    width: 797px;
    margin: 0 auto;
    border: solid 1px #DCDDDF;
    background-color: #ffffff;
    .jian-li-title {
      background: url("../../../src/assets/img/background5.jpg");
      width: 797px;
      height: 90px;
      font-size: 30px;
      color: white;
      font-weight: bold;
      text-align: center;
      margin-bottom: 0;
      line-height: 90px;
    }
    .personal-information {
      .personal-title {
        span {
        }
      }
      .person-detail-show {
        span {
          width: 247px;
          display: inline-block;
        }
      }
    }
    .workList {
      .delete-relative {
        position: relative;
        left: 460px;
        top: 6px;
        .delete-absolute {
          position: absolute;
          i {
            color: #8c8c8c !important;
          }
        }
      }
    }
    .add-workList {
      display: inline-block;
      overflow: hidden;
      line-height: 30px;
      margin-left: 10px;
      i {
        color: #02ac1a;
        font-size: 40px;
      }
    }
    i {
      color: #E800E8;
      font-size: 18px;
    }
    span {
      margin: 6px;
      line-height: 40px;
    }
    input {
      border: none;
      background-color: #8c8c8c;
      padding-left: 5px;
      border-radius: 5px;
    }
    textarea {
      width: 97%;
      height: 100px;
      margin: 0 10px;
    }
    .submit {
      width: 100px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: #0000cc;
      color: #FFFFFF;
      border-radius: 5px;
      margin: 20px 0 50px 0;
    }
  }
</style>
