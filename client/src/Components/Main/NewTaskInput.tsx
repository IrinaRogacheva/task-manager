import React, { useState } from 'react'
import { Plus } from '../Icons';
import './Main.css'

export function NewTaskInput(props: any) {
  const [plusColor, setPlusColor] = useState('#8c8c8c')
  
    return (
      <div className='main_input-wraper' onMouseEnter={()=>{setPlusColor("#f58c74")}} onMouseLeave={()=>{setPlusColor("#8c8c8c")}}>
        <div className='main_placeholder-wraper'>
          <Plus {...{fill: {plusColor}, width: "13px", height: "13px"}}/>
          <div className='main__placeholder'>Добавить задачу</div>
        </div>
        <input className='main__input' name='task' type='text'/>
      </div>
      );
}