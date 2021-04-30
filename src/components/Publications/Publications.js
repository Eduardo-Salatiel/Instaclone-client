import { Grid } from 'semantic-ui-react';
import PreviewPublication from './PreviewPublication/PreviewPublication';

import './Publications.scss'

const Publications = ({publications}) => {
    return ( 
        <div className="publications">
            <h1>Publicaciones</h1>
            <Grid columns={4}>
                {publications.map((publication, index) => (
                    <Grid.Column key={index}>
                        <PreviewPublication publication={publication} />
                    </Grid.Column>
                ))}
            </Grid>
        </div>
     );
}
 
export default Publications;