const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function expressMiddleware(router) {
	const p = createProxyMiddleware({
		logLevel: 'debug',
		changeOrigin: true,
		secure: false,
		target: 'http://prisme-proxy.lucca.io',
		onProxyRes: (proxyRes, _req, _res) => {
			if (proxyRes.statusCode === 401) {
				// rewrite 401 as 400 to avoid sign in popup
				proxyRes.statusCode = 400;
			}
		},
	});

	router.use('/timmi-timesheet/api', p);
	router.use('/timmi-project/api', p);

	router.use('/api', p);
	router.use('/organization/structure/api', p);
	router.use('/directory/api', p);
	router.use('/getFile.ashx', p);
};
