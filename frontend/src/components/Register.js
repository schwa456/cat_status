import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    // 회원가입 처리 로직을 구현합니다.

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // Create payload
    const payload = {
      email: email,
      username: username,
      password: password,
      nickname: userNickname,
      phone: phoneNumber,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("회원가입 성공! 이메일 인증 후 로그인 해주세요.");
        navigate("/login"); // 로그인 성공시 홈으로 이동합니다.
      } else if (response.status === 400) {
        // Handle error
        alert(`회원가입 실패: ${data.email || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error("오류 발생:", error);
      alert("서버와 통신 중 오류가 발생했습니다.")
    }
  };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSignup}>
                <h1>회원가입</h1>

                <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label htmlFor="username">사용자명</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label htmlFor="nickname">닉네임</label>
                    <input type="text" id="nickname" value={userNickname} onChange={(e) => setUserNickname(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label htmlFor="phone-number">전화번호</label>
                    <input type="text" id="phone-number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm-password">비밀번호 확인</label>
                    <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>

                <button type="submit">회원가입</button>

                <p className="login-link">
                    이미 회원이신가요? <Link to="/login">로그인</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;