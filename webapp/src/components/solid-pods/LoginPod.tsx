import { useState, useEffect } from 'react';
import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import LoginForm from "./LoginForm"
import ProfileViewer from "./ProfileViewer"

type Props = {
  setLoggedPod: (b:boolean) => void;
};

  const LoginPod: React.FC<Props> = ({setLoggedPod}) => {
// function LoginPod():  JSX.Element   {
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
  setIsLoggedIn(true);
  setLoggedPod(true);
})

//We have logged out
session.onLogout(()=>{
  setIsLoggedIn(false);
  setLoggedPod(false);
})

  return (
    <SessionProvider sessionId="log-in-example">
      
      {(!isLoggedIn) ? <LoginForm/> : <ProfileViewer />}
    </SessionProvider>
  )
}

export default LoginPod;


