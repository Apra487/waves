export default function LibrarySong({song:{cover, name, artist, id, active },setCurrentSong, songs, setIsplaying}) {

    function songSelectedHandler() {
        songs.forEach(el => {
           if (el.id === id) {
               setCurrentSong(el);
               el.active= true;
           } else {
            el.active= false;
           }
        });
        // setIsplaying(true);
    }

    return (
        <div onClick={songSelectedHandler} className= {`librarySong ${active ? 'selected' : ''}`} >
            <img src={cover} alt="" />
            <div className="info">
            <h3>{name}</h3>
			<h4>{artist}</h4>
            </div>

        </div>
    )
}