import { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import RegisterForm from "../../components/Auth/RegisterForm/RegisterForm";
import LoginForm from "../../components/Auth/LoginForm";
import instaclone from "./../../assets/img/instaclone.png";

import "./Auth.scss";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Container fluid className="auth">
      <Image src={instaclone} />
      <div className="auth-form-container">
        {showLogin ? (
            <LoginForm />
        ):(
            <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>
      <div className="auth-actions-container">
        <p>
          {showLogin ? (
            <>
              ¿No tienes cuenta?
              <span onClick={() => setShowLogin(!showLogin)}>Registrate</span>
            </>
          ) : (
            <>
              Entra con tu cuenta
              <span onClick={() => setShowLogin(!showLogin)}>Iniciar sesión</span>
            </>
          )}
        </p>
      </div>
    </Container>
  );
};

export default Auth;
