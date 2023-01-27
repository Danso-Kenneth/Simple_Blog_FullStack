import React from 'react'
import {EditFilled,DeleteColumnOutlined} from '@ant-design/icons'


const List=({items,removeItem,editItem})=> {
  return (
    <div>
      {items.map((item)=>{
        const{id,title}=item;
        return(
          <ul key={id}>
            <li>{title}</li>
               <div>
                <button type='button' onClick={()=>editItem(id)}>
                  <EditFilled/>
                </button>

                <button type='button' onClick={()=>removeItem(id)}>
                  <DeleteColumnOutlined/>
                </button>
               </div>
          </ul>
        )
      })}
  </div>
  )
}

export default List