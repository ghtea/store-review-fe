import * as React from "react";
import sha256 from 'crypto-js/sha256';
import { TemplateFull } from "../templates/TemplateFull";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BackButton from "../atoms/BackButton";
import { Button } from "../atoms/Button";
import { useDispatch } from "react-redux";
import { authStore } from "../../store";

const color1 = "#60a9f2";

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

const Container = styled.div`
  padding: 20px;
  width: 400px;
  border-radius: 5px;
  border: 0px;
  // box-shadow: 2px 2px 5px 3px ${color1}, 1px 1px 1px 1px ${color1};
  margin: auto;
`;

const LogoContainer = styled.div`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  padding-top: 16px;
  padding-bottom: 16px;
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
  const [userData, setUserData] = useState({ userId: "", password: "" });
  const [errors, setErrors] = useState({ userId: "", password: "" });
  const [isSubmit, setIsSubmit] = useState({ userId: false, password: false });
  const [target, setTarget] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleValidation = (e: any) => {
    //포커스 되었을 때의 값으로 들어간다.
    const { name, value } = e.target;
    setTarget(name);
    setUserData({ ...userData, [e.target.name]: value });
  };

  useEffect(() => {
    switch (target) {
    case "id":
      let isUseridRegex = /^[a-zA-Z0-9]{5,12}$/g;
      if (!isUseridRegex.test(userData.userId)) {
        setErrors({
          ...errors,
          userId: "영문,숫자 로 5~12자로 구성되야합니다.",
        });
        setIsSubmit({ ...isSubmit, userId: false });
      } else {
        setErrors({ ...errors, userId: "" });
        setIsSubmit({ ...isSubmit, userId: true });
      }
      break;
    case "password":
      let isPasswordRegex = /^[a-zA-Z0-9]{5,15}$/;
      if (!isPasswordRegex.test(userData.password)) {
        setErrors({
          ...errors,
          password: "영문,숫자 로 5~15자로 구성되야합니다.",
        });
        setIsSubmit({ ...isSubmit, password: false });
      } else {
        setErrors({ ...errors, password: "" });
        setIsSubmit({ ...isSubmit, password: true });
      }
      break;
    default:
      break;
    }
  }, [userData]);

  useEffect(() => {}, [errors]);

  const handleSubmit = () => {
    if (true) {
      axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/authenticate`,
        method: "POST",
        data: {
          userId: userData.userId,
          password: sha256(userData.password).toString().toUpperCase(),
        },
      })
        .then((res) => {
          let token = res.data.data.token;
          localStorage.setItem("accessToken", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          alert("로그인에 성공하였습니다.");
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
            onBlur={handleValidation}
          />
          <InputAlert className="userId"> {errors.userId} </InputAlert>
        </InputContainer>
        <InputContainer>
          <InputLabel> 비밀번호</InputLabel>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onBlur={handleValidation}
          />
          <InputAlert className="password"> {errors.password} </InputAlert>
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
