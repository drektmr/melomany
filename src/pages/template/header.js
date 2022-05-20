import {NavLink, useNavigate} from 'react-router-dom';
import {useContext} from "react";
import UserContext from "../context/UserContext";
function Header(){
 const {userLogged,setUserLogged} = useContext(UserContext);
 const cerrarSession = ()=>{
  setUserLogged([]);
  localStorage.removeItem('user');
  console.log(userLogged);
 }
/*  <input type="text"  value="Buscar canciones, playlists o artistas..." onclick="if(this.value=='Buscar canciones, playlists o artistas...') this.value=''" onblur="if(this.value=='') this.value='Buscar canciones, playlists o artistas...'"/> */
return(
 <header>
   {userLogged.length!==0?<></>:<button><NavLink to="/register"> Registro</NavLink></button>}
   {userLogged.length!==0?<></>:<button><NavLink to="/login">Iniciar sesión</NavLink></button>}
   {userLogged.length!==0?<button onClick={() => cerrarSession()}>Cerrar sesión</button>:<></>}
</header>
)
}
export default Header;