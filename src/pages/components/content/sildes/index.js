// import { Carousel } from 'antd'
import './index.css'
import "@arco-design/web-react/dist/css/arco.css";
import { Carousel } from '@arco-design/web-react';

const Sildes = () => {
    const imageSrc = [
        'https://img.alicdn.com/imgextra/i3/O1CN01eIXd6S1aLrWCMqId2_!!6000000003314-0-tps-1200-320.jpg',
        'https://img.alicdn.com/imgextra/i3/O1CN018YNxcT1XyNz7TikPG_!!6000000002992-2-tps-1200-320.png',
        'https://img.alicdn.com/imgextra/i4/O1CN01eDmj3x23PBEzAgdzb_!!6000000007247-0-tps-1200-320.jpg',
        'https://img.alicdn.com/imgextra/i3/O1CN01zMNFlM2A9nFNGJVXu_!!6000000008161-0-tps-1200-320.jpg', //邓紫棋
        'https://img.alicdn.com/imgextra/i2/O1CN01fGMkLF1vLxWt21GBP_!!6000000006157-0-tps-1200-320.jpg', //李荣浩
        'https://img.alicdn.com/imgextra/i3/O1CN01ZUAaKr1drPeIG6r3R_!!6000000003789-0-tps-1200-320.jpg', //周传雄
        'https://img.alicdn.com/imgextra/i2/O1CN01mxLwqX1FZxmWfq3Nn_!!6000000000502-2-tps-1200-320.png', //薛之谦
        'https://img.alicdn.com/imgextra/i2/O1CN01g9bR5u1DwkFYDzHVS_!!6000000000281-0-tps-1200-320.jpg' //蔡依林
    ]

    return (
        // <div className='sildes'>
        //     <Carousel autoplay style={{width:'100%',height:'100%'}}>
        //         <div>
        //             <h3><img src='https://img.alicdn.com/imgextra/i4/O1CN01zH9cHZ1EF45dIc3wx_!!6000000000321-0-tps-1200-320.jpg' alt='yy'></img></h3>
        //         </div>
        //         <div>
        //             <h3><img src='https://img.zcool.cn/community/01083e5be2a7c7a8012092524d7ae1.jpg@1280w_1l_2o_100sh.jpg' alt='yy'></img></h3>
        //         </div>
        //         <div>
        //             <h3><img src='https://img.zcool.cn/community/0138485c9b4c7ea80121416867d826.jpg@2o.jpg' alt='yy'></img></h3>
        //         </div>
        //     </Carousel>
        // </div>
        <Carousel
            autoPlay
            animation='card'
            showArrow='never'
            indicatorPosition='outer'
            style={{ width: '100%', height: 240 }}
        >
            {imageSrc.map((src, index) => (
                <div
                    key={index}
                    style={{ width: '80%' }}
                >
                    <img
                        src={src}
                        style={{ width: '100%', height: "100%" }} alt=""
                    />
                </div>
            ))}
        </Carousel>

    )
}
export default Sildes