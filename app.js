////////////////////////////////////////////////global Variable///////////////////////////////////////////
var PORT = 3000;


////////////////////////////////////////////////Dependency////////////////////////////////////////////////
var path = require('path');
var http = require('http');
var fs = require('fs');
var url = require('url');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var express = require('express');
var app = express();


////////////////////////////////////////////////Settings//////////////////////////////////////////////////
app.set('port', 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
// app.set("engine", "ejs");


////////////////////////////////////////////////Midware///////////////////////////////////////////////////
app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') != 'production' && req.query.showTests === '1';
    next();
});
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));




////////////////////////////////////////////////Request///////////////////////////////////////////////////
/////////////////////////////////////////////////params///////////////////////////////////////////////////
var Request = {
    title: '',
    kw: '',
    content: ''
}

//////////////////////////////////////////////////rout////////////////////////////////////////////////////
//服务器主页输出
app.get('/', function(req, res) {
    // Request.title = req.query.title;
    // Request.kw = req.query.kw;
    // Request.content = req.query.content;
    // console.log(Request.title);
    // console.log(Request.kw);
    // console.log(Request.content);
    // if (Request.title == undefined) {
    //     res.render('home');
    // } else if (Request.title == undefined) {
    //     res.render('home');
    // } else {
    //     res.redirect('/news?title=' + Request.title + '&kw=' + Request.kw + '&content=' + Request.content);
    // }
    // res.render('browsePDF');
    res.render('home');
    // res.redirect('/news');
    // res.send(req.body);

});


app.get('/pdf', function(req, res) {
    res.render('browsePDF');
});


app.get('/try', function(req, res) {
    res.render('try');
    // var readFile = "views/try.html";
    // var fileContents = fs.readFileSync(readFile);

    // res.send(fileContents.toString())
});


//////////////////////////////////////////////////error///////////////////////////////////////////////////
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.write('500 - Server Error');
    res.end();
});



//////////////////////////////////////////////////Server//////////////////////////////////////////////////
var server = app.listen(app.get('port'), "127.0.0.1", function() { //指跑在哪个端口

    var host = server.address().address
    var port = server.address().port
    console.log(host);
    console.log(port);

    console.log("访问地址为 http://%s:%s", host, port)

})