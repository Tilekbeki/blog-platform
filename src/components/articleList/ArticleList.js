import ShortArticle from '../shortArticle';
import Spinner from '../spinner';  // Импортируем спиннер, поменяйте путь, если нужно
import './ArticleList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getArticlesList, likeArticle, unlikeArticle } from '../store/slicers/articlesSlicer';

const ArticleList = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.articles);

    useEffect(() => {
        dispatch(getArticlesList(0));
    }, [dispatch]);

    const handleHeartChange = (slug) => {
        const storedLikes = JSON.parse(localStorage.getItem('likesCollection') || '[]');
        const likesSet = new Set(storedLikes);
        if (likesSet.has(slug)) {
            likesSet.delete(slug);
            dispatch(unlikeArticle(slug));
        } else {
            likesSet.add(slug);
            dispatch(likeArticle(slug));
        }
        localStorage.setItem('likesCollection', JSON.stringify([...likesSet]));
    };

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div className="error" style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
            {typeof error === 'string' ? error : 'Failed to load articles.'}
        </div>;
    }

    return (
        <div className='articles'>
            {data.map((el, index) => (
                <ShortArticle
                    key={index}
                    title={el.title}
                    description={el.description}
                    tags={el.tagList}
                    author={el.author}
                    datePublished={el.createdAt}
                    slug={el.slug}
                    favorited={el.favorited}
                    favoritesCount={el.favoritesCount}
                    handleHeartChange={handleHeartChange}
                />
            ))}
        </div>
    );
};

export default ArticleList;
