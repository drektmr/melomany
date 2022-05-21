import Asideuser from './template/asideuser';
import Mainuser from './template/mainuser';
import Footer from './template/footer';
import Header from "./template/header";

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