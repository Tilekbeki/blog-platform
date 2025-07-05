import { Tag, Popconfirm, Button, message } from 'antd';
import Icon, {HeartOutlined } from '@ant-design/icons';
import './FullArticle.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentArticle } from '../store/slicers/articleSlicer';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Markdown from 'react-markdown';
import {DateTime} from 'luxon';
import useCheckJWT from '../../hooks/useCheckJWT';

const confirm = e => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = e => {
  console.log(e);
  message.error('Click on No');
};

const FullArticle = () => {
  const { article } = useParams();
  const {title, author, description, favoritesCount, tags, body, createdAt} = useSelector(state=>state.article);
  const funt = useCheckJWT();
  const dispatch = useDispatch();
  const { isLogined, username } = useSelector(state => state.user);

  useEffect(()=> {
    dispatch(getCurrentArticle(article));
  }, []);
    
    return (
        <div className="article-card">
            <div className='article-content'>
             <div className='article__header article__header_full'>
                <div className='article__info-meta'>
                    <div className='article-title'>{title}</div>
                    <div className='heart'><HeartOutlined className='heart__icon'/><span className='heart__count'>{favoritesCount}</span></div>
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
            <NavLink to='/article/1/edit' className="button button_green article-edit__button">Edit</NavLink>
          </div> : null}
          
          <div className='article-markdown'><Markdown>{body}</Markdown></div>
        </div>
    );
}

export default FullArticle;