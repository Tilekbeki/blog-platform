import { NavLink } from 'react-router-dom';
import './RegisterForm.scss';
import { registerUser } from '../store/slicers/userSlicer';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const schema = Yup.object().shape({
        username: Yup.string().min(3, "Minimum 3 characters").max(20, "Maximum 20 characters").required("Username is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Minimum 6 characters").max(40, "Maximum 40 characters").required("Password is required"),
        confirm_password: Yup.string().min(6, "Minimum 6 characters").max(40, "Maximum 40 characters")
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Please confirm your password"),
        confirm_checkbox: Yup.boolean()
            .oneOf([true], "You must accept the terms")
            .required("You must accept the terms"),
    });
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    
    const onSubmitHandler = (data) => {
        dispatch(registerUser({
            username: data.username,
            email: data.email.toLowerCase(),
            password: data.password,
        }));
        reset();
        navigate("/");
    };
    return (
        <>
            <form className="form-user" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="card-title">Sign Up</div>
            <div className='form__wrap'>
                <div><label htmlFor="username">Username</label>
                <input {...register("username")} type="text" name="username" id="username" placeholder='Username'/>
                <p className='validation-error-message'>{errors.username?.message}</p>
                </div>
                <div><label htmlFor="email">Email address</label>
                <input {...register("email")} type="email" name="email" id="email" placeholder='Email address' required/>
                <p className='validation-error-message'>{errors.email?.message}</p>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input {...register("password")} type="password" name="password" id="password" placeholder='Password' required/>
                    <p className='validation-error-message'>{errors.password?.message}</p>
                </div>
                <div>
                    <label htmlFor="confirm_password">Repeat Password</label>
                    <input {...register("confirm_password")} type="password" name="confirm_password" id="confirm_password" placeholder='Password' required/>
                    <p className='validation-error-message'>{errors.confirm_password?.message}</p>
                </div>
                <div className='confirm-block'>
                    
                    <input {...register("confirm_checkbox")} id='confirm_checkbox' name='confirm_checkbox' type='checkbox' required/>

                    <label htmlFor='confirm_checkbox'>I agree to the processing of my personal information</label>
                </div>
                <p className='validation-error-message'>{errors.checkbox?.message}</p>
            </div>
            <input className="button button_blue" type='submit' value="Register"/>
        </form>
        <div className='ask-message'><span>Already have an account?  </span><NavLink to='/sign-in'>Sign In.</NavLink></div>
    </>
    )
}

export default RegisterForm;