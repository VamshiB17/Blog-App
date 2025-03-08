import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';

const Header = () => {
  const { signOut } = useClerk();
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentUser(null);
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <nav className="header d-flex justify-content-between align-items-center px-4 py-3 shadow-sm"
         style={{ background: "linear-gradient(90deg, #003366, #007BFF)", color: "white" }}> 

      {/* Logo Section */}
      <div className="logo d-flex align-items-center">
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShnJbKH7ZrSrYJcToxNBttRrbjOZ7wt3e1ow&s"
               alt="Logo" width="60px" className="me-3 rounded-circle" />
          <span className="fw-bold fs-4 text-white" 
                style={{ textShadow: "2px 2px 6px rgba(255, 255, 255, 0.3)" }}>
            BlogSphere
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="d-flex align-items-center list-unstyled mb-0">
        {!isSignedIn ? (
          <>
            <li className="me-3">
              <Link to="signin" className="btn btn-light px-4 py-2 fw-semibold">Sign In</Link>
            </li>
            <li>
              <Link to="signup" className="btn btn-outline-light px-4 py-2 fw-semibold">Sign Up</Link>
            </li>
          </>
        ) : (
          <div className="d-flex align-items-center gap-4">
            {/* User Profile Section */}
            <div className="d-flex align-items-center position-relative">
              <img src={user.imageUrl} width="45px" className="rounded-circle border border-white" alt="User" />
              <span className="ms-3 fw-bold">{user.firstName}</span>
              <span className="badge bg-warning ms-2">{currentUser.role}</span>
            </div>

            {/* Logout Button */}
            <button onClick={handleSignOut} className="btn btn-danger px-4 py-2 fw-semibold">Sign Out</button>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Header;
