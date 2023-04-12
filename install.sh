mkdir ~/docker

# Set the working directory to the directory containing the docker-compose.yml file
cd ~/docker || echo "Could not set working directory to docker" exit

sudo su -c 'wget "https://raw.githubusercontent.com/Maidstone-Canoe-Club/playground/main/docker-compose.yml" -O "/docker-compose.yml"'
echo "Docker compose file updated"

# Pull the latest versions of the images
sudo su -c 'docker compose pull'

# Recreate the containers with the new images
suddo su -c 'docker compose up -d'
