import { Input } from "@arco-design/web-react";
import { Form,Button ,Checkbox,message} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css'
import { updateIdCardInfoAPI } from "../../../../api/idCard";
const Identity = () => {
    const [checked, setChecked] = useState(false);
    const [form] = Form.useForm()
    const navigate=useNavigate()
    const handleIdCard=async(values)=>{
      const res=await updateIdCardInfoAPI({...values,id:localStorage.getItem('id')})
      if(res.code==="200"){
        navigate(-1)
      }else if(res.code==="495"){
        message.error(res.message)
      }else if(res.code==="493"){
          message.error(res.message)
      }
    }
    return (
        <div className="identity">
            <Form 
            form={form}
            onFinish={handleIdCard}
            >
                <Form.Item name="name">
                    <div className="identity-title">
                        <div className="identity-title-box">
                            <div className="identity-title-name">姓名</div>
                            <div className="identity-input">
                                <Input size="large" placeholder="请填写观演人姓名"></Input>
                            </div>
                        </div>
                    </div>
                </Form.Item>
                <div className="identity-type">
                    <div className="identity-title-box">
                        <div className="identity-title-name">证件类型</div>
                        <div className="identity-input">
                            身份证
                        </div>
                    </div>
                </div>
                <Form.Item name="idcard">
                    <div className="identity-title">
                        <div className="identity-title-box">
                            <div className="identity-title-name">身份证</div>
                            <div className="identity-input">
                                <Input size="large"placeholder="请填写证件号码"></Input>
                            </div>
                        </div>
                    </div>
                </Form.Item>

                {/* <Form.Item name="identityame"> */}
                    <div className="identity-title">
                        <div className="identity-title-box">
                            <div className="identity-title-name"><Checkbox checked={checked}onChange={(e)=>{setChecked(e.target.checked)}}></Checkbox></div>
                            <div className="identity-input">
                                点击确定表示您已阅读并同意<span style={{ "color": "rgb(59, 153, 252)"}}>《实名须知》</span>
                            </div>
                        </div>
                    </div>
                {/* </Form.Item> */}
                <div className="identity-btn">
                    <Button type="primary" size="large" disabled={!checked} htmlType="submit">确定</Button>
                </div>
            </Form>
        </div>
    )
}
export default Identity;