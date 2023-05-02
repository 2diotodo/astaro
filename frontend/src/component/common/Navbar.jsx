import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toggleNavBar } from "@features/commonSlice/navSlice";
import { isLoginCheck } from "@features/commonSlice/loginSlice";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const navigate = useNavigate();

  // 로그인 여부 확인
  const [isLogin, setIsLogin] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });

  // 로그인상태 가져오기
  const isLoginState = useSelector((state) => state.loginCheck);

  // NavState 가져오기
  const navState = useSelector((state) => state.navBars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoginCheck(isLogin));
  }, []);

  // 페이지 이동 함수
  const navigateToWhat = (linkParam) => {
    dispatch(toggleNavBar(false));
    if (linkParam === null) {
      navigate("/");
    } else {
      navigate(`/${linkParam}`);
    }
  };

  const onLogout = () => {
    localStorage.clear();
    dispatch(isLoginCheck(false));
    setIsLogin(false);
    dispatch(toggleNavBar(false));
    navigate("/", { replace: true });
  };

  return (
    <nav>
      <div className="nav-content">
        <div className="header-font-group">
          <div
            className="header-font-tag"
            onClick={() => navigateToWhat("todaytaro")}
            onKeyDown={() => navigateToWhat("todaytaro")}
          >
            오늘의 운세&nbsp;
          </div>

          <div
            className="header-font-tag"
            onClick={() => navigateToWhat("tarot")}
            onKeyDown={() => navigateToWhat("tarot")}
          >
            타로&nbsp;
          </div>
          {/* 로그인여부 확인하는 삼항연산자 */}

          {isLoginState.isLogin ? (
            <div>
              <div
                className="header-font-tag"
                onClick={onLogout}
                onKeyDown={onLogout}
              >
                로그아웃&nbsp;
              </div>

              <div
                className="header-font-tag"
                onClick={() => navigateToWhat("member/membermypage")}
                onKeyDown={() => navigateToWhat("member/membermypage")}
              >
                마이페이지&nbsp;
              </div>
            </div>
          ) : (
            <div
              className="header-font-tag"
              onClick={() => navigateToWhat("member/memberlogin")}
              onKeyDown={() => navigateToWhat("member/memberlogin")}
            >
              로그인&nbsp;
            </div>
          )}
          <div
            className="header-font-tag"
            onClick={() => navigateToWhat("star")}
            onKeyDown={() => navigateToWhat("star")}
          >
            별똥별&nbsp;
          </div>
        </div>
      </div>
      {/* overlay element to close navbar */}
      {navState.toggle && (
        <div
          className="navbar-overlay"
          onClick={() => dispatch(toggleNavBar(false))}
        />
      )}
    </nav>
  );
}

export default Navbar;
