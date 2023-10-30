const log = require('../node_modules/npm/lib/utils/log-shim');
const BaseCommand = require('../node_modules/npm/lib/base-command');
const Arborist = require('@npmcli/arborist')


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
        const opts = {
          ...this.npm.flatOptions,
          auditLevel: null,
          path: where,
          add: args,
          workspaces: this.workspaceNames,
        }
        const arb = new Arborist(opts)
        await arb.reify(opts)

        // do stuff
        log.info('cmd', 'An info level')
        log.warn('A warning')
      
    } finally {
      log.enableProgress()
    }
  }

}

module.exports = Config