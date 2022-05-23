import {useContext} from "react";
import UserContext from "../context/UserContext";

/**
* Este componente es el aside de nuestra página, se verá en la página User
*/

function Asideuser(){
    const {userLogged} = useContext(UserContext);

    /**
     * Función para calcular la edad mediante una fecha de nacimiento
     * @param fecha
     * @returns {number}
     */
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

    return(
    <aside className="perfil">
    <img id="usuario" src="images/prueba1"></img>
        <table className="usuari">
            <tbody>
            <tr>
                <td>Nombre completo</td>
                <td>{userLogged.name+" "+userLogged.lastName}</td>
            </tr>
            <tr>
                <td>Edad</td>
                <td>{calcularEdad(userLogged.dateBirth)+" años"}</td>
            </tr>
            <tr>
                <td>Fecha de nacimiento</td>
                <td>{userLogged.dateBirth.substring(0,10)}</td>
            </tr>
            <tr>
                <td>País</td>
                <td>{userLogged.country?userLogged.country:"Aquí indicas tu país"}</td>
            </tr>
            </tbody>
        </table>
    </aside>
)
}
export default Asideuser;
