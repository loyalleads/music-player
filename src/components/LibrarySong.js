function LibrarySong({
   song,
   
   songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
}) {
  const songSelectHandler = async (e) => {
    await setCurrentSong(song);
    
    // Check if the song is playing
    if (isPlaying) {
      audioRef.current.play()
      setIsPlaying(true);
    }
     const newSongs = 
     songs.map((prevSong) => {
       if (prevSong.id === song.id) {
          return { ...prevSong, active: true, };
         } else {
         return { ...prevSong, active: false, };
       }
     });
     setSongs(newSongs);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img className="song-cover" src={song.cover} alt={song.name} />

      <div className="song-discription">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
