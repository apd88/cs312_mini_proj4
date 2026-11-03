const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json()); 

var users = []; 
var posts = []; 
var nextId = 1;

app.post("/signup", function (req, res) {

    var user_id = req.body.user_id;
    var password = req.body.password;
    var name = req.body.name;
    if (!user_id || !password || !name) {
        return res.status(400).json({
             success: false,
              message: "Please try entering again" });
    }

    for (var i = 0; i < users.length; i++) {
     if (users[i].user_id === user_id) {
              return res.status(409).json({ 
             success: false,
              message: "There is already a user with that ID. Please use a different one" });
        } }
  
      users.push({  
          user_id: user_id,
           password: password,
            name: name });
    res.status(201).json({
         success: true, user: {
             user_id: user_id,
              name: name } });
});



app.post("/signin", function (req, res) {

    var user_id = req.body.user_id;
    var password = req.body.password;

    if (!user_id || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter your user and password"
     }); 
     }
    for (var i = 0; i < users.length; i++) {
      if (users[i].user_id === user_id && users[i].password === password) {
         return res.json({
             success: true,
              user: {
              user_id: users[i].user_id,
               name: users[i].name
                }
            });
        }
    }

    res.status(401).json({
        success: false,
        message: "Invalid user ID or password. Unable to sign in."
    });
});



app.get("/blogs", function (req, res) {
 res.json(posts.reverse());
});
app.post("/blogs", function (req, res) {
    var creator = null;
    for (var i = 0; i < users.length; i++) {
        if (users[i].user_id.toLowerCase() === req.body.user_id.toLowerCase()) creator = users[i];
    }
    if (creator === null) {
        return res.status(401).json({
             message: "You must be signed in to post"
             });
    }
    if (!req.body.title && !req.body.content) {
        return res.status(400).json({
             message: "Please enter a message"
             });   }

        var addpost = {
     id: posts.length + 1, 
    title: req.body.title,
    content: req.body.content,
     creator_user_id: creator.user_id,
    creator_name: creator.name
    };
    posts.push(addpost);
    res.status(201).json(addpost);
});


app.put("/blogs/:id", function (req, res) {

    var targetid = parseInt(req.params.id);
    var ap = null;
    for (var i = 0; i < posts.length; i++) {

        if (posts[i].id === targetid) {
            ap = posts[i];
        }
    }
 if (ap === null) {
return res.status(404).json({
     message: "Post was unable to be found. Please try again."
    });
    }


// compare  id on saved post with the one sent by browser. dont allow edits if not the same
// took a while but i was able to figure this one out. i feel like its super important to have this but
// might not be required
 if (ap.creator_user_id !== req.body.user_id) {
        return res.status(403).json({ 
            message: "You are only allowed to change posts that you have made "}); 
    }
    ap.title = req.body.title;
    ap.content = req.body.content;
    res.json(ap);
});

//same as above just for editing not deleting, allow only users to delete own post
app.delete("/blogs/:id", function (req, res) {
    var targetid = parseInt(req.params.id);
    var remove = -1;

    for (var i = 0; i < posts.length; i++) {

        if (posts[i].id === targetid)
             remove = i;
    }
    if (remove === -1) {
        return res.status(404).json({
             message: "Post not found" });
    }
    if (posts[remove].creator_user_id !== req.body.user_id) {
        return res.status(403).json({ 
            message: "You are not allowed to delete other users' posts"
        });
    }
    posts.splice(remove, 1);
    res.json({
         success: true });
});

app.listen(port);