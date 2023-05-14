import { useNavigate } from "react-router-dom";
import { toggleNavBar } from "@features/commonSlice/navSlice";
import { isLoginCheck } from "@features/commonSlice/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

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
  z-index: 9999;
`;

function Navbar({ setIsLogin, isLoginState }) {
  const navigate = useNavigate();

  // NavState 가져오기
  const navState = useSelector((state) => state.navBars);
  const dispatch = useDispatch();

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
            onClick={() => navigateToWhat("tarot")}
            onKeyDown={() => navigateToWhat("tarot")}
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
                onClick={() => navigateToWhat("member/mypage")}
                onKeyDown={() => navigateToWhat("member/mypage")}
              >
                마이페이지&nbsp;
              </HeaderTag>
            </div>
          ) : (
            <HeaderTag
              className="header-font-tag"
              onClick={() => navigateToWhat("member/login")}
              onKeyDown={() => navigateToWhat("member/login")}
            >
              로그인&nbsp;
            </HeaderTag>
          )}
          <HeaderTag
            className="header-font-tag"
            onClick={() => navigateToWhat("star")}
            onKeyDown={() => navigateToWhat("star")}
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
