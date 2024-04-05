import { useState } from 'react';
import './App.css';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import { set } from 'mongoose';


function App() {
  const [user,setLoginUser] = useState({
    // name:"",
    // email:"",
    // password:""
  })
  const handleSetUser = (userData)=>{
    setLoginUser(userData);

  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={user && user._id ? <Homepage user={user} setLoginUser={handleSetUser}/>:<Login setLoginUser={handleSetUser}/>}/>
          <Route path="/login" element={<Login setLoginUser={setLoginUser}/>}/>
          <Route path="/register"element ={<Register/>}/>
        </Routes>
      </Router>
        
      </div>
  );
}

export default App;
