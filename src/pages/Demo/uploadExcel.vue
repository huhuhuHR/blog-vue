<template>
  <div class="uploadExcel-item">
    <div class="box">
      <div class="file">
        <div class="item">excel：</div>
        <div class="file-content">&nbsp;&nbsp;{{excelName}}</div>
        <div class="load-file">
          ...
          <input type="file" class="input1" @change="changeExcel()"/>
        </div>
      </div>
      <div class="file" style="margin-top: 30px">
        <div class="item">zip：</div>
        <div class="file-content">&nbsp;&nbsp;{{zipName}}</div>
        <div class="load-file">
          ...
          <input type="file" class="input2" @change="changeZip()"/>
        </div>
      </div>
      <div class="buttom" @click="dowloadTemplate(0)">下载标准模板</div>
      <div class="buttom" @click="dowloadTemplate(1)">下载简单模板</div>
      <div class="buttom" @click="exportFiles">下载失败的导入</div>
      <div class="buttom" @click="uploadExcel">上传Excel</div>
      <div class="buttom" @click="uploadZip">上传Zip</div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        excelName: '',
        zipName: ''
      };
    },
    methods: {
      changeExcel () {
        var fileExel = this.$el.getElementsByClassName('input1')[0].files[0];
        if (!/\.(xls|xlsx)$/.test(fileExel.name)) {
          console.log('只支持上传格式:xls、xlsx');
          this.$el.getElementsByClassName('input1')[0].value = '';
          this.excelName = '';
          return;
        }
        if (fileExel.size > 2097152) {
          console.log('');
          this.$el.getElementsByClassName('input1')[0].value = '';
          this.excelName = '';
          return;
        }
        this.excelName = fileExel.name;
      },
      changeZip(){
        var fileZip = this.$el.getElementsByClassName('input2')[0].files[0];
        if (!/\.(zip)$/.test(fileZip.name)) {
          this.$el.getElementsByClassName('input2')[0].value = '';
          this.zipName = '';
          return;
        }
        this.zipName = fileZip.name;
      },
      uploadExcel () {
        var form = new FormData();
        let fileExel = this.$el.getElementsByClassName('input1')[0].files[0];
        console.log(fileExel);
        form.append('fileExel', fileExel);
        this.$http.uploadApi({
          url: this.HOST + '/excel/uploadJedis',
          params: form,
          successCallback: function (data) {
          }.bind(this),
          errorCallback: function (data) {
          }.bind(this)
        });
      },
      uploadZip () {
        var form = new FormData();
        let fileZip = this.$el.getElementsByClassName('input2')[0].files[0];
        console.log(fileZip);
        form.append('fileZip', fileZip);
        this.$http.uploadApi({
          url: this.HOST + '/excel/fileZip',
          params: form,
          successCallback: function (data) {
          }.bind(this),
          errorCallback: function (data) {
          }.bind(this)
        });
      },
      exportFiles(){
        location.href = this.HOST + '/excel/exportByJedis?keyWord=huorong';
      },
      dowloadTemplate(val){
        location.href = this.HOST + '/excel/downloadTemplate/' + val;
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .uploadExcel-item {
    .box {
      padding: 20px;
      background-color: #ffffff;
      width: 400px;
      height: 365px;
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      .file {
        display: flex;
        .item {
          width: 90px;
          height: 30px;
          line-height: 30px;
          margin-right: 10px;
          text-align: right;
          font-size: 12px;
          color: #808080;
        }
        .file-content {
          width: 278px;
          height: 28px;
          line-height: 28px;
          border: 1px solid #d0d0d0;
          border-radius: 5px;
        }
        .load-file {
          width: 30px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          color: #808080;
          border: 1px solid #d0d0d0;
          border-radius: 5px;
          .input1, .input2 {
            width: 30px;
            height: 30px;
            opacity: 0;
            cursor: pointer;
            z-index: 1111;
            position: relative;
            top: -34px;
          }
        }
      }
      .buttom {
        margin-top: 20px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #FFFFFF;
        border-radius: 5px;
        background-color: #00a0e9;
      }
    }
  }
</style>
