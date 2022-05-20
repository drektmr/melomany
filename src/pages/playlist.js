import Aside from './template/aside';
import Main from './template/main';
import Footer from './template/footer';
import Header from './template/header';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import UserContext from "./context/UserContext";

function Playlist(){
    const {userLogged,setUserLogged} = useContext(UserContext);
    const navigation = useNavigate();
return(
    <>
        {userLogged.length!==0?"":navigation("/login", {replace: true})}
        <Header />
        <Aside />
        <Main />
        <Footer />
    </>
)
}
export default Playlist;