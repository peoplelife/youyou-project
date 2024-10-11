import { request } from "../pages/utils/request"
export function searchAPI(params) {
    return request({
        url: '/api/invoke/searchConcerts',
        method: 'POST',
        data: params
    })
}