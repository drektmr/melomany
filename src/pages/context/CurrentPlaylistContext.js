import {createContext} from "react";

/**
 * Contexto donde almacenamos la lista de producción desde donde se reproducirán las canciones
 * @type {React.Context<*[]>}
 */
const CurrentPlaylistContext = createContext([]);

export default CurrentPlaylistContext;