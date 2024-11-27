import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const [data , setdata] = useState(null)
  const [loading , setloading] = useState(false)
  const [error , seterror] = useState(false)
  useEffect(()=>{
    
      axios.get("http://localhost:3000/api/users")
      .then((res) =>setdata(res.data),
        
      
    ).catch(err => seterror(true)
    
    
  ).finally(
    setloading(false)
  )
  
  data && console.log(data)

  },[])
  
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const Addtodo = (e)=>{
    e.preventDefault()
   try {
    axios.post("http://localhost:3000/api/user",{
      username : username.current.value,
      email : email.current.value,
      password : password.current.value,
      
    })
    console.log("data added");
    
   } catch (error) {
    console.log(err);
    
   }
  
  }
  const  Deltodo = (id)=>{
    try {
      axios.delete(`http://localhost:3000/api/user/${id}`)
      console.log("deleted");
      
    } catch (error) {

      console.log(error);
      
    }
  }
  const  detail = async (id)=>{
    try {
     const data = await axios.get(`http://localhost:3000/api/user/${id}`)
      console.log(data.data);
      
    } catch (error) {

      console.log(error);
      
    }
  }
  const  Edittodo = (id)=>{
     const username = prompt("Enter Value")
   try {
    axios.put(`http://localhost:3000/api/user/${id}`,{
      username,
     })
     console.log("update");
     
   } catch (error) {
    console.log(error);
    
   }
  }
  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={Addtodo} >
        <input type="text" placeholder='Enter username' ref={username}/>
        <input type="email" placeholder='Enter email' ref={email}/>
        <input type="password" placeholder='Enter password' ref={password}/>
        <button type='submit'>Add todo</button>
      </form>
      {loading && <h3>Loading</h3>}
      {error && <h3>Error Occured</h3>}
      {data && data.length > 0 ? data.map((item)=>{
        return(
          <div key={item._id} style={{border: "1px solid black",padding:20, margin :20 ,borderRadius:20}}>
          <p>{item.username}</p>
          <p>{item.email}</p>
          <p>{item.password}</p>
          <button onClick={()=>detail(item._id)}>see detail</button>
          <button onClick={()=>Deltodo(item._id)}>Delete</button>
          <button onClick={()=>Edittodo(item._id,)}>Edit</button>
        </div>
        )

      }):<h3>No Data Found</h3>}

    </div>
  )
}

export default App