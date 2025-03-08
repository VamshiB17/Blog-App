import { useContext, useEffect, useState } from 'react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
//import './Home.css'


function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj)

  const { isSignedIn, user, isLoaded } = useUser()
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
   console.log("User :", user)
  



  async function onSelectRole(e) {
    //clear error property
    setError('')
    const selectedRole = e.target.value;
    currentUser.role = selectedRole;
    let res = null;
    try {
      if (selectedRole === 'author') {
        res = await axios.post('http://localhost:3000/author-api/author', currentUser)
        let { message, payload } = res.data;
        
        if (message === 'author') {
          setCurrentUser({ ...currentUser, ...payload })
          //save user to localstorage
          localStorage.setItem("currentuser",JSON.stringify(payload))
          // setError(null)
        } else {
          setError(message);
        }
      }
      if (selectedRole === 'user') {
        console.log(currentUser)
        res = await axios.post('http://localhost:3000/user-api/user', currentUser)
        let { message, payload } = res.data;
        console.log(message)
        if (message === 'user') {
          setCurrentUser({ ...currentUser, ...payload })
           //save user to localstorage
           localStorage.setItem("currentuser",JSON.stringify(payload))
        } else {
          setError(message);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  }


  useEffect(() => {
    if (isSignedIn === true) {
      setCurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [isLoaded])



  useEffect(() => {

    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      console.log("first")
      navigate(`/author-profile/${currentUser.email}`);
    }
  }, [currentUser]);

  

  return (
    <div className='container' >
      {
        
        isSignedIn === false && <div>
          <div className="container text-center mt-5">
  <h1 className="fw-bold" style={{ fontSize: "2rem", color: "#333" }}>
    🌟 Welcome to <span style={{ color: "#007bff" }}>BlogSphere</span> – A Place Where Ideas Flourish! 🌟
  </h1>

  <p className="lead" style={{ maxWidth: "800px", margin: "auto", lineHeight: "1.8" }}>
    Every great thought deserves to be shared, and every voice deserves to be heard. Whether you have an inspiring story, an insightful opinion, or a creative masterpiece, 
    <strong> BlogSphere </strong> is your space to express, explore, and engage.
  </p>

  <p className="lead" style={{ maxWidth: "800px", margin: "auto", lineHeight: "1.8" }}>
    📝 <strong>Write & Share</strong> – Have something on your mind? Put your thoughts into words and share them with the world! Whether it’s personal experiences, expert knowledge, 
    creative writing, or just something fun, your blog could be the next big inspiration!
  </p>

  <p className="lead" style={{ maxWidth: "800px", margin: "auto", lineHeight: "1.8" }}>
    📖 <strong>Read & Explore</strong> – Dive into a world of diverse content! From motivational stories to tech insights, lifestyle tips to thought-provoking discussions—
    there’s always something new to discover.
  </p>

  <p className="lead" style={{ maxWidth: "800px", margin: "auto", lineHeight: "1.8" }}>
    💬 <strong>Engage & Connect</strong> – Blogging isn’t just about writing; it’s about conversation. Connect with like-minded people, spark discussions in the comments, 
    and build a community around shared ideas and interests.
  </p>

  <div className="mt-4 p-4 rounded shadow-sm" style={{ background: "#f8f9fa", maxWidth: "800px", margin: "auto" }}>
    <h3 className="fw-bold">🚀 Why Join BlogSphere?</h3>
    <ul className="text-start" style={{ maxWidth: "600px", margin: "auto" }}>
      <li>✅ User-friendly platform – Write, edit, and publish effortlessly.</li>
      <li>✅ Reach a global audience – Let your voice be heard beyond boundaries.</li>
      <li>✅ Stay updated – Follow your favorite bloggers and never miss an insightful post.</li>
      <li>✅ A safe and supportive community – Your words matter, and they deserve appreciation.</li>
    </ul>
  </div>

  <p className="mt-4 fw-bold" style={{ fontSize: "1.2rem" }}>
    So, why wait? <span style={{ color: "#28a745" }}>Start your journey today!</span> 🌍
  </p>
 

<button className="btn btn-primary btn-lg mt-3" onClick={() => navigate('/signin')}>
  ✍️ Start Writing
</button>


</div>


        </div>
      }

{isSignedIn && (
  <div className="container mt-4 text-center">
    {/* Profile Section */}
    <div className="p-4 rounded shadow-sm d-flex flex-column align-items-center" 
     style={{ background: "linear-gradient(to right, #56CCF2, #2F80ED)" }}>

      <img 
        src={user.imageUrl} 
        width="90px" 
        className="rounded-circle border border-white mb-2" 
        alt="User" 
      />
      <p className="fw-bold mb-1" style={{ fontSize: "1.5rem" }}>{user.firstName}</p>
      <p className="text-light mb-0" style={{ fontSize: "1rem" }}>{user.emailAddresses[0].emailAddress}</p>
    </div>

    {/* Role Selection */}
    <p className="mt-3 fw-semibold">Select Your Role</p>
    {error.length !== 0 && (
      <p className="text-danger fw-bold" style={{ fontFamily: "sans-serif" }}>
        {error}
      </p>
    )}

    <div className="d-flex justify-content-center gap-4 mt-2">
      <button
        className="btn btn-primary px-4 py-2"
        onClick={() => onSelectRole({ target: { value: "author" } })}
      >
        ✍️ Author
      </button>
      <button
        className="btn btn-secondary px-4 py-2"
        onClick={() => onSelectRole({ target: { value: "user" } })}
      >
        👥 User
      </button>
    </div>
  </div>
)}



    </div>
  )
}

export default Home