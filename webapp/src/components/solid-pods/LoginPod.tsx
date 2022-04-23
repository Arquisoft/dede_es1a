import { useState, useEffect } from 'react';
import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import LoginForm from "./LoginForm"
import ProfileViewer from "./ProfileViewer"

//import {createData} from "./code/insertExampleData"


function LoginPod():  JSX.Element   {
//We use this state variable
const [isLoggedIn, setIsLoggedIn] = useState(false);

//With this we can control the login status for solid
const { session } = useSession();


function getCartContent() {
  const memoryCart = localStorage.getItem("cart");
  if (memoryCart) {
    return JSON.parse(memoryCart);
  } else {
    return [];
  }
}


//We have logged in
session.onLogin(()=>{
  setIsLoggedIn(true)
})

//We have logged out
session.onLogout(()=>{
  setIsLoggedIn(false)
})

  return (
    <SessionProvider sessionId="log-in-example">
      
      {(!isLoggedIn) ? <LoginForm/> : <ProfileViewer cartContent={getCartContent()}/>}
    </SessionProvider>
  )
}

export default LoginPod;


