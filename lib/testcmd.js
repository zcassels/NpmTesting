const log = require('../node_modules/npm/lib/utils/log-shim');
const BaseCommand = require('../node_modules/npm/lib/base-command');
const { mkdir, readFile, writeFile } = require('fs/promises')
const { dirname, resolve } = require('path')
const { spawn } = require('child_process')
const { EOL } = require('os')
const ini = require('ini')
const localeCompare = require('@isaacs/string-locale-compare')('en')
const pkgJson = require('@npmcli/package-json')
const { defaults, definitions } = require('../node_modules/npm/node_modules/@npmcli/config/lib/definitions')
const cacache = require('cacache')
const pacote = require('pacote')
const { join } = require('path')

// These are the configs that we can nerf-dart. Not all of them currently even
// *have* config definitions so we have to explicitly validate them here
const nerfDarts = [
  '_auth',
  '_authToken',
  'username',
  '_password',
  'email',
  'certfile',
  'keyfile',
]

// take an array of `[key, value, k2=v2, k3, v3, ...]` and turn into
// { key: value, k2: v2, k3: v3 }
const keyValues = args => {
  const kv = {}
  for (let i = 0; i < args.length; i++) {
    const arg = args[i].split('=')
    const key = arg.shift()
    const val = arg.length ? arg.join('=')
      : i < args.length - 1 ? args[++i]
      : ''
    kv[key.trim()] = val.trim()
  }
  return kv
}

const publicVar = k => {
  // _password
  if (k.startsWith('_')) {
    return false
  }
  // //localhost:8080/:_password
  if (k.startsWith('//') && k.includes(':_')) {
    return false
  }
  return true
}


class Config extends BaseCommand {
  static description = 'Manage the npm configuration files'
  static name = 'config'
  static usage = [
    'test'
  ]

  static params = [
    'json',
    'global',
    'editor',
    'location',
    'long',
  ]

  static ignoreImplicitWorkspace = false

  static skipConfigValidation = true

  static async completion (opts) {
    return []
  }

  async exec ([action, ...args]) {
    log.disableProgress()
    try {

        const cachePath = join(this.npm.cache, '_cacache')
        const cacheKeys = Object.keys(await cacache.ls(cachePath))

        let cachekey = cacheKeys[0];
        let res = await cacache.get(cachePath, cachekey);

        // do stuff
        log.info('cmd', 'An info level')
        log.warn('A warning')
      
    } finally {
      log.enableProgress()
    }
  }

}

module.exports = Config