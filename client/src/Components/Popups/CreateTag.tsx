import React, { useState } from 'react'
import * as colors from '../../colors'
import { useDispatch, useSelector } from 'react-redux';
import { setCreateTag } from '../../Actions/view';
import { addTag } from '../../Actions/tags';
import { RootState } from '../../store';
import { Plus } from '../Icons';
import './../Main/Main.css'

export default function CreateTag(props: any) {
  const dispatch = useDispatch()
  const view = useSelector(((state: RootState) => state.view))

  const [inputValue, setInputValue] = useState("")
  const [color, setColor] = useState(colors.COLOR18)
  const [colorsVisibility, setColorsVisibility] = useState(false)

  const createTag = () => {
      dispatch(addTag({id_tag: 0, name: inputValue, color: color}))
  }

  return (
  <div style={{display: (view.isCreateTag?'block':'none')}}>
    <div className='create_project__background'></div>
    <div className='create_project context-menu'>
        <div className='create_project_title-wrapper'>
            <p className='create_project__title'>Добавить тег</p>
            <div className='exit_icon' onClick={()=>{dispatch(setCreateTag(false));setInputValue("");setColor(colors.COLOR18)}}>
                <Plus {...{fill: "#444", width: "14px", height: "14px", transform: "rotate(45deg)"}}/>
            </div>
        </div>
        <input value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} placeholder='Имя' type='text' className='create_project__input'/>
        <div className='color_block'>
            <p onClick={()=>{setColorsVisibility(!colorsVisibility)}} className='color_label sidebar__text'>Цвет</p>
            <div onClick={()=>{setColorsVisibility(!colorsVisibility)}} style={{backgroundColor: "#" + color, transform: "scale(1)"}} className='color_circle'></div>
            <div className='context-menu colors_collection' style={{display: (colorsVisibility?"grid":"none")}}>
                <div style={{backgroundColor: "#" + colors.COLOR1}} onClick={()=>{setColor(colors.COLOR1);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR2}} onClick={()=>{setColor(colors.COLOR2);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR3}} onClick={()=>{setColor(colors.COLOR3);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR4}} onClick={()=>{setColor(colors.COLOR4);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR5}} onClick={()=>{setColor(colors.COLOR5);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR6}} onClick={()=>{setColor(colors.COLOR6);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR7}} onClick={()=>{setColor(colors.COLOR7);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR8}} onClick={()=>{setColor(colors.COLOR8);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR9}} onClick={()=>{setColor(colors.COLOR9);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR10}} onClick={()=>{setColor(colors.COLOR10);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR11}} onClick={()=>{setColor(colors.COLOR11);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR12}} onClick={()=>{setColor(colors.COLOR12);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR13}} onClick={()=>{setColor(colors.COLOR13);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR14}} onClick={()=>{setColor(colors.COLOR14);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR15}} onClick={()=>{setColor(colors.COLOR15);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR16}} onClick={()=>{setColor(colors.COLOR16);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR17}} onClick={()=>{setColor(colors.COLOR17);setColorsVisibility(false)}} className='color_circle'></div>
                <div style={{backgroundColor: "#" + colors.COLOR18}} onClick={()=>{setColor(colors.COLOR18);setColorsVisibility(false)}} className='color_circle'></div>
            </div>
        </div>
        <div className='create_project_buttons-wrapper'>
            <button onClick={()=>{dispatch(setCreateTag(false));setInputValue("");setColor(colors.COLOR18)}} className='create_project_cancel_button sidebar__text'>Отмена</button>
            <button onClick={()=>{createTag();dispatch(setCreateTag(false))}} disabled={inputValue.length<1 && inputValue.replace(/\s/g, '').length > 0} className='create_project_save_button sidebar__text'>Сохранить</button>
        </div>
    </div>
  </div>
);}