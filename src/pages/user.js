import Asideuser from './template/asideuser';
import Mainuser from './template/mainuser';
import Footer from './template/footer';
import Header from "./template/header";
/**
* Aquí juntaremos varias páginas para visualizar el perfil del usuario
*/
function User() {
    return (
        <>
            <Header/>
            <Asideuser/>
            <Mainuser/>
            <Footer/>
        </>
    )
}

export default User;
