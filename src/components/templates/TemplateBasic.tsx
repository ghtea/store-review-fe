import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../atoms/Button";
import Private from "./Private";
import Public from "./Public";
import { useDispatch, useSelector } from "react-redux";
import { authStore } from "../../store";
import { RootState } from "../../store/reducers";
import { AUTH } from "../../store/auth";

export type TemplateBasicProps = {
  backgroundColor?: string;
};

const MENU_HEIGHT_PX = 60;

const TemplateBasicDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MenuWrapper = styled.div`
  width: 100%;
  height: ${MENU_HEIGHT_PX}px;
`;

const MenuDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #d0d0d0;
  // background-color: transparent;
`;

const MenuLeftDiv = styled.div`
  flex-direction: row;
  align-items: center;
`;

const ServiceLogoSpan = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.25rem;
  font-weight: 700;
`;

const SearchDiv = styled.div`
  margin-left: 32px;
  flex-direction: row;
`;

const SearchInput = styled.input`
  border-style: solid;
  border-width: 1px;
  border-color: #d8d8d8;
  padding: 8px;
`;

const SearchButton = styled(Button)``;

const LoginButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.textAlternative};
`;

const LogoutButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.textAlternative};
`;

const ContentWrapper = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  height: calc(100% - ${MENU_HEIGHT_PX}px);
  background-color: ${(props) => props.backgroundColor || "transparent"};
`;

export const TemplateBasic: React.FunctionComponent<TemplateBasicProps> = ({
  backgroundColor,
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setSearchValue(event.target.value || "");
    }, []);

  const searchMap = useCallback(() => {
    const serachParams = new URLSearchParams();
    serachParams.set("q", searchValue);

    navigate({ pathname: "/", search: serachParams.toString() });
  }, [navigate, searchValue]);

  const handleSeachButotnClick = useCallback(() => {
    searchMap();
  }, [searchMap]);

  const handleSearchInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        if (event.key === "Enter") {
          searchMap();
        }
      },
      [searchMap]
    );

  const logoutHandler = () => {
    localStorage.setItem("login", "false");
    dispatch(
      authStore.return__AUTH({
        authorization: false,
        authority: "",
      })
    );
  };

  return (
    <TemplateBasicDiv>
      <MenuWrapper>
        <MenuDiv>
          <MenuLeftDiv>
            <ServiceLogoSpan>
              <Link to={"/"}>여기모아</Link>
            </ServiceLogoSpan>
            {location.pathname !== "/" && (
              <SearchDiv>
                <SearchInput
                  onKeyDown={handleSearchInputKeyDown}
                  onChange={handleSearchInputChange}
                />
                <SearchButton onClick={handleSeachButotnClick}>
                  {"검색"}
                </SearchButton>
              </SearchDiv>
            )}
          </MenuLeftDiv>

          <div>
            <Public>
              <LoginButton status={"primary"}>
                <Link to={"/login"}>로그인</Link>
              </LoginButton>
            </Public>
            <Private>
              <LogoutButton status={"primary"} onClick={logoutHandler}>
                로그아웃
              </LogoutButton>
            </Private>
          </div>
        </MenuDiv>
      </MenuWrapper>
      <ContentWrapper backgroundColor={backgroundColor}>
        {children}
      </ContentWrapper>
    </TemplateBasicDiv>
  );
};
