import { useEffect, useMemo, useState } from "react";
import Heading from "./Heading";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [watchList,updateWatchList]=useState(()=>{
        const favouritesData=localStorage.getItem("favourites")||"[]";
        return JSON.parse(favouritesData);
    });
    const fetchMovies = (pageNo) => {
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=9f48a5b363c49e0c31bf3d09bb319827&page=${pageNo}`)
            .then(res => res.json())
            .then(data => setMovies(data.results))
            .catch(err => console.log(err))
    }
    const popularMovieCount=useMemo(()=> movies.filter((movie)=>{
        
        return movie.popularity > 150
    }).length,[movies]);
    useEffect(() => {
        fetchMovies(1);
    }, []);

    return (
        <>
            <Heading />
            <p>Total Watchlist:{watchList.length}</p>
            <p>Popularit:  ('>' 150) {popularMovieCount}</p>
            
            <div className="movie-list">
                {!movies.length && <h1>Loading...</h1>}
                {
                    movies?.map((item) => {
                        return <MovieCard key={item.id} movie={item} onWatchlistUpdate={updateWatchList} watchlist={watchList}/>
                    })
                }
            </div>
            <Pagination onPageChange={fetchMovies}/>
        </>
    )
}
export default MovieList;