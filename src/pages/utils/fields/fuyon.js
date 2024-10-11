import React from 'react'
export default function Filed(props) {
  return (
    
        <div>
            <input className={props.className} type={props.type} onChange={(evt)=>{
                props.onMyChangeEvent(evt.target.value)
            }}name={props.name} placeholder={props.placeholder} value={props.value}/>
        </div>
    
  )
}