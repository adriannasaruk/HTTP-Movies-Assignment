import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';
import {useHistory, useParams} from "react-router-dom";

function Movie(props ) {
  const history = useHistory()
  const {id} =useParams()
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  
 

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };


 
 

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

 const pushToUpdate = e =>{
    e.preventDefault();
    history.push(`/update-movie/${id}`)
  }
  const deleteItem = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      
      props.setSavedList(res.data);
      history.push(`/movies/${id}`);
    });
  };
 

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} deleteItem={deleteItem} pushToUpdate={pushToUpdate} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button type="button" onClick={pushToUpdate}>Edit</button>
      <button type="button" onClick={deleteItem}>Delete</button>
    </div>
  );
}

export default Movie;
