import ShortArticle from '../shortArticle';
import './ArticleList.scss';
import { useSelector } from 'react-redux';

const ArticleList = () => {
    const {email} = useSelector(state=>state.user)
    return (
        <>
            <div className='articles'>
                {email}
                <ShortArticle/>
                <ShortArticle/>
                <ShortArticle/>
                <ShortArticle/>
            </div>
        </>
    )
}

export default ArticleList;