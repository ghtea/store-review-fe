const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://person.jjhserverworld.pe.kr:18080',
      //target: 'https://localhost:8080',
      changeOrigin: true
    })
  )
};