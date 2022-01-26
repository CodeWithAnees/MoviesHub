const { validationResult } = require("express-validator/check");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
    Post.find()
        .then((posts) => {
            res.status(200).json({ posts: posts });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getSortedPosts = (req, res, next) => {
  Post.find().sort({upvote: 'desc'}).limit(10)
      .then((posts) => {
          res.status(200).json({ posts: posts });
      })
      .catch((err) => {
          if (!err.statusCode) {
              err.statusCode = 500;
          }
          next(err);
      });
};




exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then((post) => {
            if (!post) {
                const error = new Error("Could not find post.");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ post: post });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getOnePost = (req, res, next) => {
    const name = req.body.name;
    console.log(name);
    Post.findOne({name: name})
    .then((post) => {
        if (!post) {
            const error = new Error("Could not find post.");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ post: post });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};


exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const upvote = req.body.upvote;

  console.log(postId);
  console.log(upvote);
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
 
      post.upvote = upvote;
      return post.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Post updated!', post: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePostDown = (req, res, next) => {
  const postId = req.params.postId;
  const downvote = req.body.downvote;

  console.log(postId);
  console.log(downvote);
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
 
      post.downvote = downvote;
      return post.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Post updated!', post: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

















exports.addMovie = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: "Validation failed, entered data is incorrect.",
            errors: errors.array(),
        });
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: "images/duck.jpg",
        creator: { name: "Maximilian" },
    });
    post.save()
        .then((result) => {
            res.status(201).json({
                message: "Post created successfully!",
                post: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
