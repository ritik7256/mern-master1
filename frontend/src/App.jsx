
import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";

function App() {
  const [form,setForm]=useState({
    name:"",
    email:"",
    age:"",
    number:""
  })
  const [item,setItem]=useState([]);

  useEffect(()=>{
     fetchdata();
  },[])
  const fetchdata=async()=>{
    const response= await axios.get("http://localhost:8080/demo");
     
     setItem([...item,response.data]);

  }
  const handleChange=(e)=>{
      setForm({
      ...form,
        [e.target.name]:e.target.value
      })
     
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the server
      const response = await axios.post("http://localhost:8080/demo", form);

      // Check if the server returned the created item
      if (response.data) {
        // Add the new item to the list immediately
        setItem((prevItems) => [...prevItems, response.data]);

        // Reset the form fields
        setForm({ name: "", email: "", age: "", number: "" });
      } else {
        console.error("No data returned from server.");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <>
     <div>
      <p>{JSON.stringify(form)}</p>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="Name">name</label>
        <input type="text" name='name' onChange={handleChange} />
        <label htmlFor="email">email</label>
        <input type="text" name='email' onChange={handleChange}/>
        <label htmlFor="age" >age</label>
        <input type="number" name='age' onChange={handleChange} />
        <label htmlFor="phone number">number</label>
        <input type="number"name='number' onChange={handleChange} />
        <input type="submit" />
        
      </form>
      <div>
        <ul>
          {item.map((users)=><li key={users._id}>{users.name},{users.age},{users.number},{users.email}</li>)}
        </ul>
      </div>
     </div>
    </>
  )
}

export default App
