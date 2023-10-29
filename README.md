# NpmTesting

## Setting log level
```
# set log level
npm_config_loglevel=http

npm_config_loglevel=http npm install --no-audit
```

## Checking cache
```
npm cache ls | grep "arborist"
```


## Cache query
prints out cache contents from search term as first arg, or all keys if no args supplied

```
cd ./cacheQuery
npm install

# print cache value attributes
RES_MAX=5 node ./index.js @npmcli/arborist -v

# get cache value as JSON
node ./index.js @npmcli/arborist --json > out.json
jq .name out.json
```