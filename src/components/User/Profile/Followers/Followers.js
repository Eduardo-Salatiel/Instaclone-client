import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWED, GET_FOLLOWERS } from "../../../../graphql/follow";

import "./Followers.scss";
import ModalBasic from "../../../CustomModals/ModalBasic/ModalBasic";
import ListUsers from "../../ListUsers/ListUsers";

const Followers = ({ username, totalPublications }) => {
  const {
    loading: loadingFollowers,
    data: dataFollowers,
    startPolling: startPollingFollowers,
    stopPolling: stopPollingFollowers,
  } = useQuery(GET_FOLLOWERS, {
    variables: {
      username,
    },
  });

  const {
    loading: loadingFolloweds,
    data: dataFolloweds,
    startPolling: startPollingFolloweds,
    stopPolling: stopPollingFolloweds,
  } = useQuery(GET_FOLLOWED, {
    variables: {
      username,
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [modalOptions, setModalOptions] = useState({
    title: "",
    children: null,
  });

  useEffect(() => {
    startPollingFollowers(1000);
    return () => {
      stopPollingFollowers();
    };
  }, [startPollingFollowers, stopPollingFollowers]);

  useEffect(() => {
    startPollingFolloweds(1000);

    return () => {
      stopPollingFolloweds();
    };
  }, [startPollingFolloweds, stopPollingFolloweds]);

  if (loadingFollowers || loadingFolloweds) return null;

  const handleFollowersModal = () => {
    setModalOptions({
      title: "Seguidores",
      children: (
        <ListUsers
          users={dataFollowers.getFollowers}
          setShowModal={setShowModal}
        />
      ),
    });
    setShowModal(true);
  };

  const handleFollowedsModal = () => {
    setModalOptions({
      title: "Seguidos",
      children: (
        <ListUsers
          users={dataFolloweds.getFolloweds}
          setShowModal={setShowModal}
        />
      ),
    });
    setShowModal(true);
  };

  return (
    <>
      <div className="followers">
        <p>
          <span>{totalPublications}</span> publicaciones
        </p>
        <p className="link" onClick={handleFollowersModal}>
          <span>{dataFollowers.getFollowers.length}</span> seguidores
        </p>
        <p className="link" onClick={handleFollowedsModal}>
          <span>{dataFolloweds.getFolloweds.length}</span> seguidos
        </p>
      </div>
      <ModalBasic
        show={showModal}
        setShow={setShowModal}
        title={modalOptions.title}
      >
        {modalOptions.children}
      </ModalBasic>
    </>
  );
};

export default Followers;
