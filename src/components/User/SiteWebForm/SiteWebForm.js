import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';

import './SiteWebForm.scss'
import { UPDATE_USER } from '../../../graphql/user';

const SiteWebForm = ({setShowModal, currentSiteWeb, refetch}) => {
    const [updateUser] = useMutation(UPDATE_USER);
    const formik = useFormik({
        initialValues: {
            siteWeb: currentSiteWeb || ''
        },
        validationSchema: Yup.object({
            siteWeb: Yup.string().required().url(),
        }),
        onSubmit: async() => {
            try {
                await updateUser({
                    variables: {
                        input: formik.values
                    }
                });
                refetch();
                setShowModal(false);
            } catch (error) {
                toast.error('Error al actualizar tu sitio web')
            }
        }
    })

    return ( 
        <Form className="site-web-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
                name="siteWeb"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.siteWeb}
                error={formik.errors.siteWeb && true}
            />
            <Button className="btn-submit">Actualizar</Button>
        </Form>
     );
}
 
export default SiteWebForm;