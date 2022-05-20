import { NavLink } from 'react-router-dom';
import Reproductor from './reproductor/reproductor';
import Reproductormovil from './reproductor/reproductormovil';
function Footer(){
   

    return(
        <footer>
       
        <div className="moviltablet">
            <Reproductormovil />
            <div> <input type="image" src="images/search.png"></input></div>
            <div> <input type="image" src="images/casa.png"></input></div>
            <div> <input type="image" src="images/library.png"></input></div>
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
                    <NavLink to="/"><img src="images/logo.png"></img></NavLink>
                </div>
                <div>
                    <img src="images/instagram.png"></img>
                    <img src="./images/facebook.png"></img>
                    <img src="images/twitter.png"></img>
                </div>
            </div>
        </div>
    </footer>
    )
}
export default Footer;