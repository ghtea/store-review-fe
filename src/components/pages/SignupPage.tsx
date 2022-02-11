/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { TemplateFull } from "../templates/TemplateFull";
import styled, { css } from "styled-components";
import BackButton from "../atoms/BackButton";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../../utils/AxiosInstance";
import axios from "axios";

const color1 = "#60a9f2";

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
  border: solid black 1px;
  padding: 20px;
  margin-top: 20px;
  width: 400px;
  border-radius: 5px;
  border: 0px;
  box-shadow: 2px 2px 5px 3px ${color1}, 1px 1px 1px 1px ${color1};
`;

const InputTitlePtag = styled.p`
  padding-bottom: 5px;
  font-size: 14px;
`;
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
const Input = styled.input`
  outline: 0px;
  ${commonStyle}
`;
//input 스타일에 맞추기 위해서 사용
const GenderStyleDiv = styled.div`
  display: flex;
  flex-flow: nowrap row;
  align-items: center;
  ${commonStyle}
`;
// 유효하지 않은 값 알려주기
const InputAlert = styled.div`
  height: 8px;
  font-size: 8px;
  padding: 5px 0px 0px 5px;
  color: red;
`;
const SuccessSpan = styled.span`
  color: 8px;
`;
const GenderLabel = styled.label`
  padding: 0px 5px;
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

export type SignupPageProps = {};
export const SignupPage: React.FunctionComponent<SignupPageProps> = () => {
  const [userData, setUserData] = useState({
    userId: "",
    password: "",
    name: "",
    nickname: "",
    birthDate: "",
    gender: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    userId: "",
    password: "",
    name: "",
    nickname: "",
    birthDate: "",
    gender: "",
    phone: "",
  });
  const [isSubmit, setIsSubmit] = useState({
    userId: false,
    password: false,
    name: false,
    nickname: false,
    birthDate: false,
    gender: false,
    phone: false,
  });
  const [target, setTarget] = useState("");
  const navigate = useNavigate();

  const handleValidation = (e: any) => {
    //포커스 되었을 때의 값으로 들어간다.
    const { name, value } = e.target;
    setTarget(name);
    setUserData({ ...userData, [e.target.name]: value });
  };

  useEffect(() => {
    switch (target) {
      case "userId":
        //  5 ~ 12자 영문, 숫자, 대문자 조합
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
        //  5 ~ 15자 영문, 숫자 조합
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
      case "name":
        let isNameRegex = /^[ㄱ-힣]{2,8}$/;
        if (!isNameRegex.test(userData.name)) {
          setErrors({ ...errors, name: "한글 로 2~8자로 구성되야합니다." });
          setIsSubmit({ ...isSubmit, name: false });
        } else {
          setErrors({ ...errors, name: "" });
          setIsSubmit({ ...isSubmit, name: true });
        }
        break;
      case "nickname":
        let isNicknameRegex = /^[a-zA-Z0-9ㄱ-힣]{2,8}$/;
        if (!isNicknameRegex.test(userData.nickname)) {
          setErrors({
            ...errors,
            nickname: "영문,숫자,한글 로 2~8자로 구성되야합니다.",
          });
          setIsSubmit({ ...isSubmit, nickname: false });
        } else {
          setErrors({ ...errors, nickname: "" });
          setIsSubmit({ ...isSubmit, nickname: true });
        }
        break;
      case "birthDate":
        let isBirthDateRegex = /^\d{4}-(\d{2})-(\d{2})$/;
        if (!isBirthDateRegex.test(userData.birthDate)) {
          setErrors({ ...errors, birthDate: "날짜 형식에 맞지 않습니다." });
          setIsSubmit({ ...isSubmit, birthDate: false });
        } else {
          setErrors({ ...errors, birthDate: "" });
          setIsSubmit({ ...isSubmit, birthDate: true });
        }
        break;
      case "gender":
        if (userData.gender === null) {
          setErrors({ ...errors, gender: "성별을 선택하세요" });
          setIsSubmit({ ...isSubmit, gender: false });
        } else {
          setErrors({ ...errors, gender: "" });
          setIsSubmit({ ...isSubmit, gender: true });
        }
        break;
      case "phone":
        var isPhoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
        if (!isPhoneRegex.test(userData.phone)) {
          setErrors({
            ...errors,
            phone: "ex) 01012345678 과 같이 입력해주세요",
          });
          setIsSubmit({ ...isSubmit, phone: false });
        } else {
          setErrors({ ...errors, phone: "" });
          setIsSubmit({ ...isSubmit, phone: true });
        }
        break;
      default:
        break;
    }
  }, [userData]);

  const handleSubmit = () => {
    if (
      isSubmit.userId &&
      isSubmit.password &&
      isSubmit.name &&
      isSubmit.nickname &&
      isSubmit.birthDate &&
      isSubmit.gender &&
      isSubmit.phone
    ) {
      axios({
        url: "https://person.jjhserverworld.pe.kr:18080/api/signup",
        //url: 'http://localhost:8080/api/signup',
        method: "POST",
        data: {
          userId: userData.userId,
          password: userData.password,
          name: userData.name,
          nickname: userData.nickname,
          birthDate: userData.birthDate,
          gender: userData.gender,
          phone: userData.phone,
        },
      })
        .then((res) => {
          //성공시 200
          alert("회원가입에 성공하였습니다.");
          console.log(res);
          navigate("/login");
        })
        .catch((error) => {
          //400은 파라미터 오류
          //404는 axios 보내는 경로가 잘못될경우 오류
          //500은 그냥 서버 오류
          //599는 시스템 오류
          console.log(error);
        });
    } else {
      alert("미입력된 부분이나 잘못 입력된 부분이 값이 없는지 확인하세요");
    }
  };

  return (
    <TemplateFull>
      <Container>
        <div style={{ width: "40px" }}>
          <BackButton> </BackButton>
        </div>
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
          <InputTitlePtag> 이름 : </InputTitlePtag>
          <Input
            type="text"
            name="name"
            placeholder="사용자 이름"
            onBlur={handleValidation}
          />
          <InputAlert className="name"> {errors.name} </InputAlert>
        </InputDiv>
        <InputDiv>
          <InputTitlePtag> 닉네임 : </InputTitlePtag>
          <Input
            type="text"
            name="nickname"
            placeholder="사용자 닉네임"
            onBlur={handleValidation}
          />
          <InputAlert className="nickname"> {errors.nickname} </InputAlert>
        </InputDiv>
        <InputDiv>
          <InputTitlePtag> 생년월일 : </InputTitlePtag>
          <Input type="date" name="birthDate" onBlur={handleValidation} />
          <InputAlert className="birthDate"> {errors.birthDate} </InputAlert>
        </InputDiv>
        <InputDiv>
          <InputTitlePtag> 성별 : </InputTitlePtag>
          <GenderStyleDiv>
            <GenderLabel htmlFor="men"> 남성 </GenderLabel>
            <input
              id="men"
              type="radio"
              name="gender"
              value="M"
              onBlur={handleValidation}
            />
            <GenderLabel htmlFor="women"> 여성 </GenderLabel>
            <input
              id="women"
              type="radio"
              name="gender"
              value="W"
              onBlur={handleValidation}
            />
          </GenderStyleDiv>
          <InputAlert className="gender"> {errors.gender} </InputAlert>
        </InputDiv>
        <InputDiv>
          <InputTitlePtag> 휴대폰 번호 : </InputTitlePtag>
          <Input
            type="text"
            name="phone"
            placeholder=" '-' 는 빼고서 입력해주세요"
            onBlur={handleValidation}
          />
          <InputAlert className="phone"> {errors.phone} </InputAlert>
        </InputDiv>
        <InputDiv>
          <Button onClick={handleSubmit}> 회원가입 </Button>
          <Button> 취소 </Button>
        </InputDiv>
      </Container>
    </TemplateFull>
  );
};
