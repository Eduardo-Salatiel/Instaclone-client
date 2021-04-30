import { Container, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "./../../assets/img/instaclone.png";

import "./Header.scss";
import RightHeader from "./RightHeader/RightHeader";
import SearchBar from "./SearchBar/SearchBar";

const Header = () => {
  return (
    <div className="header">
      <Container>
        <Grid>
          <Grid.Column width={3} className="header-logo">
            <Link to="/">
              <Image src={logo} alt="Instaclone" />
            </Link>
          </Grid.Column>
          <Grid.Column width={10}>
            <SearchBar />
          </Grid.Column>
          <Grid.Column width={3}>
            <RightHeader />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Header;
