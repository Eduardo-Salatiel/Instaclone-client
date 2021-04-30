import "./HeaderProfile.scss";
import { Button } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { IS_FOLLOW, FOLLOW, UNFOLLOW } from "../../../../graphql/follow";

const HeaderProfile = ({ getUser, auth, handleModal }) => {
  const { data, loading } = useQuery(IS_FOLLOW, {
    variables: { username: getUser.username },
  });

  const [follow] = useMutation(FOLLOW, {
    update(cache) {
      const { isFollow } = cache.readQuery({
        query: IS_FOLLOW,
        variables: { username: getUser.username },
      });

      cache.writeQuery({
        query: IS_FOLLOW,
        variables: { username: getUser.username },
        data: { isFollow: !isFollow },
      });
    },
  });

  const [unFollow] = useMutation(UNFOLLOW,{
    update(cache) {
      const { isFollow } = cache.readQuery({
        query: IS_FOLLOW,
        variables: { username: getUser.username },
      });

      cache.writeQuery({
        query: IS_FOLLOW,
        variables: { username: getUser.username },
        data: { isFollow: !isFollow },
      });
    },
  });

  const onFollowClick = async () => {
    try {
      await follow({
        variables: {
          username: getUser.username,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUnFollowClick = async () => {
    try {
      await unFollow({
        variables: {
          username: getUser.username,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const buttonFollow = () => {
    if (data.isFollow) {
      return (
        <Button className="btn-danger" onClick={onUnFollowClick}>
          Dejar de seguir
        </Button>
      );
    } else {
      return (
        <Button className="btn-action" onClick={onFollowClick}>
          Seguir
        </Button>
      );
    }
  };

  return (
    <div className="header-profile">
      <h2>{getUser.username}</h2>
      {getUser.username === auth.username ? (
        <Button onClick={() => handleModal("settings")}>Ajustes</Button>
      ) : (
        !loading && buttonFollow()
      )}
    </div>
  );
};

export default HeaderProfile;
