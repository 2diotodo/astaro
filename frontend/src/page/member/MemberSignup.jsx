import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "@features/memberSlice";

function MemberSignup() {
  const [values, setValues] = useState({
    memberId: "",
    password: "",
    nickname: "",
    email: "",
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
          {/* <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
          /> */}
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
