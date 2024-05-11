import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {onAuthStateChanged,auth} from './Config/C'
import Note from "./pages/Note";
import Home from "./pages/Home";
import All from "./pages/All";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Userdas from "./pages/Userdas";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Page from './pages/Page'
// Admin 
import Admin from "./Admin/Adlogin";
import Addas from "./Admin/Addas";
import Loader from "./Components/Loader";
import { useState,useEffect } from "react";

function App() {
  const [user , setuser] = useState('')
  let get = () => onAuthStateChanged(auth, (user) => {
    if (user) {
      setuser(user)
    } else {
    }
  });
  useEffect(() => {
    get()
  }, [])
  return (
    <div>
     <BrowserRouter>
     <Routes>
        <Route path="*" element={<Note />} />
        <Route path="/" element={<Home />} />
        <Route path="/All" element={ <All /> } />
        <Route path="/contact" element={<Contact /> } />
        <Route path="/Signup" element={ <Signup /> } />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/userdas" element={ user && <Userdas /> } />
        <Route path="/Post" element={ user && <Post /> } />
        <Route path="/Profile" element={ user &&  <Profile /> } />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Addas" element={<Addas />} />
        <Route path="/Loader" element={<Loader />} />
        <Route path="/page" element={<page />} />
      </Routes>
     </BrowserRouter>
     
    </div>
  );
}

export default App;
