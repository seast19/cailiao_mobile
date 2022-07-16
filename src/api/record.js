import axios from 'axios'

// 出库
export function ApiAddRecordWithSend(data) {
    return axios({
        url: `/record`,
        method: "post",
        data
    })
}

// 分页获取出入库记录
export function apiGetRecordsByPage(params) {
    return axios({
        url: `/record`,
        method: "get",
        params
    })
}