import { Modal, Grid, } from 'semantic-ui-react';
import ComentForm from './ComentForm/ComentForm';

import './ModalPublication.scss';
import Comments from './Comments/Comments';
import Action from './Action/Action';

const ModalPublication = ({show, setShow, publication}) => {

    const onClose= () => {
        setShow(false);
    }

    return ( 
        <Modal
            open={show}
            onClose={onClose}
            className="modal-publication"
        >
            <Grid>
                <Grid.Column className="modal-publication__left" width={10} style={{backgroundImage: `url("${publication.file}")`}}>
                    
                </Grid.Column>
                <Grid.Column className="modal-publication__right" width={6}>
                    <Comments idPublication={publication.id} />
                    <Action publication={publication}/>
                    <ComentForm publication={publication}/>
                </Grid.Column>
            </Grid>
        </Modal>
     );
}
 
export default ModalPublication;