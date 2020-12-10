function Song({ currentSong, setCurrentSong, isPlaying, songInfo }) {
  const rotate = {
    animation: `rotation ${songInfo.duration}s infinite linear`,
  };
  return (
    <div className="song-container">
      <img
        style={isPlaying ? rotate : {}}
        src={currentSong.cover}
        alt={currentSong.name}
      />

      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
}

export default Song;
