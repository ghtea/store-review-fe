import React, { ReactElement, useState, useEffect } from 'react'
import { TemplateFull } from '../templates/TemplateFull';
import styled, { css } from 'styled-components';
import axios from 'axios';

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
	margin-top: 120px;
	width: 400px;
	height: 300px;
	border-radius: 5px;
	border: 0px;
	box-shadow: 2px 2px 5px 3px #60a9f2, 1px 1px 1px 1px #60a9f2;
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
box-shadow: inset 2px 2px 3px 1px #60a9f2, 2px 2px 3px 1px #60a9f2;

&:focus , &:hover {
	background-color: #60a9f2;
	color: white;
}
`;
const Input = styled.input`
	outline: 0px;
	${commonStyle}
	`;
// 유효하지 않은 값 알려주기
const InputAlert = styled.div`
	height: 8px;
	font-size: 8px;
	padding: 5px 0px 0px 5px;
	color: red;
`
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

export type LoginPageProps = {
}

export const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
	const initValues = { id: "", password: "" }
	const [userData, setUserData] = useState(initValues);
	const [errors, setErrors] = useState({ id: "", password: "" });
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
			default:
				break;
		}
	}, [userData]);

	useEffect(() => {
	}, [errors]);

	const handleSubmit = () => {
		axios.post("http://localhost:8080/api/sign_in", JSON.stringify(userData), {
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
					<InputTitlePtag> 아이디 : </InputTitlePtag>
					<Input type="text" name="id" placeholder="아이디를 입력하세요" onBlur={handleValidation} />
					<InputAlert className="id"> {errors.id} </InputAlert>
				</InputDiv>
				<InputDiv>
					<InputTitlePtag> 비밀번호 :  </InputTitlePtag>
					<Input type="password" name="password" placeholder="비밀번호를 입력하세요" onBlur={handleValidation} />
					<InputAlert className="password">  </InputAlert>
				</InputDiv>
				<InputDiv>
					<Button onClick={handleSubmit}> 로그인 </Button>
					<Button> 취소 </Button>
				</InputDiv>
			</Container>
		</TemplateFull>
	)
}




