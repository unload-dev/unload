# docker-registry-client

A node.js client for the Docker Registry V2

## Test

### Generating registry certs

```shell
openssl req -x509 -newkey rsa:4096 -sha256 -days 3650 -nodes \
  -keyout domain.key -out domain.crt -subj '/CN=test.unload.dev' \
  -extensions san \
  -config <(echo '[req]'; echo 'distinguished_name=req';
            echo '[san]'; echo 'subjectAltName=DNS:test.unload.dev')
```
