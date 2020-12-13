import LibrarySong from './LibrarySong';

export default function Library({
	songs,
	currentSong,
	setCurrentSong,
	setIsPlaying,
	libraryStatus
}) {
	return (
		<div className={`library ${libraryStatus ? "active-library" : " "}`}>
			<h2>Library</h2>

			<div className='library-songs'>
				{songs.map((song) => (
					<LibrarySong
						key={song.id}
						songs={songs}
						song={song}
						currentSong={currentSong}
						setCurrentSong={setCurrentSong}
						setIsplaying={setIsPlaying}
					/>
				))}
			</div>
		</div>
	);
}
