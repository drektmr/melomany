import React, { useContext, useEffect, useRef, useState } from "react";
import numIdContext from "../../context/numIdContext";
import SongsContext from "../../context/SongsContext";
import audioContext from "../../context/audioContext";
import isPlayingContext from "../../context/isPlayingContext";

function Reproductor() {
  const { songs } = useContext(SongsContext);
  const { num, setNum } = useContext(numIdContext);
  const audio = useContext(audioContext);
  const { isPlaying, setIsPlaying } = useContext(isPlayingContext);

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

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  });

  return (
    <>
      <div>
        <div>
          <div>
            <img src="images/prueba1"></img>
          </div>
          <div>
            <audio
              src={songs.length != 0 ? songs[num].src : null}
              ref={audio}
            ></audio>
            <b>{songs.length != 0 ? songs[num].title : null}</b>
            <p>{songs.length != 0 ? songs[num].artist : null}</p>
          </div>
        </div>
        <div>
          <input
            type="image"
            src="images/previousSong.png"
            className="btnreppc"
            onClick={() => SkipSong(false)}
          ></input>
          <input
            type="image"
            src="images/playbutton.png"
            className="btnreppc"
            onClick={() => {
              if (isPlaying) {
                setIsPlaying(false);
              } else {
                setIsPlaying(true);
              }
            }}
          ></input>
          <input
            type="image"
            src="images/nextSong.png"
            className="btnreppc"
            onClick={() => SkipSong(true)}
          ></input>
        </div>
      </div>
    </>
  );
}
export default Reproductor;
