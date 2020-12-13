import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faPause,
	faAngleLeft,
	faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

export default function Player({
	currentSong: { audio },
	songs,
	setCurrentSong,
	isPlayiyg,
	setIsPlaying,
}) {
	// * state
	let [currentIndex, setIndex] = useState(0);
	const [songInfo, setSongInfo] = useState({
		current: 0,
		duration: 0,
	});

	// * Grabbing html audio element using useRef()
	const audioRef = useRef(null);

	// * Implementing play and pause keyboard event
	if (isPlayiyg) audioRef.current.play().catch((e) => console.log(e));
	else if (audioRef.current) audioRef.current.pause();

	function playSongHandler() {
		setIsPlaying(!isPlayiyg);
		if (isPlayiyg) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
	}

	// * Active song
	function currentActive() {
		for (let i = 0; i < songs.length; i++) {
			if (songs[i].active) {
				songs[i].active = false;
				currentIndex = i;
			}
		}
	}

	// * Implementing pagination
	function skipTrackHandler(direction) {

		currentActive();

		if (direction === 'skip-forward') {
			setIndex(++currentIndex);
			if (currentIndex > songs.length - 1) currentIndex = 0;
		} else {
			setIndex(--currentIndex);
			if (currentIndex < 0) currentIndex =  songs.length - 1;
			
		}
		setCurrentSong(songs[currentIndex]);
		songs[currentIndex].active = true;
	}

	// * Formating time
	const getTime = (time) => {
		return (
			Math.floor(time / 60) +
			':' +
			('0' + Math.floor(time % 60)).slice(-2)
		);
	};

	// * Setting song time
	function timeUpdateHandler(e) {
		setSongInfo({
			...songInfo,
			current: e.target.currentTime,
			duration: e.target.duration,
		});
	}

	// * input drag handlar
	function dragHandler(e) {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, current: e.target.value });
	}

	return (
		<div className='player'>
			<div className='time-control'>
				<p>{getTime(songInfo.current)}</p>
				<input
					type='range'
					onChange={dragHandler}
					min={0}
					max={songInfo.duration ? songInfo.duration : 0}
					value={songInfo.current}
				/>
				<p>{getTime(songInfo.duration || 0)}</p>
			</div>

			<div className='play-control'>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-back')}
					className='skip-back'
					size='3x'
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className='play'
					size='2x'
					icon={isPlayiyg ? faPause : faPlay}
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-forward')}
					className='skip-forward'
					size='3x'
					icon={faAngleRight}
				/>
			</div>
			<audio
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={audio}
			></audio>
		</div>
	);
}
