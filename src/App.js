import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Alert from './components/Alert';

function App() {
  const [alert,setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
   <BrowserRouter>
   <div>
   <Navbar/>
   <Alert alert={alert}/>
   <div className="container">
   <Routes>
    <Route  path='/' element=
    {<Home />}/>
      <Route  path='/about' element=
    {<About/>}/>
   <Route  path='/login' element=
    {<Login />}>
   </Route>
   <Route path='/signup' element=
    {<Signup />}>
   </Route>
   </Routes> 
   </div>
</div>
   </BrowserRouter>
  );
}

export default App;
