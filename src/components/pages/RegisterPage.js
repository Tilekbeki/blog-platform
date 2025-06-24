import RegisterForm from "../registerForm/RegisterForm"; 
import './RegisterPage.scss'

const RegisterPage = () => {
    return (
        <div className="register-page">
            <div className="card-user-form">
                <RegisterForm/>
            </div>
        </div>
    )
}

export default RegisterPage;