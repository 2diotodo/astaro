import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { signup } from "@features/memberSlice";

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
    console.log(values);
    dispatch(signup(values));
  };

  const checkId = () => {
    let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"ㄱ-ㅎ | ㅏ-ㅣ |가-힣]$/;
    return check.test(values.id);
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
  const checkName = () => {
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
      <div className="signup">
        <div className="signup-text">회원가입</div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="memberId"
            value={values.memberId}
            onChange={handleChange}
            placeholder="ID"
          />
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="password"
            name="passwordConfirm"
            value={values.passwordConfirm}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="text"
            name="nickname"
            value={values.nickname}
            onChange={handleChange}
            placeholder="Nickname"
          />
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Eamil"
          />
          <button type="submit">회원가입</button>
        </form>
      </div>
    </>
  );
}

export default MemberSignup;
