import React, { useContext, useEffect, useRef } from "react";
import numIdContext from "../../context/numIdContext";
import SongsContext from "../../context/SongsContext";
import isPlayingContext from "../../context/isPlayingContext";

function Reproductor() {
  const { songs } = useContext(SongsContext);
  const { num, setNum } = useContext(numIdContext);
  const { isPlaying, setIsPlaying } = useContext(isPlayingContext);
  const audio = useRef();
  const songLength = useRef();
  const currentTime = useRef();

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
      setInterval(setProgress, 1);
    } else {
      audio.current.pause();
    }
  });

  function setProgress() {
    let percentage = (audio.current.currentTime / audio.current.duration) * 100;
    document.querySelector(".progress").style.width = percentage + "%";
  }

  return (
    <>
    <div>
      <div>
        <div>
          <img src="images/prueba1"></img>
        </div>
        <div>
          <b>{songs.length != 0 ? songs[num].title : null}</b>
          <p>{songs.length != 0 ? songs[num].artist : null}</p>
        </div>
      </div>
      <div class="music-player-container">
        <div class="controls-music-container">
          <div class="progress-song-container">
            <div class="progress-bar">
              <span class="progress"></span>
            </div>
          </div>
          <div class="time-container">
            <span
              class="time-left"
              id="CurrentSongTime"
              ref={currentTime}
            ></span>
            <span class="time-left" id="Songlength" ref={songLength}></span>
          </div>
        </div>
        <audio
          controls
          preload="metadata"
          src={songs.length != 0 ? songs[num].src : null}
          ref={audio}
        ></audio>
        <div class="main-song-controls">
          <input
            type="image"
            src="images/previousSong.png"
            className="btnreppc, icon"
            onClick={() => SkipSong(false)}
          ></input>
          {!isPlaying?<input
              type="image"
              src="images/playbutton.png"
              className="btnreppc"
              onClick={() => {
                setIsPlaying(true);
              }}
          ></input>:<input
              type="image"
              src="images/playpause.png"
              className="btnreppc"
              onClick={() => {
                setIsPlaying(false);
              }}
          ></input>}
          <input
            type="image"
            src="images/nextSong.png"
            className="btnreppc, icon"
            onClick={() => SkipSong(true)}
          ></input>
        </div>
      </div>
      </div>
    </>
  );
}
export default Reproductor;
