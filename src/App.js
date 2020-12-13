import { useState, useEffect } from 'react';
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';
import Nav from './components/Nav';
import './styles/app.scss';
import data from './util';

function App() {
	useEffect(() => {
		window.addEventListener('keydown', (event) => {
			event.preventDefault();
			if (event.code === 'Space')
				isPlaying ? setIsPlaying(false) : setIsPlaying(true);
		});
	});

	// * State
	const [song] = useState(data());
	const [currentSong, setCurrentSong] = useState(song[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [libraryStatus, setLibraryStatus] = useState(false);
	return (
		<div className={`App ${libraryStatus ? 'library-active' : ''}`}>
			<Nav
				libraryStatus={libraryStatus}
				setLibraryStatus={setLibraryStatus}
			/>
			<Song song={currentSong} />
			<Player
				isPlayiyg={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				songs={song}
			/>
			<Library
				songs={song}
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
				setIsPlaying={setIsPlaying}
				libraryStatus={libraryStatus}
			/>
		</div>
	);
}

export default App;
