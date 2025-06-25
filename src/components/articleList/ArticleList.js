import ShortArticle from '../shortArticle';
import './ArticleList.scss';

const ArticleList = () => {
    return (
        <>
            <div className='articles'>
                <ShortArticle/>
                <ShortArticle/>
                <ShortArticle/>
                <ShortArticle/>
            </div>
        </>
    )
}

export default ArticleList;