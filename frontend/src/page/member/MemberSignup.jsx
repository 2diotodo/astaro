import styled from "styled-components";
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

// Styled Component
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
  justify-content: start;
  align-items: center;

  padding: 5%;
  font-size: 18px;
  font-weight: 500;
  color: white;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: relative;

  height: 15%

  padding: 5%;

  background-color: transparent;
`;

const Label = styled.label.attrs((props) => ({
  for: props.for || "",
}))`
  width: 10%;
  height: 90%;

  font-size: 20px;
  font-weight: 700;
  color: white;
  transition: all 0.2s;
`;

const Input = styled.input.attrs((props) => ({
  id: props.id || "",
  type: props.type || "text",
  placeholder: props.placeholder || "",
}))`
  &:focus + ${Label}, &:valid + ${Label} {
    ${Label} {
      font-size: 16px;
      bottom: 40px;
      color: #666;
      font-weight: bold;
    }
  }

  width: 70%;
  height: 90%;

  border: none;
  border-bottom: solid #aaaaaa 1px;

  color: white;
  opacity: 0.5;
  background: none;
`;

const SubmitBtn = styled.button`
  width: 10%;
  height: 90%;
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
      /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/; // 단순 8~12자리

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

  useEffect(() => {
    if (passwordConfirm !== "") {
      setTimeout(() => {
        if (password === passwordConfirm) {
          setValidatePw(true);
          setMessage("사용하실 닉네임을 입력해주세요.");
        }
      }, 500);
    }
  }, [passwordConfirm]);

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
        navigate("/member/login");
      } else {
        alert(response.payload.message);
        navigate("/member/signup");
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
              placeholder={email}
              onChange={handleChangeEm}
              value={email}
            />
            <button onClick={handleClickEm}>이메일 체크</button>
          </InputWrapper>
        ) : null}
        {validatePw === true ? (
          <InputWrapper>
            <Input
              placeholder={nickname}
              onChange={handleChangeNn}
              value={nickname}
            />
            <button onClick={handleClickNn}>닉네임 체크</button>
          </InputWrapper>
        ) : null}
        {validateId === true ? (
          <InputWrapper>
            <Input
              placeholder={password}
              onChange={handleChangePw}
              value={password}
            />
            <Input
              placeholder={passwordConfirm}
              onChange={handleChangePwConfirm}
              value={passwordConfirm}
            />
          </InputWrapper>
        ) : null}
        <InputWrapper>
          <Label for="memberId">Id</Label>
          <Input
            placeholder={memberId}
            onChange={handleChangeId}
            value={memberId}
            id="memberId"
          />

          <SubmitBtn onClick={handleClickId}>체크</SubmitBtn>
        </InputWrapper>
        {validateEm === true ? (
          <InputWrapper>
            <button onClick={handleClickSubmit}>회원가입</button>
          </InputWrapper>
        ) : null}
      </Wrapper>
    </>
  );
}

export default MemberSignup;
