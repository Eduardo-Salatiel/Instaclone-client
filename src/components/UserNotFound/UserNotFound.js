import { Link } from 'react-router-dom';

import "./UserNotFound.scss";

const UserNotFound = () => {
  return (
    <div className="user-not-found">
      <p className="first">Usuario no encontrado</p>
      <p className="second"> 
        Es posible que el enlace que has seguido sea incorrecto o que el usuario
        se haya eliminado
      </p>
      <Link to="/" >Volver a Home</Link>
    </div>
  );
};

export default UserNotFound;
