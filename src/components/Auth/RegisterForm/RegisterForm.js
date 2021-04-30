import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import "./RegisterForm.scss";
import { REGISTER } from "./../../../graphql/user";

const RegisterForm = ({ setShowLogin }) => {
  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(true),
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          "El nombre del usuario no puede tener espacio"
        )
        .required(),
      email: Yup.string().email().required(),
      password: Yup.string()
        .required()
        .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales"),
      repeatPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Las contraseñas no sn iguales"),
    }),
    onSubmit: async (formData) => {
      try {
        const userData = formData;
        delete userData.repeatPassword;
        await register({
          variables: {
            input: userData,
          },
        });
        toast.success("Usuario registrado correctamente");
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message)
      }
    },
  });

  return (
    <>
      <h2 className="register-form-title">
        Registrate para ver fotos y videos de tus amigos.
      </h2>
      <Form className="register-form-container" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Nombre y apellidos"
          name="name"
          onChange={formik.handleChange}
          error={formik.errors.name && true}
          value={formik.values.name}
        />
        <Form.Input
          type="text"
          placeholder="Nombre de usuario"
          name="username"
          onChange={formik.handleChange}
          error={formik.errors.username && true}
          value={formik.values.username}
        />
        <Form.Input
          type="text"
          placeholder="Correo electronico"
          name="email"
          onChange={formik.handleChange}
          error={formik.errors.email && true}
          value={formik.values.email}
        />
        <Form.Input
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={formik.handleChange}
          error={formik.errors.password && true}
          value={formik.values.password}
        />
        <Form.Input
          type="password"
          placeholder="Repetir contraseña"
          name="repeatPassword"
          onChange={formik.handleChange}
          error={formik.errors.password && true}
          value={formik.values.repeatPassword}
        />
        <Button type="submit" className="btn-submit">
          Registrarse
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
