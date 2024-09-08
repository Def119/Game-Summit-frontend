import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mangame.css'; // Adjust this for articles styling

const ManArticles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch articles based on search term
  const fetchArticles = async () => {
    try {
      const response = await fetch(`http://localhost:3001/fetchArticles?q=${searchTerm}`);
      if (!response.ok) throw new Error('Failed to fetch articles');
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (searchTerm) fetchArticles();
  }, [searchTerm]);

  // Fetch selected article data when clicked
  const fetchArticleData = async (articleId) => {
    try {
      const response = await fetch(`http://localhost:3001/articles/${articleId}`);
      if (!response.ok) throw new Error('Failed to fetch article data');
      const data = await response.json();
      setSelectedArticle(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setSelectedArticle({ ...selectedArticle, [e.target.name]: e.target.value });
  };

  // Handle form submission to update the article
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/articles/${selectedArticle._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedArticle),
      });
      if (!response.ok) throw new Error('Failed to update article');
      alert('Article updated successfully!');
      navigate(`/dash-board`);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle article deletion
  const handleDelete = async (articleId) => {
    try {
      const response = await fetch(`http://localhost:3001/articles/${articleId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete article');
      alert('Article deleted successfully!');
      setArticles(articles.filter(article => article._id !== articleId));
      navigate(`/dash-board`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin - Manage Articles</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for articles by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Search Results */}
      <div className="article-list">
        {articles.length > 0 ? (
          articles.map(article => (
            <div key={article._id} onClick={() => fetchArticleData(article._id)} className="article-list-item">
              <p>{article.title} (Created: {new Date(article.createdAt).toLocaleDateString()})</p>
            </div>
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>

      {/* Article Edit Form */}
      {selectedArticle && (
        <div className="edit-form">
          <h2>Edit Article</h2>

          {/* Article Title */}
          <label className="form-label">Title:</label>
          <input
            type="text"
            name="title"
            value={selectedArticle.title}
            onChange={handleInputChange}
            className="search-input"
          />

          {/* Content */}
          <div>
            <label className="form-label">Content:</label>
            <textarea
              name="content"
              value={selectedArticle.content}
              onChange={handleInputChange}
              className="textarea"
            />
          </div>

          {/* Images */}
          <div>
            <label className="form-label">Images (URLs):</label>
            <textarea
              name="images"
              value={selectedArticle.images.join('\n')}
              onChange={handleInputChange}
              className="textarea"
            />
          </div>

          {/* Update and Delete Buttons */}
          <button onClick={handleUpdate} className="update_Button">
            Update Article
          </button>
          <button onClick={() => handleDelete(selectedArticle._id)} className="delete_Button">
            Delete Article
          </button>
        </div>
      )}

      {/* Error Display */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ManArticles;