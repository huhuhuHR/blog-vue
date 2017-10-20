<template>
  <div class="editor-box">
    <div ref="editor" type="text/plain"></div>
  </div>
</template>
<script>
  import {isEmpty} from '../../utils/CommonUtils';
  import '../../../static/utf8-jsp/ueditor.config'
  import '../../../static/utf8-jsp/ueditor.all';
  import '../../../static/utf8-jsp/lang/zh-cn/zh-cn';
  import {config} from  './ueditor.config';
  export default {
    name: 'editor-box',
    data () {
      return {
        editor: '',
        uedata: [],
        id: new Date().getTime() + 'ueditorId',
        timmer: ''
      }
    },
    props: {
      value: {
        type: String,
        default: 'aa',
        require: true
      }
    },
    mounted () {
      this.$nextTick(function () {
        console.log(this.id);
        this.$refs.editor.id = this.id;
        this.editor = UE.getEditor(this.id,
          config
        );
        this.editor.ready(function () {
          if (isEmpty(this.value)) {
            console.log('this.value有了');
            this.editor.setContent(this.value);
          } else {
            console.log('this.value还没来等1500秒');
            this.timmer = setTimeout(function () {
              this.editor.setContent(this.value);
            }.bind(this), 1500);
          }
          try {
            this.editor.addListener("contentChange", function () {
              const wordCount = this.editor.getContentLength(true);
              const content = this.editor.getContent();
              const plainTxt = this.editor.getPlainTxt();
              this.$emit('input', {wordCount: wordCount, content: content, plainTxt: plainTxt});
            }.bind(this));
          } catch (e) {
            console.log('error');
          }
        }.bind(this));
      }.bind(this));
    },
    beforeDestroy () {
      this.editor.destroy();
    },
    watch: {},
    methods: {}
  }
</script>
