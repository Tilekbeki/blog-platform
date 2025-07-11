import RegisterForm from "../registerForm/RegisterForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const RegisterPage = () => {
  const { isLogined } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogined) {
      navigate("/");
    }
  }, [isLogined]);

  return (
    <div style={{ padding: "60px 0" }}>
      <div className="card-user-form">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
