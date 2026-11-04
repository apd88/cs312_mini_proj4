import { useState, useEffect } from "react";
import axios from "axios";
import BlogPostForm from "./BlogPostForm";
import PostList from "./PostList";

const API = "http://localhost:8000";

function Home({ user }) {
  const [posts, setPosts] = useState([]);
  useEffect(function () {
    axios.get(API + "/blogs")
      .then(function (response) {
        setPosts(response.data);
      })
      .catch(function (err) {
        console.error("Posts couldn't be loaded due to an error",err);
      });
    }, []);
  

  function handlepcreated(newPost) {
      setPosts([newPost].concat(posts));
      } 
  function handlepupdated(updatedPost) {
    const newList = [];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === updatedPost.id) {
        newList.push(updatedPost);
      } else {
        newList.push(posts[i]);
      }
    }
    setPosts(newList);
  }

  //get rid of deleted stuff
  function handlepdeleted(deletedId) {
    const newList = [];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id !== deletedId) {
        newList.push(posts[i]);
      }
    }
    //update array to replace the existing posts with a new array that contains new posts
    setPosts(newList);
  }
  let formArea;
  if (user) {
    formArea = <BlogPostForm
        user={user}
        onPostCreated={handlePostCreated}
    />;
} else {
    formArea = <div className="alert warning">
        Sign in to write a post.
    </div>;
}

return (
    <div>
        {formArea}
        <h2 className="h5 text-body mb-3">
            Recent posts
        </h2>
        <PostList
            posts={posts}
            user={user}
            onPostUpdated={handlepupdated}
            onPostDeleted={handlepdeleted}
        />
    </div>
);
}
export default Home;

//note for later: fix displaying time since it wont change on update