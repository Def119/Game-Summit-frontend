import React, { useState } from 'react';
import "./AddArticle.css"

const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await fetch('http://localhost:3001/add-article', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to add article');
      }

      const data = await response.json();
      setSuccessMessage('Article added successfully!');
      setErrorMessage('');
      setTitle('');
      setContent('');
      setImages([]);
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="add-article">
      <button className='submit-button'>Manage Articles</button>
      <hr className='seperator'/>
      <h2>Add New Article</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="images">Upload Images:</label>
          <input
            type="file"
            id="images"
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
        </div>
        <button type="submit" className='article-submit'>Submit</button>
      </form>
    </div>
  );
};

export default AddArticle;
