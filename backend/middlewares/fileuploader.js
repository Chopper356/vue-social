const fileUploader = require("express-fileupload");

module.exports = fileUploader({
	limits: { fileSize: 5 * 1024 * 1024 }
});