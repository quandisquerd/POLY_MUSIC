import { createProxyMiddleware } from 'http-proxy-middleware'

module.exports = function (app) {
    app.use(
        '/api', // Đổi thành đường dẫn tương ứng của JSON Server
        createProxyMiddleware({
            target: 'https://node-postgresql-api-git-master-quandisquerd.vercel.app/', // Thay đổi thành URL của JSON Server
            changeOrigin: true,
        })
    );
};