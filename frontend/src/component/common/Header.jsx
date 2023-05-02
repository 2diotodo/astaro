import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GiBlackHoleBolas, GiStarSwirl } from "react-icons/gi";
import Navbar from "@component/common/Navbar";
import { toggleNavBar } from "@features/commonSlice/navSlice";

function Header() {
  const navState = useSelector((state) => state.navBars);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // url 정보 받아오는 hook
  const location = useLocation();

  // 해당 페이지로 이동 선언
  const navigateToMain = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(toggleNavBar(false));
  }, [dispatch, location.pathname, navigate]);

  // 블랙홀 페이지로 이동-변경필요
  const moveToBlackhole = () => {
    navigate("/");
  };
  // toggle로 로그인상태관리
  const toggleNavHandler = () => {
    dispatch(toggleNavBar(!navState.toggle));
  };

  return (
    <div className="common-header">
      <div className="header-nav">
        <div
          className={`nav-logo ${location.pathname === "/" ? "hidden" : " "}`}
          onClick={navigateToMain}
          onKeyDown={navigateToMain}
          style={{ color: "white" }}
        >
          <h1>Astaro</h1>
        </div>
        <div className={`navbar-wrapper ${navState.toggle ? "open" : "close"}`}>
          <Navbar />
        </div>
        <GiBlackHoleBolas
          onClick={moveToBlackhole}
          color="white"
          size="30px"
          style={{ right: "60px" }}
        />
        <GiStarSwirl
          onClick={toggleNavHandler}
          className={`cursor-pointer ${navState.toggle ? "open" : "close"}`}
          color="white"
          size="30px"
          style={{ zIndex: 9999 }}
        />
      </div>
    </div>
  );
}

export default Header;
