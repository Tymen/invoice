import Vuex from 'vuex'
import Vue from 'vue'
import template from './modules/template'


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        template: template,
     },
})
