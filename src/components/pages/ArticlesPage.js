import ArticleList from '../articleList/index';
import { Pagination } from "antd";
import { useDispatch } from 'react-redux';
import { getArticlesList } from '../store/slicers/articlesSlicer';
const ArticlesPage = () => {
    const dispatch = useDispatch();

    const handlePageChange = (page) => {
    dispatch(getArticlesList(page))
  };
    return (
    <>
        <div style={{padding: "26px 0"}}><ArticleList/>
        <Pagination align="center" style={{padding: "13px 0"}} onChange={handlePageChange} defaultCurrent={1} total={50} />
        </div>
        
    </>
        
    )
}

export default ArticlesPage;