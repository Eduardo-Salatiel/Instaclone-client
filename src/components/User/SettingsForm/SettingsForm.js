import { useContext } from "react";
import { Button } from "semantic-ui-react";
import { authContext } from "../../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

import "./SettingsForm.scss";
import PasswordForm from "../PasswordForm/PasswordForm";
import EmailForm from "../EmailForm";
import DescriptionForm from "../DescriptionForm/DescriptionForm";
import SiteWebForm from "../SiteWebForm/SiteWebForm";

const SettingsForm = ({
  setShowModal,
  setModalOptions,
  getCurrentUser,
  refetch,
}) => {
  const { logout } = useContext(authContext);
  const history = useHistory();
  const client = useApolloClient();
  const { getUser } = getCurrentUser;

  const handleLogoutClick = () => {
    client.clearStore();
    logout();
    history.push("/");
  };

  const handleChangePassword = () => {
    setModalOptions({
      title: "Cambiar contraseña",
      children: <PasswordForm logout={logout} />,
    });
  };

  const handleChangeEmail = () => {
    setModalOptions({
      title: "Cambiar emil",
      children: (
        <EmailForm
          setShowModal={setShowModal}
          getUser={getUser}
          refetch={refetch}
        />
      ),
    });
  };

  const handleChangeDescription = () => {
    setModalOptions({
      title: "Actualiza tu descriptcion",
      children: (
        <DescriptionForm
          setShowModal={setShowModal}
          currentDescription={getUser.description}
          refetch={refetch}
        />
      ),
    });
  };

  const handleChangeSiteWeb = () => {
    setModalOptions({
      title: "Actualizar sitio web",
      children: (
        <SiteWebForm
          setShowModal={setShowModal}
          currentSiteWeb={getUser.siteWeb}
          refetch={refetch}
        />
      ),
    });
  };

  return (
    <div className="settings-form">
      <Button onClick={handleChangePassword}>Cambiar contraseña</Button>
      <Button onClick={handleChangeEmail}>Cambiar email</Button>
      <Button onClick={handleChangeDescription}>Cambiar descripcion</Button>
      <Button onClick={handleChangeSiteWeb}>Cambiar sitio web</Button>
      <Button onClick={handleLogoutClick}>Cerrar sesión</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
};

export default SettingsForm;
