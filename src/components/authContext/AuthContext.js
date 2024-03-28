import React from "react";

const AuthContext  = React.createContext({
    isLoggedIn:"false",
    onLogout:()=>{},
    onLogin:(email,pass)=>{}
})
//React.createContext will provide Component , Provider and Consumer.
export default AuthContext;