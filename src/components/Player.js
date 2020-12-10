import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

function Player({
  currentSong,
  setCurrentSong,
  songs,
  setSongs,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
}) {
  // Effect

  // Event toggleSongHandler
  const toggleSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // Refrences
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    let idx = songs.findIndex((song) => song.id === currentSong.id);
    let _currentSong;
    if (direction === "skip-back") {
      if (idx - 1 === -1) idx = songs.length;
      _currentSong = songs[(idx - 1) % songs.length];
      await setCurrentSong(_currentSong);
    }

    if (direction === "skip-forward") {
      _currentSong = songs[(idx + 1) % songs.length];
      await setCurrentSong(_currentSong);
    }

    storeActiveSongHandler(_currentSong);

    if (isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const storeActiveSongHandler = (_currentSong) => {
    const newSongs = songs.map((prevSong) => {
      if (prevSong.id === _currentSong.id) {
        return { ...prevSong, active: true };
      } else {
        return { ...prevSong, active: false };
      }
    });
    setSongs(newSongs);
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min="0"
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={toggleSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
}

export default Player;
