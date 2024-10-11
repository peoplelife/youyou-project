import { Button, Result } from 'antd';
import React from 'react';
import { useSearchParams,useNavigate } from 'react-router-dom';
import { request } from '../pages/utils/request';
import { useEffect } from 'react';
const Successs = () => {
    const [searchParams] = useSearchParams()
    const navigate=useNavigate()
    const out_trade_no= searchParams.get('out_trade_no')
    useEffect(() => {
        if (out_trade_no) {
            request({
                url: '/api/pay/BySuccess',
                method: 'POST',
                data:{out_trade_no:out_trade_no}
            })
        }
    })
    return (
        <Result
            status="success"
            title="支付成功，请回到主页"
            subTitle={`订单编号：${out_trade_no} 如果想了解更多可以在订单管理了解更多`}
            extra={[
                <Button type="primary" key="console" onClick={()=>{navigate('/')}}>
                    回到主页
                </Button>,
                // <Button key="buy">Buy Again</Button>,
            ]}
        />
    )
}
export default Successs;