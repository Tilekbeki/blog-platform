import ShortArticle from '../shortArticle';
import './ArticleList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getArticlesList } from '../store/slicers/articlesSlicer';

const ArticleList = () => {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.articles);

    useEffect(() => {
        dispatch(getArticlesList(0));
    }, [dispatch]);

    return (
        <div className='articles'>
            {data.map((el, index) => (
                <ShortArticle key={index} title={el.title} description={el.description} tags={el.tagList} author={el.author} datePublished={el.createdAt} slug={el.slug}/>
            ))}
        </div>
    );
};

export default ArticleList;
