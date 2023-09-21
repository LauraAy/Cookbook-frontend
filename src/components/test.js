import React, { useState, Fragment, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Button, FormControl,  Paper, TextField, Typography } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import RecipeDataService from "../services/recipe.service";
import DeleteConfirmation from "../components/deleteConfirmation.component.js"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Comment = () => {
  // const [value, setValue] = useState('');

 const submit = (data) => {
      // e.preventDefault();
      console.log(data);
  }

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    values: {
    ingredients: "Testing123"},
  });

  // onChange expects a function with these 4 arguments
  function handleChange(content, delta, source, editor) {
      setValue("ingredients", editor.getContents());
  }

  const ingredientContent = watch("ingredients");

  return (
    <>
        <ReactQuill 
          theme="snow" value={ingredientContent} 
          onChange={handleChange}/>
        {/* <p>{value}</p> */}
        <button onClick={handleSubmit(submit)}>Submit</button>
       
    </>
  );
}

export default Comment





