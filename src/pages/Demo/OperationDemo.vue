<template>
  <div class="opeation-demo">
    <OpeartionDialog></OpeartionDialog>
    <div @click="showSuccess"
         style="width: 100px;height: 50px;text-align: center;line-height: 50px;border: 1px solid#0000ff">success
    </div>
    <div @click="hideSuccess"
         style="width: 100px;height: 50px;text-align: center;line-height: 50px;border: 1px solid#0000ff;">failure
    </div>
  </div>
</template>
<script>
  import {OPERATION_RESULT_HIDDEN, OPERATION_RESULT_SHOW} from '../../store/mutation-types';
  import {OpeartionDialog} from '../../components/index';
  export default{
    data () {
      return {};
    },
    methods: {
      doOperation () {
        this.$store.commit('OPERATION_RESULT_SHOW',
          {
            'iconfont': 'iconfont icon-chenggong',
            'text': '成功'
          });
        setTimeout(function () {
          this.$store.commit('OPERATION_RESULT_HIDDEN');
        }.bind(this), 1500);
      },
      showSuccess () {
        console.log('111');
//        this.doOperation();
      },
      hideSuccess () {
        this.$store.commit('OPERATION_RESULT_HIDDEN');
      }
    },
    components: {
      OpeartionDialog
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>
