const doOperationSuccess = function (_this) {
  _this.$store.commit('OPERATION_RESULT_SHOW',
    {
      'iconfont': 'iconfont icon-chenggong',
      'text': '成功'
    });
  setTimeout(function () {
    _this.$store.commit('OPERATION_RESULT_HIDDEN');
  }.bind(_this), 2000);
};
const doOperationFailture = function (_this) {
  _this.$store.commit('OPERATION_RESULT_SHOW',
    {
      'iconfont': 'iconfont icon-shibai',
      'text': '失败'
    });
  setTimeout(function () {
    _this.$store.commit('OPERATION_RESULT_HIDDEN');
  }.bind(_this), 2000);
};
module.exports = {
  doOperationSuccess,
  doOperationFailture
};
