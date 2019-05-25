USER=root
FAIL2BAN="y"
UFW="y"
BOOTSTRAP="n"
USERHOME=`eval echo "~$USER"`

echo "Installing dependencies..."
apt-get -qq update
apt-get -qq upgrade
apt-get -qq autoremove
apt-get -qq install wget htop unzip
apt-get -qq install build-essential && apt-get -qq install libtool autotools-dev autoconf libevent-pthreads-2.0-5 automake && apt-get -qq install libssl-dev && apt-get -qq install libboost-all-dev && apt-get -qq install software-properties-common && add-apt-repository -y ppa:bitcoin/bitcoin && apt update && apt-get -qq install libdb4.8-dev && apt-get -qq install libdb4.8++-dev && apt-get -qq install libminiupnpc-dev && apt-get -qq install libqt4-dev libprotobuf-dev protobuf-compiler && apt-get -qq install libqrencode-dev && apt-get -qq install git && apt-get -qq install pkg-config && apt-get -qq install libzmq3-dev
apt-get -qq install aptitude
apt-get -qq install libevent-dev

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


