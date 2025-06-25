import Article from '../article';
import './ArticleList.scss';

const ArticleList = () => {
    return (
        <>
            <div className='articles'>
                <Article/>
                <Article/>
                <Article/>
                <Article/>
            </div>
        </>
    )
}

export default ArticleList;