import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { LoginPage } from "./components/pages/LoginPage";
import { MapPage } from "./components/pages/MapPage";
import { ErrorPage } from "./components/pages/ErrorPage";
import { SignupPage } from "./components/pages/SignupPage";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyle";
import { themes } from "./styles/theme";
import { StorePage } from "./components/pages/StorePage";
import { useDispatch } from "react-redux";
import { authStore } from "./store";

const App: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken: string | null | undefined =
      window.localStorage.getItem("accessToken");
    if (accessToken) {
      //새로고침 하였을 때 가지고 있는 토큰이 만료일이 유효한지 비교
      if (
        new Date(
          JSON.parse(window.atob(accessToken!.split(".")[1])).exp * 1000
        ) > new Date()
      ) {
        dispatch(
          authStore.return__AUTH({
            //상태값으로 인증 넣어주기
            authorization: true,
            //상태값으로 백엔드에서 보내준 권한 넣어주기
            authority: JSON.parse(window.atob(accessToken!.split(".")[1])).auth,
          })
        );
      } else {
        window.localStorage.removeItem("accessToken");
      }
    }
  }, []);

  return (
    <ThemeProvider theme={themes.light}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/store/:id" element={<StorePage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
