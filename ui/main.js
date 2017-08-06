console.log('Loaded!');
var submit_btn=document.getElementById('submit');
submit.onClick(function(){
    var commentsList=document.getElementById('fillComments');
var enteredComments=document.getElementById('comment');
var request=new XMLHttpRequest();

request.onreadystatechange=function(){
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        var comments=req.responseText;
        comments=JSON.parse(comments);
        var element;
        for(var i=0;i<comments.length;i++)
        {
            element=element+"<li>"+comments[i]+"</li>";
        }
        commentsList.innerHTML=element;
  }
}
request.open("http://priyadarshini5066.imad.hasura-app.io/addComments?comment="+enteredComments);
req.send(null);
});