import { request } from "../pages/utils/request";
export function ordersAPI(uId) {
    return request({
        url: "/api/pay/getById",
        method: "POST",
        data: uId
    })
}
export function cancelOrdersAPI(uId) {
    return request({
        url: "/api/pay/cancel",
        method: "POST",
        data: uId
    })
}
export function getOrdersDetailsAPI(orderId) {
    return request({
        url: "/api/pay/getOrderById",
        method: "POST",
        data: orderId
    })
}
export function payOrdersAPI(orders) {
    return request({
        url: "/api/pay/continue",
        method: "POST",
        data: orders
    }).then((res)=>{
        if(res.code==='200'){
            const newWindow = window.open("", '_self')
            newWindow.document.write(res.data)
            newWindow.focus()
        }
    })
}
//退款接口
export function quitOrdersAPI(id) {
    return request({
        url: "/api/pay/refund",
        method: "POST",
        data: id
    })
}