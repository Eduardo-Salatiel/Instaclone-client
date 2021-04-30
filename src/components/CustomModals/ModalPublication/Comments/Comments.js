import { Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from '../../../../graphql/comment';
import imageNotFound  from './../../../../assets/img/avatar.png';
import { Link } from 'react-router-dom';

import './Comments.scss';
import { useEffect } from 'react';


const Comments = ({idPublication}) => {
    const { loading, data, startPolling, stopPolling } = useQuery(GET_COMMENTS, {
        variables: {
            idPublication
        }
    });

    useEffect(() => {
        startPolling(1000)
        return () => {
            stopPolling()
        }
    }, [startPolling,stopPolling]);

    if (loading) return null;
    const {getComments} = data;

    return ( 
        <div className="comments">
            {getComments.map((comment, index) => (
                <Link key={index} to={`/${comment.idUser.username}`} className="comment">
                    <Image src={comment.idUser.avatar || imageNotFound} avatar/>
                    <div>
                        <p>{comment.idUser.username}</p>
                        <p>{comment.comment}</p>
                    </div>
                </Link>
            ))}
        </div>
     );
}
 
export default Comments;