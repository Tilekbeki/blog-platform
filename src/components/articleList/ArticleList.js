import ShortArticle from '../shortArticle';
import './ArticleList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getArticlesList } from '../store/slicers/articlesSlicer';
import {likeArticle, unlikeArticle } from '../store/slicers/articlesSlicer';

const ArticleList = () => {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state.articles);

    useEffect(() => {
        dispatch(getArticlesList(0));
    }, [dispatch]);
  const handleHeartChange = (slug) => {
    console.log(slug);
    // Пример логики лайка/анлайка
    const storedLikes = JSON.parse(localStorage.getItem('likesCollection') || '[]');
    const likesSet = new Set(storedLikes);
    if (likesSet.has(slug)) {
      likesSet.delete(slug);
      
      dispatch(unlikeArticle(slug))
    } else {
      likesSet.add(slug);
      dispatch(likeArticle(slug))
    }
    localStorage.setItem('likesCollection', JSON.stringify([...likesSet]));
  };
    return (
        <div className='articles'>
            {data.map((el, index) => (
                <ShortArticle key={index} title={el.title} description={el.description} tags={el.tagList} author={el.author} datePublished={el.createdAt} slug={el.slug} favorited={el.favorited} favoritesCount={el.favoritesCount} handleHeartChange={handleHeartChange} />
            ))}
        </div>
    );
};

export default ArticleList;
