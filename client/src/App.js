import React, { useState, useEffect } from "react";
import { Route, useHistory, useParams } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateForm from "./Movies/UpdateForm"

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [change, setChange] = useState([])
  const history = useHistory();
  const {id} = useParams()
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [change]);

   

 

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movieList={movieList} />
      </Route>
      <Route exact path="/update-movie/:id">
        <UpdateForm  movieList={movieList} setMovieList={setMovieList} setChange={setChange} />
      </Route>

      <Route path="/movies/:id">
        <Movie  addToSavedList={addToSavedList} setMovieList={setMovieList} setChange={setChange}  />
      </Route>
    </>
  );
};

export default App;
