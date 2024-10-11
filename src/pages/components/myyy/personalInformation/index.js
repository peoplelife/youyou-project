
import './index.css'
import {  useState } from 'react'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
const PersonalInformation = () => {
    const option = [
        {
            label: '编辑资料',
            path: '/myyy/personalInformation'
        },
        {
            label: '修改头像',
            path: '/myyy/personalInformation/changeAvater'
        }
    ]
    const navigate = useNavigate()
    const [active, setActive] = useState(0)
    const handlePersonalInformation = (path, index) => {
        setActive(index)
        navigate(path)
    }
    const userInfo = useSelector(state => state.user.userInfo)
    return (
        <div className="personalInformation">
            <div className="personalInformation_box">
                <div className="personalInformation_box_left">
                    <div className="personalInformation_avater">
                        <img src={userInfo.avatar} alt='头像' className='userImage'></img>
                    </div>
                    <div className="personalInformation_name">
                        <div className='personalInformation_name_title'>{userInfo.username}</div>
                    </div>
                    <div className="personalInformation_userName">手机号: {userInfo.phone}</div>
                    <div className='personalInformation_button'>
                        <a className='personalInformation_button_a' href='/'>开通悠游豪华VIP</a>
                    </div>
                </div>
                <div className="personalInformation_box_right">
                    <div className='personalInformation_right_header'>
                        <div className='personalInformation_right_header_title'>
                            <ul className='right_header_title_list'>
                                {option.map((item, index) => {
                                    return <li className={active === index ? 'cur' : ''} onClick={() => handlePersonalInformation(item.path, index)} key={index}>
                                        <div className='right_header_title_list_a'>{item.label}</div>
                                    </li>
                                })}
                            </ul>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PersonalInformation;