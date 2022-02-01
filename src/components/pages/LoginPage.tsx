/* eslint-disable indent */
import * as React from "react";
import { TemplateFull } from "../templates/TemplateFull";
import styled, { css } from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RootState } from "../../store/reducers";
import BackButton from "../atoms/BackButton";
import Private from "../templates/Private";
import { useDispatch, useSelector } from "react-redux";
import { authStore } from "../../store";

const color1 = "#60a9f2";
// input태그의 스타일과 gender에 div태그의 스타일을 일치시키기 위해 작성된 스타일 컴포넌트
const commonStyle = css`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  padding-left: 10px;
  border: 0px;
  box-shadow: inset 2px 2px 3px 1px ${color1}, 2px 2px 3px 1px ${color1};

  &:focus,
  &:hover {
    background-color: ${color1};
    color: white;
  }
`;
const ServiceLogoSpan = styled.span`
  margin: auto;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.25rem;
  font-weight: 700;
`;
const InputDiv = styled.div`
  display: block;
  padding: 5px;
`;

const Container = styled.div`
  padding: 20px;
  margin-top: 120px;
  width: 400px;
  border-radius: 5px;
  border: 0px;
  box-shadow: 2px 2px 5px 3px ${color1}, 1px 1px 1px 1px ${color1};
`;

const InputTitlePtag = styled.p`
  padding-bottom: 5px;
  font-size: 14px;
`;
const Input = styled.input`
  outline: 0px;
  ${commonStyle}
`;
// 유효하지 않은 값 알려주는 객체의 CSS
const InputAlert = styled.div`
  height: 8px;
  font-size: 8px;
  padding: 5px 0px 0px 5px;
  color: red;
`;
const Button = styled.button`
  ${commonStyle}
  padding-left: 0px;
  width: 40%;
  height: 40px;
  border: 0px;
  margin: 10px 5% 0px;
  background-color: white;
  line-height: 40px;
`;
const LoginMemberBtn = styled.div`
  width: 100%;
  display: flex;
  font-size: 14px;
  flex-flow: wrap row;
  justify-content: space-between;
  padding: 10px 0px;
`;

export type LoginPageProps = {};

export const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  const [userData, setUserData] = useState({ userId: "", password: "" });
  const [errors, setErrors] = useState({ userId: "", password: "" });
  const [isSubmit, setIsSubmit] = useState({ userId: false, password: false });
  const [target, setTarget] = useState("");
  const [auth, setAuth] = useState("");
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
    //if (isSubmit.userId && isSubmit.password) {
    if (true) {
      axios({
        url: "http://person.jjhserverworld.pe.kr:18080/authenticate",
        method: "POST",
        data: {
          //test@review.com
          //9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08
          //해시 256암호화가 필요
          userId: userData.userId,
          password: userData.password,
        },
      })
        .then((res) => {
          console.log(res);
          let token = res.data.data.token;
          console.log(res.data.data.token);
          localStorage.setItem("accessToken", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          alert("로그인에 성공하였습니다.");
          dispatch(
            authStore.return__AUTH({
              //토큰 해제 필요
              authority: "USER_ROLE",
              nickname: "TEST",
            })
          );
          navigate("/login");
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
        <span style={{ width: "40px" }}>
          <BackButton> </BackButton>
        </span>
        <ServiceLogoSpan>
          <Link to={"/"}>여기모아</Link>
        </ServiceLogoSpan>

        <InputDiv>
          <InputTitlePtag> 아이디 : </InputTitlePtag>
          <Input
            type="text"
            name="userId"
            placeholder="아이디를 입력하세요"
            onBlur={handleValidation}
          />
          <InputAlert className="userId"> {errors.userId} </InputAlert>
        </InputDiv>
        <InputDiv>
          <InputTitlePtag> 비밀번호 : </InputTitlePtag>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onBlur={handleValidation}
          />
          <InputAlert className="password"> {errors.password} </InputAlert>
        </InputDiv>
        <InputDiv>
          <Button onClick={handleSubmit}> 로그인 </Button>
          <Button> 취소 </Button>
        </InputDiv>
        <LoginMemberBtn>
          <Link to={"/"} style={{ width: "100px" }}>
            아이디찾기(x)
          </Link>
          <Link to={"/"} style={{ width: "100px" }}>
            비밀번호찾기(x)
          </Link>
          <Link to={"/signup"} style={{ width: "100px" }}>
            회원가입
          </Link>
        </LoginMemberBtn>
      </Container>
    </TemplateFull>
  );
};
