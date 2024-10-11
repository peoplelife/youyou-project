import './login.css'
import { Link } from 'react-router-dom'
import { Button,  Form, Input } from 'antd'
import logo from '../../image/logo.png'
import { useState } from 'react'
const Login = () => {
    const [active,setActive]=useState(true)
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onClick=()=>{

    }
    return (
        <>
            <div className='pc-bar'>
                <div className='pc-w1200'>
                    <Link className='pc-a'>
                        <img src={logo} alt='悠游'></img>
                    </Link>
                </div>
            </div>
            <div className='login-box'>
                <div className='box1'>
                    <div className='form-box'>
                        <div className='login-option'>
                            <div className={active?'password-login login-active':'password-login'} onClick={()=>{setActive(true)}}>密码登录</div>
                            <div className={active?'phone-login ':'phone-login login-active'}  onClick={()=>{setActive(false)}}>短信登录</div>
                            <div className='scan-code-login'>扫码登录</div>
                        </div>
                        <div className='container'>
                            <Form
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
                                <Form.Item
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入手机号!',
                                        },
                                    ]}
                                >
                                    <div className='fm-filed'>
                                        <div>
                                            <label className='fm-label-icon'>
                                                <i className='icon-user iconfont'></i>
                                            </label>
                                        </div>
                                    <Input placeholder='请输入手机号'/>
                                    </div>
                                </Form.Item>

                                <Form.Item
                                    label="密码"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码!',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder='请输入登录密码!'/>
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
// export default Login