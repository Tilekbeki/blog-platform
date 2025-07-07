import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setLogin } from "../store/slicers/userSlicer";
import { useNavigate } from 'react-router-dom';

const withAuthProtection = (WrappedComponent) => {
  return (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLogined } = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('jwtToken');
      if (!isLogined && token) {
        try {
          const decoded = jwtDecode(token);
          dispatch(getUser(decoded.username));
          dispatch(setLogin());
          setLoading(false);
        } catch (e) {
          // Если токен невалидный, выкинуть пользователя на страницу логина
          navigate('/sign-in');
        }
      } else if (!token) {
        // Если токена нет — редирект
        navigate('/sign-in');
      } else {
        setLoading(false);
      }
    }, [dispatch, isLogined, navigate]);

    if (loading) {
      return <div>Loading...</div>; // Можно заменить на любой индикатор загрузки
    }

    // Если дошли сюда — пользователь авторизован
    return <WrappedComponent {...props} />;
  };
};

export default withAuthProtection;
