import Article from '../article';
import { Pagination } from "antd";
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
            <Pagination/>
        </>
    )
}

export default ArticleList;