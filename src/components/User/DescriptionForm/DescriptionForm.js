import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import "./DescriptionForm.scss";
import { UPDATE_USER } from "../../../graphql/user";

const DescriptionForm = ({ setShowModal, currentDescription, refetch }) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: {
      description: currentDescription || "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required(),
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
        toast.error("Error al actualizar descripción");
      }
    },
  });

  return (
    <Form className="description-form" onSubmit={formik.handleSubmit}>
      <Form.TextArea
        type="text"
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
        className={formik.errors.description && "error"}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
};

export default DescriptionForm;
