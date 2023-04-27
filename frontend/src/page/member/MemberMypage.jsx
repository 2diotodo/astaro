import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import wisdoms from "@constants/wisdom.json";
import { GoPencil } from "react-icons/go";
import moon from "@assets/img/moon.png";
import { Background } from "@component/Background";

const Wrapper = styled.div`
  height: 80%;
  width: 100%;
  position: absolute;
`;

const Title = styled.div`
  color: white;
  position: relative;
  font-size: 40px;
  font-family: "Nanum Myeongjo", monospace;
  margin-top: 20%;
`;
const Subtitle = styled.div`
  position: relative;
  color: white;
  font-size: 15px;
  font-family: "Nanum Myeongjo", monospace;
  margin: 5% 5% 5% 5%;
`;
const Input = styled.input`
  width: 60%;
  height: 30px;
  margin: 2%;
  background-color: rgba(0, 0, 0, 0);
  border-bottom: 1px solid white;
  color: white;
  font-size: 20px;

  ::placeholder {
    color: white;
  }
  :disabled {
    color: gray;
  }
`;
const Button = styled.button`
  width: 20%;
  position: relative;
  padding: 5px 20px;
  margin: 2%;
  border: 1px solid white;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  font-size: 15px;
  justify-contend: end;
`;

function MemberMypage() {
  const [values, setValues] = useState({
    memberId: "john doe",
    password: "ee",
    nickname: "nick",
    email: "dora@naver.com",
  });
  const [errors, setErrors] = useState({
    nickname: "",
    password: "",
  });

  // 명언 json파일관리
  const [selectWisdom, setSelectWisdom] = useState({
    number: 0,
    wisdom: "",
    writer: "",
  });

  // 수정버튼 보임 관리
  const [isUpdated, setIsUpdated] = useState(false);
  // 필드 방문 상태를 관리한다
  const [touched, setTouched] = useState({
    nickname: false,
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
      nickname: true,
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
    console.log("update-memberinfo");
    setIsUpdated(false);
  };

  // 필드값을 검증한다.
  const validate = useCallback(() => {
    const errors = {
      nickname: "",
      password: "",
    };

    if (!values.nickname) {
      errors.nickname = "닉네임을 입력하세요";
    }
    if (!values.password) {
      errors.password = "비밀번호를 입력하세요";
    }
    return errors;
  }, [values]);

  useEffect(() => {
    // 1-101 난수생성
    const min = 1;
    const max = 101;
    let randNumber = Math.floor(Math.random() * (max - min)) + min;
    console.log(randNumber);
    console.log(wisdoms[randNumber].wisdom);
    console.log(wisdoms[randNumber].writer);
    setSelectWisdom(wisdoms[randNumber]);
  }, []);

  // 입력값이 변경될때 마다 검증한다.
  useEffect(() => {
    validate();
  }, [validate]);

  const changeProfileHandler = () => {
    console.log("profile Change");
  };

  // 수정하기 누르면 수정UI+수정완료버튼으로 바꾸기
  const toggleButtonHandler = () => {
    setIsUpdated(true);
  };

  // 회원탈퇴버튼
  const resignHandler = () => {
    console.log("탈퇴?");
    // navigate("/member/membersignup");
  };
  return (
    <>
      <Background style={{ position: "relative", zIndex: -10000000 }} />
      <Wrapper>
        <div className="mypage">
          <Title className="mypage-text">
            username<span style={{ fontSize: "15px" }}>님 안녕하세요</span>
          </Title>

          <Subtitle className="mypage-wisdom">
            {selectWisdom.wisdom} -{selectWisdom.writer}
          </Subtitle>
          <div className="mypage-profile">
            <img src={moon} alt="profile" style={{ width: "90px" }} />
            <GoPencil onClick={changeProfileHandler} color="white" />
          </div>

          <div className="mypage-area">
            <form className="update-form" onSubmit={updateSubmitHandler}>
              <div>
                <Input
                  type="text"
                  name="memberId"
                  value={values.memberId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={values.memberId}
                  disabled
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="nickname"
                  value={values.nickname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={values.nickname}
                />
                {/* 닉네임 오류메시지를 출력한다 */}
                {touched.nickname && errors.nickname && (
                  <span>{errors.nickname}</span>
                )}
              </div>
              <div>
                <Input
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
                <Input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                />
                {/* 비밀번호 오류메시지를 출력한다 */}
                {touched.password && errors.password && (
                  <span>{errors.password}</span>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                />
              </div>
              {isUpdated && <Button type="submit">저장</Button>}
            </form>
            {!isUpdated && (
              <Button type="button" onClick={toggleButtonHandler}>
                수정
              </Button>
            )}
          </div>
          <Button
            type="button"
            onClick={resignHandler}
            style={{
              fontSize: "10px",
              border: "none",
              color: "gray",
              position: "relative",
            }}
          >
            <div className="resign-button">탈퇴하기</div>
          </Button>
        </div>
      </Wrapper>
    </>
  );
}

export default MemberMypage;
