import React from 'react';
import { Button, TextField } from "@mui/material";
import axios from 'axios';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import bg from "../assets/images/login-bg.jpg";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!")
    .min(4, "Username must be 4 characters!").max(20, "Username must be under 20 characters!"),
  password: Yup.string().required("Password is required!").min(5, "Password is too short!"),
  email: Yup.string().email("Invalid Email").required("Email is required!"),
  passwordConfirm: Yup.string().oneOf([Yup.ref("password")], "Passwords do not match!").required("Password confirm is required!"),
  birthDate: Yup.date().required("Birth Date is required!").test("age", "You must be at least 18 years old", function (value) {
    const currentDate = new Date();
    const userDate = new Date(value);
    const age = currentDate.getFullYear() - userDate.getFullYear();
    return age >= 18;
  })
});

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (registerObject) => {
    try {
      delete registerObject["passwordConfirm"];
      let response = await axios.post("http://localhost:3000/user/register", registerObject);
      if (response.data.status) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div style={{ minWidth: "300px" }} className='border-stone-800 border-2 p-6 rounded-md bg-gray-800 bg-opacity-25 mr-40 mb-20'>
        <Formik
          initialValues={{ email: "", username: "", password: "", passwordConfirm: "", birthDate: "" }}
          onSubmit={(values) => handleRegister(values)}
          validationSchema={RegisterSchema}
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
                  label="Email"
                  fullWidth
                  value={values.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </div>
              <div className='my-4'>
                <TextField 
                  variant='standard'
                  label="Password"
                  fullWidth
                  type="password"
                  value={values.password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </div>
              <div className='my-4'>
                <TextField 
                  variant='standard'
                  label="Confirm Password"
                  fullWidth
                  type="password"
                  value={values.passwordConfirm}
                  onChange={handleChange("passwordConfirm")}
                  onBlur={handleBlur("passwordConfirm")}
                  error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
                  helperText={touched.passwordConfirm && errors.passwordConfirm}
                />
              </div>
              <div className='my-4'>
                <TextField
                  variant='standard'
                  label="Birth Date"
                  type='date'
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={values.birthDate}
                  onChange={handleChange("birthDate")}
                  onBlur={handleBlur("birthDate")}
                  error={touched.birthDate && Boolean(errors.birthDate)}
                  helperText={touched.birthDate && errors.birthDate}
                />
              </div>
              <div className='mt-2 flex justify-end'>
                <Button
                  className='text-xs'
                  variant='contained'
                  component={Link}
                  style={{ fontSize: '0.50rem', backgroundColor: 'grey', color: 'white', borderColor: 'black', borderRadius: '10px', border: '1px solid black' }}
                  to="/login"
                >
                  Already have an account?
                </Button>
              </div>

              <div className='flex justify-center mt-7'>
                <Button
                  variant='outlined'
                  type='submit'
                  onClick={handleSubmit}
                  style={{ fontSize: '0.80rem',  color: 'white', borderColor: 'black', borderRadius: '4px', border: '1px solid black'}}
                  endIcon={<PersonAddAlt1OutlinedIcon />}
                >
                  Register
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

export default Register;
