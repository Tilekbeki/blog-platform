import ArticleList from '../articleList/index';
import { Pagination } from "antd";
import { useDispatch } from 'react-redux';
import { getArticlesList } from '../store/slicers/articlesSlicer';
import blogService from '../../services/blogService';
import { useEffect, useState } from 'react';

const ArticlesPage = () => {
  const [length, setLength] = useState(1);
  const { getTotalArticles } = blogService();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTotalArticles = async () => {
      const res = await getTotalArticles();
      setLength(res);
    };
    fetchTotalArticles();
  }, []);

  const handlePageChange = (page) => {
    dispatch(getArticlesList(page));
  };

  return (
    <>
      <div style={{ padding: "26px 0" }}>
        <ArticleList />
        <Pagination
          align="center"
          style={{ padding: "13px 0" }}
          onChange={handlePageChange}
          defaultCurrent={1}
          total={length ? length : 1}
        />
      </div>
    </>
  );
}

export default ArticlesPage;
