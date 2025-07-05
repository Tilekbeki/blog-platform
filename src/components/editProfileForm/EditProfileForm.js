
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { updateCurrentUser } from '../store/slicers/userSlicer';
import { getCurrentUserInfo } from '../store/slicers/userSlicer';
import { useEffect } from 'react';

const EditProfileForm = () => {
    const {username, email, img:avatar} = useSelector(state=>state.user);
    
    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(getCurrentUserInfo(localStorage.getItem('jwtToken')))
    }, [])
        let navigate = useNavigate();
        const schema = Yup.object().shape({
            username: Yup.string().min(3, "Minimum 3 characters").max(20, "Maximum 20 characters").required("Username is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            newPassword: Yup.string().min(6, "Minimum 6 characters").max(40, "Maximum 40 characters").required("Password is required"),
            avatar: Yup.string()
                .matches(
                    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                    'Enter correct url!'
                )
                .required('Please enter url'),
        });
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    
    const onSubmitHandler = (data) => {
        console.log(data); // Тут уже есть username, email, password и confirm_password
        dispatch(updateCurrentUser({
            username: data.username,
            email: data.email.toLowerCase(),
            newPassword: data.newPassword,
            avatar: data.avatar,
        }));
        reset();
        navigate("/");
    };
return (
        <form className="form-user" onSubmit={onSubmitHandler}>
        <div className="card-title">Edit Profile</div>
        <div className='form__wrap'>
            <div><label htmlFor="name">Username</label>
            <input {...register("username")} type="text" name="name" id="name" placeholder='Username' defaultValue={username} required/>
            </div>
            <div><label htmlFor="email">Email address</label>
            <input {...register("email")} type="email" name="email" id="email" placeholder='Email address' defaultValue={email} required/>
            </div>
            <div>
                <label htmlFor="newpassword">New Password</label>
                <input {...register("newPassword")} type="password" name="newPassword" id="newPassword" placeholder='New Password' required/>
            </div>
            <div>
                <label htmlFor="link">Avatar image (url)</label>
                <input {...register("avatar")} type="url" name="link" id="link" placeholder='Avatar image (url)' defaultValue={avatar} required/>
            </div>
        </div>
        <input className="button button_blue" type='submit' value="Save"/>
    </form>
    )
}

export default EditProfileForm;