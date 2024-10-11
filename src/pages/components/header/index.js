import './header.css'
import { Menu,  Input } from 'antd'
import Dropdowns from '../dropdown';
import logo from '../../../image/logo.png'
import CityDropdown from './citydropdown/citydropdown';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const { Search } = Input
const TopBar = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState('')
    const data = [
        {
            label: '首页',
            key: '/',
        },
        {
            label: '分类',
            key: '/classify',
        },

    ];
    const handleSearch = (value) => {
        navigate(`/searchDetails?keyWord=${value}`)
    }
    return (
        <div className='dm-header-wrap'>
            <div className='dm-header-box'>
                <a href='/'>
                    <img className='i-logo' src={logo}alt='悠游'></img>
                    
                </a>
                <div className='location-header'>
                    <img className='i-icon-location' src='https://img.alicdn.com/tfs/TB1XHDuxNGYBuNjy0FnXXX5lpXa-28-32.png' alt='定位'></img>
                    
                    <CityDropdown></CityDropdown>
                </div>
                <div className='recommend-header'>
                    <Menu items={data} mode="horizontal" style={{ width: "400px" }} className='menu' onClick={({key})=>{navigate(key)}} selectedKeys={[window.location.pathname]}></Menu>
                </div>
                <div className='right-header'>
                    <div className='box-header user-header'>
                        <Dropdowns></Dropdowns>
                    </div>
                </div>
                <div className='search-header'>
                    
                        <Search
                            placeholder="搜索你想要去的城市"
                            allowClear
                            enterButton="搜索"
                            size="large"
                            className='search-button'
                            onSearch={handleSearch}
                            onChange={(e) => { setValue(e.target.value) }}
                            value={value}
                        />
                   
                </div>
            </div>
        </div>
    )
}
export default TopBar