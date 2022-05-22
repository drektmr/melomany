import {createContext} from "react";
/**
 * Contexto para indicar si se esta reproduciendo una canción o no
 * @type {React.Context<boolean>}
 */
const isPlayingContext = createContext(false);

export default isPlayingContext;