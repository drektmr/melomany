import {useContext, useReducer, useState} from "react";
import UserContext from "./context/UserContext";
import {useNavigate} from "react-router-dom";
import Header from "./template/header";
import user from "./user";

function Profile() {
    const [password, setPassword] = useState();
    const {userLogged, setUserLogged} = useContext(UserContext);
    /**
     * Expresiones regulares para filtrar correctamente los datos de registro
     * @type {{lastName: RegExp, country: RegExp, password: RegExp, name: RegExp, description: RegExp, email: RegExp}}
     */
    const regexs = {
        description: /^[a-zA-ZÀ-ÿ\s]{1,250}$/,
        country: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        direction: /^[a-zA-ZÀ-ÿ\s]{1,250}$/,
        creditCard: /^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$/
    };
    /**
     * Valor iniciales de los posibles errores
     * @type {{lastName: string, country: string, password: string, name: string, description: string, dateBirth: string, email: string}}
     */
    const initialError = {description: "", dateBirth: "", country: "", login: "", direction: "", creditCard: ""};

    /**
     * Constante donde almacenamos los errores con useReducer
     */
    const [error, updateError] = useReducer(
        (error, updates) => ({
            ...error,
            ...updates,
        }),
        initialError
    );
    const navigation = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        let user = {};
        [...e.target].map((element) => {
            if(!element.value) {
                if (element.name === "description") {
                    element.value = userLogged.description
                } else if (element.name === "dateBirth") {
                    element.value = userLogged.dateBirth
                } else if (element.name === "country") {
                    element.value = userLogged.country
                }
            }
            user[element.name] = element.value;
            if (element.type !== "submit") {
                return validation(element)
            }
            ;
        })
        user["email"] = userLogged.email;
        if (!error.description && !error.dateBirth && !error.country && !error.login && !error.direction && !error.creditCard) {
            fetch("http://192.168.25.5:8080/users/updateUser", {
                method: "post",
                body: JSON.stringify(user),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.error) {
                        updateError({"login": data.error});
                    }
                    if (data.err) {
                        updateError({"login": data.err});
                    }else {
                        console.log(error);
                        userLogged.dateBirth = user.dateBirth;
                        userLogged.description = user.description;
                        userLogged.country = user.country;
                        userLogged.direction = user.direction;
                        userLogged.creditCard = user.creditCard;
                        localStorage.setItem('user', JSON.stringify(userLogged));
                        navigation("/user", {replace: true});
                    }
                })
        }
    }
    /**
     * Función donde comprobaremos cada uno de los campos del formulario si cumplen los requisitos de la expresión regular
     * @param e
     */
    const onChange = (e) => {
        let data = {
            name: e.nativeEvent.path[0].name,
            value: e.nativeEvent.path[0].value
        }
        validation(data)
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
        if (name === "description" && !regexs.description.test(value)) {
            msg = "Formato erroneo";
        } else if (name === "country" && !regexs.country.test(value)) {
            msg = "Formato erroneo"
        } else if (name === "direction" && !regexs.direction.test(value)) {
            msg = "Formato erroneo"
        } else if (name === "creditCard" && !regexs.creditCard.test(value)) {
            msg = "Formato erroneo"
        } else {
            msg = false
        }

        updateError({[name]: msg})
    }

    return (
        <>
            <Header/>
            <div className={"userData"}>
                <form className={"data"} id="main" onSubmit={handleSubmit} noValidate>
                    <h1>Edita tu perfíl</h1>
                    {console.log(userLogged)}
                    <p className="error">{error.login}</p>
                    <p type="Cambia tu fecha de nacimiento:"><input type="date" id="dateBirth" placeholder="Repite la contraseña" name="dateBirth"></input></p>
                    <p className="errors">{error.dateBirth}</p>
                    <p type="Cambia tu descripción:"><input type="text" id="description" placeholder="..." name="description"></input></p>
                    <p className="errors">{error.description}</p>
                    <p type="Cambia tu país:"><input type="text" id="country" placeholder="Introduce tu país" name="country"></input>
                    </p>
                    <p className="errors">{error.country}</p>
                    <p type="Cambia tu dirección:(Opcional)"><input type="text" id="direction" placeholder="Introduce tu dirección" name="direction"></input></p>
                    <p className="errors">{error.direction}</p>
                    <p type="Introduce o cambia tu tarjeta de crédito o debito:(Opcional)"><input type="text" id="creditCard" placeholder="****-****-*****-****" name="creditCard"></input>
                    </p>
                    <p className="errors">{error.creditCard}</p>
                    <input className={"buttonform"} name="sendLogin" type="submit"/>
                </form>
            </div>
        </>
    );
}

export default Profile;