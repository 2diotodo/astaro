import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { login } from "@features/memberSlice";
import { isLoginCheck } from "@features/commonSlice/loginSlice";
import Input from "@component/Input";
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
  margin: 10% 0 10% 0;
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
  const navigate = useNavigate();

  // 로그인 입력상태관리
  const [logins, setLogins] = useState({
    memberId: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogins({
      ...logins,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = async () => {
    await dispatch(login(logins)).then((response) => {
      if (!response.error) {
        dispatch(isLoginCheck(true));
        navigate("/");
      } else {
        alert(response.payload.message);
        setLogins({
          memberId: "",
          password: "",
        });
      }
    });
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    if (!logins.memberId) {
      alert("아이디를 입력하세요");
      return;
    } else if (!logins.password) {
      alert("비밀번호를 입력하세요");
      return;
    }

    loginHandler();
  };

  const signupHandler = () => {
    navigate("/member/signup");
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
            width={"60%"}
            textIndent={"0px"}
            placeholder="별명을 말해줘"
          />
          <Input
            type="password"
            name="password"
            value={logins.password}
            onChange={handleChange}
            width={"60%"}
            textIndent={"0px"}
            placeholder="비밀번호를 말해줘"
          />
          <br />
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
