import { NavLink,useNavigate} from 'react-router-dom';
import {useContext, useReducer} from "react";
import UserContext from "./context/UserContext";
/**
* Página en la que haremos el login
*/
function Login(){
    const navigation = useNavigate();
    const {setUserLogged} = useContext(UserContext);
    /**
     * Valores iniciales de los errores del login
     * @type {{password: string, email: string}}
     */
    const initialError = {email: "", password: "", login: ""};

    /**
     * Constante donde almacenaremos los errores de login mediante useReducer
     */
    const [error, updateError] = useReducer(
        (error, updates) => ({
            ...error,
            ...updates,
        }),
        initialError
    );

    /**
     * Función donde paramos el envio de un formulario de login y comprobamos la información y de ser correcta obtenemos los datos del usuario
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        let user={};
        [...e.target].map((element) => {
            user[element.name]=element.value;
            if (element.type !== "submit"){ return validation(element);}
        })
        if (!error.email && !error.password) {
            fetch("http://192.168.25.4:8080/users/loginUser", {
                method: "post",
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },body: JSON.stringify(user)
            })
                .then(response => response.json()
                )
                .then((data)=>{
                    if(data.error){
                        updateError({["login"]: data.error});
                    }else{
                        setUserLogged(data);
                        localStorage.setItem('user', JSON.stringify(data));
                        navigation("/user", {replace: true});
                    }
                })
        }
    }

    /**
     * Función para validar los datos del usuario
     * @param target
     */

    const validation = (target) => {
        // Desestructuració de name, type i value de target
        let name = target.name;
        let value = target.value;
        let msg; // Variable on es desarà el missatge d'error
        //Comprova si té l'attribut required i té algun valor)
        if (name === "email" && !value) {
            msg = "Email is required"
        } else if (name === "password" && !value) {
            msg = "Password is required"
        } else {
            msg = false;
        }
        updateError({[name]: msg});
    }

    return(
        <>
            <form className="form" onSubmit={handleSubmit} noValidate>
                <h2>LOGIN</h2>
                <p className="error">{error.login}</p>
                <p type="Email:"><input type="text" placeholder="Correo electrónico" name="email"></input></p>
                <p className="error">{error.email}</p>
                <p type="Password:"><input type="password" placeholder="Escribe tu contraseña" name="password"></input></p>
                <p className="error">{error.password}</p>
                <input className={"buttonform"} name="sendLogin" type="submit" value={"Iniciar sesión"}/>
                <div>
                    <NavLink to="/register">No tienes una cuenta? Registrate </NavLink>
                </div>
            </form>
        </>
    )
}
export default Login;
