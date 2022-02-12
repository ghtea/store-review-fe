import * as React from "react";
import sha256 from 'crypto-js/sha256';
import { TemplateFull } from "../templates/TemplateFull";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import BackButton from "../atoms/BackButton";
import { Button } from "../atoms/Button";
import { useDispatch } from "react-redux";
import { authStore } from "../../store";

const Container = styled.div`
  padding: 24px;
  width: 400px;
  margin: auto;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ServiceLogoSpan = styled.span`
  margin: auto;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 700;
`;

const InputContainer = styled.div`
  display: block;
  padding: 5px;
`;

const LogoContainer = styled.div`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-top: 24px;
`

const InputLabel = styled.p`
  padding-bottom: 5px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
	outline: 0px;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 8px 8px 8px;
`;

// 유효하지 않은 값 알려주는 객체의 CSS
const InputAlert = styled.div`
  height: 8px;
  font-size: 8px;
  padding: 5px 0px 0px 5px;
  color: red;
`;

const LinksContainer = styled.div`
  width: 100%;
  display: flex;
  font-size: 14px;
  flex-flow: wrap row;
  justify-content: flex-end;
  margin-top: 16px;;
  padding: 0 32px 0;
`;

const LogInButton = styled(Button)`
  margin-top: 16px;
  width: 100%;
`

export type LoginPageProps = {};

export const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("")
  const [userIdError, setUserIdError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const onChangeUserId: React.FocusEventHandler<HTMLInputElement> = useCallback((event)=>{
    const newValue = event.target.value
    setUserId(newValue)

    const userIdRegex = /^[a-zA-Z0-9@.]+$/g;
    if (!userIdRegex.test(newValue)) {
      setUserIdError("영문, 숫자, @, .로만 구성되야합니다.");
    } else {
      setUserIdError("")
    }
  }, [])

  const onChangePassword: React.FocusEventHandler<HTMLInputElement> = useCallback((event)=>{
    const newValue = event.target.value
    setPassword(newValue)

    const passwordRegex = /^[a-zA-Z0-9]{4,15}$/;
    if (!passwordRegex.test(newValue)) {
      setPasswordError("영문,숫자로 4~15자로 구성되야합니다.");
    } else {
      setPasswordError("")
    }
  }, [])

  const isEnabledSubmit = React.useMemo(()=>{
    return (
      !Boolean(userIdError || passwordError) &&
      Boolean(userId && password)
    )
  }, [password, passwordError, userId, userIdError])


  const handleSubmit = () => {
    if (isEnabledSubmit) {
      axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/authenticate`,
        method: "POST",
        data: {
          userId: userId,
          password: sha256(password).toString().toUpperCase(),
        },
      })
        .then((res) => {
          const token = res.data.data.token;
          localStorage.setItem("accessToken", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          if (token){
            dispatch(
              authStore.return__AUTHENTICATE({
                token
              })
            );
          }
          navigate("/");
        })
        .catch((error) => {
          alert("로그인 실패...");
        });
    } else {
      alert("미입력된 부분이나 잘못 입력된 부분이 값이 없는지 확인하세요");
    }
  };

  return (
    <TemplateFull>
      <Container>
        
        <BackButton/>
        <LogoContainer>
          <Link to={"/"}>
            <ServiceLogoSpan>여기모아</ServiceLogoSpan>
          </Link>
        </LogoContainer>

        <InputContainer>
          <InputLabel>아이디</InputLabel>
          <Input
            type="text"
            name="userId"
            placeholder="아이디를 입력하세요"
            onChange={onChangeUserId}
          />
          <InputAlert className="userId"> {userIdError} </InputAlert>
        </InputContainer>
        <InputContainer>
          <InputLabel> 비밀번호 </InputLabel>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onChange={onChangePassword}
          />
          <InputAlert className="password"> {passwordError} </InputAlert>
        </InputContainer>
        <InputContainer>
          <LogInButton status="primary" onClick={handleSubmit}> 로그인 </LogInButton>
        </InputContainer>
        <LinksContainer>
          <Link to={"/signup"}>
            회원가입
          </Link>
        </LinksContainer>
      </Container>
    </TemplateFull>
  );
};
