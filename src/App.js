import { useState, useRef } from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
// importing data from util
import data from "./data";

function App() {
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(
    songs.find((song) => song.active)
      ? songs.find((song) => song.active)
      : songs[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  // Refrences
  const audioRef = useRef();

  const timeUpdateHandler = (e) => {
    setSongInfo({
      currentTime: e.target.currentTime,
      duration: e.target.duration,
    });
  };

  // Auto skip to next song
  const songEndHandler = async () => {
    let idx = songs.findIndex((song) => song.id === currentSong.id);
    let _currentSong;
    // Skip to next song
    _currentSong = songs[(idx + 1) % songs.length];

    // wait untill setting current song to state
    await setCurrentSong(_currentSong);

    // Store active song
    const newSongs = songs.map((prevSong) => {
      if (prevSong.id === _currentSong.id) {
        return { ...prevSong, active: true };
      } else {
        return { ...prevSong, active: false };
      }
    });
    setSongs(newSongs);

    // Play song
    if (isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        songInfo={songInfo}
      />
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;