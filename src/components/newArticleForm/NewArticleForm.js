import './NewArticleForm.scss';

const NewArticleForm = () => {
    return (<form className="form-article">
        <div className="card-title">New Article</div>
        <div className='form__wrap'>
            <div><label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" placeholder='Title'/>
            </div>
            <div>
                <label htmlFor="short-descr">Short description</label>
                <input type="text" name="short-descr" id="short-descr" placeholder='short description'/>
            </div>
            <div>
                <label htmlFor="text">Text</label>
                <textarea  name="text" id="text" placeholder='text'/>
            </div>
        </div>
        <input className="button button_blue" type='submit' value="Send"/>
    </form>);
}

export default NewArticleForm;