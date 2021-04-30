import { Image } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import imageNotFound from "./../../../assets/img/avatar.png";
import { GET_PUBLICATIONS_FOLLOWERS } from "../../../graphql/publication";

import "./Feed.scss";
import Action from "../../CustomModals/ModalPublication/Action";
import ComentForm from "../../CustomModals/ModalPublication/ComentForm";
import ModalPublication from "../../CustomModals/ModalPublication/ModalPublication";

const Feed = () => {
  const [showModal, setShowModal] = useState(false);
  const [publicationSelect, setPublicationSelect] = useState();
  const { loading, data, startPolling, stopPolling } = useQuery(GET_PUBLICATIONS_FOLLOWERS);

  useEffect(() => {
    startPolling(5000);
  
    return () => {
      stopPolling();
    }
  }, [startPolling, stopPolling]);

  if (loading) return null;
  const { getPublicationsFollowers } = data;

  const openPublication = (publication) => {
    setPublicationSelect(publication);
    setShowModal(true);
  }
  return (
    <>
      <div className="feed">
        {getPublicationsFollowers.map((publication, index) => (
          <div className="feed__box" key={index}>
            <Link to={`/${publication.idUser.username}`}>
              <div className="feed__box-user">
                <Image
                  src={publication.idUser.avatar || imageNotFound}
                  avatar
                />
                <span>{publication.idUser.name}</span>
              </div>
            </Link>
            <div
              className="feed__box-photo"
              style={{ backgroundImage: `url(${publication.file})` }}
              onClick={() => openPublication(publication)}
            />
            <div className="feed__box-actions">
              <Action publication={publication} />
            </div>
            <div className="feed__box-form">
              <ComentForm publication={publication} />
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <ModalPublication
          publication={publicationSelect}
          show={showModal}
          setShow={setShowModal}
        />
      )}
    </>
  );
};

export default Feed;
