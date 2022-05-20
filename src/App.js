import './App.css';
import React,{useState,useEffect} from 'react';
// import Header from './pages/template/header';
import Login from './pages/login';
import Register from './pages/register';
import Playlist from './pages/playlist';
import User from './pages/user';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import SongsContext from './pages/context/SongsContext';
import audioContext from './pages/context/audioContext';
import numIdContext from './pages/context/numIdContext';
import isPlayingContext from './pages/context/isPlayingContext';
import UserContext from "./pages/context/UserContext";
import Main from "./pages/template/main";

function App() {
  const [songs,setSongs] = useState([]);
  const [num , setNum] = useState(0);
  const audio = useState(null);
  const [isPlaying,setIsPlaying] = useState(false);
  const [userLogged, setUserLogged] = useState(JSON.parse(localStorage.getItem('user')) || []);
  return (
    <>
      <UserContext.Provider value={{userLogged, setUserLogged}}>
      <SongsContext.Provider value={{songs,setSongs}}>
      <numIdContext.Provider value={{num, setNum}}>
      <audioContext.Provider value={audio}>
      <isPlayingContext.Provider value={{isPlaying,setIsPlaying}}>
        <Router>        
            <Routes>
                    <Route path="/" element={<Playlist />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user" element={<User />}/>        
            </Routes>
        </Router>
      </isPlayingContext.Provider>
      </audioContext.Provider>
      </numIdContext.Provider>
      </SongsContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
