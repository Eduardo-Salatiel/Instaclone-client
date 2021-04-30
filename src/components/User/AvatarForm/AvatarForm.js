import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import "./AvatarForm.scss";
import { DELETE_AVATAR, GET_USER, UPDATE_AVATAR } from "../../../graphql/user";

const AvatarForm = ({ setShowModal, auth }) => {
  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    update(cache, { data: { updateAvatar } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });

      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: {
          getUser: { ...getUser, avatar: updateAvatar.urlAvatar },
        },
      });
    },
  });
  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    update(cache) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: auth.username },
      });

      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: {
          getUser: { ...getUser, avatar: "" },
        },
      });
    },
  });
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    try {
      setLoading(true);
      const result = await updateAvatar({ variables: { file } });
      const { data } = result;

      if (!data.updateAvatar.status) {
        toast.warning("Error al actualizar foto de perfil");
        setLoading(false);
      } else {
        setLoading(false);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const handleDeleteClick = async () => {
    try {
      const result = await deleteAvatar();
      const { data } = result;

      if (!data.deleteAvatar) {
        toast.warning("Error al borrar foto de perfil");
      } else {
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="avatar-form">
      <Button {...getRootProps()} loading={loading}>
        Cargar una foto
      </Button>
      <Button onClick={handleDeleteClick}>Eliminar foto actual</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      <input {...getInputProps()} />
    </div>
  );
};

export default AvatarForm;
