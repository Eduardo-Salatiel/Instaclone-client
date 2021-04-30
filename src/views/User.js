import { useParams } from 'react-router-dom';

import Profile from "../components/User/Profile"
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS } from '../graphql/publication';
import Publications from '../components/Publications/Publications';

const User = () => {
    const {username} = useParams();
    const {data, loading} = useQuery(GET_PUBLICATIONS, {
        variables: {
            username
        }
    });

    if(loading) return null;
    const {getPublications} = data;

    return ( 
        <>
            <Profile username={username} totalPublications={getPublications.length}/>
            <Publications publications={getPublications} />
        </>
     );
}
 
export default User;