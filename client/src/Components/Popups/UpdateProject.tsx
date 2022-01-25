import React, { useEffect, useState } from 'react'
import * as colors from '../../colors'
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateProject } from '../../Actions/view';
import { updateProject } from '../../Actions/projects';
import { RootState } from '../../store';
import { Plus } from '../Icons';
import './../Main/Main.css'
import { Project } from '../../entries';

export default function UpdateProject(props: any) {
  const dispatch = useDispatch()
  const view = useSelector(((state: RootState) => state.view))
  const projects = useSelector((state: RootState) => state.projects)

  const [currentProject, setCurrentProject] = useState<Project>({id_project: 0, name: "", color: ""})
  const [inputValue, setInputValue] = useState("")
  const [color, setColor] = useState("")
  const [colorsVisibility, setColorsVisibility] = useState(false)

  useEffect(()=> {
      setCurrentProject(projects.filter(project => project.id_project === view.updatingId)[0])
      setInputValue(currentProject ? currentProject.name : "")
      setColor(currentProject ? currentProject.color : "")
  }, [currentProject, projects, view.updatingId])

  return (
  <div style={{display: (view.isUpdateProject?'block':'none')}}>
    <div className='create_project__background'></div>
    <div className='create_project context-menu'>
        <div className='create_project_title-wrapper'>
            <p className='create_project__title'>Изменение проекта</p>
            <div className='exit_icon' onClick={()=>{dispatch(setUpdateProject(false))}}>
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
            <button onClick={()=>{dispatch(setUpdateProject(false))}} className='create_project_cancel_button sidebar__text'>Отмена</button>
            <button onClick={()=>{dispatch(updateProject({id_project: currentProject.id_project, name: inputValue, color: color}));dispatch(setUpdateProject(false))}} disabled={inputValue.length<1 && inputValue.replace(/\s/g, '').length > 0} className='create_project_save_button sidebar__text'>Сохранить</button>
        </div>
    </div>
  </div>
);}