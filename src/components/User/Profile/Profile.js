import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../graphql/user";
import { Grid, Image } from "semantic-ui-react";
import imageNotFound from "./../../../assets/img/avatar.png";

import "./Profile.scss";
import UserNotFound from "../../UserNotFound";
import ModalBasic from "../../CustomModals/ModalBasic/ModalBasic";
import AvatarForm from "../AvatarForm";
import { authContext } from "../../../context/AuthContext";
import HeaderProfile from "./HeaderProfile/HeaderProfile";
import SettingsForm from "../SettingsForm/SettingsForm";
import Followers from "./Followers/Followers";

const Profile = ({ username, totalPublications }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalOptions, setModalOptions] = useState({
    title: "",
    children: null,
  });
  const { auth } = useContext(authContext);
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: {
      username,
    },
  });

  if (loading) return null;
  if (error) return <UserNotFound />;

  const handleModal = (type) => {
    switch (type) {
      case "avatar":
        setModalOptions({
          title: "Cambiar foto de perfil",
          children: <AvatarForm setShowModal={setShowModal} auth={auth} />,
        });
        setShowModal(true);
        break;
      case "settings":
        setModalOptions({
          title: "",
          children: (
            <SettingsForm
              setShowModal={setShowModal}
              setModalOptions={setModalOptions}
              getCurrentUser={data}
              refetch={refetch}
            />
          ),
        });
        setShowModal(true);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Grid className="profile">
        <Grid.Column width={5} className="profile-left">
          <Image
            src={data.getUser.avatar ? data.getUser.avatar : imageNotFound}
            alt="instaclone user"
            avatar
            onClick={() => username === auth.username && handleModal("avatar")}
          />
        </Grid.Column>
        <Grid.Column width={11} className="profile-right">
          <HeaderProfile
            getUser={data.getUser}
            auth={auth}
            handleModal={handleModal}
          />
          <Followers username={username} totalPublications={totalPublications}/>
          <div className="other">
            <p className="name">{data.getUser.name}</p>
            {data.getUser.siteWeb && (
              <a
                href={data.getUser.siteWeb}
                className="site-web"
                rel="noreferrer"
                target="_blank"
              >
                {data.getUser.siteWeb}
              </a>
            )}
            {data.getUser.description && (
              <p className="description">{data.getUser.description}</p>
            )}
          </div>
        </Grid.Column>
      </Grid>
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

export default Profile;
