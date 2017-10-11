<template>
  <div class="article-detail">
    <i class="iconfont icon-fanhui" @click="goBack()"></i>
    <div v-if="editTag !== '1'">
      <div class="title">
        {{article.title}}
      </div>
      <div class="author">
        {{article.author}}
      </div>
      <div v-html="article.body" class="body"></div>
      <div class="time">
        {{article.createTime | dataFilter}}
      </div>
    </div>
    <div v-if="editTag === '1'">
      <editorArticle :article="article"></editorArticle>
    </div>
  </div>
</template>
<script>
  import editorArticle from '../../../components/ueditor/editorArticle.vue';
  import dataFormate from '../../../assets/js/dataOperation';
  import http from '../../../http/http';
  export default{
    data () {
      return {
        id: this.$route.query.id,
        editTag: this.$route.query.edit,
        article: {}
      };
    },
    created(){
      http.api({
        url: '/huhuhu/article/articleDetail',
        params: {'id': this.id},
        emulateJSON: true,
        useLoadLayer: true,
        successCallback: function (data) {
          this.article = data.article;
        }.bind(this),
        errorCallback: function (data) {
          this.$router.go(-1);
        }.bind(this)
      });
    },
    filters: {
      dataFilter(val){
        return dataFormate(new Date(val), 'yyyy年MM月dd日 hh:mm:ss');
      }
    },
    components: {
      editorArticle
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .article-detail {
    border: 1px solid #aa7700;
    background-color: #FFFFFF;
    padding: 30px 20px 30px 20px;
    margin: 30px;
    border-radius: 10px;
    i {
      font-size: 24px;
      color: #8ec31e;
    }
    .title {
      padding-top: 20px;
      margin-top: 20px;
      border-top: 1px dashed #111;
      border-left: 1px dashed #111;
      border-right: 1px dashed #111;
      text-align: center;
      font-weight: bold;
      font-size: 30px;
      padding-bottom: 20px;
      word-wrap: break-word;
    }
    .author {
      border-left: 1px dashed #111;
      border-right: 1px dashed #111;
      font-size: 18px;
      text-align: right;
      padding-bottom: 20px;
      color: #00a0e9;
      padding-right: 50px;
    }
    .body {
      padding: 10px;
      border: 1px dashed #111;
      margin-bottom: 30px;
    }
    .time {
      text-align: right;
      font-size: 16px;
    }
  }
</style>
