<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达!
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="support-count" v-if="seller.supports" @click="showDetail">
                <span class="count">{{seller.supports.length}}</span>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <div v-show="detailShow" class="detail" transition="fade">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star_wrapper">
                        <star :size="48" :score="seller.score"></star>
                        <line :line-text="msg1"></line>
                        <ul v-if="seller.supports" class="supports">
                            <li class="supports-item" v-for="item in seller.supports">
                                <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                                <span class="text">{{seller.supports[$index].description}}</span>
                            </li>
                        </ul>
                        <line :line-text="msg2"></line>
                        <div class="bulletin">
                            <div class="content">{{seller.bulletin}}</div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="detail-close" @click="hideDetail">
                <i class="icon-close"></i>
            </div>
        </div>
    </div>
</template>
<script  type="text/ecmascript-6">
    import star from 'components/star/star';
    import line from 'components/cutLine/cutLine';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                detailShow: false,
                msg1: '优惠信息',
                msg2: '商家公告'
            };
        },
        methods: {
            showDetail() {
                this.detailShow = true;
            },
            hideDetail() {
                this.detailShow = false;
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        components: {
            star,
            line
        }
    };
</script>
<style lang="stylus" type="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl";

    .header
        color: #fff
        position: relative
        background: rgba(7, 17, 27, 0.5)
        overflow: hidden
        .content-wrapper
            padding:24px 12px 8px 24px
            display: flex
            position: relative;
            .avatar
                display:inline-block
                padding-right:16px
                width: 64px
                height:64px
                font-size:0
                vertical-align: top
                img
                    border-radius: 2px
            .content
                display:inline-block
                .title
                    margin: 2px 0 8px 0
                    .brand
                        display: inline-block
                        vertical-align: top
                        width: 30px
                        height: 18px
                        bg-img('brand')
                        background-size: 30px 18px
                        background-repeat: no-repeat
                    .name
                        font-size:16px
                        padding-left: 6px
                .description, .support
                    font-size: 12px
                    font-weight: 200
                    line-height: 24px
                .description
                    font-size: 12px
                    margin-bottom: 10px
                    line-height: 12px
                .support
                    font-size:10px
                    .icon
                        display: inline-block
                        vertical-align: top
                        width: 12px
                        height: 12px
                        margin-right: 4px
                        background-size: 12px 12px
                        background-repeat: no-repeat
                        &.decrease
                            bg-img('decrease_1')
                        &.discount
                            bg-img('discount_1')
                        &.guarantee
                            bg-img('guarantee_1')
                        &.invoice
                            bg-img('invoice_1')
                        &.special
                            bg-img('special_1')
                    .text
                        line-height: 12px
                        font-size: 10px
                        vertical-align: super
            .support-count
                position: absolute
                right: 12px
                bottom: 18px
                padding: 0 8px
                height: 24px
                line-height: 24px
                font-size:10px
                font-weight: 200
                background: rgba(0, 0, 0, 0.2)
                z-index:1
                border-radius: 14px
                text-align: center
                .count
                    font-size: 10px
        .bulletin-wrapper
            height: 28px
            line-height: 28px
            padding: 0 22px 0 12px
            font-size: 12px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            background: rgba(7, 17, 27, .2)
            .bulletin-title
                display: inline-block
                width: 22px
                height: 12px
                bg-img('bulletin')
                background-size: 22px 12px
                background-repeat: no-repeat
                vertical-align: top
                margin-top: 8px
            .bulletin-text
                margin: 0 4px
                font-size: 10px
                font-weight: 200
                vertical-align: top
        .background
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            z-index: -1
            filter: blur(10px)
        .detail
            position: fixed
            z-index: 100
            width: 100%
            height: 100%
            overflow: auto
            left: 0
            top: 0
            transition: all 0.2s
            backdrop-filter: blur(10px)
            &.fade-transition
                opacity: 1
                background: rgba(7, 17, 27, 0.8)
            &.fade-enter, &.fade-leave
                opacity: 0
            background: rgba(7, 17, 27,0)
            .detail-wrapper
                width: 100%
                min-height: 100%
                .detail-main
                    margin-top: 64px
                    padding-bottom: 64px
                    .name
                        text-align: center
                        line-height: 16px
                        font-size: 16px
                        font-weight: 700
                    .star_wrapper
                        margin-top: 18px
                        padding: 2px 0
                        text-align: center
                        .supports
                            width: 80%
                            margin: 0 auto
                            text-align: left
                            .supports-item
                                padding: 0 12px
                                margin-bottom: 12px
                                font-size: 0
                                &:last-child
                                    margin-bottom: 0
                                .icon
                                    display:inline-block
                                    width: 16px
                                    height: 16px
                                    vertical-align: top
                                    margin-right: 6px
                                    background-size: 16px 16px
                                    background-repeat: no-repeat
                                    &.decrease
                                        bg-img('decrease_2')
                                    &.discount
                                        bg-img('discount_2')
                                    &.guarantee
                                        bg-img('guarantee_2')
                                    &.invoice
                                        bg-img('invoice_2')
                                    &.special
                                        bg-img('special_2')
                                .text
                                    font-size: 12px
                                    line-height:16px
                        .bulletin
                            width: 80%
                            margin: 0 auto
                            .content
                                padding: 0 12px
                                line-height: 24px
                                font-size: 12px
                                text-align: left
            .detail-close
                position: relative
                width: 32px
                height: 32px
                margin: -64px auto 0
                clear: both
                font-size: 32px
                background: #fff
</style>
