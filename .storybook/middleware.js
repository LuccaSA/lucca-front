
const proxy = require('http-proxy-middleware');

module.exports = function expressMiddleware (router) {
	const p = {
		logLevel: 'debug',
		changeOrigin: true,
		secure: false,
		target: 'http://prisme-proxy.lucca.io',
	}

	router.use('/timmi-timesheet/api', proxy(p));
	router.use('/timmi-project/api', proxy(p));

	router.use('/api', proxy(p));
	router.use('/organization/structure/api', proxy(p));
	router.use('/directory/api', proxy(p));
	router.use('/getFile.ashx', proxy(p));

}