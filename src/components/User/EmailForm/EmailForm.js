import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import "./EmailForm.scss";
import { UPDATE_USER } from "../../../graphql/user";

const EmailForm = ({ setShowModal, getUser, refetch}) => {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      email: getUser.email,
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: async () => {
      try {
        await updateUser({
          variables: {
            input: formik.values,
          },
        });
        refetch();
        setShowModal(false);
      } catch (error) {
          console.log(error)
        toast.error("Error al cambial el email");
      }
    },
  });

  return (
    <Form className="email-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="text"
        name="email"
        placeholder="Escribe tu nuevo email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
};

export default EmailForm;
