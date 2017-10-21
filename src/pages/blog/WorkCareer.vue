<template>
  <div class=jian-li-root>
    <div class="jian-li-title">个人简历</div>
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
          <textarea v-model="workList.doSomeThing"></textarea>
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
      <div class="submit">submit</div>
    </div>
  </div>
</template>
<script>
  import http from '../../http/http';
  export default{
    data () {
      return {
        id: this.$route.query.id,
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
      deleteWorkList (index){
        this.personDetail.workLists.splice(index, 1);
      },
      addWorkList () {
        this.personDetail.workLists.push({
          'startTime': '',
          'endTime': '',
          'doSomeThing': ''
        });
      }
    },
    mounted (){
    },
    created(){
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
      .person-detail {

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
