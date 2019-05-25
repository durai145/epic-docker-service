VERSION_MINOR=$(bash $PWD/genSeq.sh EPIC_WEB_HOST)
sudo docker build --tag 372257697320.dkr.ecr.us-east-1.amazonaws.com/epic-web-host .
#sudo docker build --tag  372257697320.dkr.ecr.us-east-1.amazonaws.com/epic-web-host .
sudo docker images
