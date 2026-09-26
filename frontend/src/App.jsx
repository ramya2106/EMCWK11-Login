import {useState} from 'react';
import axios from 'axios';

function App(){
  const[form,setForm] = useState({
    email: "",
    password: ""
  })
  const [message,setMessage] = useState("");
  const [user,setUser] = useState(null);

  const handleChange=(e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleLogin = async(e)=>{
    console.log("enter")
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:5000/api/login",form);
      setMessage(response.data.message);
      setUser(response.data.user);
    } catch(error){
      setMessage(error.response?.data?.message || "Something Went Wrong")
    }
  }
  return(
    <>
    <h1>Login</h1>
    <form onSubmit={handleLogin}>
      <input type="email" name="email" placeholder="Enter Email" value={form.email} onChange={handleChange}/>
      <input type="password" name="password" placeholder="Enter password" value={form.password} onChange={handleChange}/>
      <button type="submit">Login</button>
    </form>
    <h3>{message}</h3>
    {user && (
      <div>
        <h2>Welcome {user.name}</h2>
        <p>{user.email}</p>
      </div>
    )}
    </>
  )
}

export default App
