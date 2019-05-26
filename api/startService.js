
var config = require('./config');
var body = config.startServiceRequest || {};
var http = require("./httpRequest");
//console.log(JSON.stringify(opt));
var respObj= {};
var opt = {
			method: 'POST',
			uri: 'http://' + config.host + ':' + + config.port + '/startService',
			form: body,
			headers: respObj
		};
var optStr = JSON.stringify(opt);
console.log("!!!optStr length :" + optStr.length);
http.httpRequest(opt, function(err, resp) {
if (err) {
	console.error(err);
	return;
}
console.log(resp);
return;
});
