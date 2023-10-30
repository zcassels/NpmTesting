echo "starting"

npm install -g cacachequery-1.0.0.tgz

npm ls --global

which cacachequery

## NPM cache timeout 15 minutes ??


# https://registry.npmjs.org/js-tokens 48ms (cache revalidated)
NPM_CONFIG_LOGLEVEL=http npm install -g react

npm cache clean --force

# https://registry.npmjs.org/js-tokens 43ms (cache miss)
NPM_CONFIG_LOGLEVEL=http npm install -g react

cacachequery react -v

# https://registry.npmjs.org/js-tokens 6ms (cache hit)
NPM_CONFIG_LOGLEVEL=http npm install -g react

cacachequery react -v