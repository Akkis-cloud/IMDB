import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            {/* <a href="/"><span>Movie List</span></a>
            <a href="/favourites"><span>Favourites</span></a>
            <a href="/add-movie"><span>Add Movie</span></a> */}
            {/* here i used link tag to open router cuz above href do request and render page for every router which we do 
            not want so below it don't make request for every route    */}


            <Link to="/"><span>Movie List</span></Link>
            <Link to="/favourites"><span>Favourites</span></Link>
            <Link to="/add-movie"><span>Add Movie</span></Link>
        </div>
    )
}
export default Header;