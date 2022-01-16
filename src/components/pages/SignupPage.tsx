import React, { ReactElement, useState, useEffect } from 'react'
import { TemplateFull } from '../templates/TemplateFull';
import styled, { css } from 'styled-components';
import axios from 'axios';

const color1 = "#60a9f2";

const Logo = styled.div`
	margin: auto;
	font-size: 24px;
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
	height: 600px;
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

&:focus , &:hover {
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
`
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
export type SignupPageProps = {

}
export const SignupPage: React.FunctionComponent<SignupPageProps> = () => {
  const initValues = { id: "", password: "", name: "", nickname: "", birthDate: "", gender: "", phone: "" }
  const [userData, setUserData] = useState(initValues);
  const [errors, setErrors] = useState({ id: "", password: "", name: "", nickname: "", birthDate: "", gender: "", phone: "" });
  const [isSubmit, setIsSubmit] = useState(false);
  const [target, setTarget] = useState("");

  const handleValidation = (e: any) => {
    //포커스 되었을 때의 값으로 들어간다.
    const { name, value } = e.target
    setTarget(name);
    setUserData({ ...userData, [e.target.name]: value });
  }

  useEffect(() => {
    switch (target) {
    case "id":
      //  5 ~ 12자 영문, 숫자, 대문자 조합
      //^[a-zA-Z]{1}[a-zA-Z0-9_]{4,11}$
      var isIdRegex = /^[a-zA-Z]+[a-z0-9A-Z_]{4,11}$/g;
      if (userData.id.length < 5 || userData.id.length > 13) {
        const error = "아이디의 길이는 5~12자 이내입니다."
        setErrors({ ...errors, id: error });
      }
      else if (!isIdRegex.test(userData.id)) {
        const error = "아이디는 영문으로 시작하고 영문,숫자,대문자로만 구성되야 합니다."
        setErrors({ ...errors, id: error });
      }
      else {
        setErrors({ ...errors, id: "" });
      }
      break;
    case "password":
      //  8 ~ 10자 영문, 숫자 조합
      var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
      break;
    case "name":
      break;
    case "nickname":
      break;
    case "birthDate":
      break;
    case "gender":
      break;
    case "phone":
      // '-' 입력 시
      var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
      // 숫자만 입력시
      var regExp2 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
      break;
    default:
      break;
    }
  }, [userData]);


  useEffect(() => {
  }, [errors]);

  const handleSubmit = () => {
    axios.post("http://localhost:8080/user/signup", JSON.stringify(userData), {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);

    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <TemplateFull>
      <Container>
        <Logo>
					여기모아
        </Logo>
        <InputDiv>
          <InputTitlePtag> 아이디 :  </InputTitlePtag>
          <Input type="text" name="id" placeholder="아이디를 입력하세요" onBlur={handleValidation} />
          <InputAlert className="id"> {errors.id} </InputAlert>
        </InputDiv>
        <InputDiv>
          <InputTitlePtag> 비밀번호 :  </InputTitlePtag>
          <Input type="password" name="password" placeholder="비밀번호를 입력하세요" onBlur={handleValidation} />
          <InputAlert className="password">  </InputAlert>
        </InputDiv>
        <InputDiv>
          <InputTitlePtag> 이름 :  </InputTitlePtag>
          <Input type="text" name="name" placeholder="사용자 이름" onBlur={handleValidation} />
          <InputAlert className="name">  </InputAlert>
        </InputDiv>
        <InputDiv>
          <InputTitlePtag> 닉네임 :  </InputTitlePtag>
          <Input type="text" name="nickname" placeholder="사용자 닉네임" onBlur={handleValidation} />
          <InputAlert className="nickname">  </InputAlert>
        </InputDiv>
        <InputDiv>
          <InputTitlePtag> 생년월일 :  </InputTitlePtag>
          <Input type="text" name="birthDate" placeholder="ex)20200807" onBlur={handleValidation} />
          <InputAlert className="birthDate">  </InputAlert>
        </InputDiv>
        <InputDiv>
          <InputTitlePtag> 성별 :  </InputTitlePtag>
          <GenderStyleDiv >
            <GenderLabel htmlFor="men"> 남성 </GenderLabel> <input id="men" type="radio" name="gender" value="M" onBlur={handleValidation} />
            <GenderLabel htmlFor="women"> 여성 </GenderLabel> <input id="women" type="radio" name="gender" value="W" onBlur={handleValidation} />
          </GenderStyleDiv>
          <InputAlert className="gender">  </InputAlert>
        </InputDiv>
        <InputDiv>
          <InputTitlePtag> 휴대폰 번호 : </InputTitlePtag>
          <Input type="text" name="phone" placeholder=" '-' 는 빼고서 입력해주세요" onBlur={handleValidation} />
          <InputAlert className="phone">  </InputAlert>
        </InputDiv>
        <InputDiv>
          <Button onClick={handleSubmit}> 회원가입 </Button>
          <Button> 취소 </Button>
        </InputDiv>
      </Container>
    </TemplateFull>
  )
}


