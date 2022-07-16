import axios from 'axios'

// 获取车号选项
export function apiGetCarOptions(params) {
    return axios({
        url: `/carall`,
        method: "get",
        params
    })
}