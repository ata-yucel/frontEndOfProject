




import React, { useState } from 'react'
import { Button, InputAdornment, TextField } from "@mui/material"
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send';
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import bg from "../assets/images/login-bg.jpg"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../store/slices/userSlice';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!")
    .min(3, "Username is too short!").max(20, "Username is too long!"),
  password: Yup.string().required("Password is required!").min(4, "Password is too short!")
})


function Login() {


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isShow, setIsShow] = useState(false)

  const setLogin = async (loginObject) => {
    try {
      let response = await axios.post("http://localhost:3000/user/login", loginObject)
      if (response.data.status) {
        toast.success(response.data.message)
        localStorage.setItem("access_token", response.data.access_token)
        dispatch(handleLogin(response.data.user))
        navigate("/")
      }
    } catch (error) {
      // toast.error(error.response.data.message)
      console.log(error.response)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} >
      <div style={{ minWidth: "300px" }} className='border-gray-300 border-2 p-6 rounded-lg bg-blue-800 bg-opacity-20'>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(value) => setLogin(value)}
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
                <TextField variant='standard'
                  label="Password"
                  type={isShow ? "text" : "password"}
                  fullWidth
                  value={values.password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: <InputAdornment position="end" onClick={() => setIsShow(!isShow)}>
                      {
                        isShow ? <VisibilityOff/> : <Visibility />
                      }
                    </InputAdornment>
                  }}

                />
              </div>
              <span className='my-3 text-sm'>Don't have an account?
                <Link to="/register" className=' underline text-blue-400 ml-1'>Create Now!</Link>
              </span>
              <div className='flex justify-center mt-3'>
                <Button variant='outlined' type='submit' onClick={handleSubmit} endIcon={<SendIcon />}>Login</Button>
              </div>
            </Form>
          )}

        </Formik>
      </div>

    </div>
  )
}

export default Login