<template>
  <div class="editor-box">
    <div ref="editor" type="text/plain"></div>
  </div>
</template>
<script>
  import '../../../static/utf8-jsp/ueditor.config'
  import '../../../static/utf8-jsp/ueditor.all';
  import '../../../static/utf8-jsp/lang/zh-cn/zh-cn';
  export default {
    name: 'editor-box',
    data () {
      return {
        editor: '',
        uedata: [],
        id: new Date().getTime() + 'ueditorId',
      }
    },
    props: {
      value: {
        type: String,
        default: null
      }
    },
    created () {
      this.$nextTick(function () {
        console.log(this.id);
        this.$refs.editor.id = this.id;
        this.editor = UE.getEditor(this.id, {
          UEDITOR_HOME_URL: '../../../static/utf8-jsp/',
          initialFrameWidth: null,
          initialFrameHeight: 320
        });
      }.bind(this));
    },
    mounted () {
      this.$nextTick(function () {
        this.editor.ready(function f2() {
          this.editor.setContent(this.value);
          this.editor.addListener("contentChange", function () {
            const wordCount = this.editor.getContentLength(true);
            const content = this.editor.getContent();
            const plainTxt = this.editor.getPlainTxt();
            this.$emit('input', {wordCount: wordCount, content: content, plainTxt: plainTxt});
          }.bind(this));
        }.bind(this));
      }.bind(this));
    },
    watch: {},
    methods: {}
  }
</script>
