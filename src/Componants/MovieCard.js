import { Link } from "react-router-dom";               // return <MovieCard key={item.id} movie={item} onWatchlistUpdate={updateWatchList}/>
import MovieFavourites from "./MovieFavourites";
const MovieCard = ({ movie, onWatchlistUpdate,watchlist}) => {
        const isMovieAdded=watchlist.find(watchlistMovie=> watchlistMovie.id ===movie.id);
        // console.log(isMovieAdded);
    const addToWatchlist=(e)=>{
        // const movieId=e.target.dataset.id
        onWatchlistUpdate((prevWatchlist)=>{
            const isAlreadyInWatchlist = prevWatchlist.some(element => element.id === movie.id);
            
            let updatedWatchlist;

            if (isAlreadyInWatchlist) {
                
                updatedWatchlist = prevWatchlist.filter(item => item.id !== movie.id);
            } else {
                
                updatedWatchlist = [...prevWatchlist, movie];
            }

            // Update localStorage
            localStorage.setItem("favourites", JSON.stringify(updatedWatchlist));

            return updatedWatchlist;
            
        })
    }
    return (
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
            <Link to={`/movie-detail/${movie.id}`}><h5>{movie.title}</h5></Link>
            <button data-id={movie.id} onClick={addToWatchlist}>{isMovieAdded?"Remove from watchlist" :"Add to watchList"}</button>
        </div>
    )
}
export default MovieCard;