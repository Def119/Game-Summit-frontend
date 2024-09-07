import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ArticlesPage.css'; // Add your CSS file for styling

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:3001/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading articles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="articles-list">
      <h1>Articles</h1>
      <ul className="article-list">
        {articles.map((article) => (
          <li key={article._id} className="article-item">
            <Link to={`/articles/${article._id}`} className="article-link">
              <div className="article-image">
                {article.images.length>0 ? (
                  <img src={article.images[0]} alt={article.title} />
                ) : (
                  <div className="placeholder-image" />
                )}
              </div>
              <div className="article-content">
                <h2>{article.title}</h2>
                <p className="article-date">
                  Date created: {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesPage;
