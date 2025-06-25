import { NavLink } from 'react-router-dom';
import './RegisterForm.scss';

const RegisterForm = () => {
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
            <input className="button button_blue" type='submit' value="Register"/>
        </form>
        <div className='ask-message'><span>Already have an account?  </span><NavLink to='/sign-in'>Sign In.</NavLink></div>
    </>
    )
}

export default RegisterForm;