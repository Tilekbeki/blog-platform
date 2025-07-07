import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { updateCurrentUser, getCurrentUserInfo } from '../store/slicers/userSlicer';
import { useEffect, useState } from 'react';
import { message } from 'antd';

const EditProfileForm = () => {
    const { username, email, img: avatar, loading, error } = useSelector(state => state.user);
    const [avatarUrl, setAvatarUrl] = useState(avatar);
    const [isAvatarValid, setIsAvatarValid] = useState(true); 
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
       dispatch(getCurrentUserInfo(localStorage.getItem('jwtToken')));
    }, [dispatch]);

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

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = (data) => {
        dispatch(updateCurrentUser({
            username: data.username,
            email: data.email,
            password: data.newPassword,
            image: data.avatar,
        })).then(()=> messageApi.open({
      type: 'success',
      content: 'This is a success message',
    }))
    };

    useEffect(() => {
        setValue('username', username);
        setValue('email', email);
        setValue('avatar', avatar);
        setAvatarUrl(avatar);
    }, [username, email, avatar, setValue]);

    const onValueChange = (field, value) => {
        setValue(field, value);
        if (field === 'avatar') {
            setAvatarUrl(value);
            setIsAvatarValid(true);
        }
    };

    return (
        <form className="form-user" onSubmit={handleSubmit(onSubmitHandler)}>
            {contextHolder}
            <div className="card-title">Edit Profile</div>

            {error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    {typeof error === 'string' ? error : 'Something went wrong!'}
                </div>
            )}

            <div className='form__wrap'>
                <div>
                    <label htmlFor="name">Username</label>
                    <input {...register("username")} type="text" name="name" id="name" placeholder='Username' onChange={(e) => onValueChange('username', e.target.value)} required />
                    {errors.username && <p style={{color: 'red'}}>{errors.username.message}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input {...register("email")} type="email" name="email" id="email" placeholder='Email address' onChange={(e) => onValueChange('email', e.target.value)} required />
                    {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="newpassword">New Password</label>
                    <input {...register("newPassword")} min="6" type="password" name="newPassword" id="newPassword" placeholder='New Password' onChange={(e) => onValueChange('password', e.target.value)} required />
                    {errors.newPassword && <p style={{color: 'red'}}>{errors.newPassword.message}</p>}
                </div>
                <div>
                    <label htmlFor="link">Avatar image (url)</label>
                    <input {...register("avatar")} type="url" name="link" id="link" placeholder='Avatar image (url)' onChange={(e) => onValueChange('avatar', e.target.value)} required />
                    {errors.avatar && <p style={{color: 'red'}}>{errors.avatar.message}</p>}
                </div>
                <div>
                    <label>Preview:</label>
                    <img
                        src={avatarUrl}
                        alt="Avatar preview"
                        style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccc' }}
                        onLoad={() => setIsAvatarValid(true)}
                        onError={() => setIsAvatarValid(false)}
                    />
                    {!isAvatarValid && (
                        <div style={{ color: 'red' }}>⚠️ Image failed to load. Please enter a valid URL.</div>
                    )}
                </div>
            </div>

            <input className="button button_blue" type='submit' value={loading ? "Saving..." : "Save"} disabled={loading} />
        </form>
    );
}

export default EditProfileForm;
