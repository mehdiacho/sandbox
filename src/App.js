import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import UserProvider from "./PUBLIC/auth/auth-context";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Login from "./PUBLIC/auth/Login";
import {Admin, User} from "./PUBLIC/pages/Routes";
import Resizer from "./PUBLIC/pages/Resizer";




/**
 * The App method returns the application component that provides the routing and
 * wrapping functionality for the user interface.
 *
 * @returns {JSX.Element} The JSX element representing the application component.
 */
function App() {

  return (
      <UserProvider>
              <Routes>
                  <Route path="/" element={<Resizer />} />
                  <Route path="/" element={<Resizer />} />
                  <Route path="*" element={<Resizer />} />
                  {/*<Route path="/auth" element={<Login />} />
                  <Route path="/admin/*" element={<Admin />} />
                  <Route path="/user/*" element={<User />} />*/}
              </Routes>
      </UserProvider>
  );
}


export default App;
