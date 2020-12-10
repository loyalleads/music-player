import LibrarySong from "./LibrarySong";
function Library({
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  setIsPlaying,
  isPlaying,
  libraryStatus,
  setLibraryStatus,
}) {
  return (
    <div
      onMouseLeave={() => setLibraryStatus(false)}
      className={`library ${libraryStatus ? "active-library" : ""}`}
    >
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            setSongs={setSongs}
            setCurrentSong={setCurrentSong}
            songs={songs}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        ))}
      </div>
    </div>
  );
}
export default Library;
