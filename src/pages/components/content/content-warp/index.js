import './index.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ticketsAPI } from '../../../../api/ticket'
import { useSelector } from 'react-redux';
const ContentWrap = () => {
    const [tickets, setTickets] = useState([{
        id: '',
        title: '',
        leftTicket: [
            {
                id: '',
                time:[],
                city: '',
                img: '',
                title: '',
                price: [],
                place: ''
            }
        ],
        children: [
            {
                id: '',
                time:[],
                city: '',
                img: '',
                title: '',
                price: [],
                place: ''
            }
        ],
    }])
    const cityName = useSelector(state => state.tickets.cityName)
    useEffect(() => {
        async function tickets() {
            const res = await ticketsAPI(cityName)
            setTickets(res.data)
        }

        tickets()

    }, [cityName])
    return (
        <div className="content-wrap">
            {/* 循环遍历大模块 */}
            {
                tickets.map((item, index) => {
                    return (
                        <div className="content-wrap-list" key={index}>
                            <div className="head">
                                <span className="head-title">{item.title}</span>
                                <Link>
                                    <span className='head-more'>
                                        查看全部
                                    </span>
                                </Link>
                            </div>
                            <div className="box">
                                <Link className='box-left' to={`/details?id=${item.id}&&childrenId=${item.leftTicket[0].id}`}>
                                    <img className='box-left_bg' src={item.leftTicket[0].img}></img>
                                    <div className='box-left_info'>
                                        <div className='title'>{item.leftTicket[0].title}</div>
                                        <div className='details'>¥{item.leftTicket[0].price[0]}<span>起</span></div>
                                    </div>
                                </Link>
                                <div className='box-right'>
                                    {/* 循环遍历小模块 */}
                                    {item.children.map((value, i) => {
                                        return (
                                            <Link className='box-right_item' to={`/details?id=${item.id}&&childrenId=${value.id}`} key={i}>
                                                <div className='itemimg'>
                                                    <img src={value.img}></img>
                                                </div>
                                                <div className='iteminfo'>
                                                    <div className='title'>{value.title}</div>
                                                    <div className='venue'>{value.place}</div>
                                                    <div className='showtime'>{value.time[0]}</div>
                                                    <div className='price'>￥{value.price[0]}<span>起</span></div>
                                                </div>
                                            </Link>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    )

                })
            }



        </div>

    )
}
export default ContentWrap