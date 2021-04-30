import { Icon } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";

import "./Action.scss";
import {
  ADD_LIKE,
  IS_LIKE,
  REMOVE_LIKE,
  COUNT_LIKES,
} from "../../../../graphql/like";

const Action = ({ publication }) => {
  const [addLike] = useMutation(ADD_LIKE, {
    update(cache) {
      const { isLike } = cache.readQuery({
        query: IS_LIKE,
        variables: { idPublication: publication.id },
      });

      cache.writeQuery({
        query: IS_LIKE,
        variables: { idPublication: publication.id },
        data: {
          isLike: !isLike,
        },
      });
    },
  });

  const [removeLike] = useMutation(REMOVE_LIKE, {
    update(cache) {
      const { isLike } = cache.readQuery({
        query: IS_LIKE,
        variables: { idPublication: publication.id },
      });

      cache.writeQuery({
        query: IS_LIKE,
        variables: { idPublication: publication.id },
        data: {
          isLike: !isLike,
        },
      });
    },
  });

  const { loading, data } = useQuery(IS_LIKE, {
    variables: {
      idPublication: publication.id,
    },
  });

  const { loading: countLoading, data: countData, refetch } = useQuery(COUNT_LIKES, {
    variables: {
      idPublication: publication.id,
    },
  });

  const handleLikeClick = async () => {
    try {
      await addLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUnLikeClick = async () => {
    try {
      await removeLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading || countLoading) return null;
  const { isLike } = data;
  const { countLikes } = countData;

  return (
    <div className="action">
      <Icon
        className={isLike ? "like active" : "like"}
        name={isLike ? "heart" : "heart outline"}
        onClick={isLike ? handleUnLikeClick : handleLikeClick}
      />
      {countLikes} {countLikes === 1 ? "Like" : "Likes"}
    </div>
  );
};

export default Action;
