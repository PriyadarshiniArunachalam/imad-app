var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
  "article-one":{
      "title":'Displaying first article.',
      "heading":'Article-one',
      "content":'<p> This is article one</p> '
  },
  "article-two":{
      "title":'Displaying second article.',
      "heading":'Article-two',
      "content":'<p> This is article two</p> '
      
  },
  "article-three":{
      "title":'Displaying third article.',
      "heading":'Article-three',
      "content":'<p> This is article three</p> '
      
  }
};

function htmlElement(articleData){
    var title=articleData.title;
    var heading=articleData.heading;
    var content=articleData.content;
var renderedHTML=`<!doctype html>
<html>
    <head>
        <title>
            ${title}
        </title>
        <link href="/ui/style.css" rel="stylesheet" />
         <script src="/ui/main.js" />
    </head>
    <body>
        <div class="myStyle">
            <marquee>${heading}</marquee>
        </div>
        <div class="center">
            <img src="/ui/madi.png" class="img-medium"/>
        </div>
        <br>
        <div class="center text-big bold">
          ${content}
        </div>
        </hr>
        <div id="comment">
        <input type="text" name="commentBox" placeholder="Enter comments here"/>
        <button id="submit">Fetch Comments</button>
        <ul id="fillComments" >
            <li></li>
            <li></li>
        </ul>
        </div>
        
        <script type="text/javascript" src="/ui/main.js">
        </script>
    </body>
</html>`;
return renderedHTML;
}

var comments=[];
function addComments(comment){
    comments.push(comment);
    return comments;
}

app.get('/addComments', function(req,res){
    var commentText=req.query.comment;
    var commentList=addComments(commentText);  
    res.send(JSON.stringify(commentList));
});

app.get('/:articleName',function(req,res){
    var articleName=req.params.articleName;
    res.send(htmlElement(articles[articleName]));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
