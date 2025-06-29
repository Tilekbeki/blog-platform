import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className='logo'><NavLink to='/'>RealWorld Blog</NavLink></div>
      <div className='header__buttons'>
        <NavLink to='/sign-in' className='button button_white header__button-login'>Sign In</NavLink>
        <NavLink to='/sign-up' className="button button_green header__button-register">
          Sign Up
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
