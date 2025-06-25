import { Tag} from 'antd';
import Icon, {HeartOutlined } from '@ant-design/icons';
import './Article.scss';
const HeartSvg = () => (
  <svg width="18px" height="17px" fill="currentColor" viewBox="0 0 1024 1024">
    <title>heart icon</title>
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
const HeartIcon = props => <Icon component={HeartSvg} {...props} />;
<HeartIcon style={{ color: '#FF0707' }} />
const Article = () => {
    return (
        <div className="article">
            <div className='article__header'>
                <div className='article__info-meta'>
                    <div className='article-title'>Some article title</div>
                    <div className='heart'><HeartOutlined className='heart__icon'/><span className='heart__count'>12</span></div>
                    <div className='tags'>
                        <Tag>Tag 1</Tag>
                        <Tag>Tag 1</Tag>
                        <Tag>Tag 1</Tag>
                    </div>
                </div>
                <div className='article__info-person'>
                    <div>
                        <div className='article__author'>John Doe</div>
                        <div className='article__date'>March 5, 2020</div>
                    </div>
                    <img className='article__avatar' src='https://sun9-2.userapi.com/s/v1/ig2/asZjWTKSStSW6e91UPGKW3TZgbIW7xgG3QCE3Is1MN7YsI9euHDpEucT-8cYPS_fDZG371UzPL6mZWDdlUDMHSGP.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,960x1280&from=bu&cs=960x0' alt='avatar'/>
                </div>
            </div>
            <div className='article__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat. </div>
        </div>
    )
}

export default Article;