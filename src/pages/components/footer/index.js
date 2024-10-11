import './index.css'
import { Link } from 'react-router-dom'
import logo from '../../../image/logo.png'
import logoCode from '../../../image/logoCode.png'
const Footer = () => {
    const items = [
        {
            label: "帮助中心"
        },
        {
            label: "公司介绍"
        },
        {
            label: "品牌识别"
        },
        {
            label: "公司大事记"
        },
        {
            label: "协议及隐私权政策"
        },
        {
            label: "廉正举报"
        },
        {
            label: "联系合作"
        },
        {
            label: "招聘信息"
        },
        {
            label: "防骗秘籍"
        },
    ]
    return (
        <div className="footer">
            <div className="w1200">
                <ul className='footer_links'>
                    {items.map((item,index) => {
                        return (
                            <div key={index}>
                                <li className='footer_links_list'>
                                    <Link>{item.label}</Link>
                                </li>
                                <li className='footer_links_grep'>|</li>
                            </div>
                        )
                    })}
                </ul>
                <div className='footer_ft'>
                    <div className='footer_ft_fl'>
                        <Link className='footer_ft_logo'>
                            <img src={logo} alt='logo'></img>
                        </Link>
                        <div className='footer_ft_code_box'>
                            <img src={logoCode} alt='logo' className='footer_ft_code'></img>
                            <span>APP下载</span>
                        </div>
                    </div>
                    <div className='footer_ft_fr'>
                        <div className='footer_fr_contact'>
                            <Link className='footer_fr_contact_btn'>在线客服</Link>
                        </div>
                        <ul className='footer_ft_words'>
                            <li className='footer_ft_certificate' key='1'>
                                <Link>京ICP证031057号</Link>
                            </li>
                            <li className='footer_ft_grep'key='2'>|</li>
                            <li className='footer_ft_certificate'key='3'>
                                <Link>京ICP备11043884号</Link>
                            </li>
                            <li className='footer_ft_grep'key='4'>|</li>
                            <li className='footer_ft_certificate'key='5'>
                                <Link>京公网安备11010502037341号</Link>
                            </li>
                            <li className='footer_ft_grep'key='6'>|</li>
                            <li className='footer_ft_certificate'key='7'>
                                <Link>广播电视节目制作经营许可证(京)字第02253号</Link>
                            </li>
                        </ul>
                        <ul className='footer_ft_words'>
                            <li className='footer_ft_certificate'key='8'>
                                <Link>网络文化经营许可证 京网文[2023]1649-054号</Link>
                            </li>
                            <li className='footer_ft_grep'key='9'>|</li>
                            <li className='footer_ft_certificate'key='10'>
                                <Link>营业性演出许可证京市演587号</Link>
                            </li>
                        </ul>
                        <ul className='footer_ft_words'key='11'>
                            <li className='footer_ft_certificate'>
                                南昌悠游文化传媒发展有限公司 版权所有
                            </li>
                            <li className='footer_ft_certificate'key='12'>
                                <Link>悠游网</Link>
                            </li>
                            <li key='13'>
                                Copyright 2003-2020 All Rights Reserved
                            </li>
                        </ul>
                        <ul className='footer_ft_words'key='14'>
                            <li key='15'>
                                举报投诉：youyou_tousu@member.alibaba.com   浙江省杭州市余杭区文一西路969号
                            </li>
                        </ul>
                        <ul className='footer_ft_words'>
                            <li key='16'>
                                违法不良信息举报电话：020-62108294
                            </li>
                        </ul>
                        <div className='footer_ft_img'>
                            <Link>
                                <img src='	https://img.alicdn.com/tfs/TB1ZO80pyOYBuNjSsD4XXbSkFXa-141-41.png' alt='logo' className='footer_ft_img2'></img>
                            </Link>
                            <Link>
                                <img src='	https://img.alicdn.com/tfs/TB1Y580pyOYBuNjSsD4XXbSkFXa-83-50.png' className='footer_ft_img3'alt='logo' ></img>
                            </Link>
                            <img src={logo} alt='logo' style={{height:"30px"}}></img>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Footer