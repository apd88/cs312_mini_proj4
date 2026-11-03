import { useState } from "react";
import axios from "axios";

function EditPost({ post, user, onSaved, onCancel }) {
    const [title, setTitle] = useState(post.title);
   const [content, setContent] = useState(post.content);
    const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.put(`http://localhost:8000/blogs/${post.id}`, {
        title,
        content,
        user_id: user.user_id,
      });
      onSaved(res.data); 
    } catch (err) {
      setError(err.response?.data?.message || "Could not reach the server");
    }
  };

return (
    <form onSubmit={handleSubmit} className="card card-body border-primary mb-3">

      <h3 className="h5 mb-3">Edit post</h3>



      <input 
      className="form-control mb-3" 
      value={title}
             onChange={(e) => setTitle(e.target.value)} required />

      <textarea
       className="form-control mb-3"
        rows="4"
         value={content}
                onChange={(e) => setContent(e.target.value)} required />


      <div className="d-flex gap-2">
        <button className="btn btn-primary" type="submit">Save</button>
        <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>


      {error &&
       <div className="alert alert-danger mt-3 mb-0">
        {error}</div>}
    </form>
  );
}

export default EditPost;