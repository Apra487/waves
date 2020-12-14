import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faPause,
	faAngleLeft,
	faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

export default function Player({
	currentSong: { audio, color },
	songs,
	setCurrentSong,
	isPlaying,
	setIsPlaying,
}) {
	// * state
	let [currentIndex, setIndex] = useState(0);
	const [songInfo, setSongInfo] = useState({
		current: 0,
		duration: 0,
		animationPercentage: 0,
	});

	// * Grabbing html audio element using useRef()
	const audioRef = useRef(null);

	// * Implementing play and pause keyboard event
	if (isPlaying) {
		audioRef.current.play().catch((e) => console.log());
	} else if (audioRef.current) {
		audioRef.current.pause();
	}

	function playSongHandler() {
		setIsPlaying(!isPlaying);
		if (isPlaying) {
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
			if (currentIndex < 0) currentIndex = songs.length - 1;
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
		const current = e.target.currentTime;
		const duration = e.target.duration;
		const roundedCurrent = Math.round(current);
		const roundedDuration = Math.round(duration);
		const percentage = Math.round((roundedCurrent / roundedDuration) * 100);

		setSongInfo({
			...songInfo,
			current: current,
			duration:duration,
			animationPercentage: percentage,
		});
	}

	// * input drag handlar
	function dragHandler(e) {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, current: e.target.value });
	}

	const trackAnim = {
		transform: `translateX(${songInfo.animationPercentage}%)`,
	  };


	return (
		<div className='player'>
			<div className='time-control'>
				<p>{getTime(songInfo.current)}</p>
				<div style={{
            background: `linear-gradient(to right, ${color[0]},${color[1]})`,
          }} className='track'>
					<input
						type='range'
						onChange={dragHandler}
						min={0}
						max={songInfo.duration ? songInfo.duration : 0}
						value={songInfo.current}
					/>
					 <div style={trackAnim} className="animate-track"></div>
				</div>

				<p>{getTime(songInfo.duration || 0)}</p>
			</div>

			<div className='play-control'>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-back')}
					className='skip-back'
					size='2x'
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className='play'
					size='2x'
					icon={isPlaying ? faPause : faPlay}
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler('skip-forward')}
					className='skip-forward'
					size='2x'
					icon={faAngleRight}
				/>
			</div>
			<audio
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				onEnded={() => skipTrackHandler('skip-forward')}
				ref={audioRef}
				src={audio}
			></audio>
			
		</div>
	);
}
