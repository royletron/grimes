var koa = require('koa');
var assets = require('koa-static');
var router = require('koa-router')();
var logger = require('koa-logger');
var views = require('koa-views');

var app = koa();

router.get('/', function *(next){
	yield this.render('home');
});

app
	.use(assets('public'))
	.use(views('app/views', {default: 'jade'}))
	.use(logger())
	.use(router.routes())
	.use(router.allowedMethods())
	.listen(3000);