import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signin } from "@features/memberSlice";

function MemberLogin() {
  const dispatch = useDispatch();

  const [logins, setLogins] = useState({
    id: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    password: "",
  });

  // 필드 방문 상태를 관리한다
  const [touched, setTouched] = useState({
    id: false,
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
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    // 모든 필드에 방문했다고 표시한다.
    setTouched({
      email: true,
      password: true,
    });

    // 필드 검사 후 잘못된 값이면 제출 처리를 중단한다.
    const errors = validate();
    // 오류 메세지 상태를 갱신한다
    setErrors(errors);
    // 잘못된 값이면 제출 처리를 중단한다.
    if (Object.values(errors).some((v) => v)) {
      return;
    }
    console.log(e.target.value);
    dispatch(signin(logins));
  };

  // 필드값을 검증한다.
  const validate = useCallback(() => {
    const errors = {
      email: "",
      password: "",
    };

    if (!logins.email) {
      errors.email = "아이디를 입력하세요";
    }
    if (!logins.password) {
      errors.password = "비밀번호를 입력하세요";
    }
  }, [logins]);

  // 입력값이 변경될때 마다 검증한다.
  useEffect(() => {
    validate();
  }, [validate]);

  const signupHandler = () => {
    navigate("/member/membersignup");
  };
  return (
    <>
      <div className="login">
        <div className="login-text">로그인</div>
        <form className="login-form" onSubmit={loginSubmitHandler}>
          <input
            type="text"
            name="id"
            value={logins.id}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="ID"
          />
          {/* 이메일 오류메시지를 출력한다 */}
          {touched.email && errors.email && <span>{errors.email}</span>}
          <input
            type="password"
            name="password"
            value={logins.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
          />
          {/* 비밀번호 오류메시지를 출력한다 */}
          {touched.password && errors.password && (
            <span>{errors.password}</span>
          )}
          <button type="submit">로그인</button>
        </form>
        <button type="button" onClick={signupHandler}>
          <div className="signup-button">회원가입</div>
        </button>
      </div>
    </>
  );
}

export default MemberLogin;
