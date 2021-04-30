import { useContext, useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import imageNotFound from "./../../../assets/img/avatar.png";

import "./RightHeader.scss";
import { authContext } from "../../../context/AuthContext";
import { GET_USER } from "../../../graphql/user";
import ModalUpload from "../../CustomModals/ModalUpload";

const RightHeader = () => {
  const { auth } = useContext(authContext);
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username: auth.username },
  });
  const [showModal, setShowModal] = useState(false);

  if(loading || error) return null;
  const { getUser } = data;

  return (
    <>
      <div className="right-header">
        <Link to="/">
          <Icon name="home" />
        </Link>
        <Icon name="plus" onClick={() => setShowModal(true)}/>
        <Link to={`/${auth.username}`}>
          <Image src={getUser.avatar ? getUser.avatar : imageNotFound} avatar alt="Instaclone user" />
        </Link>
      </div>
      <ModalUpload show={showModal} setShow={setShowModal} />
    </>
  );
};

export default RightHeader;
