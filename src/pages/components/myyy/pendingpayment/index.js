import './index.css'
import { Breadcrumb } from '@arco-design/web-react';
import { Table, Button, message } from 'antd'
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'
import confirm from '../../../utils/fields/confirm';
import PaymentCountdown from './PaymentCountdown';
import { getOrdersDetailsAPI, cancelOrdersAPI, payOrdersAPI ,quitOrdersAPI} from '../../../../api/orders';
const BreadcrumbItem = Breadcrumb.Item;
const PendingPayment = () => {
    const [searchParams] = useSearchParams()
    const columns = [
        {
            title: '项目名称',
            key: 'ProjectName',
            render: (data) => {
                return (

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

                )
            },
        },
        {
            title: '座位信息',
            key: 'SeatInformation',
            render: () => {
                return (
                    <div>暂无座位信息</div>
                )
            }
        },
        {
            title: '单价',
            key: 'unitPrice',
            render: (data) => {
                return (
                    <div >￥{(Number(data.tPrice) / data.tCount).toFixed(2)}</div>
                )
            }
        },
        {
            title: '数量',
            render: (data) => {
                return (
                    <div style={{ marginLeft: '16px' }}>{data.tCount}</div>
                )
            },
            key: 'tCount',
        },
        {
            title: '优惠',
            key: 'Preferential',
            render: () => {
                return (
                    <div style={{ marginLeft: '10px' }}>--</div>
                )
            }
        },
        {
            title: '小计',
            key: 'Subtotal',
            render: (data) => {
                return (
                    <div style={{ color: '#000', fontWeight: '700' }}>{(Number(data.tPrice)).toFixed(2)}</div>
                )
            }
        },
    ];
    const [isFresh, setIsFresh] = useState(false);
    const [orderDetails, setOrderDetails] = useState({})
    const orderId = searchParams.get('orderId')
    const orderTime = new Date(String(orderDetails.tReservationtime).replace('T', ' '));
    const formattedDate = `${orderTime.getFullYear()}-${("0" + (orderTime.getMonth() + 1)).slice(-2)}-${("0" + orderTime.getDate()).slice(-2)} 
${("0" + orderTime.getHours()).slice(-2)}:${("0" + orderTime.getMinutes()).slice(-2)}:${("0" + orderTime.getSeconds()).slice(-2)}`;
    useEffect(() => {
        async function getOrdersDetailAPI() {
            const res = await getOrdersDetailsAPI({ id: orderId })
            setOrderDetails(res.data)
            console.log(res.data)
            //0是待付款 2是取消 1付款成功
            if (res.data.tStatus === 0) {
                setIsFresh(false)
            } else {
                setIsFresh(true)
            }
        }
        getOrdersDetailAPI()
    }, [orderId])
    const navigate = useNavigate()
    const handleCancle = () => {
        const handleorder = () => {
            setTimeout(()=>{
                navigate('/myyy')
            },200)
        }
        confirm("取消订单", "你确定要取消该订单吗？取消订单后。不能恢复", () => cancelOrdersAPI({ id: orderId }), () => handleorder())
    }
    const handleConfirm = () => {
        payOrdersAPI({ id: orderId, title: orderDetails.tTitle, price: orderDetails.tPrice, place: orderDetails.tPlace })
    }
    const payButton = (<div style={{ display: 'flex', flexDirection: 'column', marginLeft: '105px', alignItems: 'center' }}>
        <Button type='primary' className='payId' onClick={handleConfirm}>立即支付</Button>
        <Button type='primary' className='cancelId' style={{ margin: '10px 0' }} onClick={handleCancle}>取消订单</Button>
    </div>)
    const handleQuitOrder=async()=>{
       const res=await quitOrdersAPI({ id: orderId })
       if(res.code==="200"){
        message.success(res.data)
        navigate('/myyy')
       }
    }
    return (
        <div className='ordersDetails'>
            <div className='ordersDetails-box'>
                <div className='ordersDetails-container'>
                    <div className='ordersDetails-header'>
                        <div className='breadcrumb'>
                            <Breadcrumb>
                                <BreadcrumbItem href='/'>首页</BreadcrumbItem>
                                <BreadcrumbItem href=''>
                                    我的悠游
                                </BreadcrumbItem>
                                <BreadcrumbItem href='/myyy'>订单管理</BreadcrumbItem>
                                <BreadcrumbItem >订单编号：{orderId}</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div className='ordersDetails-content'>
                        <hr></hr>
                        <div className='ordersDetails-content-container'>
                            <div className='ordersDetails-content-box'>
                                <div className='ordersDetails-contnet-header'>
                                    <div className='ordersDetails-content-header-id'>订单号：{orderId}</div>
                                    <div className='ordersDetails-content-header-status'>
                                        <div className='ordersDetails-content-header-status-left'>

                                            <span className='orders-status'>{isFresh ? '交易关闭' : '待付款'}</span>
                                            {orderDetails.tStatus === 2 || orderDetails.tStatus === 0 ? (<span className='orders-status-info'>{isFresh ? '支付超时，已关闭交易' : <PaymentCountdown setIsFresh={setIsFresh} orderTime={formattedDate} ></PaymentCountdown>}</span>) : null}
                                            {orderDetails.tStatus === 1 ? <div style={{display:"inline-block"}}><span className='orders-status-info'>支付成功</span> <span style={{marginLeft: '10px',cursor:"pointer"}} onClick={handleQuitOrder}>申请退款</span></div>: null}
                                            {orderDetails.tStatus === 9 ? <span className='orders-status-info'>申请退款中~</span> : null}
                                            {orderDetails.tStatus === 10 ? <span className='orders-status-info'>已退款</span> : null}
                                            {orderDetails.tStatus === 11? <span className='orders-status-info'>申请退款驳回</span> : null}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <div className='ordersDetails-content-header-status-right'>需付款：<em>￥{Number(orderDetails.tPrice).toFixed(2)}</em></div>
                                            {isFresh ? null : payButton}
                                        </div>
                                    </div>
                                </div>
                                <div className='ordersDetails-content-body'>
                                    <div className='ordersDetails-content-body-table'>
                                        <Table columns={columns} dataSource={[orderDetails]} pagination={{ position: ['none', 'none'], }} />
                                    </div>
                                    <div className='ordersDetails-content-body-grid'>
                                        <div className='grid-delivery'>
                                            <div className='grid-delivery-title'>配送信息</div>
                                            <div className='grid-row'>
                                                <div className='grid-filed-title'>配送方式：</div>
                                                电子票
                                            </div>
                                            <div className='on-site'>
                                                <div className='grid-filed-title'>取票方式：</div>
                                                <div className='rid-filed-address'>请使用购票人身份证直接入场</div>
                                            </div>
                                            <div className='grid-row'>
                                                <div className='grid-filed-title'>收货人：</div>
                                                {localStorage.getItem('user_info')}
                                            </div>
                                            <div className='grid-row'>
                                                <div className='grid-filed-title'>手机号：</div>
                                                15079718528
                                            </div>
                                        </div>
                                        <div className='grid-order'>
                                            <div className='grid-order-title'>订单信息</div>
                                            <div className='grid-order-id'>订单编号：{orderId}</div>
                                            <div className='grid-order-time'>创建时间：{formattedDate}</div>
                                        </div>
                                        <div className='grid-invoice'>
                                            <div className='grid-invoice-title'>发票信息</div>
                                            <div className='grid-invoice-type'>
                                                <div className='invoice-type-title'>发票类型：</div>
                                                <div>请在演出开始前，前往悠游APP开具发票</div>
                                            </div>
                                        </div>
                                        <div className='grid-price'>
                                            <div className='grid-price-title'>金额明细</div>
                                            <div className='grid-price-sum'>
                                                商品总价：￥{Number(orderDetails.tPrice).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='order-info-buyers'>
                                        <div className='buyer-title'>购票人</div>
                                        <div className='buyer-list-row'>
                                            {orderDetails.idcards?.map((item, index) => {
                                                return (
                                                    <div className='item-row' key={index}>
                                                        <div className='info-details'>购票人姓名：{item.name}</div>
                                                        <div className='info-details'>证件类型：身份证</div>
                                                        <div className='info-details'>证件号码：{`${item.idcard.slice(0, 3)}************${item.idcard.slice(-3)}`}</div>
                                                    </div>
                                                )
                                            })
                                            }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div >
    )
}
export default PendingPayment;