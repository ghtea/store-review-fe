import React, { useState, useMemo, useCallback } from 'react'
import { TemplateFull } from '../templates/TemplateFull';
import styled from 'styled-components';
import axios from 'axios';
import BackButton from '../atoms/BackButton';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../atoms/Button';
import sha256 from 'crypto-js/sha256';

export type SignupPageProps = {

}

const Container = styled.div`
	padding: 24px;
	width: 400px;
  margin: auto;
	border-radius: 5px;
  border: 1px solid #ccc;
`;

const ServiceLogoSpan = styled.span`
  margin: auto;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 700;
`;

const InputContainer = styled.div`
	display: block;
	padding: 5px;
`;

const SignUpButotn = styled(Button)`
  margin-top: 16px;
  width: 100%;
`

const LogoContainer = styled.div`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  padding-top: 8px;
  padding-bottom: 8px;
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

//input 스타일에 맞추기 위해서 사용
const GenderStyleDiv = styled.div`
	display: flex;
	flex-flow: nowrap row;
	align-items: center;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 8px 8px 8px;
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

enum Gender {
  MALE = "M",
  FEMALE = "W"
}

export const SignupPage: React.FunctionComponent<SignupPageProps> = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("")
  const [userIdError, setUserIdError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [nickname, setNickname] = useState("")
  const [nicknameError, setNicknameError] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [birthDateError, setBirthDateError] = useState("")
  const [gender, setGender] = useState<Gender | undefined>(undefined)
  const [genderError, setGenderError] = useState("")
  const [phone, setPhone] = useState("")
  const [phoneError, setPhoneError] = useState("")

  const onChangeUserId: React.FocusEventHandler<HTMLInputElement> = useCallback((event)=>{
    const newValue = event.target.value
    setUserId(newValue)

    const userIdRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userIdRegex.test(newValue)) {
      setUserIdError("유효한 이메일 형식이어야 합니다");
    } else {
      setUserIdError("")
    }
  }, [])

  const onChangePassword: React.FocusEventHandler<HTMLInputElement> = useCallback((event)=>{
    const newValue = event.target.value
    setPassword(newValue)

    const passwordRegex = /^[a-zA-Z0-9]{5,15}$/;
    if (!passwordRegex.test(newValue)) {
      setPasswordError("영문,숫자 로 5~15자로 구성되야합니다.");
    } else {
      setPasswordError("")
    }
  }, [])

  const onChangeName: React.FocusEventHandler<HTMLInputElement> = useCallback((event)=>{
    const newValue = event.target.value
    setName(newValue)

    const nameRegex = /^[ㄱ-힣]{2,8}$/;
    if (!nameRegex.test(newValue)) {
      setNameError("한글 로 2~8자로 구성되야합니다.");
    } else {
      setNameError("")
    }
  }, [])

  const onChangeNickname: React.FocusEventHandler<HTMLInputElement> = useCallback((event)=>{
    const newValue = event.target.value
    setNickname(newValue)

    const nicknameRegex = /^[a-zA-Z0-9ㄱ-힣]{2,8}$/;
    if (!nicknameRegex.test(newValue)) {
      setNicknameError("영문,숫자,한글 로 2~8자로 구성되야합니다.");
    } else {
      setNicknameError("")
    }
  }, [])

  const onChangeBirthDate: React.FocusEventHandler<HTMLInputElement> = useCallback((event)=>{
    const newValue = event.target.value
    setBirthDate(newValue)

    const birthDateRegex = /^\d{4}-(\d{2})-(\d{2})$/;
    if (!birthDateRegex.test(newValue)) {
      setBirthDateError("날짜 형식에 맞지 않습니다.");
    } else {
      setBirthDateError("")
    }
  }, [])

  const onChangeGender: React.ChangeEventHandler<HTMLInputElement> = useCallback((event)=>{
    const newValue = event.target.value
    setGender(newValue as Gender)
    if (!newValue) {
      setGenderError("성별을 선택하세요.");
    } else {
      setGenderError("")
    }
  },[])

  const onChangePhone: React.FocusEventHandler<HTMLInputElement> = useCallback((event)=>{
    const newValue = event.target.value
    setPhone(newValue)

    const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    if (!phoneRegex.test(newValue)) {
      setPhoneError("날짜 형식에 맞지 않습니다.");
    } else {
      setPhoneError("")
    }
  }, [])

  const isEnabledSubmit = useMemo(()=>{
    return (
      !Boolean(userIdError || passwordError || nameError || nicknameError || birthDateError || genderError || phoneError) &&
      Boolean(userId && password && name && nickname && birthDate && gender && phone)
    )
  }, [birthDate, birthDateError, gender, genderError, name, nameError, nickname, nicknameError, password, passwordError, phone, phoneError, userId, userIdError])

  const handleSubmit = useCallback(() => {
    if (isEnabledSubmit) {
      axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/api/signup`,
        method: 'POST',
        data: {
          "userId": userId,
          "password": sha256(password).toString().toUpperCase(),
          "name": name,
          "nickname": nickname,
          "birthDate": new Date(birthDate), // TODO: check if it's needed
          "gender": gender,
          "phone": phone,
        },
      }).then((response) => {
        alert("회원가입에 성공하였습니다.");
        navigate('/login');
      }).catch((error) => {
        console.log(error);
      })
    }
    else {
      alert("미입력된 부분이나 잘못 입력된 부분이 값이 없는지 확인하세요");
    }
  }, [birthDate, gender, isEnabledSubmit, name, navigate, nickname, password, phone, userId])

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
          <InputLabel> 이메일 </InputLabel>
          <Input 
            type="text" 
            name="userId" 
            placeholder="이메일을 입력하세요" 
            onChange={onChangeUserId} 
            autoCapitalize="off" 
            autoCorrect="off" 
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
            autoCapitalize="off" 
            autoCorrect="off" 
          />
          <InputAlert className="password"> {passwordError} </InputAlert>
        </InputContainer>
        <InputContainer>
          <InputLabel> 이름 </InputLabel>
          <Input 
            type="text" 
            name="name" 
            placeholder="사용자 이름" 
            onChange={onChangeName} 
            autoCapitalize="off" 
            autoCorrect="off" 
          />
          <InputAlert className="name"> {nameError} </InputAlert>
        </InputContainer>
        <InputContainer>
          <InputLabel> 닉네임 </InputLabel>
          <Input 
            type="text" 
            name="nickname" 
            placeholder="사용자 닉네임" 
            onChange={onChangeNickname} />
          <InputAlert className="nickname"> {nicknameError} </InputAlert>
        </InputContainer>
        <InputContainer>
          <InputLabel> 생년월일 </InputLabel>
          <Input 
            type="date" 
            name="birthDate" 
            onChange={onChangeBirthDate} />
          <InputAlert className="birthDate"> {birthDateError} </InputAlert>
        </InputContainer>
        <InputContainer>
          <InputLabel> 성별 </InputLabel>
          <GenderStyleDiv >
            <GenderLabel htmlFor="male"> 남성 </GenderLabel> <input id="male" type="radio" name="gender" value="M" onChange={onChangeGender} />
            <GenderLabel htmlFor="female"> 여성 </GenderLabel> <input id="female" type="radio" name="gender" value="W" onChange={onChangeGender} />
          </GenderStyleDiv>
          <InputAlert className="gender"> {genderError} </InputAlert>
        </InputContainer>
        <InputContainer>
          <InputLabel> 휴대폰 번호</InputLabel>
          <Input 
            type="text" 
            name="phone" 
            placeholder=" '-' 는 빼고서 입력해주세요" 
            onChange={onChangePhone} 
            autoCapitalize="off" 
            autoCorrect="off" 
          />
          <InputAlert className="phone"> {phoneError} </InputAlert>
        </InputContainer>
        <SignUpButotn status='primary' onClick={handleSubmit} disabled={!isEnabledSubmit}> 회원가입 </SignUpButotn>
      </Container>
    </TemplateFull>
  )
}


