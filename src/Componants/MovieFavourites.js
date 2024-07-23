import { useEffect, useState } from 'react';
import './../MovieApp.css';

let genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
    };

const MovieFavourites=()=>{
    const[favourites,setFavourites]=useState([]);
    const [filteredFavourites,setFilteredFavourites]=useState([]);
    const [genres,setGeneres]= useState([]);
    const [selectedGenreId,setSelectedGenreId]=useState("");
    // below we will get aready computed data by call back 
    // console.log("outmared");
    useEffect(()=>{
        const favouritesData=JSON.parse( localStorage.getItem("favourites")||"[]");
        const generesData=favouritesData.map(data=>data.genre_ids[0])
        setFavourites(favouritesData);
        setGeneres(Array.from(new Set(generesData)));
        setFilteredFavourites(favouritesData);
        // console.log("mared");
    },[]);

    const handleGenreSelection=(e)=>{
        const id=e.target.dataset.id;
        setSelectedGenreId(id)
    }
    useEffect(()=>{
        setFilteredFavourites(()=>{
            return favourites.filter(movie=>! selectedGenreId || movie.genre_ids[0]== selectedGenreId)
        })
    },[selectedGenreId,favourites]);
    const handleMovieSearch=(e)=>{
        const text=e.target.value;
        setFilteredFavourites(()=>{
            return favourites.filter(movie=>movie.title.toLowerCase().includes(text.toLowerCase()))
        })
    }
    const handlePopularitySorting=(e)=>{
        const sortingType=e.target.dataset.type;
        setFilteredFavourites(()=>{
            if(!sortingType){
                return favourites;
            }
            if(!selectedGenreId)
            {
                return [...favourites].sort((a,b)=>{
                    return sortingType=== "ASC" ? a.popularity-b.popularity:b.popularity-a.popularity;
                });
            }
            const withGenFil=favourites.filter(movie=>! selectedGenreId || movie.genre_ids[0]== selectedGenreId);
            return [...withGenFil].sort((a,b)=>{
                return sortingType=== "ASC" ? a.popularity-b.popularity:b.popularity-a.popularity;
            });
        })
    }
    const handleMovieDeletion=(movieId)=>(e)=>{
        
        setFavourites((preFavourites)=>{
            const movieIdx=preFavourites.findIndex(fav=>fav.id==movieId);
            
            const finalFav=[...preFavourites];
            finalFav.splice(movieIdx,1);
            // console.log(localStorage.getItem("favourites"));
            localStorage.setItem("favourites",JSON.stringify(finalFav));
            // console.log(localStorage.getItem("favourites"));
            
            return finalFav;
        })
    }
    return(
        <div>
            <h1>Movie Favorites</h1>
            <div className="favourite-wrapper">
                <div className="left-section">
                <div className='genre-wrapper'>
                    <div className={`genre ${selectedGenreId==="" ? "selected" : "" }`}
                    onClick={handleGenreSelection}
                    data-id="">All Genre</div>
                    {
                         genres.map(genreId=>{
                           return <div className={`genre ${selectedGenreId==genreId ? "selected" : "" }`}
                           data-id={genreId}
                           onClick={handleGenreSelection}
                           >{genreids[genreId]}</div>
                        })
                    }
                </div></div>
                <div className="right-section">
                    <input type="text" placeholder='Search movie...' onChange={handleMovieSearch}/>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>
                                    <div>
                                    <button onClick={handlePopularitySorting} data-type="">Popularity</button>
                                    <button onClick={handlePopularitySorting} data-type="DES">↑</button>
                                    <button onClick={handlePopularitySorting} data-type="ASC" >↓</button>
                                    </div>

                                </th>
                                <th>Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredFavourites.map((favourite)=>{
                                return <tr>
                                    <td><img src={`https://image.tmdb.org/t/p/w500${favourite.poster_path}` } style={{width:"80px"}}/></td>
                                    <td>{favourite.title}</td>        
                                    <td>{genreids[favourite.genre_ids[0]]}</td>
                                    <td>{favourite.popularity}</td>
                                    <td>{favourite.vote_average}{favourite.id}</td>
                                    <td><button onClick={handleMovieDeletion(favourite.id)}>Delete</button></td>
                                </tr>
                
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default MovieFavourites;