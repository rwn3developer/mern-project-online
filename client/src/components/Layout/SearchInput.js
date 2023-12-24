import React from 'react'
import { useSearch } from '../../context/Search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {

  const navigate = useNavigate();

  const [values,setValues] = useSearch();

  const handleSubmmit = async(e) => {
    e.preventDefault();
    const {data} = await axios.get(`http://localhost:8080/product/search-product/${values.keyword}`);
    console.log(data);
    setValues({...values,results : data});
    navigate('/search');
  }


  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmmit}>
        <input value={values.keyword} onChange={ (e) => setValues({...values,keyword : e.target.value}) }  className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button  className="btn btn-outline-success" type="submit">Search</button>
      </form>

    </div>
  )
}

export default SearchInput