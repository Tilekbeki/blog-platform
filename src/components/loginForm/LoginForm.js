import { NavLink } from 'react-router-dom';
import { loginUser } from '../store/slicers/userSlicer';
import { useDispatch } from 'react-redux';
const LoginForm = () => {
    const dispatch = useDispatch();
    const userData = {
      "email": "timur.almamatov@yandex.ru",
    "password": "string"
    };
    return (
    <>
    <form className="form-user">
        <div className="card-title">Sign In</div>
        <div className='form__wrap'>
            <div><label htmlFor="email">Email address</label>
            <input type="email" name="email" id="email" placeholder='Email address'/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder='Password'/>
            </div>
        </div>
        <input className="button button_blue" type='submit' value="Login" onClick={()=> dispatch(loginUser(userData))}/>
        
    </form>
    <div className='ask-message'><span>Don’t have an account? </span><NavLink to='/sign-up'>Sign Up.</NavLink></div>
    </>
    )
}

export default LoginForm;