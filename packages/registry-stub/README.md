#

## Description
This repository is used to create an image of a docker registry with some images already preloaded.

### Usage
The images can be configured in `generate_registry_data.sh`.


To generate the data, run the script with:

```shell
./generate_registry_data.sh
```

Once the `./registry` directory was created, the docker image can be build:
    
```shell
docker compose build
```

And run with: 

```shell
docker compose up -d
```

### Testing
To test if the image was buidl correctly, run the follwoing command and compare the output with the tags from `generate_registry_data.sh'

```shell
curl http://localhost:5001/v2/unload/alpine/tags/list
```
