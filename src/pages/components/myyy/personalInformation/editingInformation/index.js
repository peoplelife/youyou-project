import { useEffect, useState } from 'react'
import { Radio, DatePicker, Select, Button, Form,message, } from 'antd';
import { Input } from '@arco-design/web-react';
import dayjs from 'dayjs';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import { useSelector } from 'react-redux';
import { option } from '../../../../staticdatas';
import { updateUserInfoAPI } from '../../../../../api/user';
import { setUserInfo } from '../../../../../store/modules/userStore';
import { useDispatch } from 'react-redux';
moment.locale('zh-cn');
const EditingInformation = () => {
    const [childrenOption, setChildrenOption] = useState([])
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage();
    const userInfo = useSelector(state => state.user.userInfo)
    useEffect(() => {
        form.setFieldsValue(
            {
                username: userInfo.username,
                sex: userInfo.sex,
                birthday: dayjs(userInfo.birthday, 'YYYY-MM-DD'),
                delivery: userInfo.district,
                signature: userInfo.signature,
                province: userInfo.province,
                city: userInfo.city
            }
        )
        setChildrenOption(option.filter(item => item.value === userInfo.province)[0]?.children)
    }, [form, userInfo])
    const onSelectChange = (value) => {
        const childrenOptions = option.filter(item => item.value === value)[0].children
        setChildrenOption(childrenOptions)
    }
    const onFinish = async (values) => {
        console.log(values);
        console.log(userInfo);
        const res = await updateUserInfoAPI({ ...values, birthday: values.birthday.format('YYYY-MM-DD'), delivery: values.province + values.city + values.delivery, id: localStorage.getItem('id') })
        if (res.code === "200") {
            dispatch(setUserInfo({ ...userInfo, ...values ,district:values.delivery}))
            messageApi.open({
                type: 'success',
                content: '保存信息成功',
              });

        }
    }
    return (
        <div className='personalInformation_right_header_form'>
            {/* <form> */}
            {contextHolder}
            <Form
                onFinish={onFinish}
                form={form}
            >
                <table className='personalInformation_right_header_form_table'>
                    <tbody>
                        <tr className='personalInformation_tr' >
                            <td className='personalInformation_td1'>
                                <label className='personalInformation_label'>手机号</label>
                            </td>
                            <td className='personalInformation_td2'>{userInfo.phone}</td>
                        </tr>
                        <tr className='personalInformation_tr'>
                            <td className='personalInformation_td1'>
                                <label className='personalInformation_label'>区块地址</label>
                            </td>
                            <td className='personalInformation_td2'>{userInfo.address}</td>
                        </tr>
                        <tr className='personalInformation_tr'>
                            <td className='personalInformation_td1'>
                                <label className='personalInformation_label'>昵称</label>
                            </td>
                            <td className='personalInformation_td2'>
                                <Form.Item
                                    name='username'
                                >
                                    <Input></Input>
                                </Form.Item>
                            </td>
                        </tr>
                        <tr className='personalInformation_tr'>
                            <td className='personalInformation_td1'>
                                <label className='personalInformation_label'>性别</label>
                            </td>
                            <td className='personalInformation_td2'>
                                <Form.Item
                                    name='sex'
                                >
                                    <Radio.Group  >
                                        <Radio value={"男"}>男</Radio>
                                        <Radio value={"女"}>女</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </td>
                        </tr>
                        <tr className='personalInformation_tr'>
                            <td className='personalInformation_td1'>
                                <label className='personalInformation_label'>生日</label>
                            </td>
                            <td className='personalInformation_td2'>
                                <Form.Item
                                    name='birthday'
                                >
                                    {/* value={dayjs(userInfo.birthday, 'YYYY-MM-DD')} */}
                                    <DatePicker value={dayjs(userInfo.birthday, 'YYYY-MM-DD')} locale={locale} onChange={(date, dateString) => { console.log(date, dateString) }} />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr className='personalInformation_tr'>
                            <td className='personalInformation_td1'>
                                <label className='personalInformation_label'>地区</label>
                            </td>
                            <td className='personalInformation_td2'>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Form.Item
                                        name='province'
                                    >
                                        <Select
                                            style={{
                                                width: 100,
                                            }}
                                            options={option}
                                            onChange={onSelectChange}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="city"
                                    >
                                        <Select
                                            style={{
                                                width: 120,
                                                marginLeft: 10,
                                            }}
                                            options={childrenOption}
                                        />
                                    </Form.Item>
                                </div>
                            </td>
                        </tr>
                        <tr className='personalInformation_tr'>
                            <td className='personalInformation_td1'>
                                <label className='personalInformation_label'>详细地址</label>
                            </td>
                            <td className='personalInformation_td2'>
                                <Form.Item
                                    name='delivery'
                                >
                                    <Input.TextArea
                                        // value={userInfo.delivery}
                                        maxLength={{ length: 50, errorOnly: true }}
                                        showWordLimit
                                        placeholder='More than 50 letters will be error'
                                        wrapperStyle={{ width: 300 }}
                                        className='personalInformation_acro_textarea'
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr className='personalInformation_tr'>
                            <td className='personalInformation_td1'>
                                <label className='personalInformation_label'>个性签名</label>
                            </td>
                            <td className='personalInformation_td2'>
                                <Form.Item
                                    name="signature"
                                >
                                    <Input.TextArea
                                        // value={userInfo.signature}
                                        maxLength={{ length: 300, errorOnly: true }}
                                        showWordLimit
                                        placeholder='More than 50 letters will be error'
                                        wrapperStyle={{ width: 300 }}
                                        className='personalInformation_acro_textarea_general'
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr className='personalInformation_tr' style={{ marginTop: 12 }}>
                            <td className='personalInformation_td1'>
                                <label className='personalInformation_label'></label>
                            </td>
                            <td className='personalInformation_td2'>
                                <Button type="primary" htmlType="submit">保存</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* </form> */}
            </Form>
        </div>
    )
}
export default EditingInformation;