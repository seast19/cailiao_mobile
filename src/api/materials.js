import axios from 'axios'

// 搜索物品
export function apiGetMaterials(params) {    
    return axios({
        method: 'get',
        url: '/material/s',
        params
    })
}

// 根据id获取单个物品
export function apiGetMaterialById(id) {    
    return axios({
        method: 'get',
        url: `/material/id/${id}`,       
    })
}