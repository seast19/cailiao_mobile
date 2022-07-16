import axios from 'axios'

// 获取货架选项
export function apiGetPlaceOptions(params) {
    return axios({
        url: `/placesall`,
        method: "get",
        params
    })
}