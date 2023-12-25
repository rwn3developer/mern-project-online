import axios from "axios";
import { useState,useEffect } from "react";

export default function useCategory(){
    const [categories,setCategories] = useState([]);

    //get category
    const getCategory = async () => {
        try{
            const {data} = await axios.get('http://localhost:8080/category/get-category');
            setCategories(data.categoryr)
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getCategory();
    },[])

    return categories;
}