import Vue from 'vue';
import VueRouter from 'vue-router';
import vueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

import 'common/stylus/index.styl';
/* eslint-disable */
Vue.use(VueRouter);
Vue.use(vueResource);
let app = Vue.extend(App);

let router = new VueRouter({hashbang: false, history: true}); //可去掉vue url上的#!/
router.map({
	'/goods': {
		component: goods
	},
    '/ratings': {
        component: ratings
    },
    'seller': {
        component: seller
    }
});

router.start(app, '#app');

router.go('/goods');
