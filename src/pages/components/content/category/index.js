import './index.css'
import {
    SoundOutlined, BellOutlined, InsertRowAboveOutlined, UserAddOutlined,
    TruckOutlined, PhoneOutlined, PictureOutlined,PlaySquareOutlined,SignatureOutlined,ShoppingCartOutlined 
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
const Category = () => {
    const items = [
        {
            label: "演唱会",
            icon: <SoundOutlined />
        },
        {
            label: "话剧歌剧",
            icon: <BellOutlined />
        },
        {
            label: "体育",
            icon: <InsertRowAboveOutlined />
        },
        {
            label: "儿童亲子",
            icon: <UserAddOutlined />
        },
        {
            label: "展览休闲",
            icon: <TruckOutlined />
        },
        {
            label: "音乐会",
            icon: <PhoneOutlined />
        },
        {
            label: "曲苑杂坛",
            icon: <PictureOutlined />
        },
        {
            label: "舞蹈芭蕾",
            icon: <PlaySquareOutlined />
        },
        {
            label: "二次元",
            icon: <SignatureOutlined />
        },
        {
            label: "旅游展览",
            icon: <ShoppingCartOutlined />
        },
    ]
    return (
        <div className="category">
            <ul className='category__list'>

                {items.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link>
                                <span className='icon'>{item.icon}</span>
                                <span className='label'>{item.label}</span>
                            </Link>
                        </li>
                    )
                })}

            </ul>
        </div>
    )
}
export default Category
