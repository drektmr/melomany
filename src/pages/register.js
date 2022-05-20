import { NavLink } from 'react-router-dom';
import React, {useContext, useReducer, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserContext from "./context/UserContext";
function Register(){
    const [password, setPassword] = useState();
    const {userLogged,setUserLogged} = useContext(UserContext);
    const initialError = {name:"", lastName:"" ,email: "", password: ""};
    const [error, updateError] = useReducer(
        (error, updates) => ({
            ...error,
            ...updates,
        }),
        initialError
    );
    const navigation=useNavigate();
    const regexs = {
        name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // No puede contener numeros
        lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // No puede contener numeros
        email: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, //Debe contener 8 caracteres minimo, 1 mayuscula, 1 minuscula y numeros
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let user={};
        [...e.target].map((element) => {
            console.log(element);
            user[element.name]=element.value;
            if (element.type !== "submit"){return validation(element)};
        })
        if(!error.name && !error.lastName && !error.email && !error.password){
            fetch("http://192.168.25.4:8080/users/registerUser", {
                method: "post",
                body: JSON.stringify(user),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            })
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    if (user["email"]) {
                        setUserLogged(user);
                        navigation("/",{replace: true});
                    }
                })
        }
    }


    const onChange = (e) => {
        let data={
            name: e.nativeEvent.path[0].name,
            value: e.nativeEvent.path[0].value
        }
        validation(data)
    }

    const validation = (target) => {
        // Desestructuració de name, type i value de target
        let name = target.name;
        let value = target.value;
        let msg; // Variable on es desarà el missatge d'error
        //Comprova si té l'attribut required i té algun valor)
        if(!value){
            if(name==="name"){
                msg = "El nombre es obligatorio"
            }else if(name==="lastName"){
                msg = "El segundo apellido es obligatorio"
            }else if(name==="email"){
                msg = "El email es obligatorio"
            }else if(name==="Password"){
                msg = "La contraseña es obligatoria"
            }
        }else{
            if(name==="name" && !regexs.name.test(value)){
                msg = "El nombre no puede tener símbolos o números";
            }else if(name==="lastName" && !regexs.lastName.test(value)){
                msg = "El apellido no puede tener símbolos o números";
            }else if(name==="email" && !regexs.email.test(value)){
                msg = "Formato erroneo";
            }else if(name==="password" && !regexs.password.test(value)){
                msg = "Formato erroneo";
            }else if(name==="confPassword" && value!==password){
                msg = "Las contraseñas no coinciden"
            }else{
                if(name==="password" && regexs.password.test(value)){
                    setPassword(value);
                }
                msg=false

            }
        }
        if(name==="confPassword"){
            updateError({password: msg});
        }else{

            updateError({[name]: msg})
        }
    }
    return(
        <>
            {userLogged!==0?"":navigation("/", {replace: true})}
            <form className="register" id="main" onSubmit={handleSubmit} noValidate>
                <h2>REGISTER</h2>
                <p type="Nombre:"><input type="text" id="nomdone" placeholder="Escribe tu nombre" name="name"  onChange={onChange} required></input></p>
                <p className="errors">{error.name}</p>
                <p type="Apellido:"><input type="text" id="cognomdone" placeholder="Escribe tu apellido" name="lastName" onChange={onChange} required></input></p>
                <p className="errors">{error.lastName}</p>
                <p type="Email:"><input type="text" id="maildone"placeholder="Correo electrónico" name="email" onChange={onChange} required></input></p>
                <p className="errors">{error.email}</p>
                <p type="Password:"><input type="password" id="passworddone"placeholder="Escribe la contraseña" name="password"  onChange={onChange} required></input></p>
                <p type="Repite la password:"><input type="password" id="passwordrepite" placeholder="Repite la contraseña" name="confPassword" required></input></p>
                <p type="Indica tu fecha de nacimiento:"><input type="date" id="dateBirth" placeholder="Repite la contraseña" name="dateBirth" required></input></p>
                <p type="Introduce una breve descripción:"><input type="text" id="description" placeholder="..." name="description" required></input></p>
                <p className="errors">{error.password}</p>
                <input name="sendLogin" type="submit"/>
                <div>
                    <NavLink to="/login">Ya tienes una cuenta? Iniciar Sesión </NavLink>
                </div>
            </form>
        </>
    )
}
export default Register;
