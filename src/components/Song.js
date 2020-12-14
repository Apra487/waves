export default function Song({ song: { name, artist, cover },isPlaying }) {
	
	return (
		<div className='song-container'>
			<img className={isPlaying ? "rotateSong" : ""} src={cover} alt="" />
			<h2>{name}</h2>
			<h3>{artist}</h3>
		</div>
	);
}
