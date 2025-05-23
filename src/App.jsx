import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from 'config/constant';
import { ConfigContext } from 'contexts/ConfigContext';
import * as actionType from 'store/actions';

import routes, { renderRoutes } from './routes';

const App = () => {
  const configContext = useContext(ConfigContext);
  const { dispatch } = configContext;
  const usersUrl = `${BASE_URL}roles`;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (role === "Super Admin") {
      axios.get(usersUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          dispatch({ type: actionType.ROLE_ID, payload: response.data.data });
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.error('User is not authenticated');
          } else {
            console.error("There was an error fetching the users!", error);
          }
        });
    }

  }, []);

  return <BrowserRouter basename={import.meta.env.VITE_APP_BASE_NAME}>{renderRoutes(routes)}</BrowserRouter>;
};

export default App;
