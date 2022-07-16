import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.devtools = true

const store = new Vuex.Store({
    state: {        
        name: "",
        role: "",
        phone: "",
        car: "",
    },

    mutations: {        
        // 设置用户信息
        setUserInfo(state, user) {
            state.name = user.user.RealName
            state.phone = user.phone
            state.role = user.role
            state.car = user.car
        },
        // 清楚用户信息
        clearUserInfo(state) {
            state.name = ""
            state.phone = ''
            state.role = ''
            state.car = ''
        }
    }
})

export default store