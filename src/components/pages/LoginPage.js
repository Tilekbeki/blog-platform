import LoginForm from "../loginForm/LoginForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const LoginPage = () => {
  const { isLogined } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log("logined? ", isLogined);
  useEffect(() => {
    if (isLogined) {
      navigate("/");
    }
  }, [isLogined]);
  return (
    <div style={{ padding: "60px 0" }}>
      <div className="card-user-form">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
