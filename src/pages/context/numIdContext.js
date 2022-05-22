import {createContext} from "react";

/**
 * Contexto generado que contendrá un número, con este seleccionaremos que archivo queremos de la playlist y lo asignameros al contexto song siempre que cambiemos
 * @type {React.Context<null>}
 */

const numIdContext = createContext(null);

export default numIdContext;
