import { useState } from "react";
import { Image } from "semantic-ui-react";
import ModalPublication from "../../CustomModals/ModalPublication/ModalPublication";

import "./PreviewPublication.scss";

const PreviewPublication = ({ publication }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="preview-publication" onClick={() => setShowModal(true)}>
        <Image className="preview-publication__image" src={publication.file} />
      </div>
      <ModalPublication
        show={showModal}
        setShow={setShowModal}
        publication={publication}
      />
    </>
  );
};

export default PreviewPublication;
