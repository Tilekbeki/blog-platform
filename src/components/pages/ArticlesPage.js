import ArticleList from "../articleList/index";
import { Pagination } from "antd";
import { useDispatch } from "react-redux";
import { getArticlesList } from "../store/slicers/articlesSlicer";
import blogService from "../../services/blogService";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ArticlesPage = () => {
  const [length, setLength] = useState(1);
  const { getTotalArticles } = blogService();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch(getArticlesList(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    const fetchTotalArticles = async () => {
      const res = await getTotalArticles();
      setLength(res);
    };
    fetchTotalArticles();
  }, []);

  const handlePageChange = (page) => {
    navigate(`/articles?page=${page}`);
  };

  return (
    <div style={{ padding: "26px 0" }}>
      <ArticleList />
      <Pagination
        align="center"
        style={{ padding: "13px 0" }}
        onChange={handlePageChange}
        current={currentPage}
        total={length}
        pageSize={10} // укажи, если есть лимит на страницу
      />
    </div>
  );
};

export default ArticlesPage;
