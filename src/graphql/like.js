import { gql } from "@apollo/client";

export const ADD_LIKE = gql`
  mutation addLike($idPublication: ID) {
    addLike(idPublication: $idPublication)
  }
`;

export const IS_LIKE = gql`
  query isLike($idPublication: ID) {
    isLike(idPublication: $idPublication)
  }
`;

export const REMOVE_LIKE = gql`
  mutation removeLike($idPublication: ID) {
    removeLike(idPublication: $idPublication)
  }
`;

export const COUNT_LIKES = gql`
  query countLikes($idPublication: ID) {
    countLikes(idPublication: $idPublication)
  }
`;
