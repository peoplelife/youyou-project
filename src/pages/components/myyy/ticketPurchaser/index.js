import { Input } from "@arco-design/web-react";
import { Button, Form, message } from "antd";
import "./index.css"
import { useEffect, useState } from "react";
import { getIdCardInfoAPI, updateIdCardInfoAPI } from "../../../../api/idCard";
import PurchaserTable from "./purchaserTable";
const TicketPurchaser = () => {
    const [idCardInfo, setIdCardInfo] = useState([])
    const [active, setActive] = useState(1)
    useEffect(() => {
        const getIdCardInfo = async () => {
            const res = await getIdCardInfoAPI(localStorage.getItem("id"))
            if(res.data.length===0){
                setActive(0)
            }
            setIdCardInfo(res.data)
        }
        getIdCardInfo()
    }, [])
    const onFinish=async(value)=>{
        const res=await updateIdCardInfoAPI({...value,id:localStorage.getItem("id")})
        if(res.code==="200"){
            message.success("添加购票人成功")
            setActive(1)
        }
    }
    const handlParent = (idCard) => {
        setIdCardInfo(idCard)
    }
    const handleActive=()=>{
        if(active===0){
            return nullData
        }else if(active===2){
            return(
                <div className="ticketPurchaser-info-box">
                    <div className="ticketPurchaser-title">
                        <div className="ticketPurchaser-title-info">新增购票人信息</div>
                    </div>
                    <div className="ticketPurchaser-form">
                        <div className="ticketPurchaser-form-box">
                            <Form onFinish={onFinish}>
                                <div className="ticketPurchaser-form-box-input">
                                    <Form.Item label="姓名" name="name">
                                        <Input placeholder="请填写姓名"></Input>
                                    </Form.Item>
                                </div>
                                <div className="ticketPurchaser-form-box-input">
                                    <Form.Item label="证件类型">
                                        <Input value="身份证"></Input>
                                    </Form.Item>
                                </div>
                                <div className="ticketPurchaser-form-box-input">
                                    <Form.Item label="证件号码" name="idcard">
                                        <Input placeholder="请填写证件号码"></Input>
                                    </Form.Item>
                                </div>
                                <div className="ticketPurchaser-form-box-button">
                                    <Button type="primary" htmlType="submit"style={{marginRight:"10px"}}>保存</Button>
                                    <Button type="primary" style={{backgroundColor:"rgb(238 238 238)" ,color: "#666666",border: "none"}}onClick={onCancle}>取消</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div> 
            )
        }else if(active===1){
            return(
                <PurchaserTable item={idCardInfo} setIdCardInfo={handlParent} />
            )
        }
    }
    const onCancle=()=>{
        if(idCardInfo.length===0){
            setActive(0)
        }else if(idCardInfo.length>0){
            setActive(1)
        }
    }
    const nullData=(
        <div className="ticketPurchaser-null">
            <div className="ticketPurchaser-null-box">
                <img src="https://passport.damai.cn/images/customer/noInfor.png" alt="nullidcard" className="ticketPurchaser-null-img"></img>
                <p>您还未添加购票人信息，请添加购票人</p>
            </div>
        </div>
    )
    
    return (
        <div className="ticketPurchaser">
            <div className="ticketPurchaser-box">
                <div className="ticketPurchaser-button">
                    <Button onClick={()=>setActive(2)}>新建购票人</Button>
                </div>
                {/* <div className="ticketPurchaser-info-box">
                    <div className="ticketPurchaser-title">
                        <div className="ticketPurchaser-title-info">新增购票人信息</div>
                    </div>
                    <div className="ticketPurchaser-form">
                        <div className="ticketPurchaser-form-box">
                            <Form>
                                <div className="ticketPurchaser-form-box-input">
                                    <Form.Item label="姓名">
                                        <Input placeholder="请填写姓名"></Input>
                                    </Form.Item>
                                </div>
                                <div className="ticketPurchaser-form-box-input">
                                    <Form.Item label="证件类型">
                                        <Input value="身份证"></Input>
                                    </Form.Item>
                                </div>
                                <div className="ticketPurchaser-form-box-input">
                                    <Form.Item label="证件号码">
                                        <Input placeholder="请填写证件号码"></Input>
                                    </Form.Item>
                                </div>
                                <div className="ticketPurchaser-form-box-button">
                                    <Button type="primary" htmlType="submit"style={{marginRight:"10px"}}>保存</Button>
                                    <Button type="primary" style={{backgroundColor:"rgb(238 238 238)" ,color: "#666666",border: "none"}}>取消</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div> */}
                {handleActive()}
            </div>
        </div>
    )
}
export default TicketPurchaser;