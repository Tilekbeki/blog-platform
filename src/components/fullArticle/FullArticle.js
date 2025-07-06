import { Tag, Popconfirm, Button, message } from 'antd';
import Icon, {HeartOutlined } from '@ant-design/icons';
import './FullArticle.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentArticle, deleteCurrentUserArticle, likeUserArticle, unLikeUserArticle } from '../store/slicers/articleSlicer';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Markdown from 'react-markdown';
import {DateTime} from 'luxon';
import useCheckJWT from '../../hooks/useCheckJWT';

const HeartSvg = () => (
  <svg width="18px" height="17px" fill="currentColor" viewBox="0 0 1024 1024">
    <title>heart icon</title>
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
const HeartIcon = props => <Icon component={HeartSvg} {...props} />;

const FullArticle = () => {

  
  const { article } = useParams();
  const {title, author, description, favoritesCount, tags, body, createdAt, slug, favorited} = useSelector(state=>state.article);
  const funt = useCheckJWT();
  const dispatch = useDispatch();
  const { isLogined, username } = useSelector(state => state.user);

  const confirm = e => {
    message.success('Click on Yes');
    dispatch(deleteCurrentUserArticle(article))
  };

  const cancel = e => {
    message.error('Click on No');
  };

  const handleHeartChange = (slug) => {
    if (!favorited) {
      dispatch(likeUserArticle(slug));
      
      console.log('like')
    } else {
      dispatch(unLikeUserArticle(slug))
      console.log('dislike')
    }
    console.log('slug: ', slug, ' favorited: ', favorited)
  }

  useEffect(()=> {
    dispatch(getCurrentArticle(article));
  }, []);
    
    return (
        <div className="article-card">
            <div className='article-content'>
             <div className='article__header article__header_full'>
                <div className='article__info-meta'>
                    <div className='article-title'>{title}</div>
                    <div className='heart'>
                      <div onClick={()=>handleHeartChange(slug)} style={{cursor: "pointer"}}>{favorited ? <HeartIcon style={{ color: '#FF0707' }}/> : <HeartOutlined className='heart__icon'/>}</div>
                      <span className='heart__count'>{favoritesCount}</span>
                    </div>
                    <div className='tags'>
                        {tags.map((el, index) => (
                            <Tag key={index}>{el}</Tag>
                        ))}
                    </div>
                </div>
                <div className='article-info-person'>
                    <div className='article-info-person__flex'>
                        <div className='article__author'>{author.username}</div>
                        <div className='article__date'>{DateTime.fromISO(createdAt).toFormat('LLLL dd, yyyy  ')}</div>
                    </div>
                    <img className='article__avatar' src={author.image} alt='avatar'/>
                </div>
            </div>
            <div className='article__text article__text_full'>{description}</div>
           </div>
           {isLogined && (username === author.username) ? <div className='article-buttons'>
                      <Popconfirm
                          description="Are you sure to delete this article??"
                          onConfirm={confirm}
                          onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                          placement={'right'}
                        >
              <Button danger style={{fontWeight: "400", fontSize: "18px"}}>Delete</Button>
            </Popconfirm>
            <NavLink to={`/articles/${slug}/edit`} className="button button_green article-edit__button">Edit</NavLink>
          </div> : null}
          
          <div className='article-markdown'><Markdown>{body}</Markdown></div>
        </div>
    );
}

export default FullArticle;