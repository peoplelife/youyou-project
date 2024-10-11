import { request } from "../pages/utils/request";
export function loginCodeAPI(params) {
    return request({
        url: "/api/login/sendMsg",
        method: "POST",
        data: params
    })
}
export function loginAPI(params) {
    return request({
        url: "/api/login/ByCode",
        method: "POST",
        data: params
    })
}
