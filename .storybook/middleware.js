
const proxy = require('http-proxy-middleware');

module.exports = function expressMiddleware (router) {
	const p = {
		logLevel: 'debug',
		changeOrigin: true,
		secure: false,
		target: 'http://prisme-proxy.lucca.io',
		onProxyRes: (proxyRes, _req, _res) => {
			if(proxyRes.statusCode === 401) {
				// rewrite 401 as 400 to avoid sign in popup
				proxyRes.statusCode = 400;
			}
		}
	}

	router.use('/timmi-timesheet/api', proxy(p));
	router.use('/timmi-project/api', proxy(p));

	router.use('/api', proxy(p));
	router.use('/organization/structure/api', proxy(p));
	router.use('/directory/api', proxy(p));
	router.use('/getFile.ashx', proxy(p));

}