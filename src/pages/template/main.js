import {useEffect, useContext} from 'react';
import SongsContext from '../context/SongsContext';
import numIdContext from '../context/numIdContext';
import isPlayingContext from '../context/isPlayingContext';
import audioContext from '../context/audioContext';
import UserContext from "../context/UserContext";
import PlaylistsContext from "../context/PlaylistsContext";
import CurrentPlaylistContext from "../context/CurrentPlaylistContext";
/**
* Página main, aquí tenemos la información de nuestra Playlist
*/
function Main() {
    const {userLogged} = useContext(UserContext);
    const {playlists, setPlaylists} = useContext(PlaylistsContext);
    const {currentPlaylist, setCurrentPlaylist} = useContext(CurrentPlaylistContext);
    const {songs, setSongs} = useContext(SongsContext);
    const {num, setNum} = useContext(numIdContext);
    const {isPlaying, setIsPlaying} = useContext(isPlayingContext);
    const audio = useContext(audioContext);

    /**
     * Función con la que obtendremos las canciones de una lista de reproducción mediante fetch
     */
    const getSongs = (id) => {
        fetch("http://192.168.25.5:8080/songs", {
            method: "post",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify({playlistID: id})
        })
            .then(response => response.json()
            )
            .then((data) => {
                if (data.length !== 0) {
                    setSongs(data);
                }
            })
    }

    /**
     * Función con la que obtendremos las listas de reproducción del usuario logeado mediante fetch
     */
    const getPlaylists = () => {
        fetch("http://192.168.25.5:8080/playlists", {
            method: "post",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify({id: userLogged.id})
        })
            .then(response => response.json()
            )
            .then((data) => {
                if (data[0].name) {
                    setPlaylists(data);
                }
            })
    }

    /**
     * useEffect para cargar todas las listas de reproducción del usuario que ha acaba de iniciar sesión y todas sus canciones cada vez
     * que userLogged cambie su estado
     */
    useEffect(() => {
        getPlaylists();
        getSongs(1);
    }, [userLogged])


    /**
     * useEffect para cargar todas las canciones de la lista que seleccionemos cada vez que clickemos sobre una de ellas, teniendo en cuenta
     * el estado de currentPlaylist
     */
    useEffect(() => {
        getSongs(currentPlaylist.id);
    }, [currentPlaylist])

    /**
     * useEffect para ir reproduciendo las canciones
     */
    useEffect(() => {
        if (isPlaying) {
            audio.current.play();
            console.log("rula");
        } else {
            audio.current.pause();
            console.log("no rula")
        }
    }, [isPlaying]);


    return (
        <main>
            <div id="playlists">
                <h2>Tus playlists más escuchadas...</h2>
                <div key="morelistened" id="morelistened">
                    {playlists.map((playlist) => {
                        return <div>
                            <div>
                                <img src="images/prueba1"></img>
                            </div>
                            <div key={"box_" + playlist.id} onClick={() => {
                                setCurrentPlaylist(playlist)
                            }}>
                                <p>{playlist.name}</p>
                            </div>
                        </div>
                    })
                    }
                </div>
            </div>
            <div id="playlist">
                <div><img src="images/prueba1"></img></div>
                <div>
                    <h1>{currentPlaylist.length !== 0 ? currentPlaylist.name : "Viva el verano"}</h1>
                    <input type="image" src="images/playbutton.png" onClick={() => {
                        setNum(0);
                        setIsPlaying(true)
                    }}></input>
                </div>
            </div>
            <div key="listarepro" id="listarepro">
                <div key={"playlist2"} id="playlist2">
                    <div><img src="images/prueba1"></img></div>
                    <div>
                        <h1>{currentPlaylist.length !== 0 ? currentPlaylist.name : "Viva el verano"}</h1>
                        {<input type="image" src="images/playbutton.png" onClick={() => {
                            setNum(0);
                            setIsPlaying(true)
                        }}></input>}
                    </div>
                </div>
                <div>
                    <p>Posición</p>
                    <p>Titulo</p>
                    <p>Artista</p>
                    <p>Duración</p>
                </div>

                {songs && songs.length > 0 && songs.map((element, i) => {
                    return <div id={"song_" + element.id} className='songs' onClick={() => {
                        setNum(i);
                        setIsPlaying(true)
                    }}>
                        <p>{i + 1}</p>
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
