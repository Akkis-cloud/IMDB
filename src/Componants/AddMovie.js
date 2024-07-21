import { useState,useRef } from 'react';
import '../MovieApp.css';
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
    const nameRef=useRef();
    const ratingRef=useRef();
    const validationRef=useRef();
    const handleSubmit=()=>{
        console.log(nameRef.current.value.length);
        if(nameRef.current.value.length<3){
            nameRef.current.style.border="1px solid red";
            validationRef.current.innerText="Please enter min 3 char";
            validationRef.current.style.fontSize="11px";
            validationRef.current.style.color="red";
        }
    }
    return (
        <div className="add-movie-form">
            <h1>Add Movie</h1>
            <div>
                <input ref={nameRef} placeholder="Add new movie name" />
            </div>
            <div>
                <input ref={ratingRef} type="number" placeholder="Enter rating"/>
            </div>

            <button onClick={handleSubmit}>Add</button>
            <div ref={validationRef}></div>
        </div>
    )
}
export default AddMovie;