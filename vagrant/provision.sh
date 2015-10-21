#!/bin/bash

echo "Instalando Mosquitto"

wget http://repo.mosquitto.org/debian/mosquitto-repo.gpg.key
sudo apt-key add mosquitto-repo.gpg.key

cd /etc/apt/sources.list.d/
sudo wget http://repo.mosquitto.org/debian/mosquitto-wheezy.list
sudo wget http://repo.mosquitto.org/debian/mosquitto-jessie.list

sudo apt-get update
sudo apt-get install mosquitto mosquitto-clients libmosquitto-dev -y

sudo cp config/mosquitto.conf /etc/mosquitto/mosquitto.conf

sudo service mosquitto restart
echo "Porta padão: 1884"

echo "Instalando alguns softwares"
sudo apt-get install -y vim nmap htop
