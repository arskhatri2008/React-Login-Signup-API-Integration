import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import Home from "./pages/home/home";
import About from "./pages/about/about";
import Chat from "./pages/chat/chat";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./context/context";
import splashScreen from "./assets/splash.gif";

const baseUrl = "http://localhost:5001";

const App = () => {
  const { state, dispatch } = useContext(GlobalContext);
  // const [isLogin , setIsLogin] = useState(false)

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/mongoDB/profile`, {
          withCredentials: true,
        });
        dispatch({
          type: "USER_LOGIN",
          payload: response.data.data,
        });
        // setIsLogin(true)
      } catch (error) {
        console.log(error);
        dispatch({
          type: "USER_LOGOUT",
        });
        // setIsLogin(false)
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <div>
      {/* admin routes */}
      {state.isLogin === true && state.role === 'admin' ? (
        <>
        <nav>
          <ul>
            <li><Link to={"/"}>Admin Home</Link></li>
            <li><Link to={"/chat"}>Admin Chat</Link></li>
            <li><Link to={"/about"}>Admin About</Link></li>
            {state.user.email}
            {/* <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/signup'}>Sign Up</Link></li> */}
          </ul>
        </nav>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="chat" element={<Chat />} />
            {/* <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} /> */}
            <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </>
      ) : null}

      {/* user routes */}
      {state.isLogin === true && state.role === 'user' ? (
        <>
        <nav>
          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/chat"}>Chat</Link></li>
            <li><Link to={"/about"}>About</Link></li>
            {state.user.email}
            {/* <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/signup'}>Sign Up</Link></li> */}
          </ul>
        </nav>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="chat" element={<Chat />} />
            {/* <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} /> */}
            <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </>
      ) : null}

      {/* unAuth routes */}
      {state.isLogin === false ? (
        <>
        <nav>
          <ul>
            {/* <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/chat'}>Chat</Link></li>
            <li><Link to={'/about'}>About</Link></li> */}
            <li><Link to={"/login"}>Login</Link></li>
            <li><Link to={"/signup"}>Sign Up</Link></li>
          </ul>
        </nav>

          <Routes>
            {/* <Route path='/' element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='chat' element={<Chat />} /> */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace={true} />} />
          </Routes>
        </>
      ) : null}

      {/* splash screen */}
      {state.isLogin === null ? (
        <div>
          <img
            src={splashScreen}
            width="100%"
            height="100%"
            alt=""
            style={{
              position: "absolute",
              margin: "auto",
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default App;
