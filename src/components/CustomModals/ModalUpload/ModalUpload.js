import { useCallback, useState } from "react";
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { PUBLISH } from "../../../graphql/publication";
import { toast } from "react-toastify";

import "./ModalUpload.scss";

const ModalUpload = ({ setShow, show }) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [publish] = useMutation(PUBLISH);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFileUpload({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png, image/jpg, image/jpeg",
    multiple: false,
    noKeyboard: true,
    onDrop,
  });

  const onClose = () => {
    setIsLoading(false);
    setFileUpload(null);
    setShow(false);
    window.location.reload();
  };

  const handlePublishClick = async () => {
    try {
      setIsLoading(true);
      const result = await publish({
        variables: {
          file: fileUpload.file,
        },
      });

      const { data } = result;

      if (!data.publish.status) {
        toast.warning("Error al cargar publicación");
        setIsLoading(false);
      } else {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="small" open={show} onClose={onClose} className="modal-upload">
      <div
        {...getRootProps()}
        className="dropzone"
        style={fileUpload && { border: 0 }}
      >
        {!fileUpload && (
          <>
            <Icon name="cloud upload" />
            <p>Agrega tu foto a tu post</p>
          </>
        )}
        <input {...getInputProps()} />
      </div>

      {fileUpload?.type === "image" && (
        <div
          className="image"
          style={{ backgroundImage: `url(${fileUpload.preview})` }}
        />
      )}
      {fileUpload && (
        <Button className="btn-upload btn-action" onClick={handlePublishClick}>
          Publicar
        </Button>
      )}
      {isLoading && (
        <Dimmer active className="publishing">
          <Loader />
          <p>Publicando</p>
        </Dimmer>
      )}
    </Modal>
  );
};

export default ModalUpload; 