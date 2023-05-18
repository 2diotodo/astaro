import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Navbar from "@component/common/Navbar";
import { isLoginCheck } from "@features/commonSlice/loginSlice";
import { toggleNavBar } from "@features/commonSlice/navSlice";
import Medium from "@component/text/Medium";
import "@css/headers.css";

function Header() {
  // 로그인상태 가져오기
  const isLoginState = useSelector((state) => state.loginCheck);
  const navState = useSelector((state) => state.navBars);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // url 정보 받아오는 hook
  const location = useLocation();

  // 로그인 여부 확인
  const token = localStorage.getItem("access-token");
  const [isLogin, setIsLogin] = useState(() => {
    return !!token;
  });

  // 해당 페이지로 이동 선언
  const navigateToMain = () => {
    navigate("/home");
  };

  useEffect(() => {
    setIsLogin(!!token);
    dispatch(isLoginCheck(isLogin));
  }, [navigate, token]);

  useEffect(() => {
    dispatch(toggleNavBar(false));
  }, [dispatch, location.pathname, navigate]);

  // toggle로 로그인상태관리
  const toggleNavHandler = () => {
    dispatch(toggleNavBar(!navState.toggle));
  };

  const closeHandler = () => {
    dispatch(toggleNavBar(false));
  };

  return (
    <>
      {location.pathname === "/" ? null : (
        <div className="common-header">
          <div className="header-nav">
            <div
              className={`nav-logo ${
                location.pathname === "/" ? "hidden" : " "
              }`}
              onClick={navigateToMain}
              onKeyDown={navigateToMain}
              style={{ color: "white" }}
            >
              <Medium style={{ fontWeight: "bold" }}>Astaro</Medium>
            </div>
            <div
              className={`navbar-wrapper ${navState.toggle ? "open" : "close"}`}
              onClick={closeHandler}
            >
              <Navbar setIsLogin={setIsLogin} isLoginState={isLoginState} />
            </div>
            <div style={{ position: "absolute", right: "2vw" }}>
              <GiHamburgerMenu
                onClick={toggleNavHandler}
                className={`cursor-pointer ${
                  navState.toggle ? "open" : "close"
                } ${location.pathname === "/" ? "hidden" : " "}`}
                color="white"
                size="30px"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
