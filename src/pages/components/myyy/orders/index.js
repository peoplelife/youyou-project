
import { Link } from 'react-router-dom';
import './index.css'
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { cancelOrdersAPI, ordersAPI } from '../../../../api/orders';
import confirm from '../../../utils/fields/confirm';
const Orders = () => {
    const [userData, setUserData] = useState({
        page: 1,
        pageSize: 5,
    })
    const [list, setList] = useState([])
    useEffect(() => {
        const id = { uId: localStorage.getItem('id') }
        async function getList() {
            const res = await ordersAPI(id)
            setList(res.data)
        }
        getList()
    }, [])
    //分页逻辑
    const onPageChange = (page) => {
        setUserData({
            ...userData,
            page
        })
    }
    const columns = [
        {
            title: '项目名称',
            render: (data) => {
                return (
                    <Link className='orders-link' to={`/orderDetails?orderId=${data.aid}`}>
                        <div className='projectName'>
                            <div className='projectName-box'>
                                <div className='projectName-img'><img src={data.tImg} alt="" /></div>
                                <div className='projectName-info'>
                                    <div className='projectName-info-title'>{data.tTitle}</div>
                                    <div className='projectName-info-time'>演出场次：{data.tTime}</div>
                                    <div className='projectName-info-place'>演出场馆：{data.tPlace}</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            },
        },
        {
            title: '订单号',
            dataIndex: 'aid',
            key: 'aid',
        },
        {
            title: '票品张数',
            dataIndex: 'tCount',
            key: 'tCount',
        },
        {
            title: '订单金额',
            render: (data) => {
                return (
                    <div >￥{Number(data.tPrice).toFixed(2)}元</div>
                )
            }
        },
        {
            title: '交易状态',
            //1是支付成功  2是已取消 0是待支付
            render: (data) => {
                const status = () => {

                    if (data.tStatus === 1) {
                        return (
                            <div >已支付</div>
                        )
                    } else if (data.tStatus === 2) {
                        return (
                            <div >交易关闭</div>
                        )
                    }
                    else if (data.tStatus === 0) {
                        return (
                            <div >待付款</div>
                        )
                    }
                }
                return (
                    <div>
                        {status()}
                        <Link className='orders-link'to={`/orderDetails?orderId=${data.aid}`}>查看详情</Link>
                    </div>
                )
            }
        },
        {
            title: '交易操作',
            //1是支付成功  2是已取消 0是待支付
            render: (data) => {
                const status = () => {
                    if (data.tStatus === 1) {
                        return (
                            <div >支付成功</div>
                        )
                    } else if (data.tStatus === 2) {
                        return null
                    } else if (data.tStatus === 0) {
                        return (
                            <Link className='orders-link' onClick={() => handleCancle(data)}>取消订单</Link>
                        )
                    }
                }
                return (
                    <div >{status()}</div>
                )
            }
        },
    ];
    const handleCancle = (data) => {
        const handleList=()=>{
            const nextCounters = list.map((c, i) => {
                if (i === 0) {
                    // 递增被点击的计数器数值
                    c.tStatus=2
                    return c;
                } else {
                    // 其余部分不发生变化
                    return c;
                }
            });
            setList(nextCounters);
        }

        confirm("取消订单", "你确定要取消该订单吗？取消订单后。不能恢复", () => cancelOrdersAPI({ id: data.aid }),()=>handleList())//cancelOrdersAPI({id:data.aid})

    }
    return (

        <Table dataSource={list} columns={columns} pagination={{
            total: list.length,
            pageSize: userData.pageSize,
            onChange: onPageChange
        }} />
    )
}
export default Orders;