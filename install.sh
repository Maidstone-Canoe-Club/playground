mkdir -p ~/docker

# Set the working directory to the directory containing the docker-compose.yml file
cd ~/docker || echo "Could not set working directory to docker" exit

wget -O docker-compose.prod.yml https://raw.githubusercontent.com/Maidstone-Canoe-Club/playground/main/docker-compose.prod.yml

docker compose rm -f

# Pull the latest versions of the images
docker compose pull

# Recreate the containers with the new images
docker compose -f docker-compose.prod.yml up -d --remove-orphans --force-recreate
