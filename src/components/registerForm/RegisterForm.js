import { NavLink } from 'react-router-dom';
import './RegisterForm.scss';
import { registerUser } from '../store/slicers/userSlicer';
import { useDispatch } from 'react-redux';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const userData = {
    "username": "tilekbek",
    "email": "timur.almamatov@yandex.ru",
    "password": "string"
    };
    return (
        <>
            <form className="form-user">
            <div className="card-title">Sign Up</div>
            <div className='form__wrap'>
                <div><label htmlFor="name">Username</label>
                <input type="text" name="name" id="name" placeholder='Username'/>
                </div>
                <div><label htmlFor="email">Email address</label>
                <input type="email" name="email" id="email" placeholder='Email address'/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder='Password'/>
                </div>
                <div>
                    <label htmlFor="reapeatpassword">Repeat Password</label>
                    <input type="password" name="reapeatpassword" id="reapeatpassword" placeholder='Password'/>
                </div>
            </div>
            <input className="button button_blue" type='submit' value="Register" onClick={(e)=> {
                e.preventDefault();
                dispatch(registerUser(userData))
            }}/>
        </form>
        <div className='ask-message'><span>Already have an account?  </span><NavLink to='/sign-in'>Sign In.</NavLink></div>
    </>
    )
}

export default RegisterForm;