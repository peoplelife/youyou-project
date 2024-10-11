import './index.css'
// import { Checkbox } from 'antd';

// import { useState } from 'react'
import { useState} from 'react'
// import Tests from './test'
import { useEffect } from 'react'

const Tests = () => {
    const [isFresh, setIsFresh] = useState(false);

    useEffect(() => {
        if (isFresh) console.log(isFresh)
    }, [isFresh]);
    
    return (
        <>
        <Tests orderTime={'2024-05-11 21:07:19'} setIsFresh={setIsFresh}></Tests>
        {isFresh?"交易关闭":'待付款'}
        </>
    )
}
export default Tests