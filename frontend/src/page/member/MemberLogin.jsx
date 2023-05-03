import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "@features/memberSlice";
import Input from "@component/Input";
import styled from "styled-components";
import Button from "@component/Button";

const Wrapper = styled.div`
  height: 80%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  color: white;
  position: relative;
  font-size: 40px;
  margin: 15% 0 10% 0;
`;

// const Button = styled.button`
//   width: 50%;
//   position: relative;
//   padding: 5px 20px;
//   margin: 3%;
//   border: 1px solid white;
//   background-color: rgba(0, 0, 0, 0);
//   color: white;
//   font-size: 20px;
// `;

function MemberLogin() {
  const dispatch = useDispatch();

  const [logins, setLogins] = useState({
    memberId: "",
    password: "",
  });

  // 오류메세지 담기
  const [errors, setErrors] = useState({
    memberId: "",
    password: "",
  });

  // 필드 방문 상태를 관리한다
  const [touched, setTouched] = useState({
    memberId: false,
    password: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogins({
      ...logins,
      [e.target.name]: e.target.value,
    });
  };

  // blur 이벤트가 발생하면 touched 상태를 true로 바꾼다
  const handleBlur = (e) => {
    console.log("blur");
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    // 모든 필드에 방문했다고 표시한다.
    setTouched({
      memberId: true,
      password: true,
    });

    // 필드 검사 후 잘못된 값이면 제출 처리를 중단한다.
    const errors = validate();
    console.log("errors", errors);
    // 오류 메세지 상태를 갱신한다
    setErrors(errors);
    // 잘못된 값이면 제출 처리를 중단한다.
    if (Object.values(errors).some((v) => v)) {
      return;
    }
    // console.log(logins);
    dispatch(login(logins));
    // local storage에 memberSeq, Access Token 저장
    localStorage.setItem("memberSeq");
    localStorage.setItem("access-token");
    navigate("/");
  };

  // 필드값을 검증한다.
  const validate = useCallback(() => {
    const errors = {
      memberId: "",
      password: "",
    };

    if (!logins.memberId) {
      errors.memberId = "아이디를 입력하세요";
    }
    if (!logins.password) {
      errors.password = "비밀번호를 입력하세요";
    }
    return errors;
  }, [logins]);

  // 입력값이 변경될때 마다 검증한다.
  useEffect(() => {
    validate();
  }, [validate]);

  const signupHandler = () => {
    navigate("/member/membersignup");
  };
  return (
      <Wrapper>
        <div className="login" style={{ justifyContent: "center" }}>
          <Title className="login-text">로그인</Title>
          <form className="login-form" onSubmit={loginSubmitHandler}>
            <Input
              type="text"
              name="memberId"
              value={logins.memberId}
              onChange={handleChange}
              onBlur={handleBlur}
              width={"60%"}
              textIndent={"0px"}
              placeholder="별명을 말해줘"
            />
            {/* 아이디 오류메시지를 출력한다 */}
            {touched.memberId && errors.memberId && (
              <span>{errors.memberId}</span>
            )}
            <Input
              type="password"
              name="password"
              value={logins.password}
              onChange={handleChange}
              onBlur={handleBlur}
              width={"60%"}
              textIndent={"0px"}
              placeholder="비밀번호를 말해줘"
            />
            {/* 비밀번호 오류메시지를 출력한다 */}
            {touched.password && errors.password && (
              <span>{errors.password}</span>
            )}
            <br/>
            <Button type="submit" style={{ marginTop: "10%" }}>
              로그인
            </Button>
          </form>
          <Button margin="30px" type="button" onClick={signupHandler}>
            <div className="signup-button">회원가입</div>
          </Button>
        </div>
      </Wrapper>
  );
}

export default MemberLogin;
