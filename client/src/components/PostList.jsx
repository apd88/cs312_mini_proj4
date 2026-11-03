import { useState } from "react";
import axios from "axios";
import EditPost from "./EditPost";

function PostList({ posts, user, onPostUpdated, onPostDeleted }) {
 const [editingId, setEditingId] = useState(null);
 const handleDelete = async (id) => {
 const confirmDelete = window.confirm("Delete this post?");
if (window.confirm("Delete this post?") === false) {
  return;
}
    try {
      await axios.delete(`http://localhost:8000/blogs/${id}`, {
        data: { user_id: user.user_id },
      });
      onPostDeleted(id);
    } catch (err) {
      alert(err.response?.data?.message || "Could not delete the post");
    }  };

  if (posts.length === 0) {
    return <p className="nothing">No posts yet.</p>;
  }
  return (
 <div>
   {posts.map((post) => {
   const isEditing = editingId === post.id;
   //ok so i couldn't really find a better way to make sure that other users wouldnt be able to access
   //different posts, so i just hid the buttons from people who aren't the owner. theres probably a better way to do this
   //so maybe come back and fix later?
  const isOwner = user?.user_id === post.creator_user_id;

        if (isEditing) {
         return (
           <EditPost
          key={post.id}
          post={post}
          user={user}
          onCancel={() => setEditingId(null)}
          onSaved={(updated) => {
          onPostUpdated(updated);
          setEditingId(null);
     }}  />  );
        }

        return (
      <div key={post.id} className="card mb-3 shadow-sm">
      <div className="card-body">
       <h3 className="card-title h5">{post.title}</h3>

         <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
         {post.content}            </p>

          <small className="text-muted">
          By {post.creator_name} on {post.created}
           </small>

          {isOwner && (
       <div className="mt-3 d-flex gap-2">
        <button
          className="btn btn-outline-primary btn-sm"
        onClick={() => setEditingId(post.id)}  >
          Edit
          </button>
         <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => handleDelete(post.id)} >
          Delete
          </button>
         </div>
        )}
 </div>
 </div>);
      })}
    </div> );
}

export default PostList; 