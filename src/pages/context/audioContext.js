import {createContext} from "react";

/**
 * Contexto generado para administrar el archivo de audio que se usa en este momento
 * @type {React.Context<null>}
 */

const audioContext = createContext(null);

export default audioContext;
