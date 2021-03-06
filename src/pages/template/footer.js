import {NavLink, useNavigate} from 'react-router-dom';
import Reproductor from './reproductor/reproductor';
import Reproductormovil from './reproductor/reproductormovil';
import isPlayingContext from "../context/isPlayingContext";
import {useContext, } from "react";
import UserContext from "../context/UserContext";
/**
* Este es el footer de nuestra página se podrá ver en playlist, en ella estarán ubicados los menús de reproducción
 * {isPlaying?<Reproductormovil />:footer.current.style.height=150}
*/
function Footer(){
    const {isPlaying} = useContext(isPlayingContext);
    const navigation = useNavigate();
    const {setUserLogged} = useContext(UserContext);

    return(
        <footer >
            <div className="moviltablet">
                <Reproductormovil />
            <NavLink to="/" onClick={()=>{
                //Ponemos a cero el contexto
                setUserLogged([]);

                //Eliminamos los datos del usuario del localStorage
                localStorage.removeItem('user');

                //Reedirigimos a la página principal
                navigation("/", {replace: true});
            }}><div> <input type="image" src="images/logout.png"></input></div></NavLink>
            <NavLink to="/user"><div><input type="image" src="images/casa.png"></input></div></NavLink>
            <NavLink to="/main"><div><input type="image" src="images/library.png"></input></div></NavLink>
        </div>
            <div className="pc">
              <Reproductor/>
            <div>
                <div>
                    <p>Contacto</p>
                    <p>Politicas de privacidad</p>
                    <p>Acerca de nosotros</p>
                </div>
                <div>
                    <NavLink to="/main"><img src="images/logo.png"></img></NavLink>
                </div>
                <div>
                    <a href={"https://instagram.com"}><img src="images/instagram.png"></img></a>
                    <a href={"https://facebook.com"}><img src="./images/facebook.png"></img></a>
                    <a href={"https://twitter.com"}><img src="images/twitter.png"></img></a>
                </div>
            </div>
        </div>
    </footer>
    )
}
export default Footer;
