import { useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { signup, duplicateId } from "@features/memberSlice";
import Input from "@component/Input";
import Button from "@component/Button";

const Wrapper = styled.div`
  height: 80%;
  width: 100%;
  position: absolute;
`;
const Title = styled.div`
  color: white;
  position: relative;
  font-size: 40px;
  margin: 10% 0 10% 0;
`;

const ErrorMessage = styled.div`
  color: white;
`;

function MemberSignup() {
  const [values, setValues] = useState({
    memberId: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    empty: null,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    console.log(values);
    console.log(errors.memberId);
    console.log(checkId());
    dispatch(signup(values));
  };

  // 중복확인
  const checkDuplicateId = () => {
    console.log("아이디중복확인");
    dispatch(duplicateId(values.memberId));
  };
  // 필드 정규표현식체크
  const checkId = () => {
    let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"ㄱ-ㅎ | ㅏ-ㅣ |가-힣]$/;
    return check.test(values.memberId);
  };
  const checkPassword = () => {
    let check = /^[A-Za-z0-9]{8,12}$/; // 단순 8~12자리
    return !check.test(values.password);
  };
  const checkPasswordConfim = () => {
    let check = false;
    if (values.password !== values.passwordConfirm) {
      check = true;
    }
    return check;
  };
  const checkNickname = () => {
    let check = /^[ㄱ-ㅎ | ㅏ-ㅣ |가-힣]{2,10}$/; // 글자 2-10자리
    return !check.test(values.name);
  };
  const checkEmail = () => {
    let check = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return !check.test(values.email);
  };

  // 필드값을 검증한다.
  const validate = useCallback(() => {
    const errors = {
      memberId: "",
      password: "",
      passwordConfirm: "",
      nickname: "",
      email: "",
    };

    if (!values.memberId) {
      errors.memberId = "아이디를 입력하세요";
    }
    if (!values.password) {
      errors.password = "비밀번호를 입력하세요";
    }
    return errors;
  }, [values]);

  return (
    <>
      <Wrapper>
        <div className="signup">
          <Title className="signup-text">회원가입</Title>
          <form className="signup-form" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="memberId"
              value={values.memberId}
              onChange={handleChange}
              placeholder="별이름"
              width={"34%"}
              textIndent={"0px"}
            />
            <Button
              type="button"
              onClick={checkDuplicateId}
              style={{
                width: "16%",
                marginLeft: "5%",
                fontSize: "15px",
              }}
            >
              확인
            </Button>
            {checkId() && (
              <ErrorMessage>한글과 특수문자는 사용할 수 없어요</ErrorMessage>
            )}
            <Input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              width={"60%"}
              textIndent={"0px"}
              placeholder="암호"
            />
            {errors.password && checkPassword() && (
              <ErrorMessage>비밀번호는 8-12자로 입력해주세요</ErrorMessage>
            )}
            <Input
              type="password"
              name="passwordConfirm"
              value={values.passwordConfirm}
              onChange={handleChange}
              width={"60%"}
              textIndent={"0px"}
              placeholder="암호재입력"
            />
            {errors.passwordConfirm && checkPasswordConfim() && (
              <ErrorMessage>비밀번호가 일치하지 않아요</ErrorMessage>
            )}
            <Input
              type="text"
              name="nickname"
              value={values.nickname}
              onChange={handleChange}
              width={"60%"}
              textIndent={"0px"}
              placeholder="별명"
            />
            {errors.nickname && checkNickname() && (
              <ErrorMessage>닉네임을 입력하세요</ErrorMessage>
            )}
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              width={"60%"}
              textIndent={"0px"}
              placeholder="이메일"
            />
            {errors.email && checkEmail() && (
              <ErrorMessage>유효하지 않은 이메일이에요</ErrorMessage>
            )}
            <Button type="submit" style={{ margin: "10%" }}>
              회원가입
            </Button>
          </form>
        </div>
      </Wrapper>
    </>
  );
}

export default MemberSignup;
