<template>
    <div class="cutLine">
        <div class="title">
            <div class="line"></div>
            <div class="text">{{lineText}}</div>
            <div class="line"></div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            lineText: {
                type: String
            }
        }
    };

</script>
<style lang="stylus" rel="stylesheet/stylus">
    .cutLine
        .title
            display: flex
            width: 80%
            margin: 28px auto 24px
            .line
                flex: 1
                position: relative
                top: -6px
                border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
                padding: 0 12px
                font-size: 14px
                font-weight: 700
</style>
