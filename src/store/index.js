import Vue from 'vue'
import Vuex from 'vuex'
import project from './modules/project'
import abnormality from './modules/abnormality'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        project,
        abnormality
    }
});

export default store;