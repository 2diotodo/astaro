import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { signup, duplicateId } from "@features/memberSlice";

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

  // 중복확인
  const checkDuplicateId = () => {
    console.log("아이디중복확인");
    dispatch(duplicateId(values.memberId));
  };
  // 필드 정규표현식체크
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
          {errors.memberId && checkId() && (
            <span>한글과 특수문자는 사용하실 수 없어요</span>
          )}
          <button type="button" onClick={checkDuplicateId}>
            중복확인
          </button>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.password && checkPassword() && (
            <span>비밀번호는 8-12자로 입력해주세요</span>
          )}
          <input
            type="password"
            name="passwordConfirm"
            value={values.passwordConfirm}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.passwordConfirm && checkPasswordConfim() && (
            <span>비밀번호가 일치하지 않아요</span>
          )}
          <input
            type="text"
            name="nickname"
            value={values.nickname}
            onChange={handleChange}
            placeholder="Nickname"
          />
          {errors.nickname && checkNickname() && (
            <span>닉네임을 입력하세요</span>
          )}
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Eamil"
          />
          {errors.email && checkEmail() && (
            <span>유효하지 않은 이메일이에요</span>
          )}
          <button type="submit">회원가입</button>
        </form>
      </div>
    </>
  );
}

export default MemberSignup;
