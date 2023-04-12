sudo mkdir ~/docker

# Set the working directory to the directory containing the docker-compose.yml file
cd ~/docker || echo "Could not set working directory to docker" exit

sudo wget "https://raw.githubusercontent.com/Maidstone-Canoe-Club/playground/main/docker-compose.yml" -O "/docker-compose.yml"
echo "Docker compose file updated"

# Pull the latest versions of the images
sudo docker compose pull

# Recreate the containers with the new images
sudo docker compose up -d
