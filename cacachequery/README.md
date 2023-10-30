
#
```
npm install -g cachequery
```

# testing
```
# builds docker iamge with cached npm packages
docker build -t npmtest .

# scans dependencies left in the image
docker run -it --rm -v $(pwd):/work -w /work --entrypoint bash npmtest dockerscript.sh
```