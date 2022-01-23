const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://person.jjhserverworld.pe.kr:18080',
      changeOrigin: true
    })
  )
};