import LoginForm from '../loginForm/LoginForm';
import './LoginPage.scss';

const LoginPage = () => {
    return (
        <div className="login-page">
            <div className='card-user-form'>
                <LoginForm/>
            </div>
        </div>
    )
}

export default LoginPage;