import { Link } from "react-router-dom";
import './login.css'
import logo from '../../image/yyg.png'
import { Form, Input, Checkbox, Button } from 'antd'
import { useEffect, useState, useRef } from 'react'
import { verifyPhone, verifyCodes } from "../utils/fields/fields";
import { loginCodeAPI} from "../../api/login";
import { fetchLogin } from "../../store/modules/ticketsStore";
import { useDispatch } from "react-redux";
const Login = () => {
    const dispatch = useDispatch()
    const [active, setActive] = useState(false)
    const [codeActive, setCodeActive] = useState(true)
    const [btnActive, setBtnActive] = useState(true)
    const [count, setCount] = useState(null)
    const [phone, setPhone] = useState('')
    const [checked, setChecked] = useState(false)
    const params={
        phone:phone
    }
    const timeRef = useRef()
    const [form] = Form.useForm()
    const onFinish =async (values) => {
        await dispatch(fetchLogin(values))
       }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleVerifyCode = () => {
        async function login() {
            const res = await loginCodeAPI(params)
            if (res.code === "200") {
                setActive(true)
                setCount(60)
            }
        }
       login()
    }
    useEffect(() => {
        if (count && count !== 0) {
            timeRef.current = setTimeout(() => {
                setCount((count) => count - 1)
            }, 1000)
        } else {
            setActive(false)
        }
        return () => {
            clearInterval(timeRef.current)
        }
    }, [count])
    const verifyPhoneNum = () => {
        let phoneNum = form.getFieldValue('phone')
        setPhone(phoneNum)
        let bool = verifyPhone(phoneNum)
        if (bool && phoneNum.length === 11) {
            setCodeActive(false)
        } else {
            setCodeActive(true)

        }
    }
    const verifyCode = () => {
        let code = form.getFieldValue('code')
        let bool = verifyCodes(code)
        if (bool && !codeActive) {
            setBtnActive(false)
        } else {
            setBtnActive(true)
        }

    }
    return (
        <>
            <header className="navbar-pc">
            <Link to='/'>
                <img className="site-logo" src={logo} alt="logo"></img>
                </Link>
            </header>
            <div className="site-body-wrapper">
                <div className="site-body-pc">
                    <div className="promotion-banner">
                        <img src="https://obj.pipi.cn/festatic/common/image/91434e659bfbf05f43ae5a8d41b5e84b.png"alt="图片"></img>
                    </div>
                </div>
                <div className="iLoginComp">
                    <div className="iLoginComp-wrapper mylogin-wrapper">
                        <Form
                            form={form}
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <div className='kl1'>
                                <Form.Item
                                    name="phone"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}
                                >
                                    <Input placeholder='请输入手机号' onChange={verifyPhoneNum} maxLength={11} />

                                </Form.Item>
                                <div className={codeActive ? "iLoginComp-send-verify-code-text" : "iLoginComp-send-verify-code-text codeactive"}>
                                    <div className="iLoginComp-send-verify-code-text-chilrdren" onClick={handleVerifyCode}>
                                        <span id="sendCodeBtnText">{active ? `${count}秒后重发` : "发送验证码"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='kl1'>
                                <Form.Item
                                    name="code"
                                    rules={[
                                        {
                                            required: false,
                                            max: 4
                                        },
                                    ]}
                                >
                                    <Input placeholder='请输入验证码' className='kl' maxLength={4} onChange={verifyCode} />
                                </Form.Item>
                            </div>
                            <Button className={!checked||btnActive ? 'login-btn' : 'btn-active login-btn'} disabled={!checked||btnActive} htmlType="submit">登录</Button>
                        </Form>
                        <div className="iLoginComp-user-confirm">
                            <div className="iLoginComp-user-confirm-tip" style={{ display: 'none' }}>请先阅读并勾选用户协议!</div>
                            <div className="iLoginComp-user-confirm-wrapper">
                                <Checkbox onChange={(e)=>setChecked(e.target.checked)}></Checkbox>
                                <div className="iLoginComp-user-confirm-text">
                                    <div className="copyright">我已阅读并同意<Link>《悠游用户服务协议》</Link><Link>《隐私政策》</Link></div>
                                </div>
                            </div>
                        </div>
                        <div className="register-wrapper">
                            未注册的手机号将自动生成新账号
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;