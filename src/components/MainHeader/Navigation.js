import React, { useContext } from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../authContext/AuthContext';

const Navigation = (props) => {
  const ctx = useContext(AuthContext);
  // Alternate appraoch to useContext App <AuthContext.Consumer>
  // <AuthContext.Consumer>
    {/* {(ctx) => { */}
      return (
        <nav className={classes.nav}>
          <ul>
            {ctx.isLoggedIn && (
              <li>
                <a href="/">Users</a>
              </li>
            )
            }
            {
              ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )
            }
            {
              ctx.isLoggedIn && (
                <li>
                  <button onClick={ctx.onLogout}>Logout</button>
                </li>
              )
            }
          </ul>
        </nav>
      );
    }
  // </AuthContext.Consumer>
  // )
  

export default Navigation;
