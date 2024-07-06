




import React, { useState } from 'react'
import { Button, TextField } from "@mui/material"
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send';
import { Formik } from "formik"
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import bg from "../assets/images/login-bg.jpg"

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!")
    .min(3, "Username is too short!").max(20, "Username is too long!"),
  password: Yup.string().required("Password is required!").min(4, "Password is too short!"),
  email: Yup.string().email("Invalid Email").required("Email is required!"),
  passwordConfirm: Yup.string().oneOf([Yup.ref("password")],"Passwords not match!").required("Password confirm is required!")
})


function Register() {

  const navigate = useNavigate()

  const handleRegister = async (registerObject) => {
    try {
      // console.log(registerObject)
      delete registerObject["passwordConfirm"]
      let response = await axios.post("http://localhost:9000/user/register", registerObject)
      console.log(response.data)
      if (response.data.status) {
        toast.success(response.data.message)
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error.response)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} >
      <div style={{ minWidth: "300px" }} className='border-gray-300 border-2 p-6 rounded-lg bg-blue-800 bg-opacity-20'>
        <Formik
          initialValues={{ email: "", username: "", password: "", passwordConfirm: "" }}
          onSubmit={(value) => handleRegister(value)}
          validationSchema={RegisterSchema}
        >
          {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
            <>
              <div>
                <TextField
                  variant='standard'
                  label="Username"
                  fullWidth
                  required
                  value={values.username}
                  onChange={handleChange("username")}
                  onBlur={handleBlur("username")}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </div>
              <div className='my-2'>
                <TextField
                  variant='standard'
                  label="Email"
                  fullWidth
                  required
                  value={values.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </div>
              <div className='my-2'>
                <TextField variant='standard'
                  label="Password"
                  type='password'
                  fullWidth
                  required
                  value={values.password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </div>
              <div className='my-2'>
                <TextField variant='standard'
                  label="Password Confirm"
                  type='password'
                  fullWidth
                  required
                  value={values.passwordConfirm}
                  onChange={handleChange("passwordConfirm")}
                  onBlur={handleBlur("passwordConfirm")}
                  error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
                  helperText={touched.passwordConfirm && errors.passwordConfirm}
                />
              </div>
              <span className='my-3 text-sm'>Do you have an account?
                <Link to="/login" className=' underline text-blue-400 ml-1'>Go Login!</Link>
              </span>
              <div className='flex justify-center mt-3'>
                <Button variant='outlined' onClick={handleSubmit} color='error' endIcon={<SendIcon />}>Create Account</Button>
              </div>
            </>
          )}

        </Formik>
      </div>

    </div>
  )
}

export default Register