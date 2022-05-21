import {useContext} from "react";
import PlaylistsContext from "../context/PlaylistsContext";
import CurrentPlaylistContext from "../context/CurrentPlaylistContext";

function Aside(){
  const {playlists} = useContext(PlaylistsContext);
  const {setCurrentPlaylist} = useContext(CurrentPlaylistContext);
  return (
    <aside>
    <img id="logo" src="images/logo.png"></img>
        <ul>
            <li key="Playlists">Playlists</li>
            {playlists.map((playlist)=>{
                return <li onClick={()=>{setCurrentPlaylist(playlist)}} key={"Playlists_"+playlist.id}>{playlist.name}</li>
            })}
        </ul> 
    </aside>
  )
  }
  export default Aside;
  
  