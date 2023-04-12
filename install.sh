#!/bin/bash

# Set the working directory to the directory containing the docker-compose.yml file
cd ~/docker || echo "Could not set working directory to docker"exit

FILE_URL="https://raw.githubusercontent.com/Maidstone-Canoe-Club/playground/main/docker-compose.yml"
FILE_PATH="/docker-compose.yml"

wget "${FILE_URL}" -O "${FILE_PATH}"
echo "Docker compose file updated"

# Pull the latest versions of the images
docker compose pull

# Recreate the containers with the new images
docker compose up -d
