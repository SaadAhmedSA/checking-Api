import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const [data , setdata] = useState(null)
  const [loading , setloading] = useState(false)
  const [error , seterror] = useState(false)
  useEffect(()=>{
    
      axios.get("http://localhost:3000/users")
      .then((res) =>setdata(res.data.data),
        
      
      ).catch(err => seterror(true)
       

      ).finally(
         setloading(false)
      )
    

  },[])
  console.log(data);
  
  const todoval = useRef()
  const Addtodo = (e)=>{
    e.preventDefault()
    axios.post("http://localhost:3000/user",{
      title : todoval.current.value
    })
    todoval.current.value=""
  }
  const  Deltodo = (id)=>{
    axios.delete(`http://localhost:3000/user/${id}`)
  }
  const  Edittodo = (id,value)=>{
     const upt = prompt("Enter Value")
    axios.put(`http://localhost:3000/user/${id}`,{
      title : upt
    })
  }
  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={Addtodo} >
        <input type="text" placeholder='Enter Data' ref={todoval}/>
        <button type='submit'>Add todo</button>
      </form>
      {loading && <h3>Loading</h3>}
      {error && <h3>Error Occured</h3>}
      {data && data.length > 0 ? data.map((item)=>{
        return(
          <div key={item.id}>
          <p>{item.title}</p>
          <button onClick={()=>Deltodo(item.id)}>Delete</button>
          <button onClick={()=>Edittodo(item.id,item.title)}>Edit</button>
        </div>
        )

      }):<h3>No Data Found</h3>}

    </div>
  )
}

export default App