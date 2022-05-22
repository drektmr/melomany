import {NavLink, useNavigate} from 'react-router-dom';
import {useContext} from "react";
import UserContext from "../context/UserContext";
/**
* Este es el header de nuestra página web
*/
function Header(){
 const {userLogged,setUserLogged} = useContext(UserContext);
 const navigation = useNavigate();
 /**
  * Función para cerrar sesión, eliminando el usuario en el localStorage y poniendo a cero el UserContext
  */
 const cerrarSession = ()=>{
  //Ponemos a cero el contexto
  setUserLogged([]);

  //Eliminamos los datos del usuario del localStorage
  localStorage.removeItem('user');

  //Reedirigimos a la página principal
  navigation("/", {replace: true});
 }
/*  <input type="text"  value="Buscar canciones, playlists o artistas..." onclick="if(this.value=='Buscar canciones, playlists o artistas...') this.value=''" onblur="if(this.value=='') this.value='Buscar canciones, playlists o artistas...'"/> */
return(
 <header>
   {userLogged.length!==0?<></>:<button><NavLink to="/register"> Registro</NavLink></button>}
   {userLogged.length!==0?<></>:<button><NavLink to="/">Iniciar sesión</NavLink></button>}
   {userLogged.length!==0?<button onClick={() => cerrarSession()}>Cerrar sesión</button>:<></>}
</header>
)
}
export default Header;
