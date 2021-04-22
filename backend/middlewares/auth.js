const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
	try {
		let token = req.headers.authorization;

		if (!token) {
			throw "No token!";
		}

		let decodedToken = jwt.verify(token, config.jwt);
		if (decodedToken) {
			req.user = decodedToken.id;
			next();
		} 
		else {
			throw "Invalid token!";
		}
	}
	catch(error) {
		res.send({succes: false, error});
	}
}