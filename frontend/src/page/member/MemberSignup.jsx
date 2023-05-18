import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signup,
  duplicateId,
  duplicateNn,
  duplicateEm,
} from "@features/memberSlice";
import { MdCheckCircleOutline } from "react-icons/md";

// Styled Component
const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  display: flex:
  flex-direction: column;
  justify-content: start;
  align-items: center;

  position: absolute;
  height: 90%;
  width: 90%;
  background-color: tranparent;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  font-size: 28px;
  font-weight: 700;
  color: white;
`;
const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5%;
  font-size: 18px;
  font-weight: 500;
  color: white;
`;

const Label = styled.label`
  font-size: 16px;
  color: #fff;
`;

const Input = styled.input.attrs((props) => ({
  type: props.type || "text",
  placeholder: props.placeholder || "",
}))`
  width: 90%;
  height: 30px;

  border: 0;
  background: transparent;

  font-size: 16px;
  color: #fff;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  width: 80%;

  margin-left: 10%;
  margin-bottom: 5%;
  padding-bottom: 5px;

  border: 0;
  border-bottom: 1px solid #555;

  animation: ${FadeIn} 1s linear forwards;
`;

function MemberSignup() {
  // 기능
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 회원가입 Input Value
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  // 회원가입 가능 상태 Value
  const [validateId, setValidateId] = useState(false);
  const [validatePw, setValidatePw] = useState(false);
  const [validateNn, setValidateNn] = useState(false);
  const [validateEm, setValidateEm] = useState(false);
  const [message, setMessage] = useState("사용하실 Id를 입력해주세요.");

  // input 태그 onChange handler
  const handleChangeId = (e) => {
    setMemberId(e.target.value);

    let check = /[~!@#$%^&*()_+|<>?:{}.,/;='"ㄱ-ㅎ | ㅏ-ㅣ |가-힣]$/;

    if (check.test(memberId)) {
    }
  };
  const handleChangePw = (e) => {
    setPassword(e.target.value);

    let check =
      /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

    if (check.test(password)) {
      console.log("통과함?");
    }
  };
  const handleChangePwConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const handleChangeNn = (e) => {
    setNickname(e.target.value);

    let check = /^[ㄱ-ㅎ | ㅏ-ㅣ |가-힣]{2,10}$/; // 글자 2-10자리
    if (check.test(nickname)) {
      setMessage("사용할 닉네임을 입력해 주세요.");
    }
  };

  // useEffect(() => {
  //   if (passwordConfirm !== "") {
  //     setTimeout(() => {
  //       if (password === passwordConfirm) {
  //         setValidatePw(true);
  //         setMessage("사용하실 닉네임을 입력해주세요.");
  //       }
  //     }, 500);
  //   }
  // }, [password, passwordConfirm]);

  const handleChangeEm = (e) => {
    setEmail(e.target.value);

    let check = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (check.test(email)) {
    }
  };

  // Button 태그 Onclick 이벤트 핸들러
  const handleClickId = () => {
    dispatch(duplicateId(memberId)).then((response) => {
      if (response.payload.status === "409") {
        alert(response.payload.message);
        setMemberId("");
      } else {
        alert(response.payload.message);
        setMessage("사용하실 비밀번호를 입력해주세요.");
        setValidateId(true);
      }
    });
  };
  const handleClickPw = () => {
    if (password === passwordConfirm) {
      alert("사용가능한 비밀번호입니다.");
      setValidatePw(true);
      setMessage("사용하실 닉네임을 입력해주세요.");
    }
  };
  const handleClickNn = () => {
    dispatch(duplicateNn(nickname)).then((response) => {
      if (response.payload.status === "409") {
        alert(response.payload.message);
        setNickname("");
      } else {
        alert(response.payload.message);
        setMessage("사용하실 이메일을 입력해주세요.");
        setValidateNn(true);
      }
    });
  };
  const handleClickEm = () => {
    dispatch(duplicateEm(email)).then((response) => {
      if (response.payload.status === "409") {
        alert(response.payload.message);
        setEmail("");
      } else {
        alert(response.payload.message);
        setMessage("좋아요!");
        setValidateEm(true);
      }
    });
  };
  const handleClickSubmit = async () => {
    const values = {
      memberId: memberId,
      password: password,
      nickname: nickname,
      email: email,
    };

    await dispatch(signup(values)).then((response) => {
      if (!response.error) {
        alert("회원가입 완료!");
        navigate("/login");
      } else {
        alert(response.payload.message);
        navigate("/signup");
      }
    });
  };

  return (
    <>
      <Wrapper>
        <Title>회원가입</Title>
        <Message key={message}>{message}</Message>
        {validateNn === true ? (
          <InputWrapper>
            <Input
              placeholder="이메일"
              onChange={handleChangeEm}
              value={email}
            />
            <MdCheckCircleOutline
              onClick={handleClickEm}
              color={validateEm ? "green" : "white"}
              size={30}
            />
          </InputWrapper>
        ) : null}
        {validatePw === true ? (
          <InputWrapper>
            <Input
              placeholder="닉네임"
              onChange={handleChangeNn}
              value={nickname}
            />
            <MdCheckCircleOutline
              onClick={handleClickNn}
              color={validateNn ? "green" : "white"}
              size={30}
            />
          </InputWrapper>
        ) : null}

        {/* 비밀번호 태그 */}
        {validateId === true ? (
          <>
            <InputWrapper>
              <Input
                placeholder="비밀번호"
                onChange={handleChangePw}
                value={password}
                type="password"
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                placeholder="비밀번호 체크"
                onChange={handleChangePwConfirm}
                value={passwordConfirm}
                type="password"
              />
              <MdCheckCircleOutline
                onClick={handleClickPw}
                color={validatePw ? "green" : "white"}
                size={30}
              />
            </InputWrapper>
          </>
        ) : null}

        {/* ID 태그 */}
        <InputWrapper>
          <Input
            placeholder="아이디"
            onChange={handleChangeId}
            value={memberId}
          />
          <MdCheckCircleOutline
            onClick={handleClickId}
            color={validateId ? "green" : "white"}
            size={30}
          />
        </InputWrapper>

        {validateEm === true ? (
          <button onClick={handleClickSubmit}>회원가입</button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default MemberSignup;
