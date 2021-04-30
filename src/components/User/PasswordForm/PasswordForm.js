import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { toast } from "react-toastify";

import "./PasswordForm.scss";
import { UPDATE_USER } from "../../../graphql/user";

const PasswordForm = ({logout}) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string().required(),
    }),
    onSubmit: async () => {
      try {
        const result = await updateUser({
          variables: {
            input: formik.values,
          },
        });
        if (!result.data.updateUser) {
            toast.error("Error al cambiar la contraseña"); 
        }else {
            logout();
        }
      } catch (error) {
        toast.error("Error al cambiar la contraseña");
      }
    },
  });

  return (
    <Form className="password-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="password"
        placeholder="Contraseña actual"
        name="currentPassword"
        onChange={formik.handleChange}
        value={formik.values.currentPassword}
        error={formik.errors.currentPassword && true}
      />
      <Form.Input
        type="password"
        placeholder="Nueva contraseña"
        name="newPassword"
        onChange={formik.handleChange}
        value={formik.values.newPassword}
        error={formik.errors.newPassword && true}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
};

export default PasswordForm;
