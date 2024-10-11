import { request } from "../pages/utils/request"
export function ticketsAPI(cityName) {
    return request({
        url: '/api/invoke/getAllConcert',
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        data: cityName
    })
}
export function detailsAPI(params) {
    return request({
        url: '/api/invoke/getConcertsById',
        method: 'POST',
        data: params
    })
}
export function searchDetailsAPI(params) {
    return request({
        url:"/api/invoke/searchConcertsById",
        method:'POST',
        data:params
    })
}