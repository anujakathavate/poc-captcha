var app = require('express')();
var bodyParser = require('body-parser');
var svgCaptcha = require('svg-captcha');
var currentCaptcha = "";

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.type('html');
    res.end(`
        <img src="/captcha"/>
        <form action="/testCaptcha" method="post" name="formCaptcha">
            <input type="text" name="captcha"/>
            <input type="submit"/>
        </form>
    `);
});

app.get('/captcha', function (req, res) {
	var captcha = svgCaptcha.create();
	currentCaptcha = captcha.text;

	res.set('Content-Type', 'image/svg+xml');
	res.status(200).send(captcha.data);
});

app.post('/testCaptcha', function (req, res) {
	res.status(200).send(req.body.captcha === currentCaptcha ? "Valid" : "Not Valid");
});

app.listen(8080, function() {
	console.log("Server started at 8080");
});
