import ArticleList from '../articleList/index';
import { Pagination } from "antd";
import { useDispatch } from 'react-redux';
import { getArticlesList } from '../store/slicers/articleSlicer';
const ArticlesPage = () => {
    const dispatch = useDispatch();

    const handlePageChange = (page) => {
    dispatch(getArticlesList(page))
  };
    return (
    <>
        <div style={{padding: "26px 0"}}><ArticleList/>
        <Pagination align="center" style={{padding: "13px 0"}} onClick={handlePageChange} defaultCurrent={1} total={50} />
        </div>
        
    </>
        
    )
}

export default ArticlesPage;