import { request } from "../pages/utils/request"
import confirm from "../pages/utils/fields/confirm"
import router from "../router"
export function payAPI(params) {
    return request({
        url: "/api/pay/ByAddOrder",
        method: "POST",
        data: params
    }).then(res => {
        if (res.code === '500') {
            const nullFun=()=>{}
            confirm('支付订单','亲，你还有未支付订单，请先前往"订单管理"支付后再下单',()=>router.navigate('/myyy'),()=>{nullFun()})
        } else {
            // const newWindow = window.open("", '_self')
            // newWindow.document.write(res.data)
            // newWindow.focus()
            return res.data
        }
    })
}
