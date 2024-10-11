import { Checkbox ,message} from 'antd'
import { payAPI } from '../../../api/pay'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { getIdCardInfoAPI } from '../../../api/idCard'
const Pay = () => {
    const navigate = useNavigate()
    const [idCard, setIdCard] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    // const pay = useSelector(state => state.tickets.orderInfo)
    // const payMent = { ...pay, tPrice: pay.tPrice * pay.tCount }
    useEffect(() => {
        const getIdCard = async () => {
            const res = await getIdCardInfoAPI(localStorage.getItem("id"))
            setIdCard(res.data)
        }
        getIdCard()
    }, [])
    const checkedIdCard=selectedItems.map((items)=>{
        return idCard[items]
    })
    const payInfo = JSON.parse(localStorage.getItem("orderInfo"))
    const payMent = { ...payInfo, tPrice: payInfo.tPrice * payInfo.tCount,tIdcard:JSON.stringify(checkedIdCard)}
    const handleClick = async () => {
        try {
            const payValue = await payAPI(payMent);
            // 创建表单并插入到DOM中
            const formContainer = document.createElement('div');
            document.body.appendChild(formContainer);
            formContainer.innerHTML = payValue;
            // 获取刚创建的表单元素
            const formElement = formContainer.querySelector('form');
            if (formElement) {
                // 直接提交表单
                formElement.submit();
                // 可选：提交后立即移除表单容器，避免影响页面
                // formContainer.remove();
            } else {
                console.error('Form element not found in the inserted HTML.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    const handleCheckBox=(value)=>{
        if (selectedItems.includes(value)) {
            setSelectedItems(selectedItems.filter((v) => v !== value));
          } else if (selectedItems.length < payInfo.tCount) {
            setSelectedItems([...selectedItems, value]);
          } else {
            message.warning('所选观演人员已达到选择上限！');
          }
    }
    const handleIdCard=()=>{
        return idCard.map((item, index) => {
            return (
                <div className='people-item'key={index}>
                    <div className='people-item-box'>
                        <div className='people-item-span'>{item.name}</div>
                        <div className='people-item-span-1'>
                            <div className='people-item-span-1-name'>身份证</div>
                            <div className='people-item-span-1-id'>{`${item.idcard.slice(0, 3)}************${item.idcard.slice(-3)}`}</div>
                        </div>
                    </div>
                    <div className='people-item-radio'><Checkbox checked={selectedItems.includes(index)}
                onChange={() => handleCheckBox(index)} ></Checkbox></div>
                </div>
            )
        })
    }
    return (
        <div className='paybox'>
            <div className='pay-info'>
                <div className='pay-place'>
                    <div className='pay-place-info'>
                        <span className='span-place1'>{payInfo.tTitle}</span>
                        <span className='span-place2'>{payInfo.tPlace}</span>
                    </div>
                </div>
                <div className='pay-time'>
                    <div className='pay-time-info'>
                        <span className='span-time1'>{payInfo.tTime}</span>
                        <span className='span-time2'>￥{payInfo.tPrice}票档 ×{payInfo.tCount}张</span>
                    </div>
                </div>
                <div className='pay-type'>
                    <div className='pay-type-info'>
                        <div className='pay-type-info-list'>
                            <div className='pay-name'><div className='pay-name-item'>服务</div></div>
                            <div className='pay-type-info-list-item'>
                                <div className='item-info'>
                                    <div className='item-info-img'>
                                        <img src='https://gw.alicdn.com/imgextra/i1/O1CN01Qd8c6y1UIl…bf_!!6000000002495-2-tps-36-36.png_30x30q90_.webp' alt='kl'></img>
                                    </div>
                                    <div className='item-info-name'>实名制观演</div>
                                </div>
                                <div className='item-info'>
                                    <div className='item-info-img'>
                                        <img src='https://gw.alicdn.com/imgextra/i1/O1CN01Qd8c6y1UIl…bf_!!6000000002495-2-tps-36-36.png_30x30q90_.webp' alt=''></img>
                                    </div>
                                    <div className='item-info-name'>条件退</div>
                                </div>
                                <div className='item-info'>
                                    <div className='item-info-img'>
                                        <img src='https://gw.alicdn.com/imgextra/i1/O1CN01Qd8c6y1UIl…bf_!!6000000002495-2-tps-36-36.png_30x30q90_.webp' alt=''></img>
                                    </div>
                                    <div className='item-info-name'>电子票</div>
                                </div>
                                <div className='item-info'>
                                    <div className='item-info-img'>
                                        <img src='https://gw.alicdn.com/imgextra/i1/O1CN01Qd8c6y1UIl…bf_!!6000000002495-2-tps-36-36.png_30x30q90_.webp' alt=''></img>
                                    </div>
                                    <div className='item-info-name'>电子发票</div>
                                </div>
                            </div>
                        </div>
                        <div className='pay-details'>
                            <div className='pay-details-item'>
                                <div className='pay-details-items'>
                                    <div className='pay-details-items-1'>
                                        <span className='items-1'>预售</span>
                                    </div>
                                    <div className='pay-details-items-2'>
                                        <span className='items-2'>预售中，待正式开票后第一时间为您处理订单</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pay-people'>
                    <div className='people-box'>
                        <div className='pay-people-box'>
                            <div className='pay-people-box-2'>
                                <div className='pay-people-box-1'>
                                    <div className='pay-people-title'>实名观演人</div>
                                    <div className='pay-people-details'>仅需选择{payInfo.tCount}位；入场需携带对应证件</div>
                                </div>
                            </div>
                            <div className='pay-people-button' onClick={() => navigate('/identity')}>
                                <div className='people-button-box'>
                                    <span className='people-button-title'>新增</span>
                                </div>
                            </div>
                        </div>
                        <div className='pay-people-items'>
                            {idCard?handleIdCard():null}
                        </div>
                    </div>
                </div>
                <div className='pay-delivery'>
                    <div className='pay-delivery-outside'>
                        <div className='pay-delivery-items'>
                            <div className='delivery-item1'>
                                <div className='delivery-item-1'>
                                    <span className='delivery-item-span'>配送方式</span>
                                </div>
                            </div>
                            <div className='delivery-item2'>
                                <div className='delivery-item-2'>
                                    <div className='delivery-item-details'>
                                        <span className='delivery-ele'>电子票</span>
                                    </div>
                                    <div className='delivery-item-details-1'>
                                        <div className='delivery-item-icon'>
                                            <span className='delivery-item-icon-span'>实名制观演</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='delivery-item3'>
                                <div className='delivery-prompt'>
                                    <span>支付成功后，无需取票，前往票夹查看入场凭证</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pay-phone'></div>
                <div className='pay-payment'>
                    <div className='payment'>
                        <div className='payment-outside'>
                            <div className='payment-item'>
                                <div className='payment-items'>
                                    <span className='payment-items-span'>支付方式</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='payment-icon'>
                        <div className='payment-icon-item'>
                            <img src='https://gw.alicdn.com/tfs/TB1oqi.owgP7K4jSZFqXXamhVXa-64-64.png' alt='支付宝' className='payment-img'></img>
                            <div className='payment-name'>
                                <div className='payment-name-details'>支付宝</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pay-btn'>
                    <div className='pay-price-details'>
                        <div className='pay-price-item'>
                            <div className='pay-price-items'>
                                <div className='pay-price-items-1'>
                                    <div className='pay-price-items-details'>
                                        <span className='pay-price-items-details-span'>本项目支持有条件退款，涉及收取退票手续费，具体规则请以本页面“服务-条件退”中展示的规则为准。</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pay-price-details1'>
                        <div className='pay-price-details2'>
                            <div className='pay-price-details3'>
                                <div className='pay-price-details4'>
                                    <div className='pay-price-details5'>
                                        <div className='pay-price-details6'>
                                            <span>¥ {(payInfo.tPrice * payInfo.tCount).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='pay-price-details7'>
                                    <div className='pay-price-details8'>
                                        <div className='pay-price-details9'></div>
                                    </div>
                                    <div className='pay-price-details10' onClick={
                                       ()=>payInfo.tCount===selectedItems.length? handleClick():message.warning(`共需选择${payInfo.tCount}位观演人`)
                                    }>
                                        <span>提交订单</span>
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
export default Pay