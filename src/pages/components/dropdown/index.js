import { Dropdown, Avatar, Space } from "antd";
import { getToken } from "../../utils/token";
import { useDispatch, useSelector } from "react-redux";
import { clearUserinfo } from "../../../store/modules/ticketsStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserInfo } from "../../../store/modules/userStore";
const Dropdowns = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.user.userInfo)
    const items = [];
    const onClick = ({ key }) => {
        if (key === '/quit') {
            dispatch(clearUserinfo())
            localStorage.removeItem('cityName')
            localStorage.removeItem('id')
            localStorage.removeItem('orderInfo')
            // navigate('/')
            window.location.reload()
        } else if (key === '/login') {
            navigate('/login')
        } else if (key === '/myyy') {
            navigate('/myyy')
        } else if (key === '/myyy/personalInformation') {
            navigate('/myyy/personalInformation')
        }

    }
    const token = getToken()
    if (token) {
        items.push({
            key: '/myyy/personalInformation',
            label: '个人信息',
        },
            {
                key: '3',
                label: '账号设置',
            },
            {
                key: '/myyy',
                label: '订单管理',
            }, { key: '/quit', label: '退出登录' })
    } else {
        items.push({
            key: '/login',
            label: '登录',
        })
    }
    useEffect(() => {
        if (localStorage.getItem('id')!==null) {
            async function getUser() {
                dispatch(fetchUserInfo(localStorage.getItem('id')))
            }
            getUser()
        }
    }, [dispatch])
    console.log(userInfo.avatar)
    return (
        <Dropdown
            menu={{ items, onClick }}>
            <Space>
                <Avatar size="large" src={token ? userInfo.avatar : 'https://img.alicdn.com/tfs/TB14UKCGQyWBuNjy0FpXXassXXa-54-54.png'} />
                <span >{token ? userInfo.username : '登录'}</span>
            </Space>
        </Dropdown>
    )
}
export default Dropdowns