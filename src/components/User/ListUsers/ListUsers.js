import { Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import imageNotFound from "./../../../assets/img/avatar.png";
import "./ListUsers.scss";

const ListUsers = ({ users, setShowModal }) => {
  const history = useHistory();

  const goToUser = (username) => {
    setShowModal(false);
    history.push(`/${username}`);
  };
  return (
    <div className="list-users">
      {!users.length ? (
        <p className="list-users-empty">No se han encontrado seguidores</p>
      ) : (
        users.map((user) => (
          <div
            className="user"
            key={user.username}
            onClick={() => goToUser(user.username)}
          >
            <Image src={user.avatar || imageNotFound} avatar />
            <div>
              <p>{user.name}</p>
              <p>{user.username}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListUsers;
