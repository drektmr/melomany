import Aside from './template/aside';
import Main from './template/main';
import Footer from './template/footer';
import Header from './template/header';
/**
* Página en la que juntaremos las páginas creadas previamente, para poder reproducir listas
*/
function Playlist(){
return(
    <>
        <Header />
        <Aside />
        <Main />
        <Footer />
    </>
)
}
export default Playlist;
