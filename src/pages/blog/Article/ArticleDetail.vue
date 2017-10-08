<template>
  <div class="article-detail">
    <div class="title">
      {{article.title}}
    </div>
    <div class="author">
      --{{article.author}}
    </div>
    <div v-html="article.body" class="body"></div>
    <div class="time">
      {{article.createTime | dataFilter}}
    </div>
  </div>
</template>
<script>
  import dataFormate from '../../../assets/js/dataOperation';
  import http from '../../../http/http';
  export default{
    data () {
      return {
        id: this.$route.query.id,
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
    methods: {}
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .article-detail {
    color: #808080;
    margin: 30px;
    .title {
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 20px;
      text-align: center;
    }
    .author {
      font-size: 18px;
      text-align: right;
      margin-bottom: 20px;
    }
    .body {
    }
    .time {
      text-align: right;
      font-size: 16px;
    }
  }
</style>
