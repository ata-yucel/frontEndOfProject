import React, { useState } from 'react';
import { Button, TextField, InputAdornment } from "@mui/material";
import axios from 'axios';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import bg from "../assets/images/login-bg.jpg";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ForgotPasswordSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!")
    .min(4, "Username must be 4 characters!").max(20, "Username must be under 20 characters!"),
  newPassword: Yup.string().required("New Password is required!").min(5, "New Password is too short!"),
  confirmPassword: Yup.string().oneOf([Yup.ref("newPassword")], "Passwords do not match!").required("Confirm Password is required!")
});

function ChangePassword() {
  const navigate = useNavigate();
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const handleResetPassword = async (resetObject) => {
    try {
      const { username, newPassword } = resetObject;
      let response = await axios.post("http://localhost:3000/user/resetPassword", { username, newPassword });
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
          initialValues={{ username: "", newPassword: "", confirmPassword: "" }}
          onSubmit={(values) => handleResetPassword(values)}
          validationSchema={ForgotPasswordSchema}
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
                  label="New Password"
                  fullWidth
                  type={isShowNewPassword ? "text" : "password"}
                  value={values.newPassword}
                  onChange={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  error={touched.newPassword && Boolean(errors.newPassword)}
                  helperText={touched.newPassword && errors.newPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                      position="end"
                      onClick={() => setIsShowNewPassword(!isShowNewPassword)}
                      style={{ color: 'gray' }}
                    >
                      {
                        isShowNewPassword
                          ? <VisibilityOff />
                          : <Visibility />
                      }
                    </InputAdornment>
                    )
                  }}
                />
              </div>
              <div className='my-4'>
                <TextField
                  variant='standard'
                  label="Confirm New Password"
                  fullWidth
                  type={isShowConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setIsShowNewPassword(!isShowNewPassword)}
                        style={{ color: 'gray' }}
                      >
                        {
                          isShowNewPassword
                            ? <VisibilityOff />
                            : <Visibility />
                        }
                      </InputAdornment>

                    )
                  }}
                />
              </div>
              <div className='flex justify-center mt-7'>
                <Button
                  variant='outlined'
                  type='submit'
                  onClick={handleSubmit}
                  style={{ fontSize: '0.80rem', color: 'white', borderColor: 'black', borderRadius: '4px', border: '1px solid black' }}
                  endIcon={<LockResetOutlinedIcon />}
                >
                  Reset Password
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

export default ChangePassword;
