import { useContext } from 'react';
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import "./LoginForm.scss";
import { LOGIN } from "../../../graphql/user";
import { decodeToken, setToken } from "../../../utils/token";
import { authContext } from '../../../context/AuthContext';

const LoginForm = () => {
  const {setUser} = useContext(authContext);
  const [login] = useMutation(LOGIN);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (formValues) => {
      try {
        const {data} =await login({
          variables: {
            input: formValues,
          },
        });
        setToken(data.login.token)
        setUser(decodeToken(data.login.token))
      } catch (error) {
          toast.error(error.message);
      }
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <h2 className="login-form-title">
        Entra para ver fotos y videos de tus amigos.
      </h2>
      <Form.Input
        type="text"
        placeholder="Correo electronico"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email && true}
      />
      <Form.Input
        type="password"
        placeholder="Contraseña"
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password && true}
      />
      <Button type="submit" className="btn-submit">
        Iniciar sesión
      </Button>
    </Form>
  );
};

export default LoginForm;
