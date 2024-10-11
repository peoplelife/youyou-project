import './index.css'
import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import menuKeyAndLaber from '../../utils/sider';
const { Content, Sider } = Layout;
const items = [
    {
        key: '/myyys',
        label: '用户中心',
        children: [
            {
                key: '/myyy',
                label: '订单管理',
            },
        ]
    },
    {
        key: '/accountCenter',
        label: '账户中心',
        children: [
            {
                key: '/accountCenter/personalInformation',
                label: '个人信息',
            },
            {
                key: '/accountCenter/ticketPurchaser',
                label: '常用购票人管理',
            },
        ]
    }
]
const Myyy = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [breadCrumb, setBreadCrumb] = useState([]);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    useEffect(() => {
        setBreadCrumb(menuKeyAndLaber(items))
    }, [])
    const pathSnippets = location.pathname.split('/').filter((i) => i)
    if(pathSnippets[1]==="personalInformation"){
        pathSnippets[0]='accountCenter'
    }
    const titlesJoin = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
        let titles = {}
        titles.title = breadCrumb[url]
        return titles
    })
    const handleMenuClick = (e) => {
        let key=e.key
        if(key==='/accountCenter/personalInformation'){
            key='/myyy/personalInformation'
        }else if(key==='/accountCenter/ticketPurchaser'){
            key='/myyy/ticketPurchaser'
        }
        navigate(key)
    }
    return (
        <Layout>
            <Content
                style={{
                    padding: '0 48px',
                    marginBottom: '30px'
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                    items={[{title:'我的悠游'},...titlesJoin]}
                >
                </Breadcrumb>
                <Layout
                    style={{
                        padding: '24px 0',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Sider
                        style={{
                            background: colorBgContainer,
                        }}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['/myyy']}
                            defaultOpenKeys={['/myyys']}
                            style={{
                                height: '100%',
                            }}
                            items={items}
                            className='menu-order'
                            onClick={handleMenuClick}
                            // selectedKeys={[location.pathname]}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}
export default Myyy