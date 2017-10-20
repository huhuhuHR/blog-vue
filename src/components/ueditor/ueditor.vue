<template>
  <div class="editor-box">
    <div ref="editor" type="text/plain"></div>
  </div>
</template>
<script>
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
      }
    },
    props: {
      value: {
        type: String,
        require: true
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.$refs.editor.id = this.id;
        UE.delEditor(this.id);
        this.editor = UE.getEditor(this.id,
          config
        );
        this.editor.ready(function () {
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
