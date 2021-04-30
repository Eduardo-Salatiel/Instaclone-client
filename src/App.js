import { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify'
import { authContext } from './context/AuthContext';
import { decodeToken, getToken } from './utils/token';

import Auth from './views/Auth';
import Navigation from './routes/Navigation';

const App = () => {
  const {auth,setUser} = useContext(authContext)

  useEffect(() => {
    const token = getToken();

    if(!token){
      setUser(null)
    } else {
      setUser(decodeToken(token));
    }
  }, []);

  if(auth === undefined) return null;

  return (
    <>
      {!auth ? <Auth /> : <Navigation />}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
