import { Tag, Popconfirm, Button, message } from 'antd';
import Icon, {HeartOutlined } from '@ant-design/icons';
import './FullArticle.scss';
import { NavLink } from 'react-router-dom';

const confirm = e => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = e => {
  console.log(e);
  message.error('Click on No');
};

const FullArticle = () => {
    let isLogined = true;
    return (
        <div className="article-card">
            <div className='article-content'>
             <div className='article__header article__header_full'>
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
            <div className='article__text article__text_full'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris  nisi ut aliquip ex ea commodo consequat. </div>
           </div>
          <div className='article-buttons'>
             <Popconfirm
    description="Are you sure to delete this article??"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <Button danger style={{fontWeight: "400", fontSize: "18px"}}>Delete</Button>
  </Popconfirm>
  <NavLink to='/article/1/edit' className="button button_green article-edit__button">Edit</NavLink>
          </div>
        </div>
    );
}

export default FullArticle;