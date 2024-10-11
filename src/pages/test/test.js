import React, { useState } from 'react';

// import { message, Checkbox } from 'antd';
const Child=(props)=>{
  const handleChange=(value)=>{
    props.setChecked(value+1)
  }
  return(
    <>
    
     
        <div onClick={()=>handleChange(props.item)}>111{props.item}</div>
      
   
    </>
  )
}
const Test = () => {
  const [checked, setChecked] = useState(0);

  return <Child item={checked} setChecked={setChecked}/>
}
export default Test;