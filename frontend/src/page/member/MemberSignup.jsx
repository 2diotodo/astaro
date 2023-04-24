import { useState } from "react";

function MemberSignup() {
  const [values, setValues] = useState({
    id: "",
    password: "",
    nickname: "",
    email: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("signup");
  };
  return (
    <>
      <div className="signup">
        <div className="signup-text">회원가입</div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            value={values.id}
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
            name="password"
            value={values.password}
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
