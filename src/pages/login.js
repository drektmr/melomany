import { NavLink,useNavigate} from 'react-router-dom';
import React, {useState, useContext, useReducer, useEffect} from "react";
import UserContext from "./context/UserContext";
function Login(){
    const navigation = useNavigate();
    const {userLogged,setUserLogged} = useContext(UserContext);
    /*    const [email, setEmail] = useState();
        const [password, setPassword] = useState();*/
    const initialError = {email: "", password: ""};
    const [error, updateError] = useReducer(
        (error, updates) => ({
            ...error,
            ...updates,
        }),
        initialError
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        let user={};
        [...e.target].map((element) => {
            user[element.name]=element.value;
            if (element.type !== "submit"){ return validation(element);}
        })
        if (!error.email && !error.password) {
            fetch("http://192.168.25.5:8080/users/loginUser", {
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
                    if (data["email"]) {
                        console.log(data.dateBirth);
                        setUserLogged(data);
                    }
                })
        }
    }
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
            {console.log(userLogged)}
            {userLogged.length!==0?navigation("/user", {replace: true}):""}
            <form className="form" onSubmit={handleSubmit} noValidate>
                <h2>LOGIN</h2>

                <p type="Email:"><input type="text" placeholder="Correo electrónico" name="email"></input></p>
                <p className="red">{error.email}</p>
                <p type="Password:"><input type="password" placeholder="Escribe tu contraseña" name="password"></input></p>
                <p className="red">{error.password}</p>
                <input name="sendLogin" type="submit" value={"Iniciar sesión"}/>
                <div>
                    <NavLink to="/register">No tienes una cuenta? Registrate </NavLink>
                </div>
            </form>
        </>
    )
}
export default Login;