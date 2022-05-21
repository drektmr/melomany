import {useContext} from "react";
import PlaylistsContext from "../context/PlaylistsContext";

function Aside(){
  const {playlists} = useContext(PlaylistsContext);
  return (
    <aside>
    <img id="logo" src="images/logo.png"></img>
        <ul>
            <li key="Playlists">Playlists</li>
            {playlists.map((playlist)=>(
                <li key={"Playlists_"+playlist.id}>{playlist.name}</li>
            ))}
        </ul> 
    </aside>
  )
  }
  export default Aside;
  
  