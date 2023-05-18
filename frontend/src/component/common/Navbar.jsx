import { useNavigate } from "react-router-dom";
import { toggleNavBar } from "@features/commonSlice/navSlice";
import { isLoginCheck } from "@features/commonSlice/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useEffect } from "react";

const HeaderFont = styled.div`
  margin-top: 20%;
  text-align: right;
`;

const HeaderTag = styled.div`
  padding: 15px 0 15px 0;
  padding-right: 5%;
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  z-index: 999;
`;

function Navbar({ setIsLogin, isLoginState }) {
  const navigate = useNavigate();

  // NavState 가져오기
  const navState = useSelector((state) => state.navBars);
  const dispatch = useDispatch();

  // 로그인 필요메뉴체크
  const needLogin = (linkParam) => {
    if (isLoginState.isLogin === true) {
      navigateToWhat(linkParam);
    } else {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
    }
  };

  // 페이지 이동 함수
  const navigateToWhat = (linkParam) => {
    dispatch(toggleNavBar(false));
    if (linkParam === null) {
      navigate("/home");
    } else {
      navigate(`/${linkParam}`);
    }
  };

  const onLogout = () => {
    localStorage.clear();
    dispatch(isLoginCheck(false));
    setIsLogin(false);
    dispatch(toggleNavBar(false));
    navigate("/home", { replace: true });
  };

  return (
    <>
      <div className="nav-content">
        <HeaderFont className="header-font-group">
          <HeaderTag
            className="header-font-tag"
            onClick={() => navigateToWhat("todaytaro")}
            onKeyDown={() => navigateToWhat("todaytaro")}
          >
            오늘의 운세&nbsp;
          </HeaderTag>

          <HeaderTag
            className="header-font-tag"
            onClick={() => needLogin("tarot")}
            onKeyDown={() => needLogin("tarot")}
          >
            타로&nbsp;
          </HeaderTag>

          {/* 로그인여부 확인하는 삼항연산자 */}
          {isLoginState.isLogin ? (
            <div>
              <HeaderTag
                className="header-font-tag"
                onClick={onLogout}
                onKeyDown={onLogout}
              >
                로그아웃&nbsp;
              </HeaderTag>

              <HeaderTag
                className="header-font-tag"
                onClick={() => navigateToWhat("mypage")}
                onKeyDown={() => navigateToWhat("mypage")}
              >
                마이페이지&nbsp;
              </HeaderTag>

              <HeaderTag
                className="header-font-tag"
                onClick={() => navigateToWhat("message/message-list")}
                onKeyDown={() => navigateToWhat("message/message-list")}
              >
                채팅 목록&nbsp;
              </HeaderTag>
            </div>
          ) : (
            <HeaderTag
              className="header-font-tag"
              onClick={() => navigateToWhat("login")}
              onKeyDown={() => navigateToWhat("login")}
            >
              로그인&nbsp;
            </HeaderTag>
          )}
          <HeaderTag
            className="header-font-tag"
            onClick={() => needLogin("star")}
            onKeyDown={() => needLogin("star")}
          >
            별똥별&nbsp;
          </HeaderTag>
        </HeaderFont>
      </div>
      {/* overlay element to close navbar */}
      {navState.toggle && (
        <div
          className="navbar-overlay"
          onClick={() => dispatch(toggleNavBar(false))}
        />
      )}
    </>
  );
}

export default Navbar;
