import { request } from "../pages/utils/request"
export function getUserInfoAPI(id) {
    return request({
        url: `/api/UserInfo/get?id=${id}`,
        method: 'GET',
    })
}
export function uploadAvatarAPI(formData) {
    return request({
        url: '/api/UserInfo/updateProfile',
        method: 'POST',
        data:formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
export function updateUserInfoAPI(userInfo) {
    return request({
        url: '/api/UserInfo/Update',
        method: 'POST',
        data:userInfo,
    })
}