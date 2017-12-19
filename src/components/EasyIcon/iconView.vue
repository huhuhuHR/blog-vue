<template>
    <div class="home-root">
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        computed: {},
        methods: {},
        mounted() {
        },
        filters: {},
        components: {},
        created() {
            let condition = Object.assign({}, {'id': 111});
            http.api({
                url: 'url',
                params: condition,
                emulateJSON: true,
                useLoadLayer: true,
                successCallback: function (data) {
                }.bind(this),
                errorCallback: function (data) {
                }.bind(this)
            });
        }
    };
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>
