<template>
<div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
        <ul>
            <li v-for="item in goods" class="menu-item" :class="{'current':currentIndex===$index}" @click="selectMenu($index, $event)">
                <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
                <span class="text border-1px">{{item.name}}</span>
            </li>
        </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper :class="{'current':currentIndex===$index}">
        <ul>
            <li v-for="item in goods" class="food-list food-list-hook">
                <h1 class="title">{{item.name}}</h1>
                <ul>
                    <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
                        <div class="icon"><img :src="food.icon" width="57"></div>
                        <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <p class="desc">{{food.description}}</p>
                            <div class="extra">
                                <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="now">￥{{food.price}}</span>
                                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                            </div>
                            <div class="carcontrol-wrapper">
                                <carcontrol :food="food"></carcontrol>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <shopcart v-ref:shopcart :select-foods="selectFoods" :deliver-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
</div>
<food :food="selectedFood" v-ref:food></food>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import shopcart from 'components/shopcart/shopcart';
    import carcontrol from 'components/carcontrol/carcontrol';
    import food from 'components/food/food';
    const ERR_OK = 0;

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            };
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        console.log('currentIndex:' + i);
                        return i;
                    }
                }
                return 0;
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food);
                        }
                    });
                });
                return foods;
            }
        },
        created() {
            this.$http.get('/api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    });
                }
            });
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        methods: {
            selectMenu(index, event) {
                if (!event._constructed) {
                    return;
                }
                let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 300);
            },
            _drop(target) {
                // 体验优化，异步执行
                this.$nextTick(() => {
                    this.$refs.shopcart.drop(target);
                });
            },
            _initScroll() {
                this.menuScroll = new BScroll(this.$els.menuWrapper, {
                    click: true
                });

                this.foodsScroll = new BScroll(this.$els.foodsWrapper, {probeType: 3, click: true});

                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _calculateHeight() {
                let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    console.log(foodList[i]);
                    let item = foodList[i];
                    console.log(item.clientHeight);
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectFood(food, event) {
                console.log(food);
                if (!event._constructed) {
                    return;
                }
                this.selectedFood = food;
                this.$refs.food.show();
            }
        },
        components: {
            shopcart,
            carcontrol,
            food
        },
        events: {
            'cart.add'(target) {
                this._drop(target);
            }
        }
    };
</script>
<style lang="stylus" type="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl";
    .goods
        display: flex
        position: absolute
        top: 174px
        bottom: 46px
        width: 100%
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table
                height: 54px
                width: 56px
                line-height: 14px
                padding: 0 12px
                &.current
                    position: relative
                    margin-top: -1px
                    z-index: 10px
                    background: #fff
                    font-weight: 700
                    .text
                        border-none();
                .icon
                    display: inline-block
                    vertical-align: top
                    width:12px
                    height:12px
                    margin-right:2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.decrease
                        bg-img('decrease_3')
                    &.discount
                        bg-img('discount_3')
                    &.guarantee
                        bg-img('guarantee_3')
                    &.invoice
                        bg-img('invoice_3')
                    &.special
                        bg-img('special_3')
                .text
                    font-size: 12px
                    display: table-cell
                    width:56px
                    vertical-align: middle
                    position: relative
                    border-1px(rgba(7, 17, 27, 0.1))
        .foods-wrapper
            flex: 1
            background:#fff
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7
            .food-item
                display: flex
                margin: 18px
                padding-bottom: 18px
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom: 0px
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex: 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .desc
                        margin-bottom: 10px
                        line-height: 12px
                    .extra
                        .count
                            margin-right:12px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            font-size: 14px
                            margin-right: 8px
                            color: rgb(240, 20, 20)
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .carcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px
</style>
