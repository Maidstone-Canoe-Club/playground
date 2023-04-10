#!/bin/bash

while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    --token)
    TOKEN="$2"
    shift
    shift
    ;;
    --repository)
    USERNAME="$2"
    shift
    shift
    ;;
    *)
    echo "Unknown argument: $1"
    exit 1
    ;;
esac
done

# Set the working directory to the directory containing the docker-compose.yml file
cd ~/docker || echo "Could not set working directory to docker"exit

# Log in to the GitHub container registry
echo "${TOKEN}" | docker login ghcr.io -u "${USERNAME}" --password-stdin

# Pull the latest versions of the images
docker compose pull

# Recreate the containers with the new images
docker compose up -d
