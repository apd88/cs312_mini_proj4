import { useState } from "react";
import axios from "axios";

function BlogPostForm({ user, onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/blogs", {
        title,
        content,
        user_id: user.user_id,
      });
      onPostCreated(res.data); 
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not reach the server");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body shadow-sm mb-4">

      <h2 className="h4 mb-4">New post</h2>


      <input 
      className="form-control mb-4"
       placeholder="Title"
        value={title}
             onChange={(e) => setTitle(e.target.value)} required />


      <textarea className="form-control mb-4" rows="4" placeholder="Enter text"
                value={content} onChange={(e) => setContent(e.target.value)} required />

      <button className="btn btn-primary align-self-start" type="submit">Post</button>
      {error
       && <div className="alert alert-danger mt-4 mb-4">
        {error}
        </div>}
    </form>
  );
}

export default BlogPostForm;