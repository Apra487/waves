import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';
import Nav from './components/Nav';
import './styles/app.scss';
import data from './util';

function App() {

	// * State
	const [song] = useState(data());
	const [currentSong, setCurrentSong] = useState(song[0]);
	let [isPlaying, setIsPlaying] = useState(false);
	const [libraryStatus, setLibraryStatus] = useState(false);

	useEffect(() => {
		window.addEventListener('keydown', (event) => {
			handleChange(event);
		});
	});

	const handleChange = (event) => {
		if (event.code === 'Space') debouncedSave();
	};


	function playHandle() {
		isPlaying = isPlaying ? false : true;
		setIsPlaying(isPlaying);
	}
	
	const debouncedSave = useCallback(
		debounce(
			playHandle,
			300
		),
		[]
	);
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
