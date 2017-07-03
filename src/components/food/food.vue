<template>
    <div v-show="showFlag" class="food" v-el:fooddetail-wrapper>
        <div class="food-img">
        </div>
        <div class="food-wrapper">
            <h2 class="name">{{food.name}}</h2>
            <div class="seller-wrapper"><span>月售{{food.sellCount}}份</span><span class="rating-pre">好评率{{food.rating}}%</span></div>
            <div class="price"><span class="nowPrice">{{food.price}}</span><del class="oldPrice">{{food.oldPrice}}</del></div>
            <div class="addBuyCar">加入购物车</div>
        </div>
        <line></line>
        <div class="good-wrapper">
            <h3 class="goodTitle">商品介绍</h3>
            <p class="goodWrapper">{{food.info}}</p>
        </div>
        <line></line>
    </div>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import line from 'components/linespace/linespace';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false
            };
        },
        methods: {
            _initScroll() {
                this.fooddetailScroll = new BScroll(this.$els.fooddetailWrapper, {
                    click: true
                });
            },
            show() {
                this.showFlag = true;
                this.$nextTick(() => {
                    this._initScroll();
                });
            }
        },
        components: {
            line
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl";
    .food
        position: fixed
        left: 0
        top: 0
        bottom: 48px
        z-index: 30
        width: 100%
        background: #fff
        .food-wrapper
            padding: 18px
            background: #fff
            border-1px(rgba(7, 17, 27, 0.1))
            .name
                font-size: 14px
                line-height: 14px
                font-weight: 700
                color: rgb(7, 17, 27)
                line-height: 14px
            .seller-wrapper
                font-size: 10px
                color: rgb(147, 153, 159)
                line-height: 10px
                padding: 8px 0
                .rating-pre
                    padding-left: 12px
            .price
                padding-top: 10px
                .nowPrice
                    color: rgb(240, 20, 20)
                    font-size: 14px
                    line-height: 28px
                    font-weight: 700
                .oldPrice
                    font-size: 10px
                    color: rgb(147, 153, 159)
                    font-weight: 700
            .addBuyCar
                font-size: 10px
                color: #fff
                line-height: 24px
                padding: 6px 0
                width: 74px
                border-radius: 12px
                background: rgb(0, 160, 220)
                position: absolute
                text-align: center
                right: 18px
                bottom: 18px
        .good-wrapper
            padding: 18px
            background: #fff
            border-1px(rgba(7, 17, 27, 0.1))
            .goodTitle
                font-size: 14px
                font-weight: normal
                color: rgb(7, 17, 27)
                padding-bottom: 6px
            .goodWrapper
                font-size: 12px
                font-weight: 200
                color: rgb(77, 85, 93)
                line-height: 24px


</style>
