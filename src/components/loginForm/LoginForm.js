import { NavLink } from 'react-router-dom';
import { loginUser } from '../store/slicers/userSlicer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

const LoginForm = () => {
    const dispatch = useDispatch();
    const userData = {
      "email": "timur.almamatov@yandex.ru",
    "password": "string"
    };
     let navigate = useNavigate();
    const schema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required"),
    });
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    
    const onSubmitHandler = (data) => {
        console.log(data); // Тут уже есть username, email, password и confirm_password
        dispatch(loginUser({
            email: data.email.toLowerCase(),
            password: data.password,
        }));
        reset();
        navigate("/");
    };
    return (
    <>
    <form className="form-user" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="card-title">Sign In</div>
        <div className='form__wrap'>
            <div><label htmlFor="email">Email address</label>
            <input {...register("email")} type="email" name="email" id="email" placeholder='Email address'/>
            <p className='validation-error-message'>{errors.email?.message}</p>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input {...register("password")} type="password" name="password" id="password" placeholder='Password'/>
                 <p className='validation-error-message'>{errors.password?.message}</p>
            </div>
        </div>
        <input className="button button_blue" type='submit' value="Login" onClick={()=> dispatch(loginUser(userData))}/>
        
    </form>
    <div className='ask-message'><span>Don’t have an account? </span><NavLink to='/sign-up'>Sign Up.</NavLink></div>
    </>
    )
}

export default LoginForm;