
const EditProfileForm = () => {
return (
        <form className="form-user">
        <div className="card-title">Edit Profile</div>
        <div className='form__wrap'>
            <div><label htmlFor="name">Username</label>
            <input type="text" name="name" id="name" placeholder='Username'/>
            </div>
            <div><label htmlFor="email">Email address</label>
            <input type="email" name="email" id="email" placeholder='Email address'/>
            </div>
            <div>
                <label htmlFor="newpassword">New Password</label>
                <input type="password" name="newpassword" id="newpassword" placeholder='New Password'/>
            </div>
            <div>
                <label htmlFor="link">Avatar image (url)</label>
                <input type="text" name="link" id="link" placeholder='Avatar image (url)'/>
            </div>
        </div>
        <input className="button button_blue" type='submit' value="Save"/>
    </form>
    )
}

export default EditProfileForm;