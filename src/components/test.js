import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    register("ingredients");
  }, [register]);

  const onIngredientStateChange = (ingredientState) => {
    setValue("ingredients", ingredientState);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const ingredientContent = watch("ingredients");

  return (
    <div className="App">
      <ReactQuill
        theme="snow"
        value={ingredientContent}
        onChange={onIngredientStateChange}
      />
      <p className="Error">{errors.ingredients && "Enter valid content"}</p>
      <input type="submit" onClick={handleSubmit(onSubmit)} />
    </div>
  );
  }




// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { Paper, Box, Button, FormControl, TextField, Typography } from '@mui/material';

// function MyComponent() {
//   const [value, setValue] = useState('');

//   return (
//   <>
 
 
//     <ReactQuill 
//       Value={value} 
//       onChange={setValue}
//      />
   
 
//   </>
//   )
// }

// export default MyComponent