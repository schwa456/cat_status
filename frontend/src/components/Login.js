import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({onLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false); // 로그인 상태 체크

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    await new Promise((r) => setTimeout(r, 1000));

    try {
      const response = await fetch(
          "http://localhost:8000/auth/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
          }
      );

      const result = await response.json();

      if (response.ok) {
        setLoginCheck(false);
        // Store token in local storage
        sessionStorage.setItem("token", result.access_token);
        sessionStorage.setItem("username", username);

        onLogin(result.access_token) // 로그인 성공 시 App 상태 업데이트

        console.log("로그인성공, 이메일주소:" + result.email);
        navigate("/"); // 로그인 성공시 홈으로 이동합니다.
      } else {
        setLoginCheck(true);
        alert(result.detail || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      setLoginCheck(true);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Cat Health Tracker</h1>
        <label htmlFor="username">사용자명</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         {loginCheck && (
        <label  style={{color: "red"}}>사용자명 혹은 비밀번호가 틀렸습니다.</label>
        )}
        <button type="submit">로그인</button>

        <p className="register">
          아직 회원이 아니신가요? <Link to="/register">회원가입</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;