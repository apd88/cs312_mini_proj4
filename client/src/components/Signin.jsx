import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

function Signin({ onLogin }) {
  const [userId, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
//same as signup
  function handleidc(e) {
    setId(e.target.value); }

  function handlepassc(e) {
    setPassword(e.target.value); }
  async function handlesubmit(e) {
    e.preventDefault(); 
    setError("");

    try {

   const response = await axios.post(API + "/signin", {      
     user_id: userId,
       password: password,
      });
   onLogin(response.data.user);
    } catch (err) {
   if (err.response) {
      setError(err.response.data.message);
      } else {
        setError("There was an issue, the server couldn't be reached. Please try again. "); 
      }
    }
  }

  return (
   <form onSubmit={handlesubmit} className="card card-body shadow-sm">

        <h2 className="mb-3">Sign in</h2>

 <input
  className="form-control mb-3"
   placeholder="User ID"   
     value={userId}
      onChange={handleidc}
       />

 <input 
 className="form-control mb-3"
  type="password"
   placeholder="Password"
    value={password}
     onChange={handlepassc} />

  <button className="btn btn-primary" type="submit">  Sign in</button>

    {error &&
     <div className="alert alert mt-3 mb-0">
      {error}
      </div>}
  </form> );
}

export default Signin;