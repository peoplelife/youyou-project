import {Button} from 'antd'
import {MinusOutlined ,PlusOutlined } from '@ant-design/icons'
import { useSelector,useDispatch } from 'react-redux'
import './index.css'
import { decrement,inscrement } from '../../../../store/modules/countsStore'
const Counter=()=>{
    const dispatch = useDispatch()
    const count = useSelector(state => state.counts.count)
    const leftBtn=()=>{
        dispatch(decrement(count))
    }
    const rightBtn=()=>{
        dispatch(inscrement(count))
    }
    return(
        <div className="count">
            <Button icon={<MinusOutlined />} disabled={count===1?true:false} onClick={leftBtn}></Button>
            <span className='votes'>{count}张</span>
            <Button icon={<PlusOutlined />} disabled={count===4?true:false} onClick={rightBtn}></Button>
        </div>
    )
}
export default Counter