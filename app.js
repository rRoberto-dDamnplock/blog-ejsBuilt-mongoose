const express = require('express')
const app = express()
const bp = require("body-parser")
var _ = require('lodash');
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/blogDB', {
  useNewUrlParser: true
});;

const contentSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Content = mongoose.model('Content', contentSchema);

// const blog1 = new Content({
//   title: "Hello",
//   content:"Testing Db" ,
// });



app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bp.urlencoded({
  extended: true
}));




app.get("/compose", function (req, res) {



  res.render("compose")

})

app.post("/compose", function (req, res) {

  const post = new Content({
    title: req.body.postTitle,
    content: req.body.postBody,

  })

  post.save()
  res.redirect("/posts")

});

app.get("/posts", function (req, res) {


  Content.find({}, function (err, post) {
    if (err) {
      console.log(err)
    } else {
      //  post.forEach(function(post){
      res.render("posts", {

        contentPost: post,
        // rTitle: defaultContent,


      })
      // })
    }


  });

  // const lTitle = _.lowerCase(content.title)

})


app.get("/contact", function (req, res) {

  res.render("contact")
})

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Content.findOne({_id: requestedPostId}, function(err, post){ 

    if (err) {
      console.log(err)
    } else {

      // for(let i = 0; i<post.length; i++) {
      // const reqParam = _.lowerCase(req.params.topic);
      // post.forEach(function (post) {
        res.render('postContent', {
          headingPost: post,
        })

        // console.log("rendering found id")
        // }

      // })
    }


  })

})



// })





// })













app.get('/', (req, res) => {
  res.render("about")
})

app.listen(3000, () => {
  console.log("Example app listening on port 3000")
})