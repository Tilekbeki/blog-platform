import ArticleList from '../articleList/index';
import { Pagination } from "antd";

const ArticlesPage = () => {
    return (
    <>
        <div style={{padding: "26px 0"}}><ArticleList/>
        <Pagination align="center" style={{padding: "13px 0"}} defaultCurrent={1} total={50} />
        </div>
        
    </>
        
    )
}

export default ArticlesPage;