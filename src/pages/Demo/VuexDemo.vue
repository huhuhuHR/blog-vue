<template>
  <div class="root">
    {{count}}
    <div style="width: 50px;height: 50px" @click="clickMeMutations">mutations</div>
    <div style="width: 50px;height: 50px;" @click="clickMeActions">actions</div>
  </div>
</template>
<script>
  import {ADD_COUNT_MUTATION} from '../../store/mutation-types';
  import {ADD_COUNT_ACTION} from '../../store/action-types';
  export default{
    data () {
      return {
        count: ''
      };
    },
    created(){
      this.count = this.$store.getters.count;
      console.log('created:' + this.count);
    },
    methods: {
      clickMeMutations: function () {
        this.$store.commit('ADD_COUNT_MUTATION', 100);
        this.count = this.$store.getters.count;
      },
      clickMeActions: function () {
        this.$store.dispatch(ADD_COUNT_ACTION);
        this.count = this.$store.getters.count;
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
  .root {
    background-color: #ffffff;
  }
</style>
