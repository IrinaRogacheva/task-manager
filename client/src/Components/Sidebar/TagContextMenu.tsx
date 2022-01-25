import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteTag } from '../../Actions/tags';
import { setUpdateTag, setUpdatingId } from '../../Actions/view';
import { ContextMenuIcon } from '../Icons';
import './../Main/Main.css'

export function TagContextMenu(props: any) {
  const dispatch = useDispatch()

  const [isTagHover, setIsTagHover] = useState(false)

  let contextMenuIcon: JSX.Element;
  if (isTagHover) {
    contextMenuIcon = <ContextMenuIcon {...{fill: "#7a7a7a"}}/>
  } else {
    contextMenuIcon = <ContextMenuIcon {...{fill: "#a3a3a3"}}/>
  }

  const setTagContextMenuVisible = ()=> {
    const tagContextMenu = document.querySelector(`[data-name="tag_context_menu_${props.id_tag}"]`)
    if (tagContextMenu)
    {
      if ((tagContextMenu as HTMLElement).style.display === 'none') {
        (tagContextMenu as HTMLElement).style.display = "block"
      } else {
        (tagContextMenu as HTMLElement).style.display = "none"
      }
    }
  }

  const closeTagContextMenu = ()=> {
    const tagContextMenu = document.querySelector(`[data-name="tag_context_menu_${props.id_tag}"]`)
    if (tagContextMenu)
    {
     (tagContextMenu as HTMLElement).style.display = "none"
    }
  }

    return (
      <>
        <div onClick={setTagContextMenuVisible} className='main_context-menu-wrapper sidebar_context-menu-wrapper' onMouseEnter={()=>{setIsTagHover(true)}} onMouseLeave={()=>{setIsTagHover(false)}}>
          {contextMenuIcon}
        </div>
        <div data-name={`tag_context_menu_${props.id_tag}`} className="tag-context-menu context-menu" style={{display: 'none'}} tabIndex={0}>
          <button className='task-context-menu__button' onClick={()=>{dispatch(deleteTag(props.id_tag))}}>
            <p className="sidebar__text task-context-menu__text">Удалить</p>
          </button>
          <button className='task-context-menu__button' onClick={()=>{dispatch(setUpdateTag(true));dispatch(setUpdatingId(props.id_tag));closeTagContextMenu()}}>
            <p className="sidebar__text task-context-menu__text">Изменить</p>
          </button>
        </div>
      </>
      );
}