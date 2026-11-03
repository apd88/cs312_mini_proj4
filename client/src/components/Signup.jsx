import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

function Signup({ onLogin }) {
  const [name, setN] = useState("");
  const [userId, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
//namechange = handlenamec
  function handlenamec(e) {
    setN(e.target.value);
  }
//id change = handleidc
  function handleidc(e) {
    setId(e.target.value);
  }
//passwrd change = handlepassc
  function handlepassc(e) {
    setPassword(e.target.value);
  }
//async so that it will wait since axios takes time
  async function handlesubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(API + "/signup", {
        name: name,
        user_id: userId,
        password: password,
      });
      // signing up will sign you in. took a while to get this one since i hate when websites make you do this 
      onLogin(response.data.user); 
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("The server could not be reached");
      }
    }
  }

      return (
    <form onSubmit={handlesubmit} className="card card-body shadow-sm">

      <h2 className="mb-3">Sign up</h2>

      <input
       className="form-control mb-"
        placeholder="Name"
         value={name}
          onChange={handlenamec} />

      <input
       className="form-control mb-4"
        placeholder="User ID"
value={userId}
 onChange={handleidc} />

      <input
       className="form-control mb-4"
        type="password"
         placeholder="Password"
             value={password}
              onChange={handlepassc} />

      <button className="btn btn-primary" type="submit">Sign up</button>

   { error

     && <div className="alert mt-4 mb-4  ">
        {error}
        </div>
}
    </form>
  );
}

export default Signup;