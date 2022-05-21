import {createContext} from "react";

/**
 * Contexto generado para almacenar las listas de reproducción de cada usuario
 * @type {React.Context<boolean>}
 */
const PlaylistsContext = createContext(false);

export default PlaylistsContext;