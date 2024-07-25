import { useState,useRef, useEffect} from 'react';
import '../MovieApp.css';
import MovieCard from './MovieCard';
// const AddMovie = () => {
//     const [movieName,setMovieName]=useState('');
//     const [movieRating,setMovieRating]=useState(0);
//     const handleMovieNameChange=(e)=>{
//             setMovieName(e,target.value);
//     }
//     const handleMovieRatingChange=()=>{
//         setMovieRating(e.target.value);
//     }
//     const handleSubmit=()=>{

//     }
//     return (
//         <div className="add-movie-form">
//             <h1>Add Movie</h1>
//             <div>
//                 <input placeholder="Add new movie name" onChange={handleMovieNameChange}/>
//             </div>
//             <div>
//                 <input type="number" placeholder="Enter rating" onChange={handleMovieRatingChange}/>
//             </div>

//             <button onClick={handleSubmit}>Add</button>
//         </div>
//     )
// }
const AddMovie = () => {
    // const [checkMovie,setCheckmovie]=useState(true);
    const [data,setData]=useState([]);
    const [watchList,updateWatchList]=useState(()=>{
        const favouritesData=localStorage.getItem("favourites")||"[]";
        return JSON.parse(favouritesData);
    });
    const fetchMovies = (movieName,movieYear) => {
        fetch(!movieName?`https://api.themoviedb.org/3/search/movie?api_key=9f48a5b363c49e0c31bf3d09bb319827&query=${movieName}%202`
        :`https://api.themoviedb.org/3/search/movie?api_key=9f48a5b363c49e0c31bf3d09bb319827&query=${movieName}%202&&year=${movieYear}`)
            .then(res => res.json())
            .then(data => {setData(data.results)})
            .catch(err => console.log(err))

            // console.log(typeof data.length);
    }
    

    const nameRef=useRef();
    const ratingRef=useRef();
    const validationRef=useRef();
    const handleSubmit=()=>{
        // console.log(nameRef.current.value.length);
        if(nameRef.current.value.trim().length===0){
            nameRef.current.style.border="1px solid red";
            validationRef.current.innerText="Please enter movie name";
            validationRef.current.style.fontSize="11px";
            validationRef.current.style.color="red";
        }
        else{
            nameRef.current.style.border="1px solid black";
            validationRef.current.innerText="";
            fetchMovies(nameRef.current.value,ratingRef.current.value)
        }
    }
    
    return (
        <div className="add-movie-form">
            <h1>Add Movie</h1>
            <div>
                <input ref={nameRef} placeholder="Add new movie name" />
            </div>
            <div>
                <input ref={ratingRef} type="number" placeholder="Enter Year" style={{maxWidth:"110px"}}/>

                <label>optional</label>
            </div>


            <button onClick={handleSubmit}>search</button>
            <div ref={validationRef}></div>

            {
                 <div className="movie-list">
                 {!data.length && <h1>No Match</h1>}
                 {
                     data?.map((item) => {
                         return <MovieCard key={item.id} movie={item} onWatchlistUpdate={updateWatchList} watchlist={watchList}/>
                     })
                 }
             </div>
            }
        </div>

    )
}
export default AddMovie;