import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';
import { useNavigate } from 'react-router-dom';

function PostArticle() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { currentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function postArticle(articleObj) {
    console.log(articleObj);

    // Check if category is selected
    if (!articleObj.category) {
      setErrorMessage("Please select a category.");
      return;
    }

    // Create article object as per article schema
    const authorData = {
      nameOfAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl
    };
    articleObj.authorData = authorData;

    // Article ID (timestamp)
    articleObj.articleId = Date.now();

    // Add date of creation & date of modification
    let currentDate = new Date();
    articleObj.dateOfCreation = currentDate.getDate() + "-"
      + (currentDate.getMonth() + 1) + "-"  // Fix month issue
      + currentDate.getFullYear() + " "
      + currentDate.toLocaleTimeString("en-US", { hour12: true });

    articleObj.dateOfModification = articleObj.dateOfCreation;

    // Add comments array
    articleObj.comments = [];

    // Add article active state
    articleObj.isArticleActive = true;

    // Make HTTP POST request to create a new article in backend
    try {
      let res = await axios.post('http://localhost:3000/author-api/article', articleObj);
      if (res.status === 201) {
        // Navigate to articles component
        navigate(`/author-profile/${currentUser.email}/articles`);
      }
    } catch (error) {
      console.error("Error posting article:", error);
      setErrorMessage("Failed to post article. Please try again.");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg border-0">
            <div className="card-header text-center bg-dark text-white py-3">
              <h2>📝 Write an Article</h2>
            </div>
            <div className="card-body bg-light p-4">
              {/* Display error messages */}
              {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
              <form onSubmit={handleSubmit(postArticle)}>
                
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter article title"
                    {...register("title", { required: "Title is required" })}
                  />
                  {/* Title validation error message */}
                  {errors.title && <p className="text-danger">{errors.title.message}</p>}
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Select a Category</label>
                  <select
                    {...register("category", { required: "Category is required" })}
                    id="category"
                    className="form-select"
                    defaultValue=""
                  >
                    <option value="" disabled>-- Choose a Category --</option>
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI & ML</option>
                    <option value="database">Database</option>
                  </select>
                  {/* Category validation error message */}
                  {errors.category && <p className="text-danger">{errors.category.message}</p>}
                </div>

                {/* Content */}
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <textarea
                    {...register("content", { required: "Content is required", minLength: { value: 20, message: "Content must be at least 20 characters long" } })}
                    className="form-control"
                    id="content"
                    rows="8"
                    placeholder="Write your article here..."
                  ></textarea>
                  {/* Content validation error message */}
                  {errors.content && <p className="text-danger">{errors.content.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="text-end">
                  <button type="submit" className="btn btn-success px-4 py-2">
                    🚀 Post Article
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostArticle;
