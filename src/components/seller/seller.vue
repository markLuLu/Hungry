<template>
    <div class="seller">
            <ul>
                <li v-for="item in seller.supports">{{item.description}}</li>
            </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    const ERR_OK = 0;

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        created() {
            this.$http.get('/api/seller').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.seller = response.data;
                }
            });
        }
    };
</script>
<style lang="stylus" type="stylesheet/stylus">
</style>
