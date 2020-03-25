import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
};
const UpdateForm =props=> {
const { id } = useParams();
const { push } = useHistory();
    
const [item, setItem] = useState(initialItem) 

const changeHandler = e => {
    e.persist()
    let value = e.target.value;
    if(e.target.value === "metascore") {
        value = parseInt(value, 10)
    }

setItem({
    ...item, [e.target.name]: value
   })
}


const handleSubmit = e => {
    e.preventDefault()

    axios.put(`http://localhost:5000/api/movies/${id}`, item)
    .then(res=> {
        console.log(res)
        const newItemsArray = props.items.map(e=>{
            if(`{e.id}` === id)  {
                return item
            }
            else {
               return e 
            }
        })
        props.setItems(res.data);
        push(`/item-list/${id}`)
    })
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
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={item.metascore}
        />
        <div className="baseline" />
        <button type="submit">Update</button>
        </form>
    </div>
)
}
export default UpdateForm