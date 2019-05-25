
var createConfig=require('./createConfig');

createConfig.startService(function(err, out) {
	console.error(err);
	console.error(out);
});
