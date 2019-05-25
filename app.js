const express = require('express')
var fs = require('fs');
const app = express()
const port = 3000
var createConfig=require('./createConfig');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


app.get('/', (req, res) => res.send('Hello World!'))

function addCoreFunction(req, callback) {
	req.getHeader = function (arg) {
		var retVal = "";
		try {
			retVal = req.headers[arg]
		} catch (e) {
			retVal = "";
		}
		return retVal;
	}
	req.setHeader = function (arg, value) {
		try {
			req.headers[arg] = value;
		} catch (e) {
			retVal = "";
		}
	}
	req.getParam = function (arg) {
		var retVal = "";
		if (req.method == "POST") {
			try {
				if (req.params[arg] == undefined) {
					retVal = req.body[arg];
				} else {
					retVal = req.params[arg];
				}

			} catch (e) {
				retVal = "";
			}
		} else if (req.method == "GET") {
			try {
				retVal = req.query[arg] || req.body[arg];
			} catch (e) {
				retVal = "";
			}
		}
		return retVal;
	}
	req.getMethod = function (arg) {
		return req.method;
	}
	callback(req);
}

app.post('/createEpicConfig', function(req, res) {
	addCoreFunction(req, function (req) {
		console.log(req.body);
		var userHome=req.getParam("userHome");
		var installerUsed="#Basic Installation"
		var rpcUser=req.getParam("rpcUser");
		var rpcPassword=req.getParam("rpcPassword");
		var ip=req.getParam("ip");
		var key=req.getParam("key");
		var port=req.getParam("port");

		if (userHome == null || userHome == "" ) {
			res.statusCode = 400;
			res.send({ errorDesc: "userHome is empty or null" });
			return;
		}
		if (rpcUser == null || rpcUser == "" ) {
			res.statusCode = 400;
			res.send({ errorDesc: "rpcUser is empty or null" });
			return;
		}
		if (rpcPassword == null || rpcPassword == "" ) {
			res.statusCode = 400;
			res.send({ errorDesc: "rpcPassword is empty or null" });
			return;
		}
		if (ip == null || ip == "" ) {
			res.statusCode = 400;
			res.send({ errorDesc: "ip is empty or null" });
			return;
		}
		if (key == null || key == "" ) {
			res.statusCode = 400;
			res.send({ errorDesc: "key is empty or null" });
			return;
		}

		if (port == null || port == "" ) {
			res.statusCode = 400;
			res.send({ errorDesc: "port is empty or null" });
			return;
		}

		createConfig.createEpicConfig(userHome,installerUsed, rpcUser, rpcPassword, ip, key, port, function(err, message) {
			if (err) {
				console.error(err);
				res.statusCode = 304;
				res.send(err);
				return;
			} else {
				console.log(message);
				res.statusCode = 201;
				res.send(message);
				return;
			}
		});

	});

});

app.post('/createEpicService', function(req, res) {
	addCoreFunction(req, function (req) {
		console.log(req.body);
		var userHome=req.getParam("userHome");
		var user=req.getParam("user");
		if (userHome == null || userHome == "" ) {
			res.statusCode = 400;
			res.send({ errorDesc: "userHome is empty or null" });
			return;
		}
		if (user == null || user == "" ) {
			res.statusCode = 400;
			res.send({ errorDesc: "user is empty or null" });
			return;
		}
		createConfig.createEpicService(userHome, user, function(err, message) {
			if (err) {
				console.error(err);
				res.statusCode = 304;
				res.send(err);
				return;
			} else {
				console.log(message);
				res.statusCode = 201;
				res.send(message);
				return;
			}
		});
	});
});
app.post('/enableService', function(req, res) {
	addCoreFunction(req, function (req) {
		console.log("enableService");
		createConfig.enableService(function(err, message) {
			if (err) {
				console.error(err);
				res.statusCode = 304;
				res.send(err);
				return;
			} else {
				console.log(message);
				res.statusCode = 201;
				res.send(message);
				return;
			}
		});	
	});
});
app.post('/startService', function(req, res) {
	addCoreFunction(req, function (req) {
		console.log("startService");
		createConfig.startService(function(err, message) {
			if (err) {
				console.error(err);
				res.statusCode = 304;
				res.send(err);
				return;
			} else {
				console.log(message);
				res.statusCode = 201;
				res.send(message);
				return;
			}
		});	
	});
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
