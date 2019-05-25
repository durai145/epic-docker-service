/*
cat > $USERHOME/.epic/epic.conf << EOL
${INSTALLERUSED}
rpcuser=${RPCUSER}
rpcpassword=${RPCPASSWORD}
rpcallowip=127.0.0.1
listen=1
server=1
daemon=1
logtimestamps=1
maxconnections=256
externalip=${IP}
bind=${IP}:1255
masternodeaddr=${IP}
masternodeprivkey=${KEY}
masternode=1
addnode=108.61.193.88
addnode=45.32.230.63
addnode=45.32.129.61
addnode=149.28.200.19
EOL
*/
const NEXTLINE="\n";
var fs=require("fs");

createEpicConfig = function(userHome, installerUsed, rpcUser, rpcPassword, ip, key, port, callback) {
	
	fileName="epic.conf";
	fileDir=userHome + "/.epic";
	fullPath = fileDir + "/" + fileName;
	var fileData="";
	var port="1255";
	fileData += installerUsed + NEXTLINE
	fileData += "rpcuser=" + rpcUser  + NEXTLINE
	fileData += "rpcpassword=" + rpcPassword + NEXTLINE
	fileData += "rpcallowip=127.0.0.1" + NEXTLINE
	fileData += "listen=1" + NEXTLINE
	fileData += "server=1" + NEXTLINE
	fileData += "daemon=1" + NEXTLINE
	fileData += "logtimestamps=1" + NEXTLINE
	fileData += "maxconnections=256" + NEXTLINE
	fileData += "externalip=" + ip  + NEXTLINE
	fileData += "bind=" + ip + ":" + port + NEXTLINE
	fileData += "masternodeaddr=" + ip  + NEXTLINE
	fileData += "masternodeprivkey=" + key  + NEXTLINE
	fileData += "masternode=1" + NEXTLINE
	fileData += "addnode=108.61.193.88" + NEXTLINE
	fileData += "addnode=45.32.230.63" + NEXTLINE
	fileData += "addnode=45.32.129.61" + NEXTLINE
	fileData += "addnode=149.28.200.19" + NEXTLINE

	if (!fs.existsSync(fileDir)) {
		fs.mkdirSync(fileDir, 0744);
	}

	fs.writeFile(fullPath, fileData , function (err) {
		if (err)  {
			callback(err, null);
		}
		callback(null, 'File is created successfully.');
	});
}
/*
var userHome="./";
var installerUsed="#Basic Installation"
var rpcUser="VNVBDeSnqQZF";
var rpcPassword="qkAOnMNNiC1wlTRCbbHvpFLUgVp2k9Fi";
var ip="149.28.238.12";
var key="2ZZseiYMyw4krroFBKMNPinK4HxChxnNWMkBPVZb1dkqfxVvdjB";
var port="1255";

createEpicConfig(userHome,installerUsed, rpcUser, rpcPassword, ip, key, port, function(err, message) {
	if (err) {
		console.error(err);
	} else {
		console.log(message);
	}
});
*/

/*
# Install EPIC daemon
wget $TARBALLURL
tar -xzvf $TARBALLNAME
rm $TARBALLNAME
mv ./epicd /usr/local/bin
mv ./epic-cli /usr/local/bin
mv ./epic-tx /usr/local/bin
rm -rf $TARBALLNAME

*/

/*

cat > /etc/systemd/system/epic.service << EOL
[Unit]
Description=epicd
After=network.target
[Service]
Type=forking
User=${USER}
WorkingDirectory=${USERHOME}
ExecStart=/usr/local/bin/epicd -conf=${USERHOME}/.epic/epic.conf -datadir=${USERHOME}/.epic
ExecStop=/usr/local/bin/epic-cli -conf=${USERHOME}/.epic/epic.conf -datadir=${USERHOME}/.epic stop
Restart=on-abort
[Install]
WantedBy=multi-user.target
EOL
systemctl enable epic.service
systemctl start epic.service
*/

createEpicService=function(userHome, user, callback) {

	
	fileName="epic.service";
	fileDir="/etc/systemd/system/";
	fullPath = fileDir + "/" + fileName;
	var fileData="";
	var port="1255";
	fileData += "[Unit]" + NEXTLINE
	fileData += "Description=epicd"  + NEXTLINE
	fileData += "After=network.target" + NEXTLINE
	fileData += "[Service]" + NEXTLINE
	fileData += "Type=forking" + NEXTLINE
	fileData += "User=" + user + NEXTLINE
	fileData += "WorkingDirectory=" +  userHome  + NEXTLINE
	fileData += "ExecStart=/usr/local/bin/epicd -conf=" + userHome + "/.epic/epic.conf -datadir=" + userHome + "/.epic"  + NEXTLINE
	fileData += "ExecStop=/usr/local/bin/epic-cli -conf=" + userHome + "/.epic/epic.conf -datadir=" + userHome + "/.epic stop"  + NEXTLINE
	fileData += "Restart=on-abort" + NEXTLINE
	fileData += "[Install]" + NEXTLINE
	fileData += "WantedBy=multi-user.target" + NEXTLINE

	if (!fs.existsSync(fileDir)) {
		fs.mkdirSync(fileDir, 0744);
	}

	fs.writeFile(fullPath, fileData , function (err) {
		if (err)  {
			callback(err, null);
		}
		callback(null, 'File is created successfully.');
	});
}
/*
var user="root";
createEpicService(userHome, user, function(err, message) {
	if (err) {
		console.error(err);
	} else {
		console.log(message);
	}
});
*/

var cp = require('child_process');
enableService = function(callback) {
  command = "systemctl enable epic.service";
  cp.exec(command, function(error, stdout, stderr) {
  console.log('stdout:', stdout);
  callback(stderr, stdout);
  });
}

startService = function(callback) {
  command = "systemctl start epic.service";
  cp.exec(command, function(error, stdout, stderr) {
  console.log('stdout:', stdout);
  callback(stderr, stdout);
  });
}


exports.createEpicService =  createEpicService;
exports.createEpicConfig =  createEpicConfig;
exports.enableService =  enableService;
exports.startService =  startService;
