const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		createProxyMiddleware('/user', {
			target: 'http://localhost:8080',
			//대상 서버의 구성에 따라 호스트 헤더를 변경해주는 옵션(무슨말인지..)
			changeOrigin: true
		})
	)
};