import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authStore } from "../store";

export const AuthProvider: React.FunctionComponent = ({ children }) =>{
  const dispatch = useDispatch();

  useEffect(()=>{
    const token = localStorage.getItem("accessToken")
    if (token){
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch(
        authStore.return__AUTHENTICATE({
          token
        })
      );
    }
    else {
      localStorage.removeItem("accessToken")
      axios.defaults.headers.common["Authorization"] = ""
    }
  },[dispatch])

  return (
    <>
      {children}
    </>
  )
}