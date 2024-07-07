import React, { useState } from 'react';
import { Button, InputAdornment, TextField } from "@mui/material";
import axios from 'axios';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import bg from "../assets/images/login-bg.jpg";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../store/slices/userSlice';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!")
    .min(4, "Username must be 4 characters!").max(20, "Username must be under 20 characters!"),
  password: Yup.string().required("Password is required!").min(5, "Password is too short!")
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);

  const setLogin = async (login) => {
    try {
      let response = await axios.post("http://localhost:3000/user/login", login);
      if (response.data.status) {
        toast.success(response.data.message);
        localStorage.setItem("access_token", response.data.token);
        dispatch(handleLogin(response.data.user));
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.log('Error:', error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div style={{ minWidth: "300px" }} className='border-stone-800 border-2 p-6 rounded-md bg-gray-800 bg-opacity-25 mr-40 mb-20'>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values) => setLogin(values)}
          validationSchema={LoginSchema}
        >
          {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
            <Form>
              <div>
                <TextField
                  variant='standard'
                  label="Username"
                  fullWidth
                  value={values.username}
                  onChange={handleChange("username")}
                  onBlur={handleBlur("username")}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </div>
              <div className='my-4'>
                <TextField 
                  variant='standard'
                  label="Password"
                  fullWidth
                  value={values.password}
                  type={isShow ? "text" : "password"}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: <InputAdornment position="end" onClick={() => setIsShow(!isShow)}>
                      {
                        isShow ? <VisibilityOff /> : <Visibility />
                      }
                    </InputAdornment>
                  }}
                />
              </div>
              <div className='mt-2 flex justify-end'>
                <Button
                  className='text-xs'
                  variant='contained'
                  component={Link}
                  style={{ fontSize: '0.50rem', backgroundColor: '#90b84c', color: 'white', borderColor: 'black', borderRadius: '10px', border: '1px solid black' }}
                  to="/register"
                >
                  Do not have an account?
                </Button>
              </div>

              <div className='mt-2 flex justify-end'>
                <Button
                  className='text-xs'
                  variant='contained'
                  component={Link}
                  style={{ fontSize: '0.50rem', backgroundColor: '#90b84c', color: 'white', borderColor: 'black', borderRadius: '10px', border: '1px solid black'}}
                  to="/changePassword"
                >
                  Forgot Password?
                </Button>
              </div>

              <div className='flex justify-center mt-7'>
                <Button
                  variant='outlined'
                  type='submit'
                  onClick={handleSubmit}
                  style={{ fontSize: '0.80rem',  color: 'white', borderColor: 'black', borderRadius: '4px', border: '1px solid black'}}
                  endIcon={<LoginOutlinedIcon />}
                >
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="text-center mt-8">
        <h1 className="text-6xl font-bold text-white bg-gradient-to-r from-yellow-600 to-lime-600 p-2 rounded-lg shadow-2xl mr-96">BAZISIBURADA</h1>
      </div>
    </div>
  );
}

export default Login;
