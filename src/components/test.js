// import React, { useState, Fragment, useEffect } from "react"; 
// import MUIEditor, { MUIEditorState } from "react-mui-draft-wysiwyg";
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';


// const MyComponent =() => {
//   const [editorState, setEditorState] = React.useState(
//     MUIEditorState.createEmpty(),
//   )
//   const onChange = newState => {
//     setEditorState(newState)
//   }

//   const validationSchema = Yup.object().shape({
//     title: Yup.string()
//       .required('title is required')
//     });
  
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors }
//   } = useForm({
//     defaultValues: { "servingSize": null, "recipeType": ""},
//     resolver: yupResolver(validationSchema)
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//   };
  
//   return (
//   <>
//     <MUIEditor 
//       editorState={editorState} 
//       onChange={onChange} 
//       {...register('title')}
//     />
//      <input type="submit" onClick={handleSubmit(onSubmit)} /> 
//   </>
//   )
// }
// export default MyComponent


// import React, { useState, Fragment, useEffect } from "react";
// import { Link } from "react-router-dom"
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { Paper, Box, Button, FormControl, TextField, Typography } from '@mui/material';
// import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
// import RecipeDataService from "../services/recipe.service";
// import AuthService from "../services/auth.service.js";
// import ReactQuill from 'react-quill';
// import "react-quill/dist/quill.snow.css";

// const filter = createFilterOptions();

// const RecipeAddComponent = () => { 
//   const currentUser = AuthService.getCurrentUser();

//   const initialRecipeState = {
//     id: null,
//     title: "",
//     description: "",
//     recipeType: "",
//     servingSize: null,
//     ingredients: "",
//     directions: "",
//     source: "",
//     userId: undefined
//   };

//   const [recipes, setRecipes] = useState ([]);
//   const [recipe, setRecipe] = useState(initialRecipeState);
//   const [submitted, setSubmitted] = useState(false);
//   const [userId, setUserId] = useState(currentUser.id);
//   const [value, setValue] = React.useState(null);

//   useEffect(() => {
//     retrieveRecipes();
//   }, []);

//   const retrieveRecipes = () => {
//     RecipeDataService.getAll()
//     .then(response => {
//       setRecipes(response.data);
//       console.log(response.data);
//     })
//     .catch(e => {
//       console.log(e);
//     });
//   };

//    //validation functions
//    const validationSchema = Yup.object().shape({
//     title: Yup.string()
//       .required('title is required')
//     });
  
//     const {
//       register,
//       watch,
//       handleSubmit,
//       formState: { errors }
//     } = useForm({
//       defaultValues: { "servingSize": null, "recipeType": ""},
//       resolver: yupResolver(validationSchema)
//     });

//   const ingredientContent = watch("ingredients");
//   const directionsContent = watch("directions");
//   const recipeTypeContent = watch("recipeType")

//   const onIngredientStateChange = (ingredientState) => {
//     setValue("ingredients", ingredientState);
//   };

//   const onDirectionsStateChange = (directionState) => {
//     setValue("directions", directionState);
//   };

//   useEffect(() => {
//     register("title", "description", "servingSize", "recipeType", "ingredients", "directions", "source");
//   }, [register]);



//   const onSubmit = (data) => {
//     console.log(data);
//   };

  
//   const saveRecipe = (formData) => {
  
//     var data = {
//       title: formData.title,
//       description: formData.description,
//       recipeType: formData.recipeType,
//       servingSize: formData.servingSize,
//       ingredients: formData.ingredients,
//       directions: formData.directions,
//       source: formData.source,
//       userId: userId,
//     };

//     RecipeDataService.create(data)
//     .then(response => {
//       setRecipe({
//         id: response.data.id,
//         title: response.data.title,
//         description: response.data.description,
//         recipeType: response.data.recipeType,
//         servingSize: response.data.servingSize,
//         ingredients: response.data.ingredients,
//         directions: response.data.directions,
//         source: response.data.source,
//         userId: response.data.userId,
        
//       });
//       setSubmitted(true);
//       setRecipe(response.data)
//       console.log(response.data);
//     })
//     .catch(e => {
//       console.log(e);
//     });
// };

// const filRecipes = recipes.filter((recipes) => recipes.recipeType !== '')

// const filAlphaRecipes = filRecipes.sort()

// const cleanRecipes = Array.from(new Set(filAlphaRecipes.map((filAlphaRecipe) => filAlphaRecipe.recipeType)))
//   .map((option) => (option))

// const typeOptions = cleanRecipes.sort()

// const newRecipe = () => {
//     setRecipe(initialRecipeState);
//     setSubmitted(false);
//     window.location.reload(false);
//   };

//   return (
//   <div>
//     {submitted ? (
//       <div>
//         <h4>Recipe Created!</h4>
//         <div>
//           {recipe.id}
//           <br></br>
//           {recipe.title}
//         </div>
//         <Link
//           to={"/recipes/" + recipe.id}
//         >
//           <button>View Recipe</button>
//         </Link>
//         <button onClick={newRecipe}>Add Another Recipe</button>
//       </div>
//       ):(
//       <div>
  
//             <Typography variant="h6" align="center" margin="dense">
//               Create a New Recipe
//             </Typography>
//             <Box sx={{ ml: "10%", mr: "10%" }}>
//               <FormControl fullWidth>
//                 <TextField
//                   sx={{ mt: 2, mb: 2 }}
//                   required
//                   id="title"
//                   name="title"
//                   label="Title"
//                   placeholder="Title"
//                   defaultValue=""
//                   fullWidth
//                   margin="dense"
//                   {...register('title')}
//                   error={errors.title ? true : false}
//                 />
//                 <Typography variant="inherit" color="textSecondary">
//                   {errors.username?.message}
//                 </Typography>
//               </FormControl>
//               <TextField
//                 sx={{ mt: 2, mb: 2 }}
//                 id="outlined-multiline-static"
//                 defaultValue=""
//                 name="description"
//                 label="Recipe Description"
//                 placeholder="Recipe Description"
//                 fullWidth
//                 margin="dense"
//                 multiline
//                 rows={2}
//                 {...register('description')}
//               />
//               {/* <Autocomplete
//                 value={recipeTypeContent}
//                 defaultValue=""
//                 {...register('recipeType')}
//                 onChange={(event, newValue) => {
//                   if (typeof newValue === 'string') {
//                     const updatedValue = newValue.replace("Add ", "");
//                     setValue(updatedValue);
//                   } else if (newValue && newValue.inputValue) {
// 				            // Create a new value from the user input
//                     setValue(newValue.inputValue);
//                   } else {
//                     setValue(newValue);
//                   }
//                 }}
//                 filterOptions={(options, params) => {
//                   const filtered = filter(options, params);
//                   const { inputValue } = params;

//                   // Suggest the creation of a new value
//                   const isExisting = options.some((option) => inputValue === option);
//                   if (inputValue !== "" && !isExisting) {
//                     filtered.push(`Add ${inputValue}`);
//                   }

//                   return filtered;
//                 }}
//                 selectOnFocus
//                 clearOnBlur
//                 handleHomeEndKeys
//                 id="recipeType"
//                 options={typeOptions}
//                 getOptionLabel= {(option) => {
//                   // Value selected with enter, right from the input
//                   if (typeof option === 'string') {
//                     const updatedOption = option.replace("Add ", "");
//                     return updatedOption;
//                   }
//                   // Add "xxx" option created dynamically
//                   if (option.inputValue) {
//                     return option.inputValue;
//                   }
//                   // Regular option
//                   return option.toString();
//                 }}
//                 renderOption={(props, option) => <li {...props}>{option}</li>}
//                 freeSolo
//                 fullWidth
//                 renderInput={(option) => (
//                   <TextField   
//                     {...option}
//                     label="RecipeType" 
//                     InputProps={{
//                       ...option.InputProps,
//                       type: 'search',
//                     }} 
//                     {...register('recipeType')}
//                   />
//                 )}
//               /> */}
//               <TextField
//                 sx={{ mt: 2, mb: 2 }}
//                 id="servingSize"
//                 type="{number}"
//                 name="servingSize"
//                 label="Serving Size"
//                 placeholder="Serving Size"
//                 fullWidth
//                 margin="dense"
//                 {...register('servingSize')}
//               />
//            <Box>
//               <ReactQuill
//                 theme="snow"
//                 value={ingredientContent}
//                 onChange={onIngredientStateChange}
//               />
//               </Box>
        
            
//               <TextField
//                 sx={{ mt: 2, mb: 2 }}
//                 id="source"
//                 defaultValue=""
//                 name="source"
//                 label="Recipe Source"
//                 placeholder="Recipe Source"
//                 fullWidth
//                 margin="dense"
//                 {...register('source')}
//               />
//               <Box mt={3}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSubmit(onSubmit)}
//                 >
//                   Create Recipe
//                 </Button>
//               </Box>
//             </Box>
    
//       </div>
//     )}
//   </div>     
//   );
// };

// export default RecipeAddComponent;



import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Paper, Box, Button, FormControl, TextField, Typography } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import RecipeDataService from "../services/recipe.service";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('title is required')
});

const filter = createFilterOptions();



export default function App() {

  const initialRecipeState = {
    id: null,
    title: "",
    description: "",
    recipeType: "",
    servingSize: null,
    ingredients: "",
    directions: "",
    source: "",
    userId: undefined
  };

  const [recipes, setRecipes] = useState ([]);
  const [recipe, setRecipe] = useState(initialRecipeState);
  const [submitted, setSubmitted] = useState(false);
  // const [userId, setUserId] = useState(currentUser.id);


  //get recipes
  useEffect(() => {
    retrieveRecipes();
  }, []);

  const retrieveRecipes = () => {
    RecipeDataService.getAll()
    .then(response => {
      setRecipes(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    register("title", "description", "servingSize","ingredients", "directions", "source");
  }, [register]);

  const onIngredientStateChange = (ingredientState) => {
    setValue("ingredients", ingredientState);
  };

  const onDirectionsStateChange = (directionState) => {
    setValue("directions", directionState);
  };

  const filRecipes = recipes.filter((recipes) => recipes.recipeType !== '')

const filAlphaRecipes = filRecipes.sort()

const cleanRecipes = Array.from(new Set(filAlphaRecipes.map((filAlphaRecipe) => filAlphaRecipe.recipeType)))
  .map((option) => (option))

const typeOptions = cleanRecipes.sort()

  const ingredientContent = watch("ingredients");
  const directionsContent = watch("directions");
  const recipeTypeContent = watch("recipeType")

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
  <>
    <FormControl fullWidth>
      <TextField
        sx={{ mt: 2, mb: 2 }}
        required
        id="title"
        name="title"
        label="Title"
        placeholder="Title"
        defaultValue=""
        fullWidth
        margin="dense"
        {...register('title')}
        error={errors.title ? true : false}
      />
      <Typography variant="inherit" color="textSecondary">
        {errors.username?.message}
      </Typography>
    </FormControl>
    <TextField
      sx={{ mt: 2, mb: 2 }}
      id="outlined-multiline-static"
      defaultValue=""
      name="description"
      label="Recipe Description"
      placeholder="Recipe Description"
      fullWidth
      margin="dense"
      multiline
      rows={2}
      {...register('description')}
    />
    <Autocomplete
                value={recipeTypeContent}
                defaultValue=""
                {...register('recipeType')}
                onChange={(event, newValue) => {
                  if (typeof newValue === 'string') {
                    const updatedValue = newValue.replace("Add ", "");
                    setValue(updatedValue);
                  } else if (newValue && newValue.inputValue) {
				            // Create a new value from the user input
                    setValue(newValue.inputValue);
                  } else {
                    setValue(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;

                  // Suggest the creation of a new value
                  const isExisting = options.some((option) => inputValue === option);
                  if (inputValue !== "" && !isExisting) {
                    filtered.push(`Add ${inputValue}`);
                  }

                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="recipeType"
                options={typeOptions}
                getOptionLabel= {(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === 'string') {
                    const updatedOption = option.replace("Add ", "");
                    return updatedOption;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.toString();
                }}
                renderOption={(props, option) => <li {...props}>{option}</li>}
                freeSolo
                fullWidth
                renderInput={(option) => (
                  <TextField   
                    {...option}
                    label="RecipeType" 
                    InputProps={{
                      ...option.InputProps,
                      type: 'search',
                    }} 
                    {...register('recipeType')}
                  />
                )}
              />
    
    <TextField
      sx={{ mt: 2, mb: 2 }}
      id="servingSize"
      type="{number}"
      name="servingSize"
      label="Serving Size"
      placeholder="Serving Size"
      fullWidth
      margin="dense"
      {...register('servingSize')}
    />
    <Box>
      <ReactQuill
        theme="snow"
        value={ingredientContent}
        onChange={onIngredientStateChange}
      />
      <p className="Error">{errors.ingredients && "Enter valid content"}</p>

    </Box>
    <Box>
        <ReactQuill
          theme="snow"
          value={directionsContent}
          onChange={onDirectionsStateChange}
        />
        <p className="Error">{errors.directions && "Enter valid content"}</p>
   
      </Box>
      <TextField
        sx={{ mt: 2, mb: 2 }}
        id="source"
        defaultValue=""
        name="source"
        label="Recipe Source"
        placeholder="Recipe Source"
        fullWidth
        margin="dense"
        {...register('source')}
      />
      <input type="submit" onClick={handleSubmit(onSubmit)} />
    </>
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