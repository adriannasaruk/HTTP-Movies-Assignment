import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';


const initialItem = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: [],
};
const UpdateForm =(props)=> {
const { id } = useParams();
const history = useHistory();
    
const [item, setItem] = useState(initialItem) 

useEffect(()=>{
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
        setItem(res.data)
        console.log("USEEFFECT", res.data)
    })
    .catch(err => console.log(err))

},[ id])


const changeHandler = e => {
    // e.persist()
    // let value = e.target.value;
    // if(e.target.value === "metascore") {
    //     value = parseInt(value, 10)
    // }

setItem({
    ...item, [e.target.name]: e.target.value
   })
}




const handleSubmit = e => {
    e.preventDefault();

    axios.put(`http://localhost:5000/api/movies/${id}`, item)
    .then(res=> {
        props.setChange(res)
        console.log("PUT", res)
        console.log(res.data)
        history.push(`/`)
        console.log({id})
        })
       
// props.setMovieList([...newItemsArray, res.data]);
        // console.log(res.data)
        // history.push(`/movies/${id}`)
    .catch(err => console.log(err))
}


return(
    <div>
    <h2>Update Item</h2>
      <form onSubmit = {handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={item.title}
        />
        <div className="" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={item.director}
        />
        <div className="" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={item.metascore}
        />
        <div className="" />
        <button type="submit">Update</button>
        </form>
    </div>
)
}
export default UpdateForm