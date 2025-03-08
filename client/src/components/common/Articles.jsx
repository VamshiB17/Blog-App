import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import './Articles.css'; // Import CSS for better styling

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { getToken } = useAuth();

  // Fetch all articles
  async function getArticles() {
    const token = await getToken();
    let res = await axios.get('http://localhost:3000/author-api/articles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.message === 'articles') {
      setArticles(res.data.payload);
      setError('');
    } else {
      setError(res.data.message);
    }
  }

  // Navigate to specific article
  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className='container mt-4'>
      {error.length !== 0 && <p className='display-6 text-center text-danger'>{error}</p>}
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
        {articles.map((articleObj) => (
          <div className='col' key={articleObj.articleId}>
            <div className='card article-card h-100 shadow-sm rounded-4 overflow-hidden'>
              <div className='card-body p-4'>
                {/* Author details */}
                <div className='d-flex align-items-center justify-content-end mb-3'>
                  <img
                    src={articleObj.authorData.profileImageUrl}
                    width='45'
                    className='rounded-circle border'
                    alt='author'
                  />
                  <p className='ms-2 mb-0 text-secondary fw-semibold'>{articleObj.authorData.nameOfAuthor}</p>
                </div>
                {/* Article title */}
                <h5 className='card-title fw-bold text-primary'>{articleObj.title}</h5>
                {/* Article excerpt */}
                <p className='card-text text-muted'>{articleObj.content.substring(0, 100)}...</p>
                {/* Read more button */}
                <button className='btn btn-outline-primary w-100 fw-semibold' onClick={() => gotoArticleById(articleObj)}>
                  Read More →
                </button>
              </div>
              <div className='card-footer bg-light text-end py-2'>
                <small className='text-muted'>Last updated: {articleObj.dateOfModification}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;
