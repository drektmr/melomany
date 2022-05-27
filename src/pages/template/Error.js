import Footer from "./footer";
import Header from "./header";
import Aside from "./aside";

function Error() {
    return (
        <>
            <Header/>
            <Aside/>
        <main className="error404">

            <h1>Error 404</h1>
            <div id="errorInfo">
                <p>Error 404 - página desconocida</p>
            </div>
            <Footer/>
        </main>
        </>
    );
}

export default Error;