import { useEffect, useState } from 'react'
import Counter from './count'
import './index.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { detailsAPI, searchDetailsAPI } from '../../../api/ticket'
import logo from '../../../image/logoCode.png'
import { setOrderInfo,setPrice,setTime } from '../../../store/modules/ticketsStore'
const Details = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const childrenId = searchParams.get('childrenId')
    const Pid=searchParams.get('Pid')
    const cityName = useSelector(state => state.tickets.cityName)
    const price = useSelector(state => state.tickets.price)
    const time=useSelector(state => state.tickets.time)
    const uId=localStorage.getItem('id')
    const [active, setActive] = useState(0)
    const [priceActive, setPriceActive] = useState(0)
    const count = useSelector(state => state.counts.count)
    const [data, setData] = useState(
        {
            id: "",
            title: "",
            time: [],
            city: "",
            place: "",
            price: [],
            img: ""
        },

    )
    const handleOrders=()=>{
        const params={
            uId:uId,
            tCity:cityName,
            tId:id+'00'+childrenId,
            tTitle:data.title,
            tTime:time,
            tPrice:price,
            tImg:data.img,
            tPlace:data.place,
            tCount:count
        }
        localStorage.setItem('orderInfo',JSON.stringify(params))
        dispatch(setOrderInfo(params))
        navigate('/pay')
    }
    const handleSearchOrders=()=>{
        const params={
            uId:uId,
            tCity:data.city,
            tId:data.id,
            tTitle:data.title,
            tTime:time,
            tPrice:price,
            tImg:data.img,
            tPlace:data.place,
            tCount:count
        }
        localStorage.setItem('orderInfo',JSON.stringify(params))
        dispatch(setOrderInfo(params))
        navigate('/pay')
    }
    useEffect(() => {

        async function getDetails() {
            const res = Pid?await searchDetailsAPI({id:id,pid:Pid}):await detailsAPI({cityName:cityName, Pid: id, childrenId: childrenId})
            dispatch(setPrice(res.data.price[0]))
            dispatch(setTime(res.data.time[0]))
            setData(res.data)
        }
        getDetails()
        window.scrollTo(0, 0)
    }, [cityName, id, childrenId,dispatch,Pid])
    const timeList = () => {

        if (data.time.length === 1) {
            return (
                <div className='select_right_list_item active'>
                    <span>
                        {data.time[0]}
                        <span className='presell' style={{ marginLeft: '5px' }}>预售</span>
                    </span>
                </div>
            )
        } else {
            const temp = data.time.filter((item, index) => index !== 0)
            return (temp.map((item, index) => {
                return (
                    <div className={active === index ? 'select_right_list_item active' : 'select_right_list_item'} onClick={() => {
                        setActive(index)
                        dispatch(setTime(item))
                    }} key={index}>
                        <span>
                            {item}
                            <span className='presell' style={{ marginLeft: '5px' }}>预售</span>
                        </span>
                    </div>
                )
            }))

        }
    }
    return (
        <div className='details'>
            <div className='details-box'>
                <div className='details-left'>
                    <div className='details-hd'>
                        <div className='cont'>
                            <div className='cover'>
                                <img src={data.img} alt='详情'></img>
                            </div>
                            <div className='order'>
                                <div className='title'>
                                    <span className='tip'>总票代</span>
                                    <span>{data.title}</span>
                                </div>
                                <div className='address'>
                                    <div className='time'>时间：{data.time[0]}</div>
                                    <div className='place'>
                                        <div className='addr'>场馆：{data.place}</div>
                                    </div>
                                    <div className='citys'>
                                        <label>城市</label>
                                        <div className='citylist'>
                                            <div className='cityitem active'>{data.city}</div>
                                        </div>
                                    </div>
                                    <div className='perform_order_box'>
                                        <div className='notice-time'>
                                            <img src="	https://img.alicdn.com/tfs/TB1gKnkSMTqK1RjSZPhXXXfOFXa-28-28.png" className='notice-time-icon' alt='二维码'></img>
                                            场次时间均为演出当地时间
                                        </div>
                                        <div className='perform_order_performs'>
                                            <div className='select_left'>场次</div>
                                            <div className='select_right'>
                                                <div className='select_right_list'>
                                                    {
                                                        timeList()
                                                    }
                                                </div>
                                            </div>
                                            <div className='perform_order_select'>
                                                <div className='select_left'>
                                                    票档
                                                </div>
                                                <div className='select_right'>
                                                    <div className='select_right_list'>
                                                        {data.price.map((item, index) => {
                                                            return (
                                                                <div className={priceActive === index ? 'select_right_list_price_item active' : 'select_right_list_price_item'} key={index} onClick={() => {
                                                                    dispatch(setPrice(item))
                                                                    setPriceActive(index)
                                                                }}>
                                                                    <div className='skuname'>{item}元</div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='perform_order_price'>
                                                <div className='number_left'>数量</div>
                                                <div className='number_right'>
                                                    <div className='number_right_info'>
                                                        <Counter></Counter>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='perform_order_price'>
                                                <div className='number_left'>合计</div>
                                                <div className='number_right'>
                                                    <span className='total_price'>
                                                        <i>￥</i>
                                                        {price*count}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='scan_buy'>
                                                <div className='title'>为了更好的购票体验</div>
                                                <div className='subtitle'>请您移步手机端购买</div>
                                                <div className='qrcode-wrapper'>
                                                    <div className='quick-tip'>手机扫码购买更便捷</div>
                                                    <div className='qrcode_container'>
                                                        <img src={logo} alt='支付'></img>
                                                    </div>
                                                    <div className='buy_link' onClick={Pid?handleSearchOrders:handleOrders}>不，立即预订</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Details