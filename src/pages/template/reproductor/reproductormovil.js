import React, { useContext, useEffect, useRef, useState } from "react";
import numIdContext from "../../context/numIdContext";
import SongsContext from "../../context/SongsContext";
import audioContext from "../../context/audioContext";
import isPlayingContext from "../../context/isPlayingContext";

function Reproductormovil() {
    const { songs } = useContext(SongsContext);
    const { num, setNum } = useContext(numIdContext);
    const audio = useContext(audioContext);
    const { isPlaying, setIsPlaying } = useContext(isPlayingContext);

    /**
     * Función que nos permitirá pasar de canción o volver a la anterior
     * @param forwards
     * @constructor
     */
    const SkipSong = (forwards = true) => {
        if (forwards) {
          setNum(() => {
            let temp = num;
            temp++;
            if (temp > songs.length - 1) {
              temp = 0;
            }
            return temp;
          });
        } else {
          setNum(() => {
            let temp = num;
            temp--;
            if (temp < 0) {
              temp = songs.length - 1;
            }
            return temp;
          });
        }
      };

  return (
    <>
      <div className="reproductor">
        <div id="repro">
          <input
            className="rep"
            type="image"
            src="images/previousSong.png"
            onClick={() => SkipSong(false)}
          ></input>
            {!isPlaying?
          <input
            className="rep"
            type="image"
            src="images/playbutton.png"
            onClick={() => {
                setIsPlaying(true);
            }}
          ></input>:<input
                    className="rep"
                    type="image"
                    src="images/playpause.png"
                    onClick={() => {
                        setIsPlaying(false);
                    }}
                ></input>}
          <input
            className="rep"
            type="image"
            src="images/nextSong.png"
            onClick={() => SkipSong(true)}
          ></input>
        </div>
        <div>
            <p>{songs.length != 0 ? songs[num].title+" - ": null}{songs.length != 0 ? songs[num].artist : null}</p>
        </div>
      </div>
    </>
  );
}
export default Reproductormovil;
