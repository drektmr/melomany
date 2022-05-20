import React,{useEffect,useContext,useRef} from 'react';
import SongsContext from '../context/SongsContext';
import numIdContext from '../context/numIdContext';
import isPlayingContext from '../context/isPlayingContext';
import audioContext from '../context/audioContext';

function Main(){
    
    const {songs,setSongs} = useContext(SongsContext);
    const {num,setNum} = useContext(numIdContext);
    const {isPlaying,setIsPlaying} = useContext(isPlayingContext);
    const audio = useContext(audioContext);
  
    useEffect(()=>{
        fetch('./playlist1.json')
        .then(function(response){
            return response.json();
        })
        .then(function(music){
            setSongs(music);
        })
        .catch(function(err) {
            console.error(err);
        });
        },[])
   
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
            <div>
                <div>
                    <img src="images/prueba1"></img>
                </div>
                <div>
                  <p>Verano hola que ase</p>
                </div>  
            </div>
            <div>
                <div>
                    <img src="images/prueba1"></img>
                </div>
                <div>
                    <p>Vera2no</p>
                </div>
            </div>
            <div>
                <div>
                    <img src="images/prueba1"></img>
                </div>
                <div>
                    <p>Veran3o</p>
                </div>
            </div>
            <div>
                <div>
                    <img src="images/prueba1"></img>
                </div>
                <div>
                    <p>Veran4o</p>
                </div>
            </div>
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
                <h1>Top 50 Mundial 2021</h1>
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