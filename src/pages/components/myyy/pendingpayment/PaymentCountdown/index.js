import { useEffect } from 'react'
import { useState,useRef } from 'react'


const PaymentCountdown= (props) => {
    const countDownTimer=useRef()//设置延时器
    const [timeView, setTimeView] = useState({
        h: '' ,// 小时
        m: '' ,// 分钟
        s: ''// 秒
    }); // 倒计时显示
    const countDown = () => {
        const nowTime = +new Date(); // 获取当前时间的时间戳（单位毫秒）
        const orderTime  = Date.parse(props.orderTime)+ 10 * 60 * 1000 ; // 过期时间转换为时间戳（单位毫秒）
        const times = parseInt(`${(orderTime - nowTime) / 1000}`); // 把剩余时间毫秒数转化为秒
        const h = parseInt(`${times / 60 / 60}`); // 小时
        const m = parseInt(`${(times / 60) % 60}`); // 分钟
        const s = parseInt(`${times % 60}`); // 秒
     
        //设置时间格式
        setTimeView({
          h: h < 10 ? `0${h}` : `${h}`,
          m: m < 10 ? `0${m}` : `${m}`,
          s: s < 10 ? `0${s}` : `${s}`,
        });
     
        //时间判断
        if (times <= 0) {
          clearTimeout(countDownTimer.current);
          setTimeView({ h: '00', m: '00', s: '00' });
        } else {
          countDownTimer.current = setTimeout(() => {
            countDown();
          }, 1000);
        }
      };
    
      useEffect(() => {
        // 如果倒计时归0则调取接口获取最新数据
        if (timeView?.h === '00' && timeView?.m === '00' && timeView?.s === '00') props.setIsFresh(true);
        // if ( timeView?.s === '00') props.setIsFresh(true);
      }, [timeView,props]);
      useEffect(() => {
        if (props.orderTime) {
          countDown();
        } else {
          setTimeView({ h: '00', m: '00', s: '00' });
        }
        return () => {
          clearTimeout(countDownTimer.current);
        };
      }, [props.orderTime]);
    

      return (
        <span>
          剩余支付时间：<span style={{color:'#ff1268'}}>{timeView?.h}:{timeView?.m}:{timeView?.s}</span>
        </span>
      )
    }
    export default PaymentCountdown