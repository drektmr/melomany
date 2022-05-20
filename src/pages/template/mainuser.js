import {useContext} from "react";
import UserContext from "../context/UserContext";

function Mainuser(){
    function calcularEdad(fecha) {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    }
    const {userLogged} = useContext(UserContext);
    return(
        <main className="usuari_main">
        <div className="moviltablet_usuari_main">
            <img id="usuario" src="images/prueba1"></img>
            <div className="usuari">
                <p>Nombre completo</p>
                <p>{userLogged.name+" "+userLogged.lastName}</p>
                <p>Edad</p>
                <p>{calcularEdad(userLogged.dateBirth)+" años"}</p>
                <p>Fecha de nacimiento</p>
                <p>{userLogged.dateBirth.substring(0,10)}</p>
                <p>País</p>
                <p>{userLogged.country?userLogged.country:"Aquí indicas tu país"}</p>
            </div>
        </div>
        <h1>Biografia</h1>
        <div id="usuari_main_info">
            <p>{userLogged.description?userLogged.description:"Aquí puedes poner una breve descripción."}</p>
        </div>
    </main>
    )
}
export default Mainuser