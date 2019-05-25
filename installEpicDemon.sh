USER=root
FAIL2BAN="y"
UFW="y"
BOOTSTRAP="n"
USERHOME=`eval echo "~$USER"`

# Set these to change the version of epic to install
TARBALLURL="https://github.com/EpicCrypto/Epic/releases/download/2.2.1/epic-2.2.1-x86_64-linux-gnu.tar.gz"
TARBALLNAME="epic-2.2.1-x86_64-linux-gnu.tar.gz"
BOOTSTRAPURL=""
BOOTSTRAPARCHIVE=""
BWKVERSION="1.0.0"
# Install EPIC daemon
wget $TARBALLURL
tar -xzvf $TARBALLNAME
rm $TARBALLNAME
mv ./epicd /usr/local/bin
mv ./epic-cli /usr/local/bin
mv ./epic-tx /usr/local/bin
rm -rf $TARBALLNAME


