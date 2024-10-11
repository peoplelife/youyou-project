import { request } from "../pages/utils/request"
export function getIdCardInfoAPI(id) {
    return request({
        url: `/api/UserInfo/getIdcard?id=${id}`,
        method: 'GET',
    })
}
export function updateIdCardInfoAPI(idCard) {
    return request({
        url: "/api/UserInfo/realByName",
        method: 'POST',
        data:idCard
    })
}
export function deleteIdCardAPI(idCard) {
    return request({
        url: "/api/UserInfo/deleteIdcard",
        method: 'POST',
        data:idCard
    })
}