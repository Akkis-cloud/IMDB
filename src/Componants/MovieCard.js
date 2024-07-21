import { Link } from "react-router-dom";               // return <MovieCard key={item.id} movie={item} onWatchlistUpdate={updateWatchList}/>
import MovieFavourites from "./MovieFavourites";
const MovieCard = ({ movie, onWatchlistUpdate,watchlist}) => {
        const isMovieAdded=watchlist.find(watchlistMovie=> watchlistMovie.id ==movie.id);
        // console.log(isMovieAdded);
    const addToWatchlist=(e)=>{
        // const movieId=e.target.dataset.id
        onWatchlistUpdate((prevWatchlist)=>{
            let check=true;
            prevWatchlist.forEach(element => {
                if(element==movie)
                {
                    check=false;
                }
            })
            if(check==true)
            {
                const favourites=[...prevWatchlist,movie];
                localStorage.setItem("favourites",JSON.stringify(favourites))
                return [...prevWatchlist,movie];
            }
            else{
                const temp=prevWatchlist.filter((item)=>{
                    return (item!=movie);
                })
                const favourites=[...temp];
                localStorage.setItem("favourites",JSON.stringify(favourites))
                return [...temp];
            }
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