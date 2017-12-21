<template>
  <div class="uploadExcel-item">
    <div class="box">
      <div class="file">
        <div class="item">选择文件：</div>
        <div class="file-content">&nbsp;&nbsp;{{excelName}}</div>
        <div class="load-file">
          ...
          <input type="file" class="input1" @change="uploadExcel()"/>
        </div>
      </div>
      <div class="buttom" @click="uploadFiles">上传</div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        excelName: ''
      };
    },
    methods: {
      uploadExcel () {
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
      uploadFiles () {
        var form = new FormData();
        let fileExel = this.$el.getElementsByClassName('input1')[0].files[0];
        console.log(fileExel);
        form.append('fileExel', fileExel);
        this.$http.uploadApi({
          url: this.HOST + '/excel/uploadExcel',
          params: form,
          successCallback: function (data) {
          }.bind(this),
          errorCallback: function (data) {
          }.bind(this)
        });
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .uploadExcel-item {
    .box {
      padding: 20px;
      background-color: #ffffff;
      width: 300px;
      height: 265px;
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
          .input1 {
            width: 30px;
            height: 50px;
            opacity: 0;
            cursor: pointer;
            z-index: 1111;
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
