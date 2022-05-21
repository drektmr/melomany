import React,{useEffect,useContext,useRef} from 'react';
import SongsContext from '../context/SongsContext';
import numIdContext from '../context/numIdContext';
import isPlayingContext from '../context/isPlayingContext';
import audioContext from '../context/audioContext';
import UserContext from "../context/UserContext";
import PlaylistsContext from "../context/PlaylistsContext";
import CurrentPlaylistContext from "../context/CurrentPlaylistContext";

function Main(){
    const {userLogged} = useContext(UserContext);
    const {playlists,setPlaylists} = useContext(PlaylistsContext);
    const {currentPlaylist,setCurrentPlaylist} = useContext(CurrentPlaylistContext);
    const {songs,setSongs} = useContext(SongsContext);
    const {num,setNum} = useContext(numIdContext);
    const {isPlaying,setIsPlaying} = useContext(isPlayingContext);
    const audio = useContext(audioContext);

    const getSongs = (id) =>{
        fetch("http://192.168.25.5:8080/songs", {
            method: "post",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },body: JSON.stringify({playlistID:id})
        })
            .then(response => response.json()
            )
            .then((data)=>{
                if (data[0].name) {
                    setSongs(data);
                }
            })
    }
    const changePlaylist = (playlist) =>{
        setCurrentPlaylist(playlist);
    }

    const getPlaylists = () =>{
        console.log(userLogged.id);
        fetch("http://192.168.25.5:8080/playlists", {
            method: "post",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },body: JSON.stringify({id:userLogged.id})
        })
            .then(response => response.json()
            )
            .then((data)=>{
                if (data[0].name) {
                    setPlaylists(data);
                    console.log(playlists);
                }
            })
    }

    useEffect(()=>{
        getPlaylists();
        getSongs(1);
        },[userLogged])

   useEffect(() =>{
        if(isPlaying){
            audio.current.play();
            console.log("rula");
        }else{
            audio.current.pause();
            console.log("no rula")
        }
    }); 
        

return(
    <main>
    <div id="playlists">
    <h2>Tus playlists más escuchadas...</h2>
        <div id="morelistened">
            {playlists.map((playlist)=>(
                <div>
                    <div>
                        <img src="images/prueba1"></img>
                    </div>
                    <div>
                      <p onClick={changePlaylist(playlist)}>{playlist.name}</p>
                    </div>
                </div>
            ))
            }
        </div>
    </div>
    <div id="playlist">
        <div><img src="images/prueba1"></img></div>
        <div>
            <h1>Top 50 Mundial 2021</h1>
            <input type="image" src="images/playbutton.png" onClick={() => {setNum(0); setIsPlaying(true)}}></input>
        </div>
    </div>
    <div id="listarepro">
        <div id="playlist2">
            <div><img src="images/prueba1"></img></div>
            <div>
                <h1>{currentPlaylist.name}</h1>
                {<input type="image" src="images/playbutton.png" onClick={() => {setNum(0); setIsPlaying(true)}}></input>}
            </div>
        </div>
        <div>
            <p>Posición</p>
            <p>Titulo</p>
            <p>Artista</p>
            <p>Duración</p>
        </div>

            {songs && songs.length > 0 && songs.map((element, i) => {

                return <div className='songs' onClick={() => {setNum(i);setIsPlaying(true)}}>
                            <p>{i+1}</p>
                            <p>{element.title}</p>
                            <p>{element.artist}</p>
                            <p>{element.time}</p>
                      </div>
            })}
          
    </div>
</main>
)    
}
export default Main;