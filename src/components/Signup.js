import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials,setCredentials] = useState({username:"",email:"",password:""});
  const handleChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }
  const handleSumbit=(e)=>{
    e.preventDefault();
    const success = registerUser(credentials.username,credentials.email,credentials.password);
    if (success) {
      navigate("/");
      // props.showAlert("User Signed Up Successfully", "success");
    } else {
      // Handle registration failure (e.g., show an error message)
      console.error("Registration failed");
    }
  }
  const registerUser=async(username,email,password)=>{
    let response = await fetch('http://127.0.0.1:5000/api/auth/register',
      {
        method:'POST',
        headers:{
          'content-Type':'application/json',
        },
        body:JSON.stringify({username,email,password}),
      });
      const {success,token} =await response.json();
      if(success===true){
        console.log(success+"  "+token);
        localStorage.setItem('token',token);
  
        // props.showAlert("User Signed Up Successfully","success");
      }
  }

  return (
    <>
    <form onSubmit={handleSumbit}>
    <div className="mb-3 my-5">
    <label htmlFor="username" className="form-label">Enter Username</label>
    <input type="text" onChange={handleChange} name='username' className="form-control" id="username" value={credentials.username}></input>
  </div>
      
  <div className="mb-3 my-5">
    <label htmlFor="email"   className="form-label">Email address</label>
    <input type="email" onChange={handleChange} name='email' className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email}></input>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password"  className="form-label">Password</label>
    <input type="password" onChange={handleChange} name='password' value={credentials.password} className="form-control" id="password"></input>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}

export default Signup