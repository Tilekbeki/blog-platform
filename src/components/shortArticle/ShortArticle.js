import { Tag } from "antd";
import Icon, { HeartOutlined } from "@ant-design/icons";
import "./Article.scss";
import { NavLink } from "react-router-dom";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

const HeartSvg = () => (
  <svg width="18px" height="17px" fill="currentColor" viewBox="0 0 1024 1024">
    <title>heart icon</title>
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
const HeartIcon = (props) => <Icon component={HeartSvg} {...props} />;
<HeartIcon style={{ color: "#FF0707" }} />;

const ShortArticle = ({
  title,
  description,
  tags,
  author,
  datePublished,
  slug,
  favorited,
  favoritesCount,
  handleHeartChange,
}) => {
  const [isLiked, setIsLiked] = useState(favorited);

  useEffect(() => {
    const storedLikes = JSON.parse(
      localStorage.getItem("likesCollection") || "[]",
    );
    const likesSet = new Set(storedLikes);
    setIsLiked(likesSet.has(slug));
  }, [slug]);

  const toggleLike = () => {
    const storedLikes = JSON.parse(
      localStorage.getItem("likesCollection") || "[]",
    );
    const likesSet = new Set(storedLikes);
    console.log(
      "лайкнут?",
      likesSet.has(slug),
      "isLiked",
      isLiked,
      "favorited",
      favorited,
    );
    if (isLiked && likesSet.has(slug)) {
      console.log("dislike", favorited);
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }

    localStorage.setItem("likesCollection", JSON.stringify([...likesSet]));

    handleHeartChange(slug, isLiked); // передаём новый статус родителю
  };
  return (
    <div className="article">
      <div className="article-content">
        <div className="article__header">
          <div className="article__info-meta">
            <NavLink to={`/articles/${slug}`} className="article-title">
              {title}
            </NavLink>
            <div className="heart">
              <div onClick={() => toggleLike()} style={{ cursor: "pointer" }}>
                {isLiked ? (
                  <HeartIcon style={{ color: "#FF0707" }} />
                ) : (
                  <HeartOutlined className="heart__icon" />
                )}
              </div>
              <span className="heart__count">{favoritesCount}</span>
            </div>
            <div className="tags">
              {tags.map((el, index) => {
                if (index <= 2) return <Tag key={index}>{el}</Tag>;
              })}
            </div>
          </div>
          <div className="article-info-person">
            <div className="article-info-person__flex">
              <div className="article__author">{author.username}</div>
              <div className="article__date">
                {DateTime.fromISO(datePublished).toFormat("LLLL dd, yyyy")}
              </div>
            </div>
            <img className="article__avatar" src={author.image} alt="avatar" />
          </div>
        </div>
        <div className="article__text">
          {description.substring(0, 100) + "..."}
        </div>
      </div>
    </div>
  );
};

export default ShortArticle;
