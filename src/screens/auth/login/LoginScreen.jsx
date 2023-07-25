import { useFormik } from "formik";
import { useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../../components/misc/Input";
import AuthContext from "../../../contexts/AuthContext";
import {login as userLogin} from "../../../services/AuthService"
import LoginSchema from "./LoginSchema";
import './LoginScreen.scss'

function Login() {
  const { state } = useLocation()
  const { login } = useContext(AuthContext)

  const INITIAL_VALUES = {
    email: (state && state.email) || 'tito@perez.com',
    password: '12345678'
  }

  const {
    values, handleChange, handleBlur, handleSubmit, errors,
    isSubmitting, setSubmitting, resetForm
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: onSubmit,
    validationSchema: LoginSchema,
    validateOnBlur: false,
    validateOnChange: false,
  })

  const navigate = useNavigate()
  
  function onSubmit(values) {
    userLogin(values)
      .then(({ accessToken }) => {
        login(accessToken)
        navigate('/')
        setSubmitting(false)
        resetForm()
      })
  }



  return (
    <div className="login-container">
      <div className="card">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}> 

          <Input
            label="Email"
            placeholder="Introduce your email"
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            onBlur={handleBlur}
          />

          <Input
            label="Password"
            placeholder="Write your password"
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            onBlur={handleBlur}
          />

          <button type="submit">
            {isSubmitting ? 'Loading' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;