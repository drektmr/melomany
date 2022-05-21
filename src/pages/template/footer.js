import { NavLink } from 'react-router-dom';
import Reproductor from './reproductor/reproductor';
import Reproductormovil from './reproductor/reproductormovil';

function Footer(){
    return(
        <footer>
       
        <div className="moviltablet">
            <Reproductormovil />
            <div> <input type="image" src="images/search.png"></input></div>
            <NavLink to="/user"><div><input type="image" src="images/casa.png"></input></div></NavLink>
            <NavLink to="/main"><div><input type="image" src="images/library.png"></input></div></NavLink>
        </div>
            <div className="pc">
            <Reproductor />
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