import axios from 'axios'

// 登陆
export function login(data) {    
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}
// 登陆状态查询
export function status(){
    return axios({
        method: 'get',
        url: '/login/status',
        
    })
}