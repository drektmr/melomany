import Asideuser from './template/asideuser';
import Mainuser from './template/mainuser';
import Footer from './template/footer';
import {useContext, useEffect} from "react";
import UserContext from "./context/UserContext";

function User(){
    const {userLogged} = useContext(UserContext);
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(userLogged))
    }, [userLogged])
return(
    <>
        <Asideuser />
        <Mainuser />
        <Footer />
    </>
)
}
export default User;