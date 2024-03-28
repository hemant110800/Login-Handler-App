import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/authContext/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem("userLoggedIn"), isLoggedIn);
    if (localStorage.getItem("userLoggedIn") === "1") {
      setIsLoggedIn(true);
    }
    console.log(isLoggedIn)
  }, [])



  const loginHandler = (email, password) => {
    localStorage.setItem("userLoggedIn", "1");
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userLoggedIn");
    setIsLoggedIn(false);
  };

  // isLoggedIn , onLogin, onLogout this we are passing to child components , and some properites
  // we are just passing to children components (property drilling) so instead of this we can use Context to 
  // store this props and use where required.

  console.log(isLoggedIn);
  return (
    // <React.Fragment>
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn, onLogin: loginHandler, onLogout: logoutHandler
    }}>
      {/* <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} /> */}
      <MainHeader /> {/*Now we will not pass on props we can directly use it through useContext whre it required (avoid prop drilling) */}
      <main>
        {/* {!isLoggedIn && <Login onLogin={loginHandler} />} */}
        {/* {isLoggedIn && <Home onLogout={logoutHandler} />} */}
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
    </AuthContext.Provider>
    // </React.Fragment>
  );
}

export default App;
