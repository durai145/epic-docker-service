Promise = require('bluebird'),
request = Promise.promisify(require('request')); 

httpRequest = function(options, callback) {
	console.log(options);
	request(options).then(function (resp) {
		console.log("call resp:["+ JSON.stringify(resp) +"]"); 
		if (resp.statusCode == 201) {
			return callback(null, resp.body);
		} else {
			return callback(new Error(resp.body));
		}
	}).catch(function (err) {
		console.log("call err:" + err.message);
		return callback(err);
	});

}
exports.httpRequest=httpRequest;