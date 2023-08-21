import React, { useState, useRef, Fragment } from "react";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Paper, Box, Grid, Button, FillledInput, OutlinedInput, InputLabel, InputAdornment, 
IconButton, FormHelperText, FormControl, FormControlLabel, Checkbox, TextField, Typography} from '@mui/material';
import { Visibility, VisibilityOff,} from '@mui/icons-material';

import AuthService from "../services/auth.service";

 

const RegisterComponent = () => {
   // const form = useRef();
   const checkBtn = useRef();
   
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const handleRegister = (data) => {
    const username=data.username
    const email=data.email
    const password = data.password
 

    setMessage("");
    setSuccessful(false);

    // form.current.validateAll();

    // if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          console.log("success")
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  
  

  // const onSubmit = data => {
  //   console.log(JSON.stringify(data, null, 2));
  // };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

   return (
    <Fragment>
      <Paper>
        {!successful && (
        <Box px={3} py={2}>
          <Typography variant="h6" align="center" margin="dense">
            Register to Start Your Cookbook Now!
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="username"
                name="username"
                label="Username"
                fullWidth
                margin="dense"
                {...register('username')}
                error={errors.username ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.username?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                margin="dense"
                {...register('email')}
                error={errors.email ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  {...register('password')}
                    error={errors.password ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.password?.message}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                  {...register('confirmPassword')}
                    error={errors.confirmPassword ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.confirmPassword?.message}
                </Typography>
              </FormControl>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(handleRegister)}
              // onClick={handleSubmit(onSubmit)}
            >
              Register
            </Button>
          </Box>
        </Box>
        )}
        {message && (
        <>
         <h1>You registered succesfully!</h1>
        </>
        )}
      </Paper>
    </Fragment>
       


//   const form = useRef();
//   const checkBtn = useRef();

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [successful, setSuccessful] = useState(false);
//   const [message, setMessage] = useState("");

//   const onChangeUsername = (e) => {
//     const username = e.target.value;
//     setUsername(username);
//   };

//   const onChangeEmail = (e) => {
//     const email = e.target.value;
//     setEmail(email);
//   };

//   const onChangePassword = (e) => {
//     const password = e.target.value;
//     setPassword(password);
//   };

//   // const required = (value) => {
//   //   if (!value) {
//   //     return (
//   //       <div>
//   //       <TextField
//   //         error
//   //         id="outlined-error"
//   //         label="Error"
//   //         defaultValue="Hello World"
//   //       />
//   //       <TextField
//   //         error
//   //         id="outlined-error-helper-text"
//   //         label="Error"
//   //         defaultValue="Hello World"
//   //         helperText="Incorrect entry."
//   //       />
//   //     </div>
//   //     );
//   //   }
//   // };

//   const required = (value) => {
//     if (!value.toString().trim().length) {
//       // We can return string or jsx as the 'error' prop for the validated Component
//       return 'require';
//     }
//   };
  
  
//   const validEmail = (value) => {
//     if (!isEmail(value)) {
//       return (
//         <div className="alert alert-danger" role="alert">
//           This is not a valid email.
//         </div>
//       );
//     }
//   };



//   return (
//   <>
//     <Form onSubmit={handleRegister} ref={form}>
//       {!successful && (
//       <>
//         <Box
//           sx={{
//             '& > :not(style)': { m: 1, width: { xs: '25ch', sm: '50ch' } },
//           }}
//           onSubmit={handleRegister}
//         >
//           <div className="form-group">
//             <FormControl sx={{ m: 1, width: { xs: '25ch', sm: '50ch' } }} variant="outlined">
//               <TextField 
//                 id="outlined-basic" 
//                 label="User Name" 
//                 value={username} 
//                 onChange={onChangeUsername} 
//                 variant="outlined" 
//               />
//             </FormControl>
//           </div>
//           <div className="form-group">
//             <FormControl sx={{ m: 1, width: { xs: '25ch', sm: '50ch' } }} variant="outlined">
//               <TextField 
//                 id="outlined-basic" 
//                 label="Email" 
//                 value={email} 
//                 onChange={onChangeEmail} 
//                 variant="outlined" 
//               />
//             </FormControl>
//           </div>
//           <div className="form-group">
//           <FormControl sx={{ m: 1, width: { xs: '25ch', sm: '50ch' }}} variant="outlined">
//             <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//             <OutlinedInput
//               id="outlined-adornment-password"
//               onChange={onChangePassword}
//               type={showPassword ? 'text' : 'password'}
//               endadornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="Password"
//             />
//           </FormControl>
//          </div>
//           {/* <div className="form-group">
//             <TextField 
//               id="outlined-adornment-password"
//               type={showPassword ? 'text' : 'password'}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleClickShowPassword}
//                     onMouseDown={handleMouseDownPassword}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//               label="Password" 
//               value={password} 
//               onChange={onChangePassword} 
//               variant="outlined" 
//             />
//           </div> */}
//           <div className="form-group">
//             <Button variant="contained" type="submit">
//               Sign Up
//             </Button>
//           </div>
//         </Box>
//       </>
//       )}
//       {message && (
//             <div className="form-group">
//               <div
//                 className={ successful ? "alert alert-success" : "alert alert-danger" }
//                 role="alert"
//               >
//                 {message}
//               </div>
//             </div>
//           )}
//           <CheckButton style={{ display: "none" }} ref={checkBtn} />
//     </Form>
//   </>   
   )
}

export default RegisterComponent;