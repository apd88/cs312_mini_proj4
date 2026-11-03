import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {

  let sUser = null;
  const savedT = localStorage.getItem("user");
  if (savedT) {
    sUser = JSON.parse(savedT); 
  }

  const [user, setUser] = useState(sUser);
  const navigate = useNavigate();

  function handleLogin(loggedInUser) {
     setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser)); 
    navigate("/");
  }

    function handleLogout() {
      setUser(null);
      localStorage.removeItem("user");
      navigate("/signin");
  }
  let userArea;
   if (user) {
    userArea = (
      <>
        <span className="text-body-secondary small"> {user.name}</span>
        <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
          Sign out
         </button>
       </>
       );
  } else {
    userArea = (
      <>
        <Link className="btn btn-outline-primary btn-sm" to="/signin">Sign in</Link>
        <Link className="btn btn-primary btn-sm" to="/signup">Sign up</Link>
      </>
    );
  }

  return (
   <>
      <nav className="navbar bg-body-tertiary border-bottom">
        <div className="container" style={{ maxWidth: "1000px" }}>
          <Link className="navbar-brand fw-bold" to="/"> Blog</Link>
          <div className="d-flex align-items-left gap-2">{userArea}</div>
        </div>
   </nav>

{/* maybe i should do*/}
 <main className="container my-4" style={{ maxWidth: "899px" }}>
        <Routes>
      <Route path="/" element={<Home user={user} />} />
      <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
  </Routes>
   </main>
    </>
 );
}

export default App;