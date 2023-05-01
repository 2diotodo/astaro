import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import wisdoms from "@constants/wisdom.json";
import profiles from "@constants/profile.json";
import { GoPencil } from "react-icons/go";
import moon from "@assets/img/moon.png";
import Input from "@component/Input";
import { Modal, Box, Typography } from "@mui/material";

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
const Inputs = styled.input`
  width: 70%;
  height: 30px;
  margin: 5%;
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
  width: 30px;
  position: relative;
  padding: 5px 20px;
  margin: 2%;
  border: 1px solid white;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  font-size: 15px;
  float: right;
  right: 10%;
`;

// modal style - mui
const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  overflow: "scroll",
  transform: "translate(-50%, -50%)",
  width: 250,
  height: 260,
  bgcolor: "rgba(255, 255, 255, 0.8)",
  border: "none",
  borderRadius: 2,
  boxShadow: "none",
  p: 4,
};

function MemberMypage() {
  const [values, setValues] = useState({
    memberId: "john doe",
    password: "ee",
    passwordConfirm: "ee",
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

  // modal profile 행성목록
  const [stars, setStars] = useState(profiles);
  // modal profile icon list 선택관리
  const [profileSelected, setProfileSelected] = useState(
    Array(stars.length).fill(false)
  );

  const profileSelectHandler = (idx) => {
    const selectedCheck = profileSelected.map((el, index) => {
      return index === idx - 1;
    });
    console.log("len", profileSelected);
    setProfileSelected(selectedCheck);
  };
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
    handleOpen();
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

  // modal 관리
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // setProfileSelected(false);
  };
  return (
    <>
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
              <div className="input-box">
                <div className="input-name">아이디</div>
                <Input
                  type="text"
                  name="memberId"
                  value={values.memberId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={values.memberId}
                  width={"60%"}
                  textIndent={"0px"}
                  style={{ fontSize: "15px" }}
                  disabled
                />
              </div>
              <div className="input-box">
                <div className="input-name">별명</div>
                <Input
                  type="text"
                  name="nickname"
                  value={values.nickname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={values.nickname}
                  width={"60%"}
                  textIndent={"0px"}
                  style={{ fontSize: "15px" }}
                />
                {/* 닉네임 오류메시지를 출력한다 */}
                {touched.nickname && errors.nickname && (
                  <span>{errors.nickname}</span>
                )}
              </div>
              <div className="input-box">
                <div className="input-name">이메일</div>
                <Input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={values.email}
                  width={"60%"}
                  textIndent={"0px"}
                  style={{ fontSize: "15px" }}
                  disabled
                />
              </div>
              <div className="input-box">
                <div className="input-name">비밀번호</div>
                <Input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  width={"60%"}
                  textIndent={"0px"}
                  style={{ fontSize: "15px" }}
                />
                {/* 비밀번호 오류메시지를 출력한다 */}
                {touched.password && errors.password && (
                  <span>{errors.password}</span>
                )}
              </div>
              <div className="input-box">
                <Input
                  type="password"
                  name="passwordConfirm"
                  value={values.passwordConfirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  width={"60%"}
                  textIndent={"0px"}
                  style={{ fontSize: "15px" }}
                />
              </div>
              {isUpdated && (
                <Button
                  type="submit"
                  style={{ marginTop: "9%", marginRight: "-8%" }}
                >
                  저장
                </Button>
              )}
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
              width: "40px",
              fontSize: "10px",
              border: "none",
              color: "gray",
              position: "relative",
              float: "left",
              left: "10px",
            }}
          >
            <div className="resign-button">탈퇴하기</div>
          </Button>
        </div>
      </Wrapper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box" sx={boxStyle}>
          <Typography className="modal-body" id="modal-modal-description">
            {stars.map((star) => (
              <Star
                className={profileSelected ? "modal-img selected" : "modal-img"}
                onClick={() => profileSelectHandler(star.starId)}
                key={star.starId}
                id={star.starId}
                value={star.starName}
              >
                <img src={star.starImageUrl} alt={star.starName} />
                <div>{star.starlux} lux</div>
              </Star>
            ))}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
const Star = styled.div``;
// opacity: ${({profileSelected, id}) => (profileSelected[id - 1] ? 1:.3)}

export default MemberMypage;
