import { Grid } from 'semantic-ui-react';
import Feed from '../../components/Home/Feed';
import UsersNotFolloweds from '../../components/Home/UsersNotFolloweds';

import './Home.scss';

const Home = () => {
    return ( 
        <Grid className="home">
            <Grid.Column width={11} className="home__left">
                <Feed />
            </Grid.Column>
            <Grid.Column width={5} className="home__right">
                <UsersNotFolloweds />
            </Grid.Column>
        </Grid>
     );
}
 
export default Home;