import { Tag} from 'antd';
import {HeartOutlined } from '@ant-design/icons';
import './Article.scss';

const Article = () => {
    return (
        <div className="article">
            <div className='article__header'>
                <div className='article__info-meta'>
                    <div className='article-title'>Some article title</div>
                    <div className='heart'><HeartOutlined className='heart__icon'/> <span className='heart__count'>12</span></div>
                    <div className='tags'>
                        <Tag>Tag 1</Tag>
                        <Tag>Tag 1</Tag>
                        <Tag>Tag 1</Tag>
                    </div>
                </div>
                <div className='article__info-person'>
                    <div className='article__author'>John Doe</div>
                    <div className='article__date'>March 5, 2020</div>
                    <img className='article__avatar' src='https://sun9-2.userapi.com/s/v1/ig2/asZjWTKSStSW6e91UPGKW3TZgbIW7xgG3QCE3Is1MN7YsI9euHDpEucT-8cYPS_fDZG371UzPL6mZWDdlUDMHSGP.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,960x1280&from=bu&cs=960x0' alt='avatar'/>
                </div>
            </div>
            <div className='article__text'></div>
        </div>
    )
}

export default Article;