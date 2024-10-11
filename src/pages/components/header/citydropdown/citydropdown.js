import { Typography, Dropdown, Space} from 'antd'
import { DownOutlined } from '@ant-design/icons';
import './index.css';
import {  useState } from 'react';
import { setCityName } from '../../../../store/modules/ticketsStore';
import { useDispatch,useSelector } from 'react-redux'
const CityDropdown = () => {
    // const [selectedCity, setSelectedCity]=useState('北京')
    const items = [
        {
            key: '1',
            type: 'group',
            label: '当前城市',
            children: [
                {
                    key: localStorage.getItem('cityName')||"北京",
                    label: localStorage.getItem('cityName')||"北京",
                }
            ],
        },
        {
            key: '2',
            type: 'group',
            label: '热门城市',
            children: [
                {
                    key: '北京',
                    label: '北京',
                },
                {
                    key: '上海',
                    label: '上海',
                },
                {
                    key: '深圳',
                    label: '深圳',
                },
                {
                    key: '广州',
                    label: '广州',
                },
                {
                    key: '杭州',
                    label: '杭州',
                },
                {
                    key: '天津',
                    label: '天津',
                },
                {
                    key: '重庆',
                    label: '重庆',
                },
                {
                    key: '中国香港',
                    label: '中国香港',
                },
            ],
        },
        {
            key: '3',
            type: 'group',
            label: '其他城市',
            children: [
                {
                    key: '武汉',
                    label: '武汉',
                },
                {
                    key: '西安',
                    label: '西安',
                },
                {
                    key: '郑州',
                    label: '郑州',
                },
                {
                    key: '长沙',
                    label: '长沙',
                },
                {
                    key: '合肥',
                    label: '合肥',
                },
                {
                    key: '青岛',
                    label: '青岛',
                },
                {
                    key: '沈阳',
                    label: '沈阳',
                },
                {
                    key: '昆明',
                    label: '昆明',
                },
                {
                    key: '宁波',
                    label: '宁波',
                },
                {
                    key: '佛山',
                    label: '佛山',
                }]
        }
    ]
    const dispatch = useDispatch()
    const cityName = useSelector(state => state.tickets.cityName)
    return (

        <Dropdown
            menu={{
                items,
                selectable: true,
                defaultSelectedKeys: [localStorage.getItem('cityName')||"北京"],
                onClick: ({ key }) => {
                    dispatch(setCityName(key))
                }
            }}
            placement='bottom'
            className='city-dropdown'
        >
            <Typography.Link>
                <Space>
                    {cityName}
                    <DownOutlined />
                </Space>
            </Typography.Link>
        </Dropdown>

    )

}
export default CityDropdown;