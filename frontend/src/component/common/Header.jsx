import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GiStarSwirl } from "react-icons/gi";
import {
  MdOutlineChatBubbleOutline,
  MdOutlineMarkChatUnread,
} from "react-icons/md";
import Navbar from "@component/common/Navbar";
import { isLoginCheck } from "@features/commonSlice/loginSlice";
import { toggleNavBar } from "@features/commonSlice/navSlice";
import Medium from "@component/text/Medium";
import AudioPlayer from "@/component/AudioPlayer";

function Header() {
  const navState = useSelector((state) => state.navBars);
  const dispatch = useDispatch();

  // 로그인 여부 확인
  const [isLogin, setIsLogin] = useState(() => {
    const token = localStorage.getItem("access-token");
    return !!token;
  });

  // 로그인상태 가져오기
  const isLoginState = useSelector((state) => state.loginCheck);

  const navigate = useNavigate();

  // url 정보 받아오는 hook
  const location = useLocation();

  // 읽지않은 채팅여부확인
  const [unread, setUnread] = useState(false);

  // unread 채팅알람기능 -구현 필요
  const UnreadCheck = () => {
    console.log("chat Alarm");
  };

  // 해당 페이지로 이동 선언
  const navigateToMain = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(isLoginCheck(isLogin));
  }, []);

  useEffect(() => {
    console.log(location);
    dispatch(toggleNavBar(false));
  }, [dispatch, location.pathname, navigate]);

  // 채팅목록으로 이동-변경필요
  const moveToMessageList = () => {
    navigate("/");
  };
  // toggle로 로그인상태관리
  const toggleNavHandler = () => {
    dispatch(toggleNavBar(!navState.toggle));
  };

  return (
    <>
      {location.pathname === "/" ? null : (
        <div className="common-header">
          {/* <AudioPlayer /> */}
          <div className="header-nav">
            <div
              className={`nav-logo ${
                location.pathname === "/" ? "hidden" : " "
              }`}
              onClick={navigateToMain}
              onKeyDown={navigateToMain}
              style={{ color: "white" }}
            >
              <Medium
                style={{ fontFamily: "TAEBAEKmilkyway", fontWeight: "bold" }}
              >
                Astaro
              </Medium>
            </div>
            <div
              className={`navbar-wrapper ${navState.toggle ? "open" : "close"}`}
            >
              <Navbar setIsLogin={setIsLogin} isLoginState={isLoginState} />
            </div>
            {isLogin ? (
              unread ? (
                <MdOutlineMarkChatUnread
                  onClick={moveToMessageList}
                  color="white"
                  size="30px"
                  style={{ zIndex: 9999 }}
                />
              ) : (
                <MdOutlineChatBubbleOutline
                  onClick={moveToMessageList}
                  color="white"
                  size="30px"
                  style={{ right: "60px" }}
                />
              )
            ) : (
              ""
            )}
            <GiStarSwirl
              onClick={toggleNavHandler}
              className={`cursor-pointer ${
                navState.toggle ? "open" : "close"
              } ${location.pathname === "/" ? "hidden" : " "}`}
              color="white"
              size="30px"
              style={{ zIndex: 9999 }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
