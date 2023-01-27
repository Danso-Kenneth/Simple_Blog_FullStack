import React,{useEffect,useState} from 'react';
import List from './components/List';
import Alert from './components/Alert';


// const getLocalStorage=()=>{
//   let list=localStorage.getItem('list')

//   if(list){
//     return (list=JSON.parse(localStorage.getItem('list')))
//   }else{
//     return []
//   }

// }

const getLocalStorage=()=>{
  let list=localStorage.getItem('list')
  if(list){
    return (list=JSON.parse(localStorage.getItem('list')));
  }else{
    return []
  }
}



function App() {
  const [name,setName]=useState('');
  const [list,setlist]=useState(getLocalStorage());
  const [isEditing,setisEditing]=useState(false);
  const [editID,setEditID]=useState(null);
  const [alert,setAlert]=useState({show:false,type:"",msg:""});

useEffect(()=>{
   localStorage.setItem('list',JSON.stringify(list))
},[list])

  const handleSubmit=(e)=>{
    e.preventDefault()

    if(!name){
      showAlert(true,"danger","Please add a name")
    }else if(name && isEditing){
      setlist(
        list.map((item)=>{
          if (item.id === editID){
            return {...item,title:name}
          }
          return item
        })
       )
     
      setName("")
      setEditID(null)
      setisEditing(false)
      showAlert(true,'success','ValueChange')

    }else{
      showAlert(true,'success','Item added')
      const newItem={id:new Date().getTime().toString() ,title:name}
      setlist([...list,newItem])
      setName("")
    }
  }

  const clearList=()=>{
    showAlert(true,'danger','Empty List')
    setlist([])
  }


  const editItem=(id)=>{
    const editItem=list.find((item)=>item.id===id)
    setisEditing(true)
    setEditID(id)
    setName(editItem.title)
  }


  
  const removeItem=(id)=>{
    showAlert(true,'danger','Items deleted')
    prompt("Do you want to delete this item")
    setlist(list.filter(item=>item.id !== id))
  }

  const showAlert=(show=false,type="",msg="")=>{
    setAlert({show,type,msg})
  }



  
  return (
    <div>
      CRUD operations and localStorage
   <form onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
      <div>
        <input type="text" placeholder='eg.coffee' value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>

      <button>{isEditing ? 'Editing' : 'Submit'}</button>
   </form>
     {list.length > 0 && (
        <div>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button onClick={clearList}>Clear button</button>
        </div>
     )}
    </div>
  )
}

export default App

