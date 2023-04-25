import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { GoPencil } from "react-icons/go";

function MemberMypage() {
  const [values, setValues] = useState({
    id: "john doe",
    nickname: "nick",
    password: "ee",
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
    setValues({
      ...values,
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

  const updateSubmitHandler = (e) => {
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

    alert(JSON.stringify(values, null, 2));
  };

  // 필드값을 검증한다.
  const validate = useCallback(() => {
    const errors = {
      email: "",
      password: "",
    };

    if (!values.email) {
      errors.email = "아이디를 입력하세요";
    }
    if (!values.password) {
      errors.password = "비밀번호를 입력하세요";
    }
  }, [values]);

  // 입력값이 변경될때 마다 검증한다.
  useEffect(() => {
    validate();
  }, [validate]);

  const changeProfileHandler = () => {
    console.log("profile Change");
  };
  const resignHandler = () => {
    navigate("/member/membersignup");
  };
  return (
    <>
      <div className="mypage">
        <div className="mypage-text">username님 안녕하세요</div>
        <div className="mypage-wisdom">겨울이 오면 봄이 멀지 않으리 - 셸리</div>
        <div className="mypage-profile">
          <img src="#" alt="profile-image" />
          <GoPencil onClick={changeProfileHandler} />
        </div>

        <div className="mypage-area"></div>
        <form className="update-form" onSubmit={updateSubmitHandler}>
          <div>
            <div>아이디</div>
            <input
              type="text"
              name="id"
              value={values.id}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={values.id}
              disabled
            />
          </div>
          <div>
            <div>닉네임</div>
            <input
              type="text"
              name="nickname"
              value={values.nickname}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={values.nickname}
              disabled
            />
          </div>
          <div>
            <div>이메일</div>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={values.email}
              disabled
            />
          </div>
          <div>
            <div>비밀번호</div>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
            />
          </div>
          <button type="submit">수정하기</button>
        </form>
        <button type="button" onClick={resignHandler}>
          <div className="resign-button">탈퇴하기</div>
        </button>
      </div>
    </>
  );
}

export default MemberMypage;
