import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

import "./ComentForm.scss";
import { ADD_COMMENT } from "../../../../graphql/comment";

const ComentForm = ({ publication }) => {
  const [addComment] = useMutation(ADD_COMMENT)

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(),
    }),
    onSubmit: async() => {
      try {
        const result = await addComment({
          variables: {
            input: {
              idPublication: publication.id,
              comment: formik.values.comment
            }
          }
        });
        formik.handleReset();
      } catch (error) {
        console.log(error.message)
      }
    }
  });

  return (
    <Form className="coment-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="comment"
        placeholder="Comentar"
        onChange={formik.handleChange}
        value={formik.values.comment}
        error={formik.errors.comment && true}
      />
      <Button type="submit">Publicar</Button>
    </Form>
  );
};

export default ComentForm;
