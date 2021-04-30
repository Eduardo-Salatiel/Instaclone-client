import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import imageNotFound from "./../../../assets/img/avatar.png";

import "./UsersNotFolloweds.scss";
import { GET_NOT_FOLLOWEDS } from "../../../graphql/follow";

const UsersNotFolloweds = () => {
  const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);

  if (loading) return null;
  const { getNotFolloweds } = data;

  return (
    <div className="users-not-followeds">
      <h3>Alguien a quien séguir</h3>
      {getNotFolloweds.map((user, index) => (
        <Link
          to={`/${user.username}`}
          key={index}
          className="users-not-followeds__user"
        >
          <Image src={user.avatar || imageNotFound} avatar />
          <span>{user.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default UsersNotFolloweds;
