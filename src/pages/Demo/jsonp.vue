<template>
  <div class="jsonp-item">
    {{msg}}
    <button @click="get">get</button>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        msg: '无',
        count: 10
      };
    },
    methods: {
      get() {
        console.log(`一共有${this.count}个鸡蛋`);
        var _this = this;
        this.JSONP({
          url: 'http://s.weibo.com/ajax/jsonp/suggestion',
//          params: {
//            key: 'test',
//          },
          callbackKey: '_cb',
          callback(result) {
            _this.msg = result;
            console.log(result);
          }
        })
      },
      JSONP({
        url,
        params,
        callbackKey,
        callback
      }) {
        // 在参数里制定 callback 的名字
        params = params || {};
        params[callbackKey] = 'jsonpCallback';
        // 预留 callback
        window.jsonpCallback = callback;
        // 拼接参数字符串
        const paramKeys = Object.keys(params);
        const paramString = paramKeys
          .map(key => `${key}=${encodeURIComponent(params[key])}`)
          .join('&');
        // 插入 DOM 元素
        const script = document.createElement('script');
        script.setAttribute('src', url + '?' + paramString);
        document.body.appendChild(script)
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>
