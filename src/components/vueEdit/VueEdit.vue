<template>
  <div class="vueEdit">
    <vue-editor
      class="vec"
      :id="idVe"
      v-model="content"
      :useCustomImageHandler="useCustomImageHandler"
      @imageAdded="handleImageAdded"
      :placeholder="placeholder"
      :disabled="disabled">
    </vue-editor>
  </div>
</template>
<script>
  import {setStyle}  from  '../../assets/js/dom';
  import Vue from 'vue';
  import {VueEditor} from 'vue2-editor';
  export default{
    data () {
      return {
        tag: false,
        idVe: 've' + Math.round(Math.random() * 10000).toString(),
        data: '',
        useCustomImageHandler: true,
        placeholder: '请输入信息...',
      };
    },
    props: {
      content: {
        type: String,
        require: true
      },
      disabled: {
        type: Boolean,
        require: false,
        default: false
      },
      height: {
        type: Number,
        require: false,
        default: 200
      }
    },
    mounted () {
      Vue.nextTick(function () {
        setStyle(document.querySelector('.vec'), 'height', this.height + 'px');
      }.bind(this));
    },
    components: {
      VueEditor
    },
    methods: {
      handleImageAdded: function (file, Editor, cursorLocation) {
        var formData = new FormData();
        formData.append('image', file);
        console.log(formData);
      }
    },
    watch: {
      content () {
        this.$emit('changeText', this.content);
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>
