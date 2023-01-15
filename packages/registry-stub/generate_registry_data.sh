#/bin/bash
docker compose -f docker-compose.build.yaml up -d

port=5001
repo="alpine"
tags=("3.14.0" "3.15.3" "3.16.0")

for i in "${tags[@]}";
do 
    docker pull $repo:$i;
    docker tag $repo:$i localhost:5001/unload/$repo:$i
    docker push localhost:$port/unload/$repo:$i
    docker rmi -f $repo:$i localhost:$port/unload/$repo:$i
done

docker compose -f docker-compose.build.yaml down

