import { NavLink } from 'react-router-dom';
import './Header.scss';
import { useSelector,useDispatch } from 'react-redux';
import useCheckJWT from '../../hooks/useCheckJWT';
import { logout } from '../store/slicers/userSlicer';


const Header = () => {
  const { isLogined, img,username } = useSelector(state => state.user);
  useCheckJWT()
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    dispatch(logout());
  };


  const controlElements = <div className='logined-user-block'>
                            <NavLink to="/new-article" className='button button_green create-article-button'>create article</NavLink>
                            <NavLink to="/profile" style={{textDecoration: "unset"}}>
                                <div className='article-info-person'>
                                    <div>
                                        <div className='article__author'>{username}</div>
                                    </div>
                                    <img className='article__avatar' src={img} alt='avatar'/>
                                </div>
                            </NavLink>
                            <button className='button button_white logout-button' onClick={()=>handleLogout()}>Log Out</button>
                          </div>;
  return (
    <div className="header">
      <div className='logo'><NavLink to='/'>RealWorld Blog</NavLink></div>
      {isLogined ?  controlElements : <div className='header__buttons'>
        <NavLink to='/sign-in' className='button button_white header__button-login'>Sign In</NavLink>
        <NavLink to='/sign-up' className="button button_green header__button-register">
          Sign Up
        </NavLink>
      </div>}
    </div>
  );
};

export default Header;
