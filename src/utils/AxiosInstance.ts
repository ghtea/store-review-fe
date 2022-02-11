import axios from "axios";
import history from "./history";

const AxiosInstance = axios.create({
  baseURL: "http://person.jjhserverworld.pe.kr:18080",
  //baseURL: "http://localhost:8080",
  //timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  //withCredentials: true,
});

AxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    //토큰 만료 에러가 발생하면 로그인 페이지로 이동시키게 한다.
    console.log(error);
    localStorage.removeItem("accessToken");
    history.push("/login");
    return Promise.reject(error);
  }
);

export default AxiosInstance;
