import axios from 'axios'

// 搜索物品
export function apiGetMaterials(params) {    
    return axios({
        method: 'get',
        url: '/material/s',
        params
    })
}