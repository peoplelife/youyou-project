import React, { useState } from 'react';
import { Image, Upload, Button ,message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.css'
import { uploadAvatarAPI } from '../../../../../api/user';
import { useDispatch ,useSelector} from 'react-redux';
import { setUserInfo } from '../../../../../store/modules/userStore';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const Uploads = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                上传图片
            </div>
        </button>
    );
    const dispatch=useDispatch()
    const userInfo = useSelector(state => state.user.userInfo)
    const handleUpload=()=>{
        const formData=new FormData()
        formData.append('avatar',fileList[0].originFileObj)
        formData.append('userId',localStorage.getItem('id'))
        async function upAvatar(){
            const res=await uploadAvatarAPI(formData)
            if(res.code==="200"){
                dispatch(setUserInfo({...userInfo,avatar:res.data}))
                message.success('修改成功')
            }else if(res.code==="497"){
                message.error(res.message)
            }
        }
        upAvatar()

    }
    return (
        <div className='personalInformation-upload'>
            <div className='personalInformation-upload-title'>
                <span className='personalInformation-upload-title-text'>请上传一个您喜爱的头像：</span>
            </div>
            <p className='bottom20'>最佳尺寸400x400，支持JPG、JPEG、GIF、PNG </p>
            <div className='personalInformation-upload-container'>
                <Upload
                    listType="picture-circle"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                {previewImage && (
                    <Image
                        wrapperStyle={{
                            display: 'none',
                        }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
                <Button type="primary" style={{ margin: '10px 0 0 40px' }}onClick={handleUpload}>确认上传</Button>
            </div>
        </div>
    );
};
export default Uploads;