import {createContext} from "react";

/**
 * Contexto generado para almacenar todas las canciones de una lista de produccion
 * @type {React.Context<null>}
 */
const SongsContext = createContext(null);

export default SongsContext;