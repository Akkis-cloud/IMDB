import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
    const [movieDetail,setMovieDetail]=useState({});
    const params=useParams();
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${params.movieId}?api_key=0b5415eb9bf023d556ef265b425e0e4a&language=en-US&page=1`)
        .then((res)=>res.json())
        .then((data)=>setMovieDetail(data))
    },[]) 
    // console.log(params);
    return (
        <>
            <h1>Movie Details</h1>
            <hr />
            <h2>{movieDetail.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500/${movieDetail.backdrop_path}`}/>
            <p>{movieDetail.overview}</p>
        </>
    )
}
export default MovieDetail;