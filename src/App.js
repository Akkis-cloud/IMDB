import './App.css';
import MovieApp from './Componants/MovieApp';
import Header from "./Componants/Header";
import MovieDetail from "./Componants/MovieDetail";
import MovieList from "./Componants/MovieList";
import React from 'react';
import AddMovie from './Componants/AddMovie';
import './MovieApp.css';
import MovieFavourites from'./Componants/MovieFavourites';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Router,Routes,
  RouterProvider,
} from "react-router-dom";

// const router = createBrowserRouter([{
//   path: "/",
//   element: (
//     <>
//       <Header />
//       <MovieList />
//     </>
//   )
// },
// {
//   path: "/movie-detail/:movieId",
//   element: (
//     <>
//       <Header />
//       <MovieDetail />
//     </>
//   )
// },
// {
//   path: "/add-movie",
//   element: (
//     <>
//       <Header />
//       <AddMovie />
//     </>
//   )
// }]);


function App() {
  return (
    <div className="App">
      {/* <RouterProvider router={router} /> */}
      {/*by using above line we can use above commented in
      perative to do thing but there we are calling header agin and again
       so below way declarative there we called header ony once  */}
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<MovieList/>}/>
          <Route path="/movie-detail/:movieId" element={<MovieDetail/>}/>
          <Route path="/favourites" element={<MovieFavourites/>}/>
          <Route path="/add-movie" element={<AddMovie/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
